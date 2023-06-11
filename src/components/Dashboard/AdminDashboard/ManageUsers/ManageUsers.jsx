import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../../../SectionTitle/SectionTitle';

const ManageUsers = () => {

    const { logOut } = useAuth();
    const navigate = useNavigate();

    const token = localStorage.getItem('access-token');

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        try {
            const res = await axios.get('http://localhost:5000/users', {
                headers: {
                    authorization: `bearer ${token}`
                }
            });
            return res.data;
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                await logOut();
                navigate('/login');
            }
            throw error;
        }
    });


    const handelMakeInstructor = (user) => {
        fetch(`http://localhost:5000/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
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

    const handelMakeAdmin = (user) => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
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
        <div className='w-full h-full'>
            <div className="overflow-x-auto">
            <SectionTitle heading='Manage Users' />
            <div className="overflow-x-auto m-8 card shadow-2xl">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr className='bg-cyan-400 text-slate-800'>
                                <th className='text-center'>Serial</th>
                                <th className='text-center'>Name</th>
                                <th className='text-center'>Email</th>
                                <th className='text-center'>Role</th>
                                <th className='text-center'>Instructor</th>
                                <th className='text-center'>Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) =>
                                    <tr key={user._id} className='font-bold'>
                                        <th className="text-center">{index + 1}</th>
                                        <td className="text-center">{user.name}</td>
                                        <td className="text-center">{user.email}</td>
                                        <td className="text-center">{user.role}</td>
                                        <td className="text-center"><button
                                            onClick={() => handelMakeInstructor(user)}
                                            disabled={user.role === 'instructor' || user.role === 'admin'}
                                            className="btn btn-success">Make Instructor</button></td>
                                        <td><button
                                            onClick={() => handelMakeAdmin(user)}
                                            disabled={user.role === 'instructor' || user.role === 'admin'}
                                            className="btn btn-info">Make Admin</button></td>
                                    </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;

