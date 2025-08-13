import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaMapMarkerAlt, FaBriefcase, FaEnvelope, FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';


const AboutUs = () => {
    return (
        <section className="bg-base-200 py-16 px-6 lg:px-24" aria-labelledby="aboutus-title">
            <Helmet>
                <title>About Us</title>
                <meta name="description" content="Learn more about ReadRack, our mission, and the team behind the platform. Discover how we aim to revolutionize your reading experience." />
            </Helmet>
            <div className="container mx-auto text-center space-y-12">

                {/* Title Section with Animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <h2 id="aboutus-title" className="text-3xl font-bold text-primary">About Us</h2>

                    <motion.p
                        className="text-lg text-neutral mt-4 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <Typewriter
                            words={[
                                'At ReadRack, we believe every book deserves a place to thrive. Our platform is a dedicated space where book enthusiasts can seamlessly catalog their reading adventures, explore new titles based on honest community reviews, and track their progress in a way that inspires. Gone are the days of scattered book lists—ReadRack offers a streamlined, intuitive solution to help you stay organized, motivated, and connected with fellow readers.',
                            ]}
                            loop={1}
                            cursor
                            cursorStyle="|"
                            typeSpeed={10}
                            deleteSpeed={0}
                            delaySpeed={1500}
                        />
                    </motion.p>

                    {/* Quote */}
                    <motion.p
                        className="mt-4 text-lg italic text-secondary"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 2 }}
                        aria-label="Inspirational quote"
                    >
                        “Stack your stories. Share your shelves.”
                    </motion.p>

                    <motion.p
                        className="mt-2 text-sm text-base-400"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 2.5 }}
                    >
                        Slogan: <strong>“Because every book deserves a space.”</strong>
                    </motion.p>
                </motion.div>

                {/* Our Team Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 3 }}
                >
                    <h3 className="text-2xl font-bold text-primary mt-16">Meet Our Team</h3>
                    <motion.p
                        className="text-lg text-neutral mt-2 max-w-xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        Our team consists of passionate book lovers, developers, and creative minds, all working together to create a better platform for readers everywhere.
                    </motion.p>
                </motion.div>

                {/* Team Member Grid with Animation */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">

                    {/* Team Member 1 */}
                    <motion.article
                        className="group relative flex flex-col items-center text-center bg-base-100 p-6 rounded-lg shadow-md border border-base-300 transition-all duration-300 hover:shadow-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 4.2 }}
                        aria-labelledby="profile-name-2"
                    >
                        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-primary transition-all duration-300 group-hover:w-48 group-hover:h-48">
                            <img
                                src="https://i.ibb.co/KjTSPwGY/Rohitahemed-1.jpg"
                                alt="Portrait of Rohit Ahemed"
                                className="w-full h-full object-cover transition-all duration-300"
                            />
                        </div>

                        <h4 id="profile-name-2" className="text-lg font-semibold text-primary mb-1">Rohit Ahemed</h4>
                        <p className="text-sm text-base-content/60 italic mb-4 tracking-wide">Product Lead & UX Strategist</p>

                        <ul className="text-sm text-base-content space-y-3 w-full">
                            <li className="flex items-center space-x-2">
                                <FaMapMarkerAlt className="w-5 h-5 text-primary" aria-hidden="true" />
                                <span>Chittagong, Bangladesh</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaBriefcase className="w-5 h-5 text-primary" aria-hidden="true" />
                                <span>User-Centered Design</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaEnvelope className="w-5 h-5 text-primary" aria-hidden="true" />
                                <a href="mailto:rohit@readrack.com" className="text-base-content/60 hover:text-primary transition-colors">
                                    rohit@readrack.com
                                </a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaPhoneAlt className="w-5 h-5 text-primary" aria-hidden="true" />
                                <span>+880 1319 ******</span>
                            </li>
                        </ul>

                        {/* Social Media Icons */}
                        <div className="flex justify-center space-x-4 mt-4">
                            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                                className="text-primary hover:text-blue-600 transition-colors text-lg">
                                <FaFacebookF />
                            </a>
                            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                                className="text-primary hover:text-pink-500 transition-colors text-lg">
                                <FaInstagram />
                            </a>
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                                className="text-primary hover:text-blue-400 transition-colors text-lg">
                                <FaTwitter />
                            </a>
                            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                                className="text-primary hover:text-red-500 transition-colors text-lg">
                                <FaYoutube />
                            </a>
                        </div>
                    </motion.article>

                    {/* Team Member 2 */}
                    <motion.article
                        className="group relative flex flex-col items-center text-center bg-base-100 p-6 rounded-lg shadow-md border border-base-300 transition-all duration-300 hover:shadow-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 4 }}
                        aria-labelledby="profile-name-1"
                    >
                        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-primary transition-all duration-300 group-hover:w-48 group-hover:h-48">
                            <img
                                src="https://i.ibb.co/7xY4NYdf/Whats-App-Image-2025-06-09-at-13-14-46-80573a92.jpg"
                                alt="Portrait of Habibur Rahman Zihad"
                                className="w-full h-full object-cover transition-all duration-300"
                            />
                        </div>

                        <h4 id="profile-name-1" className="text-lg font-semibold text-primary mb-1">Habibur Rahman Zihad</h4>
                        <p className="text-sm text-base-content/60 italic mb-4 tracking-wide">Founder & CEO</p>

                        <ul className="text-sm text-base-content space-y-3 w-full">
                            <li className="flex items-center space-x-2">
                                <FaMapMarkerAlt className="w-5 h-5 text-primary" aria-hidden="true" />
                                <span>Chittagong, Bangladesh</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaBriefcase className="w-5 h-5 text-primary" aria-hidden="true" />
                                <span>Leadership & Vision</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaEnvelope className="w-5 h-5 text-primary" aria-hidden="true" />
                                <a href="mailto:habib@readrack.com" className="text-base-content/60 hover:text-primary transition-colors">
                                    habib@readrack.com
                                </a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaPhoneAlt className="w-5 h-5 text-primary" aria-hidden="true" />
                                <span>+880 1329 ******</span>
                            </li>
                        </ul>

                        {/* Social Media Icons */}
                        <div className="flex justify-center space-x-4 mt-4">
                            <a href="https://www.facebook.com/habiburrahmanzihad.zihad" target="_blank" rel="noopener noreferrer"
                                aria-label="Facebook" className="text-primary hover:text-blue-600 transition-colors text-lg">
                                <FaFacebookF />
                            </a>
                            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                                className="text-primary hover:text-pink-500 transition-colors text-lg">
                                <FaInstagram />
                            </a>
                            <a href="https://x.com/xihad_xihad" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                                className="text-primary hover:text-blue-400 transition-colors text-lg">
                                <FaTwitter />
                            </a>
                            <a href="https://www.youtube.com/@xihadxone" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                                className="text-primary hover:text-red-500 transition-colors text-lg">
                                <FaYoutube />
                            </a>
                        </div>
                    </motion.article>

                    {/* Team Member 3 */}
                    <motion.article
                        className="group relative flex flex-col items-center text-center bg-base-100 p-6 rounded-lg shadow-md border border-base-300 transition-all duration-300 hover:shadow-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 4.4 }}
                        aria-labelledby="profile-name-3"
                    >
                        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-primary transition-all duration-300 group-hover:w-48 group-hover:h-48">
                            <img
                                src="https://i.ibb.co/bRMrj8zq/Saimon-1.jpg"
                                alt="Portrait of Saimon Uddin Imam"
                                className="w-full h-full object-cover transition-all duration-300"
                            />
                        </div>

                        <h4 id="profile-name-3" className="text-lg font-semibold text-primary mb-1">Saimon Uddin Imam</h4>
                        <p className="text-sm text-base-content/60 italic mb-4 tracking-wide">Community Manager & Content Creator</p>

                        <ul className="text-sm text-base-content space-y-3 w-full">
                            <li className="flex items-center space-x-2">
                                <FaMapMarkerAlt className="w-5 h-5 text-primary" aria-hidden="true" />
                                <span>Chittagong, Bangladesh</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaBriefcase className="w-5 h-5 text-primary" aria-hidden="true" />
                                <span>Engagement & Curation</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaEnvelope className="w-5 h-5 text-primary" aria-hidden="true" />
                                <a href="mailto:saimon@readrack.com" className="text-base-content/60 hover:text-primary transition-colors">
                                    saimon@readrack.com
                                </a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaPhoneAlt className="w-5 h-5 text-primary" aria-hidden="true" />
                                <span>+880 1879 ******</span>
                            </li>
                        </ul>

                        {/* Social Media Icons */}
                        <div className="flex justify-center space-x-4 mt-4">
                            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                                className="text-primary hover:text-blue-600 transition-colors text-lg">
                                <FaFacebookF />
                            </a>
                            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                                className="text-primary hover:text-pink-500 transition-colors text-lg">
                                <FaInstagram />
                            </a>
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                                className="text-primary hover:text-blue-400 transition-colors text-lg">
                                <FaTwitter />
                            </a>
                            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                                className="text-primary hover:text-red-500 transition-colors text-lg">
                                <FaYoutube />
                            </a>
                        </div>
                    </motion.article>

                </div>

            </div>
        </section>
    );
};

export default AboutUs;
