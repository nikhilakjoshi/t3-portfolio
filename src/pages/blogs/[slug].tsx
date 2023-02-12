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
import moment from "moment";
import Image from "next/image";

const font = Rubik({ subsets: ["latin"] });

export const getStaticPaths: GetStaticPaths<{
  slug: string;
}> = async () => {
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
          slug: page.properties.slug.rich_text[0].plain_text as string,
        },
      };
    });

  return {
    paths: blogs,
    fallback: false,
  };
};

interface StaticProps extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<
  {
    blog: ListBlockChildrenResponse;
    title: string;
    published: string;
    cover: string;
  },
  StaticProps
> = async ({ params }) => {
  const notion = new Client({
    auth: serverEnv.NOTION_SECRET_KEY,
  });

  const DBresp = await notion.databases.query({
    database_id: serverEnv.NOTION_DB_ID!,
    filter: {
      property: "slug",
      rich_text: {
        equals: params?.slug!,
      },
    },
  });

  const resp = await notion.blocks.children.list({
    block_id: DBresp.results[0]?.id!,
  });
  const dbResp = DBresp as any;
  return {
    props: {
      blog: resp,
      cover: dbResp.results[0].cover?.external.url,
      title: dbResp.results[0].properties.Name?.title[0].plain_text,
      published: moment(dbResp.results[0].properties.Date?.date.start).format(
        "MMMM, DD, YYYY"
      ),
    },
  };
};

const Blog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blog,
  cover,
  title,
  published,
}) => {
  return (
    <>
      <SEO />
      <Layout>
        <main
          className={clsx(font.className, "flex-grow px-8 text-text lg:px-24")}
        >
          <div className="data mt-24 mb-6 text-center text-sm text-text text-opacity-50">{`Published ${published}`}</div>
          <h1 className="text-center text-5xl font-bold tracking-wide text-text">
            {title}
          </h1>
          <Image
            src={cover}
            width={1584}
            height={396}
            alt="cover-photo"
            className="mx-auto my-12 aspect-[1584/396] max-w-screen-xl rounded-lg object-cover object-bottom"
          />
        </main>
      </Layout>
    </>
  );
};

export default Blog;
