import { CLASSNAMES } from "./classnames";
import type { InputProps } from "./type";

export default function Input({
  change,
  placeholder,
  type,
  variation,
  id,
  value,
}: InputProps) {
  return (
    <input
      type={type}
      onChange={change}
      placeholder={placeholder}
      id={id}
      value={value}
      className={CLASSNAMES.MAIN_INPUT}
    />
  );
}
