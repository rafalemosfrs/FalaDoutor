import { FaCalendarAlt } from 'react-icons/fa';
import ExpandableCard from '../common/ExpandableCard';
import TabPanel from '../common/TabPanel';
import ConsultList from './ConsultList';
import ConsultForm from './ConsultForm';

const ConsultCard = () => {
  const tabs = [
    { label: 'Lista', content: <ConsultList /> },
    { label: 'Cadastro', content: <ConsultForm /> }
  ];

  return (
    <ExpandableCard title="Consultas" icon={<FaCalendarAlt size={24} />}>
      <TabPanel tabs={tabs} />
    </ExpandableCard>
  );
};

export default ConsultCard;
