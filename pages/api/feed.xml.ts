import { NextApiRequest, NextApiResponse } from "next";
import { Feed } from "feed";
import { getSortedPostsDataWithContent } from "../../lib/posts";
import { SITE_CONFIG } from "../../lib/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // サイトの基本情報
    const feedUrl = `${SITE_CONFIG.url}${SITE_CONFIG.rss.feedUrl}`;

    // Feedインスタンスを作成
    const feed = new Feed({
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      id: SITE_CONFIG.url,
      link: SITE_CONFIG.url,
      language: "ja",
      image: `${SITE_CONFIG.url}/favicon.ico`,
      favicon: `${SITE_CONFIG.url}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}, ${SITE_CONFIG.author.name}`,
      generator: "Next.js RSS Feed",
      feedLinks: {
        rss2: feedUrl,
      },
      author: {
        name: SITE_CONFIG.author.name,
        link: SITE_CONFIG.author.github,
      },
    });

    // 最新15件の記事を取得
    const allPosts = getSortedPostsDataWithContent();
    const recentPosts = allPosts.slice(0, SITE_CONFIG.rss.maxItems);

    // 各記事をフィードに追加
    recentPosts.forEach((post) => {
      const postUrl = `${SITE_CONFIG.url}/posts/${post.id}`;

      feed.addItem({
        title: post.title,
        id: postUrl,
        link: postUrl,
        description: post.description,
        date: new Date(post.date),
        author: [
          {
            name: SITE_CONFIG.author.name,
            link: SITE_CONFIG.author.github,
          },
        ],
      });
    });

    // RSS XMLを生成
    const rssXml = feed.rss2();

    // レスポンスヘッダーを設定
    res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

    // RSS XMLを返す
    res.status(200).send(rssXml);
  } catch (error) {
    console.error("RSS feed generation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
