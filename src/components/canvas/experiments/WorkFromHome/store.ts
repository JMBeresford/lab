import { create } from "zustand";

const VIEW = {
  Start: "start",
  Main: "main",
  About: "about",
  Works: "works",
  Lab: "lab",
  Socials: "socials",
  Desk: "desk",
} as const;

export type VIEW = typeof VIEW[keyof typeof VIEW];

type ExperimentStore = {
  emailHovered: boolean;
  instaHovered: boolean;
  linkedinHovered: boolean;
  githubHovered: boolean;

  ipadTopHovered: boolean;
  ipadMiddleHovered: boolean;
  ipadBottomHovered: boolean;

  view: VIEW;
};

export const useExperimentStore = create<ExperimentStore>()((set) => ({
  emailHovered: false,
  instaHovered: false,
  linkedinHovered: false,
  githubHovered: false,

  ipadTopHovered: false,
  ipadMiddleHovered: false,
  ipadBottomHovered: false,

  view: VIEW.Main,
}));
