import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useData } from '../../context/DataContext';

const ReportsBarChart = () => {
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

  const ageDistributionData = [
    {
      category: 'Médicos',
      'Acima de 50 anos': doctorsOver50.length,
      'Até 50 anos': doctors.length - doctorsOver50.length
    },
    {
      category: 'Pacientes',
      'Acima de 50 anos': patientsOver50.length,
      'Até 50 anos': patients.length - patientsOver50.length
    }
  ];

  const planDistributionData = plans.map(plan => ({
    plano: plan.name.replace('Plano ', ''),
    quantidade: patientsByPlan[plan.name] || 0,
    valor: plan.base_value
  }));

  const planValueData = [
    {
      categoria: 'Planos até R$ 89,00',
      quantidade: patients.length - patientsWithPlanOver89.length
    },
    {
      categoria: 'Planos acima de R$ 89,00',
      quantidade: patientsWithPlanOver89.length
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Distribuição por Idade - Médicos vs Pacientes
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ageDistributionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Acima de 50 anos" fill="#FF8042" />
            <Bar dataKey="Até 50 anos" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Quantidade de Pacientes por Plano
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={planDistributionData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barCategoryGap="20%"
            barGap={10}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="plano" 
              textAnchor="end"
              tickMargin={10}
              angle={-25}                
            />
            <YAxis />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
                      <p className="font-medium">Plano {label}</p>
                      <p className="text-blue-600">Quantidade: {data.quantidade}</p>
                      <p className="text-green-600">Valor: R$ {Number(data.valor || 0).toFixed(2)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: 30 }}
            />
            <Bar dataKey="quantidade" fill="#0088FE" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Pacientes por Valor do Plano
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={planValueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categoria" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="quantidade" fill="#FFBB28" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReportsBarChart;