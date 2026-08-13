export const siteConfig = {
  title: '孤久の小站',
  subtitle: '主站',
  description: '这里分享一些...呃，乱七八糟的东西',
  lang: 'zh-CN',
  author: '孤久きりのなか',
  postsPerPage: 8,
};

export const navBarConfig = {
  links: [
    { name: '归档', url: '/archive/' },
    { name: '分类', url: '/categories/' },
    { name: '标签', url: '/tags/' },
    { name: '友链', url: '/links/' },
    { name: '关于', url: '/posts/about/' },
    { name: '状态', url: 'https://status.zcx0217.qzz.io/' },
  ],
};

export interface FriendLink {
  issue: number;
  name: string;
  url: string;
  icon?: string;
  description?: string;
  verifyUrl?: string;
}

const linkModules = import.meta.glob('./links/*.json', { eager: true }) as Record<
  string,
  { default: FriendLink }
>;

const friendLinks: FriendLink[] = Object.values(linkModules)
  .map((m) => m.default)
  .sort((a, b) => (a.issue ?? 0) - (b.issue ?? 0));

export const linksConfig = {
  title: '友情链接',
  applyLink: 'https://github.com/SilonGJ/Blog/issues/new?template=friend-link.yml',
  groups: [
    {
      name: '好朋友们',
      links: friendLinks,
    },
  ],
};

export const profileConfig = {
  name: '孤久きりのなか',
  avatar: '/images/avatar.jpg',
  bio: '',
  location: 'China',
  email: 'zcx02172024@gmail.com',
  links: [
    { name: 'QQ', icon: 'qq', url: 'https://qm.qq.com/cgi-bin/qm/qr?k=1910115941' },
    { name: 'GitHub', icon: 'github', url: 'https://github.com/SilonGJ' },
    { name: 'BiliBili', icon: 'bilibili', url: 'https://space.bilibili.com/1038766354' },
    { name: 'Email', icon: 'email', url: 'mailto:zcx02172024@gmail.com' },
  ],
  skills: ['TypeScript', 'React', 'Astro', 'Node.js', 'Python', 'Go'],
};
