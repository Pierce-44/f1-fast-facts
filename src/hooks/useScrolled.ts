"use client";
import React from "react";

export default function useCalendarScrolled() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  const handleScroll = () => {
    const calendar = document.getElementById("calendar-scroll");

    if (calendar && calendar?.scrollTop > 70) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  React.useEffect(() => {
    const calendar = document.getElementById("calendar-scroll");

    handleScroll();
    calendar?.addEventListener("scroll", handleScroll);
    return () => {
      calendar?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isScrolled };
}
