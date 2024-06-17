import {useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation } from 'react-router-dom';

export default function Form(){
    const navigate = useNavigate();
    const location = useLocation();
    const { title } = location.state;



    return(
        <div>
            <h1>{title}</h1>
            <div 
            onClick={() => navigate(-1)} 
            className='top-5 left-5 absolute cursor-pointer hover:underline'>
                <ArrowBackIcon/> 
                Go back
            </div>

            
        </div>
    )
}