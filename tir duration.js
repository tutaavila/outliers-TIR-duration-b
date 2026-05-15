
// Decodifica el Base64 (los datos que vienen en el link)
function decodeData(base64) {
  const decoded = atob(base64);
  const rows = decoded.split("\n");

  return rows
    .filter(r => r.trim() !== "")
    .map(r => {
      const [ticker, tir, duracion] = r.split("\t");

      return {
        ticker: ticker,
        tir: parseFloat(tir),
        duracion: parseFloat(duracion)
      };
    });
}

// Base64 que venía en tu link
const base64Data = `Q1AzNwkwLjgyCTcuMjcKQ1AzNk8JMS4zOQk3LjEzCk1HQ1IJNy43MQk2LjkzCkxEQ0cJMS4zNgk2LjgwClRTQzQJNi44MAk2Ljc1CllNMzQJNS4yOAk2Ljc0ClZTQ1QJNi4zNwk2LjYwCk1HQ08JNi4zNQk2LjU3CkJBQ0gJMy45OAk2LjUyCllNQ1gJMy45OAk2LjMyCkdONDkJNS4xOAk2LjIyCklSQ08JMy4wOAk2LjAyCkdONDcJMi4zMQk2LjAyClRUQwkzLjkyCTUuOTIKT0xDNgkyLjc0CTUuODgKQ1M0NwkyLjMwCTUuODUKQkFDRwkyLjc4CTUuNzIKQ1M1MAkyLjU3CTUuMzgKUE4zNQkzLjA3CTUuMzgKUE4zNgk0LjU1CTUuMzUKWU00MAkyLjEzCTUuMzUKWU1DWQkyLjI3CTUuMjUKQVJDMQkyLjg3CTUuMjQKRk80QQkxLjE2CTUuMDUKTUdDTgkyLjI4CTQuODkKSVJDTgkxLjQxCTQuNzkKQ1M0NAkwLjY5CTQuNjcKWU1DWgkyLjI4CTQuNjIKTE9DNQkxLjE3CTQuNjEKUExDMQkxLjY3CTQuNTgKVlNDUAkyLjExCTQuNTQKQkY0MAkxLjI4CTQuMjYKQllDSAkyLjI2CTQuMTAKVkJDMQkwLjgzCTQuMDYKWU0zOAkxLjE3CTMuODgKQUVSQgkwLjYwCTMuODcKWU0zNwkwLjk3CTMuODEKVFRDQgkxLjQxCTMuNjcKVFRDOAkxLjQ0CTMuNTkKVlNDVwkwLjkyCTMuNDIKTE1TNwkxLjI3CTMuMjMKQ1M1MQkwLjcwCTMuMTkKQUZDSQkwLjUwCTIuNDQKSEpDRgkwLjQ2CTEuMTkKQllDVwkwLjU2CTAuNjIKSEJDQQkwLjMxCTAuMDMKQllDVgkwLjMyCS0wLjMzClZTQ08JMC44MwktMC40OApSQzJDCTAuNDIJLTAuNTYKQkYzNwkwLjMxCS0xLjU1CkhCQwkwLjU0CS0xLjY1CklSQ0wJMC4xMAktMy40NApMTVM4CTAuNTEJLTQuOTEKVDY2MgkwLjMyCS00Ljk1Cg==`;

// Dataset listo para usar
export const data = decodeData(base64Data);


// ==============================
// Opcional: cálculo de outliers
// ==============================
export function calculateOutliers(dataset) {
  const avgTir = dataset.reduce((acc, d) => acc + d.tir, 0) / dataset.length;
  const avgDur =
    dataset.reduce((acc, d) => acc + d.duracion, 0) / dataset.length;

  return dataset.map(d => {
    const score =
      Math.abs(d.tir - avgTir) + Math.abs(d.duracion - avgDur);

    let categoria = "Normal";

    if (score > 3) categoria = "Outlier Alto";
    else if (score > 1.5) categoria = "Revisar";

    return {
      ...d,
      score,
      categoria
    };
  });
}


// ==============================
// Ejemplo de uso
// ==============================

// const processed = calculateOutliers(data);
// console.log(processed);
