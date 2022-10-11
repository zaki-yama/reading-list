import Layout, { siteTitle } from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  const title = `${siteTitle} ${postData.title}`;
  const searchParams = new URLSearchParams(`title=${title}`);
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta
          property="og:image"
          content={`https://reading-list.zaki-yama.dev/api/og?${searchParams.toString()}`}
          key="og-image"
        />
        <meta name="og:title" content={postData.title} key="og-title" />
      </Head>
      <article className="markdown-body">
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};
