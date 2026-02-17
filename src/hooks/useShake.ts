import { useEffect, useRef, useState } from "react";

type ShakeOptions = {
  enabled: boolean;
  cooldownMs?: number;
  threshold?: number;
  onShake: () => void;
};

export type MotionPermissionState = "unknown" | "granted" | "denied" | "unsupported";

export function useShake({ enabled, cooldownMs = 1200, threshold = 16, onShake }: ShakeOptions) {
  const lastFire = useRef(0);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "DeviceMotionEvent" in window);
  }, []);

  useEffect(() => {
    if (!enabled || !supported) {
      return;
    }

    let last = { x: 0, y: 0, z: 0 };

    const handler = (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc) {
        return;
      }

      const x = acc.x ?? 0;
      const y = acc.y ?? 0;
      const z = acc.z ?? 0;

      const dx = Math.abs(x - last.x);
      const dy = Math.abs(y - last.y);
      const dz = Math.abs(z - last.z);
      const intensity = dx + dy + dz;

      last = { x, y, z };

      const now = Date.now();
      if (intensity > threshold && now - lastFire.current > cooldownMs) {
        lastFire.current = now;
        onShake();
      }
    };

    window.addEventListener("devicemotion", handler, { passive: true });
    return () => {
      window.removeEventListener("devicemotion", handler);
    };
  }, [enabled, supported, cooldownMs, threshold, onShake]);

  return { supported };
}

export async function requestMotionPermission(): Promise<"granted" | "denied" | "unsupported"> {
  const anyMotion = DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> };
  if (!anyMotion.requestPermission) {
    return "unsupported";
  }

  try {
    const result = await anyMotion.requestPermission();
    return result === "granted" ? "granted" : "denied";
  } catch {
    return "denied";
  }
}
