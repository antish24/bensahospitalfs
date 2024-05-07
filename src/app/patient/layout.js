'use client';
import SideTopNav from '../../components/sidetopnav/sidetopnav';
import React from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegCalendarCheck} from "react-icons/fa6";
import {BsPersonRolodex} from "react-icons/bs";

const PatientLayout = ({children}) => {
    const Links = [
        {key: 1, href: "/patient", icon: <LuLayoutDashboard />, label: "Dashboard" },
        {key: 2,href: "/patient/prescription",icon: <BsPersonRolodex />,label: "Prescription",},
        {key: 3, href: "/patient/appointment", icon: <FaRegCalendarCheck />, label: "Appointment" },
      ];

  return (
    <div>
      <SideTopNav content={children} links={Links} footer={"Patient Dashboard"}/>
    </div>
  );
};

export default PatientLayout;
