import { CLASSNAMES } from "./classnames";
import type { ButtonProps } from "./type";

export default function Button({
  children,
  type = "button",
  variation = "main",
  handleClick,
  disabled,
}: ButtonProps) {
  let className = CLASSNAMES.MAIN_BTN;

  switch (variation) {
    case "delete":
      className = CLASSNAMES.DELETE_BTN;
      break;
    case "edit":
      className = CLASSNAMES.EDIT_BTN;
      break;
    default:
      className = CLASSNAMES.MAIN_BTN;
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
}
