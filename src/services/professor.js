const fs = require('fs');
const Professor = require('../models/professor');

exports.findProfessorByEmail = async (email) => {
  

  if (!professor) {
    throw new Error('Professor não encontrado');
  }

  return new Professor(professor.nome, professor.email, professor.departamento);
}