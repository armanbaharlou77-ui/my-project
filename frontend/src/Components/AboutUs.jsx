import React from 'react'
import SectionHeader from './SectionHeader'
import AboutUsBox from './AboutUsBox'

export default function AboutUs() {
    return (
        <div className="mx-24">
            <div className="container m-auto">
                
                    <SectionHeader title='ما چه کمکی بهتون میکنیم؟' desc='از اونجایی که آکادمی آموزشی سبزلرن یک آکادمی خصوصی هست' />
                
                <div className="container">
                    <div className="flex flex-row flex-wrap">
                        <AboutUsBox title='دوره های اختصاصی' desc='با پشتیبانی و کیفیت بالا ارائه میده !' icon={'far fa-copyright'} />
                        <AboutUsBox title='اجازه تدریس' desc='به هر مدرسی رو نمیده. چون کیفیت براش مهمه !' icon={'fas fa-leaf'} />
                        <AboutUsBox title='دوره پولی و رایگان' desc='براش مهم نیست. به مدرسینش حقوق میده تا نهایت کیفیت رو در پشتیبانی و اپدیت دوره ارائه بده' icon={'fas fa-gem'} />
                        <AboutUsBox title='اهمیت به کاربر' desc='اولویت اول و آخر آکادمی آموزش برنامه نویسی سبزلرن اهمیت به کاربرها و رفع نیاز های آموزشی و رسوندن اونها به بازار کار هست' icon={'fas fa-crown'} />
                    </div>
                </div>
            </div>
        </div >

    )
}
