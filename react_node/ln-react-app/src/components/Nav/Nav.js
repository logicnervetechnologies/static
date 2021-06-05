import React, { useState, useRef} from 'react'
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import Sidebar from '../Sidebar/Sidebar'

const Navbar = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;


var nav_objects = [];

const Add_nav_object = (object) => {
    nav_objects.push(object)
    console.log("object Added")
}


const Nav = () => {

    // const [sidebar, setSidebar] = useState(
    //     localStorage.getItem('sidebar') || true
    //   );
    // const showSidebar = () => setSidebar(
    //     localStorage.setItem('sidebar', true)
    //   );


    const ref = useRef(null);
    const showSidebar = () => {
        ref.current.showSidebar();
        console.log('tryign to sho')
    };

return (
    <>
    <IconContext.Provider value={{ color: '#fff' }}>
    <Navbar>
        <NavIcon to='#'>
                <FaIcons.FaBars onClick={showSidebar} />
                
            </NavIcon>
    </Navbar>
    <Sidebar ref={ref} />
    </IconContext.Provider>   
    </> 
);
};
export {Add_nav_object}
export default Nav;