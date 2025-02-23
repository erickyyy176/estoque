const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let estoque = [];

// Carrega os dados do JSON ao iniciar
try {
    const data = fs.readFileSync('estoque.json', 'utf8');
    estoque = JSON.parse(data);
} catch (err) {
    console.log('Nenhum arquivo de estoque encontrado. Criando um novo.');
}

// Função para salvar os dados no JSON
function salvarEstoque() {
    fs.writeFileSync('estoque.json', JSON.stringify(estoque, null, 2));
}

// Rota de login
app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;
    if (usuario === "msb" && senha === "12354678") {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Rota para listar o estoque
app.get('/estoque', (req, res) => {
    res.json(estoque);
});

// Rota para adicionar item ao estoque
app.post('/entrada', (req, res) => {
    const { nome, quantidade } = req.body;
    estoque.push({ nome, quantidade });
    salvarEstoque();
    res.json({ message: 'Material adicionado com sucesso!' });
});

// Criar o JSON se não existir
if (!fs.existsSync('estoque.json')) {
    fs.writeFileSync('estoque.json', '[]');
}

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
