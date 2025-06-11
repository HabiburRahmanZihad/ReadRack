import { Typewriter } from 'react-simple-typewriter';
import useMediaQuery from '../../hooks/useMediaQuery';

const Slide1 = () => {
    const isMediumUp = useMediaQuery('(min-width: 768px)');

    return (
        <div className="w-full min-h-[500px] p-4 sm:p-10 text-neutral flex justify-center bg-base-100">
            <div className="flex flex-col max-w-4xl w-full overflow-hidden rounded">
                {/* Image */}
                <img
                    src="https://i.ibb.co/1fRwpNZr/1.png"
                    alt="Bookshelf and reader"
                    className="w-full h-64 sm:h-80 lg:h-[340px] bg-base-300 object-cover rounded border border-primary shadow-lg"
                    loading="lazy"
                />

                {/* Content Card */}
                <div className="p-6 pb-12 mx-4 -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-auto lg:rounded-md bg-base-100 shadow-lg">
                    <div className="space-y-2">
                        <a
                            href="#"
                            rel="noopener noreferrer"
                            className="inline-block text-2xl font-semibold sm:text-3xl hover:underline transition duration-150 text-primary"
                        >
                            {isMediumUp ? (
                                <Typewriter
                                    words={['Stack Your Stories, Your Way 📚']}
                                    loop={false}
                                    cursor
                                    cursorStyle="|"
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                />
                            ) : (
                                'Stack Your Stories, Your Way 📚'
                            )}
                        </a>
                        <p className="text-xs text-secondary">
                            By{' '}
                            <a
                                href="#"
                                rel="noopener noreferrer"
                                className="hover:underline text-secondary"
                            >
                                The ReadRack Team
                            </a>
                        </p>
                    </div>

                    {/* Body Text */}
                    <div className="text-neutral">
                        <p>
                            Dive into your personal reading journey 📖 — track books, write reviews ✍️, and share your shelf with fellow readers 🤝. ReadRack turns every book into a milestone worth showcasing.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide1;