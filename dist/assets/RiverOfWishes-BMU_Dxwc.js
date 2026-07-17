import{r as c,j as t}from"./index--L1M7nnx.js";import{C as xe,u as me}from"./CanvasStage-BuuJkg69.js";import{u as ge}from"./useDragOrbit-CeZ6uFZS.js";import{A as we}from"./AnimationReadout-DKpmX48d.js";import{WishingTreeModel as ye}from"./WishingTree-CoTku0Q6.js";import{s as y}from"./procedural-DZUg-xN7.js";import{u as oe,a as ce}from"./react-three-fiber.esm-CowKzO8x.js";import{a2 as Me,H as be,dH as Se,C as je,A as Pe,V as X,aP as Ce,S as Ae,ad as F,aa as re,D as Te,e as pe,ae as Ee,Y as Le,a9 as Re,ai as ne,dO as De,l as ze,R as Fe,F as ke,N as le,aG as W,a7 as Ie,a5 as _,aF as ee,by as ve}from"./three.module-Ct-yBmsu.js";import{v as We}from"./constants-CIgl5eJ3.js";import"./index-BYhJrobO.js";import"./usePinchZoom-CtXzbEvu.js";import"./quality-NEVBGrgs.js";import"./dragOrbit-BWBT6NeL.js";import"./useLiveFps-Br2q54ju.js";import"./BufferGeometryUtils-CfLCGRKU.js";function Ge({resolution:a=256,near:o=.1,far:e=1e3,envMap:r,fog:n}={}){const s=ce(({gl:f})=>f),i=ce(({scene:f})=>f),l=c.useMemo(()=>{const f=new Me(a);return f.texture.type=be,f},[a]);c.useEffect(()=>()=>{l.dispose()},[l]);const u=c.useMemo(()=>new Se(o,e,l),[o,e,l]);let h,p;const d=c.useCallback(()=>{h=i.fog,p=i.background,i.background=r||p,i.fog=n||h,u.update(s,i),i.fog=h,i.background=p},[s,i,u]);return{fbo:l,camera:u,update:d}}function Ue({children:a,frames:o=1/0,resolution:e,near:r,far:n,envMap:s,fog:i,...l}){const u=c.useRef(null),{fbo:h,camera:p,update:d}=Ge({resolution:e,near:r,far:n,envMap:s,fog:i});let f=0;return oe(()=>{u.current&&(o===1/0||f<o)&&(u.current.visible=!1,d(),u.current.visible=!0,f++)}),c.createElement("group",l,c.createElement("primitive",{object:p}),c.createElement("group",{ref:u},a==null?void 0:a(h.texture)))}class Ne extends Ae{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,fragmentShader:`
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${We>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const Be=a=>new X().setFromSpherical(new Ce(a,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),_e=c.forwardRef(({radius:a=100,depth:o=50,count:e=5e3,saturation:r=0,factor:n=4,fade:s=!1,speed:i=1},l)=>{const u=c.useRef(null),[h,p,d]=c.useMemo(()=>{const x=[],v=[],S=Array.from({length:e},()=>(.5+.5*Math.random())*n),M=new je;let j=a+o;const A=o/e;for(let E=0;E<e;E++)j-=A*Math.random(),x.push(...Be(j).toArray()),M.setHSL(E/e,r,.9),v.push(M.r,M.g,M.b);return[new Float32Array(x),new Float32Array(v),new Float32Array(S)]},[e,o,n,a,r]);oe(x=>u.current&&(u.current.uniforms.time.value=x.clock.elapsedTime*i));const[f]=c.useState(()=>new Ne);return c.createElement("points",{ref:l},c.createElement("bufferGeometry",null,c.createElement("bufferAttribute",{attach:"attributes-position",args:[h,3]}),c.createElement("bufferAttribute",{attach:"attributes-color",args:[p,3]}),c.createElement("bufferAttribute",{attach:"attributes-size",args:[d,1]})),c.createElement("primitive",{ref:u,object:f,attach:"material",blending:Pe,"uniforms-fade-value":s,depthWrite:!1,transparent:!0,vertexColors:!0}))}),He=1e4,H=512,ue=.87,Oe=[{position:[-18,0,14],color:"#ffd18a"},{position:[18,0,14],color:"#ffc078"},{position:[18,0,-16],color:"#ffe0a0"},{position:[-18,0,-16],color:"#ffb96e"}],he="#090d20",Ve=.58,Ye=.85;function de(a,o){const e=Math.abs(a-o)%1;return Math.min(e,1-e)}function $e(a){const o=de(a,Ve),e=de(a,Ye),n=1+Math.sin(a*Math.PI*4-.7)*.18+.72*Math.exp(-(e**2)/(2*.065**2))-.48*Math.exp(-(o**2)/(2*.045**2));return F.clamp(n,.52,1.82)}function Xe(){const a=[],o=[],e=(b,D,T,G)=>{a.push(...D,...T,...G),o.push(b,b,b)},r=[0,.58,.02],n=[0,-.14,.02],s=[-.48,.2,.02],i=[.48,.2,.02],l=[0,.22,.7],u=[0,.22,-.68];e(0,r,s,l),e(0,r,l,i),e(0,r,i,u),e(0,r,u,s),e(0,n,l,s),e(0,n,i,l),e(0,n,u,i),e(0,n,s,u);const h=[-.13,.24,.58],p=[.13,.24,.58],d=[-.1,.82,1.05],f=[.1,.82,1.05],x=[-.09,1.25,1.38],v=[.09,1.25,1.38];e(0,h,p,f),e(0,h,f,d),e(0,d,f,v),e(0,d,v,x);const S=[0,1.38,1.53],M=[0,1.18,1.6],j=[0,1.03,2.02];e(0,x,v,S),e(0,x,M,v),e(0,S,v,j),e(0,S,j,x),e(0,x,j,M),e(0,M,j,v);const A=[-.06,.24,-.57],E=[.06,.24,-.57],U=[-.035,.58,-1],K=[.035,.58,-1],Q=[0,.82,-1.55];e(0,A,E,K),e(0,A,K,U),e(0,U,K,Q);function J(b,D){const T=[.08*b,.48,.5],G=[.08*b,.48,-.48],q=[.82*b,.42,.62],V=[.92*b,.4,-.62],k=[2.12*b,.18,-.04],P=[1*b,.66,.02];b>0?(e(D,T,q,P),e(D,q,k,P),e(D,P,k,V),e(D,P,V,G),e(D,T,P,G)):(e(D,T,P,q),e(D,q,P,k),e(D,P,V,k),e(D,P,G,V),e(D,T,G,P))}J(-1,1),J(1,2);const O=new Re;O.setAttribute("position",new ne(a,3)),O.setAttribute("aHingeGroup",new ne(o,1));const N=new Float32Array(a.length/3*2);for(let b=0;b<a.length/3;b+=1)N[b*2]=a[b*3]*.32+.5,N[b*2+1]=a[b*3+2]*.32+a[b*3+1]*.12+.5;return O.setAttribute("uv",new ne(N,2)),O.computeVertexNormals(),O}const Ke=[[-24,10.2,18],[-19,11.2,23],[-12,10.4,18],[-7,9.4,9],[0,10.3,14],[9,11.4,21],[18,10.7,20],[24,10.1,14],[19,11.1,8],[10,10.3,4],[15,9.5,-2],[24,10.4,-9],[23,11.3,-17],[18,10.6,-23],[10,9.6,-18],[5,10.5,-9],[0,11.6,-14],[-9,12.1,-23],[-18,10.8,-22],[-24,9.7,-16],[-21,10.5,-8],[-12,11.4,-4],[-17,10.7,2],[-25,10.1,9]];function qe(){const a=Ke.map(s=>new X(s[0]*ue,s[1],s[2]*ue)),o=new De(a,!0,"catmullrom",.5),e=o.getPoints(H),r=new Float32Array(H*4);for(let s=0;s<H;s+=1){const i=e[s];r[s*4]=i.x,r[s*4+1]=i.y,r[s*4+2]=i.z,r[s*4+3]=$e(s/H)}const n=new ze(r,H,1,Fe,ke);return n.needsUpdate=!0,n.minFilter=le,n.magFilter=le,n.wrapS=W,n.generateMipmaps=!1,{curve:o,texture:n}}function Ze(){const o=document.createElement("canvas");o.width=256,o.height=256;const e=o.getContext("2d");e.fillStyle="#3f2c1a",e.fillRect(0,0,256,256);for(let n=0;n<70;n+=1){const s=n*3.6+y(n,701)*3;e.strokeStyle=`rgba(20, 12, 6, ${.12+y(n,702)*.22})`,e.lineWidth=1+y(n,703)*2,e.beginPath();for(let i=0;i<=256;i+=12){const l=Math.sin(i*.03+n)*4;i===0?e.moveTo(i,s+l):e.lineTo(i,s+l)}e.stroke()}const r=new ee(o);return r.wrapS=W,r.wrapT=W,r.repeat.set(1,4),r}function ae(a,o,e,r,n,s=[.35,1.5]){for(let i=0;i<e;i+=1){const l=y(i,r)*o,u=y(i,r+1)*o,h=s[0]+y(i,r+2)*(s[1]-s[0]);a.fillStyle=n(y(i,r+3));const p=l<h?[0,o]:l>o-h?[0,-o]:[0],d=u<h?[0,o]:u>o-h?[0,-o]:[0];p.forEach(f=>{d.forEach(x=>{a.beginPath(),a.arc(l+f,u+x,h,0,Math.PI*2),a.fill()})})}}function Je(){const o=document.createElement("canvas");o.width=512,o.height=512;const e=o.getContext("2d"),r=e.createImageData(512,512);for(let s=0;s<512;s+=1)for(let i=0;i<512;i+=1){const l=i/512,u=s/512,p=1+(Math.sin((l*6+u*4)*Math.PI*2)*.5+Math.sin((l*-3+u*7)*Math.PI*2)*.32+Math.sin((l*11-u*5)*Math.PI*2)*.16)*.1,d=(s*512+i)*4;r.data[d]=Math.min(255,118*p),r.data[d+1]=Math.min(255,112*p),r.data[d+2]=Math.min(255,100*p),r.data[d+3]=255}e.putImageData(r,0,0),ae(e,512,2e3,1601,s=>`rgba(20, 18, 14, ${.05+s*.12})`,[.4,1.8]),ae(e,512,900,1701,s=>`rgba(212, 204, 190, ${.05+s*.1})`,[.3,1.2]);const n=new ee(o);return n.wrapS=W,n.wrapT=W,n.repeat.set(3,3),n}function Qe(){const o=document.createElement("canvas");o.width=512,o.height=512;const e=o.getContext("2d"),r=e.createImageData(512,512);for(let s=0;s<512;s+=1)for(let i=0;i<512;i+=1){const l=i/512,u=s/512,p=1+(Math.sin((l*5+u*3)*Math.PI*2)*.5+Math.sin((l*-4+u*6)*Math.PI*2)*.32+Math.sin((l*9-u*2)*Math.PI*2)*.18)*.09,d=(s*512+i)*4;r.data[d]=Math.min(255,150*p),r.data[d+1]=Math.min(255,130*p),r.data[d+2]=Math.min(255,98*p),r.data[d+3]=255}e.putImageData(r,0,0),ae(e,512,3200,1401,s=>`rgba(255, 244, 214, ${.04+s*.1})`,[.25,.9]),ae(e,512,2200,1501,s=>`rgba(58, 44, 26, ${.04+s*.09})`,[.25,.85]);const n=new ee(o);return n.wrapS=W,n.wrapT=W,n.repeat.set(10,10),n}function et(){const o=document.createElement("canvas");o.width=128,o.height=128;const e=o.getContext("2d"),r=e.createImageData(128,128);for(let s=0;s<128;s+=1)for(let i=0;i<128;i+=1){const l=(s*128+i)*4,u=Math.sin(s*.72+Math.sin(i*.09)*1.7)*7,h=Math.sin(i*.91+Math.sin(s*.13))*4;r.data[l]=128+u,r.data[l+1]=128+h,r.data[l+2]=246,r.data[l+3]=255}e.putImageData(r,0,0);const n=new ee(o);return n.wrapS=W,n.wrapT=W,n.repeat.set(5,5),n.colorSpace=ve,n}function fe({size:a,waveCount:o,maxFreq:e,seedBase:r,strength:n}){const s=document.createElement("canvas");s.width=a,s.height=a;const i=s.getContext("2d"),l=i.createImageData(a,a),u=[];for(let d=0;d<o;d+=1){let f=Math.round(F.lerp(-e,e,y(d,r))),x=Math.round(F.lerp(-e,e,y(d,r+1)));f===0&&x===0&&(f=1);const S=1/Math.hypot(f,x)**1.15,M=y(d,r+2)*Math.PI*2;u.push({kx:f,ky:x,amp:S,phase:M})}const h=u.reduce((d,f)=>d+f.amp,0);for(let d=0;d<a;d+=1)for(let f=0;f<a;f+=1){const x=f/a,v=d/a;let S=0,M=0;u.forEach(E=>{const U=Math.cos((E.kx*x+E.ky*v)*Math.PI*2+E.phase)*E.amp;S+=U*E.kx,M+=U*E.ky}),S=S/h*n,M=M/h*n;const j=Math.hypot(S,M,1),A=(d*a+f)*4;l.data[A]=128+S/j*90,l.data[A+1]=128+M/j*90,l.data[A+2]=128+1/j*120,l.data[A+3]=255}i.putImageData(l,0,0);const p=new ee(s);return p.wrapS=W,p.wrapT=W,p.colorSpace=ve,p}function tt(){const a=fe({size:512,waveCount:11,maxFreq:8,seedBase:2201,strength:9});return a.repeat.set(4,4),a}function rt(){return fe({size:256,waveCount:16,maxFreq:27,seedBase:2301,strength:14})}function at(a,{detailTexture:o}){a.uniforms.uDetailNormalMap={value:o},a.uniforms.uDetailOffset={value:new pe(0,0)},a.uniforms.uWaterTime={value:0},a.uniforms.uDetailScale={value:3.35},a.uniforms.uDetailStrength={value:.24},a.fragmentShader=a.fragmentShader.replace("#include <common>",`
      uniform sampler2D uDetailNormalMap;
      uniform vec2 uDetailOffset;
      uniform float uWaterTime;
      uniform float uDetailScale;
      uniform float uDetailStrength;
      #include <common>
      `).replace("#include <normal_fragment_maps>",`
      #include <normal_fragment_maps>
      vec2 waterUv = vNormalMapUv;
      float slowMorph = uWaterTime * 0.11;
      vec2 broadWarp = vec2(
        sin(waterUv.y * 1.17 + slowMorph) + sin((waterUv.x + waterUv.y) * 0.61 - slowMorph * 0.73),
        cos(waterUv.x * 1.31 - slowMorph * 0.81) + sin((waterUv.x - waterUv.y) * 0.77 + slowMorph * 0.57)
      ) * 0.31;
      broadWarp += vec2(
        sin(waterUv.y * 2.43 - uWaterTime * 0.043),
        cos(waterUv.x * 2.17 + uWaterTime * 0.037)
      ) * (0.11 + sin(uWaterTime * 0.067) * 0.035);
      vec2 detailUv = waterUv * uDetailScale + uDetailOffset + broadWarp;
      vec3 detailA = texture2D(uDetailNormalMap, detailUv).xyz * 2.0 - 1.0;
      vec3 detailB = texture2D(
        uDetailNormalMap,
        waterUv.yx * vec2(-4.17, 4.53) + uDetailOffset.yx * vec2(-0.63, 0.79)
          + broadWarp.yx * 1.37 + vec2(sin(slowMorph), cos(slowMorph * 0.83)) * 0.34
      ).xyz * 2.0 - 1.0;
      float fieldBlend = 0.42 + sin(uWaterTime * 0.083 + waterUv.x * 0.47 - waterUv.y * 0.39) * 0.16;
      vec3 waterDetailN = normalize(vec3(mix(detailA.xy, detailB.yx, fieldBlend), max(0.42, detailA.z * detailB.z)));
      waterDetailN.xy *= uDetailStrength;
      vec3 waterDetailWorld = normalize(tbn * normalize(waterDetailN));
      normal = normalize(normal + waterDetailWorld);
      `)}function ot(a,{pathTexture:o,flowSpeedMul:e,riverWidthMul:r,wingFlutter:n}){a.uniforms.uPathTexture={value:o},a.uniforms.uTime={value:0},a.uniforms.uFlowSpeed={value:e},a.uniforms.uRiverWidth={value:r},a.uniforms.uWingFlutter={value:n},a.vertexShader=a.vertexShader.replace("#include <common>",`
      attribute float aHingeGroup;
      attribute float aPathPhase;
      attribute float aLaneX;
      attribute float aLaneY;
      attribute float aFlapPhase;
      attribute float aFlapSpeed;
      attribute float aColorSeed;
      attribute float aWeavePhase;
      attribute float aScale;
      attribute float aSpeed;

      uniform sampler2D uPathTexture;
      uniform float uTime;
      uniform float uFlowSpeed;
      uniform float uRiverWidth;
      uniform float uWingFlutter;

      varying float vColorSeedV;
      varying vec2 vPaperCoordV;

      vec4 riverSamplePath(float u) {
        float samplePosition = fract(u) * ${H.toFixed(1)};
        float sampleIndex = floor(samplePosition);
        float sampleMix = fract(samplePosition);
        float nextIndex = mod(sampleIndex + 1.0, ${H.toFixed(1)});
        float uvA = (sampleIndex + 0.5) / ${H.toFixed(1)};
        float uvB = (nextIndex + 0.5) / ${H.toFixed(1)};
        vec4 sampleA = texture2D(uPathTexture, vec2(uvA, 0.5));
        vec4 sampleB = texture2D(uPathTexture, vec2(uvB, 0.5));
        return mix(sampleA, sampleB, sampleMix);
      }

      vec3 riverRotateAroundAxis(vec3 p, vec3 axis, float angle) {
        return p * cos(angle) + cross(axis, p) * sin(angle) + axis * dot(axis, p) * (1.0 - cos(angle));
      }

      void riverApplyFlap(inout vec3 p, inout vec3 n, int group, float signedFlap) {
        vec3 pivot = vec3(0.0);
        vec3 axis = vec3(0.0, 0.0, 1.0);
        float closedAngle = 0.0;
        if (group == 1) { pivot = vec3(-0.08, 0.48, 0.0); axis = vec3(0.0, 0.0, 1.0); closedAngle = 0.9; }
        else if (group == 2) { pivot = vec3(0.08, 0.48, 0.0); axis = vec3(0.0, 0.0, 1.0); closedAngle = -0.9; }
        else { return; }
        // signedFlap spans the complete wing stroke: positive rotates the
        // wings down, zero is level, and negative rotates them upward.
        float angle = closedAngle * signedFlap;
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
      float riverTimeFrac = fract(aPathPhase + uTime * uFlowSpeed * aSpeed);
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
      float riverSignedFlap = sin(uTime * aFlapSpeed + aFlapPhase) * min(1.0, uWingFlutter * 0.4);
      riverApplyFlap(riverLocalPos, riverLocalNormal, riverGroup, riverSignedFlap);

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
      float riverDotPattern(vec2 p) {
        vec2 cell = fract(p) - 0.5;
        return 1.0 - smoothstep(0.12, 0.2, length(cell));
      }
      #include <common>
      `).replace("#include <color_fragment>",`
      #include <color_fragment>
      // Night sky: lightness stays low across the board so cranes read as dark silhouettes
      // except where a real light (the lamp, mainly) actually reaches them — hue and
      // saturation still vary per instance for the "standard colors, some dark" mix.
      float riverHue = fract(vColorSeedV * 3.7 + 0.15);
      float riverSat = mix(0.52, 0.92, fract(vColorSeedV * 9.13 + 0.41));
      float riverLight = mix(0.025, 0.18, fract(vColorSeedV * 17.7 + 0.63));
      vec3 riverColor = riverHsl2rgb(vec3(riverHue, riverSat, riverLight));
      float riverFiber = riverPaperNoise(vPaperCoordV + vColorSeedV * 7.0);
      riverColor *= mix(0.88, 1.08, riverFiber);

      // Half the flock receives one of three stable, seed-selected origami
      // paper patterns: fine stripes, a diamond lattice, or small ink dots.
      float riverPatternEnabled = step(0.5, fract(vColorSeedV * 19.73));
      float riverPatternChoice = floor(fract(vColorSeedV * 43.17) * 3.0);
      vec2 riverPatternUv = vPaperCoordV * mix(1.5, 3.2, fract(vColorSeedV * 8.9));
      float riverStripes = smoothstep(0.45, 0.58, sin((riverPatternUv.x + riverPatternUv.y * 0.24) * 10.0) * 0.5 + 0.5);
      float riverLattice = smoothstep(0.72, 0.9, max(
        abs(sin((riverPatternUv.x + riverPatternUv.y) * 5.0)),
        abs(sin((riverPatternUv.x - riverPatternUv.y) * 5.0))
      ));
      float riverDots = riverDotPattern(riverPatternUv * 1.7);
      float riverPattern = riverPatternChoice < 0.5
        ? riverStripes
        : (riverPatternChoice < 1.5 ? riverLattice : riverDots);
      float riverInkStrength = mix(0.38, 0.68, fract(vColorSeedV * 6.31));
      riverColor *= mix(1.0, mix(1.12, riverInkStrength, riverPattern), riverPatternEnabled);
      diffuseColor.rgb = riverColor;
      `)}function st(a,o){const e=new Ie;e.index=a.index,e.attributes.position=a.attributes.position,e.attributes.normal=a.attributes.normal,e.attributes.aHingeGroup=a.attributes.aHingeGroup;const r=new Float32Array(o),n=new Float32Array(o),s=new Float32Array(o),i=new Float32Array(o),l=new Float32Array(o),u=new Float32Array(o),h=new Float32Array(o),p=new Float32Array(o),d=new Float32Array(o),f=64,x=Math.ceil(o/f);for(let v=0;v<o;v+=1){const S=v%f,M=Math.floor(v/f);r[v]=(M+y(v,901)*.22+S/f)/x;const j=.28+Math.sqrt((S+.5)/f)*2.8,A=S*2.399963229728653;n[v]=Math.cos(A)*j,s[v]=Math.sin(A)*j*.52,i[v]=y(v,904)*Math.PI*2,l[v]=2.2+y(v,905)*1.6,u[v]=y(v,906),h[v]=y(v,907)*Math.PI*2,p[v]=1+y(v,908)*.1,d[v]=.94+y(v,909)*.12}return e.setAttribute("aPathPhase",new _(r,1)),e.setAttribute("aLaneX",new _(n,1)),e.setAttribute("aLaneY",new _(s,1)),e.setAttribute("aFlapPhase",new _(i,1)),e.setAttribute("aFlapSpeed",new _(l,1)),e.setAttribute("aColorSeed",new _(u,1)),e.setAttribute("aWeavePhase",new _(h,1)),e.setAttribute("aScale",new _(p,1)),e.setAttribute("aSpeed",new _(d,1)),e.instanceCount=o,e}function nt({position:a,stoneMaterial:o,lampColor:e}){const r=c.useRef(null),n=c.useRef(null);return c.useEffect(()=>{r.current&&n.current&&(r.current.target=n.current)},[]),t.jsxs("group",{position:a,children:[t.jsxs("mesh",{position:[0,.5,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.14,.2,1,8]}),t.jsx("primitive",{object:o,attach:"material"})]}),t.jsxs("mesh",{position:[0,1.1,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("boxGeometry",{args:[.42,.4,.42]}),t.jsx("primitive",{object:o,attach:"material"})]}),t.jsxs("mesh",{position:[0,1.1,0],children:[t.jsx("boxGeometry",{args:[.24,.22,.24]}),t.jsx("meshStandardMaterial",{color:"#3a2410",emissive:e,emissiveIntensity:.6,roughness:.5})]}),t.jsxs("mesh",{position:[0,1.42,0],castShadow:!0,children:[t.jsx("coneGeometry",{args:[.34,.32,8]}),t.jsx("primitive",{object:o,attach:"material"})]}),t.jsx("pointLight",{position:[0,1.1,0],color:e,intensity:1.6,distance:4.5,decay:2}),t.jsx("spotLight",{ref:r,position:[0,1.15,0],color:e,intensity:9,distance:7,angle:Math.PI/4.2,penumbra:.65,decay:2}),t.jsx("object3D",{ref:n,position:[0,-.6,0]})]})}function ie({position:a,scale:o=1,seed:e=0}){const r=c.useMemo(()=>Array.from({length:9},(n,s)=>({x:(y(s,3100+e)-.5)*2.8,z:(y(s,3200+e)-.5)*2.2,height:5.5+y(s,3300+e)*4.5,lean:(y(s,3400+e)-.5)*.08})),[e]);return t.jsx("group",{position:a,scale:o,children:r.map((n,s)=>t.jsxs("group",{position:[n.x,0,n.z],rotation:[n.lean,0,-n.lean*.7],children:[t.jsxs("mesh",{position:[0,n.height*.5,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.075,.105,n.height,8]}),t.jsx("meshStandardMaterial",{color:s%3===0?"#405d38":"#567247",roughness:.8})]}),Array.from({length:5},(i,l)=>{const u=n.height*(.22+l*.155);return t.jsxs("group",{position:[0,u,0],rotation:[0,l*2.1+s,0],children:[t.jsxs("mesh",{castShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.118,.118,.055,8]}),t.jsx("meshStandardMaterial",{color:"#293e29",roughness:.88})]}),l>1&&t.jsxs("mesh",{position:[.58,.12,0],rotation:[0,0,-.22],castShadow:!0,children:[t.jsx("sphereGeometry",{args:[.72,7,4]}),t.jsx("meshStandardMaterial",{color:"#314d35",roughness:.94})]})]},l)})]},s))})}function it({stoneMaterial:a,woodMaterial:o}){const e=c.useMemo(()=>[[-17,.7,6.5,1.5],[-14.8,.55,5.5,1.05],[15.5,.75,7.2,1.6],[18,.5,5.9,1],[-17.5,.65,-8.5,1.35],[16.8,.6,-9.3,1.25]],[]);return t.jsxs("group",{children:[t.jsx(ie,{position:[-22,0,-6],scale:1.05,seed:1}),t.jsx(ie,{position:[21,0,5.5],scale:.92,seed:2}),t.jsx(ie,{position:[18.5,0,-13],scale:.72,seed:3}),e.map(([r,n,s,i],l)=>t.jsxs("mesh",{position:[r,n,s],scale:[i*1.35,i*.72,i],castShadow:!0,receiveShadow:!0,children:[t.jsx("dodecahedronGeometry",{args:[1,1]}),t.jsx("meshStandardMaterial",{color:l%2?"#263c2b":"#304932",roughness:.98})]},l)),t.jsxs("group",{position:[-1,0,16.5],rotation:[0,.08,0],children:[t.jsxs("mesh",{position:[-3.1,3.4,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("boxGeometry",{args:[.72,6.8,.72]}),t.jsx("primitive",{object:o,attach:"material"})]}),t.jsxs("mesh",{position:[3.1,3.4,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("boxGeometry",{args:[.72,6.8,.72]}),t.jsx("primitive",{object:o,attach:"material"})]}),t.jsxs("mesh",{position:[0,6.65,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("boxGeometry",{args:[7.6,.58,.72]}),t.jsx("primitive",{object:o,attach:"material"})]}),t.jsxs("mesh",{position:[0,5.75,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("boxGeometry",{args:[6.4,.42,.6]}),t.jsx("primitive",{object:o,attach:"material"})]})]}),[-6.5,-3.2,3.4,6.7].map((r,n)=>t.jsxs("mesh",{position:[r,.38,-14.4+Math.sin(n)*.65],scale:[1.45,.55,.9],castShadow:!0,receiveShadow:!0,children:[t.jsx("dodecahedronGeometry",{args:[.8,0]}),t.jsx("primitive",{object:a,attach:"material"})]},r))]})}function ct({stoneMaterial:a}){const o=me(),e=c.useMemo(()=>window.matchMedia("(hover: hover) and (pointer: fine)").matches,[]),r=c.useMemo(()=>tt(),[]),n=c.useMemo(()=>rt(),[]);c.useEffect(()=>()=>{r.dispose(),n.dispose()},[r,n]);const s=c.useRef(null);oe((u,h)=>{const p=u.clock.elapsedTime*o,d=.012+Math.sin(p*.021)*.004+Math.sin(p*.053+1.7)*.003,f=-.008+Math.cos(p*.017+.6)*.003+Math.sin(p*.037+3.1)*.0025;r.offset.x=(r.offset.x+h*d+1)%1,r.offset.y=(r.offset.y+h*f+1)%1,r.rotation=Math.sin(p*.035)*.06+Math.sin(p*.081+2.4)*.03+Math.sin(p*.019+5.2)*.025;const x=s.current;if(x){x.uniforms.uWaterTime.value=p;const v=x.uniforms.uDetailOffset.value;v.x=(v.x+h*-.045*o+1)%1,v.y=(v.y+h*.031*o+1)%1}});const i=c.useMemo(()=>Array.from({length:17},(u,h)=>{const p=h/16;return{x:F.lerp(-10.5,10.5,p),z:-1.4+Math.sin(p*Math.PI*2.2)*2.1,rotation:y(h,1201)*Math.PI,scale:.72+y(h,1202)*.38}}),[]),l=c.useMemo(()=>[[-12.8,.65,7.8,1.2],[-10.9,.42,9.1,.75],[12.4,.72,-8.8,1.35],[14.1,.38,-7.2,.68],[-3.8,.5,-12.6,.9],[5.2,.44,11.8,.82]],[]);return t.jsxs("group",{children:[t.jsx(Ue,{resolution:e?192:96,frames:1,near:.5,far:180,children:u=>t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.015,-1.5],scale:[1.45,.78,1],receiveShadow:!0,children:[t.jsx("circleGeometry",{args:[9.6,96]}),t.jsx("meshPhysicalMaterial",{color:"#07131f",envMap:u,envMapIntensity:.78,normalMap:r,normalScale:[.2,.2],roughness:.24,metalness:.08,clearcoat:1,clearcoatRoughness:.2,reflectivity:.82,onBeforeCompile:h=>{at(h,{detailTexture:n}),s.current=h}})]})}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.025,-1.5],scale:[1.45,.78,1],receiveShadow:!0,children:[t.jsx("ringGeometry",{args:[9.55,10.2,80]}),t.jsx("primitive",{object:a,attach:"material"})]}),i.map((u,h)=>t.jsxs("mesh",{position:[u.x,.16,u.z],rotation:[0,u.rotation,0],scale:[u.scale*1.25,1,u.scale],castShadow:!0,receiveShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.65,.78,.28,9]}),t.jsx("primitive",{object:a,attach:"material"})]},`step-${h}`)),l.map(([u,h,p,d],f)=>t.jsxs("mesh",{position:[u,h,p],scale:[d,d*.72,d],castShadow:!0,receiveShadow:!0,children:[t.jsx("dodecahedronGeometry",{args:[1,0]}),t.jsx("primitive",{object:a,attach:"material"})]},`rock-${f}`))]})}function lt({settings:a,onStats:o}){const{camera:e,gl:r}=ce(),n=me(),s=Math.round(F.clamp(a.craneCount??6e3,2e3,He)),i=(a.flowSpeed??1)*.016,l=(a.riverWidth??100)/100,u=2.5,h=a.lampHeight??11.5,p=a.lampIntensity??220,d=a.lampRange??220,f=a.lampFalloff??2,x=a.droneMode??!1,v=c.useMemo(()=>window.matchMedia("(hover: hover) and (pointer: fine)").matches?1024:512,[]),S=c.useMemo(()=>Xe(),[]),{texture:M}=c.useMemo(()=>qe(),[]),j=c.useMemo(()=>st(S,s),[S,s]),A=c.useMemo(()=>et(),[]),E=c.useRef(null),U=c.useMemo(()=>{const m=new re({color:"#ffffff",roughness:.78,metalness:.02,normalMap:A,normalScale:new pe(.32,.32),side:Te});return m.onBeforeCompile=g=>{ot(g,{pathTexture:M,flowSpeedMul:i,riverWidthMul:l,wingFlutter:u}),E.current=g},m},[M,A,i,l,u]);c.useEffect(()=>()=>{j.dispose()},[j]),c.useEffect(()=>()=>{U.dispose()},[U]),c.useEffect(()=>()=>{A.dispose()},[A]),c.useEffect(()=>{const m=r.toneMapping,g=r.toneMappingExposure,C=r.outputColorSpace;return r.toneMapping=Ee,r.toneMappingExposure=.82,r.outputColorSpace=Le,()=>{r.toneMapping=m,r.toneMappingExposure=g,r.outputColorSpace=C}},[r]);const K=c.useMemo(()=>Ze(),[]),Q=c.useMemo(()=>Je(),[]),J=c.useMemo(()=>Qe(),[]),O=c.useMemo(()=>new re({map:K,bumpMap:K,bumpScale:.14,color:"#c09a68",roughness:.82,metalness:.02}),[K]),N=c.useMemo(()=>new re({map:Q,bumpMap:Q,bumpScale:.16,color:"#858078",roughness:.91,metalness:.015}),[Q]),b=c.useMemo(()=>new re({map:J,bumpMap:J,bumpScale:.06,color:"#e2d3ad",roughness:.95,metalness:.01}),[J]),D=c.useMemo(()=>[0,Math.PI/2,Math.PI,3*Math.PI/2].map(L=>new X(0+Math.cos(L)*16.4,0,-1.5+Math.sin(L)*9.4)),[]),T=ge({pitchMin:-.85,pitchMax:.85}),G=c.useRef(.08),q=c.useRef(.42),V=c.useRef(62),k=c.useRef(62),P=c.useRef({frames:0,time:0}),se=c.useRef(new Set),te=c.useRef({yaw:0,pitch:0});return c.useEffect(()=>{e.position.set(23,36,43),e.lookAt(1,8.5,-3)},[e]),c.useEffect(()=>{if(x){const m=e.getWorldDirection(new X);te.current.yaw=Math.atan2(m.x,m.z),te.current.pitch=Math.asin(F.clamp(m.y,-1,1))}T.current.targetYaw=0,T.current.targetPitch=0,se.current.clear()},[e,x,T]),c.useEffect(()=>{const m=se.current,g=L=>{if(!x||L.repeat)return;const B=L.code==="Space"?"space":L.key.toLowerCase();["w","a","s","d","q","e","space","shift"].includes(B)&&(m.add(B),L.preventDefault())},C=L=>m.delete(L.code==="Space"?"space":L.key.toLowerCase()),z=()=>m.clear();return window.addEventListener("keydown",g),window.addEventListener("keyup",C),window.addEventListener("blur",z),()=>{window.removeEventListener("keydown",g),window.removeEventListener("keyup",C),window.removeEventListener("blur",z)}},[x]),c.useEffect(()=>{const m=r.domElement;let g=0,C=k.current;const z=w=>{x||window.matchMedia("(hover: hover) and (pointer: fine)").matches&&(w.preventDefault(),k.current=F.clamp(k.current*Math.exp(w.deltaY*.0012),18,115))},L=w=>Math.hypot(w[0].clientX-w[1].clientX,w[0].clientY-w[1].clientY),B=w=>{w.touches.length===2&&(w.preventDefault(),T.current.dragging=!1,g=Math.max(1,L(w.touches)),C=k.current)},Z=w=>{if(w.touches.length!==2||g<=0)return;w.preventDefault(),T.current.dragging=!1;const Y=Math.max(1,L(w.touches));k.current=F.clamp(C*(g/Y),18,115)},I=w=>{w.touches.length<2&&(g=0)};return m.addEventListener("wheel",z,{passive:!1}),m.addEventListener("touchstart",B,{passive:!1}),m.addEventListener("touchmove",Z,{passive:!1}),m.addEventListener("touchend",I),m.addEventListener("touchcancel",I),()=>{m.removeEventListener("wheel",z),m.removeEventListener("touchstart",B),m.removeEventListener("touchmove",Z),m.removeEventListener("touchend",I),m.removeEventListener("touchcancel",I)}},[x,r]),c.useEffect(()=>{const m=r.domElement,g=z=>{!x||z.pointerType==="touch"||(m.style.cursor="none")},C=()=>{m.style.cursor=""};return m.addEventListener("pointerdown",g),m.addEventListener("pointerup",C),m.addEventListener("pointercancel",C),window.addEventListener("blur",C),()=>{C(),m.removeEventListener("pointerdown",g),m.removeEventListener("pointerup",C),m.removeEventListener("pointercancel",C),window.removeEventListener("blur",C)}},[x,r]),oe((m,g)=>{const C=m.clock.elapsedTime*n,z=E.current;if(z&&(z.uniforms.uTime.value=C,z.uniforms.uFlowSpeed.value=i,z.uniforms.uRiverWidth.value=l,z.uniforms.uWingFlutter.value=u),G.current=(G.current+Math.min(g,.05)*n*.01)%1,x){const B=Math.min(g,.05),Z=te.current.yaw+T.current.targetYaw,I=F.clamp(te.current.pitch-T.current.targetPitch,-1.48,1.48),w=new X(Math.sin(Z)*Math.cos(I),Math.sin(I),Math.cos(Z)*Math.cos(I)).normalize(),Y=new X().crossVectors(e.up,w).normalize(),R=new X,$=se.current;$.has("w")&&R.add(w),$.has("s")&&R.sub(w),$.has("a")&&R.add(Y),$.has("d")&&R.sub(Y),$.has("e")&&(R.y+=1),$.has("q")&&(R.y-=1),$.has("space")&&(R.y+=1),$.has("shift")&&(R.y-=1),R.lengthSq()>0&&(e.position.addScaledVector(R.normalize(),15*B),e.position.x=F.clamp(e.position.x,-120,120),e.position.y=F.clamp(e.position.y,.8,90),e.position.z=F.clamp(e.position.z,-120,120)),e.lookAt(e.position.clone().add(w))}else{const B=T.current.targetYaw,Z=T.current.targetPitch;q.current+=Math.min(g,.05)*n*.018;const I=q.current+B,w=.48+Z*.55;V.current=F.damp(V.current,k.current,9,Math.min(g,.05));const Y=V.current,R=new X(1,8.5,-3);e.position.set(R.x+Math.sin(I)*Math.cos(w)*Y,R.y+Math.sin(w)*Y,R.z+Math.cos(I)*Math.cos(w)*Y),e.lookAt(R)}const L=1-F.smoothstep(G.current,0,.62);P.current.frames+=1,P.current.time+=g,P.current.time>=.5&&(o({fps:Math.round(P.current.frames/P.current.time),zone:L>.5?"TEMPLE COURTYARD":"MOONLIT GARDEN"}),P.current.frames=0,P.current.time=0)}),c.useEffect(()=>{var g;const m=((g=r==null?void 0:r.constructor)==null?void 0:g.name)??"WebGL2";o({gpu:m.includes("WebGPU")?"WebGPU":"WebGL2",cranes:s})},[s]),t.jsxs("group",{children:[t.jsx("ambientLight",{intensity:.008,color:"#b9c8e8"}),t.jsx("hemisphereLight",{color:"#53658f",groundColor:"#08070a",intensity:.008}),t.jsx("directionalLight",{position:[8,10,6],intensity:.05,color:"#7186b8"}),t.jsx("directionalLight",{position:[-58,70,-72],intensity:.22,color:"#9eb7ea",castShadow:!0,"shadow-mapSize-width":v,"shadow-mapSize-height":v,"shadow-camera-left":-44,"shadow-camera-right":44,"shadow-camera-top":44,"shadow-camera-bottom":-44,"shadow-camera-near":20,"shadow-camera-far":170,"shadow-bias":-25e-5,"shadow-normalBias":.025}),t.jsxs("mesh",{position:[-58,70,-72],children:[t.jsx("sphereGeometry",{args:[6.5,40,24]}),t.jsx("meshBasicMaterial",{color:"#d9e3f5",fog:!1,toneMapped:!1})]}),t.jsx(_e,{radius:105,depth:38,count:900,factor:1.1,saturation:.15,fade:!1,speed:0}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.05,0],receiveShadow:!0,children:[t.jsx("circleGeometry",{args:[40,96]}),t.jsx("primitive",{object:b,attach:"material"})]}),t.jsx(ct,{stoneMaterial:N}),t.jsx(it,{stoneMaterial:N,woodMaterial:O}),t.jsx(ye,{position:[-10.5,0,9],rotation:[0,.38,0],scale:.68,petalCount:4e4,fallingPetals:600,windIntensity:.7}),Array.from({length:6},(m,g)=>t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[-10.5,.018+g*4e-4,9],receiveShadow:!0,children:[t.jsx("ringGeometry",{args:[2.1+g*.72,2.15+g*.72,80]}),t.jsx("meshStandardMaterial",{color:"#4b5260",roughness:.96})]},`raked-ring-${g}`)),t.jsxs("group",{position:[11.8,0,8.8],children:[t.jsxs("mesh",{position:[0,.42,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("cylinderGeometry",{args:[1.05,1.2,.84,12]}),t.jsx("primitive",{object:N,attach:"material"})]}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.85,0],children:[t.jsx("circleGeometry",{args:[.82,32]}),t.jsx("meshPhysicalMaterial",{color:"#081520",roughness:.24,metalness:.12,clearcoat:1})]})]}),Oe.map((m,g)=>t.jsxs("group",{position:m.position,children:[t.jsxs("mesh",{position:[0,5.1,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.32,.7,10.2,10]}),t.jsx("primitive",{object:N,attach:"material"})]}),t.jsxs("mesh",{position:[0,10.35,0],castShadow:!0,children:[t.jsx("cylinderGeometry",{args:[1.15,.52,.65,10]}),t.jsx("primitive",{object:O,attach:"material"})]}),t.jsxs("mesh",{position:[0,h,0],children:[t.jsx("sphereGeometry",{args:[.72,24,16]}),t.jsx("meshStandardMaterial",{color:"#5a3518",emissive:m.color,emissiveIntensity:.85,roughness:.38})]}),t.jsx("pointLight",{position:[0,h,0],color:m.color,intensity:p,distance:d,decay:f,castShadow:!0,"shadow-mapSize-width":v,"shadow-mapSize-height":v,"shadow-bias":-4e-4}),t.jsx("pointLight",{position:[0,.35,0],color:m.color,intensity:p*.055,distance:18,decay:2})]},`main-lamp-${g}`)),D.map((m,g)=>t.jsx(nt,{position:m,stoneMaterial:N,lampColor:"#ffd9a0"},g)),t.jsx("mesh",{geometry:j,material:U,frustumCulled:!1})]})}function Pt({settings:a={}}){const[o,e]=c.useState({fps:60,gpu:"—",cranes:0,zone:"TEMPLE COURTYARD"}),r=n=>e(s=>({...s,...n}));return t.jsxs("section",{className:"atmosphere river-of-wishes",style:{"--experiment-accent":"#e6c88a"},children:[t.jsxs(xe,{camera:{position:[23,36,43],fov:46,near:.1,far:300},speed:a.speed??1,shadows:!0,bloom:{intensity:.8,threshold:.6},children:[t.jsx("color",{attach:"background",args:[he]}),t.jsx("fogExp2",{attach:"fog",args:[he,.009]}),t.jsx(lt,{settings:a,onStats:r})]}),t.jsxs("div",{className:"experiment-copy river-of-wishes__copy",children:[t.jsx("p",{children:"26 — A river suspended in midair"}),t.jsxs("h1",{children:["The River",t.jsx("br",{}),"of Wishes."]}),t.jsx("span",{children:"Ten thousand patterned paper cranes become a suspended river, flowing through a moonlit stone garden — never colliding, never stopping."})]}),t.jsx("div",{className:"river-of-wishes__legend",children:t.jsxs("div",{children:[t.jsx("i",{children:"↻"}),t.jsxs("div",{children:[t.jsx("b",{children:"Drag"}),t.jsx("span",{children:"Orbit the river"})]})]})}),t.jsx(we,{eyebrow:"Current position",value:o.zone,stats:[{value:o.cranes.toLocaleString(),label:"CRANES IN THE RIVER"},{value:o.gpu,label:"RENDERER"}]})]})}export{Pt as default};
