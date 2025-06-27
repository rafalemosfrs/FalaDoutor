# 🩺 Fala Doutor

**Fala Doutor** é uma aplicação web moderna desenvolvida com React e Node.js, que permite o gerenciamento completo de médicos, pacientes, planos de saúde, relatórios e consultas. O projeto é composto por uma API RESTful no backend (Express + PostgreSQL) e uma interface SPA no frontend (React + TailwindCSS).

## 📦 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Recharts](https://recharts.org/)
- [Papaparse](https://www.papaparse.com/)
- [Axios](https://axios-http.com/)
- [XLSX](https://github.com/SheetJS/sheetjs)
- [Knex](https://knexjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Cors](https://github.com/expressjs/cors)
- [Dotenv](https://github.com/motdotla/dotenv)
- [Vite](https://vite.dev/)
- [Context API](https://reactjs.org/docs/context-api.html)
- [React Select](https://react-select.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Date Picker](https://reactdatepicker.com/)

## 🔥 Destaques e Funcionalidades

- 📋 CRUD completo para **médicos**, **pacientes**, **planos** e **consultas**
- 📌 Múltiplos planos de saúde por médico
- 📚 Relatórios com gráficos de barras e pizza
- 📎 Upload em massa via Excel
- 📅 Seletores de data e campos com máscaras (CPF)
- ✅ Validações de formulário e feedback visual
- 💡 Interface em abas (lista/cadastro) com cartões expansíveis
- 🎨 Estilização com Tailwind CSS e responsividade
- 🌐 Backend Express com PostgreSQL e Knex.js


## 🖼️ Layout

A interface apresenta quatro cartões principais:
- **Médicos**: abas para listar e cadastrar médicos
- **Pacientes**: abas para listar e cadastrar pacientes
- **Planos de Saúde**: abas para listar planos de saúde
- **Consultas**: abas para listar e cadastrar consultas
- **Relatórios**: abas para listar relatórios

Cada cartão pode ser expandido ou recolhido e traz recursos como:
- Validação de formulários
- Feedback visual para ações CRUD (edição, exclusão, criação e leitura)
- Estilização consistente com Tailwind
- Importação de dados via Excel
- Gráficos de relatórios
- Formulários com validação

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
│   ├── consultsController.js
│   ├── doctorsController.js         
│   ├── patientsController.js        
│   ├── plansController.js           
│   └── reportController.js         
├── models/
├── routes/                
│   ├── consultsRoutes.js
│   ├── doctorsRoutes.js        
│   ├── patientsRoutes.js           
│   ├── plansRoutes.js           
│   └── reportRoutes.js
├── config/
│   └── db.js
├── server.js
├── .env
└── package.json

src/
│
├── components/
│   ├── common/
│      ├── BulkUpload.jsx
│      ├── ExpandableCard.jsx
│      └── TabPanel.jsx
│   ├── doctors/
│      ├── DoctorCard.jsx
│      ├── DoctorForm.jsx
│      └── DoctorList.jsx
│   ├── patients/
│      ├── PatientCard.jsx
│      ├── PatientForm.jsx
│      └── PatientList.jsx
│   ├── plans/
│      ├── PlanCard.jsx
│      ├── PlanForm.jsx
│      └── PlanList.jsx
│   ├── reports/
│      ├── ReportsCard.jsx
│      ├── ReportsBarChart.jsx
│      ├── ReportsPieChart.jsx
│      └── ReportsList.jsx
│   ├── consults/
│      ├── ConsultCard.jsx
│      ├── ConsultForm.jsx
│      └── ConsultList.jsx
│   └── Header.jsx
│
├── context/
│   └── DataContext.jsx
│
├── App.jsx
├── main.jsx
├── index.css
├── vite.config.js
├── package.json
└── README.md

```

## 🧠 Estado Global

O projeto utiliza Context API para armazenar e manipular dados de médicos e pacientes globalmente. Todas as operações de CRUD estão centralizadas no `DataContext`.

## ✨ Melhorias Futuras

- Autenticação e controle de permissões
- Filtros avançados nos relatórios
- Dashboard com métricas
- Integração com agenda de consultas
- Responsividade aprimorada para mobile

---

Desenvolvido com 💙 por Rafael Lemos.