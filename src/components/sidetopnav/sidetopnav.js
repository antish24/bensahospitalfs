import React, { useState } from 'react';
import { Layout, theme, Dropdown, Button, Input} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import logo from '../../../public/imgs/logo.jpg'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {IoSettingsOutline} from 'react-icons/io5'
import ModalForm from '../modal/Modal';

const SideTopNav = ({content,links,footer}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathName = usePathname();
  const [openValue, setOpenValue] = useState(false);
  const [hoverLink,setHoverLink]=useState()

  const items = [
    {
      key: '1',
      label: (
        <Button onClick={()=>setOpenValue(true)}>Profile</Button>
      ),
    },
    {
      key: '2',
      label: (
        <Link href={'/'}>Change Password</Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link href={'/'}>logout</Link>
      ),
    },
  ];

  const profileForm=()=>{
    return(
      <div>
        <Input value={'full name'}/>
        <Input placeholder='mmm' value={'full name'}/>
        <Input value={'full name'}/>
        <Input value={'full name'}/>
        <Input value={'full name'}/>
        <Input value={'full name'}/>
        <Input value={'full name'}/>
        <Input value={'full name'}/>
        <Input value={'full name'}/>
      </div>
    )
  }
  return (
    <Layout style={{height:'100vh'}}>
      <ModalForm open={openValue} setOpen={()=>setOpenValue(c=>!c)} content={profileForm} title={'Profile'} func={()=>setOpenValue(c=>!c)}/>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div style={{width:'100%',height:'100px',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'10px'}}>
        <Image src={logo} width={50} style={{borderRadius:'50%'}} height={50} alt='user'/>
        <span style={{color:'white',fontWeight:'bold'}}>Dr Abebe Balcha</span>
        </div>
        <div style={{flexDirection:'column',display:'flex',alignItems:'center',gap:'10px'}}>
        {links.map((d)=><Link onMouseEnter={()=>setHoverLink(d.href)} style={{color:pathName===d.href||hoverLink===d.href?"white":'rgb(200,200,200)',display:'flex',alignItems:'center',gap:'5px',width:'90%',height:'35px',background:pathName===d.href?'rgb(0,140,255)':'none',padding:'0 10px',borderRadius:'5px'}} href={d.href} key={d.key}>{d.icon} {d.label}</Link>)}
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding:'0 16px',
            background: colorBgContainer,
            display:'flex',
            alignItems:'center',
            justifyContent:'flex-end'
            ,gap:'20px'
          }}
        >
          <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
        trigger={['click']}
      >
      <IoSettingsOutline size={20} cursor={'pointer'}/>
      </Dropdown>
        </Header>
        <Content
          style={{
            margin: '16px 8px 0',
          }}
        >
          <div
            style={{
              padding: 16,
              minHeight: '100%',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {content}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
         {footer} ©{new Date().getFullYear()} by <Link href={'https://www.t.me/idofc'}>@idofc</Link>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default SideTopNav;