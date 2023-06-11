import { Link } from "react-router-dom";


const MyClassBody = ({ct, index}) => {

    const { _id,  price, instructor_name, email, image, class_name, seat, status, feedback, enClass } = ct;
    // console.log(ct);

    // const { user } = useContext(AuthContext);
    const handelUpdate = (_id) => {
        console.log(_id);
      };


    return (
        <>
        <tr className='font-bold'>
                <td className='rounded-lg text-center'>{index + 1}</td>
                <td className='text-center'>
                <div className='avatar'>
                        <div className='rounded w-24'>
                            {image && <img src={image} alt="" />}
                        </div>
                    </div>
                </td>
                <td className='text-center '>{class_name}</td>
                <td className='text-center'>{instructor_name}</td>
                <td className='text-center'>{email}</td>
                <td className='text-center'>{seat}</td>
                <td className='text-center'>{'$' + price}</td>
                <td className='text-center'><button className="btn btn-sm">{status}</button></td>
                <td className='text-center'>{enClass}</td>
                <td className='text-center'>{feedback}</td>
                <td className='text-center'>
                <Link to={`/dashboard/instructor/update/${_id}`}>
                    <button
                onClick={()=> handelUpdate(_id)}
                className="btn btn-info">Edit</button></Link>
                </td>
                
            </tr>
        </>
    );
};

export default MyClassBody;