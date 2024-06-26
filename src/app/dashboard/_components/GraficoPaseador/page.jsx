"use client";
import { useRef, useEffect, useState } from "react";
import {
  Chart,
  BarController,
  LineController,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getHistorialPaseadores } from "@/api/historial";
import { useHistorial } from "@/context/historial.store";

Chart.register(
  BarController,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

function Page() {
  const chartRef = useRef(null);
  const [historial, setHistorial] = useState([]);
  const [calificacion, setCalificacion] = useState([]);
  const activeWalker = useHistorial((state) => state.activeWalker);

  useEffect(() => {
    getHistorialPaseadores().then((data) => {
      const resp = data.filter((walker) => {
        return walker.id_paseador === activeWalker;
      });

      console.log(resp);
      setHistorial(resp);
      setCalificacion(resp.map((paseo) => paseo.calificacion));
    });
  }, [activeWalker]);

  const data = {
    labels: ["Paseo N°1"],
    datasets: [
      {
        type: "line",
        label: "Linea",
        data: historial.map((paseo) => paseo.calificacion), // Mismos datos para la línea de tendencia
        borderColor: "black",
        borderWidth: 2,
        fill: false, // No llenar el área bajo la línea
        tension: 0.4, // Suavizar la línea
      },
      {
        type: "bar",
        label: "Columnas",
        data: calificacion,
        backgroundColor: (context) => {
          const value = context.dataset.data[context.dataIndex];
          return value >= 3 ? "rgb(255,183,73, 0.7)" : "#124C5F50";
        },
      },
    ],
  };

<<<<<<< HEAD


const options = {
=======
  const options = {
>>>>>>> 0481c1a6b085f0fa465175a4d2199f58c3bcbb57
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        ticks: {
          maxRotation: 45,
          minRotation: 0,
          autoSkip: false,
          maxTicksLimit: 4,
          font: {
            size: 10,
          },
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Calificación por Paseo",
        font: {
          size: 16,
        },
      },
<<<<<<< HEAD
      tooltip: { // Corrección aquí: 'tooltip' en lugar de 'tooltips'
        enabled: true,
        callbacks: {
          beforeBody: function(context) { // Usar beforeBody para incluir texto antes del contenido principal
            // Retorna el texto personalizado que deseas mostrar
            console.log(historial[0].Id_user)
            return `Pedido por ${historial[0].Id_user.nombre}, Telefono ${historial[0].Id_user.telefono} , Email ${historial[0].Id_user.email}`;
          },
          label: function(context) {
            // Puedes dejar esta función como está si deseas mantener el comportamiento predeterminado
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.parsed.y;
            return label;
          }
        }
      },
=======
>>>>>>> 0481c1a6b085f0fa465175a4d2199f58c3bcbb57
    },
  };

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const context = chartRef.current.getContext("2d");
      const newChart = new Chart(context, {
        type: "bar", // Cambia el tipo inicial a "bar" según tu preferencia inicial
        data: data,
        options: options,
      });

      chartRef.current.chart = newChart;
    }

    return () => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
    };
  }, [calificacion && calificacion.length === 0]);

  return (
    <div style={{ width: "100%", height: "100%", overflowX: "auto" }}>
      <canvas ref={chartRef} />
    </div>
  );
}

export default Page;
