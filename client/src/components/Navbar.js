import React from 'react'
import { NavLink } from 'react-router'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'


const Navbar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            SHOPPING CART - LOGO
          </Typography>
        </Toolbar>
      </AppBar>
    </>

  )
}

export default Navbar
