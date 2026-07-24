import { cn } from "@/lib/utils";

interface LoadingProps {
  text?: string;

  fullScreen?: boolean;

  className?: string;
}

export function Loading({
  text = "Loading...",

  fullScreen = false,

  className,
}: LoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",

        fullScreen && "min-h-screen",

        className,
      )}
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-(--primary) border-t-transparent" />

      <p className="text-sm text-slate-400">{text}</p>
    </div>
  );
}
