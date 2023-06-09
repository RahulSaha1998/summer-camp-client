import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageClass = () => {
    const token = localStorage.getItem('access-token');

    const { data: cart = [], refetch } = useQuery(['class'], async () => {
        const res = await axios.get('http://localhost:5000/class', {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        return res.data;
    });


    const handelApproved = (item) => {
        fetch(`http://localhost:5000/users/status/${item._id}`, {
            method: 'PATCH',

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Approved this Class!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }



    return (
        <div className="overflow-x-auto shadow-xl">
            <div className="text-center text-3xl font-bold mb-5">
                <h2>Manage Class</h2>
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th className="text-center">Serial</th>
                        <th className="text-center">Photo</th>
                        <th className="text-center">Class Name</th>
                        <th className="text-center">Instructor Name</th>
                        <th className="text-center">Instructor Email</th>
                        <th className="text-center">Seat</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Feedback</th>
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
                                <td className="text-center">{item.email}</td>
                                <td className="text-center">{item.seat}</td>
                                <td className="text-center">{'$' + item.price}</td>
                                <td className="text-center">
                                    <button className="btn btn-sm">{item.status}</button>
                                </td>
                                <td className="text-center">
                                    
                                </td>
                                <td className="text-center gap-2 flex flex-col">
                                    <button onClick={() => handelApproved(item)} className="text-center btn btn-success">Approved</button>
                                    <button className="text-center btn btn-warning">Denied</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageClass;


