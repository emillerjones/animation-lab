import{r as l,j as e}from"./index-Baxo9EmL.js";import{m as X}from"./BufferGeometryUtils-O3kpLGyb.js";import{C as se,u as ie}from"./CanvasStage-BLiAo-Ek.js";import{u as le}from"./useDragOrbit-CV9khqa6.js";import{A as ce}from"./AnimationReadout-BGH0XlZD.js";import{s as h}from"./procedural-DZUg-xN7.js";import{a as ue,u as me}from"./react-three-fiber.esm-BCBHJKtr.js";import{ad as B,C as I,S as de,D as pe,aa as Q,V as j,af as he,aS as $,dO as q,dP as fe,l as ge,R as xe,F as ve,L as J,aG as C,a7 as we,a5 as A,aF as Z,ai as D,a9 as be}from"./three.module-Bp2wqY31.js";import"./index-CD1upDUi.js";import"./quality-NwpzyrS3.js";import"./dragOrbit-v25o8ncq.js";const ye=1e4,F=512;function T(n,t){const o=n.attributes.position.count;return n.setAttribute("aHingeGroup",new D(new Float32Array(o).fill(t),1)),n}function K(n){const t=n?-1:1,o=new be;return o.setAttribute("position",new D([0,0,0,t*1.55,0,.1,t*.32,0,1.05,0,0,0,t*.32,0,1.05,t*.06,0,.36],3)),o.setAttribute("uv",new D([0,0,1,0,0,1,0,0,0,1,0,0],2)),o.computeVertexNormals(),o}function je(){const n=new $(.5,0).toNonIndexed();n.scale(.56,.34,1.35),n.rotateX(Math.PI/2),n.computeVertexNormals(),T(n,0);const t=K(!0);t.translate(-.12,.22,-.15),T(t,1);const o=K(!1);o.translate(.12,.22,-.15),T(o,2);const a=new q(.16,.68,4).toNonIndexed();a.rotateX(Math.PI/2.6),a.translate(0,.26,.62),a.computeVertexNormals();const r=new $(.14,0).toNonIndexed();r.scale(.85,.6,1.3),r.translate(0,.4,.98),r.computeVertexNormals();const s=X([a,r]);T(s,3);const i=new q(.13,.5,4).toNonIndexed();i.rotateX(-Math.PI/2.35),i.translate(0,.09,-.5),i.computeVertexNormals(),T(i,4);const p=X([n,t,o,s,i]);return[n,t,o,a,r,s,i].forEach(f=>f.dispose()),p}const Pe=[[0,3,16],[6,3.4,12],[9,3,5],[8.5,3.6,-3],[4,4.4,-8],[-4,4.6,-9],[-9,3.4,-3],[-9,2.8,6],[-5,2.6,13],[0,2.8,16]];function Ae(){const n=Pe.map(s=>new j(s[0],s[1],s[2])),t=new fe(n,!0,"catmullrom",.5),o=t.getPoints(F),a=new Float32Array(F*4);for(let s=0;s<F;s+=1){const i=o[s];a[s*4]=i.x,a[s*4+1]=i.y,a[s*4+2]=i.z,a[s*4+3]=1}const r=new ge(a,F,1,xe,ve);return r.needsUpdate=!0,r.minFilter=J,r.magFilter=J,r.wrapS=C,{curve:t,texture:r}}function Se(){const t=document.createElement("canvas");t.width=256,t.height=256;const o=t.getContext("2d");o.fillStyle="#3f2c1a",o.fillRect(0,0,256,256);for(let r=0;r<70;r+=1){const s=r*3.6+h(r,701)*3;o.strokeStyle=`rgba(20, 12, 6, ${.12+h(r,702)*.22})`,o.lineWidth=1+h(r,703)*2,o.beginPath();for(let i=0;i<=256;i+=12){const p=Math.sin(i*.03+r)*4;i===0?o.moveTo(i,s+p):o.lineTo(i,s+p)}o.stroke()}const a=new Z(t);return a.wrapS=C,a.wrapT=C,a.repeat.set(1,4),a}function Me(){const t=document.createElement("canvas");t.width=512,t.height=512;const o=t.getContext("2d");o.fillStyle="#5a5650",o.fillRect(0,0,512,512);for(let r=0;r<300;r+=1){const s=h(r,801)*512,i=h(r,802)*512;o.fillStyle=`rgba(30, 28, 24, ${.06+h(r,803)*.1})`,o.beginPath(),o.arc(s,i,1+h(r,804)*2.5,0,Math.PI*2),o.fill()}const a=new Z(t);return a.wrapS=C,a.wrapT=C,a}const Re=`
  attribute float aHingeGroup;
  attribute float aPathPhase;
  attribute float aLaneX;
  attribute float aLaneY;
  attribute float aFlapPhase;
  attribute float aFlapSpeed;
  attribute float aColorSeed;

  uniform sampler2D uPathTexture;
  uniform float uTime;
  uniform float uFlowSpeed;
  uniform float uRiverWidth;
  uniform float uWingFlutter;

  varying vec3 vNormal;
  varying float vColorSeed;
  varying float vPathU;

  vec3 rotateAroundAxis(vec3 p, vec3 axis, float angle) {
    return p * cos(angle) + cross(axis, p) * sin(angle) + axis * dot(axis, p) * (1.0 - cos(angle));
  }

  void applyFlap(inout vec3 p, inout vec3 n, int group, float openT) {
    vec3 pivot = vec3(0.0);
    vec3 axis = vec3(0.0, 0.0, 1.0);
    float closedAngle = 0.0;
    if (group == 1) { pivot = vec3(-0.12, 0.22, -0.15); axis = vec3(0.0, 0.0, 1.0); closedAngle = 0.9; }
    else if (group == 2) { pivot = vec3(0.12, 0.22, -0.15); axis = vec3(0.0, 0.0, 1.0); closedAngle = -0.9; }
    else { return; }
    float angle = mix(closedAngle, 0.0, openT);
    vec3 local = p - pivot;
    p = rotateAroundAxis(local, axis, angle) + pivot;
    n = rotateAroundAxis(n, axis, angle);
  }

  void main() {
    float u = fract(aPathPhase + uTime * uFlowSpeed);
    vec3 centerHere = texture2D(uPathTexture, vec2(u, 0.5)).xyz;
    float uAhead = fract(u + 0.006);
    vec3 centerAhead = texture2D(uPathTexture, vec2(uAhead, 0.5)).xyz;
    vec3 tangent = normalize(centerAhead - centerHere);

    vec3 worldUp = vec3(0.0, 1.0, 0.0);
    vec3 right = normalize(cross(worldUp, tangent));
    vec3 up = normalize(cross(tangent, right));

    int group = int(aHingeGroup + 0.5);
    vec3 localPos = position;
    vec3 localNormal = normal;
    float openT = 0.72 + sin(uTime * aFlapSpeed + aFlapPhase) * 0.28 * uWingFlutter;
    applyFlap(localPos, localNormal, group, clamp(openT, 0.0, 1.0));

    vec3 laneOffset = right * aLaneX * uRiverWidth + up * aLaneY * uRiverWidth;
    vec3 orientedBody = right * localPos.x + up * localPos.y + tangent * localPos.z;
    vec3 worldPos = centerHere + laneOffset + orientedBody * 0.42;
    vec3 worldNormal = normalize(right * localNormal.x + up * localNormal.y + tangent * localNormal.z);

    vNormal = normalize(normalMatrix * worldNormal);
    vColorSeed = aColorSeed;
    vPathU = u;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPos, 1.0);
  }
`,Te=`
  uniform vec3 uWarmColor;
  uniform vec3 uCoolColor;
  varying vec3 vNormal;
  varying float vColorSeed;
  varying float vPathU;

  void main() {
    vec3 lightDir = normalize(vec3(0.4, 1.0, 0.35));
    float lambert = max(dot(normalize(vNormal), lightDir), 0.0);
    float warmth = 1.0 - smoothstep(0.0, 0.62, vPathU);
    vec3 base = mix(uCoolColor, uWarmColor, warmth);
    base = mix(base, base * 1.08, fract(vColorSeed * 4.1));
    vec3 shaded = base * (0.3 + lambert * 0.68);
    gl_FragColor = vec4(shaded, 1.0);
  }
`;function Ce(n,t,o){const a=new we;a.index=n.index,a.attributes.position=n.attributes.position,a.attributes.normal=n.attributes.normal,a.attributes.aHingeGroup=n.attributes.aHingeGroup;const r=new Float32Array(t),s=new Float32Array(t),i=new Float32Array(t),p=new Float32Array(t),f=new Float32Array(t),S=new Float32Array(t);for(let u=0;u<t;u+=1){r[u]=h(u,901);const m=.4+h(u,902)*2.6,M=h(u,903)*Math.PI*2;s[u]=Math.cos(M)*m*o,i[u]=Math.sin(M)*m*.5*o,p[u]=h(u,904)*Math.PI*2,f[u]=2.2+h(u,905)*1.6,S[u]=h(u,906)}return a.setAttribute("aPathPhase",new A(r,1)),a.setAttribute("aLaneX",new A(s,1)),a.setAttribute("aLaneY",new A(i,1)),a.setAttribute("aFlapPhase",new A(p,1)),a.setAttribute("aFlapSpeed",new A(f,1)),a.setAttribute("aColorSeed",new A(S,1)),a.instanceCount=t,a}function ze({settings:n,onStats:t}){const{camera:o,gl:a}=ue(),r=ie(),s=Math.round(B.clamp(n.craneCount??6e3,2e3,ye)),i=(n.flowSpeed??1)*.016,p=(n.riverWidth??100)/100,f=(n.wingFlutter??100)/100,S=(n.lightWarmth??100)/100,u=l.useMemo(()=>je(),[]),{curve:m,texture:M}=l.useMemo(()=>Ae(),[]),N=l.useMemo(()=>Ce(u,s,p),[u,s,p]),E=l.useMemo(()=>new I("#f0b866"),[]),G=l.useMemo(()=>new I("#5c78b8"),[]),g=l.useMemo(()=>new de({vertexShader:Re,fragmentShader:Te,uniforms:{uPathTexture:{value:M},uTime:{value:0},uFlowSpeed:{value:i},uRiverWidth:{value:p},uWingFlutter:{value:f},uWarmColor:{value:E},uCoolColor:{value:G}},side:pe}),[M,E,G,i,p,f]);l.useEffect(()=>()=>{N.dispose()},[N]),l.useEffect(()=>()=>{g.dispose()},[g]);const H=l.useMemo(()=>Se(),[]),O=l.useMemo(()=>Me(),[]),z=l.useMemo(()=>new Q({map:H,color:"#c9a878",roughness:.78,metalness:.04}),[H]),ee=l.useMemo(()=>new Q({map:O,color:"#8f8a80",roughness:.85,metalness:.05}),[O]),te=l.useMemo(()=>{const d=[];for(let c=0;c<10;c+=1){const v=.02+c/10*.42,w=m.getPoint(v),b=m.getTangent(v).normalize(),y=c%2?1:-1,R=new j(-b.z,0,b.x).normalize().multiplyScalar(3.4*y);d.push(w.clone().add(R).setY(0))}return d},[m]),oe=l.useMemo(()=>m.getPoint(.58).clone().setY(1.4),[m]),k=l.useMemo(()=>m.getTangent(.58).normalize(),[m]),ae=l.useMemo(()=>new he().setFromUnitVectors(new j(0,0,1),k),[k]),re=l.useMemo(()=>{const d=[];for(let c=0;c<5;c+=1){const v=.68+c/5*.3,w=m.getPoint(v),b=m.getTangent(v).normalize(),y=c%2?1:-1,R=new j(-b.z,0,b.x).normalize().multiplyScalar(2.6*y);d.push(w.clone().add(R).setY(0))}return d},[m]),U=le({pitchMin:-.4,pitchMax:.45}),P=l.useRef(.08),x=l.useRef({frames:0,time:0}),W=l.useRef(new I);return l.useEffect(()=>{o.position.set(0,4,20),o.lookAt(0,3,12)},[o]),me((d,c)=>{const v=d.clock.elapsedTime*r;g.uniforms.uTime.value=v,g.uniforms.uFlowSpeed.value=i,g.uniforms.uRiverWidth.value=p,g.uniforms.uWingFlutter.value=f,P.current=(P.current+Math.min(c,.05)*r*.01)%1;const w=m.getPoint(P.current),b=m.getTangent(P.current).normalize(),y=m.getPoint((P.current+.03)%1),R=new j(0,1,0),V=new j().crossVectors(R,b).normalize().clone().multiplyScalar(6.5),_=U.current.targetYaw,ne=U.current.targetPitch,L=new j(Math.sin(_)*4,ne*3,Math.cos(_)*-.5);o.position.set(w.x+V.x,w.y+3.2,w.z+V.z),o.lookAt(y.x+L.x,y.y+L.y,y.z+L.z);const Y=1-B.smoothstep(P.current,0,.62);W.current.copy(G).lerp(E,Y).multiplyScalar(.32*S+.14),d.scene.background=W.current,d.scene.fog&&d.scene.fog.color.copy(W.current),x.current.frames+=1,x.current.time+=c,x.current.time>=.5&&(t({fps:Math.round(x.current.frames/x.current.time),zone:Y>.5?"TEMPLE COURTYARD":"MOONLIT GARDEN"}),x.current.frames=0,x.current.time=0)}),l.useEffect(()=>{var c;const d=((c=a==null?void 0:a.constructor)==null?void 0:c.name)??"WebGL2";t({gpu:d.includes("WebGPU")?"WebGPU":"WebGL2",cranes:s})},[s]),e.jsxs("group",{children:[e.jsx("ambientLight",{intensity:.16,color:"#f4e0c0"}),e.jsx("hemisphereLight",{color:"#dcc9a0",groundColor:"#241c14",intensity:.16}),e.jsx("directionalLight",{position:[8,10,6],intensity:.4,color:"#ffdca0"}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.05,0],children:[e.jsx("circleGeometry",{args:[22,64]}),e.jsx("primitive",{object:ee,attach:"material"})]}),te.map((d,c)=>e.jsxs("group",{position:d,children:[e.jsxs("mesh",{position:[0,2.2,0],children:[e.jsx("cylinderGeometry",{args:[.32,.38,4.4,8]}),e.jsx("primitive",{object:z,attach:"material"})]}),e.jsx("pointLight",{position:[0,4.6,0],intensity:3.5*S,distance:7,color:"#ffcf8a"})]},c)),e.jsxs("group",{position:oe,quaternion:ae,children:[e.jsxs("mesh",{children:[e.jsx("boxGeometry",{args:[3.2,.24,5.5]}),e.jsx("primitive",{object:z,attach:"material"})]}),e.jsxs("mesh",{position:[1.5,.6,0],children:[e.jsx("boxGeometry",{args:[.16,1.2,5.5]}),e.jsx("primitive",{object:z,attach:"material"})]}),e.jsxs("mesh",{position:[-1.5,.6,0],children:[e.jsx("boxGeometry",{args:[.16,1.2,5.5]}),e.jsx("primitive",{object:z,attach:"material"})]})]}),re.map((d,c)=>e.jsxs("group",{position:d,children:[e.jsxs("mesh",{position:[0,.6,0],children:[e.jsx("cylinderGeometry",{args:[.1,.12,1.2,6]}),e.jsx("meshStandardMaterial",{color:"#3a3a3e",roughness:.7})]}),e.jsxs("mesh",{position:[0,1.3,0],children:[e.jsx("boxGeometry",{args:[.34,.3,.34]}),e.jsx("meshStandardMaterial",{color:"#2e2e32",roughness:.6})]}),e.jsx("pointLight",{position:[0,1.35,0],intensity:2.4,distance:5,color:"#9db6e8"})]},c)),e.jsx("mesh",{geometry:N,material:g,frustumCulled:!1})]})}function Ve({settings:n={}}){const[t,o]=l.useState({fps:60,gpu:"—",cranes:0,zone:"TEMPLE COURTYARD"}),a=r=>o(s=>({...s,...r}));return e.jsxs("section",{className:"atmosphere river-of-wishes",style:{"--experiment-accent":"#e6c88a"},children:[e.jsxs(se,{camera:{position:[0,4,20],fov:50,near:.1,far:70},speed:n.speed??1,bloom:{intensity:.8,threshold:.6},children:[e.jsx("fogExp2",{attach:"fog",args:["#2a2418",.018]}),e.jsx(ze,{settings:n,onStats:a})]}),e.jsxs("div",{className:"experiment-copy river-of-wishes__copy",children:[e.jsx("p",{children:"27 — A river suspended in midair"}),e.jsxs("h1",{children:["The River",e.jsx("br",{}),"of Wishes."]}),e.jsx("span",{children:"Ten thousand cranes drift through an ancient temple in slow currents, parting around pillars and beneath a wooden bridge, out into a moonlit garden — never colliding, never stopping."})]}),e.jsx("div",{className:"river-of-wishes__legend",children:e.jsxs("div",{children:[e.jsx("i",{children:"↻"}),e.jsxs("div",{children:[e.jsx("b",{children:"Drag"}),e.jsx("span",{children:"Look around as you drift"})]})]})}),e.jsx(ce,{eyebrow:"Current position",value:t.zone,stats:[{value:t.cranes.toLocaleString(),label:"CRANES IN THE RIVER"},{value:t.gpu,label:"RENDERER"}]})]})}export{Ve as default};
