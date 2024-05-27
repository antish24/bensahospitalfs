'use client';
import React, {useEffect, useState} from 'react';
import {
  Layout,
  theme,
  Dropdown,
  Button,
  Input,
  Badge,
  Breadcrumb,
  Tabs,
  Tooltip,
} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
import logo from '../../../public/imgs/logo.jpg';
import { BiMessageDetail } from "react-icons/bi";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { SlSizeFullscreen } from "react-icons/sl";
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {IoNotificationsCircle, IoSettingsOutline} from 'react-icons/io5';
import ModalForm from '../modal/Modal';
import ProfileForm from '../forms/ProfileForm';
import ChangePasswordForm from '../forms/ChangePasswordForm';
import axios from 'axios';
import {FaAngleRight} from 'react-icons/fa6';
import NewMsgForm from '../forms/NewMsgForm';
import InboxMsg from '../tabs/InboxMsg';
import SentMsg from '../tabs/SentMsg';
import AlertTab from '../tabs/AlertTab';

const SideTopNav = ({content, links, footer}) => {
  const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken ();
  const pathName = usePathname ();
  const [openValue, setOpenValue] = useState (false);
  const [openTitle, setTitle] = useState (false);
  const [openContent, setOpenContent] = useState ();
  const [hoverLink, setHoverLink] = useState ();

  const [userName, setUserName] = useState ('');
  const [loading, setLoading] = useState (false);
  const [loadingUnread, setLoadingUnread] = useState (false);
  const [unreadCount, setUnreadCount] = useState ();
  const [fetchData, setFetchData] = useState (false);

  const paths = pathName.split ('/').filter (path => path);

  const getuserData = async () => {
    setLoading (true);
    try {
      const res = await axios.get (
        `/api/auth/detail/${localStorage.getItem ('BHPFMS_IdNo')}`
      );
      setLoading (false);
      setUserName (res.data.user.fullName);
    } catch (error) {
      setLoading (false);
      console.log (error);
    }
  };

  const getUnreadMsg = async () => {
    setLoadingUnread (true);
    try {
      const res = await axios.get (
        `/api/sms/unread/${localStorage.getItem ('BHPFMS_IdNo')}`
      );
      setLoadingUnread (false);
      setUnreadCount (res.data.unreads);
    } catch (error) {
      setLoadingUnread (false);
      console.log (error);
    }
  };

  useEffect (() => {
    getuserData ();
    getUnreadMsg()
  }, []);

  const tabs = [
    {
      key: '2',
      label: 'Alert',
      children: <AlertTab/>,
    },
    {
      key: '1',
      label: 'Inbox',
      children: <InboxMsg  unReads={getUnreadMsg} fecth={fetchData}/>,
    },
    {
      key: '3',
      label: 'Sent',
      children: <SentMsg fecth={fetchData}/>,
    },
  ];

  const items = [
    {
      key: '1',
      label: (
        <pre
          onClick={() => {
            setOpenValue (true);
            setOpenContent (<ProfileForm />);
            setTitle ('Profile');
          }}
        >
          Profile{' '}
        </pre>
      ),
    },
    {
      key: '2',
      label: (
        <span
          onClick={() => {
            setOpenValue (true);
            setOpenContent (<ChangePasswordForm />);
            setTitle ('Change Password');
          }}
        >
          Change Password
        </span>
      ),
    },
    {
      key: '3',
      label: (
        <Link
          href={'/'}
          onClick={() => {
            localStorage.setItem ('BHPFMS_Token', '');
            localStorage.setItem ('BHPFMS_Role', '');
          }}
        >
          logout
        </Link>
      ),
    },
  ];

  const itemss = [
    {
      key: '4',
      label: (
        <Tabs defaultActiveKey="1" items={tabs} style={{width: '350px',height:'450px'}} onChange={()=>setFetchData(c=>!c)}/>
      ),
    },
  ];
  const [visible, setVisible] = useState(false);
  const [makeFullScreen, setMakeFullScreen] = useState(false);


  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      launchFullscreen(document.documentElement);
    } else {
      exitFullscreen();
    }

    setMakeFullScreen(prev => !prev);
  }

  // Fullscreen API
  function launchFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen(); 
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } 
  }

  return (
    <Layout style={{height: '100vh'}}>
      <ModalForm
        open={openValue}
        close={() => setOpenValue (false)}
        content={openContent}
        title={openTitle}
        func={() => setOpenValue (c => !c)}
      />
      <Sider
        breakpoint='xxl'
        collapsedWidth="0"
      >
        <div
          style={{
            width: '100%',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Image
            src={logo}
            width={50}
            style={{borderRadius: '50%'}}
            height={50}
            alt="user"
          />
          <span style={{color: 'white', fontWeight: 'bold'}}>
            {loading ? 'loading' : userName}
          </span>
        </div>
        <div
          style={{
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {links.map (d => (
            <Link
              onMouseEnter={() => setHoverLink (d.href)}
              style={{
                color: pathName === d.href ||
                  hoverLink === d.href ||
                  pathName.startsWith (d.href)
                  ? 'white'
                  : 'rgb(200,200,200)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                width: '90%',
                height: '35px',
                background: pathName === d.href ? 'rgb(0,140,255)' : 'none',
                padding: '0 10px',
                borderRadius: '5px',
              }}
              href={d.href}
              key={d.key}
            >
              {d.icon} {d.label}
            </Link>
          ))}
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 16px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <div>
            <Breadcrumb separator={<FaAngleRight />}>
              {paths.map ((path, index) => {
                const url = '/' + paths.slice (0, index + 1).join ('/');
                return (
                  <Breadcrumb.Item key={path}>
                    <Link href={url}>{path.toLocaleUpperCase ()}</Link>
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
          <Tooltip title='Write Message'>
          <BiMessageDetail onClick={() => {
            setOpenValue (true);
            setOpenContent (<NewMsgForm openModalFun={(e)=>setOpenValue(e)}/>);
            setTitle ('Message');
          }} size={25} cursor={'pointer'} />
          </Tooltip>
          <Dropdown 
          visible={visible}
          onVisibleChange={v=>setVisible(v)}
              menu={{
                items: itemss,onClick:()=>setVisible(true)
              }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Badge size="small" count={unreadCount}>
                <IoNotificationsCircle size={26} cursor={'pointer'} />
              </Badge>
            </Dropdown>
            <Dropdown
              menu={{
                items: items,
              }}
              placement="bottomRight"
              trigger={['click']}
            >
              <IoSettingsOutline size={22} cursor={'pointer'} />
            </Dropdown>
            <Button style={{display:'flex',alignItems:'center'}} onClick={toggleFullscreen}>{makeFullScreen?<AiOutlineFullscreenExit/>:<SlSizeFullscreen/>}</Button>
          </div>
        </Header>
        <Content
          style={{
            overflow: 'scroll',
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
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {footer}
          {' '}
          ©
          {new Date ().getFullYear ()}
          {' '}
          by
          {' '}
          <Link href={'https://www.t.me/idofc'}> Group 4</Link>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default SideTopNav;
