// João Victor Cabral - 202135027

const fs = require('fs');
const Credencial = require('./credencial');

class Professor extends Credencial{
  nome = '';
  email = '';
  departamento = '';
  constructor(nome, email, departamento){
    super(email);
    if(nome && email && departamento){
      this.id = Math.random().toString(36).substr(2, 9);
    }
    this.nome = nome;
    this.email = email;
    this.departamento = departamento;
  }

  receive (){
    if(this.id){
      console.log('aqui', this)
      const id = this.id;
      const data = fs.readFileSync('src/data/professores.json');
      const professores = JSON.parse(data);
      const professor = professores.find(professor => professor.id === id);
  
      if (!professor) {
        return false
      }
  
      this.nome = professor.nome;
      this.email = professor.email;
      this.departamento = professor.departamento;
      return true
    }
    if(this.email){
      const email = this.email;
      const data = fs.readFileSync('src/data/professores.json');
      const professores = JSON.parse(data);
      const professor = professores.find(professor => professor.email === email);
  
      if (!professor) {
        return false
      }
  
      this.nome = professor.nome;
      this.email = professor.email;
      this.departamento = professor.departamento;
      this.id = professor.id;
      return true
    }
    return false
  }

  toJson(){
    return JSON.stringify({
      id: this.id,
      nome: this.nome,
      email: this.email,
      departamento: this.departamento
    });
  }

  save(){
    const data = fs.readFileSync('src/data/professores.json');
    const professores = JSON.parse(data);
    professores.push({
      id: this.id,
      nome: this.nome,
      email: this.email,
      departamento: this.departamento
    });
    
    fs.writeFileSync('src/data/professores.json', JSON.stringify(professores));
  }	

}

module.exports = Professor;