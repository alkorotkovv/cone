// Расчет массива вершин
function getConeData(H, R, N) {
  const vertices = new Float32Array(N * 9);
  for (let i = 0; i < N; i += 1) {
    vertices[9 * i] = 0;
    vertices[9 * i + 1] = 0;
    vertices[9 * i + 2] = H;
    vertices[9 * i + 3] = R * Math.cos((2 * Math.PI * i) / N);
    vertices[9 * i + 4] = R * Math.sin((2 * Math.PI * i) / N);
    vertices[9 * i + 5] = 0;
    vertices[9 * i + 6] = R * Math.cos((2 * Math.PI * (i + 1)) / N);
    vertices[9 * i + 7] = R * Math.sin((2 * Math.PI * (i + 1)) / N);
    vertices[9 * i + 8] = 0;
  }
  console.log(vertices);
  return vertices;
}

// Расчет массива вершин
module.exports.computeCone = (req, res) => {
  const { height, radius, segments } = req.body;
  const coneArray = getConeData(height, radius, segments);
  res.send(coneArray);
};
