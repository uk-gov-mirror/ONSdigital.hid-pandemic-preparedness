import type { CardModuleProps } from "@src/components/Molecules/Core/CardModule/CardModule.interface";

export interface ModuleBlockProps {
  _uid: string;
  component?: "ModuleBlock";
  title?: string;
  modules: CardModuleProps[];
}
