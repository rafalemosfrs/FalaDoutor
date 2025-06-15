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
    <div className="overflow-x-auto">
      {plans.length === 0 ? (
        <p className="text-center py-4 text-gray-500">Nenhum plano cadastrado.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome do Plano</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {plans.map(plan => (
              <tr key={plan.id} className="hover:bg-gray-50">
                <td className="text-black px-6 py-4 whitespace-nowrap">{plan.name}</td>
                <td className="text-black px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(plan)} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(plan.id)} className="text-red-600 hover:text-red-800">
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
