const Aluno = require("../models/aluno");


const professorLogado = JSON.parse(localStorage.getItem('professorLogado'));

document.getElementById('professorName').innerText = `${professorLogado.nome} - ${professorLogado.email}`;

document.getElementById('saveAluno').onclick = function(e) {
  e.preventDefault();

  const nome = document.getElementById('aluno-nome').value;
  const email = document.getElementById('aluno-email').value;
  const matricula = document.getElementById('aluno-matricula').value;
  const curso = document.getElementById('aluno-curso').value;

  if(!nome || !email || !matricula || !curso){
    alert('Preencha todos os campos!');
    return;
  }


  const aluno = new Aluno(nome, email, matricula, curso, professorLogado.id);
  aluno.save();
  
  alert('Aluno cadastrado com sucesso!');
  window.location.href = 'cadastroAluno.html';

}

function deleteAluno(matricula){
  
  const aluno = Aluno.getByMatricula(matricula);
  aluno.delete();
  window.location.reload();
}

function loadData(){
  const alunos = Aluno.getAll(professorLogado.id);

  const table = document.getElementById('listaAlunos');
  for(const aluno of alunos){
    const row = table.insertRow();
    row.insertCell().innerHTML = aluno.nome;
    row.insertCell().innerHTML = aluno.email;
    row.insertCell().innerHTML = aluno.matricula;
    row.insertCell().innerHTML = aluno.curso;
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-outline-danger btn-sm';
    deleteBtn.innerText = 'Excluir';
    deleteBtn.onclick = function(){
      deleteAluno(aluno.matricula);
    }
    row.insertCell().appendChild(deleteBtn);

    row.style.cursor = 'pointer';
    row.onclick = function(){
      window.location.href = `cadastroNotas.html?matricula=${aluno.matricula}`;
    }
  }

}
loadData()