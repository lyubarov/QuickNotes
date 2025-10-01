import Button from "../Button/Button";
import { CLASSNAMES } from "./classnames";

import type { NoteCardProps } from "./type";

export default function NoteCard({
  id,
  title,
  content,
  tags,
  createdAt,
  updatedAt,
  onEdit,
  onDelete,
}: NoteCardProps) {
  return (
    <div className={CLASSNAMES.WRAPPER}>
      <h2 className={CLASSNAMES.TITLE}>{title}</h2>
      <p className={CLASSNAMES.CONTENT}>{content}</p>
      {tags && tags.length > 0 && (
        <div className={CLASSNAMES.CONTAINER}>
          {tags.map((tag) => (
            <span key={tag} className={CLASSNAMES.TAGS}>
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className={CLASSNAMES.DATES}>
        <span>Created: {createdAt?.split("T")[0]}</span>
        <span>Updated: {updatedAt?.split("T")[0]}</span>
      </div>
      <div className={CLASSNAMES.CONTROLS}>
        {onEdit && (
          <Button handleClick={() => onEdit(id)} variation="edit">
            Edit
          </Button>
        )}
        {onDelete && (
          <Button handleClick={() => onDelete(id)} variation="delete">
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
