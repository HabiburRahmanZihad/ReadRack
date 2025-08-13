import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

const FavoriteReadsSection = () => {
    const [ref, inView] = useInView({
        threshold: 0.3, // Reduced threshold for better trigger
        triggerOnce: true // Only trigger once
    });
    const [isClient, setIsClient] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false);

    const stats = [
        { value: 698, label: "Books Listed" },
        { value: 8947, label: "Happy Readers" },
        { value: 27, label: "Branches" },
    ];

    // Handle client-side mounting
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Handle animation trigger
    useEffect(() => {
        if (inView && isClient) {
            // Small delay to ensure everything is ready
            const timer = setTimeout(() => {
                setStartAnimation(true);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [inView, isClient]);

    return (
        <section className="bg-base-200 text-base-content py-16 lg:py-24 mt-16 lg:mt-24">
            <div className="max-w-7xl mx-auto px-6 lg:flex items-center gap-12">
                {/* Left: Image with animation */}
                <div className="lg:w-1/2 mb-10 lg:mb-0">
                    <motion.img
                        src="https://i.ibb.co/fdNZHZPq/Whats-App-Image-2025-06-10-at-18-25-13-265d2581.jpg"
                        alt="Bookshelf"
                        className="rounded shadow-lg w-full border border-primary/10"
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 1 }}
                    />
                </div>

                {/* Right: Text & Stats */}
                <div ref={ref} className="lg:w-1/2 space-y-6">
                    <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                        Organize your{" "}
                        <span className="text-primary">reading journey</span>{" "}
                        <span className="text-primary">with ease!</span>
                    </h2>

                    <p className="text-lg leading-relaxed text-base-content/90">
                        Build your own bookshelf, follow your reading journey, and connect with fellow book lovers.{" "}
                        <span className="text-primary font-medium">
                            {isClient && (
                                <Typewriter
                                    words={[
                                        'Discover handpicked recommendations.',
                                        'Read trusted community reviews.',
                                        'Unlock fresh stories every day.',
                                    ]}
                                    loop={true}
                                    cursor
                                    cursorStyle="|"
                                    typeSpeed={50}
                                    deleteSpeed={40}
                                    delaySpeed={2000}
                                />
                            )}
                        </span>
                    </p>

                    <div className="flex flex-wrap gap-8 mt-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-left">
                                <p className="text-3xl font-bold text-primary">
                                    {isClient && startAnimation ? (
                                        <CountUp
                                            start={0}
                                            end={stat.value}
                                            duration={2.5}
                                            delay={i * 0.2} // Stagger the animations
                                        />
                                    ) : (
                                        0
                                    )}
                                    +
                                </p>
                                <p className="mt-1 text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <Link
                        to="/bookshelf"
                        aria-label="Explore your bookshelf"
                        className="inline-block mt-10 border border-primary text-base-content px-6 py-3 rounded-lg hover:bg-primary/10 transition duration-300"
                    >
                        Explore More
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FavoriteReadsSection;