import Image from "next/image";
import Link from "next/link";

interface Props {
  setLoginPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginPopUp({ setLoginPopUp }: Props) {
  return (
    <div className="fixed top-0 left-0 h-full w-full bg-[#00000091] dark:bg-[#000000c7] z-[1000] flex items-center justify-center">
      <div className="p-10 pt-0 bg-white dark:bg-[#414141] rounded-md flex flex-col items-center gap-4">
        <button
          onClick={() => setLoginPopUp(false)}
          className="w-full pt-6 pb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="ml-auto fill-black dark:fill-white h-8 w-8 hover:rotate-90 transition-all"
          >
            <path d="M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z" />
          </svg>
        </button>
        <div className="flex items-center justify-start gap-4 mb-5">
          <Image alt="website logo" src="/ufo.webp" height={36} width={36} />
          <p
            className={`font-semibold text-2xl dark:text-white text-nowrap transition-opacity duration-700`}
          >
            F1 Fast Facts
          </p>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          To send forum messages
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Please login using your google account
        </p>
        <Link
          href="/api/auth/login"
          className="w-full text-center py-2 mt-7 text-white rounded-md bg-[#5d87ff] hover:bg-[#4f73d9] transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
