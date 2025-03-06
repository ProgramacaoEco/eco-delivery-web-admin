import { useEffect, useState } from "react";

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Handler functions for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Set up event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Optional: Verify connection with a fetch request if needed
    const checkNetworkStatus = async () => {
      try {
        await fetch("https://httpbin.org/get", { cache: "no-cache" });
        if (!isOnline) setIsOnline(true);
      } catch {
        if (isOnline) setIsOnline(false);
      }
    };

    // Initial check in case browser's native detection is unreliable
    checkNetworkStatus();
    const interval = setInterval(checkNetworkStatus, 5000);

    // Cleanup function
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, [isOnline]);

  return isOnline;
};
