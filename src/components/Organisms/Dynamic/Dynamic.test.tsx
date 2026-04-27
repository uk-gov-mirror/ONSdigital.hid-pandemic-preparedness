import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@src/components/Molecules/Core/Code/Code", () => ({
  Code: ({ title }: { title?: string }) => (
    <div data-testid="code-component">{title}</div>
  ),
}));

import { Dynamic } from "./Dynamic";

const codeBlok = {
  _uid: "code-uid",
  title: "Example code block",
  component: "Code",
  languages: [
    {
      _uid: "code-language-uid",
      code: "print('hello world')",
      label: "Python example",
      language: "Python",
      component: "Code Language",
    },
  ],
} as const;

const contentHighlightWithCodeBlok = {
  _uid: "content-highlight-uid",
  component: "ContentHighlight",
  highlightTitle: "Highlight title",
  textarea: [codeBlok],
} as const;

describe("Dynamic", () => {
  it("renders Code bloks passed directly in unit section content", () => {
    render(<Dynamic content={[codeBlok]} />);

    expect(screen.getByTestId("code-component")).toHaveTextContent(
      codeBlok.title,
    );
  });

  it("renders Code bloks nested inside ContentHighlight wrappers", () => {
    render(<Dynamic content={[contentHighlightWithCodeBlok]} />);

    expect(screen.getByTestId("code-component")).toHaveTextContent(
      codeBlok.title,
    );
  });
});