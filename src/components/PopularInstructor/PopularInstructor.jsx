import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import Loader from '../Loader/Loader';
import { FaHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import SectionTitle from '../SectionTitle/SectionTitle';
import Marquee from "react-fast-marquee";






const PopularInstructor = () => {
    const { loading } = useAuth();

    const handleFavoriteButton = () => {
        toast("WOW! Let's Explore Our Class!");
    };



    const token = localStorage.getItem('access-token');

    const { data: instructors = [], refetch } = useQuery(['instructors'], async () => {
        const res = await axios.get('http://localhost:5000/topInstructors', {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        return res.data;
    });

    if (loading) {
        return <Loader></Loader>
    }





    return (
        <div>
            <div className="text-center text-3xl font-bold mb-5">
                <SectionTitle heading='Popular Instructor' />
            </div>
            <Marquee>
                <div className="overflow-x-auto shadow-lg rounded-xl bg-slate-100">
                    <div className='flex gap-10 p-5'>
                        {
                            instructors.map((item) => (
                                <div
                                    key={item._id}
                                    className='card w-full bg-base-100 shadow-xl'>
                                    <figure>
                                        <img className='h-52 w-full' src={item.image} alt={item.class_name} />
                                    </figure>
                                    <div className="card-body font-bold">
                                        <p><span className='text-red-600'>Name: </span>{item.name}</p>
                                        <p><span className='text-red-600'>Email :</span> {item.email}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Marquee>
        </div>
    );
};

export default PopularInstructor;

