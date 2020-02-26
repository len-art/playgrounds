import * as OBJ from "webgl-obj-loader";

/* Blender export: X forward, -Z up */
export const rawPinObj = `# Blender v2.81 (sub 16) OBJ File: 'squareMapped.blend'
# www.blender.org
mtllib squareMapped.mtl
o Square_Plane.001
v -1.000000 -1.000000 0.000000
v -1.000000 1.000000 0.000000
v 1.000000 -1.000000 0.000000
v 1.000000 1.000000 0.000000
vt -0.287342 1.287342
vt -0.287343 -0.287342
vt 1.287342 -0.287342
vt 1.287343 1.287342
vn 0.0000 0.0000 -1.0000
usemtl Material.002
s off
f 1/1/1 2/2/1 4/3/1 3/4/1
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
