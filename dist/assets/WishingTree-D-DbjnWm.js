import{r as l,j as c}from"./index-BtkcIGRz.js";import{m as Fe}from"./BufferGeometryUtils-CfLCGRKU.js";import{C as je,u as fe}from"./CanvasStage-X_W5ITfO.js";import{u as Pe}from"./useDragOrbit-rMe6eJgF.js";import{u as Be}from"./usePinchZoom-CvZqH_Yq.js";import{A as De}from"./AnimationReadout-FizoAjMN.js";import{s as o}from"./procedural-DZUg-xN7.js";import{a as ze,u as ue}from"./react-three-fiber.esm-Dfcz46hD.js";import{ad as I,C as j,aa as O,D as de,a3 as me,a9 as he,ai as Z,aD as U,V as C,a7 as Ie,a5 as F,aF as pe,aG as q}from"./three.module-Ct-yBmsu.js";import"./index-Cu8phv_f.js";import"./quality-NEVBGrgs.js";import"./dragOrbit-BWBT6NeL.js";const le=1e6;new me;function ge(){const r=new Float32Array([0,0,0,-.42,.03,.5,-.16,.09,.97,0,.12,1.08,.16,.09,.97,.42,.03,.5]),i=[0,1,2,0,2,3,0,3,4,0,4,5],e=new he;return e.setAttribute("position",new Z(r,3)),e.setIndex(i),e.scale(.034,.034,.034),e.computeVertexNormals(),e}const ce=15,ie=10,Ee=5,Oe=15;function we(){const r={curve:new U(new C(0,0,0),new C(.3,6,-.15),new C(-.1,12,.1)),baseRadius:.2,tipRadius:.13,canopyWeight:0,generation:0},i=[];for(let a=0;a<ce;a+=1){const h=a/ce*Math.PI*2+o(a,101)*.5,n=I.degToRad(28+o(a,102)*26),u=3.6+o(a,103)*7.2,g=.55+o(a,108)*.4,m=r.curve.getPoint(g),p=m.clone().add(new C(Math.cos(h)*u*.4,Math.sin(n)*u*.5,Math.sin(h)*u*.4)),x=m.clone().add(new C(Math.cos(h+o(a,105)*.25)*u*.92,Math.sin(n)*u*.95+o(a,106)*.5,Math.sin(h+o(a,105)*.25)*u*.92));i.push({curve:new U(m,p,x),baseRadius:.067+o(a,107)*.02,tipRadius:.027,canopyWeight:1,generation:1})}const e=[];i.forEach((a,h)=>{for(let n=0;n<ie;n+=1){const u=h*ie+n,g=.38+o(u,301)*.42,m=a.curve.getPoint(g),p=a.curve.getTangent(g).normalize(),x=o(u,302)*Math.PI*2,w=new C(Math.cos(x),.35+o(u,303)*.5,Math.sin(x)),b=w.addScaledVector(p,-w.dot(p)).normalize(),s=1.5+o(u,304)*5.85,y=m.clone().addScaledVector(p,s*.3).addScaledVector(b,s*.42),M=m.clone().addScaledVector(p,s*.55).addScaledVector(b,s*.95).add(new C(0,o(u,305)*.6,0));e.push({curve:new U(m,y,M),baseRadius:.02+o(u,306)*.01,tipRadius:.007,canopyWeight:2,generation:2})}});function f(a,h,n){const u=[];return a.forEach((g,m)=>{for(let p=0;p<h;p+=1){const w=m*h+p+n.seedOffset,b=n.startMin+o(w,701)*(n.startMax-n.startMin),s=g.curve.getPoint(b),y=g.curve.getTangent(b).normalize(),M=o(w,702)*Math.PI*2,T=new C(Math.cos(M),n.upwardBias+o(w,703)*.45,Math.sin(M)),v=T.addScaledVector(y,-T.dot(y)).normalize(),A=n.lengthMin+o(w,704)*(n.lengthMax-n.lengthMin),L=s.clone().addScaledVector(y,A*.36).addScaledVector(v,A*.28),V=s.clone().addScaledVector(y,A*.68).addScaledVector(v,A*.72).add(new C(0,o(w,705)*n.lift,0));u.push({curve:new U(s,L,V),baseRadius:n.baseRadiusMin+o(w,706)*n.baseRadiusVariation,tipRadius:n.tipRadius,canopyWeight:n.canopyWeight,generation:n.generation})}}),u}const t=f(e,Ee,{seedOffset:2e4,startMin:.42,startMax:.9,upwardBias:.24,lengthMin:.8,lengthMax:2.5,lift:.38,baseRadiusMin:.006,baseRadiusVariation:.003,tipRadius:.0024,canopyWeight:6,generation:3}),d=f(t,Oe,{seedOffset:5e4,startMin:.5,startMax:.94,upwardBias:.18,lengthMin:.38,lengthMax:1.25,lift:.2,baseRadiusMin:.0022,baseRadiusVariation:.0012,tipRadius:7e-4,canopyWeight:16,generation:4});return{trunk:r,woody:[r,...i,...e,...t,...d],canopyBranches:[...i,...e,...t,...d]}}function Y(r,i=22,e=10){const f=r.curve.computeFrenetFrames(i,!1),t=[],d=[],a=[];for(let u=0;u<=i;u+=1){const g=u/i,m=r.curve.getPoint(g),p=I.lerp(r.baseRadius,r.tipRadius,g),x=f.normals[u],w=f.binormals[u];for(let b=0;b<=e;b+=1){const s=b/e*Math.PI*2,y=Math.cos(s),M=Math.sin(s),T=x.x*y+w.x*M,v=x.y*y+w.y*M,A=x.z*y+w.z*M;t.push(m.x+T*p,m.y+v*p,m.z+A*p),d.push(T,v,A)}}const h=e+1;for(let u=0;u<i;u+=1)for(let g=0;g<e;g+=1){const m=u*h+g,p=m+h,x=m+1,w=p+1;a.push(m,p,x,p,w,x)}const n=new he;return n.setAttribute("position",new Z(t,3)),n.setAttribute("normal",new Z(d,3)),n.setIndex(a),n}function xe(r){const i=r.map(f=>f.generation>=4?Y(f,7,5):f.generation===3?Y(f,10,6):f.generation===2?Y(f,14,7):Y(f,22,10)),e=Fe(i);return i.forEach(f=>f.dispose()),e}function ye(r,i){const e=[];r.forEach(t=>{for(let d=0;d<t.canopyWeight;d+=1)e.push(t)});const f=new Array(i);for(let t=0;t<i;t+=1){const d=e[Math.floor(o(t,201)*e.length)%e.length],h=.32+Math.pow(o(t,202),.55)*.68,n=d.curve.getPoint(h),u=d.curve.getTangent(h).normalize(),g=new C(o(t,203)-.5,o(t,204)*.6,o(t,205)-.5),m=g.sub(u.clone().multiplyScalar(g.dot(u))).normalize(),p=.15+o(t,206)*.55,x=n.clone().addScaledVector(m,p).addScaledVector(u,(o(t,207)-.5)*.3),w=m.lengthSq()>1e-4?m:new C(0,1,0);f[t]={position:x,normal:w}}return f}function Se(){const i=document.createElement("canvas");i.width=256,i.height=256;const e=i.getContext("2d");e.fillStyle="#3a2c22",e.fillRect(0,0,256,256);for(let t=0;t<120;t+=1){const d=o(t,301)*256;e.strokeStyle=`rgba(20, 14, 10, ${.15+o(t,302)*.25})`,e.lineWidth=1+o(t,303)*3,e.beginPath(),e.moveTo(d,0);let a=0;for(;a<256;)a+=8+o(t+a,304)*10,e.lineTo(d+Math.sin(a*.05+t)*6,a);e.stroke()}const f=new pe(i);return f.wrapS=q,f.wrapT=q,f.repeat.set(1,3),f}function Le(){const i=document.createElement("canvas");i.width=512,i.height=512;const e=i.getContext("2d");e.fillStyle="#8f8577",e.fillRect(0,0,512,512);const f=512/2,t=512/2;for(let a=0;a<40;a+=1){const h=14+a*11+o(a,401)*3;if(h>512*.72)break;e.strokeStyle=`rgba(60, 54, 46, ${.1+o(a,402)*.12})`,e.lineWidth=1.4+o(a,403)*2,e.beginPath(),e.arc(f,t,h,o(a,404)*.6,Math.PI*2-o(a,405)*.6),e.stroke()}for(let a=0;a<400;a+=1){const h=o(a,406)*512,n=o(a,407)*512;e.fillStyle=`rgba(50, 46, 40, ${.08+o(a,408)*.12})`,e.beginPath(),e.arc(h,n,.8+o(a,409)*1.6,0,Math.PI*2),e.fill()}const d=new pe(i);return d.wrapS=q,d.wrapT=q,d}function Me(r,{windIntensity:i,fallingPetalCount:e,seasonColorA:f,seasonColorB:t}){r.uniforms.uTime={value:0},r.uniforms.uWindIntensity={value:i},r.uniforms.uFallingPetalCount={value:e},r.uniforms.uSeasonColorA={value:f},r.uniforms.uSeasonColorB={value:t},r.vertexShader=r.vertexShader.replace("#include <common>",`
      attribute vec3 aBranchPos;
      attribute vec3 aBranchNormal;
      attribute float aCycleSeed;
      attribute float aCycleStart;
      attribute float aGrowDur;
      attribute float aBreatheDur;
      attribute float aDieDur;
      attribute float aDormantDur;
      attribute float aColorSeed;
      attribute float aScaleVar;
      attribute float aFallIndex;

      uniform float uTime;
      uniform float uWindIntensity;
      uniform float uFallingPetalCount;

      varying float vColorSeedV;
      varying float vScaleV;

      vec3 leafRotateAroundAxis(vec3 p, vec3 axis, float angle) {
        return p * cos(angle) + cross(axis, p) * sin(angle) + axis * dot(axis, p) * (1.0 - cos(angle));
      }
      #include <common>
      `).replace("#include <beginnormal_vertex>",`
      float leafCycleLen = aGrowDur + aBreatheDur + aDieDur + aDormantDur;
      float leafT = mod(uTime - aCycleStart, leafCycleLen);
      float leafScale = 0.0;
      float leafOpenT = 0.0;
      vec3 leafFallOffset = vec3(0.0);
      float leafFallSpin = 0.0;
      if (leafT < aGrowDur) {
        float growT = leafT / max(0.001, aGrowDur);
        leafScale = growT * growT * (3.0 - 2.0 * growT);
        leafOpenT = leafScale;
      } else if (leafT < aGrowDur + aBreatheDur) {
        leafOpenT = 1.0;
        leafScale = 1.0;
      } else if (leafT < aGrowDur + aBreatheDur + aDieDur) {
        leafOpenT = 1.0;
        float dieT = (leafT - aGrowDur - aBreatheDur) / max(0.001, aDieDur);
        leafScale = 1.0 - smoothstep(0.9, 1.0, dieT);
        float wind = max(0.3, uWindIntensity);
        float fallDistance = max(0.0, aBranchPos.y - 0.05);
        leafFallOffset = vec3(
          sin(aCycleSeed * 12.1) * dieT * 1.5 * wind,
          -fallDistance * dieT * dieT,
          cos(aCycleSeed * 8.7) * dieT * 1.5 * wind
        );
        leafFallSpin = dieT * 7.0;
      } else {
        leafScale = 0.0;
      }

      if (aFallIndex < uFallingPetalCount) {
        float controlledFallT = fract(uTime / 6.0 + aCycleSeed);
        float wind = max(0.3, uWindIntensity);
        float fallDistance = max(0.0, aBranchPos.y - 0.05);
        leafScale = 1.0 - smoothstep(0.9, 1.0, controlledFallT);
        leafOpenT = 1.0;
        leafFallOffset = vec3(
          sin(aCycleSeed * 12.1) * controlledFallT * 1.5 * wind,
          -fallDistance * controlledFallT * controlledFallT,
          cos(aCycleSeed * 8.7) * controlledFallT * 1.5 * wind
        );
        leafFallSpin = controlledFallT * 7.0;
      } else {
        leafScale = 1.0;
        leafOpenT = 1.0;
        leafFallOffset = vec3(0.0);
        leafFallSpin = 0.0;
      }

      vec3 leafLocalPos = position;
      vec3 leafLocalNormal = normal;
      float leafClosedAngle = mix(1.35, 0.0, leafOpenT);
      leafLocalPos = leafRotateAroundAxis(leafLocalPos, vec3(1.0, 0.0, 0.0), leafClosedAngle);
      leafLocalNormal = leafRotateAroundAxis(leafLocalNormal, vec3(1.0, 0.0, 0.0), leafClosedAngle);
      leafLocalPos = leafRotateAroundAxis(leafLocalPos, vec3(0.3, 1.0, 0.2), leafFallSpin);
      leafLocalNormal = leafRotateAroundAxis(leafLocalNormal, vec3(0.3, 1.0, 0.2), leafFallSpin);
      leafLocalPos *= leafScale * aScaleVar;

      vec3 leafUp = vec3(0.0, 1.0, 0.0);
      vec3 leafOutward = vec3(aBranchNormal.x, 0.0, aBranchNormal.z);
      vec3 leafFwd = (dot(leafOutward, leafOutward) > 0.0001) ? normalize(leafOutward) : vec3(1.0, 0.0, 0.0);
      vec3 leafRight = normalize(cross(leafUp, leafFwd));
      leafFwd = normalize(cross(leafRight, leafUp));
      float leafYaw = aCycleSeed * 6.2831;
      float leafCy = cos(leafYaw);
      float leafSy = sin(leafYaw);
      vec3 leafRotFwd = leafFwd * leafCy + leafRight * leafSy;
      vec3 leafRotRight = leafRight * leafCy - leafFwd * leafSy;
      float leafRollSeed = fract(aCycleSeed * 17.23 + 0.41);
      float leafRoll = leafRollSeed * 6.2831;
      vec3 leafTiltUp = leafRotateAroundAxis(leafUp, leafRotFwd, leafRoll);
      vec3 leafTiltRight = leafRotateAroundAxis(leafRotRight, leafRotFwd, leafRoll);
      vec3 leafWorldOffset = leafTiltRight * leafLocalPos.x + leafTiltUp * leafLocalPos.y + leafRotFwd * leafLocalPos.z + leafFallOffset;
      vec3 leafWorldPos = aBranchPos + leafWorldOffset;
      vec3 objectNormal = normalize(leafTiltRight * leafLocalNormal.x + leafTiltUp * leafLocalNormal.y + leafRotFwd * leafLocalNormal.z);
      `).replace("#include <begin_vertex>",`
      #include <begin_vertex>
      transformed = leafWorldPos;
      vColorSeedV = aColorSeed;
      vScaleV = leafScale;
      `),r.fragmentShader=r.fragmentShader.replace("#include <common>",`
      uniform vec3 uSeasonColorA;
      uniform vec3 uSeasonColorB;
      varying float vColorSeedV;
      varying float vScaleV;
      #include <common>
      `).replace("#include <color_fragment>",`
      if (vScaleV <= 0.004) discard;
      #include <color_fragment>
      vec3 leafColor = mix(uSeasonColorA, uSeasonColorB, fract(vColorSeedV * 3.7));
      diffuseColor.rgb = leafColor;
      `)}function ve(r,i,e,f){const t=new Ie;t.index=r.index,t.attributes.position=r.attributes.position,t.attributes.normal=r.attributes.normal;const d=new Float32Array(e*3),a=new Float32Array(e*3),h=new Float32Array(e),n=new Float32Array(e),u=new Float32Array(e),g=new Float32Array(e),m=new Float32Array(e),p=new Float32Array(e),x=new Float32Array(e),w=new Float32Array(e),b=new Float32Array(e);for(let s=0;s<e;s+=1){const y=i[s];d[s*3]=y.position.x,d[s*3+1]=y.position.y,d[s*3+2]=y.position.z,a[s*3]=y.normal.x,a[s*3+1]=y.normal.y,a[s*3+2]=y.normal.z,h[s]=o(s,601);const M=(3.9+o(s,602)*7.2)/f,T=27*(.6+o(s,603)*.8),v=6,A=2.4+o(s,604)*6.6;u[s]=M,g[s]=T,m[s]=v,p[s]=A,n[s]=o(s,605)*(M+T+v+A),x[s]=o(s,606),w[s]=2.4+o(s,607)*.04,b[s]=s}return t.setAttribute("aBranchPos",new F(d,3)),t.setAttribute("aBranchNormal",new F(a,3)),t.setAttribute("aCycleSeed",new F(h,1)),t.setAttribute("aCycleStart",new F(n,1)),t.setAttribute("aGrowDur",new F(u,1)),t.setAttribute("aBreatheDur",new F(g,1)),t.setAttribute("aDieDur",new F(m,1)),t.setAttribute("aDormantDur",new F(p,1)),t.setAttribute("aFallIndex",new F(b,1)),t.setAttribute("aColorSeed",new F(x,1)),t.setAttribute("aScaleVar",new F(w,1)),t.instanceCount=e,t}function Je({position:r=[0,0,0],rotation:i=[0,0,0],scale:e=1,petalCount:f=14e3,fallingPetals:t=180,windIntensity:d=.65}){const a=fe(),h=l.useMemo(()=>ge(),[]),{woody:n,canopyBranches:u}=l.useMemo(()=>we(),[]),g=l.useMemo(()=>ye(u,f),[u,f]),m=l.useMemo(()=>ve(h,g,f,1),[h,g,f]),p=l.useMemo(()=>xe(n),[n]),x=l.useMemo(()=>Se(),[]),w=l.useMemo(()=>new O({map:x,bumpMap:x,bumpScale:.13,color:"#806758",roughness:.93,metalness:.01}),[x]),b=l.useMemo(()=>new j("#f3a8c4"),[]),s=l.useMemo(()=>new j("#b93268"),[]),y=l.useRef(null),M=l.useMemo(()=>{const T=new O({color:"#ffffff",roughness:.55,metalness:.02,side:de});return T.onBeforeCompile=v=>{Me(v,{windIntensity:d,fallingPetalCount:t,seasonColorA:b,seasonColorB:s}),y.current=v},T},[b,s,t,d]);return ue(T=>{const v=y.current;v&&(v.uniforms.uTime.value=T.clock.elapsedTime*a,v.uniforms.uWindIntensity.value=d,v.uniforms.uFallingPetalCount.value=t)}),l.useEffect(()=>()=>{h.dispose(),m.dispose(),p.dispose(),x.dispose(),w.dispose(),M.dispose()},[h,m,p,x,w,M]),c.jsxs("group",{position:r,rotation:i,scale:e,children:[c.jsx("mesh",{geometry:p,material:w,castShadow:!0,receiveShadow:!0}),c.jsx("mesh",{geometry:m,material:M,frustumCulled:!1})]})}const B=[{sky:"#3a1f2c",fogColor:"#3a1f2c",colorA:"#f7c6d9",colorB:"#e895b3",ground:"#7fa06a"},{sky:"#3a1428",fogColor:"#3a1428",colorA:"#e8547a",colorB:"#b81f4a",ground:"#4f8a4a"},{sky:"#3a2110",fogColor:"#3a2110",colorA:"#e8a05c",colorB:"#a8481f",ground:"#8a6a34"},{sky:"#141c28",fogColor:"#141c28",colorA:"#f5f0ea",colorB:"#c8d4e0",ground:"#8a94a0"}];function Ve({settings:r,onStats:i,treePlacements:e=[{x:0,z:0,rotation:0,scale:1}],defaultCameraDistance:f=32,maxCameraDistance:t=68}){const{camera:d,gl:a}=ze(),h=fe(),n=Math.round(I.clamp(r.petalCount??6e4,2e3,le)),u=r.seasonSpeed??1,g=(r.windIntensity??100)/100,m=Math.round(I.clamp(r.flightFrequency??1e3,0,n)),p=l.useMemo(()=>ge(),[]),{woody:x,canopyBranches:w}=l.useMemo(()=>we(),[]),b=l.useMemo(()=>ye(w,le),[w]),s=l.useMemo(()=>b.slice(0,n),[b,n]),y=l.useMemo(()=>ve(p,s,n,1),[p,s,n]),M=l.useMemo(()=>new j(B[0].colorA),[]),T=l.useMemo(()=>new j(B[0].colorB),[]),v=l.useRef(null),A=l.useMemo(()=>{const S=new O({color:"#ffffff",roughness:.55,metalness:.02,side:de});return S.onBeforeCompile=R=>{Me(R,{windIntensity:g,fallingPetalCount:m,seasonColorA:M,seasonColorB:T}),v.current=R},S},[M,T,g,m]);l.useEffect(()=>()=>{y.dispose()},[y]),l.useEffect(()=>()=>{A.dispose()},[A]);const L=l.useMemo(()=>Se(),[]),V=l.useMemo(()=>Le(),[]),be=l.useMemo(()=>new O({map:L,color:"#a9917c",roughness:.86,metalness:.05}),[L]),Re=l.useMemo(()=>new O({map:V,color:"#ffffff",roughness:.92,metalness:.02}),[V]),$=l.useMemo(()=>xe(x),[x]);l.useEffect(()=>()=>{$.dispose()},[$]);const J=l.useRef(),D=l.useMemo(()=>new me,[]);l.useEffect(()=>{const S=J.current;S&&(e.forEach((R,z)=>{D.position.set(R.x,0,R.z),D.rotation.set(0,R.rotation,0),D.scale.setScalar(R.scale),D.updateMatrix(),S.setMatrixAt(z,D.matrix)}),S.instanceMatrix.needsUpdate=!0)},[e,D]);const K=Pe({pitchMin:-.85,pitchMax:.85}),ee=l.useRef(.4),Q=l.useRef(f),te=l.useRef(f),Te=l.useRef({value:0}),P=l.useRef({frames:0,time:0});return l.useEffect(()=>{d.position.set(0,18,52),d.lookAt(0,17,0)},[d]),Be({targetDistanceRef:te,min:15,max:t}),ue((S,R)=>{const z=S.clock.elapsedTime*h,G=v.current;G&&(G.uniforms.uTime.value=z,G.uniforms.uWindIntensity.value=g,G.uniforms.uFallingPetalCount.value=m);const ae=200/Math.max(.05,u),oe=z%ae/ae*B.length,N=Math.floor(oe)%B.length,ne=(N+1)%B.length,E=I.smoothstep(oe-N,.55,1),W=B[N],k=B[ne];M.set(W.colorA).lerp(new j(k.colorA),E),T.set(W.colorB).lerp(new j(k.colorB),E);const Ae=new j(W.sky).lerp(new j(k.sky),E),Ce=new j(W.fogColor).lerp(new j(k.fogColor),E);S.scene.background=Ae,S.scene.fog&&S.scene.fog.color.copy(Ce);const se=E>.5?ne:N;Te.current.value=se,ee.current+=Math.min(R,.05)*.015*h;const re=ee.current+K.current.targetYaw,H=.18+K.current.targetPitch;Q.current=I.damp(Q.current,te.current,9,Math.min(R,.05));const X=Q.current,_=new C(0,12,0);d.position.set(_.x+Math.sin(re)*Math.cos(H)*X,_.y+Math.sin(H)*X*.55,_.z+Math.cos(re)*Math.cos(H)*X),d.lookAt(_),P.current.frames+=1,P.current.time+=R,P.current.time>=.5&&(i({fps:Math.round(P.current.frames/P.current.time),season:["SPRING","SUMMER","AUTUMN","WINTER"][se]}),P.current.frames=0,P.current.time=0)}),l.useEffect(()=>{var R;const S=((R=a==null?void 0:a.constructor)==null?void 0:R.name)??"WebGL2";i({gpu:S.includes("WebGPU")?"WebGPU":"WebGL2",petals:n,totalPetals:n*e.length,trees:e.length})},[n,e.length]),c.jsxs("group",{children:[c.jsx("ambientLight",{intensity:.14,color:"#f4e6d4"}),c.jsx("hemisphereLight",{color:"#e8ddc8",groundColor:"#3a3226",intensity:.16}),c.jsx("directionalLight",{position:[6,12,4],intensity:.5,color:"#fff2d8"}),c.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.02,0],receiveShadow:!0,children:[c.jsx("circleGeometry",{args:[32,64]}),c.jsx("primitive",{object:Re,attach:"material"})]}),c.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.01,0],children:[c.jsx("ringGeometry",{args:[30.8,31.8,64]}),c.jsx("meshStandardMaterial",{color:"#5c534a",roughness:.7})]}),[[-6.2,5.5],[6.2,5.5],[-6.2,-5.5],[6.2,-5.5]].map(([S,R],z)=>c.jsxs("group",{position:[S,0,R],children:[c.jsxs("mesh",{position:[0,.65,0],children:[c.jsx("cylinderGeometry",{args:[.14,.16,1.3,6]}),c.jsx("meshStandardMaterial",{color:"#4a473e",roughness:.8})]}),c.jsxs("mesh",{position:[0,1.4,0],children:[c.jsx("boxGeometry",{args:[.42,.32,.42]}),c.jsx("meshStandardMaterial",{color:"#3d3a32",roughness:.75})]}),c.jsx("pointLight",{position:[0,1.45,0],intensity:2.2,distance:5,color:"#ffb066"})]},z)),c.jsx("instancedMesh",{ref:J,args:[$,be,e.length],frustumCulled:!1}),e.map((S,R)=>c.jsx("group",{position:[S.x,0,S.z],rotation:[0,S.rotation,0],scale:S.scale,children:c.jsx("mesh",{geometry:y,material:A,frustumCulled:!1})},R))]})}function Ke({settings:r={}}){const[i,e]=l.useState({fps:60,gpu:"—",petals:0,season:"SPRING"}),f=t=>e(d=>({...d,...t}));return c.jsxs("section",{className:"atmosphere wishing-tree",style:{"--experiment-accent":"#ffb7c5"},children:[c.jsxs(je,{camera:{position:[0,18,52],fov:45,near:.1,far:130},speed:r.speed??1,bloom:{intensity:.85,threshold:.62},children:[c.jsx("fogExp2",{attach:"fog",args:["#f0ccd6",.012]}),c.jsx(Ve,{settings:r,onStats:f})]}),c.jsxs("div",{className:"experiment-copy wishing-tree__copy",children:[c.jsx("p",{children:"02 — Ten thousand blossoms, one wish each"}),c.jsxs("h1",{children:["The Wishing",c.jsx("br",{}),"Tree."]}),c.jsx("span",{children:"An ancient tree bears tiny blossoms instead of leaves — each one buds, breathes, and eventually falls away on the wind, while another quietly opens elsewhere on the branch. The seasons turn slowly around it, and it never stops renewing."})]}),c.jsx("div",{className:"wishing-tree__legend",children:c.jsxs("div",{children:[c.jsx("i",{children:"↻"}),c.jsxs("div",{children:[c.jsx("b",{children:"Drag"}),c.jsx("span",{children:"Orbit around the tree"})]})]})}),c.jsx(De,{eyebrow:"Grove census",value:i.season,stats:[{value:i.petals.toLocaleString(),label:"BLOSSOMS ON THE TREE"}]})]})}export{Ve as TreeScene,Je as WishingTreeModel,Ke as default};
