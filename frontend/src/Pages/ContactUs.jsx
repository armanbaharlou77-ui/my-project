import React, { useState } from 'react'
import TopBar from '../Components/TopBar'
import Navbar from '../Components/NavBar'
import Footer from '../Components/Footer'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function ContactUs() {
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const [formData, setFormData] = useState({

        fullName: '',
        email: '',
        phone: '',
        opinion: ''

    });

    const submitHandler = (event) => {

        event.preventDefault()

        let newContactInfo = {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            body: formData.opinion

        }

        fetch('http://localhost:4000/v1/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContactInfo)
        })
            .then(res => {
                res.json()
                if (res.ok) {
                    swal({
                        title: "نظر شما با موفقیت ثبت شد",
                        button: 'بستن',
                        icon: "success",
                        dangerMode: false,
                    }).then(value => {
                        navigate('/')
                    })
                }
            })
    }


    const validateFullName = (name) => {
        const re = /^[A-Za-z\s]{6,16}$/; // 6 to 12 characters
        return re.test(name);
    };

    const validateUsername = (name) => {
        const re = /^[a-zA-Z0-9_.]{4,12}$/;
        return re.test(name);
    }

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone) => {
        const re = /^[0-9]{10,15}$/; // only digits, length between 10–15
        return re.test(phone);
    };

    const validateTextarea = (text) => {
        const re = /^[\u0600-\u06FFa-zA-Z0-9\s.,!?;:'"()\-]{5,500}$/;
        return re.test(text);
    };

    return (
        <>
            <TopBar></TopBar>
            <Navbar></Navbar>

            <div className=" flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl my-24">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-green-700 mb-2">ارتباط با ما</h1>
                        <p className="text-gray-600">نظر یا انتقادت رو برامون بنویس :)</p>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="fullName" className="block text-[1.3rem] font-medium text-gray-700 mb-2 text-right">
                                    نام کامل
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-green-600">
                                        <FaUser />
                                    </div>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className={`w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${validateFullName(formData.fullName) && 'border-green-500 ring-green-500'}  outline-none transition text-[1.3rem]`}
                                        placeholder="نام و نام خانوادگی"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-[1.3rem] font-medium text-gray-700 mb-2 text-right">
                                    شماره تلفن
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-green-600">
                                        <FaPhone />
                                    </div>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${validatePhone(formData.phone) && 'ring-green-500 border-green-500'} outline-none transition text-[1.3rem]`}
                                        placeholder="09xxxxxxxxx"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-right text-[1.3rem]">
                                    ایمیل
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-green-600">
                                        <FaEnvelope />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${validateEmail(formData.email) && 'ring-green-500 border-green-500'}  outline-none transition text-[1.3rem]`}
                                        placeholder="example@domain.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="textarea" className="block text-sm font-medium text-gray-700 mb-2 text-right text-[1.3rem]">
                                    ثبت نظر
                                </label>
                                <div className="relative">

                                    <textarea
                                        type="text"
                                        id="opinion"
                                        name="opinion"
                                        value={formData.opinion}
                                        onChange={handleChange}
                                        className={`w-full pr-4 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${validateTextarea(formData.opinion) && 'ring-green-500 border-green-500'} outline-none transition text-[1.3rem]`}
                                        placeholder="نظر خود را وارد کنید"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <button className='w-full bg-green-500 hover:bg-green-600 transition-colors py-2 rounded-lg shadow-md text-[1.5rem] mt-5 text-white' onClick={submitHandler}>ارسال درخواست</button>
                            </div>


                        </div>
                    </form>
                </div>
            </div>

            <Footer></Footer>
        </>
    )
}
