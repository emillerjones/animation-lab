import{r,j as R}from"./index-DAzxbDqR.js";import{_ as z}from"./extends-CF3RwP-h.js";import{v as C}from"./constants-B6HWMuRQ.js";import{e as F,a as S,u as w}from"./react-three-fiber.esm-KR8aYhig.js";import{q as j,a as d,b as O,V,u as k,E as I}from"./three.core-CbrireiX.js";class T extends I{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
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
          #include <${C>=154?"colorspace_fragment":"encodings_fragment"}>
        }
      `})}get time(){return this.uniforms.time.value}set time(t){this.uniforms.time.value=t}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(t){this.uniforms.pixelRatio.value=t}}const p=e=>e&&e.constructor===Float32Array,$=e=>[e.r,e.g,e.b],g=e=>e instanceof O||e instanceof V||e instanceof k,y=e=>Array.isArray(e)?e:g(e)?e.toArray():[e,e,e];function s(e,t,i){return r.useMemo(()=>{if(t!==void 0){if(p(t))return t;if(t instanceof d){const a=Array.from({length:e*3},()=>$(t)).flat();return Float32Array.from(a)}else if(g(t)||Array.isArray(t)){const a=Array.from({length:e*3},()=>y(t)).flat();return Float32Array.from(a)}return Float32Array.from({length:e},()=>t)}return Float32Array.from({length:e},i)},[t])}const D=r.forwardRef(({noise:e=1,count:t=100,speed:i=1,opacity:a=1,scale:n=1,size:c,color:l,children:m,...v},b)=>{r.useMemo(()=>F({SparklesImplMaterial:T}),[]);const o=r.useRef(null),x=S(f=>f.viewport.dpr),u=y(n),A=r.useMemo(()=>Float32Array.from(Array.from({length:t},()=>u.map(j.randFloatSpread)).flat()),[t,...u]),h=s(t,c,Math.random),P=s(t,a),E=s(t,i),_=s(t*3,e),M=s(l===void 0?t*3:t,p(l)?l:new d(l),()=>1);return w(f=>{o.current&&o.current.material&&(o.current.material.time=f.clock.elapsedTime)}),r.useImperativeHandle(b,()=>o.current,[]),r.createElement("points",z({key:`particle-${t}-${JSON.stringify(n)}`},v,{ref:o}),r.createElement("bufferGeometry",null,r.createElement("bufferAttribute",{attach:"attributes-position",args:[A,3]}),r.createElement("bufferAttribute",{attach:"attributes-size",args:[h,1]}),r.createElement("bufferAttribute",{attach:"attributes-opacity",args:[P,1]}),r.createElement("bufferAttribute",{attach:"attributes-speed",args:[E,1]}),r.createElement("bufferAttribute",{attach:"attributes-color",args:[M,3]}),r.createElement("bufferAttribute",{attach:"attributes-noise",args:[_,3]})),m||r.createElement("sparklesImplMaterial",{transparent:!0,pixelRatio:x,depthWrite:!1}))}),U=e=>Array.from({length:e},(t,i)=>i);function W({count:e=180,scale:t=[30,18,80],color:i="#ffffff",size:a=1.2,speed:n=.18,opacity:c=.75}){return R.jsx(D,{count:e,scale:t,color:i,size:a,speed:n,opacity:c,noise:1.2})}export{W as D,D as S,U as r};
