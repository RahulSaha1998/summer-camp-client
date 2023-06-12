import React from 'react';
import Lottie from "lottie-react";
import g4 from '../../../public/117327-basket-ball-playing-animation.json'



const ExtraSection = () => {


    return (
      <div className='md:grid grid-cols-2 justify-center p-5 card bg-slate-100 rounded-lg'>
      <div className='m-5'>
          <div className=' lg:grid grid-rows-1 justify-center'>
              <h4 className='text-start text-4xl font-semibold'>Explore Your Camping <br /> <span className='text-red-600'>Like an Adventure!</span></h4>
              <p className='mt-3 text-start'>
              Join us at Camp Adventure for the ultimate summer experience! Embark on thrilling outdoor challenges, conquer towering rock walls, brave thrilling zip lines, and navigate through dense forests. Dive into refreshing lakes, paddle through rapids, and explore hidden caves. Build lifelong friendships, ignite your passion for adventure, and discover your true potential. Camp Adventure will make your summer unforgettable and transform your life into an extraordinary adventure! Don't miss out on this epic journey!
              </p>
              
          </div>
      </div>
      
          <div className='sm:mt-5 md:mt-0 lg:py-5 mx-auto'>
              
              <Lottie className='h-full w-80' animationData={g4}></Lottie>
          </div>
  </div>
    );
};

export default ExtraSection;