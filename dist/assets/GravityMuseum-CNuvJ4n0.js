import{r as w,j as p}from"./index-C142NzQa.js";import{C as Zt,a as _t,u as ge}from"./react-three-fiber.esm-CSqyKp3t.js";import{P as Jt,u as ea,R as Rt,C as De,I as ta,B as aa}from"./react-three-rapier.esm-C4nMD3gJ.js";import{d as ra}from"./index-Bq7_vOuE.js";import{W as ia}from"./three.webgpu-CPm9NOs7.js";import{U as de,l as k,N as _,m as Ee,F,n as Le,o as sa,p as Ze,q as oa,R as C,r as je,s as At,t as na,u as Ct,c as _e,B as H,a9 as ie,g as X,aJ as la,V as R,ag as ue,J as ca,M as Ue,S as Re,_ as fe,W as me,e as q,au as Ft,b as V,H as W,L as N,aG as L,v as Q,aK as ua,af as Pt,aL as fa,D as Dt,i as Et,k as ha,aM as da,C as pe,aN as ma,aO as kt,a0 as Ot,aP as pa,X as ga,aH as va,w as xa,A as zt,ad as A,z as ya,Y as Ae,ae as Bt,aQ as Nt,I as Je,aR as ba,aq as Ta,aS as et,ah as ke,aT as wa,aU as Sa,az as Ma,aa as z,ab as Ia,aC as _a,aF as Ht,a3 as Ra}from"./three.module-Ct-yBmsu.js";import{F as se}from"./Pass-CsQUQsx6.js";import{u as Aa}from"./useDragOrbit-CGhNynaS.js";import{W as Ca}from"./quality-NEVBGrgs.js";import{g as Fa,a as Pa,B as tt,I as Da,C as Ea,O as ka,S as Oa,b as za,L as Ba,c as Na,M as Ha,d as Wa,e as at}from"./ExtensionUtilities-BINP1agy.js";import"./BufferGeometryUtils-DAr1IoEU.js";import"./dragOrbit-BWBT6NeL.js";function La(i){switch(i){case 1:return"R";case 2:return"RG";case 3:return"RGBA";case 4:return"RGBA"}throw new Error}function ja(i){switch(i){case 1:return _e;case 2:return Ct;case 3:return C;case 4:return C}}function rt(i){switch(i){case 1:return na;case 2:return At;case 3:return je;case 4:return je}}class Wt extends k{constructor(){super(),this.minFilter=_,this.magFilter=_,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(e){const t=this.overrideItemSize,r=e.itemSize,s=e.count;if(t!==null){if(r*s%t!==0)throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");e.itemSize=t,e.count=s*r/t}const o=e.itemSize,a=e.count,l=e.normalized,u=e.array.constructor,c=u.BYTES_PER_ELEMENT;let d=this._forcedType,f=o;if(d===null)switch(u){case Float32Array:d=F;break;case Uint8Array:case Uint16Array:case Uint32Array:d=de;break;case Int8Array:case Int16Array:case Int32Array:d=Ee;break}let n,g,m,v,h=La(o);switch(d){case F:m=1,g=ja(o),l&&c===1?(v=u,h+="8",u===Uint8Array?n=Le:(n=Ze,h+="_SNORM")):(v=Float32Array,h+="32F",n=F);break;case Ee:h+=c*8+"I",m=l?Math.pow(2,u.BYTES_PER_ELEMENT*8-1):1,g=rt(o),c===1?(v=Int8Array,n=Ze):c===2?(v=Int16Array,n=oa):(v=Int32Array,n=Ee);break;case de:h+=c*8+"UI",m=l?Math.pow(2,u.BYTES_PER_ELEMENT*8-1):1,g=rt(o),c===1?(v=Uint8Array,n=Le):c===2?(v=Uint16Array,n=sa):(v=Uint32Array,n=de);break}f===3&&(g===C||g===je)&&(f=4);const x=Math.ceil(Math.sqrt(a))||1,y=f*x*x,b=new v(y),S=e.normalized;e.normalized=!1;for(let M=0;M<a;M++){const I=f*M;b[I]=e.getX(M)/m,o>=2&&(b[I+1]=e.getY(M)/m),o>=3&&(b[I+2]=e.getZ(M)/m,f===4&&(b[I+3]=1)),o>=4&&(b[I+3]=e.getW(M)/m)}e.normalized=S,this.internalFormat=h,this.format=g,this.type=n,this.image.width=x,this.image.height=x,this.image.data=b,this.needsUpdate=!0,this.dispose(),e.itemSize=r,e.count=s}}class Lt extends Wt{constructor(){super(),this._forcedType=de}}class jt extends Wt{constructor(){super(),this._forcedType=F}}class Ua{constructor(){this.index=new Lt,this.position=new jt,this.bvhBounds=new k,this.bvhContents=new k,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(e){const{geometry:t}=e;if(Va(e,this.bvhBounds,this.bvhContents),this.position.updateFrom(t.attributes.position),e.indirect){const r=e._indirectBuffer;if(this._cachedIndexAttr===null||this._cachedIndexAttr.count!==r.length)if(t.index)this._cachedIndexAttr=t.index.clone();else{const s=Fa(Pa(t));this._cachedIndexAttr=new H(s,1,!1)}Ga(t,r,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(t.index)}dispose(){const{index:e,position:t,bvhBounds:r,bvhContents:s}=this;e&&e.dispose(),t&&t.dispose(),r&&r.dispose(),s&&s.dispose()}}function Ga(i,e,t){const r=t.array,s=i.index?i.index.array:null;for(let o=0,a=e.length;o<a;o++){const l=3*o,u=3*e[o];for(let c=0;c<3;c++)r[l+c]=s?s[u+c]:u+c}}function Va(i,e,t){const r=i._roots;if(r.length!==1)throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");const s=r[0],o=new Uint16Array(s),a=new Uint32Array(s),l=new Float32Array(s),u=s.byteLength/tt,c=2*Math.ceil(Math.sqrt(u/2)),d=new Float32Array(4*c*c),f=Math.ceil(Math.sqrt(u)),n=new Uint32Array(2*f*f);for(let g=0;g<u;g++){const m=g*tt/4,v=m*2,h=za(m);for(let x=0;x<3;x++)d[8*g+0+x]=l[h+0+x],d[8*g+4+x]=l[h+3+x];if(Da(v,o)){const x=Ea(v,o),y=ka(m,a),b=Ba|x;n[g*2+0]=b,n[g*2+1]=y}else{const x=a[m+6],y=Oa(m,a);n[g*2+0]=y,n[g*2+1]=x}}e.image.data=d,e.image.width=c,e.image.height=c,e.format=C,e.type=F,e.internalFormat="RGBA32F",e.minFilter=_,e.magFilter=_,e.generateMipmaps=!1,e.needsUpdate=!0,e.dispose(),t.image.data=n,t.image.width=f,t.image.height=f,t.format=At,t.type=de,t.internalFormat="RG32UI",t.minFilter=_,t.magFilter=_,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose()}const qa=`

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
`;function Ut(i,e,t=0){if(i.isInterleavedBufferAttribute){const r=i.itemSize;for(let s=0,o=i.count;s<o;s++){const a=s+t;e.setX(a,i.getX(s)),r>=2&&e.setY(a,i.getY(s)),r>=3&&e.setZ(a,i.getZ(s)),r>=4&&e.setW(a,i.getW(s))}}else{const r=e.array,s=r.constructor,o=r.BYTES_PER_ELEMENT*i.itemSize*t;new s(r.buffer,o,i.array.length).set(i.array)}}function he(i,e=null){const t=i.array.constructor,r=i.normalized,s=i.itemSize,o=e===null?i.count:e;return new H(new t(s*o),s,r)}function ce(i,e){if(!i&&!e)return!0;if(!!i!=!!e)return!1;const t=i.count===e.count,r=i.normalized===e.normalized,s=i.array.constructor===e.array.constructor,o=i.itemSize===e.itemSize;return!(!t||!r||!s||!o)}function Xa(i){const e=i[0].index!==null,t=new Set(Object.keys(i[0].attributes));if(!i[0].getAttribute("position"))throw new Error("StaticGeometryGenerator: position attribute is required.");for(let r=0;r<i.length;++r){const s=i[r];let o=0;if(e!==(s.index!==null))throw new Error("StaticGeometryGenerator: All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.");for(const a in s.attributes){if(!t.has(a))throw new Error('StaticGeometryGenerator: All geometries must have compatible attributes; make sure "'+a+'" attribute exists among all geometries, or in none of them.');o++}if(o!==t.size)throw new Error("StaticGeometryGenerator: All geometries must have the same number of attributes.")}}function Qa(i){let e=0;for(let t=0,r=i.length;t<r;t++)e+=i[t].getIndex().count;return e}function Ka(i){let e=0;for(let t=0,r=i.length;t<r;t++)e+=i[t].getAttribute("position").count;return e}function Za(i,e,t){i.index&&i.index.count!==e&&i.setIndex(null);const r=i.attributes;for(const s in r)r[s].count!==t&&i.deleteAttribute(s)}function Ja(i,e={},t=new ie){const{useGroups:r=!1,forceUpdate:s=!1,skipAssigningAttributes:o=[],overwriteIndex:a=!0}=e;Xa(i);const l=i[0].index!==null,u=l?Qa(i):-1,c=Ka(i);if(Za(t,u,c),r){let f=0;for(let n=0,g=i.length;n<g;n++){const m=i[n];let v;l?v=m.getIndex().count:v=m.getAttribute("position").count,t.addGroup(f,v,n),f+=v}}if(l){let f=!1;if(t.index||(t.setIndex(new H(new Uint32Array(u),1,!1)),f=!0),f||a){let n=0,g=0;const m=t.getIndex();for(let v=0,h=i.length;v<h;v++){const x=i[v],y=x.getIndex();if(!(!s&&!f&&o[v]))for(let S=0;S<y.count;++S)m.setX(n+S,y.getX(S)+g);n+=y.count,g+=x.getAttribute("position").count}}}const d=Object.keys(i[0].attributes);for(let f=0,n=d.length;f<n;f++){let g=!1;const m=d[f];if(!t.getAttribute(m)){const x=i[0].getAttribute(m);t.setAttribute(m,he(x,c)),g=!0}let v=0;const h=t.getAttribute(m);for(let x=0,y=i.length;x<y;x++){const b=i[x],S=!s&&!g&&o[x],M=b.getAttribute(m);if(!S)if(m==="color"&&h.itemSize!==M.itemSize)for(let I=v,O=M.count;I<O;I++)M.setXYZW(I,h.getX(I),h.getY(I),h.getZ(I),1);else Ut(M,h,v);v+=M.count}}}function er(i,e,t){const r=i.index,o=i.attributes.position.count,a=r?r.count:o;let l=i.groups;l.length===0&&(l=[{count:a,start:0,materialIndex:0}]);let u=i.getAttribute("materialIndex");if(!u||u.count!==o){let d;t.length<=255?d=new Uint8Array(o):d=new Uint16Array(o),u=new H(d,1,!1),i.deleteAttribute("materialIndex"),i.setAttribute("materialIndex",u)}const c=u.array;for(let d=0;d<l.length;d++){const f=l[d],n=f.start,g=f.count,m=Math.min(g,a-n),v=Array.isArray(e)?e[f.materialIndex]:e,h=t.indexOf(v);for(let x=0;x<m;x++){let y=n+x;r&&(y=r.getX(y)),c[y]=h}}}function tr(i,e){if(!i.index){const t=i.attributes.position.count,r=new Array(t);for(let s=0;s<t;s++)r[s]=s;i.setIndex(r)}if(!i.attributes.normal&&e&&e.includes("normal")&&i.computeVertexNormals(),!i.attributes.uv&&e&&e.includes("uv")){const t=i.attributes.position.count;i.setAttribute("uv",new H(new Float32Array(t*2),2,!1))}if(!i.attributes.uv2&&e&&e.includes("uv2")){const t=i.attributes.position.count;i.setAttribute("uv2",new H(new Float32Array(t*2),2,!1))}if(!i.attributes.tangent&&e&&e.includes("tangent"))if(i.attributes.uv&&i.attributes.normal)i.computeTangents();else{const t=i.attributes.position.count;i.setAttribute("tangent",new H(new Float32Array(t*4),4,!1))}if(!i.attributes.color&&e&&e.includes("color")){const t=i.attributes.position.count,r=new Float32Array(t*4);r.fill(1),i.setAttribute("color",new H(r,4))}}function qe(i){let e=0;if(i.byteLength!==0){const t=new Uint8Array(i);for(let r=0;r<i.byteLength;r++){const s=t[r];e=(e<<5)-e+s,e|=0}}return e}function it(i){let e=i.uuid;const t=Object.values(i.attributes);i.index&&(t.push(i.index),e+=`index|${i.index.version}`);const r=Object.keys(t).sort();for(const s of r){const o=t[s];e+=`${s}_${o.version}|`}return e}function st(i){const e=i.skeleton;return e?(e.boneTexture||e.computeBoneTexture(),`${qe(e.boneTexture.image.data.buffer)}_${e.boneTexture.uuid}`):null}class ar{constructor(e=null){this.matrixWorld=new X,this.geometryHash=null,this.skeletonHash=null,this.primitiveCount=-1,e!==null&&this.updateFrom(e)}updateFrom(e){const t=e.geometry,r=(t.index?t.index.count:t.attributes.position.count)/3;this.matrixWorld.copy(e.matrixWorld),this.geometryHash=it(t),this.primitiveCount=r,this.skeletonHash=st(e)}didChange(e){const t=e.geometry,r=(t.index?t.index.count:t.attributes.position.count)/3;return!(this.matrixWorld.equals(e.matrixWorld)&&this.geometryHash===it(t)&&this.skeletonHash===st(e)&&this.primitiveCount===r)}}const Z=new R,J=new R,ee=new R,ot=new ue,be=new R,Oe=new R,nt=new ue,lt=new ue,Te=new X,ct=new X;function ut(i,e,t){const r=i.skeleton,s=i.geometry,o=r.bones,a=r.boneInverses;nt.fromBufferAttribute(s.attributes.skinIndex,e),lt.fromBufferAttribute(s.attributes.skinWeight,e),Te.elements.fill(0);for(let l=0;l<4;l++){const u=lt.getComponent(l);if(u!==0){const c=nt.getComponent(l);ct.multiplyMatrices(o[c].matrixWorld,a[c]),rr(Te,ct,u)}}return Te.multiply(i.bindMatrix).premultiply(i.bindMatrixInverse),t.transformDirection(Te),t}function ze(i,e,t,r,s){be.set(0,0,0);for(let o=0,a=i.length;o<a;o++){const l=e[o],u=i[o];l!==0&&(Oe.fromBufferAttribute(u,r),t?be.addScaledVector(Oe,l):be.addScaledVector(Oe.sub(s),l))}s.add(be)}function rr(i,e,t){const r=i.elements,s=e.elements;for(let o=0,a=s.length;o<a;o++)r[o]+=s[o]*t}function ir(i){const{index:e,attributes:t}=i;if(e)for(let r=0,s=e.count;r<s;r+=3){const o=e.getX(r),a=e.getX(r+2);e.setX(r,a),e.setX(r+2,o)}else for(const r in t){const s=t[r],o=s.itemSize;for(let a=0,l=s.count;a<l;a+=3)for(let u=0;u<o;u++){const c=s.getComponent(a,u),d=s.getComponent(a+2,u);s.setComponent(a,u,d),s.setComponent(a+2,u,c)}}return i}function sr(i,e={},t=new ie){e={applyWorldTransforms:!0,attributes:[],...e};const r=i.geometry,s=e.applyWorldTransforms,o=e.attributes.includes("normal"),a=e.attributes.includes("tangent"),l=r.attributes,u=t.attributes;for(const y in t.attributes)(!e.attributes.includes(y)||!(y in r.attributes))&&t.deleteAttribute(y);!t.index&&r.index&&(t.index=r.index.clone()),u.position||t.setAttribute("position",he(l.position)),o&&!u.normal&&l.normal&&t.setAttribute("normal",he(l.normal)),a&&!u.tangent&&l.tangent&&t.setAttribute("tangent",he(l.tangent)),ce(r.index,t.index),ce(l.position,u.position),o&&ce(l.normal,u.normal),a&&ce(l.tangent,u.tangent);const c=l.position,d=o?l.normal:null,f=a?l.tangent:null,n=r.morphAttributes.position,g=r.morphAttributes.normal,m=r.morphAttributes.tangent,v=r.morphTargetsRelative,h=i.morphTargetInfluences,x=new la;x.getNormalMatrix(i.matrixWorld),r.index&&t.index.array.set(r.index.array);for(let y=0,b=l.position.count;y<b;y++)Z.fromBufferAttribute(c,y),d&&J.fromBufferAttribute(d,y),f&&(ot.fromBufferAttribute(f,y),ee.fromBufferAttribute(f,y)),h&&(n&&ze(n,h,v,y,Z),g&&ze(g,h,v,y,J),m&&ze(m,h,v,y,ee)),i.isSkinnedMesh&&(i.applyBoneTransform(y,Z),d&&ut(i,y,J),f&&ut(i,y,ee)),s&&Z.applyMatrix4(i.matrixWorld),u.position.setXYZ(y,Z.x,Z.y,Z.z),d&&(s&&J.applyNormalMatrix(x),u.normal.setXYZ(y,J.x,J.y,J.z)),f&&(s&&ee.transformDirection(i.matrixWorld),u.tangent.setXYZW(y,ee.x,ee.y,ee.z,ot.w));for(const y in e.attributes){const b=e.attributes[y];b==="position"||b==="tangent"||b==="normal"||!(b in l)||(u[b]||t.setAttribute(b,he(l[b])),ce(l[b],u[b]),Ut(l[b],u[b]))}return i.matrixWorld.determinant()<0&&ir(t),t}class or extends ie{constructor(){super(),this.version=0,this.hash=null,this._diff=new ar}isCompatible(e,t){const r=e.geometry;for(let s=0;s<t.length;s++){const o=t[s],a=r.attributes[o],l=this.attributes[o];if(a&&!ce(a,l))return!1}return!0}updateFrom(e,t){const r=this._diff;return r.didChange(e)?(sr(e,t,this),r.updateFrom(e),this.version++,this.hash=`${this.uuid}_${this.version}`,!0):!1}}const Ge=0,Gt=1,Vt=2;function nr(i,e){for(let t=0,r=i.length;t<r;t++)i[t].traverseVisible(o=>{o.isMesh&&e(o)})}function lr(i){const e=[];for(let t=0,r=i.length;t<r;t++){const s=i[t];Array.isArray(s.material)?e.push(...s.material):e.push(s.material)}return e}function cr(i,e,t){if(i.length===0){e.setIndex(null);const r=e.attributes;for(const s in r)e.deleteAttribute(s);for(const s in t.attributes)e.setAttribute(t.attributes[s],new H(new Float32Array(0),4,!1))}else Ja(i,t,e);for(const r in e.attributes)e.attributes[r].needsUpdate=!0}class ur{constructor(e){this.objects=null,this.useGroups=!0,this.applyWorldTransforms=!0,this.generateMissingAttributes=!0,this.overwriteIndex=!0,this.attributes=["position","normal","color","tangent","uv","uv2"],this._intermediateGeometry=new Map,this._geometryMergeSets=new WeakMap,this._mergeOrder=[],this._dummyMesh=null,this.setObjects(e||[])}_getDummyMesh(){if(!this._dummyMesh){const e=new ca,t=new ie;t.setAttribute("position",new H(new Float32Array(9),3)),this._dummyMesh=new Ue(t,e)}return this._dummyMesh}_getMeshes(){const e=[];return nr(this.objects,t=>{e.push(t)}),e.sort((t,r)=>t.uuid>r.uuid?1:t.uuid<r.uuid?-1:0),e.length===0&&e.push(this._getDummyMesh()),e}_updateIntermediateGeometries(){const{_intermediateGeometry:e}=this,t=this._getMeshes(),r=new Set(e.keys()),s={attributes:this.attributes,applyWorldTransforms:this.applyWorldTransforms};for(let o=0,a=t.length;o<a;o++){const l=t[o],u=l.uuid;r.delete(u);let c=e.get(u);(!c||!c.isCompatible(l,this.attributes))&&(c&&c.dispose(),c=new or,e.set(u,c)),c.updateFrom(l,s)&&this.generateMissingAttributes&&tr(c,this.attributes)}r.forEach(o=>{e.delete(o)})}setObjects(e){Array.isArray(e)?this.objects=[...e]:this.objects=[e]}generate(e=new ie){const{useGroups:t,overwriteIndex:r,_intermediateGeometry:s,_geometryMergeSets:o}=this,a=this._getMeshes(),l=[],u=[],c=o.get(e)||[];this._updateIntermediateGeometries();let d=!1;a.length!==c.length&&(d=!0);for(let n=0,g=a.length;n<g;n++){const m=a[n],v=s.get(m.uuid);u.push(v);const h=c[n];!h||h.uuid!==v.uuid?(l.push(!1),d=!0):h.version!==v.version?l.push(!1):l.push(!0)}cr(u,e,{useGroups:t,forceUpdate:d,skipAssigningAttributes:l,overwriteIndex:r}),d&&e.dispose(),o.set(e,u.map(n=>({version:n.version,uuid:n.uuid})));let f=Ge;return d?f=Vt:l.includes(!1)&&(f=Gt),{changeType:f,materials:lr(a),geometry:e}}}function fr(i){const e=new Set;for(let t=0,r=i.length;t<r;t++){const s=i[t];for(const o in s){const a=s[o];a&&a.isTexture&&e.add(a)}}return Array.from(e)}function hr(i){const e=[],t=new Set;for(let s=0,o=i.length;s<o;s++)i[s].traverse(a=>{a.visible&&(a.isRectAreaLight||a.isSpotLight||a.isPointLight||a.isDirectionalLight)&&(e.push(a),a.iesMap&&t.add(a.iesMap))});const r=Array.from(t).sort((s,o)=>s.uuid<o.uuid?1:s.uuid>o.uuid?-1:0);return{lights:e,iesTextures:r}}class dr{get initialized(){return!!this.bvh}constructor(e){this.bvhOptions={},this.attributes=["position","normal","tangent","color","uv","uv2"],this.generateBVH=!0,this.bvh=null,this.geometry=new ie,this.staticGeometryGenerator=new ur(e),this._bvhWorker=null,this._pendingGenerate=null,this._buildAsync=!1,this._materialUuids=null}setObjects(e){this.staticGeometryGenerator.setObjects(e)}setBVHWorker(e){this._bvhWorker=e}async generateAsync(e=null){if(!this._bvhWorker)throw new Error('PathTracingSceneGenerator: "setBVHWorker" must be called before "generateAsync" can be called.');if(this.bvh instanceof Promise)return this._pendingGenerate||(this._pendingGenerate=new Promise(async()=>(await this.bvh,this._pendingGenerate=null,this.generateAsync(e)))),this._pendingGenerate;{this._buildAsync=!0;const t=this.generate(e);return this._buildAsync=!1,t.bvh=this.bvh=await t.bvh,t}}generate(e=null){const{staticGeometryGenerator:t,geometry:r,attributes:s}=this,o=t.objects;t.attributes=s,o.forEach(n=>{n.traverse(g=>{g.isSkinnedMesh&&g.skeleton&&g.skeleton.update()})});const a=t.generate(r),l=a.materials;let u=a.changeType!==Ge||this._materialUuids===null||this._materialUuids.length!==length;if(!u){for(let n=0,g=l.length;n<g;n++)if(l[n].uuid!==this._materialUuids[n]){u=!0;break}}const c=fr(l),{lights:d,iesTextures:f}=hr(o);if(u&&(er(r,l,l),this._materialUuids=l.map(n=>n.uuid)),this.generateBVH){if(this.bvh instanceof Promise)throw new Error("PathTracingSceneGenerator: BVH is already building asynchronously.");if(a.changeType===Vt){const n={strategy:Na,maxLeafTris:1,indirect:!0,onProgress:e,...this.bvhOptions};this._buildAsync?this.bvh=this._bvhWorker.generate(r,n):this.bvh=new Ha(r,n)}else a.changeType===Gt&&this.bvh.refit()}return{bvhChanged:a.changeType!==Ge,bvh:this.bvh,needsMaterialIndexUpdate:u,lights:d,iesTextures:f,geometry:r,materials:l,textures:c,objects:o}}}class Ce extends Re{set needsUpdate(e){super.needsUpdate=!0,this.dispatchEvent({type:"recompilation"})}constructor(e){super(e);for(const t in this.uniforms)Object.defineProperty(this,t,{get(){return this.uniforms[t].value},set(r){this.uniforms[t].value=r}})}setDefine(e,t=void 0){if(t==null){if(e in this.defines)return delete this.defines[e],this.needsUpdate=!0,!0}else if(this.defines[e]!==t)return this.defines[e]=t,this.needsUpdate=!0,!0;return!1}}class mr extends Ce{constructor(e){super({blending:fe,uniforms:{target1:{value:null},target2:{value:null},opacity:{value:1}},vertexShader:`

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
	`}function Se(i=1){let e="uint",t="float",r="",s=".r",o="1u";return i>1&&(e="uvec"+i,t="vec"+i,r=i+"",i===2?(s=".rg",o="uvec2( 1u, 2u )"):i===3?(s=".rgb",o="uvec3( 1u, 2u, 3u )"):(s="",o="uvec4( 1u, 2u, 3u, 4u )")),`

		${t} sobol${r}( int effect ) {

			uint seed = sobolGetSeed( sobolBounceIndex, uint( effect ) );
			uint index = sobolPathIndex;

			uint shuffle_seed = sobolHashCombine( seed, 0u );
			uint shuffled_index = nestedUniformScrambleBase2( sobolReverseBits( index ), shuffle_seed );
			${t} sobol_pt = sobolGetTexturePoint( shuffled_index )${s};
			${e} result = ${e}( sobol_pt * 16777216.0 );

			${e} seed2 = sobolHashCombine( seed, ${o} );
			result = nestedUniformScrambleBase2( result, seed2 );

			return SOBOL_FACTOR * ${t}( result >> 8 );

		}
	`}const qt=`

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

`;class vr extends Ce{constructor(){super({blending:fe,uniforms:{resolution:{value:new q}},vertexShader:`

				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`

				${qt}
				${pr}

				varying vec2 vUv;
				uniform vec2 resolution;
				void main() {

					uint index = uint( gl_FragCoord.y ) * uint( resolution.x ) + uint( gl_FragCoord.x );
					gl_FragColor = generateSobolPoint( index );

				}
			`})}}class xr{generate(e,t=256){const r=new me(t,t,{type:F,format:C,minFilter:_,magFilter:_,generateMipmaps:!1}),s=e.getRenderTarget();e.setRenderTarget(r);const o=new se(new vr);return o.material.resolution.set(t,t),o.render(e),e.setRenderTarget(s),o.dispose(),r}}class yr extends Ft{set bokehSize(e){this.fStop=this.getFocalLength()/e}get bokehSize(){return this.getFocalLength()/this.fStop}constructor(...e){super(...e),this.fStop=1.4,this.apertureBlades=0,this.apertureRotation=0,this.focusDistance=25,this.anamorphicRatio=1}copy(e,t){return super.copy(e,t),this.fStop=e.fStop,this.apertureBlades=e.apertureBlades,this.apertureRotation=e.apertureRotation,this.focusDistance=e.focusDistance,this.anamorphicRatio=e.anamorphicRatio,this}}class br{constructor(){this.bokehSize=0,this.apertureBlades=0,this.apertureRotation=0,this.focusDistance=10,this.anamorphicRatio=1}updateFrom(e){e instanceof yr?(this.bokehSize=e.bokehSize,this.apertureBlades=e.apertureBlades,this.apertureRotation=e.apertureRotation,this.focusDistance=e.focusDistance,this.anamorphicRatio=e.anamorphicRatio):(this.bokehSize=0,this.apertureRotation=0,this.apertureBlades=0,this.focusDistance=10,this.anamorphicRatio=1)}}function Be(i){const e=new Uint16Array(i.length);for(let t=0,r=i.length;t<r;++t)e[t]=V.toHalfFloat(i[t]);return e}function ft(i,e,t=0,r=i.length){let s=t,o=t+r-1;for(;s<o;){const a=s+o>>1;i[a]<e?s=a+1:o=a}return s-t}function Tr(i,e,t){return .2126*i+.7152*e+.0722*t}function wr(i,e=W){const t=i.clone();t.source=new ua({...t.image});const{width:r,height:s,data:o}=t.image;let a=o;if(t.type!==e){e===W?a=new Uint16Array(o.length):a=new Float32Array(o.length);let l;o instanceof Int8Array||o instanceof Int16Array||o instanceof Int32Array?l=2**(8*o.BYTES_PER_ELEMENT-1)-1:l=2**(8*o.BYTES_PER_ELEMENT)-1;for(let u=0,c=o.length;u<c;u++){let d=o[u];t.type===W&&(d=V.fromHalfFloat(o[u])),t.type!==F&&t.type!==W&&(d/=l),e===W&&(a[u]=V.toHalfFloat(d))}t.image.data=a,t.type=e}if(t.flipY){const l=a;a=a.slice();for(let u=0;u<s;u++)for(let c=0;c<r;c++){const d=s-u-1,f=4*(u*r+c),n=4*(d*r+c);a[n+0]=l[f+0],a[n+1]=l[f+1],a[n+2]=l[f+2],a[n+3]=l[f+3]}t.flipY=!1,t.image.data=a}return t}class Sr{constructor(){const e=new k(Be(new Float32Array([0,0,0,0])),1,1);e.type=W,e.format=C,e.minFilter=N,e.magFilter=N,e.wrapS=L,e.wrapT=L,e.generateMipmaps=!1,e.needsUpdate=!0;const t=new k(Be(new Float32Array([0,1])),1,2);t.type=W,t.format=_e,t.minFilter=N,t.magFilter=N,t.generateMipmaps=!1,t.needsUpdate=!0;const r=new k(Be(new Float32Array([0,0,1,1])),2,2);r.type=W,r.format=_e,r.minFilter=N,r.magFilter=N,r.generateMipmaps=!1,r.needsUpdate=!0,this.map=e,this.marginalWeights=t,this.conditionalWeights=r,this.totalSum=0}dispose(){this.marginalWeights.dispose(),this.conditionalWeights.dispose(),this.map.dispose()}updateFrom(e){const t=wr(e);t.wrapS=L,t.wrapT=Q;const{width:r,height:s,data:o}=t.image,a=new Float32Array(r*s),l=new Float32Array(r*s),u=new Float32Array(s),c=new Float32Array(s);let d=0,f=0;for(let h=0;h<s;h++){let x=0;for(let y=0;y<r;y++){const b=h*r+y,S=V.fromHalfFloat(o[4*b+0]),M=V.fromHalfFloat(o[4*b+1]),I=V.fromHalfFloat(o[4*b+2]),O=Tr(S,M,I);x+=O,d+=O,a[b]=O,l[b]=x}if(x!==0)for(let y=h*r,b=h*r+r;y<b;y++)a[y]/=x,l[y]/=x;f+=x,u[h]=x,c[h]=f}if(f!==0)for(let h=0,x=u.length;h<x;h++)u[h]/=f,c[h]/=f;const n=new Uint16Array(s),g=new Uint16Array(r*s);for(let h=0;h<s;h++){const x=(h+1)/s,y=ft(c,x);n[h]=V.toHalfFloat((y+.5)/s)}for(let h=0;h<s;h++)for(let x=0;x<r;x++){const y=h*r+x,b=(x+1)/r,S=ft(l,b,h*r,r);g[y]=V.toHalfFloat((S+.5)/r)}this.dispose();const{marginalWeights:m,conditionalWeights:v}=this;m.image={width:s,height:1,data:n},m.needsUpdate=!0,v.image={width:r,height:s,data:g},v.needsUpdate=!0,this.totalSum=d,this.map=t}}const Ne=6,Mr=0,Ir=1,_r=2,Rr=3,Ar=4,B=new R,P=new R,ht=new X,oe=new Pt,dt=new R,ne=new R,Cr=new R(0,1,0);class Fr{constructor(){const e=new k(new Float32Array(4),1,1);e.format=C,e.type=F,e.wrapS=Q,e.wrapT=Q,e.generateMipmaps=!1,e.minFilter=_,e.magFilter=_,this.tex=e,this.count=0}updateFrom(e,t=[]){const r=this.tex,s=Math.max(e.length*Ne,1),o=Math.ceil(Math.sqrt(s));r.image.width!==o&&(r.dispose(),r.image.data=new Float32Array(o*o*4),r.image.width=o,r.image.height=o);const a=r.image.data;for(let u=0,c=e.length;u<c;u++){const d=e[u],f=u*Ne*4;let n=0;for(let m=0;m<Ne*4;m++)a[f+m]=0;d.getWorldPosition(P),a[f+n++]=P.x,a[f+n++]=P.y,a[f+n++]=P.z;let g=Mr;if(d.isRectAreaLight&&d.isCircular?g=Ir:d.isSpotLight?g=_r:d.isDirectionalLight?g=Rr:d.isPointLight&&(g=Ar),a[f+n++]=g,a[f+n++]=d.color.r,a[f+n++]=d.color.g,a[f+n++]=d.color.b,a[f+n++]=d.intensity,d.getWorldQuaternion(oe),d.isRectAreaLight)B.set(d.width,0,0).applyQuaternion(oe),a[f+n++]=B.x,a[f+n++]=B.y,a[f+n++]=B.z,n++,P.set(0,d.height,0).applyQuaternion(oe),a[f+n++]=P.x,a[f+n++]=P.y,a[f+n++]=P.z,a[f+n++]=B.cross(P).length()*(d.isCircular?Math.PI/4:1);else if(d.isSpotLight){const m=d.radius||0;dt.setFromMatrixPosition(d.matrixWorld),ne.setFromMatrixPosition(d.target.matrixWorld),ht.lookAt(dt,ne,Cr),oe.setFromRotationMatrix(ht),B.set(1,0,0).applyQuaternion(oe),a[f+n++]=B.x,a[f+n++]=B.y,a[f+n++]=B.z,n++,P.set(0,1,0).applyQuaternion(oe),a[f+n++]=P.x,a[f+n++]=P.y,a[f+n++]=P.z,a[f+n++]=Math.PI*m*m,a[f+n++]=m,a[f+n++]=d.decay,a[f+n++]=d.distance,a[f+n++]=Math.cos(d.angle),a[f+n++]=Math.cos(d.angle*(1-d.penumbra)),a[f+n++]=d.iesMap?t.indexOf(d.iesMap):-1}else if(d.isPointLight){const m=B.setFromMatrixPosition(d.matrixWorld);a[f+n++]=m.x,a[f+n++]=m.y,a[f+n++]=m.z,n++,n+=4,n+=1,a[f+n++]=d.decay,a[f+n++]=d.distance}else if(d.isDirectionalLight){const m=B.setFromMatrixPosition(d.matrixWorld),v=P.setFromMatrixPosition(d.target.matrixWorld);ne.subVectors(m,v).normalize(),a[f+n++]=ne.x,a[f+n++]=ne.y,a[f+n++]=ne.z}}this.count=e.length;const l=qe(a.buffer);return this.hash!==l?(this.hash=l,r.needsUpdate=!0,!0):!1}}function mt(i,e,t,r,s){if(e>r)throw new Error;const o=i.length/e,a=i.constructor.BYTES_PER_ELEMENT*8;let l=1;switch(i.constructor){case Uint8Array:case Uint16Array:case Uint32Array:l=2**a-1;break;case Int8Array:case Int16Array:case Int32Array:l=2**(a-1)-1;break}for(let u=0;u<o;u++){const c=4*u,d=e*u;for(let f=0;f<r;f++)t[s+c+f]=e>=f+1?i[d+f]/l:0}}class Pr extends fa{constructor(){super(),this._textures=[],this.type=F,this.format=C,this.internalFormat="RGBA32F"}updateAttribute(e,t){const r=this._textures[e];r.updateFrom(t);const s=r.image,o=this.image;if(s.width!==o.width||s.height!==o.height)throw new Error("FloatAttributeTextureArray: Attribute must be the same dimensions when updating single layer.");const{width:a,height:l,data:u}=o,d=a*l*4*e;let f=t.itemSize;f===3&&(f=4),mt(r.image.data,f,u,4,d),this.dispose(),this.needsUpdate=!0}setAttributes(e){const t=e[0].count,r=e.length;for(let f=0,n=r;f<n;f++)if(e[f].count!==t)throw new Error("FloatAttributeTextureArray: All attributes must have the same item count.");const s=this._textures;for(;s.length<r;){const f=new jt;s.push(f)}for(;s.length>r;)s.pop();for(let f=0,n=r;f<n;f++)s[f].updateFrom(e[f]);const a=s[0].image,l=this.image;(a.width!==l.width||a.height!==l.height||a.depth!==r)&&(l.width=a.width,l.height=a.height,l.depth=r,l.data=new Float32Array(l.width*l.height*l.depth*4));const{data:u,width:c,height:d}=l;for(let f=0,n=r;f<n;f++){const g=s[f],v=c*d*4*f;let h=e[f].itemSize;h===3&&(h=4),mt(g.image.data,h,u,4,v)}this.dispose(),this.needsUpdate=!0}}class Dr extends Pr{updateNormalAttribute(e){this.updateAttribute(0,e)}updateTangentAttribute(e){this.updateAttribute(1,e)}updateUvAttribute(e){this.updateAttribute(2,e)}updateColorAttribute(e){this.updateAttribute(3,e)}updateFrom(e,t,r,s){this.setAttributes([e,t,r,s])}}function $e(i,e){return i.uuid<e.uuid?1:i.uuid>e.uuid?-1:0}function Ve(i){return`${i.source.uuid}:${i.colorSpace}`}function Er(i){const e=new Set,t=[];for(let r=0,s=i.length;r<s;r++){const o=i[r],a=Ve(o);e.has(a)||(e.add(a),t.push(o))}return t}function kr(i){const e=i.map(r=>r.iesMap||null).filter(r=>r),t=new Set(e);return Array.from(t).sort($e)}function Or(i){const e=new Set;for(let r=0,s=i.length;r<s;r++){const o=i[r];for(const a in o){const l=o[a];l&&l.isTexture&&e.add(l)}}const t=Array.from(e);return Er(t).sort($e)}function zr(i){const e=[];return i.traverse(t=>{t.visible&&(t.isRectAreaLight||t.isSpotLight||t.isPointLight||t.isDirectionalLight)&&e.push(t)}),e.sort($e)}const Ye=47,pt=Ye*4;class Br{constructor(){this._features={}}isUsed(e){return e in this._features}setUsed(e,t=!0){t===!1?delete this._features[e]:this._features[e]=!0}reset(){this._features={}}}class Nr extends k{constructor(){super(new Float32Array(4),1,1),this.format=C,this.type=F,this.wrapS=Q,this.wrapT=Q,this.minFilter=_,this.magFilter=_,this.generateMipmaps=!1,this.features=new Br}updateFrom(e,t){function r(m,v,h=-1){if(v in m&&m[v]){const x=Ve(m[v]);return f[x]}else return h}function s(m,v,h){return v in m?m[v]:h}function o(m,v,h,x){const y=m[v]&&m[v].isTexture?m[v]:null;if(y){y.matrixAutoUpdate&&y.updateMatrix();const b=y.matrix.elements;let S=0;h[x+S++]=b[0],h[x+S++]=b[3],h[x+S++]=b[6],S++,h[x+S++]=b[1],h[x+S++]=b[4],h[x+S++]=b[7],S++}return 8}let a=0;const l=e.length*Ye,u=Math.ceil(Math.sqrt(l))||1,{image:c,features:d}=this,f={};for(let m=0,v=t.length;m<v;m++)f[Ve(t[m])]=m;c.width!==u&&(this.dispose(),c.data=new Float32Array(u*u*4),c.width=u,c.height=u);const n=c.data;d.reset();for(let m=0,v=e.length;m<v;m++){const h=e[m];if(h.isFogVolumeMaterial){d.setUsed("FOG");for(let b=0;b<pt;b++)n[a+b]=0;n[a+0+0]=h.color.r,n[a+0+1]=h.color.g,n[a+0+2]=h.color.b,n[a+8+3]=s(h,"emissiveIntensity",0),n[a+12+0]=h.emissive.r,n[a+12+1]=h.emissive.g,n[a+12+2]=h.emissive.b,n[a+52+1]=h.density,n[a+52+3]=0,n[a+56+2]=4,a+=pt;continue}n[a++]=h.color.r,n[a++]=h.color.g,n[a++]=h.color.b,n[a++]=r(h,"map"),n[a++]=s(h,"metalness",0),n[a++]=r(h,"metalnessMap"),n[a++]=s(h,"roughness",0),n[a++]=r(h,"roughnessMap"),n[a++]=s(h,"ior",1.5),n[a++]=s(h,"transmission",0),n[a++]=r(h,"transmissionMap"),n[a++]=s(h,"emissiveIntensity",0),"emissive"in h?(n[a++]=h.emissive.r,n[a++]=h.emissive.g,n[a++]=h.emissive.b):(n[a++]=0,n[a++]=0,n[a++]=0),n[a++]=r(h,"emissiveMap"),n[a++]=r(h,"normalMap"),"normalScale"in h?(n[a++]=h.normalScale.x,n[a++]=h.normalScale.y):(n[a++]=1,n[a++]=1),n[a++]=s(h,"clearcoat",0),n[a++]=r(h,"clearcoatMap"),n[a++]=s(h,"clearcoatRoughness",0),n[a++]=r(h,"clearcoatRoughnessMap"),n[a++]=r(h,"clearcoatNormalMap"),"clearcoatNormalScale"in h?(n[a++]=h.clearcoatNormalScale.x,n[a++]=h.clearcoatNormalScale.y):(n[a++]=1,n[a++]=1),a++,n[a++]=s(h,"sheen",0),"sheenColor"in h?(n[a++]=h.sheenColor.r,n[a++]=h.sheenColor.g,n[a++]=h.sheenColor.b):(n[a++]=0,n[a++]=0,n[a++]=0),n[a++]=r(h,"sheenColorMap"),n[a++]=s(h,"sheenRoughness",0),n[a++]=r(h,"sheenRoughnessMap"),n[a++]=r(h,"iridescenceMap"),n[a++]=r(h,"iridescenceThicknessMap"),n[a++]=s(h,"iridescence",0),n[a++]=s(h,"iridescenceIOR",1.3);const x=s(h,"iridescenceThicknessRange",[100,400]);n[a++]=x[0],n[a++]=x[1],"specularColor"in h?(n[a++]=h.specularColor.r,n[a++]=h.specularColor.g,n[a++]=h.specularColor.b):(n[a++]=1,n[a++]=1,n[a++]=1),n[a++]=r(h,"specularColorMap"),n[a++]=s(h,"specularIntensity",1),n[a++]=r(h,"specularIntensityMap");const y=s(h,"thickness",0)===0&&s(h,"attenuationDistance",1/0)===1/0;if(n[a++]=Number(y),a++,"attenuationColor"in h?(n[a++]=h.attenuationColor.r,n[a++]=h.attenuationColor.g,n[a++]=h.attenuationColor.b):(n[a++]=1,n[a++]=1,n[a++]=1),n[a++]=s(h,"attenuationDistance",1/0),n[a++]=r(h,"alphaMap"),n[a++]=h.opacity,n[a++]=h.alphaTest,!y&&h.transmission>0)n[a++]=0;else switch(h.side){case ha:n[a++]=1;break;case Et:n[a++]=-1;break;case Dt:n[a++]=0;break}n[a++]=Number(s(h,"matte",!1)),n[a++]=Number(s(h,"castShadow",!0)),n[a++]=Number(h.vertexColors)|Number(h.flatShading)<<1,n[a++]=Number(h.transparent),a+=o(h,"map",n,a),a+=o(h,"metalnessMap",n,a),a+=o(h,"roughnessMap",n,a),a+=o(h,"transmissionMap",n,a),a+=o(h,"emissiveMap",n,a),a+=o(h,"normalMap",n,a),a+=o(h,"clearcoatMap",n,a),a+=o(h,"clearcoatNormalMap",n,a),a+=o(h,"clearcoatRoughnessMap",n,a),a+=o(h,"sheenColorMap",n,a),a+=o(h,"sheenRoughnessMap",n,a),a+=o(h,"iridescenceMap",n,a),a+=o(h,"iridescenceThicknessMap",n,a),a+=o(h,"specularColorMap",n,a),a+=o(h,"specularIntensityMap",n,a),a+=o(h,"alphaMap",n,a)}const g=qe(n.buffer);return this.hash!==g?(this.hash=g,this.needsUpdate=!0,!0):!1}}const gt=new pe;function Hr(i){return i?`${i.uuid}:${i.version}`:null}function Wr(i,e){for(const t in e)t in i&&(i[t]=e[t])}class vt extends da{constructor(e,t,r){const s={format:C,type:Le,minFilter:N,magFilter:N,wrapS:L,wrapT:L,generateMipmaps:!1,...r};super(e,t,1,s),Wr(this.texture,s),this.texture.setTextures=(...a)=>{this.setTextures(...a)},this.hashes=[null];const o=new se(new Lr);this.fsQuad=o}setTextures(e,t,r=this.width,s=this.height){const o=e.getRenderTarget(),a=e.toneMapping,l=e.getClearAlpha();e.getClearColor(gt);const u=t.length||1;(r!==this.width||s!==this.height||this.depth!==u)&&(this.setSize(r,s,u),this.hashes=new Array(u).fill(null)),e.setClearColor(0,0),e.toneMapping=ma;const c=this.fsQuad,d=this.hashes;let f=!1;for(let n=0,g=u;n<g;n++){const m=t[n],v=Hr(m);m&&(d[n]!==v||m.isWebGLRenderTarget)&&(m.matrixAutoUpdate=!1,m.matrix.identity(),c.material.map=m,e.setRenderTarget(this,n),c.render(e),m.updateMatrix(),m.matrixAutoUpdate=!0,d[n]=v,f=!0)}return c.material.map=null,e.setClearColor(gt,l),e.setRenderTarget(o),e.toneMapping=a,f}dispose(){super.dispose(),this.fsQuad.dispose()}}class Lr extends Re{get map(){return this.uniforms.map.value}set map(e){this.uniforms.map.value=e}constructor(){super({uniforms:{map:{value:null}},vertexShader:`
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
			`})}}function jr(i,e=Math.random()){for(let t=i.length-1;t>0;t--){const r=Math.floor(e()*(t+1)),s=i[t];i[t]=i[r],i[r]=s}return i}class Ur{constructor(e,t,r=Math.random){const s=e**t,o=new Uint16Array(s);let a=s;for(let l=0;l<s;l++)o[l]=l;this.samples=new Float32Array(t),this.strataCount=e,this.reset=function(){for(let l=0;l<s;l++)o[l]=l;a=0},this.reshuffle=function(){a=0},this.next=function(){const{samples:l}=this;a>=o.length&&(jr(o,r),this.reshuffle());let u=o[a++];for(let c=0;c<t;c++)l[c]=(u%e+r())/e,u=Math.floor(u/e);return l}}}class Gr{constructor(e,t,r=Math.random){let s=0;for(const u of t)s+=u;const o=new Float32Array(s),a=[];let l=0;for(const u of t){const c=new Ur(e,u,r);c.samples=new Float32Array(o.buffer,l,c.samples.length),l+=c.samples.length*4,a.push(c)}this.samples=o,this.strataCount=e,this.next=function(){for(const u of a)u.next();return o},this.reshuffle=function(){for(const u of a)u.reshuffle()},this.reset=function(){for(const u of a)u.reset()}}}class Vr{constructor(e=0){this.m=2147483648,this.a=1103515245,this.c=12345,this.seed=e}nextInt(){return this.seed=(this.a*this.seed+this.c)%this.m,this.seed}nextFloat(){return this.nextInt()/(this.m-1)}}class qr extends k{constructor(e=1,t=1,r=8){super(new Float32Array(1),1,1,C,F),this.minFilter=_,this.magFilter=_,this.strata=r,this.sampler=null,this.generator=new Vr,this.stableNoise=!1,this.random=()=>this.stableNoise?this.generator.nextFloat():Math.random(),this.init(e,t,r)}init(e=this.image.height,t=this.image.width,r=this.strata){const{image:s}=this;if(s.width===t&&s.height===e&&this.sampler!==null)return;const o=new Array(e*t).fill(4),a=new Gr(r,o,this.random);s.width=t,s.height=e,s.data=a.samples,this.sampler=a,this.dispose(),this.next()}next(){this.sampler.next(),this.needsUpdate=!0}reset(){this.sampler.reset(),this.generator.seed=0}}function $r(i,e=Math.random){for(let t=i.length-1;t>0;t--){const r=~~((e()-1e-6)*t),s=i[t];i[t]=i[r],i[r]=s}}function Yr(i,e){i.fill(0);for(let t=0;t<e;t++)i[t]=1}class xt{constructor(e){this.count=0,this.size=-1,this.sigma=-1,this.radius=-1,this.lookupTable=null,this.score=null,this.binaryPattern=null,this.resize(e),this.setSigma(1.5)}findVoid(){const{score:e,binaryPattern:t}=this;let r=1/0,s=-1;for(let o=0,a=t.length;o<a;o++){if(t[o]!==0)continue;const l=e[o];l<r&&(r=l,s=o)}return s}findCluster(){const{score:e,binaryPattern:t}=this;let r=-1/0,s=-1;for(let o=0,a=t.length;o<a;o++){if(t[o]!==1)continue;const l=e[o];l>r&&(r=l,s=o)}return s}setSigma(e){if(e===this.sigma)return;const t=~~(Math.sqrt(20*e**2)+1),r=2*t+1,s=new Float32Array(r*r),o=e*e;for(let a=-t;a<=t;a++)for(let l=-t;l<=t;l++){const u=(t+l)*r+a+t,c=a*a+l*l;s[u]=Math.E**(-c/(2*o))}this.lookupTable=s,this.sigma=e,this.radius=t}resize(e){this.size!==e&&(this.size=e,this.score=new Float32Array(e*e),this.binaryPattern=new Uint8Array(e*e))}invert(){const{binaryPattern:e,score:t,size:r}=this;t.fill(0);for(let s=0,o=e.length;s<o;s++)if(e[s]===0){const a=~~(s/r),l=s-a*r;this.updateScore(l,a,1),e[s]=1}else e[s]=0}updateScore(e,t,r){const{size:s,score:o,lookupTable:a}=this,l=this.radius,u=2*l+1;for(let c=-l;c<=l;c++)for(let d=-l;d<=l;d++){const f=(l+d)*u+c+l,n=a[f];let g=e+c;g=g<0?s+g:g%s;let m=t+d;m=m<0?s+m:m%s;const v=m*s+g;o[v]+=r*n}}addPointIndex(e){this.binaryPattern[e]=1;const t=this.size,r=~~(e/t),s=e-r*t;this.updateScore(s,r,1),this.count++}removePointIndex(e){this.binaryPattern[e]=0;const t=this.size,r=~~(e/t),s=e-r*t;this.updateScore(s,r,-1),this.count--}copy(e){this.resize(e.size),this.score.set(e.score),this.binaryPattern.set(e.binaryPattern),this.setSigma(e.sigma),this.count=e.count}}class Xr{constructor(){this.random=Math.random,this.sigma=1.5,this.size=64,this.majorityPointsRatio=.1,this.samples=new xt(1),this.savedSamples=new xt(1)}generate(){const{samples:e,savedSamples:t,sigma:r,majorityPointsRatio:s,size:o}=this;e.resize(o),e.setSigma(r);const a=Math.floor(o*o*s),l=e.binaryPattern;Yr(l,a),$r(l,this.random);for(let f=0,n=l.length;f<n;f++)l[f]===1&&e.addPointIndex(f);for(;;){const f=e.findCluster();e.removePointIndex(f);const n=e.findVoid();if(f===n){e.addPointIndex(f);break}e.addPointIndex(n)}const u=new Uint32Array(o*o);t.copy(e);let c;for(c=e.count-1;c>=0;){const f=e.findCluster();e.removePointIndex(f),u[f]=c,c--}const d=o*o;for(c=t.count;c<d/2;){const f=t.findVoid();t.addPointIndex(f),u[f]=c,c++}for(t.invert();c<d;){const f=t.findCluster();t.removePointIndex(f),u[f]=c,c++}return{data:u,maxValue:d}}}function Qr(i){return i>=3?4:i}function Kr(i){switch(i){case 1:return _e;case 2:return Ct;default:return C}}class Zr extends k{constructor(e=64,t=1){super(new Float32Array(4),1,1,C,F),this.minFilter=_,this.magFilter=_,this.size=e,this.channels=t,this.update()}update(){const e=this.channels,t=this.size,r=new Xr;r.channels=e,r.size=t;const s=Qr(e),o=Kr(s);(this.image.width!==t||o!==this.format)&&(this.image.width=t,this.image.height=t,this.image.data=new Float32Array(t**2*s),this.format=o,this.dispose());const a=this.image.data;for(let l=0,u=e;l<u;l++){const c=r.generate(),d=c.data,f=c.maxValue;for(let n=0,g=d.length;n<g;n++){const m=d[n]/f;a[n*s+l]=m}}this.needsUpdate=!0}}const Jr=`

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

`,$t=`

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

`;class Mi extends Ce{onBeforeRender(){this.setDefine("FEATURE_DOF",this.physicalCamera.bokehSize===0?0:1),this.setDefine("FEATURE_BACKGROUND_MAP",this.backgroundMap?1:0),this.setDefine("FEATURE_FOG",this.materials.features.isUsed("FOG")?1:0)}constructor(e){super({transparent:!0,depthWrite:!1,defines:{FEATURE_MIS:1,FEATURE_RUSSIAN_ROULETTE:1,FEATURE_DOF:1,FEATURE_BACKGROUND_MAP:0,FEATURE_FOG:1,RANDOM_TYPE:2,CAMERA_TYPE:0,DEBUG_MODE:0,ATTR_NORMAL:0,ATTR_TANGENT:1,ATTR_UV:2,ATTR_COLOR:3,MATERIAL_PIXELS:Ye},uniforms:{resolution:{value:new q},opacity:{value:1},bounces:{value:10},transmissiveBounces:{value:10},filterGlossyFactor:{value:0},physicalCamera:{value:new br},cameraWorldMatrix:{value:new X},invProjectionMatrix:{value:new X},bvh:{value:new Ua},attributesArray:{value:new Dr},materialIndexAttribute:{value:new Lt},materials:{value:new Nr},textures:{value:new vt().texture},lights:{value:new Fr},iesProfiles:{value:new vt(360,180,{type:W,wrapS:Q,wrapT:Q}).texture},environmentIntensity:{value:1},environmentRotation:{value:new X},envMapInfo:{value:new Sr},backgroundBlur:{value:0},backgroundMap:{value:null},backgroundAlpha:{value:1},backgroundIntensity:{value:1},backgroundRotation:{value:new X},seed:{value:0},sobolTexture:{value:null},stratifiedTexture:{value:new qr},stratifiedOffsetTexture:{value:new Zr(64,1)}},vertexShader:`

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
					${qt}
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
				${$t}
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

			`}),this.setValues(e)}}function*Ii(){const{_renderer:i,_fsQuad:e,_blendQuad:t,_primaryTarget:r,_blendTargets:s,_sobolTarget:o,_subframe:a,alpha:l,material:u}=this,c=new ue,d=new ue,f=t.material;let[n,g]=s;for(;;){l?(f.opacity=this._opacityFactor/(this.samples+1),u.blending=fe,u.opacity=1):(u.opacity=this._opacityFactor/(this.samples+1),u.blending=kt);const[m,v,h,x]=a,y=r.width,b=r.height;u.resolution.set(y*h,b*x),u.sobolTexture=o.texture,u.stratifiedTexture.init(20,u.bounces+u.transmissiveBounces+5),u.stratifiedTexture.next(),u.seed++;const S=this.tiles.x||1,M=this.tiles.y||1,I=S*M,O=Math.ceil(y*h),K=Math.ceil(b*x),ve=Math.floor(m*y),xe=Math.floor(v*b),j=Math.ceil(O/S),U=Math.ceil(K/M);for(let $=0;$<M;$++)for(let ye=0;ye<S;ye++){const Xe=i.getRenderTarget(),Qt=i.autoClear,Kt=i.getScissorTest();i.getScissor(c),i.getViewport(d);let Fe=ye,Qe=$;if(!this.stableTiles){const Pe=this._currentTile%(S*M);Fe=Pe%S,Qe=~~(Pe/S),this._currentTile=Pe+1}const Ke=M-Qe-1;r.scissor.set(ve+Fe*j,xe+Ke*U,Math.min(j,O-Fe*j),Math.min(U,K-Ke*U)),r.viewport.set(ve,xe,O,K),i.setRenderTarget(r),i.setScissorTest(!0),i.autoClear=!1,e.render(i),i.setViewport(d),i.setScissor(c),i.setScissorTest(Kt),i.setRenderTarget(Xe),i.autoClear=Qt,l&&(f.target1=n.texture,f.target2=r.texture,i.setRenderTarget(g),t.render(i),i.setRenderTarget(Xe)),this.samples+=1/I,ye===S-1&&$===M-1&&(this.samples=Math.round(this.samples)),yield}[n,g]=[g,n]}}const bt=new pe;class Tt{get material(){return this._fsQuad.material}set material(e){this._fsQuad.material.removeEventListener("recompilation",this._compileFunction),e.addEventListener("recompilation",this._compileFunction),this._fsQuad.material=e}get target(){return this._alpha?this._blendTargets[1]:this._primaryTarget}set alpha(e){this._alpha!==e&&(e||(this._blendTargets[0].dispose(),this._blendTargets[1].dispose()),this._alpha=e,this.reset())}get alpha(){return this._alpha}get isCompiling(){return!!this._compilePromise}constructor(e){this.camera=null,this.tiles=new q(3,3),this.stableNoise=!1,this.stableTiles=!0,this.samples=0,this._subframe=new ue(0,0,1,1),this._opacityFactor=1,this._renderer=e,this._alpha=!1,this._fsQuad=new se(new Mi),this._blendQuad=new se(new mr),this._task=null,this._currentTile=0,this._compilePromise=null,this._sobolTarget=new xr().generate(e),this._primaryTarget=new me(1,1,{format:C,type:F,magFilter:_,minFilter:_}),this._blendTargets=[new me(1,1,{format:C,type:F,magFilter:_,minFilter:_}),new me(1,1,{format:C,type:F,magFilter:_,minFilter:_})],this._compileFunction=()=>{const t=this.compileMaterial(this._fsQuad._mesh);t.then(()=>{this._compilePromise===t&&(this._compilePromise=null)}),this._compilePromise=t},this.material.addEventListener("recompilation",this._compileFunction)}compileMaterial(){return this._renderer.compileAsync(this._fsQuad._mesh)}setCamera(e){const{material:t}=this;t.cameraWorldMatrix.copy(e.matrixWorld),t.invProjectionMatrix.copy(e.projectionMatrixInverse),t.physicalCamera.updateFrom(e);let r=0;e.projectionMatrix.elements[15]>0&&(r=1),e.isEquirectCamera&&(r=2),t.setDefine("CAMERA_TYPE",r),this.camera=e}setSize(e,t){e=Math.ceil(e),t=Math.ceil(t),!(this._primaryTarget.width===e&&this._primaryTarget.height===t)&&(this._primaryTarget.setSize(e,t),this._blendTargets[0].setSize(e,t),this._blendTargets[1].setSize(e,t),this.reset())}getSize(e){e.x=this._primaryTarget.width,e.y=this._primaryTarget.height}dispose(){this._primaryTarget.dispose(),this._blendTargets[0].dispose(),this._blendTargets[1].dispose(),this._sobolTarget.dispose(),this._fsQuad.dispose(),this._blendQuad.dispose(),this._task=null}reset(){const{_renderer:e,_primaryTarget:t,_blendTargets:r}=this,s=e.getRenderTarget(),o=e.getClearAlpha();e.getClearColor(bt),e.setRenderTarget(t),e.setClearColor(0,0),e.clearColor(),e.setRenderTarget(r[0]),e.setClearColor(0,0),e.clearColor(),e.setRenderTarget(r[1]),e.setClearColor(0,0),e.clearColor(),e.setClearColor(bt,o),e.setRenderTarget(s),this.samples=0,this._task=null,this.material.stratifiedTexture.stableNoise=this.stableNoise,this.stableNoise&&(this.material.seed=0,this.material.stratifiedTexture.reset())}update(){this.material.onBeforeRender(),!this.isCompiling&&(this._task||(this._task=Ii.call(this)),this._task.next())}}const te=new q,wt=new q,Me=new pa,Ie=new pe;class _i extends k{constructor(e=512,t=512){super(new Float32Array(e*t*4),e,t,C,F,Ot,L,Q,N,N),this.generationCallback=null}update(){this.dispose(),this.needsUpdate=!0;const{data:e,width:t,height:r}=this.image;for(let s=0;s<t;s++)for(let o=0;o<r;o++){wt.set(t,r),te.set(s/t,o/r),te.x-=.5,te.y=1-te.y,Me.theta=te.x*2*Math.PI,Me.phi=te.y*Math.PI,Me.radius=1,this.generationCallback(Me,te,wt,Ie);const l=4*(o*t+s);e[l+0]=Ie.r,e[l+1]=Ie.g,e[l+2]=Ie.b,e[l+3]=1}}copy(e){return super.copy(e),this.generationCallback=e.generationCallback,this}}const St=new R;class Ri extends _i{constructor(e=512){super(e,e),this.topColor=new pe().set(16777215),this.bottomColor=new pe().set(0),this.exponent=2,this.generationCallback=(t,r,s,o)=>{St.setFromSpherical(t);const a=St.y*.5+.5;o.lerpColors(this.bottomColor,this.topColor,a**this.exponent)}}copy(e){return super.copy(e),this.topColor.copy(e.topColor),this.bottomColor.copy(e.bottomColor),this}}class Ai extends Re{get map(){return this.uniforms.map.value}set map(e){this.uniforms.map.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}constructor(e){super({uniforms:{map:{value:null},opacity:{value:1}},vertexShader:`
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
			`}),this.setValues(e)}}class Ci extends Re{constructor(){super({uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:`
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

				${$t}

				void main() {

					vec3 rayDirection = equirectUvToDirection( vUv );
					rayDirection.x *= flipEnvMap;
					gl_FragColor = textureCube( envMap, rayDirection );

				}`}),this.depthWrite=!1,this.depthTest=!1}}class Mt{constructor(e){this._renderer=e,this._quad=new se(new Ci)}generate(e,t=null,r=null){if(!e.isCubeTexture)throw new Error("CubeToEquirectMaterial: Source can only be cube textures.");const s=e.images[0],o=this._renderer,a=this._quad;t===null&&(t=4*s.height),r===null&&(r=2*s.height);const l=new me(t,r,{type:F,colorSpace:s.colorSpace}),u=s.height,c=Math.log2(u)-2,d=1/u,f=1/(3*Math.max(Math.pow(2,c),112));a.material.defines.CUBEUV_MAX_MIP=`${c}.0`,a.material.defines.CUBEUV_TEXEL_WIDTH=f,a.material.defines.CUBEUV_TEXEL_HEIGHT=d,a.material.uniforms.envMap.value=e,a.material.uniforms.flipEnvMap.value=e.isRenderTargetTexture?1:-1,a.material.needsUpdate=!0;const n=o.getRenderTarget(),g=o.autoClear;o.autoClear=!0,o.setRenderTarget(l),a.render(o),o.setRenderTarget(n),o.autoClear=g;const m=new Uint16Array(t*r*4),v=new Float32Array(t*r*4);o.readRenderTargetPixels(l,0,0,t,r,v),l.dispose();for(let x=0,y=v.length;x<y;x++)m[x]=V.toHalfFloat(v[x]);const h=new k(m,t,r,C,W);return h.minFilter=ga,h.magFilter=N,h.wrapS=L,h.wrapT=L,h.mapping=Ot,h.needsUpdate=!0,h}dispose(){this._quad.dispose()}}function Fi(i){return i.extensions.get("EXT_float_blend")}const le=new q;class Pi{get multipleImportanceSampling(){return!!this._pathTracer.material.defines.FEATURE_MIS}set multipleImportanceSampling(e){this._pathTracer.material.setDefine("FEATURE_MIS",e?1:0)}get transmissiveBounces(){return this._pathTracer.material.transmissiveBounces}set transmissiveBounces(e){this._pathTracer.material.transmissiveBounces=e}get bounces(){return this._pathTracer.material.bounces}set bounces(e){this._pathTracer.material.bounces=e}get filterGlossyFactor(){return this._pathTracer.material.filterGlossyFactor}set filterGlossyFactor(e){this._pathTracer.material.filterGlossyFactor=e}get samples(){return this._pathTracer.samples}get target(){return this._pathTracer.target}get tiles(){return this._pathTracer.tiles}get stableNoise(){return this._pathTracer.stableNoise}set stableNoise(e){this._pathTracer.stableNoise=e}get isCompiling(){return!!this._pathTracer.isCompiling}constructor(e){this._renderer=e,this._generator=new dr,this._pathTracer=new Tt(e),this._queueReset=!1,this._clock=new va,this._compilePromise=null,this._lowResPathTracer=new Tt(e),this._lowResPathTracer.tiles.set(1,1),this._quad=new se(new Ai({map:null,transparent:!0,blending:fe,premultipliedAlpha:e.getContextAttributes().premultipliedAlpha})),this._materials=null,this._previousEnvironment=null,this._previousBackground=null,this._internalBackground=null,this.renderDelay=100,this.minSamples=5,this.fadeDuration=500,this.enablePathTracing=!0,this.pausePathTracing=!1,this.dynamicLowRes=!1,this.lowResScale=.25,this.renderScale=1,this.synchronizeRenderSize=!0,this.rasterizeScene=!0,this.renderToCanvas=!0,this.textureSize=new q(1024,1024),this.rasterizeSceneCallback=(t,r)=>{this._renderer.render(t,r)},this.renderToCanvasCallback=(t,r,s)=>{const o=r.autoClear;r.autoClear=!1,s.render(r),r.autoClear=o},this.setScene(new xa,new Ft)}setBVHWorker(e){this._generator.setBVHWorker(e)}setScene(e,t,r={}){e.updateMatrixWorld(!0),t.updateMatrixWorld();const s=this._generator;if(s.setObjects(e),this._buildAsync)return s.generateAsync(r.onProgress).then(o=>this._updateFromResults(e,t,o));{const o=s.generate();return this._updateFromResults(e,t,o)}}setSceneAsync(...e){this._buildAsync=!0;const t=this.setScene(...e);return this._buildAsync=!1,t}setCamera(e){this.camera=e,this.updateCamera()}updateCamera(){const e=this.camera;e.updateMatrixWorld(),this._pathTracer.setCamera(e),this._lowResPathTracer.setCamera(e),this.reset()}updateMaterials(){const e=this._pathTracer.material,t=this._renderer,r=this._materials,s=this.textureSize,o=Or(r);e.textures.setTextures(t,o,s.x,s.y),e.materials.updateFrom(r,o),this.reset()}updateLights(){const e=this.scene,t=this._renderer,r=this._pathTracer.material,s=zr(e),o=kr(s);r.lights.updateFrom(s,o),r.iesProfiles.setTextures(t,o),this.reset()}updateEnvironment(){const e=this.scene,t=this._pathTracer.material;if(this._internalBackground&&(this._internalBackground.dispose(),this._internalBackground=null),t.backgroundBlur=e.backgroundBlurriness,t.backgroundIntensity=e.backgroundIntensity??1,t.backgroundRotation.makeRotationFromEuler(e.backgroundRotation).invert(),e.background===null)t.backgroundMap=null,t.backgroundAlpha=0;else if(e.background.isColor){this._colorBackground=this._colorBackground||new Ri(16);const r=this._colorBackground;r.topColor.equals(e.background)||(r.topColor.set(e.background),r.bottomColor.set(e.background),r.update()),t.backgroundMap=r,t.backgroundAlpha=1}else if(e.background.isCubeTexture){if(e.background!==this._previousBackground){const r=new Mt(this._renderer).generate(e.background);this._internalBackground=r,t.backgroundMap=r,t.backgroundAlpha=1}}else t.backgroundMap=e.background,t.backgroundAlpha=1;if(t.environmentIntensity=e.environment!==null?e.environmentIntensity??1:0,t.environmentRotation.makeRotationFromEuler(e.environmentRotation).invert(),this._previousEnvironment!==e.environment&&e.environment!==null)if(e.environment.isCubeTexture){const r=new Mt(this._renderer).generate(e.environment);t.envMapInfo.updateFrom(r)}else t.envMapInfo.updateFrom(e.environment);this._previousEnvironment=e.environment,this._previousBackground=e.background,this.reset()}_updateFromResults(e,t,r){const{materials:s,geometry:o,bvh:a,bvhChanged:l,needsMaterialIndexUpdate:u}=r;this._materials=s;const d=this._pathTracer.material;return l&&(d.bvh.updateFrom(a),d.attributesArray.updateFrom(o.attributes.normal,o.attributes.tangent,o.attributes.uv,o.attributes.color)),u&&d.materialIndexAttribute.updateFrom(o.attributes.materialIndex),this._previousScene=e,this.scene=e,this.camera=t,this.updateCamera(),this.updateMaterials(),this.updateEnvironment(),this.updateLights(),r}renderSample(){const e=this._lowResPathTracer,t=this._pathTracer,r=this._renderer,s=this._clock,o=this._quad;this._updateScale(),this._queueReset&&(t.reset(),e.reset(),this._queueReset=!1,o.material.opacity=0,s.start());const a=s.getDelta()*1e3,l=s.getElapsedTime()*1e3;if(!this.pausePathTracing&&this.enablePathTracing&&this.renderDelay<=l&&!this.isCompiling&&t.update(),t.alpha=t.material.backgroundAlpha!==1||!Fi(r),e.alpha=t.alpha,this.renderToCanvas){const u=this._renderer,c=this.minSamples;if(l>=this.renderDelay&&this.samples>=this.minSamples&&(this.fadeDuration!==0?o.material.opacity=Math.min(o.material.opacity+a/this.fadeDuration,1):o.material.opacity=1),!this.enablePathTracing||this.samples<c||o.material.opacity<1){if(this.dynamicLowRes&&!this.isCompiling){e.samples<1&&(e.material=t.material,e.update());const d=o.material.opacity;o.material.opacity=1-o.material.opacity,o.material.map=e.target.texture,o.render(u),o.material.opacity=d}(!this.dynamicLowRes&&this.rasterizeScene||this.dynamicLowRes&&this.isCompiling)&&this.rasterizeSceneCallback(this.scene,this.camera)}this.enablePathTracing&&o.material.opacity>0&&(o.material.opacity<1&&(o.material.blending=this.dynamicLowRes?zt:kt),o.material.map=t.target.texture,this.renderToCanvasCallback(t.target,u,o),o.material.blending=fe)}}reset(){this._queueReset=!0,this._pathTracer.samples=0}dispose(){this._quad.dispose(),this._quad.material.dispose(),this._pathTracer.dispose()}_updateScale(){if(this.synchronizeRenderSize){this._renderer.getDrawingBufferSize(le);const e=Math.floor(this.renderScale*le.x),t=Math.floor(this.renderScale*le.y);if(this._pathTracer.getSize(le),le.x!==e||le.y!==t){const r=this.lowResScale;this._pathTracer.setSize(e,t),this._lowResPathTracer.setSize(Math.floor(e*r),Math.floor(t*r))}}}}class Di extends Ce{constructor(e){super({blending:fe,transparent:!1,depthWrite:!1,depthTest:!1,defines:{USE_SLIDER:0},uniforms:{sigma:{value:5},threshold:{value:.03},kSigma:{value:1},map:{value:null},opacity:{value:1}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}

			`,fragmentShader:`

				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
				//  Copyright (c) 2018-2019 Michele Morrone
				//  All rights reserved.
				//
				//  https://michelemorrone.eu - https://BrutPitt.com
				//
				//  me@michelemorrone.eu - brutpitt@gmail.com
				//  twitter: @BrutPitt - github: BrutPitt
				//
				//  https://github.com/BrutPitt/glslSmartDeNoise/
				//
				//  This software is distributed under the terms of the BSD 2-Clause license
				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

				uniform sampler2D map;

				uniform float sigma;
				uniform float threshold;
				uniform float kSigma;
				uniform float opacity;

				varying vec2 vUv;

				#define INV_SQRT_OF_2PI 0.39894228040143267793994605993439
				#define INV_PI 0.31830988618379067153776752674503

				// Parameters:
				//	 sampler2D tex	 - sampler image / texture
				//	 vec2 uv		   - actual fragment coord
				//	 float sigma  >  0 - sigma Standard Deviation
				//	 float kSigma >= 0 - sigma coefficient
				//		 kSigma * sigma  -->  radius of the circular kernel
				//	 float threshold   - edge sharpening threshold
				vec4 smartDeNoise( sampler2D tex, vec2 uv, float sigma, float kSigma, float threshold ) {

					float radius = round( kSigma * sigma );
					float radQ = radius * radius;

					float invSigmaQx2 = 0.5 / ( sigma * sigma );
					float invSigmaQx2PI = INV_PI * invSigmaQx2;

					float invThresholdSqx2 = 0.5 / ( threshold * threshold );
					float invThresholdSqrt2PI = INV_SQRT_OF_2PI / threshold;

					vec4 centrPx = texture2D( tex, uv );
					centrPx.rgb *= centrPx.a;

					float zBuff = 0.0;
					vec4 aBuff = vec4( 0.0 );
					vec2 size = vec2( textureSize( tex, 0 ) );

					vec2 d;
					for ( d.x = - radius; d.x <= radius; d.x ++ ) {

						float pt = sqrt( radQ - d.x * d.x );

						for ( d.y = - pt; d.y <= pt; d.y ++ ) {

							float blurFactor = exp( - dot( d, d ) * invSigmaQx2 ) * invSigmaQx2PI;

							vec4 walkPx = texture2D( tex, uv + d / size );
							walkPx.rgb *= walkPx.a;

							vec4 dC = walkPx - centrPx;
							float deltaFactor = exp( - dot( dC.rgba, dC.rgba ) * invThresholdSqx2 ) * invThresholdSqrt2PI * blurFactor;

							zBuff += deltaFactor;
							aBuff += deltaFactor * walkPx;

						}

					}

					return aBuff / zBuff;

				}

				void main() {

					gl_FragColor = smartDeNoise( map, vec2( vUv.x, vUv.y ), sigma, kSigma, threshold );
					#include <tonemapping_fragment>
					#include <colorspace_fragment>
					#include <premultiplied_alpha_fragment>

					gl_FragColor.a *= opacity;

				}

			`}),this.setValues(e)}}const D=2.25,ae=10.8,Ei=-2.15,ki=10.5,G=64,Yt=(Ei+ki)/2,Oi=.3,He=24,It=new R,Y=new R;new Ra;const We=new Map;function zi(i){if(We.has(i))return We.get(i);const e=document.createElement("canvas");e.width=128,e.height=128;const t=e.getContext("2d");t.clearRect(0,0,128,128),t.fillStyle="#17191a",t.font="700 72px ui-sans-serif, system-ui, sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(String(i),64,68);const r=new Ht(e);return r.colorSpace=Ae,We.set(i,r),r}const Bi=ra.getProject("Gravity Museum — ChatGPT",{state:{sheetsById:{},definitionVersion:"0.4.0",revisionHistory:[]}}),Xt=Bi.sheet("Exhibition collapse"),E=Xt.object("Gallery chronology",{glideEnds:3.1,pulseAt:3.45,gravityAt:4.25,sidewaysAt:9.4,upwardAt:14.2,cycleEnds:20.5,cameraStartZ:21,cameraEndZ:13.5});Ue.prototype.raycast!==at&&(Ue.prototype.raycast=at);function T(i,e=1){const t=Math.sin(i*127.1+e*311.7)*43758.5453123;return t-Math.floor(t)}function Ni(i,e=3){const t=Math.round(i),r=[-40,-24,-12,-32,-7,-46,-18,-28],s=-6,o=-G+14,a=Math.max(1,Math.ceil(t/5)),l=Math.min(5.25,(s-o)/a);return Array.from({length:t},(u,c)=>{const d=c%5-2,f=Math.floor(c/5),n=.48+T(c,5)*.78;return{id:`artifact-${c}`,isLight:c<e,lightIndex:c<e?c:-1,type:c%12,material:[0,1,2,3,0,1,4,4,4,4,4,4][c%12],position:c<e?[D+(c%3-1)*4.3,1.2+c%2*4.4,r[c]]:[D+d*3.35+(T(c,8)-.5)*1.3,.5+T(c,11)*8.2,s-f*l-T(c,17)*(l*.48)],rotation:[T(c,21)*Math.PI,T(c,22)*Math.PI,T(c,23)*Math.PI],scale:n,radius:Hi(c%6)}})}function Hi(i){return[1.2,1.05,1,1.35,1.18,1.25,1.05,1.05,1.05,1.08,1.08,1.05][i]??1.1}function re(i,e,t=[3,3]){const r=document.createElement("canvas");r.width=512,r.height=512;const s=r.getContext("2d"),o=s.createLinearGradient(0,0,i==="metal"||i==="brushed-vertical"?0:512,512);if(e.forEach((l,u)=>o.addColorStop(u/(e.length-1),l)),s.fillStyle=o,s.fillRect(0,0,512,512),i==="wood")for(let l=0;l<38;l+=1){const u=l*14+T(l,404)*10;s.beginPath();for(let c=-20;c<=532;c+=8){const d=Math.sin(c*.025+l*.72)*(5+T(l,405)*8),f=Math.sin(c*.008-l)*4;c===-20?s.moveTo(c,u+d+f):s.lineTo(c,u+d+f)}s.strokeStyle=`rgba(48, 22, 8, ${.1+T(l,406)*.22})`,s.lineWidth=1+T(l,407)*3,s.stroke()}else if(i==="stone")for(let l=0;l<14;l+=1){s.beginPath();const u=T(l,511)*560-24;for(let c=-20;c<=532;c+=12){const d=u+c*(T(l,512)-.5)*.65+Math.sin(c*.025+l)*18;c===-20?s.moveTo(d,c):s.lineTo(d,c)}s.strokeStyle=`rgba(42, 46, 45, ${.08+T(l,513)*.18})`,s.lineWidth=2+T(l,514)*7,s.stroke()}else if(i==="brushed-vertical"){for(let l=0;l<92;l+=1){const u=T(l,601)*512,c=T(l,602)*180-40;s.strokeStyle=`rgba(255, 246, 222, ${.025+T(l,603)*.11})`,s.lineWidth=.5+T(l,604)*1.6,s.beginPath(),s.moveTo(u,c),s.lineTo(u+(T(l,606)-.5)*2,c+280+T(l,605)*260),s.stroke()}for(let l=0;l<10;l+=1){const u=T(l,611)*512,c=T(l,612)*512,d=40+T(l,613)*90,f=s.createRadialGradient(u,c,0,u,c,d);f.addColorStop(0,`rgba(20, 22, 22, ${.05+T(l,614)*.08})`),f.addColorStop(1,"rgba(20, 22, 22, 0)"),s.fillStyle=f,s.fillRect(u-d,c-d,d*2,d*2)}}else if(i==="turned-metal"){for(let c=0;c<130;c+=1){const d=6+c*2.8+T(c,701)*2;if(d>362)break;s.strokeStyle=`rgba(255, 250, 235, ${.02+T(c,702)*.1})`,s.lineWidth=.6+T(c,703)*2,s.beginPath(),s.arc(256,256,d,0,Math.PI*2),s.stroke()}for(let c=0;c<6;c+=1){const d=T(c,711)*Math.PI*2,f=T(c,712)*220,n=256+Math.cos(d)*f,g=256+Math.sin(d)*f,m=50+T(c,713)*100,v=s.createRadialGradient(n,g,0,n,g,m);v.addColorStop(0,`rgba(15, 16, 16, ${.05+T(c,714)*.07})`),v.addColorStop(1,"rgba(15, 16, 16, 0)"),s.fillStyle=v,s.fillRect(n-m,g-m,m*2,m*2)}}else for(let l=0;l<92;l+=1){const u=T(l,601)*512,c=T(l,602)*180-40;s.strokeStyle=`rgba(255, 246, 222, ${.025+T(l,603)*.11})`,s.lineWidth=.5+T(l,604)*1.6,s.beginPath(),s.moveTo(c,u),s.lineTo(c+280+T(l,605)*260,u+(T(l,606)-.5)*2),s.stroke()}const a=new Ht(r);return a.colorSpace=Ae,a.wrapS=L,a.wrapT=L,a.repeat.set(...t),a.anisotropy=8,a}function Wi(){const i=w.useMemo(()=>{const e={ring:new Ma(.82,.16,12,42),cube:new ke(1.55,1.55,1.55,2,2,2),sphere:new Je(1,2),knot:new Sa(.68,.16,72,9,2,3),shard:new et(1.1,1),stair:new ke(1,1,1),d4:new wa(1.08,0),d6:new ke(1.48,1.48,1.48),d8:new et(1.12,0),d10:new Ta(.78,.78,1.55,10,1),d12:new ba(1.08,0),d20:new Je(1.12,0)};Object.values(e).forEach(v=>{v.computeBoundingBox(),v.computeBoundingSphere(),Wa.call(v,{maxLeafTris:8})});const t=re("metal",["#4b2c16","#a8783e","#5b351b"],[4,2]),r=re("metal",["#4d5557","#aeb7b8","#626b6d"],[2,12]),s=re("wood",["#3a1d0d","#8b542a","#4c2813"],[2,5]),o=re("stone",["#4c504d","#96978f","#626661"],[3,3]),a=re("stone",["#bdb5a6","#f0e6d1","#cbc0ab"],[2,2]),l=re("brushed-vertical",["#494f51","#a7afb1","#5c6365"],[8,1]),u=re("turned-metal",["#565c5e","#91999b","#6b7274"],[1,1]),c=new z({map:t,bumpMap:t,bumpScale:.035,color:"#a98255",roughness:.23,metalness:.92,emissive:"#2b1406",emissiveIntensity:.12}),d=new Ia({color:"#79c8d8",roughness:.08,metalness:.06,transmission:.78,thickness:1.15,ior:1.36,transparent:!0,opacity:.84,side:Dt}),f=new z({map:s,bumpMap:s,bumpScale:.055,color:"#c28a59",roughness:.62,metalness:.03}),n=new z({map:o,bumpMap:o,bumpScale:.07,color:"#a5aaa4",roughness:.78,metalness:.04}),g=new z({map:a,bumpMap:a,bumpScale:.025,color:"#fff8e9",roughness:.34,metalness:.08}),m=new z({map:r,color:"#262a32",roughness:.42,metalness:.72,transparent:!0,opacity:.24});return{geometries:e,materials:[c,d,f,n,g],backgroundMaterial:m,shellMaterials:{drum:new z({map:l,bumpMap:l,bumpScale:.022,color:"#c4cbca",roughness:.3,metalness:.74,side:Et}),ribs:new z({map:s,bumpMap:s,bumpScale:.065,color:"#b77d42",roughness:.42,metalness:.28}),luminousRib:new z({map:a,bumpMap:a,bumpScale:.018,color:"#fff1c4",roughness:.24,metalness:.18,emissive:"#ffb347",emissiveIntensity:4.5}),trim:new z({map:t,bumpMap:t,bumpScale:.025,color:"#e2b875",roughness:.27,metalness:.82,emissive:"#5a2c0d",emissiveIntensity:.12}),back:new z({map:u,bumpMap:u,bumpScale:.03,color:"#7a8285",roughness:.42,metalness:.5}),hub:new z({map:r,bumpMap:r,bumpScale:.02,color:"#596264",roughness:.27,metalness:.88,emissive:"#f4ecd6",emissiveIntensity:.55})},textures:[t,r,s,o,a,l,u]}},[]);return w.useEffect(()=>()=>{Object.values(i.geometries).forEach(e=>{var t,r;(r=(t=e.boundsTree)==null?void 0:t.dispose)==null||r.call(t),e.dispose()}),i.materials.forEach(e=>e.dispose()),i.backgroundMaterial.dispose(),Object.values(i.shellMaterials).forEach(e=>e.dispose()),i.textures.forEach(e=>e.dispose())},[i]),i}function Li({descriptor:i,assets:e,frozen:t}){const r=e.materials[i.material],s=t?"#fff8df":"#8ca1b2";if(i.isLight)return p.jsxs("group",{rotation:[0,0,-.18],children:[p.jsxs("mesh",{position:[0,.34,0],castShadow:!0,receiveShadow:!0,children:[p.jsx("sphereGeometry",{args:[.9,32,22]}),p.jsx("meshPhysicalMaterial",{color:"#fff7dc",transmission:.72,thickness:.18,roughness:.06,transparent:!0,opacity:.8})]}),p.jsxs("mesh",{position:[0,.18,0],scale:[.2,.46,.2],children:[p.jsx("sphereGeometry",{args:[1,18,12]}),p.jsx("meshStandardMaterial",{color:"#fff4b5",emissive:"#ff9f24",emissiveIntensity:12,toneMapped:!1})]}),p.jsxs("mesh",{position:[0,-.55,0],castShadow:!0,receiveShadow:!0,children:[p.jsx("cylinderGeometry",{args:[.5,.43,.92,24]}),p.jsx("meshStandardMaterial",{color:"#90816a",metalness:.92,roughness:.25})]}),[-.86,-.66,-.46,-.26].map(o=>p.jsxs("mesh",{position:[0,o,0],rotation:[Math.PI*.5,0,0],children:[p.jsx("torusGeometry",{args:[.48,.058,8,28]}),p.jsx("meshStandardMaterial",{color:"#c4b79b",metalness:.94,roughness:.22})]},o)),p.jsx("pointLight",{position:[0,.25,0],color:i.lightIndex%2?"#ffd18a":"#ffad42",intensity:38,distance:20,decay:1.85,castShadow:!0,"shadow-mapSize":[512,512],"shadow-bias":-.0015})]});if(i.type>=6){const o=["d4","d6","d8","d10","d12","d20"],a=[4,6,8,10,12,20],l=i.type-6,u=1+Math.floor(T(i.type+i.position[2],913)*a[l]);return p.jsxs("group",{children:[p.jsx("mesh",{geometry:e.geometries[o[l]],material:e.materials[4],castShadow:!0,receiveShadow:!0}),p.jsxs("mesh",{position:[0,0,1.13],children:[p.jsx("circleGeometry",{args:[.34,24]}),p.jsx("meshBasicMaterial",{map:zi(u),transparent:!0,polygonOffset:!0,polygonOffsetFactor:-2})]})]})}return i.type===0?p.jsxs("group",{children:[p.jsx("mesh",{geometry:e.geometries.ring,material:r,castShadow:!0,receiveShadow:!0}),p.jsx("mesh",{geometry:e.geometries.ring,rotation:[Math.PI*.5,.4,0],scale:.67,children:p.jsx("meshBasicMaterial",{color:s,wireframe:!0,transparent:!0,opacity:t?.74:.17,toneMapped:!1})})]}):i.type===1?p.jsxs("group",{children:[p.jsx("mesh",{geometry:e.geometries.cube,material:r,castShadow:!0,receiveShadow:!0}),[0,1,2].map(o=>p.jsx("mesh",{geometry:e.geometries.shard,material:e.materials[3],position:[(o-1)*.48,o*.19-.2,.32-o*.2],scale:.22+o*.04},o))]}):i.type===2?p.jsxs("group",{children:[p.jsx("mesh",{geometry:e.geometries.sphere,material:r,castShadow:!0,receiveShadow:!0}),p.jsx("mesh",{geometry:e.geometries.sphere,scale:.58,children:p.jsx("meshBasicMaterial",{color:"#d9fbff",wireframe:!0,transparent:!0,opacity:.25,toneMapped:!1})})]}):i.type===3?p.jsx("group",{position:[-.7,-.55,0],children:Array.from({length:6},(o,a)=>p.jsx("mesh",{geometry:e.geometries.stair,material:r,position:[a*.27,a*.2,0],scale:[.32,.2,1.15],castShadow:!0,receiveShadow:!0},a))}):i.type===4?i.isLight?p.jsxs("group",{rotation:[0,0,-.18],children:[p.jsxs("mesh",{position:[0,.34,0],castShadow:!0,receiveShadow:!0,children:[p.jsx("sphereGeometry",{args:[.82,32,22]}),p.jsx("meshPhysicalMaterial",{color:"#fff4d3",transmission:.82,thickness:.16,roughness:.08,transparent:!0,opacity:.72})]}),p.jsxs("mesh",{position:[0,.18,0],scale:[.18,.42,.18],children:[p.jsx("sphereGeometry",{args:[1,18,12]}),p.jsx("meshStandardMaterial",{color:"#fff0a5",emissive:"#ffae36",emissiveIntensity:9,toneMapped:!1})]}),p.jsxs("mesh",{position:[0,-.55,0],castShadow:!0,receiveShadow:!0,children:[p.jsx("cylinderGeometry",{args:[.48,.42,.9,24]}),p.jsx("meshStandardMaterial",{color:"#7a6d58",metalness:.9,roughness:.28})]}),[-.86,-.66,-.46,-.26].map(a=>p.jsxs("mesh",{position:[0,a,0],rotation:[Math.PI*.5,0,0],children:[p.jsx("torusGeometry",{args:[.47,.055,8,28]}),p.jsx("meshStandardMaterial",{color:"#b6aa91",metalness:.92,roughness:.24})]},a)),p.jsx("pointLight",{position:[0,.25,0],color:"#ffb65b",intensity:58,distance:26,decay:1.8,castShadow:!0,"shadow-mapSize":[1024,1024],"shadow-bias":-.0015})]}):p.jsx("group",{children:p.jsx("mesh",{geometry:e.geometries.knot,material:r,castShadow:!0,receiveShadow:!0})}):p.jsxs("group",{children:[p.jsx("mesh",{geometry:e.geometries.shard,material:r,castShadow:!0,receiveShadow:!0}),p.jsx("mesh",{geometry:e.geometries.ring,rotation:[.6,.2,.3],scale:1.16,children:p.jsx("meshBasicMaterial",{color:"#8ee8ff",transparent:!0,opacity:.18,wireframe:!0,toneMapped:!1})})]})}function ji({descriptor:i,index:e,assets:t,bodyRegistry:r,impactEnergy:s,reportImpact:o,interactionRef:a}){const l=w.useRef(),u=w.useCallback(f=>{l.current=f,r.current[e]=f},[r,e]);w.useEffect(()=>()=>{r.current[e]=null},[r,e]);const c=w.useCallback(f=>{f.stopPropagation();const n=l.current;n&&(a.current.draggedBody=n,a.current.dragDepth=n.translation().z,n.setBodyType(2,!0),n.setGravityScale(0,!0),n.setLinvel({x:0,y:0,z:0},!0),n.setAngvel({x:0,y:0,z:0},!0))},[a]);ge(()=>{const f=l.current;if(!f||a.current.draggedBody!==f)return;const n=a.current.worldPoint;f.setNextKinematicTranslation({x:n.x,y:n.y,z:a.current.dragDepth})});const d=w.useCallback(()=>{if(!l.current)return;const f=l.current.translation(),n=l.current.linvel(),g=Math.hypot(n.x,n.y,n.z)*s;g>1.3&&o(f,g)},[s,o]);return p.jsxs(Rt,{ref:u,position:i.position,rotation:i.rotation,scale:i.scale,colliders:!1,mass:.75+i.scale*1.6,linearDamping:.24,angularDamping:.34,restitution:.28+s*.18,friction:.58,canSleep:!1,ccd:!0,onCollisionEnter:d,children:[p.jsx(aa,{args:[i.radius]}),p.jsx("group",{onPointerDown:c,children:p.jsx(Li,{descriptor:i,assets:t,frozen:!1})})]})}function Ui({impactRef:i,amount:e,impactEnergy:t,speed:r}){const s=w.useRef(),o=w.useMemo(()=>{const a=Math.floor(24+e*1.9),l=new Float32Array(a*3),u=new Float32Array(a*3),c=new Float32Array(a);l.fill(-1e3);const d=new ie;d.setAttribute("position",new H(l,3)),d.userData.velocities=u,d.userData.life=c;const f=new _a({color:"#ffc26b",transparent:!0,opacity:.92,size:.055,sizeAttenuation:!0,depthWrite:!1,blending:zt,toneMapped:!1});return{count:a,geometry:d,material:f,serial:-1}},[e,t]);return ge((a,l)=>{var n;if(o.serial!==i.current.serial){o.serial=i.current.serial,(n=s.current)==null||n.position.copy(i.current.position);const g=o.geometry.attributes.position.array,m=o.geometry.userData.velocities,v=o.geometry.userData.life;for(let h=0;h<o.count;h+=1){const x=h*3,y=new R(Math.random()-.5,.25+Math.random()*.9,Math.random()-.5).normalize().multiplyScalar(1.2+Math.random()*(2.2+t*3.8));g[x]=0,g[x+1]=0,g[x+2]=0,m[x]=y.x,m[x+1]=y.y,m[x+2]=y.z,v[h]=.2+Math.random()*.65}}const u=Math.min(l,.04)*r,c=o.geometry.attributes.position.array,d=o.geometry.userData.velocities,f=o.geometry.userData.life;for(let g=0;g<o.count;g+=1){if(f[g]<=0)continue;const m=g*3;f[g]-=u,d[m+1]-=4.2*u,c[m]+=d[m]*u,c[m+1]+=d[m+1]*u,c[m+2]+=d[m+2]*u,f[g]<=0&&(c[m+1]=-1e3)}o.geometry.attributes.position.needsUpdate=!0}),w.useEffect(()=>()=>{o.geometry.dispose(),o.material.dispose()},[o]),p.jsx("points",{ref:s,geometry:o.geometry,material:o.material,frustumCulled:!1})}function Gi({amount:i}){const e=Math.min(6e3,Math.max(0,Math.round(i))),t=w.useMemo(()=>Array.from({length:e},(r,s)=>{const o=s%12;return{key:`grain-${s}`,position:[D+(T(s,1401)-.5)*13.5,Yt-6.8+T(s,1402)*9.5,-6-o*3.7-T(s,1403)*1.4],rotation:[T(s,1404)*3,T(s,1405)*3,T(s,1406)*3],scale:[.075+T(s,1407)*.035,.065+T(s,1408)*.03,.075+T(s,1409)*.035]}}),[e]);return e?p.jsx(ta,{instances:t,colliders:"ball",mass:.018,friction:.86,restitution:.04,linearDamping:.12,angularDamping:.18,children:p.jsxs("instancedMesh",{args:[void 0,void 0,e],castShadow:!0,receiveShadow:!0,frustumCulled:!1,children:[p.jsx("icosahedronGeometry",{args:[1,0]}),p.jsx("meshStandardMaterial",{color:"#bd8840",roughness:.88,metalness:.01})]})},e):null}function Vi({illumination:i}){const{gl:e}=_t(),t=w.useRef(null);return t.current===null&&(t.current=e.toneMappingExposure),w.useEffect(()=>{e.toneMappingExposure=t.current*(i/100)},[e,i]),null}function qi({enabled:i}){const{gl:e,scene:t,camera:r}=_t(),s=w.useRef(null);return w.useEffect(()=>{if(!i||!e.isWebGLRenderer)return;t.updateMatrixWorld(!0),r.lookAt(D,3.1,-13.5),r.updateMatrixWorld(!0);const o=new Pi(e);o.bounces=5,o.renderScale=Math.min(.8,window.devicePixelRatio>1?.62:.78),o.tiles.set(2,2),o.dynamicLowRes=!0,o.lowResScale=.3,o.minSamples=2,o.fadeDuration=0,o.rasterizeScene=!0;const a=new Di({sigma:4.2,kSigma:.82,threshold:.065}),l=new se(a);return o.renderToCanvasCallback=(u,c)=>{const d=Math.max(1,o.samples),f=A.clamp(Math.log2(d)/7,0,1);a.map=u.texture,a.sigma=A.lerp(4.2,1.15,f),a.kSigma=A.lerp(.82,.7,f),a.threshold=A.lerp(.065,.018,f);const n=c.autoClear;c.autoClear=!1,l.render(c),c.autoClear=n},o.setScene(t,r),s.current=o,()=>{s.current=null,o.dispose(),l.dispose(),a.dispose()}},[r,i,e,t]),ge(()=>{var o;i&&((o=s.current)==null||o.renderSample())},i?1:0),null}function $i(){const i=w.useRef();return w.useEffect(()=>{var t;const e=i.current;if(e)return e.target.position.set(D,2.2,-18),(t=e.parent)==null||t.add(e.target),e.target.updateMatrixWorld(),()=>{var r;return(r=e.parent)==null?void 0:r.remove(e.target)}},[]),p.jsx("spotLight",{ref:i,color:"#fff1d6",intensity:105,position:[D-5.5,10.5,8],angle:.62,penumbra:.58,distance:78,decay:1.7,castShadow:!0,"shadow-mapSize":[2048,2048],"shadow-camera-left":-15,"shadow-camera-right":15,"shadow-camera-top":13,"shadow-camera-bottom":-4,"shadow-camera-near":1,"shadow-camera-far":55,"shadow-bias":-.0018})}function Yi({speed:i,materials:e}){const t=w.useRef(null),r=w.useRef(0),s=w.useRef(new Pt),o=w.useRef(new R(0,0,1));return ge((a,l)=>{t.current&&(r.current+=l*Oi*i,s.current.setFromAxisAngle(o.current,r.current),t.current.setNextKinematicRotation({x:s.current.x,y:s.current.y,z:s.current.z,w:s.current.w}))}),p.jsxs(Rt,{ref:t,type:"kinematicPosition",colliders:!1,position:[D,Yt,0],children:[Array.from({length:He},(a,l)=>{const u=l/He*Math.PI*2,c=ae,d=2*c*Math.tan(Math.PI/He)*1.08;return p.jsxs("group",{position:[Math.sin(u)*c,Math.cos(u)*c,-G*.5+6],rotation:[0,0,-u],children:[p.jsx(De,{args:[d*.5,.24,G*.5],friction:1.15,restitution:.12}),l%4===0&&p.jsxs("group",{position:[0,-.62,0],children:[p.jsx(De,{args:[.62,.34,G*.5],friction:1.35}),p.jsxs("mesh",{castShadow:!0,receiveShadow:!0,children:[p.jsx("boxGeometry",{args:[1.24,.68,G]}),p.jsx("primitive",{object:l===0||l===12?e.luminousRib:e.ribs,attach:"material"})]}),(l===0||l===12)&&[-27,0,20].map((f,n)=>p.jsx("pointLight",{position:[0,-.9,f],color:n===1?"#fff0c2":"#ffc46b",intensity:n===1?28:n===0?26:18,distance:24,decay:1.8,castShadow:n===1,"shadow-mapSize":[1024,1024],"shadow-bias":-.0015},f))]})]},l)}),p.jsxs("mesh",{receiveShadow:!0,position:[0,0,-G*.5+6],rotation:[Math.PI/2,0,0],children:[p.jsx("cylinderGeometry",{args:[ae,ae,G,128,1,!0]}),p.jsx("primitive",{object:e.drum,attach:"material"})]}),[-3,-22,-41].map(a=>p.jsxs("mesh",{position:[0,0,a],children:[p.jsx("torusGeometry",{args:[ae-.35,.18,8,96]}),p.jsx("primitive",{object:e.trim,attach:"material"})]},a)),p.jsx(De,{args:[ae,ae,.22],position:[0,0,-G+6],friction:.8}),p.jsxs("group",{position:[0,0,-G+6.18],children:[p.jsxs("mesh",{receiveShadow:!0,children:[p.jsx("circleGeometry",{args:[ae,96]}),p.jsx("primitive",{object:e.back,attach:"material"})]}),[-5.2,0,5.2].map((a,l)=>p.jsx("pointLight",{position:[a,l===1?1.4:-1.2,1.1],color:l===1?"#ffe3b0":"#d7b07a",intensity:l===1?28:15,distance:24,decay:1.8,castShadow:l===1,"shadow-mapSize":[512,512],"shadow-bias":-.0015},a)),[2.3,5.1,8.1].map(a=>p.jsxs("mesh",{position:[0,0,.06],children:[p.jsx("torusGeometry",{args:[a,.12,8,6]}),p.jsx("primitive",{object:e.trim,attach:"material"})]},a)),p.jsxs("mesh",{position:[0,0,.08],rotation:[Math.PI*.5,0,0],children:[p.jsx("cylinderGeometry",{args:[1.35,1.35,.28,32]}),p.jsx("primitive",{object:e.hub,attach:"material"})]}),p.jsx("pointLight",{position:[0,0,.6],color:"#f4ecd6",intensity:20,distance:26,decay:1.8})]})]})}function Xi({settings:i,interactionRef:e,bodyRegistry:t,elapsedRef:r,onStage:s}){const{world:o}=ea(),a=Aa(),l=w.useRef(new R),u=w.useRef(""),c=w.useRef(""),d=A.clamp(i.gravityForce??100,30,180)/100,f=A.clamp(i.impactEnergy??90,20,160)/100;A.clamp(i.disturbance??55,0,100)/100;const n=Math.max(.05,i.speed??1);return ge((g,m)=>{if(i.pathTracing){g.camera.lookAt(D,3.1,-13.5);return}const v=g.clock.elapsedTime*n;r.current=v;const h=v<E.value.cycleEnds?v:E.value.gravityAt+(v-E.value.gravityAt)%(E.value.cycleEnds-E.value.gravityAt);Xt.sequence.position=Math.min(h,E.value.cycleEnds);const x=e.current,y=It.set(x.pointer.x,x.pointer.y,.28).unproject(g.camera);Y.copy(y).sub(g.camera.position).normalize();const b=x.draggedBody?x.dragDepth:g.camera.position.z-9,S=Math.abs((b-g.camera.position.z)/Math.min(-.08,Y.z));x.worldPoint.copy(g.camera.position).addScaledVector(Y,Math.min(30,S));const M=It.set(0,-1,0),I="GRAVITY: SCREEN DOWN";I!==u.current&&(u.current=I,s(I));const O=9.81*d,K=Y.copy(M).normalize().multiplyScalar(M.lengthSq()>0?O:0);l.current.x=A.damp(l.current.x,K.x,3.7,m),l.current.y=A.damp(l.current.y,K.y,3.7,m),l.current.z=A.damp(l.current.z,K.z,3.7,m),o.gravity.x=l.current.x,o.gravity.y=l.current.y,o.gravity.z=l.current.z,I!==c.current&&I.startsWith("GRAVITY")&&(c.current=I,t.current.filter(Boolean).forEach((j,U)=>{const $=(T(U,Math.floor(v)+80)-.5)*f;j.applyTorqueImpulse({x:$*.7,y:$,z:-$*.55},!0),j.wakeUp()})),h>E.value.pulseAt&&h<E.value.pulseAt+.16&&!x.pulseFired&&(x.pulseFired=!0,t.current.filter(Boolean).forEach(j=>{const U=j.translation();Y.set(U.x-D,U.y-2.5,U.z+5).normalize(),j.applyImpulse({x:Y.x*f*.22,y:Y.y*f*.22,z:Y.z*f*.22},!0)})),h<E.value.pulseAt-.2&&(x.pulseFired=!1),x.pointerEnergy=A.damp(x.pointerEnergy,0,5.5,m);const ve=A.smoothstep(v,0,E.value.glideEnds),xe=A.lerp(E.value.cameraStartZ,E.value.cameraEndZ,ve);g.camera.position.x=A.damp(g.camera.position.x,D+2.7+Math.sin(a.current.targetYaw)*.45,2.8,m),g.camera.position.y=A.damp(g.camera.position.y,4.3+a.current.targetPitch*.3,2.8,m),g.camera.position.z=A.damp(g.camera.position.z,xe-Math.sin(v*.06)*1.2,2.4,m),g.camera.lookAt(D,3.1,-13.5)}),null}function Qi({settings:i,interactionRef:e,onStage:t}){const r=A.clamp(i.artifactDensity??76,24,400),s=48,o=.82,a=Math.max(.05,i.speed??1),l=8,u=w.useMemo(()=>Ni(r,l),[r,l]),c=Wi(),d=w.useRef([]),f=w.useRef(0),n=w.useRef({serial:0,position:new R(0,-100,0),last:0}),g=w.useCallback((m,v)=>{const h=performance.now();h-n.current.last<Math.max(42,130-s)||(n.current.last=h,n.current.serial+=1,n.current.position.set(m.x,m.y,m.z),e.current.lastImpact=Math.min(1,v*.1))},[e,s]);return p.jsxs(p.Fragment,{children:[p.jsx("color",{attach:"background",args:["#343a3c"]}),p.jsx("ambientLight",{color:"#fff4df",intensity:.14}),p.jsx("hemisphereLight",{args:["#dce8ea","#403a35",.18]}),p.jsx(Vi,{illumination:i.illumination??100}),p.jsx($i,{}),p.jsx(Ui,{impactRef:n,amount:s,impactEnergy:o,speed:a}),p.jsxs(Jt,{gravity:[0,0,0],timeStep:"vary",interpolate:!0,paused:!!i.pathTracing,children:[p.jsx(Xi,{settings:i,interactionRef:e,bodyRegistry:d,elapsedRef:f,onStage:t}),p.jsx(Yi,{speed:a,materials:c.shellMaterials}),p.jsx(Gi,{amount:i.physicalSand??1200}),u.map((m,v)=>p.jsx(ji,{descriptor:m,index:v,assets:c,bodyRegistry:d,impactEnergy:o,reportImpact:g,interactionRef:e},m.id))]}),p.jsx(qi,{enabled:!!i.pathTracing})]})}async function Ki(i){const e=new ia({...i,antialias:!0,alpha:!1,powerPreference:"high-performance"});return await e.init(),e.outputColorSpace=Ae,e.toneMapping=Bt,e.toneMappingExposure=1.12,e.shadowMap.enabled=!0,e.shadowMap.type=Nt,e}function Zi(i){const e=new ya({...i,antialias:!0,alpha:!1,powerPreference:"high-performance"});return e.outputColorSpace=Ae,e.toneMapping=Bt,e.toneMappingExposure=1.04,e.shadowMap.enabled=!0,e.shadowMap.type=Nt,e}function fs({settings:i={}}){const e=w.useRef({pointer:new q,previousPointer:new q,pointerEnergy:0,worldPoint:new R(D,3,2),gravityTarget:new R(0,-1,0),gravityLabel:"FLOOR",manualUntil:0,holding:!1,pulseFired:!1,lastImpact:0,draggedBody:null,dragDepth:0}),[t,r]=w.useState("SUSPENDED"),s=Math.round(A.clamp(i.artifactDensity??76,24,400)),o=8,a=Math.min(6e3,Math.max(0,Math.round(i.physicalSand??1200))),l=w.useCallback(c=>{const d=c.currentTarget.getBoundingClientRect(),f=(c.clientX-d.left)/d.width*2-1,n=-((c.clientY-d.top)/d.height)*2+1,g=e.current;g.previousPointer.copy(g.pointer),g.pointer.set(f,n),g.pointerEnergy=Math.min(1,g.pointerEnergy+g.pointer.distanceTo(g.previousPointer)*1.8)},[]),u=w.useCallback(()=>{const c=e.current,d=c.draggedBody;d&&(d.setBodyType(0,!0),d.setGravityScale(1,!0),d.wakeUp(),c.draggedBody=null)},[]);return p.jsxs("section",{className:"atmosphere gravity-museum-pro",onPointerMove:l,onPointerUp:u,onPointerCancel:u,onPointerLeave:u,style:{"--experiment-accent":"#9fdcff"},children:[p.jsxs(Zt,{className:"gravity-museum-pro__canvas",gl:i.pathTracing?Zi:Ki,dpr:Ca,camera:{position:[D+2.7,4.3,21],fov:47,near:.06,far:180},onCreated:({raycaster:c})=>{c.firstHitOnly=!0},children:[p.jsx("color",{attach:"background",args:["#343a3c"]}),p.jsx("fogExp2",{attach:"fog",args:["#343a3c",.004]}),p.jsx(w.Suspense,{fallback:null,children:p.jsx(Qi,{settings:i,interactionRef:e,onStage:r})})]},i.pathTracing?"path-traced":"webgpu"),p.jsxs("div",{className:"gravity-museum-pro__copy experiment-copy",children:[p.jsx("p",{children:"04 — Impossible mechanics"}),p.jsxs("h1",{children:["Gravity is",p.jsx("br",{}),"only a curator."]}),p.jsx("span",{children:"The chamber turns, but down never moves. Its ribs lift the collection until gravity pulls every object back into the tumbling pile below."})]}),p.jsxs("div",{className:"gravity-museum-pro__state","aria-live":"polite",children:[p.jsx("span",{children:"Current law"}),p.jsx("strong",{children:t}),p.jsx("i",{}),p.jsxs("span",{children:[s.toLocaleString()," OBJECTS"]}),p.jsxs("span",{children:[o.toLocaleString()," LIGHT SOURCES"]}),p.jsxs("span",{children:[a.toLocaleString()," SAND GRAINS"]})]}),p.jsx("div",{className:"gravity-museum-pro__hint","aria-hidden":"true",children:"CLICK AND DRAG AN OBJECT · RELEASE TO DROP"})]})}export{fs as default};
