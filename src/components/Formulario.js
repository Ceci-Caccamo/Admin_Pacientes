import React, { Fragment, useState } from "react";
import uuid from "uuid/v4";

const Formulario = ({ crearCita }) => {
  //crear State de citas
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });
  //state de errores
  const [error, actualizarError] = useState(false);

  //funcion que se ejecuta cada vez que el usuario escribe en un input
  const actualizarState = (e) => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value, //es para que cada campo donde se agreue esta funcion se completa teniendo en cuenta el nombre del campo
    });
  };
  //Extraer valores haciendo destructuring para no tener que escribir uno por uno. Son los que estan en el campo value de cada input
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  //cuando el usuario presiona enviar formulario
  const submitCita = (e) => {
    e.preventDefault();

    // Validar (trim muestra espacios vacios)
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      actualizarError(true);
      return;
    }
    //Eliminar el mensaje previo
    actualizarError(false);

    //asignar un ID--> instalamos la libreria UUID para crear id unicos
    cita.id = uuid();

    //crear la cita en el state principal
    crearCita(cita);

    //reiniciar el form, modificamos el state de CITA, pasando los campos del form a vacio
    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>
      {/* en el return no se utiliza un if, solo con ternario */}
      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}
      <form onSubmit={submitCita}>
        <label> Nombre de Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          value={mascota}
          onChange={actualizarState}
        />
        <label>Nombre de Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueños Mascota"
          value={propietario}
          onChange={actualizarState}
        />
        <label> Fecha de Alta</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          value={fecha}
          onChange={actualizarState}
        />
        <label> Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          value={hora}
          onChange={actualizarState}
        />
        <label> Sintomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          value={sintomas}
          onChange={actualizarState}
        />
        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};

export default Formulario;
