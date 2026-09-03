const formMedico = document.getElementById("formMedico");
const medicoSelect = document.getElementById("medicoSelect");
const btnAgregarMedico = document.getElementById("btnAgregarMedico");

// habilita/deshabilita el botón según la validez del formulario
formMedico.addEventListener("input", () => {
});

formMedico.addEventListener("submit", (e) => {
  e.preventDefault();
  if(!validarFormularioMedico()){
    return;
  }
  const nombres = document.getElementById("nombresMedico").value;
  const apellidos = document.getElementById("apellidosMedico").value;
  const especialidad = document.getElementById("especialidadMedico").value;

  const horaInicio = document.getElementById("horarioInicioMedico").value;
  const horaFin = document.getElementById("horarioFinMedico").value;

  if (horaFin <= horaInicio) {
    mostrarNotificacion("La hora de fin debe ser posterior a la hora de inicio", "error");
    return;
  }

  const aniosExperiencia = document.getElementById("aniosExperienciaMedico").value;
  const bibliografia = document.getElementById("bibliografiaMedico").value;

  const medico = gestionarMedicos.registrarMedico(nombres,apellidos,especialidad,horaInicio,horaFin,aniosExperiencia,bibliografia);



  // actualizar select
  const option = document.createElement("option");
  option.value = medico.id;
  option.textContent = `${medico.nombres} ${medico.apellidos}`;
  medicoSelect.appendChild(option);

  formMedico.reset();

  mostrarNotificacion(`Médico ${medico.nombres} ${medico.apellidos} registrado con éxito`);
});

