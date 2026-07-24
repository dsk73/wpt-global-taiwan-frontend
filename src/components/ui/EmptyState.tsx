import { SearchX } from "lucide-react";

import { Button } from "./Button";

interface EmptyStateProps {
  title?: string;

  description?: string;

  buttonText?: string;

  onButtonClick?: () => void;
}

export function EmptyState({
  title = "Nothing Found",

  description = "No data is available right now.",

  buttonText,

  onButtonClick,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/2 px-8 py-20 text-center">
      <SearchX className="mb-6 text-slate-500" size={56} />

      <h3 className="text-2xl font-semibold text-white">{title}</h3>

      <p className="mt-4 max-w-md text-slate-400">{description}</p>

      {buttonText && (
        <Button className="mt-8" onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}
