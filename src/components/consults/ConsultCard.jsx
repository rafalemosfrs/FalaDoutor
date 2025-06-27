import { FaCalendarAlt } from 'react-icons/fa';
import ExpandableCard from '../common/ExpandableCard';
import TabPanel from '../common/TabPanel';
import ConsultList from './ConsultList';
import ConsultForm from './ConsultForm';
import BulkUpload from '../common/BulkUpload';

const ConsultCard = () => {
  const tabs = [
    { label: 'Lista', content: <ConsultList /> },
    {
      label: 'Cadastro',
      content: (
        <div className="space-y-6">
          <BulkUpload endpoint="/api/consults/bulk" />
          <ConsultForm />
        </div>
      )
    }
  ];

  return (
    <ExpandableCard title="Consultas" icon={<FaCalendarAlt size={24} />}>
      <TabPanel tabs={tabs} />
    </ExpandableCard>
  );
};

export default ConsultCard;
