import * as OBJ from "webgl-obj-loader";
/* only use for action icon map */

/* Blender export: X forward, -Z up */
export const rawPinObj = `# Blender v2.81 (sub 16) OBJ File: 'pinTextureMapper.blend'
# www.blender.org
o Plane
v -0.800000 -1.000000 0.000000
v 0.800000 -1.000000 0.000000
v 0.000000 -1.000000 0.000000
v -0.800000 0.000000 0.000000
v 0.000000 0.800000 0.000000
v 0.800000 0.000000 0.000000
vt 1.260168 0.276436
vt 1.260168 1.224205
vt 0.501953 1.224205
vt -0.256262 1.224205
vt -0.256262 0.276436
vt 0.501953 -0.481779
vn 0.0000 0.0000 -1.0000
s off
f 6/1/1 2/2/1 3/3/1
f 1/4/1 4/5/1 3/3/1
f 4/5/1 5/6/1 6/1/1
f 3/3/1 4/5/1 6/1/1
`;

// let's try to use mesh directly, read OBJ documentation
const mesh = new OBJ.Mesh(rawPinObj);

const group1dto2d = (n: number[]) =>
  n.reduce((a: number[][], v, i) => {
    if (i % 2) {
      a[a.length - 1][1] = v;
    } else {
      a.push([v]);
    }
    return a;
  }, []);

const groupedVertices = group1dto2d(
  mesh.vertices.filter((v, i) => (i + 1) % 3 !== 0)
);

const groupedTextureMap = group1dto2d(mesh.textures);

export default { mesh, groupedVertices, groupedTextureMap };
