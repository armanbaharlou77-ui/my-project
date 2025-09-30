import React, { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import ArticleBox from './ArticleBox'
export default function Articles() {

    const [allArticles, setAllArticles] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/v1/articles')
            .then(res => res.json())
            .then(articles => {
                console.log(articles)
                setAllArticles(articles)
            })
    }, [])

    return (
        <div>
            <div className="my-16">
                <div className="container m-auto">
                    <SectionHeader title={'جدیدترین مقاله ها'} desc={'پیش به سوی ارتقای دانش'} btnTitle={'تمامی مقاله ها'} btnHref={'articles/1'} />
                    <div class="container">
                        <div class="flex flex-row flex-wrap">
                            {
                                allArticles.slice(0, 3).map((article) => (
                                    <ArticleBox {...article} />
                                ))
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
