'use client';
import NewUserForm from '@/components/forms/NewUserForm';
import ModalForm from '@/components/modal/Modal';
import UserTable from '@/components/tables/UserTable';
import {Button} from 'antd';
import React, {useState} from 'react';

const Users = () => {

  const [modalOpen, setModalOpen] = useState (false);
  return (
    <div>
      <div style={{height: '50px'}}>
        <Button type="primary" onClick={() => setModalOpen (true)}>
          Add New User
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen (false)}
          title={'New User Form'}
          content={<NewUserForm openModalFun={(e) => setModalOpen (e)}/>}
        />
      </div>
      <UserTable />
    </div>
  );
};

export default Users;
