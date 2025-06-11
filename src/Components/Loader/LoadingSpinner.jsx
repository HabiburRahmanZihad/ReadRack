import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const messages = [
    "🔶 Building your perfect book haven...",
    "📙 Your next chapter is loading...",
    "🍂 Polishing the spines of your stories...",
    "🧡 Crafting your story stacks...",
    "📖 Whispering tales onto your shelves...",
    "🌅 Turning pages behind the scenes...",
    "📦 Shelving your literary treasures...",
    "🧹 Tidying up your story collection...",
    "🖋️ Writing the prologue of your experience...",
    "🔖 Bookmarking your favorites...",
    "📅 Aligning chapters for you...",
    "🧩 Piecing together your story puzzle...",
    "✨ Adding a touch of magic to your shelf...",
    "🚪 Opening the door to new stories...",
    "📬 Delivering tales to your shelf...",
];


export default function LoadingSpinner() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, []);

    // Typing animation variants
    const typingVariants = {
        hidden: { width: 0, opacity: 0 },
        visible: {
            width: "100%",
            opacity: 1,
            transition: {
                width: { type: "spring", stiffness: 100, damping: 20 },
                opacity: { duration: 0.1 },
            },
        },
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-100 text-neutral">
            <div className="flex flex-col items-center space-y-6 animate-fade-in">
                {/* Glowing Dual Ring Spinner */}
                <div
                    className="relative w-20 h-20"
                    aria-label="Loading"
                    role="status"
                >
                    <div className="absolute inset-0 border-4 border-primary rounded-full opacity-20"></div>
                    <div
                        className="w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_20px_#CC9600]"
                        style={{ animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
                    />
                </div>

                {/* Typing Animated Loading Message */}
                <motion.p
                    className="text-xl font-serif font-semibold tracking-wide text-primary select-none overflow-hidden whitespace-nowrap border-r-2 border-primary pr-1"
                    variants={typingVariants}
                    initial="hidden"
                    animate="visible"
                    key={index}
                    aria-live="polite"
                    aria-atomic="true"
                    onAnimationComplete={() => {
                        /* Optional: do something when animation finishes */
                    }}
                >
                    {messages[index]}
                </motion.p>
            </div>
        </div>
    );
}
