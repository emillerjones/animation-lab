import{r as z,j as _}from"./index-DdsG5hjO.js";import{e as ln,u as Xe,a as Rt,C as un}from"./react-three-fiber.esm-DhdWsmFV.js";import{d as fn,w as dn,q as pn,L as mn}from"./index-qu6OdOmz.js";import{P as yn,R as hn,B as xn}from"./react-three-rapier.esm-mFUrczNE.js";import{B as gn,P as vn,S as wn,R as bn,C as An,a as Mn,I as ne,b as Pn,c as Bn,d as Tn}from"./three.quarks.esm-MJUTtFJC.js";import{W as _n,a as Dn}from"./quality-Qc1UoWnq.js";import{L as Sn,A as In}from"./AdaptiveDpr-DFsW4X4g.js";import{E as Cn,L as Ut}from"./Lightformer-DeZtyJi4.js";import{M as Fn}from"./MeshReflectorMaterial-Dz9Wf3hb.js";import{_ as Ye}from"./extends-CF3RwP-h.js";import{s as En}from"./shaderMaterial-C42BarFg.js";import{v as zn}from"./constants-I5PtSeA3.js";import"./three.module-C8jeBWGd.js";import{E as Rn,B as Te,V as C,L as Z,P as Ze,a as lt,T as xt,S as Un,M as Q,b as X,c as Nn,D as _e,R as jn,F as Fe,U as Ft,d as Et,e as ye,N as gt,I as ie,f as Ee,g as Ln,h as ze,i as Vn,j as Kt,k as he,l as Ke,m as kn,n as Hn,o as qn,C as On,p as K,q as Gn,A as $n,Q as Wn,r as wt,s as Xn,t as Yn,u as Zn,v as Kn,w as Qn}from"./three.core-CI4oCR72.js";import"./constants-kMv6JnrO.js";const Jn=z.forwardRef(({threshold:n=15,geometry:e,...t},r)=>{const i=z.useRef(null);z.useImperativeHandle(r,()=>i.current,[]);const o=z.useMemo(()=>[0,0,0,1,0,0],[]),s=z.useRef(null),c=z.useRef(null);return z.useLayoutEffect(()=>{const a=i.current.parent,f=e??(a==null?void 0:a.geometry);if(!f||s.current===f&&c.current===n)return;s.current=f,c.current=n;const d=new Rn(f,n).attributes.position.array;i.current.geometry.setPositions(d),i.current.geometry.attributes.instanceStart.needsUpdate=!0,i.current.geometry.attributes.instanceEnd.needsUpdate=!0,i.current.computeLineDistances()}),z.createElement(Sn,Ye({segments:!0,points:o,ref:i,raycast:()=>null},t))}),Qe=0,ti=1,Je=2,Re=2,re=1.25,Ue=1,rt=32,te=65535,ei=Math.pow(2,-24),se=Symbol("SKIP_GENERATION");function tn(n){return n.index?n.index.count:n.attributes.position.count}function bt(n){return tn(n)/3}function en(n,e=ArrayBuffer){return n>65535?new Uint32Array(new e(4*n)):new Uint16Array(new e(2*n))}function ni(n,e){if(!n.index){const t=n.attributes.position.count,r=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=en(t,r);n.setIndex(new Te(i,1));for(let o=0;o<t;o++)i[o]=o}}function nn(n,e){const t=bt(n),r=e||n.drawRange,i=r.start/3,o=(r.start+r.count)/3,s=Math.max(0,i),c=Math.min(t,o)-s;return[{offset:Math.floor(s),count:Math.floor(c)}]}function rn(n,e){if(!n.groups||!n.groups.length)return nn(n,e);const t=[],r=new Set,i=e||n.drawRange,o=i.start/3,s=(i.start+i.count)/3;for(const a of n.groups){const f=a.start/3,u=(a.start+a.count)/3;r.add(Math.max(o,f)),r.add(Math.min(s,u))}const c=Array.from(r.values()).sort((a,f)=>a-f);for(let a=0;a<c.length-1;a++){const f=c[a],u=c[a+1];t.push({offset:Math.floor(f),count:Math.floor(u-f)})}return t}function ii(n,e){const t=bt(n),r=rn(n,e).sort((s,c)=>s.offset-c.offset),i=r[r.length-1];i.count=Math.min(t-i.offset,i.count);let o=0;return r.forEach(({count:s})=>o+=s),t!==o}function oe(n,e,t,r,i){let o=1/0,s=1/0,c=1/0,a=-1/0,f=-1/0,u=-1/0,d=1/0,l=1/0,p=1/0,v=-1/0,w=-1/0,h=-1/0;for(let m=e*6,y=(e+t)*6;m<y;m+=6){const x=n[m+0],b=n[m+1],g=x-b,A=x+b;g<o&&(o=g),A>a&&(a=A),x<d&&(d=x),x>v&&(v=x);const M=n[m+2],B=n[m+3],P=M-B,D=M+B;P<s&&(s=P),D>f&&(f=D),M<l&&(l=M),M>w&&(w=M);const S=n[m+4],T=n[m+5],I=S-T,F=S+T;I<c&&(c=I),F>u&&(u=F),S<p&&(p=S),S>h&&(h=S)}r[0]=o,r[1]=s,r[2]=c,r[3]=a,r[4]=f,r[5]=u,i[0]=d,i[1]=l,i[2]=p,i[3]=v,i[4]=w,i[5]=h}function ri(n,e=null,t=null,r=null){const i=n.attributes.position,o=n.index?n.index.array:null,s=bt(n),c=i.normalized;let a;e===null?(a=new Float32Array(s*6),t=0,r=s):(a=e,t=t||0,r=r||s);const f=i.array,u=i.offset||0;let d=3;i.isInterleavedBufferAttribute&&(d=i.data.stride);const l=["getX","getY","getZ"];for(let p=t;p<t+r;p++){const v=p*3,w=p*6;let h=v+0,m=v+1,y=v+2;o&&(h=o[h],m=o[m],y=o[y]),c||(h=h*d+u,m=m*d+u,y=y*d+u);for(let x=0;x<3;x++){let b,g,A;c?(b=i[l[x]](h),g=i[l[x]](m),A=i[l[x]](y)):(b=f[h+x],g=f[m+x],A=f[y+x]);let M=b;g<M&&(M=g),A<M&&(M=A);let B=b;g>B&&(B=g),A>B&&(B=A);const P=(B-M)/2,D=x*2;a[w+D+0]=M+P,a[w+D+1]=P+(Math.abs(M)+P)*ei}}return a}function U(n,e,t){return t.min.x=e[n],t.min.y=e[n+1],t.min.z=e[n+2],t.max.x=e[n+3],t.max.y=e[n+4],t.max.z=e[n+5],t}function Ne(n){let e=-1,t=-1/0;for(let r=0;r<3;r++){const i=n[r+3]-n[r];i>t&&(t=i,e=r)}return e}function je(n,e){e.set(n)}function Le(n,e,t){let r,i;for(let o=0;o<3;o++){const s=o+3;r=n[o],i=e[o],t[o]=r<i?r:i,r=n[s],i=e[s],t[s]=r>i?r:i}}function Nt(n,e,t){for(let r=0;r<3;r++){const i=e[n+2*r],o=e[n+2*r+1],s=i-o,c=i+o;s<t[r]&&(t[r]=s),c>t[r+3]&&(t[r+3]=c)}}function Pt(n){const e=n[3]-n[0],t=n[4]-n[1],r=n[5]-n[2];return 2*(e*t+t*r+r*e)}const Y=32,si=(n,e)=>n.candidate-e.candidate,et=new Array(Y).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),jt=new Float32Array(6);function oi(n,e,t,r,i,o){let s=-1,c=0;if(o===Qe)s=Ne(e),s!==-1&&(c=(e[s]+e[s+3])/2);else if(o===ti)s=Ne(n),s!==-1&&(c=ci(t,r,i,s));else if(o===Je){const a=Pt(n);let f=re*i;const u=r*6,d=(r+i)*6;for(let l=0;l<3;l++){const p=e[l],h=(e[l+3]-p)/Y;if(i<Y/4){const m=[...et];m.length=i;let y=0;for(let b=u;b<d;b+=6,y++){const g=m[y];g.candidate=t[b+2*l],g.count=0;const{bounds:A,leftCacheBounds:M,rightCacheBounds:B}=g;for(let P=0;P<3;P++)B[P]=1/0,B[P+3]=-1/0,M[P]=1/0,M[P+3]=-1/0,A[P]=1/0,A[P+3]=-1/0;Nt(b,t,A)}m.sort(si);let x=i;for(let b=0;b<x;b++){const g=m[b];for(;b+1<x&&m[b+1].candidate===g.candidate;)m.splice(b+1,1),x--}for(let b=u;b<d;b+=6){const g=t[b+2*l];for(let A=0;A<x;A++){const M=m[A];g>=M.candidate?Nt(b,t,M.rightCacheBounds):(Nt(b,t,M.leftCacheBounds),M.count++)}}for(let b=0;b<x;b++){const g=m[b],A=g.count,M=i-g.count,B=g.leftCacheBounds,P=g.rightCacheBounds;let D=0;A!==0&&(D=Pt(B)/a);let S=0;M!==0&&(S=Pt(P)/a);const T=Ue+re*(D*A+S*M);T<f&&(s=l,f=T,c=g.candidate)}}else{for(let x=0;x<Y;x++){const b=et[x];b.count=0,b.candidate=p+h+x*h;const g=b.bounds;for(let A=0;A<3;A++)g[A]=1/0,g[A+3]=-1/0}for(let x=u;x<d;x+=6){let A=~~((t[x+2*l]-p)/h);A>=Y&&(A=Y-1);const M=et[A];M.count++,Nt(x,t,M.bounds)}const m=et[Y-1];je(m.bounds,m.rightCacheBounds);for(let x=Y-2;x>=0;x--){const b=et[x],g=et[x+1];Le(b.bounds,g.rightCacheBounds,b.rightCacheBounds)}let y=0;for(let x=0;x<Y-1;x++){const b=et[x],g=b.count,A=b.bounds,B=et[x+1].rightCacheBounds;g!==0&&(y===0?je(A,jt):Le(A,jt,jt)),y+=g;let P=0,D=0;y!==0&&(P=Pt(jt)/a);const S=i-y;S!==0&&(D=Pt(B)/a);const T=Ue+re*(P*y+D*S);T<f&&(s=l,f=T,c=b.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${o} used.`);return{axis:s,pos:c}}function ci(n,e,t,r){let i=0;for(let o=e,s=e+t;o<s;o++)i+=n[o*6+r*2];return i/t}class ce{constructor(){this.boundingData=new Float32Array(6)}}function ai(n,e,t,r,i,o){let s=r,c=r+i-1;const a=o.pos,f=o.axis*2;for(;;){for(;s<=c&&t[s*6+f]<a;)s++;for(;s<=c&&t[c*6+f]>=a;)c--;if(s<c){for(let u=0;u<3;u++){let d=e[s*3+u];e[s*3+u]=e[c*3+u],e[c*3+u]=d}for(let u=0;u<6;u++){let d=t[s*6+u];t[s*6+u]=t[c*6+u],t[c*6+u]=d}s++,c--}else return s}}function li(n,e,t,r,i,o){let s=r,c=r+i-1;const a=o.pos,f=o.axis*2;for(;;){for(;s<=c&&t[s*6+f]<a;)s++;for(;s<=c&&t[c*6+f]>=a;)c--;if(s<c){let u=n[s];n[s]=n[c],n[c]=u;for(let d=0;d<6;d++){let l=t[s*6+d];t[s*6+d]=t[c*6+d],t[c*6+d]=l}s++,c--}else return s}}function L(n,e){return e[n+15]===65535}function k(n,e){return e[n+6]}function H(n,e){return e[n+14]}function O(n){return n+8}function q(n,e){return e[n+6]}function De(n,e){return e[n+7]}let sn,Ct,Zt,on;const ui=Math.pow(2,32);function xe(n){return"count"in n?1:1+xe(n.left)+xe(n.right)}function fi(n,e,t){return sn=new Float32Array(t),Ct=new Uint32Array(t),Zt=new Uint16Array(t),on=new Uint8Array(t),ge(n,e)}function ge(n,e){const t=n/4,r=n/2,i="count"in e,o=e.boundingData;for(let s=0;s<6;s++)sn[t+s]=o[s];if(i)if(e.buffer){const s=e.buffer;on.set(new Uint8Array(s),n);for(let c=n,a=n+s.byteLength;c<a;c+=rt){const f=c/2;L(f,Zt)||(Ct[c/4+6]+=t)}return n+s.byteLength}else{const s=e.offset,c=e.count;return Ct[t+6]=s,Zt[r+14]=c,Zt[r+15]=te,n+rt}else{const s=e.left,c=e.right,a=e.splitAxis;let f;if(f=ge(n+rt,s),f/4>ui)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return Ct[t+6]=f/4,f=ge(f,c),Ct[t+7]=a,f}}function di(n,e){const t=(n.index?n.index.count:n.attributes.position.count)/3,r=t>2**16,i=r?4:2,o=e?new SharedArrayBuffer(t*i):new ArrayBuffer(t*i),s=r?new Uint32Array(o):new Uint16Array(o);for(let c=0,a=s.length;c<a;c++)s[c]=c;return s}function pi(n,e,t,r,i){const{maxDepth:o,verbose:s,maxLeafTris:c,strategy:a,onProgress:f,indirect:u}=i,d=n._indirectBuffer,l=n.geometry,p=l.index?l.index.array:null,v=u?li:ai,w=bt(l),h=new Float32Array(6);let m=!1;const y=new ce;return oe(e,t,r,y.boundingData,h),b(y,t,r,h),y;function x(g){f&&f(g/w)}function b(g,A,M,B=null,P=0){if(!m&&P>=o&&(m=!0,s&&(console.warn(`MeshBVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`),console.warn(l))),M<=c||P>=o)return x(A+M),g.offset=A,g.count=M,g;const D=oi(g.boundingData,B,e,A,M,a);if(D.axis===-1)return x(A+M),g.offset=A,g.count=M,g;const S=v(d,p,e,A,M,D);if(S===A||S===A+M)x(A+M),g.offset=A,g.count=M;else{g.splitAxis=D.axis;const T=new ce,I=A,F=S-A;g.left=T,oe(e,I,F,T.boundingData,h),b(T,I,F,h,P+1);const E=new ce,N=S,tt=M-F;g.right=E,oe(e,N,tt,E.boundingData,h),b(E,N,tt,h,P+1)}return g}}function mi(n,e){const t=n.geometry;e.indirect&&(n._indirectBuffer=di(t,e.useSharedArrayBuffer),ii(t,e.range)&&!e.verbose&&console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),n._indirectBuffer||ni(t,e);const r=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=ri(t),o=e.indirect?nn(t,e.range):rn(t,e.range);n._roots=o.map(s=>{const c=pi(n,i,s.offset,s.count,e),a=xe(c),f=new r(rt*a);return fi(0,c,f),f})}class J{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let r=1/0,i=-1/0;for(let o=0,s=e.length;o<s;o++){const a=e[o][t];r=a<r?a:r,i=a>i?a:i}this.min=r,this.max=i}setFromPoints(e,t){let r=1/0,i=-1/0;for(let o=0,s=t.length;o<s;o++){const c=t[o],a=e.dot(c);r=a<r?a:r,i=a>i?a:i}this.min=r,this.max=i}isSeparated(e){return this.min>e.max||e.min>this.max}}J.prototype.setFromBox=(function(){const n=new C;return function(t,r){const i=r.min,o=r.max;let s=1/0,c=-1/0;for(let a=0;a<=1;a++)for(let f=0;f<=1;f++)for(let u=0;u<=1;u++){n.x=i.x*a+o.x*(1-a),n.y=i.y*f+o.y*(1-f),n.z=i.z*u+o.z*(1-u);const d=t.dot(n);s=Math.min(d,s),c=Math.max(d,c)}this.min=s,this.max=c}})();const yi=(function(){const n=new C,e=new C,t=new C;return function(i,o,s){const c=i.start,a=n,f=o.start,u=e;t.subVectors(c,f),n.subVectors(i.end,i.start),e.subVectors(o.end,o.start);const d=t.dot(u),l=u.dot(a),p=u.dot(u),v=t.dot(a),h=a.dot(a)*p-l*l;let m,y;h!==0?m=(d*l-v*p)/h:m=0,y=(d+m*l)/p,s.x=m,s.y=y}})(),Se=(function(){const n=new lt,e=new C,t=new C;return function(i,o,s,c){yi(i,o,n);let a=n.x,f=n.y;if(a>=0&&a<=1&&f>=0&&f<=1){i.at(a,s),o.at(f,c);return}else if(a>=0&&a<=1){f<0?o.at(0,c):o.at(1,c),i.closestPointToPoint(c,!0,s);return}else if(f>=0&&f<=1){a<0?i.at(0,s):i.at(1,s),o.closestPointToPoint(s,!0,c);return}else{let u;a<0?u=i.start:u=i.end;let d;f<0?d=o.start:d=o.end;const l=e,p=t;if(i.closestPointToPoint(d,!0,e),o.closestPointToPoint(u,!0,t),l.distanceToSquared(d)<=p.distanceToSquared(u)){s.copy(l),c.copy(d);return}else{s.copy(u),c.copy(p);return}}}})(),hi=(function(){const n=new C,e=new C,t=new Ze,r=new Z;return function(o,s){const{radius:c,center:a}=o,{a:f,b:u,c:d}=s;if(r.start=f,r.end=u,r.closestPointToPoint(a,!0,n).distanceTo(a)<=c||(r.start=f,r.end=d,r.closestPointToPoint(a,!0,n).distanceTo(a)<=c)||(r.start=u,r.end=d,r.closestPointToPoint(a,!0,n).distanceTo(a)<=c))return!0;const w=s.getPlane(t);if(Math.abs(w.distanceToPoint(a))<=c){const m=w.projectPoint(a,e);if(s.containsPoint(m))return!0}return!1}})(),xi=1e-15;function ae(n){return Math.abs(n)<xi}class W extends xt{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new C),this.satBounds=new Array(4).fill().map(()=>new J),this.points=[this.a,this.b,this.c],this.sphere=new Un,this.plane=new Ze,this.needsUpdate=!0}intersectsSphere(e){return hi(e,this)}update(){const e=this.a,t=this.b,r=this.c,i=this.points,o=this.satAxes,s=this.satBounds,c=o[0],a=s[0];this.getNormal(c),a.setFromPoints(c,i);const f=o[1],u=s[1];f.subVectors(e,t),u.setFromPoints(f,i);const d=o[2],l=s[2];d.subVectors(t,r),l.setFromPoints(d,i);const p=o[3],v=s[3];p.subVectors(r,e),v.setFromPoints(p,i),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(c,e),this.needsUpdate=!1}}W.prototype.closestPointToSegment=(function(){const n=new C,e=new C,t=new Z;return function(i,o=null,s=null){const{start:c,end:a}=i,f=this.points;let u,d=1/0;for(let l=0;l<3;l++){const p=(l+1)%3;t.start.copy(f[l]),t.end.copy(f[p]),Se(t,i,n,e),u=n.distanceToSquared(e),u<d&&(d=u,o&&o.copy(n),s&&s.copy(e))}return this.closestPointToPoint(c,n),u=c.distanceToSquared(n),u<d&&(d=u,o&&o.copy(n),s&&s.copy(c)),this.closestPointToPoint(a,n),u=a.distanceToSquared(n),u<d&&(d=u,o&&o.copy(n),s&&s.copy(a)),Math.sqrt(d)}})();W.prototype.intersectsTriangle=(function(){const n=new W,e=new Array(3),t=new Array(3),r=new J,i=new J,o=new C,s=new C,c=new C,a=new C,f=new C,u=new Z,d=new Z,l=new Z,p=new C;function v(w,h,m){const y=w.points;let x=0,b=-1;for(let g=0;g<3;g++){const{start:A,end:M}=u;A.copy(y[g]),M.copy(y[(g+1)%3]),u.delta(s);const B=ae(h.distanceToPoint(A));if(ae(h.normal.dot(s))&&B){m.copy(u),x=2;break}const P=h.intersectLine(u,p);if(!P&&B&&p.copy(A),(P||B)&&!ae(p.distanceTo(M))){if(x<=1)(x===1?m.start:m.end).copy(p),B&&(b=x);else if(x>=2){(b===1?m.start:m.end).copy(p),x=2;break}if(x++,x===2&&b===-1)break}}return x}return function(h,m=null,y=!1){this.needsUpdate&&this.update(),h.isExtendedTriangle?h.needsUpdate&&h.update():(n.copy(h),n.update(),h=n);const x=this.plane,b=h.plane;if(Math.abs(x.normal.dot(b.normal))>1-1e-10){const g=this.satBounds,A=this.satAxes;t[0]=h.a,t[1]=h.b,t[2]=h.c;for(let P=0;P<4;P++){const D=g[P],S=A[P];if(r.setFromPoints(S,t),D.isSeparated(r))return!1}const M=h.satBounds,B=h.satAxes;e[0]=this.a,e[1]=this.b,e[2]=this.c;for(let P=0;P<4;P++){const D=M[P],S=B[P];if(r.setFromPoints(S,e),D.isSeparated(r))return!1}for(let P=0;P<4;P++){const D=A[P];for(let S=0;S<4;S++){const T=B[S];if(o.crossVectors(D,T),r.setFromPoints(o,e),i.setFromPoints(o,t),r.isSeparated(i))return!1}}return m&&(y||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),m.start.set(0,0,0),m.end.set(0,0,0)),!0}else{const g=v(this,b,d);if(g===1&&h.containsPoint(d.end))return m&&(m.start.copy(d.end),m.end.copy(d.end)),!0;if(g!==2)return!1;const A=v(h,x,l);if(A===1&&this.containsPoint(l.end))return m&&(m.start.copy(l.end),m.end.copy(l.end)),!0;if(A!==2)return!1;if(d.delta(c),l.delta(a),c.dot(a)<0){let I=l.start;l.start=l.end,l.end=I}const M=d.start.dot(c),B=d.end.dot(c),P=l.start.dot(c),D=l.end.dot(c),S=B<P,T=M<D;return M!==D&&P!==B&&S===T?!1:(m&&(f.subVectors(d.start,l.start),f.dot(c)>0?m.start.copy(d.start):m.start.copy(l.start),f.subVectors(d.end,l.end),f.dot(c)<0?m.end.copy(d.end):m.end.copy(l.end)),!0)}}})();W.prototype.distanceToPoint=(function(){const n=new C;return function(t){return this.closestPointToPoint(t,n),t.distanceTo(n)}})();W.prototype.distanceToTriangle=(function(){const n=new C,e=new C,t=["a","b","c"],r=new Z,i=new Z;return function(s,c=null,a=null){const f=c||a?r:null;if(this.intersectsTriangle(s,f))return(c||a)&&(c&&f.getCenter(c),a&&f.getCenter(a)),0;let u=1/0;for(let d=0;d<3;d++){let l;const p=t[d],v=s[p];this.closestPointToPoint(v,n),l=v.distanceToSquared(n),l<u&&(u=l,c&&c.copy(n),a&&a.copy(v));const w=this[p];s.closestPointToPoint(w,n),l=w.distanceToSquared(n),l<u&&(u=l,c&&c.copy(w),a&&a.copy(n))}for(let d=0;d<3;d++){const l=t[d],p=t[(d+1)%3];r.set(this[l],this[p]);for(let v=0;v<3;v++){const w=t[v],h=t[(v+1)%3];i.set(s[w],s[h]),Se(r,i,n,e);const m=n.distanceToSquared(e);m<u&&(u=m,c&&c.copy(n),a&&a.copy(e))}}return Math.sqrt(u)}})();class V{constructor(e,t,r){this.isOrientedBox=!0,this.min=new C,this.max=new C,this.matrix=new Q,this.invMatrix=new Q,this.points=new Array(8).fill().map(()=>new C),this.satAxes=new Array(3).fill().map(()=>new C),this.satBounds=new Array(3).fill().map(()=>new J),this.alignedSatBounds=new Array(3).fill().map(()=>new J),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),r&&this.matrix.copy(r)}set(e,t,r){this.min.copy(e),this.max.copy(t),this.matrix.copy(r),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}}V.prototype.update=(function(){return function(){const e=this.matrix,t=this.min,r=this.max,i=this.points;for(let f=0;f<=1;f++)for(let u=0;u<=1;u++)for(let d=0;d<=1;d++){const l=1*f|2*u|4*d,p=i[l];p.x=f?r.x:t.x,p.y=u?r.y:t.y,p.z=d?r.z:t.z,p.applyMatrix4(e)}const o=this.satBounds,s=this.satAxes,c=i[0];for(let f=0;f<3;f++){const u=s[f],d=o[f],l=1<<f,p=i[l];u.subVectors(c,p),d.setFromPoints(u,i)}const a=this.alignedSatBounds;a[0].setFromPointsField(i,"x"),a[1].setFromPointsField(i,"y"),a[2].setFromPointsField(i,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();V.prototype.intersectsBox=(function(){const n=new J;return function(t){this.needsUpdate&&this.update();const r=t.min,i=t.max,o=this.satBounds,s=this.satAxes,c=this.alignedSatBounds;if(n.min=r.x,n.max=i.x,c[0].isSeparated(n)||(n.min=r.y,n.max=i.y,c[1].isSeparated(n))||(n.min=r.z,n.max=i.z,c[2].isSeparated(n)))return!1;for(let a=0;a<3;a++){const f=s[a],u=o[a];if(n.setFromBox(f,t),u.isSeparated(n))return!1}return!0}})();V.prototype.intersectsTriangle=(function(){const n=new W,e=new Array(3),t=new J,r=new J,i=new C;return function(s){this.needsUpdate&&this.update(),s.isExtendedTriangle?s.needsUpdate&&s.update():(n.copy(s),n.update(),s=n);const c=this.satBounds,a=this.satAxes;e[0]=s.a,e[1]=s.b,e[2]=s.c;for(let l=0;l<3;l++){const p=c[l],v=a[l];if(t.setFromPoints(v,e),p.isSeparated(t))return!1}const f=s.satBounds,u=s.satAxes,d=this.points;for(let l=0;l<3;l++){const p=f[l],v=u[l];if(t.setFromPoints(v,d),p.isSeparated(t))return!1}for(let l=0;l<3;l++){const p=a[l];for(let v=0;v<4;v++){const w=u[v];if(i.crossVectors(p,w),t.setFromPoints(i,e),r.setFromPoints(i,d),t.isSeparated(r))return!1}}return!0}})();V.prototype.closestPointToPoint=(function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}})();V.prototype.distanceToPoint=(function(){const n=new C;return function(t){return this.closestPointToPoint(t,n),t.distanceTo(n)}})();V.prototype.distanceToBox=(function(){const n=["x","y","z"],e=new Array(12).fill().map(()=>new Z),t=new Array(12).fill().map(()=>new Z),r=new C,i=new C;return function(s,c=0,a=null,f=null){if(this.needsUpdate&&this.update(),this.intersectsBox(s))return(a||f)&&(s.getCenter(i),this.closestPointToPoint(i,r),s.closestPointToPoint(r,i),a&&a.copy(r),f&&f.copy(i)),0;const u=c*c,d=s.min,l=s.max,p=this.points;let v=1/0;for(let h=0;h<8;h++){const m=p[h];i.copy(m).clamp(d,l);const y=m.distanceToSquared(i);if(y<v&&(v=y,a&&a.copy(m),f&&f.copy(i),y<u))return Math.sqrt(y)}let w=0;for(let h=0;h<3;h++)for(let m=0;m<=1;m++)for(let y=0;y<=1;y++){const x=(h+1)%3,b=(h+2)%3,g=m<<x|y<<b,A=1<<h|m<<x|y<<b,M=p[g],B=p[A];e[w].set(M,B);const D=n[h],S=n[x],T=n[b],I=t[w],F=I.start,E=I.end;F[D]=d[D],F[S]=m?d[S]:l[S],F[T]=y?d[T]:l[S],E[D]=l[D],E[S]=m?d[S]:l[S],E[T]=y?d[T]:l[S],w++}for(let h=0;h<=1;h++)for(let m=0;m<=1;m++)for(let y=0;y<=1;y++){i.x=h?l.x:d.x,i.y=m?l.y:d.y,i.z=y?l.z:d.z,this.closestPointToPoint(i,r);const x=i.distanceToSquared(r);if(x<v&&(v=x,a&&a.copy(r),f&&f.copy(i),x<u))return Math.sqrt(x)}for(let h=0;h<12;h++){const m=e[h];for(let y=0;y<12;y++){const x=t[y];Se(m,x,r,i);const b=r.distanceToSquared(i);if(b<v&&(v=b,a&&a.copy(r),f&&f.copy(i),b<u))return Math.sqrt(b)}}return Math.sqrt(v)}})();class Ie{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){const e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}}class gi extends Ie{constructor(){super(()=>new W)}}const G=new gi;class vi{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const e=[];let t=null;this.setBuffer=r=>{t&&e.push(t),t=r,this.float32Array=new Float32Array(r),this.uint16Array=new Uint16Array(r),this.uint32Array=new Uint32Array(r)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}}const R=new vi;let it,vt;const ut=[],Lt=new Ie(()=>new X);function wi(n,e,t,r,i,o){it=Lt.getPrimitive(),vt=Lt.getPrimitive(),ut.push(it,vt),R.setBuffer(n._roots[e]);const s=ve(0,n.geometry,t,r,i,o);R.clearBuffer(),Lt.releasePrimitive(it),Lt.releasePrimitive(vt),ut.pop(),ut.pop();const c=ut.length;return c>0&&(vt=ut[c-1],it=ut[c-2]),s}function ve(n,e,t,r,i=null,o=0,s=0){const{float32Array:c,uint16Array:a,uint32Array:f}=R;let u=n*2;if(L(u,a)){const l=k(n,f),p=H(u,a);return U(n,c,it),r(l,p,!1,s,o+n,it)}else{let D=function(T){const{uint16Array:I,uint32Array:F}=R;let E=T*2;for(;!L(E,I);)T=O(T),E=T*2;return k(T,F)},S=function(T){const{uint16Array:I,uint32Array:F}=R;let E=T*2;for(;!L(E,I);)T=q(T,F),E=T*2;return k(T,F)+H(E,I)};const l=O(n),p=q(n,f);let v=l,w=p,h,m,y,x;if(i&&(y=it,x=vt,U(v,c,y),U(w,c,x),h=i(y),m=i(x),m<h)){v=p,w=l;const T=h;h=m,m=T,y=x}y||(y=it,U(v,c,y));const b=L(v*2,a),g=t(y,b,h,s+1,o+v);let A;if(g===Re){const T=D(v),F=S(v)-T;A=r(T,F,!0,s+1,o+v,y)}else A=g&&ve(v,e,t,r,i,o,s+1);if(A)return!0;x=vt,U(w,c,x);const M=L(w*2,a),B=t(x,M,m,s+1,o+w);let P;if(B===Re){const T=D(w),F=S(w)-T;P=r(T,F,!0,s+1,o+w,x)}else P=B&&ve(w,e,t,r,i,o,s+1);return!!P}}const Bt=new C,le=new C;function bi(n,e,t={},r=0,i=1/0){const o=r*r,s=i*i;let c=1/0,a=null;if(n.shapecast({boundsTraverseOrder:u=>(Bt.copy(e).clamp(u.min,u.max),Bt.distanceToSquared(e)),intersectsBounds:(u,d,l)=>l<c&&l<s,intersectsTriangle:(u,d)=>{u.closestPointToPoint(e,Bt);const l=e.distanceToSquared(Bt);return l<c&&(le.copy(Bt),c=l,a=d),l<o}}),c===1/0)return null;const f=Math.sqrt(c);return t.point?t.point.copy(le):t.point=le.clone(),t.distance=f,t.faceIndex=a,t}const Ai=parseInt(jn)>=169,ot=new C,ct=new C,at=new C,Vt=new lt,kt=new lt,Ht=new lt,Ve=new C,ke=new C,He=new C,Tt=new C;function Mi(n,e,t,r,i,o,s,c){let a;if(o===Nn?a=n.intersectTriangle(r,t,e,!0,i):a=n.intersectTriangle(e,t,r,o!==_e,i),a===null)return null;const f=n.origin.distanceTo(i);return f<s||f>c?null:{distance:f,point:i.clone()}}function Pi(n,e,t,r,i,o,s,c,a,f,u){ot.fromBufferAttribute(e,o),ct.fromBufferAttribute(e,s),at.fromBufferAttribute(e,c);const d=Mi(n,ot,ct,at,Tt,a,f,u);if(d){const l=new C;xt.getBarycoord(Tt,ot,ct,at,l),r&&(Vt.fromBufferAttribute(r,o),kt.fromBufferAttribute(r,s),Ht.fromBufferAttribute(r,c),d.uv=xt.getInterpolation(Tt,ot,ct,at,Vt,kt,Ht,new lt)),i&&(Vt.fromBufferAttribute(i,o),kt.fromBufferAttribute(i,s),Ht.fromBufferAttribute(i,c),d.uv1=xt.getInterpolation(Tt,ot,ct,at,Vt,kt,Ht,new lt)),t&&(Ve.fromBufferAttribute(t,o),ke.fromBufferAttribute(t,s),He.fromBufferAttribute(t,c),d.normal=xt.getInterpolation(Tt,ot,ct,at,Ve,ke,He,new C),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const p={a:o,b:s,c,normal:new C,materialIndex:0};xt.getNormal(ot,ct,at,p.normal),d.face=p,d.faceIndex=o,Ai&&(d.barycoord=l)}return d}function ee(n,e,t,r,i,o,s){const c=r*3;let a=c+0,f=c+1,u=c+2;const d=n.index;n.index&&(a=d.getX(a),f=d.getX(f),u=d.getX(u));const{position:l,normal:p,uv:v,uv1:w}=n.attributes,h=Pi(t,l,p,v,w,a,f,u,e,o,s);return h?(h.faceIndex=r,i&&i.push(h),h):null}function j(n,e,t,r){const i=n.a,o=n.b,s=n.c;let c=e,a=e+1,f=e+2;t&&(c=t.getX(c),a=t.getX(a),f=t.getX(f)),i.x=r.getX(c),i.y=r.getY(c),i.z=r.getZ(c),o.x=r.getX(a),o.y=r.getY(a),o.z=r.getZ(a),s.x=r.getX(f),s.y=r.getY(f),s.z=r.getZ(f)}function Bi(n,e,t,r,i,o,s,c){const{geometry:a,_indirectBuffer:f}=n;for(let u=r,d=r+i;u<d;u++)ee(a,e,t,u,o,s,c)}function Ti(n,e,t,r,i,o,s){const{geometry:c,_indirectBuffer:a}=n;let f=1/0,u=null;for(let d=r,l=r+i;d<l;d++){let p;p=ee(c,e,t,d,null,o,s),p&&p.distance<f&&(u=p,f=p.distance)}return u}function _i(n,e,t,r,i,o,s){const{geometry:c}=t,{index:a}=c,f=c.attributes.position;for(let u=n,d=e+n;u<d;u++){let l;if(l=u,j(s,l*3,a,f),s.needsUpdate=!0,r(s,l,i,o))return!0}return!1}function Di(n,e=null){e&&Array.isArray(e)&&(e=new Set(e));const t=n.geometry,r=t.index?t.index.array:null,i=t.attributes.position;let o,s,c,a,f=0;const u=n._roots;for(let l=0,p=u.length;l<p;l++)o=u[l],s=new Uint32Array(o),c=new Uint16Array(o),a=new Float32Array(o),d(0,f),f+=o.byteLength;function d(l,p,v=!1){const w=l*2;if(c[w+15]===te){const m=s[l+6],y=c[w+14];let x=1/0,b=1/0,g=1/0,A=-1/0,M=-1/0,B=-1/0;for(let P=3*m,D=3*(m+y);P<D;P++){let S=r[P];const T=i.getX(S),I=i.getY(S),F=i.getZ(S);T<x&&(x=T),T>A&&(A=T),I<b&&(b=I),I>M&&(M=I),F<g&&(g=F),F>B&&(B=F)}return a[l+0]!==x||a[l+1]!==b||a[l+2]!==g||a[l+3]!==A||a[l+4]!==M||a[l+5]!==B?(a[l+0]=x,a[l+1]=b,a[l+2]=g,a[l+3]=A,a[l+4]=M,a[l+5]=B,!0):!1}else{const m=l+8,y=s[l+6],x=m+p,b=y+p;let g=v,A=!1,M=!1;e?g||(A=e.has(x),M=e.has(b),g=!A&&!M):(A=!0,M=!0);const B=g||A,P=g||M;let D=!1;B&&(D=d(m,p,g));let S=!1;P&&(S=d(y,p,g));const T=D||S;if(T)for(let I=0;I<3;I++){const F=m+I,E=y+I,N=a[F],tt=a[F+3],At=a[E],Mt=a[E+3];a[l+I]=N<At?N:At,a[l+I+3]=tt>Mt?tt:Mt}return T}}}function st(n,e,t,r,i){let o,s,c,a,f,u;const d=1/t.direction.x,l=1/t.direction.y,p=1/t.direction.z,v=t.origin.x,w=t.origin.y,h=t.origin.z;let m=e[n],y=e[n+3],x=e[n+1],b=e[n+3+1],g=e[n+2],A=e[n+3+2];return d>=0?(o=(m-v)*d,s=(y-v)*d):(o=(y-v)*d,s=(m-v)*d),l>=0?(c=(x-w)*l,a=(b-w)*l):(c=(b-w)*l,a=(x-w)*l),o>a||c>s||((c>o||isNaN(o))&&(o=c),(a<s||isNaN(s))&&(s=a),p>=0?(f=(g-h)*p,u=(A-h)*p):(f=(A-h)*p,u=(g-h)*p),o>u||f>s)?!1:((f>o||o!==o)&&(o=f),(u<s||s!==s)&&(s=u),o<=i&&s>=r)}function Si(n,e,t,r,i,o,s,c){const{geometry:a,_indirectBuffer:f}=n;for(let u=r,d=r+i;u<d;u++){let l=f?f[u]:u;ee(a,e,t,l,o,s,c)}}function Ii(n,e,t,r,i,o,s){const{geometry:c,_indirectBuffer:a}=n;let f=1/0,u=null;for(let d=r,l=r+i;d<l;d++){let p;p=ee(c,e,t,a?a[d]:d,null,o,s),p&&p.distance<f&&(u=p,f=p.distance)}return u}function Ci(n,e,t,r,i,o,s){const{geometry:c}=t,{index:a}=c,f=c.attributes.position;for(let u=n,d=e+n;u<d;u++){let l;if(l=t.resolveTriangleIndex(u),j(s,l*3,a,f),s.needsUpdate=!0,r(s,l,i,o))return!0}return!1}function Fi(n,e,t,r,i,o,s){R.setBuffer(n._roots[e]),we(0,n,t,r,i,o,s),R.clearBuffer()}function we(n,e,t,r,i,o,s){const{float32Array:c,uint16Array:a,uint32Array:f}=R,u=n*2;if(L(u,a)){const l=k(n,f),p=H(u,a);Bi(e,t,r,l,p,i,o,s)}else{const l=O(n);st(l,c,r,o,s)&&we(l,e,t,r,i,o,s);const p=q(n,f);st(p,c,r,o,s)&&we(p,e,t,r,i,o,s)}}const Ei=["x","y","z"];function zi(n,e,t,r,i,o){R.setBuffer(n._roots[e]);const s=be(0,n,t,r,i,o);return R.clearBuffer(),s}function be(n,e,t,r,i,o){const{float32Array:s,uint16Array:c,uint32Array:a}=R;let f=n*2;if(L(f,c)){const d=k(n,a),l=H(f,c);return Ti(e,t,r,d,l,i,o)}else{const d=De(n,a),l=Ei[d],v=r.direction[l]>=0;let w,h;v?(w=O(n),h=q(n,a)):(w=q(n,a),h=O(n));const y=st(w,s,r,i,o)?be(w,e,t,r,i,o):null;if(y){const g=y.point[l];if(v?g<=s[h+d]:g>=s[h+d+3])return y}const b=st(h,s,r,i,o)?be(h,e,t,r,i,o):null;return y&&b?y.distance<=b.distance?y:b:y||b||null}}const qt=new X,ft=new W,dt=new W,_t=new Q,qe=new V,Ot=new V;function Ri(n,e,t,r){R.setBuffer(n._roots[e]);const i=Ae(0,n,t,r);return R.clearBuffer(),i}function Ae(n,e,t,r,i=null){const{float32Array:o,uint16Array:s,uint32Array:c}=R;let a=n*2;if(i===null&&(t.boundingBox||t.computeBoundingBox(),qe.set(t.boundingBox.min,t.boundingBox.max,r),i=qe),L(a,s)){const u=e.geometry,d=u.index,l=u.attributes.position,p=t.index,v=t.attributes.position,w=k(n,c),h=H(a,s);if(_t.copy(r).invert(),t.boundsTree)return U(n,o,Ot),Ot.matrix.copy(_t),Ot.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:y=>Ot.intersectsBox(y),intersectsTriangle:y=>{y.a.applyMatrix4(r),y.b.applyMatrix4(r),y.c.applyMatrix4(r),y.needsUpdate=!0;for(let x=w*3,b=(h+w)*3;x<b;x+=3)if(j(dt,x,d,l),dt.needsUpdate=!0,y.intersectsTriangle(dt))return!0;return!1}});for(let m=w*3,y=(h+w)*3;m<y;m+=3){j(ft,m,d,l),ft.a.applyMatrix4(_t),ft.b.applyMatrix4(_t),ft.c.applyMatrix4(_t),ft.needsUpdate=!0;for(let x=0,b=p.count;x<b;x+=3)if(j(dt,x,p,v),dt.needsUpdate=!0,ft.intersectsTriangle(dt))return!0}}else{const u=n+8,d=c[n+6];return U(u,o,qt),!!(i.intersectsBox(qt)&&Ae(u,e,t,r,i)||(U(d,o,qt),i.intersectsBox(qt)&&Ae(d,e,t,r,i)))}}const Gt=new Q,ue=new V,Dt=new V,Ui=new C,Ni=new C,ji=new C,Li=new C;function Vi(n,e,t,r={},i={},o=0,s=1/0){e.boundingBox||e.computeBoundingBox(),ue.set(e.boundingBox.min,e.boundingBox.max,t),ue.needsUpdate=!0;const c=n.geometry,a=c.attributes.position,f=c.index,u=e.attributes.position,d=e.index,l=G.getPrimitive(),p=G.getPrimitive();let v=Ui,w=Ni,h=null,m=null;i&&(h=ji,m=Li);let y=1/0,x=null,b=null;return Gt.copy(t).invert(),Dt.matrix.copy(Gt),n.shapecast({boundsTraverseOrder:g=>ue.distanceToBox(g),intersectsBounds:(g,A,M)=>M<y&&M<s?(A&&(Dt.min.copy(g.min),Dt.max.copy(g.max),Dt.needsUpdate=!0),!0):!1,intersectsRange:(g,A)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:B=>Dt.distanceToBox(B),intersectsBounds:(B,P,D)=>D<y&&D<s,intersectsRange:(B,P)=>{for(let D=B,S=B+P;D<S;D++){j(p,3*D,d,u),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let T=g,I=g+A;T<I;T++){j(l,3*T,f,a),l.needsUpdate=!0;const F=l.distanceToTriangle(p,v,h);if(F<y&&(w.copy(v),m&&m.copy(h),y=F,x=T,b=D),F<o)return!0}}}});{const M=bt(e);for(let B=0,P=M;B<P;B++){j(p,3*B,d,u),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let D=g,S=g+A;D<S;D++){j(l,3*D,f,a),l.needsUpdate=!0;const T=l.distanceToTriangle(p,v,h);if(T<y&&(w.copy(v),m&&m.copy(h),y=T,x=D,b=B),T<o)return!0}}}}}),G.releasePrimitive(l),G.releasePrimitive(p),y===1/0?null:(r.point?r.point.copy(w):r.point=w.clone(),r.distance=y,r.faceIndex=x,i&&(i.point?i.point.copy(m):i.point=m.clone(),i.point.applyMatrix4(Gt),w.applyMatrix4(Gt),i.distance=w.sub(i.point).length(),i.faceIndex=b),r)}function ki(n,e=null){e&&Array.isArray(e)&&(e=new Set(e));const t=n.geometry,r=t.index?t.index.array:null,i=t.attributes.position;let o,s,c,a,f=0;const u=n._roots;for(let l=0,p=u.length;l<p;l++)o=u[l],s=new Uint32Array(o),c=new Uint16Array(o),a=new Float32Array(o),d(0,f),f+=o.byteLength;function d(l,p,v=!1){const w=l*2;if(c[w+15]===te){const m=s[l+6],y=c[w+14];let x=1/0,b=1/0,g=1/0,A=-1/0,M=-1/0,B=-1/0;for(let P=m,D=m+y;P<D;P++){const S=3*n.resolveTriangleIndex(P);for(let T=0;T<3;T++){let I=S+T;I=r?r[I]:I;const F=i.getX(I),E=i.getY(I),N=i.getZ(I);F<x&&(x=F),F>A&&(A=F),E<b&&(b=E),E>M&&(M=E),N<g&&(g=N),N>B&&(B=N)}}return a[l+0]!==x||a[l+1]!==b||a[l+2]!==g||a[l+3]!==A||a[l+4]!==M||a[l+5]!==B?(a[l+0]=x,a[l+1]=b,a[l+2]=g,a[l+3]=A,a[l+4]=M,a[l+5]=B,!0):!1}else{const m=l+8,y=s[l+6],x=m+p,b=y+p;let g=v,A=!1,M=!1;e?g||(A=e.has(x),M=e.has(b),g=!A&&!M):(A=!0,M=!0);const B=g||A,P=g||M;let D=!1;B&&(D=d(m,p,g));let S=!1;P&&(S=d(y,p,g));const T=D||S;if(T)for(let I=0;I<3;I++){const F=m+I,E=y+I,N=a[F],tt=a[F+3],At=a[E],Mt=a[E+3];a[l+I]=N<At?N:At,a[l+I+3]=tt>Mt?tt:Mt}return T}}}function Hi(n,e,t,r,i,o,s){R.setBuffer(n._roots[e]),Me(0,n,t,r,i,o,s),R.clearBuffer()}function Me(n,e,t,r,i,o,s){const{float32Array:c,uint16Array:a,uint32Array:f}=R,u=n*2;if(L(u,a)){const l=k(n,f),p=H(u,a);Si(e,t,r,l,p,i,o,s)}else{const l=O(n);st(l,c,r,o,s)&&Me(l,e,t,r,i,o,s);const p=q(n,f);st(p,c,r,o,s)&&Me(p,e,t,r,i,o,s)}}const qi=["x","y","z"];function Oi(n,e,t,r,i,o){R.setBuffer(n._roots[e]);const s=Pe(0,n,t,r,i,o);return R.clearBuffer(),s}function Pe(n,e,t,r,i,o){const{float32Array:s,uint16Array:c,uint32Array:a}=R;let f=n*2;if(L(f,c)){const d=k(n,a),l=H(f,c);return Ii(e,t,r,d,l,i,o)}else{const d=De(n,a),l=qi[d],v=r.direction[l]>=0;let w,h;v?(w=O(n),h=q(n,a)):(w=q(n,a),h=O(n));const y=st(w,s,r,i,o)?Pe(w,e,t,r,i,o):null;if(y){const g=y.point[l];if(v?g<=s[h+d]:g>=s[h+d+3])return y}const b=st(h,s,r,i,o)?Pe(h,e,t,r,i,o):null;return y&&b?y.distance<=b.distance?y:b:y||b||null}}const $t=new X,pt=new W,mt=new W,St=new Q,Oe=new V,Wt=new V;function Gi(n,e,t,r){R.setBuffer(n._roots[e]);const i=Be(0,n,t,r);return R.clearBuffer(),i}function Be(n,e,t,r,i=null){const{float32Array:o,uint16Array:s,uint32Array:c}=R;let a=n*2;if(i===null&&(t.boundingBox||t.computeBoundingBox(),Oe.set(t.boundingBox.min,t.boundingBox.max,r),i=Oe),L(a,s)){const u=e.geometry,d=u.index,l=u.attributes.position,p=t.index,v=t.attributes.position,w=k(n,c),h=H(a,s);if(St.copy(r).invert(),t.boundsTree)return U(n,o,Wt),Wt.matrix.copy(St),Wt.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:y=>Wt.intersectsBox(y),intersectsTriangle:y=>{y.a.applyMatrix4(r),y.b.applyMatrix4(r),y.c.applyMatrix4(r),y.needsUpdate=!0;for(let x=w,b=h+w;x<b;x++)if(j(mt,3*e.resolveTriangleIndex(x),d,l),mt.needsUpdate=!0,y.intersectsTriangle(mt))return!0;return!1}});for(let m=w,y=h+w;m<y;m++){const x=e.resolveTriangleIndex(m);j(pt,3*x,d,l),pt.a.applyMatrix4(St),pt.b.applyMatrix4(St),pt.c.applyMatrix4(St),pt.needsUpdate=!0;for(let b=0,g=p.count;b<g;b+=3)if(j(mt,b,p,v),mt.needsUpdate=!0,pt.intersectsTriangle(mt))return!0}}else{const u=n+8,d=c[n+6];return U(u,o,$t),!!(i.intersectsBox($t)&&Be(u,e,t,r,i)||(U(d,o,$t),i.intersectsBox($t)&&Be(d,e,t,r,i)))}}const Xt=new Q,fe=new V,It=new V,$i=new C,Wi=new C,Xi=new C,Yi=new C;function Zi(n,e,t,r={},i={},o=0,s=1/0){e.boundingBox||e.computeBoundingBox(),fe.set(e.boundingBox.min,e.boundingBox.max,t),fe.needsUpdate=!0;const c=n.geometry,a=c.attributes.position,f=c.index,u=e.attributes.position,d=e.index,l=G.getPrimitive(),p=G.getPrimitive();let v=$i,w=Wi,h=null,m=null;i&&(h=Xi,m=Yi);let y=1/0,x=null,b=null;return Xt.copy(t).invert(),It.matrix.copy(Xt),n.shapecast({boundsTraverseOrder:g=>fe.distanceToBox(g),intersectsBounds:(g,A,M)=>M<y&&M<s?(A&&(It.min.copy(g.min),It.max.copy(g.max),It.needsUpdate=!0),!0):!1,intersectsRange:(g,A)=>{if(e.boundsTree){const M=e.boundsTree;return M.shapecast({boundsTraverseOrder:B=>It.distanceToBox(B),intersectsBounds:(B,P,D)=>D<y&&D<s,intersectsRange:(B,P)=>{for(let D=B,S=B+P;D<S;D++){const T=M.resolveTriangleIndex(D);j(p,3*T,d,u),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let I=g,F=g+A;I<F;I++){const E=n.resolveTriangleIndex(I);j(l,3*E,f,a),l.needsUpdate=!0;const N=l.distanceToTriangle(p,v,h);if(N<y&&(w.copy(v),m&&m.copy(h),y=N,x=I,b=D),N<o)return!0}}}})}else{const M=bt(e);for(let B=0,P=M;B<P;B++){j(p,3*B,d,u),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let D=g,S=g+A;D<S;D++){const T=n.resolveTriangleIndex(D);j(l,3*T,f,a),l.needsUpdate=!0;const I=l.distanceToTriangle(p,v,h);if(I<y&&(w.copy(v),m&&m.copy(h),y=I,x=D,b=B),I<o)return!0}}}}}),G.releasePrimitive(l),G.releasePrimitive(p),y===1/0?null:(r.point?r.point.copy(w):r.point=w.clone(),r.distance=y,r.faceIndex=x,i&&(i.point?i.point.copy(m):i.point=m.clone(),i.point.applyMatrix4(Xt),w.applyMatrix4(Xt),i.distance=w.sub(i.point).length(),i.faceIndex=b),r)}function Ki(){return typeof SharedArrayBuffer<"u"}const zt=new R.constructor,Qt=new R.constructor,nt=new Ie(()=>new X),yt=new X,ht=new X,de=new X,pe=new X;let me=!1;function Qi(n,e,t,r){if(me)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");me=!0;const i=n._roots,o=e._roots;let s,c=0,a=0;const f=new Q().copy(t).invert();for(let u=0,d=i.length;u<d;u++){zt.setBuffer(i[u]),a=0;const l=nt.getPrimitive();U(0,zt.float32Array,l),l.applyMatrix4(f);for(let p=0,v=o.length;p<v&&(Qt.setBuffer(o[p]),s=$(0,0,t,f,r,c,a,0,0,l),Qt.clearBuffer(),a+=o[p].length,!s);p++);if(nt.releasePrimitive(l),zt.clearBuffer(),c+=i[u].length,s)break}return me=!1,s}function $(n,e,t,r,i,o=0,s=0,c=0,a=0,f=null,u=!1){let d,l;u?(d=Qt,l=zt):(d=zt,l=Qt);const p=d.float32Array,v=d.uint32Array,w=d.uint16Array,h=l.float32Array,m=l.uint32Array,y=l.uint16Array,x=n*2,b=e*2,g=L(x,w),A=L(b,y);let M=!1;if(A&&g)u?M=i(k(e,m),H(e*2,y),k(n,v),H(n*2,w),a,s+e,c,o+n):M=i(k(n,v),H(n*2,w),k(e,m),H(e*2,y),c,o+n,a,s+e);else if(A){const B=nt.getPrimitive();U(e,h,B),B.applyMatrix4(t);const P=O(n),D=q(n,v);U(P,p,yt),U(D,p,ht);const S=B.intersectsBox(yt),T=B.intersectsBox(ht);M=S&&$(e,P,r,t,i,s,o,a,c+1,B,!u)||T&&$(e,D,r,t,i,s,o,a,c+1,B,!u),nt.releasePrimitive(B)}else{const B=O(e),P=q(e,m);U(B,h,de),U(P,h,pe);const D=f.intersectsBox(de),S=f.intersectsBox(pe);if(D&&S)M=$(n,B,t,r,i,o,s,c,a+1,f,u)||$(n,P,t,r,i,o,s,c,a+1,f,u);else if(D)if(g)M=$(n,B,t,r,i,o,s,c,a+1,f,u);else{const T=nt.getPrimitive();T.copy(de).applyMatrix4(t);const I=O(n),F=q(n,v);U(I,p,yt),U(F,p,ht);const E=T.intersectsBox(yt),N=T.intersectsBox(ht);M=E&&$(B,I,r,t,i,s,o,a,c+1,T,!u)||N&&$(B,F,r,t,i,s,o,a,c+1,T,!u),nt.releasePrimitive(T)}else if(S)if(g)M=$(n,P,t,r,i,o,s,c,a+1,f,u);else{const T=nt.getPrimitive();T.copy(pe).applyMatrix4(t);const I=O(n),F=q(n,v);U(I,p,yt),U(F,p,ht);const E=T.intersectsBox(yt),N=T.intersectsBox(ht);M=E&&$(P,I,r,t,i,s,o,a,c+1,T,!u)||N&&$(P,F,r,t,i,s,o,a,c+1,T,!u),nt.releasePrimitive(T)}}return M}const Yt=new V,Ge=new X,Ji={strategy:Qe,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null};class Ce{static serialize(e,t={}){t={cloneBuffers:!0,...t};const r=e.geometry,i=e._roots,o=e._indirectBuffer,s=r.getIndex();let c;return t.cloneBuffers?c={roots:i.map(a=>a.slice()),index:s?s.array.slice():null,indirectBuffer:o?o.slice():null}:c={roots:i,index:s?s.array:null,indirectBuffer:o},c}static deserialize(e,t,r={}){r={setIndex:!0,indirect:!!e.indirectBuffer,...r};const{index:i,roots:o,indirectBuffer:s}=e,c=new Ce(t,{...r,[se]:!0});if(c._roots=o,c._indirectBuffer=s||null,r.setIndex){const a=t.getIndex();if(a===null){const f=new Te(e.index,1,!1);t.setIndex(f)}else a.array!==i&&(a.array.set(i),a.needsUpdate=!0)}return c}get indirect(){return!!this._indirectBuffer}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(t=Object.assign({...Ji,[se]:!1},t),t.useSharedArrayBuffer&&!Ki())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=e,this._roots=null,this._indirectBuffer=null,t[se]||(mi(this,t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new X))),this.resolveTriangleIndex=t.indirect?r=>this._indirectBuffer[r]:r=>r}refit(e=null){return(this.indirect?ki:Di)(this,e)}traverse(e,t=0){const r=this._roots[t],i=new Uint32Array(r),o=new Uint16Array(r);s(0);function s(c,a=0){const f=c*2,u=o[f+15]===te;if(u){const d=i[c+6],l=o[f+14];e(a,u,new Float32Array(r,c*4,6),d,l)}else{const d=c+rt/4,l=i[c+6],p=i[c+7];e(a,u,new Float32Array(r,c*4,6),p)||(s(d,a+1),s(l,a+1))}}}raycast(e,t=Fe,r=0,i=1/0){const o=this._roots,s=this.geometry,c=[],a=t.isMaterial,f=Array.isArray(t),u=s.groups,d=a?t.side:t,l=this.indirect?Hi:Fi;for(let p=0,v=o.length;p<v;p++){const w=f?t[u[p].materialIndex].side:d,h=c.length;if(l(this,p,w,e,c,r,i),f){const m=u[p].materialIndex;for(let y=h,x=c.length;y<x;y++)c[y].face.materialIndex=m}}return c}raycastFirst(e,t=Fe,r=0,i=1/0){const o=this._roots,s=this.geometry,c=t.isMaterial,a=Array.isArray(t);let f=null;const u=s.groups,d=c?t.side:t,l=this.indirect?Oi:zi;for(let p=0,v=o.length;p<v;p++){const w=a?t[u[p].materialIndex].side:d,h=l(this,p,w,e,r,i);h!=null&&(f==null||h.distance<f.distance)&&(f=h,a&&(h.face.materialIndex=u[p].materialIndex))}return f}intersectsGeometry(e,t){let r=!1;const i=this._roots,o=this.indirect?Gi:Ri;for(let s=0,c=i.length;s<c&&(r=o(this,s,e,t),!r);s++);return r}shapecast(e){const t=G.getPrimitive(),r=this.indirect?Ci:_i;let{boundsTraverseOrder:i,intersectsBounds:o,intersectsRange:s,intersectsTriangle:c}=e;if(s&&c){const d=s;s=(l,p,v,w,h)=>d(l,p,v,w,h)?!0:r(l,p,this,c,v,w,t)}else s||(c?s=(d,l,p,v)=>r(d,l,this,c,p,v,t):s=(d,l,p)=>p);let a=!1,f=0;const u=this._roots;for(let d=0,l=u.length;d<l;d++){const p=u[d];if(a=wi(this,d,o,s,i,f),a)break;f+=p.byteLength}return G.releasePrimitive(t),a}bvhcast(e,t,r){let{intersectsRanges:i,intersectsTriangles:o}=r;const s=G.getPrimitive(),c=this.geometry.index,a=this.geometry.attributes.position,f=this.indirect?v=>{const w=this.resolveTriangleIndex(v);j(s,w*3,c,a)}:v=>{j(s,v*3,c,a)},u=G.getPrimitive(),d=e.geometry.index,l=e.geometry.attributes.position,p=e.indirect?v=>{const w=e.resolveTriangleIndex(v);j(u,w*3,d,l)}:v=>{j(u,v*3,d,l)};if(o){const v=(w,h,m,y,x,b,g,A)=>{for(let M=m,B=m+y;M<B;M++){p(M),u.a.applyMatrix4(t),u.b.applyMatrix4(t),u.c.applyMatrix4(t),u.needsUpdate=!0;for(let P=w,D=w+h;P<D;P++)if(f(P),s.needsUpdate=!0,o(s,u,P,M,x,b,g,A))return!0}return!1};if(i){const w=i;i=function(h,m,y,x,b,g,A,M){return w(h,m,y,x,b,g,A,M)?!0:v(h,m,y,x,b,g,A,M)}}else i=v}return Qi(this,e,t,i)}intersectsBox(e,t){return Yt.set(e.min,e.max,t),Yt.needsUpdate=!0,this.shapecast({intersectsBounds:r=>Yt.intersectsBox(r),intersectsTriangle:r=>Yt.intersectsTriangle(r)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,r={},i={},o=0,s=1/0){return(this.indirect?Zi:Vi)(this,e,t,r,i,o,s)}closestPointToPoint(e,t={},r=0,i=1/0){return bi(this,e,t,r,i)}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(r=>{U(0,new Float32Array(r),Ge),e.union(Ge)}),e}}function tr(n){switch(n){case 1:return"R";case 2:return"RG";case 3:return"RGBA";case 4:return"RGBA"}throw new Error}function er(n){switch(n){case 1:return qn;case 2:return Hn;case 3:return Kt;case 4:return Kt}}function $e(n){switch(n){case 1:return kn;case 2:return Ke;case 3:return he;case 4:return he}}class cn extends ye{constructor(){super(),this.minFilter=gt,this.magFilter=gt,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(e){const t=this.overrideItemSize,r=e.itemSize,i=e.count;if(t!==null){if(r*i%t!==0)throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");e.itemSize=t,e.count=i*r/t}const o=e.itemSize,s=e.count,c=e.normalized,a=e.array.constructor,f=a.BYTES_PER_ELEMENT;let u=this._forcedType,d=o;if(u===null)switch(a){case Float32Array:u=Et;break;case Uint8Array:case Uint16Array:case Uint32Array:u=Ft;break;case Int8Array:case Int16Array:case Int32Array:u=ie;break}let l,p,v,w,h=tr(o);switch(u){case Et:v=1,p=er(o),c&&f===1?(w=a,h+="8",a===Uint8Array?l=Ee:(l=ze,h+="_SNORM")):(w=Float32Array,h+="32F",l=Et);break;case ie:h+=f*8+"I",v=c?Math.pow(2,a.BYTES_PER_ELEMENT*8-1):1,p=$e(o),f===1?(w=Int8Array,l=ze):f===2?(w=Int16Array,l=Vn):(w=Int32Array,l=ie);break;case Ft:h+=f*8+"UI",v=c?Math.pow(2,a.BYTES_PER_ELEMENT*8-1):1,p=$e(o),f===1?(w=Uint8Array,l=Ee):f===2?(w=Uint16Array,l=Ln):(w=Uint32Array,l=Ft);break}d===3&&(p===Kt||p===he)&&(d=4);const m=Math.ceil(Math.sqrt(s))||1,y=d*m*m,x=new w(y),b=e.normalized;e.normalized=!1;for(let g=0;g<s;g++){const A=d*g;x[A]=e.getX(g)/v,o>=2&&(x[A+1]=e.getY(g)/v),o>=3&&(x[A+2]=e.getZ(g)/v,d===4&&(x[A+3]=1)),o>=4&&(x[A+3]=e.getW(g)/v)}e.normalized=b,this.internalFormat=h,this.format=p,this.type=l,this.image.width=m,this.image.height=m,this.image.data=x,this.needsUpdate=!0,this.dispose(),e.itemSize=r,e.count=i}}class nr extends cn{constructor(){super(),this._forcedType=Ft}}class ir extends cn{constructor(){super(),this._forcedType=Et}}class an{constructor(){this.index=new nr,this.position=new ir,this.bvhBounds=new ye,this.bvhContents=new ye,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(e){const{geometry:t}=e;if(sr(e,this.bvhBounds,this.bvhContents),this.position.updateFrom(t.attributes.position),e.indirect){const r=e._indirectBuffer;if(this._cachedIndexAttr===null||this._cachedIndexAttr.count!==r.length)if(t.index)this._cachedIndexAttr=t.index.clone();else{const i=en(tn(t));this._cachedIndexAttr=new Te(i,1,!1)}rr(t,r,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(t.index)}dispose(){const{index:e,position:t,bvhBounds:r,bvhContents:i}=this;e&&e.dispose(),t&&t.dispose(),r&&r.dispose(),i&&i.dispose()}}function rr(n,e,t){const r=t.array,i=n.index?n.index.array:null;for(let o=0,s=e.length;o<s;o++){const c=3*o,a=3*e[o];for(let f=0;f<3;f++)r[c+f]=i?i[a+f]:a+f}}function sr(n,e,t){const r=n._roots;if(r.length!==1)throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");const i=r[0],o=new Uint16Array(i),s=new Uint32Array(i),c=new Float32Array(i),a=i.byteLength/rt,f=2*Math.ceil(Math.sqrt(a/2)),u=new Float32Array(4*f*f),d=Math.ceil(Math.sqrt(a)),l=new Uint32Array(2*d*d);for(let p=0;p<a;p++){const v=p*rt/4,w=v*2,h=v;for(let m=0;m<3;m++)u[8*p+0+m]=c[h+0+m],u[8*p+4+m]=c[h+3+m];if(L(w,o)){const m=H(w,o),y=k(v,s),x=4294901760|m;l[p*2+0]=x,l[p*2+1]=y}else{const m=4*q(v,s)/rt,y=De(v,s);l[p*2+0]=y,l[p*2+1]=m}}e.image.data=u,e.image.width=f,e.image.height=f,e.format=Kt,e.type=Et,e.internalFormat="RGBA32F",e.minFilter=gt,e.magFilter=gt,e.generateMipmaps=!1,e.needsUpdate=!0,e.dispose(),t.image.data=l,t.image.width=d,t.image.height=d,t.format=Ke,t.type=Ft,t.internalFormat="RG32UI",t.minFilter=gt,t.magFilter=gt,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose()}const or=`

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
`,cr=`

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
`,ar=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`,lr=ar,ur=`
	${or}
	${cr}
`,fr=En({envMap:null,bounces:3,ior:2.4,correctMips:!0,aberrationStrength:.01,fresnel:0,bvh:new an,color:new On("white"),opacity:1,resolution:new lt,viewMatrixInverse:new Q,projectionMatrixInverse:new Q},`
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
  ${lr}
  ${ur}
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
    #include <${zn>=154?"colorspace_fragment":"encodings_fragment"}>
  }`),dr=n=>n&&n.isCubeTexture;function pr({aberrationStrength:n=0,fastChroma:e=!0,envMap:t,...r}){ln({MeshRefractionMaterial:fr});const i=z.useRef(null),{size:o}=Xe(),s=z.useMemo(()=>{var c,a;const f={},u=dr(t),l=((c=u?(a=t.image[0])==null?void 0:a.width:t.image.width)!==null&&c!==void 0?c:1024)/4,p=Math.floor(Math.log2(l)),v=Math.pow(2,p),w=3*Math.max(v,112),h=4*v;return u&&(f.ENVMAP_TYPE_CUBEM=""),f.CUBEUV_TEXEL_WIDTH=`${1/w}`,f.CUBEUV_TEXEL_HEIGHT=`${1/h}`,f.CUBEUV_MAX_MIP=`${p}.0`,n>0&&(f.CHROMATIC_ABERRATIONS=""),e&&(f.FAST_CHROMA=""),f},[n,e]);return z.useLayoutEffect(()=>{var c;const a=(c=i.current)==null||(c=c.__r3f)==null||(c=c.parent)==null||(c=c.object)==null?void 0:c.geometry;a&&(i.current.bvh=new an,i.current.bvh.updateFrom(new Ce(a.clone().toNonIndexed(),{strategy:Je})))},[]),Rt(({camera:c})=>{i.current.viewMatrixInverse=c.matrixWorld,i.current.projectionMatrixInverse=c.projectionMatrixInverse}),z.createElement("meshRefractionMaterial",Ye({key:JSON.stringify(s),defines:s,ref:i,resolution:[o.width,o.height],aberrationStrength:n,envMap:t},r))}const Jt=["D4","D6","D8","D10","D12","D20"],mr=["#ff365f","#ff8e3a","#ffe86a","#63f6ad","#53c9ff","#a978ff"];function yr(){const n=[[0,1.72,0],[0,-1.72,0]],e=1.48;for(let i=0;i<10;i+=1){const o=i*Math.PI/5;n.push([Math.cos(o)*e,i%2===0?.42:-.42,Math.sin(o)*e])}const t=[];for(let i=0;i<10;i+=2){const o=i+2,s=(i+9)%10+2,c=(i+1)%10+2;t.push(0,s,o,0,o,c)}for(let i=1;i<10;i+=2){const o=i+2,s=(i+9)%10+2,c=(i+1)%10+2;t.push(1,c,o,1,o,s)}const r=new Kn;return r.setAttribute("position",new Qn(n.flat(),3)),r.setIndex(t),r.computeVertexNormals(),r.center(),r}function We({die:n}){const e=z.useMemo(()=>{const r=new Zn(3.05,3.05,3.05);return r.clearGroups(),r},[]),t=z.useMemo(yr,[]);return z.useEffect(()=>()=>{e.dispose(),t.dispose()},[e,t]),n==="D4"?_.jsx("tetrahedronGeometry",{args:[2.2,0]}):n==="D6"?_.jsx("primitive",{object:e,attach:"geometry"}):n==="D8"?_.jsx("octahedronGeometry",{args:[2.35,0]}):n==="D10"?_.jsx("primitive",{object:t,attach:"geometry"}):n==="D12"?_.jsx("dodecahedronGeometry",{args:[1.92,0]}):_.jsx("icosahedronGeometry",{args:[2.05,0]})}function hr({onReady:n}){const e=Xe(r=>r.scene),t=z.useRef(null);return Rt(()=>{e.environment&&t.current!==e.environment&&(t.current=e.environment,n(e.environment))}),_.jsxs(Cn,{resolution:256,frames:1,environmentIntensity:1.35,children:[_.jsx(Ut,{intensity:5.5,color:"#fff8e9",position:[-6,4,3],scale:[3,9,1]}),_.jsx(Ut,{intensity:3.2,color:"#65d9ff",position:[5,-1,2],scale:[4,5,1]}),_.jsx(Ut,{intensity:3.8,color:"#ff5f9e",position:[1,5,-5],scale:[7,2,1]}),_.jsx(Ut,{intensity:2.4,color:"#9b76ff",position:[-2,-5,-2],scale:[5,3,1]}),_.jsxs("mesh",{position:[0,0,-8],children:[_.jsx("planeGeometry",{args:[24,18]}),_.jsx("meshBasicMaterial",{color:"#02030a"})]})]})}function xr({count:n,speed:e}){const t=z.useMemo(()=>{const r=new gn,i=new Xn({color:"#d9f8ff",transparent:!0,opacity:.85,blending:wt,depthWrite:!1,toneMapped:!1}),o=new vn({duration:4,looping:!0,worldSpace:!0,shape:new Pn({radius:2.8,thickness:.72}),startLife:new ne(1.2,3.2),startSpeed:new ne(.06,.42),startSize:new ne(.025,.1),startColor:new Mn(new Yn(.62,.9,1,.9)),emissionOverTime:new An(n),renderMode:bn.BillBoard,material:i,behaviors:[new wn(new Bn([[new Tn(0,1,.7,0),0]]))]});return o.emitter.position.set(2.8,.45,0),r.addSystem(o),o.play(),{batch:r,material:i,system:o}},[n]);return Rt((r,i)=>t.batch.update(Math.min(i,.05)*e)),z.useEffect(()=>()=>{t.batch.deleteSystem(t.system),t.system.dispose(),t.material.dispose()},[t]),_.jsxs(_.Fragment,{children:[_.jsx("primitive",{object:t.system.emitter}),_.jsx("primitive",{object:t.batch})]})}function gr({strength:n}){const e=z.useRef(),t=z.useRef(),r=z.useMemo(()=>new C(-9,4.2,4.4),[]),i=z.useMemo(()=>new C(2.8,.45,0),[]),o=z.useMemo(()=>{const s=i.clone().sub(r),c=r.clone().add(i).multiplyScalar(.5),a=new Wn().setFromUnitVectors(new C(0,1,0),s.clone().normalize());return{length:s.length(),midpoint:c,quaternion:a}},[i,r]);return z.useEffect(()=>{e.current&&t.current&&(e.current.target=t.current)},[]),_.jsxs("group",{children:[_.jsx("object3D",{ref:t,position:i}),_.jsx("spotLight",{ref:e,position:r,color:"#fff7de",intensity:38*n,distance:34,angle:.24,penumbra:.72,decay:1.55}),_.jsxs("mesh",{position:o.midpoint,quaternion:o.quaternion,renderOrder:-2,children:[_.jsx("cylinderGeometry",{args:[.12,1.15,o.length,32,1,!0]}),_.jsx("meshBasicMaterial",{color:"#dff8ff",transparent:!0,opacity:.065*n,blending:wt,depthWrite:!1,side:_e})]}),_.jsxs("mesh",{position:o.midpoint,quaternion:o.quaternion,renderOrder:-1,children:[_.jsx("cylinderGeometry",{args:[.025,.16,o.length,16,1,!0]}),_.jsx("meshBasicMaterial",{color:"#fffef5",transparent:!0,opacity:.32*n,blending:wt,depthWrite:!1})]})]})}function vr({body:n,dispersion:e}){const t=z.useRef();return Rt(()=>{if(!n.current||!t.current)return;const r=n.current.rotation();t.current.rotation.z=K.damp(t.current.rotation.z,r.z*.65+r.x*.18,4,1/60),t.current.rotation.y=K.damp(t.current.rotation.y,r.y*.12,4,1/60);const i=.72+Math.abs(r.y)*.28;t.current.children.forEach((o,s)=>{o.material.opacity=(.08+s*.008)*e*i})}),_.jsx("group",{ref:t,position:[2.8,.45,-.15],children:mr.map((r,i)=>_.jsxs("mesh",{position:[5.6,(i-2.5)*.32,i*-.035],rotation:[0,0,(i-2.5)*.035],children:[_.jsx("planeGeometry",{args:[11.2,.22+i*.012]}),_.jsx("meshBasicMaterial",{color:r,transparent:!0,opacity:.1,blending:wt,depthWrite:!1,side:_e})]},r))})}function wr({die:n,envMap:e,dispersion:t,speed:r,onDraggingChange:i}){const o=z.useRef(),s=z.useRef(null);Rt((u,d)=>{if(!o.current||s.current)return;o.current.addTorque({x:.08*r,y:.22*r,z:.045*r},!0);const l=o.current.angvel(),p=1.1*Math.max(.4,r);Math.hypot(l.x,l.y,l.z)>p&&o.current.setAngvel({x:K.clamp(l.x,-p,p),y:K.clamp(l.y,-p,p),z:K.clamp(l.z,-p,p)},!0)}),z.useEffect(()=>()=>{document.body.style.cursor=""},[]);const c=u=>{var d;u.stopPropagation(),u.target.setPointerCapture(u.pointerId),s.current={x:u.clientX,y:u.clientY},(d=o.current)==null||d.setAngvel({x:0,y:0,z:0},!0),document.body.style.cursor="grabbing",i(!0)},a=u=>{if(!s.current||!o.current)return;u.stopPropagation();const d=u.clientX-s.current.x,l=u.clientY-s.current.y;s.current={x:u.clientX,y:u.clientY},o.current.applyTorqueImpulse({x:l*.045,y:d*.045,z:(d-l)*.008},!0)},f=u=>{if(s.current){s.current=null;try{u.target.releasePointerCapture(u.pointerId)}catch{}document.body.style.cursor="grab",i(!1)}};return _.jsxs(_.Fragment,{children:[_.jsx(vr,{body:o,dispersion:t}),_.jsxs(hn,{ref:o,position:[2.8,.45,0],rotation:[.42,-.58,.18],colliders:!1,gravityScale:0,linearDamping:8,angularDamping:2.8,enabledTranslations:[!1,!1,!1],children:[_.jsx(xn,{args:[1.45],sensor:!0}),_.jsxs("mesh",{onPointerDown:c,onPointerMove:a,onPointerUp:f,onPointerCancel:f,onPointerOver:()=>{s.current||(document.body.style.cursor="grab")},onPointerOut:()=>{s.current||(document.body.style.cursor="")},children:[_.jsx(We,{die:n}),_.jsx(pr,{envMap:e,bounces:5,ior:1.48,fresnel:.78,aberrationStrength:.018+t*.055,fastChroma:!1,color:"#f3fdff",toneMapped:!1}),_.jsx(Jn,{scale:1.002,threshold:8,color:"#d9f8ff"})]}),_.jsxs("mesh",{scale:.35,children:[_.jsx(We,{die:n}),_.jsx("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:.055,blending:wt,depthWrite:!1})]}),_.jsx("pointLight",{color:"#bcecff",intensity:8+t*14,distance:8})]},n)]})}function br(){return _.jsxs("group",{children:[_.jsxs("mesh",{position:[2.8,-2.55,-1.5],rotation:[-Math.PI/2,0,0],children:[_.jsx("planeGeometry",{args:[31,22]}),_.jsx(Fn,{resolution:512,blur:[280,90],mixBlur:1.2,mixStrength:16,roughness:.72,depthScale:.45,color:"#020309",metalness:.48})]}),[3.6,4.8,6.2].map((n,e)=>_.jsxs("mesh",{position:[2.8,.45,-2.6],rotation:[0,0,e*.45],children:[_.jsx("torusGeometry",{args:[n,.012,5,160]}),_.jsx("meshBasicMaterial",{color:e===1?"#ff6f91":"#75dfff",transparent:!0,opacity:.13-e*.025,blending:wt})]},n))]})}function Ar({settings:n,onDraggingChange:e}){const[t,r]=z.useState(null),i=K.clamp(Math.round(n.die??2),0,Jt.length-1),o=Jt[i],s=K.clamp((n.dispersion??68)/100,0,1),c=K.clamp((n.light??76)/100,.2,1),a=n.speed??1;return _.jsxs(_.Fragment,{children:[_.jsx("color",{attach:"background",args:["#010208"]}),_.jsx("fogExp2",{attach:"fog",args:["#010208",.028]}),_.jsx(hr,{onReady:r}),_.jsx("ambientLight",{intensity:.08}),_.jsx(gr,{strength:c}),_.jsx(br,{}),_.jsx(xr,{count:Math.round(n.motes??44),speed:a}),t&&_.jsx(yn,{gravity:[0,0,0],timeStep:1/60,interpolate:!0,children:_.jsx(wr,{die:o,envMap:t,dispersion:s,speed:a,onDraggingChange:e})}),_.jsxs(fn,{multisampling:Dn,children:[_.jsx(dn,{mipmapBlur:!0,intensity:.95+c*.6,luminanceThreshold:.32,luminanceSmoothing:.5}),_.jsx(pn,{eskil:!1,offset:.18,darkness:.82}),_.jsx(mn,{})]}),_.jsx(In,{})]})}function jr({settings:n={}}){const[e,t]=z.useState(!1),r=Jt[K.clamp(Math.round(n.die??2),0,Jt.length-1)];return _.jsxs("section",{className:`atmosphere prism-pulse-lab ${e?"is-dragging":""}`,style:{"--experiment-accent":"#77dcff"},children:[_.jsx(un,{className:"prism-pulse-lab__canvas",dpr:_n,camera:{position:[0,.75,9.4],fov:43,near:.1,far:90},gl:{antialias:!0,alpha:!1,powerPreference:"high-performance"},onCreated:({gl:i})=>{i.outputColorSpace=Gn,i.toneMapping=$n,i.toneMappingExposure=1.08},children:_.jsx(z.Suspense,{fallback:null,children:_.jsx(Ar,{settings:n,onDraggingChange:t})})}),_.jsx("div",{className:"prism-pulse-lab__veil"}),_.jsxs("div",{className:"experiment-copy",children:[_.jsxs("p",{children:["07 — Refractive geometry / ",r]}),_.jsxs("h1",{children:["Hold the",_.jsx("br",{}),"light itself."]}),_.jsx("span",{children:"A multi-bounce crystal die catches an off-camera beam, splitting the room into spectral paths. Drag the die and watch the light answer."})]}),_.jsxs("div",{className:"prism-pulse-lab__hint","aria-hidden":"true",children:[_.jsx("i",{}),_.jsx("span",{children:e?"Release to carry the momentum":"Drag the crystal to turn it"})]})]})}export{jr as default};
