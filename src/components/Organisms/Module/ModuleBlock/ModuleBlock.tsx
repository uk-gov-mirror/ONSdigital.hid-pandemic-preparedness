import clsx from "clsx";
import type { FC } from "react";

import { CardModule } from "@/src/components/Molecules/Core/CardModule/CardModule";
import type { ModuleBlockProps } from "./ModuleBlock.interface";
import styles from "./ModuleBlock.module.scss";

export const ModuleBlock: FC<ModuleBlockProps> = (props) => {
  return (
    <div className={clsx("w-100", "pb-4", styles["module-block-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        {props.title && (
          <div className={clsx("row", "py-4")}>
            <h3 className={clsx("heading-m")}>{props.title}</h3>
          </div>
        )}
        <div className={clsx("row", "g-4")}>
          {props.modules.map((module) => (
            <div
              key={module._uid}
              className={clsx("col-sm-6", "col-lg-5", "col-xl-3", "d-flex")}
            >
              <CardModule {...module} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
