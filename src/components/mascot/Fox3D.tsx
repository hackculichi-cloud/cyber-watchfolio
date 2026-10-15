import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CulichiBody from "@/components/shared/CulichiBody";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { createFox, type FoxController, type FoxOutfit } from "./createFox";
export type FoxPhase = "greeting" | "standby" | "ready" | "transforming";
type Props = {
    profile: FoxOutfit;
    phase: FoxPhase;
    target: FoxOutfit | null;
    wave: number;
    reduced: boolean;
    onReady: () => void;
    onUnavailable: () => void;
};
/** Render on demand: no perpetual GPU loop in standby or outside the viewport. */
export default function Fox3D(props: Props) {
    const mount = useRef<HTMLSpanElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const latest = useRef(props);
    latest.current = props;
    const refresh = useRef<() => void>(() => { });
    const [ready, setReady] = useState(false);
    useEffect(() => {
        const element = mount.current!, surface = canvas.current!;
        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({ canvas: surface, alpha: true, antialias: true, powerPreference: "low-power" });
        }
        catch {
            latest.current.onUnavailable();
            return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        const scene = new THREE.Scene();
        const pmrem = new THREE.PMREMGenerator(renderer);
        const room = new RoomEnvironment();
        const environment = pmrem.fromScene(room, .04, .1, 100, { size: 64 });
        scene.environment = environment.texture;
        scene.environmentIntensity = .65;
        room.dispose();
        pmrem.dispose();
        scene.add(new THREE.HemisphereLight(0xd9efff, 0x4b3020, 1.5));
        const key = new THREE.DirectionalLight(0xffeedb, 2.7);
        key.position.set(-3, 6, 6);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0x82dbff, 2.0);
        rim.position.set(3, 4, -4);
        scene.add(rim);
        const fill = new THREE.DirectionalLight(0xffffff, .8);
        fill.position.set(4, 1, 4);
        scene.add(fill);
        const camera = new THREE.OrthographicCamera(-2.05, 2.05, 2.05, -2.05, .1, 40);
        camera.position.set(1.5, 2.5, 8);
        camera.lookAt(.1, 1.84, 0);
        let fox: FoxController | null = null;
        const energyMaterial = new THREE.MeshBasicMaterial({ color: 0x66ddeb, transparent: true, opacity: 0, depthWrite: false });
        const energy = new THREE.Mesh(new THREE.TorusGeometry(.95, .012, 8, 80), energyMaterial);
        energy.position.y = 1.75;
        energy.visible = false;
        scene.add(energy);
        let raf = 0, stopped = false, visible = true, waveStart = performance.now() / 1000, transformStart = 0, lastWave = -1, lastPhase = "", frames = 0;
        let lookX = 0, lookY = 0, wantedX = 0, wantedY = 0;
        const smooth = (a: number, b: number, x: number) => THREE.MathUtils.smoothstep(x, a, b);
        const schedule = () => { if (!raf && !stopped && visible && !document.hidden)
            raf = requestAnimationFrame(render); };
        function render(now: number) {
            raf = 0;
            if (stopped || !visible || document.hidden || !fox)
                return;
            const state = latest.current, t = now / 1000;
            if (state.phase === "greeting" && (lastPhase !== "greeting" || lastWave !== state.wave)) {
                waveStart = t;
                lastWave = state.wave;
            }
            if (state.phase === "transforming" && lastPhase !== "transforming")
                transformStart = t;
            lastPhase = state.phase;
            const elapsed = t - waveStart;
            const wave = state.reduced || state.phase !== "greeting" ? 0 : smooth(0, .28, elapsed) * (1 - smooth(.95, 1.3, elapsed));
            const progress = state.phase === "transforming" ? THREE.MathUtils.clamp((t - transformStart) / 1.1, 0, 1) : 0;
            const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
            const outfit = state.target && progress >= .45 ? state.target : state.profile;
            if (fox.outfit !== outfit)
                fox.setOutfit(outfit);
            const nextX = state.reduced ? 0 : wantedX, nextY = state.reduced ? 0 : wantedY;
            lookX = THREE.MathUtils.lerp(lookX, nextX, .16);
            lookY = THREE.MathUtils.lerp(lookY, nextY, .16);
            fox.pose(wave, elapsed, lookX, lookY, state.reduced ? 0 : eased * Math.PI * 2);
            energy.visible = state.phase === "transforming" && !state.reduced;
            energyMaterial.opacity = Math.sin(progress * Math.PI) * .7;
            energy.rotation.set(progress * Math.PI, progress * 3, progress * 2);
            energy.scale.setScalar(1 + Math.sin(progress * Math.PI) * .45);
            renderer.render(scene, camera);
            surface.dataset.waveAngle = String(-.1 - wave * 2.25);
            surface.dataset.modelOutfit = fox.outfit;
            surface.dataset.renderedFrames = String(++frames);
            if ((state.phase === "greeting" && elapsed < 1.32) || (state.phase === "transforming" && progress < 1) || Math.abs(lookX - nextX) + Math.abs(lookY - nextY) > .002)
                schedule();
        }
        refresh.current = schedule;
        const resize = new ResizeObserver(() => { const size = element.clientWidth; if (size > 0) {
            renderer.setSize(size, size, false);
            schedule();
        } });
        resize.observe(element);
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible)
            schedule();
        else {
            cancelAnimationFrame(raf);
            raf = 0;
        } });
        observer.observe(element);
        const move = (event: PointerEvent) => { if (event.pointerType !== "mouse")
            return; const rect = element.getBoundingClientRect(); wantedX = THREE.MathUtils.clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1); wantedY = THREE.MathUtils.clamp(1 - (event.clientY - rect.top) / rect.height * 2, -1, 1); schedule(); };
        const leave = () => { wantedX = 0; wantedY = 0; schedule(); };
        const visibility = () => { if (document.hidden) {
            cancelAnimationFrame(raf);
            raf = 0;
        }
        else
            schedule(); };
        const lost = (event: Event) => { event.preventDefault(); stopped = true; cancelAnimationFrame(raf); setReady(false); latest.current.onUnavailable(); };
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);
        document.addEventListener("visibilitychange", visibility);
        surface.addEventListener("webglcontextlost", lost);
        createFox(latest.current.profile).then(model => {
            if (stopped) { model.dispose(); return; }
            fox = model;
            scene.add(model.root);
            surface.dataset.modelSource = "blender-gltf";
            setReady(true);
            latest.current.onReady();
            schedule();
        }).catch(() => {
            if (!stopped) { setReady(false); latest.current.onUnavailable(); }
        });
        return () => { stopped = true; cancelAnimationFrame(raf); refresh.current = () => { }; resize.disconnect(); observer.disconnect(); element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave); document.removeEventListener("visibilitychange", visibility); surface.removeEventListener("webglcontextlost", lost); fox?.dispose(); environment.dispose(); energy.geometry.dispose(); energyMaterial.dispose(); renderer.dispose(); renderer.forceContextLoss(); };
    }, []);
    useEffect(() => { refresh.current(); }, [props.profile, props.phase, props.target, props.wave, props.reduced]);
    return <span ref={mount} data-fox-renderer={ready ? "webgl" : "fallback"} className="relative block aspect-square w-full">
    {!ready && <CulichiBody profile={props.profile} className="w-full"/>}
    <canvas ref={canvas} aria-hidden data-mascot={ready ? props.profile : undefined} data-mascot-scene={ready ? "entry" : undefined} data-scene-profile={ready ? props.profile : undefined} data-full-body={ready || undefined} className="absolute inset-0 h-full w-full" style={{ visibility: ready ? "visible" : "hidden" }}/>
  </span>;
}
