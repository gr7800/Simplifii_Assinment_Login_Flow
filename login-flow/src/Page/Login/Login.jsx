import React, { useEffect, useState } from 'react';
import side_login from "../../Utills/image/side_login.svg";
import logo from "../../Utills/image/logo.png";
import InputBoxDropDown from '../../Component/DropDown/InputBoxDropDown';
import { countryList, salutationLst } from '../../Utills/data/data';
import CustomButton from '../../Component/Button/Button';
import { GetOtp, LoginUser, RegisterUser, ResendOtp } from '../../redux/Auth/auth.action';
import { toast } from 'react-toastify';
import { LOGIN_SUCCESS } from '../../redux/Auth/auth.type';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [formError, setFormError] = useState({
        email: "",
        otp: ""
    });
    const [buttontitle, setButtonTitle] = useState("Get OTP on email");
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState("")
    const [timer, setTimer] = useState(0); // Timer countdown
    const isAuth = useSelector((store) => store.auth.isAuth);
    console.log(isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(intervalId); // Cleanup on unmount
        }
    }, [timer]);

    const validateForm = (temp) => {
        let isValid = true;
        let errors = { ...formError };

        if (!email) {
            errors.email = "Email is required!";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email address is invalid!";
            isValid = false;
        } else {
            errors.email = "";
        }

        if (!temp && buttontitle === "Submit" && !otp) {
            errors.otp = "OTP is required!";
            isValid = false;
        } else if (!temp && buttontitle === "Submit" && otp.length != 6) {
            errors.otp = "Only 6 digit Otp is required!";
            isValid = false;
        } else {
            errors.otp = "";
        }

        setFormError(errors);
        console.log(errors);
        return isValid;
    };

    const handleInputChange = (value, field) => {
        console.log(field, typeof value, value);
        setFormError(prevState => ({ ...prevState, [field]: value ? "" : "This field is required" }));
        switch (field) {
            case 'email':
                setEmail(value);
                break;
            case 'otp':
                setOtp(value);
            default:
                break;
        }
    };

    const handleresendOtp = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (validateForm(true)) {
            // Perform the form submission logic
            if (buttontitle === "Submit") {
                let res = await ResendOtp({ "email": email });
                console.log(res.message)
                if (res?.message) {
                    toast.success(res?.message);
                }
                if (res?.message === "OTP sent to email successfully!") {
                    setButtonTitle("Submit");
                    setTimer(60); // Start 1-minute timer
                }
            }
        } else {
            console.log("Form has errors");
        }
        setIsLoading(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        setIsLoading(true);
        if (validateForm(false)) {
            // Perform the form submission logic
            if (buttontitle === "Get OTP on email") {
                let res = await ResendOtp({ "email": email });
                console.log(res.message)
                if (res?.message) {
                    toast.success(res?.message);
                }
                if (res?.message === "OTP sent to email successfully!") {
                    setButtonTitle("Submit");
                    setTimer(60); // Start 1-minute timer
                }
            }
            if (buttontitle === "Submit") {
                let res = await LoginUser({ "email": email, "otp": otp });
                console.log(res)
                if (res?.message) {
                    toast.success(res?.message);
                }
                if (res?.token) {
                    setButtonTitle("Get OTP on email");
                    dispatch({ type: LOGIN_SUCCESS, payload: res });
                }
            }
        } else {
            console.log("Form has errors");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (isAuth) {
            navigate("/");
        }
    }, [isAuth, navigate]);

    return (
        <div className="flex flex-row lg:flex-row min-h-screen">
            {/* Left Side */}
            <div className="w-full flex items-center justify-center max-lg:hidden lg:max-w-[952]">
                <img src={side_login} alt="sidepage" className="object-cover h-full w-full" />
            </div>

            {/* Right Side */}
            <div className="w-full flex justify-center place-self-auto p-5">
                <div className="w-full max-w-md">
                    <div className="mb-6 text-center">
                        <img src={logo} alt="logo" className="mx-auto" width={"100px"} height={"50px"} />
                        <p className="text-[18px] m-4 font-montserrat font-medium text-[#000000DE]">Login to Dashboard</p>
                    </div>
                    <form className="space-y-4 space-x-auto" onSubmit={handleSubmit}>
                        <div className="flex flex-row space-x-4">
                            <InputBoxDropDown
                                name={"email"}
                                type={"inputbox"}
                                title={"Email*"}
                                value={email}
                                setValue={handleInputChange}
                                error={formError.email}
                            />
                        </div>

                        {buttontitle === "Submit" && (
                            <div className="flex flex-row space-x-4">
                                <InputBoxDropDown
                                    name={"otp"}
                                    type={"inputbox"}
                                    title={"Otp*"}
                                    value={otp}
                                    setValue={handleInputChange}
                                    error={formError.otp}
                                />
                            </div>
                        )}
                        {(buttontitle === "Submit" && timer >= 0) && (
                            <div className="text-center flex justify-end items-end">
                                {
                                    timer === 0 ?
                                        <p className="text-orange-500 text-sm font-medium px-2 cursor-pointer" onClick={handleresendOtp}>Resent Otp</p> :
                                        <p className="text-orange-500 text-sm font-medium px-2">Timer: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
                                }
                            </div>
                        )}

                        <CustomButton title={buttontitle} type={"submit"} handleClick={handleSubmit} loading={isLoading} disable={isLoading} />
                    </form>

                    <div className="flex justify-center items-center mt-4">
                        <p className="flex text-[16px] gap-1 m-4 text-center font-normal text-[#000000DE]">
                            Don't have an account?
                            <Link to="/register" className="text-blue-500 cursor-pointer text-[16px] font-normal">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
