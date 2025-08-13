// ReaderTestimonials.jsx
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Humayun Ahmed",
        role: "Author",
        text: "ReadRack makes literature more accessible to everyone. It’s a wonderful platform for book lovers.",
        img: "https://randomuser.me/api/portraits/men/12.jpg"
    },
    {
        name: "Naznin Akter",
        role: "Writer & Activist",
        text: "I appreciate how ReadRack helps readers explore diverse voices and perspectives.",
        img: "https://randomuser.me/api/portraits/women/21.jpg"
    },
    {
        name: "Anisul Hoque",
        role: "Novelist & Journalist",
        text: "A modern platform like ReadRack connects readers with the soul of Bangladeshi literature.",
        img: "https://randomuser.me/api/portraits/men/14.jpg"
    },
    {
        name: "Selina Hossain",
        role: "Novelist",
        text: "The way ReadRack curates and presents books is both engaging and inspiring.",
        img: "https://randomuser.me/api/portraits/women/22.jpg"
    },
    {
        name: "Imdadul Haq Milan",
        role: "Author & Editor",
        text: "ReadRack feels like a bridge between writers and the new generation of readers.",
        img: "https://randomuser.me/api/portraits/men/15.jpg"
    },
    {
        name: "Syed Shamsul Haq",
        role: "Poet & Playwright",
        text: "A platform that values stories will always be close to my heart. ReadRack is one of them.",
        img: "https://randomuser.me/api/portraits/men/26.jpg"
    },
    {
        name: "Anika Rahman",
        role: "Book Reviewer",
        text: "I’ve discovered so many amazing local books through ReadRack’s recommendations.",
        img: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
        name: "Farhan Kabir",
        role: "University Student",
        text: "ReadRack helps me find books that match my taste without wasting hours searching.",
        img: "https://randomuser.me/api/portraits/men/69.jpg"
    },
    {
        name: "Mitu Chowdhury",
        role: "Literature Teacher",
        text: "I encourage my students to explore ReadRack to develop their love for reading.",
        img: "https://randomuser.me/api/portraits/women/54.jpg"
    },
    {
        name: "Rezaul Karim",
        role: "Freelance Writer",
        text: "A great place to connect with other book lovers and share my reading journey.",
        img: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    {
        name: "Shama Islam",
        role: "Poet",
        text: "ReadRack’s curated lists are a treasure for poetry lovers like me.",
        img: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    {
        name: "Tanvir Hossain",
        role: "Aspiring Author",
        text: "Seeing Bangladeshi literature highlighted on ReadRack motivates me to write more.",
        img: "https://randomuser.me/api/portraits/men/31.jpg"
    }
];


const ReaderTestimonials = () => {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-10 my-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-primary mb-10">Reader Testimonials</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        className="bg-base-200 p-6 rounded-2xl shadow-md"
                        whileHover={{ scale: 1.03 }}
                    >
                        <img
                            src={t.img}
                            alt={t.name}
                            className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                        />
                        <p className="italic mb-4">"{t.text}"</p>
                        <h3 className="font-semibold">{t.name}</h3>
                        <p className="text-sm opacity-70">{t.role}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ReaderTestimonials;