import { InferGetStaticPropsType, type NextPage } from "next";
import { SEO } from "../common";
import Layout from "../layouts";
import Image from "next/image";
import { addFont } from "../utils";
import { projects } from "../constants";
import { ArrowRight, Lock } from "react-feather";

import { GetStaticProps } from "next";
import React from "react";
import Link from "next/link";

export const getStaticProps: GetStaticProps<{
  projects: typeof projects;
}> = () => {
  const projs = projects;
  return {
    props: {
      projects: projs,
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  projects,
}) => {
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

const Project: React.FC<{
  project: {
    id: number;
    title: string;
    subtitle: string;
    description: string[];
    github: string;
    projLink: string;
    techStack: string[];
    imageLink: string;
  };
}> = ({ project }) => {
  return (
    <React.Fragment>
      <div className="my-16 mx-auto grid max-w-screen-lg gap-8  px-8 lg:grid-cols-2 lg:gap-16">
        <div className="title flex gap-4">
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className="mt-6 flex-shrink-0"
          >
            <circle cx="50%" cy="50%" r="10" className="fill-primary" />
          </svg>
          <div className="flex flex-col">
            <div className="text-3xl font-bold lg:text-5xl">
              <span className="capitalize leading-snug text-text">
                {project.title}
              </span>
            </div>
            <span className="mt-2 uppercase text-text text-opacity-50 lg:mb-8">
              {project.subtitle}
            </span>
            <div className="actions mt-8 lg:mt-auto">
              <SmartLink href={project.projLink} />
            </div>
          </div>
        </div>
        <div className="content ml-10 lg:ml-0">
          {project.description.map((item, i) => (
            <p
              key={`desc-${i}`}
              className="mb-4 text-lg font-light tracking-wide text-text last:mb-0 lg:text-2xl"
            >
              {item}
            </p>
          ))}
        </div>
        <div className="lg:col-span-2">
          <div className="imageWrapper overflow-hidden">
            <Image
              src={project.imageLink}
              alt={project.title}
              width={1600}
              height={1000}
              className="aspect-[16/10]"
            />
          </div>
        </div>
      </div>
      <div className="border-b lg:mx-8"></div>
    </React.Fragment>
  );
};

const SmartLink: React.FC<{ href: string }> = ({ href }) => {
  if (href === "#" || href === "")
    return (
      <button
        disabled
        className="group flex items-center gap-1 text-primary disabled:text-gray-500 disabled:text-opacity-50 disabled:line-through"
      >
        <span className="text-lg font-medium">View Project</span>
        <Lock
          size={16}
          className="transition-transform group-hover:translate-x-1 group-disabled:translate-x-0 group-disabled:transition-none"
        />
      </button>
    );
  return (
    <Link href={href} target="_blank">
      <button className="group flex items-center gap-1 text-primary disabled:text-gray-500 disabled:text-opacity-50 disabled:line-through">
        <span className="text-lg font-medium">View Project</span>
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1 group-disabled:translate-x-0 group-disabled:transition-none"
        />
      </button>
    </Link>
  );
};

export default Home;
