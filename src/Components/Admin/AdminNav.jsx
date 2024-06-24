import React, { useState } from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  IconButton,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  DocumentTextIcon,
  Bars3Icon, // Use Bars3Icon for menu toggle
  XMarkIcon // Use XMarkIcon for close toggle
} from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';

function AdminNav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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
    navigate('/admin/posts');
  };

  const dashboard = () => {
    navigate('/admin/dashboard');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative h-screen">
      <div className="flex items-center justify-between p-4 bg-custom-color lg:hidden">
        <Typography className="text-3xl " variant="h5" color="blue-gray">
          Paintcont
        </Typography>
        <IconButton onClick={toggleMenu}>
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </IconButton>
      </div>
      <Card className={`absolute lg:relative h-full w-full lg:w-64 p-4 shadow-xl shadow-blue-gray-900/5 bg-custom-color transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="mb-2 p-4 hidden lg:block">
          <Typography className="text-3xl" variant="h5" color="blue-gray">
            Paintcont
          </Typography>
        </div>
        <List>
          <ListItem onClick={dashboard} className="m-1">
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
          <ListItem onClick={posts} className="m-2">
            <ListItemPrefix>
              <DocumentTextIcon className="h-5 w-5" />
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
    </div>
  );
}

export default AdminNav;
