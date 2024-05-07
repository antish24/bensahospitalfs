'use client';
import SideTopNav from '../../components/sidetopnav/sidetopnav';
import React from 'react';
import { LuLayoutDashboard } from "react-icons/lu";

const CashierLayout = ({children}) => {
    const Links = [
        {key: 1, href: "/cashier", icon: <LuLayoutDashboard />, label: "Dashboard" },
      ];

  return (
    <div>
      <SideTopNav content={children} links={Links} footer={"Cashier Dashboard"}/>
    </div>
  );
};

export default CashierLayout;
