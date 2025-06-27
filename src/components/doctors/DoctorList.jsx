import { useState } from 'react';
import { useData } from '../../context/DataContext';
import DoctorForm from './DoctorForm';
import { Dialog } from '@headlessui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const DoctorList = () => {
  const { doctors, deleteDoctor, plans } = useData();
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleEdit = (doctor) => setEditingDoctor(doctor);
  const handleCancelEdit = () => setEditingDoctor(null);
  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este médico?')) {
      deleteDoctor(id);
    }
  };

  const getPlanNames = (planIds) => {
    return planIds
      .map(id => plans.find(p => p.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
      {editingDoctor ? (
        <div>
          <button onClick={handleCancelEdit} className="mb-4 btn btn-outline">
            Voltar para a lista
          </button>
          <DoctorForm doctor={editingDoctor} onSaved={handleCancelEdit} />
        </div>
      ) : doctors.length === 0 ? (
        <p className="text-center py-4 text-gray-500">Nenhum médico cadastrado.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {[...doctors]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((doctor) => (

              <tr key={doctor.id} className="hover:bg-gray-50">
<td className="px-6 py-4 whitespace-nowrap flex items-center justify-between space-x-2">
  <button
    onClick={() => setSelectedDoctor(doctor)}
    className="text-blue-600 hover:underline text-left"
  >
    {doctor.name}
  </button>

  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
    {doctor.plan_ids.length} plano{doctor.plan_ids.length !== 1 && 's'} atendido{doctor.plan_ids.length !== 1 && 's'}
  </span>
</td>
                <td className="text-black px-6 py-4 whitespace-nowrap text-right">
                  <div className="inline-flex space-x-2">
                    <button
                      onClick={() => handleEdit(doctor)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(doctor.id)}
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

      {selectedDoctor && (
        <Dialog
          open={true}
          onClose={() => setSelectedDoctor(null)}
          className="fixed z-50 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-40 px-4">
          <Dialog.Panel className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
  <Dialog.Title className="text-2xl font-semibold text-gray-800 mb-4">
    👨‍⚕️ Detalhes do Médico
  </Dialog.Title>

  <div className="space-y-3 text-sm text-gray-700">
    <div>
      <span className="font-medium text-gray-600">Nome:</span>
      <p className="text-base font-semibold text-blue-700">{selectedDoctor.name}</p>
    </div>

    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
  <div>
    <span className="font-medium text-gray-600">CPF:</span>
    <p>{selectedDoctor.cpf}</p>
  </div>
  <div>
    <span className="font-medium text-gray-600">Nascimento:</span>
    <p>{new Date(selectedDoctor.birth_date).toLocaleDateString('pt-BR')}</p>
  </div>

  <div>
    <span className="font-medium text-gray-600">CRM:</span>
    <p>{selectedDoctor.crm}</p>
  </div>
  <div>
    <span className="font-medium text-gray-600">Especialidade:</span>
    <p>
      {selectedDoctor.especialidade
        ? selectedDoctor.especialidade
        : <span className="italic text-gray-400">Não informada</span>}
    </p>
  </div>
</div>



    <div>
      <span className="font-medium text-gray-600">Planos Atendidos:</span>
      {selectedDoctor.plan_ids.length > 0 ? (
        <ul className="list-disc list-inside mt-1 space-y-1">
          {getPlanNames(selectedDoctor.plan_ids).split(', ').map((plan, idx) => (
            <li key={idx} className="text-blue-800">{plan}</li>
          ))}
        </ul>
      ) : (
        <p className="italic text-gray-400">Nenhum plano associado</p>
      )}
    </div>
  </div>

  <div className="mt-6 text-right">
    <button
      onClick={() => setSelectedDoctor(null)}
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

export default DoctorList;
