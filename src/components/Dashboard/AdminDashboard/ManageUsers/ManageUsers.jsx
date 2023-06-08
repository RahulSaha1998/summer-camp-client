import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ManageUsers = () => {

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users')
        return res.json();
    })

    return (
        <div>
            <h2>Hello from manage users: {users.length}</h2>
        </div>
    );
};

export default ManageUsers;