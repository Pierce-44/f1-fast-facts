import { useEffect } from "react";
import * as atoms from "@/util/atoms";
import { useAtom } from "jotai";

function useDarkMode() {
  const [, setDarkMode] = useAtom(atoms.darkMode);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const localStorageValue = localStorage.getItem("darkMode");

    if (localStorageValue !== null) {
      setDarkMode(JSON.parse(localStorageValue));
    } else {
      setDarkMode(mediaQuery.matches);
    }
  }, []);
}

export default useDarkMode;
