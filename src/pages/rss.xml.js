import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig, profileConfig } from '../config';

export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    stylesheet: '/styles/pretty-feed-v3.xsl',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${post.id}/`,
      categories: post.data.tags,
      content: post.body,
      author: profileConfig.email,
    })),
    customData: `
      <language>${siteConfig.lang}</language>
      <managingEditor>${profileConfig.name}</managingEditor>
      <webMaster>${profileConfig.name} (${profileConfig.email})</webMaster>
      <copyright>© ${new Date().getFullYear()} ${profileConfig.name}</copyright>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <image>
        <url>${context.site}images/favicon.png</url>
        <title>${siteConfig.title}</title>
        <link>${context.site}</link>
      </image>
    `,
  });
}
