export const siteConfig = {
  title: 'SilonGJ',
  subtitle: '主站',
  description: '这里是孤久きりのなか(SilonGJ)的博客，主要分享技术以及一些乱七八糟的东西',
  lang: 'zh-CN',
  author: '孤久きりのなか',
  postsPerPage: 8,
};

export interface NavLink {
  name: string;
  url: string;
  icon?: string;
  newWindow?: boolean;
  noExternalDialog?: boolean;
}

export interface NavGroup {
  name: string;
  icon?: string;
  children: NavLink[];
}

export type NavItem = NavLink | NavGroup;

export const navBarConfig = {
  links: [
    {
      name: '归档',
      icon: 'list',
      children: [
        { name: '归档', url: '/archive/', icon: 'list' },
        { name: '分类', url: '/categories/', icon: 'folder' },
      ],
    },
    { name: '友链', url: '/links/', icon: 'link' },
    { name: '关于', url: '/posts/about/', icon: 'info' },
    { name: '状态', url: 'https://status.zcx0217.qzz.io/', icon: 'square-activity', newWindow: true, noExternalDialog: true },
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
  avatar: '/images/avatar.webp',
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
