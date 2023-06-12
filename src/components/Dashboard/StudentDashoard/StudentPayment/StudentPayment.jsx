import React from 'react';
import SectionTitle from '../../../SectionTitle/SectionTitle';
import PaymentCheckoutForm from './PaymentChekOutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLoaderData, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const StudentPayment = () => {

    const loadedData = useLoaderData();
    console.log(loadedData);
    const price = parseFloat(loadedData.price.toFixed(2));


    return (
        <div className='w-full h-full'>
            <Helmet>
                <title>Camp Arena | Payment</title>
            </Helmet>
            <SectionTitle subHeading='Please pay for your selected class' heading='Payment' />
            <div className='bg-base-100 p-8 m-8 card shadow-2xl '>
                <Elements stripe={stripePromise}>
                    <PaymentCheckoutForm price={price} loadedData={loadedData}></PaymentCheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default StudentPayment;

















