import { BlockObjectResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import React from "react";

export const getComponent: (block: PartialBlockObjectResponse | BlockObjectResponse) => React.ReactElement = (block) => {
    const fullBlock = block as BlockObjectResponse;
    if(fullBlock.)
};
