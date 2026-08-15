import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./StaggeredMenu.css";

export const StaggeredMenu = ({
  position = "right",
  colors = ["#0a0a0a", "#a8843f"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  brand,
  scrolled = false,
  menuButtonColor = "#f4f1ec",
  openMenuButtonColor = "#0a0a0a",
  accentColor = "#a8843f",
  changeMenuColorOnOpen = true,
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);
  const textInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const [textLines, setTextLines] = useState(["Menu", "Close"]);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;
      let preLayers = preContainer ? Array.from(preContainer.querySelectorAll(".sm-prelayer")) : [];
      preLayerElsRef.current = preLayers;
      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;
    openTlRef.current?.kill();
    if (closeTweenRef.current) { closeTweenRef.current.kill(); closeTweenRef.current = null; }
    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const numberEls = Array.from(panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"));
    const socialTitle = panel.querySelector(".sm-socials-title");
    const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));
    const offscreen = position === "left" ? -100 : 100;
    const layerStates = layers.map((el) => ({ el, start: offscreen }));
    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    layerStates.forEach((ls, i) => { tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: "power4.out" }, i * 0.07); });
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    tl.fromTo(panel, { xPercent: offscreen }, { xPercent: 0, duration: 0.65, ease: "power4.out" }, panelInsertTime);
    if (itemEls.length) {
      const s = panelInsertTime + 0.1;
      tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 1, ease: "power4.out", stagger: { each: 0.1 } }, s);
      if (numberEls.length) tl.to(numberEls, { duration: 0.6, ease: "power2.out", "--sm-num-opacity": 1, stagger: { each: 0.08 } }, s + 0.1);
    }
    if (socialTitle || socialLinks.length) {
      const ss = panelInsertTime + 0.26;
      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5 }, ss);
      if (socialLinks.length) tl.to(socialLinks, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: { each: 0.08 }, onComplete: () => gsap.set(socialLinks, { clearProps: "opacity" }) }, ss + 0.04);
    }
    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) { tl.eventCallback("onComplete", () => { busyRef.current = false; }); tl.play(0); }
    else busyRef.current = false;
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill(); openTlRef.current = null;
    const panel = panelRef.current; const layers = preLayerElsRef.current;
    if (!panel) return;
    closeTweenRef.current?.kill();
    const offscreen = position === "left" ? -100 : 100;
    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: offscreen, duration: 0.32, ease: "power3.in", overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        const numberEls = Array.from(panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"));
        if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 });
        const st = panel.querySelector(".sm-socials-title");
        const sl = Array.from(panel.querySelectorAll(".sm-socials-link"));
        if (st) gsap.set(st, { opacity: 0 });
        if (sl.length) gsap.set(sl, { y: 25, opacity: 0 });
        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening) => {
    const icon = iconRef.current; if (!icon) return;
    spinTweenRef.current?.kill();
    spinTweenRef.current = opening
      ? gsap.to(icon, { rotate: 225, duration: 0.8, ease: "power4.out", overwrite: "auto" })
      : gsap.to(icon, { rotate: 0, duration: 0.35, ease: "power3.inOut", overwrite: "auto" });
  }, []);

  const animateColor = useCallback((opening) => {
    const btn = toggleBtnRef.current; if (!btn) return;
    colorTweenRef.current?.kill();
    if (changeMenuColorOnOpen) {
      colorTweenRef.current = gsap.to(btn, { color: opening ? openMenuButtonColor : menuButtonColor, delay: 0.18, duration: 0.3, ease: "power2.out" });
    } else gsap.set(btn, { color: menuButtonColor });
  }, [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]);

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      const target = changeMenuColorOnOpen ? (openRef.current ? openMenuButtonColor : menuButtonColor) : menuButtonColor;
      gsap.set(toggleBtnRef.current, { color: target });
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current; if (!inner) return;
    textCycleAnimRef.current?.kill();
    const cur = opening ? "Menu" : "Close";
    const tgt = opening ? "Close" : "Menu";
    const seq = [cur]; let last = cur;
    for (let i = 0; i < 3; i++) { last = last === "Menu" ? "Close" : "Menu"; seq.push(last); }
    if (last !== tgt) seq.push(tgt);
    seq.push(tgt);
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });
    textCycleAnimRef.current = gsap.to(inner, { yPercent: -(((seq.length - 1) / seq.length) * 100), duration: 0.5 + seq.length * 0.07, ease: "power4.out" });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target; setOpen(target);
    if (target) { onMenuOpen?.(); playOpen(); } else { onMenuClose?.(); playClose(); }
    animateIcon(target); animateColor(target); animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false; setOpen(false); onMenuClose?.(); playClose();
    animateIcon(false); animateColor(false); animateText(false);
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) && toggleBtnRef.current && !toggleBtnRef.current.contains(e.target)) closeMenu();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [closeOnClickAway, open, closeMenu]);

  React.useEffect(() => {
    const onHash = () => closeMenu();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [closeMenu]);

  return (
    <div
      className={(className ? className + " " : "") + "staggered-menu-wrapper" + (isFixed ? " fixed-wrapper" : "") + (scrolled ? " is-scrolled" : "")}
      style={accentColor ? { ["--sm-accent"]: accentColor } : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {(() => {
          const raw = colors && colors.length ? colors.slice(0, 4) : ["#0a0a0a", "#a8843f"];
          let arr = [...raw];
          if (arr.length >= 3) { arr.splice(Math.floor(arr.length / 2), 1); }
          return arr.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />);
        })()}
      </div>
      <header className="sm-header" aria-label="Navigation">
        {brand ? <div className="sm-brand">{brand}</div> : <div className="sm-brand">Hotel Mountain Villa</div>}
        <button ref={toggleBtnRef} className="sm-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={toggleMenu} type="button">
          <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {textLines.map((l, i) => <span className="sm-toggle-line" key={i}>{l}</span>)}
            </span>
          </span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>
      <aside ref={panelRef} className="sm-panel" aria-hidden={!open}>
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items.map((it, idx) => (
              <li className="sm-panel-itemWrap" key={it.label + idx}>
                <a className="sm-panel-item" href={it.link} aria-label={it.ariaLabel}>
                  <span className="sm-panel-itemLabel">{it.label}</span>
                </a>
              </li>
            ))}
          </ul>
          {displaySocials && socialItems.length > 0 && (
            <div className="sm-socials">
              <h3 className="sm-socials-title">Follow</h3>
              <ul className="sm-socials-list">
                {socialItems.map((s, i) => <li key={s.label + i}><a href={s.link} className="sm-socials-link">{s.label}</a></li>)}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;
