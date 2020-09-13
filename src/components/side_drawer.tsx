import React from 'react';
import { List, ListItem, ListItemText, Divider, Drawer } from '@material-ui/core';
import 'components/side_drawer.css'

const SideDrawer: React.FC = () => {
  return (
    <Drawer variant = 'persistent' open = {true}>
      <Divider />
        <List>
          {['Welcome'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      <Divider />
    </Drawer>
  );
};
export default SideDrawer;
