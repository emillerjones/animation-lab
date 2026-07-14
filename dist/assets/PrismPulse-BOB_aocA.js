import{r as z,j as _}from"./index-hkSly-bJ.js";import{e as an,a as Xe,u as Rt,C as ln}from"./react-three-fiber.esm-B2bgiuHI.js";import{d as un,w as fn,q as dn,L as pn}from"./index-oA_-nP7z.js";import{P as mn,R as yn,B as hn}from"./react-three-rapier.esm-BZUq83Xm.js";import{B as xn,P as gn,S as vn,R as wn,C as bn,a as An,I as ne,b as Mn,c as Pn,d as Bn}from"./three.quarks.esm-5oqKW9xj.js";import{W as Tn,a as _n}from"./quality-DggQmmNe.js";import{A as Dn}from"./AdaptiveDpr-PYD5GTUE.js";import{E as Sn,L as Nt}from"./Lightformer-DvpbnNod.js";import{M as In}from"./MeshReflectorMaterial-COQWOpJp.js";import{_ as Cn}from"./extends-CF3RwP-h.js";import{s as Fn}from"./shaderMaterial-2JGCgtuK.js";import{v as En}from"./constants-B6HWMuRQ.js";import"./three.module-Wjhou1Ux.js";import{B as Te,V as C,L as Z,P as Ye,b as lt,T as xt,S as zn,M as Q,c as X,d as Rn,D as _e,R as Nn,F as Fe,U as Ft,e as Et,f as ye,N as gt,I as ie,g as Ee,h as Un,i as ze,j as jn,k as Kt,l as he,m as Ze,n as Ln,o as Vn,p as kn,a as Hn,q as K,r as On,s as qn,Q as Gn,A as wt,t as $n,u as Wn,v as Xn,w as Yn,x as Zn}from"./three.core-CbrireiX.js";import{E as Kn}from"./Edges-DGJBW8-E.js";import"./BufferGeometryUtils-B9UNnTo3.js";import"./constants-DFRcudaD.js";import"./Line-B0tZhG_j.js";const Ke=0,Qn=1,Qe=2,Re=2,re=1.25,Ne=1,rt=32,te=65535,Jn=Math.pow(2,-24),se=Symbol("SKIP_GENERATION");function Je(n){return n.index?n.index.count:n.attributes.position.count}function bt(n){return Je(n)/3}function tn(n,e=ArrayBuffer){return n>65535?new Uint32Array(new e(4*n)):new Uint16Array(new e(2*n))}function ti(n,e){if(!n.index){const t=n.attributes.position.count,i=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=tn(t,i);n.setIndex(new Te(r,1));for(let o=0;o<t;o++)r[o]=o}}function en(n,e){const t=bt(n),i=e||n.drawRange,r=i.start/3,o=(i.start+i.count)/3,s=Math.max(0,r),c=Math.min(t,o)-s;return[{offset:Math.floor(s),count:Math.floor(c)}]}function nn(n,e){if(!n.groups||!n.groups.length)return en(n,e);const t=[],i=new Set,r=e||n.drawRange,o=r.start/3,s=(r.start+r.count)/3;for(const a of n.groups){const d=a.start/3,f=(a.start+a.count)/3;i.add(Math.max(o,d)),i.add(Math.min(s,f))}const c=Array.from(i.values()).sort((a,d)=>a-d);for(let a=0;a<c.length-1;a++){const d=c[a],f=c[a+1];t.push({offset:Math.floor(d),count:Math.floor(f-d)})}return t}function ei(n,e){const t=bt(n),i=nn(n,e).sort((s,c)=>s.offset-c.offset),r=i[i.length-1];r.count=Math.min(t-r.offset,r.count);let o=0;return i.forEach(({count:s})=>o+=s),t!==o}function oe(n,e,t,i,r){let o=1/0,s=1/0,c=1/0,a=-1/0,d=-1/0,f=-1/0,u=1/0,l=1/0,p=1/0,v=-1/0,w=-1/0,h=-1/0;for(let m=e*6,y=(e+t)*6;m<y;m+=6){const x=n[m+0],b=n[m+1],g=x-b,A=x+b;g<o&&(o=g),A>a&&(a=A),x<u&&(u=x),x>v&&(v=x);const M=n[m+2],B=n[m+3],P=M-B,D=M+B;P<s&&(s=P),D>d&&(d=D),M<l&&(l=M),M>w&&(w=M);const S=n[m+4],T=n[m+5],I=S-T,F=S+T;I<c&&(c=I),F>f&&(f=F),S<p&&(p=S),S>h&&(h=S)}i[0]=o,i[1]=s,i[2]=c,i[3]=a,i[4]=d,i[5]=f,r[0]=u,r[1]=l,r[2]=p,r[3]=v,r[4]=w,r[5]=h}function ni(n,e=null,t=null,i=null){const r=n.attributes.position,o=n.index?n.index.array:null,s=bt(n),c=r.normalized;let a;e===null?(a=new Float32Array(s*6),t=0,i=s):(a=e,t=t||0,i=i||s);const d=r.array,f=r.offset||0;let u=3;r.isInterleavedBufferAttribute&&(u=r.data.stride);const l=["getX","getY","getZ"];for(let p=t;p<t+i;p++){const v=p*3,w=p*6;let h=v+0,m=v+1,y=v+2;o&&(h=o[h],m=o[m],y=o[y]),c||(h=h*u+f,m=m*u+f,y=y*u+f);for(let x=0;x<3;x++){let b,g,A;c?(b=r[l[x]](h),g=r[l[x]](m),A=r[l[x]](y)):(b=d[h+x],g=d[m+x],A=d[y+x]);let M=b;g<M&&(M=g),A<M&&(M=A);let B=b;g>B&&(B=g),A>B&&(B=A);const P=(B-M)/2,D=x*2;a[w+D+0]=M+P,a[w+D+1]=P+(Math.abs(M)+P)*Jn}}return a}function N(n,e,t){return t.min.x=e[n],t.min.y=e[n+1],t.min.z=e[n+2],t.max.x=e[n+3],t.max.y=e[n+4],t.max.z=e[n+5],t}function Ue(n){let e=-1,t=-1/0;for(let i=0;i<3;i++){const r=n[i+3]-n[i];r>t&&(t=r,e=i)}return e}function je(n,e){e.set(n)}function Le(n,e,t){let i,r;for(let o=0;o<3;o++){const s=o+3;i=n[o],r=e[o],t[o]=i<r?i:r,i=n[s],r=e[s],t[s]=i>r?i:r}}function Ut(n,e,t){for(let i=0;i<3;i++){const r=e[n+2*i],o=e[n+2*i+1],s=r-o,c=r+o;s<t[i]&&(t[i]=s),c>t[i+3]&&(t[i+3]=c)}}function Pt(n){const e=n[3]-n[0],t=n[4]-n[1],i=n[5]-n[2];return 2*(e*t+t*i+i*e)}const Y=32,ii=(n,e)=>n.candidate-e.candidate,et=new Array(Y).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),jt=new Float32Array(6);function ri(n,e,t,i,r,o){let s=-1,c=0;if(o===Ke)s=Ue(e),s!==-1&&(c=(e[s]+e[s+3])/2);else if(o===Qn)s=Ue(n),s!==-1&&(c=si(t,i,r,s));else if(o===Qe){const a=Pt(n);let d=re*r;const f=i*6,u=(i+r)*6;for(let l=0;l<3;l++){const p=e[l],h=(e[l+3]-p)/Y;if(r<Y/4){const m=[...et];m.length=r;let y=0;for(let b=f;b<u;b+=6,y++){const g=m[y];g.candidate=t[b+2*l],g.count=0;const{bounds:A,leftCacheBounds:M,rightCacheBounds:B}=g;for(let P=0;P<3;P++)B[P]=1/0,B[P+3]=-1/0,M[P]=1/0,M[P+3]=-1/0,A[P]=1/0,A[P+3]=-1/0;Ut(b,t,A)}m.sort(ii);let x=r;for(let b=0;b<x;b++){const g=m[b];for(;b+1<x&&m[b+1].candidate===g.candidate;)m.splice(b+1,1),x--}for(let b=f;b<u;b+=6){const g=t[b+2*l];for(let A=0;A<x;A++){const M=m[A];g>=M.candidate?Ut(b,t,M.rightCacheBounds):(Ut(b,t,M.leftCacheBounds),M.count++)}}for(let b=0;b<x;b++){const g=m[b],A=g.count,M=r-g.count,B=g.leftCacheBounds,P=g.rightCacheBounds;let D=0;A!==0&&(D=Pt(B)/a);let S=0;M!==0&&(S=Pt(P)/a);const T=Ne+re*(D*A+S*M);T<d&&(s=l,d=T,c=g.candidate)}}else{for(let x=0;x<Y;x++){const b=et[x];b.count=0,b.candidate=p+h+x*h;const g=b.bounds;for(let A=0;A<3;A++)g[A]=1/0,g[A+3]=-1/0}for(let x=f;x<u;x+=6){let A=~~((t[x+2*l]-p)/h);A>=Y&&(A=Y-1);const M=et[A];M.count++,Ut(x,t,M.bounds)}const m=et[Y-1];je(m.bounds,m.rightCacheBounds);for(let x=Y-2;x>=0;x--){const b=et[x],g=et[x+1];Le(b.bounds,g.rightCacheBounds,b.rightCacheBounds)}let y=0;for(let x=0;x<Y-1;x++){const b=et[x],g=b.count,A=b.bounds,B=et[x+1].rightCacheBounds;g!==0&&(y===0?je(A,jt):Le(A,jt,jt)),y+=g;let P=0,D=0;y!==0&&(P=Pt(jt)/a);const S=r-y;S!==0&&(D=Pt(B)/a);const T=Ne+re*(P*y+D*S);T<d&&(s=l,d=T,c=b.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${o} used.`);return{axis:s,pos:c}}function si(n,e,t,i){let r=0;for(let o=e,s=e+t;o<s;o++)r+=n[o*6+i*2];return r/t}class ce{constructor(){this.boundingData=new Float32Array(6)}}function oi(n,e,t,i,r,o){let s=i,c=i+r-1;const a=o.pos,d=o.axis*2;for(;;){for(;s<=c&&t[s*6+d]<a;)s++;for(;s<=c&&t[c*6+d]>=a;)c--;if(s<c){for(let f=0;f<3;f++){let u=e[s*3+f];e[s*3+f]=e[c*3+f],e[c*3+f]=u}for(let f=0;f<6;f++){let u=t[s*6+f];t[s*6+f]=t[c*6+f],t[c*6+f]=u}s++,c--}else return s}}function ci(n,e,t,i,r,o){let s=i,c=i+r-1;const a=o.pos,d=o.axis*2;for(;;){for(;s<=c&&t[s*6+d]<a;)s++;for(;s<=c&&t[c*6+d]>=a;)c--;if(s<c){let f=n[s];n[s]=n[c],n[c]=f;for(let u=0;u<6;u++){let l=t[s*6+u];t[s*6+u]=t[c*6+u],t[c*6+u]=l}s++,c--}else return s}}function L(n,e){return e[n+15]===65535}function k(n,e){return e[n+6]}function H(n,e){return e[n+14]}function q(n){return n+8}function O(n,e){return e[n+6]}function De(n,e){return e[n+7]}let rn,Ct,Zt,sn;const ai=Math.pow(2,32);function xe(n){return"count"in n?1:1+xe(n.left)+xe(n.right)}function li(n,e,t){return rn=new Float32Array(t),Ct=new Uint32Array(t),Zt=new Uint16Array(t),sn=new Uint8Array(t),ge(n,e)}function ge(n,e){const t=n/4,i=n/2,r="count"in e,o=e.boundingData;for(let s=0;s<6;s++)rn[t+s]=o[s];if(r)if(e.buffer){const s=e.buffer;sn.set(new Uint8Array(s),n);for(let c=n,a=n+s.byteLength;c<a;c+=rt){const d=c/2;L(d,Zt)||(Ct[c/4+6]+=t)}return n+s.byteLength}else{const s=e.offset,c=e.count;return Ct[t+6]=s,Zt[i+14]=c,Zt[i+15]=te,n+rt}else{const s=e.left,c=e.right,a=e.splitAxis;let d;if(d=ge(n+rt,s),d/4>ai)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return Ct[t+6]=d/4,d=ge(d,c),Ct[t+7]=a,d}}function ui(n,e){const t=(n.index?n.index.count:n.attributes.position.count)/3,i=t>2**16,r=i?4:2,o=e?new SharedArrayBuffer(t*r):new ArrayBuffer(t*r),s=i?new Uint32Array(o):new Uint16Array(o);for(let c=0,a=s.length;c<a;c++)s[c]=c;return s}function fi(n,e,t,i,r){const{maxDepth:o,verbose:s,maxLeafTris:c,strategy:a,onProgress:d,indirect:f}=r,u=n._indirectBuffer,l=n.geometry,p=l.index?l.index.array:null,v=f?ci:oi,w=bt(l),h=new Float32Array(6);let m=!1;const y=new ce;return oe(e,t,i,y.boundingData,h),b(y,t,i,h),y;function x(g){d&&d(g/w)}function b(g,A,M,B=null,P=0){if(!m&&P>=o&&(m=!0,s&&(console.warn(`MeshBVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`),console.warn(l))),M<=c||P>=o)return x(A+M),g.offset=A,g.count=M,g;const D=ri(g.boundingData,B,e,A,M,a);if(D.axis===-1)return x(A+M),g.offset=A,g.count=M,g;const S=v(u,p,e,A,M,D);if(S===A||S===A+M)x(A+M),g.offset=A,g.count=M;else{g.splitAxis=D.axis;const T=new ce,I=A,F=S-A;g.left=T,oe(e,I,F,T.boundingData,h),b(T,I,F,h,P+1);const E=new ce,U=S,tt=M-F;g.right=E,oe(e,U,tt,E.boundingData,h),b(E,U,tt,h,P+1)}return g}}function di(n,e){const t=n.geometry;e.indirect&&(n._indirectBuffer=ui(t,e.useSharedArrayBuffer),ei(t,e.range)&&!e.verbose&&console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),n._indirectBuffer||ti(t,e);const i=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=ni(t),o=e.indirect?en(t,e.range):nn(t,e.range);n._roots=o.map(s=>{const c=fi(n,r,s.offset,s.count,e),a=xe(c),d=new i(rt*a);return li(0,c,d),d})}class J{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let i=1/0,r=-1/0;for(let o=0,s=e.length;o<s;o++){const a=e[o][t];i=a<i?a:i,r=a>r?a:r}this.min=i,this.max=r}setFromPoints(e,t){let i=1/0,r=-1/0;for(let o=0,s=t.length;o<s;o++){const c=t[o],a=e.dot(c);i=a<i?a:i,r=a>r?a:r}this.min=i,this.max=r}isSeparated(e){return this.min>e.max||e.min>this.max}}J.prototype.setFromBox=(function(){const n=new C;return function(t,i){const r=i.min,o=i.max;let s=1/0,c=-1/0;for(let a=0;a<=1;a++)for(let d=0;d<=1;d++)for(let f=0;f<=1;f++){n.x=r.x*a+o.x*(1-a),n.y=r.y*d+o.y*(1-d),n.z=r.z*f+o.z*(1-f);const u=t.dot(n);s=Math.min(u,s),c=Math.max(u,c)}this.min=s,this.max=c}})();const pi=(function(){const n=new C,e=new C,t=new C;return function(r,o,s){const c=r.start,a=n,d=o.start,f=e;t.subVectors(c,d),n.subVectors(r.end,r.start),e.subVectors(o.end,o.start);const u=t.dot(f),l=f.dot(a),p=f.dot(f),v=t.dot(a),h=a.dot(a)*p-l*l;let m,y;h!==0?m=(u*l-v*p)/h:m=0,y=(u+m*l)/p,s.x=m,s.y=y}})(),Se=(function(){const n=new lt,e=new C,t=new C;return function(r,o,s,c){pi(r,o,n);let a=n.x,d=n.y;if(a>=0&&a<=1&&d>=0&&d<=1){r.at(a,s),o.at(d,c);return}else if(a>=0&&a<=1){d<0?o.at(0,c):o.at(1,c),r.closestPointToPoint(c,!0,s);return}else if(d>=0&&d<=1){a<0?r.at(0,s):r.at(1,s),o.closestPointToPoint(s,!0,c);return}else{let f;a<0?f=r.start:f=r.end;let u;d<0?u=o.start:u=o.end;const l=e,p=t;if(r.closestPointToPoint(u,!0,e),o.closestPointToPoint(f,!0,t),l.distanceToSquared(u)<=p.distanceToSquared(f)){s.copy(l),c.copy(u);return}else{s.copy(f),c.copy(p);return}}}})(),mi=(function(){const n=new C,e=new C,t=new Ye,i=new Z;return function(o,s){const{radius:c,center:a}=o,{a:d,b:f,c:u}=s;if(i.start=d,i.end=f,i.closestPointToPoint(a,!0,n).distanceTo(a)<=c||(i.start=d,i.end=u,i.closestPointToPoint(a,!0,n).distanceTo(a)<=c)||(i.start=f,i.end=u,i.closestPointToPoint(a,!0,n).distanceTo(a)<=c))return!0;const w=s.getPlane(t);if(Math.abs(w.distanceToPoint(a))<=c){const m=w.projectPoint(a,e);if(s.containsPoint(m))return!0}return!1}})(),yi=1e-15;function ae(n){return Math.abs(n)<yi}class W extends xt{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new C),this.satBounds=new Array(4).fill().map(()=>new J),this.points=[this.a,this.b,this.c],this.sphere=new zn,this.plane=new Ye,this.needsUpdate=!0}intersectsSphere(e){return mi(e,this)}update(){const e=this.a,t=this.b,i=this.c,r=this.points,o=this.satAxes,s=this.satBounds,c=o[0],a=s[0];this.getNormal(c),a.setFromPoints(c,r);const d=o[1],f=s[1];d.subVectors(e,t),f.setFromPoints(d,r);const u=o[2],l=s[2];u.subVectors(t,i),l.setFromPoints(u,r);const p=o[3],v=s[3];p.subVectors(i,e),v.setFromPoints(p,r),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(c,e),this.needsUpdate=!1}}W.prototype.closestPointToSegment=(function(){const n=new C,e=new C,t=new Z;return function(r,o=null,s=null){const{start:c,end:a}=r,d=this.points;let f,u=1/0;for(let l=0;l<3;l++){const p=(l+1)%3;t.start.copy(d[l]),t.end.copy(d[p]),Se(t,r,n,e),f=n.distanceToSquared(e),f<u&&(u=f,o&&o.copy(n),s&&s.copy(e))}return this.closestPointToPoint(c,n),f=c.distanceToSquared(n),f<u&&(u=f,o&&o.copy(n),s&&s.copy(c)),this.closestPointToPoint(a,n),f=a.distanceToSquared(n),f<u&&(u=f,o&&o.copy(n),s&&s.copy(a)),Math.sqrt(u)}})();W.prototype.intersectsTriangle=(function(){const n=new W,e=new Array(3),t=new Array(3),i=new J,r=new J,o=new C,s=new C,c=new C,a=new C,d=new C,f=new Z,u=new Z,l=new Z,p=new C;function v(w,h,m){const y=w.points;let x=0,b=-1;for(let g=0;g<3;g++){const{start:A,end:M}=f;A.copy(y[g]),M.copy(y[(g+1)%3]),f.delta(s);const B=ae(h.distanceToPoint(A));if(ae(h.normal.dot(s))&&B){m.copy(f),x=2;break}const P=h.intersectLine(f,p);if(!P&&B&&p.copy(A),(P||B)&&!ae(p.distanceTo(M))){if(x<=1)(x===1?m.start:m.end).copy(p),B&&(b=x);else if(x>=2){(b===1?m.start:m.end).copy(p),x=2;break}if(x++,x===2&&b===-1)break}}return x}return function(h,m=null,y=!1){this.needsUpdate&&this.update(),h.isExtendedTriangle?h.needsUpdate&&h.update():(n.copy(h),n.update(),h=n);const x=this.plane,b=h.plane;if(Math.abs(x.normal.dot(b.normal))>1-1e-10){const g=this.satBounds,A=this.satAxes;t[0]=h.a,t[1]=h.b,t[2]=h.c;for(let P=0;P<4;P++){const D=g[P],S=A[P];if(i.setFromPoints(S,t),D.isSeparated(i))return!1}const M=h.satBounds,B=h.satAxes;e[0]=this.a,e[1]=this.b,e[2]=this.c;for(let P=0;P<4;P++){const D=M[P],S=B[P];if(i.setFromPoints(S,e),D.isSeparated(i))return!1}for(let P=0;P<4;P++){const D=A[P];for(let S=0;S<4;S++){const T=B[S];if(o.crossVectors(D,T),i.setFromPoints(o,e),r.setFromPoints(o,t),i.isSeparated(r))return!1}}return m&&(y||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),m.start.set(0,0,0),m.end.set(0,0,0)),!0}else{const g=v(this,b,u);if(g===1&&h.containsPoint(u.end))return m&&(m.start.copy(u.end),m.end.copy(u.end)),!0;if(g!==2)return!1;const A=v(h,x,l);if(A===1&&this.containsPoint(l.end))return m&&(m.start.copy(l.end),m.end.copy(l.end)),!0;if(A!==2)return!1;if(u.delta(c),l.delta(a),c.dot(a)<0){let I=l.start;l.start=l.end,l.end=I}const M=u.start.dot(c),B=u.end.dot(c),P=l.start.dot(c),D=l.end.dot(c),S=B<P,T=M<D;return M!==D&&P!==B&&S===T?!1:(m&&(d.subVectors(u.start,l.start),d.dot(c)>0?m.start.copy(u.start):m.start.copy(l.start),d.subVectors(u.end,l.end),d.dot(c)<0?m.end.copy(u.end):m.end.copy(l.end)),!0)}}})();W.prototype.distanceToPoint=(function(){const n=new C;return function(t){return this.closestPointToPoint(t,n),t.distanceTo(n)}})();W.prototype.distanceToTriangle=(function(){const n=new C,e=new C,t=["a","b","c"],i=new Z,r=new Z;return function(s,c=null,a=null){const d=c||a?i:null;if(this.intersectsTriangle(s,d))return(c||a)&&(c&&d.getCenter(c),a&&d.getCenter(a)),0;let f=1/0;for(let u=0;u<3;u++){let l;const p=t[u],v=s[p];this.closestPointToPoint(v,n),l=v.distanceToSquared(n),l<f&&(f=l,c&&c.copy(n),a&&a.copy(v));const w=this[p];s.closestPointToPoint(w,n),l=w.distanceToSquared(n),l<f&&(f=l,c&&c.copy(w),a&&a.copy(n))}for(let u=0;u<3;u++){const l=t[u],p=t[(u+1)%3];i.set(this[l],this[p]);for(let v=0;v<3;v++){const w=t[v],h=t[(v+1)%3];r.set(s[w],s[h]),Se(i,r,n,e);const m=n.distanceToSquared(e);m<f&&(f=m,c&&c.copy(n),a&&a.copy(e))}}return Math.sqrt(f)}})();class V{constructor(e,t,i){this.isOrientedBox=!0,this.min=new C,this.max=new C,this.matrix=new Q,this.invMatrix=new Q,this.points=new Array(8).fill().map(()=>new C),this.satAxes=new Array(3).fill().map(()=>new C),this.satBounds=new Array(3).fill().map(()=>new J),this.alignedSatBounds=new Array(3).fill().map(()=>new J),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),i&&this.matrix.copy(i)}set(e,t,i){this.min.copy(e),this.max.copy(t),this.matrix.copy(i),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}}V.prototype.update=(function(){return function(){const e=this.matrix,t=this.min,i=this.max,r=this.points;for(let d=0;d<=1;d++)for(let f=0;f<=1;f++)for(let u=0;u<=1;u++){const l=1*d|2*f|4*u,p=r[l];p.x=d?i.x:t.x,p.y=f?i.y:t.y,p.z=u?i.z:t.z,p.applyMatrix4(e)}const o=this.satBounds,s=this.satAxes,c=r[0];for(let d=0;d<3;d++){const f=s[d],u=o[d],l=1<<d,p=r[l];f.subVectors(c,p),u.setFromPoints(f,r)}const a=this.alignedSatBounds;a[0].setFromPointsField(r,"x"),a[1].setFromPointsField(r,"y"),a[2].setFromPointsField(r,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();V.prototype.intersectsBox=(function(){const n=new J;return function(t){this.needsUpdate&&this.update();const i=t.min,r=t.max,o=this.satBounds,s=this.satAxes,c=this.alignedSatBounds;if(n.min=i.x,n.max=r.x,c[0].isSeparated(n)||(n.min=i.y,n.max=r.y,c[1].isSeparated(n))||(n.min=i.z,n.max=r.z,c[2].isSeparated(n)))return!1;for(let a=0;a<3;a++){const d=s[a],f=o[a];if(n.setFromBox(d,t),f.isSeparated(n))return!1}return!0}})();V.prototype.intersectsTriangle=(function(){const n=new W,e=new Array(3),t=new J,i=new J,r=new C;return function(s){this.needsUpdate&&this.update(),s.isExtendedTriangle?s.needsUpdate&&s.update():(n.copy(s),n.update(),s=n);const c=this.satBounds,a=this.satAxes;e[0]=s.a,e[1]=s.b,e[2]=s.c;for(let l=0;l<3;l++){const p=c[l],v=a[l];if(t.setFromPoints(v,e),p.isSeparated(t))return!1}const d=s.satBounds,f=s.satAxes,u=this.points;for(let l=0;l<3;l++){const p=d[l],v=f[l];if(t.setFromPoints(v,u),p.isSeparated(t))return!1}for(let l=0;l<3;l++){const p=a[l];for(let v=0;v<4;v++){const w=f[v];if(r.crossVectors(p,w),t.setFromPoints(r,e),i.setFromPoints(r,u),t.isSeparated(i))return!1}}return!0}})();V.prototype.closestPointToPoint=(function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}})();V.prototype.distanceToPoint=(function(){const n=new C;return function(t){return this.closestPointToPoint(t,n),t.distanceTo(n)}})();V.prototype.distanceToBox=(function(){const n=["x","y","z"],e=new Array(12).fill().map(()=>new Z),t=new Array(12).fill().map(()=>new Z),i=new C,r=new C;return function(s,c=0,a=null,d=null){if(this.needsUpdate&&this.update(),this.intersectsBox(s))return(a||d)&&(s.getCenter(r),this.closestPointToPoint(r,i),s.closestPointToPoint(i,r),a&&a.copy(i),d&&d.copy(r)),0;const f=c*c,u=s.min,l=s.max,p=this.points;let v=1/0;for(let h=0;h<8;h++){const m=p[h];r.copy(m).clamp(u,l);const y=m.distanceToSquared(r);if(y<v&&(v=y,a&&a.copy(m),d&&d.copy(r),y<f))return Math.sqrt(y)}let w=0;for(let h=0;h<3;h++)for(let m=0;m<=1;m++)for(let y=0;y<=1;y++){const x=(h+1)%3,b=(h+2)%3,g=m<<x|y<<b,A=1<<h|m<<x|y<<b,M=p[g],B=p[A];e[w].set(M,B);const D=n[h],S=n[x],T=n[b],I=t[w],F=I.start,E=I.end;F[D]=u[D],F[S]=m?u[S]:l[S],F[T]=y?u[T]:l[S],E[D]=l[D],E[S]=m?u[S]:l[S],E[T]=y?u[T]:l[S],w++}for(let h=0;h<=1;h++)for(let m=0;m<=1;m++)for(let y=0;y<=1;y++){r.x=h?l.x:u.x,r.y=m?l.y:u.y,r.z=y?l.z:u.z,this.closestPointToPoint(r,i);const x=r.distanceToSquared(i);if(x<v&&(v=x,a&&a.copy(i),d&&d.copy(r),x<f))return Math.sqrt(x)}for(let h=0;h<12;h++){const m=e[h];for(let y=0;y<12;y++){const x=t[y];Se(m,x,i,r);const b=i.distanceToSquared(r);if(b<v&&(v=b,a&&a.copy(i),d&&d.copy(r),b<f))return Math.sqrt(b)}}return Math.sqrt(v)}})();class Ie{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){const e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}}class hi extends Ie{constructor(){super(()=>new W)}}const G=new hi;class xi{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const e=[];let t=null;this.setBuffer=i=>{t&&e.push(t),t=i,this.float32Array=new Float32Array(i),this.uint16Array=new Uint16Array(i),this.uint32Array=new Uint32Array(i)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}}const R=new xi;let it,vt;const ut=[],Lt=new Ie(()=>new X);function gi(n,e,t,i,r,o){it=Lt.getPrimitive(),vt=Lt.getPrimitive(),ut.push(it,vt),R.setBuffer(n._roots[e]);const s=ve(0,n.geometry,t,i,r,o);R.clearBuffer(),Lt.releasePrimitive(it),Lt.releasePrimitive(vt),ut.pop(),ut.pop();const c=ut.length;return c>0&&(vt=ut[c-1],it=ut[c-2]),s}function ve(n,e,t,i,r=null,o=0,s=0){const{float32Array:c,uint16Array:a,uint32Array:d}=R;let f=n*2;if(L(f,a)){const l=k(n,d),p=H(f,a);return N(n,c,it),i(l,p,!1,s,o+n,it)}else{let D=function(T){const{uint16Array:I,uint32Array:F}=R;let E=T*2;for(;!L(E,I);)T=q(T),E=T*2;return k(T,F)},S=function(T){const{uint16Array:I,uint32Array:F}=R;let E=T*2;for(;!L(E,I);)T=O(T,F),E=T*2;return k(T,F)+H(E,I)};const l=q(n),p=O(n,d);let v=l,w=p,h,m,y,x;if(r&&(y=it,x=vt,N(v,c,y),N(w,c,x),h=r(y),m=r(x),m<h)){v=p,w=l;const T=h;h=m,m=T,y=x}y||(y=it,N(v,c,y));const b=L(v*2,a),g=t(y,b,h,s+1,o+v);let A;if(g===Re){const T=D(v),F=S(v)-T;A=i(T,F,!0,s+1,o+v,y)}else A=g&&ve(v,e,t,i,r,o,s+1);if(A)return!0;x=vt,N(w,c,x);const M=L(w*2,a),B=t(x,M,m,s+1,o+w);let P;if(B===Re){const T=D(w),F=S(w)-T;P=i(T,F,!0,s+1,o+w,x)}else P=B&&ve(w,e,t,i,r,o,s+1);return!!P}}const Bt=new C,le=new C;function vi(n,e,t={},i=0,r=1/0){const o=i*i,s=r*r;let c=1/0,a=null;if(n.shapecast({boundsTraverseOrder:f=>(Bt.copy(e).clamp(f.min,f.max),Bt.distanceToSquared(e)),intersectsBounds:(f,u,l)=>l<c&&l<s,intersectsTriangle:(f,u)=>{f.closestPointToPoint(e,Bt);const l=e.distanceToSquared(Bt);return l<c&&(le.copy(Bt),c=l,a=u),l<o}}),c===1/0)return null;const d=Math.sqrt(c);return t.point?t.point.copy(le):t.point=le.clone(),t.distance=d,t.faceIndex=a,t}const wi=parseInt(Nn)>=169,ot=new C,ct=new C,at=new C,Vt=new lt,kt=new lt,Ht=new lt,Ve=new C,ke=new C,He=new C,Tt=new C;function bi(n,e,t,i,r,o,s,c){let a;if(o===Rn?a=n.intersectTriangle(i,t,e,!0,r):a=n.intersectTriangle(e,t,i,o!==_e,r),a===null)return null;const d=n.origin.distanceTo(r);return d<s||d>c?null:{distance:d,point:r.clone()}}function Ai(n,e,t,i,r,o,s,c,a,d,f){ot.fromBufferAttribute(e,o),ct.fromBufferAttribute(e,s),at.fromBufferAttribute(e,c);const u=bi(n,ot,ct,at,Tt,a,d,f);if(u){const l=new C;xt.getBarycoord(Tt,ot,ct,at,l),i&&(Vt.fromBufferAttribute(i,o),kt.fromBufferAttribute(i,s),Ht.fromBufferAttribute(i,c),u.uv=xt.getInterpolation(Tt,ot,ct,at,Vt,kt,Ht,new lt)),r&&(Vt.fromBufferAttribute(r,o),kt.fromBufferAttribute(r,s),Ht.fromBufferAttribute(r,c),u.uv1=xt.getInterpolation(Tt,ot,ct,at,Vt,kt,Ht,new lt)),t&&(Ve.fromBufferAttribute(t,o),ke.fromBufferAttribute(t,s),He.fromBufferAttribute(t,c),u.normal=xt.getInterpolation(Tt,ot,ct,at,Ve,ke,He,new C),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const p={a:o,b:s,c,normal:new C,materialIndex:0};xt.getNormal(ot,ct,at,p.normal),u.face=p,u.faceIndex=o,wi&&(u.barycoord=l)}return u}function ee(n,e,t,i,r,o,s){const c=i*3;let a=c+0,d=c+1,f=c+2;const u=n.index;n.index&&(a=u.getX(a),d=u.getX(d),f=u.getX(f));const{position:l,normal:p,uv:v,uv1:w}=n.attributes,h=Ai(t,l,p,v,w,a,d,f,e,o,s);return h?(h.faceIndex=i,r&&r.push(h),h):null}function j(n,e,t,i){const r=n.a,o=n.b,s=n.c;let c=e,a=e+1,d=e+2;t&&(c=t.getX(c),a=t.getX(a),d=t.getX(d)),r.x=i.getX(c),r.y=i.getY(c),r.z=i.getZ(c),o.x=i.getX(a),o.y=i.getY(a),o.z=i.getZ(a),s.x=i.getX(d),s.y=i.getY(d),s.z=i.getZ(d)}function Mi(n,e,t,i,r,o,s,c){const{geometry:a,_indirectBuffer:d}=n;for(let f=i,u=i+r;f<u;f++)ee(a,e,t,f,o,s,c)}function Pi(n,e,t,i,r,o,s){const{geometry:c,_indirectBuffer:a}=n;let d=1/0,f=null;for(let u=i,l=i+r;u<l;u++){let p;p=ee(c,e,t,u,null,o,s),p&&p.distance<d&&(f=p,d=p.distance)}return f}function Bi(n,e,t,i,r,o,s){const{geometry:c}=t,{index:a}=c,d=c.attributes.position;for(let f=n,u=e+n;f<u;f++){let l;if(l=f,j(s,l*3,a,d),s.needsUpdate=!0,i(s,l,r,o))return!0}return!1}function Ti(n,e=null){e&&Array.isArray(e)&&(e=new Set(e));const t=n.geometry,i=t.index?t.index.array:null,r=t.attributes.position;let o,s,c,a,d=0;const f=n._roots;for(let l=0,p=f.length;l<p;l++)o=f[l],s=new Uint32Array(o),c=new Uint16Array(o),a=new Float32Array(o),u(0,d),d+=o.byteLength;function u(l,p,v=!1){const w=l*2;if(c[w+15]===te){const m=s[l+6],y=c[w+14];let x=1/0,b=1/0,g=1/0,A=-1/0,M=-1/0,B=-1/0;for(let P=3*m,D=3*(m+y);P<D;P++){let S=i[P];const T=r.getX(S),I=r.getY(S),F=r.getZ(S);T<x&&(x=T),T>A&&(A=T),I<b&&(b=I),I>M&&(M=I),F<g&&(g=F),F>B&&(B=F)}return a[l+0]!==x||a[l+1]!==b||a[l+2]!==g||a[l+3]!==A||a[l+4]!==M||a[l+5]!==B?(a[l+0]=x,a[l+1]=b,a[l+2]=g,a[l+3]=A,a[l+4]=M,a[l+5]=B,!0):!1}else{const m=l+8,y=s[l+6],x=m+p,b=y+p;let g=v,A=!1,M=!1;e?g||(A=e.has(x),M=e.has(b),g=!A&&!M):(A=!0,M=!0);const B=g||A,P=g||M;let D=!1;B&&(D=u(m,p,g));let S=!1;P&&(S=u(y,p,g));const T=D||S;if(T)for(let I=0;I<3;I++){const F=m+I,E=y+I,U=a[F],tt=a[F+3],At=a[E],Mt=a[E+3];a[l+I]=U<At?U:At,a[l+I+3]=tt>Mt?tt:Mt}return T}}}function st(n,e,t,i,r){let o,s,c,a,d,f;const u=1/t.direction.x,l=1/t.direction.y,p=1/t.direction.z,v=t.origin.x,w=t.origin.y,h=t.origin.z;let m=e[n],y=e[n+3],x=e[n+1],b=e[n+3+1],g=e[n+2],A=e[n+3+2];return u>=0?(o=(m-v)*u,s=(y-v)*u):(o=(y-v)*u,s=(m-v)*u),l>=0?(c=(x-w)*l,a=(b-w)*l):(c=(b-w)*l,a=(x-w)*l),o>a||c>s||((c>o||isNaN(o))&&(o=c),(a<s||isNaN(s))&&(s=a),p>=0?(d=(g-h)*p,f=(A-h)*p):(d=(A-h)*p,f=(g-h)*p),o>f||d>s)?!1:((d>o||o!==o)&&(o=d),(f<s||s!==s)&&(s=f),o<=r&&s>=i)}function _i(n,e,t,i,r,o,s,c){const{geometry:a,_indirectBuffer:d}=n;for(let f=i,u=i+r;f<u;f++){let l=d?d[f]:f;ee(a,e,t,l,o,s,c)}}function Di(n,e,t,i,r,o,s){const{geometry:c,_indirectBuffer:a}=n;let d=1/0,f=null;for(let u=i,l=i+r;u<l;u++){let p;p=ee(c,e,t,a?a[u]:u,null,o,s),p&&p.distance<d&&(f=p,d=p.distance)}return f}function Si(n,e,t,i,r,o,s){const{geometry:c}=t,{index:a}=c,d=c.attributes.position;for(let f=n,u=e+n;f<u;f++){let l;if(l=t.resolveTriangleIndex(f),j(s,l*3,a,d),s.needsUpdate=!0,i(s,l,r,o))return!0}return!1}function Ii(n,e,t,i,r,o,s){R.setBuffer(n._roots[e]),we(0,n,t,i,r,o,s),R.clearBuffer()}function we(n,e,t,i,r,o,s){const{float32Array:c,uint16Array:a,uint32Array:d}=R,f=n*2;if(L(f,a)){const l=k(n,d),p=H(f,a);Mi(e,t,i,l,p,r,o,s)}else{const l=q(n);st(l,c,i,o,s)&&we(l,e,t,i,r,o,s);const p=O(n,d);st(p,c,i,o,s)&&we(p,e,t,i,r,o,s)}}const Ci=["x","y","z"];function Fi(n,e,t,i,r,o){R.setBuffer(n._roots[e]);const s=be(0,n,t,i,r,o);return R.clearBuffer(),s}function be(n,e,t,i,r,o){const{float32Array:s,uint16Array:c,uint32Array:a}=R;let d=n*2;if(L(d,c)){const u=k(n,a),l=H(d,c);return Pi(e,t,i,u,l,r,o)}else{const u=De(n,a),l=Ci[u],v=i.direction[l]>=0;let w,h;v?(w=q(n),h=O(n,a)):(w=O(n,a),h=q(n));const y=st(w,s,i,r,o)?be(w,e,t,i,r,o):null;if(y){const g=y.point[l];if(v?g<=s[h+u]:g>=s[h+u+3])return y}const b=st(h,s,i,r,o)?be(h,e,t,i,r,o):null;return y&&b?y.distance<=b.distance?y:b:y||b||null}}const Ot=new X,ft=new W,dt=new W,_t=new Q,Oe=new V,qt=new V;function Ei(n,e,t,i){R.setBuffer(n._roots[e]);const r=Ae(0,n,t,i);return R.clearBuffer(),r}function Ae(n,e,t,i,r=null){const{float32Array:o,uint16Array:s,uint32Array:c}=R;let a=n*2;if(r===null&&(t.boundingBox||t.computeBoundingBox(),Oe.set(t.boundingBox.min,t.boundingBox.max,i),r=Oe),L(a,s)){const f=e.geometry,u=f.index,l=f.attributes.position,p=t.index,v=t.attributes.position,w=k(n,c),h=H(a,s);if(_t.copy(i).invert(),t.boundsTree)return N(n,o,qt),qt.matrix.copy(_t),qt.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:y=>qt.intersectsBox(y),intersectsTriangle:y=>{y.a.applyMatrix4(i),y.b.applyMatrix4(i),y.c.applyMatrix4(i),y.needsUpdate=!0;for(let x=w*3,b=(h+w)*3;x<b;x+=3)if(j(dt,x,u,l),dt.needsUpdate=!0,y.intersectsTriangle(dt))return!0;return!1}});for(let m=w*3,y=(h+w)*3;m<y;m+=3){j(ft,m,u,l),ft.a.applyMatrix4(_t),ft.b.applyMatrix4(_t),ft.c.applyMatrix4(_t),ft.needsUpdate=!0;for(let x=0,b=p.count;x<b;x+=3)if(j(dt,x,p,v),dt.needsUpdate=!0,ft.intersectsTriangle(dt))return!0}}else{const f=n+8,u=c[n+6];return N(f,o,Ot),!!(r.intersectsBox(Ot)&&Ae(f,e,t,i,r)||(N(u,o,Ot),r.intersectsBox(Ot)&&Ae(u,e,t,i,r)))}}const Gt=new Q,ue=new V,Dt=new V,zi=new C,Ri=new C,Ni=new C,Ui=new C;function ji(n,e,t,i={},r={},o=0,s=1/0){e.boundingBox||e.computeBoundingBox(),ue.set(e.boundingBox.min,e.boundingBox.max,t),ue.needsUpdate=!0;const c=n.geometry,a=c.attributes.position,d=c.index,f=e.attributes.position,u=e.index,l=G.getPrimitive(),p=G.getPrimitive();let v=zi,w=Ri,h=null,m=null;r&&(h=Ni,m=Ui);let y=1/0,x=null,b=null;return Gt.copy(t).invert(),Dt.matrix.copy(Gt),n.shapecast({boundsTraverseOrder:g=>ue.distanceToBox(g),intersectsBounds:(g,A,M)=>M<y&&M<s?(A&&(Dt.min.copy(g.min),Dt.max.copy(g.max),Dt.needsUpdate=!0),!0):!1,intersectsRange:(g,A)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:B=>Dt.distanceToBox(B),intersectsBounds:(B,P,D)=>D<y&&D<s,intersectsRange:(B,P)=>{for(let D=B,S=B+P;D<S;D++){j(p,3*D,u,f),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let T=g,I=g+A;T<I;T++){j(l,3*T,d,a),l.needsUpdate=!0;const F=l.distanceToTriangle(p,v,h);if(F<y&&(w.copy(v),m&&m.copy(h),y=F,x=T,b=D),F<o)return!0}}}});{const M=bt(e);for(let B=0,P=M;B<P;B++){j(p,3*B,u,f),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let D=g,S=g+A;D<S;D++){j(l,3*D,d,a),l.needsUpdate=!0;const T=l.distanceToTriangle(p,v,h);if(T<y&&(w.copy(v),m&&m.copy(h),y=T,x=D,b=B),T<o)return!0}}}}}),G.releasePrimitive(l),G.releasePrimitive(p),y===1/0?null:(i.point?i.point.copy(w):i.point=w.clone(),i.distance=y,i.faceIndex=x,r&&(r.point?r.point.copy(m):r.point=m.clone(),r.point.applyMatrix4(Gt),w.applyMatrix4(Gt),r.distance=w.sub(r.point).length(),r.faceIndex=b),i)}function Li(n,e=null){e&&Array.isArray(e)&&(e=new Set(e));const t=n.geometry,i=t.index?t.index.array:null,r=t.attributes.position;let o,s,c,a,d=0;const f=n._roots;for(let l=0,p=f.length;l<p;l++)o=f[l],s=new Uint32Array(o),c=new Uint16Array(o),a=new Float32Array(o),u(0,d),d+=o.byteLength;function u(l,p,v=!1){const w=l*2;if(c[w+15]===te){const m=s[l+6],y=c[w+14];let x=1/0,b=1/0,g=1/0,A=-1/0,M=-1/0,B=-1/0;for(let P=m,D=m+y;P<D;P++){const S=3*n.resolveTriangleIndex(P);for(let T=0;T<3;T++){let I=S+T;I=i?i[I]:I;const F=r.getX(I),E=r.getY(I),U=r.getZ(I);F<x&&(x=F),F>A&&(A=F),E<b&&(b=E),E>M&&(M=E),U<g&&(g=U),U>B&&(B=U)}}return a[l+0]!==x||a[l+1]!==b||a[l+2]!==g||a[l+3]!==A||a[l+4]!==M||a[l+5]!==B?(a[l+0]=x,a[l+1]=b,a[l+2]=g,a[l+3]=A,a[l+4]=M,a[l+5]=B,!0):!1}else{const m=l+8,y=s[l+6],x=m+p,b=y+p;let g=v,A=!1,M=!1;e?g||(A=e.has(x),M=e.has(b),g=!A&&!M):(A=!0,M=!0);const B=g||A,P=g||M;let D=!1;B&&(D=u(m,p,g));let S=!1;P&&(S=u(y,p,g));const T=D||S;if(T)for(let I=0;I<3;I++){const F=m+I,E=y+I,U=a[F],tt=a[F+3],At=a[E],Mt=a[E+3];a[l+I]=U<At?U:At,a[l+I+3]=tt>Mt?tt:Mt}return T}}}function Vi(n,e,t,i,r,o,s){R.setBuffer(n._roots[e]),Me(0,n,t,i,r,o,s),R.clearBuffer()}function Me(n,e,t,i,r,o,s){const{float32Array:c,uint16Array:a,uint32Array:d}=R,f=n*2;if(L(f,a)){const l=k(n,d),p=H(f,a);_i(e,t,i,l,p,r,o,s)}else{const l=q(n);st(l,c,i,o,s)&&Me(l,e,t,i,r,o,s);const p=O(n,d);st(p,c,i,o,s)&&Me(p,e,t,i,r,o,s)}}const ki=["x","y","z"];function Hi(n,e,t,i,r,o){R.setBuffer(n._roots[e]);const s=Pe(0,n,t,i,r,o);return R.clearBuffer(),s}function Pe(n,e,t,i,r,o){const{float32Array:s,uint16Array:c,uint32Array:a}=R;let d=n*2;if(L(d,c)){const u=k(n,a),l=H(d,c);return Di(e,t,i,u,l,r,o)}else{const u=De(n,a),l=ki[u],v=i.direction[l]>=0;let w,h;v?(w=q(n),h=O(n,a)):(w=O(n,a),h=q(n));const y=st(w,s,i,r,o)?Pe(w,e,t,i,r,o):null;if(y){const g=y.point[l];if(v?g<=s[h+u]:g>=s[h+u+3])return y}const b=st(h,s,i,r,o)?Pe(h,e,t,i,r,o):null;return y&&b?y.distance<=b.distance?y:b:y||b||null}}const $t=new X,pt=new W,mt=new W,St=new Q,qe=new V,Wt=new V;function Oi(n,e,t,i){R.setBuffer(n._roots[e]);const r=Be(0,n,t,i);return R.clearBuffer(),r}function Be(n,e,t,i,r=null){const{float32Array:o,uint16Array:s,uint32Array:c}=R;let a=n*2;if(r===null&&(t.boundingBox||t.computeBoundingBox(),qe.set(t.boundingBox.min,t.boundingBox.max,i),r=qe),L(a,s)){const f=e.geometry,u=f.index,l=f.attributes.position,p=t.index,v=t.attributes.position,w=k(n,c),h=H(a,s);if(St.copy(i).invert(),t.boundsTree)return N(n,o,Wt),Wt.matrix.copy(St),Wt.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:y=>Wt.intersectsBox(y),intersectsTriangle:y=>{y.a.applyMatrix4(i),y.b.applyMatrix4(i),y.c.applyMatrix4(i),y.needsUpdate=!0;for(let x=w,b=h+w;x<b;x++)if(j(mt,3*e.resolveTriangleIndex(x),u,l),mt.needsUpdate=!0,y.intersectsTriangle(mt))return!0;return!1}});for(let m=w,y=h+w;m<y;m++){const x=e.resolveTriangleIndex(m);j(pt,3*x,u,l),pt.a.applyMatrix4(St),pt.b.applyMatrix4(St),pt.c.applyMatrix4(St),pt.needsUpdate=!0;for(let b=0,g=p.count;b<g;b+=3)if(j(mt,b,p,v),mt.needsUpdate=!0,pt.intersectsTriangle(mt))return!0}}else{const f=n+8,u=c[n+6];return N(f,o,$t),!!(r.intersectsBox($t)&&Be(f,e,t,i,r)||(N(u,o,$t),r.intersectsBox($t)&&Be(u,e,t,i,r)))}}const Xt=new Q,fe=new V,It=new V,qi=new C,Gi=new C,$i=new C,Wi=new C;function Xi(n,e,t,i={},r={},o=0,s=1/0){e.boundingBox||e.computeBoundingBox(),fe.set(e.boundingBox.min,e.boundingBox.max,t),fe.needsUpdate=!0;const c=n.geometry,a=c.attributes.position,d=c.index,f=e.attributes.position,u=e.index,l=G.getPrimitive(),p=G.getPrimitive();let v=qi,w=Gi,h=null,m=null;r&&(h=$i,m=Wi);let y=1/0,x=null,b=null;return Xt.copy(t).invert(),It.matrix.copy(Xt),n.shapecast({boundsTraverseOrder:g=>fe.distanceToBox(g),intersectsBounds:(g,A,M)=>M<y&&M<s?(A&&(It.min.copy(g.min),It.max.copy(g.max),It.needsUpdate=!0),!0):!1,intersectsRange:(g,A)=>{if(e.boundsTree){const M=e.boundsTree;return M.shapecast({boundsTraverseOrder:B=>It.distanceToBox(B),intersectsBounds:(B,P,D)=>D<y&&D<s,intersectsRange:(B,P)=>{for(let D=B,S=B+P;D<S;D++){const T=M.resolveTriangleIndex(D);j(p,3*T,u,f),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let I=g,F=g+A;I<F;I++){const E=n.resolveTriangleIndex(I);j(l,3*E,d,a),l.needsUpdate=!0;const U=l.distanceToTriangle(p,v,h);if(U<y&&(w.copy(v),m&&m.copy(h),y=U,x=I,b=D),U<o)return!0}}}})}else{const M=bt(e);for(let B=0,P=M;B<P;B++){j(p,3*B,u,f),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let D=g,S=g+A;D<S;D++){const T=n.resolveTriangleIndex(D);j(l,3*T,d,a),l.needsUpdate=!0;const I=l.distanceToTriangle(p,v,h);if(I<y&&(w.copy(v),m&&m.copy(h),y=I,x=D,b=B),I<o)return!0}}}}}),G.releasePrimitive(l),G.releasePrimitive(p),y===1/0?null:(i.point?i.point.copy(w):i.point=w.clone(),i.distance=y,i.faceIndex=x,r&&(r.point?r.point.copy(m):r.point=m.clone(),r.point.applyMatrix4(Xt),w.applyMatrix4(Xt),r.distance=w.sub(r.point).length(),r.faceIndex=b),i)}function Yi(){return typeof SharedArrayBuffer<"u"}const zt=new R.constructor,Qt=new R.constructor,nt=new Ie(()=>new X),yt=new X,ht=new X,de=new X,pe=new X;let me=!1;function Zi(n,e,t,i){if(me)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");me=!0;const r=n._roots,o=e._roots;let s,c=0,a=0;const d=new Q().copy(t).invert();for(let f=0,u=r.length;f<u;f++){zt.setBuffer(r[f]),a=0;const l=nt.getPrimitive();N(0,zt.float32Array,l),l.applyMatrix4(d);for(let p=0,v=o.length;p<v&&(Qt.setBuffer(o[p]),s=$(0,0,t,d,i,c,a,0,0,l),Qt.clearBuffer(),a+=o[p].length,!s);p++);if(nt.releasePrimitive(l),zt.clearBuffer(),c+=r[f].length,s)break}return me=!1,s}function $(n,e,t,i,r,o=0,s=0,c=0,a=0,d=null,f=!1){let u,l;f?(u=Qt,l=zt):(u=zt,l=Qt);const p=u.float32Array,v=u.uint32Array,w=u.uint16Array,h=l.float32Array,m=l.uint32Array,y=l.uint16Array,x=n*2,b=e*2,g=L(x,w),A=L(b,y);let M=!1;if(A&&g)f?M=r(k(e,m),H(e*2,y),k(n,v),H(n*2,w),a,s+e,c,o+n):M=r(k(n,v),H(n*2,w),k(e,m),H(e*2,y),c,o+n,a,s+e);else if(A){const B=nt.getPrimitive();N(e,h,B),B.applyMatrix4(t);const P=q(n),D=O(n,v);N(P,p,yt),N(D,p,ht);const S=B.intersectsBox(yt),T=B.intersectsBox(ht);M=S&&$(e,P,i,t,r,s,o,a,c+1,B,!f)||T&&$(e,D,i,t,r,s,o,a,c+1,B,!f),nt.releasePrimitive(B)}else{const B=q(e),P=O(e,m);N(B,h,de),N(P,h,pe);const D=d.intersectsBox(de),S=d.intersectsBox(pe);if(D&&S)M=$(n,B,t,i,r,o,s,c,a+1,d,f)||$(n,P,t,i,r,o,s,c,a+1,d,f);else if(D)if(g)M=$(n,B,t,i,r,o,s,c,a+1,d,f);else{const T=nt.getPrimitive();T.copy(de).applyMatrix4(t);const I=q(n),F=O(n,v);N(I,p,yt),N(F,p,ht);const E=T.intersectsBox(yt),U=T.intersectsBox(ht);M=E&&$(B,I,i,t,r,s,o,a,c+1,T,!f)||U&&$(B,F,i,t,r,s,o,a,c+1,T,!f),nt.releasePrimitive(T)}else if(S)if(g)M=$(n,P,t,i,r,o,s,c,a+1,d,f);else{const T=nt.getPrimitive();T.copy(pe).applyMatrix4(t);const I=q(n),F=O(n,v);N(I,p,yt),N(F,p,ht);const E=T.intersectsBox(yt),U=T.intersectsBox(ht);M=E&&$(P,I,i,t,r,s,o,a,c+1,T,!f)||U&&$(P,F,i,t,r,s,o,a,c+1,T,!f),nt.releasePrimitive(T)}}return M}const Yt=new V,Ge=new X,Ki={strategy:Ke,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null};class Ce{static serialize(e,t={}){t={cloneBuffers:!0,...t};const i=e.geometry,r=e._roots,o=e._indirectBuffer,s=i.getIndex();let c;return t.cloneBuffers?c={roots:r.map(a=>a.slice()),index:s?s.array.slice():null,indirectBuffer:o?o.slice():null}:c={roots:r,index:s?s.array:null,indirectBuffer:o},c}static deserialize(e,t,i={}){i={setIndex:!0,indirect:!!e.indirectBuffer,...i};const{index:r,roots:o,indirectBuffer:s}=e,c=new Ce(t,{...i,[se]:!0});if(c._roots=o,c._indirectBuffer=s||null,i.setIndex){const a=t.getIndex();if(a===null){const d=new Te(e.index,1,!1);t.setIndex(d)}else a.array!==r&&(a.array.set(r),a.needsUpdate=!0)}return c}get indirect(){return!!this._indirectBuffer}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(t=Object.assign({...Ki,[se]:!1},t),t.useSharedArrayBuffer&&!Yi())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=e,this._roots=null,this._indirectBuffer=null,t[se]||(di(this,t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new X))),this.resolveTriangleIndex=t.indirect?i=>this._indirectBuffer[i]:i=>i}refit(e=null){return(this.indirect?Li:Ti)(this,e)}traverse(e,t=0){const i=this._roots[t],r=new Uint32Array(i),o=new Uint16Array(i);s(0);function s(c,a=0){const d=c*2,f=o[d+15]===te;if(f){const u=r[c+6],l=o[d+14];e(a,f,new Float32Array(i,c*4,6),u,l)}else{const u=c+rt/4,l=r[c+6],p=r[c+7];e(a,f,new Float32Array(i,c*4,6),p)||(s(u,a+1),s(l,a+1))}}}raycast(e,t=Fe,i=0,r=1/0){const o=this._roots,s=this.geometry,c=[],a=t.isMaterial,d=Array.isArray(t),f=s.groups,u=a?t.side:t,l=this.indirect?Vi:Ii;for(let p=0,v=o.length;p<v;p++){const w=d?t[f[p].materialIndex].side:u,h=c.length;if(l(this,p,w,e,c,i,r),d){const m=f[p].materialIndex;for(let y=h,x=c.length;y<x;y++)c[y].face.materialIndex=m}}return c}raycastFirst(e,t=Fe,i=0,r=1/0){const o=this._roots,s=this.geometry,c=t.isMaterial,a=Array.isArray(t);let d=null;const f=s.groups,u=c?t.side:t,l=this.indirect?Hi:Fi;for(let p=0,v=o.length;p<v;p++){const w=a?t[f[p].materialIndex].side:u,h=l(this,p,w,e,i,r);h!=null&&(d==null||h.distance<d.distance)&&(d=h,a&&(h.face.materialIndex=f[p].materialIndex))}return d}intersectsGeometry(e,t){let i=!1;const r=this._roots,o=this.indirect?Oi:Ei;for(let s=0,c=r.length;s<c&&(i=o(this,s,e,t),!i);s++);return i}shapecast(e){const t=G.getPrimitive(),i=this.indirect?Si:Bi;let{boundsTraverseOrder:r,intersectsBounds:o,intersectsRange:s,intersectsTriangle:c}=e;if(s&&c){const u=s;s=(l,p,v,w,h)=>u(l,p,v,w,h)?!0:i(l,p,this,c,v,w,t)}else s||(c?s=(u,l,p,v)=>i(u,l,this,c,p,v,t):s=(u,l,p)=>p);let a=!1,d=0;const f=this._roots;for(let u=0,l=f.length;u<l;u++){const p=f[u];if(a=gi(this,u,o,s,r,d),a)break;d+=p.byteLength}return G.releasePrimitive(t),a}bvhcast(e,t,i){let{intersectsRanges:r,intersectsTriangles:o}=i;const s=G.getPrimitive(),c=this.geometry.index,a=this.geometry.attributes.position,d=this.indirect?v=>{const w=this.resolveTriangleIndex(v);j(s,w*3,c,a)}:v=>{j(s,v*3,c,a)},f=G.getPrimitive(),u=e.geometry.index,l=e.geometry.attributes.position,p=e.indirect?v=>{const w=e.resolveTriangleIndex(v);j(f,w*3,u,l)}:v=>{j(f,v*3,u,l)};if(o){const v=(w,h,m,y,x,b,g,A)=>{for(let M=m,B=m+y;M<B;M++){p(M),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let P=w,D=w+h;P<D;P++)if(d(P),s.needsUpdate=!0,o(s,f,P,M,x,b,g,A))return!0}return!1};if(r){const w=r;r=function(h,m,y,x,b,g,A,M){return w(h,m,y,x,b,g,A,M)?!0:v(h,m,y,x,b,g,A,M)}}else r=v}return Zi(this,e,t,r)}intersectsBox(e,t){return Yt.set(e.min,e.max,t),Yt.needsUpdate=!0,this.shapecast({intersectsBounds:i=>Yt.intersectsBox(i),intersectsTriangle:i=>Yt.intersectsTriangle(i)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,i={},r={},o=0,s=1/0){return(this.indirect?Xi:ji)(this,e,t,i,r,o,s)}closestPointToPoint(e,t={},i=0,r=1/0){return vi(this,e,t,i,r)}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(i=>{N(0,new Float32Array(i),Ge),e.union(Ge)}),e}}function Qi(n){switch(n){case 1:return"R";case 2:return"RG";case 3:return"RGBA";case 4:return"RGBA"}throw new Error}function Ji(n){switch(n){case 1:return kn;case 2:return Vn;case 3:return Kt;case 4:return Kt}}function $e(n){switch(n){case 1:return Ln;case 2:return Ze;case 3:return he;case 4:return he}}class on extends ye{constructor(){super(),this.minFilter=gt,this.magFilter=gt,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(e){const t=this.overrideItemSize,i=e.itemSize,r=e.count;if(t!==null){if(i*r%t!==0)throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");e.itemSize=t,e.count=r*i/t}const o=e.itemSize,s=e.count,c=e.normalized,a=e.array.constructor,d=a.BYTES_PER_ELEMENT;let f=this._forcedType,u=o;if(f===null)switch(a){case Float32Array:f=Et;break;case Uint8Array:case Uint16Array:case Uint32Array:f=Ft;break;case Int8Array:case Int16Array:case Int32Array:f=ie;break}let l,p,v,w,h=Qi(o);switch(f){case Et:v=1,p=Ji(o),c&&d===1?(w=a,h+="8",a===Uint8Array?l=Ee:(l=ze,h+="_SNORM")):(w=Float32Array,h+="32F",l=Et);break;case ie:h+=d*8+"I",v=c?Math.pow(2,a.BYTES_PER_ELEMENT*8-1):1,p=$e(o),d===1?(w=Int8Array,l=ze):d===2?(w=Int16Array,l=jn):(w=Int32Array,l=ie);break;case Ft:h+=d*8+"UI",v=c?Math.pow(2,a.BYTES_PER_ELEMENT*8-1):1,p=$e(o),d===1?(w=Uint8Array,l=Ee):d===2?(w=Uint16Array,l=Un):(w=Uint32Array,l=Ft);break}u===3&&(p===Kt||p===he)&&(u=4);const m=Math.ceil(Math.sqrt(s))||1,y=u*m*m,x=new w(y),b=e.normalized;e.normalized=!1;for(let g=0;g<s;g++){const A=u*g;x[A]=e.getX(g)/v,o>=2&&(x[A+1]=e.getY(g)/v),o>=3&&(x[A+2]=e.getZ(g)/v,u===4&&(x[A+3]=1)),o>=4&&(x[A+3]=e.getW(g)/v)}e.normalized=b,this.internalFormat=h,this.format=p,this.type=l,this.image.width=m,this.image.height=m,this.image.data=x,this.needsUpdate=!0,this.dispose(),e.itemSize=i,e.count=r}}class tr extends on{constructor(){super(),this._forcedType=Ft}}class er extends on{constructor(){super(),this._forcedType=Et}}class cn{constructor(){this.index=new tr,this.position=new er,this.bvhBounds=new ye,this.bvhContents=new ye,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(e){const{geometry:t}=e;if(ir(e,this.bvhBounds,this.bvhContents),this.position.updateFrom(t.attributes.position),e.indirect){const i=e._indirectBuffer;if(this._cachedIndexAttr===null||this._cachedIndexAttr.count!==i.length)if(t.index)this._cachedIndexAttr=t.index.clone();else{const r=tn(Je(t));this._cachedIndexAttr=new Te(r,1,!1)}nr(t,i,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(t.index)}dispose(){const{index:e,position:t,bvhBounds:i,bvhContents:r}=this;e&&e.dispose(),t&&t.dispose(),i&&i.dispose(),r&&r.dispose()}}function nr(n,e,t){const i=t.array,r=n.index?n.index.array:null;for(let o=0,s=e.length;o<s;o++){const c=3*o,a=3*e[o];for(let d=0;d<3;d++)i[c+d]=r?r[a+d]:a+d}}function ir(n,e,t){const i=n._roots;if(i.length!==1)throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");const r=i[0],o=new Uint16Array(r),s=new Uint32Array(r),c=new Float32Array(r),a=r.byteLength/rt,d=2*Math.ceil(Math.sqrt(a/2)),f=new Float32Array(4*d*d),u=Math.ceil(Math.sqrt(a)),l=new Uint32Array(2*u*u);for(let p=0;p<a;p++){const v=p*rt/4,w=v*2,h=v;for(let m=0;m<3;m++)f[8*p+0+m]=c[h+0+m],f[8*p+4+m]=c[h+3+m];if(L(w,o)){const m=H(w,o),y=k(v,s),x=4294901760|m;l[p*2+0]=x,l[p*2+1]=y}else{const m=4*O(v,s)/rt,y=De(v,s);l[p*2+0]=y,l[p*2+1]=m}}e.image.data=f,e.image.width=d,e.image.height=d,e.format=Kt,e.type=Et,e.internalFormat="RGBA32F",e.minFilter=gt,e.magFilter=gt,e.generateMipmaps=!1,e.needsUpdate=!0,e.dispose(),t.image.data=l,t.image.width=u,t.image.height=u,t.format=Ze,t.type=Ft,t.internalFormat="RG32UI",t.minFilter=gt,t.magFilter=gt,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose()}const rr=`

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
`,sr=`

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
`,or=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`,cr=or,ar=`
	${rr}
	${sr}
`,lr=Fn({envMap:null,bounces:3,ior:2.4,correctMips:!0,aberrationStrength:.01,fresnel:0,bvh:new cn,color:new Hn("white"),opacity:1,resolution:new lt,viewMatrixInverse:new Q,projectionMatrixInverse:new Q},`
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
  ${cr}
  ${ar}
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
    #include <${En>=154?"colorspace_fragment":"encodings_fragment"}>
  }`),ur=n=>n&&n.isCubeTexture;function fr({aberrationStrength:n=0,fastChroma:e=!0,envMap:t,...i}){an({MeshRefractionMaterial:lr});const r=z.useRef(null),{size:o}=Xe(),s=z.useMemo(()=>{var c,a;const d={},f=ur(t),l=((c=f?(a=t.image[0])==null?void 0:a.width:t.image.width)!==null&&c!==void 0?c:1024)/4,p=Math.floor(Math.log2(l)),v=Math.pow(2,p),w=3*Math.max(v,112),h=4*v;return f&&(d.ENVMAP_TYPE_CUBEM=""),d.CUBEUV_TEXEL_WIDTH=`${1/w}`,d.CUBEUV_TEXEL_HEIGHT=`${1/h}`,d.CUBEUV_MAX_MIP=`${p}.0`,n>0&&(d.CHROMATIC_ABERRATIONS=""),e&&(d.FAST_CHROMA=""),d},[n,e]);return z.useLayoutEffect(()=>{var c;const a=(c=r.current)==null||(c=c.__r3f)==null||(c=c.parent)==null||(c=c.object)==null?void 0:c.geometry;a&&(r.current.bvh=new cn,r.current.bvh.updateFrom(new Ce(a.clone().toNonIndexed(),{strategy:Qe})))},[]),Rt(({camera:c})=>{r.current.viewMatrixInverse=c.matrixWorld,r.current.projectionMatrixInverse=c.projectionMatrixInverse}),z.createElement("meshRefractionMaterial",Cn({key:JSON.stringify(s),defines:s,ref:r,resolution:[o.width,o.height],aberrationStrength:n,envMap:t},i))}const Jt=["D4","D6","D8","D10","D12","D20"],dr=["#ff365f","#ff8e3a","#ffe86a","#63f6ad","#53c9ff","#a978ff"];function pr(){const n=[[0,1.72,0],[0,-1.72,0]],e=1.48;for(let r=0;r<10;r+=1){const o=r*Math.PI/5;n.push([Math.cos(o)*e,r%2===0?.42:-.42,Math.sin(o)*e])}const t=[];for(let r=0;r<10;r+=2){const o=r+2,s=(r+9)%10+2,c=(r+1)%10+2;t.push(0,s,o,0,o,c)}for(let r=1;r<10;r+=2){const o=r+2,s=(r+9)%10+2,c=(r+1)%10+2;t.push(1,c,o,1,o,s)}const i=new Yn;return i.setAttribute("position",new Zn(n.flat(),3)),i.setIndex(t),i.computeVertexNormals(),i.center(),i}function We({die:n}){const e=z.useMemo(()=>{const i=new Xn(3.05,3.05,3.05);return i.clearGroups(),i},[]),t=z.useMemo(pr,[]);return z.useEffect(()=>()=>{e.dispose(),t.dispose()},[e,t]),n==="D4"?_.jsx("tetrahedronGeometry",{args:[2.2,0]}):n==="D6"?_.jsx("primitive",{object:e,attach:"geometry"}):n==="D8"?_.jsx("octahedronGeometry",{args:[2.35,0]}):n==="D10"?_.jsx("primitive",{object:t,attach:"geometry"}):n==="D12"?_.jsx("dodecahedronGeometry",{args:[1.92,0]}):_.jsx("icosahedronGeometry",{args:[2.05,0]})}function mr({onReady:n}){const e=Xe(i=>i.scene),t=z.useRef(null);return Rt(()=>{e.environment&&t.current!==e.environment&&(t.current=e.environment,n(e.environment))}),_.jsxs(Sn,{resolution:256,frames:1,environmentIntensity:1.35,children:[_.jsx(Nt,{intensity:5.5,color:"#fff8e9",position:[-6,4,3],scale:[3,9,1]}),_.jsx(Nt,{intensity:3.2,color:"#65d9ff",position:[5,-1,2],scale:[4,5,1]}),_.jsx(Nt,{intensity:3.8,color:"#ff5f9e",position:[1,5,-5],scale:[7,2,1]}),_.jsx(Nt,{intensity:2.4,color:"#9b76ff",position:[-2,-5,-2],scale:[5,3,1]}),_.jsxs("mesh",{position:[0,0,-8],children:[_.jsx("planeGeometry",{args:[24,18]}),_.jsx("meshBasicMaterial",{color:"#02030a"})]})]})}function yr({count:n,speed:e}){const t=z.useMemo(()=>{const i=new xn,r=new $n({color:"#d9f8ff",transparent:!0,opacity:.85,blending:wt,depthWrite:!1,toneMapped:!1}),o=new gn({duration:4,looping:!0,worldSpace:!0,shape:new Mn({radius:2.8,thickness:.72}),startLife:new ne(1.2,3.2),startSpeed:new ne(.06,.42),startSize:new ne(.025,.1),startColor:new An(new Wn(.62,.9,1,.9)),emissionOverTime:new bn(n),renderMode:wn.BillBoard,material:r,behaviors:[new vn(new Pn([[new Bn(0,1,.7,0),0]]))]});return o.emitter.position.set(2.8,.45,0),i.addSystem(o),o.play(),{batch:i,material:r,system:o}},[n]);return Rt((i,r)=>t.batch.update(Math.min(r,.05)*e)),z.useEffect(()=>()=>{t.batch.deleteSystem(t.system),t.system.dispose(),t.material.dispose()},[t]),_.jsxs(_.Fragment,{children:[_.jsx("primitive",{object:t.system.emitter}),_.jsx("primitive",{object:t.batch})]})}function hr({strength:n}){const e=z.useRef(),t=z.useRef(),i=z.useMemo(()=>new C(-9,4.2,4.4),[]),r=z.useMemo(()=>new C(2.8,.45,0),[]),o=z.useMemo(()=>{const s=r.clone().sub(i),c=i.clone().add(r).multiplyScalar(.5),a=new Gn().setFromUnitVectors(new C(0,1,0),s.clone().normalize());return{length:s.length(),midpoint:c,quaternion:a}},[r,i]);return z.useEffect(()=>{e.current&&t.current&&(e.current.target=t.current)},[]),_.jsxs("group",{children:[_.jsx("object3D",{ref:t,position:r}),_.jsx("spotLight",{ref:e,position:i,color:"#fff7de",intensity:38*n,distance:34,angle:.24,penumbra:.72,decay:1.55}),_.jsxs("mesh",{position:o.midpoint,quaternion:o.quaternion,renderOrder:-2,children:[_.jsx("cylinderGeometry",{args:[.12,1.15,o.length,32,1,!0]}),_.jsx("meshBasicMaterial",{color:"#dff8ff",transparent:!0,opacity:.065*n,blending:wt,depthWrite:!1,side:_e})]}),_.jsxs("mesh",{position:o.midpoint,quaternion:o.quaternion,renderOrder:-1,children:[_.jsx("cylinderGeometry",{args:[.025,.16,o.length,16,1,!0]}),_.jsx("meshBasicMaterial",{color:"#fffef5",transparent:!0,opacity:.32*n,blending:wt,depthWrite:!1})]})]})}function xr({body:n,dispersion:e}){const t=z.useRef();return Rt(()=>{if(!n.current||!t.current)return;const i=n.current.rotation();t.current.rotation.z=K.damp(t.current.rotation.z,i.z*.65+i.x*.18,4,1/60),t.current.rotation.y=K.damp(t.current.rotation.y,i.y*.12,4,1/60);const r=.72+Math.abs(i.y)*.28;t.current.children.forEach((o,s)=>{o.material.opacity=(.08+s*.008)*e*r})}),_.jsx("group",{ref:t,position:[2.8,.45,-.15],children:dr.map((i,r)=>_.jsxs("mesh",{position:[5.6,(r-2.5)*.32,r*-.035],rotation:[0,0,(r-2.5)*.035],children:[_.jsx("planeGeometry",{args:[11.2,.22+r*.012]}),_.jsx("meshBasicMaterial",{color:i,transparent:!0,opacity:.1,blending:wt,depthWrite:!1,side:_e})]},i))})}function gr({die:n,envMap:e,dispersion:t,speed:i,onDraggingChange:r}){const o=z.useRef(),s=z.useRef(null),c=z.useRef(!1);Rt(()=>{!o.current||c.current||(o.current.setAngvel({x:.025*i,y:.09*i,z:.015*i},!0),c.current=!0)}),z.useEffect(()=>{c.current=!1},[n]),z.useEffect(()=>()=>{document.body.style.cursor=""},[]);const a=u=>{var l;u.stopPropagation(),u.target.setPointerCapture(u.pointerId),s.current={x:u.clientX,y:u.clientY,moved:!1},(l=o.current)==null||l.setAngvel({x:0,y:0,z:0},!0),document.body.style.cursor="grabbing",r(!0)},d=u=>{if(!s.current||!o.current)return;u.stopPropagation();const l=u.clientX-s.current.x,p=u.clientY-s.current.y;s.current={x:u.clientX,y:u.clientY,moved:s.current.moved||Math.abs(l)+Math.abs(p)>1},o.current.setAngvel({x:K.clamp(p*.035,-2.4,2.4),y:K.clamp(l*.035,-2.4,2.4),z:K.clamp((l-p)*.006,-.65,.65)},!0)},f=u=>{if(s.current){s.current=null;try{u.target.releasePointerCapture(u.pointerId)}catch{}document.body.style.cursor="grab",r(!1)}};return _.jsxs(_.Fragment,{children:[_.jsx(xr,{body:o,dispersion:t}),_.jsxs(yn,{ref:o,position:[2.8,.45,0],rotation:[.42,-.58,.18],colliders:!1,gravityScale:0,linearDamping:8,angularDamping:.55,enabledTranslations:[!1,!1,!1],children:[_.jsx(hn,{args:[1.45],sensor:!0}),_.jsxs("mesh",{onPointerDown:a,onPointerMove:d,onPointerUp:f,onPointerCancel:f,onPointerOver:()=>{s.current||(document.body.style.cursor="grab")},onPointerOut:()=>{s.current||(document.body.style.cursor="")},children:[_.jsx(We,{die:n}),_.jsx(fr,{envMap:e,bounces:8,ior:1.45,fresnel:.42,aberrationStrength:.028+t*.072,fastChroma:!1,color:"#d9f8ff",transparent:!0,opacity:.76,toneMapped:!1}),_.jsx(Kn,{scale:1.002,threshold:8,color:"#d9f8ff"})]}),_.jsxs("mesh",{scale:.35,children:[_.jsx(We,{die:n}),_.jsx("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:.055,blending:wt,depthWrite:!1})]}),_.jsx("pointLight",{color:"#bcecff",intensity:8+t*14,distance:8})]},n)]})}function vr(){return _.jsxs("group",{children:[_.jsxs("mesh",{position:[2.8,-2.55,-1.5],rotation:[-Math.PI/2,0,0],children:[_.jsx("planeGeometry",{args:[31,22]}),_.jsx(In,{resolution:512,blur:[280,90],mixBlur:1.2,mixStrength:16,roughness:.72,depthScale:.45,color:"#020309",metalness:.48})]}),[3.6,4.8,6.2].map((n,e)=>_.jsxs("mesh",{position:[2.8,.45,-2.6],rotation:[0,0,e*.45],children:[_.jsx("torusGeometry",{args:[n,.012,5,160]}),_.jsx("meshBasicMaterial",{color:e===1?"#ff6f91":"#75dfff",transparent:!0,opacity:.13-e*.025,blending:wt})]},n))]})}function wr({settings:n,onDraggingChange:e}){const[t,i]=z.useState(null),r=K.clamp(Math.round(n.die??2),0,Jt.length-1),o=Jt[r],s=K.clamp((n.dispersion??68)/100,0,1),c=K.clamp((n.light??76)/100,.2,1),a=n.speed??1;return _.jsxs(_.Fragment,{children:[_.jsx("color",{attach:"background",args:["#010208"]}),_.jsx("fogExp2",{attach:"fog",args:["#010208",.028]}),_.jsx(mr,{onReady:i}),_.jsx("ambientLight",{intensity:.08}),_.jsx(hr,{strength:c}),_.jsx(vr,{}),_.jsx(yr,{count:Math.round(n.motes??44),speed:a}),t&&_.jsx(mn,{gravity:[0,0,0],timeStep:1/60,interpolate:!0,children:_.jsx(gr,{die:o,envMap:t,dispersion:s,speed:a,onDraggingChange:e})}),_.jsxs(un,{multisampling:_n,children:[_.jsx(fn,{mipmapBlur:!0,intensity:.95+c*.6,luminanceThreshold:.32,luminanceSmoothing:.5}),_.jsx(dn,{eskil:!1,offset:.18,darkness:.82}),_.jsx(pn,{})]}),_.jsx(Dn,{})]})}function Lr({settings:n={}}){const[e,t]=z.useState(!1),i=Jt[K.clamp(Math.round(n.die??2),0,Jt.length-1)];return _.jsxs("section",{className:`atmosphere prism-pulse-lab ${e?"is-dragging":""}`,style:{"--experiment-accent":"#77dcff"},children:[_.jsx(ln,{className:"prism-pulse-lab__canvas",dpr:Tn,camera:{position:[0,.75,9.4],fov:43,near:.1,far:90},gl:{antialias:!0,alpha:!1,powerPreference:"high-performance"},onCreated:({gl:r})=>{r.outputColorSpace=On,r.toneMapping=qn,r.toneMappingExposure=1.08},children:_.jsx(z.Suspense,{fallback:null,children:_.jsx(wr,{settings:n,onDraggingChange:t})})}),_.jsx("div",{className:"prism-pulse-lab__veil"}),_.jsxs("div",{className:"experiment-copy",children:[_.jsxs("p",{children:["07 — Refractive geometry / ",i]}),_.jsxs("h1",{children:["Hold the",_.jsx("br",{}),"light itself."]}),_.jsx("span",{children:"A multi-bounce crystal die catches an off-camera beam, splitting the room into spectral paths. Drag the die and watch the light answer."})]}),_.jsxs("div",{className:"prism-pulse-lab__hint","aria-hidden":"true",children:[_.jsx("i",{}),_.jsx("span",{children:e?"Release to carry the momentum":"Drag the crystal to turn it"})]})]})}export{Lr as default};
