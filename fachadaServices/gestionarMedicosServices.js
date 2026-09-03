class GestionarMedicos {
  constructor(medicoRepo) {
    this.medicoRepo = medicoRepo;
  }

  registrarMedico(nombres, apellidos, especialidad, horarioInicio, horarioFin, aniosExperiencia, bibliografia) {
    const id = this.medicoRepo.siguienteId();
    const medico = new Medico(id, nombres, apellidos, especialidad, horarioInicio, horarioFin, aniosExperiencia, bibliografia);
    this.medicoRepo.agregar(medico);
    return medico;
  }

  listarMedicos() {
   return this.medicoRepo.obtenerTodos();
  }

  buscarMedico(id) {
    return this.medicoRepo.buscarPorId(id);
  }
}

const gestionarMedicos = new GestionarMedicos(medicoRepo);

