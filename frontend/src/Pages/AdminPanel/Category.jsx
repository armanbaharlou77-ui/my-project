import React, { useEffect, useState } from 'react'
import DataTable from './DataTable'
export default function Category() {
    const [categories, setCategories] = useState([])

    const [formData, setFormData] = useState({

        title: '',
        shortname: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        refreshCategory()
    }, [])

    const refreshCategory = () => {
        fetch(`http://localhost:4000/v1/category`)
            .then(res => res.json())
            .then(allCategories => {
                console.log(allCategories);

                setCategories(allCategories)

            })
    }


    const deleteCategory = (id) => {


        swal({
            title: 'آیا از حذف مطمئنید؟',
            icon: 'warning',
            buttons: ['خیر', 'بله']
        }).then((result) => {
            if (result) {

                const localStorageData = JSON.parse(localStorage.getItem('user'))

                fetch(`http://localhost:4000/v1/category/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorageData.token}`
                    }
                }).then(res => res.json())
                    .then(result => {
                        console.log(result)
                        swal({
                            title: 'حذف با موفقیت انجام شد',
                            icon: 'success',
                            button: 'تایید'
                        }).then(() => refreshCategory())

                    })
            }
        }

        )


    }

    const addCategory = (event) => {
        event.preventDefault()
        if (formData.title === '' || formData.shortname === '') {
            alert('اطلاعات را به درستی وارد کنید')
        } else {
            const localStorageData = JSON.parse(localStorage.getItem('user'))

            const newCategoryInfo = {
                title: formData.title,
                name: formData.shortname
            }
            fetch(`http://localhost:4000/v1/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorageData.token}`
                },
                body: JSON.stringify(newCategoryInfo)
            }).then(res => res.json())
                .then(result => {
                    console.log(result);
                    swal({
                        title: 'دسته بندی با موفقیت اضافه شد',
                        icon: 'success',
                        buttons: 'تایید'
                    }).then(() => refreshCategory())


                })

        }



    }
    return (
        <div>
            <div className=" mb-10 shadow-md rounded-md p-5  w-full">


                {/* فرم */}
                <form className="form flex flex-wrap">
                    {/* نام و نام خانوادگی */}
                    <div className="w-full md:w-1/2 px-3 mb-4">
                        <div className="input">
                            <label className="input-title text-lg font-bold">عنوان دسته بندی</label>
                            <input
                                type="text"
                                id="title"
                                name='title'
                                placeholder="لطفا عنوان را وارد کنید..."
                                className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm focus:border-blue-400 focus:shadow-md transition"
                                onChange={handleChange}
                            />
                            <span className="error-message text-red-500 text-sm"></span>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-4">
                        <div className="input">
                            <label className="input-title text-lg font-bold">نام کوتاه</label>
                            <input
                                type="text"
                                id="shortname"
                                name='shortname'
                                placeholder="لطفا نام کوتاه را وارد کنید..."
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
                            onClick={addCategory}
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
                        />
                    </div>
                </form>
            </div>
            <DataTable title={'دسته بندی ها'}>
                <table className=" border border-gray-200 rounded-md overflow-hidden w-full" >
                    <thead className="bg-gray-1">
                        <tr>
                            <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">شناسه</th>
                            <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">عنوان</th>
                            <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">ویرایش</th>
                            <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((category, index) => (
                                <tr className="border-t border-gray-500" key={category._id}>
                                    <td className="px-4 py-4 text-center text-[1.1rem]">{index + 1}</td>
                                    <td className="px-4 py-4 text-center text-[1.1rem]">{category.title}</td>
                                    <td className="text-center">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-[1.1rem] px-3 py-1 rounded-md transition">
                                            ویرایش
                                        </button>
                                    </td>
                                    <td className="text-center" >
                                        <button className="bg-red-600 hover:bg-red-700 text-white text-[1.1rem] px-3 py-1 rounded-md transition" onClick={() => deleteCategory(category._id)}>
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
