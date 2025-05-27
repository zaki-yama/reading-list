import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";

const name = "zaki-yama";
export const siteTitle = "zaki-yama's reading list";

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
        <meta
          property="og:image"
          content={`https://reading-list.zaki-yama.dev/api/og?${searchParams.toString()}`}
          key="og-image"
        />
        <meta property="og:title" content={siteTitle} key="og-title" />
        <meta property="og:description" content="zaki-yama's reading-list" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/profile.png"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
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
          <Link href="/">
            ← Back to home
          </Link>
        </div>
      )}
      <Analytics />
    </div>
  );
}
