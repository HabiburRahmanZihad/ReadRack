import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const quotes = [
    { id: 1, text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
    { id: 2, text: "So many books, so little time.", author: "Frank Zappa" },
    { id: 3, text: "Books are a uniquely portable magic.", author: "Stephen King" },
    { id: 4, text: "I have always imagined that Paradise will be a kind of library.", author: "Jorge Luis Borges" },
    { id: 5, text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
    { id: 6, text: "Reading gives us someplace to go when we have to stay where we are.", author: "Mason Cooley" },
    { id: 7, text: "Never trust anyone who has not brought a book with them.", author: "Lemony Snicket" },
    { id: 8, text: "A book is a dream that you hold in your hands.", author: "Neil Gaiman" },
    { id: 9, text: "The only thing that you absolutely have to know, is the location of the library.", author: "Albert Einstein" },
    { id: 10, text: "Books serve to show a man that those original thoughts of his aren’t very new after all.", author: "Abraham Lincoln" },
];

const BookQuotesGallery = () => {
    return (
        <section className="min-h-screen relative bg-base-100 py-20 px-6 overflow-hidden">
            <Helmet>
                <title>Book Quotes Gallery</title>
                <meta name="description" content="Explore inspiring book quotes that fuel your passion for reading." />
            </Helmet>

            {/* Title */}
            <motion.h1
                className="text-4xl font-extrabold mb-8 text-primary text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Book Quotes Gallery
            </motion.h1>

            {/* Quotes grid */}
            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {quotes.map(({ id, text, author }) => (
                    <motion.blockquote
                        key={id}
                        className="relative rounded-3xl p-8 shadow-2xl bg-gradient-to-br from-primary to-secondary border border-white/10 cursor-pointer select-text overflow-hidden group transition-all duration-300"
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: id * 0.08, type: 'spring', stiffness: 100 }}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.3 },
                        }}
                    >
                        <p className="text-white text-xl md:text-2xl font-medium italic leading-relaxed mb-6 drop-shadow-md transition-all duration-300 group-hover:text-white">
                            “{text}”
                        </p>
                        <footer className="text-right text-white font-bold text-lg drop-shadow-md">
                            — {author}
                        </footer>

                        {/* Decorative quote marks */}
                        <div className="absolute top-5 left-5 text-white/10 text-7xl font-extrabold select-none pointer-events-none">
                            “
                        </div>
                        <div className="absolute bottom-5 right-5 text-white/10 text-7xl font-extrabold select-none pointer-events-none rotate-180">
                            ”
                        </div>

                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-3xl border-2 border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none blur-sm" />
                    </motion.blockquote>
                ))}
            </div>
        </section>
    );
};

export default BookQuotesGallery;