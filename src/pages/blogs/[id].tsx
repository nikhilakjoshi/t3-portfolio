import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  type NextPage,
} from "next";
import { SEO } from "../../common";
import Layout from "../../layouts";
import { Client } from "@notionhq/client";
import { serverEnv } from "../../env/schema.mjs";
import clsx from "clsx";
import { Rubik } from "@next/font/google";
import { ParsedUrlQuery } from "querystring";
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";

const font = Rubik({ subsets: ["latin"] });

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const notion = new Client({
    auth: serverEnv.NOTION_SECRET_KEY,
  });

  const resp = await notion.databases.query({
    database_id: serverEnv.NOTION_DB_ID!,
  });

  const blogs = resp.results
    .filter((a) => a.object === "page")
    .map((result) => {
      const page: any = result;
      return {
        params: {
          id: page.id as string,
        },
      };
    });

  return {
    paths: blogs,
    fallback: false,
  };
};

interface StaticProps extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<
  { blog: ListBlockChildrenResponse },
  StaticProps
> = async ({ params }) => {
  const notion = new Client({
    auth: serverEnv.NOTION_SECRET_KEY,
  });

  const resp = await notion.blocks.children.list({
    block_id: params?.id!,
  });
  return {
    props: {
      blog: resp,
    },
  };
};

const Blog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blog,
}) => {
  console.log({ blog });
  return (
    <>
      <SEO />
      <Layout>
        <main className={clsx(font.className)}></main>
      </Layout>
    </>
  );
};

export default Blog;
