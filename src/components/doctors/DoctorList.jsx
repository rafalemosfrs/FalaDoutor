import { useState } from 'react';
import { useData } from '../../context/DataContext';
import DoctorForm from './DoctorForm';
import { FaEdit, FaTrash } from 'react-icons/fa';

const DoctorList = () => {
  const { doctors, deleteDoctor } = useData();
  const [editingDoctor, setEditingDoctor] = useState(null);

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este médico?')) {
      deleteDoctor(id);
    }
  };

  const handleCancelEdit = () => {
    setEditingDoctor(null);
  };

  if (editingDoctor) {
    return (
      <div>
        <button 
          onClick={handleCancelEdit}
          className="mb-4 btn btn-outline"
        >
          Voltar para a lista
        </button>
        <DoctorForm doctor={editingDoctor} onSaved={handleCancelEdit} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
      {doctors.length === 0 ? (
        <p className="text-center py-4 text-gray-500">Nenhum médico cadastrado.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nascimento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CRM</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {Array.isArray(doctors) && doctors.map((doctor) => (
              <tr key={doctor.id} className="hover:bg-gray-50">
                <td className="text-black px-6 py-4 whitespace-nowrap">{doctor.name}</td>
                <td className="text-black px-6 py-4 whitespace-nowrap">{doctor.cpf}</td>
                <td className="text-black px-6 py-4 whitespace-nowrap">{new Date(doctor.birth_date).toLocaleDateString('pt-BR')}</td>
                <td className="text-black px-6 py-4 whitespace-nowrap">{doctor.crm}</td>
                <td className="text-black px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(doctor)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(doctor.id)}
                      className="text-red-600 hover:text-red-800"
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

export default DoctorList;