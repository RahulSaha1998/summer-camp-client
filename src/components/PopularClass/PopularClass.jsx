import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import Loader from '../Loader/Loader';
import { FaHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import SectionTitle from '../SectionTitle/SectionTitle';





const PopularClass = () => {
    const { loading, user } = useAuth();


    const token = localStorage.getItem('access-token');

    const { data: approvedClass = [], refetch } = useQuery(['approvedClass'], async () => {
        const res = await axios.get('http://localhost:5000/topClass', {
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

    


    return (
        <div className="overflow-x-auto shadow-lg rounded-xl bg-slate-100">
            <div className="text-center text-3xl font-bold mb-5">
            <SectionTitle heading='Popular Class' />
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
                                <p><span className='text-red-600'>Enroll :</span> {item.enClass}</p>
                                <div className="card-actions justify-between">
                                    <button
                                        onClick={handleFavoriteButton}
                                        className="btn btn-info"><FaHeart /></button>
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

export default PopularClass;

