import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

const AnimatedSplitText = ({
    text,
    className,
    x = 0,
    y = 0,
    duration = 1,
    opacity = 0,
    stagger = 0.05
}) => {
    const headingRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(SplitText);

        if (headingRef.current) {
            const split = new SplitText(headingRef.current, {
                type: "chars"
            });

            gsap.from(split.chars, {
                duration,
                x,
                y,
                opacity,
                stagger,
                ease: "power3.out",
            });
        }
    }, [x, duration, opacity, stagger]);

    return (
        <h1 ref={headingRef} className={`leading-tight ${className}`}>
            {text}
        </h1>
    );
};

export default AnimatedSplitText;
