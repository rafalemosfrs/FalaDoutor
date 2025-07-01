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
          <button onClick={handleCancelEdit} className="mb-4 border border-gray-300 text-sm px-4 py-2 rounded-md hover:bg-gray-100 transition">
            Voltar para a lista
          </button>
          <DoctorForm doctor={editingDoctor} onSaved={handleCancelEdit} />
        </div>
      ) : doctors.length === 0 ? (
        <p className="text-center py-4 text-gray-500">Nenhum médico cadastrado.</p>
      ) : (
        <table className="min-w-full rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Nome</th>
              <th className="px-6 py-3 text-center font-medium">Planos</th>
              <th className="px-6 py-3 text-right font-medium">Ações</th>
            </tr>
          </thead>

          <tbody className="bg-white text-gray-800 text-sm">
            {[...doctors].sort((a, b) => a.name.localeCompare(b.name)).map((doctor) => (
              <tr key={doctor.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedDoctor(doctor)}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    {doctor.name}
                  </button>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                    {doctor.plan_ids.length} plano{doctor.plan_ids.length !== 1 && 's'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="inline-flex space-x-2">
                    <button
                      onClick={() => handleEdit(doctor)}
                      className="text-indigo-600 hover:text-indigo-800"
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(doctor.id)}
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

      {selectedDoctor && (
        <Dialog
          open={true}
          onClose={() => setSelectedDoctor(null)}
          className="fixed z-50 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-40 px-4">
            <Dialog.Panel className="bg-white w-full max-w-md rounded-xl p-6 shadow-2xl">
              <Dialog.Title className="text-xl font-semibold text-gray-800 mb-4">
                👨‍⚕️ Detalhes do Médico
              </Dialog.Title>

              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="text-gray-500 font-medium">Nome</p>
                  <p className="text-blue-700 font-semibold">{selectedDoctor.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 font-medium">CPF</p>
                    <p>{selectedDoctor.cpf}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Nascimento</p>
                    <p>{new Date(selectedDoctor.birth_date).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">CRM</p>
                    <p>{selectedDoctor.crm}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Especialidade</p>
                    <p>{selectedDoctor.especialidade || <span className="italic text-gray-400">Não informada</span>}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 font-medium">Planos Atendidos</p>
                  {selectedDoctor.plan_ids.length > 0 ? (
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {getPlanNames(selectedDoctor.plan_ids).split(', ').map((plan, idx) => (
                        <li key={idx} className="text-blue-700">{plan}</li>
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
                  className="border border-gray-300 text-sm text-black px-4 py-2 rounded-md hover:bg-gray-100 transition"
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
