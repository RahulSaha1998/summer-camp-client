import React from 'react';
import useCart from '../../../hooks/useCart';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom';
import SectionTitle from '../../SectionTitle/SectionTitle';

const MySelectedClass = () => {

    //     const navigate = useNavigate();
    //   const location = useLocation();

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

    const handelPayment = (price)=>{
        console.log(price);
       
    }

    return (
        <div>
            <div className="overflow-x-auto shadow-xl">
                <SectionTitle heading='Selected Class' />
                <table className="table w-full">
                    <thead>
                        <tr>
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
                                            to={{
                                                pathname: '/dashboard/student/payment',
                                                search: `?amount=${item.price}`,
                                            }}
                                        >
                                            <button
                                                onClick={() => handelPayment(item.price)}
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
            </div>
        </div>
    );
};

export default MySelectedClass;