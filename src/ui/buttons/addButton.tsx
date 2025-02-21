"use client";

import Button from "@/ui/buttons/button";
import clsx from "clsx";

interface Props {
  className?: string;
  onClick?: () => void;
  text: string;
}

export default function AddButton({ className, onClick, text }: Props) {
  return (
    <Button
      type="button"
      className={clsx(
        "btn-neutral w-full border-1 border-dashed border-text-light max-w-md",
        className,
      )}
      onClick={onClick}
    >
      +<span className="text-base font-bold">{text}</span>
    </Button>
  );
}
