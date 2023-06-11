import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Fade} from 'react-awesome-reveal';



const image_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddClass = () => {
    const [status, setStatus] = useState("pending");
    const [enClass, setEnClass] = useState(0);
    const [feedback, setFeedback] = useState("N/A");
    const { user } = useContext(AuthContext);

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`



    const handelAddClass = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const instructor_name = user?.displayName;
        const email = user?.email;
        const price = parseFloat(form.price.value);
        const seat = parseInt(form.seat.value);
        const image = form.image.files[0];

        const formData = new FormData();
        formData.append("image", image);

        fetch(img_hosting_url, {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const addedClass = {
                        class_name: name,
                        instructor_name,
                        email,
                        price,
                        seat,
                        status,
                        enClass,
                        feedback,
                        image: imgURL
                    };
                    console.log(addedClass);
                    fetch('http://localhost:5000/class', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(addedClass)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.insertedId) {
                                Swal.fire({
                                    title: 'Success!',
                                    text: 'Class Added Successfully!',
                                    icon: 'success',
                                    confirmButtonText: 'Cool'
                                })
                            }
                        })
                }
            })
            .catch(error => {
                console.error("Error uploading image:", error);
            });
    }










    return (
        <div className='bg-slate-200 rounded-lg shadow-xl mt-5 '>
            <div className='text-center'>
                <h2 className='font-semibold text-center text-3xl text-red-600 mt-5'>Add Class</h2>
                <hr />
                <div className="divider"></div>
            </div>
            <Fade>
                <form onSubmit={handelAddClass} className='w-[80%] mx-auto '>
                    <div className='grid grid-cols-2 gap-5'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Name*</span>
                            </label>
                            <input type="text" placeholder="Class Name"
                                name='name'
                                className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo*</span>
                            </label>
                            <input
                                type="file"
                                name="image"
                                className="file-input file-input-bordered file-input-info w-full max-w-xs"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Instructor Name*</span>
                            </label>
                            <input type="text" placeholder={user?.displayName}

                                name='ins_name'
                                className="input input-bordered"
                                readOnly />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Instructor Email*</span>
                            </label>
                            <input type="text" placeholder={user?.email}

                                name='email'
                                className="input input-bordered"
                                readOnly />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Available Seats*</span>
                            </label>
                            <input type="number" placeholder="Available Seats"

                                name='seat'
                                className="input input-bordered"
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input type="number" placeholder=" Price"
                                name='price'
                                className="input input-bordered"
                                required />
                        </div>
                    </div>
                    <div className="form-control mt-6 text-center">
                        <input className="btn btn-block btn-info mb-6" type="submit" value='Add Class' />
                    </div>
                </form>
            </Fade>
        </div>

    );
};

export default AddClass;



