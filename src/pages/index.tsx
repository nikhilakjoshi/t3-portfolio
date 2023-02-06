import { type NextPage } from "next";
import { SEO } from "../common";
import { Rubik } from "@next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const Home: NextPage = () => {
  return (
    <>
      <SEO />
    </>
  );
};

export default Home;
