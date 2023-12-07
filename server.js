//import "dotenv/config";
import app from "./src/app.js";


// Indicamos a porta que o microsseriço atenderá às requisições
const PORT = 2023;

// Podemos criar um registro de LOG do status do microsserviço
app.listen(PORT,() => {
console.log(Date() + "[INFO] API está escutando na porta: "+PORT);
});
