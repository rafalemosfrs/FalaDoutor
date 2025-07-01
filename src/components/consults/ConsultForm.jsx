import { useState } from 'react';
import { useData } from '../../context/DataContext';

const initialState = {
  date: '',
  hora: '',
  plan_id: '',
  doctor_id: '',
  patient_id: ''
};

const ConsultForm = ({ onSaved = null }) => {
  const { plans, doctors, patients } = useData();
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const plan_id = parseInt(formData.plan_id);
    const doctor_id = parseInt(formData.doctor_id);
    const patient_id = parseInt(formData.patient_id);
    const { date, hora } = formData;

    if (!date || !hora || isNaN(plan_id) || isNaN(doctor_id) || isNaN(patient_id)) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
        const res = await fetch('http://localhost:5000/api/consults', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              date,
              hora,
              medico_id: doctor_id,
              paciente_id: patient_id,
              plano_id: plan_id
            })
      });

      if (!res.ok) throw new Error('Erro ao agendar consulta');

      if (onSaved) onSaved();
      else setFormData(initialState);
    } catch (err) {
      setError('Erro ao salvar: ' + err.message);
    }
  };

  const filteredDoctors = doctors.filter(d =>
    d.plan_ids.includes(parseInt(formData.plan_id))
  );

  const filteredPatients = patients.filter(p =>
    p.plan_id === parseInt(formData.plan_id)
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="form-label">Data da Consulta</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input-field bg-white text-black"
        />
      </div>

      <div>
        <label className="form-label">Hora</label>
        <input
          type="time"
          name="hora"
          value={formData.hora}
          onChange={handleChange}
          className="input-field bg-white text-black"
        />
      </div>

      <div>
        <label className="form-label">Plano</label>
        <select
          name="plan_id"
          value={formData.plan_id}
          onChange={handleChange}
          className="input-field bg-white text-black"
        >
          <option value="">Selecione</option>
          {[...plans]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((plan) => (
              <option key={plan.id} value={plan.id}>{plan.name}</option>
            ))}
        </select>
      </div>

      <div>
        <label className="form-label">Médico</label>
        <select
          name="doctor_id"
          value={formData.doctor_id}
          onChange={handleChange}
          className="input-field bg-white text-black"
        >
          <option value="">Selecione</option>
          {[...filteredDoctors]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((doctor) => (
              <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
        </select>
      </div>

      <div>
        <label className="form-label">Paciente</label>
        <select
          name="patient_id"
          value={formData.patient_id}
          onChange={handleChange}
          className="input-field bg-white text-black"
        >
          <option value="">Selecione</option>
          {[...filteredPatients]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((patient) => (
              <option key={patient.id} value={patient.id}>{patient.name}</option>
            ))}
        </select>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button type="submit" className="btn btn-primary">Agendar Consulta</button>
    </form>
  );
};

export default ConsultForm;
