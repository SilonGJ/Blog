const core = require('@actions/core');
const { execFileSync } = require('child_process');
const { promises: fsp } = require('fs');
const os = require('os');
const path = require('path');
const net = require('net');
const dns = require('dns/promises');

const BLOG = core.getInput('blog-site') || 'https://zcx0217.qzz.io';
const BLOG_HOST = new URL(BLOG).hostname.toLowerCase();
const ISSUE = process.env.GITHUB_ISSUE_NUMBER || '';
const WORKSPACE = process.env.GITHUB_WORKSPACE || process.cwd();

function extractField(text, fieldName) {
  const regex = new RegExp(`### ${fieldName}\\s*\\n\\s*(.*?)(?=\\n### |\\n## |$)`, 's');
  const match = text.match(regex);
  return match ? match[1].trim() : '';
}

function isBlockedIp(ip) {
  if (net.isIP(ip) !== 4) {
    if (ip === '::' || ip === '::1') return true;
    if (/^fe80:/i.test(ip)) return true;
    if (/^(fc|fd)/i.test(ip)) return true;
    return false;
  }
  const p = ip.split('.').map(Number);
  const a = p[0];
  const b = p[1];
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    (a === 192 && b === 0 && p[2] === 0) ||
    a >= 224
  );
}

async function assertPublicUrl(url) {
  const u = new URL(url);
  if (u.protocol !== 'http:' && u.protocol !== 'https:') {
    throw new Error('仅支持 http/https 地址');
  }
  const host = u.hostname.replace(/^\[|\]$/g, '');
  if (host === 'localhost') throw new Error('不支持 localhost');
  if (net.isIP(host)) {
    if (isBlockedIp(host)) throw new Error('不允许访问内网/本机地址');
    return;
  }
  let addrs;
  try {
    addrs = await dns.lookup(host, { all: true });
  } catch (e) {
    throw new Error(`域名解析失败（${e.code || e.message}）`);
  }
  if (!addrs.length) throw new Error('域名未解析到地址');
  if (addrs.some(({ address }) => isBlockedIp(address))) {
    throw new Error('不允许访问内网/本机地址');
  }
}

async function fetchLimited(url, maxBytes = 5 * 1024 * 1024) {
  let current = url;
  for (let hop = 0; hop < 10; hop++) {
    await assertPublicUrl(current);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort('timeout'), 20000);
    let res;
    try {
      res = await fetch(current, {
        redirect: 'manual',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FriendLinkBot/1.0; +' + BLOG + ')',
          'Accept': 'text/html,application/xhtml+xml,image/*,*/*;q=0.8',
        },
      });
    } finally {
      clearTimeout(timer);
    }
    if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
      const next = new URL(res.headers.get('location'), current).href;
      if (next === current) throw new Error('重定向目标异常');
      current = next;
      continue;
    }
    const chunks = [];
    let total = 0;
    for await (const chunk of res.body) {
      total += chunk.length;
      if (total > maxBytes) throw new Error('响应内容过大（超过 ' + Math.round(maxBytes / 1048576) + 'MB）');
      chunks.push(chunk);
    }
    return { status: res.status, body: Buffer.concat(chunks) };
  }
  throw new Error('重定向次数过多');
}

function detectMimeType(file) {
  try {
    return execFileSync('file', ['-b', '--mime-type', file], { encoding: 'utf8' }).trim();
  } catch (e) {
    return '';
  }
}

const MIME_EXT = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/bmp': 'bmp',
  'image/x-icon': 'ico',
  'image/vnd.microsoft.icon': 'ico',
  'image/svg+xml': 'svg',
};

(async () => {
  const body = core.getInput('issue-body') || '';
  const siteName = extractField(body, '站点名称');
  const siteDescription = extractField(body, '站点描述');
  const siteUrl = extractField(body, '站点 URL');
  const siteIcon = extractField(body, '站点图标 URL');
  const verifyAddress = extractField(body, '友链检查地址');

  const messages = [];
  let failed = false;
  const fail = (m) => { failed = true; messages.push('❌ ' + m); };
  const ok = (m) => messages.push('✅ ' + m);

  if (!siteName) fail('未填写「站点名称」。');
  if (!siteUrl) fail('未填写「站点 URL」。');
  if (!verifyAddress) fail('未填写「友链检查地址」。');

  let iconTmp = '';
  let iconTarget = '';
  let nofollow = false;

  if (siteUrl) {
    try {
      const { status } = await fetchLimited(siteUrl);
      if (status >= 200 && status < 300) {
        ok(`站点可访问：${siteUrl}（HTTP ${status}）`);
      } else {
        fail(`站点无法正常访问：请求 ${siteUrl} 返回 HTTP ${status}（预期 2xx）。请检查站点是否已上线、或 URL 是否填写正确。`);
      }
    } catch (e) {
      fail(`站点无法访问：请求 ${siteUrl} 失败（${e.message}）。请确认域名解析正常且站点可公开访问。`);
    }
  }

  if (siteIcon) {
    try {
      const tmpDir = path.join(os.tmpdir(), 'friend-icon-' + (process.env.GITHUB_RUN_ID || 'run'));
      await fsp.mkdir(tmpDir, { recursive: true });
      const tmpFile = path.join(tmpDir, 'icon');
      const { status, body: buf } = await fetchLimited(siteIcon);
      if (status < 200 || status >= 300) {
        fail(`站点图标下载失败：请求 ${siteIcon} 返回 HTTP ${status}。`);
      } else {
        await fsp.writeFile(tmpFile, buf);
        const mime = detectMimeType(tmpFile);
        if (mime && mime.startsWith('image/')) {
          let ext = MIME_EXT[mime];
          if (!ext) ext = (path.extname(new URL(siteIcon).pathname) || '').replace('.', '').toLowerCase();
          if (!ext) ext = 'img';
          const host = new URL(siteUrl).hostname.toLowerCase();
          iconTarget = `friend[${host}].${ext}`;
          iconTmp = tmpFile;
          ok(`站点图标有效：为 ${mime} 格式图片`);
        } else {
          fail(`站点图标不是有效图片：从 ${siteIcon} 下载到的文件识别为「${mime || '未知类型'}」，请提供真实的图片地址（支持 png/jpg/gif/webp/ico/avif 等）。`);
        }
      }
    } catch (e) {
      fail(`站点图标处理失败：请求 ${siteIcon} 出错（${e.message}）。`);
    }
  } else {
    ok('未填写站点图标，将使用站点名称首字母作为占位。');
  }

  if (verifyAddress) {
    try {
      const { status, body: buf } = await fetchLimited(verifyAddress);
      if (status >= 200 && status < 300) {
        ok(`友链检查地址可访问：${verifyAddress}（HTTP ${status}）`);
        const html = buf.toString('utf8');
        if (html.trim().length < 50) {
          fail('友链检查地址页面内容几乎为空（可能需登录访问或由前端 JS 动态渲染），无法确认是否已添加本站友链。');
        } else {
          const are = /<a\b[^>]*>/gi;
          let am;
          let found = false;
          while ((am = are.exec(html))) {
            const tag = am[0];
            const hrefM = tag.match(/href\s*=\s*(["'])(.*?)\1/i);
            if (!hrefM) continue;
            try {
              const u = new URL(hrefM[2], verifyAddress);
              if (u.hostname.toLowerCase() === BLOG_HOST) {
                found = true;
                if (/\brel\s*=\s*(["'])[^"']*\bnofollow\b/i.test(tag)) nofollow = true;
                break;
              }
            } catch (e) { /* 跳过无效链接 */ }
          }
          if (found) {
            ok('已找到指向本站的友链：' + BLOG + (nofollow ? '（注意：该回链带有 rel="nofollow"，站长合并前请复核）' : ''));
          } else {
            fail(`友链检查地址页面中未找到指向本站（${BLOG}）的友链链接。请先在贵站 ${verifyAddress} 页面添加本站友链后再申请。`);
          }
        }
      } else {
        fail(`友链检查地址无法访问：请求 ${verifyAddress} 返回 HTTP ${status}。请确认该页面地址正确且可公开访问。`);
      }
    } catch (e) {
      fail(`友链检查地址处理失败：请求 ${verifyAddress} 出错（${e.message}）。`);
    }
  }

  const msgPath = path.join(WORKSPACE, `friend-validate-msg-${ISSUE}.txt`);
  await fsp.writeFile(msgPath, messages.join('\n'));

  core.setOutput('passed', failed ? 'false' : 'true');
  core.setOutput('message', messages.join('\n'));
  core.setOutput('site-name', siteName);
  core.setOutput('site-url', siteUrl);
  core.setOutput('site-description', siteDescription);
  core.setOutput('site-icon', siteIcon);
  core.setOutput('verify-address', verifyAddress);
  core.setOutput('icon-tmp-path', iconTmp);
  core.setOutput('icon-target', iconTarget);
  core.setOutput('nofollow', nofollow ? 'true' : 'false');

  console.log(failed ? '【校验未通过】' : '【校验通过】\n' + messages.join('\n'));
})().catch((e) => {
  console.error('校验 action 异常：', e);
  core.setOutput('passed', 'false');
  core.setOutput('message', '校验过程出现异常：' + e.message);
});