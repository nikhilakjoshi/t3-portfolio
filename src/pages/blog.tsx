import { type NextPage } from "next";
import { SEO } from "../common";
import Layout from "../layouts";

const Blog: NextPage = () => {
  return (
    <>
      <SEO />
      <Layout>
        <div className="mx-auto my-24 grid max-w-screen-xl flex-grow px-8">
          <span className="animate-pulse text-lg font-light tracking-wide text-text text-opacity-50">
            Blogs coming soon...
          </span>
        </div>
      </Layout>
    </>
  );
};

export default Blog;
