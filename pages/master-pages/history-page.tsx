"use client"

import { splitTextByHeight } from "@/lib/splitText-util";
// import styles from "./master-history-page.module.css"
import { useEffect, useRef, useState } from "react";
import { clamp } from "date-fns";

const text = `In between eras of multiple kingdoms and warlords, Chinese dynasties, or more recently republics, have
ruled a China of varying shapes and sizes. This began with the Qin Dynasty in 221 BC, when Qinshihuang
united the various warring kingdoms, thus creating the first Chinese empire and beginning construction
of the Great Wall.
The Han Dynasty (202 BC-220 AD) was the first to embrace the philosophy of Confucianism, the tenets of
which are still pervasive throughout modern Chinese society.
The Han Dynasty (202 BC-220 AD) was the first to embrace the philosophy of Confucianism, the tenets of
which are still pervasive throughout modern Chinese society. Political and cultural influences from
many parts of Asia, brought by waves of immigration, periods of expansion and cultural assimilation,
formed the modern culture of China.
The Qing Dynasty (1644-1911), founded by the Manchus, was the last dynasty and only the second not
dominated by ethnic Hans, although the Manchus adopted the Confucian norms of traditional Chinese
government. By the 19th century, the Qing empire had economically stagnated and was threatened by
Western imperial powers.
The Qing were soundly defeated in the First Opium War (1842) by the British, resulting in the ceding of
Hong Kong and the legalization of opium imports. By 1870, opium accounted for over 40 percent of all
goods imported to China.
Subsequent civil wars and military defeats to outsiders continually weakened the government until it was
overthrown by several factions united under the revolutionary ideas of Sun Yat-sen. After Sun's death in
1925, Chiang Kai-shek seized control of the Kuomintang (Nationalist Party or KMT) and brought most of
China under his control, eventually turning on the Communist Party.
This drove them across China's most desolate terrain to Yan'an on the Long March. From there, the
Communist Party regrouped under the leadership of a young Mao Zedong, returned north and succeeded in
toppling the KMT and forcing them to the island of Taiwan in 1949 where they remain an active political
party to this day.
Chairman Mao's original social and economic plan, the Great Leap Forward, was a complete disaster for
the country. It resulted in an estimated 45 million deaths, mostly from starvation. In 1966, Mao and his
allies launched the Cultural Revolution, which sought to eradicate all traditional and capitalist elements from Chinese society.
After Mao's death in 1976, reformers led by Deng Xiaoping gained prominence and most of the Maoist
'reforms' associated with the Cultural Revolution had been abandoned by 1978. The economy proceeded to
'reforms' associated with the Cultural Revolution had been abandoned by 1978. The economy proceeded to
'reforms' associated with the Cultural Revolution had been abandoned by 1978. The economy proceeded to
'reforms' associated with the Cultural Revolution had been abandoned by 1978. The economy proceeded to
'reforms' associated with the Cultural Revolution had been abandoned by 1978. The economy proceeded to
'reforms' associated with the Cultural Revolution had been abandoned by 1978. The economy proceeded to
blossom under open market reforms and the welcoming of foreign investment.`

const secondText = `Shanghai emerged as a popular export center for the British East India Company in the 18th century as
Chinese silk, porcelain and tea became popular in Great Britain. However, the isolationist Qing Dynasty
had no desire for Western goods, thus creating an unsustainable trade imbalance.
Shanghai emerged as a popular export center for the British East India Company in the 18th century as
Chinese silk, porcelain and tea became popular in Great Britain. However, the isolationist Qing Dynasty
had no desire for Western goods, thus creating an unsustainable trade imbalance.After Mao's death in 1976, reformers led by Deng Xiaoping gained prominence and most of the Maoist
'reforms' associated with the Cultural Revolution had been abandoned by 1978. The economy proceeded to
blossom under open market reforms and the welcoming of foreign investment. Subsequent civil wars and military defeats to outsiders continually weakened the government until it was
overthrown by several factions united under the revolutionary ideas of Sun Yat-sen. After Sun's death in
1925, Chiang Kai-shek seized control of the Kuomintang (Nationalist Party or KMT) and brought most of
China under his control, eventually turning on the Communist Party.
This drove them across China's most desolate terrain to Yan'an on the Long March. From there, the
Communist Party regrouped under the leadership of a young Mao Zedong, returned north and succeeded in
toppling the KMT and forcing them to the island of Taiwan in 1949 where they remain an active political
party to this day.
Chairman Mao's original social and economic plan, the Great Leap Forward, was a complete disaster for
the country. It resulted in an estimated 45 million deaths, mostly from starvation. In 1966, Mao and his
the country. It resulted in an estimated 45 million deaths, mostly from starvation. In 1966, Mao and his
the country. It resulted in an estimated 45 million deaths, mostly from starvation. In 1966, Mao and his
allies launched`


export default function MasterHistoryPage() {
    const hiddenRef = useRef<HTMLDivElement>(null);
    const divRef1 = useRef<HTMLDivElement>(null);
    const divRef2 = useRef<HTMLDivElement>(null);
    const divRef3 = useRef<HTMLDivElement>(null);
    const divRef4 = useRef<HTMLDivElement>(null);
    const divRef5 = useRef<HTMLDivElement>(null);

    const [part, setPart] = useState([""])
    const [size, setSize] = useState({ width: 0, height: 0 })
    const [line_height, setLineHeight] = useState<number>(0)
    const [video_size, setVideoSize] = useState({ width: 0, height: 0 })
    const [section_header, setSectionHeader] = useState({ width: 0, height: 0 })


    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            const entry = entries[0];
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        });

        if (divRef1.current) {
            resizeObserver.observe(divRef1.current);
        }
        if (!hiddenRef.current) return;

        const height = document.getElementById("content_area")?.offsetHeight
        const width = document.getElementById("content_area")?.offsetWidth

        if (height) {
            setLineHeight(height / 30)
            setSectionHeader({ ...section_header, height: height * 2 / 30 })
            hiddenRef.current.style.lineHeight = `${height / 30}px`;
            if (width) {
                setVideoSize({ width: width, height: (Math.floor((width * 9 / 16) / (height / 30)) + 1) * (height / 30) })
            }
        }

        const hidden = hiddenRef.current;

        hidden.style.width = `${divRef1.current?.offsetWidth}px`;

        let temp = splitTextByHeight(text, divRef1.current?.offsetHeight, size.width, hiddenRef.current)
        let temp1 = splitTextByHeight(temp[1], divRef2.current?.offsetHeight, size.width, hiddenRef.current)
        let temp2 = splitTextByHeight(temp1[1], divRef3.current?.offsetHeight, size.width, hiddenRef.current)
        let temp3 = splitTextByHeight(secondText, divRef4.current?.offsetHeight, size.width, hiddenRef.current)
        let temp4 = splitTextByHeight(temp3[1], divRef5.current?.offsetHeight, size.width, hiddenRef.current)

        setPart([temp[0], temp1[0], temp2[0], temp3[0], temp4[0]])

        return () => resizeObserver.disconnect();
    }, [line_height]);

    useEffect(() => {
    }, [size])

    return (
        <div className="resize-x h-full w-full px-6 pb-6 sm:px-6 py-6 sm:py-6 dark:bg-gray-900 dark:text-white lg:overflow-hidden overflow-auto h-full scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200">
            <div className="flex lg:flex-row flex-col gap-[2rem]" style={{ height: "100%" }}>
                {/* Left Column */}
                <div className="flex lg:flex-row flex-col flex-1 gap-[1rem]">
                    <div className="w-1/2 flex flex-col" id="content_area">
                        <h1 className="dark:border-white-600 border-black-600 lg:text-[2vw]" style={{ height: `${section_header.height}px`, marginBottom: `${line_height}px`, fontWeight: "700", textTransform: "uppercase", borderTop: "5px solid", borderBottom: "1px solid" }}>History</h1>
                        <div className="aspect-[16/9]" style={{ height: `${video_size.height}px`, width: `${video_size.width}px`, marginBottom: `${line_height}px` }}>
                            <video src="/videos/cover.mp4" style={{ height: "100%" }} controls></video>
                        </div>
                        <div className="text-justify" style={{ lineHeight: `${line_height}px`, marginBottom: `${line_height}px` }}>
                            <div className="relative">
                                <span className="text-3xl leading-2 pr-2 pt-0.5 float-left">
                                    C
                                </span>
                                hina is one of the world's oldest civilizations, with thousands of years of continuous history. The
                                first concrete evidence of civilization, dating back to the Neolithic era, was discovered in various
                                regional centres along the Yangtze River and Yellow River valleys, although the Yellow River is said to
                                be the cradle of Chinese civilization.
                            </div>
                        </div>
                        <div className="text-justify flex-1" style={{ height: `${Math.ceil(line_height * 2)}px`, textAlignLast: "justify", lineHeight: `${line_height}px` }} >
                            <div className="h-full" ref={divRef1}>
                                {part[0]}
                            </div>
                        </div>
                    </div>

                    <div className="w-1/2 text-justify" style={{ textAlignLast: "justify", lineHeight: `${line_height}px` }} ref={divRef2}>
                        {part[1]}
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex lg:flex-row flex-col flex-1 lg:w-1/2 gap-[1rem] text-justify">
                    <div className="w-1/2 flex flex-col">
                        <div className="" ref={divRef3} style={{ textAlignLast: "justify", lineHeight: `${line_height}px`, marginBottom: `${line_height}px` }}>
                            {part[2]}
                        </div>
                        <h2 className={`dark:border-white-600 border-black-600 font-bold text-transform-uppercase letter-spacing-0.05`} style={{ height: `${line_height}px`, marginBottom: `${line_height}px` }}>A Brief History of Shanghai</h2>
                        <div style={{ textAlignLast: "justify", lineHeight: `${line_height}px`, marginBottom: `${line_height}px` }}>
                            <div className="relative">
                                <span className="float-left text-3xl leading-2 pr-2 pt-0.5">
                                    S
                                </span>
                                hanghai's historical evolution from a sleepy fishing and textile port on the Yangtze Delta to a fully
                                fledged world-class city has been formed by lucrative Chinese-Western trading relationships, cheap and
                                plentiful labor from impoverished rural areas and the city's relative peace compared with the rest of
                                China in the 19th and 20th centuries.
                            </div>
                        </div>
                        <div className="text-justify" style={{ height: `${line_height * 16}px`, textAlignLast: "justify", lineHeight: `${line_height}px` }} ref={divRef4}>
                            {part[3]}
                        </div>
                    </div>

                    <div className="flex flex-col w-1/2 text-justify">
                        <div className={`flex flex-1`} ref={divRef5} style={{ lineHeight: `${line_height}px`, marginBottom: `${line_height}px` }}>
                            {part[4]}
                        </div>
                        <div className="aspect-[16/9]" >
                            <video src="/videos/cover.mp4" style={{ height: "100%" }} controls></video>
                        </div>
                    </div>
                </div>

                {/* Hidden div for measuring text height */}
                <div
                    ref={hiddenRef}
                    className="invisible absolute text-black text-justify"
                    style={{
                        height: '0px',
                        padding: '0px',
                        position: 'absolute',
                        visibility: 'hidden',
                        zIndex: -1,
                        pointerEvents: 'none',
                        textAlignLast: "justify"
                    }}
                />
            </div>
        </div>
    )
}
