import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useData } from '../../context/DataContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const ReportsPieChart = () => {
  const { 
    doctors,
    patients,
    plans 
  } = useData();

  const doctorsOver50 = doctors.filter(d => {
    const birthYear = parseInt(d.birth_date?.split('-')[0]);
    const age = new Date().getFullYear() - birthYear;
    return age > 50;
  });
  const patientsOver50 = patients.filter(p => {
    const birthYear = parseInt(p.birth_date?.split('-')[0]);
    const age = new Date().getFullYear() - birthYear;
    return age > 50;
  });
  const patientsByPlan = {};
  patients.forEach(p => {
    const plan = plans.find(pl => pl.id === p.plan_id);
    if (plan) {
      patientsByPlan[plan.name] = (patientsByPlan[plan.name] || 0) + 1;
    }
  });
  const patientsWithPlanOver89 = patients.filter(p => {
    const plan = plans.find(pl => pl.id === p.plan_id);
    return plan && plan.base_value > 89;
  });

  // Data for doctors age distribution
  const doctorsAgeData = [
    { name: 'Médicos acima de 50 anos', value: doctorsOver50.length },
    { name: 'Médicos até 50 anos', value: doctors.length - doctorsOver50.length }
  ];

  // Data for patients by plan
  const patientsPlanData = plans.map(plan => ({
    name: plan.name,
    value: patientsByPlan[plan.name] || 0,
    price: plan.base_value
  }));

  // Data for patients age distribution
  const patientsAgeData = [
    { name: 'Pacientes acima de 50 anos', value: patientsOver50.length },
    { name: 'Pacientes até 50 anos', value: patients.length - patientsOver50.length }
  ];

  // Data for patients with plan over 89
  const patientsPlanValueData = [
    { name: 'Planos acima de R$ 89,00', value: patientsWithPlanOver89.length },
    { name: 'Planos até R$ 89,00', value: patients.length - patientsWithPlanOver89.length }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-blue-600">Quantidade: {data.value}</p>
          {data.payload.price && (
            <p className="text-green-600">Valor: R$ {data.payload.price.toFixed(2)}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Médicos por idade */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Distribuição de Médicos por Idade
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={doctorsAgeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {doctorsAgeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Pacientes por plano */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Distribuição de Pacientes por Plano
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={patientsPlanData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {patientsPlanData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Pacientes por idade */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Distribuição de Pacientes por Idade
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={patientsAgeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {patientsAgeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Pacientes por valor do plano */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Pacientes por Valor do Plano (Acima/Abaixo de R$ 89,00)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={patientsPlanValueData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {patientsPlanValueData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReportsPieChart;