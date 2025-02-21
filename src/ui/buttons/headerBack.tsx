"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
  onClick?: () => void;
}

export default function HeaderBackButton({ className, onClick }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <span
      className={clsx(className, "p-3 -m-2 flex items-center w-fit")}
      onClick={onClick || handleClick}
    >
      <span>{"->"}</span>
      <i className="pi pi-right text-base"></i>
    </span>
  );
}
