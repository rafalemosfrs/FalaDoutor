import { FaUserInjured } from 'react-icons/fa';
import ExpandableCard from '../common/ExpandableCard';
import TabPanel from '../common/TabPanel';
import PatientList from './PatientList';
import PatientForm from './PatientForm';
import BulkUpload from '../common/BulkUpload';

const PatientCard = () => {
  const tabs = [
    {
      label: 'Lista',
      content: <PatientList />
    },
    {
      label: 'Cadastro',
      content: (
        <div className="space-y-6">
          <BulkUpload endpoint="patients" />
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