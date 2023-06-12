import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import SectionTitle from '../../../SectionTitle/SectionTitle';
import { Fade } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet-async';


const PaymentHistory = () => {

    const { user, loading } = useAuth();

    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = () => {
        const url = `https://summer-camp-server-side-five.vercel.app/payments?email=${user?.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCart(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error retrieving data:', error);
            });
    };

    return (
        <div className='h-full w-full'>
            <Helmet>
                <title>Camp Arena | Payment History</title>
            </Helmet>
            <div>
                <SectionTitle heading='payment History' />
            </div>
            <div className="overflow-x-auto m-8 card shadow-2xl">
                <Fade>
                    <table className="table table-zebra w-full">
                        <thead className='m-5'>
                            <tr className='bg-slate-400 text-black rounded-2xl'>
                                <th className='text-center'>Serial</th>
                                <th className='text-center'>Class Name</th>
                                <th className='text-center'>Price</th>
                                <th className='text-center'>Status</th>
                                <th className='text-center'>TransactionId</th>
                                <th className='text-center'>Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                cart.map((item, index) => (

                                    <tr key={item._id} className="font-bold">
                                        <td className="rounded-lg text-center">{index + 1}</td>
                                        <td className="text-center">{item.class_name}</td>
                                        <td className="text-center">{'$' + item.price}</td>
                                        <td className="text-center">{item.status}</td>
                                        <td className="text-center">{item.transactionId}</td>
                                        <td className="text-center">{item.date}</td>

                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </Fade>
            </div>
        </div>
    );
};

export default PaymentHistory;