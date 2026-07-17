import{r as u,j as e}from"./index-z14wTkaw.js";import{C as de,u as ce}from"./CanvasStage-DuXzF5Y7.js";import{u as pe}from"./useDragOrbit-CTgZvdr0.js";import{A as ve}from"./AnimationReadout-BT9jLqWl.js";import{WishingTreeModel as fe}from"./WishingTree-BxpgeQab.js";import{s as w}from"./procedural-DZUg-xN7.js";import{u as ee,a as ae}from"./react-three-fiber.esm-Bm9JnNtH.js";import{a2 as xe,H as ge,dH as we,C as Me,A as be,V as J,aP as Se,S as ye,ad as k,aa as q,D as je,e as le,ae as Pe,Y as Ce,a9 as Te,ai as te,dO as Ae,l as Re,R as De,F as ze,N as oe,aG as z,a7 as Ee,a5 as W,aF as Z,by as ue}from"./three.module-Ct-yBmsu.js";import{v as Le}from"./constants-CIgl5eJ3.js";import"./index-B41LXek-.js";import"./usePinchZoom-C4qAsk71.js";import"./quality-NEVBGrgs.js";import"./dragOrbit-BWBT6NeL.js";import"./BufferGeometryUtils-CfLCGRKU.js";function Fe({resolution:r=256,near:o=.1,far:t=1e3,envMap:a,fog:n}={}){const s=ae(({gl:p})=>p),i=ae(({scene:p})=>p),c=u.useMemo(()=>{const p=new xe(r);return p.texture.type=ge,p},[r]);u.useEffect(()=>()=>{c.dispose()},[c]);const l=u.useMemo(()=>new we(o,t,c),[o,t,c]);let h,d;const m=u.useCallback(()=>{h=i.fog,d=i.background,i.background=a||d,i.fog=n||h,l.update(s,i),i.fog=h,i.background=d},[s,i,l]);return{fbo:c,camera:l,update:m}}function Ie({children:r,frames:o=1/0,resolution:t,near:a,far:n,envMap:s,fog:i,...c}){const l=u.useRef(null),{fbo:h,camera:d,update:m}=Fe({resolution:t,near:a,far:n,envMap:s,fog:i});let p=0;return ee(()=>{l.current&&(o===1/0||p<o)&&(l.current.visible=!1,m(),l.current.visible=!0,p++)}),u.createElement("group",c,u.createElement("primitive",{object:d}),u.createElement("group",{ref:l},r==null?void 0:r(h.texture)))}class We extends ye{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
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
	      #include <${Le>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const ke=r=>new J().setFromSpherical(new Se(r,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),Ge=u.forwardRef(({radius:r=100,depth:o=50,count:t=5e3,saturation:a=0,factor:n=4,fade:s=!1,speed:i=1},c)=>{const l=u.useRef(null),[h,d,m]=u.useMemo(()=>{const x=[],v=[],y=Array.from({length:t},()=>(.5+.5*Math.random())*n),M=new Me;let j=r+o;const T=o/t;for(let C=0;C<t;C++)j-=T*Math.random(),x.push(...ke(j).toArray()),M.setHSL(C/t,a,.9),v.push(M.r,M.g,M.b);return[new Float32Array(x),new Float32Array(v),new Float32Array(y)]},[t,o,n,r,a]);ee(x=>l.current&&(l.current.uniforms.time.value=x.clock.elapsedTime*i));const[p]=u.useState(()=>new We);return u.createElement("points",{ref:c},u.createElement("bufferGeometry",null,u.createElement("bufferAttribute",{attach:"attributes-position",args:[h,3]}),u.createElement("bufferAttribute",{attach:"attributes-color",args:[d,3]}),u.createElement("bufferAttribute",{attach:"attributes-size",args:[m,1]})),u.createElement("primitive",{ref:l,object:p,attach:"material",blending:be,"uniforms-fade-value":s,depthWrite:!1,transparent:!0,vertexColors:!0}))}),Ue=1e4,G=512,se=.87,Ne=[{position:[-18,0,14],color:"#ffd18a"},{position:[18,0,14],color:"#ffc078"},{position:[18,0,-16],color:"#ffe0a0"},{position:[-18,0,-16],color:"#ffb96e"}],ne="#090d20",Be=.58,_e=.85;function ie(r,o){const t=Math.abs(r-o)%1;return Math.min(t,1-t)}function He(r){const o=ie(r,Be),t=ie(r,_e),n=1+Math.sin(r*Math.PI*4-.7)*.18+.72*Math.exp(-(t**2)/(2*.065**2))-.48*Math.exp(-(o**2)/(2*.045**2));return k.clamp(n,.52,1.82)}function Oe(){const r=[],o=[],t=(b,P,E,F)=>{r.push(...P,...E,...F),o.push(b,b,b)},a=[0,.58,.02],n=[0,-.14,.02],s=[-.48,.2,.02],i=[.48,.2,.02],c=[0,.22,.7],l=[0,.22,-.68];t(0,a,s,c),t(0,a,c,i),t(0,a,i,l),t(0,a,l,s),t(0,n,c,s),t(0,n,i,c),t(0,n,l,i),t(0,n,s,l);const h=[-.13,.24,.58],d=[.13,.24,.58],m=[-.1,.82,1.05],p=[.1,.82,1.05],x=[-.09,1.25,1.38],v=[.09,1.25,1.38];t(0,h,d,p),t(0,h,p,m),t(0,m,p,v),t(0,m,v,x);const y=[0,1.38,1.53],M=[0,1.18,1.6],j=[0,1.03,2.02];t(0,x,v,y),t(0,x,M,v),t(0,y,v,j),t(0,y,j,x),t(0,x,j,M),t(0,M,j,v);const T=[-.06,.24,-.57],C=[.06,.24,-.57],L=[-.035,.58,-1],B=[.035,.58,-1],V=[0,.82,-1.55];t(0,T,C,B),t(0,T,B,L),t(0,L,B,V);function Y(b,P){const E=[.08*b,.48,.5],F=[.08*b,.48,-.48],U=[.82*b,.42,.62],D=[.92*b,.4,-.62],A=[2.12*b,.18,-.04],f=[1*b,.66,.02];b>0?(t(P,E,U,f),t(P,U,A,f),t(P,f,A,D),t(P,f,D,F),t(P,E,f,F)):(t(P,E,f,U),t(P,U,f,A),t(P,f,D,A),t(P,f,F,D),t(P,E,F,f))}Y(-1,1),Y(1,2);const R=new Te;R.setAttribute("position",new te(r,3)),R.setAttribute("aHingeGroup",new te(o,1));const $=new Float32Array(r.length/3*2);for(let b=0;b<r.length/3;b+=1)$[b*2]=r[b*3]*.32+.5,$[b*2+1]=r[b*3+2]*.32+r[b*3+1]*.12+.5;return R.setAttribute("uv",new te($,2)),R.computeVertexNormals(),R}const Ve=[[-24,10.2,18],[-19,11.2,23],[-12,10.4,18],[-7,9.4,9],[0,10.3,14],[9,11.4,21],[18,10.7,20],[24,10.1,14],[19,11.1,8],[10,10.3,4],[15,9.5,-2],[24,10.4,-9],[23,11.3,-17],[18,10.6,-23],[10,9.6,-18],[5,10.5,-9],[0,11.6,-14],[-9,12.1,-23],[-18,10.8,-22],[-24,9.7,-16],[-21,10.5,-8],[-12,11.4,-4],[-17,10.7,2],[-25,10.1,9]];function Ye(){const r=Ve.map(s=>new J(s[0]*se,s[1],s[2]*se)),o=new Ae(r,!0,"catmullrom",.5),t=o.getPoints(G),a=new Float32Array(G*4);for(let s=0;s<G;s+=1){const i=t[s];a[s*4]=i.x,a[s*4+1]=i.y,a[s*4+2]=i.z,a[s*4+3]=He(s/G)}const n=new Re(a,G,1,De,ze);return n.needsUpdate=!0,n.minFilter=oe,n.magFilter=oe,n.wrapS=z,n.generateMipmaps=!1,{curve:o,texture:n}}function $e(){const o=document.createElement("canvas");o.width=256,o.height=256;const t=o.getContext("2d");t.fillStyle="#3f2c1a",t.fillRect(0,0,256,256);for(let n=0;n<70;n+=1){const s=n*3.6+w(n,701)*3;t.strokeStyle=`rgba(20, 12, 6, ${.12+w(n,702)*.22})`,t.lineWidth=1+w(n,703)*2,t.beginPath();for(let i=0;i<=256;i+=12){const c=Math.sin(i*.03+n)*4;i===0?t.moveTo(i,s+c):t.lineTo(i,s+c)}t.stroke()}const a=new Z(o);return a.wrapS=z,a.wrapT=z,a.repeat.set(1,4),a}function Q(r,o,t,a,n,s=[.35,1.5]){for(let i=0;i<t;i+=1){const c=w(i,a)*o,l=w(i,a+1)*o,h=s[0]+w(i,a+2)*(s[1]-s[0]);r.fillStyle=n(w(i,a+3));const d=c<h?[0,o]:c>o-h?[0,-o]:[0],m=l<h?[0,o]:l>o-h?[0,-o]:[0];d.forEach(p=>{m.forEach(x=>{r.beginPath(),r.arc(c+p,l+x,h,0,Math.PI*2),r.fill()})})}}function Xe(){const o=document.createElement("canvas");o.width=512,o.height=512;const t=o.getContext("2d"),a=t.createImageData(512,512);for(let s=0;s<512;s+=1)for(let i=0;i<512;i+=1){const c=i/512,l=s/512,d=1+(Math.sin((c*6+l*4)*Math.PI*2)*.5+Math.sin((c*-3+l*7)*Math.PI*2)*.32+Math.sin((c*11-l*5)*Math.PI*2)*.16)*.1,m=(s*512+i)*4;a.data[m]=Math.min(255,118*d),a.data[m+1]=Math.min(255,112*d),a.data[m+2]=Math.min(255,100*d),a.data[m+3]=255}t.putImageData(a,0,0),Q(t,512,2e3,1601,s=>`rgba(20, 18, 14, ${.05+s*.12})`,[.4,1.8]),Q(t,512,900,1701,s=>`rgba(212, 204, 190, ${.05+s*.1})`,[.3,1.2]);const n=new Z(o);return n.wrapS=z,n.wrapT=z,n.repeat.set(3,3),n}function Ze(){const o=document.createElement("canvas");o.width=512,o.height=512;const t=o.getContext("2d"),a=t.createImageData(512,512);for(let s=0;s<512;s+=1)for(let i=0;i<512;i+=1){const c=i/512,l=s/512,d=1+(Math.sin((c*5+l*3)*Math.PI*2)*.5+Math.sin((c*-4+l*6)*Math.PI*2)*.32+Math.sin((c*9-l*2)*Math.PI*2)*.18)*.09,m=(s*512+i)*4;a.data[m]=Math.min(255,150*d),a.data[m+1]=Math.min(255,130*d),a.data[m+2]=Math.min(255,98*d),a.data[m+3]=255}t.putImageData(a,0,0),Q(t,512,3200,1401,s=>`rgba(255, 244, 214, ${.04+s*.1})`,[.25,.9]),Q(t,512,2200,1501,s=>`rgba(58, 44, 26, ${.04+s*.09})`,[.25,.85]);const n=new Z(o);return n.wrapS=z,n.wrapT=z,n.repeat.set(10,10),n}function Ke(){const o=document.createElement("canvas");o.width=128,o.height=128;const t=o.getContext("2d"),a=t.createImageData(128,128);for(let s=0;s<128;s+=1)for(let i=0;i<128;i+=1){const c=(s*128+i)*4,l=Math.sin(s*.72+Math.sin(i*.09)*1.7)*7,h=Math.sin(i*.91+Math.sin(s*.13))*4;a.data[c]=128+l,a.data[c+1]=128+h,a.data[c+2]=246,a.data[c+3]=255}t.putImageData(a,0,0);const n=new Z(o);return n.wrapS=z,n.wrapT=z,n.repeat.set(5,5),n.colorSpace=ue,n}function he({size:r,waveCount:o,maxFreq:t,seedBase:a,strength:n}){const s=document.createElement("canvas");s.width=r,s.height=r;const i=s.getContext("2d"),c=i.createImageData(r,r),l=[];for(let m=0;m<o;m+=1){let p=Math.round(k.lerp(-t,t,w(m,a))),x=Math.round(k.lerp(-t,t,w(m,a+1)));p===0&&x===0&&(p=1);const y=1/Math.hypot(p,x)**1.15,M=w(m,a+2)*Math.PI*2;l.push({kx:p,ky:x,amp:y,phase:M})}const h=l.reduce((m,p)=>m+p.amp,0);for(let m=0;m<r;m+=1)for(let p=0;p<r;p+=1){const x=p/r,v=m/r;let y=0,M=0;l.forEach(C=>{const L=Math.cos((C.kx*x+C.ky*v)*Math.PI*2+C.phase)*C.amp;y+=L*C.kx,M+=L*C.ky}),y=y/h*n,M=M/h*n;const j=Math.hypot(y,M,1),T=(m*r+p)*4;c.data[T]=128+y/j*90,c.data[T+1]=128+M/j*90,c.data[T+2]=128+1/j*120,c.data[T+3]=255}i.putImageData(c,0,0);const d=new Z(s);return d.wrapS=z,d.wrapT=z,d.colorSpace=ue,d}function qe(){const r=he({size:512,waveCount:11,maxFreq:8,seedBase:2201,strength:9});return r.repeat.set(4,4),r}function Je(){return he({size:256,waveCount:16,maxFreq:27,seedBase:2301,strength:14})}function Qe(r,{detailTexture:o}){r.uniforms.uDetailNormalMap={value:o},r.uniforms.uDetailOffset={value:new le(0,0)},r.uniforms.uWaterTime={value:0},r.uniforms.uDetailScale={value:3.35},r.uniforms.uDetailStrength={value:.24},r.fragmentShader=r.fragmentShader.replace("#include <common>",`
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
      `)}function et(r,{pathTexture:o,flowSpeedMul:t,riverWidthMul:a,wingFlutter:n}){r.uniforms.uPathTexture={value:o},r.uniforms.uTime={value:0},r.uniforms.uFlowSpeed={value:t},r.uniforms.uRiverWidth={value:a},r.uniforms.uWingFlutter={value:n},r.vertexShader=r.vertexShader.replace("#include <common>",`
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
        float samplePosition = fract(u) * ${G.toFixed(1)};
        float sampleIndex = floor(samplePosition);
        float sampleMix = fract(samplePosition);
        float nextIndex = mod(sampleIndex + 1.0, ${G.toFixed(1)});
        float uvA = (sampleIndex + 0.5) / ${G.toFixed(1)};
        float uvB = (nextIndex + 0.5) / ${G.toFixed(1)};
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
      `)}function tt(r,o){const t=new Ee;t.index=r.index,t.attributes.position=r.attributes.position,t.attributes.normal=r.attributes.normal,t.attributes.aHingeGroup=r.attributes.aHingeGroup;const a=new Float32Array(o),n=new Float32Array(o),s=new Float32Array(o),i=new Float32Array(o),c=new Float32Array(o),l=new Float32Array(o),h=new Float32Array(o),d=new Float32Array(o),m=new Float32Array(o),p=64,x=Math.ceil(o/p);for(let v=0;v<o;v+=1){const y=v%p,M=Math.floor(v/p);a[v]=(M+w(v,901)*.22+y/p)/x;const j=.28+Math.sqrt((y+.5)/p)*2.8,T=y*2.399963229728653;n[v]=Math.cos(T)*j,s[v]=Math.sin(T)*j*.52,i[v]=w(v,904)*Math.PI*2,c[v]=2.2+w(v,905)*1.6,l[v]=w(v,906),h[v]=w(v,907)*Math.PI*2,d[v]=1+w(v,908)*.1,m[v]=.94+w(v,909)*.12}return t.setAttribute("aPathPhase",new W(a,1)),t.setAttribute("aLaneX",new W(n,1)),t.setAttribute("aLaneY",new W(s,1)),t.setAttribute("aFlapPhase",new W(i,1)),t.setAttribute("aFlapSpeed",new W(c,1)),t.setAttribute("aColorSeed",new W(l,1)),t.setAttribute("aWeavePhase",new W(h,1)),t.setAttribute("aScale",new W(d,1)),t.setAttribute("aSpeed",new W(m,1)),t.instanceCount=o,t}function rt({position:r,stoneMaterial:o,lampColor:t}){const a=u.useRef(null),n=u.useRef(null);return u.useEffect(()=>{a.current&&n.current&&(a.current.target=n.current)},[]),e.jsxs("group",{position:r,children:[e.jsxs("mesh",{position:[0,.5,0],castShadow:!0,receiveShadow:!0,children:[e.jsx("cylinderGeometry",{args:[.14,.2,1,8]}),e.jsx("primitive",{object:o,attach:"material"})]}),e.jsxs("mesh",{position:[0,1.1,0],castShadow:!0,receiveShadow:!0,children:[e.jsx("boxGeometry",{args:[.42,.4,.42]}),e.jsx("primitive",{object:o,attach:"material"})]}),e.jsxs("mesh",{position:[0,1.1,0],children:[e.jsx("boxGeometry",{args:[.24,.22,.24]}),e.jsx("meshStandardMaterial",{color:"#3a2410",emissive:t,emissiveIntensity:.6,roughness:.5})]}),e.jsxs("mesh",{position:[0,1.42,0],castShadow:!0,children:[e.jsx("coneGeometry",{args:[.34,.32,8]}),e.jsx("primitive",{object:o,attach:"material"})]}),e.jsx("pointLight",{position:[0,1.1,0],color:t,intensity:1.6,distance:4.5,decay:2}),e.jsx("spotLight",{ref:a,position:[0,1.15,0],color:t,intensity:9,distance:7,angle:Math.PI/4.2,penumbra:.65,decay:2}),e.jsx("object3D",{ref:n,position:[0,-.6,0]})]})}function re({position:r,scale:o=1,seed:t=0}){const a=u.useMemo(()=>Array.from({length:9},(n,s)=>({x:(w(s,3100+t)-.5)*2.8,z:(w(s,3200+t)-.5)*2.2,height:5.5+w(s,3300+t)*4.5,lean:(w(s,3400+t)-.5)*.08})),[t]);return e.jsx("group",{position:r,scale:o,children:a.map((n,s)=>e.jsxs("group",{position:[n.x,0,n.z],rotation:[n.lean,0,-n.lean*.7],children:[e.jsxs("mesh",{position:[0,n.height*.5,0],castShadow:!0,receiveShadow:!0,children:[e.jsx("cylinderGeometry",{args:[.075,.105,n.height,8]}),e.jsx("meshStandardMaterial",{color:s%3===0?"#405d38":"#567247",roughness:.8})]}),Array.from({length:5},(i,c)=>{const l=n.height*(.22+c*.155);return e.jsxs("group",{position:[0,l,0],rotation:[0,c*2.1+s,0],children:[e.jsxs("mesh",{castShadow:!0,children:[e.jsx("cylinderGeometry",{args:[.118,.118,.055,8]}),e.jsx("meshStandardMaterial",{color:"#293e29",roughness:.88})]}),c>1&&e.jsxs("mesh",{position:[.58,.12,0],rotation:[0,0,-.22],castShadow:!0,children:[e.jsx("sphereGeometry",{args:[.72,7,4]}),e.jsx("meshStandardMaterial",{color:"#314d35",roughness:.94})]})]},c)})]},s))})}function at({stoneMaterial:r,woodMaterial:o}){const t=u.useMemo(()=>[[-17,.7,6.5,1.5],[-14.8,.55,5.5,1.05],[15.5,.75,7.2,1.6],[18,.5,5.9,1],[-17.5,.65,-8.5,1.35],[16.8,.6,-9.3,1.25]],[]);return e.jsxs("group",{children:[e.jsx(re,{position:[-22,0,-6],scale:1.05,seed:1}),e.jsx(re,{position:[21,0,5.5],scale:.92,seed:2}),e.jsx(re,{position:[18.5,0,-13],scale:.72,seed:3}),t.map(([a,n,s,i],c)=>e.jsxs("mesh",{position:[a,n,s],scale:[i*1.35,i*.72,i],castShadow:!0,receiveShadow:!0,children:[e.jsx("dodecahedronGeometry",{args:[1,1]}),e.jsx("meshStandardMaterial",{color:c%2?"#263c2b":"#304932",roughness:.98})]},c)),e.jsxs("group",{position:[-1,0,16.5],rotation:[0,.08,0],children:[e.jsxs("mesh",{position:[-3.1,3.4,0],castShadow:!0,receiveShadow:!0,children:[e.jsx("boxGeometry",{args:[.72,6.8,.72]}),e.jsx("primitive",{object:o,attach:"material"})]}),e.jsxs("mesh",{position:[3.1,3.4,0],castShadow:!0,receiveShadow:!0,children:[e.jsx("boxGeometry",{args:[.72,6.8,.72]}),e.jsx("primitive",{object:o,attach:"material"})]}),e.jsxs("mesh",{position:[0,6.65,0],castShadow:!0,receiveShadow:!0,children:[e.jsx("boxGeometry",{args:[7.6,.58,.72]}),e.jsx("primitive",{object:o,attach:"material"})]}),e.jsxs("mesh",{position:[0,5.75,0],castShadow:!0,receiveShadow:!0,children:[e.jsx("boxGeometry",{args:[6.4,.42,.6]}),e.jsx("primitive",{object:o,attach:"material"})]})]}),[-6.5,-3.2,3.4,6.7].map((a,n)=>e.jsxs("mesh",{position:[a,.38,-14.4+Math.sin(n)*.65],scale:[1.45,.55,.9],castShadow:!0,receiveShadow:!0,children:[e.jsx("dodecahedronGeometry",{args:[.8,0]}),e.jsx("primitive",{object:r,attach:"material"})]},a))]})}function ot({stoneMaterial:r}){const o=ce(),t=u.useMemo(()=>window.matchMedia("(hover: hover) and (pointer: fine)").matches,[]),a=u.useMemo(()=>qe(),[]),n=u.useMemo(()=>Je(),[]);u.useEffect(()=>()=>{a.dispose(),n.dispose()},[a,n]);const s=u.useRef(null);ee((l,h)=>{const d=l.clock.elapsedTime*o,m=.012+Math.sin(d*.021)*.004+Math.sin(d*.053+1.7)*.003,p=-.008+Math.cos(d*.017+.6)*.003+Math.sin(d*.037+3.1)*.0025;a.offset.x=(a.offset.x+h*m+1)%1,a.offset.y=(a.offset.y+h*p+1)%1,a.rotation=Math.sin(d*.035)*.06+Math.sin(d*.081+2.4)*.03+Math.sin(d*.019+5.2)*.025;const x=s.current;if(x){x.uniforms.uWaterTime.value=d;const v=x.uniforms.uDetailOffset.value;v.x=(v.x+h*-.045*o+1)%1,v.y=(v.y+h*.031*o+1)%1}});const i=u.useMemo(()=>Array.from({length:17},(l,h)=>{const d=h/16;return{x:k.lerp(-10.5,10.5,d),z:-1.4+Math.sin(d*Math.PI*2.2)*2.1,rotation:w(h,1201)*Math.PI,scale:.72+w(h,1202)*.38}}),[]),c=u.useMemo(()=>[[-12.8,.65,7.8,1.2],[-10.9,.42,9.1,.75],[12.4,.72,-8.8,1.35],[14.1,.38,-7.2,.68],[-3.8,.5,-12.6,.9],[5.2,.44,11.8,.82]],[]);return e.jsxs("group",{children:[e.jsx(Ie,{resolution:t?192:96,frames:t?1/0:1,near:.5,far:180,children:l=>e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.015,-1.5],scale:[1.45,.78,1],receiveShadow:!0,children:[e.jsx("circleGeometry",{args:[9.6,96]}),e.jsx("meshPhysicalMaterial",{color:"#07131f",envMap:l,envMapIntensity:.78,normalMap:a,normalScale:[.2,.2],roughness:.24,metalness:.08,clearcoat:1,clearcoatRoughness:.2,reflectivity:.82,onBeforeCompile:h=>{Qe(h,{detailTexture:n}),s.current=h}})]})}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.025,-1.5],scale:[1.45,.78,1],receiveShadow:!0,children:[e.jsx("ringGeometry",{args:[9.55,10.2,80]}),e.jsx("primitive",{object:r,attach:"material"})]}),i.map((l,h)=>e.jsxs("mesh",{position:[l.x,.16,l.z],rotation:[0,l.rotation,0],scale:[l.scale*1.25,1,l.scale],castShadow:!0,receiveShadow:!0,children:[e.jsx("cylinderGeometry",{args:[.65,.78,.28,9]}),e.jsx("primitive",{object:r,attach:"material"})]},`step-${h}`)),c.map(([l,h,d,m],p)=>e.jsxs("mesh",{position:[l,h,d],scale:[m,m*.72,m],castShadow:!0,receiveShadow:!0,children:[e.jsx("dodecahedronGeometry",{args:[1,0]}),e.jsx("primitive",{object:r,attach:"material"})]},`rock-${p}`))]})}function st({settings:r,onStats:o}){const{camera:t,gl:a}=ae(),n=ce(),s=Math.round(k.clamp(r.craneCount??6e3,2e3,Ue)),i=(r.flowSpeed??1)*.016,c=(r.riverWidth??100)/100,l=2.5,h=r.lampHeight??11.5,d=r.lampIntensity??220,m=r.lampRange??220,p=r.lampFalloff??2,x=u.useMemo(()=>window.matchMedia("(hover: hover) and (pointer: fine)").matches?1024:512,[]),v=u.useMemo(()=>Oe(),[]),{texture:y}=u.useMemo(()=>Ye(),[]),M=u.useMemo(()=>tt(v,s),[v,s]),j=u.useMemo(()=>Ke(),[]),T=u.useRef(null),C=u.useMemo(()=>{const f=new q({color:"#ffffff",roughness:.78,metalness:.02,normalMap:j,normalScale:new le(.32,.32),side:je});return f.onBeforeCompile=g=>{et(g,{pathTexture:y,flowSpeedMul:i,riverWidthMul:c,wingFlutter:l}),T.current=g},f},[y,j,i,c,l]);u.useEffect(()=>()=>{M.dispose()},[M]),u.useEffect(()=>()=>{C.dispose()},[C]),u.useEffect(()=>()=>{j.dispose()},[j]),u.useEffect(()=>{const f=a.toneMapping,g=a.toneMappingExposure,_=a.outputColorSpace;return a.toneMapping=Pe,a.toneMappingExposure=.82,a.outputColorSpace=Ce,()=>{a.toneMapping=f,a.toneMappingExposure=g,a.outputColorSpace=_}},[a]);const L=u.useMemo(()=>$e(),[]),B=u.useMemo(()=>Xe(),[]),V=u.useMemo(()=>Ze(),[]),Y=u.useMemo(()=>new q({map:L,bumpMap:L,bumpScale:.14,color:"#c09a68",roughness:.82,metalness:.02}),[L]),R=u.useMemo(()=>new q({map:B,bumpMap:B,bumpScale:.16,color:"#858078",roughness:.91,metalness:.015}),[B]),$=u.useMemo(()=>new q({map:V,bumpMap:V,bumpScale:.06,color:"#e2d3ad",roughness:.95,metalness:.01}),[V]),b=u.useMemo(()=>[0,Math.PI/2,Math.PI,3*Math.PI/2].map(H=>new J(0+Math.cos(H)*16.4,0,-1.5+Math.sin(H)*9.4)),[]),P=pe({pitchMin:-.85,pitchMax:.85}),E=u.useRef(.08),F=u.useRef(.42),U=u.useRef(62),D=u.useRef(62),A=u.useRef({frames:0,time:0});return u.useEffect(()=>{t.position.set(23,36,43),t.lookAt(1,8.5,-3)},[t]),u.useEffect(()=>{const f=a.domElement;let g=0,_=D.current;const I=S=>{window.matchMedia("(hover: hover) and (pointer: fine)").matches&&(S.preventDefault(),D.current=k.clamp(D.current*Math.exp(S.deltaY*.0012),18,115))},H=S=>Math.hypot(S[0].clientX-S[1].clientX,S[0].clientY-S[1].clientY),K=S=>{S.touches.length===2&&(S.preventDefault(),P.current.dragging=!1,g=Math.max(1,H(S.touches)),_=D.current)},X=S=>{if(S.touches.length!==2||g<=0)return;S.preventDefault(),P.current.dragging=!1;const O=Math.max(1,H(S.touches));D.current=k.clamp(_*(g/O),18,115)},N=S=>{S.touches.length<2&&(g=0)};return f.addEventListener("wheel",I,{passive:!1}),f.addEventListener("touchstart",K,{passive:!1}),f.addEventListener("touchmove",X,{passive:!1}),f.addEventListener("touchend",N),f.addEventListener("touchcancel",N),()=>{f.removeEventListener("wheel",I),f.removeEventListener("touchstart",K),f.removeEventListener("touchmove",X),f.removeEventListener("touchend",N),f.removeEventListener("touchcancel",N)}},[a]),ee((f,g)=>{const _=f.clock.elapsedTime*n,I=T.current;I&&(I.uniforms.uTime.value=_,I.uniforms.uFlowSpeed.value=i,I.uniforms.uRiverWidth.value=c,I.uniforms.uWingFlutter.value=l),E.current=(E.current+Math.min(g,.05)*n*.01)%1;const H=P.current.targetYaw,K=P.current.targetPitch;F.current+=Math.min(g,.05)*n*.018;const X=F.current+H,N=.48+K*.55;U.current=k.damp(U.current,D.current,9,Math.min(g,.05));const S=U.current,O=new J(1,8.5,-3);t.position.set(O.x+Math.sin(X)*Math.cos(N)*S,O.y+Math.sin(N)*S,O.z+Math.cos(X)*Math.cos(N)*S),t.lookAt(O);const me=1-k.smoothstep(E.current,0,.62);A.current.frames+=1,A.current.time+=g,A.current.time>=.5&&(o({fps:Math.round(A.current.frames/A.current.time),zone:me>.5?"TEMPLE COURTYARD":"MOONLIT GARDEN"}),A.current.frames=0,A.current.time=0)}),u.useEffect(()=>{var g;const f=((g=a==null?void 0:a.constructor)==null?void 0:g.name)??"WebGL2";o({gpu:f.includes("WebGPU")?"WebGPU":"WebGL2",cranes:s})},[s]),e.jsxs("group",{children:[e.jsx("ambientLight",{intensity:.008,color:"#b9c8e8"}),e.jsx("hemisphereLight",{color:"#53658f",groundColor:"#08070a",intensity:.008}),e.jsx("directionalLight",{position:[8,10,6],intensity:.05,color:"#7186b8"}),e.jsx("directionalLight",{position:[-58,70,-72],intensity:.22,color:"#9eb7ea",castShadow:!0,"shadow-mapSize-width":x,"shadow-mapSize-height":x,"shadow-camera-left":-44,"shadow-camera-right":44,"shadow-camera-top":44,"shadow-camera-bottom":-44,"shadow-camera-near":20,"shadow-camera-far":170,"shadow-bias":-25e-5,"shadow-normalBias":.025}),e.jsxs("mesh",{position:[-58,70,-72],children:[e.jsx("sphereGeometry",{args:[6.5,40,24]}),e.jsx("meshBasicMaterial",{color:"#d9e3f5",fog:!1,toneMapped:!1})]}),e.jsx(Ge,{radius:105,depth:38,count:900,factor:1.1,saturation:.15,fade:!1,speed:0}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.05,0],receiveShadow:!0,children:[e.jsx("circleGeometry",{args:[40,96]}),e.jsx("primitive",{object:$,attach:"material"})]}),e.jsx(ot,{stoneMaterial:R}),e.jsx(at,{stoneMaterial:R,woodMaterial:Y}),e.jsx(fe,{position:[-10.5,0,9],rotation:[0,.38,0],scale:.68,petalCount:4e4,fallingPetals:600,windIntensity:.7}),Array.from({length:6},(f,g)=>e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[-10.5,.018+g*4e-4,9],receiveShadow:!0,children:[e.jsx("ringGeometry",{args:[2.1+g*.72,2.15+g*.72,80]}),e.jsx("meshStandardMaterial",{color:"#4b5260",roughness:.96})]},`raked-ring-${g}`)),e.jsxs("group",{position:[11.8,0,8.8],children:[e.jsxs("mesh",{position:[0,.42,0],castShadow:!0,receiveShadow:!0,children:[e.jsx("cylinderGeometry",{args:[1.05,1.2,.84,12]}),e.jsx("primitive",{object:R,attach:"material"})]}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.85,0],children:[e.jsx("circleGeometry",{args:[.82,32]}),e.jsx("meshPhysicalMaterial",{color:"#081520",roughness:.24,metalness:.12,clearcoat:1})]})]}),Ne.map((f,g)=>e.jsxs("group",{position:f.position,children:[e.jsxs("mesh",{position:[0,5.1,0],castShadow:!0,receiveShadow:!0,children:[e.jsx("cylinderGeometry",{args:[.32,.7,10.2,10]}),e.jsx("primitive",{object:R,attach:"material"})]}),e.jsxs("mesh",{position:[0,10.35,0],castShadow:!0,children:[e.jsx("cylinderGeometry",{args:[1.15,.52,.65,10]}),e.jsx("primitive",{object:Y,attach:"material"})]}),e.jsxs("mesh",{position:[0,h,0],children:[e.jsx("sphereGeometry",{args:[.72,24,16]}),e.jsx("meshStandardMaterial",{color:"#5a3518",emissive:f.color,emissiveIntensity:.85,roughness:.38})]}),e.jsx("pointLight",{position:[0,h,0],color:f.color,intensity:d,distance:m,decay:p,castShadow:!0,"shadow-mapSize-width":x,"shadow-mapSize-height":x,"shadow-bias":-4e-4}),e.jsx("pointLight",{position:[0,.35,0],color:f.color,intensity:d*.055,distance:18,decay:2})]},`main-lamp-${g}`)),b.map((f,g)=>e.jsx(rt,{position:f,stoneMaterial:R,lampColor:"#ffd9a0"},g)),e.jsx("mesh",{geometry:M,material:C,frustumCulled:!1})]})}function Mt({settings:r={}}){const[o,t]=u.useState({fps:60,gpu:"—",cranes:0,zone:"TEMPLE COURTYARD"}),a=n=>t(s=>({...s,...n}));return e.jsxs("section",{className:"atmosphere river-of-wishes",style:{"--experiment-accent":"#e6c88a"},children:[e.jsxs(de,{camera:{position:[23,36,43],fov:46,near:.1,far:300},speed:r.speed??1,shadows:!0,bloom:{intensity:.8,threshold:.6},children:[e.jsx("color",{attach:"background",args:[ne]}),e.jsx("fogExp2",{attach:"fog",args:[ne,.009]}),e.jsx(st,{settings:r,onStats:a})]}),e.jsxs("div",{className:"experiment-copy river-of-wishes__copy",children:[e.jsx("p",{children:"26 — A river suspended in midair"}),e.jsxs("h1",{children:["The River",e.jsx("br",{}),"of Wishes."]}),e.jsx("span",{children:"Ten thousand patterned paper cranes become a suspended river, flowing through a moonlit stone garden — never colliding, never stopping."})]}),e.jsx("div",{className:"river-of-wishes__legend",children:e.jsxs("div",{children:[e.jsx("i",{children:"↻"}),e.jsxs("div",{children:[e.jsx("b",{children:"Drag"}),e.jsx("span",{children:"Orbit the river"})]})]})}),e.jsx(ve,{eyebrow:"Current position",value:o.zone,stats:[{value:o.cranes.toLocaleString(),label:"CRANES IN THE RIVER"},{value:o.gpu,label:"RENDERER"}]})]})}export{Mt as default};
