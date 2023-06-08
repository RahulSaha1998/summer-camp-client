import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import ManageClassTable from './ManageClassTable';

const ManageClass = () => {

    const loaderData = useLoaderData();
    const [classItems, SetClassItems] = useState(loaderData);

    console.log(loaderData);

    return (
        <div className="overflow-x-auto shadow-xl">
            <div className='text-center text-3xl font-bold mb-5'>
                <h2>Manage Class</h2>
            </div>
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
                        <th className='text-center'>Status</th>
                        <th className='text-center'>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {classItems.map((ct, index) => (
                        <ManageClassTable key={ct._id} index={index} ct={ct} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default ManageClass;