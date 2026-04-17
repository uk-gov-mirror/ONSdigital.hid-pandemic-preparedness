import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ModuleBlock } from "./ModuleBlock";
import mockData from "./moduleBlock.json?raw";

const defaultProps = JSON.parse(mockData);

describe("ModuleBlock", () => {
  it("renders the block title and module cards", () => {
    render(<ModuleBlock {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.modules[0].title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.modules[1].title)).toBeInTheDocument();
  });
});
