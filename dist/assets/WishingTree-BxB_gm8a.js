import{r as p,j as l}from"./index-D0EZQ-HK.js";import{m as de}from"./BufferGeometryUtils-BuhdBLCj.js";import{C as ue,u as fe}from"./CanvasStage-B4rrdWKU.js";import{u as he}from"./useDragOrbit-D4ClVIu3.js";import{A as me}from"./AnimationReadout-w_5OY5Mx.js";import{s as o}from"./procedural-DZUg-xN7.js";import{a as pe,u as ge}from"./react-three-fiber.esm-zvc4Avfo.js";import{a3 as B,C as D,S as we,D as ye,at as te,ah as se,a9 as Q,az as _,V as M,a8 as xe,aj as C,aF as re,aG as U,ag as ve}from"./three.module-4i5VD4Ag.js";import"./index-vYWcRXo0.js";import"./quality-CPSDBiLF.js";import"./dragOrbit-BGftK61W.js";const ae=1e6;new ve;function be(){const u=new Float32Array([0,0,0,-.42,.03,.5,-.16,.09,.97,0,.12,1.08,.16,.09,.97,.42,.03,.5]),i=[0,1,2,0,2,3,0,3,4,0,4,5],e=new se;return e.setAttribute("position",new Q(u,3)),e.setIndex(i),e.scale(.034,.034,.034),e.computeVertexNormals(),e}const oe=15,ne=10,Se=15,Me=2;function Ae(){const u={curve:new _(new M(0,0,0),new M(.3,6,-.15),new M(-.1,12,.1)),baseRadius:.2,tipRadius:.13,canopyWeight:0,generation:0},i=[];for(let a=0;a<oe;a+=1){const f=a/oe*Math.PI*2+o(a,101)*.5,s=B.degToRad(28+o(a,102)*26),r=3.6+o(a,103)*7.2,y=.55+o(a,108)*.4,h=u.curve.getPoint(y),m=h.clone().add(new M(Math.cos(f)*r*.4,Math.sin(s)*r*.5,Math.sin(f)*r*.4)),x=h.clone().add(new M(Math.cos(f+o(a,105)*.25)*r*.92,Math.sin(s)*r*.95+o(a,106)*.5,Math.sin(f+o(a,105)*.25)*r*.92));i.push({curve:new _(h,m,x),baseRadius:.067+o(a,107)*.02,tipRadius:.027,canopyWeight:1,generation:1})}const e=[];i.forEach((a,f)=>{for(let s=0;s<ne;s+=1){const r=f*ne+s,y=.38+o(r,301)*.42,h=a.curve.getPoint(y),m=a.curve.getTangent(y).normalize(),x=o(r,302)*Math.PI*2,g=new M(Math.cos(x),.35+o(r,303)*.5,Math.sin(x)),v=g.addScaledVector(m,-g.dot(m)).normalize(),n=1.5+o(r,304)*5.85,w=h.clone().addScaledVector(m,n*.3).addScaledVector(v,n*.42),b=h.clone().addScaledVector(m,n*.55).addScaledVector(v,n*.95).add(new M(0,o(r,305)*.6,0));e.push({curve:new _(h,w,b),baseRadius:.02+o(r,306)*.01,tipRadius:.007,canopyWeight:2,generation:2})}});function c(a,f,s){const r=[];return a.forEach((y,h)=>{for(let m=0;m<f;m+=1){const g=h*f+m+s.seedOffset,v=s.startMin+o(g,701)*(s.startMax-s.startMin),n=y.curve.getPoint(v),w=y.curve.getTangent(v).normalize(),b=o(g,702)*Math.PI*2,A=new M(Math.cos(b),s.upwardBias+o(g,703)*.45,Math.sin(b)),P=A.addScaledVector(w,-A.dot(w)).normalize(),S=s.lengthMin+o(g,704)*(s.lengthMax-s.lengthMin),E=n.clone().addScaledVector(w,S*.36).addScaledVector(P,S*.28),N=n.clone().addScaledVector(w,S*.68).addScaledVector(P,S*.72).add(new M(0,o(g,705)*s.lift,0));r.push({curve:new _(n,E,N),baseRadius:s.baseRadiusMin+o(g,706)*s.baseRadiusVariation,tipRadius:s.tipRadius,canopyWeight:s.canopyWeight,generation:s.generation})}}),r}const t=c(e,Se,{seedOffset:2e4,startMin:.42,startMax:.9,upwardBias:.24,lengthMin:.8,lengthMax:2.5,lift:.38,baseRadiusMin:.006,baseRadiusVariation:.003,tipRadius:.0024,canopyWeight:6,generation:3}),d=c(t,Me,{seedOffset:5e4,startMin:.5,startMax:.94,upwardBias:.18,lengthMin:.38,lengthMax:1.25,lift:.2,baseRadiusMin:.0022,baseRadiusVariation:.0012,tipRadius:7e-4,canopyWeight:16,generation:4});return{trunk:u,woody:[u,...i,...e,...t,...d],canopyBranches:[...i,...e,...t,...d]}}function L(u,i=22,e=10){const c=u.curve.computeFrenetFrames(i,!1),t=[],d=[],a=[];for(let r=0;r<=i;r+=1){const y=r/i,h=u.curve.getPoint(y),m=B.lerp(u.baseRadius,u.tipRadius,y),x=c.normals[r],g=c.binormals[r];for(let v=0;v<=e;v+=1){const n=v/e*Math.PI*2,w=Math.cos(n),b=Math.sin(n),A=x.x*w+g.x*b,P=x.y*w+g.y*b,S=x.z*w+g.z*b;t.push(h.x+A*m,h.y+P*m,h.z+S*m),d.push(A,P,S)}}const f=e+1;for(let r=0;r<i;r+=1)for(let y=0;y<e;y+=1){const h=r*f+y,m=h+f,x=h+1,g=m+1;a.push(h,m,x,m,g,x)}const s=new se;return s.setAttribute("position",new Q(t,3)),s.setAttribute("normal",new Q(d,3)),s.setIndex(a),s}function Te(u){const i=u.map(c=>c.generation>=4?L(c,7,5):c.generation===3?L(c,10,6):c.generation===2?L(c,14,7):L(c,22,10)),e=de(i);return i.forEach(c=>c.dispose()),e}function Re(u,i){const e=[];u.forEach(t=>{for(let d=0;d<t.canopyWeight;d+=1)e.push(t)});const c=new Array(i);for(let t=0;t<i;t+=1){const d=e[Math.floor(o(t,201)*e.length)%e.length],f=.32+Math.pow(o(t,202),.55)*.68,s=d.curve.getPoint(f),r=d.curve.getTangent(f).normalize(),y=new M(o(t,203)-.5,o(t,204)*.6,o(t,205)-.5),h=y.sub(r.clone().multiplyScalar(y.dot(r))).normalize(),m=.15+o(t,206)*.55,x=s.clone().addScaledVector(h,m).addScaledVector(r,(o(t,207)-.5)*.3),g=h.lengthSq()>1e-4?h:new M(0,1,0);c[t]={position:x,normal:g}}return c}function Ce(){const i=document.createElement("canvas");i.width=256,i.height=256;const e=i.getContext("2d");e.fillStyle="#3a2c22",e.fillRect(0,0,256,256);for(let t=0;t<120;t+=1){const d=o(t,301)*256;e.strokeStyle=`rgba(20, 14, 10, ${.15+o(t,302)*.25})`,e.lineWidth=1+o(t,303)*3,e.beginPath(),e.moveTo(d,0);let a=0;for(;a<256;)a+=8+o(t+a,304)*10,e.lineTo(d+Math.sin(a*.05+t)*6,a);e.stroke()}const c=new re(i);return c.wrapS=U,c.wrapT=U,c.repeat.set(1,3),c}function Pe(){const i=document.createElement("canvas");i.width=512,i.height=512;const e=i.getContext("2d");e.fillStyle="#8f8577",e.fillRect(0,0,512,512);const c=512/2,t=512/2;for(let a=0;a<40;a+=1){const f=14+a*11+o(a,401)*3;if(f>512*.72)break;e.strokeStyle=`rgba(60, 54, 46, ${.1+o(a,402)*.12})`,e.lineWidth=1.4+o(a,403)*2,e.beginPath(),e.arc(c,t,f,o(a,404)*.6,Math.PI*2-o(a,405)*.6),e.stroke()}for(let a=0;a<400;a+=1){const f=o(a,406)*512,s=o(a,407)*512;e.fillStyle=`rgba(50, 46, 40, ${.08+o(a,408)*.12})`,e.beginPath(),e.arc(f,s,.8+o(a,409)*1.6,0,Math.PI*2),e.fill()}const d=new re(i);return d.wrapS=U,d.wrapT=U,d}const De=`
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
`,je=`
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
`;function ze(u,i,e,c){const t=new xe;t.index=u.index,t.attributes.position=u.attributes.position,t.attributes.normal=u.attributes.normal;const d=new Float32Array(e*3),a=new Float32Array(e*3),f=new Float32Array(e),s=new Float32Array(e),r=new Float32Array(e),y=new Float32Array(e),h=new Float32Array(e),m=new Float32Array(e),x=new Float32Array(e),g=new Float32Array(e),v=new Float32Array(e);for(let n=0;n<e;n+=1){const w=i[n];d[n*3]=w.position.x,d[n*3+1]=w.position.y,d[n*3+2]=w.position.z,a[n*3]=w.normal.x,a[n*3+1]=w.normal.y,a[n*3+2]=w.normal.z,f[n]=o(n,601);const b=(3.9+o(n,602)*7.2)/c,A=27*(.6+o(n,603)*.8),P=6,S=2.4+o(n,604)*6.6;r[n]=b,y[n]=A,h[n]=P,m[n]=S,s[n]=o(n,605)*(b+A+P+S),x[n]=o(n,606),g[n]=2.4+o(n,607)*.04,v[n]=n}return t.setAttribute("aBranchPos",new C(d,3)),t.setAttribute("aBranchNormal",new C(a,3)),t.setAttribute("aCycleSeed",new C(f,1)),t.setAttribute("aCycleStart",new C(s,1)),t.setAttribute("aGrowDur",new C(r,1)),t.setAttribute("aBreatheDur",new C(y,1)),t.setAttribute("aDieDur",new C(h,1)),t.setAttribute("aDormantDur",new C(m,1)),t.setAttribute("aFallIndex",new C(v,1)),t.setAttribute("aColorSeed",new C(x,1)),t.setAttribute("aScaleVar",new C(g,1)),t.instanceCount=e,t}const F=[{sky:"#3a1f2c",fogColor:"#3a1f2c",colorA:"#f7c6d9",colorB:"#e895b3",ground:"#7fa06a"},{sky:"#3a1428",fogColor:"#3a1428",colorA:"#e8547a",colorB:"#b81f4a",ground:"#4f8a4a"},{sky:"#3a2110",fogColor:"#3a2110",colorA:"#e8a05c",colorB:"#a8481f",ground:"#8a6a34"},{sky:"#141c28",fogColor:"#141c28",colorA:"#f5f0ea",colorB:"#c8d4e0",ground:"#8a94a0"}];function Fe({settings:u,onStats:i}){const{camera:e,gl:c}=pe(),t=fe(),d=Math.round(B.clamp(u.petalCount??6e4,2e3,ae)),a=u.seasonSpeed??1,f=(u.windIntensity??100)/100,s=Math.round(B.clamp(u.flightFrequency??1e3,0,d)),r=p.useMemo(()=>be(),[]),{woody:y,canopyBranches:h}=p.useMemo(()=>Ae(),[]),m=p.useMemo(()=>Re(h,ae),[h]),x=p.useMemo(()=>m.slice(0,d),[m,d]),g=p.useMemo(()=>ze(r,x,d,1),[r,x,d]),v=p.useMemo(()=>new D(F[0].colorA),[]),n=p.useMemo(()=>new D(F[0].colorB),[]),w=p.useMemo(()=>new we({vertexShader:De,fragmentShader:je,uniforms:{uTime:{value:0},uWindIntensity:{value:f},uFallingPetalCount:{value:s},uSeasonColorA:{value:v},uSeasonColorB:{value:n}},side:ye}),[v,n,f]);p.useEffect(()=>()=>{g.dispose()},[g]),p.useEffect(()=>()=>{w.dispose()},[w]);const b=p.useMemo(()=>Ce(),[]),A=p.useMemo(()=>Pe(),[]),P=p.useMemo(()=>new te({map:b,color:"#a9917c",roughness:.86,metalness:.05}),[b]),S=p.useMemo(()=>new te({map:A,color:"#ffffff",roughness:.92,metalness:.02}),[A]),E=p.useMemo(()=>Te(y),[y]);p.useEffect(()=>()=>{E.dispose()},[E]);const N=he({pitchMin:-.45,pitchMax:.5}),X=p.useRef(.4),Y=p.useRef(32),q=p.useRef(32),le=p.useRef({value:0}),j=p.useRef({frames:0,time:0});return p.useEffect(()=>{e.position.set(0,18,52),e.lookAt(0,17,0)},[e]),p.useEffect(()=>{const T=c.domElement,R=z=>{if(!window.matchMedia("(hover: hover) and (pointer: fine)").matches)return;z.preventDefault();const k=Math.exp(z.deltaY*.0012);q.current=B.clamp(q.current*k,15,68)};return T.addEventListener("wheel",R,{passive:!1}),()=>T.removeEventListener("wheel",R)},[c]),ge((T,R)=>{const z=T.clock.elapsedTime*t;w.uniforms.uTime.value=z,w.uniforms.uWindIntensity.value=f,w.uniforms.uFallingPetalCount.value=s;const k=200/Math.max(.05,a),J=z%k/k*F.length,G=Math.floor(J)%F.length,K=(G+1)%F.length,I=B.smoothstep(J-G,.55,1),V=F[G],W=F[K];v.set(V.colorA).lerp(new D(W.colorA),I),n.set(V.colorB).lerp(new D(W.colorB),I);const ie=new D(V.sky).lerp(new D(W.sky),I),ce=new D(V.fogColor).lerp(new D(W.fogColor),I);T.scene.background=ie,T.scene.fog&&T.scene.fog.color.copy(ce);const Z=I>.5?K:G;le.current.value=Z,X.current+=Math.min(R,.05)*.015*t;const ee=X.current+N.current.targetYaw,H=.18+N.current.targetPitch;Y.current=B.damp(Y.current,q.current,9,Math.min(R,.05));const $=Y.current,O=new M(0,12,0);e.position.set(O.x+Math.sin(ee)*Math.cos(H)*$,O.y+Math.sin(H)*$*.55,O.z+Math.cos(ee)*Math.cos(H)*$),e.lookAt(O),j.current.frames+=1,j.current.time+=R,j.current.time>=.5&&(i({fps:Math.round(j.current.frames/j.current.time),season:["SPRING","SUMMER","AUTUMN","WINTER"][Z]}),j.current.frames=0,j.current.time=0)}),p.useEffect(()=>{var R;const T=((R=c==null?void 0:c.constructor)==null?void 0:R.name)??"WebGL2";i({gpu:T.includes("WebGPU")?"WebGPU":"WebGL2",petals:d})},[d]),l.jsxs("group",{children:[l.jsx("ambientLight",{intensity:.14,color:"#f4e6d4"}),l.jsx("hemisphereLight",{color:"#e8ddc8",groundColor:"#3a3226",intensity:.16}),l.jsx("directionalLight",{position:[6,12,4],intensity:.5,color:"#fff2d8"}),l.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.02,0],receiveShadow:!0,children:[l.jsx("circleGeometry",{args:[32,64]}),l.jsx("primitive",{object:S,attach:"material"})]}),l.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.01,0],children:[l.jsx("ringGeometry",{args:[30.8,31.8,64]}),l.jsx("meshStandardMaterial",{color:"#5c534a",roughness:.7})]}),[[-6.2,5.5],[6.2,5.5],[-6.2,-5.5],[6.2,-5.5]].map(([T,R],z)=>l.jsxs("group",{position:[T,0,R],children:[l.jsxs("mesh",{position:[0,.65,0],children:[l.jsx("cylinderGeometry",{args:[.14,.16,1.3,6]}),l.jsx("meshStandardMaterial",{color:"#4a473e",roughness:.8})]}),l.jsxs("mesh",{position:[0,1.4,0],children:[l.jsx("boxGeometry",{args:[.42,.32,.42]}),l.jsx("meshStandardMaterial",{color:"#3d3a32",roughness:.75})]}),l.jsx("pointLight",{position:[0,1.45,0],intensity:2.2,distance:5,color:"#ffb066"})]},z)),l.jsx("mesh",{geometry:E,material:P}),l.jsx("mesh",{geometry:g,material:w,frustumCulled:!1})]})}function Ye({settings:u={}}){const[i,e]=p.useState({fps:60,gpu:"—",petals:0,season:"SPRING"}),c=t=>e(d=>({...d,...t}));return l.jsxs("section",{className:"atmosphere wishing-tree",style:{"--experiment-accent":"#ffb7c5"},children:[l.jsxs(ue,{camera:{position:[0,18,52],fov:45,near:.1,far:130},speed:u.speed??1,bloom:{intensity:.85,threshold:.62},children:[l.jsx("fogExp2",{attach:"fog",args:["#f0ccd6",.012]}),l.jsx(Fe,{settings:u,onStats:c})]}),l.jsxs("div",{className:"experiment-copy wishing-tree__copy",children:[l.jsx("p",{children:"26 — Ten thousand blossoms, one wish each"}),l.jsxs("h1",{children:["The Wishing",l.jsx("br",{}),"Tree."]}),l.jsx("span",{children:"An ancient tree bears tiny blossoms instead of leaves — each one buds, breathes, and eventually falls away on the wind, while another quietly opens elsewhere on the branch. The seasons turn slowly around it, and it never stops renewing."})]}),l.jsx("div",{className:"wishing-tree__legend",children:l.jsxs("div",{children:[l.jsx("i",{children:"↻"}),l.jsxs("div",{children:[l.jsx("b",{children:"Drag"}),l.jsx("span",{children:"Orbit around the tree"})]})]})}),l.jsx(me,{eyebrow:"Grove census",value:i.season,stats:[{value:i.petals.toLocaleString(),label:"BLOSSOMS ON THE TREE"}]})]})}export{Ye as default};
