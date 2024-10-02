import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Cliente from "./models/cliente";

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const MONGODB_URI = "mongodb://localhost:27017/crud_clientes";

mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log( "MongoDB connection error: ", err));

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost${PORT}`);
});

//Create a new Cliente (Routes)

app.post("/clientes", async (req, res) => {
    const{nome, email} = req.body;
    try{
        const novoCliente = new Cliente({nome, email});
        await novoCliente.save();
        res.status(201).json(novoCliente);
    } catch(error) {
        res.status(400).json({ error: "Error creating a cliente"});
    }
});

//Read all Clientes (Routes)

app.get("/clientes", async (req, res) => {
    try{
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch(error) {
        res.status(500).json({ error: "Error listing all clientes"});
    }
});

//Update a Cliente (Routes)

app.put("/clientes/:id", async (req, res) => {
    const {id} = req.params;
    const {nome, email} = req.body;
    try {
        const clienteAtualizado = await Cliente.findByIdAndUpdate(id, {nome, email}, {new: true});
        res.json(clienteAtualizado);
    } catch(error) {
        res.status(400).json({ error: "Error updating a cliente"});
0    }
    });

//Delete a Cliente (Routes)

app.delete("/clientes/:id", async (req, res) => {
    const {id} = req.params;
    try {
        await Cliente.findByIdAndDelete(id);
        res.status(204).send();
    } catch(error) {
        res.status(500).json({ error: "Error deleting a cliente"});
    }
});

app.use(express.static('public'));
