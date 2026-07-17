import{r as u,j as t}from"./index-D25bqQ6g.js";import{C as ne,u as ce}from"./CanvasStage-B4E964fs.js";import{u as le}from"./useDragOrbit-BOGjbhkR.js";import{u as ue}from"./usePinchZoom-BsU6chJq.js";import{A as he}from"./AnimationReadout-BFfqM2yY.js";import{s as x}from"./procedural-DZUg-xN7.js";import{a as de,u as ve}from"./react-three-fiber.esm-BmSPbK0V.js";import{ad as $,aa as K,D as pe,V as Z,a9 as me,ai as ee,dO as fe,l as xe,R as ge,F as we,N as te,aG as V,a7 as be,a5 as F,aF as se}from"./three.module-Ct-yBmsu.js";import"./index-7s7Jv9bx.js";import"./quality-NEVBGrgs.js";import"./dragOrbit-BWBT6NeL.js";const ye=1e5,Se=2500,Re="(max-width: 700px)",q=1,I=512,re=.87,Pe=[{position:[-18,0,14],color:"#ffd18a"},{position:[18,0,14],color:"#ffc078"},{position:[18,0,-16],color:"#ffe0a0"},{position:[-18,0,-16],color:"#ffb96e"}],oe="#090d20",Te=.58,je=.85;function ae(o,r){const e=Math.abs(o-r)%1;return Math.min(e,1-e)}function Me(o){const r=ae(o,Te),e=ae(o,je),s=1+Math.exp(-(e**2)/(2*.05**2))-.55*Math.exp(-(r**2)/(2*.035**2));return $.clamp(s,.4,2.1)}function Ae(){const o=[],r=[],e=(m,v,M,R)=>{o.push(...v,...M,...R),r.push(m,m,m)},s=[0,.58,.02],a=[0,-.14,.02],i=[-.48,.2,.02],l=[.48,.2,.02],d=[0,.22,.7],b=[0,.22,-.68];e(0,s,i,d),e(0,s,d,l),e(0,s,l,b),e(0,s,b,i),e(0,a,d,i),e(0,a,l,d),e(0,a,b,l),e(0,a,i,b);const S=[-.13,.24,.58],T=[.13,.24,.58],g=[-.1,.82,1.05],L=[.1,.82,1.05],n=[-.09,1.25,1.38],w=[.09,1.25,1.38];e(0,S,T,L),e(0,S,L,g),e(0,g,L,w),e(0,g,w,n);const j=[0,1.38,1.53],p=[0,1.18,1.6],y=[0,1.03,2.02];e(0,n,w,j),e(0,n,p,w),e(0,j,w,y),e(0,j,y,n),e(0,n,y,p),e(0,p,y,w);const G=[-.06,.24,-.57],Y=[.06,.24,-.57],U=[-.035,.58,-1],H=[.035,.58,-1],z=[0,.82,-1.55];e(0,G,Y,H),e(0,G,H,U),e(0,U,H,z);function _(m,v){const M=[.08*m,.48,.5],R=[.08*m,.48,-.48],A=[.82*m,.42,.62],k=[.92*m,.4,-.62],C=[2.12*m,.18,-.04],f=[1*m,.66,.02];m>0?(e(v,M,A,f),e(v,A,C,f),e(v,f,C,k),e(v,f,k,R),e(v,M,f,R)):(e(v,M,f,A),e(v,A,f,C),e(v,f,k,C),e(v,f,R,k),e(v,M,R,f))}_(-1,1),_(1,2);const O=new me;return O.setAttribute("position",new ee(o,3)),O.setAttribute("aHingeGroup",new ee(r,1)),O.computeVertexNormals(),O}const Ce=[[-24,10.2,18],[-19,11.2,23],[-12,10.4,18],[-7,9.4,9],[0,10.3,14],[9,11.4,21],[18,10.7,20],[24,10.1,14],[19,11.1,8],[10,10.3,4],[15,9.5,-2],[24,10.4,-9],[23,11.3,-17],[18,10.6,-23],[10,9.6,-18],[5,10.5,-9],[0,11.6,-14],[-9,12.1,-23],[-18,10.8,-22],[-24,9.7,-16],[-21,10.5,-8],[-12,11.4,-4],[-17,10.7,2],[-25,10.1,9]];function Fe(){const o=Ce.map(i=>new Z(i[0]*re,i[1],i[2]*re)),r=new fe(o,!0,"catmullrom",.5),e=r.getPoints(I),s=new Float32Array(I*4);for(let i=0;i<I;i+=1){const l=e[i];s[i*4]=l.x,s[i*4+1]=l.y,s[i*4+2]=l.z,s[i*4+3]=Me(i/I)}const a=new xe(s,I,1,ge,we);return a.needsUpdate=!0,a.minFilter=te,a.magFilter=te,a.wrapS=V,{curve:r,texture:a}}function Le(){const r=document.createElement("canvas");r.width=256,r.height=256;const e=r.getContext("2d");e.fillStyle="#3f2c1a",e.fillRect(0,0,256,256);for(let a=0;a<70;a+=1){const i=a*3.6+x(a,701)*3;e.strokeStyle=`rgba(20, 12, 6, ${.12+x(a,702)*.22})`,e.lineWidth=1+x(a,703)*2,e.beginPath();for(let l=0;l<=256;l+=12){const d=Math.sin(l*.03+a)*4;l===0?e.moveTo(l,i+d):e.lineTo(l,i+d)}e.stroke()}const s=new se(r);return s.wrapS=V,s.wrapT=V,s.repeat.set(1,4),s}function ze(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d");e.fillStyle="#5a5650",e.fillRect(0,0,512,512);for(let a=0;a<300;a+=1){const i=x(a,801)*512,l=x(a,802)*512;e.fillStyle=`rgba(30, 28, 24, ${.06+x(a,803)*.1})`,e.beginPath(),e.arc(i,l,1+x(a,804)*2.5,0,Math.PI*2),e.fill()}const s=new se(r);return s.wrapS=V,s.wrapT=V,s}function ke(o,{pathTexture:r,flowSpeedMul:e,riverWidthMul:s,wingFlutter:a}){o.uniforms.uPathTexture={value:r},o.uniforms.uTime={value:0},o.uniforms.uFlowSpeed={value:e},o.uniforms.uRiverWidth={value:s},o.uniforms.uWingFlutter={value:a},o.vertexShader=o.vertexShader.replace("#include <common>",`
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
      `)}function We(o,r){const e=new be;e.index=o.index,e.attributes.position=o.attributes.position,e.attributes.normal=o.attributes.normal,e.attributes.aHingeGroup=o.attributes.aHingeGroup;const s=new Float32Array(r),a=new Float32Array(r),i=new Float32Array(r),l=new Float32Array(r),d=new Float32Array(r),b=new Float32Array(r),S=new Float32Array(r),T=new Float32Array(r),g=64,L=Math.ceil(r/g);for(let n=0;n<r;n+=1){const w=n%g,j=Math.floor(n/g);s[n]=(j+x(n,901)*.22+w/g)/L;const p=.28+Math.sqrt((w+.5)/g)*2.8,y=w*2.399963229728653;a[n]=Math.cos(y)*p,i[n]=Math.sin(y)*p*.52,l[n]=x(n,904)*Math.PI*2,d[n]=2.2+x(n,905)*1.6,b[n]=x(n,906),S[n]=x(n,907)*Math.PI*2,T[n]=1+x(n,908)*.1}return e.setAttribute("aPathPhase",new F(s,1)),e.setAttribute("aLaneX",new F(a,1)),e.setAttribute("aLaneY",new F(i,1)),e.setAttribute("aFlapPhase",new F(l,1)),e.setAttribute("aFlapSpeed",new F(d,1)),e.setAttribute("aColorSeed",new F(b,1)),e.setAttribute("aWeavePhase",new F(S,1)),e.setAttribute("aScale",new F(T,1)),e.instanceCount=r,e}function Ee({settings:o,onStats:r,mobile:e}){const{camera:s,gl:a}=de(),i=ce(),l=e?Se:ye,d=Math.round($.clamp(o.craneCount??6e3,2e3,l)),b=(o.flowSpeed??1)*.016,S=(o.riverWidth??100)/100,T=2.5,g=o.lampHeight??11.5,L=o.lampIntensity??220,n=o.lampRange??82,w=o.lampFalloff??1.65,j=u.useMemo(()=>Ae(),[]),{curve:p,texture:y}=u.useMemo(()=>Fe(),[]),G=u.useMemo(()=>We(j,d),[j,d]),Y=u.useRef(null),U=u.useMemo(()=>{const h=new K({color:"#ffffff",roughness:.86,metalness:.02,side:pe});return h.onBeforeCompile=c=>{ke(c,{pathTexture:y,flowSpeedMul:b,riverWidthMul:S,wingFlutter:T}),Y.current=c},h},[y,b,S,T]);u.useEffect(()=>()=>{G.dispose()},[G]),u.useEffect(()=>()=>{U.dispose()},[U]);const H=u.useMemo(()=>Le(),[]),z=u.useMemo(()=>ze(),[]),_=u.useMemo(()=>new K({map:H,color:"#c9a878",roughness:.78,metalness:.04}),[H]),O=u.useMemo(()=>new K({map:z,color:"#8f8a80",roughness:.85,metalness:.05}),[z]),m=u.useMemo(()=>new K({map:z,bumpMap:z,bumpScale:.18,color:"#171a24",roughness:.94,metalness:.01}),[z]),v=u.useMemo(()=>{const h=[];for(let c=0;c<10;c+=1){const E=.02+c/10*.42,P=p.getPoint(E),N=p.getTangent(E).normalize(),B=c%2?1:-1,D=new Z(-N.z,0,N.x).normalize().multiplyScalar(3.4*B);h.push(P.clone().add(D).setY(0))}return h},[p]),M=u.useMemo(()=>{const h=[];for(let c=0;c<5;c+=1){const E=.68+c/5*.3,P=p.getPoint(E),N=p.getTangent(E).normalize(),B=c%2?1:-1,D=new Z(-N.z,0,N.x).normalize().multiplyScalar(2.6*B);h.push(P.clone().add(D).setY(0))}return h},[p]),R=le({pitchMin:-.85,pitchMax:.85}),A=u.useRef(.08),k=u.useRef(.42),C=u.useRef(62),f=u.useRef(62),W=u.useRef({frames:0,time:0});return u.useEffect(()=>{s.position.set(23,36,43),s.lookAt(1,8.5,-3),s.layers.enable(q)},[s]),ue({targetDistanceRef:f,min:18,max:115}),ve((h,c)=>{const E=h.clock.elapsedTime*i%3600,P=Y.current;P&&(P.uniforms.uTime.value=E,P.uniforms.uFlowSpeed.value=b,P.uniforms.uRiverWidth.value=S,P.uniforms.uWingFlutter.value=T),A.current=(A.current+Math.min(c,.05)*i*.01)%1;const N=R.current.targetYaw,B=R.current.targetPitch;k.current+=Math.min(c,.05)*i*.018;const D=k.current+N,J=.48+B*.55;C.current=$.damp(C.current,f.current,9,Math.min(c,.05));const Q=C.current,X=new Z(1,8.5,-3);s.position.set(X.x+Math.sin(D)*Math.cos(J)*Q,X.y+Math.sin(J)*Q,X.z+Math.cos(D)*Math.cos(J)*Q),s.lookAt(X);const ie=1-$.smoothstep(A.current,0,.62);W.current.frames+=1,W.current.time+=c,W.current.time>=.5&&(r({fps:Math.round(W.current.frames/W.current.time),zone:ie>.5?"TEMPLE COURTYARD":"MOONLIT GARDEN"}),W.current.frames=0,W.current.time=0)}),u.useEffect(()=>{var c;const h=((c=a==null?void 0:a.constructor)==null?void 0:c.name)??"WebGL2";r({gpu:h.includes("WebGPU")?"WebGPU":"WebGL2",cranes:d})},[d]),t.jsxs("group",{children:[t.jsx("ambientLight",{intensity:.008,color:"#b9c8e8","layers-enable":q}),t.jsx("hemisphereLight",{color:"#53658f",groundColor:"#08070a",intensity:.008}),t.jsx("directionalLight",{position:[8,10,6],intensity:.09,color:"#7186b8"}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.05,0],receiveShadow:!0,children:[t.jsx("circleGeometry",{args:[40,96]}),t.jsx("primitive",{object:m,attach:"material"})]}),Pe.map((h,c)=>t.jsxs("group",{position:h.position,children:[t.jsxs("mesh",{position:[0,5.1,0],castShadow:!e,receiveShadow:!e,children:[t.jsx("cylinderGeometry",{args:[.32,.7,10.2,10]}),t.jsx("primitive",{object:O,attach:"material"})]}),t.jsxs("mesh",{position:[0,10.35,0],castShadow:!e,children:[t.jsx("cylinderGeometry",{args:[1.15,.52,.65,10]}),t.jsx("primitive",{object:_,attach:"material"})]}),t.jsxs("mesh",{position:[0,g,0],children:[t.jsx("sphereGeometry",{args:[.72,24,16]}),t.jsx("meshStandardMaterial",{color:"#5a3518",emissive:h.color,emissiveIntensity:.85,roughness:.38})]}),t.jsx("pointLight",{position:[0,g,0],color:h.color,intensity:L,distance:n,decay:w,castShadow:!e,"shadow-mapSize-width":512,"shadow-mapSize-height":512,"shadow-bias":-4e-4,"layers-enable":q})]},`main-lamp-${c}`)),v.map((h,c)=>t.jsx("group",{position:h,children:t.jsxs("mesh",{position:[0,2.2,0],children:[t.jsx("cylinderGeometry",{args:[.32,.38,4.4,8]}),t.jsx("primitive",{object:_,attach:"material"})]})},c)),M.map((h,c)=>t.jsxs("group",{position:h,children:[t.jsxs("mesh",{position:[0,.6,0],children:[t.jsx("cylinderGeometry",{args:[.1,.12,1.2,6]}),t.jsx("meshStandardMaterial",{color:"#3a3a3e",roughness:.7})]}),t.jsxs("mesh",{position:[0,1.3,0],children:[t.jsx("boxGeometry",{args:[.34,.3,.34]}),t.jsx("meshStandardMaterial",{color:"#2e2e32",roughness:.6})]}),t.jsx("pointLight",{position:[0,1.35,0],intensity:2.4,distance:5,color:"#9db6e8"})]},c)),t.jsx("mesh",{geometry:G,material:U,"layers-set":q,frustumCulled:!1})]})}function Xe({settings:o={}}){const[r,e]=u.useState({fps:60,gpu:"—",cranes:0,zone:"TEMPLE COURTYARD"}),s=i=>e(l=>({...l,...i})),a=u.useMemo(()=>{var i;return((i=window.matchMedia)==null?void 0:i.call(window,Re).matches)??!1},[]);return t.jsxs("section",{className:"atmosphere river-of-wishes",style:{"--experiment-accent":"#e6c88a"},children:[t.jsxs(ne,{camera:{position:[23,36,43],fov:46,near:.1,far:150},speed:o.speed??1,shadows:!a,bloom:{intensity:.8,threshold:.6},children:[t.jsx("color",{attach:"background",args:[oe]}),t.jsx("fogExp2",{attach:"fog",args:[oe,.009]}),t.jsx(Ee,{settings:o,onStats:s,mobile:a})]}),t.jsxs("div",{className:"experiment-copy river-of-wishes__copy",children:[t.jsx("p",{children:"26 — A river suspended in midair"}),t.jsxs("h1",{children:["The River",t.jsx("br",{}),"of Wishes."]}),t.jsx("span",{children:"Tens of thousands of tiny cranes become a suspended river, flowing through an ancient temple and out into a moonlit garden — never colliding, never stopping."})]}),t.jsxs("div",{className:"river-of-wishes__legend",children:[t.jsxs("div",{children:[t.jsx("i",{children:"↻"}),t.jsxs("div",{children:[t.jsx("b",{children:"Drag"}),t.jsx("span",{children:"Orbit the river"})]})]}),t.jsxs("div",{children:[t.jsx("i",{children:"⇅"}),t.jsxs("div",{children:[t.jsx("b",{children:"Pinch / Scroll"}),t.jsx("span",{children:"Zoom in and out"})]})]})]}),t.jsx(he,{eyebrow:"Current position",value:r.zone,stats:[{value:r.cranes.toLocaleString(),label:"CRANES IN THE RIVER"},{value:r.gpu,label:"RENDERER"}]})]})}export{Xe as default};
