function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

// Ports the drag-orbit feel from components_chat/MechanicalSolarSystem.jsx: unclamped yaw
// accumulation, clamped pitch, and a click/drag threshold so a tap doesn't register as a drag.
export function createDragOrbit(host, {
  yawSpeed = 0.004,
  pitchSpeed = 0.0026,
  pitchMin = -0.55,
  pitchMax = 0.58,
  clickThreshold = 9,
  onDrag,
} = {}) {
  const state = {
    dragging: false,
    dragDistance: 0,
    dragX: 0,
    dragY: 0,
    targetYaw: 0,
    targetPitch: 0,
    get moved() { return state.dragDistance >= clickThreshold; },
  };

  function onPointerDown(event) {
    state.dragging = true;
    state.dragDistance = 0;
    state.dragX = event.clientX;
    state.dragY = event.clientY;
    host.setPointerCapture?.(event.pointerId);
  }

  function onPointerMove(event) {
    if (!state.dragging) return;
    const dx = event.clientX - state.dragX;
    const dy = event.clientY - state.dragY;
    state.dragX = event.clientX;
    state.dragY = event.clientY;
    state.dragDistance += Math.abs(dx) + Math.abs(dy);
    state.targetYaw += dx * yawSpeed;
    state.targetPitch = clamp(state.targetPitch + dy * pitchSpeed, pitchMin, pitchMax);
    onDrag?.(event);
  }

  function onPointerUp(event) {
    state.dragging = false;
    host.releasePointerCapture?.(event.pointerId);
  }

  host.addEventListener("pointerdown", onPointerDown);
  host.addEventListener("pointermove", onPointerMove);
  host.addEventListener("pointerup", onPointerUp);
  host.addEventListener("pointercancel", onPointerUp);

  function dispose() {
    host.removeEventListener("pointerdown", onPointerDown);
    host.removeEventListener("pointermove", onPointerMove);
    host.removeEventListener("pointerup", onPointerUp);
    host.removeEventListener("pointercancel", onPointerUp);
  }

  return { state, dispose };
}
