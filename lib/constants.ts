// サイトの基本情報
export const SITE_CONFIG = {
  // サイトURL
  url: "https://reading-list.zaki-yama.dev",

  // サイト名
  title: "zaki-yama's reading list",

  // サイト説明
  description: "@zaki-yamaが日頃読んだ記事をまとめていくためのサイト",

  // 作者情報
  author: {
    name: "zaki-yama",
    github: "https://github.com/zaki-yama",
  },

  // RSS関連
  rss: {
    feedUrl: "/api/feed.xml",
    maxItems: 15,
  },

  // OG画像
  ogImage: "/api/og",
} as const;
