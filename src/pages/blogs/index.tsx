import { GetStaticProps, InferGetStaticPropsType, type NextPage } from "next";
import { SEO } from "../../common";
import Layout from "../../layouts";
import { Client } from "@notionhq/client";
import { serverEnv } from "../../env/schema.mjs";
import moment from "moment";
import clsx from "clsx";
import { Rubik } from "@next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "react-feather";

const font = Rubik({ subsets: ["latin"] });

interface BlogsProps {
  blogs: {
    title: string;
    created: string;
    blogId: string;
    tags: string[];
    slug: string;
  }[];
}

export const getStaticProps: GetStaticProps<BlogsProps> = async () => {
  const notion = new Client({
    auth: serverEnv.NOTION_SECRET_KEY,
  });

  const resp = await notion.databases.query({
    database_id: serverEnv.NOTION_DB_ID!,
    filter: {
      property: "Status",
      status: {
        equals: "Done",
      },
    },
  });

  const blogs = resp.results
    .filter((a) => a.object === "page")
    .map((result) => {
      const page: any = result;
      return {
        title: page.properties.Name?.title[0].plain_text,
        created: moment(page.properties.Date.date.start).format("DD MMM YYYY"),
        blogId: page.id,
        tags: page.properties.Tags?.multi_select?.map((a: any) => a.name) ?? [],
        slug: page.properties.slug.rich_text[0].plain_text,
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
            <div className="w-full lg:w-[75%]">
              {/* // ! Blogs */}
              {blogs.map((blog) => (
                <div className="blog text-text" key={blog.blogId}>
                  <Link href={`/blogs/${blog.slug}`} className="group">
                    <h1
                      title={blog.title}
                      className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-medium transition-colors group-hover:text-primary"
                    >
                      {blog.title}
                    </h1>
                  </Link>
                  <div className="mt-4 flex items-center text-sm text-text text-opacity-50">
                    <div className="date flex items-center gap-1">
                      <Calendar size={16} />
                      <div className="">{blog.created}</div>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {blog.tags.map((a, i) => (
                        <span
                          className="rounded-xl bg-green-100 py-1 px-4 text-xs tracking-wide text-green-600"
                          key={`tag-${i}`}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 col-span-3 flex items-center border-b px-8 pb-4 lg:order-2 lg:col-span-1 lg:flex-col lg:border-none lg:px-0 lg:pt-0 lg:pb-0">
            <Image
              src="https://imgur.com/DKTFxgX.png"
              width={400}
              height={400}
              alt="Nikhil Joshi"
              className="aspect-square h-20 w-20 rounded-full shadow-sm lg:mx-auto lg:h-32 lg:w-32"
            />
            <div className="info ml-4 flex flex-col justify-center overflow-hidden lg:mt-6 lg:ml-0">
              <h1 className="hidden font-medium text-text lg:mx-auto lg:block lg:text-xl">
                Nikhil Joshi
              </h1>
              <p className="mt-1 tracking-wide text-text lg:mx-auto lg:text-opacity-50">
                Full stack developer
              </p>
              <p className="mt-2 text-xs tracking-wide text-text text-opacity-50 line-clamp-2 lg:mx-auto lg:text-center lg:text-base lg:line-clamp-none">
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
