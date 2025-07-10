import React from 'react';
import errorPage from '../../../public/errorPage.json'
import Lottie from "lottie-react";
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const NotFoundPage = () => {
    return (
        <div className='flex justify-center items-center'>
            <div>
                <Lottie animationData={errorPage}></Lottie>
                <div className='flex flex-col gap-5 items-center'>
                    <h2 className='text-center font-bold text-red-600 text-4xl'>404 Page Not Found!</h2>
                    <div>
                        <Link to='/'><button className='btn btn-info gap-2'><FaArrowLeft /> Bact To Home</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;