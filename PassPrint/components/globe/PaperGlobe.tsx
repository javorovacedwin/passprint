"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { landRings } from "@/content/land";

/*
  The paper atlas globe.

  Not a satellite Earth: a matte sphere in paper tones carrying an engraved
  coastline, a thin graticule, the two cities of the first leg, and a plane
  flying the route the envelopes actually travel — Antwerpen to Novi Pazar.
  Coasts only; no borders are drawn anywhere on the site.
*/

const R = 1;

/* Brand inks — the globe is engraved in navy on oatmeal, routed in rust. */
const PAPER = "#e6ddca";
const COAST = "#1e3a60";
const PENCIL = "#1e3a60";
const ACCENT = "#bf5a2c";

/* Radii, spaced so coast, graticule and sphere never z-fight. */
const R_GRATICULE = R * 1.002;
const R_COAST = R * 1.005;

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/** Where the envelopes are printed, and where the first collection is drawn. */
const ANTWERP = { lat: 51.2194, lon: 4.4025, label: "Antwerpen — the press" };
const NOVI_PAZAR = { lat: 43.1367, lon: 20.5122, label: "Novi Pazar — Collection 01" };

/** Seconds for one flight, plus the pause before the plane sets off again. */
const FLIGHT_SECONDS = 7;
const HOLD_SECONDS = 2.4;

const LABEL =
  "pointer-events-none whitespace-nowrap border border-hairline bg-paper px-2 py-1 font-mono text-[0.58rem] font-medium uppercase tracking-[0.1em] text-ink shadow-[var(--shadow-paper)]";

function buildCoastline(): Float32Array {
  const positions: number[] = [];
  for (const ring of landRings) {
    for (let i = 0; i + 3 < ring.length; i += 2) {
      const a = latLonToVec3(ring[i + 1], ring[i], R_COAST);
      const b = latLonToVec3(ring[i + 3], ring[i + 2], R_COAST);
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  return new Float32Array(positions);
}

function buildGraticule(simple: boolean): Float32Array {
  const positions: number[] = [];
  const step = simple ? 30 : 20;
  const segs = simple ? 48 : 72;

  for (let lat = -60; lat <= 60; lat += step) {
    for (let i = 0; i < segs; i++) {
      const a = latLonToVec3(lat, (i / segs) * 360 - 180, R_GRATICULE);
      const b = latLonToVec3(lat, ((i + 1) / segs) * 360 - 180, R_GRATICULE);
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  for (let lon = -180; lon < 180; lon += step) {
    for (let i = 0; i < segs; i++) {
      const a = latLonToVec3((i / segs) * 180 - 90, lon, R_GRATICULE);
      const b = latLonToVec3(((i + 1) / segs) * 180 - 90, lon, R_GRATICULE);
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  return new Float32Array(positions);
}

/** The flight arc, lifted off the surface so it reads as a route, not a border. */
function buildRoute(): THREE.QuadraticBezierCurve3 {
  const from = latLonToVec3(ANTWERP.lat, ANTWERP.lon, R * 1.01);
  const to = latLonToVec3(NOVI_PAZAR.lat, NOVI_PAZAR.lon, R * 1.01);
  const mid = from.clone().add(to).multiplyScalar(0.5).normalize().multiplyScalar(R * 1.16);
  return new THREE.QuadraticBezierCurve3(from, mid, to);
}

/** The ground track under the arc — the same path, struck onto the paper. */
function buildGroundTrack(route: THREE.QuadraticBezierCurve3): THREE.Vector3[] {
  return route.getPoints(48).map((p) => p.clone().normalize().multiplyScalar(R_COAST));
}

/** A folded paper dart, drawn flat and pointing along +X. */
function buildPlaneShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(0.062, 0);
  s.lineTo(-0.042, 0.038);
  s.lineTo(-0.016, 0);
  s.lineTo(-0.042, -0.038);
  s.closePath();
  return s;
}

/*
  Frames the sphere to the canvas, whatever its shape. The globe used to be
  cropped top and sides because the camera sat at a fixed distance: at 34° and
  z = 3.1 the view is only 1.9 units tall, and the globe is 2 units across.
  Distance is now derived from the narrower of the two field angles, so the
  whole sphere — arc and markers included — always fits with a little air.
*/
function FitCamera({ radius }: { radius: number }) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    const vFov = (camera.fov * Math.PI) / 180;
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
    const distance = radius / Math.sin(Math.min(vFov, hFov) / 2);
    camera.position.set(0, 0, distance);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height, radius]);

  return null;
}

function CityMark({
  position,
  ink,
  filled,
}: {
  position: THREE.Vector3;
  ink: string;
  filled: boolean;
}) {
  // The ring lies flat against the paper, so it reads as a struck mark.
  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), position.clone().normalize());
    return q;
  }, [position]);

  return (
    <group position={position} quaternion={quaternion}>
      <mesh>
        <sphereGeometry args={[filled ? 0.019 : 0.013, 12, 12]} />
        <meshBasicMaterial color={ink} />
      </mesh>
      <mesh>
        <torusGeometry args={[filled ? 0.046 : 0.034, 0.0038, 8, 40]} />
        <meshBasicMaterial color={ink} />
      </mesh>
    </group>
  );
}

interface GlobeSceneProps {
  simple: boolean;
  reduceMotion: boolean;
  hovered: boolean;
}

function GlobeScene({ simple, reduceMotion, hovered }: GlobeSceneProps) {
  const group = useRef<THREE.Group>(null);
  const plane = useRef<THREE.Group>(null);
  const clock = useRef(0);

  const coastline = useMemo(buildCoastline, []);
  const graticule = useMemo(() => buildGraticule(simple), [simple]);
  const route = useMemo(buildRoute, []);
  const arc = useMemo(() => route.getPoints(64), [route]);
  const groundTrack = useMemo(() => buildGroundTrack(route), [route]);
  const planeShape = useMemo(buildPlaneShape, []);

  const antwerp = useMemo(() => latLonToVec3(ANTWERP.lat, ANTWERP.lon, R_COAST), []);
  const noviPazar = useMemo(() => latLonToVec3(NOVI_PAZAR.lat, NOVI_PAZAR.lon, R_COAST), []);
  const antwerpLabel = useMemo(
    () => latLonToVec3(ANTWERP.lat + 6, ANTWERP.lon - 21, R * 1.02),
    []
  );
  const noviPazarLabel = useMemo(
    () => latLonToVec3(NOVI_PAZAR.lat - 8, NOVI_PAZAR.lon + 16, R * 1.02),
    []
  );

  /* At rest the globe holds the route square to the camera. */
  const rest = useMemo(() => {
    const mid = antwerp.clone().add(noviPazar).multiplyScalar(0.5).normalize();
    const y = Math.atan2(-mid.x, mid.z);
    // Not the full latitude: tilting all the way would show the globe pole-on.
    const x = Math.asin(THREE.MathUtils.clamp(mid.y, -1, 1)) * 0.78;
    return { x, y };
  }, [antwerp, noviPazar]);

  /* Park the plane at its destination when motion is not wanted. */
  const settle = (t: number) => {
    if (!plane.current) return;
    const point = route.getPoint(t);
    const tangent = route.getTangent(t).normalize();
    const up = point.clone().normalize();
    const forward = tangent.clone().sub(up.clone().multiplyScalar(tangent.dot(up))).normalize();
    const side = up.clone().cross(forward).normalize();
    plane.current.position.copy(point).addScaledVector(up, 0.012);
    plane.current.quaternion.setFromRotationMatrix(
      new THREE.Matrix4().makeBasis(forward, side, up)
    );
  };

  useEffect(() => {
    if (reduceMotion) settle(1);
    // settle is stable for the life of the scene; route never changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  useFrame((state, delta) => {
    if (!group.current) return;

    if (reduceMotion) {
      group.current.rotation.set(rest.x, rest.y, 0);
      return;
    }

    clock.current += delta;

    /*
      A slow sway rather than a full spin: the route is the point of the
      globe, so it should never rotate out of sight.
    */
    const sway = Math.sin(clock.current * 0.19) * 0.26;
    const targetY = hovered ? rest.y + state.pointer.x * 0.4 : rest.y + sway;
    const targetX = rest.x + (hovered ? state.pointer.y * -0.14 : Math.sin(clock.current * 0.13) * 0.05);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 1.6, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 2.2, delta);

    const cycle = (clock.current % (FLIGHT_SECONDS + HOLD_SECONDS)) / FLIGHT_SECONDS;
    const progress = Math.min(cycle, 1);
    // Ease in and out so the plane leaves and lands rather than snapping.
    settle(0.5 - Math.cos(progress * Math.PI) / 2);
  });

  return (
    <group ref={group} rotation={[rest.x, rest.y, 0]}>
      <mesh>
        <sphereGeometry args={[R, simple ? 48 : 96, simple ? 32 : 64]} />
        <meshStandardMaterial color={PAPER} roughness={1} metalness={0} />
      </mesh>

      {/* the graticule, faint, so the coast reads first */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[graticule, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={PENCIL} transparent opacity={0.22} />
      </lineSegments>

      {/* the engraved coast */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[coastline, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={COAST} transparent opacity={0.85} />
      </lineSegments>

      {/* the route: struck on the paper, then lifted as the flight arc */}
      <Line
        points={groundTrack}
        color={COAST}
        lineWidth={1}
        transparent
        opacity={0.35}
        dashed
        dashSize={0.03}
        gapSize={0.022}
      />
      <Line points={arc} color={ACCENT} lineWidth={1.6} />

      <group ref={plane}>
        <mesh>
          <shapeGeometry args={[planeShape]} />
          <meshBasicMaterial color={ACCENT} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <CityMark position={antwerp} ink={COAST} filled={false} />
      <CityMark position={noviPazar} ink={ACCENT} filled />

      {/* Labels sit off their cities so the two never collide. */}
      {hovered && (
        <>
          <Html position={antwerpLabel} className={LABEL} distanceFactor={2.6} zIndexRange={[10, 0]}>
            {ANTWERP.label}
          </Html>
          <Html position={noviPazarLabel} className={LABEL} distanceFactor={2.6} zIndexRange={[10, 0]}>
            {NOVI_PAZAR.label}
          </Html>
        </>
      )}
    </group>
  );
}

interface PaperGlobeProps {
  simple?: boolean;
  reduceMotion?: boolean;
}

export default function PaperGlobe({ simple = false, reduceMotion = false }: PaperGlobeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="h-full w-full"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 3.4], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        {/* radius covers the sphere plus the lifted arc and the marker rings */}
        <FitCamera radius={1.2} />
        <ambientLight intensity={1.15} />
        <directionalLight position={[2, 3, 4]} intensity={0.85} color="#fffaf0" />
        <GlobeScene simple={simple} reduceMotion={reduceMotion} hovered={hovered} />
      </Canvas>
    </div>
  );
}
