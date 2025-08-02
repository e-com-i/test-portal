import { useEffect, useState } from "react";

/**
 * Hook to determine if the screen is mobile-sized.
 * @param breakpoint The pixel width to treat as the mobile threshold (default: 768)
 * @returns isMobile - boolean indicating whether the screen is considered mobile
 */
const useMobile = (breakpoint = 768): [boolean] => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Prevent running on the server
    const checkIsMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < breakpoint);
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, [breakpoint]);

  return [isMobile];
};

export default useMobile;
