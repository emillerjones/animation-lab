import{r as h,j as r}from"./index-CoCVcyrP.js";import{m as ge}from"./BufferGeometryUtils-CfLCGRKU.js";import{C as we,u as ye}from"./CanvasStage-DVwv7Z2u.js";import{u as xe}from"./useDragOrbit-DlkFAz4e.js";import{u as ve}from"./usePinchZoom-CJOLy_Hl.js";import{A as be}from"./AnimationReadout-CRfHf8E1.js";import{s as o}from"./procedural-DZUg-xN7.js";import{a as Me,u as Se}from"./react-three-fiber.esm-rpEeD4NT.js";import{ad as E,C as P,S as Ae,D as Te,aa as se,a3 as ce,a9 as de,ai as Q,aD as O,V as C,a7 as Re,a5 as D,aF as ue,aG as L}from"./three.module-Ct-yBmsu.js";import"./index-D4eeSf7E.js";import"./quality-NEVBGrgs.js";import"./dragOrbit-BWBT6NeL.js";const re=1e6;new ce;function Ce(){const u=new Float32Array([0,0,0,-.42,.03,.5,-.16,.09,.97,0,.12,1.08,.16,.09,.97,.42,.03,.5]),l=[0,1,2,0,2,3,0,3,4,0,4,5],e=new de;return e.setAttribute("position",new Q(u,3)),e.setIndex(l),e.scale(.034,.034,.034),e.computeVertexNormals(),e}const le=15,ie=10,De=5,Pe=15;function je(){const u={curve:new O(new C(0,0,0),new C(.3,6,-.15),new C(-.1,12,.1)),baseRadius:.2,tipRadius:.13,canopyWeight:0,generation:0},l=[];for(let a=0;a<le;a+=1){const m=a/le*Math.PI*2+o(a,101)*.5,n=E.degToRad(28+o(a,102)*26),i=3.6+o(a,103)*7.2,g=.55+o(a,108)*.4,f=u.curve.getPoint(g),p=f.clone().add(new C(Math.cos(m)*i*.4,Math.sin(n)*i*.5,Math.sin(m)*i*.4)),x=f.clone().add(new C(Math.cos(m+o(a,105)*.25)*i*.92,Math.sin(n)*i*.95+o(a,106)*.5,Math.sin(m+o(a,105)*.25)*i*.92));l.push({curve:new O(f,p,x),baseRadius:.067+o(a,107)*.02,tipRadius:.027,canopyWeight:1,generation:1})}const e=[];l.forEach((a,m)=>{for(let n=0;n<ie;n+=1){const i=m*ie+n,g=.38+o(i,301)*.42,f=a.curve.getPoint(g),p=a.curve.getTangent(g).normalize(),x=o(i,302)*Math.PI*2,w=new C(Math.cos(x),.35+o(i,303)*.5,Math.sin(x)),b=w.addScaledVector(p,-w.dot(p)).normalize(),s=1.5+o(i,304)*5.85,y=f.clone().addScaledVector(p,s*.3).addScaledVector(b,s*.42),M=f.clone().addScaledVector(p,s*.55).addScaledVector(b,s*.95).add(new C(0,o(i,305)*.6,0));e.push({curve:new O(f,y,M),baseRadius:.02+o(i,306)*.01,tipRadius:.007,canopyWeight:2,generation:2})}});function c(a,m,n){const i=[];return a.forEach((g,f)=>{for(let p=0;p<m;p+=1){const w=f*m+p+n.seedOffset,b=n.startMin+o(w,701)*(n.startMax-n.startMin),s=g.curve.getPoint(b),y=g.curve.getTangent(b).normalize(),M=o(w,702)*Math.PI*2,R=new C(Math.cos(M),n.upwardBias+o(w,703)*.45,Math.sin(M)),S=R.addScaledVector(y,-R.dot(y)).normalize(),T=n.lengthMin+o(w,704)*(n.lengthMax-n.lengthMin),N=s.clone().addScaledVector(y,T*.36).addScaledVector(S,T*.28),U=s.clone().addScaledVector(y,T*.68).addScaledVector(S,T*.72).add(new C(0,o(w,705)*n.lift,0));i.push({curve:new O(s,N,U),baseRadius:n.baseRadiusMin+o(w,706)*n.baseRadiusVariation,tipRadius:n.tipRadius,canopyWeight:n.canopyWeight,generation:n.generation})}}),i}const t=c(e,De,{seedOffset:2e4,startMin:.42,startMax:.9,upwardBias:.24,lengthMin:.8,lengthMax:2.5,lift:.38,baseRadiusMin:.006,baseRadiusVariation:.003,tipRadius:.0024,canopyWeight:6,generation:3}),d=c(t,Pe,{seedOffset:5e4,startMin:.5,startMax:.94,upwardBias:.18,lengthMin:.38,lengthMax:1.25,lift:.2,baseRadiusMin:.0022,baseRadiusVariation:.0012,tipRadius:7e-4,canopyWeight:16,generation:4});return{trunk:u,woody:[u,...l,...e,...t,...d],canopyBranches:[...l,...e,...t,...d]}}function _(u,l=22,e=10){const c=u.curve.computeFrenetFrames(l,!1),t=[],d=[],a=[];for(let i=0;i<=l;i+=1){const g=i/l,f=u.curve.getPoint(g),p=E.lerp(u.baseRadius,u.tipRadius,g),x=c.normals[i],w=c.binormals[i];for(let b=0;b<=e;b+=1){const s=b/e*Math.PI*2,y=Math.cos(s),M=Math.sin(s),R=x.x*y+w.x*M,S=x.y*y+w.y*M,T=x.z*y+w.z*M;t.push(f.x+R*p,f.y+S*p,f.z+T*p),d.push(R,S,T)}}const m=e+1;for(let i=0;i<l;i+=1)for(let g=0;g<e;g+=1){const f=i*m+g,p=f+m,x=f+1,w=p+1;a.push(f,p,x,p,w,x)}const n=new de;return n.setAttribute("position",new Q(t,3)),n.setAttribute("normal",new Q(d,3)),n.setIndex(a),n}function ze(u){const l=u.map(c=>c.generation>=4?_(c,7,5):c.generation===3?_(c,10,6):c.generation===2?_(c,14,7):_(c,22,10)),e=ge(l);return l.forEach(c=>c.dispose()),e}function Fe(u,l){const e=[];u.forEach(t=>{for(let d=0;d<t.canopyWeight;d+=1)e.push(t)});const c=new Array(l);for(let t=0;t<l;t+=1){const d=e[Math.floor(o(t,201)*e.length)%e.length],m=.32+Math.pow(o(t,202),.55)*.68,n=d.curve.getPoint(m),i=d.curve.getTangent(m).normalize(),g=new C(o(t,203)-.5,o(t,204)*.6,o(t,205)-.5),f=g.sub(i.clone().multiplyScalar(g.dot(i))).normalize(),p=.15+o(t,206)*.55,x=n.clone().addScaledVector(f,p).addScaledVector(i,(o(t,207)-.5)*.3),w=f.lengthSq()>1e-4?f:new C(0,1,0);c[t]={position:x,normal:w}}return c}function Be(){const l=document.createElement("canvas");l.width=256,l.height=256;const e=l.getContext("2d");e.fillStyle="#3a2c22",e.fillRect(0,0,256,256);for(let t=0;t<120;t+=1){const d=o(t,301)*256;e.strokeStyle=`rgba(20, 14, 10, ${.15+o(t,302)*.25})`,e.lineWidth=1+o(t,303)*3,e.beginPath(),e.moveTo(d,0);let a=0;for(;a<256;)a+=8+o(t+a,304)*10,e.lineTo(d+Math.sin(a*.05+t)*6,a);e.stroke()}const c=new ue(l);return c.wrapS=L,c.wrapT=L,c.repeat.set(1,3),c}function Ee(){const l=document.createElement("canvas");l.width=512,l.height=512;const e=l.getContext("2d");e.fillStyle="#8f8577",e.fillRect(0,0,512,512);const c=512/2,t=512/2;for(let a=0;a<40;a+=1){const m=14+a*11+o(a,401)*3;if(m>512*.72)break;e.strokeStyle=`rgba(60, 54, 46, ${.1+o(a,402)*.12})`,e.lineWidth=1.4+o(a,403)*2,e.beginPath(),e.arc(c,t,m,o(a,404)*.6,Math.PI*2-o(a,405)*.6),e.stroke()}for(let a=0;a<400;a+=1){const m=o(a,406)*512,n=o(a,407)*512;e.fillStyle=`rgba(50, 46, 40, ${.08+o(a,408)*.12})`,e.beginPath(),e.arc(m,n,.8+o(a,409)*1.6,0,Math.PI*2),e.fill()}const d=new ue(l);return d.wrapS=L,d.wrapT=L,d}const Ie=`
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
`,Ne=`
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
`;function ke(u,l,e,c){const t=new Re;t.index=u.index,t.attributes.position=u.attributes.position,t.attributes.normal=u.attributes.normal;const d=new Float32Array(e*3),a=new Float32Array(e*3),m=new Float32Array(e),n=new Float32Array(e),i=new Float32Array(e),g=new Float32Array(e),f=new Float32Array(e),p=new Float32Array(e),x=new Float32Array(e),w=new Float32Array(e),b=new Float32Array(e);for(let s=0;s<e;s+=1){const y=l[s];d[s*3]=y.position.x,d[s*3+1]=y.position.y,d[s*3+2]=y.position.z,a[s*3]=y.normal.x,a[s*3+1]=y.normal.y,a[s*3+2]=y.normal.z,m[s]=o(s,601);const M=(3.9+o(s,602)*7.2)/c,R=27*(.6+o(s,603)*.8),S=6,T=2.4+o(s,604)*6.6;i[s]=M,g[s]=R,f[s]=S,p[s]=T,n[s]=o(s,605)*(M+R+S+T),x[s]=o(s,606),w[s]=2.4+o(s,607)*.04,b[s]=s}return t.setAttribute("aBranchPos",new D(d,3)),t.setAttribute("aBranchNormal",new D(a,3)),t.setAttribute("aCycleSeed",new D(m,1)),t.setAttribute("aCycleStart",new D(n,1)),t.setAttribute("aGrowDur",new D(i,1)),t.setAttribute("aBreatheDur",new D(g,1)),t.setAttribute("aDieDur",new D(f,1)),t.setAttribute("aDormantDur",new D(p,1)),t.setAttribute("aFallIndex",new D(b,1)),t.setAttribute("aColorSeed",new D(x,1)),t.setAttribute("aScaleVar",new D(w,1)),t.instanceCount=e,t}const z=[{sky:"#3a1f2c",fogColor:"#3a1f2c",colorA:"#f7c6d9",colorB:"#e895b3",ground:"#7fa06a"},{sky:"#3a1428",fogColor:"#3a1428",colorA:"#e8547a",colorB:"#b81f4a",ground:"#4f8a4a"},{sky:"#3a2110",fogColor:"#3a2110",colorA:"#e8a05c",colorB:"#a8481f",ground:"#8a6a34"},{sky:"#141c28",fogColor:"#141c28",colorA:"#f5f0ea",colorB:"#c8d4e0",ground:"#8a94a0"}];function Ge({settings:u,onStats:l,treePlacements:e=[{x:0,z:0,rotation:0,scale:1}],defaultCameraDistance:c=32,maxCameraDistance:t=68}){const{camera:d,gl:a}=Me(),m=ye(),n=Math.round(E.clamp(u.petalCount??6e4,2e3,re)),i=u.seasonSpeed??1,g=(u.windIntensity??100)/100,f=Math.round(E.clamp(u.flightFrequency??1e3,0,n)),p=h.useMemo(()=>Ce(),[]),{woody:x,canopyBranches:w}=h.useMemo(()=>je(),[]),b=h.useMemo(()=>Fe(w,re),[w]),s=h.useMemo(()=>b.slice(0,n),[b,n]),y=h.useMemo(()=>ke(p,s,n,1),[p,s,n]),M=h.useMemo(()=>new P(z[0].colorA),[]),R=h.useMemo(()=>new P(z[0].colorB),[]),S=h.useMemo(()=>new Ae({vertexShader:Ie,fragmentShader:Ne,uniforms:{uTime:{value:0},uWindIntensity:{value:g},uFallingPetalCount:{value:f},uSeasonColorA:{value:M},uSeasonColorB:{value:R}},side:Te}),[M,R,g]);h.useEffect(()=>()=>{y.dispose()},[y]),h.useEffect(()=>()=>{S.dispose()},[S]);const T=h.useMemo(()=>Be(),[]),N=h.useMemo(()=>Ee(),[]),U=h.useMemo(()=>new se({map:T,color:"#a9917c",roughness:.86,metalness:.05}),[T]),fe=h.useMemo(()=>new se({map:N,color:"#ffffff",roughness:.92,metalness:.02}),[N]),Y=h.useMemo(()=>ze(x),[x]);h.useEffect(()=>()=>{Y.dispose()},[Y]);const X=h.useRef(),F=h.useMemo(()=>new ce,[]);h.useEffect(()=>{const v=X.current;v&&(e.forEach((A,B)=>{F.position.set(A.x,0,A.z),F.rotation.set(0,A.rotation,0),F.scale.setScalar(A.scale),F.updateMatrix(),v.setMatrixAt(B,F.matrix)}),v.instanceMatrix.needsUpdate=!0)},[e,F]);const Z=xe({pitchMin:-.85,pitchMax:.85}),J=h.useRef(.4),q=h.useRef(c),K=h.useRef(c),he=h.useRef({value:0}),j=h.useRef({frames:0,time:0});return h.useEffect(()=>{d.position.set(0,18,52),d.lookAt(0,17,0)},[d]),ve({targetDistanceRef:K,min:15,max:t}),Se((v,A)=>{const B=v.clock.elapsedTime*m;S.uniforms.uTime.value=B,S.uniforms.uWindIntensity.value=g,S.uniforms.uFallingPetalCount.value=f;const ee=200/Math.max(.05,i),te=B%ee/ee*z.length,k=Math.floor(te)%z.length,ae=(k+1)%z.length,I=E.smoothstep(te-k,.55,1),G=z[k],V=z[ae];M.set(G.colorA).lerp(new P(V.colorA),I),R.set(G.colorB).lerp(new P(V.colorB),I);const me=new P(G.sky).lerp(new P(V.sky),I),pe=new P(G.fogColor).lerp(new P(V.fogColor),I);v.scene.background=me,v.scene.fog&&v.scene.fog.color.copy(pe);const oe=I>.5?ae:k;he.current.value=oe,J.current+=Math.min(A,.05)*.015*m;const ne=J.current+Z.current.targetYaw,H=.18+Z.current.targetPitch;q.current=E.damp(q.current,K.current,9,Math.min(A,.05));const $=q.current,W=new C(0,12,0);d.position.set(W.x+Math.sin(ne)*Math.cos(H)*$,W.y+Math.sin(H)*$*.55,W.z+Math.cos(ne)*Math.cos(H)*$),d.lookAt(W),j.current.frames+=1,j.current.time+=A,j.current.time>=.5&&(l({fps:Math.round(j.current.frames/j.current.time),season:["SPRING","SUMMER","AUTUMN","WINTER"][oe]}),j.current.frames=0,j.current.time=0)}),h.useEffect(()=>{var A;const v=((A=a==null?void 0:a.constructor)==null?void 0:A.name)??"WebGL2";l({gpu:v.includes("WebGPU")?"WebGPU":"WebGL2",petals:n,totalPetals:n*e.length,trees:e.length})},[n,e.length]),r.jsxs("group",{children:[r.jsx("ambientLight",{intensity:.14,color:"#f4e6d4"}),r.jsx("hemisphereLight",{color:"#e8ddc8",groundColor:"#3a3226",intensity:.16}),r.jsx("directionalLight",{position:[6,12,4],intensity:.5,color:"#fff2d8"}),r.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.02,0],receiveShadow:!0,children:[r.jsx("circleGeometry",{args:[32,64]}),r.jsx("primitive",{object:fe,attach:"material"})]}),r.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.01,0],children:[r.jsx("ringGeometry",{args:[30.8,31.8,64]}),r.jsx("meshStandardMaterial",{color:"#5c534a",roughness:.7})]}),[[-6.2,5.5],[6.2,5.5],[-6.2,-5.5],[6.2,-5.5]].map(([v,A],B)=>r.jsxs("group",{position:[v,0,A],children:[r.jsxs("mesh",{position:[0,.65,0],children:[r.jsx("cylinderGeometry",{args:[.14,.16,1.3,6]}),r.jsx("meshStandardMaterial",{color:"#4a473e",roughness:.8})]}),r.jsxs("mesh",{position:[0,1.4,0],children:[r.jsx("boxGeometry",{args:[.42,.32,.42]}),r.jsx("meshStandardMaterial",{color:"#3d3a32",roughness:.75})]}),r.jsx("pointLight",{position:[0,1.45,0],intensity:2.2,distance:5,color:"#ffb066"})]},B)),r.jsx("instancedMesh",{ref:X,args:[Y,U,e.length],frustumCulled:!1}),e.map((v,A)=>r.jsx("group",{position:[v.x,0,v.z],rotation:[0,v.rotation,0],scale:v.scale,children:r.jsx("mesh",{geometry:y,material:S,frustumCulled:!1})},A))]})}function Je({settings:u={}}){const[l,e]=h.useState({fps:60,gpu:"—",petals:0,season:"SPRING"}),c=t=>e(d=>({...d,...t}));return r.jsxs("section",{className:"atmosphere wishing-tree",style:{"--experiment-accent":"#ffb7c5"},children:[r.jsxs(we,{camera:{position:[0,18,52],fov:45,near:.1,far:130},speed:u.speed??1,bloom:{intensity:.85,threshold:.62},children:[r.jsx("fogExp2",{attach:"fog",args:["#f0ccd6",.012]}),r.jsx(Ge,{settings:u,onStats:c})]}),r.jsxs("div",{className:"experiment-copy wishing-tree__copy",children:[r.jsx("p",{children:"02 — Ten thousand blossoms, one wish each"}),r.jsxs("h1",{children:["The Wishing",r.jsx("br",{}),"Tree."]}),r.jsx("span",{children:"An ancient tree bears tiny blossoms instead of leaves — each one buds, breathes, and eventually falls away on the wind, while another quietly opens elsewhere on the branch. The seasons turn slowly around it, and it never stops renewing."})]}),r.jsx("div",{className:"wishing-tree__legend",children:r.jsxs("div",{children:[r.jsx("i",{children:"↻"}),r.jsxs("div",{children:[r.jsx("b",{children:"Drag"}),r.jsx("span",{children:"Orbit around the tree"})]})]})}),r.jsx(be,{eyebrow:"Grove census",value:l.season,stats:[{value:l.petals.toLocaleString(),label:"BLOSSOMS ON THE TREE"}]})]})}export{Ge as TreeScene,Je as default};
