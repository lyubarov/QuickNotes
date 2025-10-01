export type NoteCardProps = {
  id: number;
  title: string;
  content: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};
