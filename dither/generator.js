function bayerGen(size) {
  let seed = [
    [0, 2],
    [3, 1]
  ];

  while (seed.length < size) {
    let n = seed.length;
    let size = n << 1;
    let mat = [];

    for (let x = 0; x < size; x++) {
      mat[x] = [];
      for (let y = 0; y < size; y++) {
        let matVal = seed[x % n][y % n];
        if (x < n && y < n) {
          mat[x][y] = matVal * 4;
        } else if (x < n && y >= n) {
          mat[x][y] = matVal * 4 + 2;
        } else if (x >= n && y < n) {
          mat[x][y] = matVal * 4 + 3;
        } else {
          mat[x][y] = matVal * 4 + 1;
        }
      }
    }

    seed = mat;
  }

  bM = seed;
  return bM;
}

function parseMat(input) {
  let is3D = input.includes("[");
  let blocks = is3D ?
    input.trim().split(/\]\s*\/\s*\[/).map((block, i, arr) => {
      if (i === 0) block = block.replace(/^\[/, "");
      if (i === arr.length - 1) block = block.replace(/\]$/, "");
      return block;
    }) : [input];

  return blocks.map(block => {
    let rows = block.trim().split("/").map(row =>
      row.trim().split(",").map(cell => {
        let trimmed = cell.trim();
        if (trimmed === "-") return null;
        if (dropdown.value === "matrixthreshold") {
          if (trimmed === "x") return null;
        } else {
          if (trimmed === "x") return "x";
        }
        let num = parseFloat(trimmed);
        return isNaN(num) ? null : num;
      })
    );

    let maxLen = max(...rows.map(r => r.length));
    return rows.map(r => r.concat(Array(maxLen - r.length).fill(null)));
  });
}

function parseMatRev(input) {
  let matrix;
  try {
    matrix = JSON.parse(input);
  } catch (error) {
    throw new Error("Invalid JSON input");
  }

  let is3D = Array.isArray(matrix) && Array.isArray(matrix[0]) && Array.isArray(matrix[0][0]);

  if (is3D) {
    return matrix.map(block => {
      let rows = block.map(row =>
        row.map(cell => {
          let trimmed = cell === "-" ? null : cell;

          if (trimmed === "x") return "x";

          let num = parseFloat(trimmed);
          return isNaN(num) ? null : num;
        })
      );

      let maxLen = max(...rows.map(r => r.length));

      rows.forEach(r => r.concat(Array(maxLen - r.length).fill(null)));

      let formattedRows = rows.map(row => row.map(cell => cell === null ? "-" : cell.toString()).join(", ")).join(" / ");

      return `[${formattedRows}]`;
    }).join(" / ");
  } else {
    let rows = matrix.map(row =>
      row.map(cell => {
        let trimmed = cell === "-" ? null : cell;

        if (trimmed === "x") return "x";

        let num = parseFloat(trimmed);
        return isNaN(num) ? null : num;
      })
    );

    let maxLen = max(...rows.map(r => r.length));

    rows.forEach(r => r.concat(Array(maxLen - r.length).fill(null)));

    return rows.map(row => row.map(cell => cell === null ? "-" : cell.toString()).join(", ")).join(" / ");
  }
}

function errDiffsConv(matrixInput) {
  let matrix = parseMat(matrixInput);
  let wt = [];
  let offs = [];

  let xPos = -1;
  let yPos = -1;
  let foundX = false;

  matrix.forEach((block) => {
    block.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 'x') {
          if (foundX) {
            alert("Matrix contains more than one 'x'. 'x' should be unique.");
          }
          xPos = colIndex;
          yPos = rowIndex;
          foundX = true;
        }
      });
    });
  });

  if (!foundX) {
    if (!dropdown.value == "matrixthreshold") {
      printLog("Matrix does not contain an 'x'.");
    }
  }

  matrix.forEach((block) => {
    block.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 'x') {
          return;
        } else if (typeof cell === 'number') {
          wt.push(cell);
          offs.push([colIndex - xPos, rowIndex - yPos]);
        }
      });
    });
  });

  return {wt, offs};
}

function noiseInit(width, height, maxPoints, seed) {
  let sqSz = width * height,
    indices = new Int8Array(sqSz).fill(0);

  for (let i = 0; i < maxPoints; i++) indices[i] = 1;

  for (let i = 0; i < sqSz; i++) {
    let j = RANDDD(floor(hash(seed, i) * (i + 1)));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  return indices;
}

function PDSInit(width, height, sqSz, minDist, maxPoints, seed) {
  let rand = (() => {
      let x = seed;
      return () => (x = (x * 1664525 + 1013904223) >>> 0) / 4294967296;
    })(),

    cellSize = minDist * 0.70710678118, // 1/√2
    gridWidth = ceil(width / cellSize),
    gridHeight = ceil(height / cellSize),
    grid = new Int32Array(gridWidth * gridHeight).fill(-1),
    points = [],
    active = [],
    gridIndex = (x, y) => (y * gridWidth + x),

    insertPoint = (x, y) => {
      let gx = floor(x / cellSize),
        gy = floor(y / cellSize);
      let idx = gridIndex(gx, gy);
      grid[idx] = points.length;
      points.push({
        x,
        y
      });
      active.push({
        x,
        y
      });
    },

    inBounds = (x, y) => x >= 0 && x < width && y >= 0 && y < height,

    isFarEnough = (x, y) => {
      let gx = floor(x / cellSize),
        gy = floor(y / cellSize),
        minDistSq = minDist * minDist;

      for (let oy = -2; oy <= 2; oy++) {
        let ny = gy + oy;
        if (ny < 0 || ny >= gridHeight) continue;
        for (let ox = -2; ox <= 2; ox++) {
          let nx = gx + ox;
          if (nx < 0 || nx >= gridWidth) continue;
          let idx = grid[gridIndex(nx, ny)];
          if (idx === -1) continue;
          let pt = points[idx],
            dx = pt.x - x,
            dy = pt.y - y;
          if (dx * dx + dy * dy < minDistSq) return false;
        }
      }
      return true;
    };

  insertPoint(rand() * width, rand() * height);

  while (active.length && points.length < maxPoints) {
    i = (rand() * active.length) | 0,
      base = active[i],
      found = false;

    for (let j = 0; j < 30; j++) {
      let angle = rand() * 6.28318530718, // 2π
        dist = minDist * (1 + rand()),
        x = base.x + cos(angle) * dist,
        y = base.y + sin(angle) * dist;

      if (inBounds(x, y) && isFarEnough(x, y)) {
        insertPoint(x, y);
        found = true;
        break;
      }
    }

    if (!found) active[i] = active[active.length - 1], active.pop();
  }

  let result = new Uint8Array(sqSz);
  for (let i = 0; i < points.length - 1; i++) {
    let pt = points[i],
      idx = (pt.y | 0) * width + (pt.x | 0);
    result[idx] = 1;
  }
  return new Int8Array(result);
}

function blueNoiseGen(sigmaInput, maxPoints, swLoopLimit, width, height, seed) {
  let sqSz = width * height,
    rk = new Int16Array(sqSz << 2).fill(-1),
    widthd2 = width >> 1,
    heightd2 = height >> 1,
    maxDist2 = width * width + height * height,
    expTable = new Float32Array(maxDist2),
    nrg = new Float32Array(sqSz).fill(0),
    seeded = RANDDD(seed) << 10,
    binaryArr = gId("pds").checked ?
    PDSInit(width, height, sqSz, pFl(gIdV("minDistance")), maxPoints, seeded) :
    noiseInit(width, height, maxPoints, seeded),
    actualPoints = binaryArr.reduce((sum, val) => sum + val, 0);

  for (let i = 0; i < maxDist2; i++) {
    expTable[i] = exp(i * (-1 / ((sigmaInput << 1) ** 2))); //sigma
  }

  let adjNrg = (idx, sign) => {
    let xa = idx % width,
      ya = idx / width | 0;
    for (let i = 0; i < sqSz; i++) {
      let dx = (i % width) - xa,
        dy = (i / width | 0) - ya;
      if (abs(dx) > widthd2) dx += dx > 0 ? -width : width;
      if (abs(dy) > heightd2) dy += dy > 0 ? -height : height;
      nrg[i] += sign * expTable[dx * dx + dy * dy];
    }
  };

  maxPoints = min(maxPoints, actualPoints);

  for (let i = 0; i < sqSz; i++) {
    if (binaryArr[i] === 1) {
      adjNrg(i, 1);
    }
  }

  // swapping stage
  while (i++ < swLoopLimit) {
    let bestE = -Infinity,
      bestIdx = -1,
      worstE = Infinity,
      worstIdx = -1;

    for (let j = 0; j < sqSz; j++) {
      if (binaryArr[j] === 1 && nrg[j] > bestE) {
        bestE = nrg[j];
        bestIdx = j
      }
      if (binaryArr[j] === 0 && nrg[j] < worstE) {
        worstE = nrg[j];
        worstIdx = j
      }
    }

    if (worstIdx === -1 || bestIdx === worstIdx) break;

    binaryArr[bestIdx] = 0;
    adjNrg(bestIdx, -1);
    binaryArr[worstIdx] = 1;
    adjNrg(worstIdx, 1);
  }

  // rank assignment
  let pR = maxPoints;
  for (let i = 0; i < sqSz; i++) {
    let m1 = -Infinity, m2 = Infinity,
      idx1 = -1, idx2 = -1;
      for (let j = 0; j < sqSz; j++) {
        if (i < maxPoints && nrg[j] > m1 && binaryArr[i] === 1) {
          m1 = nrg[j];
          idx1 = j;
        }
        if (nrg[j] < m2 && binaryArr[j] === 0) {
          m2 = nrg[j];
          idx2 = j;
        }
      }
      if (i < maxPoints && binaryArr[i] === 1) {
        if (idx1 === -1) break;
        binaryArr[idx1] = 0;
        adjNrg(idx1, -1);
        rk[idx1] = --pR;
      } else {
        if (idx2 === -1) break;
        binaryArr[idx2] = 1;
        adjNrg(idx2, 1);
        rk[idx2] = i;
    }
  }

  return rk;
}