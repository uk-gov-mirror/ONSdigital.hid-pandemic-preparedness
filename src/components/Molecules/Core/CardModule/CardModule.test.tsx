import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { CardModule } from "./CardModule";
import mockData from "./cardModule.json?raw";

const defaultProps = JSON.parse(mockData);

describe("CardModule", () => {
  it("renders the image, title, and summary copy", () => {
    render(<CardModule {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subTitle)).toBeInTheDocument();
    expect(screen.getByAltText(defaultProps.image.alt)).toBeInTheDocument();
  });

  it("hides the unit controls when there are not enough unit options", () => {
    render(
      <CardModule
        {...defaultProps}
        unitOptions={[defaultProps.unitOptions[0]]}
      />,
    );

    expect(screen.queryByLabelText("Units available:")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /View Unit/i })).not.toBeInTheDocument();
  });

  it("shows the CTA after a unit is selected", () => {
    render(<CardModule {...defaultProps} />);

    const select = screen.getByLabelText("Units available:");
    fireEvent.change(select, { target: { value: "unit-2" } });

    expect(screen.getByRole("link", { name: /View Unit/i })).toBeInTheDocument();
  });
});
