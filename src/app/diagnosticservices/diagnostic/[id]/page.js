'use client';
import NewDiagnosticResultForm from '@/components/forms/NewDiagnosticResult';
import ModalForm from '@/components/modal/Modal';
import {Button, Tabs} from 'antd';
import {useParams} from 'next/navigation';
import React, {useState} from 'react';

const RequestDetail = () => {
  const [openModal, setOpenModal] = useState (false);
  const [modalContent, setModalContent] = useState ();
  const [modalContentTitle, setModalContentTitle] = useState ('');
  const {id} = useParams ();

  const items = [
    {
      key: '5',
      label: 'Lab and test results',
      children: 'Content of Tab Pane 5',
    },
    {
      key: '6',
      label: 'Patient Log',
      children: 'Content of Tab Pane 6',
    },
  ];

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <ModalForm
        open={openModal}
        close={() => setOpenModal (false)}
        title={modalContentTitle}
        content={modalContent}
      />
      <div style={{width: '30%', background: 'red', height: '100px'}} />
      <div style={{width: '68%'}}>
        <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
          <Button
            onClick={() => {
              setModalContentTitle ('Appointment');
              setOpenModal (true);
              setModalContent (<NewDiagnosticResultForm id={id} />);
            }}
          >
            Results
          </Button>
          <Button
            onClick={() => {
              setModalContentTitle ('Appointment');
              setOpenModal (true);
              setModalContent (<NewDiagnosticResultForm id={id} />);
            }}
          >
            Status
          </Button>
        </div>
        <Tabs
          defaultActiveKey="1"
          items={items}
          indicator={{
            size: origin => origin - 20,
          }}
        />
      </div>
    </div>
  );
};

export default RequestDetail;
