import { FaRegListAlt } from 'react-icons/fa';
import ExpandableCard from '../common/ExpandableCard';
import TabPanel from '../common/TabPanel';
import PlanList from './PlanList';
import PlanForm from './PlanForm';
import BulkUpload from '../common/BulkUpload';

const PlanCard = () => {
  const tabs = [
    {
      label: 'Lista',
      content: <PlanList />
    },
    {
      label: 'Cadastro',
      content: (
        <div className="space-y-6">
          <BulkUpload endpoint="/api/plans/bulk" />
          <PlanForm />
        </div>
      )
    }
  ];

  return (
    <ExpandableCard title="Planos de Saúde" icon={<FaRegListAlt size={24} />}>
      <TabPanel tabs={tabs} />
    </ExpandableCard>
  );
};

export default PlanCard;
