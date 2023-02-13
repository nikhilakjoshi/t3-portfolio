import { type AppType } from "next/dist/shared/lib/utils";
import "../styles/globals.css";
import { Rubik } from "@next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={rubik.className}>
      <Component {...pageProps} />;
    </div>
  );
};

export default MyApp;
