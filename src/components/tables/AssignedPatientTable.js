'use client';
import React, { useRef, useState } from 'react';
import {Badge, Button, Input, Space, Table} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FaEye } from 'react-icons/fa6';
import { useRouter } from 'next/navigation'

const AssignedPatientTable = () => {

  const [searchedColumn, setSearchedColumn] = useState('');
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
      dataIndex: 'id',
      rowScope: 'id',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Patient Info',
      fixed: 'left',
      children: [
        {
          title: 'Full Name',
          dataIndex: 'fullname',
          ...getColumnSearchProps('fullname'),
          key: 'fullname',
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
          dataIndex: 'dateofBirth',
          key: 'dateofBirth',
        },
      ],
    },
    {
        title: 'Vitals Info',
        children: [
          {
            title: 'Complaint',
            dataIndex: 'complaint',
            key: 'complaint',
          },
          {
            title: 'Priorty',
            dataIndex: 'priorty',
            key: 'priorty',
          },
          {
            title: 'Severity',
            dataIndex: 'severity',
            key: 'severity',
          },
        ],
      },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
     title: 'Action',
     width:'80px',
     fixed: 'right',
     key: 'operation',
     render: (r) => <Button style={{border:'none',display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>navigate.replace(`patient/${r.id}`)}><FaEye/></Button>,
    },
  ];

  const data = [];
  for (let i = 0; i < 17; ++i) {
    data.push ({
      key: i.toString (),
      id: `FT0${i}4892`,
      fullname: 'firstname middelname lastname',
      sex: 'Male',
      dateofBirth: '02/07/1984',
      complaint: '910010890',
      severity: 'mid',
      priorty: 2,
      createdAt: '2014-12-24 23:12:00',
    });
  }

  return (
    <Table
      columns={columns}
      scroll={{
        x: 1000,
      }}
      pagination={{
        defaultPageSize: 7,
        showSizeChanger: false 
      }}
      dataSource={data}
    />
  );
};
export default AssignedPatientTable;
