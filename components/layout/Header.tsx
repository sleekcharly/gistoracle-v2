import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import Cookies from 'js-cookie';
import Menu from '@material-ui/core/Menu';
import {
  MenuIcon,
  SearchIcon,
  UserIcon,
  CogIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import {
  ChevronDoubleLeftIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  PencilAltIcon,
  SparklesIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import { Avatar, Divider, Drawer, MenuItem } from '@material-ui/core';
import { useTheme } from 'next-themes';
// import Login from '../auth/login';
// import { useAuth } from '../../contexts/AuthContext';

// redux stuff
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
// import {
//   CLEAR_LOGIN_ERRORS,
//   CLEAR_SIGNUP_ERRORS,
//   DARK_MODE_OFF,
//   DARK_MODE_ON,
// } from '../../redux/types/uiTypes';

import algoliasearch from 'algoliasearch';
// import Signup from '../auth/signup';
import { ChevronRight } from '@material-ui/icons';
// import AppSidebar from './AppSidebar';
// import MyButton from '../MyButton';

// define header functional component
const Header = ({
  featuredNavCategories,
  pageComponent,
  drawerPage,
  categoryId,
  username,
}) => {
  // *** get redux state parameters ***//
  // get server-side rendered darkmode state and UI status from redux state
  //   const useStateParameters = () => {
  //     return useSelector(
  //       (state) => ({
  //         darkMode: state.UI.darkMode,
  //         credentials: state.user.credentials,
  //       }),
  //       shallowEqual,
  //     );
  //   };
};
