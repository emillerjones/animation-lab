import{S as bi}from"./three.module-C8jeBWGd.js";import{a3 as Ti,aj as ze,s as ai,D as oi,r as pi,ah as yi,ak as pt,al as L,am as Ni,ai as tt,y as $e,v as Oi,B as ct,x as Ai,a5 as Pi,a4 as Ei,T as Ui,V as Ge}from"./three.core-CI4oCR72.js";const k=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let hi=1234567;const gi=Math.PI/180,xi=180/Math.PI;function Ci(){const l=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(k[l&255]+k[l>>8&255]+k[l>>16&255]+k[l>>24&255]+"-"+k[t&255]+k[t>>8&255]+"-"+k[t>>16&15|64]+k[t>>24&255]+"-"+k[e&63|128]+k[e>>8&255]+"-"+k[e>>16&255]+k[e>>24&255]+k[i&255]+k[i>>8&255]+k[i>>16&255]+k[i>>24&255]).toLowerCase()}function rt(l,t,e){return Math.max(t,Math.min(e,l))}function vi(l,t){return(l%t+t)%t}function Bi(l,t,e,i,s){return i+(l-t)*(s-i)/(e-t)}function Ri(l,t,e){return l!==t?(e-l)/(t-l):0}function Si(l,t,e){return(1-e)*l+e*t}function Fi(l,t,e,i){return Si(l,t,1-Math.exp(-e*i))}function Vi(l,t=1){return t-Math.abs(vi(l,t*2)-t)}function ki(l,t,e){return l<=t?0:l>=e?1:(l=(l-t)/(e-t),l*l*(3-2*l))}function Ii(l,t,e){return l<=t?0:l>=e?1:(l=(l-t)/(e-t),l*l*l*(l*(l*6-15)+10))}function Ji(l,t){return l+Math.floor(Math.random()*(t-l+1))}function Li(l,t){return l+Math.random()*(t-l)}function Di(l){return l*(.5-Math.random())}function Gi(l){l!==void 0&&(hi=l);let t=hi+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Xi(l){return l*gi}function qi(l){return l*xi}function Yi(l){return(l&l-1)===0&&l!==0}function Hi(l){return Math.pow(2,Math.ceil(Math.log(l)/Math.LN2))}function Zi(l){return Math.pow(2,Math.floor(Math.log(l)/Math.LN2))}function Wi(l,t,e,i,s){const r=Math.cos,n=Math.sin,h=r(e/2),a=n(e/2),o=r((t+i)/2),c=n((t+i)/2),d=r((t-i)/2),m=n((t-i)/2),u=r((i-t)/2),f=n((i-t)/2);switch(s){case"XYX":l.set(h*c,a*d,a*m,h*o);break;case"YZY":l.set(a*m,h*c,a*d,h*o);break;case"ZXZ":l.set(a*d,a*m,h*c,h*o);break;case"XZX":l.set(h*c,a*f,a*u,h*o);break;case"YXY":l.set(a*u,h*c,a*f,h*o);break;case"ZYZ":l.set(a*f,a*u,h*c,h*o);break;default:console.warn("../math.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Qi(l,t){switch(t.constructor){case Float32Array:return l;case Uint32Array:return l/4294967295;case Uint16Array:return l/65535;case Uint8Array:return l/255;case Int32Array:return Math.max(l/2147483647,-1);case Int16Array:return Math.max(l/32767,-1);case Int8Array:return Math.max(l/127,-1);default:throw new Error("Invalid component type.")}}function Ki(l,t){switch(t.constructor){case Float32Array:return l;case Uint32Array:return Math.round(l*4294967295);case Uint16Array:return Math.round(l*65535);case Uint8Array:return Math.round(l*255);case Int32Array:return Math.round(l*2147483647);case Int16Array:return Math.round(l*32767);case Int8Array:return Math.round(l*127);default:throw new Error("Invalid component type.")}}const Tt={DEG2RAD:gi,RAD2DEG:xi,generateUUID:Ci,clamp:rt,euclideanModulo:vi,mapLinear:Bi,inverseLerp:Ri,lerp:Si,damp:Fi,pingpong:Vi,smoothstep:ki,smootherstep:Ii,randInt:Ji,randFloat:Li,randFloatSpread:Di,seededRandom:Gi,degToRad:Xi,radToDeg:qi,isPowerOfTwo:Yi,ceilPowerOfTwo:Hi,floorPowerOfTwo:Zi,setQuaternionFromProperEuler:Wi,normalize:Ki,denormalize:Qi};class O{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,n,h){let a=i[s+0],o=i[s+1],c=i[s+2],d=i[s+3];const m=r[n+0],u=r[n+1],f=r[n+2],p=r[n+3];if(h===0){t[e+0]=a,t[e+1]=o,t[e+2]=c,t[e+3]=d;return}if(h===1){t[e+0]=m,t[e+1]=u,t[e+2]=f,t[e+3]=p;return}if(d!==p||a!==m||o!==u||c!==f){let y=1-h;const x=a*m+o*u+c*f+d*p,z=x>=0?1:-1,b=1-x*x;if(b>Number.EPSILON){const S=Math.sqrt(b),g=Math.atan2(S,x*z);y=Math.sin(y*g)/S,h=Math.sin(h*g)/S}const w=h*z;if(a=a*y+m*w,o=o*y+u*w,c=c*y+f*w,d=d*y+p*w,y===1-h){const S=1/Math.sqrt(a*a+o*o+c*c+d*d);a*=S,o*=S,c*=S,d*=S}}t[e]=a,t[e+1]=o,t[e+2]=c,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,r,n){const h=i[s],a=i[s+1],o=i[s+2],c=i[s+3],d=r[n],m=r[n+1],u=r[n+2],f=r[n+3];return t[e]=h*f+c*d+a*u-o*m,t[e+1]=a*f+c*m+o*d-h*u,t[e+2]=o*f+c*u+h*m-a*d,t[e+3]=c*f-h*d-a*m-o*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new O(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,n=t._order,h=Math.cos,a=Math.sin,o=h(i/2),c=h(s/2),d=h(r/2),m=a(i/2),u=a(s/2),f=a(r/2);switch(n){case"XYZ":this._x=m*c*d+o*u*f,this._y=o*u*d-m*c*f,this._z=o*c*f+m*u*d,this._w=o*c*d-m*u*f;break;case"YXZ":this._x=m*c*d+o*u*f,this._y=o*u*d-m*c*f,this._z=o*c*f-m*u*d,this._w=o*c*d+m*u*f;break;case"ZXY":this._x=m*c*d-o*u*f,this._y=o*u*d+m*c*f,this._z=o*c*f+m*u*d,this._w=o*c*d-m*u*f;break;case"ZYX":this._x=m*c*d-o*u*f,this._y=o*u*d+m*c*f,this._z=o*c*f-m*u*d,this._w=o*c*d+m*u*f;break;case"YZX":this._x=m*c*d+o*u*f,this._y=o*u*d+m*c*f,this._z=o*c*f-m*u*d,this._w=o*c*d-m*u*f;break;case"XZY":this._x=m*c*d-o*u*f,this._y=o*u*d-m*c*f,this._z=o*c*f+m*u*d,this._w=o*c*d+m*u*f;break;default:console.warn("../math.Quaternion: .setFromEuler() encountered an unknown order: "+n)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],n=e[1],h=e[5],a=e[9],o=e[2],c=e[6],d=e[10],m=i+h+d;if(m>0){const u=.5/Math.sqrt(m+1);this._w=.25/u,this._x=(c-a)*u,this._y=(r-o)*u,this._z=(n-s)*u}else if(i>h&&i>d){const u=2*Math.sqrt(1+i-h-d);this._w=(c-a)/u,this._x=.25*u,this._y=(s+n)/u,this._z=(r+o)/u}else if(h>d){const u=2*Math.sqrt(1+h-i-d);this._w=(r-o)/u,this._x=(s+n)/u,this._y=.25*u,this._z=(a+c)/u}else{const u=2*Math.sqrt(1+d-i-h);this._w=(n-s)/u,this._x=(r+o)/u,this._y=(a+c)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(rt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,n=t._w,h=e._x,a=e._y,o=e._z,c=e._w;return this._x=i*c+n*h+s*o-r*a,this._y=s*c+n*a+r*h-i*o,this._z=r*c+n*o+i*a-s*h,this._w=n*c-i*h-s*a-r*o,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,n=this._w;let h=n*t._w+i*t._x+s*t._y+r*t._z;if(h<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,h=-h):this.copy(t),h>=1)return this._w=n,this._x=i,this._y=s,this._z=r,this;const a=1-h*h;if(a<=Number.EPSILON){const u=1-e;return this._w=u*n+e*this._w,this._x=u*i+e*this._x,this._y=u*s+e*this._y,this._z=u*r+e*this._z,this.normalize(),this}const o=Math.sqrt(a),c=Math.atan2(o,h),d=Math.sin((1-e)*c)/o,m=Math.sin(e*c)/o;return this._w=n*d+this._w*m,this._x=i*d+this._x*m,this._y=s*d+this._y*m,this._z=r*d+this._z*m,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class _{constructor(t=0,e=0,i=0){this.isVector3=!0,_.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new _(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(li.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(li.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,n=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*n,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*n,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*n,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,n=t.y,h=t.z,a=t.w,o=2*(n*s-h*i),c=2*(h*e-r*s),d=2*(r*i-n*e);return this.x=e+a*o+n*d-h*c,this.y=i+a*c+h*o-r*d,this.z=s+a*d+r*c-n*o,this}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,n=e.x,h=e.y,a=e.z;return this.x=s*a-r*h,this.y=r*n-i*a,this.z=i*h-s*n,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Xe.copy(this).projectOnVector(t),this.sub(Xe)}reflect(t){return this.sub(Xe.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(rt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}abs(){return this.x=Math.abs(this.x),this.y=Math.abs(this.y),this.z=Math.abs(this.z),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xe=new _,li=new O,ve=2e3,ci=2001;class et{constructor(t,e,i,s,r,n,h,a,o,c,d,m,u,f,p,y){this.isMatrix4=!0,et.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,n,h,a,o,c,d,m,u,f,p,y)}extractPosition(t){return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."),this.copyPosition(t)}multiplyToArray(t,e,i){return console.error("THREE.Matrix4: .multiplyToArray() has been removed."),this}setRotationFromQuaternion(t){return this.makeRotationFromQuaternion(t)}set(t,e,i,s,r,n,h,a,o,c,d,m,u,f,p,y){const x=this.elements;return x[0]=t,x[4]=e,x[8]=i,x[12]=s,x[1]=r,x[5]=n,x[9]=h,x[13]=a,x[2]=o,x[6]=c,x[10]=d,x[14]=m,x[3]=u,x[7]=f,x[11]=p,x[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new et().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/St.setFromMatrixColumn(t,0).length(),r=1/St.setFromMatrixColumn(t,1).length(),n=1/St.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*n,e[9]=i[9]*n,e[10]=i[10]*n,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,n=Math.cos(i),h=Math.sin(i),a=Math.cos(s),o=Math.sin(s),c=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const m=n*c,u=n*d,f=h*c,p=h*d;e[0]=a*c,e[4]=-a*d,e[8]=o,e[1]=u+f*o,e[5]=m-p*o,e[9]=-h*a,e[2]=p-m*o,e[6]=f+u*o,e[10]=n*a}else if(t.order==="YXZ"){const m=a*c,u=a*d,f=o*c,p=o*d;e[0]=m+p*h,e[4]=f*h-u,e[8]=n*o,e[1]=n*d,e[5]=n*c,e[9]=-h,e[2]=u*h-f,e[6]=p+m*h,e[10]=n*a}else if(t.order==="ZXY"){const m=a*c,u=a*d,f=o*c,p=o*d;e[0]=m-p*h,e[4]=-n*d,e[8]=f+u*h,e[1]=u+f*h,e[5]=n*c,e[9]=p-m*h,e[2]=-n*o,e[6]=h,e[10]=n*a}else if(t.order==="ZYX"){const m=n*c,u=n*d,f=h*c,p=h*d;e[0]=a*c,e[4]=f*o-u,e[8]=m*o+p,e[1]=a*d,e[5]=p*o+m,e[9]=u*o-f,e[2]=-o,e[6]=h*a,e[10]=n*a}else if(t.order==="YZX"){const m=n*a,u=n*o,f=h*a,p=h*o;e[0]=a*c,e[4]=p-m*d,e[8]=f*d+u,e[1]=d,e[5]=n*c,e[9]=-h*c,e[2]=-o*c,e[6]=u*d+f,e[10]=m-p*d}else if(t.order==="XZY"){const m=n*a,u=n*o,f=h*a,p=h*o;e[0]=a*c,e[4]=-d,e[8]=o*c,e[1]=m*d+p,e[5]=n*c,e[9]=u*d-f,e[2]=f*d-u,e[6]=h*c,e[10]=p*d+m}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose($i,t,ji)}lookAt(t,e,i){const s=this.elements;return D.subVectors(t,e),D.lengthSq()===0&&(D.z=1),D.normalize(),dt.crossVectors(i,D),dt.lengthSq()===0&&(Math.abs(i.z)===1?D.x+=1e-4:D.z+=1e-4,D.normalize(),dt.crossVectors(i,D)),dt.normalize(),Se.crossVectors(D,dt),s[0]=dt.x,s[4]=Se.x,s[8]=D.x,s[1]=dt.y,s[5]=Se.y,s[9]=D.y,s[2]=dt.z,s[6]=Se.z,s[10]=D.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,n=i[0],h=i[4],a=i[8],o=i[12],c=i[1],d=i[5],m=i[9],u=i[13],f=i[2],p=i[6],y=i[10],x=i[14],z=i[3],b=i[7],w=i[11],S=i[15],g=s[0],v=s[4],T=s[8],P=s[12],E=s[1],U=s[5],J=s[9],Y=s[13],H=s[2],Z=s[6],W=s[10],Q=s[14],K=s[3],$=s[7],X=s[11],q=s[15];return r[0]=n*g+h*E+a*H+o*K,r[4]=n*v+h*U+a*Z+o*$,r[8]=n*T+h*J+a*W+o*X,r[12]=n*P+h*Y+a*Q+o*q,r[1]=c*g+d*E+m*H+u*K,r[5]=c*v+d*U+m*Z+u*$,r[9]=c*T+d*J+m*W+u*X,r[13]=c*P+d*Y+m*Q+u*q,r[2]=f*g+p*E+y*H+x*K,r[6]=f*v+p*U+y*Z+x*$,r[10]=f*T+p*J+y*W+x*X,r[14]=f*P+p*Y+y*Q+x*q,r[3]=z*g+b*E+w*H+S*K,r[7]=z*v+b*U+w*Z+S*$,r[11]=z*T+b*J+w*W+S*X,r[15]=z*P+b*Y+w*Q+S*q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],n=t[1],h=t[5],a=t[9],o=t[13],c=t[2],d=t[6],m=t[10],u=t[14],f=t[3],p=t[7],y=t[11],x=t[15];return f*(+r*a*d-s*o*d-r*h*m+i*o*m+s*h*u-i*a*u)+p*(+e*a*u-e*o*m+r*n*m-s*n*u+s*o*c-r*a*c)+y*(+e*o*d-e*h*u-r*n*d+i*n*u+r*h*c-i*o*c)+x*(-s*h*c-e*a*d+e*h*m+s*n*d-i*n*m+i*a*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],n=t[4],h=t[5],a=t[6],o=t[7],c=t[8],d=t[9],m=t[10],u=t[11],f=t[12],p=t[13],y=t[14],x=t[15],z=d*y*o-p*m*o+p*a*u-h*y*u-d*a*x+h*m*x,b=f*m*o-c*y*o-f*a*u+n*y*u+c*a*x-n*m*x,w=c*p*o-f*d*o+f*h*u-n*p*u-c*h*x+n*d*x,S=f*d*a-c*p*a-f*h*m+n*p*m+c*h*y-n*d*y,g=e*z+i*b+s*w+r*S;if(g===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=z*v,t[1]=(p*m*r-d*y*r-p*s*u+i*y*u+d*s*x-i*m*x)*v,t[2]=(h*y*r-p*a*r+p*s*o-i*y*o-h*s*x+i*a*x)*v,t[3]=(d*a*r-h*m*r-d*s*o+i*m*o+h*s*u-i*a*u)*v,t[4]=b*v,t[5]=(c*y*r-f*m*r+f*s*u-e*y*u-c*s*x+e*m*x)*v,t[6]=(f*a*r-n*y*r-f*s*o+e*y*o+n*s*x-e*a*x)*v,t[7]=(n*m*r-c*a*r+c*s*o-e*m*o-n*s*u+e*a*u)*v,t[8]=w*v,t[9]=(f*d*r-c*p*r-f*i*u+e*p*u+c*i*x-e*d*x)*v,t[10]=(n*p*r-f*h*r+f*i*o-e*p*o-n*i*x+e*h*x)*v,t[11]=(c*h*r-n*d*r-c*i*o+e*d*o+n*i*u-e*h*u)*v,t[12]=S*v,t[13]=(c*p*s-f*d*s+f*i*m-e*p*m-c*i*y+e*d*y)*v,t[14]=(f*h*s-n*p*s-f*i*a+e*p*a+n*i*y-e*h*y)*v,t[15]=(n*d*s-c*h*s+c*i*a-e*d*a-n*i*m+e*h*m)*v,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,n=t.x,h=t.y,a=t.z,o=r*n,c=r*h;return this.set(o*n+i,o*h-s*a,o*a+s*h,0,o*h+s*a,c*h+i,c*a-s*n,0,o*a-s*h,c*a+s*n,r*a*a+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,n){return this.set(1,i,r,0,t,1,n,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,n=e._y,h=e._z,a=e._w,o=r+r,c=n+n,d=h+h,m=r*o,u=r*c,f=r*d,p=n*c,y=n*d,x=h*d,z=a*o,b=a*c,w=a*d,S=i.x,g=i.y,v=i.z;return s[0]=(1-(p+x))*S,s[1]=(u+w)*S,s[2]=(f-b)*S,s[3]=0,s[4]=(u-w)*g,s[5]=(1-(m+x))*g,s[6]=(y+z)*g,s[7]=0,s[8]=(f+b)*v,s[9]=(y-z)*v,s[10]=(1-(m+p))*v,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=St.set(s[0],s[1],s[2]).length();const n=St.set(s[4],s[5],s[6]).length(),h=St.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],j.copy(this);const o=1/r,c=1/n,d=1/h;return j.elements[0]*=o,j.elements[1]*=o,j.elements[2]*=o,j.elements[4]*=c,j.elements[5]*=c,j.elements[6]*=c,j.elements[8]*=d,j.elements[9]*=d,j.elements[10]*=d,e.setFromRotationMatrix(j),i.x=r,i.y=n,i.z=h,this}makePerspective(t,e,i,s,r,n,h=ve){const a=this.elements,o=2*r/(e-t),c=2*r/(i-s),d=(e+t)/(e-t),m=(i+s)/(i-s);let u,f;if(h===ve)u=-(n+r)/(n-r),f=-2*n*r/(n-r);else if(h===ci)u=-n/(n-r),f=-n*r/(n-r);else throw new Error("Matrix4.makePerspective(): Invalid coordinate system: "+h);return a[0]=o,a[4]=0,a[8]=d,a[12]=0,a[1]=0,a[5]=c,a[9]=m,a[13]=0,a[2]=0,a[6]=0,a[10]=u,a[14]=f,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(t,e,i,s,r,n,h=ve){const a=this.elements,o=1/(e-t),c=1/(i-s),d=1/(n-r),m=(e+t)*o,u=(i+s)*c;let f,p;if(h===ve)f=(n+r)*d,p=-2*d;else if(h===ci)f=r*d,p=-1*d;else throw new Error("../math.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return a[0]=2*o,a[4]=0,a[8]=0,a[12]=-m,a[1]=0,a[5]=2*c,a[9]=0,a[13]=-u,a[2]=0,a[6]=0,a[10]=p,a[14]=-f,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const St=new _,j=new et,$i=new _(0,0,0),ji=new _(1,1,1),dt=new _,Se=new _,D=new _,di=new et,ui=new O;class kt{constructor(t=0,e=0,i=0,s=kt.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new kt(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],n=s[4],h=s[8],a=s[1],o=s[5],c=s[9],d=s[2],m=s[6],u=s[10];switch(e){case"XYZ":this._y=Math.asin(rt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-c,u),this._z=Math.atan2(-n,r)):(this._x=Math.atan2(m,o),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(h,u),this._z=Math.atan2(a,o)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(rt(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-d,u),this._z=Math.atan2(-n,o)):(this._y=0,this._z=Math.atan2(a,r));break;case"ZYX":this._y=Math.asin(-rt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(m,u),this._z=Math.atan2(a,r)):(this._x=0,this._z=Math.atan2(-n,o));break;case"YZX":this._z=Math.asin(rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,o),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(h,u));break;case"XZY":this._z=Math.asin(-rt(n,-1,1)),Math.abs(n)<.9999999?(this._x=Math.atan2(m,o),this._y=Math.atan2(h,r)):(this._x=Math.atan2(-c,u),this._y=0);break;default:console.warn("../math.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return di.makeRotationFromQuaternion(t),this.setFromRotationMatrix(di,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ui.setFromEuler(this),this.setFromQuaternion(ui,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(t){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}kt.DEFAULT_ORDER="XYZ";class _t{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new _t(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(rt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,n=this.y-t.y;return this.x=r*i-n*s+t.x,this.y=r*s+n*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}_t.isVector2=!0;class G{constructor(t=0,e=0,i=0,s=1){G.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new G(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,n=t.elements;return this.x=n[0]*e+n[4]*i+n[8]*s+n[12]*r,this.y=n[1]*e+n[5]*i+n[9]*s+n[13]*r,this.z=n[2]*e+n[6]*i+n[10]*s+n[14]*r,this.w=n[3]*e+n[7]*i+n[11]*s+n[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const a=t.elements,o=a[0],c=a[4],d=a[8],m=a[1],u=a[5],f=a[9],p=a[2],y=a[6],x=a[10];if(Math.abs(c-m)<.01&&Math.abs(d-p)<.01&&Math.abs(f-y)<.01){if(Math.abs(c+m)<.1&&Math.abs(d+p)<.1&&Math.abs(f+y)<.1&&Math.abs(o+u+x-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(o+1)/2,w=(u+1)/2,S=(x+1)/2,g=(c+m)/4,v=(d+p)/4,T=(f+y)/4;return b>w&&b>S?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=g/i,r=v/i):w>S?w<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(w),i=g/s,r=T/s):S<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),i=v/r,s=T/r),this.set(i,s,r,e),this}let z=Math.sqrt((y-f)*(y-f)+(d-p)*(d-p)+(m-c)*(m-c));return Math.abs(z)<.001&&(z=1),this.x=(y-f)/z,this.y=(d-p)/z,this.z=(m-c)/z,this.w=Math.acos((o+u+x-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class nt{constructor(t,e,i,s,r,n,h,a,o){nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,n,h,a,o)}set(t,e,i,s,r,n,h,a,o){const c=this.elements;return c[0]=t,c[1]=s,c[2]=h,c[3]=e,c[4]=r,c[5]=a,c[6]=i,c[7]=n,c[8]=o,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,n=i[0],h=i[3],a=i[6],o=i[1],c=i[4],d=i[7],m=i[2],u=i[5],f=i[8],p=s[0],y=s[3],x=s[6],z=s[1],b=s[4],w=s[7],S=s[2],g=s[5],v=s[8];return r[0]=n*p+h*z+a*S,r[3]=n*y+h*b+a*g,r[6]=n*x+h*w+a*v,r[1]=o*p+c*z+d*S,r[4]=o*y+c*b+d*g,r[7]=o*x+c*w+d*v,r[2]=m*p+u*z+f*S,r[5]=m*y+u*b+f*g,r[8]=m*x+u*w+f*v,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],n=t[4],h=t[5],a=t[6],o=t[7],c=t[8];return e*n*c-e*h*o-i*r*c+i*h*a+s*r*o-s*n*a}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],n=t[4],h=t[5],a=t[6],o=t[7],c=t[8],d=c*n-h*o,m=h*a-c*r,u=o*r-n*a,f=e*d+i*m+s*u;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);const p=1/f;return t[0]=d*p,t[1]=(s*o-c*i)*p,t[2]=(h*i-s*n)*p,t[3]=m*p,t[4]=(c*e-s*a)*p,t[5]=(s*r-h*e)*p,t[6]=u*p,t[7]=(i*a-o*e)*p,t[8]=(n*e-i*r)*p,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,n,h){const a=Math.cos(r),o=Math.sin(r);return this.set(i*a,i*o,-i*(a*n+o*h)+n+t,-s*o,s*a,-s*(-o*n+a*h)+h+e,0,0,1),this}scale(t,e){return this.premultiply(qe.makeScale(t,e)),this}rotate(t){return this.premultiply(qe.makeRotation(-t)),this}translate(t,e){return this.premultiply(qe.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new nt().fromArray(this.elements)}}const qe=new nt;var I;(function(l){l[l.Random=0]="Random",l[l.Loop=1]="Loop",l[l.PingPong=2]="PingPong",l[l.Burst=3]="Burst"})(I||(I={}));function Nt(l,t,e,i){let s;switch(I.Random===l?t=Math.random():I.Burst===l&&i.isBursting&&(t=i.burstParticleIndex/i.burstParticleCount),e>0?s=Math.floor(t/e)*e:s=t,l){case I.Loop:s=s%1;break;case I.PingPong:s=Math.abs(s%2-1);break}return s}class yt{constructor(t,e,i,s){this.p=[t,e,i,s]}genValue(t){const e=t*t,i=t*t*t,s=1-t,r=s*s,n=r*s;return this.p[0]*n+this.p[1]*r*t*3+this.p[2]*s*e*3+this.p[3]*i}derivativeCoefficients(t){const e=[];for(let i=t,s=i.length-1;s>0;s--){const r=[];for(let n=0;n<s;n++){const h=s*(i[n+1]-i[n]);r.push(h)}e.push(r),i=r}return e}getSlope(t){const e=this.derivativeCoefficients(this.p)[0],i=1-t,s=i*i,r=i*t*2,n=t*t;return s*e[0]+r*e[1]+n*e[2]}controlCurve(t,e){this.p[1]=t/3+this.p[0],this.p[2]=this.p[3]-e/3}hull(t){let e=this.p,i=[],s,r=0,n=0,h=0;const a=[];for(a[r++]=e[0],a[r++]=e[1],a[r++]=e[2],a[r++]=e[3];e.length>1;){for(i=[],n=0,h=e.length-1;n<h;n++)s=t*e[n]+(1-t)*e[n+1],a[r++]=s,i.push(s);e=i}return a}split(t){const e=this.hull(t);return{left:new yt(e[0],e[4],e[7],e[9]),right:new yt(e[9],e[8],e[6],e[3]),span:e}}clone(){return new yt(this.p[0],this.p[1],this.p[2],this.p[3])}toJSON(){return{p0:this.p[0],p1:this.p[1],p2:this.p[2],p3:this.p[3]}}static fromJSON(t){return new yt(t.p0,t.p1,t.p2,t.p3)}}const It=l=>({r:l.x,g:l.y,b:l.z,a:l.w}),Jt=l=>new G(l.r,l.g,l.b,l.a),ts=(l,t)=>{switch(t){case"Vector3":return new _(l.x,l.y,l.z);case"Vector4":return new G(l.x,l.y,l.z,l.w);case"Color":return new _(l.r,l.g,l.b);case"Number":return l;default:return l}},es=(l,t)=>{switch(t){case"Vector3":return{x:l.x,y:l.y,z:l.z};case"Vector4":return{x:l.x,y:l.y,z:l.z,w:l.w};case"Color":return{r:l.x,g:l.y,b:l.z};case"Number":return l;default:return l}};class be{constructor(t,e){this.a=t,this.b=e,this.type="value"}startGen(t){}genColor(t,e){const i=Math.random();return e.copy(this.a).lerp(this.b,i)}toJSON(){return{type:"RandomColor",a:It(this.a),b:It(this.b)}}static fromJSON(t){return new be(Jt(t.a),Jt(t.b))}clone(){return new be(this.a.clone(),this.b.clone())}}class wt{constructor(t,e){this.a=t,this.b=e,this.indexCount=-1,this.type="value"}startGen(t){this.indexCount=t.length,t.push(Math.random())}genColor(t,e){return this.indexCount===-1&&this.startGen(t),e.copy(this.a).lerp(this.b,t[this.indexCount])}toJSON(){return{type:"ColorRange",a:It(this.a),b:It(this.b)}}static fromJSON(t){return new wt(Jt(t.a),Jt(t.b))}clone(){return new wt(this.a.clone(),this.b.clone())}}class mt{constructor(t,e){this.subType=e,this.type="function",this.keys=t}findKey(t){let e=0,i=0,s=this.keys.length-1;for(;i+1<s;)if(e=Math.floor((i+s)/2),t<this.getStartX(e))s=e-1;else if(t>this.getEndX(e))i=e+1;else return e;for(let r=i;r<=s;r++)if(t>=this.getStartX(r)&&t<=this.getEndX(r))return r;return-1}getStartX(t){return this.keys[t][1]}getEndX(t){return t+1<this.keys.length?this.keys[t+1][1]:1}genValue(t,e){const i=this.findKey(e);return this.subType==="Number"?i===-1?this.keys[0][0]:i+1>=this.keys.length?this.keys[this.keys.length-1][0]:(this.keys[i+1][0]-this.keys[i][0])*((e-this.getStartX(i))/(this.getEndX(i)-this.getStartX(i)))+this.keys[i][0]:i===-1?t.copy(this.keys[0][0]):i+1>=this.keys.length?t.copy(this.keys[this.keys.length-1][0]):t.copy(this.keys[i][0]).lerp(this.keys[i+1][0],(e-this.getStartX(i))/(this.getEndX(i)-this.getStartX(i)))}toJSON(){return this.keys[0][0].constructor.name,{type:"CLinearFunction",subType:this.subType,keys:this.keys.map(([t,e])=>({value:es(t,this.subType),pos:e}))}}static fromJSON(t){return new mt(t.keys.map(e=>[ts(e.value,t.subType),e.pos]),t.subType)}clone(){return this.subType==="Number"?new mt(this.keys.map(([t,e])=>[t,e]),this.subType):new mt(this.keys.map(([t,e])=>[t.clone(),e]),this.subType)}}const Me=new _;class gt{constructor(t=[[new _(0,0,0),0],[new _(1,1,1),0]],e=[[1,0],[1,1]]){this.type="function",this.color=new mt(t,"Color"),this.alpha=new mt(e,"Number")}genColor(t,e,i){return this.color.genValue(Me,i),e.set(Me.x,Me.y,Me.z,this.alpha.genValue(1,i))}toJSON(){return{type:"Gradient",color:this.color.toJSON(),alpha:this.alpha.toJSON()}}static fromJSON(t){if(t.functions){const e=t.functions.map(i=>[wt.fromJSON(i.function).a,i.start]);return t.functions.length>0&&e.push([wt.fromJSON(t.functions[t.functions.length-1].function).b,1]),new gt(e.map(i=>[new _(i[0].x,i[0].y,i[0].z),i[1]]),e.map(i=>[i[0].w,i[1]]))}else{const e=new gt;return e.alpha=mt.fromJSON(t.alpha),e.color=mt.fromJSON(t.color),e}}clone(){const t=new gt;return t.alpha=this.alpha.clone(),t.color=this.color.clone(),t}startGen(t){}}const Ye=new G;class Te{constructor(t,e){this.indexCount=0,this.type="function",this.gradient1=t,this.gradient2=e}startGen(t){this.indexCount=t.length,t.push(Math.random())}genColor(t,e,i){return this.gradient1.genColor(t,e,i),this.gradient2.genColor(t,Ye,i),t&&t[this.indexCount]!==void 0?e.lerp(Ye,t[this.indexCount]):e.lerp(Ye,Math.random()),e}toJSON(){return{type:"RandomColorBetweenGradient",gradient1:this.gradient1.toJSON(),gradient2:this.gradient2.toJSON()}}static fromJSON(t){return new Te(gt.fromJSON(t.gradient1),gt.fromJSON(t.gradient2))}clone(){return new Te(this.gradient1.clone(),this.gradient2.clone())}}class zt{constructor(t){this.color=t,this.type="value"}startGen(t){}genColor(t,e){return e.copy(this.color)}toJSON(){return{type:"ConstantColor",color:It(this.color)}}static fromJSON(t){return new zt(Jt(t.color))}clone(){return new zt(this.color.clone())}}function si(l){switch(l.type){case"ConstantColor":return zt.fromJSON(l);case"ColorRange":return wt.fromJSON(l);case"RandomColor":return be.fromJSON(l);case"Gradient":return gt.fromJSON(l);case"RandomColorBetweenGradient":return Te.fromJSON(l);default:return new zt(new G(1,1,1,1))}}class A{constructor(t){this.value=t,this.type="value"}startGen(t){}genValue(t){return this.value}toJSON(){return{type:"ConstantValue",value:this.value}}static fromJSON(t){return new A(t.value)}clone(){return new A(this.value)}}class xt{constructor(t,e){this.a=t,this.b=e,this.indexCount=-1,this.type="value"}startGen(t){this.indexCount=t.length,t.push(Math.random())}genValue(t){return this.indexCount===-1&&this.startGen(t),Tt.lerp(this.a,this.b,t[this.indexCount])}toJSON(){return{type:"IntervalValue",a:this.a,b:this.b}}static fromJSON(t){return new xt(t.a,t.b)}clone(){return new xt(this.a,this.b)}}class is{constructor(){this.functions=new Array}findFunction(t){let e=0,i=0,s=this.functions.length-1;for(;i+1<s;)if(e=Math.floor((i+s)/2),t<this.getStartX(e))s=e-1;else if(t>this.getEndX(e))i=e+1;else return e;for(let r=i;r<=s;r++)if(t>=this.functions[r][1]&&t<=this.getEndX(r))return r;return-1}getStartX(t){return this.functions[t][1]}setStartX(t,e){t>0&&(this.functions[t][1]=e)}getEndX(t){return t+1<this.functions.length?this.functions[t+1][1]:1}setEndX(t,e){t+1<this.functions.length&&(this.functions[t+1][1]=e)}insertFunction(t,e){const i=this.findFunction(t);this.functions.splice(i+1,0,[e,t])}removeFunction(t){return this.functions.splice(t,1)[0][0]}getFunction(t){return this.functions[t][0]}setFunction(t,e){this.functions[t][0]=e}get numOfFunctions(){return this.functions.length}}class Lt extends is{constructor(t=[[new yt(0,1/3,1/3*2,1),0]]){super(),this.type="function",this.functions=t}genValue(t,e=0){const i=this.findFunction(e);return i===-1?0:this.functions[i][0].genValue((e-this.getStartX(i))/(this.getEndX(i)-this.getStartX(i)))}toSVG(t,e){if(e<1)return"";let i=["M",0,this.functions[0][0].p[0]].join(" ");for(let s=1/e;s<=1;s+=1/e)i=[i,"L",s*t,this.genValue(void 0,s)].join(" ");return i}toJSON(){return{type:"PiecewiseBezier",functions:this.functions.map(([t,e])=>({function:t.toJSON(),start:e}))}}static fromJSON(t){return new Lt(t.functions.map(e=>[yt.fromJSON(e.function),e.start]))}clone(){return new Lt(this.functions.map(([t,e])=>[t.clone(),e]))}startGen(t){}}function N(l){switch(l.type){case"ConstantValue":return A.fromJSON(l);case"IntervalValue":return xt.fromJSON(l);case"PiecewiseBezier":return Lt.fromJSON(l);default:return new A(0)}}class Dt{constructor(){this.indexCount=0,this.type="rotation"}startGen(t){this.indexCount=t.length,t.push(new O);let e,i,s,r,n,h;do e=Math.random()*2-1,i=Math.random()*2-1,s=e*e+i*i;while(s>1);do r=Math.random()*2-1,n=Math.random()*2-1,h=r*r+n*n;while(h>1);const a=Math.sqrt((1-s)/h);t[this.indexCount].set(e,i,a*r,a*n)}genValue(t,e,i,s){return this.indexCount===-1&&this.startGen(t),e.copy(t[this.indexCount]),e}toJSON(){return{type:"RandomQuat"}}static fromJSON(t){return new Dt}clone(){return new Dt}}class Gt{constructor(t,e){this.axis=t,this.angle=e,this.type="rotation"}startGen(t){this.angle.startGen(t)}genValue(t,e,i,s){return e.setFromAxisAngle(this.axis,this.angle.genValue(t,s)*i)}toJSON(){return{type:"AxisAngle",axis:{x:this.axis.x,y:this.axis.y,z:this.axis.z},angle:this.angle.toJSON()}}static fromJSON(t){return new Gt(new _(t.axis.x,t.axis.y,t.axis.z),N(t.angle))}clone(){return new Gt(this.axis.clone(),this.angle.clone())}}class Ne{constructor(t,e,i,s){this.angleX=t,this.angleY=e,this.angleZ=i,this.type="rotation",this.eular=new kt(0,0,0,s)}startGen(t){this.angleX.startGen(t),this.angleY.startGen(t),this.angleZ.startGen(t)}genValue(t,e,i,s){return this.eular.set(this.angleX.genValue(t,s)*i,this.angleY.genValue(t,s)*i,this.angleZ.genValue(t,s)*i),e.setFromEuler(this.eular)}toJSON(){return{type:"Euler",angleX:this.angleX.toJSON(),angleY:this.angleY.toJSON(),angleZ:this.angleZ.toJSON(),eulerOrder:this.eular.order}}static fromJSON(t){return new Ne(N(t.angleX),N(t.angleY),N(t.angleZ),t.eulerOrder)}clone(){return new Ne(this.angleX,this.angleY,this.angleZ,this.eular.order)}}function Mi(l){switch(l.type){case"AxisAngle":return Gt.fromJSON(l);case"Euler":return Ne.fromJSON(l);case"RandomQuat":return Dt.fromJSON(l);default:return new Dt}}class vt{constructor(t,e,i){this.x=t,this.y=e,this.z=i,this.type="vec3function"}startGen(t){this.x.startGen(t),this.y.startGen(t),this.z.startGen(t)}genValue(t,e,i){return e.set(this.x.genValue(t,i),this.y.genValue(t,i),this.z.genValue(t,i))}toJSON(){return{type:"Vector3Function",x:this.x.toJSON(),y:this.y.toJSON(),z:this.z.toJSON()}}static fromJSON(t){return new vt(N(t.x),N(t.y),N(t.z))}clone(){return new vt(this.x,this.y,this.z)}}function ss(l){switch(l.type){case"Vector3Function":return vt.fromJSON(l);default:return new vt(new A(0),new A(0),new A(0))}}function Oe(l){switch(l.type){case"ConstantValue":case"IntervalValue":case"PiecewiseBezier":return N(l);case"AxisAngle":case"RandomQuat":case"Euler":return Mi(l);case"Vector3Function":return ss(l);default:return new A(0)}}class Xt{constructor(t={}){this.type="cone",this.currentValue=0,this.radius=t.radius??10,this.arc=t.arc??2*Math.PI,this.thickness=t.thickness??1,this.angle=t.angle??Math.PI/6,this.mode=t.mode??I.Random,this.spread=t.spread??0,this.speed=t.speed??new A(1),this.memory=[]}update(t,e){I.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Nt(this.mode,this.currentValue,this.spread,e),s=Tt.lerp(1-this.thickness,1,Math.random()),r=i*this.arc,n=Math.sqrt(s),h=Math.sin(r),a=Math.cos(r);t.position.x=n*a,t.position.y=n*h,t.position.z=0;const o=this.angle*n;t.velocity.set(0,0,Math.cos(o)).addScaledVector(t.position,Math.sin(o)).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius)}toJSON(){return{type:"cone",radius:this.radius,arc:this.arc,thickness:this.thickness,angle:this.angle,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new Xt({radius:t.radius,arc:t.arc,thickness:t.thickness,angle:t.angle,mode:t.mode,speed:t.speed?N(t.speed):void 0,spread:t.spread})}clone(){return new Xt({radius:this.radius,arc:this.arc,thickness:this.thickness,angle:this.angle,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}class qt{constructor(t={}){this.type="circle",this.currentValue=0,this.radius=t.radius??10,this.arc=t.arc??2*Math.PI,this.thickness=t.thickness??1,this.mode=t.mode??I.Random,this.spread=t.spread??0,this.speed=t.speed??new A(1),this.memory=[]}update(t,e){this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e}initialize(t,e){const i=Nt(this.mode,this.currentValue,this.spread,e),s=Tt.lerp(1-this.thickness,1,Math.random()),r=i*this.arc;t.position.x=Math.cos(r),t.position.y=Math.sin(r),t.position.z=0,t.velocity.copy(t.position).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius*s)}toJSON(){return{type:"circle",radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new qt({radius:t.radius,arc:t.arc,thickness:t.thickness,mode:t.mode,speed:t.speed?N(t.speed):void 0,spread:t.spread})}clone(){return new qt({radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}function _e(l,t){return Math.floor(Math.random()*(t-l))+l}const ge=new _(0,1,0),xe=new _(0,0,0),rs=new _(1,1,1),mi=new _(0,0,1);class Yt{constructor(t={}){this.type="donut",this.currentValue=0,this.radius=t.radius??10,this.arc=t.arc??2*Math.PI,this.thickness=t.thickness??1,this.donutRadius=t.donutRadius??this.radius*.2,this.mode=t.mode??I.Random,this.spread=t.spread??0,this.speed=t.speed??new A(1),this.memory=[],this._m1=new et}update(t,e){I.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Nt(this.mode,this.currentValue,this.spread,e),s=Math.random(),r=Tt.lerp(1-this.thickness,1,Math.random()),n=i*this.arc,h=s*Math.PI*2,a=Math.sin(n),o=Math.cos(n);if(t.position.x=this.radius*o,t.position.y=this.radius*a,t.position.z=0,t.velocity.z=this.donutRadius*r*Math.sin(h),t.velocity.x=this.donutRadius*r*Math.cos(h)*o,t.velocity.y=this.donutRadius*r*Math.cos(h)*a,t.position.add(t.velocity),t.velocity.normalize().multiplyScalar(t.startSpeed),t.rotation instanceof O){const c=t.rotation;c.x===0&&c.y===0&&c.z===0&&c.w===1&&(this._m1.lookAt(xe,t.velocity,ge),t.rotation.setFromRotationMatrix(this._m1))}}toJSON(){return{type:"donut",radius:this.radius,arc:this.arc,thickness:this.thickness,donutRadius:this.donutRadius,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new Yt({radius:t.radius,arc:t.arc,thickness:t.thickness,donutRadius:t.donutRadius,mode:t.mode,speed:t.speed?N(t.speed):void 0,spread:t.spread})}clone(){return new Yt({radius:this.radius,arc:this.arc,thickness:this.thickness,donutRadius:this.donutRadius,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}class Ht{constructor(){this.type="point",this._m1=new et}update(t,e){}initialize(t){const e=Math.random(),i=Math.random(),s=e*Math.PI*2,r=Math.acos(2*i-1),n=Math.cbrt(Math.random()),h=Math.sin(s),a=Math.cos(s),o=Math.sin(r),c=Math.cos(r);if(t.velocity.x=n*o*a,t.velocity.y=n*o*h,t.velocity.z=n*c,t.velocity.multiplyScalar(t.startSpeed),t.position.setScalar(0),t.rotation instanceof O){const d=t.rotation;d.x===0&&d.y===0&&d.z===0&&d.w===1&&(this._m1.lookAt(xe,t.velocity,ge),t.rotation.setFromRotationMatrix(this._m1))}}toJSON(){return{type:"point"}}static fromJSON(t){return new Ht}clone(){return new Ht}}class bt{constructor(t={}){this.type="sphere",this.currentValue=0,this.radius=t.radius??10,this.arc=t.arc??2*Math.PI,this.thickness=t.thickness??1,this.mode=t.mode??I.Random,this.spread=t.spread??0,this.speed=t.speed??new A(1),this.memory=[],this._m1=new et}update(t,e){I.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Nt(this.mode,this.currentValue,this.spread,e),s=Math.random(),r=Tt.lerp(1-this.thickness,1,Math.random()),n=i*this.arc,h=Math.acos(2*s-1),a=Math.sin(n),o=Math.cos(n),c=Math.sin(h),d=Math.cos(h);if(t.position.x=c*o,t.position.y=c*a,t.position.z=d,t.velocity.copy(t.position).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius*r),t.rotation instanceof O){const m=t.rotation;m.x===0&&m.y===0&&m.z===0&&m.w===1&&(this._m1.lookAt(xe,t.position,ge),t.rotation.setFromRotationMatrix(this._m1))}}toJSON(){return{type:"sphere",radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new bt({radius:t.radius,arc:t.arc,thickness:t.thickness,mode:t.mode,speed:t.speed?N(t.speed):void 0,spread:t.spread})}clone(){return new bt({radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}class Zt{constructor(t={}){this.type="hemisphere",this.currentValue=0,this.radius=t.radius??10,this.arc=t.arc??2*Math.PI,this.thickness=t.thickness??1,this.mode=t.mode??I.Random,this.spread=t.spread??0,this.speed=t.speed??new A(1),this.memory=[],this._m1=new et}update(t,e){I.Random!=this.mode&&(this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e)}initialize(t,e){const i=Nt(this.mode,this.currentValue,this.spread,e),s=Math.random(),r=Tt.lerp(1-this.thickness,1,Math.random()),n=i*this.arc,h=Math.acos(s),a=Math.sin(n),o=Math.cos(n),c=Math.sin(h),d=Math.cos(h);if(t.position.x=c*o,t.position.y=c*a,t.position.z=d,t.velocity.copy(t.position).multiplyScalar(t.startSpeed),t.position.multiplyScalar(this.radius*r),t.rotation instanceof O){const m=t.rotation;m.x===0&&m.y===0&&m.z===0&&m.w===1&&(this._m1.lookAt(xe,t.position,ge),t.rotation.setFromRotationMatrix(this._m1))}}toJSON(){return{type:"hemisphere",radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new Zt({radius:t.radius,arc:t.arc,thickness:t.thickness,mode:t.mode,speed:t.speed?N(t.speed):void 0,spread:t.spread})}clone(){return new Zt({radius:this.radius,arc:this.arc,thickness:this.thickness,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}class Wt{constructor(t={}){this.type="grid",this.width=t.width??1,this.height=t.height??1,this.column=t.column??10,this.row=t.row??10}initialize(t){const e=Math.floor(Math.random()*this.row),i=Math.floor(Math.random()*this.column);t.position.x=i*this.width/this.column-this.width/2,t.position.y=e*this.height/this.row-this.height/2,t.position.z=0,t.velocity.set(0,0,t.startSpeed)}toJSON(){return{type:"grid",width:this.width,height:this.height,column:this.column,row:this.row}}static fromJSON(t){return new Wt(t)}clone(){return new Wt({width:this.width,height:this.height,column:this.column,row:this.row})}update(t,e){}}class Qt{constructor(t={}){this.type="rectangle",this.currentValue=0,this.width=t.width??10,this.height=t.height??10,this.thickness=t.thickness??1,this.mode=t.mode??I.Random,this.spread=t.spread??0,this.speed=t.speed??new A(1),this.memory=[],this._m1=new et}update(t,e){this.currentValue+=this.speed.genValue(this.memory,t.emissionState.time/t.duration)*e}initialize(t,e){const i=Nt(this.mode,this.currentValue,this.spread,e),s=2*(this.width+this.height),r=i*s;let n,h;r<this.width?(n=r-this.width/2,h=-this.height/2):r<this.width+this.height?(n=this.width/2,h=r-this.width-this.height/2):r<2*this.width+this.height?(n=this.width/2-(r-this.width-this.height),h=this.height/2):(n=-this.width/2,h=this.height/2-(r-2*this.width-this.height));const a=Math.random(),o=1-this.thickness*a;if(t.position.x=n*o,t.position.y=h*o,t.position.z=0,t.velocity.x=n,t.velocity.y=h,t.velocity.z=0,t.velocity.normalize().multiplyScalar(t.startSpeed),t.rotation instanceof O){const c=t.rotation;c.x===0&&c.y===0&&c.z===0&&c.w===1&&(this._m1.lookAt(xe,t.velocity,ge),t.rotation.setFromRotationMatrix(this._m1))}}toJSON(){return{type:"rectangle",width:this.width,height:this.height,thickness:this.thickness,mode:this.mode,spread:this.spread,speed:this.speed.toJSON()}}static fromJSON(t){return new Qt({width:t.width,height:t.height,thickness:t.thickness,mode:t.mode,speed:t.speed?N(t.speed):void 0,spread:t.spread})}clone(){return new Qt({width:this.width,height:this.height,thickness:this.thickness,mode:this.mode,speed:this.speed.clone(),spread:this.spread})}}const je={circle:{type:"circle",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc","value"]]],constructor:qt,loadJSON:qt.fromJSON},cone:{type:"cone",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["angle",["radian"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc","value"]]],constructor:Xt,loadJSON:Xt.fromJSON},donut:{type:"donut",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["donutRadius",["number"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc","value"]]],constructor:Yt,loadJSON:Yt.fromJSON},point:{type:"point",params:[],constructor:Ht,loadJSON:Ht.fromJSON},sphere:{type:"sphere",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["angle",["radian"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc","value"]]],constructor:bt,loadJSON:bt.fromJSON},hemisphere:{type:"hemisphere",params:[["radius",["number"]],["arc",["radian"]],["thickness",["number"]],["angle",["radian"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc","value"]]],constructor:Zt,loadJSON:Zt.fromJSON},grid:{type:"grid",params:[["width",["number"]],["height",["number"]],["rows",["number"]],["column",["number"]]],constructor:Wt,loadJSON:Wt.fromJSON},rectangle:{type:"rectangle",params:[["width",["number"]],["height",["number"]],["thickness",["number"]],["mode",["emitterMode"]],["spread",["number"]],["speed",["valueFunc","value"]]],constructor:Qt,loadJSON:Qt.fromJSON}};function ns(l,t){return je[l.type].loadJSON(l,t)}class Kt{constructor(t){this.color=t,this.type="ColorOverLife"}initialize(t){this.color.startGen(t.memory)}update(t,e){this.color.genColor(t.memory,t.color,t.age/t.life),t.color.x*=t.startColor.x,t.color.y*=t.startColor.y,t.color.z*=t.startColor.z,t.color.w*=t.startColor.w}frameUpdate(t){}toJSON(){return{type:this.type,color:this.color.toJSON()}}static fromJSON(t){return new Kt(si(t.color))}clone(){return new Kt(this.color.clone())}reset(){}}class $t{constructor(t){this.angularVelocity=t,this.type="RotationOverLife"}initialize(t){typeof t.rotation=="number"&&this.angularVelocity.startGen(t.memory)}update(t,e){typeof t.rotation=="number"&&(t.rotation+=e*this.angularVelocity.genValue(t.memory,t.age/t.life))}toJSON(){return{type:this.type,angularVelocity:this.angularVelocity.toJSON()}}static fromJSON(t){return new $t(N(t.angularVelocity))}frameUpdate(t){}clone(){return new $t(this.angularVelocity.clone())}reset(){}}class jt{constructor(t){this.angularVelocity=t,this.type="Rotation3DOverLife",this.tempQuat=new O,this.tempQuat2=new O}initialize(t){t.rotation instanceof O&&(t.angularVelocity=new O,this.angularVelocity.startGen(t.memory))}update(t,e){t.rotation instanceof O&&(this.angularVelocity.genValue(t.memory,this.tempQuat,e,t.age/t.life),t.rotation.multiply(this.tempQuat))}toJSON(){return{type:this.type,angularVelocity:this.angularVelocity.toJSON()}}static fromJSON(t){return new jt(Mi(t.angularVelocity))}frameUpdate(t){}clone(){return new jt(this.angularVelocity.clone())}reset(){}}class te{initialize(t,e){this.ps=e,this.x.startGen(t.memory),this.y.startGen(t.memory),this.z.startGen(t.memory)}constructor(t,e,i){this.x=t,this.y=e,this.z=i,this.type="ForceOverLife",this._temp=new _,this._tempScale=new _,this._tempQ=new O}update(t,e){this._temp.set(this.x.genValue(t.memory,t.age/t.life),this.y.genValue(t.memory,t.age/t.life),this.z.genValue(t.memory,t.age/t.life)),this.ps.worldSpace?t.velocity.addScaledVector(this._temp,e):(this._temp.multiply(this._tempScale).applyQuaternion(this._tempQ),t.velocity.addScaledVector(this._temp,e))}toJSON(){return{type:this.type,x:this.x.toJSON(),y:this.y.toJSON(),z:this.z.toJSON()}}static fromJSON(t){return new te(N(t.x),N(t.y),N(t.z))}frameUpdate(t){if(this.ps&&!this.ps.worldSpace){const e=this._temp,i=this._tempQ,s=this._tempScale;this.ps.emitter.matrixWorld.decompose(e,i,s),i.invert(),s.set(1/s.x,1/s.y,1/s.z)}}clone(){return new te(this.x.clone(),this.y.clone(),this.z.clone())}reset(){}}class ee{initialize(t){this.size.startGen(t.memory)}constructor(t){this.size=t,this.type="SizeOverLife"}update(t){this.size instanceof vt?this.size.genValue(t.memory,t.size,t.age/t.life).multiply(t.startSize):t.size.copy(t.startSize).multiplyScalar(this.size.genValue(t.memory,t.age/t.life))}toJSON(){return{type:this.type,size:this.size.toJSON()}}static fromJSON(t){return new ee(Oe(t.size))}frameUpdate(t){}clone(){return new ee(this.size.clone())}reset(){}}class ie{initialize(t){this.speed.startGen(t.memory)}constructor(t){this.speed=t,this.type="SpeedOverLife"}update(t){t.speedModifier=this.speed.genValue(t.memory,t.age/t.life)}toJSON(){return{type:this.type,speed:this.speed.toJSON()}}static fromJSON(t){return new ie(N(t.speed))}frameUpdate(t){}clone(){return new ie(this.speed.clone())}reset(){}}class se{constructor(t){this.frame=t,this.type="FrameOverLife"}initialize(t){this.frame.startGen(t.memory)}update(t,e){this.frame instanceof Lt&&(t.uvTile=this.frame.genValue(t.memory,t.age/t.life))}frameUpdate(t){}toJSON(){return{type:this.type,frame:this.frame.toJSON()}}static fromJSON(t){return new se(N(t.frame))}clone(){return new se(this.frame.clone())}reset(){}}class re{constructor(t,e=new _(0,1,0)){this.orbitSpeed=t,this.axis=e,this.type="OrbitOverLife",this.temp=new _,this.rotation=new O}initialize(t){this.orbitSpeed.startGen(t.memory)}update(t,e){this.temp.copy(t.position).projectOnVector(this.axis),this.rotation.setFromAxisAngle(this.axis,this.orbitSpeed.genValue(t.memory,t.age/t.life)*e),t.position.sub(this.temp),t.position.applyQuaternion(this.rotation),t.position.add(this.temp)}frameUpdate(t){}toJSON(){return{type:this.type,orbitSpeed:this.orbitSpeed.toJSON(),axis:[this.axis.x,this.axis.y,this.axis.z]}}static fromJSON(t){return new re(N(t.orbitSpeed),t.axis?new _(t.axis[0],t.axis[1],t.axis[2]):void 0)}clone(){return new re(this.orbitSpeed.clone())}reset(){}}class He{constructor(t){this.data=t,this.next=null,this.prev=null}hasPrev(){return this.prev!==null}hasNext(){return this.next!==null}}class as{constructor(){this.length=0,this.head=this.tail=null}isEmpty(){return this.head===null}clear(){this.length=0,this.head=this.tail=null}front(){return this.head===null?null:this.head.data}back(){return this.tail===null?null:this.tail.data}dequeue(){if(this.head){const t=this.head.data;return this.head=this.head.next,this.head?this.head.prev=null:this.tail=null,this.length--,t}}pop(){if(this.tail){const t=this.tail.data;return this.tail=this.tail.prev,this.tail?this.tail.next=null:this.head=null,this.length--,t}}queue(t){const e=new He(t);this.tail||(this.tail=e),this.head&&(this.head.prev=e,e.next=this.head),this.head=e,this.length++}push(t){const e=new He(t);this.head||(this.head=e),this.tail&&(this.tail.next=e,e.prev=this.tail),this.tail=e,this.length++}insertBefore(t,e){const i=new He(e);i.next=t,i.prev=t.prev,i.prev!==null&&(i.prev.next=i),i.next.prev=i,t==this.head&&(this.head=i),this.length++}remove(t){if(this.head===null||this.tail===null)return;let e=this.head;for(t===this.head.data&&(this.head=this.head.next),t===this.tail.data&&(this.tail=this.tail.prev);e.next!==null&&e.data!==t;)e=e.next;e.data===t&&(e.prev!==null&&(e.prev.next=e.next),e.next!==null&&(e.next.prev=e.prev),this.length--)}*values(){let t=this.head;for(;t!==null;)yield t.data,t=t.next}}class os{constructor(){this.startSpeed=0,this.startColor=new G,this.startSize=new _(1,1,1),this.position=new _,this.velocity=new _,this.age=0,this.life=1,this.size=new _(1,1,1),this.speedModifier=1,this.rotation=0,this.color=new G,this.uvTile=0,this.memory=[]}get died(){return this.age>=this.life}reset(){this.memory.length=0}}class hs{constructor(t,e,i){this.position=t,this.size=e,this.color=i}}class ti{constructor(){this.startSpeed=0,this.startColor=new G,this.startSize=new _(1,1,1),this.position=new _,this.velocity=new _,this.age=0,this.life=1,this.size=new _(1,1,1),this.length=100,this.speedModifier=1,this.color=new G,this.previous=new as,this.uvTile=0,this.memory=[]}update(){for(this.age<=this.life?this.previous.push(new hs(this.position.clone(),this.size.x,this.color.clone())):this.previous.length>0&&this.previous.dequeue();this.previous.length>this.length;)this.previous.dequeue()}get died(){return this.age>=this.life}reset(){this.memory.length=0,this.previous.clear()}}class ne{initialize(t){this.width.startGen(t.memory)}constructor(t){this.width=t,this.type="WidthOverLength"}update(t){if(t instanceof ti){const e=t.previous.values();for(let i=0;i<t.previous.length;i++){const s=e.next();s.value.size=this.width.genValue(t.memory,(t.previous.length-i)/t.length)}}}frameUpdate(t){}toJSON(){return{type:this.type,width:this.width.toJSON()}}static fromJSON(t){return new ne(N(t.width))}clone(){return new ne(this.width.clone())}reset(){}}class ae{constructor(t,e){this.direction=t,this.magnitude=e,this.type="ApplyForce",this.memory={data:[],dataCount:0},this.magnitudeValue=this.magnitude.genValue(this.memory)}initialize(t){}update(t,e){t.velocity.addScaledVector(this.direction,this.magnitudeValue*e)}frameUpdate(t){this.magnitudeValue=this.magnitude.genValue(this.memory)}toJSON(){return{type:this.type,direction:[this.direction.x,this.direction.y,this.direction.z],magnitude:this.magnitude.toJSON()}}static fromJSON(t){return new ae(new _(t.direction[0],t.direction[1],t.direction[2]),N(t.magnitude??t.force))}clone(){return new ae(this.direction.clone(),this.magnitude.clone())}reset(){}}class oe{constructor(t,e){this.center=t,this.magnitude=e,this.type="GravityForce",this.temp=new _}initialize(t){}update(t,e){this.temp.copy(this.center).sub(t.position).normalize(),t.velocity.addScaledVector(this.temp,this.magnitude/t.position.distanceToSquared(this.center)*e)}frameUpdate(t){}toJSON(){return{type:this.type,center:[this.center.x,this.center.y,this.center.z],magnitude:this.magnitude}}static fromJSON(t){return new oe(new _(t.center[0],t.center[1],t.center[2]),t.magnitude)}clone(){return new oe(this.center.clone(),this.magnitude)}reset(){}}class he{constructor(t){this.angle=t,this.type="ChangeEmitDirection",this._temp=new _,this._q=new O,this.memory={data:[],dataCount:0}}initialize(t){const e=t.velocity.length();e!=0&&(t.velocity.normalize(),t.velocity.x===0&&t.velocity.y===0?this._temp.set(0,t.velocity.z,0):this._temp.set(-t.velocity.y,t.velocity.x,0),this.angle.startGen(this.memory),this._q.setFromAxisAngle(this._temp.normalize(),this.angle.genValue(this.memory)),this._temp.copy(t.velocity),t.velocity.applyQuaternion(this._q),this._q.setFromAxisAngle(this._temp,Math.random()*Math.PI*2),t.velocity.applyQuaternion(this._q),t.velocity.setLength(e))}update(t,e){}frameUpdate(t){}toJSON(){return{type:this.type,angle:this.angle.toJSON()}}static fromJSON(t){return new he(N(t.angle))}clone(){return new he(this.angle)}reset(){}}var Mt;(function(l){l[l.Death=0]="Death",l[l.Birth=1]="Birth",l[l.Frame=2]="Frame"})(Mt||(Mt={}));class le{constructor(t,e,i,s=Mt.Frame,r=1){this.particleSystem=t,this.useVelocityAsBasis=e,this.subParticleSystem=i,this.mode=s,this.emitProbability=r,this.type="EmitSubParticleSystem",this.q_=new O,this.v_=new _,this.v2_=new _,this.subEmissions=new Array,this.subParticleSystem&&this.subParticleSystem.system&&(this.subParticleSystem.system.onlyUsedByOther=!0)}initialize(t){}update(t,e){this.mode===Mt.Frame?this.emit(t,e):this.mode===Mt.Birth&&t.age===0?this.emit(t,e):this.mode===Mt.Death&&t.age+e>=t.life&&this.emit(t,e)}emit(t,e){if(!this.subParticleSystem||Math.random()>this.emitProbability)return;const i=new et;this.setMatrixFromParticle(i,t),this.subEmissions.push({burstParticleCount:0,burstParticleIndex:0,isBursting:!1,burstIndex:0,burstWaveIndex:0,time:0,waitEmiting:0,matrix:i,travelDistance:0,particle:t})}frameUpdate(t){if(this.subParticleSystem)for(let e=0;e<this.subEmissions.length;e++)if(this.subEmissions[e].time>=this.subParticleSystem.system.duration)this.subEmissions[e]=this.subEmissions[this.subEmissions.length-1],this.subEmissions.length=this.subEmissions.length-1,e--;else{const i=this.subEmissions[e];i.particle&&i.particle.age<i.particle.life?this.setMatrixFromParticle(i.matrix,i.particle):i.particle=void 0,this.subParticleSystem.system.emit(t,i,i.matrix)}}toJSON(){return{type:this.type,subParticleSystem:this.subParticleSystem?this.subParticleSystem.uuid:"",useVelocityAsBasis:this.useVelocityAsBasis,mode:this.mode,emitProbability:this.emitProbability}}static fromJSON(t,e){return new le(e,t.useVelocityAsBasis,t.subParticleSystem,t.mode,t.emitProbability)}clone(){return new le(this.particleSystem,this.useVelocityAsBasis,this.subParticleSystem,this.mode,this.emitProbability)}reset(){}setMatrixFromParticle(t,e){let i;if(e.rotation===void 0||this.useVelocityAsBasis)if(e.velocity.x===0&&e.velocity.y===0&&(e.velocity.z===1||e.velocity.z===0))t.set(1,0,0,e.position.x,0,1,0,e.position.y,0,0,1,e.position.z,0,0,0,1);else{this.v_.copy(mi).cross(e.velocity),this.v2_.copy(e.velocity).cross(this.v_);const s=this.v_.length(),r=this.v2_.length();t.set(this.v_.x/s,this.v2_.x/r,e.velocity.x,e.position.x,this.v_.y/s,this.v2_.y/r,e.velocity.y,e.position.y,this.v_.z/s,this.v2_.z/r,e.velocity.z,e.position.z,0,0,0,1)}else e.rotation instanceof O?i=e.rotation:(this.q_.setFromAxisAngle(mi,e.rotation),i=this.q_),t.compose(e.position,i,rs);this.particleSystem.worldSpace||t.multiplyMatrices(this.particleSystem.emitter.matrixWorld,t)}}const ls=.5*(Math.sqrt(3)-1),Vt=(3-Math.sqrt(3))/6,cs=1/3,it=1/6,ds=(Math.sqrt(5)-1)/4,V=(5-Math.sqrt(5))/20,F=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),B=new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]);class _i{constructor(t=Math.random){const e=typeof t=="function"?t:ms(t);this.p=us(e),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(let i=0;i<512;i++)this.perm[i]=this.p[i&255],this.permMod12[i]=this.perm[i]%12}noise2D(t,e){const i=this.permMod12,s=this.perm;let r=0,n=0,h=0;const a=(t+e)*ls,o=Math.floor(t+a),c=Math.floor(e+a),d=(o+c)*Vt,m=o-d,u=c-d,f=t-m,p=e-u;let y,x;f>p?(y=1,x=0):(y=0,x=1);const z=f-y+Vt,b=p-x+Vt,w=f-1+2*Vt,S=p-1+2*Vt,g=o&255,v=c&255;let T=.5-f*f-p*p;if(T>=0){const U=i[g+s[v]]*3;T*=T,r=T*T*(F[U]*f+F[U+1]*p)}let P=.5-z*z-b*b;if(P>=0){const U=i[g+y+s[v+x]]*3;P*=P,n=P*P*(F[U]*z+F[U+1]*b)}let E=.5-w*w-S*S;if(E>=0){const U=i[g+1+s[v+1]]*3;E*=E,h=E*E*(F[U]*w+F[U+1]*S)}return 70*(r+n+h)}noise3D(t,e,i){const s=this.permMod12,r=this.perm;let n,h,a,o;const c=(t+e+i)*cs,d=Math.floor(t+c),m=Math.floor(e+c),u=Math.floor(i+c),f=(d+m+u)*it,p=d-f,y=m-f,x=u-f,z=t-p,b=e-y,w=i-x;let S,g,v,T,P,E;z>=b?b>=w?(S=1,g=0,v=0,T=1,P=1,E=0):z>=w?(S=1,g=0,v=0,T=1,P=0,E=1):(S=0,g=0,v=1,T=1,P=0,E=1):b<w?(S=0,g=0,v=1,T=0,P=1,E=1):z<w?(S=0,g=1,v=0,T=0,P=1,E=1):(S=0,g=1,v=0,T=1,P=1,E=0);const U=z-S+it,J=b-g+it,Y=w-v+it,H=z-T+2*it,Z=b-P+2*it,W=w-E+2*it,Q=z-1+3*it,K=b-1+3*it,$=w-1+3*it,X=d&255,q=m&255,ft=u&255;let ht=.6-z*z-b*b-w*w;if(ht<0)n=0;else{const R=s[X+r[q+r[ft]]]*3;ht*=ht,n=ht*ht*(F[R]*z+F[R+1]*b+F[R+2]*w)}let lt=.6-U*U-J*J-Y*Y;if(lt<0)h=0;else{const R=s[X+S+r[q+g+r[ft+v]]]*3;lt*=lt,h=lt*lt*(F[R]*U+F[R+1]*J+F[R+2]*Y)}let at=.6-H*H-Z*Z-W*W;if(at<0)a=0;else{const R=s[X+T+r[q+P+r[ft+E]]]*3;at*=at,a=at*at*(F[R]*H+F[R+1]*Z+F[R+2]*W)}let ot=.6-Q*Q-K*K-$*$;if(ot<0)o=0;else{const R=s[X+1+r[q+1+r[ft+1]]]*3;ot*=ot,o=ot*ot*(F[R]*Q+F[R+1]*K+F[R+2]*$)}return 32*(n+h+a+o)}noise4D(t,e,i,s){const r=this.perm;let n,h,a,o,c;const d=(t+e+i+s)*ds,m=Math.floor(t+d),u=Math.floor(e+d),f=Math.floor(i+d),p=Math.floor(s+d),y=(m+u+f+p)*V,x=m-y,z=u-y,b=f-y,w=p-y,S=t-x,g=e-z,v=i-b,T=s-w;let P=0,E=0,U=0,J=0;S>g?P++:E++,S>v?P++:U++,S>T?P++:J++,g>v?E++:U++,g>T?E++:J++,v>T?U++:J++;const Y=P>=3?1:0,H=E>=3?1:0,Z=U>=3?1:0,W=J>=3?1:0,Q=P>=2?1:0,K=E>=2?1:0,$=U>=2?1:0,X=J>=2?1:0,q=P>=1?1:0,ft=E>=1?1:0,ht=U>=1?1:0,lt=J>=1?1:0,at=S-Y+V,ot=g-H+V,R=v-Z+V,Pe=T-W+V,Ee=S-Q+2*V,Ue=g-K+2*V,Ce=v-$+2*V,Be=T-X+2*V,Re=S-q+3*V,Fe=g-ft+3*V,Ve=v-ht+3*V,ke=T-lt+3*V,Ie=S-1+4*V,Je=g-1+4*V,Le=v-1+4*V,De=T-1+4*V,Ot=m&255,At=u&255,Pt=f&255,Et=p&255;let Ut=.6-S*S-g*g-v*v-T*T;if(Ut<0)n=0;else{const C=r[Ot+r[At+r[Pt+r[Et]]]]%32*4;Ut*=Ut,n=Ut*Ut*(B[C]*S+B[C+1]*g+B[C+2]*v+B[C+3]*T)}let Ct=.6-at*at-ot*ot-R*R-Pe*Pe;if(Ct<0)h=0;else{const C=r[Ot+Y+r[At+H+r[Pt+Z+r[Et+W]]]]%32*4;Ct*=Ct,h=Ct*Ct*(B[C]*at+B[C+1]*ot+B[C+2]*R+B[C+3]*Pe)}let Bt=.6-Ee*Ee-Ue*Ue-Ce*Ce-Be*Be;if(Bt<0)a=0;else{const C=r[Ot+Q+r[At+K+r[Pt+$+r[Et+X]]]]%32*4;Bt*=Bt,a=Bt*Bt*(B[C]*Ee+B[C+1]*Ue+B[C+2]*Ce+B[C+3]*Be)}let Rt=.6-Re*Re-Fe*Fe-Ve*Ve-ke*ke;if(Rt<0)o=0;else{const C=r[Ot+q+r[At+ft+r[Pt+ht+r[Et+lt]]]]%32*4;Rt*=Rt,o=Rt*Rt*(B[C]*Re+B[C+1]*Fe+B[C+2]*Ve+B[C+3]*ke)}let Ft=.6-Ie*Ie-Je*Je-Le*Le-De*De;if(Ft<0)c=0;else{const C=r[Ot+1+r[At+1+r[Pt+1+r[Et+1]]]]%32*4;Ft*=Ft,c=Ft*Ft*(B[C]*Ie+B[C+1]*Je+B[C+2]*Le+B[C+3]*De)}return 27*(n+h+a+o+c)}}function us(l){const t=new Uint8Array(256);for(let e=0;e<256;e++)t[e]=e;for(let e=0;e<255;e++){const i=e+~~(l()*(256-e)),s=t[e];t[e]=t[i],t[i]=s}return t}function ms(l){let t=0,e=0,i=0,s=1;const r=fs();return t=r(" "),e=r(" "),i=r(" "),t-=r(l),t<0&&(t+=1),e-=r(l),e<0&&(e+=1),i-=r(l),i<0&&(i+=1),function(){const n=2091639*t+s*23283064365386963e-26;return t=e,e=i,i=n-(s=n|0)}}function fs(){let l=4022871197;return function(t){t=t.toString();for(let e=0;e<t.length;e++){l+=t.charCodeAt(e);let i=.02519603282416938*l;l=i>>>0,i-=l,i*=l,l=i>>>0,i-=l,l+=i*4294967296}return(l>>>0)*23283064365386963e-26}}class ce{constructor(t,e,i,s){this.scale=t,this.octaves=e,this.velocityMultiplier=i,this.timeScale=s,this.type="TurbulenceField",this.generator=new _i,this.timeOffset=new _,this.temp=new _,this.temp2=new _,this.timeOffset.x=Math.random()/this.scale.x*this.timeScale.x,this.timeOffset.y=Math.random()/this.scale.y*this.timeScale.y,this.timeOffset.z=Math.random()/this.scale.z*this.timeScale.z}initialize(t){}update(t,e){const i=t.position.x/this.scale.x,s=t.position.y/this.scale.y,r=t.position.z/this.scale.z;this.temp.set(0,0,0);let n=1;for(let h=0;h<this.octaves;h++)this.temp2.set(this.generator.noise4D(i*n,s*n,r*n,this.timeOffset.x*n)/n,this.generator.noise4D(i*n,s*n,r*n,this.timeOffset.y*n)/n,this.generator.noise4D(i*n,s*n,r*n,this.timeOffset.z*n)/n),this.temp.add(this.temp2),n*=2;this.temp.multiply(this.velocityMultiplier),t.velocity.addScaledVector(this.temp,e)}toJSON(){return{type:this.type,scale:[this.scale.x,this.scale.y,this.scale.z],octaves:this.octaves,velocityMultiplier:[this.velocityMultiplier.x,this.velocityMultiplier.y,this.velocityMultiplier.z],timeScale:[this.timeScale.x,this.timeScale.y,this.timeScale.z]}}frameUpdate(t){this.timeOffset.x+=t*this.timeScale.x,this.timeOffset.y+=t*this.timeScale.y,this.timeOffset.z+=t*this.timeScale.z}static fromJSON(t){return new ce(new _(t.scale[0],t.scale[1],t.scale[2]),t.octaves,new _(t.velocityMultiplier[0],t.velocityMultiplier[1],t.velocityMultiplier[2]),new _(t.timeScale[0],t.timeScale[1],t.timeScale[2]))}clone(){return new ce(this.scale.clone(),this.octaves,this.velocityMultiplier.clone(),this.timeScale.clone())}reset(){}}const st=[],Ze=new _,We=new O;class de{constructor(t,e,i=new A(1),s=new A(0)){if(this.frequency=t,this.power=e,this.positionAmount=i,this.rotationAmount=s,this.type="Noise",this.duration=0,st.length===0)for(let r=0;r<100;r++)st.push(new _i)}initialize(t){t.lastPosNoise=new _,typeof t.rotation=="number"?t.lastRotNoise=0:t.lastRotNoise=new O,t.generatorIndex=[_e(0,100),_e(0,100),_e(0,100),_e(0,100)],this.positionAmount.startGen(t.memory),this.rotationAmount.startGen(t.memory),this.frequency.startGen(t.memory),this.power.startGen(t.memory)}update(t,e){let i=this.frequency.genValue(t.memory,t.age/t.life),s=this.power.genValue(t.memory,t.age/t.life),r=this.positionAmount.genValue(t.memory,t.age/t.life),n=this.rotationAmount.genValue(t.memory,t.age/t.life);r>0&&t.lastPosNoise!==void 0&&(t.position.sub(t.lastPosNoise),Ze.set(st[t.generatorIndex[0]].noise2D(0,t.age*i)*s*r,st[t.generatorIndex[1]].noise2D(0,t.age*i)*s*r,st[t.generatorIndex[2]].noise2D(0,t.age*i)*s*r),t.position.add(Ze),t.lastPosNoise.copy(Ze)),n>0&&t.lastRotNoise!==void 0&&(typeof t.rotation=="number"?(t.rotation-=t.lastRotNoise,t.rotation+=st[t.generatorIndex[3]].noise2D(0,t.age*i)*Math.PI*s*n):(t.lastRotNoise.invert(),t.rotation.multiply(t.lastRotNoise),We.set(st[t.generatorIndex[0]].noise2D(0,t.age*i)*s*n,st[t.generatorIndex[1]].noise2D(0,t.age*i)*s*n,st[t.generatorIndex[2]].noise2D(0,t.age*i)*s*n,st[t.generatorIndex[3]].noise2D(0,t.age*i)*s*n).normalize(),t.rotation.multiply(We),t.lastRotNoise.copy(We)))}toJSON(){return{type:this.type,frequency:this.frequency.toJSON(),power:this.power.toJSON(),positionAmount:this.positionAmount.toJSON(),rotationAmount:this.rotationAmount.toJSON()}}frameUpdate(t){this.duration+=t}static fromJSON(t){return new de(N(t.frequency),N(t.power),N(t.positionAmount),N(t.rotationAmount))}clone(){return new de(this.frequency.clone(),this.power.clone(),this.positionAmount.clone(),this.rotationAmount.clone())}reset(){}}class ue{constructor(t,e){this.color=t,this.speedRange=e,this.type="ColorBySpeed"}initialize(t){this.color.startGen(t.memory)}update(t,e){const i=(t.startSpeed-this.speedRange.a)/(this.speedRange.b-this.speedRange.a);this.color.genColor(t.memory,t.color,i),t.color.x*=t.startColor.x,t.color.y*=t.startColor.y,t.color.z*=t.startColor.z,t.color.w*=t.startColor.w}frameUpdate(t){}toJSON(){return{type:this.type,color:this.color.toJSON(),speedRange:this.speedRange.toJSON()}}static fromJSON(t){return new ue(si(t.color),xt.fromJSON(t.speedRange))}clone(){return new ue(this.color.clone(),this.speedRange.clone())}reset(){}}class me{initialize(t){this.size.startGen(t.memory)}constructor(t,e){this.size=t,this.speedRange=e,this.type="SizeBySpeed"}update(t){const e=(t.startSpeed-this.speedRange.a)/(this.speedRange.b-this.speedRange.a);this.size instanceof vt?this.size.genValue(t.memory,t.size,e).multiply(t.startSize):t.size.copy(t.startSize).multiplyScalar(this.size.genValue(t.memory,e))}toJSON(){return{type:this.type,size:this.size.toJSON(),speedRange:this.speedRange.toJSON()}}static fromJSON(t){return new me(Oe(t.size),xt.fromJSON(t.speedRange))}frameUpdate(t){}clone(){return new me(this.size.clone(),this.speedRange.clone())}reset(){}}class fe{constructor(t,e){this.angularVelocity=t,this.speedRange=e,this.type="RotationBySpeed",this.tempQuat=new O}initialize(t){typeof t.rotation=="number"&&this.angularVelocity.startGen(t.memory)}update(t,e){if(typeof t.rotation=="number"){const i=(t.startSpeed-this.speedRange.a)/(this.speedRange.b-this.speedRange.a);t.rotation+=e*this.angularVelocity.genValue(t.memory,i)}}toJSON(){return{type:this.type,angularVelocity:this.angularVelocity.toJSON(),speedRange:this.speedRange.toJSON()}}static fromJSON(t){return new fe(N(t.angularVelocity),xt.fromJSON(t.speedRange))}frameUpdate(t){}clone(){return new fe(this.angularVelocity.clone(),this.speedRange.clone())}reset(){}}class pe{initialize(t){this.speed.startGen(t.memory)}constructor(t,e){this.speed=t,this.dampen=e,this.type="LimitSpeedOverLife"}update(t,e){let i=t.velocity.length(),s=this.speed.genValue(t.memory,t.age/t.life);if(i>s){const r=(i-s)/i;t.velocity.multiplyScalar(1-r*this.dampen*e*20)}}toJSON(){return{type:this.type,speed:this.speed.toJSON(),dampen:this.dampen}}static fromJSON(t){return new pe(N(t.speed),t.dampen)}frameUpdate(t){}clone(){return new pe(this.speed.clone(),this.dampen)}reset(){}}const Ae={ApplyForce:{type:"ApplyForce",constructor:ae,params:[["direction",["vec3"]],["magnitude",["value"]]],loadJSON:ae.fromJSON},Noise:{type:"Noise",constructor:de,params:[["frequency",["value"]],["power",["value"]],["positionAmount",["value"]],["rotationAmount",["value"]]],loadJSON:de.fromJSON},TurbulenceField:{type:"TurbulenceField",constructor:ce,params:[["scale",["vec3"]],["octaves",["number"]],["velocityMultiplier",["vec3"]],["timeScale",["vec3"]]],loadJSON:ce.fromJSON},GravityForce:{type:"GravityForce",constructor:oe,params:[["center",["vec3"]],["magnitude",["number"]]],loadJSON:oe.fromJSON},ColorOverLife:{type:"ColorOverLife",constructor:Kt,params:[["color",["colorFunc"]]],loadJSON:Kt.fromJSON},RotationOverLife:{type:"RotationOverLife",constructor:$t,params:[["angularVelocity",["value","valueFunc"]]],loadJSON:$t.fromJSON},Rotation3DOverLife:{type:"Rotation3DOverLife",constructor:jt,params:[["angularVelocity",["rotationFunc"]]],loadJSON:jt.fromJSON},SizeOverLife:{type:"SizeOverLife",constructor:ee,params:[["size",["value","valueFunc","vec3Func"]]],loadJSON:ee.fromJSON},ColorBySpeed:{type:"ColorBySpeed",constructor:ue,params:[["color",["colorFunc"]],["speedRange",["range"]]],loadJSON:ue.fromJSON},RotationBySpeed:{type:"RotationBySpeed",constructor:fe,params:[["angularVelocity",["value","valueFunc"]],["speedRange",["range"]]],loadJSON:fe.fromJSON},SizeBySpeed:{type:"SizeBySpeed",constructor:me,params:[["size",["value","valueFunc","vec3Func"]],["speedRange",["range"]]],loadJSON:me.fromJSON},SpeedOverLife:{type:"SpeedOverLife",constructor:ie,params:[["speed",["value","valueFunc"]]],loadJSON:ie.fromJSON},FrameOverLife:{type:"FrameOverLife",constructor:se,params:[["frame",["value","valueFunc"]]],loadJSON:se.fromJSON},ForceOverLife:{type:"ForceOverLife",constructor:te,params:[["x",["value","valueFunc"]],["y",["value","valueFunc"]],["z",["value","valueFunc"]]],loadJSON:te.fromJSON},OrbitOverLife:{type:"OrbitOverLife",constructor:re,params:[["orbitSpeed",["value","valueFunc"]],["axis",["vec3"]]],loadJSON:re.fromJSON},WidthOverLength:{type:"WidthOverLength",constructor:ne,params:[["width",["value","valueFunc"]]],loadJSON:ne.fromJSON},ChangeEmitDirection:{type:"ChangeEmitDirection",constructor:he,params:[["angle",["value"]]],loadJSON:he.fromJSON},EmitSubParticleSystem:{type:"EmitSubParticleSystem",constructor:le,params:[["particleSystem",["self"]],["useVelocityAsBasis",["boolean"]],["subParticleSystem",["particleSystem"]],["mode",["number"]],["emitProbability",["number"]]],loadJSON:le.fromJSON},LimitSpeedOverLife:{type:"LimitSpeedOverLife",constructor:pe,params:[["speed",["value","valueFunc"]],["dampen",["number"]]],loadJSON:pe.fromJSON}};function ps(l,t){return Ae[l.type]?Ae[l.type].loadJSON(l,t):null}const ys=[];function gs(l){if(!ys.find(e=>e.id===l.id)){for(const e of l.emitterShapes)je[e.type]||(je[e.type]=e);for(const e of l.behaviors)Ae[e.type]||(Ae[e.type]=e)}}class ye{get geometry(){return this._geometry}set geometry(t){if(this._geometry=t,t===void 0||typeof t=="string")return;const e=new Ui;this._triangleIndexToArea.length=0;let i=0;if(!t.getIndex())return;const s=t.getIndex().array,r=s.length/3;this._triangleIndexToArea.push(0);for(let n=0;n<r;n++)e.setFromAttributeAndIndices(t.getAttribute("position"),s[n*3],s[n*3+1],s[n*3+2]),i+=e.getArea(),this._triangleIndexToArea.push(i);t.userData.triangleIndexToArea=this._triangleIndexToArea}constructor(t){this.type="mesh_surface",this._triangleIndexToArea=[],this._tempA=new Ge,this._tempB=new Ge,this._tempC=new Ge,t&&(this.geometry=t)}initialize(t){const e=this._geometry;if(!e||e.getIndex()===null){t.position.set(0,0,0),t.velocity.set(0,0,1).multiplyScalar(t.startSpeed);return}const i=this._triangleIndexToArea.length-1;let s=0,r=i;const n=Math.random()*this._triangleIndexToArea[i];for(;s+1<r;){const u=Math.floor((s+r)/2);n<this._triangleIndexToArea[u]?r=u:s=u}let h=Math.random(),a=Math.random();h+a>1&&(h=1-h,a=1-a);const o=e.getIndex().array[s*3],c=e.getIndex().array[s*3+1],d=e.getIndex().array[s*3+2],m=e.getAttribute("position");this._tempA.fromBufferAttribute(m,o),this._tempB.fromBufferAttribute(m,c),this._tempC.fromBufferAttribute(m,d),this._tempB.sub(this._tempA),this._tempC.sub(this._tempA),this._tempA.addScaledVector(this._tempB,h).addScaledVector(this._tempC,a),t.position.copy(this._tempA),this._tempA.copy(this._tempB).cross(this._tempC).normalize(),t.velocity.copy(this._tempA).normalize().multiplyScalar(t.startSpeed)}toJSON(){return{type:"mesh_surface",mesh:this._geometry?this._geometry.uuid:""}}static fromJSON(t,e){return new ye(e.geometries[t.geometry])}clone(){return new ye(this._geometry)}update(t,e){}}const xs={id:"three.quarks",emitterShapes:[{type:"mesh_surface",params:[["geometry",["geometry"]]],constructor:ye,loadJSON:ye.fromJSON}],behaviors:[]};var vs=`
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
`,Ss=`
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
`,Ms=`
#ifdef SOFT_PARTICLES
    varying vec4 projPosition;
    varying float linearDepth;
#endif
`,_s=`
#ifdef SOFT_PARTICLES
    projPosition = gl_Position;
    linearDepth = -mvPosition.z;
#endif
`,ws=`
#ifdef USE_MAP
    vec4 texelColor = texture2D( map, vUv);
    #ifdef TILE_BLEND
        texelColor = mix( texelColor, texture2D( map, vUvNext ), vUvBlend );
    #endif
    diffuseColor *= texelColor;
#endif
`,zs=`
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
`,bs=`
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
`,Ts=`
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

`;const ut=bi;function Ns(){ut.tile_pars_vertex=bs,ut.tile_vertex=Ts,ut.tile_pars_fragment=zs,ut.tile_fragment=ws,ut.soft_pars_vertex=Ms,ut.soft_vertex=_s,ut.soft_pars_fragment=Ss,ut.soft_fragment=vs}class Os extends yi{constructor(t){super(),this.type="ParticleEmitter",this.system=t}clone(){const t=this.system.clone();return t.emitter.copy(this,!0),t.emitter}dispose(){}extractFromCache(t){const e=[];for(const i in t){const s=t[i];delete s.metadata,e.push(s)}return e}toJSON(t,e={}){const i=this.children;this.children=this.children.filter(r=>r.type!=="ParticleSystemPreview");const s=super.toJSON(t);return this.children=i,this.system!==null&&(s.object.ps=this.system.toJSON(t,e)),s}}var M;(function(l){l[l.BillBoard=0]="BillBoard",l[l.StretchedBillBoard=1]="StretchedBillBoard",l[l.Mesh=2]="Mesh",l[l.Trail=3]="Trail",l[l.HorizontalBillBoard=4]="HorizontalBillBoard",l[l.VerticalBillBoard=5]="VerticalBillBoard"})(M||(M={}));class wi extends Ai{constructor(t){super(),this.type="VFXBatch",this.maxParticles=1e3,this.systems=new Set;const e=new ze;e.mask=t.layers.mask;const i=t.material.clone();i.defines={},Object.assign(i.defines,t.material.defines),this.settings={instancingGeometry:t.instancingGeometry,renderMode:t.renderMode,renderOrder:t.renderOrder,material:i,uTileCount:t.uTileCount,vTileCount:t.vTileCount,blendTiles:t.blendTiles,softParticles:t.softParticles,softNearFade:t.softNearFade,softFarFade:t.softFarFade,layers:e},this.frustumCulled=!1,this.renderOrder=this.settings.renderOrder}addSystem(t){this.systems.add(t)}removeSystem(t){this.systems.delete(t)}applyDepthTexture(t){const e=this.material.uniforms.depthTexture;e&&e.value!==t&&(e.value=t,this.material.needsUpdate=!0)}getVisibleSystems(){return Array.from(this.systems).filter(t=>t.emitter.visible)}}const As=new _(0,0,1),Qe=new O,Ps=new _,Es=new _;new _;const fi=60,we=new Ti(1,1,1,1);class ei{set time(t){this.emissionState.time=t}get time(){return this.emissionState.time}get layers(){return this.rendererSettings.layers}get texture(){return this.rendererSettings.material.map}set texture(t){this.rendererSettings.material.map=t,this.neededToUpdateRender=!0}get material(){return this.rendererSettings.material}set material(t){this.rendererSettings.material=t,this.neededToUpdateRender=!0}get uTileCount(){return this.rendererSettings.uTileCount}set uTileCount(t){this.rendererSettings.uTileCount=t,this.neededToUpdateRender=!0}get vTileCount(){return this.rendererSettings.vTileCount}set vTileCount(t){this.rendererSettings.vTileCount=t,this.neededToUpdateRender=!0}get blendTiles(){return this.rendererSettings.blendTiles}set blendTiles(t){this.rendererSettings.blendTiles=t,this.neededToUpdateRender=!0}get softParticles(){return this.rendererSettings.softParticles}set softParticles(t){this.rendererSettings.softParticles=t,this.neededToUpdateRender=!0}get softNearFade(){return this.rendererSettings.softNearFade}set softNearFade(t){this.rendererSettings.softNearFade=t,this.neededToUpdateRender=!0}get softFarFade(){return this.rendererSettings.softFarFade}set softFarFade(t){this.rendererSettings.softFarFade=t,this.neededToUpdateRender=!0}get instancingGeometry(){return this.rendererSettings.instancingGeometry}set instancingGeometry(t){this.restart(),this.particles.length=0,this.rendererSettings.instancingGeometry=t,this.neededToUpdateRender=!0}get renderMode(){return this.rendererSettings.renderMode}set renderMode(t){if(this.rendererSettings.renderMode!==t){let e=!1;switch(this.rendererSettings.renderMode===M.Trail&&(e=!0),this.rendererSettings.renderMode===M.Mesh&&(this.startRotation=new A(0)),t){case M.Trail:this.rendererEmitterSettings={startLength:new A(30),followLocalOrigin:!1},e=!0;break;case M.Mesh:this.rendererEmitterSettings={geometry:we},this.startRotation=new Gt(new _(0,1,0),new A(0));break;case M.StretchedBillBoard:this.rendererEmitterSettings={speedFactor:0,lengthFactor:2},this.rendererSettings.instancingGeometry=we;break;case M.BillBoard:case M.VerticalBillBoard:case M.HorizontalBillBoard:this.rendererEmitterSettings={},this.rendererSettings.instancingGeometry=we;break}this.rendererSettings.renderMode=t,e&&(this.restart(),this.particles.length=0),this.neededToUpdateRender=!0}}get renderOrder(){return this.rendererSettings.renderOrder}set renderOrder(t){this.rendererSettings.renderOrder=t,this.neededToUpdateRender=!0}get blending(){return this.rendererSettings.material.blending}set blending(t){this.rendererSettings.material.blending=t,this.neededToUpdateRender=!0}constructor(t){if(this.temp=new _,this.travelDistance=0,this.normalMatrix=new nt,this.memory=[],this.listeners={},this.firstTimeUpdate=!0,this.autoDestroy=t.autoDestroy===void 0?!1:t.autoDestroy,this.duration=t.duration??1,this.looping=t.looping===void 0?!0:t.looping,this.prewarm=t.prewarm===void 0?!1:t.prewarm,this.startLife=t.startLife??new A(5),this.startSpeed=t.startSpeed??new A(0),this.startRotation=t.startRotation??new A(0),this.startSize=t.startSize??new A(1),this.startColor=t.startColor??new zt(new G(1,1,1,1)),this.emissionOverTime=t.emissionOverTime??new A(10),this.emissionOverDistance=t.emissionOverDistance??new A(0),this.emissionBursts=t.emissionBursts??[],this.onlyUsedByOther=t.onlyUsedByOther??!1,this.emitterShape=t.shape??new bt,this.behaviors=t.behaviors??new Array,this.worldSpace=t.worldSpace??!1,this.rendererEmitterSettings=t.rendererEmitterSettings??{},t.renderMode===M.StretchedBillBoard){const e=this.rendererEmitterSettings;t.speedFactor!==void 0&&(e.speedFactor=t.speedFactor),e.speedFactor=e.speedFactor??0,e.lengthFactor=e.lengthFactor??0}this.rendererSettings={instancingGeometry:t.instancingGeometry??we,renderMode:t.renderMode??M.BillBoard,renderOrder:t.renderOrder??0,material:t.material,uTileCount:t.uTileCount??1,vTileCount:t.vTileCount??1,blendTiles:t.blendTiles??!1,softParticles:t.softParticles??!1,softNearFade:t.softNearFade??0,softFarFade:t.softFarFade??0,layers:t.layers??new ze},this.neededToUpdateRender=!0,this.particles=new Array,this.startTileIndex=t.startTileIndex||new A(0),this.emitter=new Os(this),this.paused=!1,this.particleNum=0,this.emissionState={isBursting:!1,burstParticleIndex:0,burstParticleCount:0,burstIndex:0,burstWaveIndex:0,time:0,waitEmiting:0,travelDistance:0},this.emissionBursts.forEach(e=>e.count.startGen(this.memory)),this.emissionOverDistance.startGen(this.memory),this.emitEnded=!1,this.markForDestroy=!1,this.prewarmed=!1}pause(){this.paused=!0}play(){this.paused=!1}stop(){this.restart(),this.pause()}spawn(t,e,i){Qe.setFromRotationMatrix(i);const s=Ps,r=Qe,n=Es;i.decompose(s,r,n);for(let h=0;h<t;h++){for(e.burstParticleIndex=h,this.particleNum++;this.particles.length<this.particleNum;)this.rendererSettings.renderMode===M.Trail?this.particles.push(new ti):this.particles.push(new os);const a=this.particles[this.particleNum-1];if(a.reset(),a.speedModifier=1,this.startColor.startGen(a.memory),this.startColor.genColor(a.memory,a.startColor,this.emissionState.time),a.color.copy(a.startColor),this.startSpeed.startGen(a.memory),a.startSpeed=this.startSpeed.genValue(a.memory,e.time/this.duration),this.startLife.startGen(a.memory),a.life=this.startLife.genValue(a.memory,e.time/this.duration),a.age=0,this.startSize.startGen(a.memory),this.startSize.type==="vec3function")this.startSize.genValue(a.memory,a.startSize,e.time/this.duration);else{const o=this.startSize.genValue(a.memory,e.time/this.duration);a.startSize.set(o,o,o)}if(this.startTileIndex.startGen(a.memory),a.uvTile=this.startTileIndex.genValue(a.memory),a.size.copy(a.startSize),this.rendererSettings.renderMode===M.Mesh||this.rendererSettings.renderMode===M.BillBoard||this.rendererSettings.renderMode===M.VerticalBillBoard||this.rendererSettings.renderMode===M.HorizontalBillBoard||this.rendererSettings.renderMode===M.StretchedBillBoard){const o=a;this.startRotation.startGen(a.memory),this.rendererSettings.renderMode===M.Mesh?(o.rotation instanceof O||(o.rotation=new O),this.startRotation.type==="rotation"?this.startRotation.genValue(a.memory,o.rotation,1,e.time/this.duration):o.rotation.setFromAxisAngle(As,this.startRotation.genValue(o.memory,e.time/this.duration))):this.startRotation.type==="rotation"?o.rotation=0:o.rotation=this.startRotation.genValue(o.memory,e.time/this.duration)}else if(this.rendererSettings.renderMode===M.Trail){const o=a;this.rendererEmitterSettings.startLength.startGen(o.memory),o.length=this.rendererEmitterSettings.startLength.genValue(o.memory,e.time/this.duration)}if(this.emitterShape.initialize(a,e),this.rendererSettings.renderMode===M.Trail&&this.rendererEmitterSettings.followLocalOrigin){const o=a;o.localPosition=new _().copy(o.position)}this.worldSpace?(a.position.applyMatrix4(i),a.startSize.multiply(n).abs(),a.size.copy(a.startSize),a.velocity.multiply(n).applyMatrix3(this.normalMatrix),a.rotation&&a.rotation instanceof O&&a.rotation.multiplyQuaternions(Qe,a.rotation)):this.onlyUsedByOther&&(a.parentMatrix=i);for(let o=0;o<this.behaviors.length;o++)this.behaviors[o].initialize(a,this)}}endEmit(){this.emitEnded=!0,this.autoDestroy&&(this.markForDestroy=!0),this.fire({type:"emitEnd",particleSystem:this})}dispose(){this._renderer&&this._renderer.deleteSystem(this),this.emitter.dispose(),this.emitter.parent&&this.emitter.parent.remove(this.emitter),this.fire({type:"destroy",particleSystem:this})}restart(){this.memory.length=0,this.paused=!1,this.particleNum=0,this.emissionState.isBursting=!1,this.emissionState.burstIndex=0,this.emissionState.burstWaveIndex=0,this.emissionState.time=0,this.emissionState.waitEmiting=0,this.behaviors.forEach(t=>{t.reset()}),this.emitEnded=!1,this.markForDestroy=!1,this.prewarmed=!1,this.emissionBursts.forEach(t=>t.count.startGen(this.memory)),this.emissionOverDistance.startGen(this.memory)}update(t){if(this.paused)return;let e=this.emitter;for(;e.parent;)e=e.parent;if(e.type!=="Scene"){this.dispose();return}if(this.firstTimeUpdate&&(this.firstTimeUpdate=!1,this.emitter.updateWorldMatrix(!0,!1)),this.emitEnded&&this.particleNum===0){this.markForDestroy&&this.emitter.parent&&this.dispose();return}if(this.looping&&this.prewarm&&!this.prewarmed){this.prewarmed=!0;for(let i=0;i<this.duration*fi;i++)this.update(1/fi)}t>.1&&(t=.1),this.neededToUpdateRender&&(this._renderer&&this._renderer.updateSystem(this),this.neededToUpdateRender=!1),this.onlyUsedByOther||this.emit(t,this.emissionState,this.emitter.matrixWorld),this.emitterShape.update(this,t);for(let i=0;i<this.behaviors.length;i++){this.behaviors[i].frameUpdate(t);for(let s=0;s<this.particleNum;s++)this.particles[s].died||this.behaviors[i].update(this.particles[s],t)}for(let i=0;i<this.particleNum;i++)this.rendererEmitterSettings.followLocalOrigin&&this.particles[i].localPosition?(this.particles[i].position.copy(this.particles[i].localPosition),this.particles[i].parentMatrix?this.particles[i].position.applyMatrix4(this.particles[i].parentMatrix):this.particles[i].position.applyMatrix4(this.emitter.matrixWorld)):this.particles[i].position.addScaledVector(this.particles[i].velocity,t*this.particles[i].speedModifier),this.particles[i].age+=t;if(this.rendererSettings.renderMode===M.Trail)for(let i=0;i<this.particleNum;i++)this.particles[i].update();for(let i=0;i<this.particleNum;i++){const s=this.particles[i];s.died&&(!(s instanceof ti)||s.previous.length===0)&&(this.particles[i]=this.particles[this.particleNum-1],this.particles[this.particleNum-1]=s,this.particleNum--,i--,this.fire({type:"particleDied",particleSystem:this,particle:s}))}}emit(t,e,i){e.time>this.duration&&(this.looping?(e.time-=this.duration,e.burstIndex=0,this.behaviors.forEach(r=>{r.reset()})):!this.emitEnded&&!this.onlyUsedByOther&&this.endEmit()),this.normalMatrix.getNormalMatrix(i);const s=Math.ceil(e.waitEmiting);for(this.spawn(s,e,i),e.waitEmiting-=s;e.burstIndex<this.emissionBursts.length&&this.emissionBursts[e.burstIndex].time<=e.time;){if(Math.random()<this.emissionBursts[e.burstIndex].probability){const r=this.emissionBursts[e.burstIndex].count.genValue(this.memory,this.time);e.isBursting=!0,e.burstParticleCount=r,this.spawn(r,e,i),e.isBursting=!1}e.burstIndex++}if(!this.emitEnded&&(e.waitEmiting+=t*this.emissionOverTime.genValue(this.memory,e.time/this.duration),e.previousWorldPos!=null)){this.temp.set(i.elements[12],i.elements[13],i.elements[14]),e.travelDistance+=e.previousWorldPos.distanceTo(this.temp);const r=this.emissionOverDistance.genValue(this.memory,e.time/this.duration);if(e.travelDistance*r>0){const n=Math.floor(e.travelDistance*r);e.travelDistance-=n/r,e.waitEmiting+=n}}e.previousWorldPos===void 0&&(e.previousWorldPos=new _),e.previousWorldPos.set(i.elements[12],i.elements[13],i.elements[14]),e.time+=t}toJSON(t,e={}){var n;if((t===void 0||typeof t=="string")&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}}),t.materials[this.rendererSettings.material.uuid]=this.rendererSettings.material.toJSON(t),e.useUrlForImage&&((n=this.texture)==null?void 0:n.source)!==void 0){const h=this.texture.source;t.images[h.uuid]={uuid:h.uuid,url:this.texture.image.url}}let s;this.renderMode===M.Trail?s={startLength:this.rendererEmitterSettings.startLength.toJSON(),followLocalOrigin:this.rendererEmitterSettings.followLocalOrigin}:this.renderMode===M.Mesh?s={}:this.renderMode===M.StretchedBillBoard?s={speedFactor:this.rendererEmitterSettings.speedFactor,lengthFactor:this.rendererEmitterSettings.lengthFactor}:s={};const r=this.rendererSettings.instancingGeometry;return t.geometries&&!t.geometries[r.uuid]&&(t.geometries[r.uuid]=r.toJSON()),{version:"3.0",autoDestroy:this.autoDestroy,looping:this.looping,prewarm:this.prewarm,duration:this.duration,shape:this.emitterShape.toJSON(),startLife:this.startLife.toJSON(),startSpeed:this.startSpeed.toJSON(),startRotation:this.startRotation.toJSON(),startSize:this.startSize.toJSON(),startColor:this.startColor.toJSON(),emissionOverTime:this.emissionOverTime.toJSON(),emissionOverDistance:this.emissionOverDistance.toJSON(),emissionBursts:this.emissionBursts.map(h=>({time:h.time,count:h.count.toJSON(),probability:h.probability,interval:h.interval,cycle:h.cycle})),onlyUsedByOther:this.onlyUsedByOther,instancingGeometry:this.rendererSettings.instancingGeometry.uuid,renderOrder:this.renderOrder,renderMode:this.renderMode,rendererEmitterSettings:s,material:this.rendererSettings.material.uuid,layers:this.layers.mask,startTileIndex:this.startTileIndex.toJSON(),uTileCount:this.uTileCount,vTileCount:this.vTileCount,blendTiles:this.blendTiles,softParticles:this.rendererSettings.softParticles,softFarFade:this.rendererSettings.softFarFade,softNearFade:this.rendererSettings.softNearFade,behaviors:this.behaviors.map(h=>h.toJSON()),worldSpace:this.worldSpace}}static fromJSON(t,e,i){var a;const s=ns(t.shape,e);let r;if(t.renderMode===M.Trail){const o=t.rendererEmitterSettings;r={startLength:o.startLength!=null?N(o.startLength):new A(30),followLocalOrigin:o.followLocalOrigin}}else t.renderMode===M.Mesh?r={}:t.renderMode===M.StretchedBillBoard?(r=t.rendererEmitterSettings,t.speedFactor!=null&&(r.speedFactor=t.speedFactor)):r={};const n=new ze;t.layers&&(n.mask=t.layers);const h=new ei({autoDestroy:t.autoDestroy,looping:t.looping,prewarm:t.prewarm,duration:t.duration,shape:s,startLife:N(t.startLife),startSpeed:N(t.startSpeed),startRotation:Oe(t.startRotation),startSize:Oe(t.startSize),startColor:si(t.startColor),emissionOverTime:N(t.emissionOverTime),emissionOverDistance:N(t.emissionOverDistance),emissionBursts:(a=t.emissionBursts)==null?void 0:a.map(o=>({time:o.time,count:typeof o.count=="number"?new A(o.count):N(o.count),probability:o.probability??1,interval:o.interval??.1,cycle:o.cycle??1})),onlyUsedByOther:t.onlyUsedByOther,instancingGeometry:e.geometries[t.instancingGeometry],renderMode:t.renderMode,rendererEmitterSettings:r,renderOrder:t.renderOrder,layers:n,material:t.material?e.materials[t.material]:t.texture?new ai({map:e.textures[t.texture],transparent:t.transparent??!0,blending:t.blending,side:oi}):new ai({color:16777215,transparent:!0,blending:pi,side:oi}),startTileIndex:typeof t.startTileIndex=="number"?new A(t.startTileIndex):N(t.startTileIndex),uTileCount:t.uTileCount,vTileCount:t.vTileCount,blendTiles:t.blendTiles,softParticles:t.softParticles,softFarFade:t.softFarFade,softNearFade:t.softNearFade,behaviors:[],worldSpace:t.worldSpace});return h.behaviors=t.behaviors.map(o=>{const c=ps(o,h);return c&&c.type==="EmitSubParticleSystem"&&(i[o.subParticleSystem]=c),c}).filter(o=>o!==null),h}addBehavior(t){this.behaviors.push(t)}getRendererSettings(){return this.rendererSettings}addEventListener(t,e){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(e)}removeAllEventListeners(t){this.listeners[t]&&(this.listeners[t]=[])}removeEventListener(t,e){if(this.listeners[t]){const i=this.listeners[t].indexOf(e);i!==-1&&this.listeners[t].splice(i,1)}}fire(t){this.listeners[t.type]&&this.listeners[t.type].forEach(e=>e(t))}clone(){const t=[];for(const r of this.emissionBursts){const n={};Object.assign(n,r),t.push(n)}const e=[];for(const r of this.behaviors)e.push(r.clone());let i;this.renderMode===M.Trail?i={startLength:this.rendererEmitterSettings.startLength.clone(),followLocalOrigin:this.rendererEmitterSettings.followLocalOrigin}:this.renderMode===M.StretchedBillBoard?i={lengthFactor:this.rendererEmitterSettings.lengthFactor,speedFactor:this.rendererEmitterSettings.speedFactor}:i={};const s=new ze;return s.mask=this.layers.mask,new ei({autoDestroy:this.autoDestroy,looping:this.looping,duration:this.duration,shape:this.emitterShape.clone(),startLife:this.startLife.clone(),startSpeed:this.startSpeed.clone(),startRotation:this.startRotation.clone(),startSize:this.startSize.clone(),startColor:this.startColor.clone(),emissionOverTime:this.emissionOverTime.clone(),emissionOverDistance:this.emissionOverDistance.clone(),emissionBursts:t,onlyUsedByOther:this.onlyUsedByOther,instancingGeometry:this.rendererSettings.instancingGeometry,renderMode:this.renderMode,renderOrder:this.renderOrder,rendererEmitterSettings:i,material:this.rendererSettings.material,startTileIndex:this.startTileIndex,uTileCount:this.uTileCount,vTileCount:this.vTileCount,blendTiles:this.blendTiles,softParticles:this.softParticles,softFarFade:this.softFarFade,softNearFade:this.softNearFade,behaviors:e,worldSpace:this.worldSpace,layers:s})}}var Ke=`

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
`,ri=`
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
}`,Us=`
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
`,Cs=`
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
`,ni=`
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
`,Bs=`
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
`;function ii(l){return l===0?"uv":`uv${l}`}class Rs extends Pi{constructor(t){super(t)}onBeforeCompile(t,e){super.onBeforeCompile(t,e),t.vertexShader=ni,t.fragmentShader=ri}}class Fs extends Ei{constructor(t){super(t)}onBeforeCompile(t,e){super.onBeforeCompile(t,e),t.vertexShader=ni,t.fragmentShader=ri}}class Vs extends wi{constructor(t){super(t),this.vector_=new _,this.vector2_=new _,this.vector3_=new _,this.quaternion_=new O,this.quaternion2_=new O,this.quaternion3_=new O,this.rotationMat_=new nt,this.rotationMat2_=new nt,this.maxParticles=1e3,this.setupBuffers(),this.rebuildMaterial()}buildExpandableBuffers(){this.offsetBuffer=new pt(new Float32Array(this.maxParticles*3),3),this.offsetBuffer.setUsage(L),this.geometry.setAttribute("offset",this.offsetBuffer),this.colorBuffer=new pt(new Float32Array(this.maxParticles*4),4),this.colorBuffer.setUsage(L),this.geometry.setAttribute("color",this.colorBuffer),this.settings.renderMode===M.Mesh?(this.rotationBuffer=new pt(new Float32Array(this.maxParticles*4),4),this.rotationBuffer.setUsage(L),this.geometry.setAttribute("rotation",this.rotationBuffer)):(this.settings.renderMode===M.BillBoard||this.settings.renderMode===M.HorizontalBillBoard||this.settings.renderMode===M.VerticalBillBoard||this.settings.renderMode===M.StretchedBillBoard)&&(this.rotationBuffer=new pt(new Float32Array(this.maxParticles),1),this.rotationBuffer.setUsage(L),this.geometry.setAttribute("rotation",this.rotationBuffer)),this.sizeBuffer=new pt(new Float32Array(this.maxParticles*3),3),this.sizeBuffer.setUsage(L),this.geometry.setAttribute("size",this.sizeBuffer),this.uvTileBuffer=new pt(new Float32Array(this.maxParticles),1),this.uvTileBuffer.setUsage(L),this.geometry.setAttribute("uvTile",this.uvTileBuffer),this.settings.renderMode===M.StretchedBillBoard&&(this.velocityBuffer=new pt(new Float32Array(this.maxParticles*4),4),this.velocityBuffer.setUsage(L),this.geometry.setAttribute("velocity",this.velocityBuffer))}setupBuffers(){this.geometry&&this.geometry.dispose(),this.geometry=new Ni,this.geometry.setIndex(this.settings.instancingGeometry.getIndex()),this.settings.instancingGeometry.hasAttribute("normal")&&this.geometry.setAttribute("normal",this.settings.instancingGeometry.getAttribute("normal")),this.geometry.setAttribute("position",this.settings.instancingGeometry.getAttribute("position")),this.settings.instancingGeometry.hasAttribute("uv")&&this.geometry.setAttribute("uv",this.settings.instancingGeometry.getAttribute("uv")),this.buildExpandableBuffers()}expandBuffers(t){for(;t>=this.maxParticles;)this.maxParticles*=2;this.setupBuffers()}rebuildMaterial(){this.layers.mask=this.settings.layers.mask;const t={},e={};this.settings.material.type!=="MeshStandardMaterial"&&this.settings.material.type!=="MeshPhysicalMaterial"&&(t.map=new tt(this.settings.material.map)),this.settings.material.alphaTest&&(e.USE_ALPHATEST="",t.alphaTest=new tt(this.settings.material.alphaTest)),e.USE_UV="";const i=this.settings.uTileCount,s=this.settings.vTileCount;(i>1||s>1)&&(e.UV_TILE="",t.tileCount=new tt(new _t(i,s))),this.settings.material.defines&&this.settings.material.defines.USE_COLOR_AS_ALPHA!==void 0&&(e.USE_COLOR_AS_ALPHA=""),this.settings.material.normalMap&&(e.USE_NORMALMAP="",e.NORMALMAP_UV=ii(this.settings.material.normalMap.channel),t.normalMapTransform=new tt(new nt().copy(this.settings.material.normalMap.matrix))),this.settings.material.map&&(e.USE_MAP="",this.settings.blendTiles&&(e.TILE_BLEND=""),e.MAP_UV=ii(this.settings.material.map.channel),t.mapTransform=new tt(new nt().copy(this.settings.material.map.matrix))),e.USE_COLOR_ALPHA="";let r;if(this.settings.softParticles){e.SOFT_PARTICLES="";const h=this.settings.softNearFade,a=1/(this.settings.softFarFade-this.settings.softNearFade);t.softParams=new tt(new _t(h,a)),t.depthTexture=new tt(null);const o=t.projParams=new tt(new G);r=(c,d,m)=>{o.value.set(m.near,m.far,0,0)}}let n=!1;if(this.settings.renderMode===M.BillBoard||this.settings.renderMode===M.VerticalBillBoard||this.settings.renderMode===M.HorizontalBillBoard||this.settings.renderMode===M.Mesh){let h,a;this.settings.renderMode===M.Mesh?this.settings.material.type==="MeshStandardMaterial"||this.settings.material.type==="MeshPhysicalMaterial"?(e.USE_COLOR="",h=ni,a=ri,n=!0):(h=Cs,a=Ke):(h=Us,a=Ke),this.settings.renderMode===M.VerticalBillBoard?e.VERTICAL="":this.settings.renderMode===M.HorizontalBillBoard&&(e.HORIZONTAL="");let o=!1;this.settings.renderMode===M.Mesh&&(this.settings.material.type==="MeshStandardMaterial"?(this.material=new Rs({}),this.material.copy(this.settings.material),this.material.uniforms=t,this.material.defines=e,o=!0):this.settings.material.type==="MeshPhysicalMaterial"&&(this.material=new Fs({}),this.material.copy(this.settings.material),this.material.uniforms=t,this.material.defines=e,o=!0)),o||(this.material=new $e({uniforms:t,defines:e,vertexShader:h,fragmentShader:a,transparent:this.settings.material.transparent,depthWrite:!this.settings.material.transparent,blending:this.settings.material.blending,blendDst:this.settings.material.blendDst,blendSrc:this.settings.material.blendSrc,blendEquation:this.settings.material.blendEquation,premultipliedAlpha:this.settings.material.premultipliedAlpha,side:this.settings.material.side,alphaTest:this.settings.material.alphaTest,depthTest:this.settings.material.depthTest,lights:n}))}else if(this.settings.renderMode===M.StretchedBillBoard)t.speedFactor=new tt(1),this.material=new $e({uniforms:t,defines:e,vertexShader:Bs,fragmentShader:Ke,transparent:this.settings.material.transparent,depthWrite:!this.settings.material.transparent,blending:this.settings.material.blending,blendDst:this.settings.material.blendDst,blendSrc:this.settings.material.blendSrc,blendEquation:this.settings.material.blendEquation,premultipliedAlpha:this.settings.material.premultipliedAlpha,side:this.settings.material.side,alphaTest:this.settings.material.alphaTest,depthTest:this.settings.material.depthTest});else throw new Error("render mode unavailable");this.material&&r&&(this.material.onBeforeRender=r)}update(){let t=0,e=0;const i=this.getVisibleSystems();for(const s of i)e+=s.particleNum;e>this.maxParticles&&this.expandBuffers(e);for(const s of i){s.emitter.updateMatrixWorld&&(s.emitter.updateWorldMatrix(!0,!1),s.emitter.updateMatrixWorld(!0));const r=s.particles,n=s.particleNum,h=this.quaternion2_,a=this.vector2_,o=this.vector3_;s.emitter.matrixWorld.decompose(a,h,o),this.rotationMat_.setFromMatrix4(s.emitter.matrixWorld);for(let c=0;c<n;c++,t++){const d=r[c];if(this.settings.renderMode===M.Mesh){let u;if(s.worldSpace)u=d.rotation;else{let f;d.parentMatrix?f=this.quaternion3_.setFromRotationMatrix(d.parentMatrix):f=h,u=this.quaternion_,u.copy(f).multiply(d.rotation)}this.rotationBuffer.setXYZW(t,u.x,u.y,u.z,u.w)}else(this.settings.renderMode===M.StretchedBillBoard||this.settings.renderMode===M.VerticalBillBoard||this.settings.renderMode===M.HorizontalBillBoard||this.settings.renderMode===M.BillBoard)&&this.rotationBuffer.setX(t,d.rotation);let m;if(s.worldSpace?m=d.position:(m=this.vector_,d.parentMatrix?m.copy(d.position).applyMatrix4(d.parentMatrix):m.copy(d.position).applyMatrix4(s.emitter.matrixWorld)),this.offsetBuffer.setXYZ(t,m.x,m.y,m.z),this.colorBuffer.setXYZW(t,d.color.x,d.color.y,d.color.z,d.color.w),s.worldSpace?this.sizeBuffer.setXYZ(t,d.size.x,d.size.y,d.size.z):d.parentMatrix?this.sizeBuffer.setXYZ(t,d.size.x,d.size.y,d.size.z):this.sizeBuffer.setXYZ(t,d.size.x*Math.abs(o.x),d.size.y*Math.abs(o.y),d.size.z*Math.abs(o.z)),this.uvTileBuffer.setX(t,d.uvTile),this.settings.renderMode===M.StretchedBillBoard&&this.velocityBuffer){let u=s.rendererEmitterSettings.speedFactor;u===0&&(u=.001);const f=s.rendererEmitterSettings.lengthFactor;let p;s.worldSpace?p=d.velocity:(p=this.vector_,d.parentMatrix?(this.rotationMat2_.setFromMatrix4(d.parentMatrix),p.copy(d.velocity).applyMatrix3(this.rotationMat2_)):p.copy(d.velocity).applyMatrix3(this.rotationMat_)),this.velocityBuffer.setXYZW(t,p.x*u,p.y*u,p.z*u,f)}}}this.geometry.instanceCount=t,t>0&&(this.offsetBuffer.clearUpdateRanges(),this.offsetBuffer.addUpdateRange(0,t*3),this.offsetBuffer.needsUpdate=!0,this.sizeBuffer.clearUpdateRanges(),this.sizeBuffer.addUpdateRange(0,t*3),this.sizeBuffer.needsUpdate=!0,this.colorBuffer.clearUpdateRanges(),this.colorBuffer.addUpdateRange(0,t*4),this.colorBuffer.needsUpdate=!0,this.uvTileBuffer.clearUpdateRanges(),this.uvTileBuffer.addUpdateRange(0,t),this.uvTileBuffer.needsUpdate=!0,this.settings.renderMode===M.StretchedBillBoard&&this.velocityBuffer&&(this.velocityBuffer.clearUpdateRanges(),this.velocityBuffer.addUpdateRange(0,t*4),this.velocityBuffer.needsUpdate=!0),this.settings.renderMode===M.Mesh?(this.rotationBuffer.clearUpdateRanges(),this.rotationBuffer.addUpdateRange(0,t*4),this.rotationBuffer.needsUpdate=!0):(this.settings.renderMode===M.StretchedBillBoard||this.settings.renderMode===M.HorizontalBillBoard||this.settings.renderMode===M.VerticalBillBoard||this.settings.renderMode===M.BillBoard)&&(this.rotationBuffer.clearUpdateRanges(),this.rotationBuffer.addUpdateRange(0,t),this.rotationBuffer.needsUpdate=!0))}dispose(){this.geometry.dispose()}}var ks=`

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
}`,Is=`
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
}`;class Js extends wi{constructor(t){super(t),this.vector_=new _,this.vector2_=new _,this.vector3_=new _,this.quaternion_=new O,this.maxParticles=1e4,this.setupBuffers(),this.rebuildMaterial()}setupBuffers(){this.geometry&&this.geometry.dispose(),this.geometry=new Oi,this.indexBuffer=new ct(new Uint32Array(this.maxParticles*6),1),this.indexBuffer.setUsage(L),this.geometry.setIndex(this.indexBuffer),this.positionBuffer=new ct(new Float32Array(this.maxParticles*6),3),this.positionBuffer.setUsage(L),this.geometry.setAttribute("position",this.positionBuffer),this.previousBuffer=new ct(new Float32Array(this.maxParticles*6),3),this.previousBuffer.setUsage(L),this.geometry.setAttribute("previous",this.previousBuffer),this.nextBuffer=new ct(new Float32Array(this.maxParticles*6),3),this.nextBuffer.setUsage(L),this.geometry.setAttribute("next",this.nextBuffer),this.widthBuffer=new ct(new Float32Array(this.maxParticles*2),1),this.widthBuffer.setUsage(L),this.geometry.setAttribute("width",this.widthBuffer),this.sideBuffer=new ct(new Float32Array(this.maxParticles*2),1),this.sideBuffer.setUsage(L),this.geometry.setAttribute("side",this.sideBuffer),this.uvBuffer=new ct(new Float32Array(this.maxParticles*4),2),this.uvBuffer.setUsage(L),this.geometry.setAttribute("uv",this.uvBuffer),this.colorBuffer=new ct(new Float32Array(this.maxParticles*8),4),this.colorBuffer.setUsage(L),this.geometry.setAttribute("color",this.colorBuffer)}expandBuffers(t){for(;t>=this.maxParticles;)this.maxParticles*=2;this.setupBuffers()}rebuildMaterial(){this.layers.mask=this.settings.layers.mask;const t={lineWidth:{value:1},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},resolution:{value:new _t(1,1)},sizeAttenuation:{value:1},visibility:{value:1},alphaTest:{value:0}},e={};if(e.USE_UV="",e.USE_COLOR_ALPHA="",this.settings.material.map&&(e.USE_MAP="",e.MAP_UV=ii(this.settings.material.map.channel),t.map=new tt(this.settings.material.map),t.mapTransform=new tt(new nt().copy(this.settings.material.map.matrix))),this.settings.material.defines&&this.settings.material.defines.USE_COLOR_AS_ALPHA!==void 0&&(e.USE_COLOR_AS_ALPHA=""),this.settings.renderMode===M.Trail)this.material=new $e({uniforms:t,defines:e,vertexShader:Is,fragmentShader:ks,transparent:this.settings.material.transparent,depthWrite:!this.settings.material.transparent,side:this.settings.material.side,blending:this.settings.material.blending||pi,blendDst:this.settings.material.blendDst,blendSrc:this.settings.material.blendSrc,blendEquation:this.settings.material.blendEquation,premultipliedAlpha:this.settings.material.premultipliedAlpha});else throw new Error("render mode unavailable")}update(){let t=0,e=0,i=0;const s=this.getVisibleSystems();for(const r of s)for(let n=0;n<r.particleNum;n++)i+=r.particles[n].previous.length*2;i>this.maxParticles&&this.expandBuffers(i);for(const r of s){r.emitter.updateMatrixWorld&&(r.emitter.updateWorldMatrix(!0,!1),r.emitter.updateMatrixWorld(!0));const n=this.quaternion_,h=this.vector2_,a=this.vector3_;r.emitter.matrixWorld.decompose(h,n,a);const o=r.particles,c=r.particleNum,d=this.settings.uTileCount,m=this.settings.vTileCount,u=1/d,f=1/m;for(let p=0;p<c;p++){const y=o[p],x=y.uvTile%m,z=Math.floor(y.uvTile/m+.001),b=y.previous.values();let w=b.next(),S=w.value,g=S;w.done||(w=b.next());let v;w.value!==void 0?v=w.value:v=g;for(let T=0;T<y.previous.length;T++,t+=2){if(this.positionBuffer.setXYZ(t,g.position.x,g.position.y,g.position.z),this.positionBuffer.setXYZ(t+1,g.position.x,g.position.y,g.position.z),r.worldSpace?(this.positionBuffer.setXYZ(t,g.position.x,g.position.y,g.position.z),this.positionBuffer.setXYZ(t+1,g.position.x,g.position.y,g.position.z)):(y.parentMatrix?this.vector_.copy(g.position).applyMatrix4(y.parentMatrix):this.vector_.copy(g.position).applyMatrix4(r.emitter.matrixWorld),this.positionBuffer.setXYZ(t,this.vector_.x,this.vector_.y,this.vector_.z),this.positionBuffer.setXYZ(t+1,this.vector_.x,this.vector_.y,this.vector_.z)),r.worldSpace?(this.previousBuffer.setXYZ(t,S.position.x,S.position.y,S.position.z),this.previousBuffer.setXYZ(t+1,S.position.x,S.position.y,S.position.z)):(y.parentMatrix?this.vector_.copy(S.position).applyMatrix4(y.parentMatrix):this.vector_.copy(S.position).applyMatrix4(r.emitter.matrixWorld),this.previousBuffer.setXYZ(t,this.vector_.x,this.vector_.y,this.vector_.z),this.previousBuffer.setXYZ(t+1,this.vector_.x,this.vector_.y,this.vector_.z)),r.worldSpace?(this.nextBuffer.setXYZ(t,v.position.x,v.position.y,v.position.z),this.nextBuffer.setXYZ(t+1,v.position.x,v.position.y,v.position.z)):(y.parentMatrix?this.vector_.copy(v.position).applyMatrix4(y.parentMatrix):this.vector_.copy(v.position).applyMatrix4(r.emitter.matrixWorld),this.nextBuffer.setXYZ(t,this.vector_.x,this.vector_.y,this.vector_.z),this.nextBuffer.setXYZ(t+1,this.vector_.x,this.vector_.y,this.vector_.z)),this.sideBuffer.setX(t,1),this.sideBuffer.setX(t+1,-1),r.worldSpace)this.widthBuffer.setX(t,g.size),this.widthBuffer.setX(t+1,g.size);else if(y.parentMatrix)this.widthBuffer.setX(t,g.size),this.widthBuffer.setX(t+1,g.size);else{const P=(Math.abs(a.x)+Math.abs(a.y)+Math.abs(a.z))/3;this.widthBuffer.setX(t,g.size*P),this.widthBuffer.setX(t+1,g.size*P)}this.uvBuffer.setXY(t,(T/y.previous.length+x)*u,(m-z-1)*f),this.uvBuffer.setXY(t+1,(T/y.previous.length+x)*u,(m-z)*f),this.colorBuffer.setXYZW(t,g.color.x,g.color.y,g.color.z,g.color.w),this.colorBuffer.setXYZW(t+1,g.color.x,g.color.y,g.color.z,g.color.w),T+1<y.previous.length&&(this.indexBuffer.setX(e*3,t),this.indexBuffer.setX(e*3+1,t+1),this.indexBuffer.setX(e*3+2,t+2),e++,this.indexBuffer.setX(e*3,t+2),this.indexBuffer.setX(e*3+1,t+1),this.indexBuffer.setX(e*3+2,t+3),e++),S=g,g=v,w.done||(w=b.next(),w.value!==void 0&&(v=w.value))}}}this.positionBuffer.clearUpdateRanges(),this.positionBuffer.addUpdateRange(0,t*3),this.positionBuffer.needsUpdate=!0,this.previousBuffer.clearUpdateRanges(),this.previousBuffer.addUpdateRange(0,t*3),this.previousBuffer.needsUpdate=!0,this.nextBuffer.clearUpdateRanges(),this.nextBuffer.addUpdateRange(0,t*3),this.nextBuffer.needsUpdate=!0,this.sideBuffer.clearUpdateRanges(),this.sideBuffer.addUpdateRange(0,t),this.sideBuffer.needsUpdate=!0,this.widthBuffer.clearUpdateRanges(),this.widthBuffer.addUpdateRange(0,t),this.widthBuffer.needsUpdate=!0,this.uvBuffer.clearUpdateRanges(),this.uvBuffer.addUpdateRange(0,t*2),this.uvBuffer.needsUpdate=!0,this.colorBuffer.clearUpdateRanges(),this.colorBuffer.addUpdateRange(0,t*4),this.colorBuffer.needsUpdate=!0,this.indexBuffer.clearUpdateRanges(),this.indexBuffer.addUpdateRange(0,e*3),this.indexBuffer.needsUpdate=!0,this.geometry.setDrawRange(0,e*3)}dispose(){this.geometry.dispose()}}class zi extends yi{constructor(){super(),this.batches=[],this.systemToBatchIndex=new Map,this.type="BatchedRenderer",this.depthTexture=null}static equals(t,e){return t.material.side===e.material.side&&t.material.blending===e.material.blending&&t.material.blendSrc===e.material.blendSrc&&t.material.blendDst===e.material.blendDst&&t.material.blendEquation===e.material.blendEquation&&t.material.premultipliedAlpha===e.material.premultipliedAlpha&&t.material.transparent===e.material.transparent&&t.material.depthTest===e.material.depthTest&&t.material.type===e.material.type&&t.material.alphaTest===e.material.alphaTest&&t.material.map===e.material.map&&t.renderMode===e.renderMode&&t.blendTiles===e.blendTiles&&t.softParticles===e.softParticles&&t.softFarFade===e.softFarFade&&t.softNearFade===e.softNearFade&&t.uTileCount===e.uTileCount&&t.vTileCount===e.vTileCount&&t.instancingGeometry===e.instancingGeometry&&t.renderOrder===e.renderOrder&&t.layers.mask===e.layers.mask}addSystem(t){t._renderer=this;const e=t.getRendererSettings();for(let s=0;s<this.batches.length;s++)if(zi.equals(this.batches[s].settings,e)){this.batches[s].addSystem(t),this.systemToBatchIndex.set(t,s);return}let i;switch(e.renderMode){case M.Trail:i=new Js(e);break;case M.Mesh:case M.BillBoard:case M.VerticalBillBoard:case M.HorizontalBillBoard:case M.StretchedBillBoard:i=new Vs(e);break}this.depthTexture&&i.applyDepthTexture(this.depthTexture),i.addSystem(t),this.batches.push(i),this.systemToBatchIndex.set(t,this.batches.length-1),this.add(i)}deleteSystem(t){const e=this.systemToBatchIndex.get(t);e!=null&&(this.batches[e].removeSystem(t),this.systemToBatchIndex.delete(t))}setDepthTexture(t){this.depthTexture=t;for(const e of this.batches)e.applyDepthTexture(t)}updateSystem(t){this.deleteSystem(t),this.addSystem(t)}update(t){this.systemToBatchIndex.forEach((e,i)=>{i.update(t)});for(let e=0;e<this.batches.length;e++)this.batches[e].update()}}Ns();gs(xs);console.log("%c Particle system powered by three.quarks. https://quarks.art/","font-size: 14px; font-weight: bold;");export{ae as A,zi as B,A as C,xt as I,ei as P,M as R,ee as S,G as V,zt as a,bt as b,Lt as c,yt as d,wt as e,_ as f,Kt as g};
