import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NewsСonstructor() {
    const navigate = useNavigate();

    return (
        <div className="flex-1">
            <div className="absolute inset-0 bg-grey bg-opacity-50 z-10"></div>
            <div className="relative bg-white rounded-lg p-6 z-20 divide-y-[1px] shadow-lg">
                <div className="space-y-4 mb-4">
                    <div className="text-2xl font-bold">Добавить новость</div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <svg className="mb-1" width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.95 0.274999L2.325 0.904999L2.595 1.745L2.91 0.89L3.27 0.289999L3.99 0.68L3.6 1.325L2.91 2.045L3.93 1.865H4.65V2.705H3.96L3 2.525L3.69 3.245L4.035 3.83L3.33 4.25L2.94 3.62L2.595 2.705L2.31 3.575L1.935 4.205L1.185 3.785L1.59 3.155L2.22 2.525L1.35 2.705H0.6V1.865H1.35L2.28 2.045L1.605 1.385L1.215 0.694999L1.95 0.274999Z" fill="#FF3131" />
                            </svg>
                            <label className="font-bold ml-2 text-sm" htmlFor="">Название</label>
                        </div>
                        <input type="text" className="bg-grey rounded-lg px-3 outline-none w-2/3 h-8 placeholder-black" placeholder="Название новости" defaultValue="Forbes узнал о планах Softline провести IPO в Лондоне и Москве" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <svg className="mb-1" width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.95 0.274999L2.325 0.904999L2.595 1.745L2.91 0.89L3.27 0.289999L3.99 0.68L3.6 1.325L2.91 2.045L3.93 1.865H4.65V2.705H3.96L3 2.525L3.69 3.245L4.035 3.83L3.33 4.25L2.94 3.62L2.595 2.705L2.31 3.575L1.935 4.205L1.185 3.785L1.59 3.155L2.22 2.525L1.35 2.705H0.6V1.865H1.35L2.28 2.045L1.605 1.385L1.215 0.694999L1.95 0.274999Z" fill="#FF3131" />
                            </svg>
                            <div className="font-bold ml-2">Описание</div>
                        </div>
                        <div className="bg-grey rounded-lg p-3 divide-y-[1px] divide-gray-300">
                            <div className="mb-3">
                                <img src={process.env.PUBLIC_URL + "/static/images/textEditorMenu.png"} alt="" />
                            </div>
                            <div className="pt-3 box-content">
                                <h1 className="font-bold pb-2 text-2xl">Forbes узнал о планах Softline провести IPO в Лондоне и Москве</h1>
                                <img className="my-2" src={"https://s0.rbk.ru/v6_top_pics/resized/590xH/media/img/1/73/756323252036731.jpg"} alt="" />
                                <p className="text-sm pb-2">Компания Softline, провайдер ИТ-решений и сервисов в области цифровой трансформации, облачных технологий и информационной безопасности, планирует провести IPO, сообщил Forbes со ссылкой на источники. В рамках подготовки к размещению компания проводила летом встречи с инвесторами. Softline планирует двойной листинг — на Лондонской и Московской биржах — и намерена привлечь $500 млн, сообщили источники издания. Организатором размещения станет ВТБ. Представитель Softline не подтвердил, но и не опроверг эту информацию изданию.</p>
                                <p className="text-sm pb-2">«Все, что я могу сказать сейчас, это то, что Softline рассматривает различные возможности стратегического развития, в том числе путем потенциального размещения акций компании на бирже (IPO)», — сообщил РБК представитель пресс-службы Softline.</p>
                                <p className="text-sm pb-2">Компания готовилась к выходу на первичный рынок в 2014–2015 годах. Тогда в качестве площадки для размещения бумаг Softline рассматривала Гонконгскую фондовую биржу, однако из-за «непростой геополитической ситуации» размещение акций пришлось перенести.</p>
                                <p className="text-sm pb-2">В 2019 году председатель совета директоров группы Softline Игорь Боровиков сообщал, что поставщик IT-решений намерен выйти на IPO в перспективе двух-трех лет. Среди наиболее вероятных площадок для размещения он называл Московскую биржу, хотя и говорил, что зарубежные площадки также рассматриваются.</p>
                                <p className="text-sm pb-2">В мае поставщик IT-решений сообщил, что рассматривает различные возможности стратегического развития, в том числе путем потенциального размещения акций на бирже (IPO). Однако сроки размещения компания не назвала.</p>
                                <p className="text-sm pb-2">Softline была основана в 1993 году Игорем Боровиковым. Сначала ее основной деятельностью было лицензирование научного программного обеспечения на российском рынке. Из небольшого российского реселлера программного обеспечения компания выросла в глобального поставщика ИТ-решений. Сейчас Softline работает в более чем 55 странах и обслуживает 10 тыс. заказов в день.</p>
                                <p className="text-sm pb-2">Компания является партнером более чем 4300 поставщиков программного и аппаратного обеспечения, включая Microsoft, Google, Oracle, VMware, HPE. Softline также продает решения российских компаний, в том числе «Лаборатории Касперского». В январе Softline купила индийскую ИТ-компанию Embee, в апреле завершила покупку контрольного пакета немецкой Softline AG, специализирующейся в ИТ-консалтинге в сферах управления программными и ИТ-активами, а в сентябре — покупку Squalio, международной компании, занимающейся технологиями обработки данных в Латвии, Литве, Белоруссии и Эстонии.</p>
                                <p className="text-sm pb-2">Оборот Softline в 2020 финансовом году, закончившемся 31 марта 2021 года, увеличился на 8,9% год к году и составил $1,8 млрд. Наибольший рост по итогам года показали направления облачных технологий (47%), решений в области аппаратного обеспечения (12%) и подписки на программное обеспечение (5,1%). На эти сегменты пришлось соответственно 25%, 13,6% и 28,9% от общего оборота.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="font-bold ml-2">Тикеры из описания идеи</div>
                        <div className="flex p-1 border-[1px] border-grey rounded-lg gap-2 flex-wrap">
                            
                        </div>
                    </div>
                    <div className="flex items-center px-1">
                        <input className="w-4 h-4 cursor-pointer" type="checkbox" name="check" id="check" />
                        <label htmlFor="check" className="text-tgrey ml-4 cursor-pointer">Разместить от имени сообщества</label>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <svg className="mb-1" width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.95 0.274999L2.325 0.904999L2.595 1.745L2.91 0.89L3.27 0.289999L3.99 0.68L3.6 1.325L2.91 2.045L3.93 1.865H4.65V2.705H3.96L3 2.525L3.69 3.245L4.035 3.83L3.33 4.25L2.94 3.62L2.595 2.705L2.31 3.575L1.935 4.205L1.185 3.785L1.59 3.155L2.22 2.525L1.35 2.705H0.6V1.865H1.35L2.28 2.045L1.605 1.385L1.215 0.694999L1.95 0.274999Z" fill="#FF3131" />
                            </svg>
                            <label className="font-bold ml-2 text-sm" htmlFor="">Выберите сообщество</label>
                        </div>
                        
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <svg className="mb-1" width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.95 0.274999L2.325 0.904999L2.595 1.745L2.91 0.89L3.27 0.289999L3.99 0.68L3.6 1.325L2.91 2.045L3.93 1.865H4.65V2.705H3.96L3 2.525L3.69 3.245L4.035 3.83L3.33 4.25L2.94 3.62L2.595 2.705L2.31 3.575L1.935 4.205L1.185 3.785L1.59 3.155L2.22 2.525L1.35 2.705H0.6V1.865H1.35L2.28 2.045L1.605 1.385L1.215 0.694999L1.95 0.274999Z" fill="#FF3131" />
                            </svg>
                            <label className="font-bold ml-2 text-sm" htmlFor="">Кто видит</label>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-4 h-8 pt-4 box-content">
                    <button className="bg-blue rounded-lg text-white font-bold px-3 text-sm" onClick={ () => navigate("/news/example") }>Сохранить</button>
                    <button className="bg-lblue rounded-lg text-blue font-bold px-3 text-sm" onClick={ () => navigate(-1) }>Отмена</button>
                </div>
            </div>
        </div>
    )
}
