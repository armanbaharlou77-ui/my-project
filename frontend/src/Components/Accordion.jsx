import { useState, useRef, useEffect } from "react";

const AccordionItem = ({ title, content, id, time, isOpen, onClick }) => {

    const contentRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState("0px");

    useEffect(() => {
        if (contentRef.current) {
            setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
        }
    }, [isOpen]);

    return (
        <div className=" mb-3 overflow-hidden transition-all duration-300 rounded-xl border-b border-green-500">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
                <span className="text-gray-800 font-medium">{title}</span>
                <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div
                ref={contentRef}
                style={{ maxHeight }}
                className="overflow-hidden transition-all duration-300 ease-in-out"
            >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 px-6 py-4">

                    <span className="w-14 h-14 border border-[#bfbfbf] text-[#656464] flex items-center justify-center rounded-full shrink-0">
                        {id}
                    </span>

                    <i className="fab fa-youtube text-[#939aa3] text-[1.8rem] shrink-0"></i>

                    <div className="text-gray-700 flex-1 text-[1.4rem]">
                        <a href="">
                            {title}

                        </a>
                    </div>

                    <div>
                        <span className="text-[#7a7a7a] whitespace-nowrap">{time}</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

const Accordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleClick = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return (
        <div className="mx-auto">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    time={item.time}
                    id={index + 1}
                    isOpen={openIndex === index}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
    );
};

export default Accordion;
