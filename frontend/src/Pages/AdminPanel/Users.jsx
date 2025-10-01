import React, { useEffect, useState } from 'react'
import DataTable from './DataTable'
import swal from 'sweetalert'

export default function Users() {

    const [users, setUsers] = useState([])


    useEffect(() => {

        refreshUsers()

    }, [])


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
                        }).then(res => refreshUsers())
                    })
            }
        })


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
        <DataTable title={'کاربران'}>
            <table className=" min-w-full border border-gray-200 rounded-md overflow-hidden" >
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-center text-sm font-lalezar text-gray-600">شناسه</th>
                        <th className="px-4 py-2 text-center text-sm font-lalezar text-gray-600">نام</th>

                        <th className="px-4 py-2 text-center text-sm font-lalezar text-gray-600">شماره</th>
                        <th className="px-4 py-2 text-center text-sm font-lalezar text-gray-600">ایمیل</th>
                        <th className="px-4 py-2 text-center text-sm font-lalezar text-gray-600">رمز عبور</th>
                        <th className="px-4 py-2 text-center text-sm font-lalezar text-gray-600">ویرایش</th>
                        <th className="px-4 py-2 text-center text-sm font-lalezar text-gray-600">حذف</th>
                        <th className="px-4 py-2 text-center text-sm font-lalezar text-gray-600">مسدود</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => (
                            <tr className="border-t" key={user._id}>
                                <td className="px-4 py-2 text-center text-sm">{index + 1}</td>
                                <td className="px-4 py-2 text-center text-sm">{user.name}</td>

                                <td className="px-4 py-2 text-center text-sm">{user.phone}</td>
                                <td className="px-4 py-2 text-center text-sm">{user.email}</td>
                                <td className="px-4 py-2 text-center text-sm">{user.password}</td>
                                <td className="px-4 py-2 text-center">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-[1.1rem] px-3 py-1 rounded-md transition">
                                        ویرایش
                                    </button>
                                </td>
                                <td className="px-4 py-2 text-center" >
                                    <button className="bg-red-600 hover:bg-red-700 text-white text-[1.1rem] px-3 py-1 rounded-md transition" onClick={() => removeUser(user._id)}>
                                        حذف
                                    </button>
                                </td>
                                <td className="px-4 py-2 text-center">
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
    )
}
