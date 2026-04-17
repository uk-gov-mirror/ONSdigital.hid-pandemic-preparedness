import type { Meta, StoryObj } from "@storybook/react";

import moduleBlockData from "./moduleBlock.json?raw";

import { ModuleBlock } from "./ModuleBlock";
import type { ModuleBlockProps } from "./ModuleBlock.interface";

const meta = {
  component: ModuleBlock,
  title: "Organisms/Module/ModuleBlock",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    modules: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof ModuleBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModuleBlockStory = {
  name: "ModuleBlock",
  args: JSON.parse(moduleBlockData) as ModuleBlockProps,
} satisfies Story;
