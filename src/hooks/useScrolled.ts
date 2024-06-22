"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function useScrolled() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  const pathname = usePathname();

  const handleScroll = () => {
    const parts = pathname.split("/");
    const filteredParts = parts.filter((part) => part !== "");
    const firstItem = filteredParts[0];

    const page = document.getElementById(`${firstItem}-scrolled`);

    if (page && page?.scrollTop > 56) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  React.useEffect(() => {
    const parts = pathname.split("/");
    const filteredParts = parts.filter((part) => part !== "");
    const firstItem = filteredParts[0];

    const page = document.getElementById(`${firstItem}-scrolled`);

    handleScroll();
    page?.addEventListener("scroll", handleScroll);
    return () => {
      page?.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return { isScrolled };
}
