import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import './Form.css';

// Validation function for form fields
const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Name is required';
    } else if (!/^[A-Za-z]*$/.test(values.name)) {
        errors.name = 'Name can only contain alphabetic characters.';
    }

    if (!values.countryCode) {
        errors.countryCode = 'Country code is required';
    }

    // Regular expressions for phone number validation based on country code
    const phoneRegex = {
        '+91': /^[6-9]\d{9}$/, // India
        '+1': /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/, // USA
        '+44': /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/ // UK
    };
  
    if (!values.phoneNumber) {
        errors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex[values.countryCode]?.test(values.phoneNumber)) {
        errors.phoneNumber = `Invalid phone number for ${values.countryCode}`;
    }

    return errors;
}

export default function Form() {
    const navigate = useNavigate();
    const location = useLocation();
    const { title, type } = location.state;

    // Formik form setup
    const formik = useFormik({
        initialValues: {
            name: '',
            countryCode: '',
            phoneNumber: '',
            formType: type
        },
        validate,
        onSubmit: values => {
            // Display form values on submission (can be removed in production)
            alert(JSON.stringify(values, null, 2));
            // Post form data to server
            axios.post('http://localhost:1234/user', values)
                .then(result => console.log("Success")) // Handle success response
                .catch(err => console.error(err)); // Handle error
        },
    });

    return (
        <div className="form-container">
            <h1>{title}</h1>
            <form onSubmit={formik.handleSubmit}>
                {/* Name input field */}
                <label htmlFor='name' className='form-label'>Name</label>
                {formik.touched.name && formik.errors.name ? <p className='error-message'>{formik.errors.name}</p> : null}
                <input 
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    type='text' id='name' name='name'
                    className='form-input'
                />

                {/* Country code select field */}
                <label htmlFor='countryCode' className='form-label'>Country code</label>
                {formik.touched.countryCode && formik.errors.countryCode ? <p className='error-message'>{formik.errors.countryCode}</p> : null}
                <select 
                    onChange={formik.handleChange}
                    value={formik.values.countryCode}
                    id='countryCode' name='countryCode'
                    className='form-input'
                >
                    <option value="" disabled>Select Country Code</option>
                    <option value="+91">+91 (India)</option>
                    <option value="+1">+1 (USA)</option>
                    <option value="+44">+44 (UK)</option>
                </select>

                {/* Phone number input field */}
                <label htmlFor='phoneNumber' className='form-label'>Phone number</label>
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? <p className='error-message'>{formik.errors.phoneNumber}</p> : null}
                <input 
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                    type='text' id='phoneNumber' name='phoneNumber'
                    className='form-input'
                />

                {/* Submit button */}
                <button type="submit" className='submit-button'>Submit</button>
            </form>

            {/* Link to navigate back */}
            <hr/>
            <div onClick={() => navigate(-1)} className='go-back'>
                Home Page
            </div>
        </div>
    );
}
