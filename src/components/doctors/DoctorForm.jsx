import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useData } from '../../context/DataContext';

const initialFormState = {
  name: '',
  cpf: '',
  birth_date: '',
  crm: '',
  especialidade: '',
  plan_ids: []
};

const DoctorForm = ({ doctor = null, onSaved = null }) => {
  const { addDoctor, updateDoctor, plans } = useData();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const planOptions = plans.map(plan => ({
    value: plan.id,
    label: plan.name
  }));

  useEffect(() => {
    if (doctor) {
      setFormData({
        ...doctor,
        plan_ids: doctor.plan_ids || [],
        especialidade: doctor.especialidade || ''
      });
    }
  }, [doctor]);

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

    if (!formData.crm.trim()) {
      newErrors.crm = 'CRM é obrigatório';
    }

    if (!formData.especialidade.trim()) {
      newErrors.especialidade = 'Especialidade é obrigatória';
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

  const handlePlansChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map(option => option.value);
    setFormData(prev => ({ ...prev, plan_ids: selectedIds }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (doctor) {
      updateDoctor(formData);
    } else {
      addDoctor(formData);
    }

    if (onSaved) {
      onSaved();
    } else {
      setFormData(initialFormState);
    }
  };

  const handleReset = () => {
    setFormData(doctor ? {
      ...doctor,
      plan_ids: doctor.plan_ids || [],
      especialidade: doctor.especialidade || ''
    } : initialFormState);
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
        <label htmlFor="crm" className="form-label">CRM</label>
        <input
          type="text"
          id="crm"
          name="crm"
          placeholder="CRM-UF 12345"
          value={formData.crm}
          onChange={handleChange}
          className={`input-field ${errors.crm ? 'border-red-500' : ''}`}
        />
        {errors.crm && <p className="mt-1 text-sm text-red-600">{errors.crm}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="especialidade" className="form-label">Especialidade</label>
        <input
          type="text"
          id="especialidade"
          name="especialidade"
          placeholder="Ex: Clínico Geral"
          value={formData.especialidade}
          onChange={handleChange}
          className={`input-field ${errors.especialidade ? 'border-red-500' : ''}`}
        />
        {errors.especialidade && <p className="mt-1 text-sm text-red-600">{errors.especialidade}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Planos Atendidos</label>
        <Select
          isMulti
          options={planOptions}
          value={planOptions.filter(opt => formData.plan_ids.includes(opt.value))}
          onChange={handlePlansChange}
          placeholder="Selecione os planos..."
          styles={{
            control: (base) => ({
              ...base,
              borderColor: '#3b82f6',
              boxShadow: 'none',
              '&:hover': { borderColor: '#2563eb' },
            }),
            menu: (base) => ({
              ...base,
              zIndex: 100,
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: 6,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: '#e0f2fe',
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: '#0369a1',
              fontWeight: 500,
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#e0f2fe' : undefined,
              color: '#111827',
              fontSize: '0.875rem',
              padding: 10,
            }),
            menuList: (base) => ({
              ...base,
              maxHeight: '180px',
              overflowY: 'auto',  
            }),
          }}
        />
      </div>

      <div className="flex space-x-3">
        <button type="submit" className="btn btn-primary">
          {doctor ? 'Atualizar' : 'Salvar'}
        </button>
        <button type="button" onClick={handleReset} className="btn btn-outline">
          Limpar
        </button>
      </div>
    </form>
  );
};

export default DoctorForm;
