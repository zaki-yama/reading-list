import { NextApiRequest, NextApiResponse } from "next";
import { Feed } from "feed";
import { getSortedPostsDataWithContent } from "../../lib/posts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // サイトの基本情報
    const siteUrl = "https://reading-list.zaki-yama.dev";
    const feedUrl = `${siteUrl}/api/feed.xml`;

    // Feedインスタンスを作成
    const feed = new Feed({
      title: "@zaki-yamaの読書記録",
      description: "@zaki-yamaが日頃読んだ記事をまとめていくためのサイト",
      id: siteUrl,
      link: siteUrl,
      language: "ja",
      image: `${siteUrl}/favicon.ico`,
      favicon: `${siteUrl}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}, @zaki-yama`,
      generator: "Next.js RSS Feed",
      feedLinks: {
        rss2: feedUrl,
      },
      author: {
        name: "@zaki-yama",
        link: "https://github.com/zaki-yama",
      },
    });

    // 最新15件の記事を取得
    const allPosts = getSortedPostsDataWithContent();
    const recentPosts = allPosts.slice(0, 15);

    // 各記事をフィードに追加
    recentPosts.forEach((post) => {
      const postUrl = `${siteUrl}/posts/${post.id}`;

      feed.addItem({
        title: post.title,
        id: postUrl,
        link: postUrl,
        description: post.description,
        date: new Date(post.date),
        author: [
          {
            name: "@zaki-yama",
            link: "https://github.com/zaki-yama",
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
