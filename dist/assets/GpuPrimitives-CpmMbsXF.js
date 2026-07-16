import{r as i,j as r}from"./index-D0EZQ-HK.js";import{e as L,a as G,u as F,C as N}from"./react-three-fiber.esm-zvc4Avfo.js";import{d as W,w as D,A as V,L as $}from"./index-vYWcRXo0.js";import{u as Y}from"./useDragOrbit-D4ClVIu3.js";import{W as U,a as H}from"./quality-CPSDBiLF.js";import{A as J}from"./AdaptiveDpr-ptgmvk7k.js";import{a3 as _,C as O,e as q,V as w,a6 as K,S as Q,Y as X,a4 as Z}from"./three.module-4i5VD4Ag.js";import{_ as ee}from"./extends-CF3RwP-h.js";import{v as te}from"./constants-lYLjsJcj.js";class re extends Q{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
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
          #include <${te>=154?"colorspace_fragment":"encodings_fragment"}>
        }
      `})}get time(){return this.uniforms.time.value}set time(t){this.uniforms.time.value=t}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(t){this.uniforms.pixelRatio.value=t}}const z=e=>e&&e.constructor===Float32Array,ie=e=>[e.r,e.g,e.b],I=e=>e instanceof q||e instanceof w||e instanceof K,B=e=>Array.isArray(e)?e:I(e)?e.toArray():[e,e,e];function g(e,t,a){return i.useMemo(()=>{if(t!==void 0){if(z(t))return t;if(t instanceof O){const s=Array.from({length:e*3},()=>ie(t)).flat();return Float32Array.from(s)}else if(I(t)||Array.isArray(t)){const s=Array.from({length:e*3},()=>B(t)).flat();return Float32Array.from(s)}return Float32Array.from({length:e},()=>t)}return Float32Array.from({length:e},a)},[t])}const ae=i.forwardRef(({noise:e=1,count:t=100,speed:a=1,opacity:s=1,scale:n=1,size:l,color:c,children:p,...f},o)=>{i.useMemo(()=>L({SparklesImplMaterial:re}),[]);const m=i.useRef(null),M=G(x=>x.viewport.dpr),v=B(n),R=i.useMemo(()=>Float32Array.from(Array.from({length:t},()=>v.map(_.randFloatSpread)).flat()),[t,...v]),P=g(t,l,Math.random),A=g(t,s),h=g(t,a),E=g(t*3,e),b=g(c===void 0?t*3:t,z(c)?c:new O(c),()=>1);return F(x=>{m.current&&m.current.material&&(m.current.material.time=x.clock.elapsedTime)}),i.useImperativeHandle(o,()=>m.current,[]),i.createElement("points",ee({key:`particle-${t}-${JSON.stringify(n)}`},f,{ref:m}),i.createElement("bufferGeometry",null,i.createElement("bufferAttribute",{attach:"attributes-position",args:[R,3]}),i.createElement("bufferAttribute",{attach:"attributes-size",args:[P,1]}),i.createElement("bufferAttribute",{attach:"attributes-opacity",args:[A,1]}),i.createElement("bufferAttribute",{attach:"attributes-speed",args:[h,1]}),i.createElement("bufferAttribute",{attach:"attributes-color",args:[b,3]}),i.createElement("bufferAttribute",{attach:"attributes-noise",args:[E,3]})),p||i.createElement("sparklesImplMaterial",{transparent:!0,pixelRatio:M,depthWrite:!1}))}),y=new w(0,2.4,-14),S=new w(0,3.3,13.5).sub(y),j=S.length(),C=Math.atan2(S.x,S.z),T=Math.asin(S.y/j);function se({speed:e=1,impulse:t}){const a=i.useRef(0),s=Y(),n=i.useRef({yaw:C,pitch:T});return F((l,c)=>{const p=Math.min(c,.05)*e;a.current+=p;const f=s.current,o=n.current;o.yaw=_.damp(o.yaw,C+f.targetYaw,3.4,c),o.pitch=_.damp(o.pitch,T+f.targetPitch,3.4,c),l.camera.position.set(y.x+j*Math.sin(o.yaw)*Math.cos(o.pitch),y.y+j*Math.sin(o.pitch),y.z+j*Math.cos(o.yaw)*Math.cos(o.pitch)),l.camera.position.z+=Math.sin(a.current*.18)*.35-t*.28,l.camera.lookAt(y)}),null}function oe({World:e,settings:t,accent:a,background:s,impulse:n,actionActive:l}){const c=t.speed??1;return r.jsxs(r.Fragment,{children:[r.jsx("color",{attach:"background",args:[s]}),r.jsx("fogExp2",{attach:"fog",args:[s,.028]}),r.jsx("ambientLight",{intensity:.24,color:a}),r.jsx("directionalLight",{position:[4,10,6],intensity:1.1,color:"#fff1d3"}),r.jsx("pointLight",{position:[-6,4,3],intensity:22,distance:32,color:a}),r.jsx(se,{speed:c,impulse:n}),r.jsx(e,{settings:t,accent:a,impulse:n,actionActive:l}),r.jsxs(W,{multisampling:H,children:[r.jsx(D,{mipmapBlur:!0,intensity:1.3,luminanceThreshold:.18,luminanceSmoothing:.45}),r.jsx(V,{opacity:.018,premultiply:!0}),r.jsx($,{})]}),r.jsx(J,{})]})}function xe({scene:e,World:t,settings:a={},eyebrow:s,title:n,description:l,cta:c="Enter the experience",accent:p="#8fdcff",background:f="#020407",align:o="left",foreground:m=null,wheelInteraction:M=!1,action:v=null,camera:R=null}){const[P,A]=i.useState(0),[h,E]=i.useState(!1),b=i.useRef(),x=(u=1)=>{A(d=>_.clamp(d+u*5,-10,10)),window.clearTimeout(b.current),b.current=window.setTimeout(()=>A(0),900)},k=u=>{const d=Math.sign(u.deltaY);d&&x(d)};return r.jsxs("section",{className:`atmosphere gpu-experience gpu-experience--${e} gpu-experience--${o} ${h?"is-action-active":""}`,style:{"--gpu-accent":p},onWheel:M?k:void 0,children:[r.jsx(N,{className:"gpu-experience__canvas",dpr:U,camera:{fov:52,near:.1,far:260,position:[0,3.3,13.5],...R},gl:{antialias:!0,alpha:!1,powerPreference:"high-performance"},onCreated:({gl:u})=>{u.outputColorSpace=X,u.toneMapping=Z,u.toneMappingExposure=1.15},children:r.jsx(i.Suspense,{fallback:null,children:r.jsx(oe,{World:t,settings:a,accent:p,background:f,impulse:P,actionActive:h})})}),r.jsx("div",{className:"gpu-experience__veil","aria-hidden":"true"}),r.jsxs("div",{className:"experiment-copy gpu-experience__copy",children:[r.jsx("p",{children:s}),r.jsx("h1",{children:n.split(`
`).map((u,d)=>r.jsxs("span",{children:[u,d<n.split(`
`).length-1&&r.jsx("br",{})]},u))}),r.jsx("span",{children:l}),v&&!h&&r.jsxs("button",{type:"button",onClick:()=>E(!0),children:[c,r.jsx("i",{"aria-hidden":"true",children:"→"})]})]}),m,r.jsxs("div",{className:"gpu-experience__status","aria-hidden":"true",children:[r.jsx("i",{}),"GPU procedural · drag to orbit"]})]})}const ge=e=>Array.from({length:e},(t,a)=>a);function ye({count:e=180,scale:t=[30,18,80],color:a="#ffffff",size:s=1.2,speed:n=.18,opacity:l=.75}){return r.jsx(ae,{count:e,scale:t,color:a,size:s,speed:n,opacity:l,noise:1.2})}export{ye as D,xe as G,ae as S,ge as r};
