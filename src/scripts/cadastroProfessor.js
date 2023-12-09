const fs = require('fs');
const Professor = require('../models/professor');


document.getElementById('formCadastroProfessor').addEventListener('submit', function(e) {
  e.preventDefault();

  alert('Cadastrando professor...')
  const nome = document.getElementById('nomeProfessor').value;
  const email = document.getElementById('emailProfessor').value;
  const departamento = document.getElementById('departamentoProfessor').value;

  if(!nome || !email || !departamento){
    alert('Preencha todos os campos!');
    return;
  }

  try {
    const professor = new Professor(nome, email, departamento);
    professor.save();
  
    alert('Professor cadastrado com sucesso!');
    window.location.href = 'cadastroProfessor.html';
  } catch (error) {
    alert(error.message)
  }
});

