import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'

import fs from 'fs'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import path from 'path'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Head,
}

export default function Post({
  source, frontMatter
}: {
  source: string
  frontMatter:any 
}) {
  const content = hydrate(source, { components });
  return (
    <Layout>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{frontMatter.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={frontMatter.date} />
        </div>
        <div>{content}</div>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths.map(path => path.replace(/\.mdx?$/, ''))
  .map(slug => ({params: { slug}}))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await renderToString(content, {
    components,
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}
