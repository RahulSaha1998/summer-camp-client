import { useQuery } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import Loader from '../Loader/Loader';
import SectionTitle from '../SectionTitle/SectionTitle';


const Instructors = () => {

    const {loading} = useAuth();


    const handleFavoriteButton = () => {
        toast("WOW! Let's Explore Our Class!");
    };


    const token = localStorage.getItem('access-token');

    const { data: instructors = [], refetch } = useQuery(['instructors'], async () => {
        const res = await axios.get('http://localhost:5000/instructors', {
            headers: {
                authorization: `bearer ${token}`
            }
        });
        return res.data;

    });

    if(loading){
        return <Loader></Loader>
    }



    return (
        <div className='shadow-2xl rounded-lg bg-slate-100'>
            <SectionTitle heading='Instructors' />
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='text-center font-bold text-black'>Serial</th>
                            <th className='text-center font-bold text-black'>Image</th>
                            <th className='text-center font-bold text-black'>Name</th>
                            <th className='text-center font-bold text-black'>Email</th>
                            <th className='text-center font-bold text-black'>Favorite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            instructors.map((instructor, index) =>
                                <tr key={instructor._id}>
                                    <th className='text-center text-black'>{index + 1}</th>
                                    <td className='text-center'>
                                        <div className='avatar'>
                                            <div className='rounded w-24'>
                                                <img src={instructor.image} alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center text-black'>{instructor.name}</td>
                                    <td className='text-center text-black'>{instructor.email}</td>
                                    <td className='text-center text-black'><button
                                        onClick={handleFavoriteButton}
                                        className='btn btn-outline btn-error'><FaHeart/></button></td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Instructors;

