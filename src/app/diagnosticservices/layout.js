'use client';
import SideTopNav from '../../components/sidetopnav/sidetopnav';
import React, { useState } from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import {GiTestTubes} from "react-icons/gi";
import { FaList, FaRegCalendarCheck } from 'react-icons/fa6';
import IsAuth from '@/helper/IsAuth';

const DiagnosticLayout = ({children}) => {
  const [loading,setLoading]=useState(false);

    const Links = [
        {key: 1, href: "/diagnosticservices", icon: <LuLayoutDashboard />, label: "Dashboard" },
        {key: 5, href: "/diagnosticservices/diagnostic", icon: <GiTestTubes />, label: "Diagnostic" },
        {key: 6, href: "/diagnosticservices/appointment", icon: <FaRegCalendarCheck />, label: "Appointment" },
      ];

  return (
    <div>
      <IsAuth path={'diagnosticservices'} setLoading={(e)=>setLoading(e)}/>
    {loading?null:
      <SideTopNav content={children} links={Links} footer={"Diagnostic Services Dashboard"}/>}
    </div>
  );
};

export default DiagnosticLayout;
