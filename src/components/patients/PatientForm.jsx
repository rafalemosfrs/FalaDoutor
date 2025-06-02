import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

const initialFormState = {
  name: '',
  cpf: '',
  birth_date: '',
  plan: 'Plano Básico'
};

const healthPlans = [
  'Plano Básico',
  'Plano Intermediário',
  'Plano Premium'
];

const PatientForm = ({ patient = null, onSaved = null }) => {
  const { addPatient, updatePatient } = useData();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (patient) {
      setFormData(patient);
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
    
    if (!formData.plan) {
      newErrors.plan = 'Plano é obrigatório';
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
    
    if (!validateForm()) {
      return;
    }
    
    if (patient) {
      updatePatient(formData);
    } else {
      addPatient(formData);
    }
    
    if (onSaved) {
      onSaved();
    } else {
      setFormData(initialFormState);
    }
  };

  const handleReset = () => {
    setFormData(patient ? patient : initialFormState);
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
          value={formData.name}
          onChange={handleChange}
          className={`input-field ${errors.name ? 'border-red-500' : ''}`}
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
          className={`input-field ${errors.cpf ? 'border-red-500' : ''}`}
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
          className={`input-field ${errors.birth_date ? 'border-red-500' : ''}`}
        />
        {errors.birth_date && <p className="mt-1 text-sm text-red-600">{errors.birth_date}</p>}
      </div>
      
      <div className="form-group">
        <label htmlFor="plan" className="form-label">Plano</label>
        <select
          id="plan"
          name="plan"
          value={formData.plan}
          onChange={handleChange}
          className={`input-field ${errors.plan ? 'border-red-500' : ''}`}
        >
          {healthPlans.map(plan => (
            <option key={plan} value={plan}>{plan}</option>
          ))}
        </select>
        {errors.plan && <p className="mt-1 text-sm text-red-600">{errors.plan}</p>}
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