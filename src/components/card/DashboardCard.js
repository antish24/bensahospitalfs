import React from 'react'

const DashboardCard = ({c,p,title,icon}) => {
  return (
    <div
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
            {icon}
          </div>
          <div style={{display: 'flex', flexDirection: 'column',gap:'5px'}}>
            <span>Pending : {p}</span>
            <span>Completed : {c}</span>
          </div>
        </div>
        <div style={{display:"flex",alignItems:'center',height:'40%',fontWeight:'bold',paddingLeft:'10px',fontSize:'16px'}}>{title}</div>
      </div>
  )
}

export default DashboardCard