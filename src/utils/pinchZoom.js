// Desktop wheel + touch pinch, unified behind one "multiply the current distance by this
// factor" callback — mirrors createDragOrbit's shape (plain DOM listeners on a host element,
// no React dependency) so every camera rig in the gallery can wire zoom up the same way.
export function createPinchZoom(host, { onZoom, wheelSensitivity = 0.0012 } = {}) {
  function onWheel(event) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    event.preventDefault();
    onZoom(Math.exp(event.deltaY * wheelSensitivity));
  }

  // Incremental (frame-to-frame pinch delta), not "distance since pinch start" — avoids
  // needing to snapshot the rig's target distance here too; the caller's ref already holds
  // whatever that running total is.
  const pinch = { lastDistance: null };
  function touchDistance(touches) {
    return Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);
  }
  function onTouchStart(event) {
    if (event.touches.length === 2) pinch.lastDistance = touchDistance(event.touches);
  }
  function onTouchMove(event) {
    if (event.touches.length !== 2 || !pinch.lastDistance) return;
    event.preventDefault();
    const current = touchDistance(event.touches);
    onZoom(pinch.lastDistance / Math.max(current, 1));
    pinch.lastDistance = current;
  }
  function onTouchEnd(event) {
    if (event.touches.length < 2) pinch.lastDistance = null;
  }

  host.addEventListener("wheel", onWheel, { passive: false });
  host.addEventListener("touchstart", onTouchStart, { passive: true });
  host.addEventListener("touchmove", onTouchMove, { passive: false });
  host.addEventListener("touchend", onTouchEnd, { passive: true });
  host.addEventListener("touchcancel", onTouchEnd, { passive: true });

  function dispose() {
    host.removeEventListener("wheel", onWheel);
    host.removeEventListener("touchstart", onTouchStart);
    host.removeEventListener("touchmove", onTouchMove);
    host.removeEventListener("touchend", onTouchEnd);
    host.removeEventListener("touchcancel", onTouchEnd);
  }

  return { dispose };
}
