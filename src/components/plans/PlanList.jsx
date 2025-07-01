import { useState } from 'react';
import { useData } from '../../context/DataContext';
import PlanForm from './PlanForm';
import { FaEdit, FaTrash } from 'react-icons/fa';

const PlanList = () => {
  const { plans, deletePlan } = useData();
  const [editingPlan, setEditingPlan] = useState(null);

  const handleEdit = (plan) => {
    setEditingPlan(plan);
  };

  const handleDelete = (id) => {
    if (window.confirm('Deseja excluir este plano?')) {
      deletePlan(id);
    }
  };

  const handleCancelEdit = () => {
    setEditingPlan(null);
  };

  if (editingPlan) {
    return (
      <div>
        <button onClick={handleCancelEdit} className="mb-4 btn btn-outline">
          Voltar para a lista
        </button>
        <PlanForm plan={editingPlan} onSaved={handleCancelEdit} />
      </div>
    );
  }

  return (
<div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
  {plans.length === 0 ? (
    <p className="text-center py-4 text-gray-500">Nenhum plano cadastrado.</p>
  ) : (
    <table className="min-w-full bg-white rounded-lg shadow-sm divide-y divide-gray-200">
      <thead className="bg-gray-100 text-gray-600 text-sm">
        <tr>
          <th className="px-6 py-3 text-left font-medium">Nome do Plano</th>
          <th className="px-6 py-3 text-left font-medium">Valor</th>
          <th className="px-6 py-3 text-right font-medium">Ações</th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-800">
        {plans.map(plan => (
          <tr key={plan.id} className="hover:bg-gray-50 transition">
            <td className="px-6 py-4 whitespace-nowrap">{plan.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">R$ {Number(plan.base_value || 0).toFixed(2)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              <div className="inline-flex space-x-2">
                <button
                  onClick={() => handleEdit(plan)}
                  className="text-indigo-600 hover:text-indigo-800"
                  title="Editar"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Excluir"
                >
                  <FaTrash />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

  );
};

export default PlanList;
