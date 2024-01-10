import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { setBaseUrl } from '../../config';
import Select from "react-select";

export const UpdateEmployee = () => {

    const {email} = useParams();

    const navigate = useNavigate();

    const selectOptions = [
        {
          value: "ASSETS.ALL",
          label: "ASSETS.ALL",
        },
        { value: "ASSETS.VIEW", label: "ASSETS.VIEW" },
        { value: "ASSETS.CRU", label: "ASSETS.CRU" },
        { value: "MAINT.ALL", label: "MAINT.ALL" },
        { value: "MAINT.CRU", label: "MAINT.CRU" },
        { value: "MAINT.VIEW", label: "MAINT.VIEW" },
    
        { value: "LEASE.ALL", label: "LEASE.ALL" },
        { value: "LEASE.CRU", label: "LEASE.CRU" },
        { value: "LEASE.VIEW", label: "LEASE.VIEW" },
        { value: "OPERATOR.ALL", label: "OPERATOR.ALL" },
        { value: "OPERATOR.CRU", label: "OPERATOR.CRU" },
        { value: "OPERATOR.VIEW", label: "OPERATOR.VIEW" },
        { value: "ADMIN.ALL", label: "ADMIN.ALL" },
      ];

      const [selectOption, setSelectedOption] = useState(null);

const getAllPermissions = async () => {
    try {
        const {data} = await axios.get(`${setBaseUrl}/company/view-permissions-for-update`,
        {
            headers: {
                "x-access-tokens": sessionStorage.getItem("token"),
                "email": email
            }
        })
        console.log(data);
        // setSelectedOption()
    } catch (error) {
        console.log(error)
        alert(error.message)
    }
   
}

useEffect(() => {
    getAllPermissions();
},[])

  return (
    <div className="h-full w-full">
      <div className="flex justify-start items-center mx-10 my-0">
        <div className="flex justify-between items-center">
          <button onClick={() => navigate('/settings')} >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-6 h-6 mr-6 cursor-pointer feather feather-arrow-left"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <p className="inline  text-xl font-medium text-slate-700 dark:text-slate-200 ml-5">
            Add Employee
          </p>
        </div>
      </div>
      <div className="intro-y mx-10 overflow-auto lg:overflow-visible mt-8 sm:mt-0">
        <div className="flex flex-col gap-2 justify-center items-center">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="p-2 mx-4 rounded-md"
            // onChange={(e) =>
            //   setEmployeeDetail({ ...employeeDetail, email: e.target.value })
            // }
          />
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Employee Name"
            className="p-2 mx-4 rounded-md"
            // onChange={(e) =>
            //   setEmployeeDetail({ ...employeeDetail, name: e.target.value })
            // }
          />
          <label>Choose Permissions: </label>
          <Select
            isMulti
            onChange={setSelectedOption}
            options={selectOptions}
          />
          <button
            type="submit"
            className="p-2 bg-[#402aba] text-white rounded-md"
            // onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
