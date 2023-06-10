import React from 'react';
import SectionTitle from '../../../SectionTitle/SectionTitle';
import PaymentCheckoutForm from './PaymentChekOutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const StudentPayment = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const amount = searchParams.get('amount') || 0;
    
    return (
        <div className='w-full'>
            <SectionTitle subHeading='Please pay for your selected class' heading='Payment' />
            <h2>Hello from payment</h2>
            <p>Amount: ${amount}</p>
            <Elements stripe={stripePromise}>
                <PaymentCheckoutForm></PaymentCheckoutForm>
            </Elements>
        </div>
    );
};

export default StudentPayment;

