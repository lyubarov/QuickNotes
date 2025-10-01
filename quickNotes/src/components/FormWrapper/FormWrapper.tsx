import { CLASSNAMES } from "./classnames";

import type { FormWrapperProps } from "./type";

export default function FormWrapper({
  title,
  form,
  additional,
}: FormWrapperProps) {
  return (
    <div className={CLASSNAMES.WRAPPER}>
      <div className={CLASSNAMES.CONTAINER}>
        <h1 className={CLASSNAMES.TITLE}>{title}</h1>
        {form}
        {additional}
      </div>
    </div>
  );
}
