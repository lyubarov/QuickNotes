import { CLASSNAMES } from "./classnames";
import type { DropDownProps } from "./type";

export default function DropDown({
  allTags,
  filterTag,
  setFilterTag,
}: DropDownProps) {
  return (
    <select
      className={CLASSNAMES.CONTAINER}
      value={filterTag}
      onChange={(e) => setFilterTag(e.target.value)}
    >
      <option value="">All tags</option>
      {allTags.map((tag) => (
        <option key={tag} value={tag}>
          {tag}
        </option>
      ))}
    </select>
  );
}
