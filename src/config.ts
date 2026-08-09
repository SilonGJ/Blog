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
    { name: '友链', url: '/links/' },
    { name: '关于', url: '/posts/about/' },
  ],
};

export const linksConfig = {
  title: '友情链接',
  applyLink: 'https://github.com/SilonGJ/Blog/issues/new?template=friend-link.yml',
  groups: [
    {
      name: '好朋友们',
      links: [
        {
          name: "黔中Geek's blog",
          url: 'https://qzgeek.cn',
          icon: '/images/friend/friend[www.qzgeek.cn].ico',
          description: '黔中极客的博客',
        },
        {
          name: "二叉树树",
          url: 'https://2x.nz/',
          icon: '/images/friend/friend[2x.nz].jpg',
          description: '《二叉树树》官方网站',
        },
        {
          name: 'SkyのXnok',
          url: 'https://201562.xyz',
          icon: 'https://201562.xyz/avatar.png',
          description: '记录学习、生活与思考',
        },

      ],
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
