import React, { useEffect } from 'react'
import Layout from './Layout'
import CompanyRequests from '../../components/tables/SuperadminTable/CompanyRequests/CompanyRequests'
import { useNavigate } from 'react-router-dom'
import CompanyApproved from '../../components/tables/SuperadminTable/CompanyApproved/CompanyApproved';
function Dashboard(props) {
  const getAllProps = props.activeTab;
  const activeTab = getAllProps[0]
  const setActiveTab = getAllProps[1];

const navigate = useNavigate();

  const checkIfLoggdIn = () => {
    if(sessionStorage.getItem("superadmin_token")) {
        return true;
    }
    return false;
}

useEffect (() => {
  let ifNotLoggedIn = checkIfLoggdIn();
  if(!ifNotLoggedIn) {
    navigate('/superadmin/login');
  }
},[])
  return (
    <Layout propsForActiveTab={props}>
        
            <div className='flex flex-col justify-center items-center bg-white rounded-[9px] p-4'>
                {activeTab==1 ? <CompanyRequests setActiveTab={setActiveTab} /> : <CompanyApproved setActiveTab={setActiveTab}  />}
            </div>
    </Layout>
  )
}

export default Dashboard