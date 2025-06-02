# 🩺 Fala Doutor

**Fala Doutor** é uma aplicação web construída com React e TailwindCSS para cadastro, listagem e gerenciamento de médicos e pacientes. Ela oferece uma interface simples e intuitiva, com recursos de formulário, edição e exclusão de registros.

## 📦 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- Context API (para gerenciamento de estado)

## 🎯 Funcionalidades

- Listagem e cadastro de médicos (nome, CPF, CRM)
- Listagem e cadastro de pacientes (nome, CPF, data de nascimento, plano de saúde)
- Edição e exclusão de registros
- Interface com abas (Lista/Cadastro)
- Cartões expansíveis para melhor usabilidade

## 🖼️ Layout

A interface apresenta dois cartões principais:
- **Médicos**: abas para listar e cadastrar médicos
- **Pacientes**: abas para listar e cadastrar pacientes

Cada cartão pode ser expandido ou recolhido e traz recursos como:
- Validação de formulários
- Feedback visual para ações (edição, exclusão)
- Estilização consistente com Tailwind

## 🚀 Como Rodar o Projeto
Clone o repositório:
```bash
https://github.com/rafalemosfrs/FalaDoutor.git
cd FalaDoutor
```

Instale as dependências no frontend:
```bash
npm install
```

Instale as dependências no backend:
```bash
cd backend
npm install
```

Inicie o backend:
```bash
node server.js
```

Inicie o frontend:
```bash
npm run dev
```
> **Observação:** este projeto usa Vite como bundler. Certifique-se de ter o Node.js instalado.

## 📁 Estrutura de Pastas

```bash
backend/
├── controllers/
├── models/
├── routes/
├── config/

├── server.js
├── .env
└── package.json


src/
│
├── components/
│   ├── common/          
│   ├── doctors/         
│   ├── patients/        
│   └── Header.jsx
│
├── context/
│   └── DataContext.jsx
│
├── App.jsx
├── main.jsx
└── index.css

```

## 🧠 Estado Global

O projeto utiliza Context API para armazenar e manipular dados de médicos e pacientes globalmente. Todas as operações de CRUD estão centralizadas no `DataContext`.

## ✨ Melhorias Futuras

- Persistência com backend ou localStorage
- Filtro e busca em listas
- Upload de documentos ou fotos
- Responsividade aprimorada para mobile