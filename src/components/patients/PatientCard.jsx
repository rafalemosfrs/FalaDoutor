import { useState } from 'react';
import { FaUserInjured } from 'react-icons/fa';
import ExpandableCard from '../common/ExpandableCard';
import TabPanel from '../common/TabPanel';
import PatientList from './PatientList';
import PatientForm from './PatientForm';
import BulkUpload from '../common/BulkUpload';
import { useData } from '../../context/DataContext';

const PatientCard = () => {
  const { fetchPatients } = useData();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = async () => {
    await fetchPatients();
    setRefreshKey(prev => prev + 1);
  };

  const tabs = [
    {
      label: 'Lista',
      content: <PatientList key={refreshKey} />
    },
    {
      label: 'Cadastro',
      content: (
        <div className="space-y-6">
          <BulkUpload 
            endpoint="/api/patients/bulk" 
            onSuccess={handleSuccess}
          />
          <PatientForm />
        </div>
      )
    }
  ];

  return (
    <ExpandableCard title="Pacientes" icon={<FaUserInjured size={24} />}>
      <TabPanel tabs={tabs} />
    </ExpandableCard>
  );
};

export default PatientCard;
