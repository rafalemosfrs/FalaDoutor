import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

const initialFormState = {
  name: '',
  base_value: ''
};

const PlanForm = ({ plan = null, onSaved = null }) => {
  const { addPlan, updatePlan } = useData();
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name || '',
        base_value: plan.base_value || ''
      });
    }
  }, [plan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError('O nome do plano é obrigatório.');
      return;
    }

    const payload = {
      ...formData,
      id: plan?.id,
      base_value: Number(formData.base_value)
    };

    if (plan) {
      updatePlan(payload);
    } else {
      addPlan(payload);
    }

    if (onSaved) {
      onSaved();
    } else {
      setFormData(initialFormState);
    }
  };

  const handleReset = () => {
    setFormData(plan ? {
      name: plan.name || '',
      base_value: plan.base_value || ''
    } : initialFormState);
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-group">
        <label htmlFor="name" className="form-label">Nome do Plano</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Ex: Plano Premium"
          value={formData.name}
          onChange={handleChange}
          className={`input-field ${error ? 'border-red-500' : ''}`}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="base_value" className="form-label">Valor do Plano (R$)</label>
        <input
          type="number"
          id="base_value"
          name="base_value"
          step="0.01"
          placeholder="Ex: 89.90"
          value={formData.base_value}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      <div className="flex space-x-3">
        <button type="submit" className="btn btn-primary">
          {plan ? 'Atualizar' : 'Salvar'}
        </button>
        <button type="button" onClick={handleReset} className="btn btn-outline">
          Limpar
        </button>
      </div>
    </form>
  );
};

export default PlanForm;
