import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const LegalDoc = () => {
    return (
        <section className="bg-base-200 py-16 px-6 lg:px-24">
            <Helmet>
                <title>Privacy Policy</title>
                <meta name="description" content="ReadRack Privacy Policy - Learn how we collect, use, and protect your information when you use our platform." />
            </Helmet>
            <motion.div
                className="container mx-auto max-w-4xl text-neutral"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-4xl font-bold text-primary mb-8">Privacy Policy</h1>

                <p className="mb-6">
                    At <strong>ReadRack</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                </p>

                <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">Information We Collect</h2>
                <p className="mb-4">
                    We collect information you provide directly to us when you create an account, log in, or use certain features of ReadRack, such as your name, email address, and reading preferences.
                </p>

                <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">How We Use Your Information</h2>
                <p className="mb-4">
                    We use your information to provide, maintain, and improve our services, communicate with you, personalize your experience, and ensure security.
                </p>

                <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">Information Sharing and Disclosure</h2>
                <p className="mb-4">
                    We do not sell or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our platform and complying with legal requirements.
                </p>

                <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">Your Choices</h2>
                <p className="mb-4">
                    You can update your account information, adjust communication preferences, or delete your account by contacting our support team.
                </p>

                <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">Security</h2>
                <p className="mb-4">
                    We implement reasonable measures to protect your information from unauthorized access or disclosure.
                </p>

                <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">Contact Us</h2>
                <p className="mb-4">
                    If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@readrack.com" className="text-primary hover:underline">privacy@readrack.com</a>.
                </p>

                <p className="text-sm text-base-400 mt-12">Last updated: June 2025</p>
            </motion.div>
        </section>
    );
};

export default LegalDoc;
