import{r as a,j as r}from"./index-CYi0NkA5.js";import{e as L,a as I,u as R,C as k}from"./react-three-fiber.esm-CbgjeIAR.js";import{d as D,w as G,A as N,L as V}from"./index-DaGxOfUq.js";import{u as B}from"./useDragOrbit-B143jKID.js";import{W,a as $}from"./quality-NwpzyrS3.js";import{A as U}from"./AdaptiveDpr-e1LD43K2.js";import{ad as _,C as E,e as Y,V as w,ag as H,S as J,Y as q,ae as K}from"./three.module-Bp2wqY31.js";import{_ as Q}from"./extends-CF3RwP-h.js";import{v as X}from"./constants-CbcjmuZB.js";class Z extends J{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
        uniform float pixelRatio;
        uniform float time;
        attribute float size;  
        attribute float speed;  
        attribute float opacity;
        attribute vec3 noise;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vOpacity;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          modelPosition.y += sin(time * speed + modelPosition.x * noise.x * 100.0) * 0.2;
          modelPosition.z += cos(time * speed + modelPosition.x * noise.y * 100.0) * 0.2;
          modelPosition.x += cos(time * speed + modelPosition.x * noise.z * 100.0) * 0.2;
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPostion = projectionMatrix * viewPosition;
          gl_Position = projectionPostion;
          gl_PointSize = size * 25. * pixelRatio;
          gl_PointSize *= (1.0 / - viewPosition.z);
          vColor = color;
          vOpacity = opacity;
        }
      `,fragmentShader:`
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          gl_FragColor = vec4(vColor, strength * vOpacity);
          #include <tonemapping_fragment>
          #include <${X>=154?"colorspace_fragment":"encodings_fragment"}>
        }
      `})}get time(){return this.uniforms.time.value}set time(t){this.uniforms.time.value=t}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(t){this.uniforms.pixelRatio.value=t}}const C=e=>e&&e.constructor===Float32Array,ee=e=>[e.r,e.g,e.b],F=e=>e instanceof Y||e instanceof w||e instanceof H,z=e=>Array.isArray(e)?e:F(e)?e.toArray():[e,e,e];function j(e,t,i){return a.useMemo(()=>{if(t!==void 0){if(C(t))return t;if(t instanceof E){const s=Array.from({length:e*3},()=>ee(t)).flat();return Float32Array.from(s)}else if(F(t)||Array.isArray(t)){const s=Array.from({length:e*3},()=>z(t)).flat();return Float32Array.from(s)}return Float32Array.from({length:e},()=>t)}return Float32Array.from({length:e},i)},[t])}const te=a.forwardRef(({noise:e=1,count:t=100,speed:i=1,opacity:s=1,scale:n=1,size:f,color:c,children:u,...h},g)=>{a.useMemo(()=>L({SparklesImplMaterial:Z}),[]);const d=a.useRef(null),m=I(b=>b.viewport.dpr),l=z(n),x=a.useMemo(()=>Float32Array.from(Array.from({length:t},()=>l.map(_.randFloatSpread)).flat()),[t,...l]),y=j(t,f,Math.random),o=j(t,s),S=j(t,i),M=j(t*3,e),A=j(c===void 0?t*3:t,C(c)?c:new E(c),()=>1);return R(b=>{d.current&&d.current.material&&(d.current.material.time=b.clock.elapsedTime)}),a.useImperativeHandle(g,()=>d.current,[]),a.createElement("points",Q({key:`particle-${t}-${JSON.stringify(n)}`},h,{ref:d}),a.createElement("bufferGeometry",null,a.createElement("bufferAttribute",{attach:"attributes-position",args:[x,3]}),a.createElement("bufferAttribute",{attach:"attributes-size",args:[y,1]}),a.createElement("bufferAttribute",{attach:"attributes-opacity",args:[o,1]}),a.createElement("bufferAttribute",{attach:"attributes-speed",args:[S,1]}),a.createElement("bufferAttribute",{attach:"attributes-color",args:[A,3]}),a.createElement("bufferAttribute",{attach:"attributes-noise",args:[M,3]})),u||a.createElement("sparklesImplMaterial",{transparent:!0,pixelRatio:m,depthWrite:!1}))}),re=[0,2.4,-14],ae=[0,3.3,13.5];function ie({speed:e=1,impulse:t,orbitFocus:i,orbitPosition:s}){const n=a.useRef(0),f=B(),{focus:c,distance:u,baseYaw:h,basePitch:g}=a.useMemo(()=>{const m=new w(...i),l=new w(...s).sub(m),x=l.length();return{focus:m,distance:x,baseYaw:Math.atan2(l.x,l.z),basePitch:Math.asin(l.y/x)}},[i.join(","),s.join(",")]),d=a.useRef({yaw:h,pitch:g});return R((m,l)=>{const x=Math.min(l,.05)*e;n.current+=x;const y=f.current,o=d.current;o.yaw=_.damp(o.yaw,h+y.targetYaw,3.4,l),o.pitch=_.damp(o.pitch,g+y.targetPitch,3.4,l),m.camera.position.set(c.x+u*Math.sin(o.yaw)*Math.cos(o.pitch),c.y+u*Math.sin(o.pitch),c.z+u*Math.cos(o.yaw)*Math.cos(o.pitch)),m.camera.position.z+=Math.sin(n.current*.18)*.35-t*.28,m.camera.lookAt(c)}),null}function se({World:e,settings:t,accent:i,background:s,impulse:n,actionActive:f,orbitFocus:c,orbitPosition:u}){const h=t.speed??1;return r.jsxs(r.Fragment,{children:[r.jsx("color",{attach:"background",args:[s]}),r.jsx("fogExp2",{attach:"fog",args:[s,.028]}),r.jsx("ambientLight",{intensity:.24,color:i}),r.jsx("directionalLight",{position:[4,10,6],intensity:1.1,color:"#fff1d3"}),r.jsx("pointLight",{position:[-6,4,3],intensity:22,distance:32,color:i}),r.jsx(ie,{speed:h,impulse:n,orbitFocus:c,orbitPosition:u}),r.jsx(e,{settings:t,accent:i,impulse:n,actionActive:f}),r.jsxs(D,{multisampling:$,children:[r.jsx(G,{mipmapBlur:!0,intensity:1.3,luminanceThreshold:.18,luminanceSmoothing:.45}),r.jsx(N,{opacity:.018,premultiply:!0}),r.jsx(V,{})]}),r.jsx(U,{})]})}function he({scene:e,World:t,settings:i={},eyebrow:s,title:n,description:f,cta:c="Enter the experience",accent:u="#8fdcff",background:h="#020407",align:g="left",foreground:d=null,wheelInteraction:m=!1,action:l=null,camera:x=null,orbitFocus:y=re,orbitPosition:o=ae}){const[S,M]=a.useState(0),[A,b]=a.useState(!1),P=a.useRef(),T=(p=1)=>{M(v=>_.clamp(v+p*5,-10,10)),window.clearTimeout(P.current),P.current=window.setTimeout(()=>M(0),900)},O=p=>{const v=Math.sign(p.deltaY);v&&T(v)};return r.jsxs("section",{className:`atmosphere gpu-experience gpu-experience--${e} gpu-experience--${g} ${A?"is-action-active":""}`,style:{"--gpu-accent":u},onWheel:m?O:void 0,children:[r.jsx(k,{className:"gpu-experience__canvas",dpr:W,camera:{fov:52,near:.1,far:260,position:o,...x},gl:{antialias:!0,alpha:!1,powerPreference:"high-performance"},onCreated:({gl:p})=>{p.outputColorSpace=q,p.toneMapping=K,p.toneMappingExposure=1.15},children:r.jsx(a.Suspense,{fallback:null,children:r.jsx(se,{World:t,settings:i,accent:u,background:h,impulse:S,actionActive:A,orbitFocus:y,orbitPosition:o})})}),r.jsx("div",{className:"gpu-experience__veil","aria-hidden":"true"}),r.jsxs("div",{className:"experiment-copy gpu-experience__copy",children:[r.jsx("p",{children:s}),r.jsx("h1",{children:n.split(`
`).map((p,v)=>r.jsxs("span",{children:[p,v<n.split(`
`).length-1&&r.jsx("br",{})]},p))}),r.jsx("span",{children:f}),l&&!A&&r.jsxs("button",{type:"button",onClick:()=>b(!0),children:[c,r.jsx("i",{"aria-hidden":"true",children:"→"})]})]}),d,r.jsxs("div",{className:"gpu-experience__status","aria-hidden":"true",children:[r.jsx("i",{}),"GPU procedural · drag to orbit"]})]})}const xe=e=>Array.from({length:e},(t,i)=>i);function ge({count:e=180,scale:t=[30,18,80],color:i="#ffffff",size:s=1.2,speed:n=.18,opacity:f=.75}){return r.jsx(te,{count:e,scale:t,color:i,size:s,speed:n,opacity:f,noise:1.2})}export{ge as D,he as G,te as S,xe as r};
