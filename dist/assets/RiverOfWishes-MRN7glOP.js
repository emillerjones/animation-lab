import{r as v,j as t}from"./index-B1KgULK7.js";import{C as se,u as ie}from"./CanvasStage-Cfsvd0PF.js";import{u as ce}from"./useDragOrbit-c1vRA8o_.js";import{A as le}from"./AnimationReadout-_ACXOKW2.js";import{s as w}from"./procedural-DZUg-xN7.js";import{a as ue,u as ve}from"./react-three-fiber.esm-HbRtzbda.js";import{ad as Y,aa as Q,D as he,V as Z,a9 as de,ai as J,dO as pe,l as me,R as fe,F as xe,N as ee,aG as $,a7 as ge,a5 as D,aF as ae}from"./three.module-Ct-yBmsu.js";import"./index-CDoiAaRh.js";import"./quality-NEVBGrgs.js";import"./dragOrbit-v25o8ncq.js";const we=1e5,be=4500,ye="(max-width: 700px)",K=512,te=.87,Se=[{position:[-18,0,14],color:"#ffd18a"},{position:[18,0,14],color:"#ffc078"},{position:[18,0,-16],color:"#ffe0a0"},{position:[-18,0,-16],color:"#ffb96e"}],re="#090d20",Re=.58,Me=.85;function oe(a,r){const e=Math.abs(a-r)%1;return Math.min(e,1-e)}function Te(a){const r=oe(a,Re),e=oe(a,Me),n=1+Math.exp(-(e**2)/(2*.05**2))-.55*Math.exp(-(r**2)/(2*.035**2));return Y.clamp(n,.4,2.1)}function Pe(){const a=[],r=[],e=(g,m,C,A)=>{a.push(...m,...C,...A),r.push(g,g,g)},n=[0,.58,.02],o=[0,-.14,.02],s=[-.48,.2,.02],u=[.48,.2,.02],p=[0,.22,.7],R=[0,.22,-.68];e(0,n,s,p),e(0,n,p,u),e(0,n,u,R),e(0,n,R,s),e(0,o,p,s),e(0,o,u,p),e(0,o,R,u),e(0,o,s,R);const j=[-.13,.24,.58],L=[.13,.24,.58],b=[-.1,.82,1.05],k=[.1,.82,1.05],l=[-.09,1.25,1.38],y=[.09,1.25,1.38];e(0,j,L,k),e(0,j,k,b),e(0,b,k,y),e(0,b,y,l);const F=[0,1.38,1.53],x=[0,1.18,1.6],T=[0,1.03,2.02];e(0,l,y,F),e(0,l,x,y),e(0,F,y,T),e(0,F,T,l),e(0,l,T,x),e(0,x,T,y);const U=[-.06,.24,-.57],q=[.06,.24,-.57],H=[-.035,.58,-1],B=[.035,.58,-1],N=[0,.82,-1.55];e(0,U,q,B),e(0,U,B,H),e(0,H,B,N);function V(g,m){const C=[.08*g,.48,.5],A=[.08*g,.48,-.48],E=[.82*g,.42,.62],G=[.92*g,.4,-.62],z=[2.12*g,.18,-.04],d=[1*g,.66,.02];g>0?(e(m,C,E,d),e(m,E,z,d),e(m,d,z,G),e(m,d,G,A),e(m,C,d,A)):(e(m,C,d,E),e(m,E,d,z),e(m,d,G,z),e(m,d,A,G),e(m,C,A,d))}V(-1,1),V(1,2);const _=new de;return _.setAttribute("position",new J(a,3)),_.setAttribute("aHingeGroup",new J(r,1)),_.computeVertexNormals(),_}const je=[[-24,10.2,18],[-19,11.2,23],[-12,10.4,18],[-7,9.4,9],[0,10.3,14],[9,11.4,21],[18,10.7,20],[24,10.1,14],[19,11.1,8],[10,10.3,4],[15,9.5,-2],[24,10.4,-9],[23,11.3,-17],[18,10.6,-23],[10,9.6,-18],[5,10.5,-9],[0,11.6,-14],[-9,12.1,-23],[-18,10.8,-22],[-24,9.7,-16],[-21,10.5,-8],[-12,11.4,-4],[-17,10.7,2],[-25,10.1,9]];function Ae(){const a=je.map(s=>new Z(s[0]*te,s[1],s[2]*te)),r=new pe(a,!0,"catmullrom",.5),e=r.getPoints(K),n=new Float32Array(K*4);for(let s=0;s<K;s+=1){const u=e[s];n[s*4]=u.x,n[s*4+1]=u.y,n[s*4+2]=u.z,n[s*4+3]=Te(s/K)}const o=new me(n,K,1,fe,xe);return o.needsUpdate=!0,o.minFilter=ee,o.magFilter=ee,o.wrapS=$,{curve:r,texture:o}}function Le(){const r=document.createElement("canvas");r.width=256,r.height=256;const e=r.getContext("2d");e.fillStyle="#3f2c1a",e.fillRect(0,0,256,256);for(let o=0;o<70;o+=1){const s=o*3.6+w(o,701)*3;e.strokeStyle=`rgba(20, 12, 6, ${.12+w(o,702)*.22})`,e.lineWidth=1+w(o,703)*2,e.beginPath();for(let u=0;u<=256;u+=12){const p=Math.sin(u*.03+o)*4;u===0?e.moveTo(u,s+p):e.lineTo(u,s+p)}e.stroke()}const n=new ae(r);return n.wrapS=$,n.wrapT=$,n.repeat.set(1,4),n}function Fe(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d");e.fillStyle="#5a5650",e.fillRect(0,0,512,512);for(let o=0;o<300;o+=1){const s=w(o,801)*512,u=w(o,802)*512;e.fillStyle=`rgba(30, 28, 24, ${.06+w(o,803)*.1})`,e.beginPath(),e.arc(s,u,1+w(o,804)*2.5,0,Math.PI*2),e.fill()}const n=new ae(r);return n.wrapS=$,n.wrapT=$,n}function Ce(a,{pathTexture:r,flowSpeedMul:e,riverWidthMul:n,wingFlutter:o}){a.uniforms.uPathTexture={value:r},a.uniforms.uTime={value:0},a.uniforms.uFlowSpeed={value:e},a.uniforms.uRiverWidth={value:n},a.uniforms.uWingFlutter={value:o},a.vertexShader=a.vertexShader.replace("#include <common>",`
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
      `)}function Ee(a,r){const e=new ge;e.index=a.index,e.attributes.position=a.attributes.position,e.attributes.normal=a.attributes.normal,e.attributes.aHingeGroup=a.attributes.aHingeGroup;const n=new Float32Array(r),o=new Float32Array(r),s=new Float32Array(r),u=new Float32Array(r),p=new Float32Array(r),R=new Float32Array(r),j=new Float32Array(r),L=new Float32Array(r),b=64,k=Math.ceil(r/b);for(let l=0;l<r;l+=1){const y=l%b,F=Math.floor(l/b);n[l]=(F+w(l,901)*.22+y/b)/k;const x=.28+Math.sqrt((y+.5)/b)*2.8,T=y*2.399963229728653;o[l]=Math.cos(T)*x,s[l]=Math.sin(T)*x*.52,u[l]=w(l,904)*Math.PI*2,p[l]=2.2+w(l,905)*1.6,R[l]=w(l,906),j[l]=w(l,907)*Math.PI*2,L[l]=1+w(l,908)*.1}return e.setAttribute("aPathPhase",new D(n,1)),e.setAttribute("aLaneX",new D(o,1)),e.setAttribute("aLaneY",new D(s,1)),e.setAttribute("aFlapPhase",new D(u,1)),e.setAttribute("aFlapSpeed",new D(p,1)),e.setAttribute("aColorSeed",new D(R,1)),e.setAttribute("aWeavePhase",new D(j,1)),e.setAttribute("aScale",new D(L,1)),e.instanceCount=r,e}function ze({settings:a,onStats:r,mobile:e}){const{camera:n,gl:o}=ue(),s=ie(),u=e?be:we,p=Math.round(Y.clamp(a.craneCount??6e3,2e3,u)),R=(a.flowSpeed??1)*.016,j=(a.riverWidth??100)/100,L=2.5,b=a.lampHeight??11.5,k=a.lampIntensity??220,l=a.lampRange??82,y=a.lampFalloff??1.65,F=v.useMemo(()=>Pe(),[]),{curve:x,texture:T}=v.useMemo(()=>Ae(),[]),U=v.useMemo(()=>Ee(F,p),[F,p]),q=v.useRef(null),H=v.useMemo(()=>{const i=new Q({color:"#ffffff",roughness:.86,metalness:.02,side:he});return i.onBeforeCompile=c=>{Ce(c,{pathTexture:T,flowSpeedMul:R,riverWidthMul:j,wingFlutter:L}),q.current=c},i},[T,R,j,L]);v.useEffect(()=>()=>{U.dispose()},[U]),v.useEffect(()=>()=>{H.dispose()},[H]);const B=v.useMemo(()=>Le(),[]),N=v.useMemo(()=>Fe(),[]),V=v.useMemo(()=>new Q({map:B,color:"#c9a878",roughness:.78,metalness:.04}),[B]),_=v.useMemo(()=>new Q({map:N,color:"#8f8a80",roughness:.85,metalness:.05}),[N]),g=v.useMemo(()=>new Q({map:N,bumpMap:N,bumpScale:.18,color:"#171a24",roughness:.94,metalness:.01}),[N]),m=v.useMemo(()=>{const i=[];for(let c=0;c<10;c+=1){const f=.02+c/10*.42,S=x.getPoint(f),P=x.getTangent(f).normalize(),W=c%2?1:-1,M=new Z(-P.z,0,P.x).normalize().multiplyScalar(3.4*W);i.push(S.clone().add(M).setY(0))}return i},[x]),C=v.useMemo(()=>{const i=[];for(let c=0;c<5;c+=1){const f=.68+c/5*.3,S=x.getPoint(f),P=x.getTangent(f).normalize(),W=c%2?1:-1,M=new Z(-P.z,0,P.x).normalize().multiplyScalar(2.6*W);i.push(S.clone().add(M).setY(0))}return i},[x]),A=ce({pitchMin:-.85,pitchMax:.85}),E=v.useRef(.08),G=v.useRef(.42),z=v.useRef(62),d=v.useRef(62),O=v.useRef({frames:0,time:0});return v.useEffect(()=>{n.position.set(23,36,43),n.lookAt(1,8.5,-3)},[n]),v.useEffect(()=>{const i=o.domElement,c=h=>{window.matchMedia("(hover: hover) and (pointer: fine)").matches&&(h.preventDefault(),d.current=Y.clamp(d.current*Math.exp(h.deltaY*.0012),18,115))};i.addEventListener("wheel",c,{passive:!1});const f={startDistance:null,startTarget:null},S=h=>Math.hypot(h[0].clientX-h[1].clientX,h[0].clientY-h[1].clientY),P=h=>{h.touches.length===2&&(f.startDistance=S(h.touches),f.startTarget=d.current)},W=h=>{if(h.touches.length===2&&f.startDistance){h.preventDefault();const X=S(h.touches),I=f.startDistance/Math.max(X,1);d.current=Y.clamp(f.startTarget*I,18,115)}},M=h=>{h.touches.length<2&&(f.startDistance=null)};return i.addEventListener("touchstart",P,{passive:!0}),i.addEventListener("touchmove",W,{passive:!1}),i.addEventListener("touchend",M,{passive:!0}),i.addEventListener("touchcancel",M,{passive:!0}),()=>{i.removeEventListener("wheel",c),i.removeEventListener("touchstart",P),i.removeEventListener("touchmove",W),i.removeEventListener("touchend",M),i.removeEventListener("touchcancel",M)}},[o]),ve((i,c)=>{const f=i.clock.elapsedTime*s,S=q.current;S&&(S.uniforms.uTime.value=f,S.uniforms.uFlowSpeed.value=R,S.uniforms.uRiverWidth.value=j,S.uniforms.uWingFlutter.value=L),E.current=(E.current+Math.min(c,.05)*s*.01)%1;const P=A.current.targetYaw,W=A.current.targetPitch;G.current+=Math.min(c,.05)*s*.018;const M=G.current+P,h=.48+W*.55;z.current=Y.damp(z.current,d.current,9,Math.min(c,.05));const X=z.current,I=new Z(1,8.5,-3);n.position.set(I.x+Math.sin(M)*Math.cos(h)*X,I.y+Math.sin(h)*X,I.z+Math.cos(M)*Math.cos(h)*X),n.lookAt(I);const ne=1-Y.smoothstep(E.current,0,.62);O.current.frames+=1,O.current.time+=c,O.current.time>=.5&&(r({fps:Math.round(O.current.frames/O.current.time),zone:ne>.5?"TEMPLE COURTYARD":"MOONLIT GARDEN"}),O.current.frames=0,O.current.time=0)}),v.useEffect(()=>{var c;const i=((c=o==null?void 0:o.constructor)==null?void 0:c.name)??"WebGL2";r({gpu:i.includes("WebGPU")?"WebGPU":"WebGL2",cranes:p})},[p]),t.jsxs("group",{children:[t.jsx("ambientLight",{intensity:.008,color:"#b9c8e8"}),t.jsx("hemisphereLight",{color:"#53658f",groundColor:"#08070a",intensity:.008}),t.jsx("directionalLight",{position:[8,10,6],intensity:.09,color:"#7186b8"}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.05,0],receiveShadow:!0,children:[t.jsx("circleGeometry",{args:[40,96]}),t.jsx("primitive",{object:g,attach:"material"})]}),Se.map((i,c)=>t.jsxs("group",{position:i.position,children:[t.jsxs("mesh",{position:[0,5.1,0],castShadow:!e,receiveShadow:!e,children:[t.jsx("cylinderGeometry",{args:[.32,.7,10.2,10]}),t.jsx("primitive",{object:_,attach:"material"})]}),t.jsxs("mesh",{position:[0,10.35,0],castShadow:!e,children:[t.jsx("cylinderGeometry",{args:[1.15,.52,.65,10]}),t.jsx("primitive",{object:V,attach:"material"})]}),t.jsxs("mesh",{position:[0,b,0],children:[t.jsx("sphereGeometry",{args:[.72,24,16]}),t.jsx("meshStandardMaterial",{color:"#5a3518",emissive:i.color,emissiveIntensity:.85,roughness:.38})]}),t.jsx("pointLight",{position:[0,b,0],color:i.color,intensity:k,distance:l,decay:y,castShadow:!e,"shadow-mapSize-width":512,"shadow-mapSize-height":512,"shadow-bias":-4e-4})]},`main-lamp-${c}`)),m.map((i,c)=>t.jsx("group",{position:i,children:t.jsxs("mesh",{position:[0,2.2,0],children:[t.jsx("cylinderGeometry",{args:[.32,.38,4.4,8]}),t.jsx("primitive",{object:V,attach:"material"})]})},c)),C.map((i,c)=>t.jsxs("group",{position:i,children:[t.jsxs("mesh",{position:[0,.6,0],children:[t.jsx("cylinderGeometry",{args:[.1,.12,1.2,6]}),t.jsx("meshStandardMaterial",{color:"#3a3a3e",roughness:.7})]}),t.jsxs("mesh",{position:[0,1.3,0],children:[t.jsx("boxGeometry",{args:[.34,.3,.34]}),t.jsx("meshStandardMaterial",{color:"#2e2e32",roughness:.6})]}),t.jsx("pointLight",{position:[0,1.35,0],intensity:2.4,distance:5,color:"#9db6e8"})]},c)),t.jsx("mesh",{geometry:U,material:H,frustumCulled:!1})]})}function Ie({settings:a={}}){const[r,e]=v.useState({fps:60,gpu:"—",cranes:0,zone:"TEMPLE COURTYARD"}),n=s=>e(u=>({...u,...s})),o=v.useMemo(()=>{var s;return((s=window.matchMedia)==null?void 0:s.call(window,ye).matches)??!1},[]);return t.jsxs("section",{className:"atmosphere river-of-wishes",style:{"--experiment-accent":"#e6c88a"},children:[t.jsxs(se,{camera:{position:[23,36,43],fov:46,near:.1,far:150},speed:a.speed??1,shadows:!o,bloom:{intensity:.8,threshold:.6},children:[t.jsx("color",{attach:"background",args:[re]}),t.jsx("fogExp2",{attach:"fog",args:[re,.009]}),t.jsx(ze,{settings:a,onStats:n,mobile:o})]}),t.jsxs("div",{className:"experiment-copy river-of-wishes__copy",children:[t.jsx("p",{children:"26 — A river suspended in midair"}),t.jsxs("h1",{children:["The River",t.jsx("br",{}),"of Wishes."]}),t.jsx("span",{children:"Tens of thousands of tiny cranes become a suspended river, flowing through an ancient temple and out into a moonlit garden — never colliding, never stopping."})]}),t.jsxs("div",{className:"river-of-wishes__legend",children:[t.jsxs("div",{children:[t.jsx("i",{children:"↻"}),t.jsxs("div",{children:[t.jsx("b",{children:"Drag"}),t.jsx("span",{children:"Orbit the river"})]})]}),t.jsxs("div",{children:[t.jsx("i",{children:"⇅"}),t.jsxs("div",{children:[t.jsx("b",{children:"Pinch / Scroll"}),t.jsx("span",{children:"Zoom in and out"})]})]})]}),t.jsx(le,{eyebrow:"Current position",value:r.zone,stats:[{value:r.cranes.toLocaleString(),label:"CRANES IN THE RIVER"},{value:r.gpu,label:"RENDERER"}]})]})}export{Ie as default};
