import{r as v,j as t}from"./index-BZlE2Chb.js";import{C as ie,u as ne}from"./CanvasStage-CWAHGbx_.js";import{u as se}from"./useDragOrbit-BMl5Ty_O.js";import{A as ce}from"./AnimationReadout-BGfYmvL9.js";import{s as x}from"./procedural-DZUg-xN7.js";import{a as le,u as ue}from"./react-three-fiber.esm-Bc9PFLdk.js";import{ad as _,aa as K,D as ve,V as $,a9 as he,ai as Q,dO as de,l as pe,R as me,F as fe,L as Z,aG as I,a7 as xe,a5 as C,aF as oe}from"./three.module-Ct-yBmsu.js";import"./index-DOWp4Lzx.js";import"./quality-NEVBGrgs.js";import"./dragOrbit-v25o8ncq.js";const ge=1e5,B=512,ee=.87,we=[{position:[-18,0,14],color:"#ffd18a"},{position:[18,0,14],color:"#ffc078"},{position:[18,0,-16],color:"#ffe0a0"},{position:[-18,0,-16],color:"#ffb96e"}],te="#090d20",be=.58,ye=.85;function re(o,r){const e=Math.abs(o-r)%1;return Math.min(e,1-e)}function Se(o){const r=re(o,be),e=re(o,ye),i=1+Math.exp(-(e**2)/(2*.05**2))-.55*Math.exp(-(r**2)/(2*.035**2));return _.clamp(i,.4,2.1)}function Re(){const o=[],r=[],e=(f,p,M,S)=>{o.push(...p,...M,...S),r.push(f,f,f)},i=[0,.58,.02],a=[0,-.14,.02],n=[-.48,.2,.02],l=[.48,.2,.02],d=[0,.22,.7],w=[0,.22,-.68];e(0,i,n,d),e(0,i,d,l),e(0,i,l,w),e(0,i,w,n),e(0,a,d,n),e(0,a,l,d),e(0,a,w,l),e(0,a,n,w);const j=[-.13,.24,.58],z=[.13,.24,.58],b=[-.1,.82,1.05],W=[.1,.82,1.05],c=[-.09,1.25,1.38],m=[.09,1.25,1.38];e(0,j,z,W),e(0,j,W,b),e(0,b,W,m),e(0,b,m,c);const g=[0,1.38,1.53],P=[0,1.18,1.6],y=[0,1.03,2.02];e(0,c,m,g),e(0,c,P,m),e(0,g,m,y),e(0,g,y,c),e(0,c,y,P),e(0,P,y,m);const D=[-.06,.24,-.57],H=[.06,.24,-.57],U=[-.035,.58,-1],T=[.035,.58,-1],V=[0,.82,-1.55];e(0,D,H,T),e(0,D,T,U),e(0,U,T,V);function Y(f,p){const M=[.08*f,.48,.5],S=[.08*f,.48,-.48],k=[.82*f,.42,.62],F=[.92*f,.4,-.62],L=[2.12*f,.18,-.04],h=[1*f,.66,.02];f>0?(e(p,M,k,h),e(p,k,L,h),e(p,h,L,F),e(p,h,F,S),e(p,M,h,S)):(e(p,M,h,k),e(p,k,h,L),e(p,h,F,L),e(p,h,S,F),e(p,M,S,h))}Y(-1,1),Y(1,2);const G=new he;return G.setAttribute("position",new Q(o,3)),G.setAttribute("aHingeGroup",new Q(r,1)),G.computeVertexNormals(),G}const Pe=[[-24,10.2,18],[-19,11.2,23],[-12,10.4,18],[-7,9.4,9],[0,10.3,14],[9,11.4,21],[18,10.7,20],[24,10.1,14],[19,11.1,8],[10,10.3,4],[15,9.5,-2],[24,10.4,-9],[23,11.3,-17],[18,10.6,-23],[10,9.6,-18],[5,10.5,-9],[0,11.6,-14],[-9,12.1,-23],[-18,10.8,-22],[-24,9.7,-16],[-21,10.5,-8],[-12,11.4,-4],[-17,10.7,2],[-25,10.1,9]];function Te(){const o=Pe.map(n=>new $(n[0]*ee,n[1],n[2]*ee)),r=new de(o,!0,"catmullrom",.5),e=r.getPoints(B),i=new Float32Array(B*4);for(let n=0;n<B;n+=1){const l=e[n];i[n*4]=l.x,i[n*4+1]=l.y,i[n*4+2]=l.z,i[n*4+3]=Se(n/B)}const a=new pe(i,B,1,me,fe);return a.needsUpdate=!0,a.minFilter=Z,a.magFilter=Z,a.wrapS=I,{curve:r,texture:a}}function Me(){const r=document.createElement("canvas");r.width=256,r.height=256;const e=r.getContext("2d");e.fillStyle="#3f2c1a",e.fillRect(0,0,256,256);for(let a=0;a<70;a+=1){const n=a*3.6+x(a,701)*3;e.strokeStyle=`rgba(20, 12, 6, ${.12+x(a,702)*.22})`,e.lineWidth=1+x(a,703)*2,e.beginPath();for(let l=0;l<=256;l+=12){const d=Math.sin(l*.03+a)*4;l===0?e.moveTo(l,n+d):e.lineTo(l,n+d)}e.stroke()}const i=new oe(r);return i.wrapS=I,i.wrapT=I,i.repeat.set(1,4),i}function Ae(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d");e.fillStyle="#5a5650",e.fillRect(0,0,512,512);for(let a=0;a<300;a+=1){const n=x(a,801)*512,l=x(a,802)*512;e.fillStyle=`rgba(30, 28, 24, ${.06+x(a,803)*.1})`,e.beginPath(),e.arc(n,l,1+x(a,804)*2.5,0,Math.PI*2),e.fill()}const i=new oe(r);return i.wrapS=I,i.wrapT=I,i}function je(o,{pathTexture:r,flowSpeedMul:e,riverWidthMul:i,wingFlutter:a}){o.uniforms.uPathTexture={value:r},o.uniforms.uTime={value:0},o.uniforms.uFlowSpeed={value:e},o.uniforms.uRiverWidth={value:i},o.uniforms.uWingFlutter={value:a},o.vertexShader=o.vertexShader.replace("#include <common>",`
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
      `)}function Fe(o,r){const e=new xe;e.index=o.index,e.attributes.position=o.attributes.position,e.attributes.normal=o.attributes.normal,e.attributes.aHingeGroup=o.attributes.aHingeGroup;const i=new Float32Array(r),a=new Float32Array(r),n=new Float32Array(r),l=new Float32Array(r),d=new Float32Array(r),w=new Float32Array(r),j=new Float32Array(r),z=new Float32Array(r),b=64,W=Math.ceil(r/b);for(let c=0;c<r;c+=1){const m=c%b,g=Math.floor(c/b);i[c]=(g+x(c,901)*.22+m/b)/W;const P=.28+Math.sqrt((m+.5)/b)*2.8,y=m*2.399963229728653;a[c]=Math.cos(y)*P,n[c]=Math.sin(y)*P*.52,l[c]=x(c,904)*Math.PI*2,d[c]=2.2+x(c,905)*1.6,w[c]=x(c,906),j[c]=x(c,907)*Math.PI*2,z[c]=1+x(c,908)*.1}return e.setAttribute("aPathPhase",new C(i,1)),e.setAttribute("aLaneX",new C(a,1)),e.setAttribute("aLaneY",new C(n,1)),e.setAttribute("aFlapPhase",new C(l,1)),e.setAttribute("aFlapSpeed",new C(d,1)),e.setAttribute("aColorSeed",new C(w,1)),e.setAttribute("aWeavePhase",new C(j,1)),e.setAttribute("aScale",new C(z,1)),e.instanceCount=r,e}function Le({settings:o,onStats:r}){const{camera:e,gl:i}=le(),a=ne(),n=Math.round(_.clamp(o.craneCount??6e3,2e3,ge)),l=(o.flowSpeed??1)*.016,d=(o.riverWidth??100)/100,w=2.5,j=(o.lightWarmth??100)/100,z=o.lampHeight??11.5,b=o.lampIntensity??220,W=o.lampRange??82,c=o.lampFalloff??1.65,m=v.useMemo(()=>Re(),[]),{curve:g,texture:P}=v.useMemo(()=>Te(),[]),y=v.useMemo(()=>Fe(m,n),[m,n]),D=v.useRef(null),H=v.useMemo(()=>{const u=new K({color:"#ffffff",roughness:.86,metalness:.02,side:ve});return u.onBeforeCompile=s=>{je(s,{pathTexture:P,flowSpeedMul:l,riverWidthMul:d,wingFlutter:w}),D.current=s},u},[P,l,d,w]);v.useEffect(()=>()=>{y.dispose()},[y]),v.useEffect(()=>()=>{H.dispose()},[H]);const U=v.useMemo(()=>Me(),[]),T=v.useMemo(()=>Ae(),[]),V=v.useMemo(()=>new K({map:U,color:"#c9a878",roughness:.78,metalness:.04}),[U]),Y=v.useMemo(()=>new K({map:T,color:"#8f8a80",roughness:.85,metalness:.05}),[T]),G=v.useMemo(()=>new K({map:T,bumpMap:T,bumpScale:.18,color:"#171a24",roughness:.94,metalness:.01}),[T]),f=v.useMemo(()=>{const u=[];for(let s=0;s<10;s+=1){const R=.02+s/10*.42,A=g.getPoint(R),E=g.getTangent(R).normalize(),O=s%2?1:-1,N=new $(-E.z,0,E.x).normalize().multiplyScalar(3.4*O);u.push(A.clone().add(N).setY(0))}return u},[g]),p=v.useMemo(()=>{const u=[];for(let s=0;s<5;s+=1){const R=.68+s/5*.3,A=g.getPoint(R),E=g.getTangent(R).normalize(),O=s%2?1:-1,N=new $(-E.z,0,E.x).normalize().multiplyScalar(2.6*O);u.push(A.clone().add(N).setY(0))}return u},[g]),M=se({pitchMin:-.85,pitchMax:.85}),S=v.useRef(.08),k=v.useRef(.42),F=v.useRef(62),L=v.useRef(62),h=v.useRef({frames:0,time:0});return v.useEffect(()=>{e.position.set(23,36,43),e.lookAt(1,8.5,-3)},[e]),v.useEffect(()=>{const u=i.domElement,s=R=>{window.matchMedia("(hover: hover) and (pointer: fine)").matches&&(R.preventDefault(),L.current=_.clamp(L.current*Math.exp(R.deltaY*.0012),18,115))};return u.addEventListener("wheel",s,{passive:!1}),()=>u.removeEventListener("wheel",s)},[i]),ue((u,s)=>{const R=u.clock.elapsedTime*a,A=D.current;A&&(A.uniforms.uTime.value=R,A.uniforms.uFlowSpeed.value=l,A.uniforms.uRiverWidth.value=d,A.uniforms.uWingFlutter.value=w),S.current=(S.current+Math.min(s,.05)*a*.01)%1;const E=M.current.targetYaw,O=M.current.targetPitch;k.current+=Math.min(s,.05)*a*.018;const N=k.current+E,q=.48+O*.55;F.current=_.damp(F.current,L.current,9,Math.min(s,.05));const J=F.current,X=new $(1,8.5,-3);e.position.set(X.x+Math.sin(N)*Math.cos(q)*J,X.y+Math.sin(q)*J,X.z+Math.cos(N)*Math.cos(q)*J),e.lookAt(X);const ae=1-_.smoothstep(S.current,0,.62);h.current.frames+=1,h.current.time+=s,h.current.time>=.5&&(r({fps:Math.round(h.current.frames/h.current.time),zone:ae>.5?"TEMPLE COURTYARD":"MOONLIT GARDEN"}),h.current.frames=0,h.current.time=0)}),v.useEffect(()=>{var s;const u=((s=i==null?void 0:i.constructor)==null?void 0:s.name)??"WebGL2";r({gpu:u.includes("WebGPU")?"WebGPU":"WebGL2",cranes:n})},[n]),t.jsxs("group",{children:[t.jsx("ambientLight",{intensity:.008,color:"#b9c8e8"}),t.jsx("hemisphereLight",{color:"#53658f",groundColor:"#08070a",intensity:.008}),t.jsx("directionalLight",{position:[8,10,6],intensity:.09,color:"#7186b8"}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.05,0],receiveShadow:!0,children:[t.jsx("circleGeometry",{args:[40,96]}),t.jsx("primitive",{object:G,attach:"material"})]}),we.map((u,s)=>t.jsxs("group",{position:u.position,children:[t.jsxs("mesh",{position:[0,5.1,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.32,.7,10.2,10]}),t.jsx("primitive",{object:Y,attach:"material"})]}),t.jsxs("mesh",{position:[0,10.35,0],castShadow:!0,children:[t.jsx("cylinderGeometry",{args:[1.15,.52,.65,10]}),t.jsx("primitive",{object:V,attach:"material"})]}),t.jsxs("mesh",{position:[0,z,0],children:[t.jsx("sphereGeometry",{args:[.72,24,16]}),t.jsx("meshStandardMaterial",{color:"#5a3518",emissive:u.color,emissiveIntensity:.85*j,roughness:.38})]}),t.jsx("pointLight",{position:[0,z,0],color:u.color,intensity:b*j,distance:W,decay:c,castShadow:!0,"shadow-mapSize-width":512,"shadow-mapSize-height":512,"shadow-bias":-4e-4})]},`main-lamp-${s}`)),f.map((u,s)=>t.jsx("group",{position:u,children:t.jsxs("mesh",{position:[0,2.2,0],children:[t.jsx("cylinderGeometry",{args:[.32,.38,4.4,8]}),t.jsx("primitive",{object:V,attach:"material"})]})},s)),p.map((u,s)=>t.jsxs("group",{position:u,children:[t.jsxs("mesh",{position:[0,.6,0],children:[t.jsx("cylinderGeometry",{args:[.1,.12,1.2,6]}),t.jsx("meshStandardMaterial",{color:"#3a3a3e",roughness:.7})]}),t.jsxs("mesh",{position:[0,1.3,0],children:[t.jsx("boxGeometry",{args:[.34,.3,.34]}),t.jsx("meshStandardMaterial",{color:"#2e2e32",roughness:.6})]}),t.jsx("pointLight",{position:[0,1.35,0],intensity:2.4,distance:5,color:"#9db6e8"})]},s)),t.jsx("mesh",{geometry:y,material:H,frustumCulled:!1})]})}function Oe({settings:o={}}){const[r,e]=v.useState({fps:60,gpu:"—",cranes:0,zone:"TEMPLE COURTYARD"}),i=a=>e(n=>({...n,...a}));return t.jsxs("section",{className:"atmosphere river-of-wishes",style:{"--experiment-accent":"#e6c88a"},children:[t.jsxs(ie,{camera:{position:[23,36,43],fov:46,near:.1,far:150},speed:o.speed??1,shadows:!0,bloom:{intensity:.8,threshold:.6},children:[t.jsx("color",{attach:"background",args:[te]}),t.jsx("fogExp2",{attach:"fog",args:[te,.009]}),t.jsx(Le,{settings:o,onStats:i})]}),t.jsxs("div",{className:"experiment-copy river-of-wishes__copy",children:[t.jsx("p",{children:"26 — A river suspended in midair"}),t.jsxs("h1",{children:["The River",t.jsx("br",{}),"of Wishes."]}),t.jsx("span",{children:"Tens of thousands of tiny cranes become a suspended river, flowing through an ancient temple and out into a moonlit garden — never colliding, never stopping."})]}),t.jsx("div",{className:"river-of-wishes__legend",children:t.jsxs("div",{children:[t.jsx("i",{children:"↻"}),t.jsxs("div",{children:[t.jsx("b",{children:"Drag"}),t.jsx("span",{children:"Orbit the river"})]})]})}),t.jsx(ce,{eyebrow:"Current position",value:r.zone,stats:[{value:r.cranes.toLocaleString(),label:"CRANES IN THE RIVER"},{value:r.gpu,label:"RENDERER"}]})]})}export{Oe as default};
