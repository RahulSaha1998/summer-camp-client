import React from 'react';
import SectionTitle from '../../../SectionTitle/SectionTitle';
import PaymentCheckoutForm from './PaymentChekOutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLoaderData, useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const StudentPayment = () => {

    const loadedData = useLoaderData();
    console.log(loadedData);
    const price = parseFloat(loadedData.price.toFixed(2));


    return (
        <div className='w-full'>
            <SectionTitle subHeading='Please pay for your selected class' heading='Payment' />
            <h2>Hello from payment</h2>
            <p>Total Price: {price}</p>
            <Elements stripe={stripePromise}>
                <PaymentCheckoutForm price={price} loadedData={loadedData}></PaymentCheckoutForm>
            </Elements>
        </div>
    );
};

export default StudentPayment;

















