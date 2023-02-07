import { type NextPage } from "next";
import { SEO } from "../common";
import Layout from "../layouts";
import Image from "next/image";
import { addFont } from "../utils";
import { projects } from "../constants";
import Project from "./_project";

const Home: NextPage = () => {
  return (
    <>
      <SEO />
      <Layout>
        <div className="flex-grow">
          <section className="landing mx-auto mt-16 mb-48 grid max-w-screen-lg items-center gap-16 px-8 lg:mt-60 lg:grid-cols-2">
            <Image
              src="/images/geometric.svg"
              width={400}
              height={400}
              alt="Geometric"
              // className="h-64 w-64 lg:h-80 lg:w-80"
              className="mx-auto h-64 w-64 lg:mx-0 lg:h-80 lg:w-80"
            />
            <div className="textContainer">
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
                I&apos;m Nikhil Joshi, I love building tools on the web.
              </h1>
            </div>
          </section>
          <div className="border-b lg:mx-8"></div>
          <section className="projects my-24">
            {projects.map((project) => (
              <Project key={project.id} project={project} />
            ))}
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Home;
