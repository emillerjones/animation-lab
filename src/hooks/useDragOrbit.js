import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { createDragOrbit } from "../utils/dragOrbit";

// R3F wrapper around createDragOrbit: binds to the canvas element and hands back a ref
// so callers can read `.current.targetYaw` / `.current.targetPitch` imperatively inside
// useFrame, matching this codebase's refs-over-state convention for animation-driving values.
export default function useDragOrbit(options) {
  const { gl, invalidate } = useThree();
  const stateRef = useRef({ dragging: false, dragDistance: 0, targetYaw: 0, targetPitch: 0 });

  useEffect(() => {
    const { state, dispose } = createDragOrbit(gl.domElement, {
      ...options,
      onDrag: () => invalidate(),
    });
    stateRef.current = state;
    return dispose;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl]);

  return stateRef;
}
