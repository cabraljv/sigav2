const Professor = require("../models/professor");

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const senha = document.getElementById('senha').value;

  if (senha === 'admin') {
      window.location.href = 'cadastroProfessor.html';
  } 
  const prof = new Professor()
  prof.email = senha

  if (prof.receive()) {
    window.localStorage.setItem('professorLogado', prof.toJson());
    alert('Logado com sucesso!');
    window.location.href = 'cadastroAluno.html';
    return
  }
  alert('Professor não encontrado!');

});