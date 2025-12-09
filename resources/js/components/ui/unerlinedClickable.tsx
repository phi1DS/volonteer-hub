import { cn } from "@/lib/utils"

interface UnderlinedClickableProps {
  className?: string;
  buttonText: string;
  onClick: () => void;
}

function UnderlinedClickable({ className, buttonText, onClick }: UnderlinedClickableProps) {
  return (
    <button
      className={cn(
        "cursor-pointer text-sm font-normal text-muted-foreground underline underline-offset-4 hover:text-gray-800",
        className
      )}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}

export { UnderlinedClickable }
