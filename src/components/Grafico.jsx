/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

const Grafico = ({ codigoIndi }) => {
  const [graficoData, setGraficoData] = useState(null);

  useEffect(() => {
    // Verifica que haya datos antes de intentar crear el gráfico
    if (codigoIndi && codigoIndi.length > 0) {
      const labels = codigoIndi.map((data) => {
        const fechaFormateada = moment(data.fecha).format("DD/MM/YYYY");
        return fechaFormateada;
      });

      const reversedLabels = labels.reverse();

      const valores = codigoIndi.map((data) => data.valor);

      const reversedValor = valores.reverse();

      const data = {
        labels: reversedLabels,
        datasets: [
          {
            label: "Valores",
            data: reversedValor,
            fill: true,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            tension: 0.1,
          },
        ],
      };

      setGraficoData(data);
    }
  }, [codigoIndi]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Variación Mensual",
      },
    },
  };
  return (
    <div className="col-span-2">
      {graficoData && <Line data={graficoData} options={options} />}
    </div>
  );
};

export default Grafico;
