import{r as w,j as m}from"./index-BGlXZBWW.js";import{C as Kt,u as ge,a as Qt}from"./react-three-fiber.esm-C2JKJHmC.js";import{P as Zt,u as Jt,R as Rt,C as De,I as ea,B as ta}from"./react-three-rapier.esm-Cafxsd7k.js";import{d as aa}from"./index-C8QPjP28.js";import{W as ra}from"./three.webgpu-CGNuHzl8.js";import{U as he,l as k,N as R,m as Pe,F as C,n as We,o as ia,p as Ze,q as sa,R as A,r as Le,s as _t,t as oa,u as At,c as Re,B as H,an as ae,g as Y,aG as na,V as _,a6 as ne,J as la,M as je,S as _e,_ as me,W as de,e as V,ac as Ct,b as G,H as W,L as N,aB as L,v as X,aH as ca,a5 as Ft,aI as ua,D as Dt,i as fa,k as ha,aJ as da,C as pe,aK as ma,aL as Pt,a0 as Et,aM as pa,X as ga,aC as va,w as xa,A as kt,a3 as F,z as ya,Y as Ae,a4 as Ot,aN as zt,I as Je,aO as ba,ak as Ta,aP as et,a7 as Ee,aQ as wa,aR as Sa,al as Ma,ai as z,ah as Ia,ap as Ra,aA as Bt,at as _a}from"./three.module-N0EvyCvs.js";import{u as Aa}from"./useDragOrbit-D2ibO2nW.js";import{W as Ca}from"./quality-0NdDoxfE.js";import{g as Fa,b as Da,B as tt,I as Pa,C as Ea,O as ka,S as Oa,d as za,L as Ba,e as Na,M as Ha,c as Wa,a as at}from"./ExtensionUtilities-kj_e1aGS.js";import{F as le}from"./Pass-YUuk14QH.js";import"./BufferGeometryUtils-R_skgmeQ.js";import"./dragOrbit-BGftK61W.js";function La(i){switch(i){case 1:return"R";case 2:return"RG";case 3:return"RGBA";case 4:return"RGBA"}throw new Error}function ja(i){switch(i){case 1:return Re;case 2:return At;case 3:return A;case 4:return A}}function rt(i){switch(i){case 1:return oa;case 2:return _t;case 3:return Le;case 4:return Le}}class Nt extends k{constructor(){super(),this.minFilter=R,this.magFilter=R,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(e){const t=this.overrideItemSize,a=e.itemSize,o=e.count;if(t!==null){if(a*o%t!==0)throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");e.itemSize=t,e.count=o*a/t}const s=e.itemSize,r=e.count,l=e.normalized,c=e.array.constructor,h=c.BYTES_PER_ELEMENT;let d=this._forcedType,f=s;if(d===null)switch(c){case Float32Array:d=C;break;case Uint8Array:case Uint16Array:case Uint32Array:d=he;break;case Int8Array:case Int16Array:case Int32Array:d=Pe;break}let n,g,p,x,u=La(s);switch(d){case C:p=1,g=ja(s),l&&h===1?(x=c,u+="8",c===Uint8Array?n=We:(n=Ze,u+="_SNORM")):(x=Float32Array,u+="32F",n=C);break;case Pe:u+=h*8+"I",p=l?Math.pow(2,c.BYTES_PER_ELEMENT*8-1):1,g=rt(s),h===1?(x=Int8Array,n=Ze):h===2?(x=Int16Array,n=sa):(x=Int32Array,n=Pe);break;case he:u+=h*8+"UI",p=l?Math.pow(2,c.BYTES_PER_ELEMENT*8-1):1,g=rt(s),h===1?(x=Uint8Array,n=We):h===2?(x=Uint16Array,n=ia):(x=Uint32Array,n=he);break}f===3&&(g===A||g===Le)&&(f=4);const v=Math.ceil(Math.sqrt(r))||1,y=f*v*v,b=new x(y),S=e.normalized;e.normalized=!1;for(let M=0;M<r;M++){const I=f*M;b[I]=e.getX(M)/p,s>=2&&(b[I+1]=e.getY(M)/p),s>=3&&(b[I+2]=e.getZ(M)/p,f===4&&(b[I+3]=1)),s>=4&&(b[I+3]=e.getW(M)/p)}e.normalized=S,this.internalFormat=u,this.format=g,this.type=n,this.image.width=v,this.image.height=v,this.image.data=b,this.needsUpdate=!0,this.dispose(),e.itemSize=a,e.count=o}}class Ht extends Nt{constructor(){super(),this._forcedType=he}}class Wt extends Nt{constructor(){super(),this._forcedType=C}}class Ua{constructor(){this.index=new Ht,this.position=new Wt,this.bvhBounds=new k,this.bvhContents=new k,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(e){const{geometry:t}=e;if(Va(e,this.bvhBounds,this.bvhContents),this.position.updateFrom(t.attributes.position),e.indirect){const a=e._indirectBuffer;if(this._cachedIndexAttr===null||this._cachedIndexAttr.count!==a.length)if(t.index)this._cachedIndexAttr=t.index.clone();else{const o=Fa(Da(t));this._cachedIndexAttr=new H(o,1,!1)}Ga(t,a,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(t.index)}dispose(){const{index:e,position:t,bvhBounds:a,bvhContents:o}=this;e&&e.dispose(),t&&t.dispose(),a&&a.dispose(),o&&o.dispose()}}function Ga(i,e,t){const a=t.array,o=i.index?i.index.array:null;for(let s=0,r=e.length;s<r;s++){const l=3*s,c=3*e[s];for(let h=0;h<3;h++)a[l+h]=o?o[c+h]:c+h}}function Va(i,e,t){const a=i._roots;if(a.length!==1)throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");const o=a[0],s=new Uint16Array(o),r=new Uint32Array(o),l=new Float32Array(o),c=o.byteLength/tt,h=2*Math.ceil(Math.sqrt(c/2)),d=new Float32Array(4*h*h),f=Math.ceil(Math.sqrt(c)),n=new Uint32Array(2*f*f);for(let g=0;g<c;g++){const p=g*tt/4,x=p*2,u=za(p);for(let v=0;v<3;v++)d[8*g+0+v]=l[u+0+v],d[8*g+4+v]=l[u+3+v];if(Pa(x,s)){const v=Ea(x,s),y=ka(p,r),b=Ba|v;n[g*2+0]=b,n[g*2+1]=y}else{const v=r[p+6],y=Oa(p,r);n[g*2+0]=y,n[g*2+1]=v}}e.image.data=d,e.image.width=h,e.image.height=h,e.format=A,e.type=C,e.internalFormat="RGBA32F",e.minFilter=R,e.magFilter=R,e.generateMipmaps=!1,e.needsUpdate=!0,e.dispose(),t.image.data=n,t.image.width=f,t.image.height=f,t.format=_t,t.type=he,t.internalFormat="RG32UI",t.minFilter=R,t.magFilter=R,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose()}const qa=`

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
`,$a=`

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
	int pointer = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( pointer > - 1 && pointer < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ pointer ];
		pointer --;

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
			uint rightIndex = currNodeIndex + boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			pointer ++;
			stack[ pointer ] = c2;

			pointer ++;
			stack[ pointer ] = c1;

		}

	}

	return found;

}
`,Ya=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`;function Lt(i,e,t=0){if(i.isInterleavedBufferAttribute){const a=i.itemSize;for(let o=0,s=i.count;o<s;o++){const r=o+t;e.setX(r,i.getX(o)),a>=2&&e.setY(r,i.getY(o)),a>=3&&e.setZ(r,i.getZ(o)),a>=4&&e.setW(r,i.getW(o))}}else{const a=e.array,o=a.constructor,s=a.BYTES_PER_ELEMENT*i.itemSize*t;new o(a.buffer,s,i.array.length).set(i.array)}}function fe(i,e=null){const t=i.array.constructor,a=i.normalized,o=i.itemSize,s=e===null?i.count:e;return new H(new t(o*s),o,a)}function oe(i,e){if(!i&&!e)return!0;if(!!i!=!!e)return!1;const t=i.count===e.count,a=i.normalized===e.normalized,o=i.array.constructor===e.array.constructor,s=i.itemSize===e.itemSize;return!(!t||!a||!o||!s)}function Xa(i){const e=i[0].index!==null,t=new Set(Object.keys(i[0].attributes));if(!i[0].getAttribute("position"))throw new Error("StaticGeometryGenerator: position attribute is required.");for(let a=0;a<i.length;++a){const o=i[a];let s=0;if(e!==(o.index!==null))throw new Error("StaticGeometryGenerator: All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.");for(const r in o.attributes){if(!t.has(r))throw new Error('StaticGeometryGenerator: All geometries must have compatible attributes; make sure "'+r+'" attribute exists among all geometries, or in none of them.');s++}if(s!==t.size)throw new Error("StaticGeometryGenerator: All geometries must have the same number of attributes.")}}function Ka(i){let e=0;for(let t=0,a=i.length;t<a;t++)e+=i[t].getIndex().count;return e}function Qa(i){let e=0;for(let t=0,a=i.length;t<a;t++)e+=i[t].getAttribute("position").count;return e}function Za(i,e,t){i.index&&i.index.count!==e&&i.setIndex(null);const a=i.attributes;for(const o in a)a[o].count!==t&&i.deleteAttribute(o)}function Ja(i,e={},t=new ae){const{useGroups:a=!1,forceUpdate:o=!1,skipAssigningAttributes:s=[],overwriteIndex:r=!0}=e;Xa(i);const l=i[0].index!==null,c=l?Ka(i):-1,h=Qa(i);if(Za(t,c,h),a){let f=0;for(let n=0,g=i.length;n<g;n++){const p=i[n];let x;l?x=p.getIndex().count:x=p.getAttribute("position").count,t.addGroup(f,x,n),f+=x}}if(l){let f=!1;if(t.index||(t.setIndex(new H(new Uint32Array(c),1,!1)),f=!0),f||r){let n=0,g=0;const p=t.getIndex();for(let x=0,u=i.length;x<u;x++){const v=i[x],y=v.getIndex();if(!(!o&&!f&&s[x]))for(let S=0;S<y.count;++S)p.setX(n+S,y.getX(S)+g);n+=y.count,g+=v.getAttribute("position").count}}}const d=Object.keys(i[0].attributes);for(let f=0,n=d.length;f<n;f++){let g=!1;const p=d[f];if(!t.getAttribute(p)){const v=i[0].getAttribute(p);t.setAttribute(p,fe(v,h)),g=!0}let x=0;const u=t.getAttribute(p);for(let v=0,y=i.length;v<y;v++){const b=i[v],S=!o&&!g&&s[v],M=b.getAttribute(p);if(!S)if(p==="color"&&u.itemSize!==M.itemSize)for(let I=x,O=M.count;I<O;I++)M.setXYZW(I,u.getX(I),u.getY(I),u.getZ(I),1);else Lt(M,u,x);x+=M.count}}}function er(i,e,t){const a=i.index,s=i.attributes.position.count,r=a?a.count:s;let l=i.groups;l.length===0&&(l=[{count:r,start:0,materialIndex:0}]);let c=i.getAttribute("materialIndex");if(!c||c.count!==s){let d;t.length<=255?d=new Uint8Array(s):d=new Uint16Array(s),c=new H(d,1,!1),i.deleteAttribute("materialIndex"),i.setAttribute("materialIndex",c)}const h=c.array;for(let d=0;d<l.length;d++){const f=l[d],n=f.start,g=f.count,p=Math.min(g,r-n),x=Array.isArray(e)?e[f.materialIndex]:e,u=t.indexOf(x);for(let v=0;v<p;v++){let y=n+v;a&&(y=a.getX(y)),h[y]=u}}}function tr(i,e){if(!i.index){const t=i.attributes.position.count,a=new Array(t);for(let o=0;o<t;o++)a[o]=o;i.setIndex(a)}if(!i.attributes.normal&&e&&e.includes("normal")&&i.computeVertexNormals(),!i.attributes.uv&&e&&e.includes("uv")){const t=i.attributes.position.count;i.setAttribute("uv",new H(new Float32Array(t*2),2,!1))}if(!i.attributes.uv2&&e&&e.includes("uv2")){const t=i.attributes.position.count;i.setAttribute("uv2",new H(new Float32Array(t*2),2,!1))}if(!i.attributes.tangent&&e&&e.includes("tangent"))if(i.attributes.uv&&i.attributes.normal)i.computeTangents();else{const t=i.attributes.position.count;i.setAttribute("tangent",new H(new Float32Array(t*4),4,!1))}if(!i.attributes.color&&e&&e.includes("color")){const t=i.attributes.position.count,a=new Float32Array(t*4);a.fill(1),i.setAttribute("color",new H(a,4))}}function Ve(i){let e=0;if(i.byteLength!==0){const t=new Uint8Array(i);for(let a=0;a<i.byteLength;a++){const o=t[a];e=(e<<5)-e+o,e|=0}}return e}function it(i){let e=i.uuid;const t=Object.values(i.attributes);i.index&&(t.push(i.index),e+=`index|${i.index.version}`);const a=Object.keys(t).sort();for(const o of a){const s=t[o];e+=`${o}_${s.version}|`}return e}function st(i){const e=i.skeleton;return e?(e.boneTexture||e.computeBoneTexture(),`${Ve(e.boneTexture.image.data.buffer)}_${e.boneTexture.uuid}`):null}class ar{constructor(e=null){this.matrixWorld=new Y,this.geometryHash=null,this.skeletonHash=null,this.primitiveCount=-1,e!==null&&this.updateFrom(e)}updateFrom(e){const t=e.geometry,a=(t.index?t.index.count:t.attributes.position.count)/3;this.matrixWorld.copy(e.matrixWorld),this.geometryHash=it(t),this.primitiveCount=a,this.skeletonHash=st(e)}didChange(e){const t=e.geometry,a=(t.index?t.index.count:t.attributes.position.count)/3;return!(this.matrixWorld.equals(e.matrixWorld)&&this.geometryHash===it(t)&&this.skeletonHash===st(e)&&this.primitiveCount===a)}}const Q=new _,Z=new _,J=new _,ot=new ne,be=new _,ke=new _,nt=new ne,lt=new ne,Te=new Y,ct=new Y;function ut(i,e,t){const a=i.skeleton,o=i.geometry,s=a.bones,r=a.boneInverses;nt.fromBufferAttribute(o.attributes.skinIndex,e),lt.fromBufferAttribute(o.attributes.skinWeight,e),Te.elements.fill(0);for(let l=0;l<4;l++){const c=lt.getComponent(l);if(c!==0){const h=nt.getComponent(l);ct.multiplyMatrices(s[h].matrixWorld,r[h]),rr(Te,ct,c)}}return Te.multiply(i.bindMatrix).premultiply(i.bindMatrixInverse),t.transformDirection(Te),t}function Oe(i,e,t,a,o){be.set(0,0,0);for(let s=0,r=i.length;s<r;s++){const l=e[s],c=i[s];l!==0&&(ke.fromBufferAttribute(c,a),t?be.addScaledVector(ke,l):be.addScaledVector(ke.sub(o),l))}o.add(be)}function rr(i,e,t){const a=i.elements,o=e.elements;for(let s=0,r=o.length;s<r;s++)a[s]+=o[s]*t}function ir(i){const{index:e,attributes:t}=i;if(e)for(let a=0,o=e.count;a<o;a+=3){const s=e.getX(a),r=e.getX(a+2);e.setX(a,r),e.setX(a+2,s)}else for(const a in t){const o=t[a],s=o.itemSize;for(let r=0,l=o.count;r<l;r+=3)for(let c=0;c<s;c++){const h=o.getComponent(r,c),d=o.getComponent(r+2,c);o.setComponent(r,c,d),o.setComponent(r+2,c,h)}}return i}function sr(i,e={},t=new ae){e={applyWorldTransforms:!0,attributes:[],...e};const a=i.geometry,o=e.applyWorldTransforms,s=e.attributes.includes("normal"),r=e.attributes.includes("tangent"),l=a.attributes,c=t.attributes;for(const y in t.attributes)(!e.attributes.includes(y)||!(y in a.attributes))&&t.deleteAttribute(y);!t.index&&a.index&&(t.index=a.index.clone()),c.position||t.setAttribute("position",fe(l.position)),s&&!c.normal&&l.normal&&t.setAttribute("normal",fe(l.normal)),r&&!c.tangent&&l.tangent&&t.setAttribute("tangent",fe(l.tangent)),oe(a.index,t.index),oe(l.position,c.position),s&&oe(l.normal,c.normal),r&&oe(l.tangent,c.tangent);const h=l.position,d=s?l.normal:null,f=r?l.tangent:null,n=a.morphAttributes.position,g=a.morphAttributes.normal,p=a.morphAttributes.tangent,x=a.morphTargetsRelative,u=i.morphTargetInfluences,v=new na;v.getNormalMatrix(i.matrixWorld),a.index&&t.index.array.set(a.index.array);for(let y=0,b=l.position.count;y<b;y++)Q.fromBufferAttribute(h,y),d&&Z.fromBufferAttribute(d,y),f&&(ot.fromBufferAttribute(f,y),J.fromBufferAttribute(f,y)),u&&(n&&Oe(n,u,x,y,Q),g&&Oe(g,u,x,y,Z),p&&Oe(p,u,x,y,J)),i.isSkinnedMesh&&(i.applyBoneTransform(y,Q),d&&ut(i,y,Z),f&&ut(i,y,J)),o&&Q.applyMatrix4(i.matrixWorld),c.position.setXYZ(y,Q.x,Q.y,Q.z),d&&(o&&Z.applyNormalMatrix(v),c.normal.setXYZ(y,Z.x,Z.y,Z.z)),f&&(o&&J.transformDirection(i.matrixWorld),c.tangent.setXYZW(y,J.x,J.y,J.z,ot.w));for(const y in e.attributes){const b=e.attributes[y];b==="position"||b==="tangent"||b==="normal"||!(b in l)||(c[b]||t.setAttribute(b,fe(l[b])),oe(l[b],c[b]),Lt(l[b],c[b]))}return i.matrixWorld.determinant()<0&&ir(t),t}class or extends ae{constructor(){super(),this.version=0,this.hash=null,this._diff=new ar}isCompatible(e,t){const a=e.geometry;for(let o=0;o<t.length;o++){const s=t[o],r=a.attributes[s],l=this.attributes[s];if(r&&!oe(r,l))return!1}return!0}updateFrom(e,t){const a=this._diff;return a.didChange(e)?(sr(e,t,this),a.updateFrom(e),this.version++,this.hash=`${this.uuid}_${this.version}`,!0):!1}}const Ue=0,jt=1,Ut=2;function nr(i,e){for(let t=0,a=i.length;t<a;t++)i[t].traverseVisible(s=>{s.isMesh&&e(s)})}function lr(i){const e=[];for(let t=0,a=i.length;t<a;t++){const o=i[t];Array.isArray(o.material)?e.push(...o.material):e.push(o.material)}return e}function cr(i,e,t){if(i.length===0){e.setIndex(null);const a=e.attributes;for(const o in a)e.deleteAttribute(o);for(const o in t.attributes)e.setAttribute(t.attributes[o],new H(new Float32Array(0),4,!1))}else Ja(i,t,e);for(const a in e.attributes)e.attributes[a].needsUpdate=!0}class ur{constructor(e){this.objects=null,this.useGroups=!0,this.applyWorldTransforms=!0,this.generateMissingAttributes=!0,this.overwriteIndex=!0,this.attributes=["position","normal","color","tangent","uv","uv2"],this._intermediateGeometry=new Map,this._geometryMergeSets=new WeakMap,this._mergeOrder=[],this._dummyMesh=null,this.setObjects(e||[])}_getDummyMesh(){if(!this._dummyMesh){const e=new la,t=new ae;t.setAttribute("position",new H(new Float32Array(9),3)),this._dummyMesh=new je(t,e)}return this._dummyMesh}_getMeshes(){const e=[];return nr(this.objects,t=>{e.push(t)}),e.sort((t,a)=>t.uuid>a.uuid?1:t.uuid<a.uuid?-1:0),e.length===0&&e.push(this._getDummyMesh()),e}_updateIntermediateGeometries(){const{_intermediateGeometry:e}=this,t=this._getMeshes(),a=new Set(e.keys()),o={attributes:this.attributes,applyWorldTransforms:this.applyWorldTransforms};for(let s=0,r=t.length;s<r;s++){const l=t[s],c=l.uuid;a.delete(c);let h=e.get(c);(!h||!h.isCompatible(l,this.attributes))&&(h&&h.dispose(),h=new or,e.set(c,h)),h.updateFrom(l,o)&&this.generateMissingAttributes&&tr(h,this.attributes)}a.forEach(s=>{e.delete(s)})}setObjects(e){Array.isArray(e)?this.objects=[...e]:this.objects=[e]}generate(e=new ae){const{useGroups:t,overwriteIndex:a,_intermediateGeometry:o,_geometryMergeSets:s}=this,r=this._getMeshes(),l=[],c=[],h=s.get(e)||[];this._updateIntermediateGeometries();let d=!1;r.length!==h.length&&(d=!0);for(let n=0,g=r.length;n<g;n++){const p=r[n],x=o.get(p.uuid);c.push(x);const u=h[n];!u||u.uuid!==x.uuid?(l.push(!1),d=!0):u.version!==x.version?l.push(!1):l.push(!0)}cr(c,e,{useGroups:t,forceUpdate:d,skipAssigningAttributes:l,overwriteIndex:a}),d&&e.dispose(),s.set(e,c.map(n=>({version:n.version,uuid:n.uuid})));let f=Ue;return d?f=Ut:l.includes(!1)&&(f=jt),{changeType:f,materials:lr(r),geometry:e}}}function fr(i){const e=new Set;for(let t=0,a=i.length;t<a;t++){const o=i[t];for(const s in o){const r=o[s];r&&r.isTexture&&e.add(r)}}return Array.from(e)}function hr(i){const e=[],t=new Set;for(let o=0,s=i.length;o<s;o++)i[o].traverse(r=>{r.visible&&(r.isRectAreaLight||r.isSpotLight||r.isPointLight||r.isDirectionalLight)&&(e.push(r),r.iesMap&&t.add(r.iesMap))});const a=Array.from(t).sort((o,s)=>o.uuid<s.uuid?1:o.uuid>s.uuid?-1:0);return{lights:e,iesTextures:a}}class dr{get initialized(){return!!this.bvh}constructor(e){this.bvhOptions={},this.attributes=["position","normal","tangent","color","uv","uv2"],this.generateBVH=!0,this.bvh=null,this.geometry=new ae,this.staticGeometryGenerator=new ur(e),this._bvhWorker=null,this._pendingGenerate=null,this._buildAsync=!1,this._materialUuids=null}setObjects(e){this.staticGeometryGenerator.setObjects(e)}setBVHWorker(e){this._bvhWorker=e}async generateAsync(e=null){if(!this._bvhWorker)throw new Error('PathTracingSceneGenerator: "setBVHWorker" must be called before "generateAsync" can be called.');if(this.bvh instanceof Promise)return this._pendingGenerate||(this._pendingGenerate=new Promise(async()=>(await this.bvh,this._pendingGenerate=null,this.generateAsync(e)))),this._pendingGenerate;{this._buildAsync=!0;const t=this.generate(e);return this._buildAsync=!1,t.bvh=this.bvh=await t.bvh,t}}generate(e=null){const{staticGeometryGenerator:t,geometry:a,attributes:o}=this,s=t.objects;t.attributes=o,s.forEach(n=>{n.traverse(g=>{g.isSkinnedMesh&&g.skeleton&&g.skeleton.update()})});const r=t.generate(a),l=r.materials;let c=r.changeType!==Ue||this._materialUuids===null||this._materialUuids.length!==length;if(!c){for(let n=0,g=l.length;n<g;n++)if(l[n].uuid!==this._materialUuids[n]){c=!0;break}}const h=fr(l),{lights:d,iesTextures:f}=hr(s);if(c&&(er(a,l,l),this._materialUuids=l.map(n=>n.uuid)),this.generateBVH){if(this.bvh instanceof Promise)throw new Error("PathTracingSceneGenerator: BVH is already building asynchronously.");if(r.changeType===Ut){const n={strategy:Na,maxLeafTris:1,indirect:!0,onProgress:e,...this.bvhOptions};this._buildAsync?this.bvh=this._bvhWorker.generate(a,n):this.bvh=new Ha(a,n)}else r.changeType===jt&&this.bvh.refit()}return{bvhChanged:r.changeType!==Ue,bvh:this.bvh,needsMaterialIndexUpdate:c,lights:d,iesTextures:f,geometry:a,materials:l,textures:h,objects:s}}}class qe extends _e{set needsUpdate(e){super.needsUpdate=!0,this.dispatchEvent({type:"recompilation"})}constructor(e){super(e);for(const t in this.uniforms)Object.defineProperty(this,t,{get(){return this.uniforms[t].value},set(a){this.uniforms[t].value=a}})}setDefine(e,t=void 0){if(t==null){if(e in this.defines)return delete this.defines[e],this.needsUpdate=!0,!0}else if(this.defines[e]!==t)return this.defines[e]=t,this.needsUpdate=!0,!0;return!1}}class mr extends qe{constructor(e){super({blending:me,uniforms:{target1:{value:null},target2:{value:null},opacity:{value:1}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				uniform float opacity;

				uniform sampler2D target1;
				uniform sampler2D target2;

				varying vec2 vUv;

				void main() {

					vec4 color1 = texture2D( target1, vUv );
					vec4 color2 = texture2D( target2, vUv );

					float invOpacity = 1.0 - opacity;
					float totalAlpha = color1.a * invOpacity + color2.a * opacity;

					if ( color1.a != 0.0 || color2.a != 0.0 ) {

						gl_FragColor.rgb = color1.rgb * ( invOpacity * color1.a / totalAlpha ) + color2.rgb * ( opacity * color2.a / totalAlpha );
						gl_FragColor.a = totalAlpha;

					} else {

						gl_FragColor = vec4( 0.0 );

					}

				}`}),this.setValues(e)}}function we(i=1){let e="uint";return i>1&&(e="uvec"+i),`
		${e} sobolReverseBits( ${e} x ) {

			x = ( ( ( x & 0xaaaaaaaau ) >> 1 ) | ( ( x & 0x55555555u ) << 1 ) );
			x = ( ( ( x & 0xccccccccu ) >> 2 ) | ( ( x & 0x33333333u ) << 2 ) );
			x = ( ( ( x & 0xf0f0f0f0u ) >> 4 ) | ( ( x & 0x0f0f0f0fu ) << 4 ) );
			x = ( ( ( x & 0xff00ff00u ) >> 8 ) | ( ( x & 0x00ff00ffu ) << 8 ) );
			return ( ( x >> 16 ) | ( x << 16 ) );

		}

		${e} sobolHashCombine( uint seed, ${e} v ) {

			return seed ^ ( v + ${e}( ( seed << 6 ) + ( seed >> 2 ) ) );

		}

		${e} sobolLaineKarrasPermutation( ${e} x, ${e} seed ) {

			x += seed;
			x ^= x * 0x6c50b47cu;
			x ^= x * 0xb82f1e52u;
			x ^= x * 0xc7afe638u;
			x ^= x * 0x8d22f6e6u;
			return x;

		}

		${e} nestedUniformScrambleBase2( ${e} x, ${e} seed ) {

			x = sobolLaineKarrasPermutation( x, seed );
			x = sobolReverseBits( x );
			return x;

		}
	`}function Se(i=1){let e="uint",t="float",a="",o=".r",s="1u";return i>1&&(e="uvec"+i,t="vec"+i,a=i+"",i===2?(o=".rg",s="uvec2( 1u, 2u )"):i===3?(o=".rgb",s="uvec3( 1u, 2u, 3u )"):(o="",s="uvec4( 1u, 2u, 3u, 4u )")),`

		${t} sobol${a}( int effect ) {

			uint seed = sobolGetSeed( sobolBounceIndex, uint( effect ) );
			uint index = sobolPathIndex;

			uint shuffle_seed = sobolHashCombine( seed, 0u );
			uint shuffled_index = nestedUniformScrambleBase2( sobolReverseBits( index ), shuffle_seed );
			${t} sobol_pt = sobolGetTexturePoint( shuffled_index )${o};
			${e} result = ${e}( sobol_pt * 16777216.0 );

			${e} seed2 = sobolHashCombine( seed, ${s} );
			result = nestedUniformScrambleBase2( result, seed2 );

			return SOBOL_FACTOR * ${t}( result >> 8 );

		}
	`}const Gt=`

	// Utils
	const float SOBOL_FACTOR = 1.0 / 16777216.0;
	const uint SOBOL_MAX_POINTS = 256u * 256u;

	${we(1)}
	${we(2)}
	${we(3)}
	${we(4)}

	uint sobolHash( uint x ) {

		// finalizer from murmurhash3
		x ^= x >> 16;
		x *= 0x85ebca6bu;
		x ^= x >> 13;
		x *= 0xc2b2ae35u;
		x ^= x >> 16;
		return x;

	}

`,pr=`

	const uint SOBOL_DIRECTIONS_1[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0xa0000000u, 0xf0000000u,
		0x88000000u, 0xcc000000u, 0xaa000000u, 0xff000000u,
		0x80800000u, 0xc0c00000u, 0xa0a00000u, 0xf0f00000u,
		0x88880000u, 0xcccc0000u, 0xaaaa0000u, 0xffff0000u,
		0x80008000u, 0xc000c000u, 0xa000a000u, 0xf000f000u,
		0x88008800u, 0xcc00cc00u, 0xaa00aa00u, 0xff00ff00u,
		0x80808080u, 0xc0c0c0c0u, 0xa0a0a0a0u, 0xf0f0f0f0u,
		0x88888888u, 0xccccccccu, 0xaaaaaaaau, 0xffffffffu
	);

	const uint SOBOL_DIRECTIONS_2[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0x60000000u, 0x90000000u,
		0xe8000000u, 0x5c000000u, 0x8e000000u, 0xc5000000u,
		0x68800000u, 0x9cc00000u, 0xee600000u, 0x55900000u,
		0x80680000u, 0xc09c0000u, 0x60ee0000u, 0x90550000u,
		0xe8808000u, 0x5cc0c000u, 0x8e606000u, 0xc5909000u,
		0x6868e800u, 0x9c9c5c00u, 0xeeee8e00u, 0x5555c500u,
		0x8000e880u, 0xc0005cc0u, 0x60008e60u, 0x9000c590u,
		0xe8006868u, 0x5c009c9cu, 0x8e00eeeeu, 0xc5005555u
	);

	const uint SOBOL_DIRECTIONS_3[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0x20000000u, 0x50000000u,
		0xf8000000u, 0x74000000u, 0xa2000000u, 0x93000000u,
		0xd8800000u, 0x25400000u, 0x59e00000u, 0xe6d00000u,
		0x78080000u, 0xb40c0000u, 0x82020000u, 0xc3050000u,
		0x208f8000u, 0x51474000u, 0xfbea2000u, 0x75d93000u,
		0xa0858800u, 0x914e5400u, 0xdbe79e00u, 0x25db6d00u,
		0x58800080u, 0xe54000c0u, 0x79e00020u, 0xb6d00050u,
		0x800800f8u, 0xc00c0074u, 0x200200a2u, 0x50050093u
	);

	const uint SOBOL_DIRECTIONS_4[ 32 ] = uint[ 32 ](
		0x80000000u, 0x40000000u, 0x20000000u, 0xb0000000u,
		0xf8000000u, 0xdc000000u, 0x7a000000u, 0x9d000000u,
		0x5a800000u, 0x2fc00000u, 0xa1600000u, 0xf0b00000u,
		0xda880000u, 0x6fc40000u, 0x81620000u, 0x40bb0000u,
		0x22878000u, 0xb3c9c000u, 0xfb65a000u, 0xddb2d000u,
		0x78022800u, 0x9c0b3c00u, 0x5a0fb600u, 0x2d0ddb00u,
		0xa2878080u, 0xf3c9c040u, 0xdb65a020u, 0x6db2d0b0u,
		0x800228f8u, 0x400b3cdcu, 0x200fb67au, 0xb00ddb9du
	);

	uint getMaskedSobol( uint index, uint directions[ 32 ] ) {

		uint X = 0u;
		for ( int bit = 0; bit < 32; bit ++ ) {

			uint mask = ( index >> bit ) & 1u;
			X ^= mask * directions[ bit ];

		}
		return X;

	}

	vec4 generateSobolPoint( uint index ) {

		if ( index >= SOBOL_MAX_POINTS ) {

			return vec4( 0.0 );

		}

		// NOTE: this sobol "direction" is also available but we can't write out 5 components
		// uint x = index & 0x00ffffffu;
		uint x = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_1 ) ) & 0x00ffffffu;
		uint y = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_2 ) ) & 0x00ffffffu;
		uint z = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_3 ) ) & 0x00ffffffu;
		uint w = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_4 ) ) & 0x00ffffffu;

		return vec4( x, y, z, w ) * SOBOL_FACTOR;

	}

`,gr=`

	// Seeds
	uniform sampler2D sobolTexture;
	uint sobolPixelIndex = 0u;
	uint sobolPathIndex = 0u;
	uint sobolBounceIndex = 0u;

	uint sobolGetSeed( uint bounce, uint effect ) {

		return sobolHash(
			sobolHashCombine(
				sobolHashCombine(
					sobolHash( bounce ),
					sobolPixelIndex
				),
				effect
			)
		);

	}

	vec4 sobolGetTexturePoint( uint index ) {

		if ( index >= SOBOL_MAX_POINTS ) {

			index = index % SOBOL_MAX_POINTS;

		}

		uvec2 dim = uvec2( textureSize( sobolTexture, 0 ).xy );
		uint y = index / dim.x;
		uint x = index - y * dim.x;
		vec2 uv = vec2( x, y ) / vec2( dim );
		return texture( sobolTexture, uv );

	}

	${Se(1)}
	${Se(2)}
	${Se(3)}
	${Se(4)}

`;class vr extends qe{constructor(){super({blending:me,uniforms:{resolution:{value:new V}},vertexShader:`

				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`

				${Gt}
				${pr}

				varying vec2 vUv;
				uniform vec2 resolution;
				void main() {

					uint index = uint( gl_FragCoord.y ) * uint( resolution.x ) + uint( gl_FragCoord.x );
					gl_FragColor = generateSobolPoint( index );

				}
			`})}}class xr{generate(e,t=256){const a=new de(t,t,{type:C,format:A,minFilter:R,magFilter:R,generateMipmaps:!1}),o=e.getRenderTarget();e.setRenderTarget(a);const s=new le(new vr);return s.material.resolution.set(t,t),s.render(e),e.setRenderTarget(o),s.dispose(),a}}class yr extends Ct{set bokehSize(e){this.fStop=this.getFocalLength()/e}get bokehSize(){return this.getFocalLength()/this.fStop}constructor(...e){super(...e),this.fStop=1.4,this.apertureBlades=0,this.apertureRotation=0,this.focusDistance=25,this.anamorphicRatio=1}copy(e,t){return super.copy(e,t),this.fStop=e.fStop,this.apertureBlades=e.apertureBlades,this.apertureRotation=e.apertureRotation,this.focusDistance=e.focusDistance,this.anamorphicRatio=e.anamorphicRatio,this}}class br{constructor(){this.bokehSize=0,this.apertureBlades=0,this.apertureRotation=0,this.focusDistance=10,this.anamorphicRatio=1}updateFrom(e){e instanceof yr?(this.bokehSize=e.bokehSize,this.apertureBlades=e.apertureBlades,this.apertureRotation=e.apertureRotation,this.focusDistance=e.focusDistance,this.anamorphicRatio=e.anamorphicRatio):(this.bokehSize=0,this.apertureRotation=0,this.apertureBlades=0,this.focusDistance=10,this.anamorphicRatio=1)}}function ze(i){const e=new Uint16Array(i.length);for(let t=0,a=i.length;t<a;++t)e[t]=G.toHalfFloat(i[t]);return e}function ft(i,e,t=0,a=i.length){let o=t,s=t+a-1;for(;o<s;){const r=o+s>>1;i[r]<e?o=r+1:s=r}return o-t}function Tr(i,e,t){return .2126*i+.7152*e+.0722*t}function wr(i,e=W){const t=i.clone();t.source=new ca({...t.image});const{width:a,height:o,data:s}=t.image;let r=s;if(t.type!==e){e===W?r=new Uint16Array(s.length):r=new Float32Array(s.length);let l;s instanceof Int8Array||s instanceof Int16Array||s instanceof Int32Array?l=2**(8*s.BYTES_PER_ELEMENT-1)-1:l=2**(8*s.BYTES_PER_ELEMENT)-1;for(let c=0,h=s.length;c<h;c++){let d=s[c];t.type===W&&(d=G.fromHalfFloat(s[c])),t.type!==C&&t.type!==W&&(d/=l),e===W&&(r[c]=G.toHalfFloat(d))}t.image.data=r,t.type=e}if(t.flipY){const l=r;r=r.slice();for(let c=0;c<o;c++)for(let h=0;h<a;h++){const d=o-c-1,f=4*(c*a+h),n=4*(d*a+h);r[n+0]=l[f+0],r[n+1]=l[f+1],r[n+2]=l[f+2],r[n+3]=l[f+3]}t.flipY=!1,t.image.data=r}return t}class Sr{constructor(){const e=new k(ze(new Float32Array([0,0,0,0])),1,1);e.type=W,e.format=A,e.minFilter=N,e.magFilter=N,e.wrapS=L,e.wrapT=L,e.generateMipmaps=!1,e.needsUpdate=!0;const t=new k(ze(new Float32Array([0,1])),1,2);t.type=W,t.format=Re,t.minFilter=N,t.magFilter=N,t.generateMipmaps=!1,t.needsUpdate=!0;const a=new k(ze(new Float32Array([0,0,1,1])),2,2);a.type=W,a.format=Re,a.minFilter=N,a.magFilter=N,a.generateMipmaps=!1,a.needsUpdate=!0,this.map=e,this.marginalWeights=t,this.conditionalWeights=a,this.totalSum=0}dispose(){this.marginalWeights.dispose(),this.conditionalWeights.dispose(),this.map.dispose()}updateFrom(e){const t=wr(e);t.wrapS=L,t.wrapT=X;const{width:a,height:o,data:s}=t.image,r=new Float32Array(a*o),l=new Float32Array(a*o),c=new Float32Array(o),h=new Float32Array(o);let d=0,f=0;for(let u=0;u<o;u++){let v=0;for(let y=0;y<a;y++){const b=u*a+y,S=G.fromHalfFloat(s[4*b+0]),M=G.fromHalfFloat(s[4*b+1]),I=G.fromHalfFloat(s[4*b+2]),O=Tr(S,M,I);v+=O,d+=O,r[b]=O,l[b]=v}if(v!==0)for(let y=u*a,b=u*a+a;y<b;y++)r[y]/=v,l[y]/=v;f+=v,c[u]=v,h[u]=f}if(f!==0)for(let u=0,v=c.length;u<v;u++)c[u]/=f,h[u]/=f;const n=new Uint16Array(o),g=new Uint16Array(a*o);for(let u=0;u<o;u++){const v=(u+1)/o,y=ft(h,v);n[u]=G.toHalfFloat((y+.5)/o)}for(let u=0;u<o;u++)for(let v=0;v<a;v++){const y=u*a+v,b=(v+1)/a,S=ft(l,b,u*a,a);g[y]=G.toHalfFloat((S+.5)/a)}this.dispose();const{marginalWeights:p,conditionalWeights:x}=this;p.image={width:o,height:1,data:n},p.needsUpdate=!0,x.image={width:a,height:o,data:g},x.needsUpdate=!0,this.totalSum=d,this.map=t}}const Be=6,Mr=0,Ir=1,Rr=2,_r=3,Ar=4,B=new _,D=new _,ht=new Y,re=new Ft,dt=new _,ie=new _,Cr=new _(0,1,0);class Fr{constructor(){const e=new k(new Float32Array(4),1,1);e.format=A,e.type=C,e.wrapS=X,e.wrapT=X,e.generateMipmaps=!1,e.minFilter=R,e.magFilter=R,this.tex=e,this.count=0}updateFrom(e,t=[]){const a=this.tex,o=Math.max(e.length*Be,1),s=Math.ceil(Math.sqrt(o));a.image.width!==s&&(a.dispose(),a.image.data=new Float32Array(s*s*4),a.image.width=s,a.image.height=s);const r=a.image.data;for(let c=0,h=e.length;c<h;c++){const d=e[c],f=c*Be*4;let n=0;for(let p=0;p<Be*4;p++)r[f+p]=0;d.getWorldPosition(D),r[f+n++]=D.x,r[f+n++]=D.y,r[f+n++]=D.z;let g=Mr;if(d.isRectAreaLight&&d.isCircular?g=Ir:d.isSpotLight?g=Rr:d.isDirectionalLight?g=_r:d.isPointLight&&(g=Ar),r[f+n++]=g,r[f+n++]=d.color.r,r[f+n++]=d.color.g,r[f+n++]=d.color.b,r[f+n++]=d.intensity,d.getWorldQuaternion(re),d.isRectAreaLight)B.set(d.width,0,0).applyQuaternion(re),r[f+n++]=B.x,r[f+n++]=B.y,r[f+n++]=B.z,n++,D.set(0,d.height,0).applyQuaternion(re),r[f+n++]=D.x,r[f+n++]=D.y,r[f+n++]=D.z,r[f+n++]=B.cross(D).length()*(d.isCircular?Math.PI/4:1);else if(d.isSpotLight){const p=d.radius||0;dt.setFromMatrixPosition(d.matrixWorld),ie.setFromMatrixPosition(d.target.matrixWorld),ht.lookAt(dt,ie,Cr),re.setFromRotationMatrix(ht),B.set(1,0,0).applyQuaternion(re),r[f+n++]=B.x,r[f+n++]=B.y,r[f+n++]=B.z,n++,D.set(0,1,0).applyQuaternion(re),r[f+n++]=D.x,r[f+n++]=D.y,r[f+n++]=D.z,r[f+n++]=Math.PI*p*p,r[f+n++]=p,r[f+n++]=d.decay,r[f+n++]=d.distance,r[f+n++]=Math.cos(d.angle),r[f+n++]=Math.cos(d.angle*(1-d.penumbra)),r[f+n++]=d.iesMap?t.indexOf(d.iesMap):-1}else if(d.isPointLight){const p=B.setFromMatrixPosition(d.matrixWorld);r[f+n++]=p.x,r[f+n++]=p.y,r[f+n++]=p.z,n++,n+=4,n+=1,r[f+n++]=d.decay,r[f+n++]=d.distance}else if(d.isDirectionalLight){const p=B.setFromMatrixPosition(d.matrixWorld),x=D.setFromMatrixPosition(d.target.matrixWorld);ie.subVectors(p,x).normalize(),r[f+n++]=ie.x,r[f+n++]=ie.y,r[f+n++]=ie.z}}this.count=e.length;const l=Ve(r.buffer);return this.hash!==l?(this.hash=l,a.needsUpdate=!0,!0):!1}}function mt(i,e,t,a,o){if(e>a)throw new Error;const s=i.length/e,r=i.constructor.BYTES_PER_ELEMENT*8;let l=1;switch(i.constructor){case Uint8Array:case Uint16Array:case Uint32Array:l=2**r-1;break;case Int8Array:case Int16Array:case Int32Array:l=2**(r-1)-1;break}for(let c=0;c<s;c++){const h=4*c,d=e*c;for(let f=0;f<a;f++)t[o+h+f]=e>=f+1?i[d+f]/l:0}}class Dr extends ua{constructor(){super(),this._textures=[],this.type=C,this.format=A,this.internalFormat="RGBA32F"}updateAttribute(e,t){const a=this._textures[e];a.updateFrom(t);const o=a.image,s=this.image;if(o.width!==s.width||o.height!==s.height)throw new Error("FloatAttributeTextureArray: Attribute must be the same dimensions when updating single layer.");const{width:r,height:l,data:c}=s,d=r*l*4*e;let f=t.itemSize;f===3&&(f=4),mt(a.image.data,f,c,4,d),this.dispose(),this.needsUpdate=!0}setAttributes(e){const t=e[0].count,a=e.length;for(let f=0,n=a;f<n;f++)if(e[f].count!==t)throw new Error("FloatAttributeTextureArray: All attributes must have the same item count.");const o=this._textures;for(;o.length<a;){const f=new Wt;o.push(f)}for(;o.length>a;)o.pop();for(let f=0,n=a;f<n;f++)o[f].updateFrom(e[f]);const r=o[0].image,l=this.image;(r.width!==l.width||r.height!==l.height||r.depth!==a)&&(l.width=r.width,l.height=r.height,l.depth=a,l.data=new Float32Array(l.width*l.height*l.depth*4));const{data:c,width:h,height:d}=l;for(let f=0,n=a;f<n;f++){const g=o[f],x=h*d*4*f;let u=e[f].itemSize;u===3&&(u=4),mt(g.image.data,u,c,4,x)}this.dispose(),this.needsUpdate=!0}}class Pr extends Dr{updateNormalAttribute(e){this.updateAttribute(0,e)}updateTangentAttribute(e){this.updateAttribute(1,e)}updateUvAttribute(e){this.updateAttribute(2,e)}updateColorAttribute(e){this.updateAttribute(3,e)}updateFrom(e,t,a,o){this.setAttributes([e,t,a,o])}}function $e(i,e){return i.uuid<e.uuid?1:i.uuid>e.uuid?-1:0}function Ge(i){return`${i.source.uuid}:${i.colorSpace}`}function Er(i){const e=new Set,t=[];for(let a=0,o=i.length;a<o;a++){const s=i[a],r=Ge(s);e.has(r)||(e.add(r),t.push(s))}return t}function kr(i){const e=i.map(a=>a.iesMap||null).filter(a=>a),t=new Set(e);return Array.from(t).sort($e)}function Or(i){const e=new Set;for(let a=0,o=i.length;a<o;a++){const s=i[a];for(const r in s){const l=s[r];l&&l.isTexture&&e.add(l)}}const t=Array.from(e);return Er(t).sort($e)}function zr(i){const e=[];return i.traverse(t=>{t.visible&&(t.isRectAreaLight||t.isSpotLight||t.isPointLight||t.isDirectionalLight)&&e.push(t)}),e.sort($e)}const Ye=47,pt=Ye*4;class Br{constructor(){this._features={}}isUsed(e){return e in this._features}setUsed(e,t=!0){t===!1?delete this._features[e]:this._features[e]=!0}reset(){this._features={}}}class Nr extends k{constructor(){super(new Float32Array(4),1,1),this.format=A,this.type=C,this.wrapS=X,this.wrapT=X,this.minFilter=R,this.magFilter=R,this.generateMipmaps=!1,this.features=new Br}updateFrom(e,t){function a(p,x,u=-1){if(x in p&&p[x]){const v=Ge(p[x]);return f[v]}else return u}function o(p,x,u){return x in p?p[x]:u}function s(p,x,u,v){const y=p[x]&&p[x].isTexture?p[x]:null;if(y){y.matrixAutoUpdate&&y.updateMatrix();const b=y.matrix.elements;let S=0;u[v+S++]=b[0],u[v+S++]=b[3],u[v+S++]=b[6],S++,u[v+S++]=b[1],u[v+S++]=b[4],u[v+S++]=b[7],S++}return 8}let r=0;const l=e.length*Ye,c=Math.ceil(Math.sqrt(l))||1,{image:h,features:d}=this,f={};for(let p=0,x=t.length;p<x;p++)f[Ge(t[p])]=p;h.width!==c&&(this.dispose(),h.data=new Float32Array(c*c*4),h.width=c,h.height=c);const n=h.data;d.reset();for(let p=0,x=e.length;p<x;p++){const u=e[p];if(u.isFogVolumeMaterial){d.setUsed("FOG");for(let b=0;b<pt;b++)n[r+b]=0;n[r+0+0]=u.color.r,n[r+0+1]=u.color.g,n[r+0+2]=u.color.b,n[r+8+3]=o(u,"emissiveIntensity",0),n[r+12+0]=u.emissive.r,n[r+12+1]=u.emissive.g,n[r+12+2]=u.emissive.b,n[r+52+1]=u.density,n[r+52+3]=0,n[r+56+2]=4,r+=pt;continue}n[r++]=u.color.r,n[r++]=u.color.g,n[r++]=u.color.b,n[r++]=a(u,"map"),n[r++]=o(u,"metalness",0),n[r++]=a(u,"metalnessMap"),n[r++]=o(u,"roughness",0),n[r++]=a(u,"roughnessMap"),n[r++]=o(u,"ior",1.5),n[r++]=o(u,"transmission",0),n[r++]=a(u,"transmissionMap"),n[r++]=o(u,"emissiveIntensity",0),"emissive"in u?(n[r++]=u.emissive.r,n[r++]=u.emissive.g,n[r++]=u.emissive.b):(n[r++]=0,n[r++]=0,n[r++]=0),n[r++]=a(u,"emissiveMap"),n[r++]=a(u,"normalMap"),"normalScale"in u?(n[r++]=u.normalScale.x,n[r++]=u.normalScale.y):(n[r++]=1,n[r++]=1),n[r++]=o(u,"clearcoat",0),n[r++]=a(u,"clearcoatMap"),n[r++]=o(u,"clearcoatRoughness",0),n[r++]=a(u,"clearcoatRoughnessMap"),n[r++]=a(u,"clearcoatNormalMap"),"clearcoatNormalScale"in u?(n[r++]=u.clearcoatNormalScale.x,n[r++]=u.clearcoatNormalScale.y):(n[r++]=1,n[r++]=1),r++,n[r++]=o(u,"sheen",0),"sheenColor"in u?(n[r++]=u.sheenColor.r,n[r++]=u.sheenColor.g,n[r++]=u.sheenColor.b):(n[r++]=0,n[r++]=0,n[r++]=0),n[r++]=a(u,"sheenColorMap"),n[r++]=o(u,"sheenRoughness",0),n[r++]=a(u,"sheenRoughnessMap"),n[r++]=a(u,"iridescenceMap"),n[r++]=a(u,"iridescenceThicknessMap"),n[r++]=o(u,"iridescence",0),n[r++]=o(u,"iridescenceIOR",1.3);const v=o(u,"iridescenceThicknessRange",[100,400]);n[r++]=v[0],n[r++]=v[1],"specularColor"in u?(n[r++]=u.specularColor.r,n[r++]=u.specularColor.g,n[r++]=u.specularColor.b):(n[r++]=1,n[r++]=1,n[r++]=1),n[r++]=a(u,"specularColorMap"),n[r++]=o(u,"specularIntensity",1),n[r++]=a(u,"specularIntensityMap");const y=o(u,"thickness",0)===0&&o(u,"attenuationDistance",1/0)===1/0;if(n[r++]=Number(y),r++,"attenuationColor"in u?(n[r++]=u.attenuationColor.r,n[r++]=u.attenuationColor.g,n[r++]=u.attenuationColor.b):(n[r++]=1,n[r++]=1,n[r++]=1),n[r++]=o(u,"attenuationDistance",1/0),n[r++]=a(u,"alphaMap"),n[r++]=u.opacity,n[r++]=u.alphaTest,!y&&u.transmission>0)n[r++]=0;else switch(u.side){case ha:n[r++]=1;break;case fa:n[r++]=-1;break;case Dt:n[r++]=0;break}n[r++]=Number(o(u,"matte",!1)),n[r++]=Number(o(u,"castShadow",!0)),n[r++]=Number(u.vertexColors)|Number(u.flatShading)<<1,n[r++]=Number(u.transparent),r+=s(u,"map",n,r),r+=s(u,"metalnessMap",n,r),r+=s(u,"roughnessMap",n,r),r+=s(u,"transmissionMap",n,r),r+=s(u,"emissiveMap",n,r),r+=s(u,"normalMap",n,r),r+=s(u,"clearcoatMap",n,r),r+=s(u,"clearcoatNormalMap",n,r),r+=s(u,"clearcoatRoughnessMap",n,r),r+=s(u,"sheenColorMap",n,r),r+=s(u,"sheenRoughnessMap",n,r),r+=s(u,"iridescenceMap",n,r),r+=s(u,"iridescenceThicknessMap",n,r),r+=s(u,"specularColorMap",n,r),r+=s(u,"specularIntensityMap",n,r),r+=s(u,"alphaMap",n,r)}const g=Ve(n.buffer);return this.hash!==g?(this.hash=g,this.needsUpdate=!0,!0):!1}}const gt=new pe;function Hr(i){return i?`${i.uuid}:${i.version}`:null}function Wr(i,e){for(const t in e)t in i&&(i[t]=e[t])}class vt extends da{constructor(e,t,a){const o={format:A,type:We,minFilter:N,magFilter:N,wrapS:L,wrapT:L,generateMipmaps:!1,...a};super(e,t,1,o),Wr(this.texture,o),this.texture.setTextures=(...r)=>{this.setTextures(...r)},this.hashes=[null];const s=new le(new Lr);this.fsQuad=s}setTextures(e,t,a=this.width,o=this.height){const s=e.getRenderTarget(),r=e.toneMapping,l=e.getClearAlpha();e.getClearColor(gt);const c=t.length||1;(a!==this.width||o!==this.height||this.depth!==c)&&(this.setSize(a,o,c),this.hashes=new Array(c).fill(null)),e.setClearColor(0,0),e.toneMapping=ma;const h=this.fsQuad,d=this.hashes;let f=!1;for(let n=0,g=c;n<g;n++){const p=t[n],x=Hr(p);p&&(d[n]!==x||p.isWebGLRenderTarget)&&(p.matrixAutoUpdate=!1,p.matrix.identity(),h.material.map=p,e.setRenderTarget(this,n),h.render(e),p.updateMatrix(),p.matrixAutoUpdate=!0,d[n]=x,f=!0)}return h.material.map=null,e.setClearColor(gt,l),e.setRenderTarget(s),e.toneMapping=r,f}dispose(){super.dispose(),this.fsQuad.dispose()}}class Lr extends _e{get map(){return this.uniforms.map.value}set map(e){this.uniforms.map.value=e}constructor(){super({uniforms:{map:{value:null}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D map;
				varying vec2 vUv;
				void main() {

					gl_FragColor = texture2D( map, vUv );

				}
			`})}}function jr(i,e=Math.random()){for(let t=i.length-1;t>0;t--){const a=Math.floor(e()*(t+1)),o=i[t];i[t]=i[a],i[a]=o}return i}class Ur{constructor(e,t,a=Math.random){const o=e**t,s=new Uint16Array(o);let r=o;for(let l=0;l<o;l++)s[l]=l;this.samples=new Float32Array(t),this.strataCount=e,this.reset=function(){for(let l=0;l<o;l++)s[l]=l;r=0},this.reshuffle=function(){r=0},this.next=function(){const{samples:l}=this;r>=s.length&&(jr(s,a),this.reshuffle());let c=s[r++];for(let h=0;h<t;h++)l[h]=(c%e+a())/e,c=Math.floor(c/e);return l}}}class Gr{constructor(e,t,a=Math.random){let o=0;for(const c of t)o+=c;const s=new Float32Array(o),r=[];let l=0;for(const c of t){const h=new Ur(e,c,a);h.samples=new Float32Array(s.buffer,l,h.samples.length),l+=h.samples.length*4,r.push(h)}this.samples=s,this.strataCount=e,this.next=function(){for(const c of r)c.next();return s},this.reshuffle=function(){for(const c of r)c.reshuffle()},this.reset=function(){for(const c of r)c.reset()}}}class Vr{constructor(e=0){this.m=2147483648,this.a=1103515245,this.c=12345,this.seed=e}nextInt(){return this.seed=(this.a*this.seed+this.c)%this.m,this.seed}nextFloat(){return this.nextInt()/(this.m-1)}}class qr extends k{constructor(e=1,t=1,a=8){super(new Float32Array(1),1,1,A,C),this.minFilter=R,this.magFilter=R,this.strata=a,this.sampler=null,this.generator=new Vr,this.stableNoise=!1,this.random=()=>this.stableNoise?this.generator.nextFloat():Math.random(),this.init(e,t,a)}init(e=this.image.height,t=this.image.width,a=this.strata){const{image:o}=this;if(o.width===t&&o.height===e&&this.sampler!==null)return;const s=new Array(e*t).fill(4),r=new Gr(a,s,this.random);o.width=t,o.height=e,o.data=r.samples,this.sampler=r,this.dispose(),this.next()}next(){this.sampler.next(),this.needsUpdate=!0}reset(){this.sampler.reset(),this.generator.seed=0}}function $r(i,e=Math.random){for(let t=i.length-1;t>0;t--){const a=~~((e()-1e-6)*t),o=i[t];i[t]=i[a],i[a]=o}}function Yr(i,e){i.fill(0);for(let t=0;t<e;t++)i[t]=1}class xt{constructor(e){this.count=0,this.size=-1,this.sigma=-1,this.radius=-1,this.lookupTable=null,this.score=null,this.binaryPattern=null,this.resize(e),this.setSigma(1.5)}findVoid(){const{score:e,binaryPattern:t}=this;let a=1/0,o=-1;for(let s=0,r=t.length;s<r;s++){if(t[s]!==0)continue;const l=e[s];l<a&&(a=l,o=s)}return o}findCluster(){const{score:e,binaryPattern:t}=this;let a=-1/0,o=-1;for(let s=0,r=t.length;s<r;s++){if(t[s]!==1)continue;const l=e[s];l>a&&(a=l,o=s)}return o}setSigma(e){if(e===this.sigma)return;const t=~~(Math.sqrt(20*e**2)+1),a=2*t+1,o=new Float32Array(a*a),s=e*e;for(let r=-t;r<=t;r++)for(let l=-t;l<=t;l++){const c=(t+l)*a+r+t,h=r*r+l*l;o[c]=Math.E**(-h/(2*s))}this.lookupTable=o,this.sigma=e,this.radius=t}resize(e){this.size!==e&&(this.size=e,this.score=new Float32Array(e*e),this.binaryPattern=new Uint8Array(e*e))}invert(){const{binaryPattern:e,score:t,size:a}=this;t.fill(0);for(let o=0,s=e.length;o<s;o++)if(e[o]===0){const r=~~(o/a),l=o-r*a;this.updateScore(l,r,1),e[o]=1}else e[o]=0}updateScore(e,t,a){const{size:o,score:s,lookupTable:r}=this,l=this.radius,c=2*l+1;for(let h=-l;h<=l;h++)for(let d=-l;d<=l;d++){const f=(l+d)*c+h+l,n=r[f];let g=e+h;g=g<0?o+g:g%o;let p=t+d;p=p<0?o+p:p%o;const x=p*o+g;s[x]+=a*n}}addPointIndex(e){this.binaryPattern[e]=1;const t=this.size,a=~~(e/t),o=e-a*t;this.updateScore(o,a,1),this.count++}removePointIndex(e){this.binaryPattern[e]=0;const t=this.size,a=~~(e/t),o=e-a*t;this.updateScore(o,a,-1),this.count--}copy(e){this.resize(e.size),this.score.set(e.score),this.binaryPattern.set(e.binaryPattern),this.setSigma(e.sigma),this.count=e.count}}class Xr{constructor(){this.random=Math.random,this.sigma=1.5,this.size=64,this.majorityPointsRatio=.1,this.samples=new xt(1),this.savedSamples=new xt(1)}generate(){const{samples:e,savedSamples:t,sigma:a,majorityPointsRatio:o,size:s}=this;e.resize(s),e.setSigma(a);const r=Math.floor(s*s*o),l=e.binaryPattern;Yr(l,r),$r(l,this.random);for(let f=0,n=l.length;f<n;f++)l[f]===1&&e.addPointIndex(f);for(;;){const f=e.findCluster();e.removePointIndex(f);const n=e.findVoid();if(f===n){e.addPointIndex(f);break}e.addPointIndex(n)}const c=new Uint32Array(s*s);t.copy(e);let h;for(h=e.count-1;h>=0;){const f=e.findCluster();e.removePointIndex(f),c[f]=h,h--}const d=s*s;for(h=t.count;h<d/2;){const f=t.findVoid();t.addPointIndex(f),c[f]=h,h++}for(t.invert();h<d;){const f=t.findCluster();t.removePointIndex(f),c[f]=h,h++}return{data:c,maxValue:d}}}function Kr(i){return i>=3?4:i}function Qr(i){switch(i){case 1:return Re;case 2:return At;default:return A}}class Zr extends k{constructor(e=64,t=1){super(new Float32Array(4),1,1,A,C),this.minFilter=R,this.magFilter=R,this.size=e,this.channels=t,this.update()}update(){const e=this.channels,t=this.size,a=new Xr;a.channels=e,a.size=t;const o=Kr(e),s=Qr(o);(this.image.width!==t||s!==this.format)&&(this.image.width=t,this.image.height=t,this.image.data=new Float32Array(t**2*o),this.format=s,this.dispose());const r=this.image.data;for(let l=0,c=e;l<c;l++){const h=a.generate(),d=h.data,f=h.maxValue;for(let n=0,g=d.length;n<g;n++){const p=d[n]/f;r[n*o+l]=p}}this.needsUpdate=!0}}const Jr=`

	struct PhysicalCamera {

		float focusDistance;
		float anamorphicRatio;
		float bokehSize;
		int apertureBlades;
		float apertureRotation;

	};

`,ei=`

	struct EquirectHdrInfo {

		sampler2D marginalWeights;
		sampler2D conditionalWeights;
		sampler2D map;

		float totalSum;

	};

`,ti=`

	#define RECT_AREA_LIGHT_TYPE 0
	#define CIRC_AREA_LIGHT_TYPE 1
	#define SPOT_LIGHT_TYPE 2
	#define DIR_LIGHT_TYPE 3
	#define POINT_LIGHT_TYPE 4

	struct LightsInfo {

		sampler2D tex;
		uint count;

	};

	struct Light {

		vec3 position;
		int type;

		vec3 color;
		float intensity;

		vec3 u;
		vec3 v;
		float area;

		// spot light fields
		float radius;
		float near;
		float decay;
		float distance;
		float coneCos;
		float penumbraCos;
		int iesProfile;

	};

	Light readLightInfo( sampler2D tex, uint index ) {

		uint i = index * 6u;

		vec4 s0 = texelFetch1D( tex, i + 0u );
		vec4 s1 = texelFetch1D( tex, i + 1u );
		vec4 s2 = texelFetch1D( tex, i + 2u );
		vec4 s3 = texelFetch1D( tex, i + 3u );

		Light l;
		l.position = s0.rgb;
		l.type = int( round( s0.a ) );

		l.color = s1.rgb;
		l.intensity = s1.a;

		l.u = s2.rgb;
		l.v = s3.rgb;
		l.area = s3.a;

		if ( l.type == SPOT_LIGHT_TYPE || l.type == POINT_LIGHT_TYPE ) {

			vec4 s4 = texelFetch1D( tex, i + 4u );
			vec4 s5 = texelFetch1D( tex, i + 5u );
			l.radius = s4.r;
			l.decay = s4.g;
			l.distance = s4.b;
			l.coneCos = s4.a;

			l.penumbraCos = s5.r;
			l.iesProfile = int( round( s5.g ) );

		} else {

			l.radius = 0.0;
			l.decay = 0.0;
			l.distance = 0.0;

			l.coneCos = 0.0;
			l.penumbraCos = 0.0;
			l.iesProfile = - 1;

		}

		return l;

	}

`,ai=`

	struct Material {

		vec3 color;
		int map;

		float metalness;
		int metalnessMap;

		float roughness;
		int roughnessMap;

		float ior;
		float transmission;
		int transmissionMap;

		float emissiveIntensity;
		vec3 emissive;
		int emissiveMap;

		int normalMap;
		vec2 normalScale;

		float clearcoat;
		int clearcoatMap;
		int clearcoatNormalMap;
		vec2 clearcoatNormalScale;
		float clearcoatRoughness;
		int clearcoatRoughnessMap;

		int iridescenceMap;
		int iridescenceThicknessMap;
		float iridescence;
		float iridescenceIor;
		float iridescenceThicknessMinimum;
		float iridescenceThicknessMaximum;

		vec3 specularColor;
		int specularColorMap;

		float specularIntensity;
		int specularIntensityMap;
		bool thinFilm;

		vec3 attenuationColor;
		float attenuationDistance;

		int alphaMap;

		bool castShadow;
		float opacity;
		float alphaTest;

		float side;
		bool matte;

		float sheen;
		vec3 sheenColor;
		int sheenColorMap;
		float sheenRoughness;
		int sheenRoughnessMap;

		bool vertexColors;
		bool flatShading;
		bool transparent;
		bool fogVolume;

		mat3 mapTransform;
		mat3 metalnessMapTransform;
		mat3 roughnessMapTransform;
		mat3 transmissionMapTransform;
		mat3 emissiveMapTransform;
		mat3 normalMapTransform;
		mat3 clearcoatMapTransform;
		mat3 clearcoatNormalMapTransform;
		mat3 clearcoatRoughnessMapTransform;
		mat3 sheenColorMapTransform;
		mat3 sheenRoughnessMapTransform;
		mat3 iridescenceMapTransform;
		mat3 iridescenceThicknessMapTransform;
		mat3 specularColorMapTransform;
		mat3 specularIntensityMapTransform;
		mat3 alphaMapTransform;

	};

	mat3 readTextureTransform( sampler2D tex, uint index ) {

		mat3 textureTransform;

		vec4 row1 = texelFetch1D( tex, index );
		vec4 row2 = texelFetch1D( tex, index + 1u );

		textureTransform[0] = vec3(row1.r, row2.r, 0.0);
		textureTransform[1] = vec3(row1.g, row2.g, 0.0);
		textureTransform[2] = vec3(row1.b, row2.b, 1.0);

		return textureTransform;

	}

	Material readMaterialInfo( sampler2D tex, uint index ) {

		uint i = index * uint( MATERIAL_PIXELS );

		vec4 s0 = texelFetch1D( tex, i + 0u );
		vec4 s1 = texelFetch1D( tex, i + 1u );
		vec4 s2 = texelFetch1D( tex, i + 2u );
		vec4 s3 = texelFetch1D( tex, i + 3u );
		vec4 s4 = texelFetch1D( tex, i + 4u );
		vec4 s5 = texelFetch1D( tex, i + 5u );
		vec4 s6 = texelFetch1D( tex, i + 6u );
		vec4 s7 = texelFetch1D( tex, i + 7u );
		vec4 s8 = texelFetch1D( tex, i + 8u );
		vec4 s9 = texelFetch1D( tex, i + 9u );
		vec4 s10 = texelFetch1D( tex, i + 10u );
		vec4 s11 = texelFetch1D( tex, i + 11u );
		vec4 s12 = texelFetch1D( tex, i + 12u );
		vec4 s13 = texelFetch1D( tex, i + 13u );
		vec4 s14 = texelFetch1D( tex, i + 14u );

		Material m;
		m.color = s0.rgb;
		m.map = int( round( s0.a ) );

		m.metalness = s1.r;
		m.metalnessMap = int( round( s1.g ) );
		m.roughness = s1.b;
		m.roughnessMap = int( round( s1.a ) );

		m.ior = s2.r;
		m.transmission = s2.g;
		m.transmissionMap = int( round( s2.b ) );
		m.emissiveIntensity = s2.a;

		m.emissive = s3.rgb;
		m.emissiveMap = int( round( s3.a ) );

		m.normalMap = int( round( s4.r ) );
		m.normalScale = s4.gb;

		m.clearcoat = s4.a;
		m.clearcoatMap = int( round( s5.r ) );
		m.clearcoatRoughness = s5.g;
		m.clearcoatRoughnessMap = int( round( s5.b ) );
		m.clearcoatNormalMap = int( round( s5.a ) );
		m.clearcoatNormalScale = s6.rg;

		m.sheen = s6.a;
		m.sheenColor = s7.rgb;
		m.sheenColorMap = int( round( s7.a ) );
		m.sheenRoughness = s8.r;
		m.sheenRoughnessMap = int( round( s8.g ) );

		m.iridescenceMap = int( round( s8.b ) );
		m.iridescenceThicknessMap = int( round( s8.a ) );
		m.iridescence = s9.r;
		m.iridescenceIor = s9.g;
		m.iridescenceThicknessMinimum = s9.b;
		m.iridescenceThicknessMaximum = s9.a;

		m.specularColor = s10.rgb;
		m.specularColorMap = int( round( s10.a ) );

		m.specularIntensity = s11.r;
		m.specularIntensityMap = int( round( s11.g ) );
		m.thinFilm = bool( s11.b );

		m.attenuationColor = s12.rgb;
		m.attenuationDistance = s12.a;

		m.alphaMap = int( round( s13.r ) );

		m.opacity = s13.g;
		m.alphaTest = s13.b;
		m.side = s13.a;

		m.matte = bool( s14.r );
		m.castShadow = bool( s14.g );
		m.vertexColors = bool( int( s14.b ) & 1 );
		m.flatShading = bool( int( s14.b ) & 2 );
		m.fogVolume = bool( int( s14.b ) & 4 );
		m.transparent = bool( s14.a );

		uint firstTextureTransformIdx = i + 15u;

		// mat3( 1.0 ) is an identity matrix
		m.mapTransform = m.map == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx );
		m.metalnessMapTransform = m.metalnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 2u );
		m.roughnessMapTransform = m.roughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 4u );
		m.transmissionMapTransform = m.transmissionMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 6u );
		m.emissiveMapTransform = m.emissiveMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 8u );
		m.normalMapTransform = m.normalMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 10u );
		m.clearcoatMapTransform = m.clearcoatMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 12u );
		m.clearcoatNormalMapTransform = m.clearcoatNormalMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 14u );
		m.clearcoatRoughnessMapTransform = m.clearcoatRoughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 16u );
		m.sheenColorMapTransform = m.sheenColorMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 18u );
		m.sheenRoughnessMapTransform = m.sheenRoughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 20u );
		m.iridescenceMapTransform = m.iridescenceMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 22u );
		m.iridescenceThicknessMapTransform = m.iridescenceThicknessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 24u );
		m.specularColorMapTransform = m.specularColorMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 26u );
		m.specularIntensityMapTransform = m.specularIntensityMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 28u );
		m.alphaMapTransform = m.alphaMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 30u );

		return m;

	}

`,ri=`

	struct SurfaceRecord {

		// surface type
		bool volumeParticle;

		// geometry
		vec3 faceNormal;
		bool frontFace;
		vec3 normal;
		mat3 normalBasis;
		mat3 normalInvBasis;

		// cached properties
		float eta;
		float f0;

		// material
		float roughness;
		float filteredRoughness;
		float metalness;
		vec3 color;
		vec3 emission;

		// transmission
		float ior;
		float transmission;
		bool thinFilm;
		vec3 attenuationColor;
		float attenuationDistance;

		// clearcoat
		vec3 clearcoatNormal;
		mat3 clearcoatBasis;
		mat3 clearcoatInvBasis;
		float clearcoat;
		float clearcoatRoughness;
		float filteredClearcoatRoughness;

		// sheen
		float sheen;
		vec3 sheenColor;
		float sheenRoughness;

		// iridescence
		float iridescence;
		float iridescenceIor;
		float iridescenceThickness;

		// specular
		vec3 specularColor;
		float specularIntensity;
	};

	struct ScatterRecord {
		float specularPdf;
		float pdf;
		vec3 direction;
		vec3 color;
	};

`,ii=`

	// samples the the given environment map in the given direction
	vec3 sampleEquirectColor( sampler2D envMap, vec3 direction ) {

		return texture2D( envMap, equirectDirectionToUv( direction ) ).rgb;

	}

	// gets the pdf of the given direction to sample
	float equirectDirectionPdf( vec3 direction ) {

		vec2 uv = equirectDirectionToUv( direction );
		float theta = uv.y * PI;
		float sinTheta = sin( theta );
		if ( sinTheta == 0.0 ) {

			return 0.0;

		}

		return 1.0 / ( 2.0 * PI * PI * sinTheta );

	}

	// samples the color given env map with CDF and returns the pdf of the direction
	float sampleEquirect( vec3 direction, inout vec3 color ) {

		float totalSum = envMapInfo.totalSum;
		if ( totalSum == 0.0 ) {

			color = vec3( 0.0 );
			return 1.0;

		}

		vec2 uv = equirectDirectionToUv( direction );
		color = texture2D( envMapInfo.map, uv ).rgb;

		float lum = luminance( color );
		ivec2 resolution = textureSize( envMapInfo.map, 0 );
		float pdf = lum / totalSum;

		return float( resolution.x * resolution.y ) * pdf * equirectDirectionPdf( direction );

	}

	// samples a direction of the envmap with color and retrieves pdf
	float sampleEquirectProbability( vec2 r, inout vec3 color, inout vec3 direction ) {

		// sample env map cdf
		float v = texture2D( envMapInfo.marginalWeights, vec2( r.x, 0.0 ) ).x;
		float u = texture2D( envMapInfo.conditionalWeights, vec2( r.y, v ) ).x;
		vec2 uv = vec2( u, v );

		vec3 derivedDirection = equirectUvToDirection( uv );
		direction = derivedDirection;
		color = texture2D( envMapInfo.map, uv ).rgb;

		float totalSum = envMapInfo.totalSum;
		float lum = luminance( color );
		ivec2 resolution = textureSize( envMapInfo.map, 0 );
		float pdf = lum / totalSum;

		return float( resolution.x * resolution.y ) * pdf * equirectDirectionPdf( direction );

	}
`,si=`

	float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {

		return smoothstep( coneCosine, penumbraCosine, angleCosine );

	}

	float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

		// based upon Frostbite 3 Moving to Physically-based Rendering
		// page 32, equation 26: E[window1]
		// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), EPSILON );

		if ( cutoffDistance > 0.0 ) {

			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

		}

		return distanceFalloff;

	}

	float getPhotometricAttenuation( sampler2DArray iesProfiles, int iesProfile, vec3 posToLight, vec3 lightDir, vec3 u, vec3 v ) {

		float cosTheta = dot( posToLight, lightDir );
		float angle = acos( cosTheta ) / PI;

		return texture2D( iesProfiles, vec3( angle, 0.0, iesProfile ) ).r;

	}

	struct LightRecord {

		float dist;
		vec3 direction;
		float pdf;
		vec3 emission;
		int type;

	};

	bool intersectLightAtIndex( sampler2D lights, vec3 rayOrigin, vec3 rayDirection, uint l, inout LightRecord lightRec ) {

		bool didHit = false;
		Light light = readLightInfo( lights, l );

		vec3 u = light.u;
		vec3 v = light.v;

		// check for backface
		vec3 normal = normalize( cross( u, v ) );
		if ( dot( normal, rayDirection ) > 0.0 ) {

			u *= 1.0 / dot( u, u );
			v *= 1.0 / dot( v, v );

			float dist;

			// MIS / light intersection is not supported for punctual lights.
			if(
				( light.type == RECT_AREA_LIGHT_TYPE && intersectsRectangle( light.position, normal, u, v, rayOrigin, rayDirection, dist ) ) ||
				( light.type == CIRC_AREA_LIGHT_TYPE && intersectsCircle( light.position, normal, u, v, rayOrigin, rayDirection, dist ) )
			) {

				float cosTheta = dot( rayDirection, normal );
				didHit = true;
				lightRec.dist = dist;
				lightRec.pdf = ( dist * dist ) / ( light.area * cosTheta );
				lightRec.emission = light.color * light.intensity;
				lightRec.direction = rayDirection;
				lightRec.type = light.type;

			}

		}

		return didHit;

	}

	LightRecord randomAreaLightSample( Light light, vec3 rayOrigin, vec2 ruv ) {

		vec3 randomPos;
		if( light.type == RECT_AREA_LIGHT_TYPE ) {

			// rectangular area light
			randomPos = light.position + light.u * ( ruv.x - 0.5 ) + light.v * ( ruv.y - 0.5 );

		} else if( light.type == CIRC_AREA_LIGHT_TYPE ) {

			// circular area light
			float r = 0.5 * sqrt( ruv.x );
			float theta = ruv.y * 2.0 * PI;
			float x = r * cos( theta );
			float y = r * sin( theta );

			randomPos = light.position + light.u * x + light.v * y;

		}

		vec3 toLight = randomPos - rayOrigin;
		float lightDistSq = dot( toLight, toLight );
		float dist = sqrt( lightDistSq );
		vec3 direction = toLight / dist;
		vec3 lightNormal = normalize( cross( light.u, light.v ) );

		LightRecord lightRec;
		lightRec.type = light.type;
		lightRec.emission = light.color * light.intensity;
		lightRec.dist = dist;
		lightRec.direction = direction;

		// TODO: the denominator is potentially zero
		lightRec.pdf = lightDistSq / ( light.area * dot( direction, lightNormal ) );

		return lightRec;

	}

	LightRecord randomSpotLightSample( Light light, sampler2DArray iesProfiles, vec3 rayOrigin, vec2 ruv ) {

		float radius = light.radius * sqrt( ruv.x );
		float theta = ruv.y * 2.0 * PI;
		float x = radius * cos( theta );
		float y = radius * sin( theta );

		vec3 u = light.u;
		vec3 v = light.v;
		vec3 normal = normalize( cross( u, v ) );

		float angle = acos( light.coneCos );
		float angleTan = tan( angle );
		float startDistance = light.radius / max( angleTan, EPSILON );

		vec3 randomPos = light.position - normal * startDistance + u * x + v * y;
		vec3 toLight = randomPos - rayOrigin;
		float lightDistSq = dot( toLight, toLight );
		float dist = sqrt( lightDistSq );

		vec3 direction = toLight / max( dist, EPSILON );
		float cosTheta = dot( direction, normal );

		float spotAttenuation = light.iesProfile != - 1 ?
			getPhotometricAttenuation( iesProfiles, light.iesProfile, direction, normal, u, v ) :
			getSpotAttenuation( light.coneCos, light.penumbraCos, cosTheta );

		float distanceAttenuation = getDistanceAttenuation( dist, light.distance, light.decay );
		LightRecord lightRec;
		lightRec.type = light.type;
		lightRec.dist = dist;
		lightRec.direction = direction;
		lightRec.emission = light.color * light.intensity * distanceAttenuation * spotAttenuation;
		lightRec.pdf = 1.0;

		return lightRec;

	}

	LightRecord randomLightSample( sampler2D lights, sampler2DArray iesProfiles, uint lightCount, vec3 rayOrigin, vec3 ruv ) {

		LightRecord result;

		// pick a random light
		uint l = uint( ruv.x * float( lightCount ) );
		Light light = readLightInfo( lights, l );

		if ( light.type == SPOT_LIGHT_TYPE ) {

			result = randomSpotLightSample( light, iesProfiles, rayOrigin, ruv.yz );

		} else if ( light.type == POINT_LIGHT_TYPE ) {

			vec3 lightRay = light.u - rayOrigin;
			float lightDist = length( lightRay );
			float cutoffDistance = light.distance;
			float distanceFalloff = 1.0 / max( pow( lightDist, light.decay ), 0.01 );
			if ( cutoffDistance > 0.0 ) {

				distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDist / cutoffDistance ) ) );

			}

			LightRecord rec;
			rec.direction = normalize( lightRay );
			rec.dist = length( lightRay );
			rec.pdf = 1.0;
			rec.emission = light.color * light.intensity * distanceFalloff;
			rec.type = light.type;
			result = rec;

		} else if ( light.type == DIR_LIGHT_TYPE ) {

			LightRecord rec;
			rec.dist = 1e10;
			rec.direction = light.u;
			rec.pdf = 1.0;
			rec.emission = light.color * light.intensity;
			rec.type = light.type;

			result = rec;

		} else {

			// sample the light
			result = randomAreaLightSample( light, rayOrigin, ruv.yz );

		}

		return result;

	}

`,oi=`

	vec3 sampleHemisphere( vec3 n, vec2 uv ) {

		// https://www.rorydriscoll.com/2009/01/07/better-sampling/
		// https://graphics.pixar.com/library/OrthonormalB/paper.pdf
		float sign = n.z == 0.0 ? 1.0 : sign( n.z );
		float a = - 1.0 / ( sign + n.z );
		float b = n.x * n.y * a;
		vec3 b1 = vec3( 1.0 + sign * n.x * n.x * a, sign * b, - sign * n.x );
		vec3 b2 = vec3( b, sign + n.y * n.y * a, - n.y );

		float r = sqrt( uv.x );
		float theta = 2.0 * PI * uv.y;
		float x = r * cos( theta );
		float y = r * sin( theta );
		return x * b1 + y * b2 + sqrt( 1.0 - uv.x ) * n;

	}

	vec2 sampleTriangle( vec2 a, vec2 b, vec2 c, vec2 r ) {

		// get the edges of the triangle and the diagonal across the
		// center of the parallelogram
		vec2 e1 = a - b;
		vec2 e2 = c - b;
		vec2 diag = normalize( e1 + e2 );

		// pick the point in the parallelogram
		if ( r.x + r.y > 1.0 ) {

			r = vec2( 1.0 ) - r;

		}

		return e1 * r.x + e2 * r.y;

	}

	vec2 sampleCircle( vec2 uv ) {

		float angle = 2.0 * PI * uv.x;
		float radius = sqrt( uv.y );
		return vec2( cos( angle ), sin( angle ) ) * radius;

	}

	vec3 sampleSphere( vec2 uv ) {

		float u = ( uv.x - 0.5 ) * 2.0;
		float t = uv.y * PI * 2.0;
		float f = sqrt( 1.0 - u * u );

		return vec3( f * cos( t ), f * sin( t ), u );

	}

	vec2 sampleRegularPolygon( int sides, vec3 uvw ) {

		sides = max( sides, 3 );

		vec3 r = uvw;
		float anglePerSegment = 2.0 * PI / float( sides );
		float segment = floor( float( sides ) * r.x );

		float angle1 = anglePerSegment * segment;
		float angle2 = angle1 + anglePerSegment;
		vec2 a = vec2( sin( angle1 ), cos( angle1 ) );
		vec2 b = vec2( 0.0, 0.0 );
		vec2 c = vec2( sin( angle2 ), cos( angle2 ) );

		return sampleTriangle( a, b, c, r.yz );

	}

	// samples an aperture shape with the given number of sides. 0 means circle
	vec2 sampleAperture( int blades, vec3 uvw ) {

		return blades == 0 ?
			sampleCircle( uvw.xy ) :
			sampleRegularPolygon( blades, uvw );

	}


`,ni=`

	bool totalInternalReflection( float cosTheta, float eta ) {

		float sinTheta = sqrt( 1.0 - cosTheta * cosTheta );
		return eta * sinTheta > 1.0;

	}

	// https://google.github.io/filament/Filament.md.html#materialsystem/diffusebrdf
	float schlickFresnel( float cosine, float f0 ) {

		return f0 + ( 1.0 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

	vec3 schlickFresnel( float cosine, vec3 f0 ) {

		return f0 + ( 1.0 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

	vec3 schlickFresnel( float cosine, vec3 f0, vec3 f90 ) {

		return f0 + ( f90 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

	float dielectricFresnel( float cosThetaI, float eta ) {

		// https://schuttejoe.github.io/post/disneybsdf/
		float ni = eta;
		float nt = 1.0;

		// Check for total internal reflection
		float sinThetaISq = 1.0f - cosThetaI * cosThetaI;
		float sinThetaTSq = eta * eta * sinThetaISq;
		if( sinThetaTSq >= 1.0 ) {

			return 1.0;

		}

		float sinThetaT = sqrt( sinThetaTSq );

		float cosThetaT = sqrt( max( 0.0, 1.0f - sinThetaT * sinThetaT ) );
		float rParallel = ( ( nt * cosThetaI ) - ( ni * cosThetaT ) ) / ( ( nt * cosThetaI ) + ( ni * cosThetaT ) );
		float rPerpendicular = ( ( ni * cosThetaI ) - ( nt * cosThetaT ) ) / ( ( ni * cosThetaI ) + ( nt * cosThetaT ) );
		return ( rParallel * rParallel + rPerpendicular * rPerpendicular ) / 2.0;

	}

	// https://raytracing.github.io/books/RayTracingInOneWeekend.html#dielectrics/schlickapproximation
	float iorRatioToF0( float eta ) {

		return pow( ( 1.0 - eta ) / ( 1.0 + eta ), 2.0 );

	}

	vec3 evaluateFresnel( float cosTheta, float eta, vec3 f0, vec3 f90 ) {

		if ( totalInternalReflection( cosTheta, eta ) ) {

			return f90;

		}

		return schlickFresnel( cosTheta, f0, f90 );

	}

	// TODO: disney fresnel was removed and replaced with this fresnel function to better align with
	// the glTF but is causing blown out pixels. Should be revisited
	// float evaluateFresnelWeight( float cosTheta, float eta, float f0 ) {

	// 	if ( totalInternalReflection( cosTheta, eta ) ) {

	// 		return 1.0;

	// 	}

	// 	return schlickFresnel( cosTheta, f0 );

	// }

	// https://schuttejoe.github.io/post/disneybsdf/
	float disneyFresnel( vec3 wo, vec3 wi, vec3 wh, float f0, float eta, float metalness ) {

		float dotHV = dot( wo, wh );
		if ( totalInternalReflection( dotHV, eta ) ) {

			return 1.0;

		}

		float dotHL = dot( wi, wh );
		float dielectricFresnel = dielectricFresnel( abs( dotHV ), eta );
		float metallicFresnel = schlickFresnel( dotHL, f0 );

		return mix( dielectricFresnel, metallicFresnel, metalness );

	}

`,li=`

	// Fast arccos approximation used to remove banding artifacts caused by numerical errors in acos.
	// This is a cubic Lagrange interpolating polynomial for x = [-1, -1/2, 0, 1/2, 1].
	// For more information see: https://github.com/gkjohnson/three-gpu-pathtracer/pull/171#issuecomment-1152275248
	float acosApprox( float x ) {

		x = clamp( x, -1.0, 1.0 );
		return ( - 0.69813170079773212 * x * x - 0.87266462599716477 ) * x + 1.5707963267948966;

	}

	// An acos with input values bound to the range [-1, 1].
	float acosSafe( float x ) {

		return acos( clamp( x, -1.0, 1.0 ) );

	}

	float saturateCos( float val ) {

		return clamp( val, 0.001, 1.0 );

	}

	float square( float t ) {

		return t * t;

	}

	vec2 square( vec2 t ) {

		return t * t;

	}

	vec3 square( vec3 t ) {

		return t * t;

	}

	vec4 square( vec4 t ) {

		return t * t;

	}

	vec2 rotateVector( vec2 v, float t ) {

		float ac = cos( t );
		float as = sin( t );
		return vec2(
			v.x * ac - v.y * as,
			v.x * as + v.y * ac
		);

	}

	// forms a basis with the normal vector as Z
	mat3 getBasisFromNormal( vec3 normal ) {

		vec3 other;
		if ( abs( normal.x ) > 0.5 ) {

			other = vec3( 0.0, 1.0, 0.0 );

		} else {

			other = vec3( 1.0, 0.0, 0.0 );

		}

		vec3 ortho = normalize( cross( normal, other ) );
		vec3 ortho2 = normalize( cross( normal, ortho ) );
		return mat3( ortho2, ortho, normal );

	}

`,ci=`

	// Finds the point where the ray intersects the plane defined by u and v and checks if this point
	// falls in the bounds of the rectangle on that same plane.
	// Plane intersection: https://lousodrome.net/blog/light/2020/07/03/intersection-of-a-ray-and-a-plane/
	bool intersectsRectangle( vec3 center, vec3 normal, vec3 u, vec3 v, vec3 rayOrigin, vec3 rayDirection, inout float dist ) {

		float t = dot( center - rayOrigin, normal ) / dot( rayDirection, normal );

		if ( t > EPSILON ) {

			vec3 p = rayOrigin + rayDirection * t;
			vec3 vi = p - center;

			// check if p falls inside the rectangle
			float a1 = dot( u, vi );
			if ( abs( a1 ) <= 0.5 ) {

				float a2 = dot( v, vi );
				if ( abs( a2 ) <= 0.5 ) {

					dist = t;
					return true;

				}

			}

		}

		return false;

	}

	// Finds the point where the ray intersects the plane defined by u and v and checks if this point
	// falls in the bounds of the circle on that same plane. See above URL for a description of the plane intersection algorithm.
	bool intersectsCircle( vec3 position, vec3 normal, vec3 u, vec3 v, vec3 rayOrigin, vec3 rayDirection, inout float dist ) {

		float t = dot( position - rayOrigin, normal ) / dot( rayDirection, normal );

		if ( t > EPSILON ) {

			vec3 hit = rayOrigin + rayDirection * t;
			vec3 vi = hit - position;

			float a1 = dot( u, vi );
			float a2 = dot( v, vi );

			if( length( vec2( a1, a2 ) ) <= 0.5 ) {

				dist = t;
				return true;

			}

		}

		return false;

	}

`,ui=`

	// add texel fetch functions for texture arrays
	vec4 texelFetch1D( sampler2DArray tex, int layer, uint index ) {

		uint width = uint( textureSize( tex, 0 ).x );
		uvec2 uv;
		uv.x = index % width;
		uv.y = index / width;

		return texelFetch( tex, ivec3( uv, layer ), 0 );

	}

	vec4 textureSampleBarycoord( sampler2DArray tex, int layer, vec3 barycoord, uvec3 faceIndices ) {

		return
			barycoord.x * texelFetch1D( tex, layer, faceIndices.x ) +
			barycoord.y * texelFetch1D( tex, layer, faceIndices.y ) +
			barycoord.z * texelFetch1D( tex, layer, faceIndices.z );

	}

`,Vt=`

	// TODO: possibly this should be renamed something related to material or path tracing logic

	#ifndef RAY_OFFSET
	#define RAY_OFFSET 1e-4
	#endif

	// adjust the hit point by the surface normal by a factor of some offset and the
	// maximum component-wise value of the current point to accommodate floating point
	// error as values increase.
	vec3 stepRayOrigin( vec3 rayOrigin, vec3 rayDirection, vec3 offset, float dist ) {

		vec3 point = rayOrigin + rayDirection * dist;
		vec3 absPoint = abs( point );
		float maxPoint = max( absPoint.x, max( absPoint.y, absPoint.z ) );
		return point + offset * ( maxPoint + 1.0 ) * RAY_OFFSET;

	}

	// https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md#attenuation
	vec3 transmissionAttenuation( float dist, vec3 attColor, float attDist ) {

		vec3 ot = - log( attColor ) / attDist;
		return exp( - ot * dist );

	}

	vec3 getHalfVector( vec3 wi, vec3 wo, float eta ) {

		// get the half vector - assuming if the light incident vector is on the other side
		// of the that it's transmissive.
		vec3 h;
		if ( wi.z > 0.0 ) {

			h = normalize( wi + wo );

		} else {

			// Scale by the ior ratio to retrieve the appropriate half vector
			// From Section 2.2 on computing the transmission half vector:
			// https://blog.selfshadow.com/publications/s2015-shading-course/burley/s2015_pbs_disney_bsdf_notes.pdf
			h = normalize( wi + wo * eta );

		}

		h *= sign( h.z );
		return h;

	}

	vec3 getHalfVector( vec3 a, vec3 b ) {

		return normalize( a + b );

	}

	// The discrepancy between interpolated surface normal and geometry normal can cause issues when a ray
	// is cast that is on the top side of the geometry normal plane but below the surface normal plane. If
	// we find a ray like that we ignore it to avoid artifacts.
	// This function returns if the direction is on the same side of both planes.
	bool isDirectionValid( vec3 direction, vec3 surfaceNormal, vec3 geometryNormal ) {

		bool aboveSurfaceNormal = dot( direction, surfaceNormal ) > 0.0;
		bool aboveGeometryNormal = dot( direction, geometryNormal ) > 0.0;
		return aboveSurfaceNormal == aboveGeometryNormal;

	}

	// ray sampling x and z are swapped to align with expected background view
	vec2 equirectDirectionToUv( vec3 direction ) {

		// from Spherical.setFromCartesianCoords
		vec2 uv = vec2( atan( direction.z, direction.x ), acos( direction.y ) );
		uv /= vec2( 2.0 * PI, PI );

		// apply adjustments to get values in range [0, 1] and y right side up
		uv.x += 0.5;
		uv.y = 1.0 - uv.y;
		return uv;

	}

	vec3 equirectUvToDirection( vec2 uv ) {

		// undo above adjustments
		uv.x -= 0.5;
		uv.y = 1.0 - uv.y;

		// from Vector3.setFromSphericalCoords
		float theta = uv.x * 2.0 * PI;
		float phi = uv.y * PI;

		float sinPhi = sin( phi );

		return vec3( sinPhi * cos( theta ), cos( phi ), sinPhi * sin( theta ) );

	}

	// power heuristic for multiple importance sampling
	float misHeuristic( float a, float b ) {

		float aa = a * a;
		float bb = b * b;
		return aa / ( aa + bb );

	}

	// tentFilter from Peter Shirley's 'Realistic Ray Tracing (2nd Edition)' book, pg. 60
	// erichlof/THREE.js-PathTracing-Renderer/
	float tentFilter( float x ) {

		return x < 0.5 ? sqrt( 2.0 * x ) - 1.0 : 1.0 - sqrt( 2.0 - ( 2.0 * x ) );

	}
`,yt=`

	// https://www.shadertoy.com/view/wltcRS
	uvec4 WHITE_NOISE_SEED;

	void rng_initialize( vec2 p, int frame ) {

		// white noise seed
		WHITE_NOISE_SEED = uvec4( p, uint( frame ), uint( p.x ) + uint( p.y ) );

	}

	// https://www.pcg-random.org/
	void pcg4d( inout uvec4 v ) {

		v = v * 1664525u + 1013904223u;
		v.x += v.y * v.w;
		v.y += v.z * v.x;
		v.z += v.x * v.y;
		v.w += v.y * v.z;
		v = v ^ ( v >> 16u );
		v.x += v.y*v.w;
		v.y += v.z*v.x;
		v.z += v.x*v.y;
		v.w += v.y*v.z;

	}

	// returns [ 0, 1 ]
	float pcgRand() {

		pcg4d( WHITE_NOISE_SEED );
		return float( WHITE_NOISE_SEED.x ) / float( 0xffffffffu );

	}

	vec2 pcgRand2() {

		pcg4d( WHITE_NOISE_SEED );
		return vec2( WHITE_NOISE_SEED.xy ) / float(0xffffffffu);

	}

	vec3 pcgRand3() {

		pcg4d( WHITE_NOISE_SEED );
		return vec3( WHITE_NOISE_SEED.xyz ) / float( 0xffffffffu );

	}

	vec4 pcgRand4() {

		pcg4d( WHITE_NOISE_SEED );
		return vec4( WHITE_NOISE_SEED ) / float( 0xffffffffu );

	}
`,fi=`

	uniform sampler2D stratifiedTexture;
	uniform sampler2D stratifiedOffsetTexture;

	uint sobolPixelIndex = 0u;
	uint sobolPathIndex = 0u;
	uint sobolBounceIndex = 0u;
	vec4 pixelSeed = vec4( 0 );

	vec4 rand4( int v ) {

		ivec2 uv = ivec2( v, sobolBounceIndex );
		vec4 stratifiedSample = texelFetch( stratifiedTexture, uv, 0 );
		return fract( stratifiedSample + pixelSeed.r ); // blue noise + stratified samples

	}

	vec3 rand3( int v ) {

		return rand4( v ).xyz;

	}

	vec2 rand2( int v ) {

		return rand4( v ).xy;

	}

	float rand( int v ) {

		return rand4( v ).x;

	}

	void rng_initialize( vec2 screenCoord, int frame ) {

		// tile the small noise texture across the entire screen
		ivec2 noiseSize = ivec2( textureSize( stratifiedOffsetTexture, 0 ) );
		ivec2 pixel = ivec2( screenCoord.xy ) % noiseSize;
		vec2 pixelWidth = 1.0 / vec2( noiseSize );
		vec2 uv = vec2( pixel ) * pixelWidth + pixelWidth * 0.5;

		// note that using "texelFetch" here seems to break Android for some reason
		pixelSeed = texture( stratifiedOffsetTexture, uv );

	}

`,hi=`

	// diffuse
	float diffuseEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		// https://schuttejoe.github.io/post/disneybsdf/
		float fl = schlickFresnel( wi.z, 0.0 );
		float fv = schlickFresnel( wo.z, 0.0 );

		float metalFactor = ( 1.0 - surf.metalness );
		float transFactor = ( 1.0 - surf.transmission );
		float rr = 0.5 + 2.0 * surf.roughness * fl * fl;
		float retro = rr * ( fl + fv + fl * fv * ( rr - 1.0f ) );
		float lambert = ( 1.0f - 0.5f * fl ) * ( 1.0f - 0.5f * fv );

		// TODO: subsurface approx?

		// float F = evaluateFresnelWeight( dot( wo, wh ), surf.eta, surf.f0 );
		float F = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );
		color = ( 1.0 - F ) * transFactor * metalFactor * wi.z * surf.color * ( retro + lambert ) / PI;

		return wi.z / PI;

	}

	vec3 diffuseDirection( vec3 wo, SurfaceRecord surf ) {

		vec3 lightDirection = sampleSphere( rand2( 11 ) );
		lightDirection.z += 1.0;
		lightDirection = normalize( lightDirection );

		return lightDirection;

	}

	// specular
	float specularEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		// if roughness is set to 0 then D === NaN which results in black pixels
		float metalness = surf.metalness;
		float roughness = surf.filteredRoughness;

		float eta = surf.eta;
		float f0 = surf.f0;

		vec3 f0Color = mix( f0 * surf.specularColor * surf.specularIntensity, surf.color, surf.metalness );
		vec3 f90Color = vec3( mix( surf.specularIntensity, 1.0, surf.metalness ) );
		vec3 F = evaluateFresnel( dot( wo, wh ), eta, f0Color, f90Color );

		vec3 iridescenceF = evalIridescence( 1.0, surf.iridescenceIor, dot( wi, wh ), surf.iridescenceThickness, f0Color );
		F = mix( F, iridescenceF,  surf.iridescence );

		// PDF
		// See 14.1.1 Microfacet BxDFs in https://www.pbr-book.org/
		float incidentTheta = acos( wo.z );
		float G = ggxShadowMaskG2( wi, wo, roughness );
		float D = ggxDistribution( wh, roughness );
		float G1 = ggxShadowMaskG1( incidentTheta, roughness );
		float ggxPdf = D * G1 * max( 0.0, abs( dot( wo, wh ) ) ) / abs ( wo.z );

		color = wi.z * F * G * D / ( 4.0 * abs( wi.z * wo.z ) );
		return ggxPdf / ( 4.0 * dot( wo, wh ) );

	}

	vec3 specularDirection( vec3 wo, SurfaceRecord surf ) {

		// sample ggx vndf distribution which gives a new normal
		float roughness = surf.filteredRoughness;
		vec3 halfVector = ggxDirection(
			wo,
			vec2( roughness ),
			rand2( 12 )
		);

		// apply to new ray by reflecting off the new normal
		return - reflect( wo, halfVector );

	}


	// transmission
	/*
	float transmissionEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		// See section 4.2 in https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf

		float filteredRoughness = surf.filteredRoughness;
		float eta = surf.eta;
		bool frontFace = surf.frontFace;
		bool thinFilm = surf.thinFilm;

		color = surf.transmission * surf.color;

		float denom = pow( eta * dot( wi, wh ) + dot( wo, wh ), 2.0 );
		return ggxPDF( wo, wh, filteredRoughness ) / denom;

	}

	vec3 transmissionDirection( vec3 wo, SurfaceRecord surf ) {

		float filteredRoughness = surf.filteredRoughness;
		float eta = surf.eta;
		bool frontFace = surf.frontFace;

		// sample ggx vndf distribution which gives a new normal
		vec3 halfVector = ggxDirection(
			wo,
			vec2( filteredRoughness ),
			rand2( 13 )
		);

		vec3 lightDirection = refract( normalize( - wo ), halfVector, eta );
		if ( surf.thinFilm ) {

			lightDirection = - refract( normalize( - lightDirection ), - vec3( 0.0, 0.0, 1.0 ), 1.0 / eta );

		}

		return normalize( lightDirection );

	}
	*/

	// TODO: This is just using a basic cosine-weighted specular distribution with an
	// incorrect PDF value at the moment. Update it to correctly use a GGX distribution
	float transmissionEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		color = surf.transmission * surf.color;

		// PDF
		// float F = evaluateFresnelWeight( dot( wo, wh ), surf.eta, surf.f0 );
		// float F = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );
		// if ( F >= 1.0 ) {

		// 	return 0.0;

		// }

		// return 1.0 / ( 1.0 - F );

		// reverted to previous to transmission. The above was causing black pixels
		float eta = surf.eta;
		float f0 = surf.f0;
		float cosTheta = min( wo.z, 1.0 );
		float sinTheta = sqrt( 1.0 - cosTheta * cosTheta );
		float reflectance = schlickFresnel( cosTheta, f0 );
		bool cannotRefract = eta * sinTheta > 1.0;
		if ( cannotRefract ) {

			return 0.0;

		}

		return 1.0 / ( 1.0 - reflectance );

	}

	vec3 transmissionDirection( vec3 wo, SurfaceRecord surf ) {

		float roughness = surf.filteredRoughness;
		float eta = surf.eta;
		vec3 halfVector = normalize( vec3( 0.0, 0.0, 1.0 ) + sampleSphere( rand2( 13 ) ) * roughness );
		vec3 lightDirection = refract( normalize( - wo ), halfVector, eta );

		if ( surf.thinFilm ) {

			lightDirection = - refract( normalize( - lightDirection ), - vec3( 0.0, 0.0, 1.0 ), 1.0 / eta );

		}
		return normalize( lightDirection );

	}

	// clearcoat
	float clearcoatEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		float ior = 1.5;
		float f0 = iorRatioToF0( ior );
		bool frontFace = surf.frontFace;
		float roughness = surf.filteredClearcoatRoughness;

		float eta = frontFace ? 1.0 / ior : ior;
		float G = ggxShadowMaskG2( wi, wo, roughness );
		float D = ggxDistribution( wh, roughness );
		float F = schlickFresnel( dot( wi, wh ), f0 );

		float fClearcoat = F * D * G / ( 4.0 * abs( wi.z * wo.z ) );
		color = color * ( 1.0 - surf.clearcoat * F ) + fClearcoat * surf.clearcoat * wi.z;

		// PDF
		// See equation (27) in http://jcgt.org/published/0003/02/03/
		return ggxPDF( wo, wh, roughness ) / ( 4.0 * dot( wi, wh ) );

	}

	vec3 clearcoatDirection( vec3 wo, SurfaceRecord surf ) {

		// sample ggx vndf distribution which gives a new normal
		float roughness = surf.filteredClearcoatRoughness;
		vec3 halfVector = ggxDirection(
			wo,
			vec2( roughness ),
			rand2( 14 )
		);

		// apply to new ray by reflecting off the new normal
		return - reflect( wo, halfVector );

	}

	// sheen
	vec3 sheenColor( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf ) {

		float cosThetaO = saturateCos( wo.z );
		float cosThetaI = saturateCos( wi.z );
		float cosThetaH = wh.z;

		float D = velvetD( cosThetaH, surf.sheenRoughness );
		float G = velvetG( cosThetaO, cosThetaI, surf.sheenRoughness );

		// See equation (1) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
		vec3 color = surf.sheenColor;
		color *= D * G / ( 4.0 * abs( cosThetaO * cosThetaI ) );
		color *= wi.z;

		return color;

	}

	// bsdf
	void getLobeWeights(
		vec3 wo, vec3 wi, vec3 wh, vec3 clearcoatWo, SurfaceRecord surf,
		inout float diffuseWeight, inout float specularWeight, inout float transmissionWeight, inout float clearcoatWeight
	) {

		float metalness = surf.metalness;
		float transmission = surf.transmission;
		// float fEstimate = evaluateFresnelWeight( dot( wo, wh ), surf.eta, surf.f0 );
		float fEstimate = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );

		float transSpecularProb = mix( max( 0.25, fEstimate ), 1.0, metalness );
		float diffSpecularProb = 0.5 + 0.5 * metalness;

		diffuseWeight = ( 1.0 - transmission ) * ( 1.0 - diffSpecularProb );
		specularWeight = transmission * transSpecularProb + ( 1.0 - transmission ) * diffSpecularProb;
		transmissionWeight = transmission * ( 1.0 - transSpecularProb );
		clearcoatWeight = surf.clearcoat * schlickFresnel( clearcoatWo.z, 0.04 );

		float totalWeight = diffuseWeight + specularWeight + transmissionWeight + clearcoatWeight;
		diffuseWeight /= totalWeight;
		specularWeight /= totalWeight;
		transmissionWeight /= totalWeight;
		clearcoatWeight /= totalWeight;
	}

	float bsdfEval(
		vec3 wo, vec3 clearcoatWo, vec3 wi, vec3 clearcoatWi, SurfaceRecord surf,
		float diffuseWeight, float specularWeight, float transmissionWeight, float clearcoatWeight, inout float specularPdf, inout vec3 color
	) {

		float metalness = surf.metalness;
		float transmission = surf.transmission;

		float spdf = 0.0;
		float dpdf = 0.0;
		float tpdf = 0.0;
		float cpdf = 0.0;
		color = vec3( 0.0 );

		vec3 halfVector = getHalfVector( wi, wo, surf.eta );

		// diffuse
		if ( diffuseWeight > 0.0 && wi.z > 0.0 ) {

			dpdf = diffuseEval( wo, wi, halfVector, surf, color );
			color *= 1.0 - surf.transmission;

		}

		// ggx specular
		if ( specularWeight > 0.0 && wi.z > 0.0 ) {

			vec3 outColor;
			spdf = specularEval( wo, wi, getHalfVector( wi, wo ), surf, outColor );
			color += outColor;

		}

		// transmission
		if ( transmissionWeight > 0.0 && wi.z < 0.0 ) {

			tpdf = transmissionEval( wo, wi, halfVector, surf, color );

		}

		// sheen
		color *= mix( 1.0, sheenAlbedoScaling( wo, wi, surf ), surf.sheen );
		color += sheenColor( wo, wi, halfVector, surf ) * surf.sheen;

		// clearcoat
		if ( clearcoatWi.z >= 0.0 && clearcoatWeight > 0.0 ) {

			vec3 clearcoatHalfVector = getHalfVector( clearcoatWo, clearcoatWi );
			cpdf = clearcoatEval( clearcoatWo, clearcoatWi, clearcoatHalfVector, surf, color );

		}

		float pdf =
			dpdf * diffuseWeight
			+ spdf * specularWeight
			+ tpdf * transmissionWeight
			+ cpdf * clearcoatWeight;

		// retrieve specular rays for the shadows flag
		specularPdf = spdf * specularWeight + cpdf * clearcoatWeight;

		return pdf;

	}

	float bsdfResult( vec3 worldWo, vec3 worldWi, SurfaceRecord surf, inout vec3 color ) {

		if ( surf.volumeParticle ) {

			color = surf.color / ( 4.0 * PI );
			return 1.0 / ( 4.0 * PI );

		}

		vec3 wo = normalize( surf.normalInvBasis * worldWo );
		vec3 wi = normalize( surf.normalInvBasis * worldWi );

		vec3 clearcoatWo = normalize( surf.clearcoatInvBasis * worldWo );
		vec3 clearcoatWi = normalize( surf.clearcoatInvBasis * worldWi );

		vec3 wh = getHalfVector( wo, wi, surf.eta );
		float diffuseWeight;
		float specularWeight;
		float transmissionWeight;
		float clearcoatWeight;
		getLobeWeights( wo, wi, wh, clearcoatWo, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight );

		float specularPdf;
		return bsdfEval( wo, clearcoatWo, wi, clearcoatWi, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight, specularPdf, color );

	}

	ScatterRecord bsdfSample( vec3 worldWo, SurfaceRecord surf ) {

		if ( surf.volumeParticle ) {

			ScatterRecord sampleRec;
			sampleRec.specularPdf = 0.0;
			sampleRec.pdf = 1.0 / ( 4.0 * PI );
			sampleRec.direction = sampleSphere( rand2( 16 ) );
			sampleRec.color = surf.color / ( 4.0 * PI );
			return sampleRec;

		}

		vec3 wo = normalize( surf.normalInvBasis * worldWo );
		vec3 clearcoatWo = normalize( surf.clearcoatInvBasis * worldWo );
		mat3 normalBasis = surf.normalBasis;
		mat3 invBasis = surf.normalInvBasis;
		mat3 clearcoatNormalBasis = surf.clearcoatBasis;
		mat3 clearcoatInvBasis = surf.clearcoatInvBasis;

		float diffuseWeight;
		float specularWeight;
		float transmissionWeight;
		float clearcoatWeight;
		// using normal and basically-reflected ray since we don't have proper half vector here
		getLobeWeights( wo, wo, vec3( 0, 0, 1 ), clearcoatWo, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight );

		float pdf[4];
		pdf[0] = diffuseWeight;
		pdf[1] = specularWeight;
		pdf[2] = transmissionWeight;
		pdf[3] = clearcoatWeight;

		float cdf[4];
		cdf[0] = pdf[0];
		cdf[1] = pdf[1] + cdf[0];
		cdf[2] = pdf[2] + cdf[1];
		cdf[3] = pdf[3] + cdf[2];

		if( cdf[3] != 0.0 ) {

			float invMaxCdf = 1.0 / cdf[3];
			cdf[0] *= invMaxCdf;
			cdf[1] *= invMaxCdf;
			cdf[2] *= invMaxCdf;
			cdf[3] *= invMaxCdf;

		} else {

			cdf[0] = 1.0;
			cdf[1] = 0.0;
			cdf[2] = 0.0;
			cdf[3] = 0.0;

		}

		vec3 wi;
		vec3 clearcoatWi;

		float r = rand( 15 );
		if ( r <= cdf[0] ) { // diffuse

			wi = diffuseDirection( wo, surf );
			clearcoatWi = normalize( clearcoatInvBasis * normalize( normalBasis * wi ) );

		} else if ( r <= cdf[1] ) { // specular

			wi = specularDirection( wo, surf );
			clearcoatWi = normalize( clearcoatInvBasis * normalize( normalBasis * wi ) );

		} else if ( r <= cdf[2] ) { // transmission / refraction

			wi = transmissionDirection( wo, surf );
			clearcoatWi = normalize( clearcoatInvBasis * normalize( normalBasis * wi ) );

		} else if ( r <= cdf[3] ) { // clearcoat

			clearcoatWi = clearcoatDirection( clearcoatWo, surf );
			wi = normalize( invBasis * normalize( clearcoatNormalBasis * clearcoatWi ) );

		}

		ScatterRecord result;
		result.pdf = bsdfEval( wo, clearcoatWo, wi, clearcoatWi, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight, result.specularPdf, result.color );
		result.direction = normalize( surf.normalBasis * wi );

		return result;

	}

`,di=`

	// returns the hit distance given the material density
	float intersectFogVolume( Material material, float u ) {

		// https://raytracing.github.io/books/RayTracingTheNextWeek.html#volumes/constantdensitymediums
		return material.opacity == 0.0 ? INFINITY : ( - 1.0 / material.opacity ) * log( u );

	}

	ScatterRecord sampleFogVolume( SurfaceRecord surf, vec2 uv ) {

		ScatterRecord sampleRec;
		sampleRec.specularPdf = 0.0;
		sampleRec.pdf = 1.0 / ( 2.0 * PI );
		sampleRec.direction = sampleSphere( uv );
		sampleRec.color = surf.color;
		return sampleRec;

	}

`,mi=`

	// The GGX functions provide sampling and distribution information for normals as output so
	// in order to get probability of scatter direction the half vector must be computed and provided.
	// [0] https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf
	// [1] https://hal.archives-ouvertes.fr/hal-01509746/document
	// [2] http://jcgt.org/published/0007/04/01/
	// [4] http://jcgt.org/published/0003/02/03/

	// trowbridge-reitz === GGX === GTR

	vec3 ggxDirection( vec3 incidentDir, vec2 roughness, vec2 uv ) {

		// TODO: try GGXVNDF implementation from reference [2], here. Needs to update ggxDistribution
		// function below, as well

		// Implementation from reference [1]
		// stretch view
		vec3 V = normalize( vec3( roughness * incidentDir.xy, incidentDir.z ) );

		// orthonormal basis
		vec3 T1 = ( V.z < 0.9999 ) ? normalize( cross( V, vec3( 0.0, 0.0, 1.0 ) ) ) : vec3( 1.0, 0.0, 0.0 );
		vec3 T2 = cross( T1, V );

		// sample point with polar coordinates (r, phi)
		float a = 1.0 / ( 1.0 + V.z );
		float r = sqrt( uv.x );
		float phi = ( uv.y < a ) ? uv.y / a * PI : PI + ( uv.y - a ) / ( 1.0 - a ) * PI;
		float P1 = r * cos( phi );
		float P2 = r * sin( phi ) * ( ( uv.y < a ) ? 1.0 : V.z );

		// compute normal
		vec3 N = P1 * T1 + P2 * T2 + V * sqrt( max( 0.0, 1.0 - P1 * P1 - P2 * P2 ) );

		// unstretch
		N = normalize( vec3( roughness * N.xy, max( 0.0, N.z ) ) );

		return N;

	}

	// Below are PDF and related functions for use in a Monte Carlo path tracer
	// as specified in Appendix B of the following paper
	// See equation (34) from reference [0]
	float ggxLamda( float theta, float roughness ) {

		float tanTheta = tan( theta );
		float tanTheta2 = tanTheta * tanTheta;
		float alpha2 = roughness * roughness;

		float numerator = - 1.0 + sqrt( 1.0 + alpha2 * tanTheta2 );
		return numerator / 2.0;

	}

	// See equation (34) from reference [0]
	float ggxShadowMaskG1( float theta, float roughness ) {

		return 1.0 / ( 1.0 + ggxLamda( theta, roughness ) );

	}

	// See equation (125) from reference [4]
	float ggxShadowMaskG2( vec3 wi, vec3 wo, float roughness ) {

		float incidentTheta = acos( wi.z );
		float scatterTheta = acos( wo.z );
		return 1.0 / ( 1.0 + ggxLamda( incidentTheta, roughness ) + ggxLamda( scatterTheta, roughness ) );

	}

	// See equation (33) from reference [0]
	float ggxDistribution( vec3 halfVector, float roughness ) {

		float a2 = roughness * roughness;
		a2 = max( EPSILON, a2 );
		float cosTheta = halfVector.z;
		float cosTheta4 = pow( cosTheta, 4.0 );

		if ( cosTheta == 0.0 ) return 0.0;

		float theta = acosSafe( halfVector.z );
		float tanTheta = tan( theta );
		float tanTheta2 = pow( tanTheta, 2.0 );

		float denom = PI * cosTheta4 * pow( a2 + tanTheta2, 2.0 );
		return ( a2 / denom );

	}

	// See equation (3) from reference [2]
	float ggxPDF( vec3 wi, vec3 halfVector, float roughness ) {

		float incidentTheta = acos( wi.z );
		float D = ggxDistribution( halfVector, roughness );
		float G1 = ggxShadowMaskG1( incidentTheta, roughness );

		return D * G1 * max( 0.0, dot( wi, halfVector ) ) / wi.z;

	}

`,pi=`

	// XYZ to sRGB color space
	const mat3 XYZ_TO_REC709 = mat3(
		3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);

	vec3 fresnel0ToIor( vec3 fresnel0 ) {

		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );

	}

	// Conversion FO/IOR
	vec3 iorToFresnel0( vec3 transmittedIor, float incidentIor ) {

		return square( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );

	}

	// ior is a value between 1.0 and 3.0. 1.0 is air interface
	float iorToFresnel0( float transmittedIor, float incidentIor ) {

		return square( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ) );

	}

	// Fresnel equations for dielectric/dielectric interfaces. See https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html
	vec3 evalSensitivity( float OPD, vec3 shift ) {

		float phase = 2.0 * PI * OPD * 1.0e-9;

		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );

		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - square( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * square( phase ) );
		xyz /= 1.0685e-7;

		vec3 srgb = XYZ_TO_REC709 * xyz;
		return srgb;

	}

	// See Section 4. Analytic Spectral Integration, A Practical Extension to Microfacet Theory for the Modeling of Varying Iridescence, https://hal.archives-ouvertes.fr/hal-01518344/document
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {

		vec3 I;

		// Force iridescenceIor -> outsideIOR when thinFilmThickness -> 0.0
		float iridescenceIor = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );

		// Evaluate the cosTheta on the base layer (Snell law)
		float sinTheta2Sq = square( outsideIOR / iridescenceIor ) * ( 1.0 - square( cosTheta1 ) );

		// Handle TIR:
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {

			return vec3( 1.0 );

		}

		float cosTheta2 = sqrt( cosTheta2Sq );

		// First interface
		float R0 = iorToFresnel0( iridescenceIor, outsideIOR );
		float R12 = schlickFresnel( cosTheta1, R0 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIor < outsideIOR ) {

			phi12 = PI;

		}

		float phi21 = PI - phi12;

		// Second interface
		vec3 baseIOR = fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) ); // guard against 1.0
		vec3 R1 = iorToFresnel0( baseIOR, iridescenceIor );
		vec3 R23 = schlickFresnel( cosTheta2, R1 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[0] < iridescenceIor ) {

			phi23[ 0 ] = PI;

		}

		if ( baseIOR[1] < iridescenceIor ) {

			phi23[ 1 ] = PI;

		}

		if ( baseIOR[2] < iridescenceIor ) {

			phi23[ 2 ] = PI;

		}

		// Phase shift
		float OPD = 2.0 * iridescenceIor * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;

		// Compound terms
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = square( T121 ) * R23 / ( vec3( 1.0 ) - R123 );

		// Reflectance term for m = 0 (DC term amplitude)
		vec3 C0 = R12 + Rs;
		I = C0;

		// Reflectance term for m > 0 (pairs of diracs)
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {

			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;

		}

		// Since out of gamut colors might be produced, negative color values are clamped to 0.
		return max( I, vec3( 0.0 ) );

	}

`,gi=`

	// See equation (2) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float velvetD( float cosThetaH, float roughness ) {

		float alpha = max( roughness, 0.07 );
		alpha = alpha * alpha;

		float invAlpha = 1.0 / alpha;

		float sqrCosThetaH = cosThetaH * cosThetaH;
		float sinThetaH = max( 1.0 - sqrCosThetaH, 0.001 );

		return ( 2.0 + invAlpha ) * pow( sinThetaH, 0.5 * invAlpha ) / ( 2.0 * PI );

	}

	float velvetParamsInterpolate( int i, float oneMinusAlphaSquared ) {

		const float p0[5] = float[5]( 25.3245, 3.32435, 0.16801, -1.27393, -4.85967 );
		const float p1[5] = float[5]( 21.5473, 3.82987, 0.19823, -1.97760, -4.32054 );

		return mix( p1[i], p0[i], oneMinusAlphaSquared );

	}

	float velvetL( float x, float alpha ) {

		float oneMinusAlpha = 1.0 - alpha;
		float oneMinusAlphaSquared = oneMinusAlpha * oneMinusAlpha;

		float a = velvetParamsInterpolate( 0, oneMinusAlphaSquared );
		float b = velvetParamsInterpolate( 1, oneMinusAlphaSquared );
		float c = velvetParamsInterpolate( 2, oneMinusAlphaSquared );
		float d = velvetParamsInterpolate( 3, oneMinusAlphaSquared );
		float e = velvetParamsInterpolate( 4, oneMinusAlphaSquared );

		return a / ( 1.0 + b * pow( abs( x ), c ) ) + d * x + e;

	}

	// See equation (3) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float velvetLambda( float cosTheta, float alpha ) {

		return abs( cosTheta ) < 0.5 ? exp( velvetL( cosTheta, alpha ) ) : exp( 2.0 * velvetL( 0.5, alpha ) - velvetL( 1.0 - cosTheta, alpha ) );

	}

	// See Section 3, Shadowing Term, in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float velvetG( float cosThetaO, float cosThetaI, float roughness ) {

		float alpha = max( roughness, 0.07 );
		alpha = alpha * alpha;

		return 1.0 / ( 1.0 + velvetLambda( cosThetaO, alpha ) + velvetLambda( cosThetaI, alpha ) );

	}

	float directionalAlbedoSheen( float cosTheta, float alpha ) {

		cosTheta = saturate( cosTheta );

		float c = 1.0 - cosTheta;
		float c3 = c * c * c;

		return 0.65584461 * c3 + 1.0 / ( 4.16526551 + exp( -7.97291361 * sqrt( alpha ) + 6.33516894 ) );

	}

	float sheenAlbedoScaling( vec3 wo, vec3 wi, SurfaceRecord surf ) {

		float alpha = max( surf.sheenRoughness, 0.07 );
		alpha = alpha * alpha;

		float maxSheenColor = max( max( surf.sheenColor.r, surf.sheenColor.g ), surf.sheenColor.b );

		float eWo = directionalAlbedoSheen( saturateCos( wo.z ), alpha );
		float eWi = directionalAlbedoSheen( saturateCos( wi.z ), alpha );

		return min( 1.0 - maxSheenColor * eWo, 1.0 - maxSheenColor * eWi );

	}

	// See Section 5, Layering, in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float sheenAlbedoScaling( vec3 wo, SurfaceRecord surf ) {

		float alpha = max( surf.sheenRoughness, 0.07 );
		alpha = alpha * alpha;

		float maxSheenColor = max( max( surf.sheenColor.r, surf.sheenColor.g ), surf.sheenColor.b );

		float eWo = directionalAlbedoSheen( saturateCos( wo.z ), alpha );

		return 1.0 - maxSheenColor * eWo;

	}

`,vi=`

#ifndef FOG_CHECK_ITERATIONS
#define FOG_CHECK_ITERATIONS 30
#endif

// returns whether the given material is a fog material or not
bool isMaterialFogVolume( sampler2D materials, uint materialIndex ) {

	uint i = materialIndex * uint( MATERIAL_PIXELS );
	vec4 s14 = texelFetch1D( materials, i + 14u );
	return bool( int( s14.b ) & 4 );

}

// returns true if we're within the first fog volume we hit
bool bvhIntersectFogVolumeHit(
	vec3 rayOrigin, vec3 rayDirection,
	usampler2D materialIndexAttribute, sampler2D materials,
	inout Material material
) {

	material.fogVolume = false;

	for ( int i = 0; i < FOG_CHECK_ITERATIONS; i ++ ) {

		// find nearest hit
		uvec4 faceIndices = uvec4( 0u );
		vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
		vec3 barycoord = vec3( 0.0 );
		float side = 1.0;
		float dist = 0.0;
		bool hit = bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );
		if ( hit ) {

			// if it's a fog volume return whether we hit the front or back face
			uint materialIndex = uTexelFetch1D( materialIndexAttribute, faceIndices.x ).r;
			if ( isMaterialFogVolume( materials, materialIndex ) ) {

				material = readMaterialInfo( materials, materialIndex );
				return side == - 1.0;

			} else {

				// move the ray forward
				rayOrigin = stepRayOrigin( rayOrigin, rayDirection, - faceNormal, dist );

			}

		} else {

			return false;

		}

	}

	return false;

}

`,xi=`

	// step through multiple surface hits and accumulate color attenuation based on transmissive surfaces
	// returns true if a solid surface was hit
	bool attenuateHit(
		RenderState state,
		Ray ray, float rayDist,
		out vec3 color
	) {

		// store the original bounce index so we can reset it after
		uint originalBounceIndex = sobolBounceIndex;

		int traversals = state.traversals;
		int transmissiveTraversals = state.transmissiveTraversals;
		bool isShadowRay = state.isShadowRay;
		Material fogMaterial = state.fogMaterial;

		vec3 startPoint = ray.origin;

		// hit results
		SurfaceHit surfaceHit;

		color = vec3( 1.0 );

		bool result = true;
		for ( int i = 0; i < traversals; i ++ ) {

			sobolBounceIndex ++;

			int hitType = traceScene( ray, fogMaterial, surfaceHit );

			if ( hitType == FOG_HIT ) {

				result = true;
				break;

			} else if ( hitType == SURFACE_HIT ) {

				float totalDist = distance( startPoint, ray.origin + ray.direction * surfaceHit.dist );
				if ( totalDist > rayDist ) {

					result = false;
					break;

				}

				// TODO: attenuate the contribution based on the PDF of the resulting ray including refraction values
				// Should be able to work using the material BSDF functions which will take into account specularity, etc.
				// TODO: should we account for emissive surfaces here?

				uint materialIndex = uTexelFetch1D( materialIndexAttribute, surfaceHit.faceIndices.x ).r;
				Material material = readMaterialInfo( materials, materialIndex );

				// adjust the ray to the new surface
				bool isEntering = surfaceHit.side == 1.0;
				ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );

				#if FEATURE_FOG

				if ( material.fogVolume ) {

					fogMaterial = material;
					fogMaterial.fogVolume = surfaceHit.side == 1.0;
					i -= sign( transmissiveTraversals );
					transmissiveTraversals --;
					continue;

				}

				#endif

				if ( ! material.castShadow && isShadowRay ) {

					continue;

				}

				vec2 uv = textureSampleBarycoord( attributesArray, ATTR_UV, surfaceHit.barycoord, surfaceHit.faceIndices.xyz ).xy;
				vec4 vertexColor = textureSampleBarycoord( attributesArray, ATTR_COLOR, surfaceHit.barycoord, surfaceHit.faceIndices.xyz );

				// albedo
				vec4 albedo = vec4( material.color, material.opacity );
				if ( material.map != - 1 ) {

					vec3 uvPrime = material.mapTransform * vec3( uv, 1 );
					albedo *= texture2D( textures, vec3( uvPrime.xy, material.map ) );

				}

				if ( material.vertexColors ) {

					albedo *= vertexColor;

				}

				// alphaMap
				if ( material.alphaMap != - 1 ) {

					vec3 uvPrime = material.alphaMapTransform * vec3( uv, 1 );
					albedo.a *= texture2D( textures, vec3( uvPrime.xy, material.alphaMap ) ).x;

				}

				// transmission
				float transmission = material.transmission;
				if ( material.transmissionMap != - 1 ) {

					vec3 uvPrime = material.transmissionMapTransform * vec3( uv, 1 );
					transmission *= texture2D( textures, vec3( uvPrime.xy, material.transmissionMap ) ).r;

				}

				// metalness
				float metalness = material.metalness;
				if ( material.metalnessMap != - 1 ) {

					vec3 uvPrime = material.metalnessMapTransform * vec3( uv, 1 );
					metalness *= texture2D( textures, vec3( uvPrime.xy, material.metalnessMap ) ).b;

				}

				float alphaTest = material.alphaTest;
				bool useAlphaTest = alphaTest != 0.0;
				float transmissionFactor = ( 1.0 - metalness ) * transmission;
				if (
					transmissionFactor < rand( 9 ) && ! (
						// material sidedness
						material.side != 0.0 && surfaceHit.side == material.side

						// alpha test
						|| useAlphaTest && albedo.a < alphaTest

						// opacity
						|| material.transparent && ! useAlphaTest && albedo.a < rand( 10 )
					)
				) {

					result = true;
					break;

				}

				if ( surfaceHit.side == 1.0 && isEntering ) {

					// only attenuate by surface color on the way in
					color *= mix( vec3( 1.0 ), albedo.rgb, transmissionFactor );

				} else if ( surfaceHit.side == - 1.0 ) {

					// attenuate by medium once we hit the opposite side of the model
					color *= transmissionAttenuation( surfaceHit.dist, material.attenuationColor, material.attenuationDistance );

				}

				bool isTransmissiveRay = dot( ray.direction, surfaceHit.faceNormal * surfaceHit.side ) < 0.0;
				if ( ( isTransmissiveRay || isEntering ) && transmissiveTraversals > 0 ) {

					i -= sign( transmissiveTraversals );
					transmissiveTraversals --;

				}

			} else {

				result = false;
				break;

			}

		}

		// reset the bounce index
		sobolBounceIndex = originalBounceIndex;
		return result;

	}

`,yi=`

	vec3 ndcToRayOrigin( vec2 coord ) {

		vec4 rayOrigin4 = cameraWorldMatrix * invProjectionMatrix * vec4( coord, - 1.0, 1.0 );
		return rayOrigin4.xyz / rayOrigin4.w;
	}

	Ray getCameraRay() {

		vec2 ssd = vec2( 1.0 ) / resolution;

		// Jitter the camera ray by finding a uv coordinate at a random sample
		// around this pixel's UV coordinate for AA
		vec2 ruv = rand2( 0 );
		vec2 jitteredUv = vUv + vec2( tentFilter( ruv.x ) * ssd.x, tentFilter( ruv.y ) * ssd.y );
		Ray ray;

		#if CAMERA_TYPE == 2

			// Equirectangular projection
			vec4 rayDirection4 = vec4( equirectUvToDirection( jitteredUv ), 0.0 );
			vec4 rayOrigin4 = vec4( 0.0, 0.0, 0.0, 1.0 );

			rayDirection4 = cameraWorldMatrix * rayDirection4;
			rayOrigin4 = cameraWorldMatrix * rayOrigin4;

			ray.direction = normalize( rayDirection4.xyz );
			ray.origin = rayOrigin4.xyz / rayOrigin4.w;

		#else

			// get [- 1, 1] normalized device coordinates
			vec2 ndc = 2.0 * jitteredUv - vec2( 1.0 );
			ray.origin = ndcToRayOrigin( ndc );

			#if CAMERA_TYPE == 1

				// Orthographic projection
				ray.direction = ( cameraWorldMatrix * vec4( 0.0, 0.0, - 1.0, 0.0 ) ).xyz;
				ray.direction = normalize( ray.direction );

			#else

				// Perspective projection
				ray.direction = normalize( mat3( cameraWorldMatrix ) * ( invProjectionMatrix * vec4( ndc, 0.0, 1.0 ) ).xyz );

			#endif

		#endif

		#if FEATURE_DOF
		{

			// depth of field
			vec3 focalPoint = ray.origin + normalize( ray.direction ) * physicalCamera.focusDistance;

			// get the aperture sample
			// if blades === 0 then we assume a circle
			vec3 shapeUVW= rand3( 1 );
			int blades = physicalCamera.apertureBlades;
			float anamorphicRatio = physicalCamera.anamorphicRatio;
			vec2 apertureSample = sampleAperture( blades, shapeUVW );
			apertureSample *= physicalCamera.bokehSize * 0.5 * 1e-3;

			// rotate the aperture shape
			apertureSample =
				rotateVector( apertureSample, physicalCamera.apertureRotation ) *
				saturate( vec2( anamorphicRatio, 1.0 / anamorphicRatio ) );

			// create the new ray
			ray.origin += ( cameraWorldMatrix * vec4( apertureSample, 0.0, 0.0 ) ).xyz;
			ray.direction = focalPoint - ray.origin;

		}
		#endif

		ray.direction = normalize( ray.direction );

		return ray;

	}

`,bi=`

	vec3 directLightContribution( vec3 worldWo, SurfaceRecord surf, RenderState state, vec3 rayOrigin ) {

		vec3 result = vec3( 0.0 );

		// uniformly pick a light or environment map
		if( lightsDenom != 0.0 && rand( 5 ) < float( lights.count ) / lightsDenom ) {

			// sample a light or environment
			LightRecord lightRec = randomLightSample( lights.tex, iesProfiles, lights.count, rayOrigin, rand3( 6 ) );

			bool isSampleBelowSurface = ! surf.volumeParticle && dot( surf.faceNormal, lightRec.direction ) < 0.0;
			if ( isSampleBelowSurface ) {

				lightRec.pdf = 0.0;

			}

			// check if a ray could even reach the light area
			Ray lightRay;
			lightRay.origin = rayOrigin;
			lightRay.direction = lightRec.direction;
			vec3 attenuatedColor;
			if (
				lightRec.pdf > 0.0 &&
				isDirectionValid( lightRec.direction, surf.normal, surf.faceNormal ) &&
				! attenuateHit( state, lightRay, lightRec.dist, attenuatedColor )
			) {

				// get the material pdf
				vec3 sampleColor;
				float lightMaterialPdf = bsdfResult( worldWo, lightRec.direction, surf, sampleColor );
				bool isValidSampleColor = all( greaterThanEqual( sampleColor, vec3( 0.0 ) ) );
				if ( lightMaterialPdf > 0.0 && isValidSampleColor ) {

					// weight the direct light contribution
					float lightPdf = lightRec.pdf / lightsDenom;
					float misWeight = lightRec.type == SPOT_LIGHT_TYPE || lightRec.type == DIR_LIGHT_TYPE || lightRec.type == POINT_LIGHT_TYPE ? 1.0 : misHeuristic( lightPdf, lightMaterialPdf );
					result = attenuatedColor * lightRec.emission * state.throughputColor * sampleColor * misWeight / lightPdf;

				}

			}

		} else if ( envMapInfo.totalSum != 0.0 && environmentIntensity != 0.0 ) {

			// find a sample in the environment map to include in the contribution
			vec3 envColor, envDirection;
			float envPdf = sampleEquirectProbability( rand2( 7 ), envColor, envDirection );
			envDirection = invEnvRotation3x3 * envDirection;

			// this env sampling is not set up for transmissive sampling and yields overly bright
			// results so we ignore the sample in this case.
			// TODO: this should be improved but how? The env samples could traverse a few layers?
			bool isSampleBelowSurface = ! surf.volumeParticle && dot( surf.faceNormal, envDirection ) < 0.0;
			if ( isSampleBelowSurface ) {

				envPdf = 0.0;

			}

			// check if a ray could even reach the surface
			Ray envRay;
			envRay.origin = rayOrigin;
			envRay.direction = envDirection;
			vec3 attenuatedColor;
			if (
				envPdf > 0.0 &&
				isDirectionValid( envDirection, surf.normal, surf.faceNormal ) &&
				! attenuateHit( state, envRay, INFINITY, attenuatedColor )
			) {

				// get the material pdf
				vec3 sampleColor;
				float envMaterialPdf = bsdfResult( worldWo, envDirection, surf, sampleColor );
				bool isValidSampleColor = all( greaterThanEqual( sampleColor, vec3( 0.0 ) ) );
				if ( envMaterialPdf > 0.0 && isValidSampleColor ) {

					// weight the direct light contribution
					envPdf /= lightsDenom;
					float misWeight = misHeuristic( envPdf, envMaterialPdf );
					result = attenuatedColor * environmentIntensity * envColor * state.throughputColor * sampleColor * misWeight / envPdf;

				}

			}

		}

		// Function changed to have a single return statement to potentially help with crashes on Mac OS.
		// See issue #470
		return result;

	}

`,Ti=`

	#define SKIP_SURFACE 0
	#define HIT_SURFACE 1
	int getSurfaceRecord(
		Material material, SurfaceHit surfaceHit, sampler2DArray attributesArray,
		float accumulatedRoughness,
		inout SurfaceRecord surf
	) {

		if ( material.fogVolume ) {

			vec3 normal = vec3( 0, 0, 1 );

			SurfaceRecord fogSurface;
			fogSurface.volumeParticle = true;
			fogSurface.color = material.color;
			fogSurface.emission = material.emissiveIntensity * material.emissive;
			fogSurface.normal = normal;
			fogSurface.faceNormal = normal;
			fogSurface.clearcoatNormal = normal;

			surf = fogSurface;
			return HIT_SURFACE;

		}

		// uv coord for textures
		vec2 uv = textureSampleBarycoord( attributesArray, ATTR_UV, surfaceHit.barycoord, surfaceHit.faceIndices.xyz ).xy;
		vec4 vertexColor = textureSampleBarycoord( attributesArray, ATTR_COLOR, surfaceHit.barycoord, surfaceHit.faceIndices.xyz );

		// albedo
		vec4 albedo = vec4( material.color, material.opacity );
		if ( material.map != - 1 ) {

			vec3 uvPrime = material.mapTransform * vec3( uv, 1 );
			albedo *= texture2D( textures, vec3( uvPrime.xy, material.map ) );

		}

		if ( material.vertexColors ) {

			albedo *= vertexColor;

		}

		// alphaMap
		if ( material.alphaMap != - 1 ) {

			vec3 uvPrime = material.alphaMapTransform * vec3( uv, 1 );
			albedo.a *= texture2D( textures, vec3( uvPrime.xy, material.alphaMap ) ).x;

		}

		// possibly skip this sample if it's transparent, alpha test is enabled, or we hit the wrong material side
		// and it's single sided.
		// - alpha test is disabled when it === 0
		// - the material sidedness test is complicated because we want light to pass through the back side but still
		// be able to see the front side. This boolean checks if the side we hit is the front side on the first ray
		// and we're rendering the other then we skip it. Do the opposite on subsequent bounces to get incoming light.
		float alphaTest = material.alphaTest;
		bool useAlphaTest = alphaTest != 0.0;
		if (
			// material sidedness
			material.side != 0.0 && surfaceHit.side != material.side

			// alpha test
			|| useAlphaTest && albedo.a < alphaTest

			// opacity
			|| material.transparent && ! useAlphaTest && albedo.a < rand( 3 )
		) {

			return SKIP_SURFACE;

		}

		// fetch the interpolated smooth normal
		vec3 normal = normalize( textureSampleBarycoord(
			attributesArray,
			ATTR_NORMAL,
			surfaceHit.barycoord,
			surfaceHit.faceIndices.xyz
		).xyz );

		// roughness
		float roughness = material.roughness;
		if ( material.roughnessMap != - 1 ) {

			vec3 uvPrime = material.roughnessMapTransform * vec3( uv, 1 );
			roughness *= texture2D( textures, vec3( uvPrime.xy, material.roughnessMap ) ).g;

		}

		// metalness
		float metalness = material.metalness;
		if ( material.metalnessMap != - 1 ) {

			vec3 uvPrime = material.metalnessMapTransform * vec3( uv, 1 );
			metalness *= texture2D( textures, vec3( uvPrime.xy, material.metalnessMap ) ).b;

		}

		// emission
		vec3 emission = material.emissiveIntensity * material.emissive;
		if ( material.emissiveMap != - 1 ) {

			vec3 uvPrime = material.emissiveMapTransform * vec3( uv, 1 );
			emission *= texture2D( textures, vec3( uvPrime.xy, material.emissiveMap ) ).xyz;

		}

		// transmission
		float transmission = material.transmission;
		if ( material.transmissionMap != - 1 ) {

			vec3 uvPrime = material.transmissionMapTransform * vec3( uv, 1 );
			transmission *= texture2D( textures, vec3( uvPrime.xy, material.transmissionMap ) ).r;

		}

		// normal
		if ( material.flatShading ) {

			// if we're rendering a flat shaded object then use the face normals - the face normal
			// is provided based on the side the ray hits the mesh so flip it to align with the
			// interpolated vertex normals.
			normal = surfaceHit.faceNormal * surfaceHit.side;

		}

		vec3 baseNormal = normal;
		if ( material.normalMap != - 1 ) {

			vec4 tangentSample = textureSampleBarycoord(
				attributesArray,
				ATTR_TANGENT,
				surfaceHit.barycoord,
				surfaceHit.faceIndices.xyz
			);

			// some provided tangents can be malformed (0, 0, 0) causing the normal to be degenerate
			// resulting in NaNs and slow path tracing.
			if ( length( tangentSample.xyz ) > 0.0 ) {

				vec3 tangent = normalize( tangentSample.xyz );
				vec3 bitangent = normalize( cross( normal, tangent ) * tangentSample.w );
				mat3 vTBN = mat3( tangent, bitangent, normal );

				vec3 uvPrime = material.normalMapTransform * vec3( uv, 1 );
				vec3 texNormal = texture2D( textures, vec3( uvPrime.xy, material.normalMap ) ).xyz * 2.0 - 1.0;
				texNormal.xy *= material.normalScale;
				normal = vTBN * texNormal;

			}

		}

		normal *= surfaceHit.side;

		// clearcoat
		float clearcoat = material.clearcoat;
		if ( material.clearcoatMap != - 1 ) {

			vec3 uvPrime = material.clearcoatMapTransform * vec3( uv, 1 );
			clearcoat *= texture2D( textures, vec3( uvPrime.xy, material.clearcoatMap ) ).r;

		}

		// clearcoatRoughness
		float clearcoatRoughness = material.clearcoatRoughness;
		if ( material.clearcoatRoughnessMap != - 1 ) {

			vec3 uvPrime = material.clearcoatRoughnessMapTransform * vec3( uv, 1 );
			clearcoatRoughness *= texture2D( textures, vec3( uvPrime.xy, material.clearcoatRoughnessMap ) ).g;

		}

		// clearcoatNormal
		vec3 clearcoatNormal = baseNormal;
		if ( material.clearcoatNormalMap != - 1 ) {

			vec4 tangentSample = textureSampleBarycoord(
				attributesArray,
				ATTR_TANGENT,
				surfaceHit.barycoord,
				surfaceHit.faceIndices.xyz
			);

			// some provided tangents can be malformed (0, 0, 0) causing the normal to be degenerate
			// resulting in NaNs and slow path tracing.
			if ( length( tangentSample.xyz ) > 0.0 ) {

				vec3 tangent = normalize( tangentSample.xyz );
				vec3 bitangent = normalize( cross( clearcoatNormal, tangent ) * tangentSample.w );
				mat3 vTBN = mat3( tangent, bitangent, clearcoatNormal );

				vec3 uvPrime = material.clearcoatNormalMapTransform * vec3( uv, 1 );
				vec3 texNormal = texture2D( textures, vec3( uvPrime.xy, material.clearcoatNormalMap ) ).xyz * 2.0 - 1.0;
				texNormal.xy *= material.clearcoatNormalScale;
				clearcoatNormal = vTBN * texNormal;

			}

		}

		clearcoatNormal *= surfaceHit.side;

		// sheenColor
		vec3 sheenColor = material.sheenColor;
		if ( material.sheenColorMap != - 1 ) {

			vec3 uvPrime = material.sheenColorMapTransform * vec3( uv, 1 );
			sheenColor *= texture2D( textures, vec3( uvPrime.xy, material.sheenColorMap ) ).rgb;

		}

		// sheenRoughness
		float sheenRoughness = material.sheenRoughness;
		if ( material.sheenRoughnessMap != - 1 ) {

			vec3 uvPrime = material.sheenRoughnessMapTransform * vec3( uv, 1 );
			sheenRoughness *= texture2D( textures, vec3( uvPrime.xy, material.sheenRoughnessMap ) ).a;

		}

		// iridescence
		float iridescence = material.iridescence;
		if ( material.iridescenceMap != - 1 ) {

			vec3 uvPrime = material.iridescenceMapTransform * vec3( uv, 1 );
			iridescence *= texture2D( textures, vec3( uvPrime.xy, material.iridescenceMap ) ).r;

		}

		// iridescence thickness
		float iridescenceThickness = material.iridescenceThicknessMaximum;
		if ( material.iridescenceThicknessMap != - 1 ) {

			vec3 uvPrime = material.iridescenceThicknessMapTransform * vec3( uv, 1 );
			float iridescenceThicknessSampled = texture2D( textures, vec3( uvPrime.xy, material.iridescenceThicknessMap ) ).g;
			iridescenceThickness = mix( material.iridescenceThicknessMinimum, material.iridescenceThicknessMaximum, iridescenceThicknessSampled );

		}

		iridescence = iridescenceThickness == 0.0 ? 0.0 : iridescence;

		// specular color
		vec3 specularColor = material.specularColor;
		if ( material.specularColorMap != - 1 ) {

			vec3 uvPrime = material.specularColorMapTransform * vec3( uv, 1 );
			specularColor *= texture2D( textures, vec3( uvPrime.xy, material.specularColorMap ) ).rgb;

		}

		// specular intensity
		float specularIntensity = material.specularIntensity;
		if ( material.specularIntensityMap != - 1 ) {

			vec3 uvPrime = material.specularIntensityMapTransform * vec3( uv, 1 );
			specularIntensity *= texture2D( textures, vec3( uvPrime.xy, material.specularIntensityMap ) ).a;

		}

		surf.volumeParticle = false;

		surf.faceNormal = surfaceHit.faceNormal;
		surf.normal = normal;

		surf.metalness = metalness;
		surf.color = albedo.rgb;
		surf.emission = emission;

		surf.ior = material.ior;
		surf.transmission = transmission;
		surf.thinFilm = material.thinFilm;
		surf.attenuationColor = material.attenuationColor;
		surf.attenuationDistance = material.attenuationDistance;

		surf.clearcoatNormal = clearcoatNormal;
		surf.clearcoat = clearcoat;

		surf.sheen = material.sheen;
		surf.sheenColor = sheenColor;

		surf.iridescence = iridescence;
		surf.iridescenceIor = material.iridescenceIor;
		surf.iridescenceThickness = iridescenceThickness;

		surf.specularColor = specularColor;
		surf.specularIntensity = specularIntensity;

		// apply perceptual roughness factor from gltf. sheen perceptual roughness is
		// applied by its brdf function
		// https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#microfacet-surfaces
		surf.roughness = roughness * roughness;
		surf.clearcoatRoughness = clearcoatRoughness * clearcoatRoughness;
		surf.sheenRoughness = sheenRoughness;

		// frontFace is used to determine transmissive properties and PDF. If no transmission is used
		// then we can just always assume this is a front face.
		surf.frontFace = surfaceHit.side == 1.0 || transmission == 0.0;
		surf.eta = material.thinFilm || surf.frontFace ? 1.0 / material.ior : material.ior;
		surf.f0 = iorRatioToF0( surf.eta );

		// Compute the filtered roughness value to use during specular reflection computations.
		// The accumulated roughness value is scaled by a user setting and a "magic value" of 5.0.
		// If we're exiting something transmissive then scale the factor down significantly so we can retain
		// sharp internal reflections
		surf.filteredRoughness = applyFilteredGlossy( surf.roughness, accumulatedRoughness );
		surf.filteredClearcoatRoughness = applyFilteredGlossy( surf.clearcoatRoughness, accumulatedRoughness );

		// get the normal frames
		surf.normalBasis = getBasisFromNormal( surf.normal );
		surf.normalInvBasis = inverse( surf.normalBasis );

		surf.clearcoatBasis = getBasisFromNormal( surf.clearcoatNormal );
		surf.clearcoatInvBasis = inverse( surf.clearcoatBasis );

		return HIT_SURFACE;

	}
`,wi=`

	struct Ray {

		vec3 origin;
		vec3 direction;

	};

	struct SurfaceHit {

		uvec4 faceIndices;
		vec3 barycoord;
		vec3 faceNormal;
		float side;
		float dist;

	};

	struct RenderState {

		bool firstRay;
		bool transmissiveRay;
		bool isShadowRay;
		float accumulatedRoughness;
		int transmissiveTraversals;
		int traversals;
		uint depth;
		vec3 throughputColor;
		Material fogMaterial;

	};

	RenderState initRenderState() {

		RenderState result;
		result.firstRay = true;
		result.transmissiveRay = true;
		result.isShadowRay = false;
		result.accumulatedRoughness = 0.0;
		result.transmissiveTraversals = 0;
		result.traversals = 0;
		result.throughputColor = vec3( 1.0 );
		result.depth = 0u;
		result.fogMaterial.fogVolume = false;
		return result;

	}

`,Si=`

	#define NO_HIT 0
	#define SURFACE_HIT 1
	#define LIGHT_HIT 2
	#define FOG_HIT 3

	// Passing the global variable 'lights' into this function caused shader program errors.
	// So global variables like 'lights' and 'bvh' were moved out of the function parameters.
	// For more information, refer to: https://github.com/gkjohnson/three-gpu-pathtracer/pull/457
	int traceScene(
		Ray ray, Material fogMaterial, inout SurfaceHit surfaceHit
	) {

		int result = NO_HIT;
		bool hit = bvhIntersectFirstHit( bvh, ray.origin, ray.direction, surfaceHit.faceIndices, surfaceHit.faceNormal, surfaceHit.barycoord, surfaceHit.side, surfaceHit.dist );

		#if FEATURE_FOG

		if ( fogMaterial.fogVolume ) {

			// offset the distance so we don't run into issues with particles on the same surface
			// as other objects
			float particleDist = intersectFogVolume( fogMaterial, rand( 1 ) );
			if ( particleDist + RAY_OFFSET < surfaceHit.dist ) {

				surfaceHit.side = 1.0;
				surfaceHit.faceNormal = normalize( - ray.direction );
				surfaceHit.dist = particleDist;
				return FOG_HIT;

			}

		}

		#endif

		if ( hit ) {

			result = SURFACE_HIT;

		}

		return result;

	}

`;class Mi extends qe{onBeforeRender(){this.setDefine("FEATURE_DOF",this.physicalCamera.bokehSize===0?0:1),this.setDefine("FEATURE_BACKGROUND_MAP",this.backgroundMap?1:0),this.setDefine("FEATURE_FOG",this.materials.features.isUsed("FOG")?1:0)}constructor(e){super({transparent:!0,depthWrite:!1,defines:{FEATURE_MIS:1,FEATURE_RUSSIAN_ROULETTE:1,FEATURE_DOF:1,FEATURE_BACKGROUND_MAP:0,FEATURE_FOG:1,RANDOM_TYPE:2,CAMERA_TYPE:0,DEBUG_MODE:0,ATTR_NORMAL:0,ATTR_TANGENT:1,ATTR_UV:2,ATTR_COLOR:3,MATERIAL_PIXELS:Ye},uniforms:{resolution:{value:new V},opacity:{value:1},bounces:{value:10},transmissiveBounces:{value:10},filterGlossyFactor:{value:0},physicalCamera:{value:new br},cameraWorldMatrix:{value:new Y},invProjectionMatrix:{value:new Y},bvh:{value:new Ua},attributesArray:{value:new Pr},materialIndexAttribute:{value:new Ht},materials:{value:new Nr},textures:{value:new vt().texture},lights:{value:new Fr},iesProfiles:{value:new vt(360,180,{type:W,wrapS:X,wrapT:X}).texture},environmentIntensity:{value:1},environmentRotation:{value:new Y},envMapInfo:{value:new Sr},backgroundBlur:{value:0},backgroundMap:{value:null},backgroundAlpha:{value:1},backgroundIntensity:{value:1},backgroundRotation:{value:new Y},seed:{value:0},sobolTexture:{value:null},stratifiedTexture:{value:new qr},stratifiedOffsetTexture:{value:new Zr(64,1)}},vertexShader:`

				varying vec2 vUv;
				void main() {

					vec4 mvPosition = vec4( position, 1.0 );
					mvPosition = modelViewMatrix * mvPosition;
					gl_Position = projectionMatrix * mvPosition;

					vUv = uv;

				}

			`,fragmentShader:`
				#define RAY_OFFSET 1e-4
				#define INFINITY 1e20

				precision highp isampler2D;
				precision highp usampler2D;
				precision highp sampler2DArray;
				vec4 envMapTexelToLinear( vec4 a ) { return a; }
				#include <common>

				// bvh intersection
				${qa}
				${Ya}
				${$a}

				// uniform structs
				${Jr}
				${ti}
				${ei}
				${ai}
				${ri}

				// random
				#if RANDOM_TYPE == 2 	// Stratified List

					${fi}

				#elif RANDOM_TYPE == 1 	// Sobol

					${yt}
					${Gt}
					${gr}

					#define rand(v) sobol(v)
					#define rand2(v) sobol2(v)
					#define rand3(v) sobol3(v)
					#define rand4(v) sobol4(v)

				#else 					// PCG

				${yt}

					// Using the sobol functions seems to break the the compiler on MacOS
					// - specifically the "sobolReverseBits" function.
					uint sobolPixelIndex = 0u;
					uint sobolPathIndex = 0u;
					uint sobolBounceIndex = 0u;

					#define rand(v) pcgRand()
					#define rand2(v) pcgRand2()
					#define rand3(v) pcgRand3()
					#define rand4(v) pcgRand4()

				#endif

				// common
				${ui}
				${ni}
				${Vt}
				${li}
				${ci}

				// environment
				uniform EquirectHdrInfo envMapInfo;
				uniform mat4 environmentRotation;
				uniform float environmentIntensity;

				// lighting
				uniform sampler2DArray iesProfiles;
				uniform LightsInfo lights;

				// background
				uniform float backgroundBlur;
				uniform float backgroundAlpha;
				#if FEATURE_BACKGROUND_MAP

				uniform sampler2D backgroundMap;
				uniform mat4 backgroundRotation;
				uniform float backgroundIntensity;

				#endif

				// camera
				uniform mat4 cameraWorldMatrix;
				uniform mat4 invProjectionMatrix;
				#if FEATURE_DOF

				uniform PhysicalCamera physicalCamera;

				#endif

				// geometry
				uniform sampler2DArray attributesArray;
				uniform usampler2D materialIndexAttribute;
				uniform sampler2D materials;
				uniform sampler2DArray textures;
				uniform BVH bvh;

				// path tracer
				uniform int bounces;
				uniform int transmissiveBounces;
				uniform float filterGlossyFactor;
				uniform int seed;

				// image
				uniform vec2 resolution;
				uniform float opacity;

				varying vec2 vUv;

				// globals
				mat3 envRotation3x3;
				mat3 invEnvRotation3x3;
				float lightsDenom;

				// sampling
				${oi}
				${ii}
				${si}

				${vi}
				${mi}
				${gi}
				${pi}
				${di}
				${hi}

				float applyFilteredGlossy( float roughness, float accumulatedRoughness ) {

					return clamp(
						max(
							roughness,
							accumulatedRoughness * filterGlossyFactor * 5.0 ),
						0.0,
						1.0
					);

				}

				vec3 sampleBackground( vec3 direction, vec2 uv ) {

					vec3 sampleDir = sampleHemisphere( direction, uv ) * 0.5 * backgroundBlur;

					#if FEATURE_BACKGROUND_MAP

					sampleDir = normalize( mat3( backgroundRotation ) * direction + sampleDir );
					return backgroundIntensity * sampleEquirectColor( backgroundMap, sampleDir );

					#else

					sampleDir = normalize( envRotation3x3 * direction + sampleDir );
					return environmentIntensity * sampleEquirectColor( envMapInfo.map, sampleDir );

					#endif

				}

				${wi}
				${yi}
				${Si}
				${xi}
				${bi}
				${Ti}

				void main() {

					// init
					rng_initialize( gl_FragCoord.xy, seed );
					sobolPixelIndex = ( uint( gl_FragCoord.x ) << 16 ) | uint( gl_FragCoord.y );
					sobolPathIndex = uint( seed );

					// get camera ray
					Ray ray = getCameraRay();

					// inverse environment rotation
					envRotation3x3 = mat3( environmentRotation );
					invEnvRotation3x3 = inverse( envRotation3x3 );
					lightsDenom =
						( environmentIntensity == 0.0 || envMapInfo.totalSum == 0.0 ) && lights.count != 0u ?
							float( lights.count ) :
							float( lights.count + 1u );

					// final color
					gl_FragColor = vec4( 0, 0, 0, 1 );

					// surface results
					SurfaceHit surfaceHit;
					ScatterRecord scatterRec;

					// path tracing state
					RenderState state = initRenderState();
					state.transmissiveTraversals = transmissiveBounces;
					#if FEATURE_FOG

					state.fogMaterial.fogVolume = bvhIntersectFogVolumeHit(
						ray.origin, - ray.direction,
						materialIndexAttribute, materials,
						state.fogMaterial
					);

					#endif

					for ( int i = 0; i < bounces; i ++ ) {

						sobolBounceIndex ++;

						state.depth ++;
						state.traversals = bounces - i;
						state.firstRay = i == 0 && state.transmissiveTraversals == transmissiveBounces;

						int hitType = traceScene( ray, state.fogMaterial, surfaceHit );

						// check if we intersect any lights and accumulate the light contribution
						// TODO: we can add support for light surface rendering in the else condition if we
						// add the ability to toggle visibility of the the light
						if ( ! state.firstRay && ! state.transmissiveRay ) {

							LightRecord lightRec;
							float lightDist = hitType == NO_HIT ? INFINITY : surfaceHit.dist;
							for ( uint i = 0u; i < lights.count; i ++ ) {

								if (
									intersectLightAtIndex( lights.tex, ray.origin, ray.direction, i, lightRec ) &&
									lightRec.dist < lightDist
								) {

									#if FEATURE_MIS

									// weight the contribution
									// NOTE: Only area lights are supported for forward sampling and can be hit
									float misWeight = misHeuristic( scatterRec.pdf, lightRec.pdf / lightsDenom );
									gl_FragColor.rgb += lightRec.emission * state.throughputColor * misWeight;

									#else

									gl_FragColor.rgb += lightRec.emission * state.throughputColor;

									#endif

								}

							}

						}

						if ( hitType == NO_HIT ) {

							if ( state.firstRay || state.transmissiveRay ) {

								gl_FragColor.rgb += sampleBackground( ray.direction, rand2( 2 ) ) * state.throughputColor;
								gl_FragColor.a = backgroundAlpha;

							} else {

								#if FEATURE_MIS

								// get the PDF of the hit envmap point
								vec3 envColor;
								float envPdf = sampleEquirect( envRotation3x3 * ray.direction, envColor );
								envPdf /= lightsDenom;

								// and weight the contribution
								float misWeight = misHeuristic( scatterRec.pdf, envPdf );
								gl_FragColor.rgb += environmentIntensity * envColor * state.throughputColor * misWeight;

								#else

								gl_FragColor.rgb +=
									environmentIntensity *
									sampleEquirectColor( envMapInfo.map, envRotation3x3 * ray.direction ) *
									state.throughputColor;

								#endif

							}
							break;

						}

						uint materialIndex = uTexelFetch1D( materialIndexAttribute, surfaceHit.faceIndices.x ).r;
						Material material = readMaterialInfo( materials, materialIndex );

						#if FEATURE_FOG

						if ( hitType == FOG_HIT ) {

							material = state.fogMaterial;
							state.accumulatedRoughness += 0.2;

						} else if ( material.fogVolume ) {

							state.fogMaterial = material;
							state.fogMaterial.fogVolume = surfaceHit.side == 1.0;

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );

							i -= sign( state.transmissiveTraversals );
							state.transmissiveTraversals -= sign( state.transmissiveTraversals );
							continue;

						}

						#endif

						// early out if this is a matte material
						if ( material.matte && state.firstRay ) {

							gl_FragColor = vec4( 0.0 );
							break;

						}

						// if we've determined that this is a shadow ray and we've hit an item with no shadow casting
						// then skip it
						if ( ! material.castShadow && state.isShadowRay ) {

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );
							continue;

						}

						SurfaceRecord surf;
						if (
							getSurfaceRecord(
								material, surfaceHit, attributesArray, state.accumulatedRoughness,
								surf
							) == SKIP_SURFACE
						) {

							// only allow a limited number of transparency discards otherwise we could
							// crash the context with too long a loop.
							i -= sign( state.transmissiveTraversals );
							state.transmissiveTraversals -= sign( state.transmissiveTraversals );

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );
							continue;

						}

						scatterRec = bsdfSample( - ray.direction, surf );
						state.isShadowRay = scatterRec.specularPdf < rand( 4 );

						bool isBelowSurface = ! surf.volumeParticle && dot( scatterRec.direction, surf.faceNormal ) < 0.0;
						vec3 hitPoint = stepRayOrigin( ray.origin, ray.direction, isBelowSurface ? - surf.faceNormal : surf.faceNormal, surfaceHit.dist );

						// next event estimation
						#if FEATURE_MIS

						gl_FragColor.rgb += directLightContribution( - ray.direction, surf, state, hitPoint );

						#endif

						// accumulate a roughness value to offset diffuse, specular, diffuse rays that have high contribution
						// to a single pixel resulting in fireflies
						// TODO: handle transmissive surfaces
						if ( ! surf.volumeParticle && ! isBelowSurface ) {

							// determine if this is a rough normal or not by checking how far off straight up it is
							vec3 halfVector = normalize( - ray.direction + scatterRec.direction );
							state.accumulatedRoughness += max(
								sin( acosApprox( dot( halfVector, surf.normal ) ) ),
								sin( acosApprox( dot( halfVector, surf.clearcoatNormal ) ) )
							);

							state.transmissiveRay = false;

						}

						// accumulate emissive color
						gl_FragColor.rgb += ( surf.emission * state.throughputColor );

						// skip the sample if our PDF or ray is impossible
						if ( scatterRec.pdf <= 0.0 || ! isDirectionValid( scatterRec.direction, surf.normal, surf.faceNormal ) ) {

							break;

						}

						// if we're bouncing around the inside a transmissive material then decrement
						// perform this separate from a bounce
						bool isTransmissiveRay = ! surf.volumeParticle && dot( scatterRec.direction, surf.faceNormal * surfaceHit.side ) < 0.0;
						if ( ( isTransmissiveRay || isBelowSurface ) && state.transmissiveTraversals > 0 ) {

							state.transmissiveTraversals --;
							i --;

						}

						//

						// handle throughput color transformation
						// attenuate the throughput color by the medium color
						if ( ! surf.frontFace ) {

							state.throughputColor *= transmissionAttenuation( surfaceHit.dist, surf.attenuationColor, surf.attenuationDistance );

						}

						#if FEATURE_RUSSIAN_ROULETTE

						// russian roulette path termination
						// https://www.arnoldrenderer.com/research/physically_based_shader_design_in_arnold.pdf
						uint minBounces = 3u;
						float depthProb = float( state.depth < minBounces );

						float rrProb = luminance( state.throughputColor * scatterRec.color / scatterRec.pdf );
						rrProb /= luminance( state.throughputColor );
						rrProb = sqrt( rrProb );
						rrProb = max( rrProb, depthProb );
						rrProb = min( rrProb, 1.0 );
						if ( rand( 8 ) > rrProb ) {

							break;

						}

						// perform sample clamping here to avoid bright pixels
						state.throughputColor *= min( 1.0 / rrProb, 20.0 );

						#endif

						// adjust the throughput and discard and exit if we find discard the sample if there are any NaNs
						state.throughputColor *= scatterRec.color / scatterRec.pdf;
						if ( any( isnan( state.throughputColor ) ) || any( isinf( state.throughputColor ) ) ) {

							break;

						}

						//

						// prepare for next ray
						ray.direction = scatterRec.direction;
						ray.origin = hitPoint;

					}

					gl_FragColor.a *= opacity;

					#if DEBUG_MODE == 1

					// output the number of rays checked in the path and number of
					// transmissive rays encountered.
					gl_FragColor.rgb = vec3(
						float( state.depth ),
						transmissiveBounces - state.transmissiveTraversals,
						0.0
					);
					gl_FragColor.a = 1.0;

					#endif

				}

			`}),this.setValues(e)}}function*Ii(){const{_renderer:i,_fsQuad:e,_blendQuad:t,_primaryTarget:a,_blendTargets:o,_sobolTarget:s,_subframe:r,alpha:l,material:c}=this,h=new ne,d=new ne,f=t.material;let[n,g]=o;for(;;){l?(f.opacity=this._opacityFactor/(this.samples+1),c.blending=me,c.opacity=1):(c.opacity=this._opacityFactor/(this.samples+1),c.blending=Pt);const[p,x,u,v]=r,y=a.width,b=a.height;c.resolution.set(y*u,b*v),c.sobolTexture=s.texture,c.stratifiedTexture.init(20,c.bounces+c.transmissiveBounces+5),c.stratifiedTexture.next(),c.seed++;const S=this.tiles.x||1,M=this.tiles.y||1,I=S*M,O=Math.ceil(y*u),K=Math.ceil(b*v),ve=Math.floor(p*y),xe=Math.floor(x*b),j=Math.ceil(O/S),U=Math.ceil(K/M);for(let q=0;q<M;q++)for(let ye=0;ye<S;ye++){const Xe=i.getRenderTarget(),Yt=i.autoClear,Xt=i.getScissorTest();i.getScissor(h),i.getViewport(d);let Ce=ye,Ke=q;if(!this.stableTiles){const Fe=this._currentTile%(S*M);Ce=Fe%S,Ke=~~(Fe/S),this._currentTile=Fe+1}const Qe=M-Ke-1;a.scissor.set(ve+Ce*j,xe+Qe*U,Math.min(j,O-Ce*j),Math.min(U,K-Qe*U)),a.viewport.set(ve,xe,O,K),i.setRenderTarget(a),i.setScissorTest(!0),i.autoClear=!1,e.render(i),i.setViewport(d),i.setScissor(h),i.setScissorTest(Xt),i.setRenderTarget(Xe),i.autoClear=Yt,l&&(f.target1=n.texture,f.target2=a.texture,i.setRenderTarget(g),t.render(i),i.setRenderTarget(Xe)),this.samples+=1/I,ye===S-1&&q===M-1&&(this.samples=Math.round(this.samples)),yield}[n,g]=[g,n]}}const bt=new pe;class Tt{get material(){return this._fsQuad.material}set material(e){this._fsQuad.material.removeEventListener("recompilation",this._compileFunction),e.addEventListener("recompilation",this._compileFunction),this._fsQuad.material=e}get target(){return this._alpha?this._blendTargets[1]:this._primaryTarget}set alpha(e){this._alpha!==e&&(e||(this._blendTargets[0].dispose(),this._blendTargets[1].dispose()),this._alpha=e,this.reset())}get alpha(){return this._alpha}get isCompiling(){return!!this._compilePromise}constructor(e){this.camera=null,this.tiles=new V(3,3),this.stableNoise=!1,this.stableTiles=!0,this.samples=0,this._subframe=new ne(0,0,1,1),this._opacityFactor=1,this._renderer=e,this._alpha=!1,this._fsQuad=new le(new Mi),this._blendQuad=new le(new mr),this._task=null,this._currentTile=0,this._compilePromise=null,this._sobolTarget=new xr().generate(e),this._primaryTarget=new de(1,1,{format:A,type:C,magFilter:R,minFilter:R}),this._blendTargets=[new de(1,1,{format:A,type:C,magFilter:R,minFilter:R}),new de(1,1,{format:A,type:C,magFilter:R,minFilter:R})],this._compileFunction=()=>{const t=this.compileMaterial(this._fsQuad._mesh);t.then(()=>{this._compilePromise===t&&(this._compilePromise=null)}),this._compilePromise=t},this.material.addEventListener("recompilation",this._compileFunction)}compileMaterial(){return this._renderer.compileAsync(this._fsQuad._mesh)}setCamera(e){const{material:t}=this;t.cameraWorldMatrix.copy(e.matrixWorld),t.invProjectionMatrix.copy(e.projectionMatrixInverse),t.physicalCamera.updateFrom(e);let a=0;e.projectionMatrix.elements[15]>0&&(a=1),e.isEquirectCamera&&(a=2),t.setDefine("CAMERA_TYPE",a),this.camera=e}setSize(e,t){e=Math.ceil(e),t=Math.ceil(t),!(this._primaryTarget.width===e&&this._primaryTarget.height===t)&&(this._primaryTarget.setSize(e,t),this._blendTargets[0].setSize(e,t),this._blendTargets[1].setSize(e,t),this.reset())}getSize(e){e.x=this._primaryTarget.width,e.y=this._primaryTarget.height}dispose(){this._primaryTarget.dispose(),this._blendTargets[0].dispose(),this._blendTargets[1].dispose(),this._sobolTarget.dispose(),this._fsQuad.dispose(),this._blendQuad.dispose(),this._task=null}reset(){const{_renderer:e,_primaryTarget:t,_blendTargets:a}=this,o=e.getRenderTarget(),s=e.getClearAlpha();e.getClearColor(bt),e.setRenderTarget(t),e.setClearColor(0,0),e.clearColor(),e.setRenderTarget(a[0]),e.setClearColor(0,0),e.clearColor(),e.setRenderTarget(a[1]),e.setClearColor(0,0),e.clearColor(),e.setClearColor(bt,s),e.setRenderTarget(o),this.samples=0,this._task=null,this.material.stratifiedTexture.stableNoise=this.stableNoise,this.stableNoise&&(this.material.seed=0,this.material.stratifiedTexture.reset())}update(){this.material.onBeforeRender(),!this.isCompiling&&(this._task||(this._task=Ii.call(this)),this._task.next())}}const ee=new V,wt=new V,Me=new pa,Ie=new pe;class Ri extends k{constructor(e=512,t=512){super(new Float32Array(e*t*4),e,t,A,C,Et,L,X,N,N),this.generationCallback=null}update(){this.dispose(),this.needsUpdate=!0;const{data:e,width:t,height:a}=this.image;for(let o=0;o<t;o++)for(let s=0;s<a;s++){wt.set(t,a),ee.set(o/t,s/a),ee.x-=.5,ee.y=1-ee.y,Me.theta=ee.x*2*Math.PI,Me.phi=ee.y*Math.PI,Me.radius=1,this.generationCallback(Me,ee,wt,Ie);const l=4*(s*t+o);e[l+0]=Ie.r,e[l+1]=Ie.g,e[l+2]=Ie.b,e[l+3]=1}}copy(e){return super.copy(e),this.generationCallback=e.generationCallback,this}}const St=new _;class _i extends Ri{constructor(e=512){super(e,e),this.topColor=new pe().set(16777215),this.bottomColor=new pe().set(0),this.exponent=2,this.generationCallback=(t,a,o,s)=>{St.setFromSpherical(t);const r=St.y*.5+.5;s.lerpColors(this.bottomColor,this.topColor,r**this.exponent)}}copy(e){return super.copy(e),this.topColor.copy(e.topColor),this.bottomColor.copy(e.bottomColor),this}}class Ai extends _e{get map(){return this.uniforms.map.value}set map(e){this.uniforms.map.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}constructor(e){super({uniforms:{map:{value:null},opacity:{value:1}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D map;
				uniform float opacity;
				varying vec2 vUv;

				vec4 clampedTexelFatch( sampler2D map, ivec2 px, int lod ) {

					vec4 res = texelFetch( map, ivec2( px.x, px.y ), 0 );

					#if defined( TONE_MAPPING )

					res.xyz = toneMapping( res.xyz );

					#endif

			  		return linearToOutputTexel( res );

				}

				void main() {

					vec2 size = vec2( textureSize( map, 0 ) );
					vec2 pxUv = vUv * size;
					vec2 pxCurr = floor( pxUv );
					vec2 pxFrac = fract( pxUv ) - 0.5;
					vec2 pxOffset;
					pxOffset.x = pxFrac.x > 0.0 ? 1.0 : - 1.0;
					pxOffset.y = pxFrac.y > 0.0 ? 1.0 : - 1.0;

					vec2 pxNext = clamp( pxOffset + pxCurr, vec2( 0.0 ), size - 1.0 );
					vec2 alpha = abs( pxFrac );

					vec4 p1 = mix(
						clampedTexelFatch( map, ivec2( pxCurr.x, pxCurr.y ), 0 ),
						clampedTexelFatch( map, ivec2( pxNext.x, pxCurr.y ), 0 ),
						alpha.x
					);

					vec4 p2 = mix(
						clampedTexelFatch( map, ivec2( pxCurr.x, pxNext.y ), 0 ),
						clampedTexelFatch( map, ivec2( pxNext.x, pxNext.y ), 0 ),
						alpha.x
					);

					gl_FragColor = mix( p1, p2, alpha.y );
					gl_FragColor.a *= opacity;
					#include <premultiplied_alpha_fragment>

				}
			`}),this.setValues(e)}}class Ci extends _e{constructor(){super({uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`
				#define ENVMAP_TYPE_CUBE_UV

				uniform samplerCube envMap;
				uniform float flipEnvMap;
				varying vec2 vUv;

				#include <common>
				#include <cube_uv_reflection_fragment>

				${Vt}

				void main() {

					vec3 rayDirection = equirectUvToDirection( vUv );
					rayDirection.x *= flipEnvMap;
					gl_FragColor = textureCube( envMap, rayDirection );

				}`}),this.depthWrite=!1,this.depthTest=!1}}class Mt{constructor(e){this._renderer=e,this._quad=new le(new Ci)}generate(e,t=null,a=null){if(!e.isCubeTexture)throw new Error("CubeToEquirectMaterial: Source can only be cube textures.");const o=e.images[0],s=this._renderer,r=this._quad;t===null&&(t=4*o.height),a===null&&(a=2*o.height);const l=new de(t,a,{type:C,colorSpace:o.colorSpace}),c=o.height,h=Math.log2(c)-2,d=1/c,f=1/(3*Math.max(Math.pow(2,h),112));r.material.defines.CUBEUV_MAX_MIP=`${h}.0`,r.material.defines.CUBEUV_TEXEL_WIDTH=f,r.material.defines.CUBEUV_TEXEL_HEIGHT=d,r.material.uniforms.envMap.value=e,r.material.uniforms.flipEnvMap.value=e.isRenderTargetTexture?1:-1,r.material.needsUpdate=!0;const n=s.getRenderTarget(),g=s.autoClear;s.autoClear=!0,s.setRenderTarget(l),r.render(s),s.setRenderTarget(n),s.autoClear=g;const p=new Uint16Array(t*a*4),x=new Float32Array(t*a*4);s.readRenderTargetPixels(l,0,0,t,a,x),l.dispose();for(let v=0,y=x.length;v<y;v++)p[v]=G.toHalfFloat(x[v]);const u=new k(p,t,a,A,W);return u.minFilter=ga,u.magFilter=N,u.wrapS=L,u.wrapT=L,u.mapping=Et,u.needsUpdate=!0,u}dispose(){this._quad.dispose()}}function Fi(i){return i.extensions.get("EXT_float_blend")}const se=new V;class Di{get multipleImportanceSampling(){return!!this._pathTracer.material.defines.FEATURE_MIS}set multipleImportanceSampling(e){this._pathTracer.material.setDefine("FEATURE_MIS",e?1:0)}get transmissiveBounces(){return this._pathTracer.material.transmissiveBounces}set transmissiveBounces(e){this._pathTracer.material.transmissiveBounces=e}get bounces(){return this._pathTracer.material.bounces}set bounces(e){this._pathTracer.material.bounces=e}get filterGlossyFactor(){return this._pathTracer.material.filterGlossyFactor}set filterGlossyFactor(e){this._pathTracer.material.filterGlossyFactor=e}get samples(){return this._pathTracer.samples}get target(){return this._pathTracer.target}get tiles(){return this._pathTracer.tiles}get stableNoise(){return this._pathTracer.stableNoise}set stableNoise(e){this._pathTracer.stableNoise=e}get isCompiling(){return!!this._pathTracer.isCompiling}constructor(e){this._renderer=e,this._generator=new dr,this._pathTracer=new Tt(e),this._queueReset=!1,this._clock=new va,this._compilePromise=null,this._lowResPathTracer=new Tt(e),this._lowResPathTracer.tiles.set(1,1),this._quad=new le(new Ai({map:null,transparent:!0,blending:me,premultipliedAlpha:e.getContextAttributes().premultipliedAlpha})),this._materials=null,this._previousEnvironment=null,this._previousBackground=null,this._internalBackground=null,this.renderDelay=100,this.minSamples=5,this.fadeDuration=500,this.enablePathTracing=!0,this.pausePathTracing=!1,this.dynamicLowRes=!1,this.lowResScale=.25,this.renderScale=1,this.synchronizeRenderSize=!0,this.rasterizeScene=!0,this.renderToCanvas=!0,this.textureSize=new V(1024,1024),this.rasterizeSceneCallback=(t,a)=>{this._renderer.render(t,a)},this.renderToCanvasCallback=(t,a,o)=>{const s=a.autoClear;a.autoClear=!1,o.render(a),a.autoClear=s},this.setScene(new xa,new Ct)}setBVHWorker(e){this._generator.setBVHWorker(e)}setScene(e,t,a={}){e.updateMatrixWorld(!0),t.updateMatrixWorld();const o=this._generator;if(o.setObjects(e),this._buildAsync)return o.generateAsync(a.onProgress).then(s=>this._updateFromResults(e,t,s));{const s=o.generate();return this._updateFromResults(e,t,s)}}setSceneAsync(...e){this._buildAsync=!0;const t=this.setScene(...e);return this._buildAsync=!1,t}setCamera(e){this.camera=e,this.updateCamera()}updateCamera(){const e=this.camera;e.updateMatrixWorld(),this._pathTracer.setCamera(e),this._lowResPathTracer.setCamera(e),this.reset()}updateMaterials(){const e=this._pathTracer.material,t=this._renderer,a=this._materials,o=this.textureSize,s=Or(a);e.textures.setTextures(t,s,o.x,o.y),e.materials.updateFrom(a,s),this.reset()}updateLights(){const e=this.scene,t=this._renderer,a=this._pathTracer.material,o=zr(e),s=kr(o);a.lights.updateFrom(o,s),a.iesProfiles.setTextures(t,s),this.reset()}updateEnvironment(){const e=this.scene,t=this._pathTracer.material;if(this._internalBackground&&(this._internalBackground.dispose(),this._internalBackground=null),t.backgroundBlur=e.backgroundBlurriness,t.backgroundIntensity=e.backgroundIntensity??1,t.backgroundRotation.makeRotationFromEuler(e.backgroundRotation).invert(),e.background===null)t.backgroundMap=null,t.backgroundAlpha=0;else if(e.background.isColor){this._colorBackground=this._colorBackground||new _i(16);const a=this._colorBackground;a.topColor.equals(e.background)||(a.topColor.set(e.background),a.bottomColor.set(e.background),a.update()),t.backgroundMap=a,t.backgroundAlpha=1}else if(e.background.isCubeTexture){if(e.background!==this._previousBackground){const a=new Mt(this._renderer).generate(e.background);this._internalBackground=a,t.backgroundMap=a,t.backgroundAlpha=1}}else t.backgroundMap=e.background,t.backgroundAlpha=1;if(t.environmentIntensity=e.environment!==null?e.environmentIntensity??1:0,t.environmentRotation.makeRotationFromEuler(e.environmentRotation).invert(),this._previousEnvironment!==e.environment&&e.environment!==null)if(e.environment.isCubeTexture){const a=new Mt(this._renderer).generate(e.environment);t.envMapInfo.updateFrom(a)}else t.envMapInfo.updateFrom(e.environment);this._previousEnvironment=e.environment,this._previousBackground=e.background,this.reset()}_updateFromResults(e,t,a){const{materials:o,geometry:s,bvh:r,bvhChanged:l,needsMaterialIndexUpdate:c}=a;this._materials=o;const d=this._pathTracer.material;return l&&(d.bvh.updateFrom(r),d.attributesArray.updateFrom(s.attributes.normal,s.attributes.tangent,s.attributes.uv,s.attributes.color)),c&&d.materialIndexAttribute.updateFrom(s.attributes.materialIndex),this._previousScene=e,this.scene=e,this.camera=t,this.updateCamera(),this.updateMaterials(),this.updateEnvironment(),this.updateLights(),a}renderSample(){const e=this._lowResPathTracer,t=this._pathTracer,a=this._renderer,o=this._clock,s=this._quad;this._updateScale(),this._queueReset&&(t.reset(),e.reset(),this._queueReset=!1,s.material.opacity=0,o.start());const r=o.getDelta()*1e3,l=o.getElapsedTime()*1e3;if(!this.pausePathTracing&&this.enablePathTracing&&this.renderDelay<=l&&!this.isCompiling&&t.update(),t.alpha=t.material.backgroundAlpha!==1||!Fi(a),e.alpha=t.alpha,this.renderToCanvas){const c=this._renderer,h=this.minSamples;if(l>=this.renderDelay&&this.samples>=this.minSamples&&(this.fadeDuration!==0?s.material.opacity=Math.min(s.material.opacity+r/this.fadeDuration,1):s.material.opacity=1),!this.enablePathTracing||this.samples<h||s.material.opacity<1){if(this.dynamicLowRes&&!this.isCompiling){e.samples<1&&(e.material=t.material,e.update());const d=s.material.opacity;s.material.opacity=1-s.material.opacity,s.material.map=e.target.texture,s.render(c),s.material.opacity=d}(!this.dynamicLowRes&&this.rasterizeScene||this.dynamicLowRes&&this.isCompiling)&&this.rasterizeSceneCallback(this.scene,this.camera)}this.enablePathTracing&&s.material.opacity>0&&(s.material.opacity<1&&(s.material.blending=this.dynamicLowRes?kt:Pt),s.material.map=t.target.texture,this.renderToCanvasCallback(t.target,c,s),s.material.blending=me)}}reset(){this._queueReset=!0,this._pathTracer.samples=0}dispose(){this._quad.dispose(),this._quad.material.dispose(),this._pathTracer.dispose()}_updateScale(){if(this.synchronizeRenderSize){this._renderer.getDrawingBufferSize(se);const e=Math.floor(this.renderScale*se.x),t=Math.floor(this.renderScale*se.y);if(this._pathTracer.getSize(se),se.x!==e||se.y!==t){const a=this.lowResScale;this._pathTracer.setSize(e,t),this._lowResPathTracer.setSize(Math.floor(e*a),Math.floor(t*a))}}}}const P=2.25,ce=10.8,Pi=-2.15,Ei=10.5,te=64,qt=(Pi+Ei)/2,ki=.3,Ne=24,It=new _,$=new _;new _a;const He=new Map;function Oi(i){if(He.has(i))return He.get(i);const e=document.createElement("canvas");e.width=128,e.height=128;const t=e.getContext("2d");t.clearRect(0,0,128,128),t.fillStyle="#17191a",t.font="700 72px ui-sans-serif, system-ui, sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(String(i),64,68);const a=new Bt(e);return a.colorSpace=Ae,He.set(i,a),a}const zi=aa.getProject("Gravity Museum — ChatGPT",{state:{sheetsById:{},definitionVersion:"0.4.0",revisionHistory:[]}}),$t=zi.sheet("Exhibition collapse"),E=$t.object("Gallery chronology",{glideEnds:3.1,pulseAt:3.45,gravityAt:4.25,sidewaysAt:9.4,upwardAt:14.2,cycleEnds:20.5,cameraStartZ:21,cameraEndZ:13.5});je.prototype.raycast!==at&&(je.prototype.raycast=at);function T(i,e=1){const t=Math.sin(i*127.1+e*311.7)*43758.5453123;return t-Math.floor(t)}function Bi(i,e=3){const t=Math.round(i),a=[-40,-24,-12,-32,-7,-46,-18,-28];return Array.from({length:t},(o,s)=>{const r=s%5-2,l=Math.floor(s/5),c=.48+T(s,5)*.78;return{id:`artifact-${s}`,isLight:s<e,lightIndex:s<e?s:-1,type:s%12,material:[0,1,2,3,0,1,4,4,4,4,4,4][s%12],position:s<e?[P+(s%3-1)*4.3,1.2+s%2*4.4,a[s]]:[P+r*3.35+(T(s,8)-.5)*1.3,.5+T(s,11)*8.2,4-l*5.25-T(s,17)*2.5],rotation:[T(s,21)*Math.PI,T(s,22)*Math.PI,T(s,23)*Math.PI],scale:c,radius:Ni(s%6)}})}function Ni(i){return[1.2,1.05,1,1.35,1.18,1.25,1.05,1.05,1.05,1.08,1.08,1.05][i]??1.1}function ue(i,e,t=[3,3]){const a=document.createElement("canvas");a.width=512,a.height=512;const o=a.getContext("2d"),s=o.createLinearGradient(0,0,i==="metal"?0:512,512);if(e.forEach((l,c)=>s.addColorStop(c/(e.length-1),l)),o.fillStyle=s,o.fillRect(0,0,512,512),i==="wood")for(let l=0;l<38;l+=1){const c=l*14+T(l,404)*10;o.beginPath();for(let h=-20;h<=532;h+=8){const d=Math.sin(h*.025+l*.72)*(5+T(l,405)*8),f=Math.sin(h*.008-l)*4;h===-20?o.moveTo(h,c+d+f):o.lineTo(h,c+d+f)}o.strokeStyle=`rgba(48, 22, 8, ${.1+T(l,406)*.22})`,o.lineWidth=1+T(l,407)*3,o.stroke()}else if(i==="stone")for(let l=0;l<14;l+=1){o.beginPath();const c=T(l,511)*560-24;for(let h=-20;h<=532;h+=12){const d=c+h*(T(l,512)-.5)*.65+Math.sin(h*.025+l)*18;h===-20?o.moveTo(d,h):o.lineTo(d,h)}o.strokeStyle=`rgba(42, 46, 45, ${.08+T(l,513)*.18})`,o.lineWidth=2+T(l,514)*7,o.stroke()}else for(let l=0;l<92;l+=1){const c=T(l,601)*512,h=T(l,602)*180-40;o.strokeStyle=`rgba(255, 246, 222, ${.025+T(l,603)*.11})`,o.lineWidth=.5+T(l,604)*1.6,o.beginPath(),o.moveTo(h,c),o.lineTo(h+280+T(l,605)*260,c+(T(l,606)-.5)*2),o.stroke()}const r=new Bt(a);return r.colorSpace=Ae,r.wrapS=L,r.wrapT=L,r.repeat.set(...t),r.anisotropy=8,r}function Hi(){const i=w.useMemo(()=>{const e={ring:new Ma(.82,.16,12,42),cube:new Ee(1.55,1.55,1.55,2,2,2),sphere:new Je(1,2),knot:new Sa(.68,.16,72,9,2,3),shard:new et(1.1,1),stair:new Ee(1,1,1),d4:new wa(1.08,0),d6:new Ee(1.48,1.48,1.48),d8:new et(1.12,0),d10:new Ta(.78,.78,1.55,10,1),d12:new ba(1.08,0),d20:new Je(1.12,0)};Object.values(e).forEach(g=>{g.computeBoundingBox(),g.computeBoundingSphere(),Wa.call(g,{maxLeafTris:8})});const t=ue("metal",["#4b2c16","#a8783e","#5b351b"],[4,2]),a=ue("metal",["#4d5557","#aeb7b8","#626b6d"],[2,12]),o=ue("wood",["#3a1d0d","#8b542a","#4c2813"],[2,5]),s=ue("stone",["#4c504d","#96978f","#626661"],[3,3]),r=ue("stone",["#bdb5a6","#f0e6d1","#cbc0ab"],[2,2]),l=new z({map:t,bumpMap:t,bumpScale:.035,color:"#a98255",roughness:.23,metalness:.92,emissive:"#2b1406",emissiveIntensity:.12}),c=new Ia({color:"#79c8d8",roughness:.08,metalness:.06,transmission:.78,thickness:1.15,ior:1.36,transparent:!0,opacity:.84,side:Dt}),h=new z({map:o,bumpMap:o,bumpScale:.055,color:"#c28a59",roughness:.62,metalness:.03}),d=new z({map:s,bumpMap:s,bumpScale:.07,color:"#a5aaa4",roughness:.78,metalness:.04}),f=new z({map:r,bumpMap:r,bumpScale:.025,color:"#fff8e9",roughness:.34,metalness:.08}),n=new z({map:a,color:"#262a32",roughness:.42,metalness:.72,transparent:!0,opacity:.24});return{geometries:e,materials:[l,c,h,d,f],backgroundMaterial:n,shellMaterials:{drum:new z({map:a,bumpMap:a,bumpScale:.018,color:"#c4cbca",roughness:.3,metalness:.74}),ribs:new z({map:o,bumpMap:o,bumpScale:.065,color:"#b77d42",roughness:.42,metalness:.28}),luminousRib:new z({map:r,bumpMap:r,bumpScale:.018,color:"#fff1c4",roughness:.24,metalness:.18,emissive:"#ffb347",emissiveIntensity:4.5}),trim:new z({map:t,bumpMap:t,bumpScale:.025,color:"#e2b875",roughness:.27,metalness:.82,emissive:"#5a2c0d",emissiveIntensity:.12}),back:new z({map:a,bumpMap:a,bumpScale:.045,color:"#7a8285",roughness:.48,metalness:.42}),hub:new z({map:a,bumpMap:a,bumpScale:.02,color:"#596264",roughness:.27,metalness:.88,emissive:"#f4ecd6",emissiveIntensity:.55})},textures:[t,a,o,s,r]}},[]);return w.useEffect(()=>()=>{Object.values(i.geometries).forEach(e=>{var t,a;(a=(t=e.boundsTree)==null?void 0:t.dispose)==null||a.call(t),e.dispose()}),i.materials.forEach(e=>e.dispose()),i.backgroundMaterial.dispose(),Object.values(i.shellMaterials).forEach(e=>e.dispose()),i.textures.forEach(e=>e.dispose())},[i]),i}function Wi({descriptor:i,assets:e,frozen:t}){const a=e.materials[i.material],o=t?"#fff8df":"#8ca1b2";if(i.isLight)return m.jsxs("group",{rotation:[0,0,-.18],children:[m.jsxs("mesh",{position:[0,.34,0],castShadow:!0,receiveShadow:!0,children:[m.jsx("sphereGeometry",{args:[.9,32,22]}),m.jsx("meshPhysicalMaterial",{color:"#fff7dc",transmission:.72,thickness:.18,roughness:.06,transparent:!0,opacity:.8})]}),m.jsxs("mesh",{position:[0,.18,0],scale:[.2,.46,.2],children:[m.jsx("sphereGeometry",{args:[1,18,12]}),m.jsx("meshStandardMaterial",{color:"#fff4b5",emissive:"#ff9f24",emissiveIntensity:12,toneMapped:!1})]}),m.jsxs("mesh",{position:[0,-.55,0],castShadow:!0,receiveShadow:!0,children:[m.jsx("cylinderGeometry",{args:[.5,.43,.92,24]}),m.jsx("meshStandardMaterial",{color:"#90816a",metalness:.92,roughness:.25})]}),[-.86,-.66,-.46,-.26].map(s=>m.jsxs("mesh",{position:[0,s,0],rotation:[Math.PI*.5,0,0],children:[m.jsx("torusGeometry",{args:[.48,.058,8,28]}),m.jsx("meshStandardMaterial",{color:"#c4b79b",metalness:.94,roughness:.22})]},s)),m.jsx("pointLight",{position:[0,.25,0],color:i.lightIndex%2?"#ffd18a":"#ffad42",intensity:38,distance:20,decay:1.85,castShadow:!0,"shadow-mapSize":[512,512],"shadow-bias":-.0015})]});if(i.type>=6){const s=["d4","d6","d8","d10","d12","d20"],r=[4,6,8,10,12,20],l=i.type-6,c=1+Math.floor(T(i.type+i.position[2],913)*r[l]);return m.jsxs("group",{children:[m.jsx("mesh",{geometry:e.geometries[s[l]],material:e.materials[4],castShadow:!0,receiveShadow:!0}),m.jsxs("mesh",{position:[0,0,1.13],children:[m.jsx("circleGeometry",{args:[.34,24]}),m.jsx("meshBasicMaterial",{map:Oi(c),transparent:!0,polygonOffset:!0,polygonOffsetFactor:-2})]})]})}return i.type===0?m.jsxs("group",{children:[m.jsx("mesh",{geometry:e.geometries.ring,material:a,castShadow:!0,receiveShadow:!0}),m.jsx("mesh",{geometry:e.geometries.ring,rotation:[Math.PI*.5,.4,0],scale:.67,children:m.jsx("meshBasicMaterial",{color:o,wireframe:!0,transparent:!0,opacity:t?.74:.17,toneMapped:!1})})]}):i.type===1?m.jsxs("group",{children:[m.jsx("mesh",{geometry:e.geometries.cube,material:a,castShadow:!0,receiveShadow:!0}),[0,1,2].map(s=>m.jsx("mesh",{geometry:e.geometries.shard,material:e.materials[3],position:[(s-1)*.48,s*.19-.2,.32-s*.2],scale:.22+s*.04},s))]}):i.type===2?m.jsxs("group",{children:[m.jsx("mesh",{geometry:e.geometries.sphere,material:a,castShadow:!0,receiveShadow:!0}),m.jsx("mesh",{geometry:e.geometries.sphere,scale:.58,children:m.jsx("meshBasicMaterial",{color:"#d9fbff",wireframe:!0,transparent:!0,opacity:.25,toneMapped:!1})})]}):i.type===3?m.jsx("group",{position:[-.7,-.55,0],children:Array.from({length:6},(s,r)=>m.jsx("mesh",{geometry:e.geometries.stair,material:a,position:[r*.27,r*.2,0],scale:[.32,.2,1.15],castShadow:!0,receiveShadow:!0},r))}):i.type===4?i.isLight?m.jsxs("group",{rotation:[0,0,-.18],children:[m.jsxs("mesh",{position:[0,.34,0],castShadow:!0,receiveShadow:!0,children:[m.jsx("sphereGeometry",{args:[.82,32,22]}),m.jsx("meshPhysicalMaterial",{color:"#fff4d3",transmission:.82,thickness:.16,roughness:.08,transparent:!0,opacity:.72})]}),m.jsxs("mesh",{position:[0,.18,0],scale:[.18,.42,.18],children:[m.jsx("sphereGeometry",{args:[1,18,12]}),m.jsx("meshStandardMaterial",{color:"#fff0a5",emissive:"#ffae36",emissiveIntensity:9,toneMapped:!1})]}),m.jsxs("mesh",{position:[0,-.55,0],castShadow:!0,receiveShadow:!0,children:[m.jsx("cylinderGeometry",{args:[.48,.42,.9,24]}),m.jsx("meshStandardMaterial",{color:"#7a6d58",metalness:.9,roughness:.28})]}),[-.86,-.66,-.46,-.26].map(r=>m.jsxs("mesh",{position:[0,r,0],rotation:[Math.PI*.5,0,0],children:[m.jsx("torusGeometry",{args:[.47,.055,8,28]}),m.jsx("meshStandardMaterial",{color:"#b6aa91",metalness:.92,roughness:.24})]},r)),m.jsx("pointLight",{position:[0,.25,0],color:"#ffb65b",intensity:58,distance:26,decay:1.8,castShadow:!0,"shadow-mapSize":[1024,1024],"shadow-bias":-.0015})]}):m.jsx("group",{children:m.jsx("mesh",{geometry:e.geometries.knot,material:a,castShadow:!0,receiveShadow:!0})}):m.jsxs("group",{children:[m.jsx("mesh",{geometry:e.geometries.shard,material:a,castShadow:!0,receiveShadow:!0}),m.jsx("mesh",{geometry:e.geometries.ring,rotation:[.6,.2,.3],scale:1.16,children:m.jsx("meshBasicMaterial",{color:"#8ee8ff",transparent:!0,opacity:.18,wireframe:!0,toneMapped:!1})})]})}function Li({descriptor:i,index:e,assets:t,bodyRegistry:a,impactEnergy:o,reportImpact:s,interactionRef:r}){const l=w.useRef(),c=w.useCallback(f=>{l.current=f,a.current[e]=f},[a,e]);w.useEffect(()=>()=>{a.current[e]=null},[a,e]);const h=w.useCallback(f=>{f.stopPropagation();const n=l.current;n&&(r.current.draggedBody=n,r.current.dragDepth=n.translation().z,n.setBodyType(2,!0),n.setGravityScale(0,!0),n.setLinvel({x:0,y:0,z:0},!0),n.setAngvel({x:0,y:0,z:0},!0))},[r]);ge(()=>{const f=l.current;if(!f||r.current.draggedBody!==f)return;const n=r.current.worldPoint;f.setNextKinematicTranslation({x:n.x,y:n.y,z:r.current.dragDepth})});const d=w.useCallback(()=>{if(!l.current)return;const f=l.current.translation(),n=l.current.linvel(),g=Math.hypot(n.x,n.y,n.z)*o;g>1.3&&s(f,g)},[o,s]);return m.jsxs(Rt,{ref:c,position:i.position,rotation:i.rotation,scale:i.scale,colliders:!1,mass:.75+i.scale*1.6,linearDamping:.24,angularDamping:.34,restitution:.28+o*.18,friction:.58,canSleep:!1,ccd:!0,onCollisionEnter:d,children:[m.jsx(ta,{args:[i.radius]}),m.jsx("group",{onPointerDown:h,children:m.jsx(Wi,{descriptor:i,assets:t,frozen:!1})})]})}function ji({impactRef:i,amount:e,impactEnergy:t,speed:a}){const o=w.useRef(),s=w.useMemo(()=>{const r=Math.floor(24+e*1.9),l=new Float32Array(r*3),c=new Float32Array(r*3),h=new Float32Array(r);l.fill(-1e3);const d=new ae;d.setAttribute("position",new H(l,3)),d.userData.velocities=c,d.userData.life=h;const f=new Ra({color:"#ffc26b",transparent:!0,opacity:.92,size:.055,sizeAttenuation:!0,depthWrite:!1,blending:kt,toneMapped:!1});return{count:r,geometry:d,material:f,serial:-1}},[e,t]);return ge((r,l)=>{var n;if(s.serial!==i.current.serial){s.serial=i.current.serial,(n=o.current)==null||n.position.copy(i.current.position);const g=s.geometry.attributes.position.array,p=s.geometry.userData.velocities,x=s.geometry.userData.life;for(let u=0;u<s.count;u+=1){const v=u*3,y=new _(Math.random()-.5,.25+Math.random()*.9,Math.random()-.5).normalize().multiplyScalar(1.2+Math.random()*(2.2+t*3.8));g[v]=0,g[v+1]=0,g[v+2]=0,p[v]=y.x,p[v+1]=y.y,p[v+2]=y.z,x[u]=.2+Math.random()*.65}}const c=Math.min(l,.04)*a,h=s.geometry.attributes.position.array,d=s.geometry.userData.velocities,f=s.geometry.userData.life;for(let g=0;g<s.count;g+=1){if(f[g]<=0)continue;const p=g*3;f[g]-=c,d[p+1]-=4.2*c,h[p]+=d[p]*c,h[p+1]+=d[p+1]*c,h[p+2]+=d[p+2]*c,f[g]<=0&&(h[p+1]=-1e3)}s.geometry.attributes.position.needsUpdate=!0}),w.useEffect(()=>()=>{s.geometry.dispose(),s.material.dispose()},[s]),m.jsx("points",{ref:o,geometry:s.geometry,material:s.material,frustumCulled:!1})}function Ui({amount:i}){const e=Math.min(6e3,Math.max(0,Math.round(i))),t=w.useMemo(()=>Array.from({length:e},(a,o)=>{const s=o%12;return{key:`grain-${o}`,position:[P+(T(o,1401)-.5)*13.5,qt-6.8+T(o,1402)*9.5,1.5-s*3.7-T(o,1403)*1.4],rotation:[T(o,1404)*3,T(o,1405)*3,T(o,1406)*3],scale:[.075+T(o,1407)*.035,.065+T(o,1408)*.03,.075+T(o,1409)*.035]}}),[e]);return e?m.jsx(ea,{instances:t,colliders:"ball",mass:.018,friction:.86,restitution:.04,linearDamping:.12,angularDamping:.18,children:m.jsxs("instancedMesh",{args:[void 0,void 0,e],castShadow:!0,receiveShadow:!0,frustumCulled:!1,children:[m.jsx("icosahedronGeometry",{args:[1,0]}),m.jsx("meshStandardMaterial",{color:"#bd8840",roughness:.88,metalness:.01})]})},e):null}function Gi({enabled:i}){const{gl:e,scene:t,camera:a}=Qt(),o=w.useRef(null);return w.useEffect(()=>{if(!i||!e.isWebGLRenderer)return;t.updateMatrixWorld(!0),a.lookAt(P,3.1,-13.5),a.updateMatrixWorld(!0);const s=new Di(e);return s.bounces=5,s.renderScale=Math.min(.8,window.devicePixelRatio>1?.62:.78),s.tiles.set(2,2),s.dynamicLowRes=!0,s.lowResScale=.3,s.minSamples=2,s.rasterizeScene=!0,s.setScene(t,a),o.current=s,()=>{o.current=null,s.dispose()}},[a,i,e,t]),ge(()=>{var s;i&&((s=o.current)==null||s.renderSample())},i?1:0),null}function Vi(){const i=w.useRef();return w.useEffect(()=>{var t;const e=i.current;if(e)return e.target.position.set(P,2.2,-18),(t=e.parent)==null||t.add(e.target),e.target.updateMatrixWorld(),()=>{var a;return(a=e.parent)==null?void 0:a.remove(e.target)}},[]),m.jsx("spotLight",{ref:i,color:"#fff1d6",intensity:105,position:[P-5.5,10.5,8],angle:.62,penumbra:.58,distance:78,decay:1.7,castShadow:!0,"shadow-mapSize":[2048,2048],"shadow-camera-left":-15,"shadow-camera-right":15,"shadow-camera-top":13,"shadow-camera-bottom":-4,"shadow-camera-near":1,"shadow-camera-far":55,"shadow-bias":-.0018})}function qi({speed:i,materials:e}){const t=w.useRef(null),a=w.useRef(0),o=w.useRef(new Ft),s=w.useRef(new _(0,0,1));return ge((r,l)=>{t.current&&(a.current+=l*ki*i,o.current.setFromAxisAngle(s.current,a.current),t.current.setNextKinematicRotation({x:o.current.x,y:o.current.y,z:o.current.z,w:o.current.w}))}),m.jsxs(Rt,{ref:t,type:"kinematicPosition",colliders:!1,position:[P,qt,0],children:[Array.from({length:Ne},(r,l)=>{const c=l/Ne*Math.PI*2,h=ce,d=2*h*Math.tan(Math.PI/Ne)*1.08;return m.jsxs("group",{position:[Math.sin(c)*h,Math.cos(c)*h,-te*.5+6],rotation:[0,0,-c],children:[m.jsx(De,{args:[d*.5,.24,te*.5],friction:1.15,restitution:.12}),m.jsxs("mesh",{receiveShadow:!0,children:[m.jsx("boxGeometry",{args:[d,.38,te]}),m.jsx("primitive",{object:e.drum,attach:"material"})]}),l%4===0&&m.jsxs("group",{position:[0,-.62,0],children:[m.jsx(De,{args:[.62,.34,te*.47],friction:1.35}),m.jsxs("mesh",{castShadow:!0,receiveShadow:!0,children:[m.jsx("boxGeometry",{args:[1.24,.68,te*.94]}),m.jsx("primitive",{object:l===0||l===12?e.luminousRib:e.ribs,attach:"material"})]}),(l===0||l===12)&&[-18,0,18].map((f,n)=>m.jsx("pointLight",{position:[0,-.9,f],color:n===1?"#fff0c2":"#ffc46b",intensity:n===1?28:18,distance:24,decay:1.8,castShadow:n===1,"shadow-mapSize":[1024,1024],"shadow-bias":-.0015},f))]})]},l)}),[-3,-22,-41].map(r=>m.jsxs("mesh",{position:[0,0,r],children:[m.jsx("torusGeometry",{args:[ce-.35,.18,8,96]}),m.jsx("primitive",{object:e.trim,attach:"material"})]},r)),m.jsx(De,{args:[ce,ce,.22],position:[0,0,-te+6],friction:.8}),m.jsxs("group",{position:[0,0,-te+6.18],children:[m.jsxs("mesh",{receiveShadow:!0,children:[m.jsx("circleGeometry",{args:[ce,96]}),m.jsx("primitive",{object:e.back,attach:"material"})]}),[-5.2,0,5.2].map((r,l)=>m.jsx("pointLight",{position:[r,l===1?1.4:-1.2,1.1],color:l===1?"#ffe3b0":"#d7b07a",intensity:l===1?34:18,distance:32,decay:1.65,castShadow:l===1,"shadow-mapSize":[512,512],"shadow-bias":-.0015},r)),[2.3,5.1,8.1].map(r=>m.jsxs("mesh",{position:[0,0,.06],children:[m.jsx("torusGeometry",{args:[r,.12,8,6]}),m.jsx("primitive",{object:e.trim,attach:"material"})]},r)),m.jsxs("mesh",{position:[0,0,.08],rotation:[Math.PI*.5,0,0],children:[m.jsx("cylinderGeometry",{args:[1.35,1.35,.28,32]}),m.jsx("primitive",{object:e.hub,attach:"material"})]}),m.jsx("pointLight",{position:[0,0,.6],color:"#f4ecd6",intensity:30,distance:42,decay:1.6})]})]})}function $i({settings:i,interactionRef:e,bodyRegistry:t,elapsedRef:a,onStage:o}){const{world:s}=Jt(),r=Aa(),l=w.useRef(new _),c=w.useRef(""),h=w.useRef(""),d=F.clamp(i.gravityForce??100,30,180)/100,f=F.clamp(i.impactEnergy??90,20,160)/100;F.clamp(i.disturbance??55,0,100)/100;const n=Math.max(.05,i.speed??1);return ge((g,p)=>{if(i.pathTracing){g.camera.lookAt(P,3.1,-13.5);return}const x=g.clock.elapsedTime*n;a.current=x;const u=x<E.value.cycleEnds?x:E.value.gravityAt+(x-E.value.gravityAt)%(E.value.cycleEnds-E.value.gravityAt);$t.sequence.position=Math.min(u,E.value.cycleEnds);const v=e.current,y=It.set(v.pointer.x,v.pointer.y,.28).unproject(g.camera);$.copy(y).sub(g.camera.position).normalize();const b=v.draggedBody?v.dragDepth:g.camera.position.z-9,S=Math.abs((b-g.camera.position.z)/Math.min(-.08,$.z));v.worldPoint.copy(g.camera.position).addScaledVector($,Math.min(30,S));const M=It.set(0,-1,0),I="GRAVITY: SCREEN DOWN";I!==c.current&&(c.current=I,o(I));const O=9.81*d,K=$.copy(M).normalize().multiplyScalar(M.lengthSq()>0?O:0);l.current.x=F.damp(l.current.x,K.x,3.7,p),l.current.y=F.damp(l.current.y,K.y,3.7,p),l.current.z=F.damp(l.current.z,K.z,3.7,p),s.gravity.x=l.current.x,s.gravity.y=l.current.y,s.gravity.z=l.current.z,I!==h.current&&I.startsWith("GRAVITY")&&(h.current=I,t.current.filter(Boolean).forEach((j,U)=>{const q=(T(U,Math.floor(x)+80)-.5)*f;j.applyTorqueImpulse({x:q*.7,y:q,z:-q*.55},!0),j.wakeUp()})),u>E.value.pulseAt&&u<E.value.pulseAt+.16&&!v.pulseFired&&(v.pulseFired=!0,t.current.filter(Boolean).forEach(j=>{const U=j.translation();$.set(U.x-P,U.y-2.5,U.z+5).normalize(),j.applyImpulse({x:$.x*f*.22,y:$.y*f*.22,z:$.z*f*.22},!0)})),u<E.value.pulseAt-.2&&(v.pulseFired=!1),v.pointerEnergy=F.damp(v.pointerEnergy,0,5.5,p);const ve=F.smoothstep(x,0,E.value.glideEnds),xe=F.lerp(E.value.cameraStartZ,E.value.cameraEndZ,ve);g.camera.position.x=F.damp(g.camera.position.x,P+2.7+Math.sin(r.current.targetYaw)*.45,2.8,p),g.camera.position.y=F.damp(g.camera.position.y,4.3+r.current.targetPitch*.3,2.8,p),g.camera.position.z=F.damp(g.camera.position.z,xe-Math.sin(x*.06)*1.2,2.4,p),g.camera.lookAt(P,3.1,-13.5)}),null}function Yi({settings:i,interactionRef:e,onStage:t}){const a=F.clamp(i.artifactDensity??76,24,140),o=48,s=.82,r=Math.max(.05,i.speed??1),l=F.clamp(Math.round(i.lightObjects??3),0,8),c=w.useMemo(()=>Bi(a,l),[a,l]),h=Hi(),d=w.useRef([]),f=w.useRef(0),n=w.useRef({serial:0,position:new _(0,-100,0),last:0}),g=w.useCallback((p,x)=>{const u=performance.now();u-n.current.last<Math.max(42,130-o)||(n.current.last=u,n.current.serial+=1,n.current.position.set(p.x,p.y,p.z),e.current.lastImpact=Math.min(1,x*.1))},[e,o]);return m.jsxs(m.Fragment,{children:[m.jsx("color",{attach:"background",args:["#343a3c"]}),m.jsx("ambientLight",{color:"#fff4df",intensity:.025}),m.jsx("hemisphereLight",{args:["#dce8ea","#403a35",.045]}),m.jsx(Vi,{}),m.jsx(ji,{impactRef:n,amount:o,impactEnergy:s,speed:r}),m.jsxs("mesh",{position:[P-5.5,9.8,4.5],rotation:[.2,0,-.18],children:[m.jsx("boxGeometry",{args:[4.8,.28,1.2]}),m.jsx("meshStandardMaterial",{color:"#f4e7cb",emissive:"#ffe8b8",emissiveIntensity:1.8,toneMapped:!1})]}),m.jsxs(Zt,{gravity:[0,0,0],timeStep:"vary",interpolate:!0,paused:!!i.pathTracing,children:[m.jsx($i,{settings:i,interactionRef:e,bodyRegistry:d,elapsedRef:f,onStage:t}),m.jsx(qi,{speed:r,materials:h.shellMaterials}),m.jsx(Ui,{amount:i.physicalSand??1200}),c.map((p,x)=>m.jsx(Li,{descriptor:p,index:x,assets:h,bodyRegistry:d,impactEnergy:s,reportImpact:g,interactionRef:e},p.id))]}),m.jsx(Gi,{enabled:!!i.pathTracing})]})}async function Xi(i){const e=new ra({...i,antialias:!0,alpha:!1,powerPreference:"high-performance"});return await e.init(),e.outputColorSpace=Ae,e.toneMapping=Ot,e.toneMappingExposure=1.12,e.shadowMap.enabled=!0,e.shadowMap.type=zt,e}function Ki(i){const e=new ya({...i,antialias:!0,alpha:!1,powerPreference:"high-performance"});return e.outputColorSpace=Ae,e.toneMapping=Ot,e.toneMappingExposure=1.04,e.shadowMap.enabled=!0,e.shadowMap.type=zt,e}function cs({settings:i={}}){const e=w.useRef({pointer:new V,previousPointer:new V,pointerEnergy:0,worldPoint:new _(P,3,2),gravityTarget:new _(0,-1,0),gravityLabel:"FLOOR",manualUntil:0,holding:!1,pulseFired:!1,lastImpact:0,draggedBody:null,dragDepth:0}),[t,a]=w.useState("SUSPENDED"),o=Math.round(F.clamp(i.artifactDensity??76,24,140)),s=F.clamp(Math.round(i.lightObjects??3),0,8),r=Math.min(6e3,Math.max(0,Math.round(i.physicalSand??1200))),l=w.useCallback(h=>{const d=h.currentTarget.getBoundingClientRect(),f=(h.clientX-d.left)/d.width*2-1,n=-((h.clientY-d.top)/d.height)*2+1,g=e.current;g.previousPointer.copy(g.pointer),g.pointer.set(f,n),g.pointerEnergy=Math.min(1,g.pointerEnergy+g.pointer.distanceTo(g.previousPointer)*1.8)},[]),c=w.useCallback(()=>{const h=e.current,d=h.draggedBody;d&&(d.setBodyType(0,!0),d.setGravityScale(1,!0),d.wakeUp(),h.draggedBody=null)},[]);return m.jsxs("section",{className:"atmosphere gravity-museum-pro",onPointerMove:l,onPointerUp:c,onPointerCancel:c,onPointerLeave:c,style:{"--experiment-accent":"#9fdcff"},children:[m.jsxs(Kt,{className:"gravity-museum-pro__canvas",gl:i.pathTracing?Ki:Xi,dpr:Ca,camera:{position:[P+2.7,4.3,21],fov:47,near:.06,far:180},onCreated:({raycaster:h})=>{h.firstHitOnly=!0},children:[m.jsx("color",{attach:"background",args:["#343a3c"]}),m.jsx("fogExp2",{attach:"fog",args:["#343a3c",.004]}),m.jsx(w.Suspense,{fallback:null,children:m.jsx(Yi,{settings:i,interactionRef:e,onStage:a})})]},i.pathTracing?"path-traced":"webgpu"),m.jsxs("div",{className:"gravity-museum-pro__copy experiment-copy",children:[m.jsx("p",{children:"18 — Impossible mechanics"}),m.jsxs("h1",{children:["Gravity is",m.jsx("br",{}),"only a curator."]}),m.jsx("span",{children:"The chamber turns, but down never moves. Its ribs lift the collection until gravity pulls every object back into the tumbling pile below."})]}),m.jsxs("div",{className:"gravity-museum-pro__state","aria-live":"polite",children:[m.jsx("span",{children:"Current law"}),m.jsx("strong",{children:t}),m.jsx("i",{}),m.jsxs("span",{children:[o.toLocaleString()," OBJECTS"]}),m.jsxs("span",{children:[s.toLocaleString()," LIGHT SOURCES"]}),m.jsxs("span",{children:[r.toLocaleString()," SAND GRAINS"]})]}),m.jsx("div",{className:"gravity-museum-pro__hint","aria-hidden":"true",children:"CLICK AND DRAG AN OBJECT · RELEASE TO DROP"})]})}export{cs as default};
