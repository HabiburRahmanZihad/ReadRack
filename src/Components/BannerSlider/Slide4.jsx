import { FiBookOpen } from 'react-icons/fi';
import { Link } from 'react-router';
import { Typewriter } from 'react-simple-typewriter';
import useMediaQuery from '../../hooks/useMediaQuery';

const Slide4 = () => {
    const isMdUp = useMediaQuery('(min-width: 768px)');

    return (
        <div className="w-full min-h-[500px] flex flex-col lg:flex-row items-center justify-between px-4 py-10 bg-base-100 gap-2">

            <div className="w-full lg:w-1/2 px-2 lg:px-8">
                <p className="px-3 py-px mb-4 text-xs font-semibold tracking-wider text-base-100 uppercase rounded-full bg-primary w-fit">
                    Ready to Begin? 🚀
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral mb-4">
                    {isMdUp ? (
                        <Typewriter
                            words={[
                                'Your next chapter starts right here 📖',
                                'Track, review & share your reads 📚',
                                'A new reading adventure begins 🚀'
                            ]}
                            loop={true}
                            cursor
                            cursorStyle="|"
                            typeSpeed={60}
                            deleteSpeed={40}
                            delaySpeed={1500}
                        />
                    ) : (
                        'Your next chapter starts right here 📖'
                    )}
                </h2>

                <p className="text-sm md:text-base text-accent mb-6">
                    Whether you're a casual reader or a lifelong bookworm 🐛, ReadRack makes it easy to track your reads, share reviews, and explore new favorites. Join a community that celebrates every story, one shelf at a time. 🌟
                </p>

                {/* CTA Button */}
                <Link
                    to="/bookshelf"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-base-100 bg-primary rounded shadow hover:bg-secondary transition-colors duration-200"
                >
                    Start Stacking
                    <FiBookOpen className="text-base-100 text-lg" />
                </Link>
            </div>

            <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                <img
                    className="w-full h-64 sm:h-80 lg:h-full object-cover rounded bg-base-300"
                    src="https://i.ibb.co/yFhfJYP3/4.png"
                    alt="Books and cozy reading corner"
                />
            </div>
        </div>
    );
};

export default Slide4;