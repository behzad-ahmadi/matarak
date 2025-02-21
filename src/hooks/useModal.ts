"use client";

import useHash from "@/hooks/useHash";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface HandleOpenOptions {
  replace?: boolean;
}

interface Props {
  hash?: string;
}

const useModal = ({ hash = "" }: Props = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const urlHash = useHash().split("-")[0];

  const handleOpen = ({ replace = false }: HandleOpenOptions = {}) => {
    const path = `${pathname}${hash}`;

    if (hash.length > 0) {
      if (replace) router.replace(path, { scroll: false });
      else window.history.pushState(null, "", `${path}`);
      // router.push(path, { scroll: false })
    } else setIsOpen(true);
  };

  const handleClose = () => {
    // console.log('Hash', hash)
    // console.log('urlHash', urlHash)
    // console.log('iopen', isOpen)
    if (!hash && isOpen) {
      setIsOpen(false);
      return;
    }

    // if (hash.length > 0) router.replace(pathname)
    if (urlHash == hash && hash != "") router.back();
  };

  useEffect(() => {
    if (!hash) return;

    setIsOpen(urlHash == hash);
  }, [pathname, hash, urlHash]);

  return { isOpen, handleClose, handleOpen };
};

export default useModal;
