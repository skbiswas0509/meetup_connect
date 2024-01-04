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

/*  */

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