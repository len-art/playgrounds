export const isPointInPolygon = ([x, y]: number[], vs: number[][]) =>
  /* simple 2d ray cast becaue we only render 2d-like */
  vs.reduce((acc, point, index, self) => {
    const nextPoint = (index + 1) % self.length;
    const x1 = point[0],
      y1 = point[1];

    var x2 = vs[nextPoint][0],
      y2 = vs[nextPoint][1];

    const isY1Bigger = y1 > y;
    const isY2Bigger = y2 > y;

    const doesIntersect =
      isY1Bigger !== isY2Bigger && x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1;

    if (doesIntersect) {
      return !acc;
    }
    return acc;
  }, false);
