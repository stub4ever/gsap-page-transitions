/* eslint-disable import/first */
/* eslint-disable no-undef */

import Util from './utils/Util';
// import Resizer from "./utils/Resizer";
import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import barbaCss from '@barba/css';
import imagesLoaded from 'imagesloaded';


const runScripts = () => {
  // Listen all elements to set observer 
  const headers = document.querySelectorAll('h2, h3');
  const imageHolders = document.querySelectorAll('.image');
  console.log('hi')
  
  // Connect elements to the observer
  // Has two agruments:
  // - callback => check every single time this changes over a certain treshold
  // - options => Options that is passed into IO() constructor to control the circumstances under which the observer's callback is invoked
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // if this entry has an intersection over or equal 10% treshhold (10% page visisble) add an class else
      if (entry.intersectionRatio >= 0.1) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view'); // remove the classs if the page visible is lesser then 10%
      };
    })
  }, {
    threshold: [0, 0.1, 1], // Listen at 0, 10% and 100% percentage of the target's visibility the observer's callback should be execute
  });
  
  // observer has to make an callback on each each element
  headers.forEach((header) => {
    observer.observe(header)
  })
  
  imageHolders.forEach((holder) => {
    observer.observe(holder)
  })
}

// Initialize the scripts
runScripts(); 

barba.init({
  transitions: [
    {
      name: 'switch',
      // - Current is the current page that do something
      // - Next is the next page that do something
      // - Trigger is when we clicked on, that makes transition happend
      enter({current, next, trigger}) {
        // Run re-init the scripts when enter a page
        runScripts()
      },
      leave({current, next, trigger}) {
        
      },
    }
  ],
  views: [],
  debug: true, // displayed debug mode on console log
});
