import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import Theme from "prism-react-renderer/themes/nightOwl";
import React, { PropsWithChildren } from "react";
import { ChevronRight } from "react-feather";

export const getComponent: (
  block: PartialBlockObjectResponse | BlockObjectResponse
) => React.ReactElement | null = (block) => {
  const blk = block as BlockObjectResponse;
  switch (blk.type) {
    case "paragraph": {
      const node = blk.paragraph.rich_text[0]?.plain_text;
      return <Paragraph>{node}</Paragraph>;
    }
    case "heading_1": {
      const node = blk.heading_1.rich_text[0]?.plain_text;
      return <Head1>{node}</Head1>;
    }
    case "heading_2": {
      const node = blk.heading_2.rich_text[0]?.plain_text;
      return <Head2>{node}</Head2>;
    }

    case "heading_3": {
      const node = blk.heading_3.rich_text[0]?.plain_text;
      return <Head3>{node}</Head3>;
    }

    case "callout": {
      const node = blk.callout.rich_text[0]?.plain_text;
      const emoji =
        blk.callout.icon?.type === "emoji" ? blk.callout.icon.emoji : "⚡️";
      return (
        <div className="callout my-2 flex items-center gap-2 rounded bg-gray-100 p-2">
          <span>{emoji}</span>
          <span className="text-sm text-text text-opacity-75">{node}</span>
        </div>
      );
    }

    case "image": {
      const url =
        blk.image.type === "external"
          ? blk.image.external.url
          : "https://source.unsplash.com/random";
      return (
        <div className="embed">
          <Image
            src={url}
            width={1584}
            height={594}
            alt="cover-photo"
            className="mx-auto my-12 w-full object-cover object-center lg:max-w-screen-xl lg:rounded-lg "
          />
        </div>
      );
    }

    case "bookmark": {
      const url = blk.bookmark.url;
      return (
        <Link
          href={url}
          target="_blank"
          className="text-sm text-sky-600 transition-colors hover:text-primary hover:underline lg:text-base"
        >
          {url}
        </Link>
      );
    }

    case "divider": {
      return (
        <div className="relative my-4 h-12 w-full after:absolute after:top-1/2 after:h-[2px] after:w-full after:-translate-y-1/2 after:rounded-full after:bg-gradient-to-r after:from-primary after:to-green-700 after:opacity-50"></div>
      );
    }

    case "numbered_list_item": {
      const node = blk.numbered_list_item.rich_text[0]?.plain_text;
      return (
        <div className="listItem my-1 flex items-center text-sm lg:text-base">
          <ChevronRight size={18} />
          <span>{node}</span>
        </div>
      );
    }

    case "bulleted_list_item": {
      const node = blk.bulleted_list_item.rich_text[0]?.plain_text;
      return (
        <div className="listItem my-1 flex items-center text-sm lg:text-base">
          <ChevronRight size={18} />
          <span>{node}</span>
        </div>
      );
    }
    case "code": {
      const node = blk.code.rich_text[0]?.plain_text;
      return (
        <div className="codeBlock my-4">
          <Highlight
            {...defaultProps}
            code={node!}
            language={blk.code.language as Language}
            theme={Theme}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={clsx(
                  className,
                  "overflow-x-auto rounded px-2 py-6 font-jet text-xs lg:text-sm"
                )}
                style={style}
              >
                {tokens.map((line, i) => (
                  <div key={`comp-${i}`} {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span
                        key={`spn-${key}`}
                        {...getTokenProps({ token, key })}
                      />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      );
    }

    default: {
      return null;
    }
  }
};

const Paragraph: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <p className="my-4 text-sm tracking-wide text-text text-opacity-90 lg:text-base">
      {children}
    </p>
  );
};

const Head1: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <h1 className="mb-6 mt-4 text-xl font-bold text-text lg:text-3xl">
      {children}
    </h1>
  );
};

const Head2: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <h2 className="mb-4 mt-4 text-lg font-medium text-text lg:text-2xl">
      {children}
    </h2>
  );
};

const Head3: React.FC<PropsWithChildren> = ({ children }) => {
  return <h3 className="mb-2 mt-4 text-text lg:text-xl">{children}</h3>;
};
