'use client'
import DashboardCard from '@/components/card/DashboardCard';
import LineChart from '@/components/charts/LineChart';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { FaCalendarCheck, FaList, FaUser} from 'react-icons/fa6';
import {GiCaldera, GiCalendar, GiPerson, GiTestTubes} from "react-icons/gi";

const Dashboard = () => {
  const [todayData,setTodayData]=useState([])
  const [totalData,setTotalData]=useState([])
  const [loading,setLoading]=useState(false)

  const getTodaysData=async()=>{
    setLoading(true)
    try {
      const res = await axios.get (`/api/physician/todaydata/${localStorage.getItem ('BHPFMS_IdNo')}`);
      setLoading (false);
      setTodayData(res.data.results)
    } catch (error) {
      setLoading (false);
    }
  }

  const getTotalData=async()=>{
    setLoading(true)
    try {
      const res = await axios.get (`/api/physician/totaldata/${localStorage.getItem ('BHPFMS_IdNo')}`);
      setLoading (false);
      setTotalData(res.data.results)
    } catch (error) {
      setLoading (false);
    }
  }

  useEffect(()=>{
    getTodaysData()
    getTotalData()
  },[])


  const todaysData = useMemo(() => {

    // Generate labels for 10 days
    const labels = [];
    for(let i=0; i<10; i++) {
      labels.push(i);
    }

    // Generate random data values
    const data = [];  
    for(let i=0; i<10; i++) {
      data.push(Math.floor(Math.random() * 10) + 1);
    }

    return {
      labels,
      datasets: [
        {
          label: "Appointment",
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',  
          borderWidth: 2
        }
      ]
    }

  }, [])

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap'}}>
      <DashboardCard title={"Today Appointment"} icon={<FaCalendarCheck color='green' size={30}/>} c={todayData.CAppointments} p={todayData.PAppointments}/>
      <DashboardCard title={"Today Patients"} icon={<FaUser color='rgb(0,140,255)' size={30}/>} c={todayData.CPatient} p={todayData.PPatient}/>
      <DashboardCard title={"Today Diagnostic"} icon={<GiTestTubes color='brown' size={30}/>} c={todayData.CRequest} p={todayData.PRequest}/>
      
      <DashboardCard title={"Total Appointments"} icon={<GiCalendar color='green' size={30}/>} c={totalData.CAppointments} p={totalData.PAppointments}/>
      <DashboardCard title={"Total Patients"} icon={<GiPerson color='rgb(0,140,255)' size={30}/>} c={totalData.CPatient} p={totalData.PPatient}/>
      <DashboardCard title={"Total Diagnostic"} icon={<GiTestTubes color='brown' size={30}/>} c={totalData.CRequest} p={totalData.PRequest}/>
      <div style={{width:'48%',marginTop:'30px'}}><LineChart lineData={todaysData}/></div>
      <div style={{width:'48%',marginTop:'30px'}}><LineChart lineData={todaysData}/></div>
    </div>
  );
};

export default Dashboard;
