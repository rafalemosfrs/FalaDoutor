import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ConsultForm from './ConsultForm';

const ConsultList = () => {
  const [consults, setConsults] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/consults')
      .then(res => res.json())
      .then(setConsults)
      .catch(() => setConsults([]));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir esta consulta?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/consults/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          setConsults(prev => prev.filter(c => c.id !== id));
        }
      } catch (error) {
        console.error('Erro ao excluir consulta:', error);
      }
    }
  };

  const handleUpdate = (updated) => {
    setConsults(prev => prev.map(c => (c.id === updated.id ? updated : c)));
    setEditing(null);
  };

  return (
    <div className="overflow-x-auto">
      {editing ? (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Editar Consulta</h3>
          <ConsultForm 
            initialData={editing} 
            onSaved={handleUpdate} 
            isEdit={true} 
          />
        </div>
      ) : consults.length === 0 ? (
        <p className="text-center text-gray-500 py-4">Nenhuma consulta agendada.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Médico</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paciente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plano</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {consults.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-black">
                  {new Date(c.data).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black">{c.doctor_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-black">{c.patient_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-black">{c.plan_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-black">
                  <div className="inline-flex space-x-2">
                    <button 
                      onClick={() => setEditing(c)} 
                      className="text-blue-600 hover:text-blue-800" 
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
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
    </div>
  );
};

export default ConsultList;
