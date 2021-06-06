import React, { useState,  forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
//import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
//import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
//import { IconContext } from 'react-icons/lib';
import USERDATA from '../../USERDATA'
import Search from './Search'
//import {handleSearch, searchText} from '../../App'
const users_data = USERDATA()

// const Nav = styled.div`
//   background: #15171c;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;



const Sidebar = forwardRef((props, ref) => {

  const [sidebar, setSidebar] = useState(true);
    //localStorage.getItem('sidebar') || true
    //sidebartoggle = !sidebartoggle

  const showSidebar = () => {
    console.log("made it here")
    setSidebar(true)
    //localStorage.setItem('sidebar', true)
  };
  const hideSidebar = () => {
    setSidebar(false)
    //localStorage.setItem('sidebar', false)
  };

  const [searchText, setSearchText] = useState(
    localStorage.getItem('searchText') || ''
  )

  useImperativeHandle(ref, () => {
    return {
      showSidebar: showSidebar
    };
  });

    const handleSearch = event => {
    //console.log(event.target.value);
    setSearchText(event.target.value);
    }

    // useEffect(()=> {
    // localStorage.setItem('searchText', searchText);
    // }, [searchText])
    // const filteredModules = modules.filter(module=> {
    //   return module.module_name.includes(searchText) || module.hyperlink.includes(searchText)
    // })

    const filterUsers = users_data.filter(user=> {
    return user.name.toLowerCase().includes(searchText.toLowerCase()) || user.email.toLowerCase().includes(searchText.toLowerCase())
    });


 



  return (
    <>
      {/*<IconContext.Provider value={{ color: '#fff' }}>*/}
      
    
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon>
              <AiIcons.AiOutlineClose onClick={hideSidebar} />
            </NavIcon>
            <Search style={{color:"white"}} value={searchText} onSearch={handleSearch} />
            {filterUsers.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      {/*</IconContext.Provider>*/}
    </>
  );
});

export default Sidebar;