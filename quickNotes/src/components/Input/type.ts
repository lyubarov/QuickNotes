export type InputProps = {
  change?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  variation?: "Login";
  id: string;
  value: string;
};
