import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import GpuExperience from "./webgl/GpuExperience";
import { seeded } from "../utils/procedural";
import { range } from "./webgl/GpuPrimitives";
import "./OrigamiFold.css";

function useWingGeometry(){return useMemo(()=>{const geometry=new THREE.BufferGeometry();geometry.setAttribute("position",new THREE.Float32BufferAttribute([0,0,0,3.5,0,.25,.75,0,2.35,0,0,0,.75,0,2.35,.14,0,.82],3));geometry.computeVertexNormals();return geometry;},[]);}
function Crane({position,scale,phase,accent}){const crane=useRef(),left=useRef(),right=useRef(),wing=useWingGeometry();useFrame((state)=>{const time=state.clock.elapsedTime,flap=Math.sin(time*.72+phase)*.24;if(left.current)left.current.rotation.z=.08+flap;if(right.current)right.current.rotation.z=-.08-flap;if(crane.current){crane.current.position.y=position[1]+Math.sin(time*.38+phase)*.42;crane.current.rotation.z=Math.sin(time*.24+phase)*.06;crane.current.rotation.y=-.18+Math.sin(time*.18+phase)*.12;}});return <group ref={crane} position={position} scale={scale}><mesh scale={[.56,.34,1.7]} rotation={[Math.PI/2,0,0]}><octahedronGeometry args={[.72,0]} /><meshStandardMaterial color="#f4ecdf" roughness={.84} flatShading /></mesh><mesh ref={left} geometry={wing} rotation={[0,-.2,.08]}><meshStandardMaterial color="#fff8ed" roughness={.88} flatShading side={THREE.DoubleSide} /></mesh><mesh ref={right} geometry={wing} scale={[-1,1,1]} rotation={[0,.2,-.08]}><meshStandardMaterial color="#e2d3c0" roughness={.9} flatShading side={THREE.DoubleSide} /></mesh><mesh position={[0,.18,1.45]} rotation={[Math.PI/3.2,0,0]}><coneGeometry args={[.25,2.25,3]} /><meshStandardMaterial color="#eee2d3" flatShading /></mesh><mesh position={[0,.7,2.3]} scale={[.42,.28,.64]}><octahedronGeometry args={[.48,0]} /><meshStandardMaterial color="#fff8ed" /></mesh><mesh position={[0,.68,2.86]} rotation={[Math.PI/2,0,0]}><coneGeometry args={[.16,.72,3]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={.12} /></mesh></group>;}
function PaperCurrent({flow,accent}){const sheet=useRef();useFrame((state)=>{if(!sheet.current)return;const time=state.clock.elapsedTime*flow,positions=sheet.current.geometry.attributes.position;range(positions.count).forEach((index)=>{const x=positions.getX(index),y=positions.getY(index);positions.setZ(index,Math.sin(y*.34+time)*.26+Math.cos(x*.7-time*.55)*.11);});positions.needsUpdate=true;sheet.current.geometry.computeVertexNormals();});return <group position={[3,-2.35,-15]} rotation={[-Math.PI/2.55,0,0]}><mesh ref={sheet}><planeGeometry args={[20,52,18,42]} /><meshStandardMaterial color="#ded1bf" emissive={accent} emissiveIntensity={.025} roughness={.96} side={THREE.DoubleSide} flatShading /></mesh><mesh position={[0,0,.025]}><planeGeometry args={[20.1,52.1,9,22]} /><meshBasicMaterial color={accent} wireframe transparent opacity={.07} /></mesh></group>;}
function OrigamiWorld({settings,accent}){const count=Math.max(6,Math.min(18,settings.facets??14)),flow=settings.flow??.8;return <group><PaperCurrent flow={flow*(settings.speed??1)} accent={accent} />{range(9).map((index)=><mesh key={index} position={[-10+index*3.5,-.8+seeded(index,251)*.9,-28-seeded(index,252)*15]} scale={[2.2+seeded(index,253)*2.7,3.1+seeded(index,254)*4.8,2.4]} rotation={[0,seeded(index,255)*.6,0]}><coneGeometry args={[1,1,4]} /><meshStandardMaterial color={index%3?"#b9aa96":"#e8dccb"} roughness={1} flatShading /></mesh>)}{range(count).map((index)=><Crane key={index} position={[(seeded(index,256)-.42)*22,1+seeded(index,257)*9,-5-seeded(index,258)*28]} scale={.36+seeded(index,259)*.46} phase={seeded(index,260)*Math.PI*2} accent={index%5===0?accent:"#d6baa0"} />)}<mesh position={[7.5,7.2,-39]}><circleGeometry args={[3.7,64]} /><meshBasicMaterial color="#f4dfbf" transparent opacity={.76} /></mesh><pointLight position={[6,7,-18]} color="#ffe0b7" intensity={32} distance={45} /><Sparkles count={70} scale={[28,14,45]} color={accent} size={.7} speed={.08} opacity={.28} /></group>;}

export default function OrigamiFold({ settings = {} }) {
  return (
    <GpuExperience
      scene="origami-fold"
      World={OrigamiWorld}
      settings={settings}
      accent="#f1d5ad"
      background="#090806"
      eyebrow="15 — A quiet transformation"
      title={"Paper learns\nto breathe."}
      description="One illuminated sheet becomes a river, a mountain range, and a flock of cranes moving together on an invisible current."
      cta="Release the fold"
      wheelInteraction
    />
  );
}
