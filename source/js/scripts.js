/* eslint-disable import/first */
/* eslint-disable no-undef */

import Util from './utils/Util';
// import Resizer from "./utils/Resizer";

import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import barbaCss from '@barba/css';

import imagesLoaded from 'imagesloaded';

// tell Barba to use the prefetch module
barba.use(barbaPrefetch);

// tell Barba to use the css module
barba.use(barbaCss);

// init Barba
barba.init({
  views: [],
  transitions: [],
});

