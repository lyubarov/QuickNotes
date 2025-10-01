import type { MouseEventHandler } from "react";

export type ButtonProps = {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variation?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  disabled?: boolean;
};
