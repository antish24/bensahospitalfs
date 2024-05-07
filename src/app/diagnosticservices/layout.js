'use client';
import SideTopNav from '../../components/sidetopnav/sidetopnav';
import React from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import {GiTestTubes} from "react-icons/gi";

const DiagnosticLayout = ({children}) => {
    const Links = [
        {key: 1, href: "/diagnosticservices", icon: <LuLayoutDashboard />, label: "Dashboard" },
        {key: 5, href: "/diagnosticservices/diagnostic", icon: <GiTestTubes />, label: "Diagnostic" },
      ];

  return (
    <div>
      <SideTopNav content={children} links={Links} footer={"Diagnostic Services Dashboard"}/>
    </div>
  );
};

export default DiagnosticLayout;
