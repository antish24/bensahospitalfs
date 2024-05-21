'use client';
import SideTopNav from '../../components/sidetopnav/sidetopnav';
import React from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import { FaCashRegister } from "react-icons/fa6";
const CashierLayout = ({children}) => {
    const Links = [
        {key: 1, href: "/cashier", icon: <LuLayoutDashboard />, label: "Dashboard" },
        {key: 1, href: "/cashier/requests", icon: <FaCashRegister />, label: "Requests" },
      ];

  return (
    <div>
      <SideTopNav content={children} links={Links} footer={"Cashier Dashboard"}/>
    </div>
  );
};

export default CashierLayout;
