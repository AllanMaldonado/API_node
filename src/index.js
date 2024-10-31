import express, { json } from 'express';

const app = express();
app.use(express.json());

let usuarios = [
    { id: 1, nome: 'Allan', email: "allan@gmail.com", idade: 20 },
    { id: 2, nome: 'Alberto', email: "alberto@gmail.com", idade: 25 },
    { id: 3, nome: 'Armando', email: "armanado@gmail.com", idade: 28 }
];


app.get("/", (req, res) => {
    res.send('Hello Fipe');
});

app.get("/usuarios", (req, res) => {
    // res.json(express.json());
    res.status(200).json({ sucess: true, data: usuarios });
});

app.get("/usuarios/:id", (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).json({ sucess: false, message: "Manda o ID" });
    } else {
        const ususarioEncontrado = usuarios.find((usuario) =>
            usuario.id === Number(id)
        );

        if (ususarioEncontrado !== undefined) {
            res.status(200).json({
                sucess: true,
                data: ususarioEncontrado
            })
        } else {
            res.status(404).json({
                sucess: false,
                message: "Usuario não encontrado"
            })
        }
    }
});

app.post("/usuarios", (req, res) => {
    const { nome, email, idade } = req.body;
    console.log(req.body);

    if (!nome || !email || !idade) {
        res.status(400).json({
            sucess: false,
            message: "Informações iválidas"
        })
    } else {
        const novoUsuario = {
            id: usuarios[usuarios.length - 1].id + 1,
            nome,
            email,
            idade
        }

        usuarios.push(novoUsuario);

        res.status(200).json({
            sucess: true,
            message: "Usuario criado com sucesso!"
        })

    }
});


app.listen(5000, () => {
    console.log('Servidor rodando em http://localhost:5000');

})
