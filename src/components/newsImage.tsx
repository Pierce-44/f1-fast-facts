"use client";
import React from "react";

export default function NewsImage({ urlToImage }: { urlToImage: string }) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!urlToImage || urlToImage.length === 0) return;

    // Create a new Image object and set the onload and onerror handlers
    const img = new Image();
    img.src = urlToImage;
    img.onload = () => setLoading(false);
    img.onerror = () => setLoading(false); // Handle the error state if needed
  }, [urlToImage]);

  return (
    <div className="relative w-full h-[150px] overflow-hidden rounded-md">
      {loading ? (
        <div className="flex justify-center items-center w-full h-full bg-slate-300 animate-pulse"></div>
      ) : (
        <img
          className="w-full h-full object-cover bg-gray-200 group-hover:scale-110 transition-all duration-500"
          src={urlToImage}
        />
      )}
    </div>
  );
}
