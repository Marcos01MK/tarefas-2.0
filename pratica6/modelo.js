     const { conectarDb } = require('./database.js');

     class Tarefa {
         db = null;
         collection = null;

         constructor(nome, concluida) {
             this.nome = nome;
             this.concluida = concluida;
             this.id = null;
         }

         async init() {
             this.db = await conectarDb();
             this.collection = this.db.collection('tarefas');
         }

         async inserir() {
             const resultado = await this.collection.insertOne({ nome: this.nome, concluida: this.concluida });
             this.id = resultado.insertedId;
         }

         async alterar() {
             await this.collection.updateOne({ _id: this.id }, { $set: { nome: this.nome, concluida: this.concluida } });
         }

         async deletar() {
             await this.collection.deleteOne({ nome: this.nome });
         }

         async buscar() {
             const resultado = await this.collection.findOne({ nome: this.nome });
             if (resultado) {
                 this.nome = resultado.nome;
                 this.concluida = resultado.concluida;
                 this.id = resultado._id;
             }
         }
     }

     module.exports = Tarefa;
     