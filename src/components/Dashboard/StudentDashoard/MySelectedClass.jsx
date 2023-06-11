import React from 'react';
import useCart from '../../../hooks/useCart';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import SectionTitle from '../../SectionTitle/SectionTitle';
import { Fade } from 'react-awesome-reveal';


const MySelectedClass = () => {


    const [cart, refetch] = useCart();

    const handelDeleteClass = (_id) => {
        console.log(_id);
        Swal.fire({
            title: 'Are you sure that you want to delete?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/carts/${_id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'The Class has been deleted.',
                                'success'
                            );
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        });
    };

    const handelPayment = (id) => {
        console.log(id);

    }

    return (
        <div className='w-full h-full'>
            <div>
                <SectionTitle heading='Selected Class' />
            </div>
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
                                <th className='text-center'>Payment</th>
                                <th className='text-center'>Delete</th>
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
                                        <td className="text-center">
                                            {/* <Link to='/dashboard/student/payment'>
                                        <button
                                        onClick={()=>handelPayment(item.price)}
                                            className="text-center btn btn-info">Pay</button>
                                        </Link> */}
                                            <Link
                                                to={`/dashboard/student/payment/${item._id}`}
                                            >
                                                <button
                                                    onClick={() => handelPayment(item._id)}
                                                    className="text-center btn btn-info"
                                                >
                                                    Pay
                                                </button>
                                            </Link>

                                        </td>
                                        <td className="text-center">
                                            <button
                                                onClick={() => handelDeleteClass(item._id)}
                                                className="text-center btn btn-info"><FaTrashAlt /></button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </Fade>
            </div>
        </div>
    );
};

export default MySelectedClass;



