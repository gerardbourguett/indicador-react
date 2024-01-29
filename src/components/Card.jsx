/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faChartLine } from "@fortawesome/free-solid-svg-icons";

const Card = ({ indicador, onButtonClick }) => {
  const [codigoIndi, setCodigoIndi] = useState(null);

  const handleButton = async (codigo) => {
    const apiUrl = await fetch(`https://165.227.94.139/api/${codigo}`).then(
      (response) => response.json()
    );
    setCodigoIndi(apiUrl);

    onButtonClick(apiUrl.serie);
  };

  useEffect(() => {}, []);

  return (
    <div>
      {indicador && (
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {Object.keys(indicador).map((key) => {
              return (
                indicador[key].valor && (
                  <a
                    href="#"
                    key={key}
                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    onClick={() => handleButton(indicador[key].codigo)}
                  >
                    {/* <FontAwesomeIcon icon={faChartLine} size="2x" /> */}
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {indicador[key].unidad_medida === "Pesos" && "$"}
                        {indicador[key].unidad_medida === "Dólar" && "US$"}
                        {indicador[key].valor}
                        {indicador[key].unidad_medida === "Porcentaje" && "%"}
                      </h3>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {indicador[key].nombre}
                      </p>
                    </div>
                  </a>
                )
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
