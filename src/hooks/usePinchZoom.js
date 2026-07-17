import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createPinchZoom } from "../utils/pinchZoom";

// R3F wrapper around createPinchZoom: mutates a caller-owned distance ref directly (clamped
// to [min, max]) so the rig's own useFrame can damp toward it, the same refs-over-state
// convention useDragOrbit already uses for camera-driving values.
export default function usePinchZoom({ targetDistanceRef, min, max, invalidate }) {
  const { gl } = useThree();

  useEffect(() => {
    const { dispose } = createPinchZoom(gl.domElement, {
      onZoom: (factor) => {
        targetDistanceRef.current = THREE.MathUtils.clamp(targetDistanceRef.current * factor, min, max);
        invalidate?.();
      },
    });
    return dispose;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, min, max]);
}
