"use client";
import React, { useState, useEffect, useRef } from 'react';

const LazyLoadSection = ({ children }: { children: React.ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // 加载一次后就不再监听
                }
            },
            { rootMargin: "600px" } // 提前 600px (约大半屏) 开始加载，确保用户划到时已经准备好
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref}>
            {isVisible ? children : <div className="min-h-screen" />}
        </div>
    );
};

export default LazyLoadSection;