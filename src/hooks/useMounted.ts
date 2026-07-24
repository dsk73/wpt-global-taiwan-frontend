"use client";

import { useEffect, useState } from "react";

/**
 * Returns true once the component has mounted.
 * Useful for preventing hydration mismatches.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return mounted;
}