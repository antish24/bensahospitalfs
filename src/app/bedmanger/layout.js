'use client';
import SideTopNav from '../../components/sidetopnav/sidetopnav';
import React from 'react';
import { LuLayoutDashboard } from "react-icons/lu";

const BedLayout = ({children}) => {
    const Links = [
        {key: 1, href: "/bedmanger", icon: <LuLayoutDashboard />, label: "Dashboard" },
      ];

  return (
    <div>
      <SideTopNav content={children} links={Links} footer={"Bed Manger Dashboard"}/>
    </div>
  );
};

export default BedLayout;
