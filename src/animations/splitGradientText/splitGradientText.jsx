import { useSprings, animated } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

export default function SplitGradientText({
  text,
  gradientText,
  className = "",
  sharedTextClass = "text-4xl md:text-5xl lg:text-6xl font-extrabold",
  textClass = "text-white",
  gradientClass = "",
  colors = ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#615fff"],
  animationSpeed = 6,
  textAlign = "left",
  clientLoad = true,
  delay = 100,
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  easing = "easeOutCubic",
  threshold = 0.1,
  rootMargin = "0px",
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  const normalWords = text.split(" ").map((word) => word.split(""));
  const normalLetters = normalWords.flat();

  const gradientWords = gradientText.split(" ").map((word) => word.split(""));
  const gradientLetters = gradientWords.flat();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const normalSprings = useSprings(
    normalLetters.length,
    normalLetters.map((_, i) => ({
      from: animationFrom,
      to: inView ? animationTo : animationFrom,
      delay: i * delay,
      config: { easing },
    })),
  );

  const gradientSprings = useSprings(
    gradientLetters.length,
    gradientLetters.map((_, i) => ({
      from: animationFrom,
      to: inView ? animationTo : animationFrom,
      delay: (i + normalLetters.length) * delay,
      config: { easing },
    })),
  );

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: `gradient ${animationSpeed}s linear infinite`,
  };

  return (
    <div ref={ref} className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className={`${sharedTextClass} ${textClass}`} style={{ textAlign }}>
        {normalWords.map((word, wordIndex) => (
          <span
            key={`normal-${wordIndex}`}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {word.map((letter, letterIndex) => {
              const index = normalWords.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) + letterIndex;

              return (
                <animated.span
                  key={`normal-${index}`}
                  style={normalSprings[index]}
                  className="inline-block"
                >
                  {letter}
                </animated.span>
              );
            })}
            <span style={{ display: "inline-block", width: "0.3em" }}>&nbsp;</span>
          </span>
        ))}
      </span>

      <span
        className={`${sharedTextClass} ${gradientClass}`}
        style={{ textAlign }}
      >
        {gradientWords.map((word, wordIndex) => (
          <span
            key={`gradient-${wordIndex}`}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {word.map((letter, letterIndex) => {
              const index = gradientWords.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) + letterIndex;

              return (
                <animated.span
                  key={`gradient-${index}`}
                  style={{
                    ...gradientSprings[index],
                    ...gradientStyle,
                  }}
                  className="inline-block"
                >
                  {letter}
                </animated.span>
              );
            })}
            <span style={{ display: "inline-block", width: "0.3em" }}>&nbsp;</span>
          </span>
        ))}
      </span>
    </div>
  );
}
