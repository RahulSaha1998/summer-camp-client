import React from 'react';
import Lottie from "lottie-react";
import g1 from '../../../public/117327-basket-ball-playing-animation.json'
import g2 from '../../../public/g2.json'
import g4 from '../../../public/g4.json'
import g5 from '../../../public/g5.json'
import g8 from '../../../public/g8.json'
import g7 from '../../../public/g7.json'

//Animations swipes with Gallery 

const ExtraSection2 = () => {
    return (
        <div>
            <hr />
            <div className='md:flex justify-between'>
                <div className='w-60 mx-auto'>
                    <Lottie animationData={g7}></Lottie>
                </div>
                <div className='w-60 mx-auto'>
                    <Lottie animationData={g2}></Lottie>
                </div>
                <div className='w-60 mx-auto'>
                    <Lottie animationData={g8}></Lottie>
                </div>
                <div className='w-60 mx-auto'>
                    <Lottie animationData={g5}></Lottie>
                </div>
                <div className='w-60 mx-auto'>
                    <Lottie animationData={g4}></Lottie>
                </div>
            </div>
        </div>
    );
};

export default ExtraSection2;