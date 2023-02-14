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
import { ParsedUrlQuery } from "querystring";
import {
  ListBlockChildrenResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import moment from "moment";
import Image from "next/image";
import React from "react";
import clsx from "clsx";
import { getComponent } from "../../common/MarkdownComps";

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
      const res: PageObjectResponse = result as PageObjectResponse;
      const slug =
        res.properties.slug?.type === "rich_text"
          ? res.properties.slug.rich_text[0]?.plain_text ?? "dummy"
          : "dummy";
      return {
        params: {
          slug,
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
    tags: string[];
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
        equals: params?.slug as string,
      },
    },
  });

  const resp = await notion.blocks.children.list({
    block_id: DBresp.results[0]?.id as string,
  });

  const dbResp = DBresp.results.filter(
    (a) => a.object === "page"
  ) as PageObjectResponse[];
  const firstPage = dbResp[0];
  const cover =
    firstPage?.cover?.type === "external"
      ? firstPage.cover.external.url
      : "dummy";
  const title =
    firstPage?.properties.Name?.type === "title"
      ? firstPage?.properties.Name?.title[0]?.plain_text ?? "dummy"
      : "dummy";
  const tags =
    firstPage?.properties.Tags?.type === "multi_select"
      ? firstPage.properties.Tags.multi_select.map((a) => a.name)
      : [];
  const published =
    firstPage?.properties.Date?.type === "date"
      ? moment(firstPage.properties.Date.date?.start).format("MMMM, DD, YYYY")
      : moment().format("MMMM, DD, YYYY");
  return {
    props: {
      blog: resp,
      cover,
      title,
      tags,
      published,
    },
  };
};

const Blog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blog,
  cover,
  title,
  published,
  tags,
}) => {
  console.log(blog);
  return (
    <>
      <SEO />
      <Layout>
        <main className={"flex-grow text-text"}>
          <div className="metaData px-8 lg:px-24">
            <div className="data mt-24 mb-6 text-center text-sm text-text text-opacity-50">{`Published ${published}`}</div>
            <h1 className="text-center text-3xl font-bold tracking-wide text-text lg:text-5xl">
              {title}
            </h1>
            <div className="mx-auto mt-8 flex w-full items-center justify-center gap-1">
              {tags.map((a, i) => (
                <span
                  className="rounded-xl bg-green-100 py-1 px-4 text-xs tracking-wide text-green-600"
                  key={`tag-${i}`}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:px-24">
            <Image
              src={cover}
              width={1584}
              height={594}
              alt="cover-photo"
              className="mx-auto my-12 aspect-[1584/594] w-full object-cover object-center lg:max-w-screen-xl lg:rounded-lg "
            />
          </div>
          <article className={clsx("mx-auto px-8 lg:max-w-screen-lg")}>
            {blog.results.map((block) => (
              <React.Fragment key={block.id}>
                {getComponent(block)}
              </React.Fragment>
            ))}
          </article>
        </main>
      </Layout>
    </>
  );
};

export default Blog;
