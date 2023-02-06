import { type NextPage } from "next";
import { SEO } from "../common";
import { Rubik } from "@next/font/google";
import Layout from "../layouts";
import Image from "next/image";
import clsx from "clsx";
import { addFont } from "../utils";

const rubik = Rubik({ subsets: ["latin"] });

const Home: NextPage = () => {
  return (
    <>
      <SEO />
      <Layout>
        <div className="flex-grow">
          <div className="centerContainer mx-auto mt-16 grid max-w-screen-lg items-center gap-16 lg:mt-60 lg:grid-cols-2">
            <Image
              src="/images/geometric.svg"
              width={400}
              height={400}
              alt="Geometric"
              className="mx-auto h-64 w-64 lg:h-80 lg:w-80"
            />
            <div className="textContainer px-12 lg:px-0">
              <h1
                className={addFont([
                  "text-5xl font-medium text-orange-600 lg:text-7xl",
                ])}
              >
                Hey there!
              </h1>
              <h1
                className={addFont([
                  "mt-2 text-4xl leading-snug text-text lg:mt-6 lg:text-5xl",
                ])}
              >
                I'm Nikhil Joshi, I love building tools on the web.
              </h1>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
