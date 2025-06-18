import { FaChartBar } from 'react-icons/fa';
import ExpandableCard from '../common/ExpandableCard';
import TabPanel from '../common/TabPanel';
import ReportsList from './ReportsList';
import ReportsPieChart from './ReportsPieChart';
import ReportsBarChart from './ReportsBarChart';

const ReportsCard = () => {
  const tabs = [
    {
      label: 'Lista',
      content: <ReportsList />
    },
    {
      label: 'Gráfico de Pizza',
      content: <ReportsPieChart />
    },
    {
      label: 'Gráfico de Barras',
      content: <ReportsBarChart />
    }
  ];

  return (
    <ExpandableCard title="Relatórios" icon={<FaChartBar size={24} />}>
      <TabPanel tabs={tabs} />
    </ExpandableCard>
  );
};

export default ReportsCard;