# 项目约定

## 开发服务器（astro dev）
- **修改 `astro.config.mjs` 后必须手动重启**：`pnpm astro dev stop` → `pnpm astro dev`，不要依赖自动重载。
- 若页面报 `The file does not exist at "node_modules/.vite/deps/..."` 或 swup 失效（点击变整页刷新）：`pnpm astro dev stop` → `rm -rf node_modules/.vite` → `pnpm astro dev`。
- `optimizeDeps.include`（astro.config.mjs）写入了 swup 全家与 photoswipe/lightbox，改动这些依赖时同步更新。
- dev 下图片/JS 的 304 是 Vite 正常噪音（`Cache-Control: no-cache` 强制重校验），非问题；生产由 `public/_headers` 的 immutable 规则根治（首访后 0 请求）。

## 依赖
- react/react-dom/@astrojs/react/@heroui/react 等为死依赖（src 无任何导入），清理需移除 `react()` 集成与 `ssr.noExternal`，并重新 build 验证。

## 已知补丁
- `patches/astro@7.2.1.patch`：修复 dev 保存后内容不更新（#16843）与 `astro:server-app.js` 报错（`virtual:` 前缀）。补丁必须用 `git diff` 从原始包生成，手写 hunk 会导致 `[ERR_PNPM_INVALID_PATCH]`。
