function validarCampoObligatorio(campo, errorElement, mensaje) {
    if (campo.value.trim() === '') {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarLongitud(campo, errorElement, min, max, mensaje) {
    if (campo.value.length < min || campo.value.length > max) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}
function validarSelectObligatorio(select, errorElement, mensaje) {
    if (select.value === '') {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarHorario(horarioInicio,horarioFin,errorElement,errorElement2,mensaje){
    if (!horarioInicio.value || !horarioFin.value || horarioFin.value <= horarioInicio.value) {
        errorElement.textContent = mensaje;
        errorElement2.textContent = mensaje;
        return false;
    }else {
        errorElement.textContent = '';
        errorElement2.textContent = '';
        return true;
    }
}


function mostrarMensajeExito() {
    Toastify({
        text: "✅ ¡Registro exitoso!",
        duration: 3000,            // Duración: 3 segundos
        gravity: "top",             // Posición: arriba
        position: "right",          // Alineación: derecha
        style: {
            background: "rgba(0, 128, 0, 0.8)",  // Verde con transparencia
            color: "#fff",                      // Texto blanco
            borderRadius: "12px",               // Esquinas redondeadas
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Sombra ligera
            padding: "12px 20px"               // Más relleno
        },
        stopOnFocus: true, // No desaparecer al pasar el mouse
    }).showToast();
}

function validarFormularioMedico(){
    const inputNombres = document.getElementById('nombresMedico');
    const inputApellidos = document.getElementById('apellidosMedico');
    const inputEspecialidad = document.getElementById('especialidadMedico');
    const inputHorarioFin = document.getElementById('horarioFinMedico');
    const inputHorarioInicio = document.getElementById('horarioInicioMedico');

    const labelErrorNombres=document.getElementById('errorNombresMedico');
    const labelErrorApellidos=document.getElementById('errorApellidosMedico');
    const labelErrorEspecialidad=document.getElementById('errorEspecialidad');
    const labelErrorHorarioInicio=document.getElementById('errorHorarioInicio');
    const labelErrorHorarioFin=document.getElementById('errorHorarioFin');


    let nombresValidos=validarCampoObligatorio(inputNombres,labelErrorNombres,"El nombre es obligatorio") &&
        validarLongitud(inputNombres,labelErrorNombres , 1, 20, 'El nombre debe tener entre 1 y 20 caracteres');
    let apellidosValidos = validarCampoObligatorio(inputApellidos,labelErrorApellidos, 'Los apellidos son obligatorios') &&
        validarLongitud(inputApellidos,labelErrorApellidos , 1, 20, 'El apellido debe tener entre 1 y 20 caracteres');
    const especialidadValida = validarCampoObligatorio(inputEspecialidad, labelErrorEspecialidad, 'La especialidad es obligatoria') &&
        validarLongitud(inputEspecialidad,labelErrorEspecialidad , 1, 20, 'La especialidad debe tener entre 1 y 20 caracteres');
    const horarioValido = validarHorario(inputHorarioInicio,inputHorarioFin,labelErrorHorarioInicio,labelErrorHorarioFin , 'El horario de fin debe ser posterior al horario de inicio');

    if (nombresValidos && apellidosValidos && especialidadValida && horarioValido) {
        return true;
    } else {
        alert('Por favor, complete correctamente el formulario.');
        return false;
    }

}

function validarFormularioPaciente(){
    const inputNombres = document.getElementById('nombresPaciente');
    const inputApellidos = document.getElementById('apellidosPaciente');

    const labelErrorNombres=document.getElementById('errorNombresPaciente');
    const labelErrorApellidos=document.getElementById('errorApellidosPaciente');

    let nombresValidos=validarCampoObligatorio(inputNombres,labelErrorNombres,"El nombre es obligatorio") &&
        validarLongitud(inputNombres,labelErrorNombres , 1, 20, 'El nombre debe tener entre 1 y 20 caracteres');
    let apellidosValidos = validarCampoObligatorio(inputApellidos,labelErrorApellidos, 'Los apellidos son obligatorios') &&
        validarLongitud(inputApellidos,labelErrorApellidos , 1, 20, 'El apellido debe tener entre 1 y 20 caracteres');
   
    if (nombresValidos && apellidosValidos) {
        return true;
    } else {
        alert('Por favor, complete correctamente el formulario.');
        return false;
    }

}

function validarFormularioCita(){
    const selectMedico = document.getElementById('medicoSelect');
    const selectPaciente = document.getElementById('pacienteSelect');

    const labelErrorMedico = document.getElementById('errorMedicoSelect');
    const labelErrorPaciente = document.getElementById('errorPacienteSelect');

    const medicoValido = validarSelectObligatorio(selectMedico, labelErrorMedico, 'Debe seleccionar un médico');
    const pacienteValido = validarSelectObligatorio(selectPaciente, labelErrorPaciente, 'Debe seleccionar un paciente');

    if (medicoValido && pacienteValido) {
        return true;
    } else {
        alert('Por favor, complete correctamente el formulario.');
        return false;
    }

}

const camposMedico = [
    ['nombresMedico', 'errorNombresMedico', 'El nombre debe tener entre 1 y 20 caracteres.'],
    ['apellidosMedico', 'errorApellidosMedico', 'El apellido debe tener entre 1 y 20 caracteres.'],
    ['especialidadMedico', 'errorEspecialidad', 'La especialidad debe tener entre 1 y 20 caracteres.']
];
const camposPaciente = [
    ['nombresPaciente', 'errorNombresPaciente', 'El nombre debe tener entre 1 y 20 caracteres.'],
    ['apellidosPaciente', 'errorApellidosPaciente', 'El apellido debe tener entre 1 y 20 caracteres.']
];

function validarCampoDesdeId(campoId, errorId, mensaje) {
    const campo = document.getElementById(campoId);
    const errorElement = document.getElementById(errorId);
    validarCampoObligatorio(campo, errorElement, 'Este campo es obligatorio') &&
        validarLongitud(campo, errorElement, 1, 20, mensaje);
}


function validarCamposAlCambiarFoco()
{
    [...camposMedico, ...camposPaciente].forEach(([campoId, errorId, mensaje]) => {
        const campo = document.getElementById(campoId);
        campo.addEventListener('blur', () => validarCampoDesdeId(campoId, errorId, mensaje));
    });

    const inputHorarioInicio = document.getElementById('horarioInicioMedico');
    const inputHorarioFin = document.getElementById('horarioFinMedico');
    const labelErrorHorarioInicio = document.getElementById('errorHorarioInicio');
    const labelErrorHorarioFin = document.getElementById('errorHorarioFin');
    const validarHorarioAlCambiarFoco = () => validarHorario(
        inputHorarioInicio,
        inputHorarioFin,
        labelErrorHorarioInicio,
        labelErrorHorarioFin,
        'La hora de fin debe ser posterior a la hora de inicio');

    inputHorarioInicio.addEventListener('blur', validarHorarioAlCambiarFoco);
    inputHorarioFin.addEventListener('blur', validarHorarioAlCambiarFoco);
}


function validarCamposAlEscribir()
{
    [...camposMedico, ...camposPaciente].forEach(([campoId, errorId, mensaje]) => {
        const campo = document.getElementById(campoId);
        campo.addEventListener('input', () => validarCampoDesdeId(campoId, errorId, mensaje));
    });

    const inputHorarioInicio = document.getElementById('horarioInicioMedico');
    const inputHorarioFin = document.getElementById('horarioFinMedico');
    const labelErrorHorarioInicio = document.getElementById('errorHorarioInicio');
    const labelErrorHorarioFin = document.getElementById('errorHorarioFin');
    const validarHorarioAlEscribir = () => validarHorario(
        inputHorarioInicio,
        inputHorarioFin,
        labelErrorHorarioInicio,
        labelErrorHorarioFin,
        'La hora de fin debe ser posterior a la hora de inicio');

    inputHorarioInicio.addEventListener('input', validarHorarioAlEscribir);
    inputHorarioFin.addEventListener('input', validarHorarioAlEscribir);

    const selectMedico = document.getElementById('medicoSelect');
    const selectPaciente = document.getElementById('pacienteSelect');
    const labelErrorMedico = document.getElementById('errorMedicoSelect');
    const labelErrorPaciente = document.getElementById('errorPacienteSelect');

    selectMedico.addEventListener('change', () => {
        validarSelectObligatorio(selectMedico, labelErrorMedico, 'Debe seleccionar un médico');
    });
    selectPaciente.addEventListener('change', () => {
        validarSelectObligatorio(selectPaciente, labelErrorPaciente, 'Debe seleccionar un paciente');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    validarCamposAlCambiarFoco();
    validarCamposAlEscribir();
});