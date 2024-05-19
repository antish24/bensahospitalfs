'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {Badge, Button, Input, Space, Table} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FaEye } from 'react-icons/fa6';
import { useRouter } from 'next/navigation'
import { FormatDateTime } from '@/helper/FormatDate';
import { AlertContext } from '@/context/AlertContext';
import axios from 'axios';

const AssignedPatientTable = () => {

  const [searchedColumn, setSearchedColumn] = useState('');
  const {openNotification} = useContext (AlertContext);
  const navigate=useRouter()
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        searchText
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: '',
      dataIndex: 'key',
      fixed: 'left',
      rowScope: 'row',
      width:'50px'
    },
    {
      title: 'ID No',
      fixed: 'left',
      dataIndex: 'IdNo',
      rowScope: 'IdNo',
      ...getColumnSearchProps('IdNo'),
    },
    {
      title: 'Patient Info',
      fixed: 'left',
      children: [
        {
          title: 'Full Name',
          dataIndex: 'fullName',
          ...getColumnSearchProps('fullName'),
          key: 'fullName',
          width:"300px"
        },
        {
          title: 'Sex',
          dataIndex: 'sex',
          key: 'sex',
          width:'100px'
        },
        {
          title: 'Date Of Birth',
          dataIndex: 'dateOfBirth',
          key: 'dateOfBirth',
      render:r=>(<span>{FormatDateTime(r)}</span>)
        },
      ],
    },
    {
      title: 'Priorty',
      dataIndex: 'priorty',
      key: 'priorty',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render:r=>(<span>{FormatDateTime(r)}</span>)

    },
    {
     title: 'Action',
     width:'80px',
     fixed: 'right',
     key: 'operation',
     render: (r) => <Button style={{border:'none',display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>navigate.replace(`patient/${r.IdNo}`)}><FaEye/></Button>,
    },
  ];

  const [patientData,setPatientData]=useState([])
  const [loading,setLoading]=useState(false)

  const getAssignedPatientsData=async()=>{
    setLoading(true)
    try {
      const res = await axios.get (`/api/patient/assigned/${localStorage.getItem ('BHPFMS_IdNo')}`);
      setLoading (false);
      console.log(res.data.patients)
      setPatientData(res.data.patients)
    } catch (error) {
      setLoading (false);
      openNotification('error', error.response.data.message, 3, 'red');
    }
  }

  useEffect(()=>{
    getAssignedPatientsData()
  },[])

  return (
    <Table
      size='small'
      columns={columns}
      scroll={{
        x: 1000,
      }}
      loading={loading}
      pagination={{
        defaultPageSize: 7,
        showSizeChanger: false 
      }}
      dataSource={patientData}
    />
  );
};
export default AssignedPatientTable;
