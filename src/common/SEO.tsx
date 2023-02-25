import Head from "next/head";

export const APP_NAME = "Nikhil Joshi";
export const APP_DESCRIPTION =
  "I'm a full stack engineer, with experience in building web apps that solve unique business requirements and help deliver value to a product that pushes a business to its heights";
export const APP_URL = "https://nikhilakjoshi.xyz";
const OG_IMAGE_URL = `https://imgur.com/KEBIkSG.png`;

interface SEOProps {
  title?: string;
  siteTitle?: string;
  description?: string;
  ogImage?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "",
  siteTitle = APP_NAME,
  description = APP_DESCRIPTION,
  ogImage = OG_IMAGE_URL,
}) => {
  const finalTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  return (
    <Head>
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:url" content={APP_URL} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="628" />
      <meta property="og:locale" content="en_US" />

      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content="@nikhilakjoshi" />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:text:title" content={finalTitle} />
      <meta property="twitter:description" content={description} />
      <meta name="twitter:site" content={siteTitle} />
      <meta name="twitter:url" content={APP_URL} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
    </Head>
  );
};

export default SEO;
