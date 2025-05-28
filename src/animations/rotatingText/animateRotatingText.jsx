import { motion, LayoutGroup } from "framer-motion";
import RotatingText from "@/animations/rotatingText/rotatingText";
import AnimatedSplitText from "@/animations/splitText/animatedSplitText";

export default function AnimateRotatingText({
    staticText = "Engineering",

    rotatingTexts = [
        "Apps",
        "UX",
        "Interfaces",
        "Websites",
        "Solutions",
        "Experiences",
    ]

}) {
    return (
        <div className="text-2xl md:text-3xl leading-8 flex flex-row items-center justify-center md:justify-start font-light overflow-hidden text-white animate-fadeUp" style={{ "--delay": "0.7s" }}>
            <LayoutGroup>
                <motion.div className="font-extrabold flex items-center gap-3" layout>
                    <motion.span
                        className="flex items-center"
                        layout
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    >
                        <AnimatedSplitText
                            text={staticText}
                            className="text-text"
                            duration={1}
                            stagger={0.2}
                        />
                    </motion.span>
                    <div className="relative h-[38px] md:h-[44px] flex items-center">
                        <RotatingText
                            texts={rotatingTexts}
                            mainClassName="bg-primary px-2 py-0.5 rounded-lg text-background overflow-hidden"
                            staggerFrom={"last"}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                        />
                    </div>
                </motion.div>
            </LayoutGroup>
        </div>
    )
}
