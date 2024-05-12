'use client';
import React, { useRef, useState } from 'react';
import {Button, Input, Space, Table} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FaUpDown } from 'react-icons/fa6';
import { useRouter } from 'next/navigation'

const AssignedAppointmentTable = () => {

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
      width:'100px',
      ...getColumnSearchProps('id'),
    },
        {
          title: 'Full Name',
          dataIndex: 'fullname',
          ...getColumnSearchProps('fullname'),
          key: 'fullname',
          width:"300px"
        },
    {
      title: 'Appointment Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      width:'100px',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
     title: 'Action',
     width:'80px',
     fixed: 'right',
     key: 'operation',
     render: (r) => <Button style={{border:'none',display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>navigate.replace(`patient/${r.id}`)}><FaUpDown/></Button>,
    },
  ];

  const data = [];
  for (let i = 0; i < 17; ++i) {
    data.push ({
      key: i.toString (),
      id: `FT0${i}4892`,
      fullname: 'firstname middelname lastname',
      createdAt: '20/08/24',
      priority: '2',
      description: 'Teeth check up',
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
export default AssignedAppointmentTable;
