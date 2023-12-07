import mongoose from "mongoose";

async function conectaBaseMongoDB() {
mongoose.connect("mongodb+srv://microservico:a1b2c3d4e5@cluster0.1wqorq2.mongodb.net/clients?retryWrites=true&w=majority");

return mongoose.connection;
};

export default conectaBaseMongoDB;



