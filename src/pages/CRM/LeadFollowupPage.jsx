import LeadFollowupTable from '../../components/CRM/LeadFollowupTable'; 
import UserProvider from "../../UserProvider";

const LeadFollowupPage = () => {
  return (
    <div>
          <UserProvider>
             <LeadFollowupTable />
          </UserProvider>      
    </div>
  );
};

export default LeadFollowupPage;
