import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";
import Highlight, { defaultProps } from "prism-react-renderer";
import Theme from "prism-react-renderer/themes/github";
import React, { PropsWithChildren } from "react";

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

    case "code": {
      const node = blk.code.rich_text[0]?.plain_text;
      return (
        <div className="codeBlock">
          <Highlight
            {...defaultProps}
            code={node!}
            // language={blk.code.language as Language}
            theme={Theme}
            language="tsx"
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={clsx(
                  className,
                  "rounded px-2 py-6 font-jet text-sm"
                )}
                style={style}
              >
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
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
    <p className="text-sm text-text text-opacity-75 lg:text-base">{children}</p>
  );
};

const Head1: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <h1 className="mb-6 text-xl font-bold text-text lg:text-3xl">{children}</h1>
  );
};

const Head2: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <h2 className="mb-4 text-lg font-medium text-text lg:text-2xl">
      {children}
    </h2>
  );
};

const Head3: React.FC<PropsWithChildren> = ({ children }) => {
  return <h3 className="mb-2 text-text lg:text-xl">{children}</h3>;
};
