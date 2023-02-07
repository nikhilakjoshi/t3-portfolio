import React from "react";
import { ArrowRight } from "react-feather";
import { projects } from "../constants";

const Project: React.FC<{ project: (typeof projects)[0] }> = ({ project }) => {
  return (
    <div className="my-16 grid gap-8 lg:grid-cols-2 lg:gap-16">
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
            <button className="group flex items-center gap-1 text-primary">
              <span className="text-lg font-medium">View Project</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
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
    </div>
  );
};

export default Project;
