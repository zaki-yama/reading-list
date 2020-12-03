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
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
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
