import cliente from "../models/Cliente.js"

class ClienteController {

static async listarClientes (req, res) {
    const listaClientes = await cliente.find({});
    res.status(200).json(listarClientes);
        }
}

export default ClienteController;


