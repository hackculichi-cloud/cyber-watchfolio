import * as THREE from "three";
import type { ProfileSlug } from "@/data/profiles";
export type FoxOutfit = ProfileSlug | "home";
const palettes: Record<FoxOutfit, [
    string,
    string
]> = {
    home: ["#164458", "#2dd5f3"], cybersecurity: ["#142637", "#39cff4"],
    development: ["#193a2b", "#57e483"], electrical: ["#eab822", "#ffe369"],
    electronics: ["#e5edf2", "#ff943d"], repair: ["#513078", "#ba91ff"], "customer-service": ["#138b96", "#65e6dc"],
};
/** Local, procedural 3D model: meshes and articulated pivots, without external model URLs. */
export function createFox(initial: FoxOutfit) {
    const root = new THREE.Group();
    const material = (color: string, roughness = .6, metalness = .05) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
    const orange = material("#d96b1a"), cream = material("#f4ecdc"), ink = material("#101c26"), pants = material("#1b2b3a");
    const cloth = material(palettes[initial][0]), accent = material(palettes[initial][1], .35, .24), steel = material("#a3b9c6", .27, .65);
    const green = material("#31a78d", .18), white = material("#ffffff", .28);
    const mesh = (geometry: THREE.BufferGeometry, mat: THREE.Material, parent: THREE.Object3D, x: number, y: number, z: number) => {
        const object = new THREE.Mesh(geometry, mat);
        object.position.set(x, y, z);
        parent.add(object);
        return object;
    };
    const sphere = (parent: THREE.Object3D, mat: THREE.Material, xyz: number[], scale: number[]) => {
        const object = mesh(new THREE.SphereGeometry(1, 40, 28), mat, parent, ...xyz as [
            number,
            number,
            number
        ]);
        object.scale.set(...scale as [
            number,
            number,
            number
        ]);
        return object;
    };
    const capsule = (parent: THREE.Object3D, mat: THREE.Material, radius: number, length: number, x: number, y: number, z: number) => mesh(new THREE.CapsuleGeometry(radius, length, 8, 20), mat, parent, x, y, z);
    const line = (parent: THREE.Object3D, mat: THREE.Material, points: number[][], radius = .022) => mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p as [
        number,
        number,
        number
    ]))), 24, radius, 8, false), mat, parent, 0, 0, 0);
    // Curved, tapered tail with a white tip; its pivot can move independently of the torso.
    const tail = new THREE.Group();
    root.add(tail);
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 1.04, -.2), new THREE.Vector3(.48, .8, -.55), new THREE.Vector3(1.03, .96, -.64), new THREE.Vector3(1.17, 1.42, -.53), new THREE.Vector3(.93, 1.64, -.42)]);
    const frames = curve.computeFrenetFrames(48, false), vertices: number[] = [], colors: number[] = [], indices: number[] = [];
    for (let i = 0; i <= 48; i++) {
        const t = i / 48, p = curve.getPointAt(t), radius = Math.sin(Math.PI * t) ** .7 * .32 + .012;
        const color = new THREE.Color(t > .69 ? "#f4ecdc" : "#d96b1a");
        for (let j = 0; j <= 20; j++) {
            const a = j / 20 * Math.PI * 2, v = p.clone().addScaledVector(frames.normals[i], Math.cos(a) * radius).addScaledVector(frames.binormals[i], Math.sin(a) * radius);
            vertices.push(v.x, v.y, v.z);
            colors.push(color.r, color.g, color.b);
            if (i < 48 && j < 20) {
                const k = i * 21 + j;
                indices.push(k, k + 21, k + 1, k + 1, k + 21, k + 22);
            }
        }
    }
    const tailGeometry = new THREE.BufferGeometry();
    tailGeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    tailGeometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    tailGeometry.setIndex(indices);
    tailGeometry.computeVertexNormals();
    mesh(tailGeometry, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .8 }), tail, 0, 0, 0);
    // Boots, knee pads, trousers, torso and jacket seams.
    for (const side of [-1, 1]) {
        capsule(root, pants, .19, .39, side * .23, .77, 0);
        capsule(root, pants, .16, .23, side * .23, .39, .01);
        sphere(root, ink, [side * .23, .23, .05], [.185, .21, .22]);
        sphere(root, ink, [side * .23, .12, .16], [.225, .13, .35]);
        sphere(root, accent, [side * .23, .17, .22], [.19, .045, .25]);
        sphere(root, ink, [side * .23, .64, .155], [.16, .18, .065]);
        for (let lace = 0; lace < 3; lace++)
            line(root, steel, [[side * .23 - .075, .24 + lace * .045, .28 - lace * .035], [side * .23 + .075, .24 + lace * .045, .28 - lace * .035]], .011);
    }
    capsule(root, cloth, .37, .58, 0, 1.47, 0);
    sphere(root, pants, [0, 1.02, 0], [.37, .21, .25]);
    capsule(root, orange, .18, .16, 0, 2.02, 0);
    for (const side of [-1, 1]) {
        sphere(root, ink, [side * .17, 1.95, .24], [.14, .075, .13]);
        sphere(root, cloth, [side * .26, 1.32, .29], [.11, .135, .055]);
        line(root, steel, [[side * .2, 1.42, .34], [side * .31, 1.42, .31]], .009);
    }
    line(root, steel, [[0, 1.1, .372], [0, 1.93, .34]], .012);
    for (const side of [-1, 1])
        line(root, accent, [[side * .28, 1.12, .25], [side * .3, 1.7, .26], [side * .2, 1.91, .28]], .024);
    for (let i = 0; i < 3; i++)
        line(root, accent, [[-.12, 1.62 - i * .11, .38], [0, 1.69 - i * .11, .4], [.12, 1.62 - i * .11, .38]], .024);
    const belt = mesh(new THREE.CylinderGeometry(.39, .39, .1, 40), ink, root, 0, 1.08, 0);
    belt.scale.z = .75;
    sphere(root, steel, [0, 1.08, .3], [.09, .065, .035]);
    const arm = (side: number) => {
        const shoulder = new THREE.Group();
        shoulder.position.set(side * .43, 1.92, 0);
        root.add(shoulder);
        capsule(shoulder, cloth, .16, .26, 0, -.19, 0);
        const elbow = new THREE.Group();
        elbow.position.set(0, -.4, 0);
        shoulder.add(elbow);
        capsule(elbow, cloth, .13, .24, 0, -.17, .01);
        capsule(elbow, accent, .133, .015, 0, -.32, .01);
        const hand = new THREE.Group();
        hand.position.set(0, -.4, .03);
        elbow.add(hand);
        sphere(hand, ink, [0, -.05, .015], [.105, .13, .07]);
        for (let i = 0; i < 4; i++)
            capsule(hand, ink, .025, .09, (i - 1.5) * .047, -.17, .02);
        const thumb = capsule(hand, ink, .032, .08, side * .11, -.035, .04);
        thumb.rotation.z = side * .6;
        shoulder.rotation.z = side * .1;
        return { shoulder, elbow, hand };
    };
    const waveArm = arm(-1), otherArm = arm(1);
    const head = new THREE.Group();
    head.position.set(0, 2.54, .02);
    root.add(head);
    sphere(head, orange, [0, 0, 0], [.65, .53, .46]);
    for (let tuft = 0; tuft < 3; tuft++) {
        const hair = mesh(new THREE.ConeGeometry(.12, .3, 5), orange, head, (tuft - 1) * .13, .48, -.01);
        hair.rotation.z = -.45 + tuft * .15;
    }
    for (const side of [-1, 1]) {
        // Cheek ruff and pointed ears with separate black, orange and cream layers.
        sphere(head, cream, [side * .32, -.22, .22], [.33, .2, .32]);
        for (let i = 0; i < 3; i++) {
            const tuft = mesh(new THREE.ConeGeometry(.115, .29, 5), i < 2 ? orange : cream, head, side * (.49 - i * .025), -.08 - i * .1, .08);
            tuft.rotation.z = -side * (1.05 + i * .2);
        }
        const shape = new THREE.Shape();
        shape.moveTo(-.25, 0);
        shape.lineTo(.25, 0);
        shape.lineTo(0, .59);
        shape.closePath();
        const geometry = new THREE.ExtrudeGeometry(shape, { depth: .11, bevelEnabled: true, bevelSize: .035, bevelThickness: .035, bevelSegments: 3, steps: 1 });
        const ear = new THREE.Group();
        ear.position.set(side * .36, .35, -.05);
        ear.rotation.z = -side * .25;
        head.add(ear);
        mesh(geometry, ink, ear, 0, 0, 0);
        const inner = mesh(geometry.clone(), orange, ear, 0, .045, .08);
        inner.scale.set(.8, .82, .5);
        const center = mesh(geometry.clone(), cream, ear, 0, .1, .14);
        center.scale.set(.45, .6, .3);
        const eye = sphere(head, ink, [side * .24, .04, .401], [.2, .116, .042]);
        eye.rotation.z = -side * .14;
        const eyeball = sphere(head, cream, [side * .24, .035, .432], [.17, .081, .026]);
        eyeball.rotation.z = -side * .14;
        sphere(head, green, [side * .23, .025, .453], [.071, .069, .018]);
        sphere(head, ink, [side * .23, .025, .471], [.023, .055, .009]);
        sphere(head, white, [side * .23 - .018, .05, .48], [.014, .016, .006]);
        const brow = capsule(head, ink, .034, .22, side * .24, .14, .445);
        brow.rotation.z = side * 1.89;
        const chestTuft = mesh(new THREE.ConeGeometry(.13, .3, 6), cream, root, side * .12, 1.94, .22);
        chestTuft.rotation.z = Math.PI + side * .3;
    }
    const muzzle = mesh(new THREE.ConeGeometry(.285, .58, 40), cream, head, 0, -.19, .55);
    muzzle.rotation.x = Math.PI / 2;
    sphere(head, cream, [0, -.29, .35], [.29, .12, .29]);
    sphere(head, ink, [0, -.18, .86], [.125, .085, .09]);
    line(head, ink, [[0, -.25, .77], [0, -.32, .64], [-.16, -.32, .51]], .012);
    line(head, ink, [[0, -.32, .64], [.16, -.32, .51]], .012);
    const bodyOutfits = new Map<FoxOutfit, THREE.Group>(), headOutfits = new Map<FoxOutfit, THREE.Group>();
    for (const profile of Object.keys(palettes) as FoxOutfit[]) {
        const body = new THREE.Group(), helmet = new THREE.Group();
        root.add(body);
        head.add(helmet);
        bodyOutfits.set(profile, body);
        headOutfits.set(profile, helmet);
        if (profile !== "customer-service") {
            for (const side of [-1, 1]) {
                sphere(body, ink, [side * .29, 1.0, .26], [.09, .14, .06]);
                const tool = capsule(body, steel, .018, .2, side * .29, 1.12, .32);
                tool.rotation.z = side * .1;
                capsule(body, accent, .035, .08, side * .29, 1.0, .32);
            }
        }
        if (profile === "electrical") {
            mesh(new THREE.SphereGeometry(.59, 40, 24, 0, Math.PI * 2, 0, Math.PI / 2), material("#efbd21", .4), helmet, 0, .37, 0);
            const brim = mesh(new THREE.CylinderGeometry(.69, .69, .055, 48), material("#f7cd3b", .4), helmet, 0, .38, .03);
            brim.scale.z = .86;
            line(helmet, accent, [[0, .48, .5], [0, .85, .25], [0, .95, 0]], .03);
        }
        if (profile === "electronics") {
            for (const side of [-1, 1]) {
                capsule(body, cloth, .15, .38, side * .26, 1.05, .03);
                const ring = mesh(new THREE.TorusGeometry(.15, .035, 12, 32), accent, helmet, side * .2, .38, .43);
                ring.rotation.y = side * .12;
                sphere(helmet, material("#3a8f9d", .17, .4), [side * .2, .38, .425], [.13, .13, .025]);
            }
            line(helmet, ink, [[-.34, .38, .42], [0, .4, .44], [.34, .38, .42]], .02);
        }
        if (profile === "cybersecurity") {
            const hood = mesh(new THREE.TorusGeometry(.63, .09, 16, 48), cloth, helmet, 0, .05, -.19);
            hood.scale.y = 1.07;
            const rim = mesh(new THREE.TorusGeometry(.63, .017, 8, 48), accent, helmet, 0, .05, -.09);
            rim.scale.y = 1.07;
            const visor = new THREE.MeshPhysicalMaterial({ color: "#26caf2", transparent: true, opacity: .2, roughness: .15, metalness: .1, depthWrite: false });
            const shield = sphere(helmet, visor, [0, .065, .495], [.53, .19, .11]);
            shield.renderOrder = 2;
            line(helmet, accent, [[-.48, .22, .49], [0, .23, .57], [.48, .22, .49]], .016);
        }
        if (profile === "repair")
            for (const side of [-1, 1])
                line(body, accent, [[side * .24, 1.22, .3], [side * .24, 1.84, .3]], .055);
        if (profile === "development") {
            for (const side of [-1, 1])
                line(body, accent, [[side * .19, 1.75, .35], [side * .26, 1.69, .35], [side * .19, 1.63, .35]], .018);
        }
        if (profile === "home" || profile === "customer-service") {
            line(helmet, ink, [[-.62, .04, 0], [-.67, .42, -.05], [0, .64, -.14], [.67, .42, -.05], [.62, .04, 0]], .055);
            for (const side of [-1, 1]) {
                sphere(helmet, ink, [side * .62, .02, 0], [.12, .22, .17]);
                sphere(helmet, accent, [side * .7, .02, .01], [.025, .16, .12]);
            }
            line(helmet, ink, [[-.65, -.04, .08], [-.65, -.25, .42], [-.3, -.31, .67]], .023);
            sphere(helmet, ink, [-.27, -.31, .68], [.075, .035, .035]);
        }
    }
    let active = initial;
    const setOutfit = (profile: FoxOutfit) => {
        active = profile;
        cloth.color.set(palettes[profile][0]);
        accent.color.set(palettes[profile][1]);
        bodyOutfits.forEach((group, key) => group.visible = key === profile);
        headOutfits.forEach((group, key) => group.visible = key === profile);
    };
    setOutfit(initial);
    const pose = (wave: number, elapsed: number, lookX: number, lookY: number, turn: number) => {
        root.rotation.y = -.2 + turn;
        head.rotation.y = lookX * .23;
        head.rotation.x = -lookY * .12;
        head.rotation.z = Math.sin(elapsed * 4) * .018 * wave;
        waveArm.shoulder.rotation.z = -.1 - wave * 2.25;
        waveArm.shoulder.rotation.x = -wave * .2;
        waveArm.elbow.rotation.z = wave * (.25 + Math.sin(elapsed * 9) * .2);
        waveArm.hand.rotation.z = wave * Math.sin(elapsed * 12) * .23;
        otherArm.shoulder.rotation.z = .1;
        tail.rotation.y = Math.sin(elapsed * 4) * .08 * wave + lookX * .035;
    };
    const dispose = () => {
        const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>();
        root.traverse(object => { if (object instanceof THREE.Mesh) {
            geometries.add(object.geometry);
            (Array.isArray(object.material) ? object.material : [object.material]).forEach(m => materials.add(m));
        } });
        geometries.forEach(g => g.dispose());
        materials.forEach(m => m.dispose());
    };
    return { root, pose, setOutfit, dispose, get outfit() { return active; } };
}
