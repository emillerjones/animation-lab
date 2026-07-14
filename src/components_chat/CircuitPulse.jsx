import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, MeshReflectorMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import GpuExperience from "./webgl/GpuExperience";
import { seeded } from "../utils/procedural";
import { range } from "./webgl/GpuPrimitives";
import "./CircuitPulse.css";

function Signal({points,phase,speed,accent}){const signal=useRef(),halo=useRef(),curve=useMemo(()=>new THREE.CatmullRomCurve3(points,false,"catmullrom",.02),[points]),point=useMemo(()=>new THREE.Vector3(),[]);useFrame((state)=>{const progress=(state.clock.elapsedTime*speed+phase)%1;curve.getPointAt(progress,point);signal.current?.position.copy(point);if(halo.current){halo.current.position.copy(point);halo.current.scale.setScalar(1+Math.sin(progress*Math.PI)*1.8);}});return <group><mesh ref={signal}><sphereGeometry args={[.12,12,12]} /><meshBasicMaterial color="#effff9" toneMapped={false} /></mesh><mesh ref={halo}><sphereGeometry args={[.19,10,10]} /><meshBasicMaterial color={accent} transparent opacity={.22} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh></group>;}
function Processor({accent}){const crown=useRef();useFrame((state,delta)=>{if(!crown.current)return;crown.current.rotation.y+=delta*.12;crown.current.position.y=1.2+Math.sin(state.clock.elapsedTime*.7)*.14;});return <group position={[4,-1.55,-13]}><mesh position={[0,.4,0]}><boxGeometry args={[5.2,.8,5.2]} /><meshStandardMaterial color="#03100c" emissive={accent} emissiveIntensity={.16} metalness={.86} roughness={.22} /></mesh><mesh position={[0,.85,0]}><boxGeometry args={[3.6,.38,3.6]} /><meshStandardMaterial color="#071d16" emissive={accent} emissiveIntensity={.52} metalness={.72} /></mesh><mesh position={[0,1.07,0]}><boxGeometry args={[2.65,.12,2.65]} /><meshBasicMaterial color="#baffdf" toneMapped={false} /></mesh><group ref={crown} position={[0,1.2,0]}>{[1.9,2.5,3.1].map((radius,index)=><mesh key={radius} rotation={[Math.PI/2+index*.18,index*.5,0]}><torusGeometry args={[radius,.025,6,100]} /><meshBasicMaterial color={index===1?"#9effdf":accent} transparent opacity={.58-index*.1} blending={THREE.AdditiveBlending} /></mesh>)}</group><pointLight position={[0,2.2,0]} color={accent} intensity={42} distance={24} /></group>;}
function CircuitWorld({settings,accent}){const branchCount=Math.max(12,Math.min(32,settings.branches??26)),pulseCount=Math.max(6,Math.min(30,settings.pulses??24));const paths=useMemo(()=>range(branchCount).map((index)=>{const quadrant=index%4,reach=8+seeded(index,271)*12,spread=-12+seeded(index,272)*24,endX=quadrant<2?4+(quadrant===0?-reach:reach):4+spread,endZ=quadrant>=2?-13+(quadrant===2?-reach:reach):-13+spread,y=-1.72,elbow=index%2===0;return [new THREE.Vector3(4,y,-13),new THREE.Vector3(elbow?endX:4,y,elbow?-13:endZ),new THREE.Vector3(endX,y,endZ)];}),[branchCount]);return <group><mesh rotation={[-Math.PI/2,0,0]} position={[3,-1.86,-18]}><planeGeometry args={[42,65]} /><MeshReflectorMaterial blur={[220,70]} resolution={512} mixBlur={1.1} mixStrength={20} roughness={.7} depthScale={.72} color="#020a07" metalness={.76} /></mesh><mesh rotation={[-Math.PI/2,0,0]} position={[3,-1.8,-18]}><planeGeometry args={[42,65,28,40]} /><meshBasicMaterial color={accent} wireframe transparent opacity={.035} /></mesh>{paths.map((points,index)=><Line key={index} points={points} color={index%5===0?"#c9ffec":accent} transparent opacity={.2+(index%4)*.08} lineWidth={index%5===0?1.4:.8} />)}{paths.map((points,index)=>{const end=points[2],height=.35+seeded(index,273)*3.8,width=.5+seeded(index,274)*.65;return <group key={`tower-${index}`} position={[end.x,-1.72+height/2,end.z]}><mesh><boxGeometry args={[width,height,width]} /><meshStandardMaterial color="#03110c" emissive={accent} emissiveIntensity={index%4===0?.7:.17} metalness={.82} roughness={.28} /></mesh><mesh scale={[1.04,1.01,1.04]}><boxGeometry args={[width,height,width]} /><meshBasicMaterial color={accent} wireframe transparent opacity={.28} /></mesh></group>;})}{range(pulseCount).map((index)=><Signal key={index} points={paths[index%paths.length]} phase={seeded(index,276)} speed={(settings.speed??1)*(.075+seeded(index,277)*.09)} accent={accent} />)}<Processor accent={accent} /><Sparkles count={95} scale={[38,10,58]} color={accent} size={.7} speed={.12} opacity={.26} /></group>;}

export default function CircuitPulse({ settings = {} }) {
  return (
    <GpuExperience
      scene="circuit-pulse"
      World={CircuitWorld}
      settings={settings}
      accent="#55ffc0"
      background="#020806"
      eyebrow="29 — The city beneath the glass"
      title={"Every signal\nfinds a path."}
      description="A living processor routes light through a reflective circuit city, awakening towers and pathways one pulse at a time."
      cta="Send a signal"
    />
  );
}
