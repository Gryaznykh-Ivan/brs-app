import React from 'react'
import { Link } from 'react-router-dom';

interface IProps {
    owner: {
        name: string;
        image?: string;
    },
    title: string;
    content: Array<{
        type: string;
        data: string;
    }>,
    tickers?: Array<JSX.Element>
}

export default function NewsBlock({ owner, title, content, tickers }: IProps) {
    return (
        <div className="bg-white rounded-lg p-6 divide-y-[1px]">
            <div className="space-y-4 mb-4">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <div className="text-tgrey text-xs font-bold">09 мар, 17:39</div>
                        <div className="flex items-center ml-4 pb-px">
                            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 2.78125C7.77148 2.80664 7.41602 2.85742 7.1875 2.9082C7.28906 3.08594 7.36523 3.41602 7.39062 3.59375C7.39062 4.38086 6.73047 5.01562 5.96875 5.01562C5.76562 5.01562 5.43555 4.93945 5.2832 4.83789C5.20703 5.06641 5.15625 5.39648 5.15625 5.625C5.15625 7.19922 6.42578 8.46875 8 8.46875C9.57422 8.46875 10.8438 7.19922 10.8438 5.625C10.8438 4.07617 9.57422 2.78125 8 2.78125ZM15.2109 5.26953C13.8398 2.57812 11.0977 0.75 8 0.75C4.87695 0.75 2.13477 2.57812 0.763672 5.26953C0.712891 5.37109 0.6875 5.52344 0.6875 5.65039C0.6875 5.75195 0.712891 5.9043 0.763672 6.00586C2.13477 8.69727 4.87695 10.5 8 10.5C11.0977 10.5 13.8398 8.69727 15.2109 6.00586C15.2617 5.9043 15.2871 5.75195 15.2871 5.625C15.2871 5.52344 15.2617 5.37109 15.2109 5.26953ZM8 9.28125C5.48633 9.28125 3.17578 7.88477 1.95703 5.625C3.17578 3.36523 5.48633 1.96875 8 1.96875C10.4883 1.96875 12.7988 3.36523 14.0176 5.625C12.7988 7.88477 10.4883 9.28125 8 9.28125Z" fill="#828282" />
                            </svg>
                            <div className="text-tgrey text-xs ml-1">2</div>
                        </div>
                    </div>
                    <button className="p-px">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 7.5C8.15625 7.5 7.5 8.1875 7.5 9C7.5 9.84375 8.15625 10.5 9 10.5C9.8125 10.5 10.5 9.84375 10.5 9C10.5 8.1875 9.8125 7.5 9 7.5ZM7.5 4.25C7.5 5.09375 8.15625 5.75 9 5.75C9.8125 5.75 10.5 5.09375 10.5 4.25C10.5 3.4375 9.8125 2.75 9 2.75C8.15625 2.75 7.5 3.4375 7.5 4.25ZM7.5 13.75C7.5 14.5938 8.15625 15.25 9 15.25C9.8125 15.25 10.5 14.5938 10.5 13.75C10.5 12.9375 9.8125 12.25 9 12.25C8.15625 12.25 7.5 12.9375 7.5 13.75Z" fill="#262F35" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img src={(owner.image !== undefined ? owner.image : process.env.PUBLIC_URL + "/static/images/noImage.png")} alt="" />
                    </div>
                    <div className="ml-2 font-bold text-sm">{ owner.name }</div>
                </div>
                <div className="font-bold text-2xl">
                    <Link to="/news/example">{ title }</Link>
                </div>
                
                { content.map(({ type, data }) => {
                    switch (type){
                        case "image":
                            return <img key={ Math.random() } src={ data } alt="" />
                        case "text":
                            return <p key={ Math.random() } className="text-sm">{ data }</p>
                    }
                }) }
                <div className="flex space-x-2">
                    { tickers?.map(ticker => ticker) }
                </div>
            </div>
            <div className="flex items-center justify-end pt-4 h-8 box-content space-x-6">
                <button className="flex items-center">
                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 0C11.0625 0 14 2.46875 14 5.5C14 8.5625 11.0625 11 7.5 11C6.90625 11 6.34375 10.9375 5.78125 10.8125C4.84375 11.4062 3.46875 12 1.75 12C1.4375 12 1.15625 11.8438 1.0625 11.5312C0.9375 11.25 0.96875 10.9375 1.1875 10.6875C1.21875 10.6875 1.90625 9.9375 2.40625 8.9375C1.53125 8 1 6.8125 1 5.5C1 2.46875 3.90625 0 7.5 0ZM6.125 9.34375C6.59375 9.46875 7.03125 9.5 7.5 9.5C10.25 9.5 12.5 7.71875 12.5 5.5C12.5 3.3125 10.25 1.5 7.5 1.5C4.71875 1.5 2.5 3.3125 2.5 5.5C2.5 6.625 3.03125 7.4375 3.5 7.90625L4.25 8.6875L3.75 9.65625C3.625 9.84375 3.5 10.0625 3.375 10.2812C3.9375 10.125 4.46875 9.875 5 9.53125L5.53125 9.21875L6.125 9.34375ZM14.7812 4.03125C18.25 4.15625 21 6.5625 21 9.5C21 10.8125 20.4375 12 19.5625 12.9375C20.0625 13.9375 20.75 14.6875 20.7812 14.6875C21 14.9375 21.0312 15.25 20.9062 15.5312C20.8125 15.8438 20.5312 16 20.2188 16C18.5 16 17.125 15.4062 16.1875 14.8125C15.625 14.9375 15.0625 15 14.5 15C11.9375 15 9.71875 13.75 8.65625 11.9375C9.1875 11.875 9.71875 11.75 10.1875 11.5625C11.0625 12.75 12.6562 13.5 14.5 13.5C14.9375 13.5 15.375 13.4688 15.8438 13.3438L16.4375 13.2188L16.9688 13.5312C17.5 13.875 18.0312 14.125 18.5938 14.2812C18.4688 14.0625 18.3438 13.8438 18.2188 13.6562L17.7188 12.6875L18.4688 11.9062C18.9375 11.4375 19.5 10.625 19.5 9.5C19.5 7.4375 17.5 5.75 14.9688 5.53125L15 5.5C15 5 14.9062 4.5 14.7812 4.03125Z" fill="#262F35" />
                    </svg>
                    <div className="ml-2">3</div>
                </button>
                <button className="">
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.7188 5.9375L10.2188 1.1875C9.75 0.78125 9 1.125 9 1.78125V4.28125C3.96875 4.3125 0 5.34375 0 10.0938C0 12 1.21875 13.9062 2.59375 14.9062C3 15.2188 3.625 14.8125 3.46875 14.3125C2.0625 9.78125 4.125 8.59375 9 8.53125V11.25C9 11.9062 9.75 12.25 10.2188 11.8438L15.7188 7.09375C16.0625 6.78125 16.0625 6.25 15.7188 5.9375Z" fill="#262F35" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
