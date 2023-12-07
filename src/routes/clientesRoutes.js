import express from "express";
import ClienteController from "../controllers/clienteController";

const routes = express.Router();
routes.get("/clientes",ClienteController.listarClientes);
