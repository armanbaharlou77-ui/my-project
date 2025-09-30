import React from 'react'
import { Link } from 'react-router-dom'

export default function ArticleBox({ title, description, cover, shortName }) {
    return (

        <div class="w-full md:w-1/3 px-4">
            <div class="mt-12 rounded-xl shadow-[0_5px_30px_rgba(70,72,77,0.08)] transition-all duration-400 hover:-translate-y-2">
                <div>
                    <Link to={`/article-info/${shortName}`} class="block">
                        <img src={cover} alt="Article Cover" class="rounded-t-xl w-full object-cover" />
                    </Link>
                </div>
                <div class="p-4 sm:p-6">
                    <Link to={`/article-info/${shortName}`} class="font-bold text-2xl leading-relaxed hover:text-primary transition-colors duration-300">
                        {title}
                    </Link>
                    <p class="text-gray-500 leading-7 py-4 text-xl">
                        {description}
                    </p>
                    <Link to={`/article-info/${shortName}`} class="inline-block border-2 border-primary text-primary  sm:text-base px-4 py-2 rounded-md transition-all duration-400 hover:bg-primary hover:text-white text-lg">
                        بیشتر بخوانید
                    </Link>
                </div>
            </div>
        </div>


    )
}
