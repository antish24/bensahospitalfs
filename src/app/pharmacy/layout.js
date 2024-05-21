'use client';
import SideTopNav from '../../components/sidetopnav/sidetopnav';
import React from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import { BsPrescription } from "react-icons/bs";
import { GiMedicines } from "react-icons/gi";

const PharmacyLayout = ({children}) => {
    const Links = [
        {key: 1, href: "/pharmacy", icon: <LuLayoutDashboard />, label: "Dashboard" },
        {key: 2, href: "/pharmacy/prescription", icon: <BsPrescription />, label: "Prescription" },
        {key: 3, href: "/pharmacy/drugs", icon: <GiMedicines />, label: "Drugs" },
      ];

  return (
    <div>
      <SideTopNav content={children} links={Links} footer={"Pharmacy Dashboard"}/>
    </div>
  );
};

export default PharmacyLayout;
