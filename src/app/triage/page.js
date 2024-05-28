'use client'
import LineChart from '@/components/charts/LineChart';
import React, { useMemo, useState } from 'react';
import {FaCalendar} from 'react-icons/fa6';

const Dashboard = () => {
  const [todayData,setTodayData]=useState([{id:1},{id:2},{id:1},{id:2},{id:1},{id:2}])

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
          label: "Patient",
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
     { todayData.map(()=>(<div
        style={{
          width: '200px',
          height: '100px',
          boxShadow: '0 0 1px rgb(170,170,170)',
          borderRadius: '10px',
        }}
      >
        <div style={{display:'flex',gap:'20px',alignItems:'center',height:'60%'}}>
          <div
            style={{
              display: 'flex',
              marginLeft:'20px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FaCalendar color='green' size={30}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column',gap:'5px'}}>
            <span>Pending : 5</span>
            <span>Completed : 5</span>
          </div>
        </div>
        <div style={{display:"flex",alignItems:'center',height:'40%',fontWeight:'bold',paddingLeft:'10px',fontSize:'16px'}}>Today Appointment</div>
      </div>))}

      <div style={{width:'48%',marginTop:'30px'}}><LineChart lineData={todaysData}/></div>
      <div style={{width:'48%',marginTop:'30px'}}><LineChart lineData={todaysData}/></div>
    </div>
  );
};

export default Dashboard;
