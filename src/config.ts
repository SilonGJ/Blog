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
    { name: '首页', url: '/' },
    { name: '博客', url: '/blog/' },
    { name: '归档', url: '/archive/' },
    { name: '分类', url: '/categories/' },
    { name: '标签', url: '/tags/' },
    { name: '关于', url: '/posts/about/' },
  ],
};

export const profileConfig = {
  name: '孤久きりのなか',
  avatar: '/avatar.jpg',
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
