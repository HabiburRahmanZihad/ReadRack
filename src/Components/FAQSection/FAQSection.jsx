import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
    {
        question: "How can I track the books I’ve read?",
        answer: "You can use your personal bookshelf to log, rate, and review books you've read.",
    },
    {
        question: "Is membership free?",
        answer: "Yes, registration and most features are completely free to use.",
    },
    {
        question: "Can I recommend books to others?",
        answer: "Absolutely! You can create lists and share them with the community.",
    },
    {
        question: "How do I create a book list?",
        answer: "Simply go to your profile, click on 'Create List', and start adding books.",
    },
    {
        question: "What if I forget my password?",
        answer: "You can reset your password using the 'Forgot Password' link on the login page.",
    },
    {
        question: "How do I contact support?",
        answer: "You can reach out to our support team via the contact form on our website.",
    },
    {
        question: "Can I change my username?",
        answer: "Yes, you can change your username in your account settings.",
    },
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const buttonVariants = {
        initial: { backgroundColor: "var(--color-base-100)" },
        hover: { backgroundColor: "var(--color-base-200)" },
        open: { backgroundColor: "var(--color-base-200)" },
    };

    const iconVariants = {
        closed: { rotate: 0, scale: 1 },
        open: { rotate: 45, scale: 1.2 },
    };

    const answerVariants = {
        collapsed: { height: 0, opacity: 0 },
        expanded: { height: "auto", opacity: 1 },
    };

    return (
        <section className="py-20 px-6 bg-base-200">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl text-primary md:text-5xl font-extrabold mb-6 text-center tracking-tight">
                    Frequently Asked Questions
                </h2>
                <p className="text-center text-secondary mb-16 max-w-3xl mx-auto text-lg">
                    Need help with ReadRack? Here are some common questions we hear from fellow book lovers.
                </p>
                <div className="space-y-6">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <motion.div
                                key={index}
                                className="border border-base-300 rounded-2xl shadow-sm"
                                style={{ backgroundColor: "var(--color-base-100)" }}
                                layout
                                initial={false}
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                            >
                                <motion.button
                                    onClick={() => toggle(index)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-content-${index}`}
                                    id={`faq-header-${index}`}
                                    className="w-full flex justify-between items-center p-6 text-left font-semibold rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-primary transition-all duration-200 hover:scale-105"
                                    style={{ color: "var(--color-base-content)" }}
                                    variants={buttonVariants}
                                    initial="initial"
                                    animate={isOpen ? "open" : "initial"}
                                    whileHover="hover"
                                    layout
                                >
                                    <span className="text-lg md:text-xl">{faq.question}</span>
                                    <motion.span
                                        variants={iconVariants}
                                        initial="closed"
                                        animate={isOpen ? "open" : "closed"}
                                        className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-base-100 text-2xl font-bold transition-transform duration-300"
                                    >
                                        {isOpen ? <FiMinus /> : <FiPlus />}
                                    </motion.span>
                                </motion.button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={`faq-content-${index}`}
                                            key="content"
                                            variants={answerVariants}
                                            initial="collapsed"
                                            animate="expanded"
                                            exit="collapsed"
                                            transition={{
                                                duration: 0.35,
                                                ease: "easeInOut",
                                                type: "spring",
                                                stiffness: 300,
                                            }}
                                            className="px-6 pb-6 leading-relaxed text-base md:text-lg overflow-hidden"
                                            style={{ color: "var(--color-base-content)" }}
                                            role="region"
                                            aria-labelledby={`faq-header-${index}`}
                                        >
                                            {faq.answer}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;