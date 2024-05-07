'use client';
import SideTopNav from '../../components/sidetopnav/sidetopnav';
import React from 'react';
import { LuLayoutDashboard } from "react-icons/lu";

const PharmacyLayout = ({children}) => {
    const Links = [
        {key: 1, href: "/pharmacy", icon: <LuLayoutDashboard />, label: "Dashboard" },
      ];

  return (
    <div>
      <SideTopNav content={children} links={Links} footer={"Pharmacy Dashboard"}/>
    </div>
  );
};

export default PharmacyLayout;
