import{r as v,j as t}from"./index-Csbp6Pjb.js";import{C as oe,u as ie}from"./CanvasStage-D-vmxsVI.js";import{u as se}from"./useDragOrbit-DRK2Dch0.js";import{A as ne}from"./AnimationReadout-CMvLBZKy.js";import{s as f}from"./procedural-DZUg-xN7.js";import{a as ce,u as le}from"./react-three-fiber.esm-KLUw_0uF.js";import{ad as D,aa as Y,D as ue,V as $,a9 as ve,ai as J,dO as pe,l as de,R as me,F as he,N as Q,aG as O,a7 as fe,a5 as z,aF as re}from"./three.module-Ct-yBmsu.js";import"./index-6qDYq_GM.js";import"./usePinchZoom-BZTNYm_c.js";import"./quality-NEVBGrgs.js";import"./dragOrbit-BWBT6NeL.js";const xe=1e5,A=512,Z=.87,ge=[{position:[-18,0,14],color:"#ffd18a"},{position:[18,0,14],color:"#ffc078"},{position:[18,0,-16],color:"#ffe0a0"},{position:[-18,0,-16],color:"#ffb96e"}],ee="#090d20",we=.58,be=.85;function te(a,r){const e=Math.abs(a-r)%1;return Math.min(e,1-e)}function ye(a){const r=te(a,we),e=te(a,be),i=1+Math.exp(-(e**2)/(2*.05**2))-.55*Math.exp(-(r**2)/(2*.035**2));return D.clamp(i,.4,2.1)}function Se(){const a=[],r=[],e=(h,d,S,R)=>{a.push(...d,...S,...R),r.push(h,h,h)},i=[0,.58,.02],o=[0,-.14,.02],n=[-.48,.2,.02],u=[.48,.2,.02],m=[0,.22,.7],g=[0,.22,-.68];e(0,i,n,m),e(0,i,m,u),e(0,i,u,g),e(0,i,g,n),e(0,o,m,n),e(0,o,u,m),e(0,o,g,u),e(0,o,n,g);const T=[-.13,.24,.58],E=[.13,.24,.58],w=[-.1,.82,1.05],W=[.1,.82,1.05],l=[-.09,1.25,1.38],p=[.09,1.25,1.38];e(0,T,E,W),e(0,T,W,w),e(0,w,W,p),e(0,w,p,l);const j=[0,1.38,1.53],b=[0,1.18,1.6],y=[0,1.03,2.02];e(0,l,p,j),e(0,l,b,p),e(0,j,p,y),e(0,j,y,l),e(0,l,y,b),e(0,b,y,p);const N=[-.06,.24,-.57],I=[.06,.24,-.57],F=[-.035,.58,-1],G=[.035,.58,-1],X=[0,.82,-1.55];e(0,N,I,G),e(0,N,G,F),e(0,F,G,X);function _(h,d){const S=[.08*h,.48,.5],R=[.08*h,.48,-.48],C=[.82*h,.42,.62],L=[.92*h,.4,-.62],x=[2.12*h,.18,-.04],s=[1*h,.66,.02];h>0?(e(d,S,C,s),e(d,C,x,s),e(d,s,x,L),e(d,s,L,R),e(d,S,s,R)):(e(d,S,s,C),e(d,C,s,x),e(d,s,L,x),e(d,s,R,L),e(d,S,R,s))}_(-1,1),_(1,2);const B=new ve;return B.setAttribute("position",new J(a,3)),B.setAttribute("aHingeGroup",new J(r,1)),B.computeVertexNormals(),B}const Pe=[[-24,10.2,18],[-19,11.2,23],[-12,10.4,18],[-7,9.4,9],[0,10.3,14],[9,11.4,21],[18,10.7,20],[24,10.1,14],[19,11.1,8],[10,10.3,4],[15,9.5,-2],[24,10.4,-9],[23,11.3,-17],[18,10.6,-23],[10,9.6,-18],[5,10.5,-9],[0,11.6,-14],[-9,12.1,-23],[-18,10.8,-22],[-24,9.7,-16],[-21,10.5,-8],[-12,11.4,-4],[-17,10.7,2],[-25,10.1,9]];function Re(){const a=Pe.map(n=>new $(n[0]*Z,n[1],n[2]*Z)),r=new pe(a,!0,"catmullrom",.5),e=r.getPoints(A),i=new Float32Array(A*4);for(let n=0;n<A;n+=1){const u=e[n];i[n*4]=u.x,i[n*4+1]=u.y,i[n*4+2]=u.z,i[n*4+3]=ye(n/A)}const o=new de(i,A,1,me,he);return o.needsUpdate=!0,o.minFilter=Q,o.magFilter=Q,o.wrapS=O,o.generateMipmaps=!1,{curve:r,texture:o}}function Me(){const r=document.createElement("canvas");r.width=256,r.height=256;const e=r.getContext("2d");e.fillStyle="#3f2c1a",e.fillRect(0,0,256,256);for(let o=0;o<70;o+=1){const n=o*3.6+f(o,701)*3;e.strokeStyle=`rgba(20, 12, 6, ${.12+f(o,702)*.22})`,e.lineWidth=1+f(o,703)*2,e.beginPath();for(let u=0;u<=256;u+=12){const m=Math.sin(u*.03+o)*4;u===0?e.moveTo(u,n+m):e.lineTo(u,n+m)}e.stroke()}const i=new re(r);return i.wrapS=O,i.wrapT=O,i.repeat.set(1,4),i}function Ae(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d");e.fillStyle="#5a5650",e.fillRect(0,0,512,512);for(let o=0;o<300;o+=1){const n=f(o,801)*512,u=f(o,802)*512;e.fillStyle=`rgba(30, 28, 24, ${.06+f(o,803)*.1})`,e.beginPath(),e.arc(n,u,1+f(o,804)*2.5,0,Math.PI*2),e.fill()}const i=new re(r);return i.wrapS=O,i.wrapT=O,i}function Te(a,{pathTexture:r,flowSpeedMul:e,riverWidthMul:i,wingFlutter:o}){a.uniforms.uPathTexture={value:r},a.uniforms.uTime={value:0},a.uniforms.uFlowSpeed={value:e},a.uniforms.uRiverWidth={value:i},a.uniforms.uWingFlutter={value:o},a.vertexShader=a.vertexShader.replace("#include <common>",`
      attribute float aHingeGroup;
      attribute float aPathPhase;
      attribute float aLaneX;
      attribute float aLaneY;
      attribute float aFlapPhase;
      attribute float aFlapSpeed;
      attribute float aColorSeed;
      attribute float aWeavePhase;
      attribute float aScale;

      uniform sampler2D uPathTexture;
      uniform float uTime;
      uniform float uFlowSpeed;
      uniform float uRiverWidth;
      uniform float uWingFlutter;

      varying float vColorSeedV;
      varying vec2 vPaperCoordV;

      vec4 riverSamplePath(float u) {
        float samplePosition = fract(u) * ${A.toFixed(1)};
        float sampleIndex = floor(samplePosition);
        float sampleMix = fract(samplePosition);
        float nextIndex = mod(sampleIndex + 1.0, ${A.toFixed(1)});
        float uvA = (sampleIndex + 0.5) / ${A.toFixed(1)};
        float uvB = (nextIndex + 0.5) / ${A.toFixed(1)};
        vec4 sampleA = texture2D(uPathTexture, vec2(uvA, 0.5));
        vec4 sampleB = texture2D(uPathTexture, vec2(uvB, 0.5));
        return mix(sampleA, sampleB, sampleMix);
      }

      vec3 riverRotateAroundAxis(vec3 p, vec3 axis, float angle) {
        return p * cos(angle) + cross(axis, p) * sin(angle) + axis * dot(axis, p) * (1.0 - cos(angle));
      }

      void riverApplyFlap(inout vec3 p, inout vec3 n, int group, float openT) {
        vec3 pivot = vec3(0.0);
        vec3 axis = vec3(0.0, 0.0, 1.0);
        float closedAngle = 0.0;
        if (group == 1) { pivot = vec3(-0.08, 0.48, 0.0); axis = vec3(0.0, 0.0, 1.0); closedAngle = 0.9; }
        else if (group == 2) { pivot = vec3(0.08, 0.48, 0.0); axis = vec3(0.0, 0.0, 1.0); closedAngle = -0.9; }
        else { return; }
        float angle = mix(closedAngle, 0.0, openT);
        vec3 local = p - pivot;
        p = riverRotateAroundAxis(local, axis, angle) + pivot;
        n = riverRotateAroundAxis(n, axis, angle);
      }
      #include <common>
      `).replace("#include <beginnormal_vertex>",`
      // aPathPhase is each crane's own clock offset (time, not position) — the phase
      // texture maps "how far through one loop period" to the arc position that actually
      // corresponds to, given the variable speed profile below. Near the choke, arc
      // position advances slowly for a given time step (cranes bunch up); out in the wide
      // stretch it advances quickly (they spread out).
      float riverTimeFrac = fract(aPathPhase + uTime * uFlowSpeed);
      // Direct closed-spline phase avoids the old lookup texture's 1-to-0
      // interpolation seam, which could teleport and blink individual cranes.
      float riverU = riverTimeFrac;
      vec4 riverHereSample = riverSamplePath(riverU);
      vec3 riverCenterHere = riverHereSample.xyz;
      float riverWidthHere = riverHereSample.w;
      float riverUAhead = fract(riverU + 0.004);
      float riverUBehind = fract(riverU - 0.004);
      vec3 riverCenterAhead = riverSamplePath(riverUAhead).xyz;
      vec3 riverCenterBehind = riverSamplePath(riverUBehind).xyz;
      vec3 riverTangentDelta = riverCenterAhead - riverCenterBehind;
      vec3 riverTangent = riverTangentDelta / max(length(riverTangentDelta), 0.0001);

      vec3 riverWorldUp = abs(riverTangent.y) > 0.92
        ? vec3(0.0, 0.0, 1.0)
        : vec3(0.0, 1.0, 0.0);
      vec3 riverRightDelta = cross(riverWorldUp, riverTangent);
      vec3 riverRight = riverRightDelta / max(length(riverRightDelta), 0.0001);
      vec3 riverUp = normalize(cross(riverTangent, riverRight));

      int riverGroup = int(aHingeGroup + 0.5);
      vec3 riverLocalPos = position;
      vec3 riverLocalNormal = normal;
      float riverOpenT = 0.72 + sin(uTime * aFlapSpeed + aFlapPhase) * 0.28 * uWingFlutter;
      riverApplyFlap(riverLocalPos, riverLocalNormal, riverGroup, clamp(riverOpenT, 0.0, 1.0));

      vec3 objectNormal = normalize(riverRight * riverLocalNormal.x + riverUp * riverLocalNormal.y + riverTangent * riverLocalNormal.z);
      `).replace("#include <begin_vertex>",`
      #include <begin_vertex>
      float riverWeave = sin(uTime * (0.32 + aFlapSpeed * 0.025) + aWeavePhase + riverU * 18.0);
      vec3 riverLaneOffset = riverRight * (aLaneX + riverWeave * 0.16) * uRiverWidth * riverWidthHere
        + riverUp * (aLaneY + cos(aWeavePhase + riverU * 14.0) * 0.08) * uRiverWidth * riverWidthHere;
      vec3 riverOrientedBody = riverRight * riverLocalPos.x + riverUp * riverLocalPos.y + riverTangent * riverLocalPos.z;
      transformed = riverCenterHere + riverLaneOffset + riverOrientedBody * (0.115 * aScale);
      vColorSeedV = aColorSeed;
      vPaperCoordV = riverLocalPos.xz * 5.0 + riverLocalPos.yy * 1.7;
      `),a.fragmentShader=a.fragmentShader.replace("#include <common>",`
      varying float vColorSeedV;
      varying vec2 vPaperCoordV;

      // One color per crane, drawn once from its own instance seed — never reinterpolated
      // by position along the river, so a crane's color stays fixed for its whole journey.
      vec3 riverHsl2rgb(vec3 hsl) {
        vec3 rgb = clamp(abs(mod(hsl.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
        return hsl.z + hsl.y * (rgb - 0.5) * (1.0 - abs(2.0 * hsl.z - 1.0));
      }
      float riverPaperNoise(vec2 p) {
        float fibers = sin(p.x * 37.0 + sin(p.y * 9.0) * 2.0) * 0.5 + 0.5;
        float crossFibers = sin(p.y * 51.0 + p.x * 3.0) * 0.5 + 0.5;
        return fibers * 0.65 + crossFibers * 0.35;
      }
      #include <common>
      `).replace("#include <color_fragment>",`
      #include <color_fragment>
      // Night sky: lightness stays low across the board so cranes read as dark silhouettes
      // except where a real light (the lamp, mainly) actually reaches them — hue and
      // saturation still vary per instance for the "standard colors, some dark" mix.
      float riverHue = fract(vColorSeedV * 3.7 + 0.15);
      float riverSat = mix(0.35, 0.85, fract(vColorSeedV * 9.13 + 0.41));
      float riverLight = mix(0.045, 0.3, fract(vColorSeedV * 17.7 + 0.63));
      vec3 riverColor = riverHsl2rgb(vec3(riverHue, riverSat, riverLight));
      float riverFiber = riverPaperNoise(vPaperCoordV + vColorSeedV * 7.0);
      riverColor *= mix(0.88, 1.08, riverFiber);
      diffuseColor.rgb = riverColor;
      `)}function je(a,r){const e=new fe;e.index=a.index,e.attributes.position=a.attributes.position,e.attributes.normal=a.attributes.normal,e.attributes.aHingeGroup=a.attributes.aHingeGroup;const i=new Float32Array(r),o=new Float32Array(r),n=new Float32Array(r),u=new Float32Array(r),m=new Float32Array(r),g=new Float32Array(r),T=new Float32Array(r),E=new Float32Array(r),w=64,W=Math.ceil(r/w);for(let l=0;l<r;l+=1){const p=l%w,j=Math.floor(l/w);i[l]=(j+f(l,901)*.22+p/w)/W;const b=.28+Math.sqrt((p+.5)/w)*2.8,y=p*2.399963229728653;o[l]=Math.cos(y)*b,n[l]=Math.sin(y)*b*.52,u[l]=f(l,904)*Math.PI*2,m[l]=2.2+f(l,905)*1.6,g[l]=f(l,906),T[l]=f(l,907)*Math.PI*2,E[l]=1+f(l,908)*.1}return e.setAttribute("aPathPhase",new z(i,1)),e.setAttribute("aLaneX",new z(o,1)),e.setAttribute("aLaneY",new z(n,1)),e.setAttribute("aFlapPhase",new z(u,1)),e.setAttribute("aFlapSpeed",new z(m,1)),e.setAttribute("aColorSeed",new z(g,1)),e.setAttribute("aWeavePhase",new z(T,1)),e.setAttribute("aScale",new z(E,1)),e.instanceCount=r,e}function Fe({settings:a,onStats:r}){const{camera:e,gl:i}=ce(),o=ie(),n=Math.round(D.clamp(a.craneCount??6e3,2e3,xe)),u=(a.flowSpeed??1)*.016,m=(a.riverWidth??100)/100,g=2.5,T=a.lampHeight??11.5,E=a.lampIntensity??220,w=a.lampRange??82,W=a.lampFalloff??1.65,l=v.useMemo(()=>Se(),[]),{curve:p,texture:j}=v.useMemo(()=>Re(),[]),b=v.useMemo(()=>je(l,n),[l,n]),y=v.useRef(null),N=v.useMemo(()=>{const s=new Y({color:"#ffffff",roughness:.86,metalness:.02,side:ue});return s.onBeforeCompile=c=>{Te(c,{pathTexture:j,flowSpeedMul:u,riverWidthMul:m,wingFlutter:g}),y.current=c},s},[j,u,m,g]);v.useEffect(()=>()=>{b.dispose()},[b]),v.useEffect(()=>()=>{N.dispose()},[N]);const I=v.useMemo(()=>Me(),[]),F=v.useMemo(()=>Ae(),[]),G=v.useMemo(()=>new Y({map:I,color:"#c9a878",roughness:.78,metalness:.04}),[I]),X=v.useMemo(()=>new Y({map:F,color:"#8f8a80",roughness:.85,metalness:.05}),[F]),_=v.useMemo(()=>new Y({map:F,bumpMap:F,bumpScale:.18,color:"#171a24",roughness:.94,metalness:.01}),[F]),B=v.useMemo(()=>{const s=[];for(let c=0;c<10;c+=1){const P=.02+c/10*.42,M=p.getPoint(P),k=p.getTangent(P).normalize(),U=c%2?1:-1,H=new $(-k.z,0,k.x).normalize().multiplyScalar(3.4*U);s.push(M.clone().add(H).setY(0))}return s},[p]),h=v.useMemo(()=>{const s=[];for(let c=0;c<5;c+=1){const P=.68+c/5*.3,M=p.getPoint(P),k=p.getTangent(P).normalize(),U=c%2?1:-1,H=new $(-k.z,0,k.x).normalize().multiplyScalar(2.6*U);s.push(M.clone().add(H).setY(0))}return s},[p]),d=se({pitchMin:-.85,pitchMax:.85}),S=v.useRef(.08),R=v.useRef(.42),C=v.useRef(62),L=v.useRef(62),x=v.useRef({frames:0,time:0});return v.useEffect(()=>{e.position.set(23,36,43),e.lookAt(1,8.5,-3)},[e]),v.useEffect(()=>{const s=i.domElement,c=P=>{window.matchMedia("(hover: hover) and (pointer: fine)").matches&&(P.preventDefault(),L.current=D.clamp(L.current*Math.exp(P.deltaY*.0012),18,115))};return s.addEventListener("wheel",c,{passive:!1}),()=>s.removeEventListener("wheel",c)},[i]),le((s,c)=>{const P=s.clock.elapsedTime*o,M=y.current;M&&(M.uniforms.uTime.value=P,M.uniforms.uFlowSpeed.value=u,M.uniforms.uRiverWidth.value=m,M.uniforms.uWingFlutter.value=g),S.current=(S.current+Math.min(c,.05)*o*.01)%1;const k=d.current.targetYaw,U=d.current.targetPitch;R.current+=Math.min(c,.05)*o*.018;const H=R.current+k,K=.48+U*.55;C.current=D.damp(C.current,L.current,9,Math.min(c,.05));const q=C.current,V=new $(1,8.5,-3);e.position.set(V.x+Math.sin(H)*Math.cos(K)*q,V.y+Math.sin(K)*q,V.z+Math.cos(H)*Math.cos(K)*q),e.lookAt(V);const ae=1-D.smoothstep(S.current,0,.62);x.current.frames+=1,x.current.time+=c,x.current.time>=.5&&(r({fps:Math.round(x.current.frames/x.current.time),zone:ae>.5?"TEMPLE COURTYARD":"MOONLIT GARDEN"}),x.current.frames=0,x.current.time=0)}),v.useEffect(()=>{var c;const s=((c=i==null?void 0:i.constructor)==null?void 0:c.name)??"WebGL2";r({gpu:s.includes("WebGPU")?"WebGPU":"WebGL2",cranes:n})},[n]),t.jsxs("group",{children:[t.jsx("ambientLight",{intensity:.008,color:"#b9c8e8"}),t.jsx("hemisphereLight",{color:"#53658f",groundColor:"#08070a",intensity:.008}),t.jsx("directionalLight",{position:[8,10,6],intensity:.09,color:"#7186b8"}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.05,0],receiveShadow:!0,children:[t.jsx("circleGeometry",{args:[40,96]}),t.jsx("primitive",{object:_,attach:"material"})]}),ge.map((s,c)=>t.jsxs("group",{position:s.position,children:[t.jsxs("mesh",{position:[0,5.1,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.32,.7,10.2,10]}),t.jsx("primitive",{object:X,attach:"material"})]}),t.jsxs("mesh",{position:[0,10.35,0],castShadow:!0,children:[t.jsx("cylinderGeometry",{args:[1.15,.52,.65,10]}),t.jsx("primitive",{object:G,attach:"material"})]}),t.jsxs("mesh",{position:[0,T,0],children:[t.jsx("sphereGeometry",{args:[.72,24,16]}),t.jsx("meshStandardMaterial",{color:"#5a3518",emissive:s.color,emissiveIntensity:.85,roughness:.38})]}),t.jsx("pointLight",{position:[0,T,0],color:s.color,intensity:E,distance:w,decay:W,castShadow:!0,"shadow-mapSize-width":512,"shadow-mapSize-height":512,"shadow-bias":-4e-4})]},`main-lamp-${c}`)),B.map((s,c)=>t.jsx("group",{position:s,children:t.jsxs("mesh",{position:[0,2.2,0],children:[t.jsx("cylinderGeometry",{args:[.32,.38,4.4,8]}),t.jsx("primitive",{object:G,attach:"material"})]})},c)),h.map((s,c)=>t.jsxs("group",{position:s,children:[t.jsxs("mesh",{position:[0,.6,0],children:[t.jsx("cylinderGeometry",{args:[.1,.12,1.2,6]}),t.jsx("meshStandardMaterial",{color:"#3a3a3e",roughness:.7})]}),t.jsxs("mesh",{position:[0,1.3,0],children:[t.jsx("boxGeometry",{args:[.34,.3,.34]}),t.jsx("meshStandardMaterial",{color:"#2e2e32",roughness:.6})]}),t.jsx("pointLight",{position:[0,1.35,0],intensity:2.4,distance:5,color:"#9db6e8"})]},c)),t.jsx("mesh",{geometry:b,material:N,frustumCulled:!1})]})}function De({settings:a={}}){const[r,e]=v.useState({fps:60,gpu:"—",cranes:0,zone:"TEMPLE COURTYARD"}),i=o=>e(n=>({...n,...o}));return t.jsxs("section",{className:"atmosphere river-of-wishes",style:{"--experiment-accent":"#e6c88a"},children:[t.jsxs(oe,{camera:{position:[23,36,43],fov:46,near:.1,far:150},speed:a.speed??1,shadows:!0,bloom:{intensity:.8,threshold:.6},children:[t.jsx("color",{attach:"background",args:[ee]}),t.jsx("fogExp2",{attach:"fog",args:[ee,.009]}),t.jsx(Fe,{settings:a,onStats:i})]}),t.jsxs("div",{className:"experiment-copy river-of-wishes__copy",children:[t.jsx("p",{children:"26 — A river suspended in midair"}),t.jsxs("h1",{children:["The River",t.jsx("br",{}),"of Wishes."]}),t.jsx("span",{children:"Tens of thousands of tiny cranes become a suspended river, flowing through an ancient temple and out into a moonlit garden — never colliding, never stopping."})]}),t.jsx("div",{className:"river-of-wishes__legend",children:t.jsxs("div",{children:[t.jsx("i",{children:"↻"}),t.jsxs("div",{children:[t.jsx("b",{children:"Drag"}),t.jsx("span",{children:"Orbit the river"})]})]})}),t.jsx(ne,{eyebrow:"Current position",value:r.zone,stats:[{value:r.cranes.toLocaleString(),label:"CRANES IN THE RIVER"},{value:r.gpu,label:"RENDERER"}]})]})}export{De as default};
