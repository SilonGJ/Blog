export const siteConfig = {
  title: 'My Blog',
  subtitle: 'A personal blog built with Astro and HeroUI',
  description: 'A modern static blog built with Astro, HeroUI, and Tailwind CSS',
  lang: 'zh-CN',
  author: 'Your Name',
  postsPerPage: 8,
};

export const navBarConfig = {
  links: [
    { name: '首页', url: '/' },
    { name: '博客', url: '/blog/' },
    { name: '归档', url: '/archive/' },
    { name: '分类', url: '/categories/' },
    { name: '标签', url: '/tags/' },
    { name: '关于', url: '/about/' },
  ],
};

export const profileConfig = {
  name: 'Your Name',
  avatar: '/avatar.jpg',
  bio: '全栈开发者 | 技术爱好者 | 终身学习者',
  location: 'China',
  email: 'your@email.com',
  links: [
    { name: 'GitHub', icon: 'github', url: 'https://github.com' },
    { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com' },
    { name: 'Email', icon: 'email', url: 'mailto:your@email.com' },
  ],
  skills: ['TypeScript', 'React', 'Astro', 'Node.js', 'Python', 'Go'],
};
