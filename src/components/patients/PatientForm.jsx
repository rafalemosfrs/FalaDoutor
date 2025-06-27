import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

const initialFormState = {
  name: '',
  cpf: '',
  birth_date: '',
  plan_id: ''
};

const PatientForm = ({ patient = null, onSaved = null }) => {
  const { addPatient, updatePatient, plans } = useData();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (patient) {
      setFormData({
        ...patient,
        plan_id: patient.plan_id || ''
      });
    }
  }, [patient]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
      newErrors.cpf = 'CPF deve estar no formato 123.456.789-00';
    }

    if (!formData.birth_date) {
      newErrors.birth_date = 'Data de nascimento é obrigatória';
    }

    if (!formData.plan_id) {
      newErrors.plan_id = 'Plano é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      ...formData,
      plan_id: parseInt(formData.plan_id)
    };

    if (patient) {
      updatePatient(payload);
    } else {
      addPatient(payload);
    }

    if (onSaved) {
      onSaved();
    } else {
      setFormData(initialFormState);
    }
  };

  const handleReset = () => {
    setFormData(patient ? { ...patient, plan_id: patient.plan_id || '' } : initialFormState);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-group">
        <label htmlFor="name" className="form-label">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Exemplo da Silva"
          value={formData.name}
          onChange={handleChange}
          className={`input-field bg-white text-black ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="cpf" className="form-label">CPF</label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          placeholder="123.456.789-00"
          value={formData.cpf}
          onChange={handleChange}
          className={`input-field bg-white text-black ${errors.cpf ? 'border-red-500' : ''}`}
        />
        {errors.cpf && <p className="mt-1 text-sm text-red-600">{errors.cpf}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="birth_date" className="form-label">Data de Nascimento</label>
        <input
          type="date"
          id="birth_date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
          className={`input-field bg-white text-black ${errors.birth_date ? 'border-red-500' : ''}`}
        />
        {errors.birth_date && <p className="mt-1 text-sm text-red-600">{errors.birth_date}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="plan_id" className="form-label">Plano</label>
        <select
          id="plan_id"
          name="plan_id"
          value={formData.plan_id}
          onChange={handleChange}
          className={`input-field bg-white text-black ${errors.plan_id ? 'border-red-500' : ''}`}
        >
          <option value="">Selecione um plano</option>
          {plans.map(plan => (
            <option key={plan.id} value={plan.id}>{plan.name}</option>
          ))}
        </select>
        {errors.plan_id && <p className="mt-1 text-sm text-red-600">{errors.plan_id}</p>}
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          className="btn btn-primary"
        >
          {patient ? 'Atualizar' : 'Salvar'}  
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="btn btn-outline"
        >
          Limpar
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
