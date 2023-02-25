import { GetStaticProps, InferGetStaticPropsType, type NextPage } from "next";
import { SEO } from "../../common";
import Layout from "../../layouts";
import { Client } from "@notionhq/client";
import { serverEnv } from "../../env/schema.mjs";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "react-feather";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface BlogsProps {
  blogs: {
    title: string;
    created: string;
    blogId: string;
    tags: string[];
    slug: string;
    cover: string;
    description: string;
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
      const page = result as PageObjectResponse;
      const title =
        page?.properties.Name?.type === "title"
          ? page?.properties.Name?.title[0]?.plain_text ?? "dummy"
          : "dummy";
      const tags =
        page?.properties.Tags?.type === "multi_select"
          ? page.properties.Tags.multi_select.map((a) => a.name)
          : [];
      const created =
        page?.properties.Date?.type === "date"
          ? moment(page.properties.Date.date?.start).format("MMMM, DD, YYYY")
          : moment().format("MMMM, DD, YYYY");
      const slug =
        page?.properties.slug?.type === "rich_text"
          ? page.properties.slug.rich_text[0]?.plain_text ?? "dummy"
          : "dummy";
      const description =
        page?.properties.description?.type === "rich_text"
          ? page?.properties.description?.rich_text[0]?.plain_text ?? "dummy"
          : "dummy";

      const cover =
        page?.cover?.type === "external" ? page.cover.external.url : "dummy";

      return {
        title,
        created,
        blogId: page.id,
        tags,
        slug,
        cover,
        description,
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
      <SEO title="Blogs" ogImage="https://source.unsplash.com/ylveRpZ8L1s" />
      <Layout>
        <div className={"grid grid-cols-3 gap-4 lg:my-8 lg:flex-grow lg:px-24"}>
          <div className="order-2 col-span-3 lg:order-1 lg:col-span-2">
            <div className="w-full px-8 lg:w-[75%] lg:px-0">
              {/* // ! Blogs */}
              {blogs.map((blog) => (
                <div className="blog border-b pb-4 text-text" key={blog.blogId}>
                  <div className="date mb-2 mt-4 flex items-center gap-1 text-text text-opacity-50">
                    <Calendar size={16} />
                    <div className="text-xs">{blog.created}</div>
                  </div>
                  <div className="flex justify-between gap-8">
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="group overflow-hidden"
                    >
                      <h1
                        title={blog.title}
                        className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium transition-colors group-hover:text-primary lg:text-2xl"
                      >
                        {blog.title}
                      </h1>
                      <p className="desc text-xs text-text text-opacity-50 line-clamp-2 lg:text-sm">
                        {blog.description}
                      </p>
                    </Link>
                    <Image
                      src={blog.cover}
                      alt="cover"
                      width={300}
                      height={150}
                      className="aspect-video w-24 object-cover lg:w-32"
                    />
                  </div>
                  <div className="mt-4 flex items-center text-sm text-text text-opacity-50">
                    <div className="flex gap-1">
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
          <div className="order-1 col-span-3 flex items-center border-b border-b-purple-400 px-8 pb-4 lg:order-2 lg:col-span-1 lg:flex-col lg:border-l lg:border-none lg:px-0 lg:pt-0 lg:pb-0">
            <div className="flex w-full pb-4 lg:block lg:border-b">
              <Image
                src="https://imgur.com/DKTFxgX.png"
                width={400}
                height={400}
                alt="Nikhil Joshi"
                className="aspect-square h-12 w-12 rounded-full shadow-sm lg:mx-auto lg:h-16 lg:w-16"
              />
              <div className="info ml-4 flex flex-col justify-center overflow-hidden lg:mt-6 lg:ml-0">
                <h1 className="hidden font-medium text-text lg:mx-auto lg:block lg:text-xl">
                  Nikhil Joshi
                </h1>
                <p className="mt-1 text-sm tracking-wide text-text lg:mx-auto lg:text-base lg:text-opacity-50">
                  Full stack developer
                </p>
                <p className="mt-2 text-xs tracking-wide text-text text-opacity-50 line-clamp-2 lg:mx-auto lg:hidden lg:text-center lg:text-base lg:line-clamp-none">
                  Software Developer | Typescript | NextJS | tRPC | Tailwind |
                  Prisma | ReactJS | React Native | Javascript | Docker | Full
                  stack | NodeJS | SpringBoot | AWS and still learning
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Blog;
