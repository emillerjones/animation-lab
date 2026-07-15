import{r as l,j as n}from"./index-YX1WcBeE.js";import{C as _,u as z}from"./CanvasStage-CDsyjbOb.js";import{s as i}from"./procedural-DZUg-xN7.js";import{a as F,e as A,u as j}from"./react-three-fiber.esm-Dor08MZV.js";import{_ as L}from"./extends-CF3RwP-h.js";import{W as N,H as O,L as R,aA as P,F as U,k as G,aB as V,i as H,aj as $,C as k}from"./three.module-DzCdecJL.js";import{s as K}from"./shaderMaterial-DIhKdyQT.js";import"./index-C9gDrAcz.js";import"./useDragOrbit-DDYC2QQm.js";import"./dragOrbit-BGftK61W.js";import"./quality-BZ69FDDb.js";function D(e,a,u){const t=F(s=>s.size),c=F(s=>s.viewport),m=typeof e=="number"?e:t.width*c.dpr,f=t.height*c.dpr,v=(typeof e=="number"?u:e)||{},{samples:d=0,depth:g,...S}=v,x=g??v.depthBuffer,h=l.useMemo(()=>{const s=new N(m,f,{minFilter:R,magFilter:R,type:O,...S});return x&&(s.depthTexture=new P(m,f,U)),s.samples=d,s},[]);return l.useLayoutEffect(()=>{h.setSize(m,f),d&&(h.samples=d)},[d,h,m,f]),l.useEffect(()=>()=>h.dispose(),[]),h}const W=K({},"void main() { }","void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }");class X extends ${constructor(a=6,u=!1){super(),this.uniforms={chromaticAberration:{value:.05},transmission:{value:0},_transmission:{value:1},transmissionMap:{value:null},roughness:{value:0},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:1/0},attenuationColor:{value:new k("white")},anisotropicBlur:{value:.1},time:{value:0},distortion:{value:0},distortionScale:{value:.5},temporalDistortion:{value:0},buffer:{value:null}},this.onBeforeCompile=t=>{t.uniforms={...t.uniforms,...this.uniforms},this.anisotropy>0&&(t.defines.USE_ANISOTROPY=""),u?t.defines.USE_SAMPLER="":t.defines.USE_TRANSMISSION="",t.fragmentShader=`
      uniform float chromaticAberration;         
      uniform float anisotropicBlur;      
      uniform float time;
      uniform float distortion;
      uniform float distortionScale;
      uniform float temporalDistortion;
      uniform sampler2D buffer;

      vec3 random3(vec3 c) {
        float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
        vec3 r;
        r.z = fract(512.0*j);
        j *= .125;
        r.x = fract(512.0*j);
        j *= .125;
        r.y = fract(512.0*j);
        return r-0.5;
      }

      uint hash( uint x ) {
        x += ( x << 10u );
        x ^= ( x >>  6u );
        x += ( x <<  3u );
        x ^= ( x >> 11u );
        x += ( x << 15u );
        return x;
      }

      // Compound versions of the hashing algorithm I whipped together.
      uint hash( uvec2 v ) { return hash( v.x ^ hash(v.y)                         ); }
      uint hash( uvec3 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z)             ); }
      uint hash( uvec4 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z) ^ hash(v.w) ); }

      // Construct a float with half-open range [0:1] using low 23 bits.
      // All zeroes yields 0.0, all ones yields the next smallest representable value below 1.0.
      float floatConstruct( uint m ) {
        const uint ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask
        const uint ieeeOne      = 0x3F800000u; // 1.0 in IEEE binary32
        m &= ieeeMantissa;                     // Keep only mantissa bits (fractional part)
        m |= ieeeOne;                          // Add fractional part to 1.0
        float  f = uintBitsToFloat( m );       // Range [1:2]
        return f - 1.0;                        // Range [0:1]
      }

      // Pseudo-random value in half-open range [0:1].
      float randomBase( float x ) { return floatConstruct(hash(floatBitsToUint(x))); }
      float randomBase( vec2  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec3  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec4  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float rand(float seed) {
        float result = randomBase(vec3(gl_FragCoord.xy, seed));
        return result;
      }

      const float F3 =  0.3333333;
      const float G3 =  0.1666667;

      float snoise(vec3 p) {
        vec3 s = floor(p + dot(p, vec3(F3)));
        vec3 x = p - s + dot(s, vec3(G3));
        vec3 e = step(vec3(0.0), x - x.yzx);
        vec3 i1 = e*(1.0 - e.zxy);
        vec3 i2 = 1.0 - e.zxy*(1.0 - e);
        vec3 x1 = x - i1 + G3;
        vec3 x2 = x - i2 + 2.0*G3;
        vec3 x3 = x - 1.0 + 3.0*G3;
        vec4 w, d;
        w.x = dot(x, x);
        w.y = dot(x1, x1);
        w.z = dot(x2, x2);
        w.w = dot(x3, x3);
        w = max(0.6 - w, 0.0);
        d.x = dot(random3(s), x);
        d.y = dot(random3(s + i1), x1);
        d.z = dot(random3(s + i2), x2);
        d.w = dot(random3(s + 1.0), x3);
        w *= w;
        w *= w;
        d *= w;
        return dot(d, vec4(52.0));
      }

      float snoiseFractal(vec3 m) {
        return 0.5333333* snoise(m)
              +0.2666667* snoise(2.0*m)
              +0.1333333* snoise(4.0*m)
              +0.0666667* snoise(8.0*m);
      }
`+t.fragmentShader,t.fragmentShader=t.fragmentShader.replace("#include <transmission_pars_fragment>",`
        #ifdef USE_TRANSMISSION
          // Transmission code is based on glTF-Sampler-Viewer
          // https://github.com/KhronosGroup/glTF-Sample-Viewer
          uniform float _transmission;
          uniform float thickness;
          uniform float attenuationDistance;
          uniform vec3 attenuationColor;
          #ifdef USE_TRANSMISSIONMAP
            uniform sampler2D transmissionMap;
          #endif
          #ifdef USE_THICKNESSMAP
            uniform sampler2D thicknessMap;
          #endif
          uniform vec2 transmissionSamplerSize;
          uniform sampler2D transmissionSamplerMap;
          uniform mat4 modelMatrix;
          uniform mat4 projectionMatrix;
          varying vec3 vWorldPosition;
          vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
            // Direction of refracted light.
            vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
            // Compute rotation-independant scaling of the model matrix.
            vec3 modelScale;
            modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
            modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
            modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
            // The thickness is specified in local space.
            return normalize( refractionVector ) * thickness * modelScale;
          }
          float applyIorToRoughness( const in float roughness, const in float ior ) {
            // Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
            // an IOR of 1.5 results in the default amount of microfacet refraction.
            return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
          }
          vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
            float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );            
            #ifdef USE_SAMPLER
              #ifdef texture2DLodEXT
                return texture2DLodEXT(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #else
                return texture2D(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #endif
            #else
              return texture2D(buffer, fragCoord.xy);
            #endif
          }
          vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
            if ( isinf( attenuationDistance ) ) {
              // Attenuation distance is +∞, i.e. the transmitted color is not attenuated at all.
              return radiance;
            } else {
              // Compute light attenuation using Beer's law.
              vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
              vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
              return transmittance * radiance;
            }
          }
          vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
            const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
            const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
            const in vec3 attenuationColor, const in float attenuationDistance ) {
            vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
            vec3 refractedRayExit = position + transmissionRay;
            // Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
            vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
            vec2 refractionCoords = ndcPos.xy / ndcPos.w;
            refractionCoords += 1.0;
            refractionCoords /= 2.0;
            // Sample framebuffer to get pixel the refracted ray hits.
            vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
            vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
            // Get the specular component.
            vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
            return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
          }
        #endif
`),t.fragmentShader=t.fragmentShader.replace("#include <transmission_fragment>",`  
        // Improve the refraction to use the world pos
        material.transmission = _transmission;
        material.transmissionAlpha = 1.0;
        material.thickness = thickness;
        material.attenuationDistance = attenuationDistance;
        material.attenuationColor = attenuationColor;
        #ifdef USE_TRANSMISSIONMAP
          material.transmission *= texture2D( transmissionMap, vUv ).r;
        #endif
        #ifdef USE_THICKNESSMAP
          material.thickness *= texture2D( thicknessMap, vUv ).g;
        #endif
        
        vec3 pos = vWorldPosition;
        float runningSeed = 0.0;
        vec3 v = normalize( cameraPosition - pos );
        vec3 n = inverseTransformDirection( normal, viewMatrix );
        vec3 transmission = vec3(0.0);
        float transmissionR, transmissionB, transmissionG;
        float randomCoords = rand(runningSeed++);
        float thickness_smear = thickness * max(pow(roughnessFactor, 0.33), anisotropicBlur);
        vec3 distortionNormal = vec3(0.0);
        vec3 temporalOffset = vec3(time, -time, -time) * temporalDistortion;
        if (distortion > 0.0) {
          distortionNormal = distortion * vec3(snoiseFractal(vec3((pos * distortionScale + temporalOffset))), snoiseFractal(vec3(pos.zxy * distortionScale - temporalOffset)), snoiseFractal(vec3(pos.yxz * distortionScale + temporalOffset)));
        }
        for (float i = 0.0; i < ${a}.0; i ++) {
          vec3 sampleNorm = normalize(n + roughnessFactor * roughnessFactor * 2.0 * normalize(vec3(rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5)) * pow(rand(runningSeed++), 0.33) + distortionNormal);
          transmissionR = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness  + thickness_smear * (i + randomCoords) / float(${a}),
            material.attenuationColor, material.attenuationDistance
          ).r;
          transmissionG = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior  * (1.0 + chromaticAberration * (i + randomCoords) / float(${a})) , material.thickness + thickness_smear * (i + randomCoords) / float(${a}),
            material.attenuationColor, material.attenuationDistance
          ).g;
          transmissionB = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior * (1.0 + 2.0 * chromaticAberration * (i + randomCoords) / float(${a})), material.thickness + thickness_smear * (i + randomCoords) / float(${a}),
            material.attenuationColor, material.attenuationDistance
          ).b;
          transmission.r += transmissionR;
          transmission.g += transmissionG;
          transmission.b += transmissionB;
        }
        transmission /= ${a}.0;
        totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
`)},Object.keys(this.uniforms).forEach(t=>Object.defineProperty(this,t,{get:()=>this.uniforms[t].value,set:c=>this.uniforms[t].value=c}))}}const Y=l.forwardRef(({buffer:e,transmissionSampler:a=!1,backside:u=!1,side:t=G,transmission:c=1,thickness:m=0,backsideThickness:f=0,backsideEnvMapIntensity:v=1,samples:d=10,resolution:g,backsideResolution:S,background:x,anisotropy:h,anisotropicBlur:s,...B},I)=>{A({MeshTransmissionMaterial:X});const p=l.useRef(null),[E]=l.useState(()=>new W),y=D(S||g),M=D(g);let C,b,w,r;return j(o=>{if(p.current.time=o.clock.elapsedTime,p.current.buffer===M.texture&&!a){var T;r=(T=p.current.__r3f.parent)==null?void 0:T.object,r&&(w=o.gl.toneMapping,C=o.scene.background,b=p.current.envMapIntensity,o.gl.toneMapping=V,x&&(o.scene.background=x),r.material=E,u&&(o.gl.setRenderTarget(y),o.gl.render(o.scene,o.camera),r.material=p.current,r.material.buffer=y.texture,r.material.thickness=f,r.material.side=H,r.material.envMapIntensity=v),o.gl.setRenderTarget(M),o.gl.render(o.scene,o.camera),r.material=p.current,r.material.thickness=m,r.material.side=t,r.material.buffer=M.texture,r.material.envMapIntensity=b,o.scene.background=C,o.gl.setRenderTarget(null),o.gl.toneMapping=w)}}),l.useImperativeHandle(I,()=>p.current,[]),l.createElement("meshTransmissionMaterial",L({args:[d,a],ref:p},B,{buffer:e||M.texture,_transmission:c,anisotropicBlur:s??h,transmission:a?c:0,thickness:m,side:t}))});function q({index:e}){const a=l.useRef(),u=z();j(v=>{if(!a.current)return;const d=v.clock.elapsedTime*u;a.current.scale.y=1+Math.sin(d*(1+e*.15)+e)*.12});const t=l.useMemo(()=>new k().setHSL(.5+i(e,1308)*.3,.15+i(e,1309)*.6,.55+i(e,1310)*.25),[e]),c=.02+i(e,1311)*.22,m=.015+i(e,1312)*.055,f=.35+i(e,1313)*.5;return n.jsxs("mesh",{ref:a,position:[(i(e,1301)-.5)*6,(i(e,1302)-.5)*4,(i(e,1303)-.5)*4],rotation:[i(e,1304)*2,i(e,1305)*2,0],children:[n.jsx("torusGeometry",{args:[.6+i(e,1306)*.6,.1,16,48]}),n.jsx(Y,{thickness:f,roughness:c,transmission:.9,ior:1.3,chromaticAberration:m,color:t})]})}function le({settings:e={}}){const a=Math.max(6,Math.min(24,e.plates??16));return n.jsxs("section",{className:"atmosphere glass-harmonics-3d",children:[n.jsxs(_,{camera:{position:[1.6,.6,8],fov:46},orbitEnabled:!0,orbitFocus:[1.6,.4,0],speed:e.speed??1,bloom:{intensity:.9},children:[n.jsx("ambientLight",{intensity:.2}),n.jsx("pointLight",{color:"#78e9ff",intensity:35,distance:20,position:[1.6,1,3]}),n.jsx("group",{position:[1.6,.4,0],children:Array.from({length:a}).map((u,t)=>n.jsx(q,{index:t},t))})]}),n.jsxs("div",{className:"experiment-copy",children:[n.jsx("p",{children:"06 — Orbital geometry"}),n.jsxs("h1",{children:["Halos without",n.jsx("br",{}),"a horizon."]}),n.jsx("span",{children:"Transmissive rings float, tilt, and breathe through a field where gravity has released its hold."})]})]})}export{le as default};
