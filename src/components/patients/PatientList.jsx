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
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Plano</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>


          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(patients) && [...patients]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  
                  <td className="text-black px-6 py-4 whitespace-nowrap">
          <button
            onClick={() => setSelectedPatient(patient)}
            className="text-blue-600 hover:underline"
          >
            {patient.name}
          </button>
        </td>

        <td className="text-black px-6 py-4 whitespace-nowrap text-center">
          <span className={`px-2 py-1 text-xs rounded-full ${getPlanClass(patient.plan_id)}`}>
            {getPlanName(patient.plan_id)} - R$ {getPlanValue(patient.plan_id)}
          </span>
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-right">
          <div className="inline-flex space-x-2">
            <button 
              onClick={() => handleEdit(patient)}
              className="text-blue-600 hover:text-blue-800"
              title="Editar"
            >
              <FaEdit />
            </button>
            <button 
              onClick={() => handleDelete(patient.id)}
              className="text-red-600 hover:text-red-800"
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
            <Dialog.Panel className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
              <Dialog.Title className="text-2xl font-semibold text-gray-800 mb-4">
                🧑‍⚕️ Detalhes do Paciente
              </Dialog.Title>

              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <span className="font-medium text-gray-600">Nome:</span>
                  <p className="text-base font-semibold text-blue-700">{selectedPatient.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <span className="font-medium text-gray-600">CPF:</span>
                    <p>{selectedPatient.cpf}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Nascimento:</span>
                    <p>{formatDate(selectedPatient.birth_date)}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium text-gray-600">Plano:</span>
                    <p className="text-blue-800">
                      {getPlanName(selectedPatient.plan_id)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="btn btn-outline px-4 py-2"
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
