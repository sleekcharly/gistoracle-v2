import { NextSeo } from 'next-seo';
import React, { useEffect, useState } from 'react';
import * as cookie from 'cookie';
import { useSnackbar } from 'notistack';
import { shallowEqual, useSelector } from 'react-redux';

export default function Home() {
  // define page variable holding the "home" string
  const page = 'home';

  // establish snackbar utility
  //   const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  return (
    <div data-testid="root">
      <p>Hello</p>
    </div>
  );
}
