import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import GpuExperience from "./webgl/GpuExperience";
import { seeded } from "../utils/procedural";
import { range } from "./webgl/GpuPrimitives";
import "./SakuraFall.css";

const foregroundPetals = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  x: seeded(index, 221) * 100,
  delay: seeded(index, 222) * -13,
  duration: 8 + seeded(index, 223) * 8,
  size: 9 + seeded(index, 224) * 15,
  drift: (seeded(index, 225) - 0.5) * 38,
  blur: seeded(index, 226) * 3.5,
}));

function FallingPetals({ count, breeze, accent, settings }) {
  const mesh=useRef(); const dummy=useMemo(()=>new THREE.Object3D(),[]);
  const petals=useMemo(()=>range(count).map((index)=>({x:(seeded(index,211)-.5)*30,y:seeded(index,212)*20-4,z:8-seeded(index,213)*55,phase:seeded(index,214)*Math.PI*2,fall:.35+seeded(index,215)*.8,size:.65+seeded(index,216)*1.3})),[count]);
  useFrame((state,delta)=>{if(!mesh.current)return;const time=state.clock.elapsedTime,speed=settings.speed??1;petals.forEach((petal,index)=>{petal.y-=Math.min(delta,.05)*speed*petal.fall;petal.x+=Math.sin(time*.45*breeze+petal.phase)*delta*breeze*.22;if(petal.y< -4.2){petal.y=15+seeded(index,Math.floor(time)+217)*5;petal.x=(seeded(index,Math.floor(time)+218)-.5)*30;}const tumble=time*speed*petal.fall+petal.phase;dummy.position.set(petal.x,petal.y,petal.z);dummy.rotation.set(tumble*.9,tumble*1.35,tumble*.55);dummy.scale.set(petal.size*1.15,petal.size*.24,petal.size*.72);dummy.updateMatrix();mesh.current.setMatrixAt(index,dummy.matrix);});mesh.current.instanceMatrix.needsUpdate=true;});
  return <instancedMesh ref={mesh} args={[undefined,undefined,count]} frustumCulled={false}><sphereGeometry args={[.105,6,4]} /><meshPhysicalMaterial color={accent} emissive="#9f254f" emissiveIntensity={.35} roughness={.56} side={THREE.DoubleSide} /></instancedMesh>;
}

function SakuraTree({ position, scale=1, flip=1 }) {
  const branchesRef=useRef(),blossomsRef=useRef(),dummy=useMemo(()=>new THREE.Object3D(),[]);
  const tree=useMemo(()=>{const branches=[],tips=[];let id=flip<0?420:520;const grow=(start,direction,length,radius,depth)=>{const end=start.clone().add(direction.clone().multiplyScalar(length));branches.push({start,end,radius});if(depth===0){tips.push(end);return;}range(depth>2?3:2).forEach((child)=>{id+=1;const angle=seeded(id,421+child)*Math.PI*2,outward=new THREE.Vector3(Math.cos(angle)*(.58+seeded(id,422)*.36),.38+seeded(id,423)*.45,Math.sin(angle)*(.58+seeded(id,424)*.36));grow(end,direction.clone().multiplyScalar(.42).add(outward).normalize(),length*(.61+seeded(id,425)*.12),radius*.62,depth-1);});};grow(new THREE.Vector3(),new THREE.Vector3(flip*.035,1,0).normalize(),6.7,.55,4);const blossoms=tips.flatMap((tip,tipIndex)=>range(6).map((cluster)=>({position:tip.clone().add(new THREE.Vector3((seeded(tipIndex*6+cluster,426)-.5)*1.9,(seeded(tipIndex*6+cluster,427)-.5)*1.25,(seeded(tipIndex*6+cluster,428)-.5)*1.7)),size:.16+seeded(tipIndex*6+cluster,429)*.27,shade:(tipIndex+cluster)%4})));return {branches,blossoms};},[flip]);
  useLayoutEffect(()=>{if(!branchesRef.current||!blossomsRef.current)return;const up=new THREE.Vector3(0,1,0);tree.branches.forEach((branch,index)=>{const direction=branch.end.clone().sub(branch.start);dummy.position.copy(branch.start).add(branch.end).multiplyScalar(.5);dummy.quaternion.setFromUnitVectors(up,direction.clone().normalize());dummy.scale.set(branch.radius,direction.length(),branch.radius);dummy.updateMatrix();branchesRef.current.setMatrixAt(index,dummy.matrix);});tree.blossoms.forEach((blossom,index)=>{dummy.position.copy(blossom.position);dummy.quaternion.setFromEuler(new THREE.Euler(seeded(index,430)*2,seeded(index,431)*2,seeded(index,432)*2));dummy.scale.setScalar(blossom.size);dummy.updateMatrix();blossomsRef.current.setMatrixAt(index,dummy.matrix);blossomsRef.current.setColorAt(index,new THREE.Color(["#fff0f5","#ffc5da","#f59abd","#ffdce8"][blossom.shade]));});branchesRef.current.instanceMatrix.needsUpdate=true;blossomsRef.current.instanceMatrix.needsUpdate=true;blossomsRef.current.instanceColor.needsUpdate=true;},[dummy,tree]);
  return <group position={position} scale={scale}><instancedMesh ref={branchesRef} args={[undefined,undefined,tree.branches.length]}><cylinderGeometry args={[.62,1,1,9]} /><meshStandardMaterial color="#241216" roughness={.96} /></instancedMesh><instancedMesh ref={blossomsRef} args={[undefined,undefined,tree.blossoms.length]}><sphereGeometry args={[1,9,7]} /><meshStandardMaterial vertexColors roughness={.86} emissive="#7a243f" emissiveIntensity={.12} /></instancedMesh></group>;
}

function ToriiGate(){const crown=useMemo(()=>new THREE.CatmullRomCurve3([[-5.3,8.2,0],[-3.4,8.55,0],[0,8.35,0],[3.4,8.55,0],[5.3,8.2,0]].map((p)=>new THREE.Vector3(...p))),[]);return <group position={[5.4,-2.25,-18]}>{[-3.25,3.25].map((x)=><mesh key={x} position={[x,3.8,0]}><cylinderGeometry args={[.3,.46,8.2,18]} /><meshStandardMaterial color="#7d1417" emissive="#8f1015" emissiveIntensity={.22} /></mesh>)}<mesh position={[0,7.7,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.26,.26,8.8,16]} /><meshStandardMaterial color="#8d181b" emissive="#a7181d" emissiveIntensity={.25} /></mesh><mesh><tubeGeometry args={[crown,72,.25,12,false]} /><meshStandardMaterial color="#3b0b0f" emissive="#89151a" emissiveIntensity={.2} /></mesh><pointLight position={[0,4,2]} color="#ff564e" intensity={18} distance={17} /></group>;}
function Lantern({position}){return <group position={position}><mesh position={[0,.9,0]}><boxGeometry args={[.18,1.8,.18]} /><meshStandardMaterial color="#160e0b" /></mesh><mesh position={[0,1.8,0]}><boxGeometry args={[.64,.82,.64]} /><meshStandardMaterial color="#ffcf83" emissive="#ff9d45" emissiveIntensity={3.4} /></mesh><pointLight position={[0,1.8,0]} color="#ffb562" intensity={8} distance={8} /></group>;}

const skyVertex=`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const skyFragment=`varying vec2 vUv;void main(){vec3 c=mix(vec3(.47,.24,.30),vec3(.055,.045,.085),smoothstep(.05,.92,vUv.y));float glow=max(0.,1.-distance(vUv,vec2(.73,.68))*2.4);c+=vec3(.34,.18,.14)*glow*glow;float sun=1.-smoothstep(.085,.092,distance(vUv,vec2(.73,.7)));c=mix(c,vec3(1.,.78,.65),sun*.82);gl_FragColor=vec4(c,1.);}`;
function SakuraWorld({settings,accent}){const count=Math.max(30,Math.min(150,settings.petals??110)),breeze=settings.breeze??1;return <group><mesh position={[3,5,-52]}><planeGeometry args={[74,38]} /><shaderMaterial vertexShader={skyVertex} fragmentShader={skyFragment} depthWrite={false} /></mesh><pointLight position={[7.2,7.5,-28]} color="#ffd9c7" intensity={34} distance={48} /><mesh rotation={[-Math.PI/2,0,0]} position={[3,-2.85,-20]}><planeGeometry args={[36,70]} /><MeshReflectorMaterial blur={[340,120]} resolution={512} mixBlur={1.4} mixStrength={34} roughness={.7} color="#09070b" metalness={.42} /></mesh><ToriiGate /><SakuraTree position={[-9.5,-2.8,-13]} scale={1.34} flip={-1} /><SakuraTree position={[13.5,-2.9,-22]} scale={1.22} /><SakuraTree position={[11.5,-2.7,-5]} scale={.76} />{[[1.2,-2.7,-8],[8.8,-2.7,-10.5],[2.8,-2.7,-20],[8,-2.7,-23]].map((position,index)=><Lantern key={index} position={position} />)}<FallingPetals count={count} breeze={breeze} accent={accent} settings={settings} /><Sparkles count={75} scale={[30,14,45]} color="#ffd5e6" size={.6} speed={.06} opacity={.2} /></group>;}

export default function SakuraFall({ settings = {} }) {
  const foreground = (
    <div className="sakura-world__foreground" aria-hidden="true">
      {foregroundPetals.slice(0, Math.ceil((settings.petals ?? 110) / 6)).map((petal) => (
        <i key={petal.id} style={{ "--x": `${petal.x}%`, "--delay": `${petal.delay}s`, "--duration": `${petal.duration / (settings.speed ?? 1)}s`, "--size": `${petal.size}px`, "--drift": `${petal.drift}vw`, "--blur": `${petal.blur}px` }} />
      ))}
    </div>
  );
  return <GpuExperience scene="sakura-fall" World={SakuraWorld} settings={settings} accent="#ff9fc9" background="#09070d" eyebrow="25 — Hanami after dark" title={"Spring falls\nthrough moonlight."} description="Beyond the torii, lanterns burn beside black water while an entire canopy of sakura lets go into the night." cta="Enter the garden" foreground={foreground} />;
}
