import React from "react";

export default function useForumResize() {
  const [showMenuButton, setShowMenuButton] = React.useState(false);

  const handleResize = () => {
    if (window && window?.innerWidth <= 1080) {
      setShowMenuButton(true);
    } else {
      setShowMenuButton(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    showMenuButton,
  };
}
