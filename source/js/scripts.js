/* eslint-disable import/first */
/* eslint-disable no-undef */

import Util from './utils/Util';
// import Resizer from "./utils/Resizer";
import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import barbaCss from '@barba/css';
import imagesLoaded from 'imagesloaded';
import { gsap } from "gsap";



const bodyTag = document.getElementsByTagName('body')[0];
const runScripts = () => {
  // Listen all elements to set observer 
  const headers = document.querySelectorAll('h2, h3');
  const imageHolders = document.querySelectorAll('.image');
  
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
      
      // Once enter directly current page run this method for page transition
      once({current, next, trigger}) {
        return new Promise((resolve) => {
          const timeline = gsap.timeline({
            onComplete() {
              resolve()
            }
          })
          
          timeline 
            .set(next.container, {opacity: 0 })
            .to(next.container, {opacity: 1, delay:1 }) // set delay opacity 1 for smooth transition
        })
      },
      
      // when leave the page run this method for page transition
      leave({current, next, trigger}) {
        return new Promise((resolve) => {
          const timeline = gsap.timeline({
            onComplete() { 
              // When the timeline of container is fade out is still hidden on the next page to solve this
              current.container.remove() // remove container when is fade out
              
              // Solve instant when is completed
              resolve() // when the task is finished => call resolve to tell that promise is completed
            }
          }) 
          
          // Hide elements when leave
          timeline
            .to("header", { y: "-100%" }, 0) // set starttime 0 to make this two timeline start at the same
            .to("footer", { y: "100%" }, 0)
            .to(current.container, { opacity: 0 }) // Fade current container after header + footer
        })
      },
      
      // when enter a new page run this method for page transition
      enter({current, next, trigger}) {
        // When enter to a new page scroll to top 
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        
        return new Promise((resolve) => {
          const timeline = gsap.timeline({
            onComplete() {
              runScripts() // Run re-init the scripts when timeline is finished before it is resolved
              resolve()
            }
          })
          
          // Show new elements when enter
          timeline
            .set(next.container, { opacity: 0 }) // Set entered container to 0
            .to("header", { y: "0" }, 0)
            .to("footer", { y: "0" }, 0)
            .to(next.container, { opacity: 1, delay: 1 }) // Show entered container after header + footer
        })
      },
    }
  ],
  views: [
    {
      namespace: "product",
      // Before entering when a page if the page contains has a barbaer-container with a name-space "product" add class product on the bodyTag
      beforeEnter() {
        bodyTag.classList.add('product')
      },
      beforeLeave() {
        bodyTag.classList.remove('product')
      },
    }
  ],
  debug: true, // displayed debug mode on console log
});
