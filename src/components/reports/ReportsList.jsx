import { useData } from '../../context/DataContext';

const ReportsList = () => {
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

  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">
          Médicos acima de 50 anos
        </h3>
        <div className="text-2xl font-bold text-blue-600 mb-2">
          {doctorsOver50.length}
        </div>
        {doctorsOver50.length > 0 && (
          <div className="space-y-1">
            <p className="text-sm text-blue-700 font-medium">Lista:</p>
            <ul className="text-sm text-blue-600">
              {doctorsOver50.map(doctor => (
                <li key={doctor.id}>• {doctor.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold text-green-800 mb-3">
          Quantidade de Pacientes por Plano
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map(plan => (
            <div key={plan.name} className="text-center">
              <div className="text-xl font-bold text-green-600">
                {patientsByPlan[plan.name] || 0}
              </div>
              <div className="text-sm text-green-700">{plan.name}</div>
              <div className="text-xs text-green-600">
                R$ {Number(plan.base_value || 0).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
        <h3 className="text-lg font-semibold text-orange-800 mb-3">
          Pacientes acima de 50 anos
        </h3>
        <div className="text-2xl font-bold text-orange-600 mb-2">
          {patientsOver50.length}
        </div>
        {patientsOver50.length > 0 && (
          <div className="space-y-1">
            <p className="text-sm text-orange-700 font-medium">Lista:</p>
            <ul className="text-sm text-orange-600">
              {patientsOver50.map(patient => (
                <li key={patient.id}>• {patient.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-800 mb-3">
          Pacientes com plano acima de R$ 89,00
        </h3>
        <div className="text-2xl font-bold text-purple-600 mb-2">
          {patientsWithPlanOver89.length}
        </div>
        {patientsWithPlanOver89.length > 0 && (
          <div className="space-y-1">
            <p className="text-sm text-purple-700 font-medium">Lista:</p>
            <ul className="text-sm text-purple-600">
              {patientsWithPlanOver89.map(patient => (
                <li key={patient.id}>• {patient.name} {patient.plan}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsList;