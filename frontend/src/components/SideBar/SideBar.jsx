import { Sidebar } from 'flowbite-react';
import React, { useState } from 'react';
import "./SideBar.css";
import { FaInbox, FaUser, FaProductHunt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import Signup from '../Signup/Signup';
import { useNavigate } from 'react-router-dom';


function SideBar() {
  const navigate = useNavigate();
  const [openModal,setOpenModal]=useState(undefined);
  const toggleModal=(formType)=>{
    setOpenModal(formType);
  }
  return (
    <>
    <Sidebar aria-label="Sidebar with logo branding example">
      <Sidebar.Logo href="#" img="/favicon.svg" imgAlt="Flowbite logo">
        <p>Flowbite</p>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={FaInbox}>
            <p>Dashboard</p>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaUser}>
            <p>Kanban</p>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaInbox}>
            <p>Inbox</p>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaUser}>
            <p>Users</p>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaProductHunt}>
            <p>Products</p>
          </Sidebar.Item>
          <Sidebar.Item icon={FaSignInAlt} onClick={()=>navigate('/login')}>
              <p>Login</p>  
          </Sidebar.Item>
          <Sidebar.Item icon={FaUserPlus} onClick={()=>navigate('/register')}>
            <p>Signup</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </>
  )
}

export default SideBar