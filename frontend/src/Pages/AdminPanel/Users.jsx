import React, { useEffect, useState } from 'react'
import DataTable from './DataTable'
import swal from 'sweetalert'

export default function Users() {

    const [formData, setFormData] = useState({

        fullName: '',
        username: '',
        email: '',
        phone: '',
        password: '',


    });

    const [users, setUsers] = useState([])


    useEffect(() => {

        refreshUsers()

    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const refreshUsers = () => {

        const localStorageData = JSON.parse(localStorage.getItem('user'))

        fetch('http://localhost:4000/v1/users', {
            headers: {
                'Authorization': `Bearer ${localStorageData.token}`
            }
        }).then(res => res.json())
            .then(data => {

                setUsers(data)
            })
    }

    const removeUser = (userID) => {
        swal({
            title: 'آیا از حذف مطمئنید؟',
            icon: 'warning',
            buttons: ['خیر', 'بله']
        }).then(res => {

            const localStorageData = JSON.parse(localStorage.getItem('user'))

            if (res) {
                fetch(`http://localhost:4000/v1/users/${userID}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorageData.token}`
                    }
                }, []).then(res => res.json())
                    .then(result => {
                        console.log(result);

                        swal({
                            title: 'حذف با موفقیت انجام شد',
                            icon: 'success',
                            buttons: 'تایید'
                        }).then(() => refreshUsers())
                    })
            }
        })


    }

    const registerNewUser = (event) => {

        event.preventDefault()

        if (formData.fullName === '' || formData.username === '' || formData.email === '' || formData.phone === '' || formData.password === '') {
            alert('همه اطلاعات را وارد کنید')
        } else {
            const newUserInfo = {
                name: formData.fullName,
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                confirmPassword: formData.password
            }

            fetch(`http://localhost:4000/v1/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserInfo)
            }).then(res => {
                res.json()
                console.log(res)
            })
                .then(result => {

                    swal({
                        title: 'افزودن کاربر با موفقیت انجام شد',
                        icon: 'success',
                        buttons: 'تایید'
                    })
                    refreshUsers()

                })
        }

    }

    const banUser = (userID) => {
        swal({
            title: 'آیا از مسدود کردن مطمئنید؟',
            icon: 'warning',
            buttons: ['خیر', 'بله']
        }).then(res => {

            const localStorageData = JSON.parse(localStorage.getItem('user'))

            if (res) {
                fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorageData.token}`
                    }
                }, []).then(res => res.json())
                    .then(result => {

                        console.log(result);

                        swal({
                            title: 'مسدود شدن با موفقیت انجام شد',
                            icon: 'success',
                            buttons: 'تایید'
                        })
                    })
            }
        })

    }


    return (
        <div className='flex flex-col'>

            <div className=" mb-10 shadow-md rounded-md p-5  w-full">
                {/* دکمه بازگشت */}
                <div className="back-btn px-4 mb-4">
                    <i className="fas fa-arrow-right cursor-pointer"></i>
                </div>

                {/* فرم */}
                <form className="form flex flex-wrap">
                    {/* نام و نام خانوادگی */}
                    <div className="w-full md:w-1/2 px-3 mb-4">
                        <div className="input">
                            <label className="input-title text-lg font-bold">نام و نام خانوادگی</label>
                            <input
                                type="text"
                                id="name"
                                name='fullName'
                                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
                                className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm focus:border-blue-400 focus:shadow-md transition"
                                onChange={handleChange}
                            />
                            <span className="error-message text-red-500 text-sm"></span>
                        </div>
                    </div>

                    {/* نام کاربری */}
                    <div className="w-full md:w-1/2 px-3 mb-4">
                        <div className="input">
                            <label className="input-title text-lg font-bold">نام کاربری</label>
                            <input
                                type="text"
                                id="username"
                                name='username'
                                placeholder="لطفا نام کاربری را وارد کنید..."
                                className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm focus:border-blue-400 focus:shadow-md transition"
                                onChange={handleChange}
                            />
                            <span className="error-message text-red-500 text-sm"></span>
                        </div>
                    </div>

                    {/* ایمیل */}
                    <div className="w-full md:w-1/2 px-3 mb-4">
                        <div className="input">
                            <label className="input-title text-lg font-bold">ایمیل</label>
                            <input
                                type="text"
                                id="email"
                                name='email'
                                placeholder="لطفا ایمیل کاربر را وارد کنید..."
                                className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm focus:border-blue-400 focus:shadow-md transition"
                                onChange={handleChange}
                            />
                            <span className="error-message text-red-500 text-sm"></span>
                        </div>
                    </div>

                    {/* رمز عبور */}
                    <div className="w-full md:w-1/2 px-3 mb-4">
                        <div className="input">
                            <label className="input-title text-lg font-bold">رمز عبور</label>
                            <input
                                type="password"
                                id="password"
                                name='password'
                                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
                                className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm focus:border-blue-400 focus:shadow-md transition"
                                onChange={handleChange}
                            />
                            <span className="error-message text-red-500 text-sm"></span>
                        </div>
                    </div>

                    {/* شماره تلفن */}
                    <div className="w-full md:w-1/2 px-3 mb-4">
                        <div className="input">
                            <label className="input-title text-lg font-bold">شماره تلفن</label>
                            <input
                                type="text"
                                id="phone"
                                name='phone'
                                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
                                className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm focus:border-blue-400 focus:shadow-md transition"
                                onChange={handleChange}
                            />
                            <span className="error-message text-red-500 text-sm"></span>
                        </div>
                    </div>

                    {/* دکمه ثبت */}
                    <div className="w-full flex justify-end items-center px-3 mt-4">
                        <input
                            type="submit"
                            value="افزودن"
                            onClick={registerNewUser}
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
                        />
                    </div>
                </form>
            </div>
            <div>

                <DataTable title={'کاربران'}>
                    <table className=" border border-gray-200 rounded-md overflow-hidden" >
                        <thead className="bg-gray-1">
                            <tr>
                                <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">شناسه</th>
                                <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">نام</th>

                                <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">شماره</th>
                                <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">ایمیل</th>
                                <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">رمز عبور</th>
                                <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">ویرایش</th>
                                <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">حذف</th>
                                <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">مسدود</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => (
                                    <tr className="border-t" key={user._id}>
                                        <td className="px-4 py-4 text-center text-[1.1rem]">{index + 1}</td>
                                        <td className="px-4 py-4 text-center text-[1.1rem]">{user.name}</td>

                                        <td className="px-4 py-4 text-center text-[1.1rem]">{user.phone}</td>
                                        <td className="px-4 py-4 text-center text-[1.1rem]">{user.email}</td>
                                        <td className="px-4 py-4 text-center text-[1.1rem]">{user.password}</td>
                                        <td className=" text-center">
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white text-[1.1rem] px-3 py-1 rounded-md transition">
                                                ویرایش
                                            </button>
                                        </td>
                                        <td className=" text-center" >
                                            <button className="bg-red-600 hover:bg-red-700 text-white text-[1.1rem] px-3 py-1 rounded-md transition" onClick={() => removeUser(user._id)}>
                                                حذف
                                            </button>
                                        </td>
                                        <td className=" text-center">
                                            <button className="bg-orange-400 hover:bg-orange-500 text-white text-[1.1rem] px-3 py-1 rounded-md transition" onClick={() => banUser(user._id)}>
                                                مسدود
                                            </button>
                                        </td>
                                    </tr>

                                ))
                            }
                        </tbody>
                    </table>

                </DataTable>
            </div>
        </div>
    )
}
