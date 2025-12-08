import { useEffect } from "react";
import type { ReactNode } from "react";

interface TinaProviderProps {
  children: ReactNode;
}

export function TinaProvider({ children }: TinaProviderProps) {
  useEffect(() => {
    // Tina CMS will be available at /admin route
    // The admin interface is served by the Tina CLI during development
    if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
      // Tina admin is handled by the CLI
      return;
    }
  }, []);

  return <>{children}</>;
}

