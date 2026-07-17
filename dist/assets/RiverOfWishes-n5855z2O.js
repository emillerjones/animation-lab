import{r as c,j as t}from"./index-BtkcIGRz.js";import{C as ge,u as de}from"./CanvasStage-X_W5ITfO.js";import{u as we}from"./useDragOrbit-rMe6eJgF.js";import{A as ye}from"./AnimationReadout-FizoAjMN.js";import{WishingTreeModel as Me}from"./WishingTree-D-DbjnWm.js";import{s as y}from"./procedural-DZUg-xN7.js";import{u as oe,a as ce}from"./react-three-fiber.esm-Dfcz46hD.js";import{a2 as be,H as Se,dH as je,C as Pe,A as Ce,V as $,aP as Te,S as Ae,ad as L,aa as re,D as Re,e as pe,ae as Le,Y as De,a9 as Ee,ai as ne,dO as ze,l as Fe,R as ke,F as Ie,N as le,aG as I,a7 as We,a5 as _,aF as ee,by as ve}from"./three.module-Ct-yBmsu.js";import{v as Ge}from"./constants-CIgl5eJ3.js";import"./index-Cu8phv_f.js";import"./usePinchZoom-CvZqH_Yq.js";import"./quality-NEVBGrgs.js";import"./dragOrbit-BWBT6NeL.js";import"./BufferGeometryUtils-CfLCGRKU.js";function Ue({resolution:r=256,near:o=.1,far:e=1e3,envMap:a,fog:n}={}){const s=ce(({gl:v})=>v),i=ce(({scene:v})=>v),l=c.useMemo(()=>{const v=new be(r);return v.texture.type=Se,v},[r]);c.useEffect(()=>()=>{l.dispose()},[l]);const u=c.useMemo(()=>new je(o,e,l),[o,e,l]);let h,d;const m=c.useCallback(()=>{h=i.fog,d=i.background,i.background=a||d,i.fog=n||h,u.update(s,i),i.fog=h,i.background=d},[s,i,u]);return{fbo:l,camera:u,update:m}}function Ne({children:r,frames:o=1/0,resolution:e,near:a,far:n,envMap:s,fog:i,...l}){const u=c.useRef(null),{fbo:h,camera:d,update:m}=Ue({resolution:e,near:a,far:n,envMap:s,fog:i});let v=0;return oe(()=>{u.current&&(o===1/0||v<o)&&(u.current.visible=!1,m(),u.current.visible=!0,v++)}),c.createElement("group",l,c.createElement("primitive",{object:d}),c.createElement("group",{ref:u},r==null?void 0:r(h.texture)))}class Be extends Ae{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
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
	      #include <${Ge>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const _e=r=>new $().setFromSpherical(new Te(r,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),He=c.forwardRef(({radius:r=100,depth:o=50,count:e=5e3,saturation:a=0,factor:n=4,fade:s=!1,speed:i=1},l)=>{const u=c.useRef(null),[h,d,m]=c.useMemo(()=>{const x=[],p=[],S=Array.from({length:e},()=>(.5+.5*Math.random())*n),M=new Pe;let j=r+o;const C=o/e;for(let A=0;A<e;A++)j-=C*Math.random(),x.push(..._e(j).toArray()),M.setHSL(A/e,a,.9),p.push(M.r,M.g,M.b);return[new Float32Array(x),new Float32Array(p),new Float32Array(S)]},[e,o,n,r,a]);oe(x=>u.current&&(u.current.uniforms.time.value=x.clock.elapsedTime*i));const[v]=c.useState(()=>new Be);return c.createElement("points",{ref:l},c.createElement("bufferGeometry",null,c.createElement("bufferAttribute",{attach:"attributes-position",args:[h,3]}),c.createElement("bufferAttribute",{attach:"attributes-color",args:[d,3]}),c.createElement("bufferAttribute",{attach:"attributes-size",args:[m,1]})),c.createElement("primitive",{ref:u,object:v,attach:"material",blending:Ce,"uniforms-fade-value":s,depthWrite:!1,transparent:!0,vertexColors:!0}))}),Oe=1e4,H=512,ue=.87,Ve=[{position:[-18,0,14],color:"#ffd18a"},{position:[18,0,14],color:"#ffc078"},{position:[18,0,-16],color:"#ffe0a0"},{position:[-18,0,-16],color:"#ffb96e"}],he="#090d20",Ye=.58,$e=.85;function me(r,o){const e=Math.abs(r-o)%1;return Math.min(e,1-e)}function Xe(r){const o=me(r,Ye),e=me(r,$e),n=1+Math.sin(r*Math.PI*4-.7)*.18+.72*Math.exp(-(e**2)/(2*.065**2))-.48*Math.exp(-(o**2)/(2*.045**2));return L.clamp(n,.52,1.82)}function Ke(){const r=[],o=[],e=(b,R,T,W)=>{r.push(...R,...T,...W),o.push(b,b,b)},a=[0,.58,.02],n=[0,-.14,.02],s=[-.48,.2,.02],i=[.48,.2,.02],l=[0,.22,.7],u=[0,.22,-.68];e(0,a,s,l),e(0,a,l,i),e(0,a,i,u),e(0,a,u,s),e(0,n,l,s),e(0,n,i,l),e(0,n,u,i),e(0,n,s,u);const h=[-.13,.24,.58],d=[.13,.24,.58],m=[-.1,.82,1.05],v=[.1,.82,1.05],x=[-.09,1.25,1.38],p=[.09,1.25,1.38];e(0,h,d,v),e(0,h,v,m),e(0,m,v,p),e(0,m,p,x);const S=[0,1.38,1.53],M=[0,1.18,1.6],j=[0,1.03,2.02];e(0,x,p,S),e(0,x,M,p),e(0,S,p,j),e(0,S,j,x),e(0,x,j,M),e(0,M,j,p);const C=[-.06,.24,-.57],A=[.06,.24,-.57],U=[-.035,.58,-1],X=[.035,.58,-1],Q=[0,.82,-1.55];e(0,C,A,X),e(0,C,X,U),e(0,U,X,Q);function J(b,R){const T=[.08*b,.48,.5],W=[.08*b,.48,-.48],K=[.82*b,.42,.62],V=[.92*b,.4,-.62],F=[2.12*b,.18,-.04],P=[1*b,.66,.02];b>0?(e(R,T,K,P),e(R,K,F,P),e(R,P,F,V),e(R,P,V,W),e(R,T,P,W)):(e(R,T,P,K),e(R,K,P,F),e(R,P,V,F),e(R,P,W,V),e(R,T,W,P))}J(-1,1),J(1,2);const O=new Ee;O.setAttribute("position",new ne(r,3)),O.setAttribute("aHingeGroup",new ne(o,1));const N=new Float32Array(r.length/3*2);for(let b=0;b<r.length/3;b+=1)N[b*2]=r[b*3]*.32+.5,N[b*2+1]=r[b*3+2]*.32+r[b*3+1]*.12+.5;return O.setAttribute("uv",new ne(N,2)),O.computeVertexNormals(),O}const qe=[[-24,10.2,18],[-19,11.2,23],[-12,10.4,18],[-7,9.4,9],[0,10.3,14],[9,11.4,21],[18,10.7,20],[24,10.1,14],[19,11.1,8],[10,10.3,4],[15,9.5,-2],[24,10.4,-9],[23,11.3,-17],[18,10.6,-23],[10,9.6,-18],[5,10.5,-9],[0,11.6,-14],[-9,12.1,-23],[-18,10.8,-22],[-24,9.7,-16],[-21,10.5,-8],[-12,11.4,-4],[-17,10.7,2],[-25,10.1,9]];function Ze(){const r=qe.map(s=>new $(s[0]*ue,s[1],s[2]*ue)),o=new ze(r,!0,"catmullrom",.5),e=o.getPoints(H),a=new Float32Array(H*4);for(let s=0;s<H;s+=1){const i=e[s];a[s*4]=i.x,a[s*4+1]=i.y,a[s*4+2]=i.z,a[s*4+3]=Xe(s/H)}const n=new Fe(a,H,1,ke,Ie);return n.needsUpdate=!0,n.minFilter=le,n.magFilter=le,n.wrapS=I,n.generateMipmaps=!1,{curve:o,texture:n}}function Je(){const o=document.createElement("canvas");o.width=256,o.height=256;const e=o.getContext("2d");e.fillStyle="#3f2c1a",e.fillRect(0,0,256,256);for(let n=0;n<70;n+=1){const s=n*3.6+y(n,701)*3;e.strokeStyle=`rgba(20, 12, 6, ${.12+y(n,702)*.22})`,e.lineWidth=1+y(n,703)*2,e.beginPath();for(let i=0;i<=256;i+=12){const l=Math.sin(i*.03+n)*4;i===0?e.moveTo(i,s+l):e.lineTo(i,s+l)}e.stroke()}const a=new ee(o);return a.wrapS=I,a.wrapT=I,a.repeat.set(1,4),a}function ae(r,o,e,a,n,s=[.35,1.5]){for(let i=0;i<e;i+=1){const l=y(i,a)*o,u=y(i,a+1)*o,h=s[0]+y(i,a+2)*(s[1]-s[0]);r.fillStyle=n(y(i,a+3));const d=l<h?[0,o]:l>o-h?[0,-o]:[0],m=u<h?[0,o]:u>o-h?[0,-o]:[0];d.forEach(v=>{m.forEach(x=>{r.beginPath(),r.arc(l+v,u+x,h,0,Math.PI*2),r.fill()})})}}function Qe(){const o=document.createElement("canvas");o.width=512,o.height=512;const e=o.getContext("2d"),a=e.createImageData(512,512);for(let s=0;s<512;s+=1)for(let i=0;i<512;i+=1){const l=i/512,u=s/512,d=1+(Math.sin((l*6+u*4)*Math.PI*2)*.5+Math.sin((l*-3+u*7)*Math.PI*2)*.32+Math.sin((l*11-u*5)*Math.PI*2)*.16)*.1,m=(s*512+i)*4;a.data[m]=Math.min(255,118*d),a.data[m+1]=Math.min(255,112*d),a.data[m+2]=Math.min(255,100*d),a.data[m+3]=255}e.putImageData(a,0,0),ae(e,512,2e3,1601,s=>`rgba(20, 18, 14, ${.05+s*.12})`,[.4,1.8]),ae(e,512,900,1701,s=>`rgba(212, 204, 190, ${.05+s*.1})`,[.3,1.2]);const n=new ee(o);return n.wrapS=I,n.wrapT=I,n.repeat.set(3,3),n}function et(){const o=document.createElement("canvas");o.width=512,o.height=512;const e=o.getContext("2d"),a=e.createImageData(512,512);for(let s=0;s<512;s+=1)for(let i=0;i<512;i+=1){const l=i/512,u=s/512,d=1+(Math.sin((l*5+u*3)*Math.PI*2)*.5+Math.sin((l*-4+u*6)*Math.PI*2)*.32+Math.sin((l*9-u*2)*Math.PI*2)*.18)*.09,m=(s*512+i)*4;a.data[m]=Math.min(255,150*d),a.data[m+1]=Math.min(255,130*d),a.data[m+2]=Math.min(255,98*d),a.data[m+3]=255}e.putImageData(a,0,0),ae(e,512,3200,1401,s=>`rgba(255, 244, 214, ${.04+s*.1})`,[.25,.9]),ae(e,512,2200,1501,s=>`rgba(58, 44, 26, ${.04+s*.09})`,[.25,.85]);const n=new ee(o);return n.wrapS=I,n.wrapT=I,n.repeat.set(10,10),n}function tt(){const o=document.createElement("canvas");o.width=128,o.height=128;const e=o.getContext("2d"),a=e.createImageData(128,128);for(let s=0;s<128;s+=1)for(let i=0;i<128;i+=1){const l=(s*128+i)*4,u=Math.sin(s*.72+Math.sin(i*.09)*1.7)*7,h=Math.sin(i*.91+Math.sin(s*.13))*4;a.data[l]=128+u,a.data[l+1]=128+h,a.data[l+2]=246,a.data[l+3]=255}e.putImageData(a,0,0);const n=new ee(o);return n.wrapS=I,n.wrapT=I,n.repeat.set(5,5),n.colorSpace=ve,n}function fe({size:r,waveCount:o,maxFreq:e,seedBase:a,strength:n}){const s=document.createElement("canvas");s.width=r,s.height=r;const i=s.getContext("2d"),l=i.createImageData(r,r),u=[];for(let m=0;m<o;m+=1){let v=Math.round(L.lerp(-e,e,y(m,a))),x=Math.round(L.lerp(-e,e,y(m,a+1)));v===0&&x===0&&(v=1);const S=1/Math.hypot(v,x)**1.15,M=y(m,a+2)*Math.PI*2;u.push({kx:v,ky:x,amp:S,phase:M})}const h=u.reduce((m,v)=>m+v.amp,0);for(let m=0;m<r;m+=1)for(let v=0;v<r;v+=1){const x=v/r,p=m/r;let S=0,M=0;u.forEach(A=>{const U=Math.cos((A.kx*x+A.ky*p)*Math.PI*2+A.phase)*A.amp;S+=U*A.kx,M+=U*A.ky}),S=S/h*n,M=M/h*n;const j=Math.hypot(S,M,1),C=(m*r+v)*4;l.data[C]=128+S/j*90,l.data[C+1]=128+M/j*90,l.data[C+2]=128+1/j*120,l.data[C+3]=255}i.putImageData(l,0,0);const d=new ee(s);return d.wrapS=I,d.wrapT=I,d.colorSpace=ve,d}function rt(){const r=fe({size:512,waveCount:11,maxFreq:8,seedBase:2201,strength:9});return r.repeat.set(4,4),r}function at(){return fe({size:256,waveCount:16,maxFreq:27,seedBase:2301,strength:14})}function ot(r,{detailTexture:o}){r.uniforms.uDetailNormalMap={value:o},r.uniforms.uDetailOffset={value:new pe(0,0)},r.uniforms.uWaterTime={value:0},r.uniforms.uDetailScale={value:3.35},r.uniforms.uDetailStrength={value:.24},r.fragmentShader=r.fragmentShader.replace("#include <common>",`
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
      `)}function st(r,{pathTexture:o,flowSpeedMul:e,riverWidthMul:a,wingFlutter:n}){r.uniforms.uPathTexture={value:o},r.uniforms.uTime={value:0},r.uniforms.uFlowSpeed={value:e},r.uniforms.uRiverWidth={value:a},r.uniforms.uWingFlutter={value:n},r.vertexShader=r.vertexShader.replace("#include <common>",`
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
      `),r.fragmentShader=r.fragmentShader.replace("#include <common>",`
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
      `)}function nt(r,o){const e=new We;e.index=r.index,e.attributes.position=r.attributes.position,e.attributes.normal=r.attributes.normal,e.attributes.aHingeGroup=r.attributes.aHingeGroup;const a=new Float32Array(o),n=new Float32Array(o),s=new Float32Array(o),i=new Float32Array(o),l=new Float32Array(o),u=new Float32Array(o),h=new Float32Array(o),d=new Float32Array(o),m=new Float32Array(o),v=64,x=Math.ceil(o/v);for(let p=0;p<o;p+=1){const S=p%v,M=Math.floor(p/v);a[p]=(M+y(p,901)*.22+S/v)/x;const j=.28+Math.sqrt((S+.5)/v)*2.8,C=S*2.399963229728653;n[p]=Math.cos(C)*j,s[p]=Math.sin(C)*j*.52,i[p]=y(p,904)*Math.PI*2,l[p]=2.2+y(p,905)*1.6,u[p]=y(p,906),h[p]=y(p,907)*Math.PI*2,d[p]=1+y(p,908)*.1,m[p]=.94+y(p,909)*.12}return e.setAttribute("aPathPhase",new _(a,1)),e.setAttribute("aLaneX",new _(n,1)),e.setAttribute("aLaneY",new _(s,1)),e.setAttribute("aFlapPhase",new _(i,1)),e.setAttribute("aFlapSpeed",new _(l,1)),e.setAttribute("aColorSeed",new _(u,1)),e.setAttribute("aWeavePhase",new _(h,1)),e.setAttribute("aScale",new _(d,1)),e.setAttribute("aSpeed",new _(m,1)),e.instanceCount=o,e}function it({position:r,stoneMaterial:o,lampColor:e}){const a=c.useRef(null),n=c.useRef(null);return c.useEffect(()=>{a.current&&n.current&&(a.current.target=n.current)},[]),t.jsxs("group",{position:r,children:[t.jsxs("mesh",{position:[0,.5,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.14,.2,1,8]}),t.jsx("primitive",{object:o,attach:"material"})]}),t.jsxs("mesh",{position:[0,1.1,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("boxGeometry",{args:[.42,.4,.42]}),t.jsx("primitive",{object:o,attach:"material"})]}),t.jsxs("mesh",{position:[0,1.1,0],children:[t.jsx("boxGeometry",{args:[.24,.22,.24]}),t.jsx("meshStandardMaterial",{color:"#3a2410",emissive:e,emissiveIntensity:.6,roughness:.5})]}),t.jsxs("mesh",{position:[0,1.42,0],castShadow:!0,children:[t.jsx("coneGeometry",{args:[.34,.32,8]}),t.jsx("primitive",{object:o,attach:"material"})]}),t.jsx("pointLight",{position:[0,1.1,0],color:e,intensity:1.6,distance:4.5,decay:2}),t.jsx("spotLight",{ref:a,position:[0,1.15,0],color:e,intensity:9,distance:7,angle:Math.PI/4.2,penumbra:.65,decay:2}),t.jsx("object3D",{ref:n,position:[0,-.6,0]})]})}function ie({position:r,scale:o=1,seed:e=0}){const a=c.useMemo(()=>Array.from({length:9},(n,s)=>({x:(y(s,3100+e)-.5)*2.8,z:(y(s,3200+e)-.5)*2.2,height:5.5+y(s,3300+e)*4.5,lean:(y(s,3400+e)-.5)*.08})),[e]);return t.jsx("group",{position:r,scale:o,children:a.map((n,s)=>t.jsxs("group",{position:[n.x,0,n.z],rotation:[n.lean,0,-n.lean*.7],children:[t.jsxs("mesh",{position:[0,n.height*.5,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.075,.105,n.height,8]}),t.jsx("meshStandardMaterial",{color:s%3===0?"#405d38":"#567247",roughness:.8})]}),Array.from({length:5},(i,l)=>{const u=n.height*(.22+l*.155);return t.jsxs("group",{position:[0,u,0],rotation:[0,l*2.1+s,0],children:[t.jsxs("mesh",{castShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.118,.118,.055,8]}),t.jsx("meshStandardMaterial",{color:"#293e29",roughness:.88})]}),l>1&&t.jsxs("mesh",{position:[.58,.12,0],rotation:[0,0,-.22],castShadow:!0,children:[t.jsx("sphereGeometry",{args:[.72,7,4]}),t.jsx("meshStandardMaterial",{color:"#314d35",roughness:.94})]})]},l)})]},s))})}function ct({stoneMaterial:r,woodMaterial:o}){const e=c.useMemo(()=>[[-17,.7,6.5,1.5],[-14.8,.55,5.5,1.05],[15.5,.75,7.2,1.6],[18,.5,5.9,1],[-17.5,.65,-8.5,1.35],[16.8,.6,-9.3,1.25]],[]);return t.jsxs("group",{children:[t.jsx(ie,{position:[-22,0,-6],scale:1.05,seed:1}),t.jsx(ie,{position:[21,0,5.5],scale:.92,seed:2}),t.jsx(ie,{position:[18.5,0,-13],scale:.72,seed:3}),e.map(([a,n,s,i],l)=>t.jsxs("mesh",{position:[a,n,s],scale:[i*1.35,i*.72,i],castShadow:!0,receiveShadow:!0,children:[t.jsx("dodecahedronGeometry",{args:[1,1]}),t.jsx("meshStandardMaterial",{color:l%2?"#263c2b":"#304932",roughness:.98})]},l)),t.jsxs("group",{position:[-1,0,16.5],rotation:[0,.08,0],children:[t.jsxs("mesh",{position:[-3.1,3.4,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("boxGeometry",{args:[.72,6.8,.72]}),t.jsx("primitive",{object:o,attach:"material"})]}),t.jsxs("mesh",{position:[3.1,3.4,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("boxGeometry",{args:[.72,6.8,.72]}),t.jsx("primitive",{object:o,attach:"material"})]}),t.jsxs("mesh",{position:[0,6.65,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("boxGeometry",{args:[7.6,.58,.72]}),t.jsx("primitive",{object:o,attach:"material"})]}),t.jsxs("mesh",{position:[0,5.75,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("boxGeometry",{args:[6.4,.42,.6]}),t.jsx("primitive",{object:o,attach:"material"})]})]}),[-6.5,-3.2,3.4,6.7].map((a,n)=>t.jsxs("mesh",{position:[a,.38,-14.4+Math.sin(n)*.65],scale:[1.45,.55,.9],castShadow:!0,receiveShadow:!0,children:[t.jsx("dodecahedronGeometry",{args:[.8,0]}),t.jsx("primitive",{object:r,attach:"material"})]},a))]})}function lt({stoneMaterial:r}){const o=de(),e=c.useMemo(()=>window.matchMedia("(hover: hover) and (pointer: fine)").matches,[]),a=c.useMemo(()=>rt(),[]),n=c.useMemo(()=>at(),[]);c.useEffect(()=>()=>{a.dispose(),n.dispose()},[a,n]);const s=c.useRef(null);oe((u,h)=>{const d=u.clock.elapsedTime*o,m=.012+Math.sin(d*.021)*.004+Math.sin(d*.053+1.7)*.003,v=-.008+Math.cos(d*.017+.6)*.003+Math.sin(d*.037+3.1)*.0025;a.offset.x=(a.offset.x+h*m+1)%1,a.offset.y=(a.offset.y+h*v+1)%1,a.rotation=Math.sin(d*.035)*.06+Math.sin(d*.081+2.4)*.03+Math.sin(d*.019+5.2)*.025;const x=s.current;if(x){x.uniforms.uWaterTime.value=d;const p=x.uniforms.uDetailOffset.value;p.x=(p.x+h*-.045*o+1)%1,p.y=(p.y+h*.031*o+1)%1}});const i=c.useMemo(()=>Array.from({length:17},(u,h)=>{const d=h/16;return{x:L.lerp(-10.5,10.5,d),z:-1.4+Math.sin(d*Math.PI*2.2)*2.1,rotation:y(h,1201)*Math.PI,scale:.72+y(h,1202)*.38}}),[]),l=c.useMemo(()=>[[-12.8,.65,7.8,1.2],[-10.9,.42,9.1,.75],[12.4,.72,-8.8,1.35],[14.1,.38,-7.2,.68],[-3.8,.5,-12.6,.9],[5.2,.44,11.8,.82]],[]);return t.jsxs("group",{children:[t.jsx(Ne,{resolution:e?192:96,frames:1,near:.5,far:180,children:u=>t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.015,-1.5],scale:[1.45,.78,1],receiveShadow:!0,children:[t.jsx("circleGeometry",{args:[9.6,96]}),t.jsx("meshPhysicalMaterial",{color:"#07131f",envMap:u,envMapIntensity:.78,normalMap:a,normalScale:[.2,.2],roughness:.24,metalness:.08,clearcoat:1,clearcoatRoughness:.2,reflectivity:.82,onBeforeCompile:h=>{ot(h,{detailTexture:n}),s.current=h}})]})}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.025,-1.5],scale:[1.45,.78,1],receiveShadow:!0,children:[t.jsx("ringGeometry",{args:[9.55,10.2,80]}),t.jsx("primitive",{object:r,attach:"material"})]}),i.map((u,h)=>t.jsxs("mesh",{position:[u.x,.16,u.z],rotation:[0,u.rotation,0],scale:[u.scale*1.25,1,u.scale],castShadow:!0,receiveShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.65,.78,.28,9]}),t.jsx("primitive",{object:r,attach:"material"})]},`step-${h}`)),l.map(([u,h,d,m],v)=>t.jsxs("mesh",{position:[u,h,d],scale:[m,m*.72,m],castShadow:!0,receiveShadow:!0,children:[t.jsx("dodecahedronGeometry",{args:[1,0]}),t.jsx("primitive",{object:r,attach:"material"})]},`rock-${v}`))]})}function ut({settings:r,onStats:o}){const{camera:e,gl:a}=ce(),n=de(),s=Math.round(L.clamp(r.craneCount??6e3,2e3,Oe)),i=(r.flowSpeed??1)*.016,l=(r.riverWidth??100)/100,u=2.5,h=r.lampHeight??11.5,d=r.lampIntensity??220,m=r.lampRange??220,v=r.lampFalloff??2,x=r.droneMode??!1,p=c.useMemo(()=>window.matchMedia("(hover: hover) and (pointer: fine)").matches?1024:512,[]),S=c.useMemo(()=>Ke(),[]),{texture:M}=c.useMemo(()=>Ze(),[]),j=c.useMemo(()=>nt(S,s),[S,s]),C=c.useMemo(()=>tt(),[]),A=c.useRef(null),U=c.useMemo(()=>{const f=new re({color:"#ffffff",roughness:.78,metalness:.02,normalMap:C,normalScale:new pe(.32,.32),side:Re});return f.onBeforeCompile=g=>{st(g,{pathTexture:M,flowSpeedMul:i,riverWidthMul:l,wingFlutter:u}),A.current=g},f},[M,C,i,l,u]);c.useEffect(()=>()=>{j.dispose()},[j]),c.useEffect(()=>()=>{U.dispose()},[U]),c.useEffect(()=>()=>{C.dispose()},[C]),c.useEffect(()=>{const f=a.toneMapping,g=a.toneMappingExposure,G=a.outputColorSpace;return a.toneMapping=Le,a.toneMappingExposure=.82,a.outputColorSpace=De,()=>{a.toneMapping=f,a.toneMappingExposure=g,a.outputColorSpace=G}},[a]);const X=c.useMemo(()=>Je(),[]),Q=c.useMemo(()=>Qe(),[]),J=c.useMemo(()=>et(),[]),O=c.useMemo(()=>new re({map:X,bumpMap:X,bumpScale:.14,color:"#c09a68",roughness:.82,metalness:.02}),[X]),N=c.useMemo(()=>new re({map:Q,bumpMap:Q,bumpScale:.16,color:"#858078",roughness:.91,metalness:.015}),[Q]),b=c.useMemo(()=>new re({map:J,bumpMap:J,bumpScale:.06,color:"#e2d3ad",roughness:.95,metalness:.01}),[J]),R=c.useMemo(()=>[0,Math.PI/2,Math.PI,3*Math.PI/2].map(D=>new $(0+Math.cos(D)*16.4,0,-1.5+Math.sin(D)*9.4)),[]),T=we({pitchMin:-.85,pitchMax:.85}),W=c.useRef(.08),K=c.useRef(.42),V=c.useRef(62),F=c.useRef(62),P=c.useRef({frames:0,time:0}),se=c.useRef(new Set),te=c.useRef({yaw:0,pitch:0});return c.useEffect(()=>{e.position.set(23,36,43),e.lookAt(1,8.5,-3)},[e]),c.useEffect(()=>{if(x){const f=e.getWorldDirection(new $);te.current.yaw=Math.atan2(f.x,f.z),te.current.pitch=Math.asin(L.clamp(f.y,-1,1))}T.current.targetYaw=0,T.current.targetPitch=0,se.current.clear()},[e,x,T]),c.useEffect(()=>{const f=se.current,g=D=>{if(!x||D.repeat)return;const B=D.key.toLowerCase();["w","a","s","d","q","e","shift"].includes(B)&&(f.add(B),D.preventDefault())},G=D=>f.delete(D.key.toLowerCase()),z=()=>f.clear();return window.addEventListener("keydown",g),window.addEventListener("keyup",G),window.addEventListener("blur",z),()=>{window.removeEventListener("keydown",g),window.removeEventListener("keyup",G),window.removeEventListener("blur",z)}},[x]),c.useEffect(()=>{const f=a.domElement;let g=0,G=F.current;const z=w=>{x||window.matchMedia("(hover: hover) and (pointer: fine)").matches&&(w.preventDefault(),F.current=L.clamp(F.current*Math.exp(w.deltaY*.0012),18,115))},D=w=>Math.hypot(w[0].clientX-w[1].clientX,w[0].clientY-w[1].clientY),B=w=>{w.touches.length===2&&(w.preventDefault(),T.current.dragging=!1,g=Math.max(1,D(w.touches)),G=F.current)},q=w=>{if(w.touches.length!==2||g<=0)return;w.preventDefault(),T.current.dragging=!1;const Y=Math.max(1,D(w.touches));F.current=L.clamp(G*(g/Y),18,115)},k=w=>{w.touches.length<2&&(g=0)};return f.addEventListener("wheel",z,{passive:!1}),f.addEventListener("touchstart",B,{passive:!1}),f.addEventListener("touchmove",q,{passive:!1}),f.addEventListener("touchend",k),f.addEventListener("touchcancel",k),()=>{f.removeEventListener("wheel",z),f.removeEventListener("touchstart",B),f.removeEventListener("touchmove",q),f.removeEventListener("touchend",k),f.removeEventListener("touchcancel",k)}},[x,a]),oe((f,g)=>{const G=f.clock.elapsedTime*n,z=A.current;if(z&&(z.uniforms.uTime.value=G,z.uniforms.uFlowSpeed.value=i,z.uniforms.uRiverWidth.value=l,z.uniforms.uWingFlutter.value=u),W.current=(W.current+Math.min(g,.05)*n*.01)%1,x){const B=Math.min(g,.05),q=te.current.yaw+T.current.targetYaw,k=L.clamp(te.current.pitch-T.current.targetPitch,-1.48,1.48),w=new $(Math.sin(q)*Math.cos(k),Math.sin(k),Math.cos(q)*Math.cos(k)).normalize(),Y=new $().crossVectors(e.up,w).normalize(),E=new $,Z=se.current;if(Z.has("w")&&E.add(w),Z.has("s")&&E.sub(w),Z.has("a")&&E.add(Y),Z.has("d")&&E.sub(Y),Z.has("e")&&(E.y+=1),Z.has("q")&&(E.y-=1),E.lengthSq()>0){const xe=Z.has("shift")?38:15;e.position.addScaledVector(E.normalize(),xe*B),e.position.x=L.clamp(e.position.x,-120,120),e.position.y=L.clamp(e.position.y,.8,90),e.position.z=L.clamp(e.position.z,-120,120)}e.lookAt(e.position.clone().add(w))}else{const B=T.current.targetYaw,q=T.current.targetPitch;K.current+=Math.min(g,.05)*n*.018;const k=K.current+B,w=.48+q*.55;V.current=L.damp(V.current,F.current,9,Math.min(g,.05));const Y=V.current,E=new $(1,8.5,-3);e.position.set(E.x+Math.sin(k)*Math.cos(w)*Y,E.y+Math.sin(w)*Y,E.z+Math.cos(k)*Math.cos(w)*Y),e.lookAt(E)}const D=1-L.smoothstep(W.current,0,.62);P.current.frames+=1,P.current.time+=g,P.current.time>=.5&&(o({fps:Math.round(P.current.frames/P.current.time),zone:D>.5?"TEMPLE COURTYARD":"MOONLIT GARDEN"}),P.current.frames=0,P.current.time=0)}),c.useEffect(()=>{var g;const f=((g=a==null?void 0:a.constructor)==null?void 0:g.name)??"WebGL2";o({gpu:f.includes("WebGPU")?"WebGPU":"WebGL2",cranes:s})},[s]),t.jsxs("group",{children:[t.jsx("ambientLight",{intensity:.008,color:"#b9c8e8"}),t.jsx("hemisphereLight",{color:"#53658f",groundColor:"#08070a",intensity:.008}),t.jsx("directionalLight",{position:[8,10,6],intensity:.05,color:"#7186b8"}),t.jsx("directionalLight",{position:[-58,70,-72],intensity:.22,color:"#9eb7ea",castShadow:!0,"shadow-mapSize-width":p,"shadow-mapSize-height":p,"shadow-camera-left":-44,"shadow-camera-right":44,"shadow-camera-top":44,"shadow-camera-bottom":-44,"shadow-camera-near":20,"shadow-camera-far":170,"shadow-bias":-25e-5,"shadow-normalBias":.025}),t.jsxs("mesh",{position:[-58,70,-72],children:[t.jsx("sphereGeometry",{args:[6.5,40,24]}),t.jsx("meshBasicMaterial",{color:"#d9e3f5",fog:!1,toneMapped:!1})]}),t.jsx(He,{radius:105,depth:38,count:900,factor:1.1,saturation:.15,fade:!1,speed:0}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.05,0],receiveShadow:!0,children:[t.jsx("circleGeometry",{args:[40,96]}),t.jsx("primitive",{object:b,attach:"material"})]}),t.jsx(lt,{stoneMaterial:N}),t.jsx(ct,{stoneMaterial:N,woodMaterial:O}),t.jsx(Me,{position:[-10.5,0,9],rotation:[0,.38,0],scale:.68,petalCount:4e4,fallingPetals:600,windIntensity:.7}),Array.from({length:6},(f,g)=>t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[-10.5,.018+g*4e-4,9],receiveShadow:!0,children:[t.jsx("ringGeometry",{args:[2.1+g*.72,2.15+g*.72,80]}),t.jsx("meshStandardMaterial",{color:"#4b5260",roughness:.96})]},`raked-ring-${g}`)),t.jsxs("group",{position:[11.8,0,8.8],children:[t.jsxs("mesh",{position:[0,.42,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("cylinderGeometry",{args:[1.05,1.2,.84,12]}),t.jsx("primitive",{object:N,attach:"material"})]}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.85,0],children:[t.jsx("circleGeometry",{args:[.82,32]}),t.jsx("meshPhysicalMaterial",{color:"#081520",roughness:.24,metalness:.12,clearcoat:1})]})]}),Ve.map((f,g)=>t.jsxs("group",{position:f.position,children:[t.jsxs("mesh",{position:[0,5.1,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.32,.7,10.2,10]}),t.jsx("primitive",{object:N,attach:"material"})]}),t.jsxs("mesh",{position:[0,10.35,0],castShadow:!0,children:[t.jsx("cylinderGeometry",{args:[1.15,.52,.65,10]}),t.jsx("primitive",{object:O,attach:"material"})]}),t.jsxs("mesh",{position:[0,h,0],children:[t.jsx("sphereGeometry",{args:[.72,24,16]}),t.jsx("meshStandardMaterial",{color:"#5a3518",emissive:f.color,emissiveIntensity:.85,roughness:.38})]}),t.jsx("pointLight",{position:[0,h,0],color:f.color,intensity:d,distance:m,decay:v,castShadow:!0,"shadow-mapSize-width":p,"shadow-mapSize-height":p,"shadow-bias":-4e-4}),t.jsx("pointLight",{position:[0,.35,0],color:f.color,intensity:d*.055,distance:18,decay:2})]},`main-lamp-${g}`)),R.map((f,g)=>t.jsx(it,{position:f,stoneMaterial:N,lampColor:"#ffd9a0"},g)),t.jsx("mesh",{geometry:j,material:U,frustumCulled:!1})]})}function Pt({settings:r={}}){const[o,e]=c.useState({fps:60,gpu:"—",cranes:0,zone:"TEMPLE COURTYARD"}),a=n=>e(s=>({...s,...n}));return t.jsxs("section",{className:"atmosphere river-of-wishes",style:{"--experiment-accent":"#e6c88a"},children:[t.jsxs(ge,{camera:{position:[23,36,43],fov:46,near:.1,far:300},speed:r.speed??1,shadows:!0,bloom:{intensity:.8,threshold:.6},children:[t.jsx("color",{attach:"background",args:[he]}),t.jsx("fogExp2",{attach:"fog",args:[he,.009]}),t.jsx(ut,{settings:r,onStats:a})]}),t.jsxs("div",{className:"experiment-copy river-of-wishes__copy",children:[t.jsx("p",{children:"26 — A river suspended in midair"}),t.jsxs("h1",{children:["The River",t.jsx("br",{}),"of Wishes."]}),t.jsx("span",{children:"Ten thousand patterned paper cranes become a suspended river, flowing through a moonlit stone garden — never colliding, never stopping."})]}),t.jsx("div",{className:"river-of-wishes__legend",children:t.jsxs("div",{children:[t.jsx("i",{children:"↻"}),t.jsxs("div",{children:[t.jsx("b",{children:"Drag"}),t.jsx("span",{children:"Orbit the river"})]})]})}),t.jsx(ye,{eyebrow:"Current position",value:o.zone,stats:[{value:o.cranes.toLocaleString(),label:"CRANES IN THE RIVER"},{value:o.gpu,label:"RENDERER"}]})]})}export{Pt as default};
