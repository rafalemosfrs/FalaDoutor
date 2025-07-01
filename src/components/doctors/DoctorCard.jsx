import { useState } from 'react';
import { FaUserMd } from 'react-icons/fa';
import ExpandableCard from '../common/ExpandableCard';
import TabPanel from '../common/TabPanel';
import DoctorList from './DoctorList';
import DoctorForm from './DoctorForm';
import BulkUpload from '../common/BulkUpload';
import { useData } from '../../context/DataContext';

const DoctorCard = () => {
  const { fetchDoctors } = useData();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = async () => {
    await fetchDoctors();
    setRefreshKey(prev => prev + 1);
  };

  const tabs = [
    {
      label: 'Lista',
      content: <DoctorList key={refreshKey} />
    },
    {
      label: 'Cadastro',
      content: (
        <div className="space-y-6">
          <BulkUpload
            endpoint="/api/doctors/bulk"
            onSuccess={handleSuccess}
          />
          <DoctorForm />
        </div>
      )
    }
  ];

  return (
    <ExpandableCard title="Médicos" icon={<FaUserMd size={24} />}>
      <TabPanel tabs={tabs} />
    </ExpandableCard>
  );
};

export default DoctorCard;
