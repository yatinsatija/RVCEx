import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';

import './header.styles.scss'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    height: "0px",
    // backgroundColor: "black"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  }
}));

function Header(props) {
  const classes = useStyles();

  const handleSignOut = () => {
    auth.signOut();
    localStorage.removeItem("currentUserEmail");
    props.history.push("/signin")

  }

  const handleGoToGlobalChat = () => {
    auth.signOut();
    localStorage.removeItem("currentUserEmail");
    props.history.push("/chat")

  }
  const { currentUser } = props;
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            RVCEx
          </Typography>
          <div style={{ right: "10%", position: "absolute", color: "White", cursor: "pointer" }}
            onClick={handleGoToGlobalChat}>GLOBAL CHAT</div>
          {
            currentUser ?
            <>
            <Link to='/dashboard' style={{ right: "17%", position: "absolute",cursor: "pointer", padding: "10px",color:"white" }}>DASHBOARD</Link>
            <Link to='/myitems' style={{ right: "25%", position: "absolute",cursor: "pointer", padding: "10px",color:"white" }}>MY ITEMS</Link>
            </>
            :<></>
          }
          <div style={{ right: "10px", position: "absolute" }}>
            {
              currentUser ?
                <div onClick={handleSignOut} style={{ cursor: "pointer", padding: "10px", color: "white" }}>SIGN OUT</div> :
                <Link to='/signin' style={{ cursor: "pointer", padding: "10px",color: "white" }}>SIGN IN</Link>
            }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);