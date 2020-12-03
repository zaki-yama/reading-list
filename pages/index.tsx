import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils';

export default function Home({
  posts
}: {
  posts: {
    content: string
    data: any
    filePath: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Web フロントエンド系の読んだ記事をまとめていくためのサイト</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {posts.map(post => (
            <li className={utilStyles.listItem} key={post.filePath}>
              <Link
                            as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
              href={`/posts/[slug]`}>
                <a>{post.data.title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={post.data.date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = postFilePaths.map(filePath => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    }
  });

  return {
    props: {
      posts
    }
  }
}
