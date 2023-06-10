import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import Loader from '../Loader/Loader';
import { FaArrowRight, FaHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { useEffect, useState } from 'react';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';




const ApprovedClass = () => {
    const { loading, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    // const [cart] = useCart();



    const token = localStorage.getItem('access-token');

    const { data: approvedClass = [], refetch } = useQuery(['approvedClass'], async () => {
        const res = await axios.get('http://localhost:5000/approvedClass', {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        return res.data;
    });

    if (loading) {
        return <Loader></Loader>
    }

    const handleFavoriteButton = () => {
        toast("WOW! Let's Explore Our Class!");
    };

    const handelEnroll = item => {

        console.log(item);

        if (user && user.email) {
            const cartItem = {
                classId: item._id,
                class_name: item.class_name,
                instructor_name: item.instructor_name,
                image: item.image,
                email: user.email,
                price: item.price,
                seat: item.seat,
                ins_email: item.email,
                enClass: item.enClass
            }

            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch();
                        // setEnrolledClasses([...enrolledClasses, cartItem]);
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'You have successfully enrolled the class!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'You have to login first to enroll the class!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }

    }


    return (
        <div className="overflow-x-auto shadow-lg rounded-xl bg-slate-100">
            <div className="text-center text-3xl font-bold mb-5">
                <h2 className='text-3xl font-semibold mt-5 text-center'>Training Courses</h2>
                <div className="divider mb-5"></div>
            </div>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-10 p-5'>
                {
                    approvedClass.map((item) => (
                        <div
                            key={item._id}
                            className={`card w-full bg-base-100 shadow-xl ${item.seat === 0 ? 'bg-red-200' : ''}`}>
                            <figure>
                                <img className='h-52 w-full' src={item.image} alt={item.class_name} />
                            </figure>
                            <div className="card-body font-bold">
                                <h2 className="card-title">{item.class_name}</h2>
                                <p><span className='text-red-600'>Instructor :</span> {item.instructor_name}</p>
                                <p><span className='text-red-600'>Seat :</span> {item.seat}</p>
                                <p><span className='text-red-600'>Price :</span> ${item.price}</p>
                                <div className="card-actions justify-between">
                                    <button
                                        onClick={handleFavoriteButton}
                                        className="btn btn-outline btn-info"><FaHeart /></button>
                                    <button
                                        onClick={() => handelEnroll(item)}
                                        className="btn btn-info"
                                        disabled={item.seat === 0 || isAdmin || isInstructor }
                                    >Enroll<FaArrowRight /></button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <ToastContainer />

        </div>
    );
};

export default ApprovedClass;

// enrolledClasses.some((enrolledClass) => enrolledClass.classId === item._id)


