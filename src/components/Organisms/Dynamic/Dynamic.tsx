import type { FC } from "react";

import { Code } from "@src/components/Molecules/Core/Code/Code";
import { ContentHighlight } from "@src/components/Molecules/Core/ContentHighlight/ContentHighlight";
import { TextModule } from "@src/components/Molecules/Core/TextModule/TextModule";
import { Table } from "@/src/components/Molecules/Core/Table/Table";
import { Iframe } from "@src/components/Organisms/Core/Iframe/Iframe";
import { Formula } from "@src/components/Molecules/Core/Formula/Formula";
import { Video } from "@src/components/Organisms/Core/Video/Video";
import { Tip } from "@src/components/Molecules/Core/Tip/Tip";

type ComponentName =
  | "Code"
  | "Formula"
  | "Iframe"
  | "Table"
  | "Tip"
  | "Video";

export const COMPONENT_MAP: Record<ComponentName, FC<any>> = {
  Code,
  Iframe,
  Table,
  Formula,
  Video,
  Tip,
};

type blok = any;

interface DynamicProps {
  content: blok[];
}

function isComponentName(value: string): value is ComponentName {
  return ["Code", "Formula", "Iframe", "Table", "Tip", "Video"].includes(
    value,
  );
}

export const Dynamic: FC<DynamicProps> = ({ content }) => {
  const components = content.map((blok: blok) => {
    const componentName = blok.component;

    if (componentName === "RichText") {
      return <TextModule key={blok._uid} richText={blok.content} />;
    } else if (componentName === "ContentHighlight") {
      return <ContentHighlight key={blok._uid} {...blok} />;
    } else if (isComponentName(componentName)) {
      const Component = COMPONENT_MAP[componentName];
      return <Component key={blok._uid} {...blok} />;
    } else {
      console.warn(
        `Component '${componentName}' is invalid inside of Dynamic.`,
      );
      return null;
    }
  });

  return <>{components}</>;
};
