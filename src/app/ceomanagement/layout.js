'use client';
import SideTopNav from '../../components/sidetopnav/sidetopnav';
import React from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegCalendarCheck} from "react-icons/fa6";
import {BsPersonRolodex} from "react-icons/bs";

const CeoLayout = ({children}) => {
    const Links = [
        {key: 1, href: "/ceomanagement", icon: <LuLayoutDashboard />, label: "Dashboard" },
        {key: 2,href: "/ceomanagement/patients",icon: <BsPersonRolodex />,label: "Patients",},
        {key: 3, href: "/ceomanagement/Staffs", icon: <FaRegCalendarCheck />, label: "Staffs" },
      ];

  return (
    <div>
      <SideTopNav content={children} links={Links} footer={"CEO Dashboard"}/>
    </div>
  );
};

export default CeoLayout;
