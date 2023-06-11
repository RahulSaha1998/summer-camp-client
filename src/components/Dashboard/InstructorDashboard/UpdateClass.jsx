// import React from 'react';
// import { useLoaderData, useNavigate } from 'react-router-dom';
// import useAuth from '../../../hooks/useAuth';
// import Swal from 'sweetalert2';

// const UpdateClass = ({ }) => {

//     const classItems = useLoaderData();
//     const { _id, price, class_name, seat } = classItems;

//     console.log(classItems);

//     const { user } = useAuth();
//     const navigate = useNavigate();

//     const handelUpdateClass = async (event) => {
//         event.preventDefault();
//         const form = event.target;
//         const price = parseFloat(form.price.value);
//         const seat = parseInt(form.seat.value);

//         const addedClass = {
//             price,
//             seat,

//         };

//         fetch(`http://localhost:5000/class/${_id}`, {
//             method: 'PUT',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(addedClass)
//         })
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data)
//                 if (data.modifiedCount > 0) {
//                     Swal.fire({
//                         title: 'Success!',
//                         text: 'Class Updated Successfully!',
//                         icon: 'success',
//                         confirmButtonText: 'Cool'
//                     })
//                     navigate('/dashboard/instructor/myClass')
//                 }
//             })
//     }

//         return (
//             <div className='bg-slate-200 rounded-lg shadow-xl mt-5 '>
//                 <div className='text-center'>
//                     <h2 className='font-semibold text-center text-3xl text-red-600 mt-5'>Update Class</h2>
//                     <hr />
//                     <div className="divider"></div>
//                 </div>
//                 <form onSubmit={handelUpdateClass} className='w-[80%] mx-auto '>
//                     <div className='grid grid-cols-3 gap-5'>
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Class Name*</span>
//                             </label>
//                             <input type="text"
//                                 defaultValue={class_name}
//                                 className="input input-bordered" 
//                                 readOnly
//                                 />
//                         </div>
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Instructor Name*</span>
//                             </label>
//                             <input type="text" placeholder={user?.displayName}

//                                 name='ins_name'
//                                 className="input input-bordered"
//                                 readOnly />
//                         </div>
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Instructor Email*</span>
//                             </label>
//                             <input type="text" placeholder={user?.email}

//                                 name='email'
//                                 className="input input-bordered"
//                                 readOnly />
//                         </div>
//                     </div>
//                     <div className='grid grid-cols-2 gap-5'>
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Available Seats*</span>
//                             </label>
//                             <input type="number"
//                                 defaultValue={seat}
//                                 name='seat'
//                                 className="input input-bordered"
//                                 required />
//                         </div>
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Price*</span>
//                             </label>
//                             <input type="number" placeholder=" Price"
//                                 name='price'
//                                 defaultValue={price}
//                                 className="input input-bordered"
//                                 required />
//                         </div>
//                     </div>

//                     <div className="form-control mt-6 text-center">
//                         <input className="btn btn-block btn-info mb-6" type="submit" value='Update Class' />
//                     </div>
//                 </form>
//             </div>
//         );
//     };

//     export default UpdateClass;


import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import SectionTitle from '../../SectionTitle/SectionTitle';

const UpdateClass = ({ }) => {
    const classItems = useLoaderData();
    const { _id, price, class_name, seat } = classItems;

    const { user } = useAuth();
    const navigate = useNavigate();

    const handelUpdateClass = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const price = parseFloat(form.price.value);
        const seat = parseInt(form.seat.value);

        const addedClass = {
            name,
            price,
            seat,
        };

        fetch(`http://localhost:5000/class/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(addedClass),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Class Updated Successfully!',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                    });
                    navigate('/dashboard/instructor/myClass');
                }
            });
    };

    return (
        <div className='h-full'>
            <div>
                <SectionTitle heading='Update Class'></SectionTitle>
            </div>
            <div className="bg-slate-200 rounded-lg shadow-xl mt-5 ">
                <div>
                    <form onSubmit={handelUpdateClass} className="w-[80%] mx-auto ">
                        <div className="grid grid-cols-3 gap-5">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Name*</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={class_name}
                                    className="input input-bordered"
                                    name="name"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Instructor Name*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder={user?.displayName}
                                    name="ins_name"
                                    className="input input-bordered"
                                    readOnly
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Instructor Email*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder={user?.email}
                                    name="email"
                                    className="input input-bordered"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Available Seats*</span>
                                </label>
                                <input
                                    type="number"
                                    defaultValue={seat}
                                    name="seat"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price*</span>
                                </label>
                                <input type="number" placeholder=" Price"
                                    name='price'
                                    defaultValue={price}
                                    className="input input-bordered"
                                    required />
                            </div>
                        </div>

                        <div className="form-control mt-6 text-center">
                            <input className="btn btn-block btn-info mb-6" type="submit" value='Update Class' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateClass;
