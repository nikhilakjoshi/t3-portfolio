import React from "react";
import { TypeOf } from "zod";
import { projects } from "../constants";

const Project: React.FC<{ project: (typeof projects)[0] }> = ({ project }) => {
  return <div>{project.title}</div>;
};

export default Project;
