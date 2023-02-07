import { type NextPage } from "next";
import { SEO } from "../common";
import Layout from "../layouts";
import Image from "next/image";
import { addFont } from "../utils";
import { projects } from "../constants";
import Project from "./_project";

const About: NextPage = () => {
  return (
    <>
      <SEO />
      <Layout>
        <div className="flex-grow">Hello</div>
      </Layout>
    </>
  );
};

export default About;
