import { LoaderCircle } from 'lucide-react';

type LoadingProps = {
  size?: number;
  message?: string;
};

export function Loading({ size = 32, message }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <LoaderCircle className="text-primary animate-spin" size={size} />
      {message && <span className="text-muted-foreground text-sm">{message}</span>}
    </div>
  );
}
