import React, { useEffect, useState } from 'react'
import DataTable from './DataTable'

export default function Contacts() {
    const [allContacts, setAllContacts] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/v1/contact`)
            .then(res => res.json())
            .then(contacts => {
                console.log(contacts)
                setAllContacts(contacts)
            })
    }, [])
    return (
        <div>
            <DataTable title={'پیام ها'}>
                <table className=" border border-gray-200 rounded-md overflow-hidden" >
                    <thead className="bg-gray-1">
                        <tr>
                            <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">شناسه</th>
                            <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">نام</th>
                            <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">شماره</th>
                            <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">ایمیل</th>
                            <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">پیام</th>
                            <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">ویرایش</th>
                            <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">حذف</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            allContacts.map((contact, index) => (
                                <tr className="border-t" key={contact._id}>
                                    <td className="px-4 py-4 text-center text-[1.1rem]">{index + 1}</td>
                                    <td className="px-4 py-4 text-center text-[1.1rem]">{contact.name}</td>

                                    <td className="px-4 py-4 text-center text-[1.1rem]">{contact.phone}</td>
                                    <td className="px-4 py-4 text-center text-[1.1rem]">{contact.email}</td>
                                    
                                    
                                    <td className=" text-center">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-[1.1rem] px-3 py-1 rounded-md transition">
                                            نمایش 
                                        </button>
                                    </td>
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
                                    
                                </tr>

                            ))
                        }
                    </tbody>
                </table>
            </DataTable>
        </div>
    )
}
