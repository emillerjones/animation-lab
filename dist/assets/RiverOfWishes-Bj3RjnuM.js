import{r as u,j as t}from"./index-DCtAoRgn.js";import{C as se,u as ne}from"./CanvasStage-BNX7zoqI.js";import{u as ce}from"./useDragOrbit-C2xeUhUp.js";import{u as le}from"./usePinchZoom-BckEhmZM.js";import{A as ue}from"./AnimationReadout-CoC6BiIy.js";import{s as x}from"./procedural-DZUg-xN7.js";import{a as he,u as de}from"./react-three-fiber.esm-C19hFcDH.js";import{ad as q,aa as K,D as ve,V as $,a9 as pe,ai as Q,dO as me,l as fe,R as xe,F as ge,N as ee,aG as V,a7 as we,a5 as C,aF as ae}from"./three.module-Ct-yBmsu.js";import"./index-Cdhge07F.js";import"./quality-NEVBGrgs.js";import"./dragOrbit-v25o8ncq.js";const be=1e5,ye=4500,Se="(max-width: 700px)",I=512,te=.87,Re=[{position:[-18,0,14],color:"#ffd18a"},{position:[18,0,14],color:"#ffc078"},{position:[18,0,-16],color:"#ffe0a0"},{position:[-18,0,-16],color:"#ffb96e"}],re="#090d20",Pe=.58,je=.85;function oe(o,r){const e=Math.abs(o-r)%1;return Math.min(e,1-e)}function Me(o){const r=oe(o,Pe),e=oe(o,je),i=1+Math.exp(-(e**2)/(2*.05**2))-.55*Math.exp(-(r**2)/(2*.035**2));return q.clamp(i,.4,2.1)}function Te(){const o=[],r=[],e=(m,v,T,R)=>{o.push(...v,...T,...R),r.push(m,m,m)},i=[0,.58,.02],a=[0,-.14,.02],s=[-.48,.2,.02],l=[.48,.2,.02],d=[0,.22,.7],b=[0,.22,-.68];e(0,i,s,d),e(0,i,d,l),e(0,i,l,b),e(0,i,b,s),e(0,a,d,s),e(0,a,l,d),e(0,a,b,l),e(0,a,s,b);const S=[-.13,.24,.58],j=[.13,.24,.58],g=[-.1,.82,1.05],L=[.1,.82,1.05],n=[-.09,1.25,1.38],w=[.09,1.25,1.38];e(0,S,j,L),e(0,S,L,g),e(0,g,L,w),e(0,g,w,n);const M=[0,1.38,1.53],p=[0,1.18,1.6],y=[0,1.03,2.02];e(0,n,w,M),e(0,n,p,w),e(0,M,w,y),e(0,M,y,n),e(0,n,y,p),e(0,p,y,w);const G=[-.06,.24,-.57],Y=[.06,.24,-.57],U=[-.035,.58,-1],O=[.035,.58,-1],z=[0,.82,-1.55];e(0,G,Y,O),e(0,G,O,U),e(0,U,O,z);function B(m,v){const T=[.08*m,.48,.5],R=[.08*m,.48,-.48],A=[.82*m,.42,.62],k=[.92*m,.4,-.62],F=[2.12*m,.18,-.04],f=[1*m,.66,.02];m>0?(e(v,T,A,f),e(v,A,F,f),e(v,f,F,k),e(v,f,k,R),e(v,T,f,R)):(e(v,T,f,A),e(v,A,f,F),e(v,f,k,F),e(v,f,R,k),e(v,T,R,f))}B(-1,1),B(1,2);const H=new pe;return H.setAttribute("position",new Q(o,3)),H.setAttribute("aHingeGroup",new Q(r,1)),H.computeVertexNormals(),H}const Ae=[[-24,10.2,18],[-19,11.2,23],[-12,10.4,18],[-7,9.4,9],[0,10.3,14],[9,11.4,21],[18,10.7,20],[24,10.1,14],[19,11.1,8],[10,10.3,4],[15,9.5,-2],[24,10.4,-9],[23,11.3,-17],[18,10.6,-23],[10,9.6,-18],[5,10.5,-9],[0,11.6,-14],[-9,12.1,-23],[-18,10.8,-22],[-24,9.7,-16],[-21,10.5,-8],[-12,11.4,-4],[-17,10.7,2],[-25,10.1,9]];function Fe(){const o=Ae.map(s=>new $(s[0]*te,s[1],s[2]*te)),r=new me(o,!0,"catmullrom",.5),e=r.getPoints(I),i=new Float32Array(I*4);for(let s=0;s<I;s+=1){const l=e[s];i[s*4]=l.x,i[s*4+1]=l.y,i[s*4+2]=l.z,i[s*4+3]=Me(s/I)}const a=new fe(i,I,1,xe,ge);return a.needsUpdate=!0,a.minFilter=ee,a.magFilter=ee,a.wrapS=V,{curve:r,texture:a}}function Ce(){const r=document.createElement("canvas");r.width=256,r.height=256;const e=r.getContext("2d");e.fillStyle="#3f2c1a",e.fillRect(0,0,256,256);for(let a=0;a<70;a+=1){const s=a*3.6+x(a,701)*3;e.strokeStyle=`rgba(20, 12, 6, ${.12+x(a,702)*.22})`,e.lineWidth=1+x(a,703)*2,e.beginPath();for(let l=0;l<=256;l+=12){const d=Math.sin(l*.03+a)*4;l===0?e.moveTo(l,s+d):e.lineTo(l,s+d)}e.stroke()}const i=new ae(r);return i.wrapS=V,i.wrapT=V,i.repeat.set(1,4),i}function Le(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d");e.fillStyle="#5a5650",e.fillRect(0,0,512,512);for(let a=0;a<300;a+=1){const s=x(a,801)*512,l=x(a,802)*512;e.fillStyle=`rgba(30, 28, 24, ${.06+x(a,803)*.1})`,e.beginPath(),e.arc(s,l,1+x(a,804)*2.5,0,Math.PI*2),e.fill()}const i=new ae(r);return i.wrapS=V,i.wrapT=V,i}function ze(o,{pathTexture:r,flowSpeedMul:e,riverWidthMul:i,wingFlutter:a}){o.uniforms.uPathTexture={value:r},o.uniforms.uTime={value:0},o.uniforms.uFlowSpeed={value:e},o.uniforms.uRiverWidth={value:i},o.uniforms.uWingFlutter={value:a},o.vertexShader=o.vertexShader.replace("#include <common>",`
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
      // highp: uTime keeps growing for the whole session, and mediump — which plenty of
      // mobile GPUs use by default, unlike desktop where highp is nearly universal — runs
      // out of mantissa bits for a large, ever-growing float, quantizing sin()/fract() into
      // big jumps instead of smooth motion. That's what "camera is smooth but crane motion
      // looks like 1-2fps" actually was: the camera's own motion lives in a JS ref (always
      // full 64-bit precision), so it never degrades, while this uniform did.
      uniform highp float uTime;
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
      `)}function ke(o,r){const e=new we;e.index=o.index,e.attributes.position=o.attributes.position,e.attributes.normal=o.attributes.normal,e.attributes.aHingeGroup=o.attributes.aHingeGroup;const i=new Float32Array(r),a=new Float32Array(r),s=new Float32Array(r),l=new Float32Array(r),d=new Float32Array(r),b=new Float32Array(r),S=new Float32Array(r),j=new Float32Array(r),g=64,L=Math.ceil(r/g);for(let n=0;n<r;n+=1){const w=n%g,M=Math.floor(n/g);i[n]=(M+x(n,901)*.22+w/g)/L;const p=.28+Math.sqrt((w+.5)/g)*2.8,y=w*2.399963229728653;a[n]=Math.cos(y)*p,s[n]=Math.sin(y)*p*.52,l[n]=x(n,904)*Math.PI*2,d[n]=2.2+x(n,905)*1.6,b[n]=x(n,906),S[n]=x(n,907)*Math.PI*2,j[n]=1+x(n,908)*.1}return e.setAttribute("aPathPhase",new C(i,1)),e.setAttribute("aLaneX",new C(a,1)),e.setAttribute("aLaneY",new C(s,1)),e.setAttribute("aFlapPhase",new C(l,1)),e.setAttribute("aFlapSpeed",new C(d,1)),e.setAttribute("aColorSeed",new C(b,1)),e.setAttribute("aWeavePhase",new C(S,1)),e.setAttribute("aScale",new C(j,1)),e.instanceCount=r,e}function We({settings:o,onStats:r,mobile:e}){const{camera:i,gl:a}=he(),s=ne(),l=e?ye:be,d=Math.round(q.clamp(o.craneCount??6e3,2e3,l)),b=(o.flowSpeed??1)*.016,S=(o.riverWidth??100)/100,j=2.5,g=o.lampHeight??11.5,L=o.lampIntensity??220,n=o.lampRange??82,w=o.lampFalloff??1.65,M=u.useMemo(()=>Te(),[]),{curve:p,texture:y}=u.useMemo(()=>Fe(),[]),G=u.useMemo(()=>ke(M,d),[M,d]),Y=u.useRef(null),U=u.useMemo(()=>{const h=new K({color:"#ffffff",roughness:.86,metalness:.02,side:ve});return h.onBeforeCompile=c=>{ze(c,{pathTexture:y,flowSpeedMul:b,riverWidthMul:S,wingFlutter:j}),Y.current=c},h},[y,b,S,j]);u.useEffect(()=>()=>{G.dispose()},[G]),u.useEffect(()=>()=>{U.dispose()},[U]);const O=u.useMemo(()=>Ce(),[]),z=u.useMemo(()=>Le(),[]),B=u.useMemo(()=>new K({map:O,color:"#c9a878",roughness:.78,metalness:.04}),[O]),H=u.useMemo(()=>new K({map:z,color:"#8f8a80",roughness:.85,metalness:.05}),[z]),m=u.useMemo(()=>new K({map:z,bumpMap:z,bumpScale:.18,color:"#171a24",roughness:.94,metalness:.01}),[z]),v=u.useMemo(()=>{const h=[];for(let c=0;c<10;c+=1){const E=.02+c/10*.42,P=p.getPoint(E),N=p.getTangent(E).normalize(),_=c%2?1:-1,D=new $(-N.z,0,N.x).normalize().multiplyScalar(3.4*_);h.push(P.clone().add(D).setY(0))}return h},[p]),T=u.useMemo(()=>{const h=[];for(let c=0;c<5;c+=1){const E=.68+c/5*.3,P=p.getPoint(E),N=p.getTangent(E).normalize(),_=c%2?1:-1,D=new $(-N.z,0,N.x).normalize().multiplyScalar(2.6*_);h.push(P.clone().add(D).setY(0))}return h},[p]),R=ce({pitchMin:-.85,pitchMax:.85}),A=u.useRef(.08),k=u.useRef(.42),F=u.useRef(62),f=u.useRef(62),W=u.useRef({frames:0,time:0});return u.useEffect(()=>{i.position.set(23,36,43),i.lookAt(1,8.5,-3)},[i]),le({targetDistanceRef:f,min:18,max:115}),de((h,c)=>{const E=h.clock.elapsedTime*s%3600,P=Y.current;P&&(P.uniforms.uTime.value=E,P.uniforms.uFlowSpeed.value=b,P.uniforms.uRiverWidth.value=S,P.uniforms.uWingFlutter.value=j),A.current=(A.current+Math.min(c,.05)*s*.01)%1;const N=R.current.targetYaw,_=R.current.targetPitch;k.current+=Math.min(c,.05)*s*.018;const D=k.current+N,Z=.48+_*.55;F.current=q.damp(F.current,f.current,9,Math.min(c,.05));const J=F.current,X=new $(1,8.5,-3);i.position.set(X.x+Math.sin(D)*Math.cos(Z)*J,X.y+Math.sin(Z)*J,X.z+Math.cos(D)*Math.cos(Z)*J),i.lookAt(X);const ie=1-q.smoothstep(A.current,0,.62);W.current.frames+=1,W.current.time+=c,W.current.time>=.5&&(r({fps:Math.round(W.current.frames/W.current.time),zone:ie>.5?"TEMPLE COURTYARD":"MOONLIT GARDEN"}),W.current.frames=0,W.current.time=0)}),u.useEffect(()=>{var c;const h=((c=a==null?void 0:a.constructor)==null?void 0:c.name)??"WebGL2";r({gpu:h.includes("WebGPU")?"WebGPU":"WebGL2",cranes:d})},[d]),t.jsxs("group",{children:[t.jsx("ambientLight",{intensity:.008,color:"#b9c8e8"}),t.jsx("hemisphereLight",{color:"#53658f",groundColor:"#08070a",intensity:.008}),t.jsx("directionalLight",{position:[8,10,6],intensity:.09,color:"#7186b8"}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.05,0],receiveShadow:!0,children:[t.jsx("circleGeometry",{args:[40,96]}),t.jsx("primitive",{object:m,attach:"material"})]}),Re.map((h,c)=>t.jsxs("group",{position:h.position,children:[t.jsxs("mesh",{position:[0,5.1,0],castShadow:!e,receiveShadow:!e,children:[t.jsx("cylinderGeometry",{args:[.32,.7,10.2,10]}),t.jsx("primitive",{object:H,attach:"material"})]}),t.jsxs("mesh",{position:[0,10.35,0],castShadow:!e,children:[t.jsx("cylinderGeometry",{args:[1.15,.52,.65,10]}),t.jsx("primitive",{object:B,attach:"material"})]}),t.jsxs("mesh",{position:[0,g,0],children:[t.jsx("sphereGeometry",{args:[.72,24,16]}),t.jsx("meshStandardMaterial",{color:"#5a3518",emissive:h.color,emissiveIntensity:.85,roughness:.38})]}),t.jsx("pointLight",{position:[0,g,0],color:h.color,intensity:L,distance:n,decay:w,castShadow:!e,"shadow-mapSize-width":512,"shadow-mapSize-height":512,"shadow-bias":-4e-4})]},`main-lamp-${c}`)),v.map((h,c)=>t.jsx("group",{position:h,children:t.jsxs("mesh",{position:[0,2.2,0],children:[t.jsx("cylinderGeometry",{args:[.32,.38,4.4,8]}),t.jsx("primitive",{object:B,attach:"material"})]})},c)),T.map((h,c)=>t.jsxs("group",{position:h,children:[t.jsxs("mesh",{position:[0,.6,0],children:[t.jsx("cylinderGeometry",{args:[.1,.12,1.2,6]}),t.jsx("meshStandardMaterial",{color:"#3a3a3e",roughness:.7})]}),t.jsxs("mesh",{position:[0,1.3,0],children:[t.jsx("boxGeometry",{args:[.34,.3,.34]}),t.jsx("meshStandardMaterial",{color:"#2e2e32",roughness:.6})]}),t.jsx("pointLight",{position:[0,1.35,0],intensity:2.4,distance:5,color:"#9db6e8"})]},c)),t.jsx("mesh",{geometry:G,material:U,frustumCulled:!1})]})}function Ye({settings:o={}}){const[r,e]=u.useState({fps:60,gpu:"—",cranes:0,zone:"TEMPLE COURTYARD"}),i=s=>e(l=>({...l,...s})),a=u.useMemo(()=>{var s;return((s=window.matchMedia)==null?void 0:s.call(window,Se).matches)??!1},[]);return t.jsxs("section",{className:"atmosphere river-of-wishes",style:{"--experiment-accent":"#e6c88a"},children:[t.jsxs(se,{camera:{position:[23,36,43],fov:46,near:.1,far:150},speed:o.speed??1,shadows:!a,bloom:{intensity:.8,threshold:.6},children:[t.jsx("color",{attach:"background",args:[re]}),t.jsx("fogExp2",{attach:"fog",args:[re,.009]}),t.jsx(We,{settings:o,onStats:i,mobile:a})]}),t.jsxs("div",{className:"experiment-copy river-of-wishes__copy",children:[t.jsx("p",{children:"26 — A river suspended in midair"}),t.jsxs("h1",{children:["The River",t.jsx("br",{}),"of Wishes."]}),t.jsx("span",{children:"Tens of thousands of tiny cranes become a suspended river, flowing through an ancient temple and out into a moonlit garden — never colliding, never stopping."})]}),t.jsxs("div",{className:"river-of-wishes__legend",children:[t.jsxs("div",{children:[t.jsx("i",{children:"↻"}),t.jsxs("div",{children:[t.jsx("b",{children:"Drag"}),t.jsx("span",{children:"Orbit the river"})]})]}),t.jsxs("div",{children:[t.jsx("i",{children:"⇅"}),t.jsxs("div",{children:[t.jsx("b",{children:"Pinch / Scroll"}),t.jsx("span",{children:"Zoom in and out"})]})]})]}),t.jsx(ue,{eyebrow:"Current position",value:r.zone,stats:[{value:r.cranes.toLocaleString(),label:"CRANES IN THE RIVER"},{value:r.gpu,label:"RENDERER"}]})]})}export{Ye as default};
