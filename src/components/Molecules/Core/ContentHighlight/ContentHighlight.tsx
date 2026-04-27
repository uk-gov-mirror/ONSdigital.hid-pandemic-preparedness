import type { FC } from "react";
import clsx from "clsx";

import { Dynamic } from "@src/components/Organisms/Dynamic/Dynamic";

import type { ContentHighlightProps } from "./ContentHighlight.interface";
import styles from "./ContentHighlight.module.scss";

const EmbeddedContentArea: FC<ContentHighlightProps> = (props) => {
  return (
    <div
      className={clsx(
        "container-lg",
        "border",
        "rounded",
        "p-4",
        styles["embedded-content-container"],
      )}
    >
      {props.textarea?.map((blok: any) => (
        <Dynamic key={blok._uid} content={[blok]} />
      ))}
    </div>
  );
};

export const ContentHighlight: FC<ContentHighlightProps> = (props) => {
  return (
    <div className={clsx("w-100", "py-4", "container-lg")}>
      {props.highlightTitle && (
        <div className={clsx("rounded-top", styles["content-title"])}>
          <h4 className={clsx("heading-s", "m-0")}>{props.highlightTitle}</h4>
        </div>
      )}

      <div className={clsx("rounded-bottom", styles["content-container"])}>
        {props.textarea?.map((blok: any) => {
          if (blok.component === "ContentArea") {
            return <EmbeddedContentArea key={blok._uid} {...blok} />;
          } else {
            return <Dynamic key={blok._uid} content={[blok]} />;
          }
        })}
      </div>
    </div>
  );
};
