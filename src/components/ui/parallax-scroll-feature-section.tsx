'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from "lucide-react"

export const Component = () => {
    // Array of section data
    const sections = [
        {
            id: 1,
            title: "Feature 1",
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab maxime sequi, pariatur illum, adipisci ullam optio quod tempora necessitatibus consectetur eaque deleniti id totam possimus unde dolorum inventore incidunt. Ea.",
            imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
            reverse: false
        },
        {
            id: 2,
            title: "Feature 2",
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab maxime sequi, pariatur illum, adipisci ullam optio quod tempora necessitatibus consectetur eaque deleniti id totam possimus unde dolorum inventore incidunt. Ea.",
            imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
            reverse: true
        },
        {
            id: 3,
            title: "Feature 3",
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab maxime sequi, pariatur illum, adipisci ullam optio quod tempora necessitatibus consectetur eaque deleniti id totam possimus unde dolorum inventore incidunt. Ea.",
            imageUrl: 'https://images.unsplash.com/photo-1512290900672-1f486445b206?w=800&auto=format&fit=crop&q=80',
            reverse: false
        }
    ]

    return (
        <div>
            <div className='min-h-screen w-screen flex flex-col items-center justify-center'>
                <h1 className='text-6xl max-w-2xl text-center'>PARALLAX SCROLL FEATURE SECTION</h1>
                <p className='mt-20 flex items-center gap-1.5 text-sm'>SCROLL <ArrowDown size={15} /></p>
            </div>
            <div className="flex flex-col md:px-0 px-10">
                {sections.map((section) => (
                    <ParallaxSectionItem key={section.id} section={section} />
                ))}
            </div>
            <div className='min-h-screen w-screen flex flex-col items-center justify-center'>
                <h1 className='text-8xl'>The End</h1>
            </div>
        </div>
    );
};

function ParallaxSectionItem({ section }: { section: any }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center start"]
    });

    const opacityContent = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
    const clipProgress = useTransform(scrollYProgress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
    const translateContent = useTransform(scrollYProgress, [0, 1], [-50, 0]);

    return (
        <div 
            ref={ref} 
            className={`h-screen flex items-center justify-center md:gap-40 gap-20 ${section.reverse ? 'flex-row-reverse' : ''}`}
        >
            <motion.div style={{ y: translateContent }}>
                <div className="text-6xl max-w-sm">{section.title}</div>
                <motion.p 
                    style={{ y: translateContent }} 
                    className="text-white/70 max-w-sm mt-10"
                >
                    {section.description}
                </motion.p>
            </motion.div>
            <motion.div 
                style={{ 
                    opacity: opacityContent,
                    clipPath: clipProgress,
                }}
                className="relative"
            >
                <img 
                    src={section.imageUrl} 
                    className="size-80 object-cover" 
                    alt={`Section ${section.id}`}
                />
            </motion.div>
        </div>
    );
}

export default Component;
