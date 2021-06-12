import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as IoIcons from 'react-icons/io'
const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;
const DropdownButton = styled(Link)`
display: "flex", 
justifyContent:"space-between",
alignItems: "center"
`;
const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = (e) => {
    e.preventDefault();
    setSubnav(!subnav)
  };

  return (
    <>
      <SidebarLink 
                to={
                  {
                    pathname:"/patient",
                    state : {
                      pid : item.uid
                    }
                  }}
      >
        <div>
          {
          //item.icon
          }
          <SidebarLabel

           >{item.name}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.mods
            ? item.iconClosed
            : null}
        </div>
        <DropdownButton onClick= {
          item.mods && showSubnav
          }>
            { !subnav &&
              <IoIcons.IoIosArrowDropdown size={30} />
            }
            { subnav &&
              <IoIcons.IoIosArrowDropup size={30} />
            }
        </DropdownButton>
      </SidebarLink>
      {subnav &&
        item.mods.map((item, index) => {
          return (
            <DropdownLink to={
              {
                pathname:"/module",
                state : {
                  modId : item.id
                }
              }              } key={index}>
              <SidebarLabel>{item.name}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;