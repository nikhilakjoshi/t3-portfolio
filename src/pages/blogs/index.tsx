import { GetStaticProps, InferGetStaticPropsType, type NextPage } from "next";
import { SEO } from "../../common";
import Layout from "../../layouts";
import { Client } from "@notionhq/client";
import { serverEnv } from "../../env/schema.mjs";
import moment from "moment";
import clsx from "clsx";
import { Rubik } from "@next/font/google";
import Image from "next/image";

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
        <div
          className={clsx(
            "grid grid-cols-3 gap-4 lg:my-8 lg:flex-grow lg:px-24",
            font.className
          )}
        >
          <div className="order-2 col-span-3 lg:order-1 lg:col-span-2">
            <div className="w-full lg:w-[75%]">Howdy</div>
          </div>
          <div className="order-1 col-span-3 flex items-center border-b px-8 pb-4 lg:order-2 lg:col-span-1 lg:flex-col lg:border-none lg:px-0 lg:pt-0 lg:pb-0">
            <Image
              src="https://imgur.com/DKTFxgX.png"
              width={400}
              height={400}
              alt="Nikhil Joshi"
              className="aspect-square h-20 w-20 rounded-full border shadow-sm lg:mx-auto lg:h-32 lg:w-32"
            />
            <div className="info ml-4 flex flex-col justify-center overflow-hidden lg:mt-6 lg:ml-0">
              <h1 className="hidden text-lg font-medium text-text lg:mx-auto lg:block lg:text-2xl">
                Nikhil Joshi
              </h1>
              <p className="mt-1 text-lg text-text lg:mx-auto lg:text-opacity-50">
                Full stack developer
              </p>
              <p className="mt-2 text-xs text-text text-opacity-50 line-clamp-2 lg:mx-auto lg:text-center lg:text-lg lg:line-clamp-none">
                Software Developer | Typescript | NextJS | tRPC | Tailwind |
                Prisma | ReactJS | React Native | Javascript | Docker | Full
                stack | NodeJS | SpringBoot | AWS and still learning
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Blog;
