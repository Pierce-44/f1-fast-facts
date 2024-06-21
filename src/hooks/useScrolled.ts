"use client";
import React from "react";

export default function useCalendarScrolled(elementId: string) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  const handleScroll = () => {
    const calendar = document.getElementById(elementId);

    if (calendar && calendar?.scrollTop > 56) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  React.useEffect(() => {
    const calendar = document.getElementById(elementId);

    handleScroll();
    calendar?.addEventListener("scroll", handleScroll);
    return () => {
      calendar?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isScrolled };
}
