import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageUsers = () => {

    const token = localStorage.getItem('access-token');

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users',{
            headers: {
                authorization: `bearer ${token}`
            }
        })
        return res.json();
    })

    const handelMakeInstructor = (user) => {
        fetch(`http://localhost:5000/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an Instructor Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    const handelMakeAdmin= (user) => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    return (
        <div>
            <h2 className='text-3xl font-semibold'>Total users: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='text-center'>Serial</th>
                            <th className='text-center'>Name</th>
                            <th className=''>Email</th>
                            <th className='text-center'>Role</th>
                            <th className='text-center'>Action 1</th>
                            <th className='text-center'>Action 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td><button
                                    onClick={()=>handelMakeInstructor(user)}
                                    disabled={user.role === 'instructor' || user.role === 'admin'}
                                    className="btn btn-outline btn-primary">Make Instructor</button></td>
                                    <td><button 
                                    onClick={()=>handelMakeAdmin(user)}
                                    disabled={user.role === 'instructor' || user.role === 'admin'}
                                    className="btn btn-outline btn-primary">Make Admin</button></td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;


