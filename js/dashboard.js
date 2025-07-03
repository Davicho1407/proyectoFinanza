document.addEventListener("DOMContentLoaded", () => {
  // Leer datos reales desde localStorage
  const ingresos = JSON.parse(localStorage.getItem("ingresos")) || [420];
  const pagos = JSON.parse(localStorage.getItem("pagos")) || [];
  const ahorro = JSON.parse(localStorage.getItem("ahorro")) || [30, 40];
  const inversiones = JSON.parse(localStorage.getItem("inversiones")) || [50];
  const deudasPendientes = JSON.parse(localStorage.getItem("deudas")) || [110];
  const prestadoPendiente = JSON.parse(localStorage.getItem("prestado")) || [20];

  // Cálculos
  const ingresoTotal = ingresos.reduce((a, b) => a + b, 0);
  const gastoTotal = pagos.reduce((acc, p) => acc + p.monto, 0);
  const ahorroTotal = ahorro.reduce((a, b) => a + b, 0);
  const inversionTotal = inversiones.reduce((a, b) => a + b, 0);
  const deudaPendiente = deudasPendientes.reduce((a, b) => a + b, 0);
  const prestadoTotal = prestadoPendiente.reduce((a, b) => a + b, 0);

  // Mostrar datos
  document.getElementById("ingresoTotal").textContent = `$${ingresoTotal.toFixed(2)}`;
  document.getElementById("gastoTotal").textContent = `$${gastoTotal.toFixed(2)}`;
  document.getElementById("ahorroTotal").textContent = `$${ahorroTotal.toFixed(2)}`;
  document.getElementById("inversionTotal").textContent = `$${inversionTotal.toFixed(2)}`;
  document.getElementById("deudaPendiente").textContent = `$${deudaPendiente.toFixed(2)}`;
  document.getElementById("prestadoPendiente").textContent = `$${prestadoTotal.toFixed(2)}`;

  // Calcular totales por tipo (50/30/20)
  const totalNecesidades = pagos.filter(p => p.tipo === "Necesidad").reduce((a, b) => a + b.monto, 0);
  const totalDeseos = pagos.filter(p => p.tipo === "Deseo").reduce((a, b) => a + b.monto, 0);
  const totalAhorroDeuda = pagos.filter(p => p.tipo === "Ahorro/Deuda").reduce((a, b) => a + b.monto, 0);

  // Crear gráfico 50/30/20
  const ctx = document.getElementById("graficoRegla").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Necesidades", "Deseos", "Ahorro/Deuda"],
      datasets: [{
        data: [totalNecesidades, totalDeseos, totalAhorroDeuda],
        backgroundColor: ["#42a5f5", "#66bb6a", "#ffa726"],
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: false },
      },
    },
  });

  // Actualizar metas
  document.getElementById("metaEmergencia").textContent = `$${ahorroTotal.toFixed(2)}`;
  document.getElementById("metaDeuda").textContent = `$${deudaPendiente.toFixed(2)}`;
  document.getElementById("metaInversion").textContent = `$${inversionTotal.toFixed(2)}`;
});
