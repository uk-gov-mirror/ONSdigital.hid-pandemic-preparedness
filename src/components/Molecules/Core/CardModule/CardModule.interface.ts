import type { Asset } from "@src/types/Asset";
import type { StoryblokMultilink } from "@src/types/storyblok";

export interface CardModuleUnitOption {
  _uid: string;
  label: string;
  link: StoryblokMultilink;
}

export interface CardModuleProps {
  _uid: string;
  component?: "CardModule";
  title: string;
  subTitle: string;
  image?: Asset;
  moduleLink?: StoryblokMultilink;
  unitOptions?: CardModuleUnitOption[];
}
