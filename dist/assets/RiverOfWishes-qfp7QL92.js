import{r as c,j as t}from"./index-4f_b-Age.js";import{C as ge,u as pe}from"./CanvasStage-_tZyZjiu.js";import{u as we}from"./useDragOrbit-CS_Pms9Z.js";import{A as ye}from"./AnimationReadout-DquhHmCA.js";import{WishingTreeModel as Me}from"./WishingTree-CzyO4Ck-.js";import{s as M}from"./procedural-DZUg-xN7.js";import{u as se,a as le}from"./react-three-fiber.esm-TXu1Zvtz.js";import{a2 as be,H as Se,dH as je,C as Pe,A as Ce,V as $,aP as Ae,S as Te,ad as F,aa as ae,D as Ee,e as ve,ae as Le,Y as Re,a9 as De,ai as ie,dO as ze,l as Fe,R as ke,F as Ie,N as ue,aG as I,a7 as We,a5 as U,aF as te,by as fe}from"./three.module-Ct-yBmsu.js";import{v as Ge}from"./constants-CIgl5eJ3.js";import"./index-IdEc51Eh.js";import"./usePinchZoom-CFgE0alA.js";import"./quality-NEVBGrgs.js";import"./dragOrbit-BWBT6NeL.js";import"./useLiveFps-BYxeiSOl.js";import"./BufferGeometryUtils-CfLCGRKU.js";function Ue({resolution:a=256,near:o=.1,far:e=1e3,envMap:r,fog:n}={}){const s=le(({gl:f})=>f),i=le(({scene:f})=>f),l=c.useMemo(()=>{const f=new be(a);return f.texture.type=Se,f},[a]);c.useEffect(()=>()=>{l.dispose()},[l]);const u=c.useMemo(()=>new je(o,e,l),[o,e,l]);let h,p;const d=c.useCallback(()=>{h=i.fog,p=i.background,i.background=r||p,i.fog=n||h,u.update(s,i),i.fog=h,i.background=p},[s,i,u]);return{fbo:l,camera:u,update:d}}function Ne({children:a,frames:o=1/0,resolution:e,near:r,far:n,envMap:s,fog:i,...l}){const u=c.useRef(null),{fbo:h,camera:p,update:d}=Ue({resolution:e,near:r,far:n,envMap:s,fog:i});let f=0;return se(()=>{u.current&&(o===1/0||f<o)&&(u.current.visible=!1,d(),u.current.visible=!0,f++)}),c.createElement("group",l,c.createElement("primitive",{object:p}),c.createElement("group",{ref:u},a==null?void 0:a(h.texture)))}class Be extends Te{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
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
      }`})}}const _e=a=>new $().setFromSpherical(new Ae(a,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),He=c.forwardRef(({radius:a=100,depth:o=50,count:e=5e3,saturation:r=0,factor:n=4,fade:s=!1,speed:i=1},l)=>{const u=c.useRef(null),[h,p,d]=c.useMemo(()=>{const x=[],v=[],b=Array.from({length:e},()=>(.5+.5*Math.random())*n),S=new Pe;let P=a+o;const T=o/e;for(let C=0;C<e;C++)P-=T*Math.random(),x.push(..._e(P).toArray()),S.setHSL(C/e,r,.9),v.push(S.r,S.g,S.b);return[new Float32Array(x),new Float32Array(v),new Float32Array(b)]},[e,o,n,a,r]);se(x=>u.current&&(u.current.uniforms.time.value=x.clock.elapsedTime*i));const[f]=c.useState(()=>new Be);return c.createElement("points",{ref:l},c.createElement("bufferGeometry",null,c.createElement("bufferAttribute",{attach:"attributes-position",args:[h,3]}),c.createElement("bufferAttribute",{attach:"attributes-color",args:[p,3]}),c.createElement("bufferAttribute",{attach:"attributes-size",args:[d,1]})),c.createElement("primitive",{ref:u,object:f,attach:"material",blending:Ce,"uniforms-fade-value":s,depthWrite:!1,transparent:!0,vertexColors:!0}))}),Oe=1e4,N=512,he=.87,Ve=[{position:[-18,0,14],color:"#ffd18a"},{position:[18,0,14],color:"#ffc078"},{position:[18,0,-16],color:"#ffe0a0"},{position:[-18,0,-16],color:"#ffb96e"}],de="#090d20",Ye=.58,$e=.85;function me(a,o){const e=Math.abs(a-o)%1;return Math.min(e,1-e)}function Xe(a){const o=me(a,Ye),e=me(a,$e),n=1+Math.sin(a*Math.PI*4-.7)*.18+.72*Math.exp(-(e**2)/(2*.065**2))-.48*Math.exp(-(o**2)/(2*.045**2));return F.clamp(n,.52,1.82)}function Ke(){const a=[],o=[],e=(y,D,_,E)=>{a.push(...D,..._,...E),o.push(y,y,y)},r=[0,.58,.02],n=[0,-.14,.02],s=[-.48,.2,.02],i=[.48,.2,.02],l=[0,.22,.7],u=[0,.22,-.68];e(0,r,s,l),e(0,r,l,i),e(0,r,i,u),e(0,r,u,s),e(0,n,l,s),e(0,n,i,l),e(0,n,u,i),e(0,n,s,u);const h=[-.13,.24,.58],p=[.13,.24,.58],d=[-.1,.82,1.05],f=[.1,.82,1.05],x=[-.09,1.25,1.38],v=[.09,1.25,1.38];e(0,h,p,f),e(0,h,f,d),e(0,d,f,v),e(0,d,v,x);const b=[0,1.38,1.53],S=[0,1.18,1.6],P=[0,1.03,2.02];e(0,x,v,b),e(0,x,S,v),e(0,b,v,P),e(0,b,P,x),e(0,x,P,S),e(0,S,P,v);const T=[-.06,.24,-.57],C=[.06,.24,-.57],B=[-.035,.58,-1],X=[.035,.58,-1],ee=[0,.82,-1.55];e(0,T,C,X),e(0,T,X,B),e(0,B,X,ee);function J(y,D){const _=[.08*y,.48,.5],E=[.08*y,.48,-.48],H=[.82*y,.42,.62],K=[.92*y,.4,-.62],O=[2.12*y,.18,-.04],A=[1*y,.66,.02];y>0?(e(D,_,H,A),e(D,H,O,A),e(D,A,O,K),e(D,A,K,E),e(D,_,A,E)):(e(D,_,A,H),e(D,H,A,O),e(D,A,K,O),e(D,A,E,K),e(D,_,E,A))}J(-1,1),J(1,2);const W=new De;W.setAttribute("position",new ie(a,3)),W.setAttribute("aHingeGroup",new ie(o,1));const Q=new Float32Array(a.length/3*2);for(let y=0;y<a.length/3;y+=1)Q[y*2]=a[y*3]*.32+.5,Q[y*2+1]=a[y*3+2]*.32+a[y*3+1]*.12+.5;return W.setAttribute("uv",new ie(Q,2)),W.computeVertexNormals(),W}const qe=[[-24,10.2,18],[-19,11.2,23],[-12,10.4,18],[-7,9.4,9],[0,10.3,14],[9,11.4,21],[18,10.7,20],[24,10.1,14],[19,11.1,8],[10,10.3,4],[15,9.5,-2],[24,10.4,-9],[23,11.3,-17],[18,10.6,-23],[10,9.6,-18],[5,10.5,-9],[0,11.6,-14],[-9,12.1,-23],[-18,10.8,-22],[-24,9.7,-16],[-21,10.5,-8],[-12,11.4,-4],[-17,10.7,2],[-25,10.1,9]];function Ze(){const a=qe.map(s=>new $(s[0]*he,s[1],s[2]*he)),o=new ze(a,!0,"catmullrom",.5),e=o.getPoints(N),r=new Float32Array(N*4);for(let s=0;s<N;s+=1){const i=e[s];r[s*4]=i.x,r[s*4+1]=i.y,r[s*4+2]=i.z,r[s*4+3]=Xe(s/N)}const n=new Fe(r,N,1,ke,Ie);return n.needsUpdate=!0,n.minFilter=ue,n.magFilter=ue,n.wrapS=I,n.generateMipmaps=!1,{curve:o,texture:n}}function Je(){const o=document.createElement("canvas");o.width=256,o.height=256;const e=o.getContext("2d");e.fillStyle="#3f2c1a",e.fillRect(0,0,256,256);for(let n=0;n<70;n+=1){const s=n*3.6+M(n,701)*3;e.strokeStyle=`rgba(20, 12, 6, ${.12+M(n,702)*.22})`,e.lineWidth=1+M(n,703)*2,e.beginPath();for(let i=0;i<=256;i+=12){const l=Math.sin(i*.03+n)*4;i===0?e.moveTo(i,s+l):e.lineTo(i,s+l)}e.stroke()}const r=new te(o);return r.wrapS=I,r.wrapT=I,r.repeat.set(1,4),r}function oe(a,o,e,r,n,s=[.35,1.5]){for(let i=0;i<e;i+=1){const l=M(i,r)*o,u=M(i,r+1)*o,h=s[0]+M(i,r+2)*(s[1]-s[0]);a.fillStyle=n(M(i,r+3));const p=l<h?[0,o]:l>o-h?[0,-o]:[0],d=u<h?[0,o]:u>o-h?[0,-o]:[0];p.forEach(f=>{d.forEach(x=>{a.beginPath(),a.arc(l+f,u+x,h,0,Math.PI*2),a.fill()})})}}function Qe(){const o=document.createElement("canvas");o.width=512,o.height=512;const e=o.getContext("2d"),r=e.createImageData(512,512);for(let s=0;s<512;s+=1)for(let i=0;i<512;i+=1){const l=i/512,u=s/512,p=1+(Math.sin((l*6+u*4)*Math.PI*2)*.5+Math.sin((l*-3+u*7)*Math.PI*2)*.32+Math.sin((l*11-u*5)*Math.PI*2)*.16)*.1,d=(s*512+i)*4;r.data[d]=Math.min(255,118*p),r.data[d+1]=Math.min(255,112*p),r.data[d+2]=Math.min(255,100*p),r.data[d+3]=255}e.putImageData(r,0,0),oe(e,512,2e3,1601,s=>`rgba(20, 18, 14, ${.05+s*.12})`,[.4,1.8]),oe(e,512,900,1701,s=>`rgba(212, 204, 190, ${.05+s*.1})`,[.3,1.2]);const n=new te(o);return n.wrapS=I,n.wrapT=I,n.repeat.set(3,3),n}function et(){const o=document.createElement("canvas");o.width=512,o.height=512;const e=o.getContext("2d"),r=e.createImageData(512,512);for(let s=0;s<512;s+=1)for(let i=0;i<512;i+=1){const l=i/512,u=s/512,p=1+(Math.sin((l*5+u*3)*Math.PI*2)*.5+Math.sin((l*-4+u*6)*Math.PI*2)*.32+Math.sin((l*9-u*2)*Math.PI*2)*.18)*.09,d=(s*512+i)*4;r.data[d]=Math.min(255,150*p),r.data[d+1]=Math.min(255,130*p),r.data[d+2]=Math.min(255,98*p),r.data[d+3]=255}e.putImageData(r,0,0),oe(e,512,3200,1401,s=>`rgba(255, 244, 214, ${.04+s*.1})`,[.25,.9]),oe(e,512,2200,1501,s=>`rgba(58, 44, 26, ${.04+s*.09})`,[.25,.85]);const n=new te(o);return n.wrapS=I,n.wrapT=I,n.repeat.set(10,10),n}function tt(){const o=document.createElement("canvas");o.width=128,o.height=128;const e=o.getContext("2d"),r=e.createImageData(128,128);for(let s=0;s<128;s+=1)for(let i=0;i<128;i+=1){const l=(s*128+i)*4,u=Math.sin(s*.72+Math.sin(i*.09)*1.7)*7,h=Math.sin(i*.91+Math.sin(s*.13))*4;r.data[l]=128+u,r.data[l+1]=128+h,r.data[l+2]=246,r.data[l+3]=255}e.putImageData(r,0,0);const n=new te(o);return n.wrapS=I,n.wrapT=I,n.repeat.set(5,5),n.colorSpace=fe,n}function xe({size:a,waveCount:o,maxFreq:e,seedBase:r,strength:n}){const s=document.createElement("canvas");s.width=a,s.height=a;const i=s.getContext("2d"),l=i.createImageData(a,a),u=[];for(let d=0;d<o;d+=1){let f=Math.round(F.lerp(-e,e,M(d,r))),x=Math.round(F.lerp(-e,e,M(d,r+1)));f===0&&x===0&&(f=1);const b=1/Math.hypot(f,x)**1.15,S=M(d,r+2)*Math.PI*2;u.push({kx:f,ky:x,amp:b,phase:S})}const h=u.reduce((d,f)=>d+f.amp,0);for(let d=0;d<a;d+=1)for(let f=0;f<a;f+=1){const x=f/a,v=d/a;let b=0,S=0;u.forEach(C=>{const B=Math.cos((C.kx*x+C.ky*v)*Math.PI*2+C.phase)*C.amp;b+=B*C.kx,S+=B*C.ky}),b=b/h*n,S=S/h*n;const P=Math.hypot(b,S,1),T=(d*a+f)*4;l.data[T]=128+b/P*90,l.data[T+1]=128+S/P*90,l.data[T+2]=128+1/P*120,l.data[T+3]=255}i.putImageData(l,0,0);const p=new te(s);return p.wrapS=I,p.wrapT=I,p.colorSpace=fe,p}function rt(){const a=xe({size:512,waveCount:11,maxFreq:8,seedBase:2201,strength:9});return a.repeat.set(4,4),a}function at(){return xe({size:256,waveCount:16,maxFreq:27,seedBase:2301,strength:14})}function ot(a,{detailTexture:o}){a.uniforms.uDetailNormalMap={value:o},a.uniforms.uDetailOffset={value:new ve(0,0)},a.uniforms.uWaterTime={value:0},a.uniforms.uDetailScale={value:3.35},a.uniforms.uDetailStrength={value:.24},a.fragmentShader=a.fragmentShader.replace("#include <common>",`
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
      `)}function st(a,{pathTexture:o,flowSpeedMul:e,riverWidthMul:r,wingFlutter:n}){a.uniforms.uPathTexture={value:o},a.uniforms.uTime={value:0},a.uniforms.uFlowSpeed={value:e},a.uniforms.uRiverWidth={value:r},a.uniforms.uWingFlutter={value:n},a.vertexShader=a.vertexShader.replace("#include <common>",`
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
        float samplePosition = fract(u) * ${N.toFixed(1)};
        float sampleIndex = floor(samplePosition);
        float sampleMix = fract(samplePosition);
        float nextIndex = mod(sampleIndex + 1.0, ${N.toFixed(1)});
        float uvA = (sampleIndex + 0.5) / ${N.toFixed(1)};
        float uvB = (nextIndex + 0.5) / ${N.toFixed(1)};
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
      `)}function nt(a,o){const e=new We;e.index=a.index,e.attributes.position=a.attributes.position,e.attributes.normal=a.attributes.normal,e.attributes.aHingeGroup=a.attributes.aHingeGroup;const r=new Float32Array(o),n=new Float32Array(o),s=new Float32Array(o),i=new Float32Array(o),l=new Float32Array(o),u=new Float32Array(o),h=new Float32Array(o),p=new Float32Array(o),d=new Float32Array(o),f=64,x=Math.ceil(o/f);for(let v=0;v<o;v+=1){const b=v%f,S=Math.floor(v/f);r[v]=(S+M(v,901)*.22+b/f)/x;const P=.28+Math.sqrt((b+.5)/f)*2.8,T=b*2.399963229728653;n[v]=Math.cos(T)*P,s[v]=Math.sin(T)*P*.52,i[v]=M(v,904)*Math.PI*2,l[v]=2.2+M(v,905)*1.6,u[v]=M(v,906),h[v]=M(v,907)*Math.PI*2,p[v]=1+M(v,908)*.1,d[v]=.94+M(v,909)*.12}return e.setAttribute("aPathPhase",new U(r,1)),e.setAttribute("aLaneX",new U(n,1)),e.setAttribute("aLaneY",new U(s,1)),e.setAttribute("aFlapPhase",new U(i,1)),e.setAttribute("aFlapSpeed",new U(l,1)),e.setAttribute("aColorSeed",new U(u,1)),e.setAttribute("aWeavePhase",new U(h,1)),e.setAttribute("aScale",new U(p,1)),e.setAttribute("aSpeed",new U(d,1)),e.instanceCount=o,e}function it({position:a,stoneMaterial:o,lampColor:e}){const r=c.useRef(null),n=c.useRef(null);return c.useEffect(()=>{r.current&&n.current&&(r.current.target=n.current)},[]),t.jsxs("group",{position:a,children:[t.jsxs("mesh",{position:[0,.5,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.14,.2,1,8]}),t.jsx("primitive",{object:o,attach:"material"})]}),t.jsxs("mesh",{position:[0,1.1,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("boxGeometry",{args:[.42,.4,.42]}),t.jsx("primitive",{object:o,attach:"material"})]}),t.jsxs("mesh",{position:[0,1.1,0],children:[t.jsx("boxGeometry",{args:[.24,.22,.24]}),t.jsx("meshStandardMaterial",{color:"#3a2410",emissive:e,emissiveIntensity:.6,roughness:.5})]}),t.jsxs("mesh",{position:[0,1.42,0],castShadow:!0,children:[t.jsx("coneGeometry",{args:[.34,.32,8]}),t.jsx("primitive",{object:o,attach:"material"})]}),t.jsx("pointLight",{position:[0,1.1,0],color:e,intensity:1.6,distance:4.5,decay:2}),t.jsx("spotLight",{ref:r,position:[0,1.15,0],color:e,intensity:9,distance:7,angle:Math.PI/4.2,penumbra:.65,decay:2}),t.jsx("object3D",{ref:n,position:[0,-.6,0]})]})}function ce({position:a,scale:o=1,seed:e=0}){const r=c.useMemo(()=>Array.from({length:9},(n,s)=>({x:(M(s,3100+e)-.5)*2.8,z:(M(s,3200+e)-.5)*2.2,height:5.5+M(s,3300+e)*4.5,lean:(M(s,3400+e)-.5)*.08})),[e]);return t.jsx("group",{position:a,scale:o,children:r.map((n,s)=>t.jsxs("group",{position:[n.x,0,n.z],rotation:[n.lean,0,-n.lean*.7],children:[t.jsxs("mesh",{position:[0,n.height*.5,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.075,.105,n.height,8]}),t.jsx("meshStandardMaterial",{color:s%3===0?"#405d38":"#567247",roughness:.8})]}),Array.from({length:5},(i,l)=>{const u=n.height*(.22+l*.155);return t.jsxs("group",{position:[0,u,0],rotation:[0,l*2.1+s,0],children:[t.jsxs("mesh",{castShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.118,.118,.055,8]}),t.jsx("meshStandardMaterial",{color:"#293e29",roughness:.88})]}),l>1&&t.jsxs("mesh",{position:[.58,.12,0],rotation:[0,0,-.22],castShadow:!0,children:[t.jsx("sphereGeometry",{args:[.72,7,4]}),t.jsx("meshStandardMaterial",{color:"#314d35",roughness:.94})]})]},l)})]},s))})}function ct({stoneMaterial:a,woodMaterial:o}){const e=c.useMemo(()=>[[-17,.7,6.5,1.5],[-14.8,.55,5.5,1.05],[15.5,.75,7.2,1.6],[18,.5,5.9,1],[-17.5,.65,-8.5,1.35],[16.8,.6,-9.3,1.25]],[]);return t.jsxs("group",{children:[t.jsx(ce,{position:[-22,0,-6],scale:1.05,seed:1}),t.jsx(ce,{position:[21,0,5.5],scale:.92,seed:2}),t.jsx(ce,{position:[18.5,0,-13],scale:.72,seed:3}),e.map(([r,n,s,i],l)=>t.jsxs("mesh",{position:[r,n,s],scale:[i*1.35,i*.72,i],castShadow:!0,receiveShadow:!0,children:[t.jsx("dodecahedronGeometry",{args:[1,1]}),t.jsx("meshStandardMaterial",{color:l%2?"#263c2b":"#304932",roughness:.98})]},l)),t.jsxs("group",{position:[-1,0,16.5],rotation:[0,.08,0],children:[t.jsxs("mesh",{position:[-3.1,3.4,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("boxGeometry",{args:[.72,6.8,.72]}),t.jsx("primitive",{object:o,attach:"material"})]}),t.jsxs("mesh",{position:[3.1,3.4,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("boxGeometry",{args:[.72,6.8,.72]}),t.jsx("primitive",{object:o,attach:"material"})]}),t.jsxs("mesh",{position:[0,6.65,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("boxGeometry",{args:[7.6,.58,.72]}),t.jsx("primitive",{object:o,attach:"material"})]}),t.jsxs("mesh",{position:[0,5.75,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("boxGeometry",{args:[6.4,.42,.6]}),t.jsx("primitive",{object:o,attach:"material"})]})]}),[-6.5,-3.2,3.4,6.7].map((r,n)=>t.jsxs("mesh",{position:[r,.38,-14.4+Math.sin(n)*.65],scale:[1.45,.55,.9],castShadow:!0,receiveShadow:!0,children:[t.jsx("dodecahedronGeometry",{args:[.8,0]}),t.jsx("primitive",{object:a,attach:"material"})]},r))]})}function lt({stoneMaterial:a}){const o=pe(),e=c.useMemo(()=>window.matchMedia("(hover: hover) and (pointer: fine)").matches,[]),r=c.useMemo(()=>rt(),[]),n=c.useMemo(()=>at(),[]);c.useEffect(()=>()=>{r.dispose(),n.dispose()},[r,n]);const s=c.useRef(null);se((u,h)=>{const p=u.clock.elapsedTime*o,d=.012+Math.sin(p*.021)*.004+Math.sin(p*.053+1.7)*.003,f=-.008+Math.cos(p*.017+.6)*.003+Math.sin(p*.037+3.1)*.0025;r.offset.x=(r.offset.x+h*d+1)%1,r.offset.y=(r.offset.y+h*f+1)%1,r.rotation=Math.sin(p*.035)*.06+Math.sin(p*.081+2.4)*.03+Math.sin(p*.019+5.2)*.025;const x=s.current;if(x){x.uniforms.uWaterTime.value=p;const v=x.uniforms.uDetailOffset.value;v.x=(v.x+h*-.045*o+1)%1,v.y=(v.y+h*.031*o+1)%1}});const i=c.useMemo(()=>Array.from({length:17},(u,h)=>{const p=h/16;return{x:F.lerp(-10.5,10.5,p),z:-1.4+Math.sin(p*Math.PI*2.2)*2.1,rotation:M(h,1201)*Math.PI,scale:.72+M(h,1202)*.38}}),[]),l=c.useMemo(()=>[[-12.8,.65,7.8,1.2],[-10.9,.42,9.1,.75],[12.4,.72,-8.8,1.35],[14.1,.38,-7.2,.68],[-3.8,.5,-12.6,.9],[5.2,.44,11.8,.82]],[]);return t.jsxs("group",{children:[t.jsx(Ne,{resolution:e?192:96,frames:1,near:.5,far:180,children:u=>t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.015,-1.5],scale:[1.45,.78,1],receiveShadow:!0,children:[t.jsx("circleGeometry",{args:[9.6,96]}),t.jsx("meshPhysicalMaterial",{color:"#07131f",envMap:u,envMapIntensity:.78,normalMap:r,normalScale:[.2,.2],roughness:.24,metalness:.08,clearcoat:1,clearcoatRoughness:.2,reflectivity:.82,onBeforeCompile:h=>{ot(h,{detailTexture:n}),s.current=h}})]})}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.025,-1.5],scale:[1.45,.78,1],receiveShadow:!0,children:[t.jsx("ringGeometry",{args:[9.55,10.2,80]}),t.jsx("primitive",{object:a,attach:"material"})]}),i.map((u,h)=>t.jsxs("mesh",{position:[u.x,.16,u.z],rotation:[0,u.rotation,0],scale:[u.scale*1.25,1,u.scale],castShadow:!0,receiveShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.65,.78,.28,9]}),t.jsx("primitive",{object:a,attach:"material"})]},`step-${h}`)),l.map(([u,h,p,d],f)=>t.jsxs("mesh",{position:[u,h,p],scale:[d,d*.72,d],castShadow:!0,receiveShadow:!0,children:[t.jsx("dodecahedronGeometry",{args:[1,0]}),t.jsx("primitive",{object:a,attach:"material"})]},`rock-${f}`))]})}function ut({settings:a,onStats:o}){const{camera:e,gl:r}=le(),n=pe(),s=Math.round(F.clamp(a.craneCount??6e3,2e3,Oe)),i=(a.flowSpeed??1)*.0064,l=(a.riverWidth??100)/100,u=2.5,h=a.lampHeight??11.5,p=a.lampIntensity??220,d=a.lampRange??220,f=a.lampFalloff??2,x=a.droneMode??!1,v=c.useMemo(()=>window.matchMedia("(hover: hover) and (pointer: fine)").matches,[]),b=v?1024:512,S=c.useMemo(()=>Ke(),[]),{texture:P}=c.useMemo(()=>Ze(),[]),T=c.useMemo(()=>nt(S,s),[S,s]),C=c.useMemo(()=>tt(),[]),B=c.useRef(null),X=c.useMemo(()=>{const m=new ae({color:"#ffffff",roughness:.78,metalness:.02,normalMap:C,normalScale:new ve(.32,.32),side:Ee});return m.onBeforeCompile=g=>{st(g,{pathTexture:P,flowSpeedMul:i,riverWidthMul:l,wingFlutter:u}),B.current=g},m},[P,C,i,l,u]);c.useEffect(()=>()=>{T.dispose()},[T]),c.useEffect(()=>()=>{X.dispose()},[X]),c.useEffect(()=>()=>{C.dispose()},[C]),c.useEffect(()=>{const m=r.toneMapping,g=r.toneMappingExposure,j=r.outputColorSpace;return r.toneMapping=Le,r.toneMappingExposure=.82,r.outputColorSpace=Re,()=>{r.toneMapping=m,r.toneMappingExposure=g,r.outputColorSpace=j}},[r]);const ee=c.useMemo(()=>Je(),[]),J=c.useMemo(()=>Qe(),[]),W=c.useMemo(()=>et(),[]),Q=c.useMemo(()=>new ae({map:ee,bumpMap:ee,bumpScale:.14,color:"#c09a68",roughness:.82,metalness:.02}),[ee]),y=c.useMemo(()=>new ae({map:J,bumpMap:J,bumpScale:.16,color:"#858078",roughness:.91,metalness:.015}),[J]),D=c.useMemo(()=>new ae({map:W,bumpMap:W,bumpScale:.06,color:"#e2d3ad",roughness:.95,metalness:.01}),[W]),_=c.useMemo(()=>[0,Math.PI/2,Math.PI,3*Math.PI/2].map(L=>new $(0+Math.cos(L)*16.4,0,-1.5+Math.sin(L)*9.4)),[]),E=we({pitchMin:-.85,pitchMax:.85}),H=c.useRef(.08),K=c.useRef(.42),O=c.useRef(62),A=c.useRef(62),q=c.useRef({frames:0,time:0}),ne=c.useRef(new Set),re=c.useRef({yaw:0,pitch:0});return c.useEffect(()=>{e.position.set(23,36,43),e.lookAt(1,8.5,-3)},[e]),c.useEffect(()=>{if(x){const m=e.getWorldDirection(new $);re.current.yaw=Math.atan2(m.x,m.z),re.current.pitch=Math.asin(F.clamp(m.y,-1,1))}E.current.targetYaw=0,E.current.targetPitch=0,ne.current.clear()},[e,x,E]),c.useEffect(()=>{const m=ne.current,g=L=>{if(!x||L.repeat)return;const G=L.code==="Space"?"space":L.key.toLowerCase();["w","a","s","d","q","e","space","shift"].includes(G)&&(m.add(G),L.preventDefault())},j=L=>m.delete(L.code==="Space"?"space":L.key.toLowerCase()),z=()=>m.clear();return window.addEventListener("keydown",g),window.addEventListener("keyup",j),window.addEventListener("blur",z),()=>{window.removeEventListener("keydown",g),window.removeEventListener("keyup",j),window.removeEventListener("blur",z)}},[x]),c.useEffect(()=>{const m=r.domElement;let g=0,j=A.current;const z=w=>{x||window.matchMedia("(hover: hover) and (pointer: fine)").matches&&(w.preventDefault(),A.current=F.clamp(A.current*Math.exp(w.deltaY*.0012),18,115))},L=w=>Math.hypot(w[0].clientX-w[1].clientX,w[0].clientY-w[1].clientY),G=w=>{w.touches.length===2&&(w.preventDefault(),E.current.dragging=!1,g=Math.max(1,L(w.touches)),j=A.current)},Z=w=>{if(w.touches.length!==2||g<=0)return;w.preventDefault(),E.current.dragging=!1;const V=Math.max(1,L(w.touches));A.current=F.clamp(j*(g/V),18,115)},k=w=>{w.touches.length<2&&(g=0)};return m.addEventListener("wheel",z,{passive:!1}),m.addEventListener("touchstart",G,{passive:!1}),m.addEventListener("touchmove",Z,{passive:!1}),m.addEventListener("touchend",k),m.addEventListener("touchcancel",k),()=>{m.removeEventListener("wheel",z),m.removeEventListener("touchstart",G),m.removeEventListener("touchmove",Z),m.removeEventListener("touchend",k),m.removeEventListener("touchcancel",k)}},[x,r]),c.useEffect(()=>{const m=r.domElement,g=z=>{!x||z.pointerType==="touch"||(m.style.cursor="none")},j=()=>{m.style.cursor=""};return m.addEventListener("pointerdown",g),m.addEventListener("pointerup",j),m.addEventListener("pointercancel",j),window.addEventListener("blur",j),()=>{j(),m.removeEventListener("pointerdown",g),m.removeEventListener("pointerup",j),m.removeEventListener("pointercancel",j),window.removeEventListener("blur",j)}},[x,r]),se((m,g)=>{const j=m.clock.elapsedTime*n,z=B.current;if(z&&(z.uniforms.uTime.value=j,z.uniforms.uFlowSpeed.value=i,z.uniforms.uRiverWidth.value=l,z.uniforms.uWingFlutter.value=u),H.current=(H.current+Math.min(g,.05)*n*.01)%1,x){const G=Math.min(g,.05),Z=re.current.yaw+E.current.targetYaw,k=F.clamp(re.current.pitch-E.current.targetPitch,-1.48,1.48),w=new $(Math.sin(Z)*Math.cos(k),Math.sin(k),Math.cos(Z)*Math.cos(k)).normalize(),V=new $().crossVectors(e.up,w).normalize(),R=new $,Y=ne.current;Y.has("w")&&R.add(w),Y.has("s")&&R.sub(w),Y.has("a")&&R.add(V),Y.has("d")&&R.sub(V),Y.has("e")&&(R.y+=1),Y.has("q")&&(R.y-=1),Y.has("space")&&(R.y+=1),Y.has("shift")&&(R.y-=1),R.lengthSq()>0&&(e.position.addScaledVector(R.normalize(),15*G),e.position.x=F.clamp(e.position.x,-120,120),e.position.y=F.clamp(e.position.y,.8,90),e.position.z=F.clamp(e.position.z,-120,120)),e.lookAt(e.position.clone().add(w))}else{const G=E.current.targetYaw,Z=E.current.targetPitch;K.current+=Math.min(g,.05)*n*.018;const k=K.current+G,w=.48+Z*.55;O.current=F.damp(O.current,A.current,9,Math.min(g,.05));const V=O.current,R=new $(1,8.5,-3);e.position.set(R.x+Math.sin(k)*Math.cos(w)*V,R.y+Math.sin(w)*V,R.z+Math.cos(k)*Math.cos(w)*V),e.lookAt(R)}const L=1-F.smoothstep(H.current,0,.62);q.current.frames+=1,q.current.time+=g,q.current.time>=.5&&(o({fps:Math.round(q.current.frames/q.current.time),zone:L>.5?"TEMPLE COURTYARD":"MOONLIT GARDEN"}),q.current.frames=0,q.current.time=0)}),c.useEffect(()=>{var g;const m=((g=r==null?void 0:r.constructor)==null?void 0:g.name)??"WebGL2";o({gpu:m.includes("WebGPU")?"WebGPU":"WebGL2",cranes:s})},[s]),t.jsxs("group",{children:[t.jsx("ambientLight",{intensity:.008,color:"#b9c8e8"}),t.jsx("hemisphereLight",{color:"#53658f",groundColor:"#08070a",intensity:.008}),t.jsx("directionalLight",{position:[8,10,6],intensity:.05,color:"#7186b8"}),t.jsx("directionalLight",{position:[-58,70,-72],intensity:.22,color:"#9eb7ea",castShadow:v,"shadow-mapSize-width":b,"shadow-mapSize-height":b,"shadow-camera-left":-44,"shadow-camera-right":44,"shadow-camera-top":44,"shadow-camera-bottom":-44,"shadow-camera-near":20,"shadow-camera-far":170,"shadow-bias":-25e-5,"shadow-normalBias":.025}),t.jsxs("mesh",{position:[-58,70,-72],children:[t.jsx("sphereGeometry",{args:[6.5,40,24]}),t.jsx("meshBasicMaterial",{color:"#d9e3f5",fog:!1,toneMapped:!1})]}),t.jsx(He,{radius:105,depth:38,count:900,factor:1.1,saturation:.15,fade:!1,speed:0}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.05,0],receiveShadow:!0,children:[t.jsx("circleGeometry",{args:[40,96]}),t.jsx("primitive",{object:D,attach:"material"})]}),t.jsx(lt,{stoneMaterial:y}),t.jsx(ct,{stoneMaterial:y,woodMaterial:Q}),t.jsx(Me,{position:[-10.5,0,9],rotation:[0,.38,0],scale:.68,petalCount:v?4e4:9e3,fallingPetals:v?600:180,windIntensity:.7}),Array.from({length:6},(m,g)=>t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[-10.5,.018+g*4e-4,9],receiveShadow:!0,children:[t.jsx("ringGeometry",{args:[2.1+g*.72,2.15+g*.72,80]}),t.jsx("meshStandardMaterial",{color:"#4b5260",roughness:.96})]},`raked-ring-${g}`)),t.jsxs("group",{position:[11.8,0,8.8],children:[t.jsxs("mesh",{position:[0,.42,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("cylinderGeometry",{args:[1.05,1.2,.84,12]}),t.jsx("primitive",{object:y,attach:"material"})]}),t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.85,0],children:[t.jsx("circleGeometry",{args:[.82,32]}),t.jsx("meshPhysicalMaterial",{color:"#081520",roughness:.24,metalness:.12,clearcoat:1})]})]}),Ve.map((m,g)=>t.jsxs("group",{position:m.position,children:[t.jsxs("mesh",{position:[0,5.1,0],castShadow:!0,receiveShadow:!0,children:[t.jsx("cylinderGeometry",{args:[.32,.7,10.2,10]}),t.jsx("primitive",{object:y,attach:"material"})]}),t.jsxs("mesh",{position:[0,10.35,0],castShadow:!0,children:[t.jsx("cylinderGeometry",{args:[1.15,.52,.65,10]}),t.jsx("primitive",{object:Q,attach:"material"})]}),t.jsxs("mesh",{position:[0,h,0],children:[t.jsx("sphereGeometry",{args:[.72,24,16]}),t.jsx("meshStandardMaterial",{color:"#5a3518",emissive:m.color,emissiveIntensity:.85,roughness:.38})]}),t.jsx("pointLight",{position:[0,h,0],color:m.color,intensity:p,distance:d,decay:f,castShadow:v,"shadow-mapSize-width":b,"shadow-mapSize-height":b,"shadow-bias":-4e-4}),t.jsx("pointLight",{position:[0,.35,0],color:m.color,intensity:p*.055,distance:18,decay:2})]},`main-lamp-${g}`)),_.map((m,g)=>t.jsx(it,{position:m,stoneMaterial:y,lampColor:"#ffd9a0"},g)),t.jsx("mesh",{geometry:T,material:X,frustumCulled:!1})]})}function Ct({settings:a={}}){const[o,e]=c.useState({fps:60,gpu:"—",cranes:0,zone:"TEMPLE COURTYARD"}),r=n=>e(s=>({...s,...n}));return t.jsxs("section",{className:"atmosphere river-of-wishes",style:{"--experiment-accent":"#e6c88a"},children:[t.jsxs(ge,{camera:{position:[23,36,43],fov:46,near:.1,far:300},speed:a.speed??1,shadows:!0,bloom:{intensity:.8,threshold:.6},children:[t.jsx("color",{attach:"background",args:[de]}),t.jsx("fogExp2",{attach:"fog",args:[de,.009]}),t.jsx(ut,{settings:a,onStats:r})]}),t.jsxs("div",{className:"experiment-copy river-of-wishes__copy",children:[t.jsx("p",{children:"26 — A river suspended in midair"}),t.jsxs("h1",{children:["The River",t.jsx("br",{}),"of Wishes."]}),t.jsx("span",{children:"Ten thousand patterned paper cranes become a suspended river, flowing through a moonlit stone garden — never colliding, never stopping."})]}),t.jsx("div",{className:"river-of-wishes__legend",children:t.jsxs("div",{children:[t.jsx("i",{children:"↻"}),t.jsxs("div",{children:[t.jsx("b",{children:"Drag"}),t.jsx("span",{children:"Orbit the river"})]})]})}),t.jsx(ye,{eyebrow:"Current position",value:o.zone,stats:[{value:o.cranes.toLocaleString(),label:"CRANES IN THE RIVER"},{value:o.gpu,label:"RENDERER"}]})]})}export{Ct as default};
