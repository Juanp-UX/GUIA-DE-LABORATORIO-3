const formCitas = document.getElementById("formCitas");
const tablaCitas = document.getElementById("tablaCitas");
const btnAgregarCita = document.getElementById("btnAgregarCita");

formCitas.addEventListener("input", () => {
  btnAgregarCita.disabled = !formCitas.checkValidity();
});
formCitas.addEventListener("change", () => {
  btnAgregarCita.disabled = !formCitas.checkValidity();
});

formCitas.addEventListener("submit", (e) => {
  e.preventDefault();

  if(!validarFormularioCita()){
    return;
  }

  const fecha = document.getElementById("fecha").value;
  const horaInicio = document.getElementById("horaInicio").value;
  const horaFin = document.getElementById("horaFin").value;

  const medicoSelect=document.getElementById("medicoSelect");
  const pacienteSelect=document.getElementById("pacienteSelect");

  const medicoId = parseInt(medicoSelect.value); 
  const pacienteId = parseInt(pacienteSelect.value); 

  console.log("Datos para registrar cita:", { fecha, horaInicio, horaFin, medicoId, pacienteId });
  
  try {
    validarHoras(horaInicio, horaFin);
    const cita = gestionarCitas.registrarCita(fecha, horaInicio, horaFin, medicoId, pacienteId);
    console.log("Cita registrada:", cita);
    // mostrar en tabla
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${cita.fecha}</td>
      <td>${cita.horaInicio}</td>
      <td>${cita.horaFin}</td>
      <td>${cita.medico.nombres} ${cita.medico.apellidos}</td>
      <td>${cita.paciente.nombres} ${cita.paciente.apellidos}</td>
    `;
    tablaCitas.appendChild(fila);

    formCitas.reset();
    btnAgregarCita.disabled = true;

    mostrarNotificacion("Cita registrada con éxito");
  } catch (error) {
    console.error("ERROR CAPTURADO:", error.message);
    mostrarNotificacion(error.message, "error");
  }
});

function validarHoras(horaInicio, horaFin) {
  if (horaFin <= horaInicio) {
    throw new Error("La hora de fin debe ser mayor a la hora de inicio.");
  }
}




