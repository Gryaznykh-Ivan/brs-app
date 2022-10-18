import React from 'react'

export default function TableBlock() {
    return (
        <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm">
            <div className="flex space-x-4 overflow-x-auto whitespace-nowrap max-w-[992px]">
                <div className="flex flex-col space-y-2">
                    <div className="font-bold p-1">Фамилии</div>
                    <div className="p-1">Грязных Иван</div>
                    <div className="p-1">Левина Софья</div>
                    <div className="p-1">Марков Владислав</div>
                    <div className="font-bold p-1">Редактирование</div>
                </div>
                <div className="flex flex-col space-y-2 justify-center">
                    <input type="text" className="font-bold p-1" size={2} value="КР 1" />
                    <input type="text" className="p-1 bg-grey rounded-md text-center" size={1} />
                    <input type="text" className="p-1 bg-grey rounded-md text-center" size={1} />
                    <input type="text" className="p-1 bg-grey rounded-md text-center" size={1} />
                    <button className="flex h-full items-center justify-center">
                        <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 3.5V9.5C2 10.0523 2.44772 10.5 3 10.5H4.75M7.5 3.5V9.5C7.5 10.0523 7.05228 10.5 6.5 10.5H4.75M4.75 10.5V5.5M0 2.5H2.5M9.5 2.5H7M2.5 2.5V2C2.5 1.44772 2.94772 1 3.5 1H6C6.55228 1 7 1.44772 7 2V2.5M2.5 2.5H7" stroke="#C02525" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col space-y-2">
                    <input type="text" className="font-bold p-1" size={2} value="КР 2" />
                    <input type="text" className="p-1 bg-grey rounded-md text-center" size={1} />
                    <input type="text" className="p-1 bg-grey rounded-md text-center" size={1} />
                    <input type="text" className="p-1 bg-grey rounded-md text-center" size={1} />
                    <button className="flex h-full items-center justify-center">
                        <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 3.5V9.5C2 10.0523 2.44772 10.5 3 10.5H4.75M7.5 3.5V9.5C7.5 10.0523 7.05228 10.5 6.5 10.5H4.75M4.75 10.5V5.5M0 2.5H2.5M9.5 2.5H7M2.5 2.5V2C2.5 1.44772 2.94772 1 3.5 1H6C6.55228 1 7 1.44772 7 2V2.5M2.5 2.5H7" stroke="#C02525" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col space-y-2">
                    <input type="text" className="font-bold p-1" size={2} value="КР 3" />
                    <input type="text" className="p-1 bg-grey rounded-md text-center" size={1} />
                    <input type="text" className="p-1 bg-grey rounded-md text-center" size={1} />
                    <input type="text" className="p-1 bg-grey rounded-md text-center" size={1} />
                    <button className="flex h-full items-center justify-center">
                        <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 3.5V9.5C2 10.0523 2.44772 10.5 3 10.5H4.75M7.5 3.5V9.5C7.5 10.0523 7.05228 10.5 6.5 10.5H4.75M4.75 10.5V5.5M0 2.5H2.5M9.5 2.5H7M2.5 2.5V2C2.5 1.44772 2.94772 1 3.5 1H6C6.55228 1 7 1.44772 7 2V2.5M2.5 2.5H7" stroke="#C02525" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col">
                    <button className="flex h-full items-center justify-center w-8 hover:bg-grey rounded-xl">
                        <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="6" cy="6" r="6" fill="#00D154" />
                            <path d="M3 6L9 6" stroke="white" />
                            <path d="M6 3V9" stroke="white" />
                        </svg>

                    </button>
                </div>



            </div>
        </div>
    )
}
