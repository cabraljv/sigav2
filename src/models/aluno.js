
const fs = require('fs');

class Aluno {
  constructor(nome, email, matricula, curso, professorId, notas = []) {
    this.nome = nome;
    this.email = email;
    this.matricula = matricula;
    this.curso = curso;
    this.professorId = professorId;
    this.notas = notas;
  }

  save() {
    const alunos = JSON.parse(fs.readFileSync('src/data/alunos.json'));
    const exists = alunos.find(a => a.matricula === this.matricula);
    if (exists) {
      exists.nome = this.nome;
      exists.email = this.email;
      exists.curso = this.curso;
      exists.notas = this.notas;
    }else{
      alunos.push({
        nome: this.nome,
        email: this.email,
        matricula: this.matricula,
        curso: this.curso,
        professorId: this.professorId,
        notas: this.notas
      });
    }
    fs.writeFileSync('src/data/alunos.json', JSON.stringify(alunos));
  }

  static getOneByMatricula(matricula) {
    const alunos = JSON.parse(fs.readFileSync('src/data/alunos.json'));
    const aluno = alunos.find(a => a.matricula === matricula);
    return new Aluno(aluno.nome, aluno.email, aluno.matricula, aluno.curso, aluno.professorId, aluno.notas);
  }

  addNota(nota) {
    this.notas.push(nota);
    this.save();
  }

  deleteNota(titulo) {
    const index = this.notas.findIndex(n => n.titulo === titulo);
    this.notas.splice(index, 1);
    this.save();
  }

  static getAll(professorId) {
    const alunos = JSON.parse(fs.readFileSync('src/data/alunos.json'));

    return alunos.filter(a => a.professorId === professorId).map(a => {
      return new Aluno(a.nome, a.email, a.matricula, a.curso, a.professorId);
    })
  }

  static getByMatricula(matricula) {
    const alunos = JSON.parse(fs.readFileSync('src/data/alunos.json'));
    const a = alunos.find(aluno => aluno.matricula === matricula);
    return new Aluno(a.nome, a.email, a.matricula, a.curso, a.professorId, a.notas);
  }

  delete() {
    const alunos = JSON.parse(fs.readFileSync('src/data/alunos.json'));
    const index = alunos.findIndex(a => a.matricula === this.matricula);
    alunos.splice(index, 1);
    fs.writeFileSync('src/data/alunos.json', JSON.stringify(alunos));
  }
}

module.exports = Aluno;