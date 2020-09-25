import React, { useState } from 'react';
import { IconButton, AppBar, CssBaseline, Drawer, List, ListItem, ListItemText, Toolbar, Divider,  Hidden, Grid, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AllClasses from 'components/cards/all_cards';
import {useMetricsTracker} from 'hooks/use_metrics_tracker';

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    padding: theme.spacing(3),
    width: '100%',
  },
  listItemText: {
    fontSize: '2em',
  },
}));

const SideDrawer: React.FC<{ jumpToNthElement: (nth: number) => void }> = ({ jumpToNthElement }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const {visibleSection, setVisibleSection, timeSpentOnSections} = useMetricsTracker()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['Welcome', 'My Timeline', '2nd University Year', 'UROS', '3rd University Year', 'Team Project', 'tunety.pe', '4th University Year'].map((text, index) => (
          <React.Fragment key = {index}>
            <ListItem onClick={() => jumpToNthElement(index)} button key={text}>
              <ListItemText classes={{ primary: classes.listItemText }} primary={text} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton color='inherit' aria-label='open drawer' edge='start' onClick={handleDrawerToggle} className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Grid container justify = "center">
            <Typography variant = "h3">{visibleSection}</Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='css'>
          <Drawer
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AllClasses setVisibleSection={setVisibleSection} timeSpentOnSections = {timeSpentOnSections}/>
      </main>
    </div>
  );
};

export default SideDrawer;
