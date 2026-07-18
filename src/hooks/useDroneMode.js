import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Free-fly "drone" camera: WASD to move on the current look direction's
// horizontal plane, Q/E (or Space/Shift) for vertical, mouse-drag (via the
// same dragRef a piece's normal orbit camera already uses from useDragOrbit)
// to look around. Extracted from River of Wishes' original inline
// implementation so other pieces can opt in without duplicating it.
//
// `dragRef` is a ref shaped like useDragOrbit's return value
// (`{ targetYaw, targetPitch }`) — pass the SAME ref the piece already uses
// for its default orbit camera. This hook repurposes those same drag deltas
// as look-around while drone mode is active, and resets them to 0 whenever
// drone mode toggles so the orbit camera doesn't jump when it resumes.
//
// Movement/bounds are in the piece's own world units, so every caller should
// pass `bounds` sized to its own scene footprint — the defaults are only
// sane for a scene roughly on River of Wishes' scale.
export default function useDroneMode({
  enabled,
  dragRef,
  moveSpeed = 15,
  bounds = { x: 120, yMin: 0.8, yMax: 90, z: 120 },
}) {
  const { camera, gl } = useThree();
  const keysRef = useRef(new Set());
  const lookRef = useRef({ yaw: 0, pitch: 0 });

  useEffect(() => {
    if (enabled) {
      const forward = camera.getWorldDirection(new THREE.Vector3());
      lookRef.current.yaw = Math.atan2(forward.x, forward.z);
      lookRef.current.pitch = Math.asin(THREE.MathUtils.clamp(forward.y, -1, 1));
    }
    if (dragRef?.current) {
      dragRef.current.targetYaw = 0;
      dragRef.current.targetPitch = 0;
    }
    keysRef.current.clear();
  }, [camera, enabled, dragRef]);

  useEffect(() => {
    const keys = keysRef.current;
    const onKeyDown = (event) => {
      if (!enabled || event.repeat) return;
      const key = event.code === "Space" ? "space" : event.key.toLowerCase();
      if (["w", "a", "s", "d", "q", "e", "space", "shift"].includes(key)) {
        keys.add(key);
        event.preventDefault();
      }
    };
    const onKeyUp = (event) => keys.delete(event.code === "Space" ? "space" : event.key.toLowerCase());
    const onBlur = () => keys.clear();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [enabled]);

  useEffect(() => {
    const canvas = gl.domElement;
    const hideCursor = (event) => {
      if (!enabled || event.pointerType === "touch") return;
      canvas.style.cursor = "none";
    };
    const restoreCursor = () => { canvas.style.cursor = ""; };
    canvas.addEventListener("pointerdown", hideCursor);
    canvas.addEventListener("pointerup", restoreCursor);
    canvas.addEventListener("pointercancel", restoreCursor);
    window.addEventListener("blur", restoreCursor);
    return () => {
      restoreCursor();
      canvas.removeEventListener("pointerdown", hideCursor);
      canvas.removeEventListener("pointerup", restoreCursor);
      canvas.removeEventListener("pointercancel", restoreCursor);
      window.removeEventListener("blur", restoreCursor);
    };
  }, [enabled, gl]);

  useFrame((state, rawDelta) => {
    if (!enabled) return;
    const delta = Math.min(rawDelta, 0.05);
    const yaw = lookRef.current.yaw + (dragRef?.current?.targetYaw ?? 0);
    const pitch = THREE.MathUtils.clamp(
      lookRef.current.pitch - (dragRef?.current?.targetPitch ?? 0),
      -1.48,
      1.48,
    );
    const forward = new THREE.Vector3(
      Math.sin(yaw) * Math.cos(pitch),
      Math.sin(pitch),
      Math.cos(yaw) * Math.cos(pitch),
    ).normalize();
    const right = new THREE.Vector3().crossVectors(camera.up, forward).normalize();
    const movement = new THREE.Vector3();
    const keys = keysRef.current;
    if (keys.has("w")) movement.add(forward);
    if (keys.has("s")) movement.sub(forward);
    if (keys.has("a")) movement.add(right);
    if (keys.has("d")) movement.sub(right);
    if (keys.has("e")) movement.y += 1;
    if (keys.has("q")) movement.y -= 1;
    if (keys.has("space")) movement.y += 1;
    if (keys.has("shift")) movement.y -= 1;
    if (movement.lengthSq() > 0) {
      camera.position.addScaledVector(movement.normalize(), moveSpeed * delta);
      camera.position.x = THREE.MathUtils.clamp(camera.position.x, -bounds.x, bounds.x);
      camera.position.y = THREE.MathUtils.clamp(camera.position.y, bounds.yMin, bounds.yMax);
      camera.position.z = THREE.MathUtils.clamp(camera.position.z, -bounds.z, bounds.z);
    }
    camera.lookAt(camera.position.clone().add(forward));
  });
}
