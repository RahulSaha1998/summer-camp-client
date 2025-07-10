import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const PaymentCheckoutForm = ({ price, loadedData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');


    useEffect(() => {
        if (price > 0) {
            axios.post('https://summer-camp-server-main.vercel.app/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, axios])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('error', error)
            setCardError(error.message);
        }
        else {
            setCardError('');
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }

        console.log('payment intent', paymentIntent)


        setProcessing(false)

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            // save payment information to the server
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                image: loadedData.image,
                class_name: loadedData.class_name,
                instructor_name: loadedData.instructor_name,
                ins_email: loadedData.ins_email,
                seat: loadedData.seat - 1,
                status: 'paid',
                price,
                classId: loadedData.classId,
                cartId: loadedData._id,
                date: new Date(),
                enClass: loadedData.enClass + 1,
            }
            axios.post('https://summer-camp-server-main.vercel.app/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertResult.insertedId && res.data.deleteResult.deletedCount === 1) {                 
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your payment is Successful!',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          navigate('/dashboard/student/myEnrolledClass');
                    }
                })
                
        }





    }


    return (
        <>
            <form className="w-2/3 m-8 lg:mx-auto" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />

                <button
                    disabled={!stripe || !clientSecret || processing}
                    className="btn btn-primary btn-sm mt-4" type="submit" >
                    Pay
                </button>
            </form>
            {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
            {transactionId && <p className="text-blue-800">Transaction complete id: {transactionId}</p>}
        </>
    );
};

export default PaymentCheckoutForm;