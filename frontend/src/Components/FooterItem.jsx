import React from 'react'

export default function FooterItem({ title, children }) {
    return (
        <div>
            <span class="footer-widgets__title">
                {title}
            </span>
            {children}
        </div>
    )
}
