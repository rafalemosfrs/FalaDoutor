import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ReportsList = () => {
  const { doctors, patients, plans } = useData();
  const [filters, setFilters] = useState({
    medico_id: '',
    paciente_id: '',
    plano_id: '',
    start_date: '',
    end_date: ''
  });
  const [consults, setConsults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== '')
    );

    const query = new URLSearchParams(cleanedFilters).toString();
    console.log('Filtros aplicados:', cleanedFilters);

    const res = await fetch(`http://localhost:5000/api/consults?${query}`);
    const data = await res.json();
    setConsults(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir esta consulta?')) {
      await fetch(`http://localhost:5000/api/consults/${id}`, { method: 'DELETE' });
      handleSearch();
    }
  };

  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
      <div className="bg-white p-4 rounded-lg border shadow">
        <h3 className="text-lg text-black font-semibold mb-4">🔎 Filtros de Consultas</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Médico</label>
            <select
              name="medico_id"
              value={filters.medico_id}
              onChange={e => handleChange({ target: { name: 'medico_id', value: Number(e.target.value) || '' } })}
              className="input-field"
            >
              <option value="">Todos</option>
              {[...doctors].sort((a, b) => a.name.localeCompare(b.name)).map((doctor) => (
                <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Paciente</label>
            <select
              name="paciente_id"
              value={filters.paciente_id}
              onChange={e => handleChange({ target: { name: 'paciente_id', value: Number(e.target.value) || '' } })}
              className="input-field"
            >
              <option value="">Todos</option>
              {[...patients].sort((a, b) => a.name.localeCompare(b.name)).map((patient) => (
                <option key={patient.id} value={patient.id}>{patient.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Plano</label>
            <select
              name="plano_id"
              value={filters.plano_id}
              onChange={e => handleChange({ target: { name: 'plano_id', value: Number(e.target.value) || '' } })}
              className="input-field"
            >
              <option value="">Todos</option>
              {[...plans].sort((a, b) => a.name.localeCompare(b.name)).map((plan) => (
                <option key={plan.id} value={plan.id}>{plan.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <div>
              <label className="form-label">De</label>
              <input
                type="date"
                name="start_date"
                value={filters.start_date}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="form-label">Até</label>
              <input
                type="date"
                name="end_date"
                value={filters.end_date}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button onClick={handleSearch} className="btn btn-primary">Buscar</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border shadow">
        <h3 className="text-lg font-semibold mb-4">📋 Resultados</h3>
        {consults.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhuma consulta encontrada.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs text-gray-500">Data</th>
                <th className="px-4 py-2 text-left text-xs text-gray-500">Médico</th>
                <th className="px-4 py-2 text-left text-xs text-gray-500">Paciente</th>
                <th className="px-4 py-2 text-left text-xs text-gray-500">Plano</th>
                <th className="px-4 py-2 text-center text-xs text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...consults]
                .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
                .map((consult) => (
                  <tr key={consult.id}>
                    <td className="px-4 text-black py-2">{new Date(consult.data).toLocaleDateString('pt-BR')}</td>
                    <td className="px-4 text-black py-2">{consult.doctor_name}</td>
                    <td className="px-4 text-black py-2">{consult.patient_name}</td>
                    <td className="px-4 text-black py-2">{consult.plan_name}</td>
                    <td className="px-4 py-2 text-center">
                      <button className="text-blue-600 hover:text-blue-800 mr-2">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(consult.id)} className="text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReportsList;
