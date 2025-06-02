import { useState } from 'react';
import { useData } from '../../context/DataContext';
import PatientForm from './PatientForm';
import { FaEdit, FaTrash } from 'react-icons/fa';

const PatientList = () => {
  const { patients, deletePatient } = useData();
  const [editingPatient, setEditingPatient] = useState(null);

  const handleEdit = (patient) => {
    setEditingPatient(patient);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      deletePatient(id);
    }
  };

  const handleCancelEdit = () => {
    setEditingPatient(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
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
    <div className="overflow-x-auto">
      {patients.length === 0 ? (
        <p className="text-center py-4 text-gray-500">Nenhum paciente cadastrado.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Nascimento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plano</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {Array.isArray(patients) && patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="text-black px-6 py-4 whitespace-nowrap">{patient.name}</td>
                <td className="text-black px-6 py-4 whitespace-nowrap">{patient.cpf}</td>
                <td className="text-black px-6 py-4 whitespace-nowrap">{formatDate(patient.birth_date)}</td>
                <td className="text-black px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    patient.plan === 'Plano Premium' 
                      ? 'bg-green-100 text-green-800' 
                      : patient.plan === 'Plano Intermediário'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}>
                    {patient.plan}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(patient)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(patient.id)}
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

export default PatientList;