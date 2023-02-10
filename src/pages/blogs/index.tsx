import { GetStaticProps, InferGetStaticPropsType, type NextPage } from "next";
import { SEO } from "../../common";
import Layout from "../../layouts";
import { Client } from "@notionhq/client";
import { serverEnv } from "../../env/schema.mjs";
import moment from "moment";
import clsx from "clsx";
import { Rubik } from "@next/font/google";

const font = Rubik({ subsets: ["latin"] });

interface BlogsProps {
  blogs: {
    title: string;
    created: string;
  }[];
}

export const getStaticProps: GetStaticProps<BlogsProps> = async () => {
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
        title: page.properties.Name?.title[0].plain_text,
        created: moment(page.properties.Date.date.start).format("DD MMM YYYY"),
      };
    });

  return {
    props: {
      blogs,
    },
  };
};

const Blog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs,
}) => {
  return (
    <>
      <SEO />
      <Layout>
        <div className={clsx("my-8 flex-grow px-8 lg:px-24", font.className)}>
          <div className="">Howdy</div>
        </div>
      </Layout>
    </>
  );
};

export default Blog;
