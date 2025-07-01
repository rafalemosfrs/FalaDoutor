import { useState } from 'react';
import { useData } from '../../context/DataContext';
import PatientForm from './PatientForm';
import { Dialog } from '@headlessui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const PatientList = () => {
  const { patients, deletePatient, plans } = useData();
  const [editingPatient, setEditingPatient] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleEdit = (patient) => setEditingPatient(patient);
  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      deletePatient(id);
    }
  };
  const handleCancelEdit = () => setEditingPatient(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getPlanName = (planId) => {
    const plan = plans.find(p => p.id === planId);
    return plan ? plan.name : 'Desconhecido';
  };

  const getPlanValue = (planId) => {
    const plan = plans.find(p => p.id === planId);
    return plan ? Number(plan.base_value || 0).toFixed(2) : '0.00';
  };

  const getPlanClass = (planId) => {
    const name = getPlanName(planId);
    if (name === 'Plano Premium') return 'bg-green-100 text-green-800';
    if (name === 'Plano Intermediário') return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  if (editingPatient) {
    return (
      <div>
        <button 
          onClick={handleCancelEdit}
          className="mb-4 btn btn-outline"
        >
          Voltar para a lista
        </button>
        <PatientForm patient={editingPatient} onSaved={handleCancelEdit} />
      </div>
    );
  }

  return (
<div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
  {patients.length === 0 ? (
    <p className="text-center py-4 text-gray-500">Nenhum paciente cadastrado.</p>
  ) : (
    <table className="min-w-full bg-white rounded-lg shadow-sm divide-y divide-gray-200">
      <thead className="bg-gray-100 text-gray-600 text-sm">
        <tr>
          <th className="px-6 py-3 text-left font-medium">Nome</th>
          <th className="px-6 py-3 text-center font-medium">Plano</th>
          <th className="px-6 py-3 text-right font-medium">Ações</th>
        </tr>
      </thead>

      <tbody className="text-gray-800 text-sm">
        {Array.isArray(patients) && [...patients]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((patient) => (
            <tr key={patient.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => setSelectedPatient(patient)}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  {patient.name}
                </button>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span className={`px-3 py-1 text-xs rounded-full ${getPlanClass(patient.plan_id)} font-medium`}>
                  {getPlanName(patient.plan_id)} - R$ {getPlanValue(patient.plan_id)}
                </span>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="inline-flex space-x-2">
                  <button 
                    onClick={() => handleEdit(patient)}
                    className="text-indigo-600 hover:text-indigo-800"
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(patient.id)}
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

  {selectedPatient && (
    <Dialog
      open={true}
      onClose={() => setSelectedPatient(null)}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-40 px-4">
        <Dialog.Panel className="bg-white w-full max-w-md rounded-xl p-6 shadow-2xl">
          <Dialog.Title className="text-xl font-semibold text-gray-800 mb-4">
            🧑‍⚕️ Detalhes do Paciente
          </Dialog.Title>

          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <p className="text-gray-500 font-medium">Nome</p>
              <p className="text-blue-700 font-semibold text-base">{selectedPatient.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 font-medium">CPF</p>
                <p>{selectedPatient.cpf}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Nascimento</p>
                <p>{formatDate(selectedPatient.birth_date)}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500 font-medium">Plano</p>
                <p className="text-blue-800 font-medium">{getPlanName(selectedPatient.plan_id)}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={() => setSelectedPatient(null)}
              className="border border-gray-300 text-black text-sm px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Fechar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )}
</div>

  );
};

export default PatientList;
