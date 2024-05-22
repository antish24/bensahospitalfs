import { FormatDateTime } from '@/helper/FormatDate'
import { Collapse, Tag } from 'antd'
import React from 'react'

const PrescriptionInfo = ({data}) => {

  const items = data.medications.map(med => ({
    key: med.name,
    label: med.name,
    children: <div>{med.dosage},{med.instruction}</div>,
  }))

  return (
    <div>
        <div style={{display:'flex',justifyContent:'flex-end'}}><span style={{fontWeight:'bold'}}>Date : </span><span style={{marginLeft:'5px'}}>{FormatDateTime(data.createdAt)}</span></div>
        <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'10px'}}><span style={{fontWeight:'bold'}}>Status : </span><Tag style={{marginLeft:'5px'}} color={data.status==='Completed'?'green':data.status==='Pending'?'yellow':'red'}>status</Tag></div>
        <Collapse items={items} bordered={false} defaultActiveKey={['1']} />
        <div style={{display:'flex',justifyContent:'flex-end'}}><span style={{fontWeight:'bold'}}>Prescribed by </span> : {data.physicianId}</div>
        <div style={{display:'flex',justifyContent:'flex-end'}}>Updated At : {data.updateAt}</div>
    </div>
  )
}

export default PrescriptionInfo