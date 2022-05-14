import { AppBar, Badge, Button, IconButton, MenuItem, Toolbar } from '@material-ui/core'
import React from 'react'
import './Header.css'
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from 'react-router-dom';

const Header = ({isAdmin}) => {
  const history = useHistory();
  return (
    <header>
      <AppBar>
        <Toolbar>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
            IIT Ropar Entry-Exit Portal
            {/* {isAdmin && <Button variant='contained' color="secondary" onClick={()=>{
                // setIsOpen(true);
                // setField('email');
            }}>Notifications</Button>} */}
            {isAdmin && 
            <Button variant='contained' color="action" onClick={()=>{
              history.push('/admin/notify');
          }}><Badge badgeContent={4} color="primary">
          <MailIcon color="secondary" />
        </Badge></Button>
            
            }
          </div>
        </Toolbar>
        
      </AppBar>
    </header>
  )
}

export default Header