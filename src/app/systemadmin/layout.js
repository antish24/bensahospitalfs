'use client';
import SideTopNav from '../../components/sidetopnav/sidetopnav';
import React from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import {FaUsers} from "react-icons/fa6";

const SystemAdminLayout = ({children}) => {
    const Links = [
        {key: 1, href: "/systemadmin", icon: <LuLayoutDashboard />, label: "Dashboard" },
        {key: 2,href: "/systemadmin/users",icon: <FaUsers />,label: "Users",},
      ];

  return (
    <div>
      <SideTopNav content={children} links={Links} footer={"Triage Dashboard"}/>
    </div>
  );
};

export default SystemAdminLayout;
