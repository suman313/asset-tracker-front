import axios from "axios";
import React, { useEffect, useState } from "react";
import { setBaseUrl } from "../../../../config";

function CompanyApproved() {

    const [companies, setCompanies] = useState([]);

    

    const getRequestedCompanies = async () => {
        try {
            const {data} = await axios.get(`${setBaseUrl}/superadmin/get-approve-companies`,
            {
                headers: {
                    'x-access-tokens': sessionStorage.getItem('superadmin_token')
                }
            }
            )
            console.log(data.response);
            setCompanies(data.response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getRequestedCompanies();

    }, [])


  return (
    <table className="table border-separate w-full">
      <thead className="text-center px-4 py-2 my-5 gap-4 bg-[rgba(217,223,228,0.97)] rounded-md text-lg">
        <td>Company name</td>
        <td>Email</td>
        <td>Name</td>
        <td>Location</td>
        <td>Phone Number</td>
      </thead>
      <tbody>
      {companies.length > 0 && companies.map((item) => (
        <tr className="text-center  gap-4 my-4 bg-[rgba(217,223,228,0.42)] rounded-md text-lg">
        <td className="px-4 py-4">{item?.company_name}</td>
        <td>{item?.email}</td>
        <td>{item?.name}</td>
        <td>{item?.address}</td>
        <td>{item?.phone_no}</td>
      </tr>
      ))}
      </tbody>
      
    </table>
  );
}

export default CompanyApproved;
