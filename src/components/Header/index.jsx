import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import InputBox from 'components/InputBox';
import { ThemeContext } from 'context/themeContext';
import useStyles from './style';

const Header = ({ handleChange }) => {
  const classes = useStyles();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);

  return (
    <div>
      <AppBar position='static' classes={{ root: classes.appBarRoot }}>
        <Toolbar
          classes={{
            root: classes.toolBarRoot,
            gutters: classes.toolBarGutters,
          }}
          elevation={3}
        >
          <div className={classes.primaryHeaderBar}>
            <div className={classes.logoBar}>
              <Link to='/'>
                <img
                  src='https://image.flaticon.com/icons/svg/2965/2965279.svg'
                  alt='logo'
                  style={{ width: '3rem', marginRight: '20px' }}
                />
              </Link>

              <InputBox
                name='item'
                placeholder='What do you want to eat ?'
                handleChange={handleChange}
              />
              <InputBox
                name='place'
                placeholder='Where do you want to eat ?'
                handleChange={handleChange}
              />
            </div>

            <div className={classes.profileMenuBar}>
              <Button
                color='inherit'
                className={classes.buttonRoot}
                onClick={() => {
                  setDarkMode((prev) => !prev);
                  localStorage.setItem('darkMode', !darkMode);
                }}
              >
                Switch Theme
              </Button>

              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={(evt) => setProfileMenuAnchorEl(evt.currentTarget)}
                classes={{ root: classes.iconButtonRoot }}
                className={profileMenuAnchorEl ? 'active' : ''}
                disableFocusRipple
                disableRipple
              >
                <Avatar
                  alt='header-profile-picture'
                  className={classes.smallAvatar}
                />
              </IconButton>
              <Menu
                id='simple-menu'
                anchorEl={profileMenuAnchorEl}
                keepMounted
                open={Boolean(profileMenuAnchorEl)}
                onClose={() => setProfileMenuAnchorEl(null)}
                classes={{ paper: classes.profileMenuPaper }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem
                  onClick={() => {
                    setProfileMenuAnchorEl(null);
                  }}
                  classes={{
                    root: classes.menuItemRoot,
                  }}
                  className='first-menu-item'
                  disableRipple
                >
                  <div>
                    <Avatar
                      alt='header-profile-picture'
                      className={classes.largeAvatar}
                    />
                  </div>
                  <div className={classes.menuDetailItem}>
                    <div>Bishal</div>
                    <div>See your profile</div>
                  </div>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setDarkMode((prev) => !prev);
                    localStorage.setItem('darkMode', !darkMode);
                  }}
                  classes={{
                    root: classes.menuItemRoot,
                  }}
                  disableRipple
                >
                  <div className={classes.menuItemLeft}>
                    <Brightness4Icon />
                    <Typography>Switch Theme</Typography>
                  </div>
                  <div></div>
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.menuItemRoot,
                  }}
                  disableRipple
                >
                  <div className={classes.menuItemLeft}>
                    <ExitToAppIcon />
                    <Typography>Logout</Typography>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default withRouter(Header);
