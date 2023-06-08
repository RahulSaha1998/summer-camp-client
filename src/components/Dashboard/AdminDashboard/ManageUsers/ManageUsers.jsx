import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const ManageUsers = () => {

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users')
        return res.json();
    })

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
                                    <td><button className='btn btn-primary'>{user.role}</button></td>
                                    <td><button className="btn btn-outline btn-primary">Made Instructor</button></td>
                                    <td><button className="btn btn-outline btn-primary">Made Admin</button></td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;