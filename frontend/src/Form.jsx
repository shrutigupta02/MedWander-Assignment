import {useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';

const validate = values => {
    const errors = {};

    if(!values.name){
        errors.name = 'Name is required';
    }else if(!/^[A-Za-z]*$/.test(values.name)){
        errors.name = 'Name can only contain alphabetic characters.'
    }

    if(!values.countryCode) {
        errors.countryCode = 'Country code is required';
    }

    const phoneRegex = {
        '+91': /^[6-9]\d{9}$/, 
        '+1': /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/,
        '+44': /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/, 
    };
  
    if (!values.phoneNumber) {
        errors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex[values.countryCode]?.test(values.phoneNumber)) {
        errors.phoneNumber = `Invalid phone number for ${values.countryCode}`;
    }

    return errors;
}

export default function Form(){
    const navigate = useNavigate();
    const location = useLocation();
    const { title } = location.state;
    const formik = useFormik({
        initialValues: {
          name: '',
          countryCode: '',
          phoneNumber: '',
        },
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

    return(
        <div>
            <h1>{title}</h1>
            <div 
            onClick={() => navigate(-1)} 
            className='top-5 left-5 absolute cursor-pointer hover:underline'>
                <ArrowBackIcon/> 
                Go back
            </div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input 
                onChange={formik.handleChange}
                value={formik.values.name}
                type='text' id='name' name='name'/>

                {formik.touched.name && formik.errors.name ? <p>{formik.errors.name}</p> : null}

                <label htmlFor='countryCode'>Country code</label>
                <select name='countryCode' id='countryCode'
                onChange={formik.handleChange}
                value={formik.values.countryCode}
                >
                <option value="" disabled>Select Country Code</option>
                <option value="+91">+91 (India)</option>
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
                </select>

                {formik.touched.countryCode && formik.errors.countryCode ? <p>{formik.errors.countryCode}</p> : null}

                <label htmlFor='phoneNumber'>Phone number</label>
                <input 
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                type='text' id='phoneNumber' name='phoneNumber'/>
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? <p>{formik.errors.phoneNumber}</p> : null}

                <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}