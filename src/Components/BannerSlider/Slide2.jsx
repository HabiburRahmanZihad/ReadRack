import { Typewriter } from 'react-simple-typewriter';
import useMediaQuery from '../../hooks/useMediaQuery';

const Slide2 = () => {
    const isMediumUp = useMediaQuery('(min-width: 768px)');

    return (
        <div className="w-full min-h-[600px] flex flex-col lg:flex-row items-center justify-between px-4 py-10 bg-base-100">
            
            {/* Image */}
            <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                <img
                    className="w-full h-64 sm:h-80 lg:h-full object-cover rounded bg-base-300"
                    src="https://i.ibb.co/DHBQ6zzW/2.png"
                    alt="Reader community sharing books"
                />
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-1/2 px-2 lg:px-8">
                <p className="px-3 py-px mb-4 text-xs font-semibold tracking-wider text-base-100 uppercase rounded-full bg-primary w-fit">
                    Community Driven 📚
                </p>

                {/* Conditional Typewriter */}
                <h2 className="text-2xl md:text-3xl font-bold text-neutral mb-4">
                    {isMediumUp ? (
                        <Typewriter
                            words={[
                                'Build shelves. Share stories. Inspire minds ✨',
                                'Readers don’t just read—they connect 🤝',
                                'Your next favorite book is one review away 🔍',
                                'Reading is better when it’s shared 💬',
                                'Upvote. Review. Repeat. 📚',
                                'Let your bookshelf speak for you 🗂️',
                            ]}
                            loop
                            cursor
                            cursorStyle="|"
                            typeSpeed={60}
                            deleteSpeed={40}
                            delaySpeed={1500}
                        />
                    ) : (
                        'Build shelves. Share stories. Inspire minds ✨'
                    )}
                </h2>

                <p className="text-sm md:text-base text-accent mb-4">
                    Discover what others are reading 👀, leave thoughtful reviews 📝, and upvote books you love ❤️. Every shelf tells a different story — yours can spark the next reader's journey.
                </p>

                <p className="text-sm md:text-base text-accent">
                    Join a passionate community of book lovers 🤝, where ideas are shared, favorites are celebrated, and hidden gems find their spotlight 🌟.
                </p>
            </div>
        </div>
    );
};

export default Slide2;