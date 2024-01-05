import toast from 'react-hot-toast';

// validate login page username
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    return errors;
}

// validate password

export async function passwordValidate(values){
    const errors = passwordVerify({}, values)

    return errors;
}

// validate reset password
export async function resetPasswordValidation(values){
    const errors = passwordVerify([], values);

    if(values.password != values.confirm_password){
        errors.exist = toast.error("Passwords do not match");
    }
}

// validate register form 
export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors

}

// validate profile page
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}

// validate password
function passwordVerify(errors = [], values){

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;


    if(!values.password){
        errors.password = toast.error("Password Required");
    }else if(values.password.includes(" ")){
        errors.password = toast.error("White space is to eliminated");
    }else if(values.password.length < 6){
        errors.password = toast.error("Password must be longer than 6 characters");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have a special character");
    }

    return errors
}

// validate username
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Username Required!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username');
    }

    return error;
}

// validate email 
function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Email requirerd");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong email");
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address");
    }

    return error;
}