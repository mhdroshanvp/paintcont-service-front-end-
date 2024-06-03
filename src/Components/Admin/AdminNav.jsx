import React from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  DocumentTextIcon, // Import the post icon
} from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';

function AdminNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const User = () => {
    navigate('/admin/user');
  };

  const Painter = () => {
    navigate('/admin/painter');
  };

  const posts = () => {
    navigate('/admin/posts')
  }

  return (
    <Card className="h-[calc(110vh-2rem)] w-full max-w-[14rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-custom-color">
      <div className="mb-2 p-4">
        <Typography className="text-3xl" variant="h5" color="blue-gray">
          Paintcont
        </Typography>
      </div>
      <List>
        <ListItem className="m-1">
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem onClick={User} className="m-2">
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          Users
        </ListItem>
        <ListItem onClick={Painter} className="m-2">
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Painters
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem className="m-2">
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Hashtags
        </ListItem>
        <ListItem onClick={posts} className="m-2">
          <ListItemPrefix>
            <DocumentTextIcon className="h-5 w-5" /> {/* Added post icon */}
          </ListItemPrefix>
          Posts
        </ListItem>
        <ListItem className="m-2" onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}

export default AdminNav;
