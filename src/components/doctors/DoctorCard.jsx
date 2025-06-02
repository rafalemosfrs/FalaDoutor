import { FaUserMd } from 'react-icons/fa';
import ExpandableCard from '../common/ExpandableCard';
import TabPanel from '../common/TabPanel';
import DoctorList from './DoctorList';
import DoctorForm from './DoctorForm';

const DoctorCard = () => {
  const tabs = [
    {
      label: 'Lista',
      content: <DoctorList />
    },
    {
      label: 'Cadastro',
      content: <DoctorForm />
    }
  ];

  return (
    <ExpandableCard title="Médicos" icon={<FaUserMd size={24} />}>
      <TabPanel tabs={tabs} />
    </ExpandableCard>
  );
};

export default DoctorCard;