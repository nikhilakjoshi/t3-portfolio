import { type NextPage } from "next";
import { SEO } from "../common";
import Layout from "../layouts";

const About: NextPage = () => {
  return (
    <>
      <SEO />
      <Layout>
        <div className="mx-auto my-24 grid max-w-screen-xl flex-grow px-8 lg:grid-cols-2">
          <div className="aboutme flex gap-4">
            <svg
              width={24}
              height={24}
              className="mt-4 hidden flex-shrink-0 fill-sky-500 lg:block"
              viewBox="0 0 100 100"
            >
              <rect
                width="100%"
                height="100%"
                x1={0}
                x2="100%"
                y1={0}
                y2="100%"
              />
            </svg>
            <div className="flex flex-col">
              <h1 className="mb-8 text-3xl font-medium lg:text-5xl">
                <span className="leading-tight">
                  Hi, my name is Nikhil. I'm a software delveloper based in
                  Bangalore, India.
                </span>
              </h1>
              <p className="text-lg font-light lg:text-2xl">
                <span className="leading-relaxed">
                  I'm a full stack engineer, with experience in building web
                  apps that solve unique business requirements and help deliver
                  value to a product that pushes a business to its heights
                </span>
              </p>
            </div>
          </div>
          <div className="info my-8 grid w-full grid-cols-3 gap-2 text-lg font-light lg:my-0 lg:text-2xl">
            <div className="col-span-2 col-start-1 col-end-[-1] leading-loose lg:col-start-2">
              <h5 className="mb-4 font-bold underline">What I know</h5>
              <ul className="grid grid-cols-2 gap-1 tracking-wide">
                <li>Typescript</li>
                <li>React</li>
                <li>React Native</li>
                <li>Vue</li>
                <li>Node JS</li>
                <li>Express JS</li>
                <li>Next JS</li>
                <li>Docker</li>
                <li>Tailwind CSS</li>
                <li>Bootstrap</li>
                <li>Prisma</li>
                <li>tRPC</li>
                <li>Java SpringBoot</li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;
