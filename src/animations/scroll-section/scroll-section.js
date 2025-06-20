import {
    animate,
    inView,
} from "https://cdn.jsdelivr.net/npm/motion@12.10.4/+esm";

inView(".scroll-section", (element) => {
    animate(
        element,
        { opacity: [0, 5], x: [0, 0] },
        {
            duration: 1.5,
            easing: [0.23, 1, 0.32, 1.5],
            delay: 0.3,
        }
    );
    return () =>
        animate(
            element,
            {
                opacity: 0,
                x: 0,
            },
            {
                duration: 1.5,
                delay: 0.3,
                easing: [0.23, 1, 0.32, 1.5],
            }
        );
});