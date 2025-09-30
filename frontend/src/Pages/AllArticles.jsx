import React, { useEffect, useState } from 'react'
import Topbar from '../Components/TopBar'
import Navbar from '../Components/NavBar'
import Footer from '../Components/Footer'
import BreadCrumb from '../Components/BreadCrumb'
import Pagination from '../Components/Pagination'
import ArticleBox from '../Components/ArticleBox'


export default function AllArticles() {
    const [articles, setArticles] = useState([])
    const [shownArticles, setShownArticles] = useState([])
    useEffect(() => {
        fetch(`http://localhost:4000/v1/articles`)
            .then(res => res.json())
            .then(article => {
                console.log(article)
                setArticles(article)
            })
    }, [])

    return (
        <>
            <Topbar />
            <Navbar />
            <BreadCrumb links={[
                
                { id: 1, title: 'خانه', to: '/' },
                { id: 2, title: 'تمامی مقاله ها', to: '/articles/1' },

            ]} />
            <div className="my-16">
                <div className="container mx-auto px-4">
                    <div className="courses-content">
                        <div className="container">
                            <div className="flex flex-row flex-wrap">
                                {
                                    shownArticles.map((article) => (
                                        <ArticleBox {...article} />
                                    ))
                                }

                            </div>

                            <Pagination
                                items={articles}
                                itemsCount={6}
                                pathname={'/articles'}
                                setShowCourses={setShownArticles}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
