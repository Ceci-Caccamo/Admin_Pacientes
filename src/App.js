import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";
import PropTypes from "prop-types";

function App() {
  //Citas en localStorage, revisamos si hay citas, si no es un arreglo vacio. con JSON.Parse convertimos en json. BBDD muy basica, solo para string.
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  //arreglo de todas las citas, es el principal
  const [citas, guardarCitas] = useState(citasIniciales);

  //use effect para realizar ciertas operaciones cuando el state cambia. Es un hook. Siempre es un arrow Function
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem("citas"));

    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas]); //este ultimo array se llama dependencia, cada vez que cambia, se actualiza

  //funcion para agragar citas al arreglo de citas y mantener las que teniamos, siempre mantenemos las que hay(con el spred operation) y agregamos la nueva
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  //Funcion que elimina cita por id
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  //Mensaje condicional
  const titulo = citas.length === 0 ? "No hay Citas" : "Administra tus Citas";
  return (
    <Fragment>
      <img
        src="https://ar.pinterest.com/pin/855965472909782881/?autologin=true"
        alt="Logo"
      ></img>

      <h1>Administrador citas</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} p />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

//documentar con propTypes, se ven en consola
Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};

export default App;
