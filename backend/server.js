const express = require('express');
const cors = require('cors');
require('dotenv').config();

const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const planRoutes = require('./routes/planRoutes');
const reportRoutes = require('./routes/reportRoutes');
const consultRoutes = require('./routes/consultRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/consults', consultRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
