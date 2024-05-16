'use client';
import { FormatDateTime } from '@/helper/FormatDate';
import {Button, Descriptions, Table, Tag} from 'antd';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { FaEye } from 'react-icons/fa6';

const VitalsTab = ({id}) => {
  const [patinetVitals, setPatientVitals] = useState ([]);
  const [loading, setLoading] = useState (false);

  const getPatientVitals = async () => {
    setLoading (true);
    try {
      const res = await axios.get (`/api/patient/getvitals/${id}`);
      setLoading (false);
      console.log (res.data);
      setPatientVitals (res.data.vitals);
    } catch (error) {
      console.log (error);
      // openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  };
  useEffect (() => {
    getPatientVitals ();
  }, []);

  const columns = [
    {
      title: 'Symptom Severity',
      dataIndex: 'symptomSeverity',
      key: 'symptomSeverity',
      render:r=>(<Tag color={r==='High'?'red':r==='Mid'?"yellow":'green'}>{r}</Tag>),
      width:'100px'
    },
    {
      title: 'Complaint',
      dataIndex: 'complaint',
      key: 'complaint',
      width:'200px'
    },
    {
      title: 'Symptoms',
      dataIndex: 'symptoms',
      key: 'symptoms',
    },
    {
      title: 'Medical History',
      dataIndex: 'medicalHistory',
      key: 'medicalHistory',
    },
    {
      title: 'Vitals Signs',
      dataIndex: 'vitalsSigns',
      key: 'vitalsSigns',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render:r=>(<span>{FormatDateTime(r)}</span>)
    },
    {
      title: 'Action',
      width: '80px',
      fixed: 'right',
      key: 'operation',
      render: r => (
        <Button
          style={{
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          // onClick={() => navigate.replace (`users/${r.IdNo}`)}
        >
          <FaEye/>
        </Button>
      ),
    },
  ];

  return (
    <div style={{height: '500px', overflow: 'scroll'}}>
      <Button onClick={getPatientVitals} loading={loading}>Reload</Button>
      <Table
        columns={columns}
        scroll={{
          x: 1500,
        }}
        pagination={{
          defaultPageSize: 7,
          showSizeChanger: false,
        }}
        dataSource={patinetVitals}
        loading={loading}
      />
    </div>
  );
};

export default VitalsTab;
