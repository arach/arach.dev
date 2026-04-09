import Link from "next/link";
import type { ComponentProps } from "react";

import { Callout } from "./callout";
import { DirectoryTree } from "./directory-tree";
import { LayerRolesTable } from "./layer-roles-table";
import { PrinciplesGrid } from "./principles-grid";

export const ideaMdxComponents = {
  Callout,
  DirectoryTree,
  LayerRolesTable,
  PrinciplesGrid,
  a: ({ href = "", children, ...props }: ComponentProps<"a">) => {
    if (href.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }

    return <a href={href} target="_blank" rel="noreferrer" {...props}>{children}</a>;
  },
};
