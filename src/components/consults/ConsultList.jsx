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
<div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
  {editing ? (
    <div className="mb-6 bg-white p-6 rounded-xl shadow-lg">
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
    <table className="min-w-full bg-white rounded-lg shadow-sm divide-y divide-gray-200">
      <thead className="bg-gray-100 text-gray-600 text-sm">
        <tr>
          <th className="px-6 py-3 text-left font-medium">Data</th>
          <th className="px-6 py-3 text-left font-medium">Hora</th>
          <th className="px-6 py-3 text-left font-medium">Médico</th>
          <th className="px-6 py-3 text-left font-medium">Paciente</th>
          <th className="px-6 py-3 text-left font-medium">Plano</th>
          <th className="px-6 py-3 text-right font-medium">Ações</th>
        </tr>
      </thead>
      <tbody className="text-gray-800 text-sm">
        {consults.map(c => (
          <tr key={c.id} className="hover:bg-gray-50 transition">
            <td className="px-6 py-4 whitespace-nowrap">
              {new Date(c.data).toLocaleDateString('pt-BR')}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{c.hora}</td>
            <td className="px-6 py-4 whitespace-nowrap">{c.doctor_name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{c.patient_name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{c.plan_name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              <div className="inline-flex space-x-2">
                <button
                  onClick={() => setEditing(c)}
                  className="text-indigo-600 hover:text-indigo-800"
                  title="Editar"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
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

export default ConsultList;
