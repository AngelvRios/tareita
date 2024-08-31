import { useEffect, useState } from 'react';

const Sismos = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch('https://api.boostr.cl/earthquakes/recent.json')
      .then(response => response.json())
      .then(data => setData(data.data)) // Asumiendo que data.data es una lista de sismos
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Ha ocurrido un error: {error.message}</p>;
  }

  return (
    <>
      {data.length > 0 ? (
        data.map((sismo, index) => (
          <div key={index}>
            <h2>Fecha: {sismo.date}</h2>
            <p>Hora: {sismo.hour}</p>
            <p>Lugar: {sismo.place}</p>
            <p>Magnitud: {sismo.magnitude}</p>
            <p>Profundidad: {sismo.depth}</p>
            <p>Latitud: {sismo.latitude}</p>
            <p>Longitud: {sismo.longitude}</p>
            <img src={sismo.image} alt={`Sismo ${index}`} />
            <hr />
          </div>
        ))
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </>
  );
};

export default Sismos;
