import mongoose from "mongoose";

// Objeto de banco: estrutura dos dados, propriedades 
const clienteSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: true }
    ,email: { type: String, required: true }
}, {versionKey: false});

// clients é o nome da database de documentos do MongoAtlas. Altere pelo novo banco de dados
const cliente = mongoose.model("clients", clienteSchema);
export default cliente;
