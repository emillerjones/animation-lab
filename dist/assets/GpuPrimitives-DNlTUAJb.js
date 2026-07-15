import{r as i,j as r}from"./index-CosZb3Od.js";import{e as k,a as L,u as F,C as G}from"./react-three-fiber.esm-BovCZByZ.js";import{d as N,w as W,A as D,L as V}from"./index-WnOFjV2G.js";import{u as $}from"./useDragOrbit-C4fZJsqC.js";import{W as Y,a as U}from"./quality-0NdDoxfE.js";import{A as H}from"./AdaptiveDpr-BE59OZvq.js";import{a3 as _,C as O,e as J,V as w,a6 as q,S as K,Y as Q,a4 as X}from"./three.module-N0EvyCvs.js";import{_ as Z}from"./extends-CF3RwP-h.js";import{v as ee}from"./constants-4rOapwgY.js";class te extends K{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
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
          #include <${ee>=154?"colorspace_fragment":"encodings_fragment"}>
        }
      `})}get time(){return this.uniforms.time.value}set time(t){this.uniforms.time.value=t}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(t){this.uniforms.pixelRatio.value=t}}const z=e=>e&&e.constructor===Float32Array,re=e=>[e.r,e.g,e.b],I=e=>e instanceof J||e instanceof w||e instanceof q,B=e=>Array.isArray(e)?e:I(e)?e.toArray():[e,e,e];function g(e,t,a){return i.useMemo(()=>{if(t!==void 0){if(z(t))return t;if(t instanceof O){const s=Array.from({length:e*3},()=>re(t)).flat();return Float32Array.from(s)}else if(I(t)||Array.isArray(t)){const s=Array.from({length:e*3},()=>B(t)).flat();return Float32Array.from(s)}return Float32Array.from({length:e},()=>t)}return Float32Array.from({length:e},a)},[t])}const ie=i.forwardRef(({noise:e=1,count:t=100,speed:a=1,opacity:s=1,scale:n=1,size:l,color:c,children:p,...f},o)=>{i.useMemo(()=>k({SparklesImplMaterial:te}),[]);const m=i.useRef(null),M=L(x=>x.viewport.dpr),v=B(n),R=i.useMemo(()=>Float32Array.from(Array.from({length:t},()=>v.map(_.randFloatSpread)).flat()),[t,...v]),A=g(t,l,Math.random),h=g(t,s),P=g(t,a),b=g(t*3,e),E=g(c===void 0?t*3:t,z(c)?c:new O(c),()=>1);return F(x=>{m.current&&m.current.material&&(m.current.material.time=x.clock.elapsedTime)}),i.useImperativeHandle(o,()=>m.current,[]),i.createElement("points",Z({key:`particle-${t}-${JSON.stringify(n)}`},f,{ref:m}),i.createElement("bufferGeometry",null,i.createElement("bufferAttribute",{attach:"attributes-position",args:[R,3]}),i.createElement("bufferAttribute",{attach:"attributes-size",args:[A,1]}),i.createElement("bufferAttribute",{attach:"attributes-opacity",args:[h,1]}),i.createElement("bufferAttribute",{attach:"attributes-speed",args:[P,1]}),i.createElement("bufferAttribute",{attach:"attributes-color",args:[E,3]}),i.createElement("bufferAttribute",{attach:"attributes-noise",args:[b,3]})),p||i.createElement("sparklesImplMaterial",{transparent:!0,pixelRatio:M,depthWrite:!1}))}),y=new w(0,2.4,-14),S=new w(0,3.3,13.5).sub(y),j=S.length(),C=Math.atan2(S.x,S.z),T=Math.asin(S.y/j);function ae({speed:e=1,impulse:t}){const a=i.useRef(0),s=$(),n=i.useRef({yaw:C,pitch:T});return F((l,c)=>{const p=Math.min(c,.05)*e;a.current+=p;const f=s.current,o=n.current;o.yaw=_.damp(o.yaw,C+f.targetYaw,3.4,c),o.pitch=_.damp(o.pitch,T+f.targetPitch,3.4,c),l.camera.position.set(y.x+j*Math.sin(o.yaw)*Math.cos(o.pitch),y.y+j*Math.sin(o.pitch),y.z+j*Math.cos(o.yaw)*Math.cos(o.pitch)),l.camera.position.z+=Math.sin(a.current*.18)*.35-t*.28,l.camera.lookAt(y)}),null}function se({World:e,settings:t,accent:a,background:s,impulse:n,actionActive:l}){const c=t.speed??1;return r.jsxs(r.Fragment,{children:[r.jsx("color",{attach:"background",args:[s]}),r.jsx("fogExp2",{attach:"fog",args:[s,.028]}),r.jsx("ambientLight",{intensity:.24,color:a}),r.jsx("directionalLight",{position:[4,10,6],intensity:1.1,color:"#fff1d3"}),r.jsx("pointLight",{position:[-6,4,3],intensity:22,distance:32,color:a}),r.jsx(ae,{speed:c,impulse:n}),r.jsx(e,{settings:t,accent:a,impulse:n,actionActive:l}),r.jsxs(N,{multisampling:U,children:[r.jsx(W,{mipmapBlur:!0,intensity:1.3,luminanceThreshold:.18,luminanceSmoothing:.45}),r.jsx(D,{opacity:.018,premultiply:!0}),r.jsx(V,{})]}),r.jsx(H,{})]})}function he({scene:e,World:t,settings:a={},eyebrow:s,title:n,description:l,cta:c="Enter the experience",accent:p="#8fdcff",background:f="#020407",align:o="left",foreground:m=null,wheelInteraction:M=!1,action:v=null}){const[R,A]=i.useState(0),[h,P]=i.useState(!1),b=i.useRef(),E=(u=1)=>{A(d=>_.clamp(d+u*5,-10,10)),window.clearTimeout(b.current),b.current=window.setTimeout(()=>A(0),900)},x=u=>{const d=Math.sign(u.deltaY);d&&E(d)};return r.jsxs("section",{className:`atmosphere gpu-experience gpu-experience--${e} gpu-experience--${o} ${h?"is-action-active":""}`,style:{"--gpu-accent":p},onWheel:M?x:void 0,children:[r.jsx(G,{className:"gpu-experience__canvas",dpr:Y,camera:{fov:52,near:.1,far:260,position:[0,3.3,13.5]},gl:{antialias:!0,alpha:!1,powerPreference:"high-performance"},onCreated:({gl:u})=>{u.outputColorSpace=Q,u.toneMapping=X,u.toneMappingExposure=1.15},children:r.jsx(i.Suspense,{fallback:null,children:r.jsx(se,{World:t,settings:a,accent:p,background:f,impulse:R,actionActive:h})})}),r.jsx("div",{className:"gpu-experience__veil","aria-hidden":"true"}),r.jsxs("div",{className:"experiment-copy gpu-experience__copy",children:[r.jsx("p",{children:s}),r.jsx("h1",{children:n.split(`
`).map((u,d)=>r.jsxs("span",{children:[u,d<n.split(`
`).length-1&&r.jsx("br",{})]},u))}),r.jsx("span",{children:l}),v&&!h&&r.jsxs("button",{type:"button",onClick:()=>P(!0),children:[c,r.jsx("i",{"aria-hidden":"true",children:"→"})]})]}),m,r.jsxs("div",{className:"gpu-experience__status","aria-hidden":"true",children:[r.jsx("i",{}),"GPU procedural · drag to orbit"]})]})}const xe=e=>Array.from({length:e},(t,a)=>a);function ge({count:e=180,scale:t=[30,18,80],color:a="#ffffff",size:s=1.2,speed:n=.18,opacity:l=.75}){return r.jsx(ie,{count:e,scale:t,color:a,size:s,speed:n,opacity:l,noise:1.2})}export{ge as D,he as G,ie as S,xe as r};
