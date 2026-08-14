import { FileQuestion } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className="panel flex flex-col items-center gap-3 border-dashed py-14 text-center">
    <FileQuestion className="h-6 w-6 text-muted-foreground" aria-hidden />
    <p className="text-sm font-medium text-foreground">{title}</p>
    <p className="max-w-md text-sm text-muted-foreground">{description}</p>
  </div>
);

export default EmptyState;
