import React from "react";
import { ArrowRight, Lock } from "react-feather";
import Image from "next/image";
import { projects } from "../constants";
import Link from "next/link";

const Project: React.FC<{ project: (typeof projects)[0] }> = ({ project }) => {
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

export default Project;
