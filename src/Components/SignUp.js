import React , { useEffect , useState } from 'react';
import { validate } from "./validate";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from "./toast"

const SignUp = () => {
    const [ data , setData ] = useState ( {
        name : "" ,
        email : "" ,
        password : "" ,
        confirmPassword : "" ,
        isAccepted : false
    } )
    const [ errors , setErrors ] = useState ( {} )
    const [ touch , setTouch ] = useState ( {} )
    useEffect ( () => {
        setErrors ( validate ( data ) )
        console.log ( errors )
    } , [ data , touch ] )
    const changeHandler = ( event ) => {
        if ( event.target.name === "isAccepted" ) {
            setData ( { ... data , [ event.target.name ] : event.target.checked } )
        } else {
            setData ( { ... data , [ event.target.name ] : event.target.value } )
        }
    }
    const focusHandler = ( event ) => {
        setTouch ( { ... touch , [ event.target.name ] : true } )
    }
    const submitHandler = ( event ) => {
        event.preventDefault ();
        if ( ! Object.keys ( event ).length ){
            notify("You signed up successfully", "success")
        }else {
            notify("Invalid data!", "error")
            setTouch({
                name: true,
                email: true,
                password: true,
                confirmPassword: true,
                isAccepted: true
            })
        }
            }

    return (
        <div>
            <form onSubmit={ submitHandler }>
                <h2>SignUp</h2>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={ data.name } onChange={ changeHandler }
                           onFocus={ focusHandler }/>
                    { errors.name && touch.name && <span>{ errors.name }</span> }
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" value={ data.email } onChange={ changeHandler }
                           onFocus={ focusHandler }/>
                    { errors.email && touch.email && <span>{ errors.email }</span> }
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={ data.password } onChange={ changeHandler }
                           onFocus={ focusHandler }/>
                    { errors.password && touch.password && <span>{ errors.password }</span> }
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" value={ data.confirmPassword }
                           onChange={ changeHandler } onFocus={ focusHandler }/>
                    { errors.confirmPassword && touch.confirmPassword && <span>{ errors.confirmPassword }</span> }
                </div>
                <div>
                    <label>I accept terms of privacy policy</label>
                    <input type="checkbox" name="isAccepted" value={ data.isAccepted } onChange={ changeHandler }/>
                    { errors.isAccepted && touch.isAccepted && <span>{ errors.isAccepted }</span> }
                </div>
                <div>
                    <a href="#">Login</a>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignUp;