import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { animations } from "./data/animations";
import HomePage from "./components/HomePage";
import "./App.css";

function getAnimationId() {
  const match = window.location.hash.match(/^#\/animation\/([^/]+)\/?$/);
  return match?.[1] ?? animations[0].id;
}

function getDefaults(animation) {
  const genericControls = animation.controls ?? [];
  const genericDefaults = animation.variantComponent
    ? genericControls.flatMap((control) => [
      [`chat__${control.key}`, control.default],
      [`claude__${control.key}`, control.default],
    ])
    : genericControls.map((control) => [control.key, control.default]);
  const providerDefaults = [...(animation.chatControls ?? []), ...(animation.claudeControls ?? [])]
    .map((control) => [control.key, control.default]);
  return {
    speed: 1,
    ...Object.fromEntries([...genericDefaults, ...providerDefaults]),
  };
}

function getProviderControls(animation, provider) {
  const explicit = provider === "chat" ? animation.chatControls : animation.claudeControls;
  if (explicit?.length) return explicit;
  return (animation.controls ?? []).map((control) => ({
    ...control,
    settingKey: `${provider}__${control.key}`,
  }));
}

function readSession(key) {
  try { return JSON.parse(sessionStorage.getItem(key)) ?? {}; }
  catch { return {}; }
}

function AnimationStage({ animation, settings, variant, onSettingChange, onVariantChange }) {
  const pageRef = useRef(null);
  const [controlsOpen, setControlsOpen] = useState(true);
  const ActiveComponent = variant === "b" && animation.variantComponent
    ? animation.variantComponent
    : animation.component;
  const chatControls = getProviderControls(animation, "chat");
  const claudeControls = getProviderControls(animation, "claude");
  const hasVariantControls = Boolean(animation.variantComponent && (chatControls.length || claudeControls.length));
  const activeSettings = { ...settings };
  if (animation.variantComponent) {
    const provider = variant === "b" ? "claude" : "chat";
    (animation.controls ?? []).forEach((control) => {
      activeSettings[control.key] = settings[`${provider}__${control.key}`] ?? control.default;
    });
  }

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      pageRef.current?.getAnimations({ subtree: true }).forEach((item) => {
        item.playbackRate = settings.speed;
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [settings, variant]);

  useEffect(() => { document.title = `${animation.title} — Animation Lab`; }, [animation.title]);

  useEffect(() => { setControlsOpen(true); }, [animation.id]);

  const renderControl = (control) => {
    const settingKey = control.settingKey ?? control.key;
    const value = settings[settingKey];
    const displayValue = control.values?.[Math.round(value)] ?? `${value}${control.suffix ?? ""}`;
    return (
    <label key={settingKey} className={control.type === "toggle" ? "motion-controls__toggle" : undefined}>
      <span>{control.label} <output>{control.type === "toggle" ? (value ? "On" : "Off") : displayValue}</output></span>
      {control.type === "toggle"
        ? <input type="checkbox" checked={Boolean(value)} onChange={(event) => onSettingChange(settingKey, event.target.checked)} />
        : <input type="range" min={control.min} max={control.max} step={control.step} value={value} onChange={(event) => onSettingChange(settingKey, Number(event.target.value))} />}
    </label>
    );
  };

  return (
    <main className="animation-stage" ref={pageRef} aria-label={animation.title}>
      <div className="animation-stage__identity">
        <span>
          {animation.variantComponent && variant === "b"
            ? (animation.variantBLabel ?? "Claude")
            : (animation.variantLabel ?? (animation.provider === "chatgpt" ? "ChatGPT" : "Claude"))}
        </span>
        <strong>{animation.title}</strong>
      </div>

      {animation.variantComponent && (
        <div className="variant-toggle" role="group" aria-label="Animation variant">
          <button className={variant === "a" ? "is-active" : ""} type="button" onClick={() => onVariantChange("a")}>{animation.variantLabel ?? "Original"}</button>
          <button className={variant === "b" ? "is-active" : ""} type="button" onClick={() => onVariantChange("b")}>{animation.variantBLabel ?? "Claude"}</button>
          <span aria-hidden="true" className={variant === "b" ? "is-b" : ""} />
        </div>
      )}

      <Suspense fallback={<div className="animation-loading"><i />Loading experiment</div>}>
        <ActiveComponent key={`${animation.id}-${variant}`} settings={activeSettings} />
      </Suspense>

      <details className={`motion-controls ${hasVariantControls ? "motion-controls--paired" : ""}`} open={controlsOpen} onToggle={(event) => setControlsOpen(event.currentTarget.open)}>
        <summary>Motion controls <span aria-hidden="true">⌁</span></summary>
        <div className="motion-controls__body">
          <label className="motion-controls__shared">
            <span>Animation speed <output>{settings.speed.toFixed(2)}×</output></span>
            <input type="range" min="0.25" max="2.5" step="0.05" value={settings.speed} onChange={(event) => onSettingChange("speed", Number(event.target.value))} />
          </label>
          {!hasVariantControls && (animation.controls ?? []).map(renderControl)}
          {hasVariantControls && (
            <div className="motion-controls__variants">
              <fieldset className={variant === "a" ? "is-active" : ""}>
                <legend><i />ChatGPT</legend>
                {chatControls.map(renderControl)}
              </fieldset>
              <fieldset className={variant === "b" ? "is-active" : ""}>
                <legend><i />Claude</legend>
                {claudeControls.map(renderControl)}
              </fieldset>
            </div>
          )}
        </div>
      </details>
    </main>
  );
}

export default function App() {
  const [animationId, setAnimationId] = useState(getAnimationId);
  const [sidebarOpen, setSidebarOpen] = useState(() => !window.matchMedia("(max-width: 760px)").matches);
  const [settingsById, setSettingsById] = useState(() => readSession("animation-lab-settings"));
  const [variant, setVariant] = useState(() => (
    readSession("animation-lab-variant") === "b" ? "b" : "a"
  ));

  useEffect(() => {
    const handleHashChange = () => setAnimationId(getAnimationId());
    window.addEventListener("hashchange", handleHashChange);
    if (!window.location.hash) history.replaceState(null, "", `#/animation/${animations[0].id}`);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => { sessionStorage.setItem("animation-lab-settings", JSON.stringify(settingsById)); }, [settingsById]);
  useEffect(() => { sessionStorage.setItem("animation-lab-variant", JSON.stringify(variant)); }, [variant]);

  const animation = useMemo(
    () => animations.find((item) => item.id === animationId) ?? animations[0],
    [animationId],
  );
  const settings = { ...getDefaults(animation), ...(settingsById[animation.id] ?? {}) };

  const changeSetting = (key, value) => setSettingsById((current) => ({
    ...current,
    [animation.id]: { ...(current[animation.id] ?? getDefaults(animation)), [key]: value },
  }));

  return (
    <div className={`workspace ${sidebarOpen ? "workspace--sidebar" : ""}`}>
      <HomePage
        selectedId={animation.id}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((value) => !value)}
        onSelect={() => { if (window.matchMedia("(max-width: 760px)").matches) setSidebarOpen(false); }}
      />
      <AnimationStage animation={animation} settings={settings} variant={variant} onSettingChange={changeSetting} onVariantChange={setVariant} />
    </div>
  );
}
