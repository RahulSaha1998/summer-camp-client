import React, { useEffect, useState } from 'react';
import SectionTitle from '../../SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import { Fade, Zoom } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet-async';


const MyEnrolledClass = () => {

    const { user, loading } = useAuth();

    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = () => {
        const url = `https://summer-camp-server-main.vercel.app/payments?email=${user?.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCart(data);
            })
            .catch(error => {
                console.error('Error retrieving data:', error);
            });
    };


    return (
        <div className='w-full h-full'>
            <Helmet>
                <title>Camp Arena | Enrolled Class</title>
            </Helmet>
            <div className="overflow-x-auto">
                <SectionTitle heading='Enrolled Class' />
                <div className="overflow-x-auto m-8 card shadow-2xl">
                    <Fade>
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr className='bg-slate-400 text-slate-800'>
                                    <th className='text-center'>Serial</th>
                                    <th className='text-center'>Photo</th>
                                    <th className='text-center'>Class Name</th>
                                    <th className='text-center'>Instructor Name</th>
                                    <th className='text-center'>Instructor Email</th>
                                    <th className='text-center'>Seat</th>
                                    <th className='text-center'>Price</th>
                                    <th className='text-center'>Status</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    cart.map((item, index) => (

                                        <tr key={item._id} className="font-bold">
                                            <td className="rounded-lg text-center">{index + 1}</td>
                                            <td className="text-center">
                                                <div className="avatar">
                                                    <div className="rounded w-24">
                                                        {item.image && <img src={item.image} alt="" />}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center ">{item.class_name}</td>
                                            <td className="text-center">{item.instructor_name}</td>
                                            <td className="text-center">{item.ins_email}</td>
                                            <td className="text-center">{item.seat}</td>
                                            <td className="text-center">{'$' + item.price}</td>
                                            <td className="text-center">{item.status}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default MyEnrolledClass;



