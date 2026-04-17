import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";

import { CardModule } from "./CardModule";
import type { CardModuleProps } from "./CardModule.interface";
import cardModuleData from "./cardModule.json?raw";

const defaultArgs = JSON.parse(cardModuleData) as CardModuleProps;

const meta = {
  component: CardModule,
  title: "Molecules/Core/CardModule",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    image: {
      table: {
        disable: true,
      },
    },
    unitOptions: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof CardModule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardModuleStory = {
  args: defaultArgs,
  name: "CardModule",
} satisfies Story;

export const HiddenControls = {
  args: {
    ...defaultArgs,
    unitOptions: [defaultArgs.unitOptions?.[0]].filter(Boolean),
  },
  name: "HiddenControls",
} satisfies Story;

export const KeyboardSelection = {
  args: defaultArgs,
  name: "KeyboardSelection",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.tab();
    await userEvent.selectOptions(canvas.getByLabelText("Units available:"), "unit-2");

    await expect(
      canvas.getByRole("link", { name: /View Unit/i }),
    ).toBeInTheDocument();
  },
} satisfies Story;
