import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Grafico from "./components/Grafico";

function App() {
  const [indicador, setIndicador] = useState(null);
  const [formatFecha, setFormatFecha] = useState(null);
  const [codigoIndicador, setCodigoIndicador] = useState(null);

  const getIndicadores = async () => {
    try {
      const response = await fetch("https://165.227.94.139/api/");
      if (!response.ok) {
        throw new Error("Error al obtener los indicadores");
      }
      const data = await response.json();
      setIndicador(data);

      let fecha = new Date(data.fecha);
      let formatoFecha = new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(fecha);
      setFormatFecha(formatoFecha);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    getIndicadores();
  }, []);

  const handleButtonClick = (serie) => {
    setCodigoIndicador(serie);
  };

  return (
    <>
      <div className="lg:container lg:mx-auto">
        <h1 className="text-3xl font-bold">Indicadores Económicos</h1>
        <div className="">
          <h3 className="text-state-900 mt-5 text-base font-medium tracking-tight">
            Fecha de Actualización: {formatFecha}
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Card indicador={indicador} onButtonClick={handleButtonClick} />
          <Grafico codigoIndi={codigoIndicador} />
        </div>
      </div>
    </>
  );
}

export default App;
