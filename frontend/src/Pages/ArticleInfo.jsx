import React, { useEffect, useState } from 'react'
import Topbar from '../Components/TopBar'
import Navbar from '../Components/NavBar'
import Footer from '../Components/Footer'
import BreadCrumb from '../Components/BreadCrumb'
import CommentBox from '../Components/CommentBox'
import Accordion from '../Components/Accordion'
import { useParams } from 'react-router-dom'



export default function ArticleInfo() {
  const { articleName } = useParams()
  const [articleCategoryId, setArticleCategoryId] = useState({})
  const [articleCreator, setArticleCreator] = useState({})
  const [articleCreatedAt, setarticleCreatedAt] = useState('')
  const [articleTitle, setarticleTitle] = useState('')
  const [mainArticle, setMainArticle] = useState('')





  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles/${articleName}`)
      .then(res => res.json())
      .then(article => {
        console.log(article)
        setArticleCategoryId(article.categoryID)
        setArticleCreator(article.creator)
        setarticleCreatedAt(article.createdAt)
        setarticleTitle(article.title)
        setMainArticle(article)
      })
  }, [])



  return (
    <div>
      <Topbar />
      <Navbar />
      <BreadCrumb links={[
        { id: 1, title: 'خانه', to: '/' },
        { id: 2, title: 'مقاله ها', to: '/category-info/frontend' },
        { id: 3, title: 'React vs Vue', to: '/course-info/js-expert' }
      ]} />

      <main class="main">
        <div className="container mx-auto px-4 mt-8 flex gap-3">
          <div className="w-2/3">

            <div class="p-10 rounded-md shadow-[0_5px_30px_rgba(70,72,77,0.08)] bg-white">
              <h1 class="text-[2.5rem] font-bold text-gray-800 border-b-2 border-gray-100 pb-4">
                {articleTitle}
              </h1>

              <div class="flex items-center pt-4 flex-wrap gap-5 text-[0.9rem] text-gray-500 mt-2">
                <div class="flex items-center gap-2 rtl:space-x-reverse">
                  <i class="far fa-folder text-[1.7rem] text-gray-400"></i>
                  <a href="#">{articleCategoryId.title}</a>
                </div>
                <div class="flex items-center gap-2 rtl:space-x-reverse">
                  <i class="far fa-user text-[1.7rem] text-gray-400"></i>
                  <span>ارسال شده توسط

                    {' '}

                    {
                      articleCreator.name
                    }

                  </span>
                </div>
                <div class="flex items-center gap-2 rtl:space-x-reverse">
                  <i class="far fa-clock text-[1.7rem] text-gray-400"></i>
                  <span>{articleCreatedAt.slice(0, 10)}</span>
                </div>
                <div class="flex items-center gap-2 rtl:space-x-reverse">
                  <i class="far fa-eye text-[1.7rem] text-gray-400"></i>
                  <span>2.14k بازدید</span>
                </div>
              </div>

              <img src={mainArticle.cover} alt="Article Cover" class="mt-16 w-full rounded-md" />

              <div class="flex items-center my-8">
                <div class="flex">
                  <img src={"/images/svgs/star_fill.svg"} class="-ml-1" />
                  <img src="/images/svgs/star_fill.svg" class="-ml-1" />
                  <img src="/images/svgs/star_fill.svg" class="-ml-1" />
                  <img src="/images/svgs/star_fill.svg" class="-ml-1" />
                  <img src="/images/svgs/star.svg" class="-ml-1" />
                </div>
                <span class="text-[1.7rem] text-gray-600 mr-8">4.2/5 - (5 امتیاز)</span>
              </div>

              <p class="leading-relaxed text-gray-700 text-[1.3rem]">
                {mainArticle.body}
              </p>

              <div class="bg-gray-100 rounded-full px-12 py-8 my-12">
                <span class="block text-[1.5rem] font-bold text-gray-800 mb-2">آنچه در این مقاله خواهید خواند:</span>
                <ul class="space-y-2">
                  <li><a href="#" class="text-[1.4rem] text-green-600 hover:underline">معرفی بهترین سایت ‌های آموزش جاوا اسکریپت</a></li>
                  <li><a href="#" class="text-[1.4rem] text-green-600 hover:underline">یک راه آسان‌تر، دوره‌ های جاوا اسکریپت آکادمی سبزلرن!</a></li>
                  <li><a href="#" class="text-[1.4rem] text-green-600 hover:underline">ثبت نام در دوره‌ های جاوا اسکریپت سبزلرن</a></li>
                </ul>
              </div>

              <img src="/images/blog/2.jpg" alt="Article Image" class="mx-auto rounded-md" />


              <div class="my-20">
                <h2 class="text-[2rem] text-green-600 font-bold leading-tight">
                  معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                </h2>
                <p class="my-8 text-[1.4rem] leading-12 text-[#7d7e7f]">
                  توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان و به زبان فارسی این زبان را یاد بگیرید
                </p>
                <img src="/images/blog/4.png" alt="article body img" class="mx-auto rounded-md" />
              </div>


              <div class="my-20">
                <h2 class="text-[2rem] text-green-600 font-bold leading-tight">
                  معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                </h2>
                <p class="my-8 text-[1.4rem] leading-12 text-[#7d7e7f]">
                  توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان و به زبان فارسی این زبان را یاد بگیری
                </p>
              </div>


              <div class="my-20">
                <h2 class="text-[2rem] text-green-600 font-bold leading-tight">
                  معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                </h2>
                <p class="my-8 text-[1.4rem] leading-12 text-[#7d7e7f]">
                  توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان و به زبان فارسی این زبان را یاد بگیری.
                </p>
                <img src="/images/blog/3.jpg" alt="article body img" class="mx-auto rounded-md" />
              </div>

              <div class="flex items-center gap-4 rtl:space-x-reverse">
                <span class="text-[1.5rem] text-gray-600">اشتراک گذاری :</span>
                <a href="#" class="text-gray-500 hover:text-green-500"><i class="fab fa-telegram-plane"></i></a>
                <a href="#" class="text-gray-500 hover:text-green-500"><i class="fab fa-twitter"></i></a>
                <a href="#" class="text-gray-500 hover:text-green-500"><i class="fab fa-facebook-f"></i></a>
              </div>
            </div>
            <div class="my-8 px-10 py-14 rounded-lg bg-[#f0f2f7]">
              <div class="flex flex-wrap -mx-3">

                <div class="w-full md:w-1/2 px-3 relative">
                  <div class="flex items-center">
                    <a href="#" class="text-[#adb5db]">
                      <i class="fas fa-arrow-right"></i>
                    </a>
                    <a href="#" class="mx-8 text-center">
                      سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ | تجربه برنامه نویسان
                    </a>
                  </div>
                  <div class="absolute -top-8 left-8 text-[#adb5db] font-bold text-[1.8rem] rotate-180">
                    قدیمی تر
                  </div>
                </div>


                <div class="w-full md:w-1/2 px-3 relative">
                  <div class="flex flex-row-reverse items-center">
                    <a href="#" class="text-[#adb5db]">
                      <i class="fas fa-arrow-left"></i>
                    </a>
                    <a href="#" class="mx-8 text-center">
                      سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ | تجربه برنامه نویسان
                    </a>
                  </div>
                  <div class="absolute -top-8 right-8 text-[#adb5db] text-[1.5rem] font-normal">
                    جدید تر
                  </div>
                </div>
              </div>
            </div>

            <CommentBox />

          </div>

        </div>


      </main>

      <Footer />
    </div>
  )
}


