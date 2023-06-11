import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import SectionTitle from '../../../SectionTitle/SectionTitle';
import { Fade } from 'react-awesome-reveal';


const PaymentHistory = () => {

    const { user, loading } = useAuth();

    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = () => {
        const url = `http://localhost:5000/payments?email=${user?.email}`;
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
            <div>
                <SectionTitle heading='payment History' />
            </div>
            <div className="overflow-x-auto m-8 card shadow-2xl">
                <Fade>
                    <table className="table table-zebra w-full">
                        <thead className='m-5'>
                            <tr className='bg-cyan-400 text-slate-800 rounded-2xl'>
                                <th className='text-center'>Serial</th>
                                <th className='text-center'>Class Name</th>
                                <th className='text-center'>Price</th>
                                <th className='text-center'>Status</th>
                                <th className='text-center'>Payment Date</th>
                                <th className='text-center'>TransactionId</th>
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
                                        <td className="text-center">{item.date}</td>
                                        <td className="text-center">{item.transactionId}</td>

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