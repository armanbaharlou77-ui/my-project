import React, { useEffect, useState } from 'react'
import TopBar from './../Components/TopBar'
import NavBar from './../Components/NavBar'
import Footer from '../Components/Footer'
import BreadCrumb from '../Components/BreadCrumb'
import CourseDetailBox from '../Components/CourseDetailBox'
import Accordion from '../Components/Accordion'
import CommentBox from '../Components/CommentBox'
import Comments from '../Components/Comments'
import { useParams } from 'react-router-dom'


export default function CourseInfo() {

  const { courseName } = useParams()

  const [comments, setComments] = useState([])

  const [sessions, setSessions] = useState([])

  const [categoryID, setCategoryID] = useState()

  const [courseDetail, setCourseDetail] = useState({})

  const [createdAt, setCreatedAt] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')
  const [creatorName, setCreatorName] = useState('')



  const submitComment = (commentBody, rating) => {
    if (rating !== 0 && commentBody !== '') {
      const localStorageData = JSON.parse(localStorage.getItem('user'))

      fetch('http://localhost:4000/v1/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorageData.token}`
        },
        body: JSON.stringify({
          body: commentBody,
          courseShortName: courseName,
          score: rating
        })
      })
        .then(res => res.json())
        .then(result => {
          swal({
            title: "نظر شما با موفقیت ثبت شد",
            button: 'بستن',
            icon: "success",
            dangerMode: false,
          }).then(() => {
            window.location.reload()
          })
        })

    } else {
      alert('لطفا امتیاز یا نظر خود را وارد کنید')
    }

  }

  


  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorageData === null ? null : localStorageData.token
          }`
      }
    })
      .then(res => res.json())
      .then(courseInfo => {
        setComments(courseInfo.comments || [])
        setSessions(courseInfo.sessions || [])
        setCategoryID(courseInfo.categoryID || null)
        setCreatedAt(courseInfo.createdAt || '')
        setUpdatedAt(courseInfo.updatedAt || '')
        setCreatorName(courseInfo.creator?.name || '')
        setCourseDetail(courseInfo)
        console.log(courseInfo)
      })
      .catch(err => console.error("fetch error:", err))
      window.scrollTo(0, 0)
  }, [courseName])


  console.log(comments)
  return (
    <div>
      <TopBar />
      <NavBar />
      <BreadCrumb links={[
        { id: 1, title: 'خانه', to: '/' },
        { id: 2, title: 'آموزش برنامه نویسی فرانت اند', to: '/category-info/frontend' },
        { id: 3, title: 'دوره متخصص جاوا اسکریپت', to: '/course-info/js-expert' }
      ]} />

      <section className="py-12 shadow-[0_0_20px_rgba(34,197,94,0.15)] rounded-2xl">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/2 text-right">
              <a href="#" className="text-[1.2rem] text-green-600 bg-green-300/20 rounded px-4 py-1 inline-block">
                برنامه نویسی فرانت اند
              </a>
              <h1 className="text-[2.1rem] font-bold text-gray-800 mt-8 mb-4">
                {courseDetail.name}
              </h1>
              <p className="text-[1.3rem] text-gray-500 mb-12 leading-relaxed">
                {courseDetail.description}
              </p>

              <div className="flex space-x-4 ">
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-all duration-300">
                  <i className="fab fa-telegram-plane text-2xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-all duration-300">
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-all duration-300">
                  <i className="fab fa-facebook-f text-2xl"></i>
                </a>
              </div>
            </div>
            <div className="md:w-2/3">
              <video src="" poster={courseDetail.cover} className="w-full rounded-xl" controls></video>
            </div>

          </div>
        </div>
      </section>
      <main className="main">
        <div className="container mx-auto px-4 mt-8 flex gap-3">
          <div className="w-2/3">
            <div className="flex flex-wrap gap-3">
              <div className="basis-[calc(33.333%-0.5rem)] flex-grow-0 flex-shrink-0">
                <CourseDetailBox title="وضعیت دوره:" desc={courseDetail.isComplete === 1 ? ('اتمام دوره') : ('در حال برگذاری')} icon="graduation-cap" />
              </div>
              <div className="basis-[calc(33.333%-0.5rem)] flex-grow-0 flex-shrink-0">
                <CourseDetailBox title="مدت زمان دوره:" desc="19 ساعت" icon="clock" />
              </div>
              <div className="basis-[calc(33.333%-0.5rem)] flex-grow-0 flex-shrink-0">
                <CourseDetailBox title="بروزرسانی:" desc={updatedAt ? updatedAt.slice(0, 10) : ''} icon="graduation-cap" />
              </div>
              <div className="basis-[calc(33.333%-0.5rem)] flex-grow-0 flex-shrink-0">
                <CourseDetailBox title="روش پشتیبانی:" desc={courseDetail.support} icon="user-alt" />
              </div>
              <div className="basis-[calc(33.333%-0.5rem)] flex-grow-0 flex-shrink-0">
                <CourseDetailBox title="پیش نیاز:" desc="HTML CSS" icon="info-circle" />
              </div>
              <div className="basis-[calc(33.333%-0.5rem)] flex-grow-0 flex-shrink-0">
                <CourseDetailBox title="نوع مشاهده:" desc="ضبط شده / آنلاین" icon="play" />
              </div>
            </div>
            <div className="rounded-2xl my-12 px-8 pt-8 pb-5 bg-[#f0f2f7]">
              <div className="flex items-center mb-6">
                <i className="fas fa-chart-line text-[2.5rem] text-[#7b868a]"></i>
                <span className="mr-6 text-[#7b868a] text-xl">
                  درصد پیشرفت دوره: 100%
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-white overflow-hidden">
                <div
                  className="h-full bg-[#1fbd50] animate-pulse transition-all duration-500"
                  style={{ width: '75%' }}
                  role="progressbar"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>


            <div className="p-12 rounded-lg shadow-[0_0_13px_1px_rgba(70,72,77,0.08)] bg-white">
              <div className="mb-16">
                <span className="text-2xl font-bold block bg-green-600 w-fit px-4 py-2 text-white rounded-xl ">
                  {courseDetail.name}
                </span>
                <img src="/images/info/1.gif" alt="course info image" className="mt-12 block rounded-xl w-full" />
                <p className="mt-8 text-[#7a7a7a] text-xl">
                  کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد و سالانه چندین کتابخانه جدید نیز به این لیست اضافه می شود که در بازار کار به شدت از آن ها استفاده می شود و اگر بدون بلد بودن این کتابخانه ها وارد بازار کار شوید، خیلی اذیت خواهید شد و حتی ممکن است ناامید شوید!
                </p>
                <p className="mt-8 text-[#7a7a7a] text-xl">
                  در این دوره نحوه کار با 20 مورد از پر استفاده ترین کتابخانه های جاوا اسکریپت به صورت پروژه محور به شما عزیزان آموزش داده می شود تا هیچ مشکلی برای ورود به بازار کار نداشته باشید
                </p>
              </div>

              <div className="mb-16">
                <span className="text-2xl font-bold block">
                  هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب درآمد)
                </span>
                <img src="/images/info/2.jpg" alt="course info image" className="mt-12 block rounded-xl w-full" />
                <p className="mt-8 text-[#7a7a7a] text-xl">
                  وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم، از کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در حالی که من اولین بارم بود اسم Formik را می شنیدم و تا اون موقع از این کتابخانه ها استفاده نکرده بودم.
                </p>
                <p className="mt-8 text-[#7a7a7a] text-xl">
                  همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از مهم ترین مباحثی هستند که هر برنامه نویس وب برای ورود به بازار کار و کسب درآمد بهتر، راحت و بیشتر باید با آن ها کار کرده باشد
                </p>
                <p className="mt-8 text-[#7a7a7a] text-xl">
                  همان طور که از اسم این دوره مشخص است، هدف از این دوره آموزش 20 مورد از کاربردی ترین و پر استفاده ترین کتابخانه های جاوا اسکریپت است تا شما بتوانید بعد از این دوره با قدرت و آمادگی بیشتر ادامه مسیر برنامه نویسی وب را ادامه دهید، ری اکت یا نود یا … را راحت تر یاد بگیرید و در نهایت وارد بازار کار شده و کسب درآمد کنید.
                </p>
                <p className="mt-8 text-[#7a7a7a] text-xl">
                  شما به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی کار نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه جدید را یاد بگیرید. فرض کنید یک کتابخانه جدید ساخته شد. آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه.
                </p>
                <p className="mt-8 text-[#7a7a7a] text-xl">
                  در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه، نحوه یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ دوره یا شخص خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و وب اضافه شد، به راحتی بتوانید آن را یاد بگیرید.
                </p>
              </div>

              <div className="mt-16 flex flex-wrap gap-4 mb-10">
                <a href="#" className=" border-2 rounded-lg py-2 px-6 font-bold text-2xl hover:text-green-500 transition">
                  دانلود همگانی ویدیوها
                </a>
                <a href="#" className=" border-2 rounded-lg py-2 px-6 font-bold text-2xl hover:text-green-500 transition">
                  دانلود همگانی پیوست‌ها
                </a>
              </div>

              <Accordion items={sessions} />


            </div>
            <div className="rounded-lg p-8 mt-8 shadow-[0_0_13px_1px_rgba(70,72,77,0.08)] ">
              <div className="flex items-start justify-between">

                <div className="flex items-center">
                  <img
                    src="/images/info/teacher.jfif"
                    alt="Teacher Profile"
                    className="w-[62px] h-auto rounded-full shadow-[2px_2px_20px_#00000021]"
                  />
                  <div className="flex flex-col mr-8">
                    <a href="#" className="no-underline text-[#7b868a]">{creatorName}</a>
                    <span className="text-[#7b868a] text-[1.2rem]">Front End & Back End Developer</span>
                  </div>
                </div>


                <div className="flex items-center text-white bg-green-600 py-2 px-4 rounded-md">
                  <i className="fas fa-chalkboard-teacher text-[1.8rem]"></i>
                  <span className="text-[1.4rem] font-bold mr-2">مدرس</span>
                </div>
              </div>

              <p className="mt-4 text-[#7b868a] text-[1.2rem]">
                اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2 سال با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در زمینه وب فعالیت داشته باشم.و..
              </p>
            </div>
            <Comments comments={comments} />
            <CommentBox submitComment={submitComment} />


          </div>
          <div className="w-1/3">
            <div className="sticky top-8">

              <div className="rounded-md p-8 shadow-[0_0_13px_1px_rgba(70,72,77,0.08)] border border-[#f2f2f2] bg-green-600">
                <span className="flex items-center justify-center text-[1.5rem] font-semibold text-white">
                  <i className="fas fa-graduation-cap  ml-2"></i>
                  {courseDetail.isUserRegisteredToThisCourse ? ('شما دانشجوی دوره هستید') : ('ثبت نام در دوره')}
                </span>
              </div>


              <div className="rounded-md mt-4 p-8 shadow-[0_0_13px_1px_rgba(70,72,77,0.08)] border border-[#f2f2f2]">
                <div className="mb-4 flex items-center text-gray-700">
                  <i className="fas fa-user-graduate text-[1.1rem] ml-2"></i>
                  <span className="text-[1.3rem]">تعداد دانشجو :</span>
                  <span className="mr-2 font-bold">48</span>
                </div>
                <div className="flex justify-between text-gray-700 text-[1.2rem]">
                  <div className="flex items-center">
                    <i className="far fa-comments ml-2"></i>
                    <span>{comments.length} دیدگاه</span>
                  </div>
                  <div className="flex items-center">
                    <i className="far fa-eye ml-2"></i>
                    <span>14,234 بازدید</span>
                  </div>
                </div>
              </div>


              <div className="rounded-md mt-4 p-8 shadow-[0_0_13px_1px_rgba(70,72,77,0.08)] border border-[#f2f2f2]">
                <div className="flex items-center mb-2 text-gray-700">
                  <i className="fas fa-link text-[1.1rem] ml-2"></i>
                  <span className="text-[1.4rem] font-semibold">لینک کوتاه</span>
                </div>
                <span className="text-[1.3rem] text-gray-600 break-words">https://sabzlearn.ir/?p=117472</span>
              </div>


              <div className="rounded-md mt-4 p-8 shadow-[0_0_13px_1px_rgba(70,72,77,0.08)] border border-[#f2f2f2]">
                <span className="block text-[1.4rem] text-[var(--dark-color)] font-semibold mb-2">سرفصل های دوره</span>
                <span className="text-[1.3rem] text-[#7d7e7f]">
                  برای مشاهده و یا دانلود دوره روی کلمه
                  <a href="#" className="text-blue-600 font-bold"> لینک  </a>
                  کلیک کنید
                </span>
              </div>


              <div className="rounded-md mt-4 p-8 shadow-[0_0_13px_1px_rgba(70,72,77,0.08)] border border-[#f2f2f2]">
                <span className="block text-[1.8rem] text-[var(--dark-color)] font-semibold mb-6">دوره های مرتبط</span>
                <ul>
                  <li className="mb-8">
                    <a href="#" className="flex gap-3  items-center">
                      <img src="/images/courses/js_project.png" alt="Course Cover" className="w-[100px] rounded-md" />
                      <span className="text-[1.3rem] font-bold text-[#8d8d8d] mr-2">پروژه های تخصصی با جاوا اسکریپت</span>
                    </a>
                  </li>
                  <li className="mb-8">
                    <a href="#" className="flex gap-3 items-center">
                      <img src="/images/courses/fareelancer.png" alt="Course Cover" className="w-[100px] rounded-md" />
                      <span className="text-[1.3rem] font-bold text-[#8d8d8d] mr-2">تعیین قیمت پروژه های فریلنسری</span>
                    </a>
                  </li>
                  <li className="mb-8">
                    <a href="#" className="flex gap-3  items-center">
                      <img src="/images/courses/nodejs.png" alt="Course Cover" className="w-[100px] rounded-md" />
                      <span className="text-[1.3rem] font-bold text-[#8d8d8d] mr-2">دوره Api نویسی</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex gap-3  items-center">
                      <img src="/images/courses/jango.png" alt="Course Cover" className="w-[100px] rounded-md" />
                      <span className="text-[1.3rem] font-bold text-[#8d8d8d] mr-2">متخصص جنگو</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>


        </div>


      </main>

      <Footer />
    </div>
  )
}
