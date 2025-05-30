import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";
import { SITE_CONFIG } from "../lib/constants";

const name = "zaki-yama";
export const siteTitle = SITE_CONFIG.title;

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  const searchParams = new URLSearchParams(`title=${siteTitle}`);
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE_CONFIG.title} RSS Feed`}
          href={SITE_CONFIG.rss.feedUrl}
        />
        <meta
          property="og:image"
          content={`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}?${searchParams.toString()}`}
          key="og-image"
        />
        <meta property="og:title" content={siteTitle} key="og-title" />
        <meta property="og:description" content={SITE_CONFIG.description} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/profile.png"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={SITE_CONFIG.author.name}
            />
            <h1 className={utilStyles.heading2Xl}>{siteTitle}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <img
                src="/images/profile.png"
                className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                alt={name}
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {siteTitle}
              </Link>
            </h2>
          </>
        )}
      </header>
      <GoogleTagManager gtmId="GTM-WQ7KV9GK" />
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
      <Analytics />
    </div>
  );
}
