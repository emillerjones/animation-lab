var ho=Object.defineProperty;var uo=(n,t,e)=>t in n?ho(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var bt=(n,t,e)=>uo(n,typeof t!="symbol"?t+"":t,e);import{r as Y,j as G}from"./index-CoCVcyrP.js";import{e as ca,a as ri,u as Ii,b as vs,c as fo,d as rn,C as mo}from"./react-three-fiber.esm-rpEeD4NT.js";import{d as po,w as yo,L as go}from"./index-D4eeSf7E.js";import{P as vo,R as xo,B as _o}from"./react-three-rapier.esm-DvKrXkTG.js";import{M as Bs,I as wo,S as Pi,D as si,a as la,H as ie,F as Xt,b as Mi,L as ge,R as Te,c as ha,B as le,V as $,d as Ae,P as ua,e as ni,T as ei,f as Mo,g as ze,h as we,i as So,j as bo,k as Ln,U as zi,l as xs,N as Si,m as ms,n as hr,o as Ao,p as sn,q as da,r as nn,s as fa,t as To,u as zo,C as Eo,v as Fe,w as ma,O as Po,x as wn,W as pa,y as _s,z as Co,E as an,G as bi,J as ws,K as Bo,Q as No,X as kn,Y as ya,Z as ps,_ as Uo,$ as Io,a0 as Oo,a1 as Ro,a2 as Fo,a3 as ga,a4 as ys,A as Ge,a5 as Qe,a6 as kt,a7 as Do,a8 as ce,a9 as Lo,aa as ko,ab as Vo,ac as Jo,ad as xe,ae as Go,af as Ho,ag as Xo,ah as Zo}from"./three.module-Ct-yBmsu.js";import{W as qo,a as Yo}from"./quality-NEVBGrgs.js";import{A as Wo}from"./AnimationReadout-CRfHf8E1.js";import{A as $o}from"./AdaptiveDpr-vjX1B6DH.js";import{_ as Ms}from"./extends-CF3RwP-h.js";import{v as va,E as Qo}from"./Edges-DntWutAi.js";import{M as Ko}from"./MeshReflectorMaterial-BcGdDIzQ.js";import{s as jo}from"./shaderMaterial-CrYAxPa0.js";import{v as tc}from"./constants-CIgl5eJ3.js";import"./BufferGeometryUtils-DAr1IoEU.js";var ee=Uint8Array,De=Uint16Array,on=Uint32Array,xa=new ee([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),_a=new ee([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),ec=new ee([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),wa=function(n,t){for(var e=new De(31),i=0;i<31;++i)e[i]=t+=1<<n[i-1];for(var r=new on(e[30]),i=1;i<30;++i)for(var s=e[i];s<e[i+1];++s)r[s]=s-e[i]<<5|i;return[e,r]},Ma=wa(xa,2),Sa=Ma[0],ic=Ma[1];Sa[28]=258,ic[258]=28;var rc=wa(_a,0),sc=rc[0],cn=new De(32768);for(var _t=0;_t<32768;++_t){var Ne=(_t&43690)>>>1|(_t&21845)<<1;Ne=(Ne&52428)>>>2|(Ne&13107)<<2,Ne=(Ne&61680)>>>4|(Ne&3855)<<4,cn[_t]=((Ne&65280)>>>8|(Ne&255)<<8)>>>1}var cr=(function(n,t,e){for(var i=n.length,r=0,s=new De(t);r<i;++r)++s[n[r]-1];var a=new De(t);for(r=0;r<t;++r)a[r]=a[r-1]+s[r-1]<<1;var c;if(e){c=new De(1<<t);var o=15-t;for(r=0;r<i;++r)if(n[r])for(var l=r<<4|n[r],u=t-n[r],d=a[n[r]-1]++<<u,h=d|(1<<u)-1;d<=h;++d)c[cn[d]>>>o]=l}else for(c=new De(i),r=0;r<i;++r)n[r]&&(c[r]=cn[a[n[r]-1]++]>>>15-n[r]);return c}),Gr=new ee(288);for(var _t=0;_t<144;++_t)Gr[_t]=8;for(var _t=144;_t<256;++_t)Gr[_t]=9;for(var _t=256;_t<280;++_t)Gr[_t]=7;for(var _t=280;_t<288;++_t)Gr[_t]=8;var ba=new ee(32);for(var _t=0;_t<32;++_t)ba[_t]=5;var nc=cr(Gr,9,1),ac=cr(ba,5,1),Os=function(n){for(var t=n[0],e=1;e<n.length;++e)n[e]>t&&(t=n[e]);return t},ne=function(n,t,e){var i=t/8|0;return(n[i]|n[i+1]<<8)>>(t&7)&e},Rs=function(n,t){var e=t/8|0;return(n[e]|n[e+1]<<8|n[e+2]<<16)>>(t&7)},oc=function(n){return(n/8|0)+(n&7&&1)},cc=function(n,t,e){(e==null||e>n.length)&&(e=n.length);var i=new(n instanceof De?De:n instanceof on?on:ee)(e-t);return i.set(n.subarray(t,e)),i},lc=function(n,t,e){var i=n.length;if(!i||e&&!e.l&&i<5)return t||new ee(0);var r=!t||e,s=!e||e.i;e||(e={}),t||(t=new ee(i*3));var a=function(it){var ht=t.length;if(it>ht){var Zt=new ee(Math.max(ht*2,it));Zt.set(t),t=Zt}},c=e.f||0,o=e.p||0,l=e.b||0,u=e.l,d=e.d,h=e.m,f=e.n,y=i*8;do{if(!u){e.f=c=ne(n,o,1);var x=ne(n,o+1,3);if(o+=3,x)if(x==1)u=nc,d=ac,h=9,f=5;else if(x==2){var b=ne(n,o,31)+257,z=ne(n,o+10,15)+4,_=b+ne(n,o+5,31)+1;o+=14;for(var w=new ee(_),A=new ee(19),T=0;T<z;++T)A[ec[T]]=ne(n,o+T*3,7);o+=z*3;for(var E=Os(A),C=(1<<E)-1,I=cr(A,E,1),T=0;T<_;){var B=I[ne(n,o,C)];o+=B&15;var g=B>>>4;if(g<16)w[T++]=g;else{var R=0,O=0;for(g==16?(O=3+ne(n,o,3),o+=2,R=w[T-1]):g==17?(O=3+ne(n,o,7),o+=3):g==18&&(O=11+ne(n,o,127),o+=7);O--;)w[T++]=R}}var X=w.subarray(0,b),H=w.subarray(b);h=Os(X),f=Os(H),u=cr(X,h,1),d=cr(H,f,1)}else throw"invalid block type";else{var g=oc(o)+4,v=n[g-4]|n[g-3]<<8,M=g+v;if(M>i){if(s)throw"unexpected EOF";break}r&&a(l+v),t.set(n.subarray(g,M),l),e.b=l+=v,e.p=o=M*8;continue}if(o>y){if(s)throw"unexpected EOF";break}}r&&a(l+131072);for(var nt=(1<<h)-1,vt=(1<<f)-1,lt=o;;lt=o){var R=u[Rs(n,o)&nt],tt=R>>>4;if(o+=R&15,o>y){if(s)throw"unexpected EOF";break}if(!R)throw"invalid length/literal";if(tt<256)t[l++]=tt;else if(tt==256){lt=o,u=null;break}else{var Tt=tt-254;if(tt>264){var T=tt-257,at=xa[T];Tt=ne(n,o,(1<<at)-1)+Sa[T],o+=at}var mt=d[Rs(n,o)&vt],Pt=mt>>>4;if(!mt)throw"invalid distance";o+=mt&15;var H=sc[Pt];if(Pt>3){var at=_a[Pt];H+=Rs(n,o)&(1<<at)-1,o+=at}if(o>y){if(s)throw"unexpected EOF";break}r&&a(l+131072);for(var Dt=l+Tt;l<Dt;l+=4)t[l]=t[l-H],t[l+1]=t[l+1-H],t[l+2]=t[l+2-H],t[l+3]=t[l+3-H];l=Dt}}e.l=u,e.p=lt,e.b=l,u&&(c=1,e.m=h,e.d=d,e.n=f)}while(!c);return l==t.length?t:cc(t,0,l)},hc=new ee(0),uc=function(n){if((n[0]&15)!=8||n[0]>>>4>7||(n[0]<<8|n[1])%31)throw"invalid zlib data";if(n[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function qr(n,t){return lc((uc(n),n.subarray(2,-4)),t)}var dc=typeof TextDecoder<"u"&&new TextDecoder,fc=0;try{dc.decode(hc,{stream:!0}),fc=1}catch{}const mc=n=>n&&n.isCubeTexture;class pc extends Bs{constructor(t,e){var i,r;const s=mc(t),c=((r=s?(i=t.image[0])==null?void 0:i.width:t.image.width)!=null?r:1024)/4,o=Math.floor(Math.log2(c)),l=Math.pow(2,o),u=3*Math.max(l,112),d=4*l,h=[s?"#define ENVMAP_TYPE_CUBE":"",`#define CUBEUV_TEXEL_WIDTH ${1/u}`,`#define CUBEUV_TEXEL_HEIGHT ${1/d}`,`#define CUBEUV_MAX_MIP ${o}.0`],f=`
        varying vec3 vWorldPosition;
        void main() 
        {
            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `,y=h.join(`
`)+`
        #define ENVMAP_TYPE_CUBE_UV
        varying vec3 vWorldPosition;
        uniform float radius;
        uniform float height;
        uniform float angle;
        #ifdef ENVMAP_TYPE_CUBE
            uniform samplerCube map;
        #else
            uniform sampler2D map;
        #endif
        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {
            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;
        }
        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {
            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;
        }
        vec3 project() 
        {
            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;
            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;
            } else {
                p = vec3( 0.0, 1.0, 0.0 );
            }
            return p;
        }
        #include <common>
        #include <cube_uv_reflection_fragment>
        void main() 
        {
            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE
                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;
            #else
                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;
            #endif
            gl_FragColor = vec4( outcolor, 1.0 );
            #include <tonemapping_fragment>
            #include <${va>=154?"colorspace_fragment":"encodings_fragment"}>
        }
        `,x={map:{value:t},height:{value:(e==null?void 0:e.height)||15},radius:{value:(e==null?void 0:e.radius)||100}},g=new wo(1,16),v=new Pi({uniforms:x,fragmentShader:y,vertexShader:f,side:si});super(g,v)}set radius(t){this.material.uniforms.radius.value=t}get radius(){return this.material.uniforms.radius.value}set height(t){this.material.uniforms.height.value=t}get height(){return this.material.uniforms.height.value}}class yc extends la{constructor(t){super(t),this.type=ie}parse(t){const a=function(T,E){switch(T){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(E||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(E||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(E||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(E||""))}},d=function(T,E,C){E=E||1024;let B=T.pos,R=-1,O=0,X="",H=String.fromCharCode.apply(null,new Uint16Array(T.subarray(B,B+128)));for(;0>(R=H.indexOf(`
`))&&O<E&&B<T.byteLength;)X+=H,O+=H.length,B+=128,H+=String.fromCharCode.apply(null,new Uint16Array(T.subarray(B,B+128)));return-1<R?(T.pos+=O+R+1,X+H.slice(0,R)):!1},h=function(T){const E=/^#\?(\S+)/,C=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,I=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,B=/^\s*FORMAT=(\S+)\s*$/,R=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,O={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let X,H;for((T.pos>=T.byteLength||!(X=d(T)))&&a(1,"no header found"),(H=X.match(E))||a(3,"bad initial token"),O.valid|=1,O.programtype=H[1],O.string+=X+`
`;X=d(T),X!==!1;){if(O.string+=X+`
`,X.charAt(0)==="#"){O.comments+=X+`
`;continue}if((H=X.match(C))&&(O.gamma=parseFloat(H[1])),(H=X.match(I))&&(O.exposure=parseFloat(H[1])),(H=X.match(B))&&(O.valid|=2,O.format=H[1]),(H=X.match(R))&&(O.valid|=4,O.height=parseInt(H[1],10),O.width=parseInt(H[2],10)),O.valid&2&&O.valid&4)break}return O.valid&2||a(3,"missing format specifier"),O.valid&4||a(3,"missing image size specifier"),O},f=function(T,E,C){const I=E;if(I<8||I>32767||T[0]!==2||T[1]!==2||T[2]&128)return new Uint8Array(T);I!==(T[2]<<8|T[3])&&a(3,"wrong scanline width");const B=new Uint8Array(4*E*C);B.length||a(4,"unable to allocate buffer space");let R=0,O=0;const X=4*I,H=new Uint8Array(4),nt=new Uint8Array(X);let vt=C;for(;vt>0&&O<T.byteLength;){O+4>T.byteLength&&a(1),H[0]=T[O++],H[1]=T[O++],H[2]=T[O++],H[3]=T[O++],(H[0]!=2||H[1]!=2||(H[2]<<8|H[3])!=I)&&a(3,"bad rgbe scanline format");let lt=0,tt;for(;lt<X&&O<T.byteLength;){tt=T[O++];const at=tt>128;if(at&&(tt-=128),(tt===0||lt+tt>X)&&a(3,"bad scanline data"),at){const mt=T[O++];for(let Pt=0;Pt<tt;Pt++)nt[lt++]=mt}else nt.set(T.subarray(O,O+tt),lt),lt+=tt,O+=tt}const Tt=I;for(let at=0;at<Tt;at++){let mt=0;B[R]=nt[at+mt],mt+=I,B[R+1]=nt[at+mt],mt+=I,B[R+2]=nt[at+mt],mt+=I,B[R+3]=nt[at+mt],R+=4}vt--}return B},y=function(T,E,C,I){const B=T[E+3],R=Math.pow(2,B-128)/255;C[I+0]=T[E+0]*R,C[I+1]=T[E+1]*R,C[I+2]=T[E+2]*R,C[I+3]=1},x=function(T,E,C,I){const B=T[E+3],R=Math.pow(2,B-128)/255;C[I+0]=Mi.toHalfFloat(Math.min(T[E+0]*R,65504)),C[I+1]=Mi.toHalfFloat(Math.min(T[E+1]*R,65504)),C[I+2]=Mi.toHalfFloat(Math.min(T[E+2]*R,65504)),C[I+3]=Mi.toHalfFloat(1)},g=new Uint8Array(t);g.pos=0;const v=h(g),M=v.width,b=v.height,z=f(g.subarray(g.pos),M,b);let _,w,A;switch(this.type){case Xt:A=z.length/4;const T=new Float32Array(A*4);for(let C=0;C<A;C++)y(z,C*4,T,C*4);_=T,w=Xt;break;case ie:A=z.length/4;const E=new Uint16Array(A*4);for(let C=0;C<A;C++)x(z,C*4,E,C*4);_=E,w=ie;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:M,height:b,data:_,header:v.string,gamma:v.gamma,exposure:v.exposure,type:w}}setDataType(t){return this.type=t,this}load(t,e,i,r){function s(a,c){switch(a.type){case Xt:case ie:"colorSpace"in a?a.colorSpace="srgb-linear":a.encoding=3e3,a.minFilter=ge,a.magFilter=ge,a.generateMipmaps=!1,a.flipY=!0;break}e&&e(a,c)}return super.load(t,s,i,r)}}const Qi=va>=152;class gc extends la{constructor(t){super(t),this.type=ie}parse(t){const E=Math.pow(2.7182818,2.2);function C(m,p){for(var S=0,P=0;P<65536;++P)(P==0||m[P>>3]&1<<(P&7))&&(p[S++]=P);for(var N=S-1;S<65536;)p[S++]=0;return N}function I(m){for(var p=0;p<16384;p++)m[p]={},m[p].len=0,m[p].lit=0,m[p].p=null}const B={l:0,c:0,lc:0};function R(m,p,S,P,N){for(;S<m;)p=p<<8|Fn(P,N),S+=8;S-=m,B.l=p>>S&(1<<m)-1,B.c=p,B.lc=S}const O=new Array(59);function X(m){for(var p=0;p<=58;++p)O[p]=0;for(var p=0;p<65537;++p)O[m[p]]+=1;for(var S=0,p=58;p>0;--p){var P=S+O[p]>>1;O[p]=S,S=P}for(var p=0;p<65537;++p){var N=m[p];N>0&&(m[p]=N|O[N]++<<6)}}function H(m,p,S,P,N,U,D){for(var F=S,V=0,k=0;N<=U;N++){if(F.value-S.value>P)return!1;R(6,V,k,m,F);var J=B.l;if(V=B.c,k=B.lc,D[N]=J,J==63){if(F.value-S.value>P)throw"Something wrong with hufUnpackEncTable";R(8,V,k,m,F);var L=B.l+6;if(V=B.c,k=B.lc,N+L>U+1)throw"Something wrong with hufUnpackEncTable";for(;L--;)D[N++]=0;N--}else if(J>=59){var L=J-59+2;if(N+L>U+1)throw"Something wrong with hufUnpackEncTable";for(;L--;)D[N++]=0;N--}}X(D)}function nt(m){return m&63}function vt(m){return m>>6}function lt(m,p,S,P){for(;p<=S;p++){var N=vt(m[p]),U=nt(m[p]);if(N>>U)throw"Invalid table entry";if(U>14){var D=P[N>>U-14];if(D.len)throw"Invalid table entry";if(D.lit++,D.p){var F=D.p;D.p=new Array(D.lit);for(var V=0;V<D.lit-1;++V)D.p[V]=F[V]}else D.p=new Array(1);D.p[D.lit-1]=p}else if(U)for(var k=0,V=1<<14-U;V>0;V--){var D=P[(N<<14-U)+k];if(D.len||D.p)throw"Invalid table entry";D.len=U,D.lit=p,k++}}return!0}const tt={c:0,lc:0};function Tt(m,p,S,P){m=m<<8|Fn(S,P),p+=8,tt.c=m,tt.lc=p}const at={c:0,lc:0};function mt(m,p,S,P,N,U,D,F,V,k){if(m==p){P<8&&(Tt(S,P,N,D),S=tt.c,P=tt.lc),P-=8;var J=S>>P,J=new Uint8Array([J])[0];if(V.value+J>k)return!1;for(var L=F[V.value-1];J-- >0;)F[V.value++]=L}else if(V.value<k)F[V.value++]=m;else return!1;at.c=S,at.lc=P}function Pt(m){return m&65535}function Dt(m){var p=Pt(m);return p>32767?p-65536:p}const it={a:0,b:0};function ht(m,p){var S=Dt(m),P=Dt(p),N=P,U=S+(N&1)+(N>>1),D=U,F=U-N;it.a=D,it.b=F}function Zt(m,p){var S=Pt(m),P=Pt(p),N=S-(P>>1)&65535,U=P+N-32768&65535;it.a=U,it.b=N}function Di(m,p,S,P,N,U,D){for(var F=D<16384,V=S>N?N:S,k=1,J;k<=V;)k<<=1;for(k>>=1,J=k,k>>=1;k>=1;){for(var L=0,St=L+U*(N-J),Q=U*k,K=U*J,j=P*k,et=P*J,dt,yt,Ct,Lt;L<=St;L+=K){for(var gt=L,fe=L+P*(S-J);gt<=fe;gt+=et){var xt=gt+j,Bt=gt+Q,Se=Bt+j;F?(ht(m[gt+p],m[Bt+p]),dt=it.a,Ct=it.b,ht(m[xt+p],m[Se+p]),yt=it.a,Lt=it.b,ht(dt,yt),m[gt+p]=it.a,m[xt+p]=it.b,ht(Ct,Lt),m[Bt+p]=it.a,m[Se+p]=it.b):(Zt(m[gt+p],m[Bt+p]),dt=it.a,Ct=it.b,Zt(m[xt+p],m[Se+p]),yt=it.a,Lt=it.b,Zt(dt,yt),m[gt+p]=it.a,m[xt+p]=it.b,Zt(Ct,Lt),m[Bt+p]=it.a,m[Se+p]=it.b)}if(S&k){var Bt=gt+Q;F?ht(m[gt+p],m[Bt+p]):Zt(m[gt+p],m[Bt+p]),dt=it.a,m[Bt+p]=it.b,m[gt+p]=dt}}if(N&k)for(var gt=L,fe=L+P*(S-J);gt<=fe;gt+=et){var xt=gt+j;F?ht(m[gt+p],m[xt+p]):Zt(m[gt+p],m[xt+p]),dt=it.a,m[xt+p]=it.b,m[gt+p]=dt}J=k,k>>=1}return L}function Li(m,p,S,P,N,U,D,F,V,k){for(var J=0,L=0,St=F,Q=Math.trunc(N.value+(U+7)/8);N.value<Q;)for(Tt(J,L,S,N),J=tt.c,L=tt.lc;L>=14;){var K=J>>L-14&16383,j=p[K];if(j.len)L-=j.len,mt(j.lit,D,J,L,S,P,N,V,k,St),J=at.c,L=at.lc;else{if(!j.p)throw"hufDecode issues";var et;for(et=0;et<j.lit;et++){for(var dt=nt(m[j.p[et]]);L<dt&&N.value<Q;)Tt(J,L,S,N),J=tt.c,L=tt.lc;if(L>=dt&&vt(m[j.p[et]])==(J>>L-dt&(1<<dt)-1)){L-=dt,mt(j.p[et],D,J,L,S,P,N,V,k,St),J=at.c,L=at.lc;break}}if(et==j.lit)throw"hufDecode issues"}}var yt=8-U&7;for(J>>=yt,L-=yt;L>0;){var j=p[J<<14-L&16383];if(j.len)L-=j.len,mt(j.lit,D,J,L,S,P,N,V,k,St),J=at.c,L=at.lc;else throw"hufDecode issues"}return!0}function li(m,p,S,P,N,U){var D={value:0},F=S.value,V=Gt(p,S),k=Gt(p,S);S.value+=4;var J=Gt(p,S);if(S.value+=4,V<0||V>=65537||k<0||k>=65537)throw"Something wrong with HUF_ENCSIZE";var L=new Array(65537),St=new Array(16384);I(St);var Q=P-(S.value-F);if(H(m,p,S,Q,V,k,L),J>8*(P-(S.value-F)))throw"Something wrong with hufUncompress";lt(L,V,k,St),Li(L,St,m,p,S,J,k,U,N,D)}function ki(m,p,S){for(var P=0;P<S;++P)p[P]=m[p[P]]}function hi(m){for(var p=1;p<m.length;p++){var S=m[p-1]+m[p]-128;m[p]=S}}function ui(m,p){for(var S=0,P=Math.floor((m.length+1)/2),N=0,U=m.length-1;!(N>U||(p[N++]=m[S++],N>U));)p[N++]=m[P++]}function di(m){for(var p=m.byteLength,S=new Array,P=0,N=new DataView(m);p>0;){var U=N.getInt8(P++);if(U<0){var D=-U;p-=D+1;for(var F=0;F<D;F++)S.push(N.getUint8(P++))}else{var D=U;p-=2;for(var V=N.getUint8(P++),F=0;F<D+1;F++)S.push(V)}}return S}function Vi(m,p,S,P,N,U){var xt=new DataView(U.buffer),D=S[m.idx[0]].width,F=S[m.idx[0]].height,V=3,k=Math.floor(D/8),J=Math.ceil(D/8),L=Math.ceil(F/8),St=D-(J-1)*8,Q=F-(L-1)*8,K={value:0},j=new Array(V),et=new Array(V),dt=new Array(V),yt=new Array(V),Ct=new Array(V);for(let ft=0;ft<V;++ft)Ct[ft]=p[m.idx[ft]],j[ft]=ft<1?0:j[ft-1]+J*L,et[ft]=new Float32Array(64),dt[ft]=new Uint16Array(64),yt[ft]=new Uint16Array(J*64);for(let ft=0;ft<L;++ft){var Lt=8;ft==L-1&&(Lt=Q);var gt=8;for(let Mt=0;Mt<J;++Mt){Mt==J-1&&(gt=St);for(let ut=0;ut<V;++ut)dt[ut].fill(0),dt[ut][0]=N[j[ut]++],Ji(K,P,dt[ut]),Gi(dt[ut],et[ut]),Hi(et[ut]);Xi(et);for(let ut=0;ut<V;++ut)Xe(et[ut],yt[ut],Mt*64)}let Ot=0;for(let Mt=0;Mt<V;++Mt){const ut=S[m.idx[Mt]].type;for(let te=8*ft;te<8*ft+Lt;++te){Ot=Ct[Mt][te];for(let $e=0;$e<k;++$e){const qt=$e*64+(te&7)*8;xt.setUint16(Ot+0*ut,yt[Mt][qt+0],!0),xt.setUint16(Ot+2*ut,yt[Mt][qt+1],!0),xt.setUint16(Ot+4*ut,yt[Mt][qt+2],!0),xt.setUint16(Ot+6*ut,yt[Mt][qt+3],!0),xt.setUint16(Ot+8*ut,yt[Mt][qt+4],!0),xt.setUint16(Ot+10*ut,yt[Mt][qt+5],!0),xt.setUint16(Ot+12*ut,yt[Mt][qt+6],!0),xt.setUint16(Ot+14*ut,yt[Mt][qt+7],!0),Ot+=16*ut}}if(k!=J)for(let te=8*ft;te<8*ft+Lt;++te){const $e=Ct[Mt][te]+8*k*2*ut,qt=k*64+(te&7)*8;for(let Be=0;Be<gt;++Be)xt.setUint16($e+Be*2*ut,yt[Mt][qt+Be],!0)}}}for(var fe=new Uint16Array(D),xt=new DataView(U.buffer),Bt=0;Bt<V;++Bt){S[m.idx[Bt]].decoded=!0;var Se=S[m.idx[Bt]].type;if(S[Bt].type==2)for(var $i=0;$i<F;++$i){const ft=Ct[Bt][$i];for(var jt=0;jt<D;++jt)fe[jt]=xt.getUint16(ft+jt*2*Se,!0);for(var jt=0;jt<D;++jt)xt.setFloat32(ft+jt*2*Se,Z(fe[jt]),!0)}}}function Ji(m,p,S){for(var P,N=1;N<64;)P=p[m.value],P==65280?N=64:P>>8==255?N+=P&255:(S[N]=P,N++),m.value++}function Gi(m,p){p[0]=Z(m[0]),p[1]=Z(m[1]),p[2]=Z(m[5]),p[3]=Z(m[6]),p[4]=Z(m[14]),p[5]=Z(m[15]),p[6]=Z(m[27]),p[7]=Z(m[28]),p[8]=Z(m[2]),p[9]=Z(m[4]),p[10]=Z(m[7]),p[11]=Z(m[13]),p[12]=Z(m[16]),p[13]=Z(m[26]),p[14]=Z(m[29]),p[15]=Z(m[42]),p[16]=Z(m[3]),p[17]=Z(m[8]),p[18]=Z(m[12]),p[19]=Z(m[17]),p[20]=Z(m[25]),p[21]=Z(m[30]),p[22]=Z(m[41]),p[23]=Z(m[43]),p[24]=Z(m[9]),p[25]=Z(m[11]),p[26]=Z(m[18]),p[27]=Z(m[24]),p[28]=Z(m[31]),p[29]=Z(m[40]),p[30]=Z(m[44]),p[31]=Z(m[53]),p[32]=Z(m[10]),p[33]=Z(m[19]),p[34]=Z(m[23]),p[35]=Z(m[32]),p[36]=Z(m[39]),p[37]=Z(m[45]),p[38]=Z(m[52]),p[39]=Z(m[54]),p[40]=Z(m[20]),p[41]=Z(m[22]),p[42]=Z(m[33]),p[43]=Z(m[38]),p[44]=Z(m[46]),p[45]=Z(m[51]),p[46]=Z(m[55]),p[47]=Z(m[60]),p[48]=Z(m[21]),p[49]=Z(m[34]),p[50]=Z(m[37]),p[51]=Z(m[47]),p[52]=Z(m[50]),p[53]=Z(m[56]),p[54]=Z(m[59]),p[55]=Z(m[61]),p[56]=Z(m[35]),p[57]=Z(m[36]),p[58]=Z(m[48]),p[59]=Z(m[49]),p[60]=Z(m[57]),p[61]=Z(m[58]),p[62]=Z(m[62]),p[63]=Z(m[63])}function Hi(m){const p=.5*Math.cos(.7853975),S=.5*Math.cos(3.14159/16),P=.5*Math.cos(3.14159/8),N=.5*Math.cos(3*3.14159/16),U=.5*Math.cos(5*3.14159/16),D=.5*Math.cos(3*3.14159/8),F=.5*Math.cos(7*3.14159/16);for(var V=new Array(4),k=new Array(4),J=new Array(4),L=new Array(4),St=0;St<8;++St){var Q=St*8;V[0]=P*m[Q+2],V[1]=D*m[Q+2],V[2]=P*m[Q+6],V[3]=D*m[Q+6],k[0]=S*m[Q+1]+N*m[Q+3]+U*m[Q+5]+F*m[Q+7],k[1]=N*m[Q+1]-F*m[Q+3]-S*m[Q+5]-U*m[Q+7],k[2]=U*m[Q+1]-S*m[Q+3]+F*m[Q+5]+N*m[Q+7],k[3]=F*m[Q+1]-U*m[Q+3]+N*m[Q+5]-S*m[Q+7],J[0]=p*(m[Q+0]+m[Q+4]),J[3]=p*(m[Q+0]-m[Q+4]),J[1]=V[0]+V[3],J[2]=V[1]-V[2],L[0]=J[0]+J[1],L[1]=J[3]+J[2],L[2]=J[3]-J[2],L[3]=J[0]-J[1],m[Q+0]=L[0]+k[0],m[Q+1]=L[1]+k[1],m[Q+2]=L[2]+k[2],m[Q+3]=L[3]+k[3],m[Q+4]=L[3]-k[3],m[Q+5]=L[2]-k[2],m[Q+6]=L[1]-k[1],m[Q+7]=L[0]-k[0]}for(var K=0;K<8;++K)V[0]=P*m[16+K],V[1]=D*m[16+K],V[2]=P*m[48+K],V[3]=D*m[48+K],k[0]=S*m[8+K]+N*m[24+K]+U*m[40+K]+F*m[56+K],k[1]=N*m[8+K]-F*m[24+K]-S*m[40+K]-U*m[56+K],k[2]=U*m[8+K]-S*m[24+K]+F*m[40+K]+N*m[56+K],k[3]=F*m[8+K]-U*m[24+K]+N*m[40+K]-S*m[56+K],J[0]=p*(m[K]+m[32+K]),J[3]=p*(m[K]-m[32+K]),J[1]=V[0]+V[3],J[2]=V[1]-V[2],L[0]=J[0]+J[1],L[1]=J[3]+J[2],L[2]=J[3]-J[2],L[3]=J[0]-J[1],m[0+K]=L[0]+k[0],m[8+K]=L[1]+k[1],m[16+K]=L[2]+k[2],m[24+K]=L[3]+k[3],m[32+K]=L[3]-k[3],m[40+K]=L[2]-k[2],m[48+K]=L[1]-k[1],m[56+K]=L[0]-k[0]}function Xi(m){for(var p=0;p<64;++p){var S=m[0][p],P=m[1][p],N=m[2][p];m[0][p]=S+1.5747*N,m[1][p]=S-.1873*P-.4682*N,m[2][p]=S+1.8556*P}}function Xe(m,p,S){for(var P=0;P<64;++P)p[S+P]=Mi.toHalfFloat(Ze(m[P]))}function Ze(m){return m<=1?Math.sign(m)*Math.pow(Math.abs(m),2.2):Math.sign(m)*Math.pow(E,Math.abs(m)-1)}function Pe(m){return new DataView(m.array.buffer,m.offset.value,m.size)}function qe(m){var p=m.viewer.buffer.slice(m.offset.value,m.offset.value+m.size),S=new Uint8Array(di(p)),P=new Uint8Array(S.length);return hi(S),ui(S,P),new DataView(P.buffer)}function Me(m){var p=m.array.slice(m.offset.value,m.offset.value+m.size),S=qr(p),P=new Uint8Array(S.length);return hi(S),ui(S,P),new DataView(P.buffer)}function Ye(m){for(var p=m.viewer,S={value:m.offset.value},P=new Uint16Array(m.width*m.scanlineBlockSize*(m.channels*m.type)),N=new Uint8Array(8192),U=0,D=new Array(m.channels),F=0;F<m.channels;F++)D[F]={},D[F].start=U,D[F].end=D[F].start,D[F].nx=m.width,D[F].ny=m.lines,D[F].size=m.type,U+=D[F].nx*D[F].ny*D[F].size;var V=qi(p,S),k=qi(p,S);if(k>=8192)throw"Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";if(V<=k)for(var F=0;F<k-V+1;F++)N[F+V]=fi(p,S);var J=new Uint16Array(65536),L=C(N,J),St=Gt(p,S);li(m.array,p,S,St,P,U);for(var F=0;F<m.channels;++F)for(var Q=D[F],K=0;K<D[F].size;++K)Di(P,Q.start+K,Q.nx,Q.size,Q.ny,Q.nx*Q.size,L);ki(J,P,U);for(var j=0,et=new Uint8Array(P.buffer.byteLength),dt=0;dt<m.lines;dt++)for(var yt=0;yt<m.channels;yt++){var Q=D[yt],Ct=Q.nx*Q.size,Lt=new Uint8Array(P.buffer,Q.end*2,Ct*2);et.set(Lt,j),j+=Ct*2,Q.end+=Ct}return new DataView(et.buffer)}function We(m){var p=m.array.slice(m.offset.value,m.offset.value+m.size),S=qr(p);const P=m.lines*m.channels*m.width,N=m.type==1?new Uint16Array(P):new Uint32Array(P);let U=0,D=0;const F=new Array(4);for(let V=0;V<m.lines;V++)for(let k=0;k<m.channels;k++){let J=0;switch(m.type){case 1:F[0]=U,F[1]=F[0]+m.width,U=F[1]+m.width;for(let L=0;L<m.width;++L){const St=S[F[0]++]<<8|S[F[1]++];J+=St,N[D]=J,D++}break;case 2:F[0]=U,F[1]=F[0]+m.width,F[2]=F[1]+m.width,U=F[2]+m.width;for(let L=0;L<m.width;++L){const St=S[F[0]++]<<24|S[F[1]++]<<16|S[F[2]++]<<8;J+=St,N[D]=J,D++}break}}return new DataView(N.buffer)}function Ce(m){var p=m.viewer,S={value:m.offset.value},P=new Uint8Array(m.width*m.lines*(m.channels*m.type*2)),N={version:Kt(p,S),unknownUncompressedSize:Kt(p,S),unknownCompressedSize:Kt(p,S),acCompressedSize:Kt(p,S),dcCompressedSize:Kt(p,S),rleCompressedSize:Kt(p,S),rleUncompressedSize:Kt(p,S),rleRawSize:Kt(p,S),totalAcUncompressedCount:Kt(p,S),totalDcUncompressedCount:Kt(p,S),acCompression:Kt(p,S)};if(N.version<2)throw"EXRLoader.parse: "+Wi.compression+" version "+N.version+" is unsupported";for(var U=new Array,D=qi(p,S)-2;D>0;){var F=de(p.buffer,S),V=fi(p,S),k=V>>2&3,J=(V>>4)-1,L=new Int8Array([J])[0],St=fi(p,S);U.push({name:F,index:L,type:St,compression:k}),D-=F.length+3}for(var Q=Wi.channels,K=new Array(m.channels),j=0;j<m.channels;++j){var et=K[j]={},dt=Q[j];et.name=dt.name,et.compression=0,et.decoded=!1,et.type=dt.pixelType,et.pLinear=dt.pLinear,et.width=m.width,et.height=m.lines}for(var yt={idx:new Array(3)},Ct=0;Ct<m.channels;++Ct)for(var et=K[Ct],j=0;j<U.length;++j){var Lt=U[j];et.name==Lt.name&&(et.compression=Lt.compression,Lt.index>=0&&(yt.idx[Lt.index]=Ct),et.offset=Ct)}if(N.acCompressedSize>0)switch(N.acCompression){case 0:var xt=new Uint16Array(N.totalAcUncompressedCount);li(m.array,p,S,N.acCompressedSize,xt,N.totalAcUncompressedCount);break;case 1:var gt=m.array.slice(S.value,S.value+N.totalAcUncompressedCount),fe=qr(gt),xt=new Uint16Array(fe.buffer);S.value+=N.totalAcUncompressedCount;break}if(N.dcCompressedSize>0){var Bt={array:m.array,offset:S,size:N.dcCompressedSize},Se=new Uint16Array(Me(Bt).buffer);S.value+=N.dcCompressedSize}if(N.rleRawSize>0){var gt=m.array.slice(S.value,S.value+N.rleCompressedSize),fe=qr(gt),$i=di(fe.buffer);S.value+=N.rleCompressedSize}for(var jt=0,ft=new Array(K.length),j=0;j<ft.length;++j)ft[j]=new Array;for(var Ot=0;Ot<m.lines;++Ot)for(var Mt=0;Mt<K.length;++Mt)ft[Mt].push(jt),jt+=K[Mt].width*m.type*2;Vi(yt,ft,K,xt,Se,P);for(var j=0;j<K.length;++j){var et=K[j];if(!et.decoded)switch(et.compression){case 2:for(var ut=0,te=0,Ot=0;Ot<m.lines;++Ot){for(var $e=ft[j][ut],qt=0;qt<et.width;++qt){for(var Be=0;Be<2*et.type;++Be)P[$e++]=$i[te+Be*et.width*et.height];te++}ut++}break;case 1:default:throw"EXRLoader.parse: unsupported channel compression"}}return new DataView(P.buffer)}function de(m,p){for(var S=new Uint8Array(m),P=0;S[p.value+P]!=0;)P+=1;var N=new TextDecoder().decode(S.slice(p.value,p.value+P));return p.value=p.value+P+1,N}function pt(m,p,S){var P=new TextDecoder().decode(new Uint8Array(m).slice(p.value,p.value+S));return p.value=p.value+S,P}function Ya(m,p){var S=Zi(m,p),P=Gt(m,p);return[S,P]}function Wa(m,p){var S=Gt(m,p),P=Gt(m,p);return[S,P]}function Zi(m,p){var S=m.getInt32(p.value,!0);return p.value=p.value+4,S}function Gt(m,p){var S=m.getUint32(p.value,!0);return p.value=p.value+4,S}function Fn(m,p){var S=m[p.value];return p.value=p.value+1,S}function fi(m,p){var S=m.getUint8(p.value);return p.value=p.value+1,S}const Kt=function(m,p){let S;return"getBigInt64"in DataView.prototype?S=Number(m.getBigInt64(p.value,!0)):S=m.getUint32(p.value+4,!0)+Number(m.getUint32(p.value,!0)<<32),p.value+=8,S};function It(m,p){var S=m.getFloat32(p.value,!0);return p.value+=4,S}function $a(m,p){return Mi.toHalfFloat(It(m,p))}function Z(m){var p=(m&31744)>>10,S=m&1023;return(m>>15?-1:1)*(p?p===31?S?NaN:1/0:Math.pow(2,p-15)*(1+S/1024):6103515625e-14*(S/1024))}function qi(m,p){var S=m.getUint16(p.value,!0);return p.value+=2,S}function Qa(m,p){return Z(qi(m,p))}function Ka(m,p,S,P){for(var N=S.value,U=[];S.value<N+P-1;){var D=de(p,S),F=Zi(m,S),V=fi(m,S);S.value+=3;var k=Zi(m,S),J=Zi(m,S);U.push({name:D,pixelType:F,pLinear:V,xSampling:k,ySampling:J})}return S.value+=1,U}function ja(m,p){var S=It(m,p),P=It(m,p),N=It(m,p),U=It(m,p),D=It(m,p),F=It(m,p),V=It(m,p),k=It(m,p);return{redX:S,redY:P,greenX:N,greenY:U,blueX:D,blueY:F,whiteX:V,whiteY:k}}function to(m,p){var S=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],P=fi(m,p);return S[P]}function eo(m,p){var S=Gt(m,p),P=Gt(m,p),N=Gt(m,p),U=Gt(m,p);return{xMin:S,yMin:P,xMax:N,yMax:U}}function io(m,p){var S=["INCREASING_Y"],P=fi(m,p);return S[P]}function ro(m,p){var S=It(m,p),P=It(m,p);return[S,P]}function so(m,p){var S=It(m,p),P=It(m,p),N=It(m,p);return[S,P,N]}function no(m,p,S,P,N){if(P==="string"||P==="stringvector"||P==="iccProfile")return pt(p,S,N);if(P==="chlist")return Ka(m,p,S,N);if(P==="chromaticities")return ja(m,S);if(P==="compression")return to(m,S);if(P==="box2i")return eo(m,S);if(P==="lineOrder")return io(m,S);if(P==="float")return It(m,S);if(P==="v2f")return ro(m,S);if(P==="v3f")return so(m,S);if(P==="int")return Zi(m,S);if(P==="rational")return Ya(m,S);if(P==="timecode")return Wa(m,S);if(P==="preview")return S.value+=N,"skipped";S.value+=N}function ao(m,p,S){const P={};if(m.getUint32(0,!0)!=20000630)throw"THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.";P.version=m.getUint8(4);const N=m.getUint8(5);P.spec={singleTile:!!(N&2),longName:!!(N&4),deepFormat:!!(N&8),multiPart:!!(N&16)},S.value=8;for(var U=!0;U;){var D=de(p,S);if(D==0)U=!1;else{var F=de(p,S),V=Gt(m,S),k=no(m,p,S,F,V);k===void 0?console.warn(`EXRLoader.parse: skipped unknown header attribute type '${F}'.`):P[D]=k}}if((N&-5)!=0)throw console.error("EXRHeader:",P),"THREE.EXRLoader: provided file is currently unsupported.";return P}function oo(m,p,S,P,N){const U={size:0,viewer:p,array:S,offset:P,width:m.dataWindow.xMax-m.dataWindow.xMin+1,height:m.dataWindow.yMax-m.dataWindow.yMin+1,channels:m.channels.length,bytesPerLine:null,lines:null,inputSize:null,type:m.channels[0].pixelType,uncompress:null,getter:null,format:null,[Qi?"colorSpace":"encoding"]:null};switch(m.compression){case"NO_COMPRESSION":U.lines=1,U.uncompress=Pe;break;case"RLE_COMPRESSION":U.lines=1,U.uncompress=qe;break;case"ZIPS_COMPRESSION":U.lines=1,U.uncompress=Me;break;case"ZIP_COMPRESSION":U.lines=16,U.uncompress=Me;break;case"PIZ_COMPRESSION":U.lines=32,U.uncompress=Ye;break;case"PXR24_COMPRESSION":U.lines=16,U.uncompress=We;break;case"DWAA_COMPRESSION":U.lines=32,U.uncompress=Ce;break;case"DWAB_COMPRESSION":U.lines=256,U.uncompress=Ce;break;default:throw"EXRLoader.parse: "+m.compression+" is unsupported"}if(U.scanlineBlockSize=U.lines,U.type==1)switch(N){case Xt:U.getter=Qa,U.inputSize=2;break;case ie:U.getter=qi,U.inputSize=2;break}else if(U.type==2)switch(N){case Xt:U.getter=It,U.inputSize=4;break;case ie:U.getter=$a,U.inputSize=4}else throw"EXRLoader.parse: unsupported pixelType "+U.type+" for "+m.compression+".";U.blockCount=(m.dataWindow.yMax+1)/U.scanlineBlockSize;for(var D=0;D<U.blockCount;D++)Kt(p,P);U.outputChannels=U.channels==3?4:U.channels;const F=U.width*U.height*U.outputChannels;switch(N){case Xt:U.byteArray=new Float32Array(F),U.channels<U.outputChannels&&U.byteArray.fill(1,0,F);break;case ie:U.byteArray=new Uint16Array(F),U.channels<U.outputChannels&&U.byteArray.fill(15360,0,F);break;default:console.error("THREE.EXRLoader: unsupported type: ",N);break}return U.bytesPerLine=U.width*U.inputSize*U.channels,U.outputChannels==4?U.format=Te:U.format=ha,Qi?U.colorSpace="srgb-linear":U.encoding=3e3,U}const Zr=new DataView(t),co=new Uint8Array(t),Yi={value:0},Wi=ao(Zr,t,Yi),st=oo(Wi,Zr,co,Yi,this.type),Dn={value:0},lo={R:0,G:1,B:2,A:3,Y:0};for(let m=0;m<st.height/st.scanlineBlockSize;m++){const p=Gt(Zr,Yi);st.size=Gt(Zr,Yi),st.lines=p+st.scanlineBlockSize>st.height?st.height-p:st.scanlineBlockSize;const P=st.size<st.lines*st.bytesPerLine?st.uncompress(st):Pe(st);Yi.value+=st.size;for(let N=0;N<st.scanlineBlockSize;N++){const U=N+m*st.scanlineBlockSize;if(U>=st.height)break;for(let D=0;D<st.channels;D++){const F=lo[Wi.channels[D].name];for(let V=0;V<st.width;V++){Dn.value=(N*(st.channels*st.width)+D*st.width+V)*st.inputSize;const k=(st.height-1-U)*(st.width*st.outputChannels)+V*st.outputChannels+F;st.byteArray[k]=st.getter(P,Dn)}}}}return{header:Wi,width:st.width,height:st.height,data:st.byteArray,format:st.format,[Qi?"colorSpace":"encoding"]:st[Qi?"colorSpace":"encoding"],type:this.type}}setDataType(t){return this.type=t,this}load(t,e,i,r){function s(a,c){Qi?a.colorSpace=c.colorSpace:a.encoding=c.encoding,a.minFilter=ge,a.magFilter=ge,a.generateMipmaps=!1,a.flipY=!1,e&&e(a,c)}return super.load(t,s,i,r)}}const Aa=0,vc=1,Ta=2,Vn=2,Fs=1.25,Jn=1,Je=32,Ns=65535,xc=Math.pow(2,-24),Ds=Symbol("SKIP_GENERATION");function za(n){return n.index?n.index.count:n.attributes.position.count}function Oi(n){return za(n)/3}function Ea(n,t=ArrayBuffer){return n>65535?new Uint32Array(new t(4*n)):new Uint16Array(new t(2*n))}function _c(n,t){if(!n.index){const e=n.attributes.position.count,i=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=Ea(e,i);n.setIndex(new le(r,1));for(let s=0;s<e;s++)r[s]=s}}function Pa(n,t){const e=Oi(n),i=t||n.drawRange,r=i.start/3,s=(i.start+i.count)/3,a=Math.max(0,r),c=Math.min(e,s)-a;return[{offset:Math.floor(a),count:Math.floor(c)}]}function Ca(n,t){if(!n.groups||!n.groups.length)return Pa(n,t);const e=[],i=new Set,r=t||n.drawRange,s=r.start/3,a=(r.start+r.count)/3;for(const o of n.groups){const l=o.start/3,u=(o.start+o.count)/3;i.add(Math.max(s,l)),i.add(Math.min(a,u))}const c=Array.from(i.values()).sort((o,l)=>o-l);for(let o=0;o<c.length-1;o++){const l=c[o],u=c[o+1];e.push({offset:Math.floor(l),count:Math.floor(u-l)})}return e}function wc(n,t){const e=Oi(n),i=Ca(n,t).sort((a,c)=>a.offset-c.offset),r=i[i.length-1];r.count=Math.min(e-r.offset,r.count);let s=0;return i.forEach(({count:a})=>s+=a),e!==s}function Ls(n,t,e,i,r){let s=1/0,a=1/0,c=1/0,o=-1/0,l=-1/0,u=-1/0,d=1/0,h=1/0,f=1/0,y=-1/0,x=-1/0,g=-1/0;for(let v=t*6,M=(t+e)*6;v<M;v+=6){const b=n[v+0],z=n[v+1],_=b-z,w=b+z;_<s&&(s=_),w>o&&(o=w),b<d&&(d=b),b>y&&(y=b);const A=n[v+2],T=n[v+3],E=A-T,C=A+T;E<a&&(a=E),C>l&&(l=C),A<h&&(h=A),A>x&&(x=A);const I=n[v+4],B=n[v+5],R=I-B,O=I+B;R<c&&(c=R),O>u&&(u=O),I<f&&(f=I),I>g&&(g=I)}i[0]=s,i[1]=a,i[2]=c,i[3]=o,i[4]=l,i[5]=u,r[0]=d,r[1]=h,r[2]=f,r[3]=y,r[4]=x,r[5]=g}function Mc(n,t=null,e=null,i=null){const r=n.attributes.position,s=n.index?n.index.array:null,a=Oi(n),c=r.normalized;let o;t===null?(o=new Float32Array(a*6),e=0,i=a):(o=t,e=e||0,i=i||a);const l=r.array,u=r.offset||0;let d=3;r.isInterleavedBufferAttribute&&(d=r.data.stride);const h=["getX","getY","getZ"];for(let f=e;f<e+i;f++){const y=f*3,x=f*6;let g=y+0,v=y+1,M=y+2;s&&(g=s[g],v=s[v],M=s[M]),c||(g=g*d+u,v=v*d+u,M=M*d+u);for(let b=0;b<3;b++){let z,_,w;c?(z=r[h[b]](g),_=r[h[b]](v),w=r[h[b]](M)):(z=l[g+b],_=l[v+b],w=l[M+b]);let A=z;_<A&&(A=_),w<A&&(A=w);let T=z;_>T&&(T=_),w>T&&(T=w);const E=(T-A)/2,C=b*2;o[x+C+0]=A+E,o[x+C+1]=E+(Math.abs(A)+E)*xc}}return o}function At(n,t,e){return e.min.x=t[n],e.min.y=t[n+1],e.min.z=t[n+2],e.max.x=t[n+3],e.max.y=t[n+4],e.max.z=t[n+5],e}function Gn(n){let t=-1,e=-1/0;for(let i=0;i<3;i++){const r=n[i+3]-n[i];r>e&&(e=r,t=i)}return t}function Hn(n,t){t.set(n)}function Xn(n,t,e){let i,r;for(let s=0;s<3;s++){const a=s+3;i=n[s],r=t[s],e[s]=i<r?i:r,i=n[a],r=t[a],e[a]=i>r?i:r}}function Yr(n,t,e){for(let i=0;i<3;i++){const r=t[n+2*i],s=t[n+2*i+1],a=r-s,c=r+s;a<e[i]&&(e[i]=a),c>e[i+3]&&(e[i+3]=c)}}function Ki(n){const t=n[3]-n[0],e=n[4]-n[1],i=n[5]-n[2];return 2*(t*e+e*i+i*t)}const be=32,Sc=(n,t)=>n.candidate-t.candidate,Ue=new Array(be).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),Wr=new Float32Array(6);function bc(n,t,e,i,r,s){let a=-1,c=0;if(s===Aa)a=Gn(t),a!==-1&&(c=(t[a]+t[a+3])/2);else if(s===vc)a=Gn(n),a!==-1&&(c=Ac(e,i,r,a));else if(s===Ta){const o=Ki(n);let l=Fs*r;const u=i*6,d=(i+r)*6;for(let h=0;h<3;h++){const f=t[h],g=(t[h+3]-f)/be;if(r<be/4){const v=[...Ue];v.length=r;let M=0;for(let z=u;z<d;z+=6,M++){const _=v[M];_.candidate=e[z+2*h],_.count=0;const{bounds:w,leftCacheBounds:A,rightCacheBounds:T}=_;for(let E=0;E<3;E++)T[E]=1/0,T[E+3]=-1/0,A[E]=1/0,A[E+3]=-1/0,w[E]=1/0,w[E+3]=-1/0;Yr(z,e,w)}v.sort(Sc);let b=r;for(let z=0;z<b;z++){const _=v[z];for(;z+1<b&&v[z+1].candidate===_.candidate;)v.splice(z+1,1),b--}for(let z=u;z<d;z+=6){const _=e[z+2*h];for(let w=0;w<b;w++){const A=v[w];_>=A.candidate?Yr(z,e,A.rightCacheBounds):(Yr(z,e,A.leftCacheBounds),A.count++)}}for(let z=0;z<b;z++){const _=v[z],w=_.count,A=r-_.count,T=_.leftCacheBounds,E=_.rightCacheBounds;let C=0;w!==0&&(C=Ki(T)/o);let I=0;A!==0&&(I=Ki(E)/o);const B=Jn+Fs*(C*w+I*A);B<l&&(a=h,l=B,c=_.candidate)}}else{for(let b=0;b<be;b++){const z=Ue[b];z.count=0,z.candidate=f+g+b*g;const _=z.bounds;for(let w=0;w<3;w++)_[w]=1/0,_[w+3]=-1/0}for(let b=u;b<d;b+=6){let w=~~((e[b+2*h]-f)/g);w>=be&&(w=be-1);const A=Ue[w];A.count++,Yr(b,e,A.bounds)}const v=Ue[be-1];Hn(v.bounds,v.rightCacheBounds);for(let b=be-2;b>=0;b--){const z=Ue[b],_=Ue[b+1];Xn(z.bounds,_.rightCacheBounds,z.rightCacheBounds)}let M=0;for(let b=0;b<be-1;b++){const z=Ue[b],_=z.count,w=z.bounds,T=Ue[b+1].rightCacheBounds;_!==0&&(M===0?Hn(w,Wr):Xn(w,Wr,Wr)),M+=_;let E=0,C=0;M!==0&&(E=Ki(Wr)/o);const I=r-M;I!==0&&(C=Ki(T)/o);const B=Jn+Fs*(E*M+C*I);B<l&&(a=h,l=B,c=z.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${s} used.`);return{axis:a,pos:c}}function Ac(n,t,e,i){let r=0;for(let s=t,a=t+e;s<a;s++)r+=n[s*6+i*2];return r/e}class ks{constructor(){this.boundingData=new Float32Array(6)}}function Tc(n,t,e,i,r,s){let a=i,c=i+r-1;const o=s.pos,l=s.axis*2;for(;;){for(;a<=c&&e[a*6+l]<o;)a++;for(;a<=c&&e[c*6+l]>=o;)c--;if(a<c){for(let u=0;u<3;u++){let d=t[a*3+u];t[a*3+u]=t[c*3+u],t[c*3+u]=d}for(let u=0;u<6;u++){let d=e[a*6+u];e[a*6+u]=e[c*6+u],e[c*6+u]=d}a++,c--}else return a}}function zc(n,t,e,i,r,s){let a=i,c=i+r-1;const o=s.pos,l=s.axis*2;for(;;){for(;a<=c&&e[a*6+l]<o;)a++;for(;a<=c&&e[c*6+l]>=o;)c--;if(a<c){let u=n[a];n[a]=n[c],n[c]=u;for(let d=0;d<6;d++){let h=e[a*6+d];e[a*6+d]=e[c*6+d],e[c*6+d]=h}a++,c--}else return a}}function Vt(n,t){return t[n+15]===65535}function Ht(n,t){return t[n+6]}function Wt(n,t){return t[n+14]}function re(n){return n+8}function $t(n,t){return t[n+6]}function Mn(n,t){return t[n+7]}let Ba,or,gs,Na;const Ec=Math.pow(2,32);function ln(n){return"count"in n?1:1+ln(n.left)+ln(n.right)}function Pc(n,t,e){return Ba=new Float32Array(e),or=new Uint32Array(e),gs=new Uint16Array(e),Na=new Uint8Array(e),hn(n,t)}function hn(n,t){const e=n/4,i=n/2,r="count"in t,s=t.boundingData;for(let a=0;a<6;a++)Ba[e+a]=s[a];if(r)if(t.buffer){const a=t.buffer;Na.set(new Uint8Array(a),n);for(let c=n,o=n+a.byteLength;c<o;c+=Je){const l=c/2;Vt(l,gs)||(or[c/4+6]+=e)}return n+a.byteLength}else{const a=t.offset,c=t.count;return or[e+6]=a,gs[i+14]=c,gs[i+15]=Ns,n+Je}else{const a=t.left,c=t.right,o=t.splitAxis;let l;if(l=hn(n+Je,a),l/4>Ec)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return or[e+6]=l/4,l=hn(l,c),or[e+7]=o,l}}function Cc(n,t){const e=(n.index?n.index.count:n.attributes.position.count)/3,i=e>2**16,r=i?4:2,s=t?new SharedArrayBuffer(e*r):new ArrayBuffer(e*r),a=i?new Uint32Array(s):new Uint16Array(s);for(let c=0,o=a.length;c<o;c++)a[c]=c;return a}function Bc(n,t,e,i,r){const{maxDepth:s,verbose:a,maxLeafTris:c,strategy:o,onProgress:l,indirect:u}=r,d=n._indirectBuffer,h=n.geometry,f=h.index?h.index.array:null,y=u?zc:Tc,x=Oi(h),g=new Float32Array(6);let v=!1;const M=new ks;return Ls(t,e,i,M.boundingData,g),z(M,e,i,g),M;function b(_){l&&l(_/x)}function z(_,w,A,T=null,E=0){if(!v&&E>=s&&(v=!0,a&&(console.warn(`MeshBVH: Max depth of ${s} reached when generating BVH. Consider increasing maxDepth.`),console.warn(h))),A<=c||E>=s)return b(w+A),_.offset=w,_.count=A,_;const C=bc(_.boundingData,T,t,w,A,o);if(C.axis===-1)return b(w+A),_.offset=w,_.count=A,_;const I=y(d,f,t,w,A,C);if(I===w||I===w+A)b(w+A),_.offset=w,_.count=A;else{_.splitAxis=C.axis;const B=new ks,R=w,O=I-w;_.left=B,Ls(t,R,O,B.boundingData,g),z(B,R,O,g,E+1);const X=new ks,H=I,nt=A-O;_.right=X,Ls(t,H,nt,X.boundingData,g),z(X,H,nt,g,E+1)}return _}}function Nc(n,t){const e=n.geometry;t.indirect&&(n._indirectBuffer=Cc(e,t.useSharedArrayBuffer),wc(e,t.range)&&!t.verbose&&console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),n._indirectBuffer||_c(e,t);const i=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=Mc(e),s=t.indirect?Pa(e,t.range):Ca(e,t.range);n._roots=s.map(a=>{const c=Bc(n,r,a.offset,a.count,t),o=ln(c),l=new i(Je*o);return Pc(0,c,l),l})}class Ee{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(t,e){let i=1/0,r=-1/0;for(let s=0,a=t.length;s<a;s++){const o=t[s][e];i=o<i?o:i,r=o>r?o:r}this.min=i,this.max=r}setFromPoints(t,e){let i=1/0,r=-1/0;for(let s=0,a=e.length;s<a;s++){const c=e[s],o=t.dot(c);i=o<i?o:i,r=o>r?o:r}this.min=i,this.max=r}isSeparated(t){return this.min>t.max||t.min>this.max}}Ee.prototype.setFromBox=(function(){const n=new $;return function(e,i){const r=i.min,s=i.max;let a=1/0,c=-1/0;for(let o=0;o<=1;o++)for(let l=0;l<=1;l++)for(let u=0;u<=1;u++){n.x=r.x*o+s.x*(1-o),n.y=r.y*l+s.y*(1-l),n.z=r.z*u+s.z*(1-u);const d=e.dot(n);a=Math.min(d,a),c=Math.max(d,c)}this.min=a,this.max=c}})();const Uc=(function(){const n=new $,t=new $,e=new $;return function(r,s,a){const c=r.start,o=n,l=s.start,u=t;e.subVectors(c,l),n.subVectors(r.end,r.start),t.subVectors(s.end,s.start);const d=e.dot(u),h=u.dot(o),f=u.dot(u),y=e.dot(o),g=o.dot(o)*f-h*h;let v,M;g!==0?v=(d*h-y*f)/g:v=0,M=(d+v*h)/f,a.x=v,a.y=M}})(),Sn=(function(){const n=new ni,t=new $,e=new $;return function(r,s,a,c){Uc(r,s,n);let o=n.x,l=n.y;if(o>=0&&o<=1&&l>=0&&l<=1){r.at(o,a),s.at(l,c);return}else if(o>=0&&o<=1){l<0?s.at(0,c):s.at(1,c),r.closestPointToPoint(c,!0,a);return}else if(l>=0&&l<=1){o<0?r.at(0,a):r.at(1,a),s.closestPointToPoint(a,!0,c);return}else{let u;o<0?u=r.start:u=r.end;let d;l<0?d=s.start:d=s.end;const h=t,f=e;if(r.closestPointToPoint(d,!0,t),s.closestPointToPoint(u,!0,e),h.distanceToSquared(d)<=f.distanceToSquared(u)){a.copy(h),c.copy(d);return}else{a.copy(u),c.copy(f);return}}}})(),Ic=(function(){const n=new $,t=new $,e=new ua,i=new Ae;return function(s,a){const{radius:c,center:o}=s,{a:l,b:u,c:d}=a;if(i.start=l,i.end=u,i.closestPointToPoint(o,!0,n).distanceTo(o)<=c||(i.start=l,i.end=d,i.closestPointToPoint(o,!0,n).distanceTo(o)<=c)||(i.start=u,i.end=d,i.closestPointToPoint(o,!0,n).distanceTo(o)<=c))return!0;const x=a.getPlane(e);if(Math.abs(x.distanceToPoint(o))<=c){const v=x.projectPoint(o,t);if(a.containsPoint(v))return!0}return!1}})(),Oc=1e-15;function Vs(n){return Math.abs(n)<Oc}class he extends ei{constructor(...t){super(...t),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new $),this.satBounds=new Array(4).fill().map(()=>new Ee),this.points=[this.a,this.b,this.c],this.sphere=new Mo,this.plane=new ua,this.needsUpdate=!0}intersectsSphere(t){return Ic(t,this)}update(){const t=this.a,e=this.b,i=this.c,r=this.points,s=this.satAxes,a=this.satBounds,c=s[0],o=a[0];this.getNormal(c),o.setFromPoints(c,r);const l=s[1],u=a[1];l.subVectors(t,e),u.setFromPoints(l,r);const d=s[2],h=a[2];d.subVectors(e,i),h.setFromPoints(d,r);const f=s[3],y=a[3];f.subVectors(i,t),y.setFromPoints(f,r),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(c,t),this.needsUpdate=!1}}he.prototype.closestPointToSegment=(function(){const n=new $,t=new $,e=new Ae;return function(r,s=null,a=null){const{start:c,end:o}=r,l=this.points;let u,d=1/0;for(let h=0;h<3;h++){const f=(h+1)%3;e.start.copy(l[h]),e.end.copy(l[f]),Sn(e,r,n,t),u=n.distanceToSquared(t),u<d&&(d=u,s&&s.copy(n),a&&a.copy(t))}return this.closestPointToPoint(c,n),u=c.distanceToSquared(n),u<d&&(d=u,s&&s.copy(n),a&&a.copy(c)),this.closestPointToPoint(o,n),u=o.distanceToSquared(n),u<d&&(d=u,s&&s.copy(n),a&&a.copy(o)),Math.sqrt(d)}})();he.prototype.intersectsTriangle=(function(){const n=new he,t=new Array(3),e=new Array(3),i=new Ee,r=new Ee,s=new $,a=new $,c=new $,o=new $,l=new $,u=new Ae,d=new Ae,h=new Ae,f=new $;function y(x,g,v){const M=x.points;let b=0,z=-1;for(let _=0;_<3;_++){const{start:w,end:A}=u;w.copy(M[_]),A.copy(M[(_+1)%3]),u.delta(a);const T=Vs(g.distanceToPoint(w));if(Vs(g.normal.dot(a))&&T){v.copy(u),b=2;break}const E=g.intersectLine(u,f);if(!E&&T&&f.copy(w),(E||T)&&!Vs(f.distanceTo(A))){if(b<=1)(b===1?v.start:v.end).copy(f),T&&(z=b);else if(b>=2){(z===1?v.start:v.end).copy(f),b=2;break}if(b++,b===2&&z===-1)break}}return b}return function(g,v=null,M=!1){this.needsUpdate&&this.update(),g.isExtendedTriangle?g.needsUpdate&&g.update():(n.copy(g),n.update(),g=n);const b=this.plane,z=g.plane;if(Math.abs(b.normal.dot(z.normal))>1-1e-10){const _=this.satBounds,w=this.satAxes;e[0]=g.a,e[1]=g.b,e[2]=g.c;for(let E=0;E<4;E++){const C=_[E],I=w[E];if(i.setFromPoints(I,e),C.isSeparated(i))return!1}const A=g.satBounds,T=g.satAxes;t[0]=this.a,t[1]=this.b,t[2]=this.c;for(let E=0;E<4;E++){const C=A[E],I=T[E];if(i.setFromPoints(I,t),C.isSeparated(i))return!1}for(let E=0;E<4;E++){const C=w[E];for(let I=0;I<4;I++){const B=T[I];if(s.crossVectors(C,B),i.setFromPoints(s,t),r.setFromPoints(s,e),i.isSeparated(r))return!1}}return v&&(M||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),v.start.set(0,0,0),v.end.set(0,0,0)),!0}else{const _=y(this,z,d);if(_===1&&g.containsPoint(d.end))return v&&(v.start.copy(d.end),v.end.copy(d.end)),!0;if(_!==2)return!1;const w=y(g,b,h);if(w===1&&this.containsPoint(h.end))return v&&(v.start.copy(h.end),v.end.copy(h.end)),!0;if(w!==2)return!1;if(d.delta(c),h.delta(o),c.dot(o)<0){let R=h.start;h.start=h.end,h.end=R}const A=d.start.dot(c),T=d.end.dot(c),E=h.start.dot(c),C=h.end.dot(c),I=T<E,B=A<C;return A!==C&&E!==T&&I===B?!1:(v&&(l.subVectors(d.start,h.start),l.dot(c)>0?v.start.copy(d.start):v.start.copy(h.start),l.subVectors(d.end,h.end),l.dot(c)<0?v.end.copy(d.end):v.end.copy(h.end)),!0)}}})();he.prototype.distanceToPoint=(function(){const n=new $;return function(e){return this.closestPointToPoint(e,n),e.distanceTo(n)}})();he.prototype.distanceToTriangle=(function(){const n=new $,t=new $,e=["a","b","c"],i=new Ae,r=new Ae;return function(a,c=null,o=null){const l=c||o?i:null;if(this.intersectsTriangle(a,l))return(c||o)&&(c&&l.getCenter(c),o&&l.getCenter(o)),0;let u=1/0;for(let d=0;d<3;d++){let h;const f=e[d],y=a[f];this.closestPointToPoint(y,n),h=y.distanceToSquared(n),h<u&&(u=h,c&&c.copy(n),o&&o.copy(y));const x=this[f];a.closestPointToPoint(x,n),h=x.distanceToSquared(n),h<u&&(u=h,c&&c.copy(x),o&&o.copy(n))}for(let d=0;d<3;d++){const h=e[d],f=e[(d+1)%3];i.set(this[h],this[f]);for(let y=0;y<3;y++){const x=e[y],g=e[(y+1)%3];r.set(a[x],a[g]),Sn(i,r,n,t);const v=n.distanceToSquared(t);v<u&&(u=v,c&&c.copy(n),o&&o.copy(t))}}return Math.sqrt(u)}})();class Jt{constructor(t,e,i){this.isOrientedBox=!0,this.min=new $,this.max=new $,this.matrix=new ze,this.invMatrix=new ze,this.points=new Array(8).fill().map(()=>new $),this.satAxes=new Array(3).fill().map(()=>new $),this.satBounds=new Array(3).fill().map(()=>new Ee),this.alignedSatBounds=new Array(3).fill().map(()=>new Ee),this.needsUpdate=!1,t&&this.min.copy(t),e&&this.max.copy(e),i&&this.matrix.copy(i)}set(t,e,i){this.min.copy(t),this.max.copy(e),this.matrix.copy(i),this.needsUpdate=!0}copy(t){this.min.copy(t.min),this.max.copy(t.max),this.matrix.copy(t.matrix),this.needsUpdate=!0}}Jt.prototype.update=(function(){return function(){const t=this.matrix,e=this.min,i=this.max,r=this.points;for(let l=0;l<=1;l++)for(let u=0;u<=1;u++)for(let d=0;d<=1;d++){const h=1*l|2*u|4*d,f=r[h];f.x=l?i.x:e.x,f.y=u?i.y:e.y,f.z=d?i.z:e.z,f.applyMatrix4(t)}const s=this.satBounds,a=this.satAxes,c=r[0];for(let l=0;l<3;l++){const u=a[l],d=s[l],h=1<<l,f=r[h];u.subVectors(c,f),d.setFromPoints(u,r)}const o=this.alignedSatBounds;o[0].setFromPointsField(r,"x"),o[1].setFromPointsField(r,"y"),o[2].setFromPointsField(r,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();Jt.prototype.intersectsBox=(function(){const n=new Ee;return function(e){this.needsUpdate&&this.update();const i=e.min,r=e.max,s=this.satBounds,a=this.satAxes,c=this.alignedSatBounds;if(n.min=i.x,n.max=r.x,c[0].isSeparated(n)||(n.min=i.y,n.max=r.y,c[1].isSeparated(n))||(n.min=i.z,n.max=r.z,c[2].isSeparated(n)))return!1;for(let o=0;o<3;o++){const l=a[o],u=s[o];if(n.setFromBox(l,e),u.isSeparated(n))return!1}return!0}})();Jt.prototype.intersectsTriangle=(function(){const n=new he,t=new Array(3),e=new Ee,i=new Ee,r=new $;return function(a){this.needsUpdate&&this.update(),a.isExtendedTriangle?a.needsUpdate&&a.update():(n.copy(a),n.update(),a=n);const c=this.satBounds,o=this.satAxes;t[0]=a.a,t[1]=a.b,t[2]=a.c;for(let h=0;h<3;h++){const f=c[h],y=o[h];if(e.setFromPoints(y,t),f.isSeparated(e))return!1}const l=a.satBounds,u=a.satAxes,d=this.points;for(let h=0;h<3;h++){const f=l[h],y=u[h];if(e.setFromPoints(y,d),f.isSeparated(e))return!1}for(let h=0;h<3;h++){const f=o[h];for(let y=0;y<4;y++){const x=u[y];if(r.crossVectors(f,x),e.setFromPoints(r,t),i.setFromPoints(r,d),e.isSeparated(i))return!1}}return!0}})();Jt.prototype.closestPointToPoint=(function(){return function(t,e){return this.needsUpdate&&this.update(),e.copy(t).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),e}})();Jt.prototype.distanceToPoint=(function(){const n=new $;return function(e){return this.closestPointToPoint(e,n),e.distanceTo(n)}})();Jt.prototype.distanceToBox=(function(){const n=["x","y","z"],t=new Array(12).fill().map(()=>new Ae),e=new Array(12).fill().map(()=>new Ae),i=new $,r=new $;return function(a,c=0,o=null,l=null){if(this.needsUpdate&&this.update(),this.intersectsBox(a))return(o||l)&&(a.getCenter(r),this.closestPointToPoint(r,i),a.closestPointToPoint(i,r),o&&o.copy(i),l&&l.copy(r)),0;const u=c*c,d=a.min,h=a.max,f=this.points;let y=1/0;for(let g=0;g<8;g++){const v=f[g];r.copy(v).clamp(d,h);const M=v.distanceToSquared(r);if(M<y&&(y=M,o&&o.copy(v),l&&l.copy(r),M<u))return Math.sqrt(M)}let x=0;for(let g=0;g<3;g++)for(let v=0;v<=1;v++)for(let M=0;M<=1;M++){const b=(g+1)%3,z=(g+2)%3,_=v<<b|M<<z,w=1<<g|v<<b|M<<z,A=f[_],T=f[w];t[x].set(A,T);const C=n[g],I=n[b],B=n[z],R=e[x],O=R.start,X=R.end;O[C]=d[C],O[I]=v?d[I]:h[I],O[B]=M?d[B]:h[I],X[C]=h[C],X[I]=v?d[I]:h[I],X[B]=M?d[B]:h[I],x++}for(let g=0;g<=1;g++)for(let v=0;v<=1;v++)for(let M=0;M<=1;M++){r.x=g?h.x:d.x,r.y=v?h.y:d.y,r.z=M?h.z:d.z,this.closestPointToPoint(r,i);const b=r.distanceToSquared(i);if(b<y&&(y=b,o&&o.copy(i),l&&l.copy(r),b<u))return Math.sqrt(b)}for(let g=0;g<12;g++){const v=t[g];for(let M=0;M<12;M++){const b=e[M];Sn(v,b,i,r);const z=i.distanceToSquared(r);if(z<y&&(y=z,o&&o.copy(i),l&&l.copy(r),z<u))return Math.sqrt(z)}}return Math.sqrt(y)}})();class bn{constructor(t){this._getNewPrimitive=t,this._primitives=[]}getPrimitive(){const t=this._primitives;return t.length===0?this._getNewPrimitive():t.pop()}releasePrimitive(t){this._primitives.push(t)}}class Rc extends bn{constructor(){super(()=>new he)}}const se=new Rc;class Fc{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const t=[];let e=null;this.setBuffer=i=>{e&&t.push(e),e=i,this.float32Array=new Float32Array(i),this.uint16Array=new Uint16Array(i),this.uint32Array=new Uint32Array(i)},this.clearBuffer=()=>{e=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,t.length!==0&&this.setBuffer(t.pop())}}}const wt=new Fc;let Le,Ai;const mi=[],$r=new bn(()=>new we);function Dc(n,t,e,i,r,s){Le=$r.getPrimitive(),Ai=$r.getPrimitive(),mi.push(Le,Ai),wt.setBuffer(n._roots[t]);const a=un(0,n.geometry,e,i,r,s);wt.clearBuffer(),$r.releasePrimitive(Le),$r.releasePrimitive(Ai),mi.pop(),mi.pop();const c=mi.length;return c>0&&(Ai=mi[c-1],Le=mi[c-2]),a}function un(n,t,e,i,r=null,s=0,a=0){const{float32Array:c,uint16Array:o,uint32Array:l}=wt;let u=n*2;if(Vt(u,o)){const h=Ht(n,l),f=Wt(u,o);return At(n,c,Le),i(h,f,!1,a,s+n,Le)}else{let C=function(B){const{uint16Array:R,uint32Array:O}=wt;let X=B*2;for(;!Vt(X,R);)B=re(B),X=B*2;return Ht(B,O)},I=function(B){const{uint16Array:R,uint32Array:O}=wt;let X=B*2;for(;!Vt(X,R);)B=$t(B,O),X=B*2;return Ht(B,O)+Wt(X,R)};const h=re(n),f=$t(n,l);let y=h,x=f,g,v,M,b;if(r&&(M=Le,b=Ai,At(y,c,M),At(x,c,b),g=r(M),v=r(b),v<g)){y=f,x=h;const B=g;g=v,v=B,M=b}M||(M=Le,At(y,c,M));const z=Vt(y*2,o),_=e(M,z,g,a+1,s+y);let w;if(_===Vn){const B=C(y),O=I(y)-B;w=i(B,O,!0,a+1,s+y,M)}else w=_&&un(y,t,e,i,r,s,a+1);if(w)return!0;b=Ai,At(x,c,b);const A=Vt(x*2,o),T=e(b,A,v,a+1,s+x);let E;if(T===Vn){const B=C(x),O=I(x)-B;E=i(B,O,!0,a+1,s+x,b)}else E=T&&un(x,t,e,i,r,s,a+1);return!!E}}const ji=new $,Js=new $;function Lc(n,t,e={},i=0,r=1/0){const s=i*i,a=r*r;let c=1/0,o=null;if(n.shapecast({boundsTraverseOrder:u=>(ji.copy(t).clamp(u.min,u.max),ji.distanceToSquared(t)),intersectsBounds:(u,d,h)=>h<c&&h<a,intersectsTriangle:(u,d)=>{u.closestPointToPoint(t,ji);const h=t.distanceToSquared(ji);return h<c&&(Js.copy(ji),c=h,o=d),h<s}}),c===1/0)return null;const l=Math.sqrt(c);return e.point?e.point.copy(Js):e.point=Js.clone(),e.distance=l,e.faceIndex=o,e}const kc=parseInt(bo)>=169,Ke=new $,je=new $,ti=new $,Qr=new ni,Kr=new ni,jr=new ni,Zn=new $,qn=new $,Yn=new $,tr=new $;function Vc(n,t,e,i,r,s,a,c){let o;if(s===So?o=n.intersectTriangle(i,e,t,!0,r):o=n.intersectTriangle(t,e,i,s!==si,r),o===null)return null;const l=n.origin.distanceTo(r);return l<a||l>c?null:{distance:l,point:r.clone()}}function Jc(n,t,e,i,r,s,a,c,o,l,u){Ke.fromBufferAttribute(t,s),je.fromBufferAttribute(t,a),ti.fromBufferAttribute(t,c);const d=Vc(n,Ke,je,ti,tr,o,l,u);if(d){const h=new $;ei.getBarycoord(tr,Ke,je,ti,h),i&&(Qr.fromBufferAttribute(i,s),Kr.fromBufferAttribute(i,a),jr.fromBufferAttribute(i,c),d.uv=ei.getInterpolation(tr,Ke,je,ti,Qr,Kr,jr,new ni)),r&&(Qr.fromBufferAttribute(r,s),Kr.fromBufferAttribute(r,a),jr.fromBufferAttribute(r,c),d.uv1=ei.getInterpolation(tr,Ke,je,ti,Qr,Kr,jr,new ni)),e&&(Zn.fromBufferAttribute(e,s),qn.fromBufferAttribute(e,a),Yn.fromBufferAttribute(e,c),d.normal=ei.getInterpolation(tr,Ke,je,ti,Zn,qn,Yn,new $),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const f={a:s,b:a,c,normal:new $,materialIndex:0};ei.getNormal(Ke,je,ti,f.normal),d.face=f,d.faceIndex=s,kc&&(d.barycoord=h)}return d}function Us(n,t,e,i,r,s,a){const c=i*3;let o=c+0,l=c+1,u=c+2;const d=n.index;n.index&&(o=d.getX(o),l=d.getX(l),u=d.getX(u));const{position:h,normal:f,uv:y,uv1:x}=n.attributes,g=Jc(e,h,f,y,x,o,l,u,t,s,a);return g?(g.faceIndex=i,r&&r.push(g),g):null}function Et(n,t,e,i){const r=n.a,s=n.b,a=n.c;let c=t,o=t+1,l=t+2;e&&(c=e.getX(c),o=e.getX(o),l=e.getX(l)),r.x=i.getX(c),r.y=i.getY(c),r.z=i.getZ(c),s.x=i.getX(o),s.y=i.getY(o),s.z=i.getZ(o),a.x=i.getX(l),a.y=i.getY(l),a.z=i.getZ(l)}function Gc(n,t,e,i,r,s,a,c){const{geometry:o,_indirectBuffer:l}=n;for(let u=i,d=i+r;u<d;u++)Us(o,t,e,u,s,a,c)}function Hc(n,t,e,i,r,s,a){const{geometry:c,_indirectBuffer:o}=n;let l=1/0,u=null;for(let d=i,h=i+r;d<h;d++){let f;f=Us(c,t,e,d,null,s,a),f&&f.distance<l&&(u=f,l=f.distance)}return u}function Xc(n,t,e,i,r,s,a){const{geometry:c}=e,{index:o}=c,l=c.attributes.position;for(let u=n,d=t+n;u<d;u++){let h;if(h=u,Et(a,h*3,o,l),a.needsUpdate=!0,i(a,h,r,s))return!0}return!1}function Zc(n,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=n.geometry,i=e.index?e.index.array:null,r=e.attributes.position;let s,a,c,o,l=0;const u=n._roots;for(let h=0,f=u.length;h<f;h++)s=u[h],a=new Uint32Array(s),c=new Uint16Array(s),o=new Float32Array(s),d(0,l),l+=s.byteLength;function d(h,f,y=!1){const x=h*2;if(c[x+15]===Ns){const v=a[h+6],M=c[x+14];let b=1/0,z=1/0,_=1/0,w=-1/0,A=-1/0,T=-1/0;for(let E=3*v,C=3*(v+M);E<C;E++){let I=i[E];const B=r.getX(I),R=r.getY(I),O=r.getZ(I);B<b&&(b=B),B>w&&(w=B),R<z&&(z=R),R>A&&(A=R),O<_&&(_=O),O>T&&(T=O)}return o[h+0]!==b||o[h+1]!==z||o[h+2]!==_||o[h+3]!==w||o[h+4]!==A||o[h+5]!==T?(o[h+0]=b,o[h+1]=z,o[h+2]=_,o[h+3]=w,o[h+4]=A,o[h+5]=T,!0):!1}else{const v=h+8,M=a[h+6],b=v+f,z=M+f;let _=y,w=!1,A=!1;t?_||(w=t.has(b),A=t.has(z),_=!w&&!A):(w=!0,A=!0);const T=_||w,E=_||A;let C=!1;T&&(C=d(v,f,_));let I=!1;E&&(I=d(M,f,_));const B=C||I;if(B)for(let R=0;R<3;R++){const O=v+R,X=M+R,H=o[O],nt=o[O+3],vt=o[X],lt=o[X+3];o[h+R]=H<vt?H:vt,o[h+R+3]=nt>lt?nt:lt}return B}}}function He(n,t,e,i,r){let s,a,c,o,l,u;const d=1/e.direction.x,h=1/e.direction.y,f=1/e.direction.z,y=e.origin.x,x=e.origin.y,g=e.origin.z;let v=t[n],M=t[n+3],b=t[n+1],z=t[n+3+1],_=t[n+2],w=t[n+3+2];return d>=0?(s=(v-y)*d,a=(M-y)*d):(s=(M-y)*d,a=(v-y)*d),h>=0?(c=(b-x)*h,o=(z-x)*h):(c=(z-x)*h,o=(b-x)*h),s>o||c>a||((c>s||isNaN(s))&&(s=c),(o<a||isNaN(a))&&(a=o),f>=0?(l=(_-g)*f,u=(w-g)*f):(l=(w-g)*f,u=(_-g)*f),s>u||l>a)?!1:((l>s||s!==s)&&(s=l),(u<a||a!==a)&&(a=u),s<=r&&a>=i)}function qc(n,t,e,i,r,s,a,c){const{geometry:o,_indirectBuffer:l}=n;for(let u=i,d=i+r;u<d;u++){let h=l?l[u]:u;Us(o,t,e,h,s,a,c)}}function Yc(n,t,e,i,r,s,a){const{geometry:c,_indirectBuffer:o}=n;let l=1/0,u=null;for(let d=i,h=i+r;d<h;d++){let f;f=Us(c,t,e,o?o[d]:d,null,s,a),f&&f.distance<l&&(u=f,l=f.distance)}return u}function Wc(n,t,e,i,r,s,a){const{geometry:c}=e,{index:o}=c,l=c.attributes.position;for(let u=n,d=t+n;u<d;u++){let h;if(h=e.resolveTriangleIndex(u),Et(a,h*3,o,l),a.needsUpdate=!0,i(a,h,r,s))return!0}return!1}function $c(n,t,e,i,r,s,a){wt.setBuffer(n._roots[t]),dn(0,n,e,i,r,s,a),wt.clearBuffer()}function dn(n,t,e,i,r,s,a){const{float32Array:c,uint16Array:o,uint32Array:l}=wt,u=n*2;if(Vt(u,o)){const h=Ht(n,l),f=Wt(u,o);Gc(t,e,i,h,f,r,s,a)}else{const h=re(n);He(h,c,i,s,a)&&dn(h,t,e,i,r,s,a);const f=$t(n,l);He(f,c,i,s,a)&&dn(f,t,e,i,r,s,a)}}const Qc=["x","y","z"];function Kc(n,t,e,i,r,s){wt.setBuffer(n._roots[t]);const a=fn(0,n,e,i,r,s);return wt.clearBuffer(),a}function fn(n,t,e,i,r,s){const{float32Array:a,uint16Array:c,uint32Array:o}=wt;let l=n*2;if(Vt(l,c)){const d=Ht(n,o),h=Wt(l,c);return Hc(t,e,i,d,h,r,s)}else{const d=Mn(n,o),h=Qc[d],y=i.direction[h]>=0;let x,g;y?(x=re(n),g=$t(n,o)):(x=$t(n,o),g=re(n));const M=He(x,a,i,r,s)?fn(x,t,e,i,r,s):null;if(M){const _=M.point[h];if(y?_<=a[g+d]:_>=a[g+d+3])return M}const z=He(g,a,i,r,s)?fn(g,t,e,i,r,s):null;return M&&z?M.distance<=z.distance?M:z:M||z||null}}const ts=new we,pi=new he,yi=new he,er=new ze,Wn=new Jt,es=new Jt;function jc(n,t,e,i){wt.setBuffer(n._roots[t]);const r=mn(0,n,e,i);return wt.clearBuffer(),r}function mn(n,t,e,i,r=null){const{float32Array:s,uint16Array:a,uint32Array:c}=wt;let o=n*2;if(r===null&&(e.boundingBox||e.computeBoundingBox(),Wn.set(e.boundingBox.min,e.boundingBox.max,i),r=Wn),Vt(o,a)){const u=t.geometry,d=u.index,h=u.attributes.position,f=e.index,y=e.attributes.position,x=Ht(n,c),g=Wt(o,a);if(er.copy(i).invert(),e.boundsTree)return At(n,s,es),es.matrix.copy(er),es.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:M=>es.intersectsBox(M),intersectsTriangle:M=>{M.a.applyMatrix4(i),M.b.applyMatrix4(i),M.c.applyMatrix4(i),M.needsUpdate=!0;for(let b=x*3,z=(g+x)*3;b<z;b+=3)if(Et(yi,b,d,h),yi.needsUpdate=!0,M.intersectsTriangle(yi))return!0;return!1}});for(let v=x*3,M=(g+x)*3;v<M;v+=3){Et(pi,v,d,h),pi.a.applyMatrix4(er),pi.b.applyMatrix4(er),pi.c.applyMatrix4(er),pi.needsUpdate=!0;for(let b=0,z=f.count;b<z;b+=3)if(Et(yi,b,f,y),yi.needsUpdate=!0,pi.intersectsTriangle(yi))return!0}}else{const u=n+8,d=c[n+6];return At(u,s,ts),!!(r.intersectsBox(ts)&&mn(u,t,e,i,r)||(At(d,s,ts),r.intersectsBox(ts)&&mn(d,t,e,i,r)))}}const is=new ze,Gs=new Jt,ir=new Jt,tl=new $,el=new $,il=new $,rl=new $;function sl(n,t,e,i={},r={},s=0,a=1/0){t.boundingBox||t.computeBoundingBox(),Gs.set(t.boundingBox.min,t.boundingBox.max,e),Gs.needsUpdate=!0;const c=n.geometry,o=c.attributes.position,l=c.index,u=t.attributes.position,d=t.index,h=se.getPrimitive(),f=se.getPrimitive();let y=tl,x=el,g=null,v=null;r&&(g=il,v=rl);let M=1/0,b=null,z=null;return is.copy(e).invert(),ir.matrix.copy(is),n.shapecast({boundsTraverseOrder:_=>Gs.distanceToBox(_),intersectsBounds:(_,w,A)=>A<M&&A<a?(w&&(ir.min.copy(_.min),ir.max.copy(_.max),ir.needsUpdate=!0),!0):!1,intersectsRange:(_,w)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:T=>ir.distanceToBox(T),intersectsBounds:(T,E,C)=>C<M&&C<a,intersectsRange:(T,E)=>{for(let C=T,I=T+E;C<I;C++){Et(f,3*C,d,u),f.a.applyMatrix4(e),f.b.applyMatrix4(e),f.c.applyMatrix4(e),f.needsUpdate=!0;for(let B=_,R=_+w;B<R;B++){Et(h,3*B,l,o),h.needsUpdate=!0;const O=h.distanceToTriangle(f,y,g);if(O<M&&(x.copy(y),v&&v.copy(g),M=O,b=B,z=C),O<s)return!0}}}});{const A=Oi(t);for(let T=0,E=A;T<E;T++){Et(f,3*T,d,u),f.a.applyMatrix4(e),f.b.applyMatrix4(e),f.c.applyMatrix4(e),f.needsUpdate=!0;for(let C=_,I=_+w;C<I;C++){Et(h,3*C,l,o),h.needsUpdate=!0;const B=h.distanceToTriangle(f,y,g);if(B<M&&(x.copy(y),v&&v.copy(g),M=B,b=C,z=T),B<s)return!0}}}}}),se.releasePrimitive(h),se.releasePrimitive(f),M===1/0?null:(i.point?i.point.copy(x):i.point=x.clone(),i.distance=M,i.faceIndex=b,r&&(r.point?r.point.copy(v):r.point=v.clone(),r.point.applyMatrix4(is),x.applyMatrix4(is),r.distance=x.sub(r.point).length(),r.faceIndex=z),i)}function nl(n,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=n.geometry,i=e.index?e.index.array:null,r=e.attributes.position;let s,a,c,o,l=0;const u=n._roots;for(let h=0,f=u.length;h<f;h++)s=u[h],a=new Uint32Array(s),c=new Uint16Array(s),o=new Float32Array(s),d(0,l),l+=s.byteLength;function d(h,f,y=!1){const x=h*2;if(c[x+15]===Ns){const v=a[h+6],M=c[x+14];let b=1/0,z=1/0,_=1/0,w=-1/0,A=-1/0,T=-1/0;for(let E=v,C=v+M;E<C;E++){const I=3*n.resolveTriangleIndex(E);for(let B=0;B<3;B++){let R=I+B;R=i?i[R]:R;const O=r.getX(R),X=r.getY(R),H=r.getZ(R);O<b&&(b=O),O>w&&(w=O),X<z&&(z=X),X>A&&(A=X),H<_&&(_=H),H>T&&(T=H)}}return o[h+0]!==b||o[h+1]!==z||o[h+2]!==_||o[h+3]!==w||o[h+4]!==A||o[h+5]!==T?(o[h+0]=b,o[h+1]=z,o[h+2]=_,o[h+3]=w,o[h+4]=A,o[h+5]=T,!0):!1}else{const v=h+8,M=a[h+6],b=v+f,z=M+f;let _=y,w=!1,A=!1;t?_||(w=t.has(b),A=t.has(z),_=!w&&!A):(w=!0,A=!0);const T=_||w,E=_||A;let C=!1;T&&(C=d(v,f,_));let I=!1;E&&(I=d(M,f,_));const B=C||I;if(B)for(let R=0;R<3;R++){const O=v+R,X=M+R,H=o[O],nt=o[O+3],vt=o[X],lt=o[X+3];o[h+R]=H<vt?H:vt,o[h+R+3]=nt>lt?nt:lt}return B}}}function al(n,t,e,i,r,s,a){wt.setBuffer(n._roots[t]),pn(0,n,e,i,r,s,a),wt.clearBuffer()}function pn(n,t,e,i,r,s,a){const{float32Array:c,uint16Array:o,uint32Array:l}=wt,u=n*2;if(Vt(u,o)){const h=Ht(n,l),f=Wt(u,o);qc(t,e,i,h,f,r,s,a)}else{const h=re(n);He(h,c,i,s,a)&&pn(h,t,e,i,r,s,a);const f=$t(n,l);He(f,c,i,s,a)&&pn(f,t,e,i,r,s,a)}}const ol=["x","y","z"];function cl(n,t,e,i,r,s){wt.setBuffer(n._roots[t]);const a=yn(0,n,e,i,r,s);return wt.clearBuffer(),a}function yn(n,t,e,i,r,s){const{float32Array:a,uint16Array:c,uint32Array:o}=wt;let l=n*2;if(Vt(l,c)){const d=Ht(n,o),h=Wt(l,c);return Yc(t,e,i,d,h,r,s)}else{const d=Mn(n,o),h=ol[d],y=i.direction[h]>=0;let x,g;y?(x=re(n),g=$t(n,o)):(x=$t(n,o),g=re(n));const M=He(x,a,i,r,s)?yn(x,t,e,i,r,s):null;if(M){const _=M.point[h];if(y?_<=a[g+d]:_>=a[g+d+3])return M}const z=He(g,a,i,r,s)?yn(g,t,e,i,r,s):null;return M&&z?M.distance<=z.distance?M:z:M||z||null}}const rs=new we,gi=new he,vi=new he,rr=new ze,$n=new Jt,ss=new Jt;function ll(n,t,e,i){wt.setBuffer(n._roots[t]);const r=gn(0,n,e,i);return wt.clearBuffer(),r}function gn(n,t,e,i,r=null){const{float32Array:s,uint16Array:a,uint32Array:c}=wt;let o=n*2;if(r===null&&(e.boundingBox||e.computeBoundingBox(),$n.set(e.boundingBox.min,e.boundingBox.max,i),r=$n),Vt(o,a)){const u=t.geometry,d=u.index,h=u.attributes.position,f=e.index,y=e.attributes.position,x=Ht(n,c),g=Wt(o,a);if(rr.copy(i).invert(),e.boundsTree)return At(n,s,ss),ss.matrix.copy(rr),ss.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:M=>ss.intersectsBox(M),intersectsTriangle:M=>{M.a.applyMatrix4(i),M.b.applyMatrix4(i),M.c.applyMatrix4(i),M.needsUpdate=!0;for(let b=x,z=g+x;b<z;b++)if(Et(vi,3*t.resolveTriangleIndex(b),d,h),vi.needsUpdate=!0,M.intersectsTriangle(vi))return!0;return!1}});for(let v=x,M=g+x;v<M;v++){const b=t.resolveTriangleIndex(v);Et(gi,3*b,d,h),gi.a.applyMatrix4(rr),gi.b.applyMatrix4(rr),gi.c.applyMatrix4(rr),gi.needsUpdate=!0;for(let z=0,_=f.count;z<_;z+=3)if(Et(vi,z,f,y),vi.needsUpdate=!0,gi.intersectsTriangle(vi))return!0}}else{const u=n+8,d=c[n+6];return At(u,s,rs),!!(r.intersectsBox(rs)&&gn(u,t,e,i,r)||(At(d,s,rs),r.intersectsBox(rs)&&gn(d,t,e,i,r)))}}const ns=new ze,Hs=new Jt,sr=new Jt,hl=new $,ul=new $,dl=new $,fl=new $;function ml(n,t,e,i={},r={},s=0,a=1/0){t.boundingBox||t.computeBoundingBox(),Hs.set(t.boundingBox.min,t.boundingBox.max,e),Hs.needsUpdate=!0;const c=n.geometry,o=c.attributes.position,l=c.index,u=t.attributes.position,d=t.index,h=se.getPrimitive(),f=se.getPrimitive();let y=hl,x=ul,g=null,v=null;r&&(g=dl,v=fl);let M=1/0,b=null,z=null;return ns.copy(e).invert(),sr.matrix.copy(ns),n.shapecast({boundsTraverseOrder:_=>Hs.distanceToBox(_),intersectsBounds:(_,w,A)=>A<M&&A<a?(w&&(sr.min.copy(_.min),sr.max.copy(_.max),sr.needsUpdate=!0),!0):!1,intersectsRange:(_,w)=>{if(t.boundsTree){const A=t.boundsTree;return A.shapecast({boundsTraverseOrder:T=>sr.distanceToBox(T),intersectsBounds:(T,E,C)=>C<M&&C<a,intersectsRange:(T,E)=>{for(let C=T,I=T+E;C<I;C++){const B=A.resolveTriangleIndex(C);Et(f,3*B,d,u),f.a.applyMatrix4(e),f.b.applyMatrix4(e),f.c.applyMatrix4(e),f.needsUpdate=!0;for(let R=_,O=_+w;R<O;R++){const X=n.resolveTriangleIndex(R);Et(h,3*X,l,o),h.needsUpdate=!0;const H=h.distanceToTriangle(f,y,g);if(H<M&&(x.copy(y),v&&v.copy(g),M=H,b=R,z=C),H<s)return!0}}}})}else{const A=Oi(t);for(let T=0,E=A;T<E;T++){Et(f,3*T,d,u),f.a.applyMatrix4(e),f.b.applyMatrix4(e),f.c.applyMatrix4(e),f.needsUpdate=!0;for(let C=_,I=_+w;C<I;C++){const B=n.resolveTriangleIndex(C);Et(h,3*B,l,o),h.needsUpdate=!0;const R=h.distanceToTriangle(f,y,g);if(R<M&&(x.copy(y),v&&v.copy(g),M=R,b=C,z=T),R<s)return!0}}}}}),se.releasePrimitive(h),se.releasePrimitive(f),M===1/0?null:(i.point?i.point.copy(x):i.point=x.clone(),i.distance=M,i.faceIndex=b,r&&(r.point?r.point.copy(v):r.point=v.clone(),r.point.applyMatrix4(ns),x.applyMatrix4(ns),r.distance=x.sub(r.point).length(),r.faceIndex=z),i)}function pl(){return typeof SharedArrayBuffer<"u"}const lr=new wt.constructor,Ss=new wt.constructor,Re=new bn(()=>new we),xi=new we,_i=new we,Xs=new we,Zs=new we;let qs=!1;function yl(n,t,e,i){if(qs)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");qs=!0;const r=n._roots,s=t._roots;let a,c=0,o=0;const l=new ze().copy(e).invert();for(let u=0,d=r.length;u<d;u++){lr.setBuffer(r[u]),o=0;const h=Re.getPrimitive();At(0,lr.float32Array,h),h.applyMatrix4(l);for(let f=0,y=s.length;f<y&&(Ss.setBuffer(s[f]),a=oe(0,0,e,l,i,c,o,0,0,h),Ss.clearBuffer(),o+=s[f].length,!a);f++);if(Re.releasePrimitive(h),lr.clearBuffer(),c+=r[u].length,a)break}return qs=!1,a}function oe(n,t,e,i,r,s=0,a=0,c=0,o=0,l=null,u=!1){let d,h;u?(d=Ss,h=lr):(d=lr,h=Ss);const f=d.float32Array,y=d.uint32Array,x=d.uint16Array,g=h.float32Array,v=h.uint32Array,M=h.uint16Array,b=n*2,z=t*2,_=Vt(b,x),w=Vt(z,M);let A=!1;if(w&&_)u?A=r(Ht(t,v),Wt(t*2,M),Ht(n,y),Wt(n*2,x),o,a+t,c,s+n):A=r(Ht(n,y),Wt(n*2,x),Ht(t,v),Wt(t*2,M),c,s+n,o,a+t);else if(w){const T=Re.getPrimitive();At(t,g,T),T.applyMatrix4(e);const E=re(n),C=$t(n,y);At(E,f,xi),At(C,f,_i);const I=T.intersectsBox(xi),B=T.intersectsBox(_i);A=I&&oe(t,E,i,e,r,a,s,o,c+1,T,!u)||B&&oe(t,C,i,e,r,a,s,o,c+1,T,!u),Re.releasePrimitive(T)}else{const T=re(t),E=$t(t,v);At(T,g,Xs),At(E,g,Zs);const C=l.intersectsBox(Xs),I=l.intersectsBox(Zs);if(C&&I)A=oe(n,T,e,i,r,s,a,c,o+1,l,u)||oe(n,E,e,i,r,s,a,c,o+1,l,u);else if(C)if(_)A=oe(n,T,e,i,r,s,a,c,o+1,l,u);else{const B=Re.getPrimitive();B.copy(Xs).applyMatrix4(e);const R=re(n),O=$t(n,y);At(R,f,xi),At(O,f,_i);const X=B.intersectsBox(xi),H=B.intersectsBox(_i);A=X&&oe(T,R,i,e,r,a,s,o,c+1,B,!u)||H&&oe(T,O,i,e,r,a,s,o,c+1,B,!u),Re.releasePrimitive(B)}else if(I)if(_)A=oe(n,E,e,i,r,s,a,c,o+1,l,u);else{const B=Re.getPrimitive();B.copy(Zs).applyMatrix4(e);const R=re(n),O=$t(n,y);At(R,f,xi),At(O,f,_i);const X=B.intersectsBox(xi),H=B.intersectsBox(_i);A=X&&oe(E,R,i,e,r,a,s,o,c+1,B,!u)||H&&oe(E,O,i,e,r,a,s,o,c+1,B,!u),Re.releasePrimitive(B)}}return A}const as=new Jt,Qn=new we,gl={strategy:Aa,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null};class An{static serialize(t,e={}){e={cloneBuffers:!0,...e};const i=t.geometry,r=t._roots,s=t._indirectBuffer,a=i.getIndex();let c;return e.cloneBuffers?c={roots:r.map(o=>o.slice()),index:a?a.array.slice():null,indirectBuffer:s?s.slice():null}:c={roots:r,index:a?a.array:null,indirectBuffer:s},c}static deserialize(t,e,i={}){i={setIndex:!0,indirect:!!t.indirectBuffer,...i};const{index:r,roots:s,indirectBuffer:a}=t,c=new An(e,{...i,[Ds]:!0});if(c._roots=s,c._indirectBuffer=a||null,i.setIndex){const o=e.getIndex();if(o===null){const l=new le(t.index,1,!1);e.setIndex(l)}else o.array!==r&&(o.array.set(r),o.needsUpdate=!0)}return c}get indirect(){return!!this._indirectBuffer}constructor(t,e={}){if(t.isBufferGeometry){if(t.index&&t.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(e=Object.assign({...gl,[Ds]:!1},e),e.useSharedArrayBuffer&&!pl())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=t,this._roots=null,this._indirectBuffer=null,e[Ds]||(Nc(this,e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new we))),this.resolveTriangleIndex=e.indirect?i=>this._indirectBuffer[i]:i=>i}refit(t=null){return(this.indirect?nl:Zc)(this,t)}traverse(t,e=0){const i=this._roots[e],r=new Uint32Array(i),s=new Uint16Array(i);a(0);function a(c,o=0){const l=c*2,u=s[l+15]===Ns;if(u){const d=r[c+6],h=s[l+14];t(o,u,new Float32Array(i,c*4,6),d,h)}else{const d=c+Je/4,h=r[c+6],f=r[c+7];t(o,u,new Float32Array(i,c*4,6),f)||(a(d,o+1),a(h,o+1))}}}raycast(t,e=Ln,i=0,r=1/0){const s=this._roots,a=this.geometry,c=[],o=e.isMaterial,l=Array.isArray(e),u=a.groups,d=o?e.side:e,h=this.indirect?al:$c;for(let f=0,y=s.length;f<y;f++){const x=l?e[u[f].materialIndex].side:d,g=c.length;if(h(this,f,x,t,c,i,r),l){const v=u[f].materialIndex;for(let M=g,b=c.length;M<b;M++)c[M].face.materialIndex=v}}return c}raycastFirst(t,e=Ln,i=0,r=1/0){const s=this._roots,a=this.geometry,c=e.isMaterial,o=Array.isArray(e);let l=null;const u=a.groups,d=c?e.side:e,h=this.indirect?cl:Kc;for(let f=0,y=s.length;f<y;f++){const x=o?e[u[f].materialIndex].side:d,g=h(this,f,x,t,i,r);g!=null&&(l==null||g.distance<l.distance)&&(l=g,o&&(g.face.materialIndex=u[f].materialIndex))}return l}intersectsGeometry(t,e){let i=!1;const r=this._roots,s=this.indirect?ll:jc;for(let a=0,c=r.length;a<c&&(i=s(this,a,t,e),!i);a++);return i}shapecast(t){const e=se.getPrimitive(),i=this.indirect?Wc:Xc;let{boundsTraverseOrder:r,intersectsBounds:s,intersectsRange:a,intersectsTriangle:c}=t;if(a&&c){const d=a;a=(h,f,y,x,g)=>d(h,f,y,x,g)?!0:i(h,f,this,c,y,x,e)}else a||(c?a=(d,h,f,y)=>i(d,h,this,c,f,y,e):a=(d,h,f)=>f);let o=!1,l=0;const u=this._roots;for(let d=0,h=u.length;d<h;d++){const f=u[d];if(o=Dc(this,d,s,a,r,l),o)break;l+=f.byteLength}return se.releasePrimitive(e),o}bvhcast(t,e,i){let{intersectsRanges:r,intersectsTriangles:s}=i;const a=se.getPrimitive(),c=this.geometry.index,o=this.geometry.attributes.position,l=this.indirect?y=>{const x=this.resolveTriangleIndex(y);Et(a,x*3,c,o)}:y=>{Et(a,y*3,c,o)},u=se.getPrimitive(),d=t.geometry.index,h=t.geometry.attributes.position,f=t.indirect?y=>{const x=t.resolveTriangleIndex(y);Et(u,x*3,d,h)}:y=>{Et(u,y*3,d,h)};if(s){const y=(x,g,v,M,b,z,_,w)=>{for(let A=v,T=v+M;A<T;A++){f(A),u.a.applyMatrix4(e),u.b.applyMatrix4(e),u.c.applyMatrix4(e),u.needsUpdate=!0;for(let E=x,C=x+g;E<C;E++)if(l(E),a.needsUpdate=!0,s(a,u,E,A,b,z,_,w))return!0}return!1};if(r){const x=r;r=function(g,v,M,b,z,_,w,A){return x(g,v,M,b,z,_,w,A)?!0:y(g,v,M,b,z,_,w,A)}}else r=y}return yl(this,t,e,r)}intersectsBox(t,e){return as.set(t.min,t.max,e),as.needsUpdate=!0,this.shapecast({intersectsBounds:i=>as.intersectsBox(i),intersectsTriangle:i=>as.intersectsTriangle(i)})}intersectsSphere(t){return this.shapecast({intersectsBounds:e=>t.intersectsBox(e),intersectsTriangle:e=>e.intersectsSphere(t)})}closestPointToGeometry(t,e,i={},r={},s=0,a=1/0){return(this.indirect?ml:sl)(this,t,e,i,r,s,a)}closestPointToPoint(t,e={},i=0,r=1/0){return Lc(this,t,e,i,r)}getBoundingBox(t){return t.makeEmpty(),this._roots.forEach(i=>{At(0,new Float32Array(i),Qn),t.union(Qn)}),t}}function vl(n){switch(n){case 1:return"R";case 2:return"RG";case 3:return"RGBA";case 4:return"RGBA"}throw new Error}function xl(n){switch(n){case 1:return ha;case 2:return zo;case 3:return Te;case 4:return Te}}function Kn(n){switch(n){case 1:return To;case 2:return fa;case 3:return nn;case 4:return nn}}class Ua extends xs{constructor(){super(),this.minFilter=Si,this.magFilter=Si,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(t){const e=this.overrideItemSize,i=t.itemSize,r=t.count;if(e!==null){if(i*r%e!==0)throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");t.itemSize=e,t.count=r*i/e}const s=t.itemSize,a=t.count,c=t.normalized,o=t.array.constructor,l=o.BYTES_PER_ELEMENT;let u=this._forcedType,d=s;if(u===null)switch(o){case Float32Array:u=Xt;break;case Uint8Array:case Uint16Array:case Uint32Array:u=zi;break;case Int8Array:case Int16Array:case Int32Array:u=ms;break}let h,f,y,x,g=vl(s);switch(u){case Xt:y=1,f=xl(s),c&&l===1?(x=o,g+="8",o===Uint8Array?h=hr:(h=sn,g+="_SNORM")):(x=Float32Array,g+="32F",h=Xt);break;case ms:g+=l*8+"I",y=c?Math.pow(2,o.BYTES_PER_ELEMENT*8-1):1,f=Kn(s),l===1?(x=Int8Array,h=sn):l===2?(x=Int16Array,h=da):(x=Int32Array,h=ms);break;case zi:g+=l*8+"UI",y=c?Math.pow(2,o.BYTES_PER_ELEMENT*8-1):1,f=Kn(s),l===1?(x=Uint8Array,h=hr):l===2?(x=Uint16Array,h=Ao):(x=Uint32Array,h=zi);break}d===3&&(f===Te||f===nn)&&(d=4);const v=Math.ceil(Math.sqrt(a))||1,M=d*v*v,b=new x(M),z=t.normalized;t.normalized=!1;for(let _=0;_<a;_++){const w=d*_;b[w]=t.getX(_)/y,s>=2&&(b[w+1]=t.getY(_)/y),s>=3&&(b[w+2]=t.getZ(_)/y,d===4&&(b[w+3]=1)),s>=4&&(b[w+3]=t.getW(_)/y)}t.normalized=z,this.internalFormat=g,this.format=f,this.type=h,this.image.width=v,this.image.height=v,this.image.data=b,this.needsUpdate=!0,this.dispose(),t.itemSize=i,t.count=r}}class _l extends Ua{constructor(){super(),this._forcedType=zi}}class wl extends Ua{constructor(){super(),this._forcedType=Xt}}class Ia{constructor(){this.index=new _l,this.position=new wl,this.bvhBounds=new xs,this.bvhContents=new xs,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(t){const{geometry:e}=t;if(Sl(t,this.bvhBounds,this.bvhContents),this.position.updateFrom(e.attributes.position),t.indirect){const i=t._indirectBuffer;if(this._cachedIndexAttr===null||this._cachedIndexAttr.count!==i.length)if(e.index)this._cachedIndexAttr=e.index.clone();else{const r=Ea(za(e));this._cachedIndexAttr=new le(r,1,!1)}Ml(e,i,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(e.index)}dispose(){const{index:t,position:e,bvhBounds:i,bvhContents:r}=this;t&&t.dispose(),e&&e.dispose(),i&&i.dispose(),r&&r.dispose()}}function Ml(n,t,e){const i=e.array,r=n.index?n.index.array:null;for(let s=0,a=t.length;s<a;s++){const c=3*s,o=3*t[s];for(let l=0;l<3;l++)i[c+l]=r?r[o+l]:o+l}}function Sl(n,t,e){const i=n._roots;if(i.length!==1)throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");const r=i[0],s=new Uint16Array(r),a=new Uint32Array(r),c=new Float32Array(r),o=r.byteLength/Je,l=2*Math.ceil(Math.sqrt(o/2)),u=new Float32Array(4*l*l),d=Math.ceil(Math.sqrt(o)),h=new Uint32Array(2*d*d);for(let f=0;f<o;f++){const y=f*Je/4,x=y*2,g=y;for(let v=0;v<3;v++)u[8*f+0+v]=c[g+0+v],u[8*f+4+v]=c[g+3+v];if(Vt(x,s)){const v=Wt(x,s),M=Ht(y,a),b=4294901760|v;h[f*2+0]=b,h[f*2+1]=M}else{const v=4*$t(y,a)/Je,M=Mn(y,a);h[f*2+0]=M,h[f*2+1]=v}}t.image.data=u,t.image.width=l,t.image.height=l,t.format=Te,t.type=Xt,t.internalFormat="RGBA32F",t.minFilter=Si,t.magFilter=Si,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose(),e.image.data=h,e.image.width=d,e.image.height=d,e.format=fa,e.type=zi,e.internalFormat="RG32UI",e.minFilter=Si,e.magFilter=Si,e.generateMipmaps=!1,e.needsUpdate=!0,e.dispose()}const bl=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`,Al=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;

			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return found;

}
`,Tl=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`,zl=Tl,El=`
	${bl}
	${Al}
`,Pl=jo({envMap:null,bounces:3,ior:2.4,correctMips:!0,aberrationStrength:.01,fresnel:0,bvh:new Ia,color:new Eo("white"),opacity:1,resolution:new ni,viewMatrixInverse:new ze,projectionMatrixInverse:new ze},`
  uniform mat4 viewMatrixInverse;

  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying mat4 vModelMatrixInverse;

  #include <color_pars_vertex>

  void main() {
    #include <color_vertex>

    vec4 transformedNormal = vec4(normal, 0.0);
    vec4 transformedPosition = vec4(position, 1.0);
    #ifdef USE_INSTANCING
      transformedNormal = instanceMatrix * transformedNormal;
      transformedPosition = instanceMatrix * transformedPosition;
    #endif

    #ifdef USE_INSTANCING
      vModelMatrixInverse = inverse(modelMatrix * instanceMatrix);
    #else
      vModelMatrixInverse = inverse(modelMatrix);
    #endif

    vWorldPosition = (modelMatrix * transformedPosition).xyz;
    vNormal = normalize((viewMatrixInverse * vec4(normalMatrix * transformedNormal.xyz, 0.0)).xyz);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * transformedPosition;
  }`,`
  #define ENVMAP_TYPE_CUBE_UV
  precision highp isampler2D;
  precision highp usampler2D;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying mat4 vModelMatrixInverse;

  #include <color_pars_fragment>

  #ifdef ENVMAP_TYPE_CUBEM
    uniform samplerCube envMap;
  #else
    uniform sampler2D envMap;
  #endif

  uniform float bounces;
  ${zl}
  ${El}
  uniform BVH bvh;
  uniform float ior;
  uniform bool correctMips;
  uniform vec2 resolution;
  uniform float fresnel;
  uniform mat4 modelMatrix;
  uniform mat4 projectionMatrixInverse;
  uniform mat4 viewMatrixInverse;
  uniform float aberrationStrength;
  uniform vec3 color;
  uniform float opacity;

  float fresnelFunc(vec3 viewDirection, vec3 worldNormal) {
    return pow( 1.0 + dot( viewDirection, worldNormal), 10.0 );
  }

  vec3 totalInternalReflection(vec3 ro, vec3 rd, vec3 normal, float ior, mat4 modelMatrixInverse) {
    vec3 rayOrigin = ro;
    vec3 rayDirection = rd;
    rayDirection = refract(rayDirection, normal, 1.0 / ior);
    rayOrigin = vWorldPosition + rayDirection * 0.001;
    rayOrigin = (modelMatrixInverse * vec4(rayOrigin, 1.0)).xyz;
    rayDirection = normalize((modelMatrixInverse * vec4(rayDirection, 0.0)).xyz);
    for(float i = 0.0; i < bounces; i++) {
      uvec4 faceIndices = uvec4( 0u );
      vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
      vec3 barycoord = vec3( 0.0 );
      float side = 1.0;
      float dist = 0.0;
      bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );
      vec3 hitPos = rayOrigin + rayDirection * max(dist - 0.001, 0.0);
      vec3 tempDir = refract(rayDirection, faceNormal, ior);
      if (length(tempDir) != 0.0) {
        rayDirection = tempDir;
        break;
      }
      rayDirection = reflect(rayDirection, faceNormal);
      rayOrigin = hitPos + rayDirection * 0.01;
    }
    rayDirection = normalize((modelMatrix * vec4(rayDirection, 0.0)).xyz);
    return rayDirection;
  }

  #include <common>
  #include <cube_uv_reflection_fragment>

  #ifdef ENVMAP_TYPE_CUBEM
    vec4 textureGradient(samplerCube envMap, vec3 rayDirection, vec3 directionCamPerfect) {
      return textureGrad(envMap, rayDirection, dFdx(correctMips ? directionCamPerfect: rayDirection), dFdy(correctMips ? directionCamPerfect: rayDirection));
    }
  #else
    vec4 textureGradient(sampler2D envMap, vec3 rayDirection, vec3 directionCamPerfect) {
      vec2 uvv = equirectUv( rayDirection );
      vec2 smoothUv = equirectUv( directionCamPerfect );
      return textureGrad(envMap, uvv, dFdx(correctMips ? smoothUv : uvv), dFdy(correctMips ? smoothUv : uvv));
    }
  #endif

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    vec3 directionCamPerfect = (projectionMatrixInverse * vec4(uv * 2.0 - 1.0, 0.0, 1.0)).xyz;
    directionCamPerfect = (viewMatrixInverse * vec4(directionCamPerfect, 0.0)).xyz;
    directionCamPerfect = normalize(directionCamPerfect);
    vec3 normal = vNormal;
    vec3 rayOrigin = cameraPosition;
    vec3 rayDirection = normalize(vWorldPosition - cameraPosition);

    vec4 diffuseColor = vec4(color, opacity);
    #include <color_fragment>

    #ifdef CHROMATIC_ABERRATIONS
      vec3 rayDirectionG = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior, 1.0), vModelMatrixInverse);
      #ifdef FAST_CHROMA
        vec3 rayDirectionR = normalize(rayDirectionG + 1.0 * vec3(aberrationStrength / 2.0));
        vec3 rayDirectionB = normalize(rayDirectionG - 1.0 * vec3(aberrationStrength / 2.0));
      #else
        vec3 rayDirectionR = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 - aberrationStrength), 1.0), vModelMatrixInverse);
        vec3 rayDirectionB = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 + aberrationStrength), 1.0), vModelMatrixInverse);
      #endif
      float finalColorR = textureGradient(envMap, rayDirectionR, directionCamPerfect).r;
      float finalColorG = textureGradient(envMap, rayDirectionG, directionCamPerfect).g;
      float finalColorB = textureGradient(envMap, rayDirectionB, directionCamPerfect).b;
      diffuseColor.rgb *= vec3(finalColorR, finalColorG, finalColorB);
    #else
      rayDirection = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior, 1.0), vModelMatrixInverse);
      diffuseColor.rgb *= textureGradient(envMap, rayDirection, directionCamPerfect).rgb;
    #endif

    vec3 viewDirection = normalize(vWorldPosition - cameraPosition);
    float nFresnel = fresnelFunc(viewDirection, normal) * fresnel;
    gl_FragColor = vec4(mix(diffuseColor.rgb, vec3(1.0), nFresnel), diffuseColor.a);

    #include <tonemapping_fragment>
    #include <${tc>=154?"colorspace_fragment":"encodings_fragment"}>
  }`),Cl=n=>n&&n.isCubeTexture;function Bl({aberrationStrength:n=0,fastChroma:t=!0,envMap:e,...i}){ca({MeshRefractionMaterial:Pl});const r=Y.useRef(null),{size:s}=ri(),a=Y.useMemo(()=>{var c,o;const l={},u=Cl(e),h=((c=u?(o=e.image[0])==null?void 0:o.width:e.image.width)!==null&&c!==void 0?c:1024)/4,f=Math.floor(Math.log2(h)),y=Math.pow(2,f),x=3*Math.max(y,112),g=4*y;return u&&(l.ENVMAP_TYPE_CUBEM=""),l.CUBEUV_TEXEL_WIDTH=`${1/x}`,l.CUBEUV_TEXEL_HEIGHT=`${1/g}`,l.CUBEUV_MAX_MIP=`${f}.0`,n>0&&(l.CHROMATIC_ABERRATIONS=""),t&&(l.FAST_CHROMA=""),l},[n,t]);return Y.useLayoutEffect(()=>{var c;const o=(c=r.current)==null||(c=c.__r3f)==null||(c=c.parent)==null||(c=c.object)==null?void 0:c.geometry;o&&(r.current.bvh=new Ia,r.current.bvh.updateFrom(new An(o.clone().toNonIndexed(),{strategy:Ta})))},[]),Ii(({camera:c})=>{r.current.viewMatrixInverse=c.matrixWorld,r.current.projectionMatrixInverse=c.projectionMatrixInverse}),Y.createElement("meshRefractionMaterial",Ms({key:JSON.stringify(a),defines:a,ref:r,resolution:[s.width,s.height],aberrationStrength:n,envMap:e},i))}const Oa=(n,t,e)=>{let i;switch(n){case hr:i=new Uint8ClampedArray(t*e*4);break;case ie:i=new Uint16Array(t*e*4);break;case zi:i=new Uint32Array(t*e*4);break;case sn:i=new Int8Array(t*e*4);break;case da:i=new Int16Array(t*e*4);break;case ms:i=new Int32Array(t*e*4);break;case Xt:i=new Float32Array(t*e*4);break;default:throw new Error("Unsupported data type")}return i};let os;const Nl=(n,t,e,i)=>{if(os!==void 0)return os;const r=new pa(1,1,i);t.setRenderTarget(r);const s=new Bs(new wn,new ws({color:16777215}));t.render(s,e),t.setRenderTarget(null);const a=Oa(n,r.width,r.height);return t.readRenderTargetPixels(r,0,0,r.width,r.height,a),r.dispose(),s.geometry.dispose(),s.material.dispose(),os=a[0]!==0,os};class Tn{constructor(t){bt(this,"_renderer");bt(this,"_rendererIsDisposable",!1);bt(this,"_material");bt(this,"_scene");bt(this,"_camera");bt(this,"_quad");bt(this,"_renderTarget");bt(this,"_width");bt(this,"_height");bt(this,"_type");bt(this,"_colorSpace");bt(this,"_supportsReadPixels",!0);bt(this,"render",()=>{this._renderer.setRenderTarget(this._renderTarget);try{this._renderer.render(this._scene,this._camera)}catch(t){throw this._renderer.setRenderTarget(null),t}this._renderer.setRenderTarget(null)});var i,r,s,a,c,o,l,u,d,h,f,y,x,g,v,M;this._width=t.width,this._height=t.height,this._type=t.type,this._colorSpace=t.colorSpace;const e={format:Te,depthBuffer:!1,stencilBuffer:!1,type:this._type,colorSpace:this._colorSpace,anisotropy:((i=t.renderTargetOptions)==null?void 0:i.anisotropy)!==void 0?(r=t.renderTargetOptions)==null?void 0:r.anisotropy:1,generateMipmaps:((s=t.renderTargetOptions)==null?void 0:s.generateMipmaps)!==void 0?(a=t.renderTargetOptions)==null?void 0:a.generateMipmaps:!1,magFilter:((c=t.renderTargetOptions)==null?void 0:c.magFilter)!==void 0?(o=t.renderTargetOptions)==null?void 0:o.magFilter:ge,minFilter:((l=t.renderTargetOptions)==null?void 0:l.minFilter)!==void 0?(u=t.renderTargetOptions)==null?void 0:u.minFilter:ge,samples:((d=t.renderTargetOptions)==null?void 0:d.samples)!==void 0?(h=t.renderTargetOptions)==null?void 0:h.samples:void 0,wrapS:((f=t.renderTargetOptions)==null?void 0:f.wrapS)!==void 0?(y=t.renderTargetOptions)==null?void 0:y.wrapS:Fe,wrapT:((x=t.renderTargetOptions)==null?void 0:x.wrapT)!==void 0?(g=t.renderTargetOptions)==null?void 0:g.wrapT:Fe};if(this._material=t.material,t.renderer?this._renderer=t.renderer:(this._renderer=Tn.instantiateRenderer(),this._rendererIsDisposable=!0),this._scene=new ma,this._camera=new Po,this._camera.position.set(0,0,10),this._camera.left=-.5,this._camera.right=.5,this._camera.top=.5,this._camera.bottom=-.5,this._camera.updateProjectionMatrix(),!Nl(this._type,this._renderer,this._camera,e)){let b;switch(this._type){case ie:b=this._renderer.extensions.has("EXT_color_buffer_float")?Xt:void 0;break}b!==void 0?(console.warn(`This browser does not support reading pixels from ${this._type} RenderTargets, switching to ${Xt}`),this._type=b):(this._supportsReadPixels=!1,console.warn("This browser dos not support toArray or toDataTexture, calls to those methods will result in an error thrown"))}this._quad=new Bs(new wn,this._material),this._quad.geometry.computeBoundingBox(),this._scene.add(this._quad),this._renderTarget=new pa(this.width,this.height,e),this._renderTarget.texture.mapping=((v=t.renderTargetOptions)==null?void 0:v.mapping)!==void 0?(M=t.renderTargetOptions)==null?void 0:M.mapping:_s}static instantiateRenderer(){const t=new Co;return t.setSize(128,128),t}toArray(){if(!this._supportsReadPixels)throw new Error("Can't read pixels in this browser");const t=Oa(this._type,this._width,this._height);return this._renderer.readRenderTargetPixels(this._renderTarget,0,0,this._width,this._height,t),t}toDataTexture(t){const e=new xs(this.toArray(),this.width,this.height,Te,this._type,(t==null?void 0:t.mapping)||_s,(t==null?void 0:t.wrapS)||Fe,(t==null?void 0:t.wrapT)||Fe,(t==null?void 0:t.magFilter)||ge,(t==null?void 0:t.minFilter)||ge,(t==null?void 0:t.anisotropy)||1,an);return e.generateMipmaps=(t==null?void 0:t.generateMipmaps)!==void 0?t==null?void 0:t.generateMipmaps:!1,e}disposeOnDemandRenderer(){this._renderer.setRenderTarget(null),this._rendererIsDisposable&&(this._renderer.dispose(),this._renderer.forceContextLoss())}dispose(t){this.disposeOnDemandRenderer(),t&&this.renderTarget.dispose(),this.material instanceof Pi&&Object.values(this.material.uniforms).forEach(e=>{e.value instanceof bi&&e.value.dispose()}),Object.values(this.material).forEach(e=>{e instanceof bi&&e.dispose()}),this.material.dispose(),this._quad.geometry.dispose()}get width(){return this._width}set width(t){this._width=t,this._renderTarget.setSize(this._width,this._height)}get height(){return this._height}set height(t){this._height=t,this._renderTarget.setSize(this._width,this._height)}get renderer(){return this._renderer}get renderTarget(){return this._renderTarget}set renderTarget(t){this._renderTarget=t,this._width=t.width,this._height=t.height}get material(){return this._material}get type(){return this._type}get colorSpace(){return this._colorSpace}}class Ra extends Error{}class Fa extends Error{}const nr=(n,t,e)=>{const i=new RegExp(`${t}="([^"]*)"`,"i").exec(n);if(i)return i[1];const r=new RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`,"i").exec(n);if(r){const s=r[1].match(/<rdf:li>([^<]*)<\/rdf:li>/g);return s&&s.length===3?s.map(a=>a.replace(/<\/?rdf:li>/g,"")):r[1].trim()}if(e!==void 0)return e;throw new Error(`Can't find ${t} in gainmap metadata`)},Ul=n=>{let t;typeof TextDecoder<"u"?t=new TextDecoder().decode(n):t=n.toString();let e=t.indexOf("<x:xmpmeta");for(;e!==-1;){const i=t.indexOf("x:xmpmeta>",e),r=t.slice(e,i+10);try{const s=nr(r,"hdrgm:GainMapMin","0"),a=nr(r,"hdrgm:GainMapMax"),c=nr(r,"hdrgm:Gamma","1"),o=nr(r,"hdrgm:OffsetSDR","0.015625"),l=nr(r,"hdrgm:OffsetHDR","0.015625"),u=/hdrgm:HDRCapacityMin="([^"]*)"/.exec(r),d=u?u[1]:"0",h=/hdrgm:HDRCapacityMax="([^"]*)"/.exec(r);if(!h)throw new Error("Incomplete gainmap metadata");const f=h[1];return{gainMapMin:Array.isArray(s)?s.map(y=>parseFloat(y)):[parseFloat(s),parseFloat(s),parseFloat(s)],gainMapMax:Array.isArray(a)?a.map(y=>parseFloat(y)):[parseFloat(a),parseFloat(a),parseFloat(a)],gamma:Array.isArray(c)?c.map(y=>parseFloat(y)):[parseFloat(c),parseFloat(c),parseFloat(c)],offsetSdr:Array.isArray(o)?o.map(y=>parseFloat(y)):[parseFloat(o),parseFloat(o),parseFloat(o)],offsetHdr:Array.isArray(l)?l.map(y=>parseFloat(y)):[parseFloat(l),parseFloat(l),parseFloat(l)],hdrCapacityMin:parseFloat(d),hdrCapacityMax:parseFloat(f)}}catch{}e=t.indexOf("<x:xmpmeta",i)}};class Il{constructor(t){bt(this,"options");this.options={debug:t&&t.debug!==void 0?t.debug:!1,extractFII:t&&t.extractFII!==void 0?t.extractFII:!0,extractNonFII:t&&t.extractNonFII!==void 0?t.extractNonFII:!0}}extract(t){return new Promise((e,i)=>{const r=this.options.debug,s=new DataView(t.buffer);if(s.getUint16(0)!==65496){i(new Error("Not a valid jpeg"));return}const a=s.byteLength;let c=2,o=0,l;for(;c<a;){if(++o>250){i(new Error(`Found no marker after ${o} loops 😵`));return}if(s.getUint8(c)!==255){i(new Error(`Not a valid marker at offset 0x${c.toString(16)}, found: 0x${s.getUint8(c).toString(16)}`));return}if(l=s.getUint8(c+1),r&&console.log(`Marker: ${l.toString(16)}`),l===226){r&&console.log("Found APP2 marker (0xffe2)");const u=c+4;if(s.getUint32(u)===1297106432){const d=u+4;let h;if(s.getUint16(d)===18761)h=!1;else if(s.getUint16(d)===19789)h=!0;else{i(new Error("No valid endianness marker found in TIFF header"));return}if(s.getUint16(d+2,!h)!==42){i(new Error("Not valid TIFF data! (no 0x002A marker)"));return}const f=s.getUint32(d+4,!h);if(f<8){i(new Error("Not valid TIFF data! (First offset less than 8)"));return}const y=d+f,x=s.getUint16(y,!h),g=y+2;let v=0;for(let _=g;_<g+12*x;_+=12)s.getUint16(_,!h)===45057&&(v=s.getUint32(_+8,!h));const b=y+2+x*12+4,z=[];for(let _=b;_<b+v*16;_+=16){const w={MPType:s.getUint32(_,!h),size:s.getUint32(_+4,!h),dataOffset:s.getUint32(_+8,!h),dependantImages:s.getUint32(_+12,!h),start:-1,end:-1,isFII:!1};w.dataOffset?(w.start=d+w.dataOffset,w.isFII=!1):(w.start=0,w.isFII=!0),w.end=w.start+w.size,z.push(w)}if(this.options.extractNonFII&&z.length){const _=new Blob([s]),w=[];for(const A of z){if(A.isFII&&!this.options.extractFII)continue;const T=_.slice(A.start,A.end+1,"image/jpeg");w.push(T)}e(w)}}}c+=2+s.getUint16(c+2)}})}}const Ol=async n=>{const t=Ul(n);if(!t)throw new Fa("Gain map XMP metadata not found");const i=await new Il({extractFII:!0,extractNonFII:!0}).extract(n);if(i.length!==2)throw new Ra("Gain map recovery image not found");return{sdr:new Uint8Array(await i[0].arrayBuffer()),gainMap:new Uint8Array(await i[1].arrayBuffer()),metadata:t}},jn=n=>new Promise((t,e)=>{const i=document.createElement("img");i.onload=()=>{t(i)},i.onerror=r=>{e(r)},i.src=URL.createObjectURL(n)});class Rl extends Bo{constructor(e,i){super(i);bt(this,"_renderer");bt(this,"_renderTargetOptions");bt(this,"_internalLoadingManager");bt(this,"_config");this._config=e,e.renderer&&(this._renderer=e.renderer),this._internalLoadingManager=new No}setRenderer(e){return this._renderer=e,this}setRenderTargetOptions(e){return this._renderTargetOptions=e,this}prepareQuadRenderer(){this._renderer||console.warn("WARNING: A Renderer was not passed to this Loader constructor or in setRenderer, the result of this Loader will need to be converted to a Data Texture with toDataTexture() before you can use it in your renderer.");const e=this._config.createMaterial({gainMapMax:[1,1,1],gainMapMin:[0,0,0],gamma:[1,1,1],offsetHdr:[1,1,1],offsetSdr:[1,1,1],hdrCapacityMax:1,hdrCapacityMin:0,maxDisplayBoost:1,gainMap:new bi,sdr:new bi});return this._config.createQuadRenderer({width:16,height:16,type:ie,colorSpace:an,material:e,renderer:this._renderer,renderTargetOptions:this._renderTargetOptions})}async processImages(e,i,r){const s=i?new Blob([i],{type:"image/jpeg"}):void 0,a=new Blob([e],{type:"image/jpeg"});let c,o,l=!1;if(typeof createImageBitmap>"u"){const u=await Promise.all([s?jn(s):Promise.resolve(void 0),jn(a)]);o=u[0],c=u[1],l=r==="flipY"}else{const u=await Promise.all([s?createImageBitmap(s,{imageOrientation:r||"flipY"}):Promise.resolve(void 0),createImageBitmap(a,{imageOrientation:r||"flipY"})]);o=u[0],c=u[1]}return{sdrImage:c,gainMapImage:o,needsFlip:l}}createTextures(e,i,r){const s=new bi(i||new ImageData(2,2),_s,Fe,Fe,ge,kn,Te,hr,1,an);s.flipY=r,s.needsUpdate=!0;const a=new bi(e,_s,Fe,Fe,ge,kn,Te,hr,1,ya);return a.flipY=r,a.needsUpdate=!0,{gainMap:s,sdr:a}}updateQuadRenderer(e,i,r,s,a){e.width=i.width,e.height=i.height,e.material.gainMap=r,e.material.sdr=s,e.material.gainMapMin=a.gainMapMin,e.material.gainMapMax=a.gainMapMax,e.material.offsetHdr=a.offsetHdr,e.material.offsetSdr=a.offsetSdr,e.material.gamma=a.gamma,e.material.hdrCapacityMin=a.hdrCapacityMin,e.material.hdrCapacityMax=a.hdrCapacityMax,e.material.maxDisplayBoost=Math.pow(2,a.hdrCapacityMax),e.material.needsUpdate=!0}}const Fl=`
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Dl=`
// min half float value
#define HALF_FLOAT_MIN vec3( -65504, -65504, -65504 )
// max half float value
#define HALF_FLOAT_MAX vec3( 65504, 65504, 65504 )

uniform sampler2D sdr;
uniform sampler2D gainMap;
uniform vec3 gamma;
uniform vec3 offsetHdr;
uniform vec3 offsetSdr;
uniform vec3 gainMapMin;
uniform vec3 gainMapMax;
uniform float weightFactor;

varying vec2 vUv;

void main() {
  vec3 rgb = texture2D( sdr, vUv ).rgb;
  vec3 recovery = texture2D( gainMap, vUv ).rgb;
  vec3 logRecovery = pow( recovery, gamma );
  vec3 logBoost = gainMapMin * ( 1.0 - logRecovery ) + gainMapMax * logRecovery;
  vec3 hdrColor = (rgb + offsetSdr) * exp2( logBoost * weightFactor ) - offsetHdr;
  vec3 clampedHdrColor = max( HALF_FLOAT_MIN, min( HALF_FLOAT_MAX, hdrColor ));
  gl_FragColor = vec4( clampedHdrColor , 1.0 );
}
`;class Ll extends Pi{constructor({gamma:e,offsetHdr:i,offsetSdr:r,gainMapMin:s,gainMapMax:a,maxDisplayBoost:c,hdrCapacityMin:o,hdrCapacityMax:l,sdr:u,gainMap:d}){super({name:"GainMapDecoderMaterial",vertexShader:Fl,fragmentShader:Dl,uniforms:{sdr:{value:u},gainMap:{value:d},gamma:{value:new $(1/e[0],1/e[1],1/e[2])},offsetHdr:{value:new $().fromArray(i)},offsetSdr:{value:new $().fromArray(r)},gainMapMin:{value:new $().fromArray(s)},gainMapMax:{value:new $().fromArray(a)},weightFactor:{value:(Math.log2(c)-o)/(l-o)}},blending:Uo,depthTest:!1,depthWrite:!1});bt(this,"_maxDisplayBoost");bt(this,"_hdrCapacityMin");bt(this,"_hdrCapacityMax");this._maxDisplayBoost=c,this._hdrCapacityMin=o,this._hdrCapacityMax=l,this.needsUpdate=!0,this.uniformsNeedUpdate=!0}get sdr(){return this.uniforms.sdr.value}set sdr(e){this.uniforms.sdr.value=e}get gainMap(){return this.uniforms.gainMap.value}set gainMap(e){this.uniforms.gainMap.value=e}get offsetHdr(){return this.uniforms.offsetHdr.value.toArray()}set offsetHdr(e){this.uniforms.offsetHdr.value.fromArray(e)}get offsetSdr(){return this.uniforms.offsetSdr.value.toArray()}set offsetSdr(e){this.uniforms.offsetSdr.value.fromArray(e)}get gainMapMin(){return this.uniforms.gainMapMin.value.toArray()}set gainMapMin(e){this.uniforms.gainMapMin.value.fromArray(e)}get gainMapMax(){return this.uniforms.gainMapMax.value.toArray()}set gainMapMax(e){this.uniforms.gainMapMax.value.fromArray(e)}get gamma(){const e=this.uniforms.gamma.value;return[1/e.x,1/e.y,1/e.z]}set gamma(e){const i=this.uniforms.gamma.value;i.x=1/e[0],i.y=1/e[1],i.z=1/e[2]}get hdrCapacityMin(){return this._hdrCapacityMin}set hdrCapacityMin(e){this._hdrCapacityMin=e,this.calculateWeight()}get hdrCapacityMax(){return this._hdrCapacityMax}set hdrCapacityMax(e){this._hdrCapacityMax=e,this.calculateWeight()}get maxDisplayBoost(){return this._maxDisplayBoost}set maxDisplayBoost(e){this._maxDisplayBoost=Math.max(1,Math.min(65504,e)),this.calculateWeight()}calculateWeight(){const e=(Math.log2(this._maxDisplayBoost)-this._hdrCapacityMin)/(this._hdrCapacityMax-this._hdrCapacityMin);this.uniforms.weightFactor.value=Math.max(0,Math.min(1,e))}}class Da extends Rl{constructor(t,e){super({renderer:t,createMaterial:i=>new Ll(i),createQuadRenderer:i=>new Tn(i)},e)}async render(t,e,i,r){const{sdrImage:s,gainMapImage:a,needsFlip:c}=await this.processImages(i,r,"flipY"),{gainMap:o,sdr:l}=this.createTextures(s,a,c);this.updateQuadRenderer(t,s,o,l,e),t.render()}}class kl extends Da{load([t,e,i],r,s,a){const c=this.prepareQuadRenderer();let o,l,u;const d=async()=>{if(o&&l&&u){try{await this.render(c,u,o,l)}catch(E){this.manager.itemError(t),this.manager.itemError(e),this.manager.itemError(i),typeof a=="function"&&a(E),c.disposeOnDemandRenderer();return}typeof r=="function"&&r(c),this.manager.itemEnd(t),this.manager.itemEnd(e),this.manager.itemEnd(i),c.disposeOnDemandRenderer()}};let h=!0,f=0,y=0,x=!0,g=0,v=0,M=!0,b=0,z=0;const _=()=>{if(typeof s=="function"){const E=f+g+b,C=y+v+z,I=h&&x&&M;s(new ProgressEvent("progress",{lengthComputable:I,loaded:C,total:E}))}};this.manager.itemStart(t),this.manager.itemStart(e),this.manager.itemStart(i);const w=new ps(this._internalLoadingManager);w.setResponseType("arraybuffer"),w.setRequestHeader(this.requestHeader),w.setPath(this.path),w.setWithCredentials(this.withCredentials),w.load(t,async E=>{if(typeof E=="string")throw new Error("Invalid sdr buffer");o=E,await d()},E=>{h=E.lengthComputable,y=E.loaded,f=E.total,_()},E=>{this.manager.itemError(t),typeof a=="function"&&a(E)});const A=new ps(this._internalLoadingManager);A.setResponseType("arraybuffer"),A.setRequestHeader(this.requestHeader),A.setPath(this.path),A.setWithCredentials(this.withCredentials),A.load(e,async E=>{if(typeof E=="string")throw new Error("Invalid gainmap buffer");l=E,await d()},E=>{x=E.lengthComputable,v=E.loaded,g=E.total,_()},E=>{this.manager.itemError(e),typeof a=="function"&&a(E)});const T=new ps(this._internalLoadingManager);return T.setRequestHeader(this.requestHeader),T.setPath(this.path),T.setWithCredentials(this.withCredentials),T.load(i,async E=>{if(typeof E!="string")throw new Error("Invalid metadata string");u=JSON.parse(E),await d()},E=>{M=E.lengthComputable,z=E.loaded,b=E.total,_()},E=>{this.manager.itemError(i),typeof a=="function"&&a(E)}),c}}class Vl extends Da{load(t,e,i,r){const s=this.prepareQuadRenderer(),a=new ps(this._internalLoadingManager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(this.withCredentials),this.manager.itemStart(t),a.load(t,async c=>{if(typeof c=="string")throw new Error("Invalid buffer, received [string], was expecting [ArrayBuffer]");const o=new Uint8Array(c);let l,u,d;try{const h=await Ol(o);l=h.sdr,u=h.gainMap,d=h.metadata}catch(h){if(h instanceof Fa||h instanceof Ra)console.warn(`Failure to reconstruct an HDR image from ${t}: Gain map metadata not found in the file, HDRJPGLoader will render the SDR jpeg`),d={gainMapMin:[0,0,0],gainMapMax:[1,1,1],gamma:[1,1,1],hdrCapacityMin:0,hdrCapacityMax:1,offsetHdr:[0,0,0],offsetSdr:[0,0,0]},l=o;else throw h}try{await this.render(s,d,l.buffer,u==null?void 0:u.buffer)}catch(h){this.manager.itemError(t),typeof r=="function"&&r(h),s.disposeOnDemandRenderer();return}typeof e=="function"&&e(s),this.manager.itemEnd(t),s.disposeOnDemandRenderer()},i,c=>{this.manager.itemError(t),typeof r=="function"&&r(c)}),s}}const ur={apartment:"lebombo_1k.hdr",city:"potsdamer_platz_1k.hdr",dawn:"kiara_1_dawn_1k.hdr",forest:"forest_slope_1k.hdr",lobby:"st_fagans_interior_1k.hdr",night:"dikhololo_night_1k.hdr",park:"rooitou_park_1k.hdr",studio:"studio_small_03_1k.hdr",sunset:"venice_sunset_1k.hdr",warehouse:"empty_warehouse_01_1k.hdr"},La="https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/",Ei=n=>Array.isArray(n),zn=["/px.png","/nx.png","/py.png","/ny.png","/pz.png","/nz.png"];function Is({files:n=zn,path:t="",preset:e=void 0,colorSpace:i=void 0,extensions:r}={}){e&&(En(e),n=ur[e],t=La);const s=Ei(n),{extension:a,isCubemap:c}=Pn(n),o=Cn(a);if(!o)throw new Error("useEnvironment: Unrecognized file extension: "+n);const l=ri(f=>f.gl);Y.useLayoutEffect(()=>{if(a!=="webp"&&a!=="jpg"&&a!=="jpeg")return;function f(){vs.clear(o,s?[n]:n)}l.domElement.addEventListener("webglcontextlost",f,{once:!0})},[n,l.domElement]);const u=vs(o,s?[n]:n,f=>{(a==="webp"||a==="jpg"||a==="jpeg")&&f.setRenderer(l),f.setPath==null||f.setPath(t),r&&r(f)});let d=s?u[0]:u;if(a==="jpg"||a==="jpeg"||a==="webp"){var h;d=(h=d.renderTarget)==null?void 0:h.texture}return d.mapping=c?Io:Oo,d.colorSpace=i??(c?"srgb":"srgb-linear"),d}const Jl={files:zn,path:"",preset:void 0,extensions:void 0};Is.preload=n=>{const t={...Jl,...n};let{files:e,path:i=""}=t;const{preset:r,extensions:s}=t;r&&(En(r),e=ur[r],i=La);const{extension:a}=Pn(e);if(a==="webp"||a==="jpg"||a==="jpeg")throw new Error("useEnvironment: Preloading gainmaps is not supported");const c=Cn(a);if(!c)throw new Error("useEnvironment: Unrecognized file extension: "+e);vs.preload(c,Ei(e)?[e]:e,o=>{o.setPath==null||o.setPath(i),s&&s(o)})};const Gl={files:zn,preset:void 0};Is.clear=n=>{const t={...Gl,...n};let{files:e}=t;const{preset:i}=t;i&&(En(i),e=ur[i]);const{extension:r}=Pn(e),s=Cn(r);if(!s)throw new Error("useEnvironment: Unrecognized file extension: "+e);vs.clear(s,Ei(e)?[e]:e)};function En(n){if(!(n in ur))throw new Error("Preset must be one of: "+Object.keys(ur).join(", "))}function Pn(n){var t;const e=Ei(n)&&n.length===6,i=Ei(n)&&n.length===3&&n.some(a=>a.endsWith("json")),r=Ei(n)?n[0]:n;return{extension:e?"cube":i?"webp":r.startsWith("data:application/exr")?"exr":r.startsWith("data:application/hdr")?"hdr":r.startsWith("data:image/jpeg")?"jpg":(t=r.split(".").pop())==null||(t=t.split("?"))==null||(t=t.shift())==null?void 0:t.toLowerCase(),isCubemap:e,isGainmap:i}}function Cn(n){return n==="cube"?Ro:n==="hdr"?yc:n==="exr"?gc:n==="jpg"||n==="jpeg"?Vl:n==="webp"?kl:null}const Hl=n=>n.current&&n.current.isScene,Xl=n=>Hl(n)?n.current:n;function Bn(n,t,e,i,r={}){var s,a,c,o;r={backgroundBlurriness:0,backgroundIntensity:1,backgroundRotation:[0,0,0],environmentIntensity:1,environmentRotation:[0,0,0],...r};const l=Xl(t||e),u=l.background,d=l.environment,h={backgroundBlurriness:l.backgroundBlurriness,backgroundIntensity:l.backgroundIntensity,backgroundRotation:(s=(a=l.backgroundRotation)==null||a.clone==null?void 0:a.clone())!==null&&s!==void 0?s:[0,0,0],environmentIntensity:l.environmentIntensity,environmentRotation:(c=(o=l.environmentRotation)==null||o.clone==null?void 0:o.clone())!==null&&c!==void 0?c:[0,0,0]};return n!=="only"&&(l.environment=i),n&&(l.background=i),rn(l,r),()=>{n!=="only"&&(l.environment=d),n&&(l.background=u),rn(l,h)}}function Nn({scene:n,background:t=!1,map:e,...i}){const r=ri(s=>s.scene);return Y.useLayoutEffect(()=>{if(e)return Bn(t,n,r,e,i)}),null}function ka({background:n=!1,scene:t,blur:e,backgroundBlurriness:i,backgroundIntensity:r,backgroundRotation:s,environmentIntensity:a,environmentRotation:c,...o}){const l=Is(o),u=ri(d=>d.scene);return Y.useLayoutEffect(()=>Bn(n,t,u,l,{backgroundBlurriness:e??i,backgroundIntensity:r,backgroundRotation:s,environmentIntensity:a,environmentRotation:c})),Y.useEffect(()=>()=>{l.dispose()},[l]),null}function Zl({children:n,near:t=.1,far:e=1e3,resolution:i=256,frames:r=1,map:s,background:a=!1,blur:c,backgroundBlurriness:o,backgroundIntensity:l,backgroundRotation:u,environmentIntensity:d,environmentRotation:h,scene:f,files:y,path:x,preset:g=void 0,extensions:v}){const M=ri(T=>T.gl),b=ri(T=>T.scene),z=Y.useRef(null),[_]=Y.useState(()=>new ma),w=Y.useMemo(()=>{const T=new Fo(i);return T.texture.type=ie,T},[i]);Y.useEffect(()=>()=>{w.dispose()},[w]),Y.useLayoutEffect(()=>{if(r===1){const T=M.autoClear;M.autoClear=!0,z.current.update(M,_),M.autoClear=T}return Bn(a,f,b,w.texture,{backgroundBlurriness:c??o,backgroundIntensity:l,backgroundRotation:u,environmentIntensity:d,environmentRotation:h})},[n,_,w.texture,f,b,a,r,M]);let A=1;return Ii(()=>{if(r===1/0||A<r){const T=M.autoClear;M.autoClear=!0,z.current.update(M,_),M.autoClear=T,A++}}),Y.createElement(Y.Fragment,null,fo(Y.createElement(Y.Fragment,null,n,Y.createElement("cubeCamera",{ref:z,args:[t,e,w]}),y||g?Y.createElement(ka,{background:!0,files:y,preset:g,path:x,extensions:v}):s?Y.createElement(Nn,{background:!0,map:s,extensions:v}):null),_))}function ql(n){var t,e,i,r;const s=Is(n),a=n.map||s;Y.useMemo(()=>ca({GroundProjectedEnvImpl:pc}),[]),Y.useEffect(()=>()=>{s.dispose()},[s]);const c=Y.useMemo(()=>[a],[a]),o=(t=n.ground)==null?void 0:t.height,l=(e=n.ground)==null?void 0:e.radius,u=(i=(r=n.ground)==null?void 0:r.scale)!==null&&i!==void 0?i:1e3;return Y.createElement(Y.Fragment,null,Y.createElement(Nn,Ms({},n,{map:a})),Y.createElement("groundProjectedEnvImpl",{args:c,scale:u,height:o,radius:l}))}function Yl(n){return n.ground?Y.createElement(ql,n):n.map?Y.createElement(Nn,n):n.children?Y.createElement(Zl,n):Y.createElement(ka,n)}const cs=Y.forwardRef(({light:n,args:t,map:e,toneMapped:i=!1,color:r="white",form:s="rect",intensity:a=1,scale:c=1,target:o=[0,0,0],children:l,...u},d)=>{const h=Y.useRef(null);return Y.useImperativeHandle(d,()=>h.current,[]),Y.useLayoutEffect(()=>{!l&&!u.material&&(rn(h.current.material,{color:r}),h.current.material.color.multiplyScalar(a))},[r,a,l,u.material]),Y.useLayoutEffect(()=>{u.rotation||h.current.quaternion.identity(),o&&!u.rotation&&(typeof o=="boolean"?h.current.lookAt(0,0,0):h.current.lookAt(Array.isArray(o)?new $(...o):o))},[o,u.rotation]),c=Array.isArray(c)&&c.length===2?[c[0],c[1],1]:c,Y.createElement("mesh",Ms({ref:h,scale:c},u),s==="circle"?Y.createElement("ringGeometry",{args:t||[0,.5,64]}):s==="ring"?Y.createElement("ringGeometry",{args:t||[.25,.5,64]}):s==="rect"||s==="plane"?Y.createElement("planeGeometry",{args:t||[1,1]}):s==="box"?Y.createElement("boxGeometry",{args:t||[1,1,1]}):Y.createElement(s,{args:t}),l||Y.createElement("meshBasicMaterial",{toneMapped:i,map:e,side:si}),n&&Y.createElement("pointLight",Ms({castShadow:!0},n)))}),Rt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ta=1234567;const Va=Math.PI/180,Ja=180/Math.PI;function Wl(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Rt[n&255]+Rt[n>>8&255]+Rt[n>>16&255]+Rt[n>>24&255]+"-"+Rt[t&255]+Rt[t>>8&255]+"-"+Rt[t>>16&15|64]+Rt[t>>24&255]+"-"+Rt[e&63|128]+Rt[e>>8&255]+"-"+Rt[e>>16&255]+Rt[e>>24&255]+Rt[i&255]+Rt[i>>8&255]+Rt[i>>16&255]+Rt[i>>24&255]).toLowerCase()}function ye(n,t,e){return Math.max(t,Math.min(e,n))}function Ga(n,t){return(n%t+t)%t}function $l(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function Ql(n,t,e){return n!==t?(e-n)/(t-n):0}function Ha(n,t,e){return(1-e)*n+e*t}function Kl(n,t,e,i){return Ha(n,t,1-Math.exp(-e*i))}function jl(n,t=1){return t-Math.abs(Ga(n,t*2)-t)}function th(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function eh(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function ih(n,t){return n+Math.floor(Math.random()*(t-n+1))}function rh(n,t){return n+Math.random()*(t-n)}function sh(n){return n*(.5-Math.random())}function nh(n){n!==void 0&&(ta=n);let t=ta+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ah(n){return n*Va}function oh(n){return n*Ja}function ch(n){return(n&n-1)===0&&n!==0}function lh(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function hh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function uh(n,t,e,i,r){const s=Math.cos,a=Math.sin,c=s(e/2),o=a(e/2),l=s((t+i)/2),u=a((t+i)/2),d=s((t-i)/2),h=a((t-i)/2),f=s((i-t)/2),y=a((i-t)/2);switch(r){case"XYX":n.set(c*u,o*d,o*h,c*l);break;case"YZY":n.set(o*h,c*u,o*d,c*l);break;case"ZXZ":n.set(o*d,o*h,c*u,c*l);break;case"XZX":n.set(c*u,o*y,o*f,c*l);break;case"YXY":n.set(o*f,c*u,o*y,c*l);break;case"ZYZ":n.set(o*y,o*f,c*u,c*l);break;default:console.warn("../math.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function dh(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function fh(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Ri={DEG2RAD:Va,RAD2DEG:Ja,generateUUID:Wl,clamp:ye,euclideanModulo:Ga,mapLinear:$l,inverseLerp:Ql,lerp:Ha,damp:Kl,pingpong:jl,smoothstep:th,smootherstep:eh,randInt:ih,randFloat:rh,randFloatSpread:sh,seededRandom:nh,degToRad:ah,radToDeg:oh,isPowerOfTwo:ch,ceilPowerOfTwo:lh,floorPowerOfTwo:hh,setQuaternionFromProperEuler:uh,normalize:fh,denormalize:dh};class ct{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,a,c){let o=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3];const h=s[a+0],f=s[a+1],y=s[a+2],x=s[a+3];if(c===0){t[e+0]=o,t[e+1]=l,t[e+2]=u,t[e+3]=d;return}if(c===1){t[e+0]=h,t[e+1]=f,t[e+2]=y,t[e+3]=x;return}if(d!==x||o!==h||l!==f||u!==y){let g=1-c;const v=o*h+l*f+u*y+d*x,M=v>=0?1:-1,b=1-v*v;if(b>Number.EPSILON){const _=Math.sqrt(b),w=Math.atan2(_,v*M);g=Math.sin(g*w)/_,c=Math.sin(c*w)/_}const z=c*M;if(o=o*g+h*z,l=l*g+f*z,u=u*g+y*z,d=d*g+x*z,g===1-c){const _=1/Math.sqrt(o*o+l*l+u*u+d*d);o*=_,l*=_,u*=_,d*=_}}t[e]=o,t[e+1]=l,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,r,s,a){const c=i[r],o=i[r+1],l=i[r+2],u=i[r+3],d=s[a],h=s[a+1],f=s[a+2],y=s[a+3];return t[e]=c*y+u*d+o*f-l*h,t[e+1]=o*y+u*h+l*d-c*f,t[e+2]=l*y+u*f+c*h-o*d,t[e+3]=u*y-c*d-o*h-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new ct(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,a=t._order,c=Math.cos,o=Math.sin,l=c(i/2),u=c(r/2),d=c(s/2),h=o(i/2),f=o(r/2),y=o(s/2);switch(a){case"XYZ":this._x=h*u*d+l*f*y,this._y=l*f*d-h*u*y,this._z=l*u*y+h*f*d,this._w=l*u*d-h*f*y;break;case"YXZ":this._x=h*u*d+l*f*y,this._y=l*f*d-h*u*y,this._z=l*u*y-h*f*d,this._w=l*u*d+h*f*y;break;case"ZXY":this._x=h*u*d-l*f*y,this._y=l*f*d+h*u*y,this._z=l*u*y+h*f*d,this._w=l*u*d-h*f*y;break;case"ZYX":this._x=h*u*d-l*f*y,this._y=l*f*d+h*u*y,this._z=l*u*y-h*f*d,this._w=l*u*d+h*f*y;break;case"YZX":this._x=h*u*d+l*f*y,this._y=l*f*d+h*u*y,this._z=l*u*y-h*f*d,this._w=l*u*d-h*f*y;break;case"XZY":this._x=h*u*d-l*f*y,this._y=l*f*d-h*u*y,this._z=l*u*y+h*f*d,this._w=l*u*d+h*f*y;break;default:console.warn("../math.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],a=e[1],c=e[5],o=e[9],l=e[2],u=e[6],d=e[10],h=i+c+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-o)*f,this._y=(s-l)*f,this._z=(a-r)*f}else if(i>c&&i>d){const f=2*Math.sqrt(1+i-c-d);this._w=(u-o)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+l)/f}else if(c>d){const f=2*Math.sqrt(1+c-i-d);this._w=(s-l)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(o+u)/f}else{const f=2*Math.sqrt(1+d-i-c);this._w=(a-r)/f,this._x=(s+l)/f,this._y=(o+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ye(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,a=t._w,c=e._x,o=e._y,l=e._z,u=e._w;return this._x=i*u+a*c+r*l-s*o,this._y=r*u+a*o+s*c-i*l,this._z=s*u+a*l+i*o-r*c,this._w=a*u-i*c-r*o-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,a=this._w;let c=a*t._w+i*t._x+r*t._y+s*t._z;if(c<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,c=-c):this.copy(t),c>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const o=1-c*c;if(o<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*i+e*this._x,this._y=f*r+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const l=Math.sqrt(o),u=Math.atan2(l,c),d=Math.sin((1-e)*u)/l,h=Math.sin(e*u)/l;return this._w=a*d+this._w*h,this._x=i*d+this._x*h,this._y=r*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{constructor(t=0,e=0,i=0){this.isVector3=!0,W.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new W(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ea.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ea.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,a=t.y,c=t.z,o=t.w,l=2*(a*r-c*i),u=2*(c*e-s*r),d=2*(s*i-a*e);return this.x=e+o*l+a*d-c*u,this.y=i+o*u+c*l-s*d,this.z=r+o*d+s*u-a*l,this}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,a=e.x,c=e.y,o=e.z;return this.x=r*o-s*c,this.y=s*a-i*o,this.z=i*c-r*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Ys.copy(this).projectOnVector(t),this.sub(Ys)}reflect(t){return this.sub(Ys.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ye(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}abs(){return this.x=Math.abs(this.x),this.y=Math.abs(this.y),this.z=Math.abs(this.z),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ys=new W,ea=new ct,ls=2e3,ia=2001;class ue{constructor(t,e,i,r,s,a,c,o,l,u,d,h,f,y,x,g){this.isMatrix4=!0,ue.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,a,c,o,l,u,d,h,f,y,x,g)}extractPosition(t){return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."),this.copyPosition(t)}multiplyToArray(t,e,i){return console.error("THREE.Matrix4: .multiplyToArray() has been removed."),this}setRotationFromQuaternion(t){return this.makeRotationFromQuaternion(t)}set(t,e,i,r,s,a,c,o,l,u,d,h,f,y,x,g){const v=this.elements;return v[0]=t,v[4]=e,v[8]=i,v[12]=r,v[1]=s,v[5]=a,v[9]=c,v[13]=o,v[2]=l,v[6]=u,v[10]=d,v[14]=h,v[3]=f,v[7]=y,v[11]=x,v[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ue().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/wi.setFromMatrixColumn(t,0).length(),s=1/wi.setFromMatrixColumn(t,1).length(),a=1/wi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,a=Math.cos(i),c=Math.sin(i),o=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){const h=a*u,f=a*d,y=c*u,x=c*d;e[0]=o*u,e[4]=-o*d,e[8]=l,e[1]=f+y*l,e[5]=h-x*l,e[9]=-c*o,e[2]=x-h*l,e[6]=y+f*l,e[10]=a*o}else if(t.order==="YXZ"){const h=o*u,f=o*d,y=l*u,x=l*d;e[0]=h+x*c,e[4]=y*c-f,e[8]=a*l,e[1]=a*d,e[5]=a*u,e[9]=-c,e[2]=f*c-y,e[6]=x+h*c,e[10]=a*o}else if(t.order==="ZXY"){const h=o*u,f=o*d,y=l*u,x=l*d;e[0]=h-x*c,e[4]=-a*d,e[8]=y+f*c,e[1]=f+y*c,e[5]=a*u,e[9]=x-h*c,e[2]=-a*l,e[6]=c,e[10]=a*o}else if(t.order==="ZYX"){const h=a*u,f=a*d,y=c*u,x=c*d;e[0]=o*u,e[4]=y*l-f,e[8]=h*l+x,e[1]=o*d,e[5]=x*l+h,e[9]=f*l-y,e[2]=-l,e[6]=c*o,e[10]=a*o}else if(t.order==="YZX"){const h=a*o,f=a*l,y=c*o,x=c*l;e[0]=o*u,e[4]=x-h*d,e[8]=y*d+f,e[1]=d,e[5]=a*u,e[9]=-c*u,e[2]=-l*u,e[6]=f*d+y,e[10]=h-x*d}else if(t.order==="XZY"){const h=a*o,f=a*l,y=c*o,x=c*l;e[0]=o*u,e[4]=-d,e[8]=l*u,e[1]=h*d+x,e[5]=a*u,e[9]=f*d-y,e[2]=y*d-f,e[6]=c*u,e[10]=x*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(mh,t,ph)}lookAt(t,e,i){const r=this.elements;return Yt.subVectors(t,e),Yt.lengthSq()===0&&(Yt.z=1),Yt.normalize(),Ie.crossVectors(i,Yt),Ie.lengthSq()===0&&(Math.abs(i.z)===1?Yt.x+=1e-4:Yt.z+=1e-4,Yt.normalize(),Ie.crossVectors(i,Yt)),Ie.normalize(),hs.crossVectors(Yt,Ie),r[0]=Ie.x,r[4]=hs.x,r[8]=Yt.x,r[1]=Ie.y,r[5]=hs.y,r[9]=Yt.y,r[2]=Ie.z,r[6]=hs.z,r[10]=Yt.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,a=i[0],c=i[4],o=i[8],l=i[12],u=i[1],d=i[5],h=i[9],f=i[13],y=i[2],x=i[6],g=i[10],v=i[14],M=i[3],b=i[7],z=i[11],_=i[15],w=r[0],A=r[4],T=r[8],E=r[12],C=r[1],I=r[5],B=r[9],R=r[13],O=r[2],X=r[6],H=r[10],nt=r[14],vt=r[3],lt=r[7],tt=r[11],Tt=r[15];return s[0]=a*w+c*C+o*O+l*vt,s[4]=a*A+c*I+o*X+l*lt,s[8]=a*T+c*B+o*H+l*tt,s[12]=a*E+c*R+o*nt+l*Tt,s[1]=u*w+d*C+h*O+f*vt,s[5]=u*A+d*I+h*X+f*lt,s[9]=u*T+d*B+h*H+f*tt,s[13]=u*E+d*R+h*nt+f*Tt,s[2]=y*w+x*C+g*O+v*vt,s[6]=y*A+x*I+g*X+v*lt,s[10]=y*T+x*B+g*H+v*tt,s[14]=y*E+x*R+g*nt+v*Tt,s[3]=M*w+b*C+z*O+_*vt,s[7]=M*A+b*I+z*X+_*lt,s[11]=M*T+b*B+z*H+_*tt,s[15]=M*E+b*R+z*nt+_*Tt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],a=t[1],c=t[5],o=t[9],l=t[13],u=t[2],d=t[6],h=t[10],f=t[14],y=t[3],x=t[7],g=t[11],v=t[15];return y*(+s*o*d-r*l*d-s*c*h+i*l*h+r*c*f-i*o*f)+x*(+e*o*f-e*l*h+s*a*h-r*a*f+r*l*u-s*o*u)+g*(+e*l*d-e*c*f-s*a*d+i*a*f+s*c*u-i*l*u)+v*(-r*c*u-e*o*d+e*c*h+r*a*d-i*a*h+i*o*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],c=t[5],o=t[6],l=t[7],u=t[8],d=t[9],h=t[10],f=t[11],y=t[12],x=t[13],g=t[14],v=t[15],M=d*g*l-x*h*l+x*o*f-c*g*f-d*o*v+c*h*v,b=y*h*l-u*g*l-y*o*f+a*g*f+u*o*v-a*h*v,z=u*x*l-y*d*l+y*c*f-a*x*f-u*c*v+a*d*v,_=y*d*o-u*x*o-y*c*h+a*x*h+u*c*g-a*d*g,w=e*M+i*b+r*z+s*_;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return t[0]=M*A,t[1]=(x*h*s-d*g*s-x*r*f+i*g*f+d*r*v-i*h*v)*A,t[2]=(c*g*s-x*o*s+x*r*l-i*g*l-c*r*v+i*o*v)*A,t[3]=(d*o*s-c*h*s-d*r*l+i*h*l+c*r*f-i*o*f)*A,t[4]=b*A,t[5]=(u*g*s-y*h*s+y*r*f-e*g*f-u*r*v+e*h*v)*A,t[6]=(y*o*s-a*g*s-y*r*l+e*g*l+a*r*v-e*o*v)*A,t[7]=(a*h*s-u*o*s+u*r*l-e*h*l-a*r*f+e*o*f)*A,t[8]=z*A,t[9]=(y*d*s-u*x*s-y*i*f+e*x*f+u*i*v-e*d*v)*A,t[10]=(a*x*s-y*c*s+y*i*l-e*x*l-a*i*v+e*c*v)*A,t[11]=(u*c*s-a*d*s-u*i*l+e*d*l+a*i*f-e*c*f)*A,t[12]=_*A,t[13]=(u*x*r-y*d*r+y*i*h-e*x*h-u*i*g+e*d*g)*A,t[14]=(y*c*r-a*x*r-y*i*o+e*x*o+a*i*g-e*c*g)*A,t[15]=(a*d*r-u*c*r+u*i*o-e*d*o-a*i*h+e*c*h)*A,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,a=t.x,c=t.y,o=t.z,l=s*a,u=s*c;return this.set(l*a+i,l*c-r*o,l*o+r*c,0,l*c+r*o,u*c+i,u*o-r*a,0,l*o-r*c,u*o+r*a,s*o*o+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,a){return this.set(1,i,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,a=e._y,c=e._z,o=e._w,l=s+s,u=a+a,d=c+c,h=s*l,f=s*u,y=s*d,x=a*u,g=a*d,v=c*d,M=o*l,b=o*u,z=o*d,_=i.x,w=i.y,A=i.z;return r[0]=(1-(x+v))*_,r[1]=(f+z)*_,r[2]=(y-b)*_,r[3]=0,r[4]=(f-z)*w,r[5]=(1-(h+v))*w,r[6]=(g+M)*w,r[7]=0,r[8]=(y+b)*A,r[9]=(g-M)*A,r[10]=(1-(h+x))*A,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=wi.set(r[0],r[1],r[2]).length();const a=wi.set(r[4],r[5],r[6]).length(),c=wi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],ae.copy(this);const l=1/s,u=1/a,d=1/c;return ae.elements[0]*=l,ae.elements[1]*=l,ae.elements[2]*=l,ae.elements[4]*=u,ae.elements[5]*=u,ae.elements[6]*=u,ae.elements[8]*=d,ae.elements[9]*=d,ae.elements[10]*=d,e.setFromRotationMatrix(ae),i.x=s,i.y=a,i.z=c,this}makePerspective(t,e,i,r,s,a,c=ls){const o=this.elements,l=2*s/(e-t),u=2*s/(i-r),d=(e+t)/(e-t),h=(i+r)/(i-r);let f,y;if(c===ls)f=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(c===ia)f=-a/(a-s),y=-a*s/(a-s);else throw new Error("Matrix4.makePerspective(): Invalid coordinate system: "+c);return o[0]=l,o[4]=0,o[8]=d,o[12]=0,o[1]=0,o[5]=u,o[9]=h,o[13]=0,o[2]=0,o[6]=0,o[10]=f,o[14]=y,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(t,e,i,r,s,a,c=ls){const o=this.elements,l=1/(e-t),u=1/(i-r),d=1/(a-s),h=(e+t)*l,f=(i+r)*u;let y,x;if(c===ls)y=(a+s)*d,x=-2*d;else if(c===ia)y=s*d,x=-1*d;else throw new Error("../math.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-h,o[1]=0,o[5]=2*u,o[9]=0,o[13]=-f,o[2]=0,o[6]=0,o[10]=x,o[14]=-y,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const wi=new W,ae=new ue,mh=new W(0,0,0),ph=new W(1,1,1),Ie=new W,hs=new W,Yt=new W,ra=new ue,sa=new ct;class dr{constructor(t=0,e=0,i=0,r=dr.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new dr(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],a=r[4],c=r[8],o=r[1],l=r[5],u=r[9],d=r[2],h=r[6],f=r[10];switch(e){case"XYZ":this._y=Math.asin(ye(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ye(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(c,f),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(o,s));break;case"ZYX":this._y=Math.asin(-ye(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(o,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(c,f));break;case"XZY":this._z=Math.asin(-ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(c,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("../math.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return ra.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ra,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return sa.setFromEuler(this),this.setFromQuaternion(sa,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(t){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}dr.DEFAULT_ORDER="XYZ";class Ci{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new Ci(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ye(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*i-a*r+t.x,this.y=s*r+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}Ci.isVector2=!0;class Qt{constructor(t=0,e=0,i=0,r=1){Qt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new Qt(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const o=t.elements,l=o[0],u=o[4],d=o[8],h=o[1],f=o[5],y=o[9],x=o[2],g=o[6],v=o[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(y-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(y+g)<.1&&Math.abs(l+f+v-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(l+1)/2,z=(f+1)/2,_=(v+1)/2,w=(u+h)/4,A=(d+x)/4,T=(y+g)/4;return b>z&&b>_?b<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(b),r=w/i,s=A/i):z>_?z<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(z),i=w/r,s=T/r):_<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(_),i=A/s,r=T/s),this.set(i,r,s,e),this}let M=Math.sqrt((g-y)*(g-y)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(g-y)/M,this.y=(d-x)/M,this.z=(h-u)/M,this.w=Math.acos((l+f+v-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ve{constructor(t,e,i,r,s,a,c,o,l){ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,a,c,o,l)}set(t,e,i,r,s,a,c,o,l){const u=this.elements;return u[0]=t,u[1]=r,u[2]=c,u[3]=e,u[4]=s,u[5]=o,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,a=i[0],c=i[3],o=i[6],l=i[1],u=i[4],d=i[7],h=i[2],f=i[5],y=i[8],x=r[0],g=r[3],v=r[6],M=r[1],b=r[4],z=r[7],_=r[2],w=r[5],A=r[8];return s[0]=a*x+c*M+o*_,s[3]=a*g+c*b+o*w,s[6]=a*v+c*z+o*A,s[1]=l*x+u*M+d*_,s[4]=l*g+u*b+d*w,s[7]=l*v+u*z+d*A,s[2]=h*x+f*M+y*_,s[5]=h*g+f*b+y*w,s[8]=h*v+f*z+y*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],c=t[5],o=t[6],l=t[7],u=t[8];return e*a*u-e*c*l-i*s*u+i*c*o+r*s*l-r*a*o}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],c=t[5],o=t[6],l=t[7],u=t[8],d=u*a-c*l,h=c*o-u*s,f=l*s-a*o,y=e*d+i*h+r*f;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/y;return t[0]=d*x,t[1]=(r*l-u*i)*x,t[2]=(c*i-r*a)*x,t[3]=h*x,t[4]=(u*e-r*o)*x,t[5]=(r*s-c*e)*x,t[6]=f*x,t[7]=(i*o-l*e)*x,t[8]=(a*e-i*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,a,c){const o=Math.cos(s),l=Math.sin(s);return this.set(i*o,i*l,-i*(o*a+l*c)+a+t,-r*l,r*o,-r*(-l*a+o*c)+c+e,0,0,1),this}scale(t,e){return this.premultiply(Ws.makeScale(t,e)),this}rotate(t){return this.premultiply(Ws.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ws.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new ve().fromArray(this.elements)}}const Ws=new ve;var Ft;(function(n){n[n.Random=0]="Random",n[n.Loop=1]="Loop",n[n.PingPong=2]="PingPong",n[n.Burst=3]="Burst"})(Ft||(Ft={}));function Fi(n,t,e,i){let r;switch(Ft.Random===n?t=Math.random():Ft.Burst===n&&i.isBursting&&(t=i.burstParticleIndex/i.burstParticleCount),e>0?r=Math.floor(t/e)*e:r=t,n){case Ft.Loop:r=r%1;break;case Ft.PingPong:r=Math.abs(r%2-1);break}return r}class ke{constructor(t,e,i,r){this.p=[t,e,i,r]}genValue(t){const e=t*t,i=t*t*t,r=1-t,s=r*r,a=s*r;return this.p[0]*a+this.p[1]*s*t*3+this.p[2]*r*e*3+this.p[3]*i}derivativeCoefficients(t){const e=[];for(let i=t,r=i.length-1;r>0;r--){const s=[];for(let a=0;a<r;a++){const c=r*(i[a+1]-i[a]);s.push(c)}e.push(s),i=s}return e}getSlope(t){const e=this.derivativeCoefficients(this.p)[0],i=1-t,r=i*i,s=i*t*2,a=t*t;return r*e[0]+s*e[1]+a*e[2]}controlCurve(t,e){this.p[1]=t/3+this.p[0],this.p[2]=this.p[3]-e/3}hull(t){let e=this.p,i=[],r,s=0,a=0,c=0;const o=[];for(o[s++]=e[0],o[s++]=e[1],o[s++]=e[2],o[s++]=e[3];e.length>1;){for(i=[],a=0,c=e.length-1;a<c;a++)r=t*e[a]+(1-t)*e[a+1],o[s++]=r,i.push(r);e=i}return o}split(t){const e=this.hull(t);return{left:new ke(e[0],e[4],e[7],e[9]),right:new ke(e[9],e[8],e[6],e[3]),span:e}}clone(){return new ke(this.p[0],this.p[1],this.p[2],this.p[3])}toJSON(){return{p0:this.p[0],p1:this.p[1],p2:this.p[2],p3:this.p[3]}}static fromJSON(t){return new ke(t.p0,t.p1,t.p2,t.p3)}}const fr=n=>({r:n.x,g:n.y,b:n.z,a:n.w}),mr=n=>new Qt(n.r,n.g,n.b,n.a),yh=(n,t)=>{switch(t){case"Vector3":return new W(n.x,n.y,n.z);case"Vector4":return new Qt(n.x,n.y,n.z,n.w);case"Color":return new W(n.r,n.g,n.b);case"Number":return n;default:return n}},gh=(n,t)=>{switch(t){case"Vector3":return{x:n.x,y:n.y,z:n.z};case"Vector4":return{x:n.x,y:n.y,z:n.z,w:n.w};case"Color":return{r:n.x,g:n.y,b:n.z};case"Number":return n;default:return n}};class bs{constructor(t,e){this.a=t,this.b=e,this.type="value"}startGen(t){}genColor(t,e){const i=Math.random();return e.copy(this.a).lerp(this.b,i)}toJSON(){return{type:"RandomColor",a:fr(this.a),b:fr(this.b)}}static fromJSON(t){return new bs(mr(t.a),mr(t.b))}clone(){return new bs(this.a.clone(),this.b.clone())}}class Bi{constructor(t,e){this.a=t,this.b=e,this.indexCount=-1,this.type="value"}startGen(t){this.indexCount=t.length,t.push(Math.random())}genColor(t,e){return this.indexCount===-1&&this.startGen(t),e.copy(this.a).lerp(this.b,t[this.indexCount])}toJSON(){return{type:"ColorRange",a:fr(this.a),b:fr(this.b)}}static fromJSON(t){return new Bi(mr(t.a),mr(t.b))}clone(){return new Bi(this.a.clone(),this.b.clone())}}class Ve{constructor(t,e){this.subType=e,this.type="function",this.keys=t}findKey(t){let e=0,i=0,r=this.keys.length-1;for(;i+1<r;)if(e=Math.floor((i+r)/2),t<this.getStartX(e))r=e-1;else if(t>this.getEndX(e))i=e+1;else return e;for(let s=i;s<=r;s++)if(t>=this.getStartX(s)&&t<=this.getEndX(s))return s;return-1}getStartX(t){return this.keys[t][1]}getEndX(t){return t+1<this.keys.length?this.keys[t+1][1]:1}genValue(t,e){const i=this.findKey(e);return this.subType==="Number"?i===-1?this.keys[0][0]:i+1>=this.keys.length?this.keys[this.keys.length-1][0]:(this.keys[i+1][0]-this.keys[i][0])*((e-this.getStartX(i))/(this.getEndX(i)-this.getStartX(i)))+this.keys[i][0]:i===-1?t.copy(this.keys[0][0]):i+1>=this.keys.length?t.copy(this.keys[this.keys.length-1][0]):t.copy(this.keys[i][0]).lerp(this.keys[i+1][0],(e-this.getStartX(i))/(this.getEndX(i)-this.getStartX(i)))}toJSON(){return this.keys[0][0].constructor.name,{type:"CLinearFunction",subType:this.subType,keys:this.keys.map(([t,e])=>({value:gh(t,this.subType),pos:e}))}}static fromJSON(t){return new Ve(t.keys.map(e=>[yh(e.value,t.subType),e.pos]),t.subType)}clone(){return this.subType==="Number"?new Ve(this.keys.map(([t,e])=>[t,e]),this.subType):new Ve(this.keys.map(([t,e])=>[t.clone(),e]),this.subType)}}const us=new W;class ii{constructor(t=[[new W(0,0,0),0],[new W(1,1,1),0]],e=[[1,0],[1,1]]){this.type="function",this.color=new Ve(t,"Color"),this.alpha=new Ve(e,"Number")}genColor(t,e,i){return this.color.genValue(us,i),e.set(us.x,us.y,us.z,this.alpha.genValue(1,i))}toJSON(){return{type:"Gradient",color:this.color.toJSON(),alpha:this.alpha.toJSON()}}static fromJSON(t){if(t.functions){const e=t.functions.map(i=>[Bi.fromJSON(i.function).a,i.start]);return t.functions.length>0&&e.push([Bi.fromJSON(t.functions[t.functions.length-1].function).b,1]),new ii(e.map(i=>[new W(i[0].x,i[0].y,i[0].z),i[1]]),e.map(i=>[i[0].w,i[1]]))}else{const e=new ii;return e.alpha=Ve.fromJSON(t.alpha),e.color=Ve.fromJSON(t.color),e}}clone(){const t=new ii;return t.alpha=this.alpha.clone(),t.color=this.color.clone(),t}startGen(t){}}const $s=new Qt;class As{constructor(t,e){this.indexCount=0,this.type="function",this.gradient1=t,this.gradient2=e}startGen(t){this.indexCount=t.length,t.push(Math.random())}genColor(t,e,i){return this.gradient1.genColor(t,e,i),this.gradient2.genColor(t,$s,i),t&&t[this.indexCount]!==void 0?e.lerp($s,t[this.indexCount]):e.lerp($s,Math.random()),e}toJSON(){return{type:"RandomColorBetweenGradient",gradient1:this.gradient1.toJSON(),gradient2:this.gradient2.toJSON()}}static fromJSON(t){return new As(ii.fromJSON(t.gradient1),ii.fromJSON(t.gradient2))}clone(){return new As(this.gradient1.clone(),this.gradient2.clone())}}class ai{constructor(t){this.color=t,this.type="value"}startGen(t){}genColor(t,e){return e.copy(this.color)}toJSON(){return{type:"ConstantColor",color:fr(this.color)}}static fromJSON(t){return new ai(mr(t.color))}clone(){return new ai(this.color.clone())}}function Un(n){switch(n.type){case"ConstantColor":return ai.fromJSON(n);case"ColorRange":return Bi.fromJSON(n);case"RandomColor":return bs.fromJSON(n);case"Gradient":return ii.fromJSON(n);case"RandomColorBetweenGradient":return As.fromJSON(n);default:return new ai(new Qt(1,1,1,1))}}class ot{constructor(t){this.value=t,this.type="value"}startGen(t){}genValue(t){return this.value}toJSON(){return{type:"ConstantValue",value:this.value}}static fromJSON(t){return new ot(t.value)}clone(){return new ot(this.value)}}class _e{constructor(t,e){this.a=t,this.b=e,this.indexCount=-1,this.type="value"}startGen(t){this.indexCount=t.length,t.push(Math.random())}genValue(t){return this.indexCount===-1&&this.startGen(t),Ri.lerp(this.a,this.b,t[this.indexCount])}toJSON(){return{type:"IntervalValue",a:this.a,b:this.b}}static fromJSON(t){return new _e(t.a,t.b)}clone(){return new _e(this.a,this.b)}}class vh{constructor(){this.functions=new Array}findFunction(t){let e=0,i=0,r=this.functions.length-1;for(;i+1<r;)if(e=Math.floor((i+r)/2),t<this.getStartX(e))r=e-1;else if(t>this.getEndX(e))i=e+1;else return e;for(let s=i;s<=r;s++)if(t>=this.functions[s][1]&&t<=this.getEndX(s))return s;return-1}getStartX(t){return this.functions[t][1]}setStartX(t,e){t>0&&(this.functions[t][1]=e)}getEndX(t){return t+1<this.functions.length?this.functions[t+1][1]:1}setEndX(t,e){t+1<this.functions.length&&(this.functions[t+1][1]=e)}insertFunction(t,e){const i=this.findFunction(t);this.functions.splice(i+1,0,[e,t])}removeFunction(t){return this.functions.splice(t,1)[0][0]}getFunction(t){return this.functions[t][0]}setFunction(t,e){this.functions[t][0]=e}get numOfFunctions(){return this.functions.length}}class Ni extends vh{constructor(t=[[new ke(0,1/3,1/3*2,1),0]]){super(),this.type="function",this.functions=t}genValue(t,e=0){const i=this.findFunction(e);return i===-1?0:this.functions[i][0].genValue((e-this.getStartX(i))/(this.getEndX(i)-this.getStartX(i)))}toSVG(t,e){if(e<1)return"";let i=["M",0,this.functions[0][0].p[0]].join(" ");for(let r=1/e;r<=1;r+=1/e)i=[i,"L",r*t,this.genValue(void 0,r)].join(" ");return i}toJSON(){return{type:"PiecewiseBezier",functions:this.functions.map(([t,e])=>({function:t.toJSON(),start:e}))}}static fromJSON(t){return new Ni(t.functions.map(e=>[ke.fromJSON(e.function),e.start]))}clone(){return new Ni(this.functions.map(([t,e])=>[t.clone(),e]))}startGen(t){}}function rt(n){switch(n.type){case"ConstantValue":return ot.fromJSON(n);case"IntervalValue":return _e.fromJSON(n);case"PiecewiseBezier":return Ni.fromJSON(n);default:return new ot(0)}}class pr{constructor(){this.indexCount=0,this.type="rotation"}startGen(t){this.indexCount=t.length,t.push(new ct);let e,i,r,s,a,c;do e=Math.random()*2-1,i=Math.random()*2-1,r=e*e+i*i;while(r>1);do s=Math.random()*2-1,a=Math.random()*2-1,c=s*s+a*a;while(c>1);const o=Math.sqrt((1-r)/c);t[this.indexCount].set(e,i,o*s,o*a)}genValue(t,e,i,r){return this.indexCount===-1&&this.startGen(t),e.copy(t[this.indexCount]),e}toJSON(){return{type:"RandomQuat"}}static fromJSON(t){return new pr}clone(){return new pr}}class yr{constructor(t,e){this.axis=t,this.angle=e,this.type="rotation"}startGen(t){this.angle.startGen(t)}genValue(t,e,i,r){return e.setFromAxisAngle(this.axis,this.angle.genValue(t,r)*i)}toJSON(){return{type:"AxisAngle",axis:{x:this.axis.x,y:this.axis.y,z:this.axis.z},angle:this.angle.toJSON()}}static fromJSON(t){return new yr(new W(t.axis.x,t.axis.y,t.axis.z),rt(t.angle))}clone(){return new yr(this.axis.clone(),this.angle.clone())}}class Ts{constructor(t,e,i,r){this.angleX=t,this.angleY=e,this.angleZ=i,this.type="rotation",this.eular=new dr(0,0,0,r)}startGen(t){this.angleX.startGen(t),this.angleY.startGen(t),this.angleZ.startGen(t)}genValue(t,e,i,r){return this.eular.set(this.angleX.genValue(t,r)*i,this.angleY.genValue(t,r)*i,this.angleZ.genValue(t,r)*i),e.setFromEuler(this.eular)}toJSON(){return{type:"Euler",angleX:this.angleX.toJSON(),angleY:this.angleY.toJSON(),angleZ:this.angleZ.toJSON(),eulerOrder:this.eular.order}}static fromJSON(t){return new Ts(rt(t.angleX),rt(t.angleY),rt(t.angleZ),t.eulerOrder)}clone(){return new Ts(this.angleX,this.angleY,this.angleZ,this.eular.order)}}function Xa(n){switch(n.type){case"AxisAngle":return yr.fromJSON(n);case"Euler":return Ts.fromJSON(n);case"RandomQuat":return pr.fromJSON(n);default:return new pr}}class oi{constructor(t,e,i){this.x=t,this.y=e,this.z=i,this.type="vec3function"}startGen(t){this.x.startGen(t),this.y.startGen(t),this.z.startGen(t)}genValue(t,e,i){return e.set(this.x.genValue(t,i),this.y.genValue(t,i),this.z.genValue(t,i))}toJSON(){return{type:"Vector3Function",x:this.x.toJSON(),y:this.y.toJSON(),z:this.z.toJSON()}}static fromJSON(t){return new oi(rt(t.x),rt(t.y),rt(t.z))}clone(){return new oi(this.x,this.y,this.z)}}function xh(n){switch(n.type){case"Vector3Function":return oi.fromJSON(n);default:return new oi(new ot(0),new ot(0),new ot(0))}}function zs(n){switch(n.type){case"ConstantValue":case"IntervalValue":case"PiecewiseBezier":return rt(n);case"AxisAngle":case"RandomQuat":case"Euler":return Xa(n);case"Vector3Function":return xh(n);default:return new ot(0)}}class gr{constructor(t={}){this.type="cone",this.currentValue=0,this.radius=t.radius??10,this.arc=t.arc??2*Math.PI,this.thickness=t.thickness??1,this.angle=t.angle??Math.PI/6,this.mode=t.mode??Ft.Random,this.spread=t.spread??0,this.speed=t.speed??new ot(1),this.memory=[]}update(t,e){Ft.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Fi(this.mode,this.currentValue,this.spread,e),r=Ri.lerp(1-this.thickness,1,Math.random()),s=i*this.arc,a=Math.sqrt(r),c=Math.sin(s),o=Math.cos(s);t.position.x=a*o,t.position.y=a*c,t.position.z=0;const l=this.angle*a;t.velocity.set(0,0,Math.cos(l)).addScaledVector(t.position,Math.sin(l)).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius)}toJSON(){return{type:"cone",radius:this.radius,arc:this.arc,thickness:this.thickness,angle:this.angle,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new gr({radius:t.radius,arc:t.arc,thickness:t.thickness,angle:t.angle,mode:t.mode,speed:t.speed?rt(t.speed):void 0,spread:t.spread})}clone(){return new gr({radius:this.radius,arc:this.arc,thickness:this.thickness,angle:this.angle,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}class vr{constructor(t={}){this.type="circle",this.currentValue=0,this.radius=t.radius??10,this.arc=t.arc??2*Math.PI,this.thickness=t.thickness??1,this.mode=t.mode??Ft.Random,this.spread=t.spread??0,this.speed=t.speed??new ot(1),this.memory=[]}update(t,e){this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e}initialize(t,e){const i=Fi(this.mode,this.currentValue,this.spread,e),r=Ri.lerp(1-this.thickness,1,Math.random()),s=i*this.arc;t.position.x=Math.cos(s),t.position.y=Math.sin(s),t.position.z=0,t.velocity.copy(t.position).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius*r)}toJSON(){return{type:"circle",radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new vr({radius:t.radius,arc:t.arc,thickness:t.thickness,mode:t.mode,speed:t.speed?rt(t.speed):void 0,spread:t.spread})}clone(){return new vr({radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}function ds(n,t){return Math.floor(Math.random()*(t-n))+n}const Hr=new W(0,1,0),Xr=new W(0,0,0),_h=new W(1,1,1),na=new W(0,0,1);class xr{constructor(t={}){this.type="donut",this.currentValue=0,this.radius=t.radius??10,this.arc=t.arc??2*Math.PI,this.thickness=t.thickness??1,this.donutRadius=t.donutRadius??this.radius*.2,this.mode=t.mode??Ft.Random,this.spread=t.spread??0,this.speed=t.speed??new ot(1),this.memory=[],this._m1=new ue}update(t,e){Ft.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Fi(this.mode,this.currentValue,this.spread,e),r=Math.random(),s=Ri.lerp(1-this.thickness,1,Math.random()),a=i*this.arc,c=r*Math.PI*2,o=Math.sin(a),l=Math.cos(a);if(t.position.x=this.radius*l,t.position.y=this.radius*o,t.position.z=0,t.velocity.z=this.donutRadius*s*Math.sin(c),t.velocity.x=this.donutRadius*s*Math.cos(c)*l,t.velocity.y=this.donutRadius*s*Math.cos(c)*o,t.position.add(t.velocity),t.velocity.normalize().multiplyScalar(t.startSpeed),t.rotation instanceof ct){const u=t.rotation;u.x===0&&u.y===0&&u.z===0&&u.w===1&&(this._m1.lookAt(Xr,t.velocity,Hr),t.rotation.setFromRotationMatrix(this._m1))}}toJSON(){return{type:"donut",radius:this.radius,arc:this.arc,thickness:this.thickness,donutRadius:this.donutRadius,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new xr({radius:t.radius,arc:t.arc,thickness:t.thickness,donutRadius:t.donutRadius,mode:t.mode,speed:t.speed?rt(t.speed):void 0,spread:t.spread})}clone(){return new xr({radius:this.radius,arc:this.arc,thickness:this.thickness,donutRadius:this.donutRadius,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}class _r{constructor(){this.type="point",this._m1=new ue}update(t,e){}initialize(t){const e=Math.random(),i=Math.random(),r=e*Math.PI*2,s=Math.acos(2*i-1),a=Math.cbrt(Math.random()),c=Math.sin(r),o=Math.cos(r),l=Math.sin(s),u=Math.cos(s);if(t.velocity.x=a*l*o,t.velocity.y=a*l*c,t.velocity.z=a*u,t.velocity.multiplyScalar(t.startSpeed),t.position.setScalar(0),t.rotation instanceof ct){const d=t.rotation;d.x===0&&d.y===0&&d.z===0&&d.w===1&&(this._m1.lookAt(Xr,t.velocity,Hr),t.rotation.setFromRotationMatrix(this._m1))}}toJSON(){return{type:"point"}}static fromJSON(t){return new _r}clone(){return new _r}}class ci{constructor(t={}){this.type="sphere",this.currentValue=0,this.radius=t.radius??10,this.arc=t.arc??2*Math.PI,this.thickness=t.thickness??1,this.mode=t.mode??Ft.Random,this.spread=t.spread??0,this.speed=t.speed??new ot(1),this.memory=[],this._m1=new ue}update(t,e){Ft.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Fi(this.mode,this.currentValue,this.spread,e),r=Math.random(),s=Ri.lerp(1-this.thickness,1,Math.random()),a=i*this.arc,c=Math.acos(2*r-1),o=Math.sin(a),l=Math.cos(a),u=Math.sin(c),d=Math.cos(c);if(t.position.x=u*l,t.position.y=u*o,t.position.z=d,t.velocity.copy(t.position).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius*s),t.rotation instanceof ct){const h=t.rotation;h.x===0&&h.y===0&&h.z===0&&h.w===1&&(this._m1.lookAt(Xr,t.position,Hr),t.rotation.setFromRotationMatrix(this._m1))}}toJSON(){return{type:"sphere",radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new ci({radius:t.radius,arc:t.arc,thickness:t.thickness,mode:t.mode,speed:t.speed?rt(t.speed):void 0,spread:t.spread})}clone(){return new ci({radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}class wr{constructor(t={}){this.type="hemisphere",this.currentValue=0,this.radius=t.radius??10,this.arc=t.arc??2*Math.PI,this.thickness=t.thickness??1,this.mode=t.mode??Ft.Random,this.spread=t.spread??0,this.speed=t.speed??new ot(1),this.memory=[],this._m1=new ue}update(t,e){Ft.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Fi(this.mode,this.currentValue,this.spread,e),r=Math.random(),s=Ri.lerp(1-this.thickness,1,Math.random()),a=i*this.arc,c=Math.acos(r),o=Math.sin(a),l=Math.cos(a),u=Math.sin(c),d=Math.cos(c);if(t.position.x=u*l,t.position.y=u*o,t.position.z=d,t.velocity.copy(t.position).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius*s),t.rotation instanceof ct){const h=t.rotation;h.x===0&&h.y===0&&h.z===0&&h.w===1&&(this._m1.lookAt(Xr,t.position,Hr),t.rotation.setFromRotationMatrix(this._m1))}}toJSON(){return{type:"hemisphere",radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new wr({radius:t.radius,arc:t.arc,thickness:t.thickness,mode:t.mode,speed:t.speed?rt(t.speed):void 0,spread:t.spread})}clone(){return new wr({radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}class Mr{constructor(t={}){this.type="grid",this.width=t.width??1,this.height=t.height??1,this.column=t.column??10,this.row=t.row??10}initialize(t){const e=Math.floor(Math.random()*this.row),i=Math.floor(Math.random()*this.column);t.position.x=i*this.width/this.column-this.width/2,t.position.y=e*this.height/this.row-this.height/2,t.position.z=0,t.velocity.set(0,0,t.startSpeed)}toJSON(){return{type:"grid",width:this.width,height:this.height,column:this.column,row:this.row}}static fromJSON(t){return new Mr(t)}clone(){return new Mr({width:this.width,height:this.height,column:this.column,row:this.row})}update(t,e){}}class Sr{constructor(t={}){this.type="rectangle",this.currentValue=0,this.width=t.width??10,this.height=t.height??10,this.thickness=t.thickness??1,this.mode=t.mode??Ft.Random,this.spread=t.spread??0,this.speed=t.speed??new ot(1),this.memory=[],this._m1=new ue}update(t,e){this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e}initialize(t,e){const i=Fi(this.mode,this.currentValue,this.spread,e),r=2*(this.width+this.height),s=i*r;let a,c;s<this.width?(a=s-this.width/2,c=-this.height/2):s<this.width+this.height?(a=this.width/2,c=s-this.width-this.height/2):s<2*this.width+this.height?(a=this.width/2-(s-this.width-this.height),c=this.height/2):(a=-this.width/2,c=this.height/2-(s-2*this.width-this.height));const o=Math.random(),l=1-this.thickness*o;if(t.position.x=a*l,t.position.y=c*l,t.position.z=0,t.velocity.x=a,t.velocity.y=c,t.velocity.z=0,t.velocity.normalize().multiplyScalar(t.startSpeed),t.rotation instanceof ct){const u=t.rotation;u.x===0&&u.y===0&&u.z===0&&u.w===1&&(this._m1.lookAt(Xr,t.velocity,Hr),t.rotation.setFromRotationMatrix(this._m1))}}toJSON(){return{type:"rectangle",width:this.width,height:this.height,thickness:this.thickness,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new Sr({width:t.width,height:t.height,thickness:t.thickness,mode:t.mode,speed:t.speed?rt(t.speed):void 0,spread:t.spread})}clone(){return new Sr({width:this.width,height:this.height,thickness:this.thickness,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}const vn={circle:{type:"circle",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc","value"]]],constructor:vr,loadJSON:vr.fromJSON},cone:{type:"cone",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["angle",["radian"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc","value"]]],constructor:gr,loadJSON:gr.fromJSON},donut:{type:"donut",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["donutRadius",["number"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc","value"]]],constructor:xr,loadJSON:xr.fromJSON},point:{type:"point",params:[],constructor:_r,loadJSON:_r.fromJSON},sphere:{type:"sphere",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["angle",["radian"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc","value"]]],constructor:ci,loadJSON:ci.fromJSON},hemisphere:{type:"hemisphere",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["angle",["radian"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc","value"]]],constructor:wr,loadJSON:wr.fromJSON},grid:{type:"grid",params:[["width",["number"]],["height",["number"]],["rows",["number"]],["column",["number"]]],constructor:Mr,loadJSON:Mr.fromJSON},rectangle:{type:"rectangle",params:[["width",["number"]],["height",["number"]],["thickness",["number"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc","value"]]],constructor:Sr,loadJSON:Sr.fromJSON}};function wh(n,t){return vn[n.type].loadJSON(n,t)}class br{constructor(t){this.color=t,this.type="ColorOverLife"}initialize(t){this.color.startGen(t.memory)}update(t,e){this.color.genColor(t.memory,t.color,t.age/t.life),t.color.x*=t.startColor.x,t.color.y*=t.startColor.y,t.color.z*=t.startColor.z,t.color.w*=t.startColor.w}frameUpdate(t){}toJSON(){return{type:this.type,color:this.color.toJSON()}}static fromJSON(t){return new br(Un(t.color))}clone(){return new br(this.color.clone())}reset(){}}class Ar{constructor(t){this.angularVelocity=t,this.type="RotationOverLife"}initialize(t){typeof t.rotation=="number"&&this.angularVelocity.startGen(t.memory)}update(t,e){typeof t.rotation=="number"&&(t.rotation+=e*this.angularVelocity.genValue(t.memory,t.age/t.life))}toJSON(){return{type:this.type,angularVelocity:this.angularVelocity.toJSON()}}static fromJSON(t){return new Ar(rt(t.angularVelocity))}frameUpdate(t){}clone(){return new Ar(this.angularVelocity.clone())}reset(){}}class Tr{constructor(t){this.angularVelocity=t,this.type="Rotation3DOverLife",this.tempQuat=new ct,this.tempQuat2=new ct}initialize(t){t.rotation instanceof ct&&(t.angularVelocity=new ct,this.angularVelocity.startGen(t.memory))}update(t,e){t.rotation instanceof ct&&(this.angularVelocity.genValue(t.memory,this.tempQuat,e,t.age/t.life),t.rotation.multiply(this.tempQuat))}toJSON(){return{type:this.type,angularVelocity:this.angularVelocity.toJSON()}}static fromJSON(t){return new Tr(Xa(t.angularVelocity))}frameUpdate(t){}clone(){return new Tr(this.angularVelocity.clone())}reset(){}}class zr{initialize(t,e){this.ps=e,this.x.startGen(t.memory),this.y.startGen(t.memory),this.z.startGen(t.memory)}constructor(t,e,i){this.x=t,this.y=e,this.z=i,this.type="ForceOverLife",this._temp=new W,this._tempScale=new W,this._tempQ=new ct}update(t,e){this._temp.set(this.x.genValue(t.memory,t.age/t.life),this.y.genValue(t.memory,t.age/t.life),this.z.genValue(t.memory,t.age/t.life)),this.ps.worldSpace?t.velocity.addScaledVector(this._temp,e):(this._temp.multiply(this._tempScale).applyQuaternion(this._tempQ),t.velocity.addScaledVector(this._temp,e))}toJSON(){return{type:this.type,x:this.x.toJSON(),y:this.y.toJSON(),z:this.z.toJSON()}}static fromJSON(t){return new zr(rt(t.x),rt(t.y),rt(t.z))}frameUpdate(t){if(this.ps&&!this.ps.worldSpace){const e=this._temp,i=this._tempQ,r=this._tempScale;this.ps.emitter.matrixWorld.decompose(e,i,r),i.invert(),r.set(1/r.x,1/r.y,1/r.z)}}clone(){return new zr(this.x.clone(),this.y.clone(),this.z.clone())}reset(){}}class Ui{initialize(t){this.size.startGen(t.memory)}constructor(t){this.size=t,this.type="SizeOverLife"}update(t){this.size instanceof oi?this.size.genValue(t.memory,t.size,t.age/t.life).multiply(t.startSize):t.size.copy(t.startSize).multiplyScalar(this.size.genValue(t.memory,t.age/t.life))}toJSON(){return{type:this.type,size:this.size.toJSON()}}static fromJSON(t){return new Ui(zs(t.size))}frameUpdate(t){}clone(){return new Ui(this.size.clone())}reset(){}}class Er{initialize(t){this.speed.startGen(t.memory)}constructor(t){this.speed=t,this.type="SpeedOverLife"}update(t){t.speedModifier=this.speed.genValue(t.memory,t.age/t.life)}toJSON(){return{type:this.type,speed:this.speed.toJSON()}}static fromJSON(t){return new Er(rt(t.speed))}frameUpdate(t){}clone(){return new Er(this.speed.clone())}reset(){}}class Pr{constructor(t){this.frame=t,this.type="FrameOverLife"}initialize(t){this.frame.startGen(t.memory)}update(t,e){this.frame instanceof Ni&&(t.uvTile=this.frame.genValue(t.memory,t.age/t.life))}frameUpdate(t){}toJSON(){return{type:this.type,frame:this.frame.toJSON()}}static fromJSON(t){return new Pr(rt(t.frame))}clone(){return new Pr(this.frame.clone())}reset(){}}class Cr{constructor(t,e=new W(0,1,0)){this.orbitSpeed=t,this.axis=e,this.type="OrbitOverLife",this.temp=new W,this.rotation=new ct}initialize(t){this.orbitSpeed.startGen(t.memory)}update(t,e){this.temp.copy(t.position).projectOnVector(this.axis),this.rotation.setFromAxisAngle(this.axis,this.orbitSpeed.genValue(t.memory,t.age/t.life)*e),t.position.sub(this.temp),t.position.applyQuaternion(this.rotation),t.position.add(this.temp)}frameUpdate(t){}toJSON(){return{type:this.type,orbitSpeed:this.orbitSpeed.toJSON(),axis:[this.axis.x,this.axis.y,this.axis.z]}}static fromJSON(t){return new Cr(rt(t.orbitSpeed),t.axis?new W(t.axis[0],t.axis[1],t.axis[2]):void 0)}clone(){return new Cr(this.orbitSpeed.clone())}reset(){}}class Qs{constructor(t){this.data=t,this.next=null,this.prev=null}hasPrev(){return this.prev!==null}hasNext(){return this.next!==null}}class Mh{constructor(){this.length=0,this.head=this.tail=null}isEmpty(){return this.head===null}clear(){this.length=0,this.head=this.tail=null}front(){return this.head===null?null:this.head.data}back(){return this.tail===null?null:this.tail.data}dequeue(){if(this.head){const t=this.head.data;return this.head=this.head.next,this.head?this.head.prev=null:this.tail=null,this.length--,t}}pop(){if(this.tail){const t=this.tail.data;return this.tail=this.tail.prev,this.tail?this.tail.next=null:this.head=null,this.length--,t}}queue(t){const e=new Qs(t);this.tail||(this.tail=e),this.head&&(this.head.prev=e,e.next=this.head),this.head=e,this.length++}push(t){const e=new Qs(t);this.head||(this.head=e),this.tail&&(this.tail.next=e,e.prev=this.tail),this.tail=e,this.length++}insertBefore(t,e){const i=new Qs(e);i.next=t,i.prev=t.prev,i.prev!==null&&(i.prev.next=i),i.next.prev=i,t==this.head&&(this.head=i),this.length++}remove(t){if(this.head===null||this.tail===null)return;let e=this.head;for(t===this.head.data&&(this.head=this.head.next),t===this.tail.data&&(this.tail=this.tail.prev);e.next!==null&&e.data!==t;)e=e.next;e.data===t&&(e.prev!==null&&(e.prev.next=e.next),e.next!==null&&(e.next.prev=e.prev),this.length--)}*values(){let t=this.head;for(;t!==null;)yield t.data,t=t.next}}class Sh{constructor(){this.startSpeed=0,this.startColor=new Qt,this.startSize=new W(1,1,1),this.position=new W,this.velocity=new W,this.age=0,this.life=1,this.size=new W(1,1,1),this.speedModifier=1,this.rotation=0,this.color=new Qt,this.uvTile=0,this.memory=[]}get died(){return this.age>=this.life}reset(){this.memory.length=0}}class bh{constructor(t,e,i){this.position=t,this.size=e,this.color=i}}class xn{constructor(){this.startSpeed=0,this.startColor=new Qt,this.startSize=new W(1,1,1),this.position=new W,this.velocity=new W,this.age=0,this.life=1,this.size=new W(1,1,1),this.length=100,this.speedModifier=1,this.color=new Qt,this.previous=new Mh,this.uvTile=0,this.memory=[]}update(){for(this.age<=this.life?this.previous.push(new bh(this.position.clone(),this.size.x,this.color.clone())):this.previous.length>0&&this.previous.dequeue();this.previous.length>this.length;)this.previous.dequeue()}get died(){return this.age>=this.life}reset(){this.memory.length=0,this.previous.clear()}}class Br{initialize(t){this.width.startGen(t.memory)}constructor(t){this.width=t,this.type="WidthOverLength"}update(t){if(t instanceof xn){const e=t.previous.values();for(let i=0;i<t.previous.length;i++){const r=e.next();r.value.size=this.width.genValue(t.memory,(t.previous.length-i)/t.length)}}}frameUpdate(t){}toJSON(){return{type:this.type,width:this.width.toJSON()}}static fromJSON(t){return new Br(rt(t.width))}clone(){return new Br(this.width.clone())}reset(){}}class Nr{constructor(t,e){this.direction=t,this.magnitude=e,this.type="ApplyForce",this.memory={data:[],dataCount:0},this.magnitudeValue=this.magnitude.genValue(this.memory)}initialize(t){}update(t,e){t.velocity.addScaledVector(this.direction,this.magnitudeValue*e)}frameUpdate(t){this.magnitudeValue=this.magnitude.genValue(this.memory)}toJSON(){return{type:this.type,direction:[this.direction.x,this.direction.y,this.direction.z],magnitude:this.magnitude.toJSON()}}static fromJSON(t){return new Nr(new W(t.direction[0],t.direction[1],t.direction[2]),rt(t.magnitude??t.force))}clone(){return new Nr(this.direction.clone(),this.magnitude.clone())}reset(){}}class Ur{constructor(t,e){this.center=t,this.magnitude=e,this.type="GravityForce",this.temp=new W}initialize(t){}update(t,e){this.temp.copy(this.center).sub(t.position).normalize(),t.velocity.addScaledVector(this.temp,this.magnitude/t.position.distanceToSquared(this.center)*e)}frameUpdate(t){}toJSON(){return{type:this.type,center:[this.center.x,this.center.y,this.center.z],magnitude:this.magnitude}}static fromJSON(t){return new Ur(new W(t.center[0],t.center[1],t.center[2]),t.magnitude)}clone(){return new Ur(this.center.clone(),this.magnitude)}reset(){}}class Ir{constructor(t){this.angle=t,this.type="ChangeEmitDirection",this._temp=new W,this._q=new ct,this.memory={data:[],dataCount:0}}initialize(t){const e=t.velocity.length();e!=0&&(t.velocity.normalize(),t.velocity.x===0&&t.velocity.y===0?this._temp.set(0,t.velocity.z,0):this._temp.set(-t.velocity.y,t.velocity.x,0),this.angle.startGen(this.memory),this._q.setFromAxisAngle(this._temp.normalize(),this.angle.genValue(this.memory)),this._temp.copy(t.velocity),t.velocity.applyQuaternion(this._q),this._q.setFromAxisAngle(this._temp,Math.random()*Math.PI*2),t.velocity.applyQuaternion(this._q),t.velocity.setLength(e))}update(t,e){}frameUpdate(t){}toJSON(){return{type:this.type,angle:this.angle.toJSON()}}static fromJSON(t){return new Ir(rt(t.angle))}clone(){return new Ir(this.angle)}reset(){}}var Ti;(function(n){n[n.Death=0]="Death",n[n.Birth=1]="Birth",n[n.Frame=2]="Frame"})(Ti||(Ti={}));class Or{constructor(t,e,i,r=Ti.Frame,s=1){this.particleSystem=t,this.useVelocityAsBasis=e,this.subParticleSystem=i,this.mode=r,this.emitProbability=s,this.type="EmitSubParticleSystem",this.q_=new ct,this.v_=new W,this.v2_=new W,this.subEmissions=new Array,this.subParticleSystem&&this.subParticleSystem.system&&(this.subParticleSystem.system.onlyUsedByOther=!0)}initialize(t){}update(t,e){this.mode===Ti.Frame?this.emit(t,e):this.mode===Ti.Birth&&t.age===0?this.emit(t,e):this.mode===Ti.Death&&t.age+e>=t.life&&this.emit(t,e)}emit(t,e){if(!this.subParticleSystem||Math.random()>this.emitProbability)return;const i=new ue;this.setMatrixFromParticle(i,t),this.subEmissions.push({burstParticleCount:0,burstParticleIndex:0,isBursting:!1,burstIndex:0,burstWaveIndex:0,time:0,waitEmiting:0,matrix:i,travelDistance:0,particle:t})}frameUpdate(t){if(this.subParticleSystem)for(let e=0;e<this.subEmissions.length;e++)if(this.subEmissions[e].time>=this.subParticleSystem.system.duration)this.subEmissions[e]=this.subEmissions[this.subEmissions.length-1],this.subEmissions.length=this.subEmissions.length-1,e--;else{const i=this.subEmissions[e];i.particle&&i.particle.age<i.particle.life?this.setMatrixFromParticle(i.matrix,i.particle):i.particle=void 0,this.subParticleSystem.system.emit(t,i,i.matrix)}}toJSON(){return{type:this.type,subParticleSystem:this.subParticleSystem?this.subParticleSystem.uuid:"",useVelocityAsBasis:this.useVelocityAsBasis,mode:this.mode,emitProbability:this.emitProbability}}static fromJSON(t,e){return new Or(e,t.useVelocityAsBasis,t.subParticleSystem,t.mode,t.emitProbability)}clone(){return new Or(this.particleSystem,this.useVelocityAsBasis,this.subParticleSystem,this.mode,this.emitProbability)}reset(){}setMatrixFromParticle(t,e){let i;if(e.rotation===void 0||this.useVelocityAsBasis)if(e.velocity.x===0&&e.velocity.y===0&&(e.velocity.z===1||e.velocity.z===0))t.set(1,0,0,e.position.x,0,1,0,e.position.y,0,0,1,e.position.z,0,0,0,1);else{this.v_.copy(na).cross(e.velocity),this.v2_.copy(e.velocity).cross(this.v_);const r=this.v_.length(),s=this.v2_.length();t.set(this.v_.x/r,this.v2_.x/s,e.velocity.x,e.position.x,this.v_.y/r,this.v2_.y/s,e.velocity.y,e.position.y,this.v_.z/r,this.v2_.z/s,e.velocity.z,e.position.z,0,0,0,1)}else e.rotation instanceof ct?i=e.rotation:(this.q_.setFromAxisAngle(na,e.rotation),i=this.q_),t.compose(e.position,i,_h);this.particleSystem.worldSpace||t.multiplyMatrices(this.particleSystem.emitter.matrixWorld,t)}}const Ah=.5*(Math.sqrt(3)-1),ar=(3-Math.sqrt(3))/6,Th=1/3,me=1/6,zh=(Math.sqrt(5)-1)/4,Ut=(5-Math.sqrt(5))/20,Nt=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),zt=new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]);class Za{constructor(t=Math.random){const e=typeof t=="function"?t:Ph(t);this.p=Eh(e),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(let i=0;i<512;i++)this.perm[i]=this.p[i&255],this.permMod12[i]=this.perm[i]%12}noise2D(t,e){const i=this.permMod12,r=this.perm;let s=0,a=0,c=0;const o=(t+e)*Ah,l=Math.floor(t+o),u=Math.floor(e+o),d=(l+u)*ar,h=l-d,f=u-d,y=t-h,x=e-f;let g,v;y>x?(g=1,v=0):(g=0,v=1);const M=y-g+ar,b=x-v+ar,z=y-1+2*ar,_=x-1+2*ar,w=l&255,A=u&255;let T=.5-y*y-x*x;if(T>=0){const I=i[w+r[A]]*3;T*=T,s=T*T*(Nt[I]*y+Nt[I+1]*x)}let E=.5-M*M-b*b;if(E>=0){const I=i[w+g+r[A+v]]*3;E*=E,a=E*E*(Nt[I]*M+Nt[I+1]*b)}let C=.5-z*z-_*_;if(C>=0){const I=i[w+1+r[A+1]]*3;C*=C,c=C*C*(Nt[I]*z+Nt[I+1]*_)}return 70*(s+a+c)}noise3D(t,e,i){const r=this.permMod12,s=this.perm;let a,c,o,l;const u=(t+e+i)*Th,d=Math.floor(t+u),h=Math.floor(e+u),f=Math.floor(i+u),y=(d+h+f)*me,x=d-y,g=h-y,v=f-y,M=t-x,b=e-g,z=i-v;let _,w,A,T,E,C;M>=b?b>=z?(_=1,w=0,A=0,T=1,E=1,C=0):M>=z?(_=1,w=0,A=0,T=1,E=0,C=1):(_=0,w=0,A=1,T=1,E=0,C=1):b<z?(_=0,w=0,A=1,T=0,E=1,C=1):M<z?(_=0,w=1,A=0,T=0,E=1,C=1):(_=0,w=1,A=0,T=1,E=1,C=0);const I=M-_+me,B=b-w+me,R=z-A+me,O=M-T+2*me,X=b-E+2*me,H=z-C+2*me,nt=M-1+3*me,vt=b-1+3*me,lt=z-1+3*me,tt=d&255,Tt=h&255,at=f&255;let mt=.6-M*M-b*b-z*z;if(mt<0)a=0;else{const ht=r[tt+s[Tt+s[at]]]*3;mt*=mt,a=mt*mt*(Nt[ht]*M+Nt[ht+1]*b+Nt[ht+2]*z)}let Pt=.6-I*I-B*B-R*R;if(Pt<0)c=0;else{const ht=r[tt+_+s[Tt+w+s[at+A]]]*3;Pt*=Pt,c=Pt*Pt*(Nt[ht]*I+Nt[ht+1]*B+Nt[ht+2]*R)}let Dt=.6-O*O-X*X-H*H;if(Dt<0)o=0;else{const ht=r[tt+T+s[Tt+E+s[at+C]]]*3;Dt*=Dt,o=Dt*Dt*(Nt[ht]*O+Nt[ht+1]*X+Nt[ht+2]*H)}let it=.6-nt*nt-vt*vt-lt*lt;if(it<0)l=0;else{const ht=r[tt+1+s[Tt+1+s[at+1]]]*3;it*=it,l=it*it*(Nt[ht]*nt+Nt[ht+1]*vt+Nt[ht+2]*lt)}return 32*(a+c+o+l)}noise4D(t,e,i,r){const s=this.perm;let a,c,o,l,u;const d=(t+e+i+r)*zh,h=Math.floor(t+d),f=Math.floor(e+d),y=Math.floor(i+d),x=Math.floor(r+d),g=(h+f+y+x)*Ut,v=h-g,M=f-g,b=y-g,z=x-g,_=t-v,w=e-M,A=i-b,T=r-z;let E=0,C=0,I=0,B=0;_>w?E++:C++,_>A?E++:I++,_>T?E++:B++,w>A?C++:I++,w>T?C++:B++,A>T?I++:B++;const R=E>=3?1:0,O=C>=3?1:0,X=I>=3?1:0,H=B>=3?1:0,nt=E>=2?1:0,vt=C>=2?1:0,lt=I>=2?1:0,tt=B>=2?1:0,Tt=E>=1?1:0,at=C>=1?1:0,mt=I>=1?1:0,Pt=B>=1?1:0,Dt=_-R+Ut,it=w-O+Ut,ht=A-X+Ut,Zt=T-H+Ut,Di=_-nt+2*Ut,Li=w-vt+2*Ut,li=A-lt+2*Ut,ki=T-tt+2*Ut,hi=_-Tt+3*Ut,ui=w-at+3*Ut,di=A-mt+3*Ut,Vi=T-Pt+3*Ut,Ji=_-1+4*Ut,Gi=w-1+4*Ut,Hi=A-1+4*Ut,Xi=T-1+4*Ut,Xe=h&255,Ze=f&255,Pe=y&255,qe=x&255;let Me=.6-_*_-w*w-A*A-T*T;if(Me<0)a=0;else{const pt=s[Xe+s[Ze+s[Pe+s[qe]]]]%32*4;Me*=Me,a=Me*Me*(zt[pt]*_+zt[pt+1]*w+zt[pt+2]*A+zt[pt+3]*T)}let Ye=.6-Dt*Dt-it*it-ht*ht-Zt*Zt;if(Ye<0)c=0;else{const pt=s[Xe+R+s[Ze+O+s[Pe+X+s[qe+H]]]]%32*4;Ye*=Ye,c=Ye*Ye*(zt[pt]*Dt+zt[pt+1]*it+zt[pt+2]*ht+zt[pt+3]*Zt)}let We=.6-Di*Di-Li*Li-li*li-ki*ki;if(We<0)o=0;else{const pt=s[Xe+nt+s[Ze+vt+s[Pe+lt+s[qe+tt]]]]%32*4;We*=We,o=We*We*(zt[pt]*Di+zt[pt+1]*Li+zt[pt+2]*li+zt[pt+3]*ki)}let Ce=.6-hi*hi-ui*ui-di*di-Vi*Vi;if(Ce<0)l=0;else{const pt=s[Xe+Tt+s[Ze+at+s[Pe+mt+s[qe+Pt]]]]%32*4;Ce*=Ce,l=Ce*Ce*(zt[pt]*hi+zt[pt+1]*ui+zt[pt+2]*di+zt[pt+3]*Vi)}let de=.6-Ji*Ji-Gi*Gi-Hi*Hi-Xi*Xi;if(de<0)u=0;else{const pt=s[Xe+1+s[Ze+1+s[Pe+1+s[qe+1]]]]%32*4;de*=de,u=de*de*(zt[pt]*Ji+zt[pt+1]*Gi+zt[pt+2]*Hi+zt[pt+3]*Xi)}return 27*(a+c+o+l+u)}}function Eh(n){const t=new Uint8Array(256);for(let e=0;e<256;e++)t[e]=e;for(let e=0;e<255;e++){const i=e+~~(n()*(256-e)),r=t[e];t[e]=t[i],t[i]=r}return t}function Ph(n){let t=0,e=0,i=0,r=1;const s=Ch();return t=s(" "),e=s(" "),i=s(" "),t-=s(n),t<0&&(t+=1),e-=s(n),e<0&&(e+=1),i-=s(n),i<0&&(i+=1),function(){const a=2091639*t+r*23283064365386963e-26;return t=e,e=i,i=a-(r=a|0)}}function Ch(){let n=4022871197;return function(t){t=t.toString();for(let e=0;e<t.length;e++){n+=t.charCodeAt(e);let i=.02519603282416938*n;n=i>>>0,i-=n,i*=n,n=i>>>0,i-=n,n+=i*4294967296}return(n>>>0)*23283064365386963e-26}}class Rr{constructor(t,e,i,r){this.scale=t,this.octaves=e,this.velocityMultiplier=i,this.timeScale=r,this.type="TurbulenceField",this.generator=new Za,this.timeOffset=new W,this.temp=new W,this.temp2=new W,this.timeOffset.x=Math.random()/this.scale.x*this.timeScale.x,this.timeOffset.y=Math.random()/this.scale.y*this.timeScale.y,this.timeOffset.z=Math.random()/this.scale.z*this.timeScale.z}initialize(t){}update(t,e){const i=t.position.x/this.scale.x,r=t.position.y/this.scale.y,s=t.position.z/this.scale.z;this.temp.set(0,0,0);let a=1;for(let c=0;c<this.octaves;c++)this.temp2.set(this.generator.noise4D(i*a,r*a,s*a,this.timeOffset.x*a)/a,this.generator.noise4D(i*a,r*a,s*a,this.timeOffset.y*a)/a,this.generator.noise4D(i*a,r*a,s*a,this.timeOffset.z*a)/a),this.temp.add(this.temp2),a*=2;this.temp.multiply(this.velocityMultiplier),t.velocity.addScaledVector(this.temp,e)}toJSON(){return{type:this.type,scale:[this.scale.x,this.scale.y,this.scale.z],octaves:this.octaves,velocityMultiplier:[this.velocityMultiplier.x,this.velocityMultiplier.y,this.velocityMultiplier.z],timeScale:[this.timeScale.x,this.timeScale.y,this.timeScale.z]}}frameUpdate(t){this.timeOffset.x+=t*this.timeScale.x,this.timeOffset.y+=t*this.timeScale.y,this.timeOffset.z+=t*this.timeScale.z}static fromJSON(t){return new Rr(new W(t.scale[0],t.scale[1],t.scale[2]),t.octaves,new W(t.velocityMultiplier[0],t.velocityMultiplier[1],t.velocityMultiplier[2]),new W(t.timeScale[0],t.timeScale[1],t.timeScale[2]))}clone(){return new Rr(this.scale.clone(),this.octaves,this.velocityMultiplier.clone(),this.timeScale.clone())}reset(){}}const pe=[],Ks=new W,js=new ct;class Fr{constructor(t,e,i=new ot(1),r=new ot(0)){if(this.frequency=t,this.power=e,this.positionAmount=i,this.rotationAmount=r,this.type="Noise",this.duration=0,pe.length===0)for(let s=0;s<100;s++)pe.push(new Za)}initialize(t){t.lastPosNoise=new W,typeof t.rotation=="number"?t.lastRotNoise=0:t.lastRotNoise=new ct,t.generatorIndex=[ds(0,100),ds(0,100),ds(0,100),ds(0,100)],this.positionAmount.startGen(t.memory),this.rotationAmount.startGen(t.memory),this.frequency.startGen(t.memory),this.power.startGen(t.memory)}update(t,e){let i=this.frequency.genValue(t.memory,t.age/t.life),r=this.power.genValue(t.memory,t.age/t.life),s=this.positionAmount.genValue(t.memory,t.age/t.life),a=this.rotationAmount.genValue(t.memory,t.age/t.life);s>0&&t.lastPosNoise!==void 0&&(t.position.sub(t.lastPosNoise),Ks.set(pe[t.generatorIndex[0]].noise2D(0,t.age*i)*r*s,pe[t.generatorIndex[1]].noise2D(0,t.age*i)*r*s,pe[t.generatorIndex[2]].noise2D(0,t.age*i)*r*s),t.position.add(Ks),t.lastPosNoise.copy(Ks)),a>0&&t.lastRotNoise!==void 0&&(typeof t.rotation=="number"?(t.rotation-=t.lastRotNoise,t.rotation+=pe[t.generatorIndex[3]].noise2D(0,t.age*i)*Math.PI*r*a):(t.lastRotNoise.invert(),t.rotation.multiply(t.lastRotNoise),js.set(pe[t.generatorIndex[0]].noise2D(0,t.age*i)*r*a,pe[t.generatorIndex[1]].noise2D(0,t.age*i)*r*a,pe[t.generatorIndex[2]].noise2D(0,t.age*i)*r*a,pe[t.generatorIndex[3]].noise2D(0,t.age*i)*r*a).normalize(),t.rotation.multiply(js),t.lastRotNoise.copy(js)))}toJSON(){return{type:this.type,frequency:this.frequency.toJSON(),power:this.power.toJSON(),positionAmount:this.positionAmount.toJSON(),rotationAmount:this.rotationAmount.toJSON()}}frameUpdate(t){this.duration+=t}static fromJSON(t){return new Fr(rt(t.frequency),rt(t.power),rt(t.positionAmount),rt(t.rotationAmount))}clone(){return new Fr(this.frequency.clone(),this.power.clone(),this.positionAmount.clone(),this.rotationAmount.clone())}reset(){}}class Dr{constructor(t,e){this.color=t,this.speedRange=e,this.type="ColorBySpeed"}initialize(t){this.color.startGen(t.memory)}update(t,e){const i=(t.startSpeed-this.speedRange.a)/(this.speedRange.b-this.speedRange.a);this.color.genColor(t.memory,t.color,i),t.color.x*=t.startColor.x,t.color.y*=t.startColor.y,t.color.z*=t.startColor.z,t.color.w*=t.startColor.w}frameUpdate(t){}toJSON(){return{type:this.type,color:this.color.toJSON(),speedRange:this.speedRange.toJSON()}}static fromJSON(t){return new Dr(Un(t.color),_e.fromJSON(t.speedRange))}clone(){return new Dr(this.color.clone(),this.speedRange.clone())}reset(){}}class Lr{initialize(t){this.size.startGen(t.memory)}constructor(t,e){this.size=t,this.speedRange=e,this.type="SizeBySpeed"}update(t){const e=(t.startSpeed-this.speedRange.a)/(this.speedRange.b-this.speedRange.a);this.size instanceof oi?this.size.genValue(t.memory,t.size,e).multiply(t.startSize):t.size.copy(t.startSize).multiplyScalar(this.size.genValue(t.memory,e))}toJSON(){return{type:this.type,size:this.size.toJSON(),speedRange:this.speedRange.toJSON()}}static fromJSON(t){return new Lr(zs(t.size),_e.fromJSON(t.speedRange))}frameUpdate(t){}clone(){return new Lr(this.size.clone(),this.speedRange.clone())}reset(){}}class kr{constructor(t,e){this.angularVelocity=t,this.speedRange=e,this.type="RotationBySpeed",this.tempQuat=new ct}initialize(t){typeof t.rotation=="number"&&this.angularVelocity.startGen(t.memory)}update(t,e){if(typeof t.rotation=="number"){const i=(t.startSpeed-this.speedRange.a)/(this.speedRange.b-this.speedRange.a);t.rotation+=e*this.angularVelocity.genValue(t.memory,i)}}toJSON(){return{type:this.type,angularVelocity:this.angularVelocity.toJSON(),speedRange:this.speedRange.toJSON()}}static fromJSON(t){return new kr(rt(t.angularVelocity),_e.fromJSON(t.speedRange))}frameUpdate(t){}clone(){return new kr(this.angularVelocity.clone(),this.speedRange.clone())}reset(){}}class Vr{initialize(t){this.speed.startGen(t.memory)}constructor(t,e){this.speed=t,this.dampen=e,this.type="LimitSpeedOverLife"}update(t,e){let i=t.velocity.length(),r=this.speed.genValue(t.memory,t.age/t.life);if(i>r){const s=(i-r)/i;t.velocity.multiplyScalar(1-s*this.dampen*e*20)}}toJSON(){return{type:this.type,speed:this.speed.toJSON(),dampen:this.dampen}}static fromJSON(t){return new Vr(rt(t.speed),t.dampen)}frameUpdate(t){}clone(){return new Vr(this.speed.clone(),this.dampen)}reset(){}}const Es={ApplyForce:{type:"ApplyForce",constructor:Nr,params:[["direction",["vec3"]],["magnitude",["value"]]],loadJSON:Nr.fromJSON},Noise:{type:"Noise",constructor:Fr,params:[["frequency",["value"]],["power",["value"]],["positionAmount",["value"]],["rotationAmount",["value"]]],loadJSON:Fr.fromJSON},TurbulenceField:{type:"TurbulenceField",constructor:Rr,params:[["scale",["vec3"]],["octaves",["number"]],["velocityMultiplier",["vec3"]],["timeScale",["vec3"]]],loadJSON:Rr.fromJSON},GravityForce:{type:"GravityForce",constructor:Ur,params:[["center",["vec3"]],["magnitude",["number"]]],loadJSON:Ur.fromJSON},ColorOverLife:{type:"ColorOverLife",constructor:br,params:[["color",["colorFunc"]]],loadJSON:br.fromJSON},RotationOverLife:{type:"RotationOverLife",constructor:Ar,params:[["angularVelocity",["value","valueFunc"]]],loadJSON:Ar.fromJSON},Rotation3DOverLife:{type:"Rotation3DOverLife",constructor:Tr,params:[["angularVelocity",["rotationFunc"]]],loadJSON:Tr.fromJSON},SizeOverLife:{type:"SizeOverLife",constructor:Ui,params:[["size",["value","valueFunc","vec3Func"]]],loadJSON:Ui.fromJSON},ColorBySpeed:{type:"ColorBySpeed",constructor:Dr,params:[["color",["colorFunc"]],["speedRange",["range"]]],loadJSON:Dr.fromJSON},RotationBySpeed:{type:"RotationBySpeed",constructor:kr,params:[["angularVelocity",["value","valueFunc"]],["speedRange",["range"]]],loadJSON:kr.fromJSON},SizeBySpeed:{type:"SizeBySpeed",constructor:Lr,params:[["size",["value","valueFunc","vec3Func"]],["speedRange",["range"]]],loadJSON:Lr.fromJSON},SpeedOverLife:{type:"SpeedOverLife",constructor:Er,params:[["speed",["value","valueFunc"]]],loadJSON:Er.fromJSON},FrameOverLife:{type:"FrameOverLife",constructor:Pr,params:[["frame",["value","valueFunc"]]],loadJSON:Pr.fromJSON},ForceOverLife:{type:"ForceOverLife",constructor:zr,params:[["x",["value","valueFunc"]],["y",["value","valueFunc"]],["z",["value","valueFunc"]]],loadJSON:zr.fromJSON},OrbitOverLife:{type:"OrbitOverLife",constructor:Cr,params:[["orbitSpeed",["value","valueFunc"]],["axis",["vec3"]]],loadJSON:Cr.fromJSON},WidthOverLength:{type:"WidthOverLength",constructor:Br,params:[["width",["value","valueFunc"]]],loadJSON:Br.fromJSON},ChangeEmitDirection:{type:"ChangeEmitDirection",constructor:Ir,params:[["angle",["value"]]],loadJSON:Ir.fromJSON},EmitSubParticleSystem:{type:"EmitSubParticleSystem",constructor:Or,params:[["particleSystem",["self"]],["useVelocityAsBasis",["boolean"]],["subParticleSystem",["particleSystem"]],["mode",["number"]],["emitProbability",["number"]]],loadJSON:Or.fromJSON},LimitSpeedOverLife:{type:"LimitSpeedOverLife",constructor:Vr,params:[["speed",["value","valueFunc"]],["dampen",["number"]]],loadJSON:Vr.fromJSON}};function Bh(n,t){return Es[n.type]?Es[n.type].loadJSON(n,t):null}const Nh=[];function Uh(n){if(!Nh.find(e=>e.id===n.id)){for(const e of n.emitterShapes)vn[e.type]||(vn[e.type]=e);for(const e of n.behaviors)Es[e.type]||(Es[e.type]=e)}}class Jr{get geometry(){return this._geometry}set geometry(t){if(this._geometry=t,t===void 0||typeof t=="string")return;const e=new ei;this._triangleIndexToArea.length=0;let i=0;if(!t.getIndex())return;const r=t.getIndex().array,s=r.length/3;this._triangleIndexToArea.push(0);for(let a=0;a<s;a++)e.setFromAttributeAndIndices(t.getAttribute("position"),r[a*3],r[a*3+1],r[a*3+2]),i+=e.getArea(),this._triangleIndexToArea.push(i);t.userData.triangleIndexToArea=this._triangleIndexToArea}constructor(t){this.type="mesh_surface",this._triangleIndexToArea=[],this._tempA=new $,this._tempB=new $,this._tempC=new $,t&&(this.geometry=t)}initialize(t){const e=this._geometry;if(!e||e.getIndex()===null){t.position.set(0,0,0),t.velocity.set(0,0,1).multiplyScalar(t.startSpeed);return}const i=this._triangleIndexToArea.length-1;let r=0,s=i;const a=Math.random()*this._triangleIndexToArea[i];for(;r+1<s;){const f=Math.floor((r+s)/2);a<this._triangleIndexToArea[f]?s=f:r=f}let c=Math.random(),o=Math.random();c+o>1&&(c=1-c,o=1-o);const l=e.getIndex().array[r*3],u=e.getIndex().array[r*3+1],d=e.getIndex().array[r*3+2],h=e.getAttribute("position");this._tempA.fromBufferAttribute(h,l),this._tempB.fromBufferAttribute(h,u),this._tempC.fromBufferAttribute(h,d),this._tempB.sub(this._tempA),this._tempC.sub(this._tempA),this._tempA.addScaledVector(this._tempB,c).addScaledVector(this._tempC,o),t.position.copy(this._tempA),this._tempA.copy(this._tempB).cross(this._tempC).normalize(),t.velocity.copy(this._tempA).normalize().multiplyScalar(t.startSpeed)}toJSON(){return{type:"mesh_surface",mesh:this._geometry?this._geometry.uuid:""}}static fromJSON(t,e){return new Jr(e.geometries[t.geometry])}clone(){return new Jr(this._geometry)}update(t,e){}}const Ih={id:"three.quarks",emitterShapes:[{type:"mesh_surface",params:[["geometry",["geometry"]]],constructor:Jr,loadJSON:Jr.fromJSON}],behaviors:[]};var Oh=`
#ifdef SOFT_PARTICLES

    /* #ifdef LOGDEPTH
    float distSample = linearize_depth_log(sampleDepth, near, far);
    #else
    float distSample = ortho ? linearize_depth_ortho(sampleDepth, near, far) : linearize_depth(sampleDepth, near, far);
    #endif */

    vec2 p2 = projPosition.xy / projPosition.w;
    
    p2 = 0.5 * p2 + 0.5;

    float readDepth = texture2D(depthTexture, p2.xy).r;
    float viewDepth = linearize_depth(readDepth);

    float softParticlesFade = saturate(SOFT_INV_FADE_DISTANCE * ((viewDepth - SOFT_NEAR_FADE) - linearDepth));
    
    gl_FragColor *= softParticlesFade;

    //gl_FragColor = vec4(softParticlesFade , 0, 0, 1);
#endif
`,Rh=`
#ifdef SOFT_PARTICLES

    uniform sampler2D depthTexture;
    uniform vec4 projParams;
    uniform vec2 softParams;

    varying vec4 projPosition;
    varying float linearDepth;

    #define SOFT_NEAR_FADE softParams.x
    #define SOFT_INV_FADE_DISTANCE softParams.y

    #define zNear projParams.x
    #define zFar projParams.y

    float linearize_depth(float d)
    {
        return (zFar * zNear) / (zFar - d * (zFar - zNear));
    }

#endif
`,Fh=`
#ifdef SOFT_PARTICLES
    varying vec4 projPosition;
    varying float linearDepth;
#endif
`,Dh=`
#ifdef SOFT_PARTICLES
    projPosition = gl_Position;
    linearDepth = -mvPosition.z;
#endif
`,Lh=`
#ifdef USE_MAP
    vec4 texelColor = texture2D( map, vUv);
    #ifdef TILE_BLEND
        texelColor = mix( texelColor, texture2D( map, vUvNext ), vUvBlend );
    #endif
    diffuseColor *= texelColor;
#endif
`,kh=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	varying vec2 vUv;
#ifdef TILE_BLEND
    varying vec2 vUvNext;
    varying float vUvBlend;
#endif

#endif
#ifdef USE_MAP

	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#ifdef TILE_BLEND
    varying vec2 vMapUvNext;
#endif

#endif
#ifdef USE_ALPHAMAP

	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;

#endif
#ifdef USE_DISPLACEMENTMAP

	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;

#endif
#ifdef USE_EMISSIVEMAP

	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_ANISOTROPYMAP

	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;

#endif
#ifdef USE_CLEARCOATMAP

	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SPECULARMAP

	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;

#endif
`,Vh=`
#ifdef UV_TILE
    attribute float uvTile;
    uniform vec2 tileCount;
    
    mat3 makeTileTransform(float uvTile) {
        float col = mod(uvTile, tileCount.x);
        float row = (tileCount.y - floor(uvTile / tileCount.x) - 1.0);
        
        return mat3(
          1.0 / tileCount.x, 0.0, 0.0,
          0.0, 1.0 / tileCount.y, 0.0, 
          col / tileCount.x, row / tileCount.y, 1.0);
    }
#else
    mat3 makeTileTransform(float uvTile) {
        return mat3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0);
    }
#endif

#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	varying vec2 vUv;
#ifdef TILE_BLEND
    varying vec2 vUvNext;
    varying float vUvBlend;
#endif

#endif
#ifdef USE_MAP

	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#ifdef TILE_BLEND
    varying vec2 vMapUvNext;
#endif

#endif
#ifdef USE_ALPHAMAP

	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;

#endif
#ifdef USE_DISPLACEMENTMAP

	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;

#endif
#ifdef USE_EMISSIVEMAP

	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_ANISOTROPYMAP

	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;

#endif
#ifdef USE_CLEARCOATMAP

	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SPECULARMAP

	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;

#endif
`,Jh=`
#ifdef UV_TILE
    mat3 tileTransform = makeTileTransform(floor(uvTile));
    #ifdef TILE_BLEND
        mat3 nextTileTransform = makeTileTransform(ceil(uvTile));
        vUvBlend = fract(uvTile);
    #endif
#else
    mat3 tileTransform = makeTileTransform(0.0);
#endif

#if defined( USE_UV ) || defined( USE_ANISOTROPY )

vUv = (tileTransform *vec3( uv, 1 )).xy;
#if defined( TILE_BLEND ) && defined( UV_TILE )
    vUvNext = (nextTileTransform *vec3( uv, 1 )).xy;
#endif

#endif
#ifdef USE_MAP

vMapUv = ( tileTransform * (mapTransform * vec3( MAP_UV, 1 ) )).xy;
#if defined( TILE_BLEND ) && defined( UV_TILE )
    vMapUvNext = (nextTileTransform * (mapTransform * vec3( MAP_UV, 1 ))).xy;
#endif

#endif
#ifdef USE_ALPHAMAP

vAlphaMapUv = ( tileTransform * (alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) )).xy;
    
#endif
#ifdef USE_LIGHTMAP

vLightMapUv = ( tileTransform * (lightMapTransform * vec3( LIGHTMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_AOMAP

vAoMapUv = ( tileTransform * (aoMapTransform * vec3( AOMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_BUMPMAP

vBumpMapUv = ( tileTransform * (bumpMapTransform * vec3( BUMPMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_NORMALMAP

vNormalMapUv = ( tileTransform * (normalMapTransform * vec3( NORMALMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_DISPLACEMENTMAP

vDisplacementMapUv = ( tileTransform * (displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_EMISSIVEMAP

vEmissiveMapUv = ( tileTransform * (emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_METALNESSMAP

vMetalnessMapUv = ( tileTransform * (metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_ROUGHNESSMAP

vRoughnessMapUv = ( tileTransform * (roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_ANISOTROPYMAP

vAnisotropyMapUv = ( tileTransform * (anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_CLEARCOATMAP

vClearcoatMapUv = ( tileTransform * (clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

vClearcoatNormalMapUv = ( tileTransform * (clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

vClearcoatRoughnessMapUv = ( tileTransform * (clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_IRIDESCENCEMAP

vIridescenceMapUv = ( tileTransform * (iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

vIridescenceThicknessMapUv = ( tileTransform * (iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_SHEEN_COLORMAP

vSheenColorMapUv = ( tileTransform * (sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

vSheenRoughnessMapUv = ( tileTransform * (sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_SPECULARMAP

vSpecularMapUv = ( tileTransform * (specularMapTransform * vec3( SPECULARMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_SPECULAR_COLORMAP

vSpecularColorMapUv = ( tileTransform * (specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

vSpecularIntensityMapUv = ( tileTransform * (specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_TRANSMISSIONMAP

vTransmissionMapUv = ( tileTransform * transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_THICKNESSMAP

vThicknessMapUv = ( tileTransform * thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) )).xy;

#endif

`;const Oe=Jo;function Gh(){Oe.tile_pars_vertex=Vh,Oe.tile_vertex=Jh,Oe.tile_pars_fragment=kh,Oe.tile_fragment=Lh,Oe.soft_pars_vertex=Fh,Oe.soft_vertex=Dh,Oe.soft_pars_fragment=Rh,Oe.soft_fragment=Oh}class Hh extends ga{constructor(t){super(),this.type="ParticleEmitter",this.system=t}clone(){const t=this.system.clone();return t.emitter.copy(this,!0),t.emitter}dispose(){}extractFromCache(t){const e=[];for(const i in t){const r=t[i];delete r.metadata,e.push(r)}return e}toJSON(t,e={}){const i=this.children;this.children=this.children.filter(s=>s.type!=="ParticleSystemPreview");const r=super.toJSON(t);return this.children=i,this.system!==null&&(r.object.ps=this.system.toJSON(t,e)),r}}var q;(function(n){n[n.BillBoard=0]="BillBoard",n[n.StretchedBillBoard=1]="StretchedBillBoard",n[n.Mesh=2]="Mesh",n[n.Trail=3]="Trail",n[n.HorizontalBillBoard=4]="HorizontalBillBoard",n[n.VerticalBillBoard=5]="VerticalBillBoard"})(q||(q={}));class qa extends Bs{constructor(t){super(),this.type="VFXBatch",this.maxParticles=1e3,this.systems=new Set;const e=new ys;e.mask=t.layers.mask;const i=t.material.clone();i.defines={},Object.assign(i.defines,t.material.defines),this.settings={instancingGeometry:t.instancingGeometry,renderMode:t.renderMode,renderOrder:t.renderOrder,material:i,uTileCount:t.uTileCount,vTileCount:t.vTileCount,blendTiles:t.blendTiles,softParticles:t.softParticles,softNearFade:t.softNearFade,softFarFade:t.softFarFade,layers:e},this.frustumCulled=!1,this.renderOrder=this.settings.renderOrder}addSystem(t){this.systems.add(t)}removeSystem(t){this.systems.delete(t)}applyDepthTexture(t){const e=this.material.uniforms.depthTexture;e&&e.value!==t&&(e.value=t,this.material.needsUpdate=!0)}getVisibleSystems(){return Array.from(this.systems).filter(t=>t.emitter.visible)}}const Xh=new W(0,0,1),tn=new ct,Zh=new W,qh=new W;new W;const aa=60,fs=new wn(1,1,1,1);class Ps{set time(t){this.emissionState.time=t}get time(){return this.emissionState.time}get layers(){return this.rendererSettings.layers}get texture(){return this.rendererSettings.material.map}set texture(t){this.rendererSettings.material.map=t,this.neededToUpdateRender=!0}get material(){return this.rendererSettings.material}set material(t){this.rendererSettings.material=t,this.neededToUpdateRender=!0}get uTileCount(){return this.rendererSettings.uTileCount}set uTileCount(t){this.rendererSettings.uTileCount=t,this.neededToUpdateRender=!0}get vTileCount(){return this.rendererSettings.vTileCount}set vTileCount(t){this.rendererSettings.vTileCount=t,this.neededToUpdateRender=!0}get blendTiles(){return this.rendererSettings.blendTiles}set blendTiles(t){this.rendererSettings.blendTiles=t,this.neededToUpdateRender=!0}get softParticles(){return this.rendererSettings.softParticles}set softParticles(t){this.rendererSettings.softParticles=t,this.neededToUpdateRender=!0}get softNearFade(){return this.rendererSettings.softNearFade}set softNearFade(t){this.rendererSettings.softNearFade=t,this.neededToUpdateRender=!0}get softFarFade(){return this.rendererSettings.softFarFade}set softFarFade(t){this.rendererSettings.softFarFade=t,this.neededToUpdateRender=!0}get instancingGeometry(){return this.rendererSettings.instancingGeometry}set instancingGeometry(t){this.restart(),this.particles.length=0,this.rendererSettings.instancingGeometry=t,this.neededToUpdateRender=!0}get renderMode(){return this.rendererSettings.renderMode}set renderMode(t){if(this.rendererSettings.renderMode!==t){let e=!1;switch(this.rendererSettings.renderMode===q.Trail&&(e=!0),this.rendererSettings.renderMode===q.Mesh&&(this.startRotation=new ot(0)),t){case q.Trail:this.rendererEmitterSettings={startLength:new ot(30),followLocalOrigin:!1},e=!0;break;case q.Mesh:this.rendererEmitterSettings={geometry:fs},this.startRotation=new yr(new W(0,1,0),new ot(0));break;case q.StretchedBillBoard:this.rendererEmitterSettings={speedFactor:0,lengthFactor:2},this.rendererSettings.instancingGeometry=fs;break;case q.BillBoard:case q.VerticalBillBoard:case q.HorizontalBillBoard:this.rendererEmitterSettings={},this.rendererSettings.instancingGeometry=fs;break}this.rendererSettings.renderMode=t,e&&(this.restart(),this.particles.length=0),this.neededToUpdateRender=!0}}get renderOrder(){return this.rendererSettings.renderOrder}set renderOrder(t){this.rendererSettings.renderOrder=t,this.neededToUpdateRender=!0}get blending(){return this.rendererSettings.material.blending}set blending(t){this.rendererSettings.material.blending=t,this.neededToUpdateRender=!0}constructor(t){if(this.temp=new W,this.travelDistance=0,this.normalMatrix=new ve,this.memory=[],this.listeners={},this.firstTimeUpdate=!0,this.autoDestroy=t.autoDestroy===void 0?!1:t.autoDestroy,this.duration=t.duration??1,this.looping=t.looping===void 0?!0:t.looping,this.prewarm=t.prewarm===void 0?!1:t.prewarm,this.startLife=t.startLife??new ot(5),this.startSpeed=t.startSpeed??new ot(0),this.startRotation=t.startRotation??new ot(0),this.startSize=t.startSize??new ot(1),this.startColor=t.startColor??new ai(new Qt(1,1,1,1)),this.emissionOverTime=t.emissionOverTime??new ot(10),this.emissionOverDistance=t.emissionOverDistance??new ot(0),this.emissionBursts=t.emissionBursts??[],this.onlyUsedByOther=t.onlyUsedByOther??!1,this.emitterShape=t.shape??new ci,this.behaviors=t.behaviors??new Array,this.worldSpace=t.worldSpace??!1,this.rendererEmitterSettings=t.rendererEmitterSettings??{},t.renderMode===q.StretchedBillBoard){const e=this.rendererEmitterSettings;t.speedFactor!==void 0&&(e.speedFactor=t.speedFactor),e.speedFactor=e.speedFactor??0,e.lengthFactor=e.lengthFactor??0}this.rendererSettings={instancingGeometry:t.instancingGeometry??fs,renderMode:t.renderMode??q.BillBoard,renderOrder:t.renderOrder??0,material:t.material,uTileCount:t.uTileCount??1,vTileCount:t.vTileCount??1,blendTiles:t.blendTiles??!1,softParticles:t.softParticles??!1,softNearFade:t.softNearFade??0,softFarFade:t.softFarFade??0,layers:t.layers??new ys},this.neededToUpdateRender=!0,this.particles=new Array,this.startTileIndex=t.startTileIndex||new ot(0),this.emitter=new Hh(this),this.paused=!1,this.particleNum=0,this.emissionState={isBursting:!1,burstParticleIndex:0,burstParticleCount:0,burstIndex:0,burstWaveIndex:0,time:0,waitEmiting:0,travelDistance:0},this.emissionBursts.forEach(e=>e.count.startGen(this.memory)),this.emissionOverDistance.startGen(this.memory),this.emitEnded=!1,this.markForDestroy=!1,this.prewarmed=!1}pause(){this.paused=!0}play(){this.paused=!1}stop(){this.restart(),this.pause()}spawn(t,e,i){tn.setFromRotationMatrix(i);const r=Zh,s=tn,a=qh;i.decompose(r,s,a);for(let c=0;c<t;c++){for(e.burstParticleIndex=c,this.particleNum++;this.particles.length<this.particleNum;)this.rendererSettings.renderMode===q.Trail?this.particles.push(new xn):this.particles.push(new Sh);const o=this.particles[this.particleNum-1];if(o.reset(),o.speedModifier=1,this.startColor.startGen(o.memory),this.startColor.genColor(o.memory,o.startColor,this.emissionState.time),o.color.copy(o.startColor),this.startSpeed.startGen(o.memory),o.startSpeed=this.startSpeed.genValue(o.memory,e.time/this.duration),this.startLife.startGen(o.memory),o.life=this.startLife.genValue(o.memory,e.time/this.duration),o.age=0,this.startSize.startGen(o.memory),this.startSize.type==="vec3function")this.startSize.genValue(o.memory,o.startSize,e.time/this.duration);else{const l=this.startSize.genValue(o.memory,e.time/this.duration);o.startSize.set(l,l,l)}if(this.startTileIndex.startGen(o.memory),o.uvTile=this.startTileIndex.genValue(o.memory),o.size.copy(o.startSize),this.rendererSettings.renderMode===q.Mesh||this.rendererSettings.renderMode===q.BillBoard||this.rendererSettings.renderMode===q.VerticalBillBoard||this.rendererSettings.renderMode===q.HorizontalBillBoard||this.rendererSettings.renderMode===q.StretchedBillBoard){const l=o;this.startRotation.startGen(o.memory),this.rendererSettings.renderMode===q.Mesh?(l.rotation instanceof ct||(l.rotation=new ct),this.startRotation.type==="rotation"?this.startRotation.genValue(o.memory,l.rotation,1,e.time/this.duration):l.rotation.setFromAxisAngle(Xh,this.startRotation.genValue(l.memory,e.time/this.duration))):this.startRotation.type==="rotation"?l.rotation=0:l.rotation=this.startRotation.genValue(l.memory,e.time/this.duration)}else if(this.rendererSettings.renderMode===q.Trail){const l=o;this.rendererEmitterSettings.startLength.startGen(l.memory),l.length=this.rendererEmitterSettings.startLength.genValue(l.memory,e.time/this.duration)}if(this.emitterShape.initialize(o,e),this.rendererSettings.renderMode===q.Trail&&this.rendererEmitterSettings.followLocalOrigin){const l=o;l.localPosition=new W().copy(l.position)}this.worldSpace?(o.position.applyMatrix4(i),o.startSize.multiply(a).abs(),o.size.copy(o.startSize),o.velocity.multiply(a).applyMatrix3(this.normalMatrix),o.rotation&&o.rotation instanceof ct&&o.rotation.multiplyQuaternions(tn,o.rotation)):this.onlyUsedByOther&&(o.parentMatrix=i);for(let l=0;l<this.behaviors.length;l++)this.behaviors[l].initialize(o,this)}}endEmit(){this.emitEnded=!0,this.autoDestroy&&(this.markForDestroy=!0),this.fire({type:"emitEnd",particleSystem:this})}dispose(){this._renderer&&this._renderer.deleteSystem(this),this.emitter.dispose(),this.emitter.parent&&this.emitter.parent.remove(this.emitter),this.fire({type:"destroy",particleSystem:this})}restart(){this.memory.length=0,this.paused=!1,this.particleNum=0,this.emissionState.isBursting=!1,this.emissionState.burstIndex=0,this.emissionState.burstWaveIndex=0,this.emissionState.time=0,this.emissionState.waitEmiting=0,this.behaviors.forEach(t=>{t.reset()}),this.emitEnded=!1,this.markForDestroy=!1,this.prewarmed=!1,this.emissionBursts.forEach(t=>t.count.startGen(this.memory)),this.emissionOverDistance.startGen(this.memory)}update(t){if(this.paused)return;let e=this.emitter;for(;e.parent;)e=e.parent;if(e.type!=="Scene"){this.dispose();return}if(this.firstTimeUpdate&&(this.firstTimeUpdate=!1,this.emitter.updateWorldMatrix(!0,!1)),this.emitEnded&&this.particleNum===0){this.markForDestroy&&this.emitter.parent&&this.dispose();return}if(this.looping&&this.prewarm&&!this.prewarmed){this.prewarmed=!0;for(let i=0;i<this.duration*aa;i++)this.update(1/aa)}t>.1&&(t=.1),this.neededToUpdateRender&&(this._renderer&&this._renderer.updateSystem(this),this.neededToUpdateRender=!1),this.onlyUsedByOther||this.emit(t,this.emissionState,this.emitter.matrixWorld),this.emitterShape.update(this,t);for(let i=0;i<this.behaviors.length;i++){this.behaviors[i].frameUpdate(t);for(let r=0;r<this.particleNum;r++)this.particles[r].died||this.behaviors[i].update(this.particles[r],t)}for(let i=0;i<this.particleNum;i++)this.rendererEmitterSettings.followLocalOrigin&&this.particles[i].localPosition?(this.particles[i].position.copy(this.particles[i].localPosition),this.particles[i].parentMatrix?this.particles[i].position.applyMatrix4(this.particles[i].parentMatrix):this.particles[i].position.applyMatrix4(this.emitter.matrixWorld)):this.particles[i].position.addScaledVector(this.particles[i].velocity,t*this.particles[i].speedModifier),this.particles[i].age+=t;if(this.rendererSettings.renderMode===q.Trail)for(let i=0;i<this.particleNum;i++)this.particles[i].update();for(let i=0;i<this.particleNum;i++){const r=this.particles[i];r.died&&(!(r instanceof xn)||r.previous.length===0)&&(this.particles[i]=this.particles[this.particleNum-1],this.particles[this.particleNum-1]=r,this.particleNum--,i--,this.fire({type:"particleDied",particleSystem:this,particle:r}))}}emit(t,e,i){e.time>this.duration&&(this.looping?(e.time-=this.duration,e.burstIndex=0,this.behaviors.forEach(s=>{s.reset()})):!this.emitEnded&&!this.onlyUsedByOther&&this.endEmit()),this.normalMatrix.getNormalMatrix(i);const r=Math.ceil(e.waitEmiting);for(this.spawn(r,e,i),e.waitEmiting-=r;e.burstIndex<this.emissionBursts.length&&this.emissionBursts[e.burstIndex].time<=e.time;){if(Math.random()<this.emissionBursts[e.burstIndex].probability){const s=this.emissionBursts[e.burstIndex].count.genValue(this.memory,this.time);e.isBursting=!0,e.burstParticleCount=s,this.spawn(s,e,i),e.isBursting=!1}e.burstIndex++}if(!this.emitEnded&&(e.waitEmiting+=t*this.emissionOverTime.genValue(this.memory,e.time/this.duration),e.previousWorldPos!=null)){this.temp.set(i.elements[12],i.elements[13],i.elements[14]),e.travelDistance+=e.previousWorldPos.distanceTo(this.temp);const s=this.emissionOverDistance.genValue(this.memory,e.time/this.duration);if(e.travelDistance*s>0){const a=Math.floor(e.travelDistance*s);e.travelDistance-=a/s,e.waitEmiting+=a}}e.previousWorldPos===void 0&&(e.previousWorldPos=new W),e.previousWorldPos.set(i.elements[12],i.elements[13],i.elements[14]),e.time+=t}toJSON(t,e={}){var a;if((t===void 0||typeof t=="string")&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}}),t.materials[this.rendererSettings.material.uuid]=this.rendererSettings.material.toJSON(t),e.useUrlForImage&&((a=this.texture)==null?void 0:a.source)!==void 0){const c=this.texture.source;t.images[c.uuid]={uuid:c.uuid,url:this.texture.image.url}}let r;this.renderMode===q.Trail?r={startLength:this.rendererEmitterSettings.startLength.toJSON(),followLocalOrigin:this.rendererEmitterSettings.followLocalOrigin}:this.renderMode===q.Mesh?r={}:this.renderMode===q.StretchedBillBoard?r={speedFactor:this.rendererEmitterSettings.speedFactor,lengthFactor:this.rendererEmitterSettings.lengthFactor}:r={};const s=this.rendererSettings.instancingGeometry;return t.geometries&&!t.geometries[s.uuid]&&(t.geometries[s.uuid]=s.toJSON()),{version:"3.0",autoDestroy:this.autoDestroy,looping:this.looping,prewarm:this.prewarm,duration:this.duration,shape:this.emitterShape.toJSON(),startLife:this.startLife.toJSON(),startSpeed:this.startSpeed.toJSON(),startRotation:this.startRotation.toJSON(),startSize:this.startSize.toJSON(),startColor:this.startColor.toJSON(),emissionOverTime:this.emissionOverTime.toJSON(),emissionOverDistance:this.emissionOverDistance.toJSON(),emissionBursts:this.emissionBursts.map(c=>({time:c.time,count:c.count.toJSON(),probability:c.probability,interval:c.interval,cycle:c.cycle})),onlyUsedByOther:this.onlyUsedByOther,instancingGeometry:this.rendererSettings.instancingGeometry.uuid,renderOrder:this.renderOrder,renderMode:this.renderMode,rendererEmitterSettings:r,material:this.rendererSettings.material.uuid,layers:this.layers.mask,startTileIndex:this.startTileIndex.toJSON(),uTileCount:this.uTileCount,vTileCount:this.vTileCount,blendTiles:this.blendTiles,softParticles:this.rendererSettings.softParticles,softFarFade:this.rendererSettings.softFarFade,softNearFade:this.rendererSettings.softNearFade,behaviors:this.behaviors.map(c=>c.toJSON()),worldSpace:this.worldSpace}}static fromJSON(t,e,i){var o;const r=wh(t.shape,e);let s;if(t.renderMode===q.Trail){const l=t.rendererEmitterSettings;s={startLength:l.startLength!=null?rt(l.startLength):new ot(30),followLocalOrigin:l.followLocalOrigin}}else t.renderMode===q.Mesh?s={}:t.renderMode===q.StretchedBillBoard?(s=t.rendererEmitterSettings,t.speedFactor!=null&&(s.speedFactor=t.speedFactor)):s={};const a=new ys;t.layers&&(a.mask=t.layers);const c=new Ps({autoDestroy:t.autoDestroy,looping:t.looping,prewarm:t.prewarm,duration:t.duration,shape:r,startLife:rt(t.startLife),startSpeed:rt(t.startSpeed),startRotation:zs(t.startRotation),startSize:zs(t.startSize),startColor:Un(t.startColor),emissionOverTime:rt(t.emissionOverTime),emissionOverDistance:rt(t.emissionOverDistance),emissionBursts:(o=t.emissionBursts)==null?void 0:o.map(l=>({time:l.time,count:typeof l.count=="number"?new ot(l.count):rt(l.count),probability:l.probability??1,interval:l.interval??.1,cycle:l.cycle??1})),onlyUsedByOther:t.onlyUsedByOther,instancingGeometry:e.geometries[t.instancingGeometry],renderMode:t.renderMode,rendererEmitterSettings:s,renderOrder:t.renderOrder,layers:a,material:t.material?e.materials[t.material]:t.texture?new ws({map:e.textures[t.texture],transparent:t.transparent??!0,blending:t.blending,side:si}):new ws({color:16777215,transparent:!0,blending:Ge,side:si}),startTileIndex:typeof t.startTileIndex=="number"?new ot(t.startTileIndex):rt(t.startTileIndex),uTileCount:t.uTileCount,vTileCount:t.vTileCount,blendTiles:t.blendTiles,softParticles:t.softParticles,softFarFade:t.softFarFade,softNearFade:t.softNearFade,behaviors:[],worldSpace:t.worldSpace});return c.behaviors=t.behaviors.map(l=>{const u=Bh(l,c);return u&&u.type==="EmitSubParticleSystem"&&(i[l.subParticleSystem]=u),u}).filter(l=>l!==null),c}addBehavior(t){this.behaviors.push(t)}getRendererSettings(){return this.rendererSettings}addEventListener(t,e){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(e)}removeAllEventListeners(t){this.listeners[t]&&(this.listeners[t]=[])}removeEventListener(t,e){if(this.listeners[t]){const i=this.listeners[t].indexOf(e);i!==-1&&this.listeners[t].splice(i,1)}}fire(t){this.listeners[t.type]&&this.listeners[t.type].forEach(e=>e(t))}clone(){const t=[];for(const s of this.emissionBursts){const a={};Object.assign(a,s),t.push(a)}const e=[];for(const s of this.behaviors)e.push(s.clone());let i;this.renderMode===q.Trail?i={startLength:this.rendererEmitterSettings.startLength.clone(),followLocalOrigin:this.rendererEmitterSettings.followLocalOrigin}:this.renderMode===q.StretchedBillBoard?i={lengthFactor:this.rendererEmitterSettings.lengthFactor,speedFactor:this.rendererEmitterSettings.speedFactor}:i={};const r=new ys;return r.mask=this.layers.mask,new Ps({autoDestroy:this.autoDestroy,looping:this.looping,duration:this.duration,shape:this.emitterShape.clone(),startLife:this.startLife.clone(),startSpeed:this.startSpeed.clone(),startRotation:this.startRotation.clone(),startSize:this.startSize.clone(),startColor:this.startColor.clone(),emissionOverTime:this.emissionOverTime.clone(),emissionOverDistance:this.emissionOverDistance.clone(),emissionBursts:t,onlyUsedByOther:this.onlyUsedByOther,instancingGeometry:this.rendererSettings.instancingGeometry,renderMode:this.renderMode,renderOrder:this.renderOrder,rendererEmitterSettings:i,material:this.rendererSettings.material,startTileIndex:this.startTileIndex,uTileCount:this.uTileCount,vTileCount:this.vTileCount,blendTiles:this.blendTiles,softParticles:this.softParticles,softFarFade:this.softFarFade,softNearFade:this.softNearFade,behaviors:e,worldSpace:this.worldSpace,layers:r})}}var en=`

#include <common>
#include <color_pars_fragment>
#include <map_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
#include <alphatest_pars_fragment>

#include <tile_pars_fragment>
#include <soft_pars_fragment>

void main() {

    #include <clipping_planes_fragment>
    
    vec3 outgoingLight = vec3( 0.0 );
    vec4 diffuseColor = vColor;
    
    #include <logdepthbuf_fragment>
    
    #include <tile_fragment>
    #include <alphatest_fragment>

    outgoingLight = diffuseColor.rgb;
    
    #ifdef USE_COLOR_AS_ALPHA
    gl_FragColor = vec4( outgoingLight, diffuseColor.r );
    #else
    gl_FragColor = vec4( outgoingLight, diffuseColor.a );
    #endif
    
    #include <soft_fragment>
    #include <tonemapping_fragment>
}
`,In=`
#define STANDARD

#ifdef PHYSICAL
#define IOR
#define USE_SPECULAR
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifdef IOR
uniform float ior;
#endif

#ifdef USE_SPECULAR
uniform float specularIntensity;
uniform vec3 specularColor;

#ifdef USE_SPECULAR_COLORMAP
uniform sampler2D specularColorMap;
#endif

#ifdef USE_SPECULAR_INTENSITYMAP
uniform sampler2D specularIntensityMap;
#endif
#endif

#ifdef USE_CLEARCOAT
uniform float clearcoat;
uniform float clearcoatRoughness;
#endif

#ifdef USE_DISPERSION
uniform float dispersion;
#endif

#ifdef USE_IRIDESCENCE
uniform float iridescence;
uniform float iridescenceIOR;
uniform float iridescenceThicknessMinimum;
uniform float iridescenceThicknessMaximum;
#endif

#ifdef USE_SHEEN
uniform vec3 sheenColor;
uniform float sheenRoughness;

#ifdef USE_SHEEN_COLORMAP
uniform sampler2D sheenColorMap;
#endif

#ifdef USE_SHEEN_ROUGHNESSMAP
uniform sampler2D sheenRoughnessMap;
#endif
#endif

#ifdef USE_ANISOTROPY
uniform vec2 anisotropyVector;

#ifdef USE_ANISOTROPYMAP
uniform sampler2D anisotropyMap;
#endif
#endif

varying vec3 vViewPosition;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

vec4 diffuseColor = vec4( diffuse, opacity );
#include <clipping_planes_fragment>

ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
vec3 totalEmissiveRadiance = emissive;

#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <roughnessmap_fragment>
#include <metalnessmap_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <clearcoat_normal_fragment_begin>
#include <clearcoat_normal_fragment_maps>
#include <emissivemap_fragment>

// accumulation
#include <lights_physical_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>

// modulation
#include <aomap_fragment>

vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;

#include <transmission_fragment>

vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;

#ifdef USE_SHEEN

// Sheen energy compensation approximation calculation can be found at the end of
// https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );

outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;

#endif

#ifdef USE_CLEARCOAT

float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );

vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );

outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;

#endif

#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`,Yh=`
#include <common>
#include <color_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#include <tile_pars_vertex>
#include <soft_pars_vertex>

attribute vec3 offset;
attribute float rotation;
attribute vec3 size;

void main() {
	
    vec2 alignedPosition = position.xy * size.xy;
    
    vec2 rotatedPosition;
    rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
    rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
#ifdef HORIZONTAL
    vec4 mvPosition = modelMatrix * vec4( offset, 1.0 );
    mvPosition.x += rotatedPosition.x;
    mvPosition.z -= rotatedPosition.y;
    mvPosition = viewMatrix * mvPosition;
#elif defined(VERTICAL)
    vec4 mvPosition = modelMatrix * vec4( offset, 1.0 );
    mvPosition.y += rotatedPosition.y;
    mvPosition = viewMatrix * mvPosition;
    mvPosition.x += rotatedPosition.x;
#else
    vec4 mvPosition = modelViewMatrix * vec4( offset, 1.0 );
    mvPosition.xy += rotatedPosition;
#endif

	vColor = color;

	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>

	#include <clipping_planes_vertex>

	#include <tile_vertex>
	#include <soft_vertex>
}
`,Wh=`
#include <common>
#include <color_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#include <tile_pars_vertex>
#include <soft_pars_vertex>

attribute vec3 offset;
attribute vec4 rotation;
attribute vec3 size;
// attribute vec4 color;

void main() {

    float x2 = rotation.x + rotation.x, y2 = rotation.y + rotation.y, z2 = rotation.z + rotation.z;
    float xx = rotation.x * x2, xy = rotation.x * y2, xz = rotation.x * z2;
    float yy = rotation.y * y2, yz = rotation.y * z2, zz = rotation.z * z2;
    float wx = rotation.w * x2, wy = rotation.w * y2, wz = rotation.w * z2;
    float sx = size.x, sy = size.y, sz = size.z;
    
    mat4 matrix = mat4(( 1.0 - ( yy + zz ) ) * sx, ( xy + wz ) * sx, ( xz - wy ) * sx, 0.0,  // 1. column
                      ( xy - wz ) * sy, ( 1.0 - ( xx + zz ) ) * sy, ( yz + wx ) * sy, 0.0,  // 2. column
                      ( xz + wy ) * sz, ( yz - wx ) * sz, ( 1.0 - ( xx + yy ) ) * sz, 0.0,  // 3. column
                      offset.x, offset.y, offset.z, 1.0);
    
    vec4 mvPosition = modelViewMatrix * (matrix * vec4( position, 1.0 ));

	vColor = color;

	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
    #include <tile_vertex>
    #include <soft_vertex>
}
`,On=`
#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>

attribute vec3 offset;
attribute vec4 rotation;
attribute vec3 size;
#include <tile_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

    #include <tile_vertex>
    float x2 = rotation.x + rotation.x, y2 = rotation.y + rotation.y, z2 = rotation.z + rotation.z;
    float xx = rotation.x * x2, xy = rotation.x * y2, xz = rotation.x * z2;
    float yy = rotation.y * y2, yz = rotation.y * z2, zz = rotation.z * z2;
    float wx = rotation.w * x2, wy = rotation.w * y2, wz = rotation.w * z2;
    float sx = size.x, sy = size.y, sz = size.z;

    mat4 particleMatrix = mat4(( 1.0 - ( yy + zz ) ) * sx, ( xy + wz ) * sx, ( xz - wy ) * sx, 0.0,  // 1. column
                      ( xy - wz ) * sy, ( 1.0 - ( xx + zz ) ) * sy, ( yz + wx ) * sy, 0.0,  // 2. column
                      ( xz + wy ) * sz, ( yz - wx ) * sz, ( 1.0 - ( xx + yy ) ) * sz, 0.0,  // 3. column
                      offset.x, offset.y, offset.z, 1.0);

#include <color_vertex>
#include <morphinstance_vertex>
#include <morphcolor_vertex>
#include <batching_vertex>

#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>

	// replace defaultnormal_vertex
	vec3 transformedNormal = objectNormal;
    mat3 m = mat3( particleMatrix );
    transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
    transformedNormal = m * transformedNormal;
    transformedNormal = normalMatrix * transformedNormal;
    #ifdef FLIP_SIDED
        transformedNormal = - transformedNormal;
    #endif
    #ifdef USE_TANGENT
        vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
        #ifdef FLIP_SIDED
        transformedTangent = - transformedTangent;
        #endif
    #endif

	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>

	// replace include <project_vertex>
  vec4 mvPosition = vec4( transformed, 1.0 );
  mvPosition = modelViewMatrix * (particleMatrix * mvPosition);
	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	
	vViewPosition = - mvPosition.xyz;
	
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
    vWorldPosition = worldPosition.xyz;
#endif
}
`,$h=`
#include <common>
#include <color_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#include <tile_pars_vertex>
#include <soft_pars_vertex>

attribute vec3 offset;
attribute float rotation;
attribute vec3 size;
attribute vec4 velocity;

uniform float speedFactor;

void main() {
    float lengthFactor = velocity.w;
    float avgSize = (size.x + size.y) * 0.5;
#ifdef USE_SKEW
    vec4 mvPosition = modelViewMatrix * vec4( offset, 1.0 );
    vec3 viewVelocity = normalMatrix * velocity.xyz;

    vec3 scaledPos = vec3(position.xy * size.xy, position.z);
    float vlength = length(viewVelocity);
    vec3 projVelocity =  dot(scaledPos, viewVelocity) * viewVelocity / vlength;
    mvPosition.xyz += scaledPos + projVelocity * (speedFactor / avgSize + lengthFactor / vlength);
#else
    vec4 mvPosition = modelViewMatrix * vec4( offset, 1.0 );
    vec3 viewVelocity = normalMatrix * velocity.xyz;
    float vlength = length(viewVelocity); 
    mvPosition.xyz += position.y * normalize(cross(mvPosition.xyz, viewVelocity)) * avgSize; // switch the cross to  match unity implementation
    mvPosition.xyz -= (position.x + 0.5) * viewVelocity * (1.0 + lengthFactor / vlength) * avgSize; // minus position.x to match unity implementation
#endif
	vColor = color;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <tile_vertex>
	#include <soft_vertex>
}
`;function _n(n){return n===0?"uv":`uv${n}`}class Qh extends ko{constructor(t){super(t)}onBeforeCompile(t,e){super.onBeforeCompile(t,e),t.vertexShader=On,t.fragmentShader=In}}class Kh extends Vo{constructor(t){super(t)}onBeforeCompile(t,e){super.onBeforeCompile(t,e),t.vertexShader=On,t.fragmentShader=In}}class jh extends qa{constructor(t){super(t),this.vector_=new W,this.vector2_=new W,this.vector3_=new W,this.quaternion_=new ct,this.quaternion2_=new ct,this.quaternion3_=new ct,this.rotationMat_=new ve,this.rotationMat2_=new ve,this.maxParticles=1e3,this.setupBuffers(),this.rebuildMaterial()}buildExpandableBuffers(){this.offsetBuffer=new Qe(new Float32Array(this.maxParticles*3),3),this.offsetBuffer.setUsage(kt),this.geometry.setAttribute("offset",this.offsetBuffer),this.colorBuffer=new Qe(new Float32Array(this.maxParticles*4),4),this.colorBuffer.setUsage(kt),this.geometry.setAttribute("color",this.colorBuffer),this.settings.renderMode===q.Mesh?(this.rotationBuffer=new Qe(new Float32Array(this.maxParticles*4),4),this.rotationBuffer.setUsage(kt),this.geometry.setAttribute("rotation",this.rotationBuffer)):(this.settings.renderMode===q.BillBoard||this.settings.renderMode===q.HorizontalBillBoard||this.settings.renderMode===q.VerticalBillBoard||this.settings.renderMode===q.StretchedBillBoard)&&(this.rotationBuffer=new Qe(new Float32Array(this.maxParticles),1),this.rotationBuffer.setUsage(kt),this.geometry.setAttribute("rotation",this.rotationBuffer)),this.sizeBuffer=new Qe(new Float32Array(this.maxParticles*3),3),this.sizeBuffer.setUsage(kt),this.geometry.setAttribute("size",this.sizeBuffer),this.uvTileBuffer=new Qe(new Float32Array(this.maxParticles),1),this.uvTileBuffer.setUsage(kt),this.geometry.setAttribute("uvTile",this.uvTileBuffer),this.settings.renderMode===q.StretchedBillBoard&&(this.velocityBuffer=new Qe(new Float32Array(this.maxParticles*4),4),this.velocityBuffer.setUsage(kt),this.geometry.setAttribute("velocity",this.velocityBuffer))}setupBuffers(){this.geometry&&this.geometry.dispose(),this.geometry=new Do,this.geometry.setIndex(this.settings.instancingGeometry.getIndex()),this.settings.instancingGeometry.hasAttribute("normal")&&this.geometry.setAttribute("normal",this.settings.instancingGeometry.getAttribute("normal")),this.geometry.setAttribute("position",this.settings.instancingGeometry.getAttribute("position")),this.settings.instancingGeometry.hasAttribute("uv")&&this.geometry.setAttribute("uv",this.settings.instancingGeometry.getAttribute("uv")),this.buildExpandableBuffers()}expandBuffers(t){for(;t>=this.maxParticles;)this.maxParticles*=2;this.setupBuffers()}rebuildMaterial(){this.layers.mask=this.settings.layers.mask;const t={},e={};this.settings.material.type!=="MeshStandardMaterial"&&this.settings.material.type!=="MeshPhysicalMaterial"&&(t.map=new ce(this.settings.material.map)),this.settings.material.alphaTest&&(e.USE_ALPHATEST="",t.alphaTest=new ce(this.settings.material.alphaTest)),e.USE_UV="";const i=this.settings.uTileCount,r=this.settings.vTileCount;(i>1||r>1)&&(e.UV_TILE="",t.tileCount=new ce(new Ci(i,r))),this.settings.material.defines&&this.settings.material.defines.USE_COLOR_AS_ALPHA!==void 0&&(e.USE_COLOR_AS_ALPHA=""),this.settings.material.normalMap&&(e.USE_NORMALMAP="",e.NORMALMAP_UV=_n(this.settings.material.normalMap.channel),t.normalMapTransform=new ce(new ve().copy(this.settings.material.normalMap.matrix))),this.settings.material.map&&(e.USE_MAP="",this.settings.blendTiles&&(e.TILE_BLEND=""),e.MAP_UV=_n(this.settings.material.map.channel),t.mapTransform=new ce(new ve().copy(this.settings.material.map.matrix))),e.USE_COLOR_ALPHA="";let s;if(this.settings.softParticles){e.SOFT_PARTICLES="";const c=this.settings.softNearFade,o=1/(this.settings.softFarFade-this.settings.softNearFade);t.softParams=new ce(new Ci(c,o)),t.depthTexture=new ce(null);const l=t.projParams=new ce(new Qt);s=(u,d,h)=>{l.value.set(h.near,h.far,0,0)}}let a=!1;if(this.settings.renderMode===q.BillBoard||this.settings.renderMode===q.VerticalBillBoard||this.settings.renderMode===q.HorizontalBillBoard||this.settings.renderMode===q.Mesh){let c,o;this.settings.renderMode===q.Mesh?this.settings.material.type==="MeshStandardMaterial"||this.settings.material.type==="MeshPhysicalMaterial"?(e.USE_COLOR="",c=On,o=In,a=!0):(c=Wh,o=en):(c=Yh,o=en),this.settings.renderMode===q.VerticalBillBoard?e.VERTICAL="":this.settings.renderMode===q.HorizontalBillBoard&&(e.HORIZONTAL="");let l=!1;this.settings.renderMode===q.Mesh&&(this.settings.material.type==="MeshStandardMaterial"?(this.material=new Qh({}),this.material.copy(this.settings.material),this.material.uniforms=t,this.material.defines=e,l=!0):this.settings.material.type==="MeshPhysicalMaterial"&&(this.material=new Kh({}),this.material.copy(this.settings.material),this.material.uniforms=t,this.material.defines=e,l=!0)),l||(this.material=new Pi({uniforms:t,defines:e,vertexShader:c,fragmentShader:o,transparent:this.settings.material.transparent,depthWrite:!this.settings.material.transparent,blending:this.settings.material.blending,blendDst:this.settings.material.blendDst,blendSrc:this.settings.material.blendSrc,blendEquation:this.settings.material.blendEquation,premultipliedAlpha:this.settings.material.premultipliedAlpha,side:this.settings.material.side,alphaTest:this.settings.material.alphaTest,depthTest:this.settings.material.depthTest,lights:a}))}else if(this.settings.renderMode===q.StretchedBillBoard)t.speedFactor=new ce(1),this.material=new Pi({uniforms:t,defines:e,vertexShader:$h,fragmentShader:en,transparent:this.settings.material.transparent,depthWrite:!this.settings.material.transparent,blending:this.settings.material.blending,blendDst:this.settings.material.blendDst,blendSrc:this.settings.material.blendSrc,blendEquation:this.settings.material.blendEquation,premultipliedAlpha:this.settings.material.premultipliedAlpha,side:this.settings.material.side,alphaTest:this.settings.material.alphaTest,depthTest:this.settings.material.depthTest});else throw new Error("render mode unavailable");this.material&&s&&(this.material.onBeforeRender=s)}update(){let t=0,e=0;const i=this.getVisibleSystems();for(const r of i)e+=r.particleNum;e>this.maxParticles&&this.expandBuffers(e);for(const r of i){r.emitter.updateMatrixWorld&&(r.emitter.updateWorldMatrix(!0,!1),r.emitter.updateMatrixWorld(!0));const s=r.particles,a=r.particleNum,c=this.quaternion2_,o=this.vector2_,l=this.vector3_;r.emitter.matrixWorld.decompose(o,c,l),this.rotationMat_.setFromMatrix4(r.emitter.matrixWorld);for(let u=0;u<a;u++,t++){const d=s[u];if(this.settings.renderMode===q.Mesh){let f;if(r.worldSpace)f=d.rotation;else{let y;d.parentMatrix?y=this.quaternion3_.setFromRotationMatrix(d.parentMatrix):y=c,f=this.quaternion_,f.copy(y).multiply(d.rotation)}this.rotationBuffer.setXYZW(t,f.x,f.y,f.z,f.w)}else(this.settings.renderMode===q.StretchedBillBoard||this.settings.renderMode===q.VerticalBillBoard||this.settings.renderMode===q.HorizontalBillBoard||this.settings.renderMode===q.BillBoard)&&this.rotationBuffer.setX(t,d.rotation);let h;if(r.worldSpace?h=d.position:(h=this.vector_,d.parentMatrix?h.copy(d.position).applyMatrix4(d.parentMatrix):h.copy(d.position).applyMatrix4(r.emitter.matrixWorld)),this.offsetBuffer.setXYZ(t,h.x,h.y,h.z),this.colorBuffer.setXYZW(t,d.color.x,d.color.y,d.color.z,d.color.w),r.worldSpace?this.sizeBuffer.setXYZ(t,d.size.x,d.size.y,d.size.z):d.parentMatrix?this.sizeBuffer.setXYZ(t,d.size.x,d.size.y,d.size.z):this.sizeBuffer.setXYZ(t,d.size.x*Math.abs(l.x),d.size.y*Math.abs(l.y),d.size.z*Math.abs(l.z)),this.uvTileBuffer.setX(t,d.uvTile),this.settings.renderMode===q.StretchedBillBoard&&this.velocityBuffer){let f=r.rendererEmitterSettings.speedFactor;f===0&&(f=.001);const y=r.rendererEmitterSettings.lengthFactor;let x;r.worldSpace?x=d.velocity:(x=this.vector_,d.parentMatrix?(this.rotationMat2_.setFromMatrix4(d.parentMatrix),x.copy(d.velocity).applyMatrix3(this.rotationMat2_)):x.copy(d.velocity).applyMatrix3(this.rotationMat_)),this.velocityBuffer.setXYZW(t,x.x*f,x.y*f,x.z*f,y)}}}this.geometry.instanceCount=t,t>0&&(this.offsetBuffer.clearUpdateRanges(),this.offsetBuffer.addUpdateRange(0,t*3),this.offsetBuffer.needsUpdate=!0,this.sizeBuffer.clearUpdateRanges(),this.sizeBuffer.addUpdateRange(0,t*3),this.sizeBuffer.needsUpdate=!0,this.colorBuffer.clearUpdateRanges(),this.colorBuffer.addUpdateRange(0,t*4),this.colorBuffer.needsUpdate=!0,this.uvTileBuffer.clearUpdateRanges(),this.uvTileBuffer.addUpdateRange(0,t),this.uvTileBuffer.needsUpdate=!0,this.settings.renderMode===q.StretchedBillBoard&&this.velocityBuffer&&(this.velocityBuffer.clearUpdateRanges(),this.velocityBuffer.addUpdateRange(0,t*4),this.velocityBuffer.needsUpdate=!0),this.settings.renderMode===q.Mesh?(this.rotationBuffer.clearUpdateRanges(),this.rotationBuffer.addUpdateRange(0,t*4),this.rotationBuffer.needsUpdate=!0):(this.settings.renderMode===q.StretchedBillBoard||this.settings.renderMode===q.HorizontalBillBoard||this.settings.renderMode===q.VerticalBillBoard||this.settings.renderMode===q.BillBoard)&&(this.rotationBuffer.clearUpdateRanges(),this.rotationBuffer.addUpdateRange(0,t),this.rotationBuffer.needsUpdate=!0))}dispose(){this.geometry.dispose()}}var tu=`

#include <common>
#include <tile_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

uniform sampler2D alphaMap;
uniform float useAlphaMap;
uniform float visibility;
uniform float alphaTest;

varying vec4 vColor;
    
void main() {
    #include <clipping_planes_fragment>
    #include <logdepthbuf_fragment>

    vec4 diffuseColor = vColor;
    
    #ifdef USE_MAP
    #include <tile_fragment>
    #ifndef USE_COLOR_AS_ALPHA
    #endif
    #endif
    if( useAlphaMap == 1. ) diffuseColor.a *= texture2D( alphaMap, vUv).a;
    if( diffuseColor.a < alphaTest ) discard;
    gl_FragColor = diffuseColor;

    #include <fog_fragment>
    #include <tonemapping_fragment>
}`,eu=`
#include <common>
#include <tile_pars_vertex>
#include <color_pars_vertex>
#include <clipping_planes_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <fog_pars_vertex>

attribute vec3 previous;
attribute vec3 next;
attribute float side;
attribute float width;

uniform vec2 resolution;
uniform float lineWidth;
uniform float sizeAttenuation;
    
vec2 fix(vec4 i, float aspect) {
    vec2 res = i.xy / i.w;
    res.x *= aspect;
    return res;
}
    
void main() {

    #include <tile_vertex>
    
    float aspect = resolution.x / resolution.y;

    vColor = color;

    mat4 m = projectionMatrix * modelViewMatrix;
    vec4 finalPosition = m * vec4( position, 1.0 );
    vec4 prevPos = m * vec4( previous, 1.0 );
    vec4 nextPos = m * vec4( next, 1.0 );

    vec2 currentP = fix( finalPosition, aspect );
    vec2 prevP = fix( prevPos, aspect );
    vec2 nextP = fix( nextPos, aspect );

    float w = lineWidth * width;

    vec2 dir;
    if( nextP == currentP ) dir = normalize( currentP - prevP );
    else if( prevP == currentP ) dir = normalize( nextP - currentP );
    else {
        vec2 dir1 = normalize( currentP - prevP );
        vec2 dir2 = normalize( nextP - currentP );
        dir = normalize( dir1 + dir2 );

        vec2 perp = vec2( -dir1.y, dir1.x );
        vec2 miter = vec2( -dir.y, dir.x );
        //w = clamp( w / dot( miter, perp ), 0., 4., * lineWidth * width );

    }

    //vec2 normal = ( cross( vec3( dir, 0. ) vec3( 0., 0., 1. ) ) ).xy;
    vec4 normal = vec4( -dir.y, dir.x, 0., 1. );
    normal.xy *= .5 * w;
    normal *= projectionMatrix;
    if( sizeAttenuation == 0. ) {
        normal.xy *= finalPosition.w;
        normal.xy /= ( vec4( resolution, 0., 1. ) * projectionMatrix ).xy;
    }

    finalPosition.xy += normal.xy * side;

    gl_Position = finalPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    
	#include <fog_vertex>
}`;class iu extends qa{constructor(t){super(t),this.vector_=new W,this.vector2_=new W,this.vector3_=new W,this.quaternion_=new ct,this.maxParticles=1e4,this.setupBuffers(),this.rebuildMaterial()}setupBuffers(){this.geometry&&this.geometry.dispose(),this.geometry=new Lo,this.indexBuffer=new le(new Uint32Array(this.maxParticles*6),1),this.indexBuffer.setUsage(kt),this.geometry.setIndex(this.indexBuffer),this.positionBuffer=new le(new Float32Array(this.maxParticles*6),3),this.positionBuffer.setUsage(kt),this.geometry.setAttribute("position",this.positionBuffer),this.previousBuffer=new le(new Float32Array(this.maxParticles*6),3),this.previousBuffer.setUsage(kt),this.geometry.setAttribute("previous",this.previousBuffer),this.nextBuffer=new le(new Float32Array(this.maxParticles*6),3),this.nextBuffer.setUsage(kt),this.geometry.setAttribute("next",this.nextBuffer),this.widthBuffer=new le(new Float32Array(this.maxParticles*2),1),this.widthBuffer.setUsage(kt),this.geometry.setAttribute("width",this.widthBuffer),this.sideBuffer=new le(new Float32Array(this.maxParticles*2),1),this.sideBuffer.setUsage(kt),this.geometry.setAttribute("side",this.sideBuffer),this.uvBuffer=new le(new Float32Array(this.maxParticles*4),2),this.uvBuffer.setUsage(kt),this.geometry.setAttribute("uv",this.uvBuffer),this.colorBuffer=new le(new Float32Array(this.maxParticles*8),4),this.colorBuffer.setUsage(kt),this.geometry.setAttribute("color",this.colorBuffer)}expandBuffers(t){for(;t>=this.maxParticles;)this.maxParticles*=2;this.setupBuffers()}rebuildMaterial(){this.layers.mask=this.settings.layers.mask;const t={lineWidth:{value:1},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},resolution:{value:new Ci(1,1)},sizeAttenuation:{value:1},visibility:{value:1},alphaTest:{value:0}},e={};if(e.USE_UV="",e.USE_COLOR_ALPHA="",this.settings.material.map&&(e.USE_MAP="",e.MAP_UV=_n(this.settings.material.map.channel),t.map=new ce(this.settings.material.map),t.mapTransform=new ce(new ve().copy(this.settings.material.map.matrix))),this.settings.material.defines&&this.settings.material.defines.USE_COLOR_AS_ALPHA!==void 0&&(e.USE_COLOR_AS_ALPHA=""),this.settings.renderMode===q.Trail)this.material=new Pi({uniforms:t,defines:e,vertexShader:eu,fragmentShader:tu,transparent:this.settings.material.transparent,depthWrite:!this.settings.material.transparent,side:this.settings.material.side,blending:this.settings.material.blending||Ge,blendDst:this.settings.material.blendDst,blendSrc:this.settings.material.blendSrc,blendEquation:this.settings.material.blendEquation,premultipliedAlpha:this.settings.material.premultipliedAlpha});else throw new Error("render mode unavailable")}update(){let t=0,e=0,i=0;const r=this.getVisibleSystems();for(const s of r)for(let a=0;a<s.particleNum;a++)i+=s.particles[a].previous.length*2;i>this.maxParticles&&this.expandBuffers(i);for(const s of r){s.emitter.updateMatrixWorld&&(s.emitter.updateWorldMatrix(!0,!1),s.emitter.updateMatrixWorld(!0));const a=this.quaternion_,c=this.vector2_,o=this.vector3_;s.emitter.matrixWorld.decompose(c,a,o);const l=s.particles,u=s.particleNum,d=this.settings.uTileCount,h=this.settings.vTileCount,f=1/d,y=1/h;for(let x=0;x<u;x++){const g=l[x],v=g.uvTile%h,M=Math.floor(g.uvTile/h+.001),b=g.previous.values();let z=b.next(),_=z.value,w=_;z.done||(z=b.next());let A;z.value!==void 0?A=z.value:A=w;for(let T=0;T<g.previous.length;T++,t+=2){if(this.positionBuffer.setXYZ(t,w.position.x,w.position.y,w.position.z),this.positionBuffer.setXYZ(t+1,w.position.x,w.position.y,w.position.z),s.worldSpace?(this.positionBuffer.setXYZ(t,w.position.x,w.position.y,w.position.z),this.positionBuffer.setXYZ(t+1,w.position.x,w.position.y,w.position.z)):(g.parentMatrix?this.vector_.copy(w.position).applyMatrix4(g.parentMatrix):this.vector_.copy(w.position).applyMatrix4(s.emitter.matrixWorld),this.positionBuffer.setXYZ(t,this.vector_.x,this.vector_.y,this.vector_.z),this.positionBuffer.setXYZ(t+1,this.vector_.x,this.vector_.y,this.vector_.z)),s.worldSpace?(this.previousBuffer.setXYZ(t,_.position.x,_.position.y,_.position.z),this.previousBuffer.setXYZ(t+1,_.position.x,_.position.y,_.position.z)):(g.parentMatrix?this.vector_.copy(_.position).applyMatrix4(g.parentMatrix):this.vector_.copy(_.position).applyMatrix4(s.emitter.matrixWorld),this.previousBuffer.setXYZ(t,this.vector_.x,this.vector_.y,this.vector_.z),this.previousBuffer.setXYZ(t+1,this.vector_.x,this.vector_.y,this.vector_.z)),s.worldSpace?(this.nextBuffer.setXYZ(t,A.position.x,A.position.y,A.position.z),this.nextBuffer.setXYZ(t+1,A.position.x,A.position.y,A.position.z)):(g.parentMatrix?this.vector_.copy(A.position).applyMatrix4(g.parentMatrix):this.vector_.copy(A.position).applyMatrix4(s.emitter.matrixWorld),this.nextBuffer.setXYZ(t,this.vector_.x,this.vector_.y,this.vector_.z),this.nextBuffer.setXYZ(t+1,this.vector_.x,this.vector_.y,this.vector_.z)),this.sideBuffer.setX(t,1),this.sideBuffer.setX(t+1,-1),s.worldSpace)this.widthBuffer.setX(t,w.size),this.widthBuffer.setX(t+1,w.size);else if(g.parentMatrix)this.widthBuffer.setX(t,w.size),this.widthBuffer.setX(t+1,w.size);else{const E=(Math.abs(o.x)+Math.abs(o.y)+Math.abs(o.z))/3;this.widthBuffer.setX(t,w.size*E),this.widthBuffer.setX(t+1,w.size*E)}this.uvBuffer.setXY(t,(T/g.previous.length+v)*f,(h-M-1)*y),this.uvBuffer.setXY(t+1,(T/g.previous.length+v)*f,(h-M)*y),this.colorBuffer.setXYZW(t,w.color.x,w.color.y,w.color.z,w.color.w),this.colorBuffer.setXYZW(t+1,w.color.x,w.color.y,w.color.z,w.color.w),T+1<g.previous.length&&(this.indexBuffer.setX(e*3,t),this.indexBuffer.setX(e*3+1,t+1),this.indexBuffer.setX(e*3+2,t+2),e++,this.indexBuffer.setX(e*3,t+2),this.indexBuffer.setX(e*3+1,t+1),this.indexBuffer.setX(e*3+2,t+3),e++),_=w,w=A,z.done||(z=b.next(),z.value!==void 0&&(A=z.value))}}}this.positionBuffer.clearUpdateRanges(),this.positionBuffer.addUpdateRange(0,t*3),this.positionBuffer.needsUpdate=!0,this.previousBuffer.clearUpdateRanges(),this.previousBuffer.addUpdateRange(0,t*3),this.previousBuffer.needsUpdate=!0,this.nextBuffer.clearUpdateRanges(),this.nextBuffer.addUpdateRange(0,t*3),this.nextBuffer.needsUpdate=!0,this.sideBuffer.clearUpdateRanges(),this.sideBuffer.addUpdateRange(0,t),this.sideBuffer.needsUpdate=!0,this.widthBuffer.clearUpdateRanges(),this.widthBuffer.addUpdateRange(0,t),this.widthBuffer.needsUpdate=!0,this.uvBuffer.clearUpdateRanges(),this.uvBuffer.addUpdateRange(0,t*2),this.uvBuffer.needsUpdate=!0,this.colorBuffer.clearUpdateRanges(),this.colorBuffer.addUpdateRange(0,t*4),this.colorBuffer.needsUpdate=!0,this.indexBuffer.clearUpdateRanges(),this.indexBuffer.addUpdateRange(0,e*3),this.indexBuffer.needsUpdate=!0,this.geometry.setDrawRange(0,e*3)}dispose(){this.geometry.dispose()}}class Rn extends ga{constructor(){super(),this.batches=[],this.systemToBatchIndex=new Map,this.type="BatchedRenderer",this.depthTexture=null}static equals(t,e){return t.material.side===e.material.side&&t.material.blending===e.material.blending&&t.material.blendSrc===e.material.blendSrc&&t.material.blendDst===e.material.blendDst&&t.material.blendEquation===e.material.blendEquation&&t.material.premultipliedAlpha===e.material.premultipliedAlpha&&t.material.transparent===e.material.transparent&&t.material.depthTest===e.material.depthTest&&t.material.type===e.material.type&&t.material.alphaTest===e.material.alphaTest&&t.material.map===e.material.map&&t.renderMode===e.renderMode&&t.blendTiles===e.blendTiles&&t.softParticles===e.softParticles&&t.softFarFade===e.softFarFade&&t.softNearFade===e.softNearFade&&t.uTileCount===e.uTileCount&&t.vTileCount===e.vTileCount&&t.instancingGeometry===e.instancingGeometry&&t.renderOrder===e.renderOrder&&t.layers.mask===e.layers.mask}addSystem(t){t._renderer=this;const e=t.getRendererSettings();for(let r=0;r<this.batches.length;r++)if(Rn.equals(this.batches[r].settings,e)){this.batches[r].addSystem(t),this.systemToBatchIndex.set(t,r);return}let i;switch(e.renderMode){case q.Trail:i=new iu(e);break;case q.Mesh:case q.BillBoard:case q.VerticalBillBoard:case q.HorizontalBillBoard:case q.StretchedBillBoard:i=new jh(e);break}this.depthTexture&&i.applyDepthTexture(this.depthTexture),i.addSystem(t),this.batches.push(i),this.systemToBatchIndex.set(t,this.batches.length-1),this.add(i)}deleteSystem(t){const e=this.systemToBatchIndex.get(t);e!=null&&(this.batches[e].removeSystem(t),this.systemToBatchIndex.delete(t))}setDepthTexture(t){this.depthTexture=t;for(const e of this.batches)e.applyDepthTexture(t)}updateSystem(t){this.deleteSystem(t),this.addSystem(t)}update(t){this.systemToBatchIndex.forEach((e,i)=>{i.update(t)});for(let e=0;e<this.batches.length;e++)this.batches[e].update()}}Gh();Uh(Ih);console.log("%c Particle system powered by three.quarks. https://quarks.art/","font-size: 14px; font-weight: bold;");const Cs=["D4","D6","D8","D12","D20"],ru=["#ff365f","#ff8e3a","#ffe86a","#63f6ad","#53c9ff","#a978ff"];function su(){return Y.useMemo(()=>window.matchMedia("(max-width: 900px)").matches?0:2.8,[])}function oa({die:n}){const t=Y.useMemo(()=>{const e=new Zo(3.05,3.05,3.05);return e.clearGroups(),e},[]);return Y.useEffect(()=>()=>t.dispose(),[t]),n==="D4"?G.jsx("tetrahedronGeometry",{args:[2.2,0]}):n==="D6"?G.jsx("primitive",{object:t,attach:"geometry"}):n==="D8"?G.jsx("octahedronGeometry",{args:[2.35,0]}):n==="D12"?G.jsx("dodecahedronGeometry",{args:[1.92,0]}):G.jsx("icosahedronGeometry",{args:[2.05,0]})}function nu({onReady:n}){const t=ri(i=>i.scene),e=Y.useRef(null);return Ii(()=>{t.environment&&e.current!==t.environment&&(e.current=t.environment,n(t.environment))}),G.jsxs(Yl,{resolution:256,frames:1,environmentIntensity:1.35,children:[G.jsx(cs,{intensity:5.5,color:"#fff8e9",position:[-6,4,3],scale:[3,9,1]}),G.jsx(cs,{intensity:3.2,color:"#65d9ff",position:[5,-1,2],scale:[4,5,1]}),G.jsx(cs,{intensity:3.8,color:"#ff5f9e",position:[1,5,-5],scale:[7,2,1]}),G.jsx(cs,{intensity:2.4,color:"#9b76ff",position:[-2,-5,-2],scale:[5,3,1]}),G.jsxs("mesh",{position:[0,0,-8],children:[G.jsx("planeGeometry",{args:[24,18]}),G.jsx("meshBasicMaterial",{color:"#02030a"})]})]})}function au({count:n,speed:t,dieX:e}){const i=Y.useMemo(()=>{const r=new Rn,s=new ws({color:"#d9f8ff",transparent:!0,opacity:.85,blending:Ge,depthWrite:!1,toneMapped:!1}),a=new Ps({duration:4,looping:!0,worldSpace:!0,shape:new ci({radius:2.8,thickness:.72}),startLife:new _e(1.2,3.2),startSpeed:new _e(.06,.42),startSize:new _e(.025,.1),startColor:new ai(new Xo(.62,.9,1,.9)),emissionOverTime:new ot(n),renderMode:q.BillBoard,material:s,behaviors:[new Ui(new Ni([[new ke(0,1,.7,0),0]]))]});return a.emitter.position.set(e,.45,0),r.addSystem(a),a.play(),{batch:r,material:s,system:a}},[n,e]);return Ii((r,s)=>i.batch.update(Math.min(s,.05)*t)),Y.useEffect(()=>()=>{i.batch.deleteSystem(i.system),i.system.dispose(),i.material.dispose()},[i]),G.jsxs(G.Fragment,{children:[G.jsx("primitive",{object:i.system.emitter}),G.jsx("primitive",{object:i.batch})]})}function ou({strength:n,dieX:t}){const e=Y.useRef(),i=Y.useRef(),r=Y.useMemo(()=>new $(-9,4.2,4.4),[]),s=Y.useMemo(()=>new $(t,.45,0),[t]),a=Y.useMemo(()=>{const c=s.clone().sub(r),o=r.clone().add(s).multiplyScalar(.5),l=new Ho().setFromUnitVectors(new $(0,1,0),c.clone().normalize());return{length:c.length(),midpoint:o,quaternion:l}},[s,r]);return Y.useEffect(()=>{e.current&&i.current&&(e.current.target=i.current)},[]),G.jsxs("group",{children:[G.jsx("object3D",{ref:i,position:s}),G.jsx("spotLight",{ref:e,position:r,color:"#fff7de",intensity:38*n,distance:34,angle:.24,penumbra:.72,decay:1.55}),G.jsxs("mesh",{position:a.midpoint,quaternion:a.quaternion,renderOrder:-2,children:[G.jsx("cylinderGeometry",{args:[.12,1.15,a.length,32,1,!0]}),G.jsx("meshBasicMaterial",{color:"#dff8ff",transparent:!0,opacity:.065*n,blending:Ge,depthWrite:!1,side:si})]}),G.jsxs("mesh",{position:a.midpoint,quaternion:a.quaternion,renderOrder:-1,children:[G.jsx("cylinderGeometry",{args:[.025,.16,a.length,16,1,!0]}),G.jsx("meshBasicMaterial",{color:"#fffef5",transparent:!0,opacity:.32*n,blending:Ge,depthWrite:!1})]})]})}function cu({body:n,dispersion:t,dieX:e}){const i=Y.useRef();return Ii(()=>{if(!n.current||!i.current)return;const r=n.current.rotation();i.current.rotation.z=xe.damp(i.current.rotation.z,r.z*.65+r.x*.18,4,1/60),i.current.rotation.y=xe.damp(i.current.rotation.y,r.y*.12,4,1/60);const s=.72+Math.abs(r.y)*.28;i.current.children.forEach((a,c)=>{a.material.opacity=(.08+c*.008)*t*s})}),G.jsx("group",{ref:i,position:[e,.45,-.15],children:ru.map((r,s)=>G.jsxs("mesh",{position:[5.6,(s-2.5)*.32,s*-.035],rotation:[0,0,(s-2.5)*.035],children:[G.jsx("planeGeometry",{args:[11.2,.22+s*.012]}),G.jsx("meshBasicMaterial",{color:r,transparent:!0,opacity:.1,blending:Ge,depthWrite:!1,side:si})]},r))})}function lu({die:n,envMap:t,dispersion:e,speed:i,onDraggingChange:r,dieX:s}){const a=Y.useRef(),c=Y.useRef(null),o=Y.useRef(!1);Ii(()=>{!a.current||o.current||(a.current.setAngvel({x:.025*i,y:.09*i,z:.015*i},!0),o.current=!0)}),Y.useEffect(()=>{o.current=!1},[n]),Y.useEffect(()=>()=>{document.body.style.cursor=""},[]);const l=h=>{var f;h.stopPropagation(),h.target.setPointerCapture(h.pointerId),c.current={x:h.clientX,y:h.clientY,moved:!1},(f=a.current)==null||f.setAngvel({x:0,y:0,z:0},!0),document.body.style.cursor="grabbing",r(!0)},u=h=>{if(!c.current||!a.current)return;h.stopPropagation();const f=h.clientX-c.current.x,y=h.clientY-c.current.y;c.current={x:h.clientX,y:h.clientY,moved:c.current.moved||Math.abs(f)+Math.abs(y)>1},a.current.setAngvel({x:xe.clamp(y*.035,-2.4,2.4),y:xe.clamp(f*.035,-2.4,2.4),z:xe.clamp((f-y)*.006,-.65,.65)},!0)},d=h=>{if(c.current){c.current=null;try{h.target.releasePointerCapture(h.pointerId)}catch{}document.body.style.cursor="grab",r(!1)}};return G.jsxs(G.Fragment,{children:[G.jsx(cu,{body:a,dispersion:e,dieX:s}),G.jsxs(xo,{ref:a,position:[s,.45,0],rotation:[.42,-.58,.18],colliders:!1,gravityScale:0,linearDamping:8,angularDamping:.55,enabledTranslations:[!1,!1,!1],children:[G.jsx(_o,{args:[1.45],sensor:!0}),G.jsxs("mesh",{onPointerDown:l,onPointerMove:u,onPointerUp:d,onPointerCancel:d,onPointerOver:()=>{c.current||(document.body.style.cursor="grab")},onPointerOut:()=>{c.current||(document.body.style.cursor="")},children:[G.jsx(oa,{die:n}),G.jsx(Bl,{envMap:t,bounces:8,ior:1.45,fresnel:.42,aberrationStrength:.028+e*.072,fastChroma:!1,color:"#d9f8ff",transparent:!0,opacity:.76,toneMapped:!1}),G.jsx(Qo,{scale:1.002,threshold:8,color:"#d9f8ff"})]}),G.jsxs("mesh",{scale:.35,children:[G.jsx(oa,{die:n}),G.jsx("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:.055,blending:Ge,depthWrite:!1})]}),G.jsx("pointLight",{color:"#bcecff",intensity:8+e*14,distance:8})]},n)]})}function hu({dieX:n}){return G.jsxs("group",{children:[G.jsxs("mesh",{position:[n,-2.55,-1.5],rotation:[-Math.PI/2,0,0],children:[G.jsx("planeGeometry",{args:[31,22]}),G.jsx(Ko,{resolution:512,blur:[280,90],mixBlur:1.2,mixStrength:16,roughness:.72,depthScale:.45,color:"#020309",metalness:.48})]}),[3.6,4.8,6.2].map((t,e)=>G.jsxs("mesh",{position:[n,.45,-2.6],rotation:[0,0,e*.45],children:[G.jsx("torusGeometry",{args:[t,.012,5,160]}),G.jsx("meshBasicMaterial",{color:e===1?"#ff6f91":"#75dfff",transparent:!0,opacity:.13-e*.025,blending:Ge})]},t))]})}function uu({settings:n,onDraggingChange:t}){const[e,i]=Y.useState(null),r=xe.clamp(Math.round(n.die??2),0,Cs.length-1),s=Cs[r],a=xe.clamp((n.dispersion??68)/100,0,1),c=xe.clamp((n.light??76)/100,.2,1),o=n.speed??1,l=su();return G.jsxs(G.Fragment,{children:[G.jsx("color",{attach:"background",args:["#010208"]}),G.jsx("fogExp2",{attach:"fog",args:["#010208",.028]}),G.jsx(nu,{onReady:i}),G.jsx("ambientLight",{intensity:.08}),G.jsx(ou,{strength:c,dieX:l}),G.jsx(hu,{dieX:l}),G.jsx(au,{count:Math.round(n.motes??44),speed:o,dieX:l}),e&&G.jsx(vo,{gravity:[0,0,0],timeStep:1/60,interpolate:!0,children:G.jsx(lu,{die:s,envMap:e,dispersion:a,speed:o,onDraggingChange:t,dieX:l})}),G.jsxs(po,{multisampling:Yo,children:[G.jsx(yo,{mipmapBlur:!0,intensity:.95+c*.6,luminanceThreshold:.32,luminanceSmoothing:.5}),G.jsx(go,{})]}),G.jsx($o,{})]})}function zu({settings:n={}}){const[t,e]=Y.useState(!1),i=Cs[xe.clamp(Math.round(n.die??2),0,Cs.length-1)],r=Math.round(n.motes??44),s=Math.round(xe.clamp((n.dispersion??68)/100,0,1)*100);return G.jsxs("section",{className:`atmosphere prism-pulse-lab ${t?"is-dragging":""}`,style:{"--experiment-accent":"#77dcff"},children:[G.jsx(mo,{className:"prism-pulse-lab__canvas",dpr:qo,camera:{position:[0,.75,9.4],fov:43,near:.1,far:90},gl:{antialias:!0,alpha:!1,powerPreference:"high-performance"},onCreated:({gl:a})=>{a.outputColorSpace=ya,a.toneMapping=Go,a.toneMappingExposure=1.08},children:G.jsx(Y.Suspense,{fallback:null,children:G.jsx(uu,{settings:n,onDraggingChange:e})})}),G.jsx("div",{className:"prism-pulse-lab__veil"}),G.jsxs("div",{className:"experiment-copy",children:[G.jsxs("p",{children:["10 — Refractive geometry / ",i]}),G.jsxs("h1",{children:["Hold the",G.jsx("br",{}),"light itself."]}),G.jsx("span",{children:"A multi-bounce crystal die catches an off-camera beam, splitting the room into spectral paths. Drag the die and watch the light answer."})]}),G.jsxs("div",{className:"prism-pulse-lab__hint","aria-hidden":"true",children:[G.jsx("i",{}),G.jsx("span",{children:t?"Release to carry the momentum":"Drag the crystal to turn it"})]}),G.jsx(Wo,{eyebrow:"Refractive optics",value:`${r} PHOTON MOTES`,stats:[{value:i,label:"Geometry"},{value:`${s}%`,label:"Dispersion"}]})]})}export{zu as default};
