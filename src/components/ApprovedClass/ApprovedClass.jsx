import { useQuery } from '@tanstack/react-query';
import axios from 'axios';



const ApprovedClass = () => {

    const token = localStorage.getItem('access-token');

    const { data: approvedClass = [], refetch } = useQuery(['approvedClass'], async () => {
        const res = await axios.get('http://localhost:5000/approvedClass', {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        return res.data;
    });


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
                        <th className="text-center">Seat</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Feedback</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        approvedClass.map((item, index) => (

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
                                <td className="text-center">{item.seat}</td>
                                <td className="text-center">{'$' + item.price}</td>   
                                <td className="text-center">
                                    <button 
                                    className="text-center btn btn-info">Select</button>
                         
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApprovedClass;


