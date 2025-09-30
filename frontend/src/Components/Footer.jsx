import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {

    const onClickHandler = () => {
        
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return (
        <footer className="my-16">
            <div className="container mx-auto px-4">
                <div className="bg-[#f0f2f7] rounded-2xl p-16 relative mb-20 border-green-400 border-b-4">

                    <div className="absolute inset-x-0 bottom-[-1.5rem] mx-auto w-[50rem] h-16 bg-primary z-[-1] rounded-full"></div>

                    <div className="flex flex-wrap -mx-4">

                        <div className="w-full md:w-1/3 px-4 mb-10 md:mb-0">
                            <div>
                                <span className="block text-[1.7rem] font-bold mb-8 relative text-[#2bce56]">
                                    درباره ما
                                    <span className="absolute w-14 h-14 bg-primary opacity-30 rotate-45 rounded-lg right-4 top-1/2 transform -translate-y-1/2"></span>
                                </span>
                                <p className="text-[#7d7e7f] leading-relaxed text-lg">
                                    وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که در فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل قبول بود که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی و فنی قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم! و خب امروز آکادمی آموزش برنامه نویسی سبزلرن به عنوان یک آکادمی خصوصی فعالیت میکنه و این به این معنی هست که هر مدرسی اجازه تدریس در اون رو نداره و باید از فیلترینگ های خاص آکادمی سبزلرن رد شه! این به این معنی هست که ما برامون فن بیان و نحوه تعامل مدرس با دانشجو بسیار مهمه! ما در آکادمی سبزلرن تضمین پشتیبانی خوب و با کیفیت رو به شما میدیم . چرا که مدرسین وب سایت سبزلرن حتی برای پشتیبانی دوره های رایگان شون هم هزینه دریافت میکنند و متعهد هستند که هوای کاربر های عزیز رو داشته باشند
                                </p>
                            </div>
                        </div>


                        <div className="w-full md:w-1/3 px-4 mb-10 md:mb-0">
                            <div>
                                <span className="block text-[1.7rem] font-bold mb-8 relative text-[#2bce56]">
                                    آخرین مطالب
                                    <span className="absolute w-14 h-14 bg-primary opacity-30 rotate-45 rounded-lg right-4 top-1/2 transform -translate-y-1/2"></span>
                                </span>
                                <div className="flex flex-col space-y-4">
                                    <a href="#" className="block text-gray-800 hover:text-primary transition text-lg">
                                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                                    </a>
                                    <a href="#" className="block text-gray-800 hover:text-primary transition text-lg">
                                        چگونه پایتون را آپدیت کنیم؟ | آموزش صفر تا صد آپدیت کردن پایتون
                                    </a>
                                    <a href="#" className="block text-gray-800 hover:text-primary transition text-lg">
                                        آموزش نصب پایتون در مک، ویندوز و لینوکس | گام به گام و تصویری
                                    </a>
                                    <a href="#" className="block text-gray-800 hover:text-primary transition text-lg">
                                        بهترین فریم ورک های فرانت اند | 16 فریم ورک Front end بررسی معایب و مزایا
                                    </a>
                                    <a href="#" className="block text-gray-800 hover:text-primary transition text-lg">
                                        معرفی بهترین سایت آموزش جاوا اسکریپت + آموزش رایگان
                                    </a>
                                </div>
                            </div>
                        </div>


                        <div className="w-full md:w-1/3 px-4">
                            <div>
                                <span className="block text-[1.7rem] font-bold mb-8 relative text-[#2bce56]">
                                    دسترسی سریع
                                    <span className="absolute w-14 h-14 bg-primary opacity-30 rotate-45 rounded-lg right-4 top-1/2 transform -translate-y-1/2"></span>
                                </span>
                                <div className="flex flex-wrap">
                                    <div className="w-1/2 mb-4">
                                        <a href="#" className="block text-lg text-gray-800 hover:text-primary transition">
                                            آموزش HTML
                                        </a>
                                    </div>
                                    <div className="w-1/2 mb-4">
                                        <a href="#" className="block text-lg text-gray-800 hover:text-primary transition">
                                            آموزش CSS
                                        </a>
                                    </div>
                                    <div className="w-1/2 mb-4">
                                        <a href="#" className="block text-lg text-gray-800 hover:text-primary transition">
                                            آموزش جاوا اسکریپت
                                        </a>
                                    </div>
                                    <div className="w-1/2 mb-4">
                                        <a href="#" className="block text-lg text-gray-800 hover:text-primary transition">
                                            آموزش بوت استرپ
                                        </a>
                                    </div>
                                    <div className="w-1/2 mb-4">
                                        <a href="#" className="block text-lg text-gray-800 hover:text-primary transition">
                                            آموزش ریکت
                                        </a>
                                    </div>
                                    <div className="w-1/2 mb-4">
                                        <a href="#" className="block text-lg  text-gray-800 hover:text-primary transition">
                                            آموزش پایتون
                                        </a>
                                    </div>
                                    <div className="w-1/2 mb-4">
                                        <Link to={'/contact'} className="block text-lg  text-gray-800 hover:text-primary transition" onClick={onClickHandler}>
                                            ارتباط با ما
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="bg-[#2bce56] py-5 flex items-center justify-center shadow-lg rounded-xl">
                    <p className="text-white font-bold"> کلیه حقوق برای آکادمی آموزش برنامه نویسی سبز لرن محفوظ است.</p>
                </div>

            </div>
        </footer>
    )
}
