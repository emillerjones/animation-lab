import{r as e}from"./index-DdsG5hjO.js";import"./three.module-C8jeBWGd.js";import{v as S}from"./constants-I5PtSeA3.js";import{C as w,r as x,V as A,fs as C,y as z}from"./three.core-CI4oCR72.js";import{a as E}from"./react-three-fiber.esm-DhdWsmFV.js";class P extends z{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
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
	      #include <${S>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const _=t=>new A().setFromSpherical(new C(t,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),k=e.forwardRef(({radius:t=100,depth:i=50,count:r=5e3,saturation:l=0,factor:m=4,fade:u=!1,speed:p=1},d)=>{const n=e.useRef(null),[v,g,h]=e.useMemo(()=>{const a=[],c=[],y=Array.from({length:r},()=>(.5+.5*Math.random())*m),o=new w;let f=t+i;const M=i/r;for(let s=0;s<r;s++)f-=M*Math.random(),a.push(..._(f).toArray()),o.setHSL(s/r,l,.9),c.push(o.r,o.g,o.b);return[new Float32Array(a),new Float32Array(c),new Float32Array(y)]},[r,i,m,t,l]);E(a=>n.current&&(n.current.uniforms.time.value=a.clock.elapsedTime*p));const[b]=e.useState(()=>new P);return e.createElement("points",{ref:d},e.createElement("bufferGeometry",null,e.createElement("bufferAttribute",{attach:"attributes-position",args:[v,3]}),e.createElement("bufferAttribute",{attach:"attributes-color",args:[g,3]}),e.createElement("bufferAttribute",{attach:"attributes-size",args:[h,1]})),e.createElement("primitive",{ref:n,object:b,attach:"material",blending:x,"uniforms-fade-value":u,depthWrite:!1,transparent:!0,vertexColors:!0}))});export{k as S};
