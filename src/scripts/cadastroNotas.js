const Aluno = require("../models/aluno");
const Nota = require("../models/nota");


const matricula = new URLSearchParams(window.location.search).get('matricula');
const aluno = Aluno.getByMatricula(matricula);

document.getElementById('nomeAluno').innerText = aluno.nome;

function loadData(){
  const table = document.getElementById('listaNotas');
  for(const nota of aluno.notas){
    const row = table.insertRow();
    row.insertCell().innerHTML = nota.titulo;
    row.insertCell().innerHTML = nota.valor;
    row.insertCell().innerHTML = nota.peso;
    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn btn-outline-danger btn-sm';
    btnDelete.innerText = 'Excluir';
    btnDelete.onclick = function(){
      aluno.deleteNota(nota.titulo);
      window.location.reload();
    }
    row.insertCell().appendChild(btnDelete);
  }
}

document.getElementById('saveNota').onclick = function(e){
  e.preventDefault();
  const titulo = document.getElementById('nota-titulo').value;
  const valor = document.getElementById('nota-valor').value;
  const peso = document.getElementById('nota-peso').value;

  if(!titulo || !valor || !peso){
    alert('Preencha todos os campos!');
    return;
  }

  aluno.addNota(new Nota(titulo, valor, peso));
  window.location.reload();

}


loadData()