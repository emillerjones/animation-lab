import{r as p,j as r}from"./index-QM72KKSz.js";import{m as he}from"./BufferGeometryUtils-CfLCGRKU.js";import{C as me,u as pe}from"./CanvasStage-C57arpMO.js";import{u as ge}from"./useDragOrbit-CBiJj8KP.js";import{A as we}from"./AnimationReadout-CaxHzVED.js";import{s as o}from"./procedural-DZUg-xN7.js";import{a as ye,u as xe}from"./react-three-fiber.esm-BdHzKJUT.js";import{ad as B,C as D,S as ve,D as be,aa as oe,a9 as le,ai as X,aD as O,V as C,a7 as Se,a5 as P,aF as ie,aG as L,a3 as Me}from"./three.module-Ct-yBmsu.js";import"./index-CHJP-Jvs.js";import"./quality-NEVBGrgs.js";import"./dragOrbit-v25o8ncq.js";const ne=1e6;new Me;function Ae(){const u=new Float32Array([0,0,0,-.42,.03,.5,-.16,.09,.97,0,.12,1.08,.16,.09,.97,.42,.03,.5]),l=[0,1,2,0,2,3,0,3,4,0,4,5],e=new le;return e.setAttribute("position",new X(u,3)),e.setIndex(l),e.scale(.034,.034,.034),e.computeVertexNormals(),e}const se=15,re=10,Te=5,Re=15;function Ce(){const u={curve:new O(new C(0,0,0),new C(.3,6,-.15),new C(-.1,12,.1)),baseRadius:.2,tipRadius:.13,canopyWeight:0,generation:0},l=[];for(let t=0;t<se;t+=1){const h=t/se*Math.PI*2+o(t,101)*.5,n=B.degToRad(28+o(t,102)*26),i=3.6+o(t,103)*7.2,g=.55+o(t,108)*.4,f=u.curve.getPoint(g),m=f.clone().add(new C(Math.cos(h)*i*.4,Math.sin(n)*i*.5,Math.sin(h)*i*.4)),x=f.clone().add(new C(Math.cos(h+o(t,105)*.25)*i*.92,Math.sin(n)*i*.95+o(t,106)*.5,Math.sin(h+o(t,105)*.25)*i*.92));l.push({curve:new O(f,m,x),baseRadius:.067+o(t,107)*.02,tipRadius:.027,canopyWeight:1,generation:1})}const e=[];l.forEach((t,h)=>{for(let n=0;n<re;n+=1){const i=h*re+n,g=.38+o(i,301)*.42,f=t.curve.getPoint(g),m=t.curve.getTangent(g).normalize(),x=o(i,302)*Math.PI*2,w=new C(Math.cos(x),.35+o(i,303)*.5,Math.sin(x)),b=w.addScaledVector(m,-w.dot(m)).normalize(),s=1.5+o(i,304)*5.85,y=f.clone().addScaledVector(m,s*.3).addScaledVector(b,s*.42),S=f.clone().addScaledVector(m,s*.55).addScaledVector(b,s*.95).add(new C(0,o(i,305)*.6,0));e.push({curve:new O(f,y,S),baseRadius:.02+o(i,306)*.01,tipRadius:.007,canopyWeight:2,generation:2})}});function c(t,h,n){const i=[];return t.forEach((g,f)=>{for(let m=0;m<h;m+=1){const w=f*h+m+n.seedOffset,b=n.startMin+o(w,701)*(n.startMax-n.startMin),s=g.curve.getPoint(b),y=g.curve.getTangent(b).normalize(),S=o(w,702)*Math.PI*2,R=new C(Math.cos(S),n.upwardBias+o(w,703)*.45,Math.sin(S)),M=R.addScaledVector(y,-R.dot(y)).normalize(),A=n.lengthMin+o(w,704)*(n.lengthMax-n.lengthMin),I=s.clone().addScaledVector(y,A*.36).addScaledVector(M,A*.28),U=s.clone().addScaledVector(y,A*.68).addScaledVector(M,A*.72).add(new C(0,o(w,705)*n.lift,0));i.push({curve:new O(s,I,U),baseRadius:n.baseRadiusMin+o(w,706)*n.baseRadiusVariation,tipRadius:n.tipRadius,canopyWeight:n.canopyWeight,generation:n.generation})}}),i}const a=c(e,Te,{seedOffset:2e4,startMin:.42,startMax:.9,upwardBias:.24,lengthMin:.8,lengthMax:2.5,lift:.38,baseRadiusMin:.006,baseRadiusVariation:.003,tipRadius:.0024,canopyWeight:6,generation:3}),d=c(a,Re,{seedOffset:5e4,startMin:.5,startMax:.94,upwardBias:.18,lengthMin:.38,lengthMax:1.25,lift:.2,baseRadiusMin:.0022,baseRadiusVariation:.0012,tipRadius:7e-4,canopyWeight:16,generation:4});return{trunk:u,woody:[u,...l,...e,...a,...d],canopyBranches:[...l,...e,...a,...d]}}function _(u,l=22,e=10){const c=u.curve.computeFrenetFrames(l,!1),a=[],d=[],t=[];for(let i=0;i<=l;i+=1){const g=i/l,f=u.curve.getPoint(g),m=B.lerp(u.baseRadius,u.tipRadius,g),x=c.normals[i],w=c.binormals[i];for(let b=0;b<=e;b+=1){const s=b/e*Math.PI*2,y=Math.cos(s),S=Math.sin(s),R=x.x*y+w.x*S,M=x.y*y+w.y*S,A=x.z*y+w.z*S;a.push(f.x+R*m,f.y+M*m,f.z+A*m),d.push(R,M,A)}}const h=e+1;for(let i=0;i<l;i+=1)for(let g=0;g<e;g+=1){const f=i*h+g,m=f+h,x=f+1,w=m+1;t.push(f,m,x,m,w,x)}const n=new le;return n.setAttribute("position",new X(a,3)),n.setAttribute("normal",new X(d,3)),n.setIndex(t),n}function Pe(u){const l=u.map(c=>c.generation>=4?_(c,7,5):c.generation===3?_(c,10,6):c.generation===2?_(c,14,7):_(c,22,10)),e=he(l);return l.forEach(c=>c.dispose()),e}function De(u,l){const e=[];u.forEach(a=>{for(let d=0;d<a.canopyWeight;d+=1)e.push(a)});const c=new Array(l);for(let a=0;a<l;a+=1){const d=e[Math.floor(o(a,201)*e.length)%e.length],h=.32+Math.pow(o(a,202),.55)*.68,n=d.curve.getPoint(h),i=d.curve.getTangent(h).normalize(),g=new C(o(a,203)-.5,o(a,204)*.6,o(a,205)-.5),f=g.sub(i.clone().multiplyScalar(g.dot(i))).normalize(),m=.15+o(a,206)*.55,x=n.clone().addScaledVector(f,m).addScaledVector(i,(o(a,207)-.5)*.3),w=f.lengthSq()>1e-4?f:new C(0,1,0);c[a]={position:x,normal:w}}return c}function je(){const l=document.createElement("canvas");l.width=256,l.height=256;const e=l.getContext("2d");e.fillStyle="#3a2c22",e.fillRect(0,0,256,256);for(let a=0;a<120;a+=1){const d=o(a,301)*256;e.strokeStyle=`rgba(20, 14, 10, ${.15+o(a,302)*.25})`,e.lineWidth=1+o(a,303)*3,e.beginPath(),e.moveTo(d,0);let t=0;for(;t<256;)t+=8+o(a+t,304)*10,e.lineTo(d+Math.sin(t*.05+a)*6,t);e.stroke()}const c=new ie(l);return c.wrapS=L,c.wrapT=L,c.repeat.set(1,3),c}function ze(){const l=document.createElement("canvas");l.width=512,l.height=512;const e=l.getContext("2d");e.fillStyle="#8f8577",e.fillRect(0,0,512,512);const c=512/2,a=512/2;for(let t=0;t<40;t+=1){const h=14+t*11+o(t,401)*3;if(h>512*.72)break;e.strokeStyle=`rgba(60, 54, 46, ${.1+o(t,402)*.12})`,e.lineWidth=1.4+o(t,403)*2,e.beginPath(),e.arc(c,a,h,o(t,404)*.6,Math.PI*2-o(t,405)*.6),e.stroke()}for(let t=0;t<400;t+=1){const h=o(t,406)*512,n=o(t,407)*512;e.fillStyle=`rgba(50, 46, 40, ${.08+o(t,408)*.12})`,e.beginPath(),e.arc(h,n,.8+o(t,409)*1.6,0,Math.PI*2),e.fill()}const d=new ie(l);return d.wrapS=L,d.wrapT=L,d}const Fe=`
  attribute vec3 aBranchPos;
  attribute vec3 aBranchNormal;
  attribute float aCycleSeed;
  attribute float aCycleStart;
  attribute float aGrowDur;
  attribute float aBreatheDur;
  attribute float aDieDur;
  attribute float aDormantDur;
  attribute float aColorSeed;
  attribute float aScaleVar;
  attribute float aFallIndex;

  uniform float uTime;
  uniform float uWindIntensity;
  uniform float uFallingPetalCount;

  varying vec3 vNormal;
  varying float vColorSeed;
  varying float vScale;

  vec3 rotateAroundAxis(vec3 p, vec3 axis, float angle) {
    return p * cos(angle) + cross(axis, p) * sin(angle) + axis * dot(axis, p) * (1.0 - cos(angle));
  }

  void main() {
    float cycleLen = aGrowDur + aBreatheDur + aDieDur + aDormantDur;
    float t = mod(uTime - aCycleStart, cycleLen);
    float scale = 0.0;
    float openT = 0.0;
    vec3 fallOffset = vec3(0.0);
    float fallSpin = 0.0;
    if (t < aGrowDur) {
      float growT = t / max(0.001, aGrowDur);
      scale = growT * growT * (3.0 - 2.0 * growT);
      openT = scale;
    } else if (t < aGrowDur + aBreatheDur) {
      // Attached and fully open — no idle animation layered on top, just sits as a real
      // petal would until it's time to fall.
      openT = 1.0;
      scale = 1.0;
    } else if (t < aGrowDur + aBreatheDur + aDieDur) {
      openT = 1.0;
      float dieT = (t - aGrowDur - aBreatheDur) / max(0.001, aDieDur);
      // Remain readable through the descent, then disappear only as the petal
      // reaches the ground instead of shrinking in mid-air.
      scale = 1.0 - smoothstep(0.9, 1.0, dieT);
      // A falling petal drifts and tumbles away rather than just shrinking in place — real
      // wind carries it further sideways as it falls.
      float wind = max(0.3, uWindIntensity);
      float fallDistance = max(0.0, aBranchPos.y - 0.05);
      fallOffset = vec3(
        sin(aCycleSeed * 12.1) * dieT * 1.5 * wind,
        -fallDistance * dieT * dieT,
        cos(aCycleSeed * 8.7) * dieT * 1.5 * wind
      );
      fallSpin = dieT * 7.0;
    } else {
      scale = 0.0;
    }

    // The control is an exact concurrent count. The selected instances loop
    // continuously from branch to ground; every other blossom remains attached.
    if (aFallIndex < uFallingPetalCount) {
      float controlledFallT = fract(uTime / 6.0 + aCycleSeed);
      float wind = max(0.3, uWindIntensity);
      float fallDistance = max(0.0, aBranchPos.y - 0.05);
      scale = 1.0 - smoothstep(0.9, 1.0, controlledFallT);
      openT = 1.0;
      fallOffset = vec3(
        sin(aCycleSeed * 12.1) * controlledFallT * 1.5 * wind,
        -fallDistance * controlledFallT * controlledFallT,
        cos(aCycleSeed * 8.7) * controlledFallT * 1.5 * wind
      );
      fallSpin = controlledFallT * 7.0;
    } else {
      scale = 1.0;
      openT = 1.0;
      fallOffset = vec3(0.0);
      fallSpin = 0.0;
    }

    // Bud opening: the petal rotates open from folded-against-receptacle to flat as it grows.
    vec3 localPos = position;
    vec3 localNormal = normal;
    float closedAngle = mix(1.35, 0.0, openT);
    localPos = rotateAroundAxis(localPos, vec3(1.0, 0.0, 0.0), closedAngle);
    localNormal = rotateAroundAxis(localNormal, vec3(1.0, 0.0, 0.0), closedAngle);
    localPos = rotateAroundAxis(localPos, vec3(0.3, 1.0, 0.2), fallSpin);
    localNormal = rotateAroundAxis(localNormal, vec3(0.3, 1.0, 0.2), fallSpin);
    localPos *= scale * aScaleVar;

    vec3 up = vec3(0.0, 1.0, 0.0);
    vec3 outward = vec3(aBranchNormal.x, 0.0, aBranchNormal.z);
    vec3 fwd = (dot(outward, outward) > 0.0001) ? normalize(outward) : vec3(1.0, 0.0, 0.0);
    vec3 right = normalize(cross(up, fwd));
    fwd = normalize(cross(right, up));
    // Petals have no "face" to keep readable, so unlike a bird they can be rotated fully
    // freely per instance — a natural, un-uniform scatter, like real blossoms on a branch.
    // Fixed per-instance orientation only — no idle time-based wobble on attached petals.
    float yaw = aCycleSeed * 6.2831;
    float cy = cos(yaw);
    float sy = sin(yaw);
    vec3 rotFwd = fwd * cy + right * sy;
    vec3 rotRight = right * cy - fwd * sy;
    float rollSeed = fract(aCycleSeed * 17.23 + 0.41);
    float roll = rollSeed * 6.2831;
    vec3 tiltUp = rotateAroundAxis(up, rotFwd, roll);
    vec3 tiltRight = rotateAroundAxis(rotRight, rotFwd, roll);
    vec3 worldOffset = tiltRight * localPos.x + tiltUp * localPos.y + rotFwd * localPos.z + fallOffset;
    vec3 worldPos = aBranchPos + worldOffset;
    vec3 worldNormal = normalize(tiltRight * localNormal.x + tiltUp * localNormal.y + rotFwd * localNormal.z);

    vNormal = normalize(normalMatrix * worldNormal);
    vColorSeed = aColorSeed;
    vScale = scale;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPos, 1.0);
  }
`,Be=`
  uniform vec3 uSeasonColorA;
  uniform vec3 uSeasonColorB;
  varying vec3 vNormal;
  varying float vColorSeed;
  varying float vScale;

  void main() {
    if (vScale <= 0.004) discard;
    vec3 n = normalize(vNormal);
    vec3 lightDir = normalize(vec3(0.4, 1.0, 0.35));
    float lambert = max(dot(n, lightDir), 0.0);
    // Petals are thin and slightly translucent — a soft wrap term keeps the shadowed side
    // from going flat black, unlike a hard-shaded paper facet.
    float wrap = max(dot(n, -lightDir), 0.0) * 0.35;
    vec3 base = mix(uSeasonColorA, uSeasonColorB, fract(vColorSeed * 3.7));
    vec3 shaded = base * (0.4 + lambert * 0.55 + wrap);
    gl_FragColor = vec4(shaded, 1.0);
  }
`;function Ee(u,l,e,c){const a=new Se;a.index=u.index,a.attributes.position=u.attributes.position,a.attributes.normal=u.attributes.normal;const d=new Float32Array(e*3),t=new Float32Array(e*3),h=new Float32Array(e),n=new Float32Array(e),i=new Float32Array(e),g=new Float32Array(e),f=new Float32Array(e),m=new Float32Array(e),x=new Float32Array(e),w=new Float32Array(e),b=new Float32Array(e);for(let s=0;s<e;s+=1){const y=l[s];d[s*3]=y.position.x,d[s*3+1]=y.position.y,d[s*3+2]=y.position.z,t[s*3]=y.normal.x,t[s*3+1]=y.normal.y,t[s*3+2]=y.normal.z,h[s]=o(s,601);const S=(3.9+o(s,602)*7.2)/c,R=27*(.6+o(s,603)*.8),M=6,A=2.4+o(s,604)*6.6;i[s]=S,g[s]=R,f[s]=M,m[s]=A,n[s]=o(s,605)*(S+R+M+A),x[s]=o(s,606),w[s]=2.4+o(s,607)*.04,b[s]=s}return a.setAttribute("aBranchPos",new P(d,3)),a.setAttribute("aBranchNormal",new P(t,3)),a.setAttribute("aCycleSeed",new P(h,1)),a.setAttribute("aCycleStart",new P(n,1)),a.setAttribute("aGrowDur",new P(i,1)),a.setAttribute("aBreatheDur",new P(g,1)),a.setAttribute("aDieDur",new P(f,1)),a.setAttribute("aDormantDur",new P(m,1)),a.setAttribute("aFallIndex",new P(b,1)),a.setAttribute("aColorSeed",new P(x,1)),a.setAttribute("aScaleVar",new P(w,1)),a.instanceCount=e,a}const F=[{sky:"#3a1f2c",fogColor:"#3a1f2c",colorA:"#f7c6d9",colorB:"#e895b3",ground:"#7fa06a"},{sky:"#3a1428",fogColor:"#3a1428",colorA:"#e8547a",colorB:"#b81f4a",ground:"#4f8a4a"},{sky:"#3a2110",fogColor:"#3a2110",colorA:"#e8a05c",colorB:"#a8481f",ground:"#8a6a34"},{sky:"#141c28",fogColor:"#141c28",colorA:"#f5f0ea",colorB:"#c8d4e0",ground:"#8a94a0"}];function Ie({settings:u,onStats:l,treePlacements:e=[{x:0,z:0,rotation:0,scale:1}],defaultCameraDistance:c=32,maxCameraDistance:a=68}){const{camera:d,gl:t}=ye(),h=pe(),n=Math.round(B.clamp(u.petalCount??6e4,2e3,ne)),i=u.seasonSpeed??1,g=(u.windIntensity??100)/100,f=Math.round(B.clamp(u.flightFrequency??1e3,0,n)),m=p.useMemo(()=>Ae(),[]),{woody:x,canopyBranches:w}=p.useMemo(()=>Ce(),[]),b=p.useMemo(()=>De(w,ne),[w]),s=p.useMemo(()=>b.slice(0,n),[b,n]),y=p.useMemo(()=>Ee(m,s,n,1),[m,s,n]),S=p.useMemo(()=>new D(F[0].colorA),[]),R=p.useMemo(()=>new D(F[0].colorB),[]),M=p.useMemo(()=>new ve({vertexShader:Fe,fragmentShader:Be,uniforms:{uTime:{value:0},uWindIntensity:{value:g},uFallingPetalCount:{value:f},uSeasonColorA:{value:S},uSeasonColorB:{value:R}},side:be}),[S,R,g]);p.useEffect(()=>()=>{y.dispose()},[y]),p.useEffect(()=>()=>{M.dispose()},[M]);const A=p.useMemo(()=>je(),[]),I=p.useMemo(()=>ze(),[]),U=p.useMemo(()=>new oe({map:A,color:"#a9917c",roughness:.86,metalness:.05}),[A]),ce=p.useMemo(()=>new oe({map:I,color:"#ffffff",roughness:.92,metalness:.02}),[I]),Y=p.useMemo(()=>Pe(x),[x]);p.useEffect(()=>()=>{Y.dispose()},[Y]);const J=ge({pitchMin:-.45,pitchMax:.5}),K=p.useRef(.4),q=p.useRef(c),H=p.useRef(c),de=p.useRef({value:0}),j=p.useRef({frames:0,time:0});return p.useEffect(()=>{d.position.set(0,18,52),d.lookAt(0,17,0)},[d]),p.useEffect(()=>{const v=t.domElement,T=z=>{if(!window.matchMedia("(hover: hover) and (pointer: fine)").matches)return;z.preventDefault();const N=Math.exp(z.deltaY*.0012);H.current=B.clamp(H.current*N,15,a)};return v.addEventListener("wheel",T,{passive:!1}),()=>v.removeEventListener("wheel",T)},[t,a]),xe((v,T)=>{const z=v.clock.elapsedTime*h;M.uniforms.uTime.value=z,M.uniforms.uWindIntensity.value=g,M.uniforms.uFallingPetalCount.value=f;const N=200/Math.max(.05,i),Z=z%N/N*F.length,k=Math.floor(Z)%F.length,ee=(k+1)%F.length,E=B.smoothstep(Z-k,.55,1),G=F[k],V=F[ee];S.set(G.colorA).lerp(new D(V.colorA),E),R.set(G.colorB).lerp(new D(V.colorB),E);const ue=new D(G.sky).lerp(new D(V.sky),E),fe=new D(G.fogColor).lerp(new D(V.fogColor),E);v.scene.background=ue,v.scene.fog&&v.scene.fog.color.copy(fe);const te=E>.5?ee:k;de.current.value=te,K.current+=Math.min(T,.05)*.015*h;const ae=K.current+J.current.targetYaw,$=.18+J.current.targetPitch;q.current=B.damp(q.current,H.current,9,Math.min(T,.05));const Q=q.current,W=new C(0,12,0);d.position.set(W.x+Math.sin(ae)*Math.cos($)*Q,W.y+Math.sin($)*Q*.55,W.z+Math.cos(ae)*Math.cos($)*Q),d.lookAt(W),j.current.frames+=1,j.current.time+=T,j.current.time>=.5&&(l({fps:Math.round(j.current.frames/j.current.time),season:["SPRING","SUMMER","AUTUMN","WINTER"][te]}),j.current.frames=0,j.current.time=0)}),p.useEffect(()=>{var T;const v=((T=t==null?void 0:t.constructor)==null?void 0:T.name)??"WebGL2";l({gpu:v.includes("WebGPU")?"WebGPU":"WebGL2",petals:n,totalPetals:n*e.length,trees:e.length})},[n,e.length]),r.jsxs("group",{children:[r.jsx("ambientLight",{intensity:.14,color:"#f4e6d4"}),r.jsx("hemisphereLight",{color:"#e8ddc8",groundColor:"#3a3226",intensity:.16}),r.jsx("directionalLight",{position:[6,12,4],intensity:.5,color:"#fff2d8"}),r.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.02,0],receiveShadow:!0,children:[r.jsx("circleGeometry",{args:[32,64]}),r.jsx("primitive",{object:ce,attach:"material"})]}),r.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.01,0],children:[r.jsx("ringGeometry",{args:[30.8,31.8,64]}),r.jsx("meshStandardMaterial",{color:"#5c534a",roughness:.7})]}),[[-6.2,5.5],[6.2,5.5],[-6.2,-5.5],[6.2,-5.5]].map(([v,T],z)=>r.jsxs("group",{position:[v,0,T],children:[r.jsxs("mesh",{position:[0,.65,0],children:[r.jsx("cylinderGeometry",{args:[.14,.16,1.3,6]}),r.jsx("meshStandardMaterial",{color:"#4a473e",roughness:.8})]}),r.jsxs("mesh",{position:[0,1.4,0],children:[r.jsx("boxGeometry",{args:[.42,.32,.42]}),r.jsx("meshStandardMaterial",{color:"#3d3a32",roughness:.75})]}),r.jsx("pointLight",{position:[0,1.45,0],intensity:2.2,distance:5,color:"#ffb066"})]},z)),e.map((v,T)=>r.jsxs("group",{position:[v.x,0,v.z],rotation:[0,v.rotation,0],scale:v.scale,children:[r.jsx("mesh",{geometry:Y,material:U}),r.jsx("mesh",{geometry:y,material:M,frustumCulled:!1})]},T))]})}function $e({settings:u={}}){const[l,e]=p.useState({fps:60,gpu:"—",petals:0,season:"SPRING"}),c=a=>e(d=>({...d,...a}));return r.jsxs("section",{className:"atmosphere wishing-tree",style:{"--experiment-accent":"#ffb7c5"},children:[r.jsxs(me,{camera:{position:[0,18,52],fov:45,near:.1,far:130},speed:u.speed??1,bloom:{intensity:.85,threshold:.62},children:[r.jsx("fogExp2",{attach:"fog",args:["#f0ccd6",.012]}),r.jsx(Ie,{settings:u,onStats:c})]}),r.jsxs("div",{className:"experiment-copy wishing-tree__copy",children:[r.jsx("p",{children:"02 — Ten thousand blossoms, one wish each"}),r.jsxs("h1",{children:["The Wishing",r.jsx("br",{}),"Tree."]}),r.jsx("span",{children:"An ancient tree bears tiny blossoms instead of leaves — each one buds, breathes, and eventually falls away on the wind, while another quietly opens elsewhere on the branch. The seasons turn slowly around it, and it never stops renewing."})]}),r.jsx("div",{className:"wishing-tree__legend",children:r.jsxs("div",{children:[r.jsx("i",{children:"↻"}),r.jsxs("div",{children:[r.jsx("b",{children:"Drag"}),r.jsx("span",{children:"Orbit around the tree"})]})]})}),r.jsx(we,{eyebrow:"Grove census",value:l.season,stats:[{value:l.petals.toLocaleString(),label:"BLOSSOMS ON THE TREE"}]})]})}export{Ie as TreeScene,$e as default};
