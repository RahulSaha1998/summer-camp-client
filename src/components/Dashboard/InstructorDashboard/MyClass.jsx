import { useEffect, useState } from "react";
import MyClassBody from "./MyClassBody";
import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../SectionTitle/SectionTitle";
import { Fade } from 'react-awesome-reveal';
import { Helmet } from "react-helmet-async";



const MyClass = () => {

    const [classItems, SetClassItems] = useState([]);
    const { user } = useAuth()


    const url = `http://localhost:5000/someClass?email=${user?.email}`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                SetClassItems(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])



    return (
        <div className='w-full h-full'>
            <Helmet>
                <title>Camp Arena | My Class</title>
            </Helmet>
            <div className="overflow-x-auto">
                <SectionTitle heading='My Class' />
                <div className="overflow-x-auto m-8 card shadow-2xl">
                    <Fade>
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr className="bg-slate-400 text-slate-800">
                                    <th className='text-center'>Serial</th>
                                    <th className='text-center'>Photo</th>
                                    <th className='text-center'>Class Name</th>
                                    <th className='text-center'>Instructor Name</th>
                                    <th className='text-center'>Instructor Email</th>
                                    <th className='text-center'>Seat</th>
                                    <th className='text-center'>Price</th>
                                    <th className='text-center'>Status</th>
                                    <th className='text-center'>Enrolled Class</th>
                                    <th className='text-center'>Feedback</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classItems.map((ct, index) => (
                                    <MyClassBody
                                        key={ct._id}
                                        index={index}
                                        ct={ct}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default MyClass;