import{r as v,j as t}from"./index-CoCVcyrP.js";import{C as ae,u as ie}from"./CanvasStage-DVwv7Z2u.js";import{u as ne}from"./useDragOrbit-DlkFAz4e.js";import{A as se}from"./AnimationReadout-CRfHf8E1.js";import{s as f}from"./procedural-DZUg-xN7.js";import{a as ce,u as le}from"./react-three-fiber.esm-rpEeD4NT.js";import{ad as O,aa as Y,D as ue,V as X,a9 as ve,ai as J,dO as de,l as he,R as pe,F as me,L as Q,aG as B,a7 as fe,a5 as C,aF as re}from"./three.module-Ct-yBmsu.js";import"./index-D4eeSf7E.js";import"./usePinchZoom-CJOLy_Hl.js";import"./quality-NEVBGrgs.js";import"./dragOrbit-BWBT6NeL.js";const xe=1e5,U=512,Z=.87,ge=[{position:[-18,0,14],color:"#ffd18a"},{position:[18,0,14],color:"#ffc078"},{position:[18,0,-16],color:"#ffe0a0"},{position:[-18,0,-16],color:"#ffb96e"}],ee="#090d20",we=.58,be=.85;function te(o,r){const e=Math.abs(o-r)%1;return Math.min(e,1-e)}function ye(o){const r=te(o,we),e=te(o,be),i=1+Math.exp(-(e**2)/(2*.05**2))-.55*Math.exp(-(r**2)/(2*.035**2));return O.clamp(i,.4,2.1)}function Se(){const o=[],r=[],e=(m,h,S,P)=>{o.push(...h,...S,...P),r.push(m,m,m)},i=[0,.58,.02],a=[0,-.14,.02],s=[-.48,.2,.02],u=[.48,.2,.02],p=[0,.22,.7],g=[0,.22,-.68];e(0,i,s,p),e(0,i,p,u),e(0,i,u,g),e(0,i,g,s),e(0,a,p,s),e(0,a,u,p),e(0,a,g,u),e(0,a,s,g);const M=[-.13,.24,.58],k=[.13,.24,.58],w=[-.1,.82,1.05],z=[.1,.82,1.05],l=[-.09,1.25,1.38],d=[.09,1.25,1.38];e(0,M,k,z),e(0,M,z,w),e(0,w,z,d),e(0,w,d,l);const A=[0,1.38,1.53],b=[0,1.18,1.6],y=[0,1.03,2.02];e(0,l,d,A),e(0,l,b,d),e(0,A,d,y),e(0,A,y,l),e(0,l,y,b),e(0,b,y,d);const E=[-.06,.24,-.57],_=[.06,.24,-.57],j=[-.035,.58,-1],G=[.035,.58,-1],K=[0,.82,-1.55];e(0,E,_,G),e(0,E,G,j),e(0,j,G,K);function I(m,h){const S=[.08*m,.48,.5],P=[.08*m,.48,-.48],F=[.82*m,.42,.62],L=[.92*m,.4,-.62],x=[2.12*m,.18,-.04],n=[1*m,.66,.02];m>0?(e(h,S,F,n),e(h,F,x,n),e(h,n,x,L),e(h,n,L,P),e(h,S,n,P)):(e(h,S,n,F),e(h,F,n,x),e(h,n,L,x),e(h,n,P,L),e(h,S,P,n))}I(-1,1),I(1,2);const N=new ve;return N.setAttribute("position",new J(o,3)),N.setAttribute("aHingeGroup",new J(r,1)),N.computeVertexNormals(),N}const Re=[[-24,10.2,18],[-19,11.2,23],[-12,10.4,18],[-7,9.4,9],[0,10.3,14],[9,11.4,21],[18,10.7,20],[24,10.1,14],[19,11.1,8],[10,10.3,4],[15,9.5,-2],[24,10.4,-9],[23,11.3,-17],[18,10.6,-23],[10,9.6,-18],[5,10.5,-9],[0,11.6,-14],[-9,12.1,-23],[-18,10.8,-22],[-24,9.7,-16],[-21,10.5,-8],[-12,11.4,-4],[-17,10.7,2],[-25,10.1,9]];function Pe(){const o=Re.map(s=>new X(s[0]*Z,s[1],s[2]*Z)),r=new de(o,!0,"catmullrom",.5),e=r.getPoints(U),i=new Float32Array(U*4);for(let s=0;s<U;s+=1){const u=e[s];i[s*4]=u.x,i[s*4+1]=u.y,i[s*4+2]=u.z,i[s*4+3]=ye(s/U)}const a=new he(i,U,1,pe,me);return a.needsUpdate=!0,a.minFilter=Q,a.magFilter=Q,a.wrapS=B,{curve:r,texture:a}}function Te(){const r=document.createElement("canvas");r.width=256,r.height=256;const e=r.getContext("2d");e.fillStyle="#3f2c1a",e.fillRect(0,0,256,256);for(let a=0;a<70;a+=1){const s=a*3.6+f(a,701)*3;e.strokeStyle=`rgba(20, 12, 6, ${.12+f(a,702)*.22})`,e.lineWidth=1+f(a,703)*2,e.beginPath();for(let u=0;u<=256;u+=12){const p=Math.sin(u*.03+a)*4;u===0?e.moveTo(u,s+p):e.lineTo(u,s+p)}e.stroke()}const i=new re(r);return i.wrapS=B,i.wrapT=B,i.repeat.set(1,4),i}function Me(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d");e.fillStyle="#5a5650",e.fillRect(0,0,512,512);for(let a=0;a<300;a+=1){const s=f(a,801)*512,u=f(a,802)*512;e.fillStyle=`rgba(30, 28, 24, ${.06+f(a,803)*.1})`,e.beginPath(),e.arc(s,u,1+f(a,804)*2.5,0,Math.PI*2),e.fill()}const i=new re(r);return i.wrapS=B,i.wrapT=B,i}function Ae(o,{pathTexture:r,flowSpeedMul:e,riverWidthMul:i,wingFlutter:a}){o.uniforms.uPathTexture={value:r},o.uniforms.uTime={value:0},o.uniforms.uFlowSpeed={value:e},o.uniforms.uRiverWidth={value:i},o.uniforms.uWingFlutter={value:a},o.vertexShader=o.vertexShader.replace("#include <common>",`
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
      vec4 riverHereSample = texture2D(uPathTexture, vec2(riverU, 0.5));
      vec3 riverCenterHere = riverHereSample.xyz;
      float riverWidthHere = riverHereSample.w;
      float riverUAhead = fract(riverU + 0.004);
      float riverUBehind = fract(riverU - 0.004);
      vec3 riverCenterAhead = texture2D(uPathTexture, vec2(riverUAhead, 0.5)).xyz;
      vec3 riverCenterBehind = texture2D(uPathTexture, vec2(riverUBehind, 0.5)).xyz;
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
      `),o.fragmentShader=o.fragmentShader.replace("#include <common>",`
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
      `)}function je(o,r){const e=new fe;e.index=o.index,e.attributes.position=o.attributes.position,e.attributes.normal=o.attributes.normal,e.attributes.aHingeGroup=o.attributes.aHingeGroup;const i=new Float32Array(r),a=new Float32Array(r),s=new Float32Array(r),u=new Float32Array(r),p=new Float32Array(r),g=new Float32Array(r),M=new Float32Array(r),k=new Float32Array(r),w=64,z=Math.ceil(r/w);for(let l=0;l<r;l+=1){const d=l%w,A=Math.floor(l/w);i[l]=(A+f(l,901)*.22+d/w)/z;const b=.28+Math.sqrt((d+.5)/w)*2.8,y=d*2.399963229728653;a[l]=Math.cos(y)*b,s[l]=Math.sin(y)*b*.52,u[l]=f(l,904)*Math.PI*2,p[l]=2.2+f(l,905)*1.6,g[l]=f(l,906),M[l]=f(l,907)*Math.PI*2,k[l]=1+f(l,908)*.1}return e.setAttribute("aPathPhase",new C(i,1)),e.setAttribute("aLaneX",new C(a,1)),e.setAttribute("aLaneY",new C(s,1)),e.setAttribute("aFlapPhase",new C(u,1)),e.setAttribute("aFlapSpeed",new C(p,1)),e.setAttribute("aColorSeed",new C(g,1)),e.setAttribute("aWeavePhase",new C(M,1)),e.setAttribute("aScale",new C(k,1)),e.instanceCount=r,e}function Fe({settings:o,onStats:r}){const{camera:e,gl:i}=ce(),a=ie(),s=Math.round(O.clamp(o.craneCount??6e3,2e3,xe)),u=(o.flowSpeed??1)*.016,p=(o.riverWidth??100)/100,g=2.5,M=o.lampHeight??11.5,k=o.lampIntensity??220,w=o.lampRange??82,z=o.lampFalloff??1.65,l=v.useMemo(()=>Se(),[]),{curve:d,texture:A}=v.useMemo(()=>Pe(),[]),b=v.useMemo(()=>je(l,s),[l,s]),y=v.useRef(null),E=v.useMemo(()=>{const n=new Y({color:"#ffffff",roughness:.86,metalness:.02,side:ue});return n.onBeforeCompile=c=>{Ae(c,{pathTexture:A,flowSpeedMul:u,riverWidthMul:p,wingFlutter:g}),y.current=c},n},[A,u,p,g]);v.useEffect(()=>()=>{b.dispose()},[b]),v.useEffect(()=>()=>{E.dispose()},[E]);const _=v.useMemo(()=>Te(),[]),j=v.useMemo(()=>Me(),[]),G=v.useMemo(()=>new Y({map:_,color:"#c9a878",roughness:.78,metalness:.04}),[_]),K=v.useMemo(()=>new Y({map:j,color:"#8f8a80",roughness:.85,metalness:.05}),[j]),I=v.useMemo(()=>new Y({map:j,bumpMap:j,bumpScale:.18,color:"#171a24",roughness:.94,metalness:.01}),[j]),N=v.useMemo(()=>{const n=[];for(let c=0;c<10;c+=1){const R=.02+c/10*.42,T=d.getPoint(R),W=d.getTangent(R).normalize(),H=c%2?1:-1,D=new X(-W.z,0,W.x).normalize().multiplyScalar(3.4*H);n.push(T.clone().add(D).setY(0))}return n},[d]),m=v.useMemo(()=>{const n=[];for(let c=0;c<5;c+=1){const R=.68+c/5*.3,T=d.getPoint(R),W=d.getTangent(R).normalize(),H=c%2?1:-1,D=new X(-W.z,0,W.x).normalize().multiplyScalar(2.6*H);n.push(T.clone().add(D).setY(0))}return n},[d]),h=ne({pitchMin:-.85,pitchMax:.85}),S=v.useRef(.08),P=v.useRef(.42),F=v.useRef(62),L=v.useRef(62),x=v.useRef({frames:0,time:0});return v.useEffect(()=>{e.position.set(23,36,43),e.lookAt(1,8.5,-3)},[e]),v.useEffect(()=>{const n=i.domElement,c=R=>{window.matchMedia("(hover: hover) and (pointer: fine)").matches&&(R.preventDefault(),L.current=O.clamp(L.current*Math.exp(R.deltaY*.0012),18,115))};return n.addEventListener("wheel",c,{passive:!1}),()=>n.removeEventListener("wheel",c)},[i]),le((n,c)=>{const R=n.clock.elapsedTime*a,T=y.current;T&&(T.uniforms.uTime.value=R,T.uniforms.uFlowSpeed.value=u,T.uniforms.uRiverWidth.value=p,T.uniforms.uWingFlutter.value=g),S.current=(S.current+Math.min(c,.05)*a*.01)%1;const W=h.current.targetYaw,H=h.current.targetPitch;P.current+=Math.min(c,.05)*a*.018;const D=P.current+W,$=.48+H*.55;F.current=O.damp(F.current,L.current,9,Math.min(c,.05));const q=F.current,V=new X(1,8.5,-3);e.position.set(V.x+Math.sin(D)*Math.cos($)*q,V.y+Math.sin($)*q,V.z+Math.cos(D)*Math.cos($)*q),e.lookAt(V);const oe=1-O.smoothstep(S.current,0,.62);x.current.frames+=1,x.current.time+=c,x.current.time>=.5&&(r({fps:Math.round(x.current.frames/x.current.time),zone:oe>.5?"TEMPLE COURTYARD":"MOONLIT GARDEN"}),x.current.frames=0,x.current.time=0)}),v.useEffect(()=>{var c;const n=((c=i==null?void 0:i.constructor)==null?void 0:c.name)??"WebGL2";r({gpu:n.includes("WebGPU")?"WebGPU":"WebGL2",cranes:s})},[s]),t.jsxs("group",{children:[t.jsx("ambientLight",{intensity:.008,color:"#b9c8e8"}),t.jsx("hemisphereLight",{color:"#53658f",groundColor:"#08070a",intensity:.008}),t.jsx("directionalLight",{position:[8,10,6],intensity:.09,color:"#7186b8"}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.05,0],receiveShadow:!0,children:[t.jsx("circleGeometry",{args:[40,96]}),t.jsx("primitive",{object:I,attach:"material"})]}),ge.map((n,c)=>t.jsxs("group",{position:n.position,children:[t.jsxs("mesh",{position:[0,5.1,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.32,.7,10.2,10]}),t.jsx("primitive",{object:K,attach:"material"})]}),t.jsxs("mesh",{position:[0,10.35,0],castShadow:!0,children:[t.jsx("cylinderGeometry",{args:[1.15,.52,.65,10]}),t.jsx("primitive",{object:G,attach:"material"})]}),t.jsxs("mesh",{position:[0,M,0],children:[t.jsx("sphereGeometry",{args:[.72,24,16]}),t.jsx("meshStandardMaterial",{color:"#5a3518",emissive:n.color,emissiveIntensity:.85,roughness:.38})]}),t.jsx("pointLight",{position:[0,M,0],color:n.color,intensity:k,distance:w,decay:z,castShadow:!0,"shadow-mapSize-width":512,"shadow-mapSize-height":512,"shadow-bias":-4e-4})]},`main-lamp-${c}`)),N.map((n,c)=>t.jsx("group",{position:n,children:t.jsxs("mesh",{position:[0,2.2,0],children:[t.jsx("cylinderGeometry",{args:[.32,.38,4.4,8]}),t.jsx("primitive",{object:G,attach:"material"})]})},c)),m.map((n,c)=>t.jsxs("group",{position:n,children:[t.jsxs("mesh",{position:[0,.6,0],children:[t.jsx("cylinderGeometry",{args:[.1,.12,1.2,6]}),t.jsx("meshStandardMaterial",{color:"#3a3a3e",roughness:.7})]}),t.jsxs("mesh",{position:[0,1.3,0],children:[t.jsx("boxGeometry",{args:[.34,.3,.34]}),t.jsx("meshStandardMaterial",{color:"#2e2e32",roughness:.6})]}),t.jsx("pointLight",{position:[0,1.35,0],intensity:2.4,distance:5,color:"#9db6e8"})]},c)),t.jsx("mesh",{geometry:b,material:E,frustumCulled:!1})]})}function Oe({settings:o={}}){const[r,e]=v.useState({fps:60,gpu:"—",cranes:0,zone:"TEMPLE COURTYARD"}),i=a=>e(s=>({...s,...a}));return t.jsxs("section",{className:"atmosphere river-of-wishes",style:{"--experiment-accent":"#e6c88a"},children:[t.jsxs(ae,{camera:{position:[23,36,43],fov:46,near:.1,far:150},speed:o.speed??1,shadows:!0,bloom:{intensity:.8,threshold:.6},children:[t.jsx("color",{attach:"background",args:[ee]}),t.jsx("fogExp2",{attach:"fog",args:[ee,.009]}),t.jsx(Fe,{settings:o,onStats:i})]}),t.jsxs("div",{className:"experiment-copy river-of-wishes__copy",children:[t.jsx("p",{children:"26 — A river suspended in midair"}),t.jsxs("h1",{children:["The River",t.jsx("br",{}),"of Wishes."]}),t.jsx("span",{children:"Tens of thousands of tiny cranes become a suspended river, flowing through an ancient temple and out into a moonlit garden — never colliding, never stopping."})]}),t.jsx("div",{className:"river-of-wishes__legend",children:t.jsxs("div",{children:[t.jsx("i",{children:"↻"}),t.jsxs("div",{children:[t.jsx("b",{children:"Drag"}),t.jsx("span",{children:"Orbit the river"})]})]})}),t.jsx(se,{eyebrow:"Current position",value:r.zone,stats:[{value:r.cranes.toLocaleString(),label:"CRANES IN THE RIVER"},{value:r.gpu,label:"RENDERER"}]})]})}export{Oe as default};
