import clsx from "clsx";
import type { ChangeEvent, FC } from "react";
import { useId, useState } from "react";

import { Image } from "@src/components/Molecules/Core/Image/Image";
import { Link } from "@components/Molecules/Core/Link/Link";

import type { CardModuleProps } from "./CardModule.interface";
import styles from "./CardModule.module.scss";

export const CardModule: FC<CardModuleProps> = (props) => {
  const selectId = useId();
  const unitOptions = props.unitOptions ?? [];
  const hasSelectableUnits = unitOptions.length > 1;
  const [selectedUnitId, setSelectedUnitId] = useState<string>("");

  const selectedUnit = unitOptions.find((option) => option.link.id === selectedUnitId);

  const handleUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUnitId(event.target.value);
  };

  return (
    <div
      className={clsx(
        "card",
        "shadow",
        "p-2",
        "rounded-4",
        styles["card-module"],
      )}
    >
      <div className={clsx("card-body", "d-flex", "flex-column", "gap-3")}>
        {props.image?.filename && (
          <Image
            {...props.image}
            className={clsx("card-img-top", styles["card-module-image"])}
          />
        )}

        <div>
          <h3 className={clsx("card-title", styles["title-height"])}>
            <span className={clsx("fw-semibold", styles["card-module-title"])}>
              {props.title}
            </span>
          </h3>
          <p className={clsx("card-text", "mb-0")}>{props.subTitle}</p>
        </div>

        {hasSelectableUnits && (
          <div className={clsx("mt-auto", "pt-2", styles["controls"])}>
            <label className={clsx("fw-bold", "mb-2")} htmlFor={selectId}>
              Units available:
            </label>
            <select
              className={clsx("form-select", styles["card-module-select"])}
              defaultValue=""
              id={selectId}
              onChange={handleUnitChange}
            >
              <option disabled value="">
                Select a unit
              </option>
              {unitOptions.map((option) => (
                <option key={option._uid} value={option.link.id}>
                  {option.label}
                </option>
              ))}
            </select>

            {selectedUnit && (
              <div className={clsx("mt-3")}>
                <Link
                  {...selectedUnit.link}
                  asButton={true}
                  buttonVariant="secondary"
                  className={styles["card-module-cta"]}
                  label="View Unit"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
