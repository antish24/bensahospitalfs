'use client';
import SideTopNav from '../../components/sidetopnav/sidetopnav';
import React, { useState } from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import {FaBedPulse, FaRegCalendarCheck} from "react-icons/fa6";
import {PiNotepad } from "react-icons/pi";
import {BsPersonRolodex} from "react-icons/bs";
import {GiTestTubes} from "react-icons/gi";
import IsAuth from '@/helper/IsAuth';

const PhysiciansLayout = ({children}) => {
  const [loading,setLoading]=useState(false);

  const Links = [
        {key: 1, href: "/physicians", icon: <LuLayoutDashboard />, label: "Dashboard" },
        {key: 2,href: "/physicians/patient",icon: <BsPersonRolodex />,label: "Patient",},
        {key: 3, href: "/physicians/appointment", icon: <FaRegCalendarCheck />, label: "Appointment" },
        {key: 4, href: "/physicians/prescription", icon: <PiNotepad />, label: "Prescription" },
        {key: 5, href: "/physicians/diagnostic", icon: <GiTestTubes />, label: "Diagnostic" },
        {key: 6, href: "/physicians/bed", icon: <FaBedPulse/>, label: "Bed" },
      ];

  return (
    <div>
      <IsAuth path={'physicians'} setLoading={(e)=>setLoading(e)}/>
      {loading?null:
      <SideTopNav content={children} links={Links} footer={"Physician Dashboard"}/>}
    </div>
  );
};

export default PhysiciansLayout;
