import React, {useRef} from 'react'
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as MdIcons from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import Sidebar from '../Sidebar/Sidebar'
import Firebase from '../Firebase'

const Navbar = styled.div`
  background: #15171c;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavLeftIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  `;

  const NavIcon = styled(Link)`
    margin-right: 2rem;
`;
  const NavRightIcons = styled(Link)`
  margin-left: auto;
  margin-right: 0rem;
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
        <NavLeftIcon to='#'>
                <FaIcons.FaBars onClick={showSidebar} />
                
        </NavLeftIcon>
        <NavRightIcons>
            <NavIcon to='/dashboard'>
                <MdIcons.MdDashboard />
            </NavIcon>
            <NavIcon to='/add_patient'>
                <MdIcons.MdPersonAdd />
            </NavIcon>
            <NavIcon onClick={()=> {Firebase.auth().signOut()}}>
                <FiIcons.FiLogOut />
            </NavIcon>
            <NavIcon to='/profile'>
                <FaIcons.FaUserCircle />
            </NavIcon>
        </NavRightIcons>
    </Navbar>
    <Sidebar ref={ref} />
    </IconContext.Provider>   
    </> 
);
};
export {Add_nav_object}
export default Nav;