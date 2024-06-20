"use client";
import { useRef, useEffect } from 'react';
import { Chart, BarController, LineController, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Registrar todos los componentes necesarios para la gráfica de barras
Chart.register(BarController, BarElement, LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend);

function Page() {
    const chartRef = useRef(null);

    const data = {
        labels: ["Paseo N°1", "Paseo N°2", "Paseo N°3", "Paseo N°4", "Paseo N°5", "Paseo N°6", "Paseo N°7", "Paseo N°8"],
        datasets: [
            {
                type: 'line',
                label: "Linea",
                data: [2, 3, 4, 2, 1, 5, 4, 3], // Mismos datos para la línea de tendencia
                borderColor: 'black',
                borderWidth: 2,
                fill: false, // No llenar el área bajo la línea
                tension: 0.4 // Suavizar la línea
            },
            {
                type: 'bar',
                label: "Columnas",
                data: [2, 3, 4, 2, 1, 5, 4, 3], // Datos de ejemplo
                backgroundColor: (context) => {
                    const value = context.dataset.data[context.dataIndex];
                    return value >= 3 ? 'rgb(255,183,73, 0.7)' : '#124C5F50';
                }
            },
        ]
    };

    const options = {
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
                        size: 10
                    }
                },
            },
            y: {
                beginAtZero: true,
                min: 0,
                max: 5,
                ticks: {
                    stepSize: 1
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Calificaci+on por Paseo',
                font: {
                    size: 16
                }
            }
        }
    };

    useEffect(() => {
        if (chartRef && chartRef.current) {
            const context = chartRef.current.getContext("2d");
            const newChart = new Chart(context, {
                type: "bar", // Cambia el tipo inicial a "bar" según tu preferencia inicial
                data: data,
                options: options
            });

            chartRef.current.chart = newChart;
        }

        return () => {
            if (chartRef.current && chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '100%', overflowX: 'auto' }}>
            <canvas ref={chartRef} />
        </div>
    );
}

export default Page;