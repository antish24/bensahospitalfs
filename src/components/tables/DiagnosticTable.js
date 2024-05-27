'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {Button, Input, Space, Table, Tag} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FaEye } from 'react-icons/fa6';
import { useRouter } from 'next/navigation'
import { FormatDateTime } from '@/helper/FormatDate';
import axios from 'axios';
import { AlertContext } from '@/context/AlertContext';
import { LuClipboardList } from "react-icons/lu";
import ModalForm from '../modal/Modal';
import DiagnosticReqInfo from '../description/DiagnosticReqInfo';
import { GrDocumentTest } from "react-icons/gr";
import NewDiagnosticResultForm from '../forms/NewDiagnosticResult';

const DiagonsticTable = () => {

  const [searchedColumn, setSearchedColumn] = useState('');
  const navigate=useRouter()
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [modalContentTitle, setModalContentTitle] = useState('');

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
      title: 'ID No',
      fixed: 'left',
      dataIndex: 'id',
      width:'100px',
      ...getColumnSearchProps('id'),
    },
        {
          title: 'Full Name',
          dataIndex: 'fullName',
          ...getColumnSearchProps('fullName'),
          key: 'fullName',
          width:"300px"
        },
        {
          title: 'Priority',
          dataIndex: 'priority',
          key: 'priority',
          render:r=>(<Tag color={r==="High"?'red':r==='Mid'?'orange':'green'}>{r}</Tag>)

        },
    {
      title: 'Test',
      dataIndex: 'test',
      key: 'test',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render:r=>(<span>{FormatDateTime(r)}</span>)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render:r=>(<Tag color={r==='Pending'?'yellow':r==='Completed'?"green":'red'}>{r}</Tag>),
     fixed: 'right',
     width:'100px',
    },
    {
     title: 'Action',
     fixed: 'right',
     key: 'operation',
     render: (r) => <div 
     style={{display:'flex',alignItems:'center',gap:'10px'}} 
     ><Button 
     style={{border:'none',display:'flex',alignItems:'center',justifyContent:'center'}} 
     onClick={()=>navigate.push(`diagnostic/${r.id}${r._id}`)}><FaEye/></Button>
     <Button 
     style={{border:'none',display:'flex',alignItems:'center',justifyContent:'center'}} 
      onClick={() =>{setModalContentTitle('Diagnostic Request');setOpenModal (true);setModalContent(<DiagnosticReqInfo data={r}/>)}}
     ><LuClipboardList/></Button>
     {r.status!=='Completed'&&
      <Button 
      style={{border:'none',display:'flex',alignItems:'center',justifyContent:'center'}} 
      onClick={() =>{setModalContentTitle('Diagnostic Results');setOpenModal (true);setModalContent(<NewDiagnosticResultForm id={r.id} requestId={r._id}/>)}}
      >
       <GrDocumentTest/>
      </Button>
     }
     </div>
    },
  ];

 

  const [diagnosticData,setDiagnosticData]=useState([])
  const [loading,setLoading]=useState(false)
  const {openNotification} = useContext (AlertContext);

  const getDiagnosticData=async()=>{
    setLoading(true)
    try {
      const res = await axios.get (`/api/diagnostic/get`);
      setLoading (false);
      console.log(res.data)
      setDiagnosticData(res.data.diagnostics)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  }

  useEffect(()=>{
    getDiagnosticData()
  },[])

  return (
    <div>
      <ModalForm
      open={openModal}
      close={() => setOpenModal (false)}
      title={modalContentTitle}
      content={modalContent}
    />
      <Button style={{marginBottom:'5px'}} loading={loading} disabled={loading} onClick={getDiagnosticData}>Reload</Button>
      <Table
      size='small'
      columns={columns}
      loading={loading}
      pagination={{
        defaultPageSize: 7,
        showSizeChanger: false 
      }}
      dataSource={diagnosticData}
    />
    </div>
  );
};
export default DiagonsticTable;
