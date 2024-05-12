'use client';
import SideTopNav from '../../components/sidetopnav/sidetopnav';
import React, {useEffect} from 'react';
import {LuLayoutDashboard} from 'react-icons/lu';
import {FaRegCalendarCheck} from 'react-icons/fa6';
import {BsPersonRolodex} from 'react-icons/bs';
import { useRouter } from 'next/navigation';

const TriageLayout = ({children}) => {
  const navigate=useRouter()
  // useEffect (() => {
  //   if(localStorage.getItem("BHPFMS_Role")!=='triage')navigate.replace(`/${localStorage.getItem("BHPFMS_Role")}`)
  // }, []);

  const Links = [
    {key: 1, href: '/triage', icon: <LuLayoutDashboard />, label: 'Dashboard'},
    {
      key: 2,
      href: '/triage/patient',
      icon: <BsPersonRolodex />,
      label: 'Patient',
    },
    {
      key: 3,
      href: '/triage/appointment',
      icon: <FaRegCalendarCheck />,
      label: 'Appointment',
    },
  ];

  return (
    <div>
      <SideTopNav
        content={children}
        links={Links}
        footer={'Triage Dashboard'}
      />
    </div>
  );
};

export default TriageLayout;
