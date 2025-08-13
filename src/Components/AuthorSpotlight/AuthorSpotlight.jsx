import { motion } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const authors = [
    {
        name: "Humayun Ahmed",
        bio: "Humayun Ahmed was one of the most popular and beloved Bangladeshi novelists, dramatists, and filmmakers. His simple yet profound storytelling has touched millions of hearts.",
        img: "https://picsum.photos/200/300?random=1",
        featuredBooks: [
            { title: "Himu", cover: "https://picsum.photos/150/200?random=2" },
            { title: "Misir Ali", cover: "https://picsum.photos/150/200?random=3" },
            { title: "Shonkhonil Karagar", cover: "https://picsum.photos/150/200?random=4" }
        ]
    },
    {
        name: "Anisul Hoque",
        bio: "Anisul Hoque is a renowned Bangladeshi author, screenwriter, and journalist. His novels often focus on love, history, and human resilience.",
        img: "https://picsum.photos/200/300?random=5",
        featuredBooks: [
            { title: "Maa", cover: "https://picsum.photos/150/200?random=6" },
            { title: "Andhokarer Eksho Bochhor", cover: "https://picsum.photos/150/200?random=7" },
            { title: "Fand", cover: "https://picsum.photos/150/200?random=8" }
        ]
    },
    {
        name: "Selina Hossain",
        bio: "Selina Hossain is one of the most celebrated female novelists in Bangladesh, known for her portrayal of rural life and women's struggles.",
        img: "https://picsum.photos/200/300?random=9",
        featuredBooks: [
            { title: "Hangor Nodi Grenade", cover: "https://picsum.photos/150/200?random=10" },
            { title: "Poka Makorer Ghor Bosoti", cover: "https://picsum.photos/150/200?random=11" },
            { title: "Ghum Bhangar Songket", cover: "https://picsum.photos/150/200?random=12" }
        ]
    },
    {
        name: "Imdadul Haq Milan",
        bio: "Imdadul Haq Milan is a prominent Bangladeshi novelist and editor, known for his heartfelt romantic novels and stories about rural Bangladesh.",
        img: "https://picsum.photos/200/300?random=13",
        featuredBooks: [
            { title: "Nodi O Amra", cover: "https://picsum.photos/150/200?random=14" },
            { title: "Jabojjibon", cover: "https://picsum.photos/150/200?random=15" },
            { title: "Bhalobashar Shukh Dukkho", cover: "https://picsum.photos/150/200?random=16" }
        ]
    },
    {
        name: "Syed Shamsul Haq",
        bio: "Syed Shamsul Haq was a legendary Bangladeshi poet, playwright, and novelist, known for his sharp literary style and thought-provoking themes.",
        img: "https://picsum.photos/200/300?random=17",
        featuredBooks: [
            { title: "Neel Dongshon", cover: "https://picsum.photos/150/200?random=18" },
            { title: "Payer Awaj Pawa Jay", cover: "https://picsum.photos/150/200?random=19" },
            { title: "Biday Abishap", cover: "https://picsum.photos/150/200?random=20" }
        ]
    },
    {
        name: "Muhammad Zafar Iqbal",
        bio: "Muhammad Zafar Iqbal is a beloved science fiction writer and educator in Bangladesh, inspiring countless young readers.",
        img: "https://picsum.photos/200/300?random=21",
        featuredBooks: [
            { title: "Ami Topu", cover: "https://picsum.photos/150/200?random=22" },
            { title: "Rasha", cover: "https://picsum.photos/150/200?random=23" },
            { title: "Dipu Number Two", cover: "https://picsum.photos/150/200?random=24" }
        ]
    },
    {
        name: "Jahanara Imam",
        bio: "Jahanara Imam, known as 'Shaheed Janani', was a teacher and activist who documented the 1971 Liberation War in her writing.",
        img: "https://picsum.photos/200/300?random=25",
        featuredBooks: [
            { title: "Ekattorer Dinguli", cover: "https://picsum.photos/150/200?random=26" },
            { title: "Ghatok Dalal Nirmul Committee", cover: "https://picsum.photos/150/200?random=27" },
            { title: "1971: Smriti O Sriti", cover: "https://picsum.photos/150/200?random=28" }
        ]
    },
    {
        name: "Shahidul Zahir",
        bio: "Shahidul Zahir was a Bangladeshi fiction writer, known for his surreal and magical realist narratives.",
        img: "https://picsum.photos/200/300?random=29",
        featuredBooks: [
            { title: "Jibon O Rajnaitik Bastobota", cover: "https://picsum.photos/150/200?random=30" },
            { title: "She Rate Purnima Chilo", cover: "https://picsum.photos/150/200?random=31" },
            { title: "Mukher Dike Dekhi", cover: "https://picsum.photos/150/200?random=32" }
        ]
    }
];

const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 1 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

const AuthorCard = ({ author }) => (
    <div className="grid md:grid-cols-2 gap-8 items-center  mx-auto p-6">
        <motion.img
            src={author.img}
            alt={author.name}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
            whileHover={{ scale: 1.02 }}
        />
        <div>
            <h3 className="text-2xl font-semibold">{author.name}</h3>
            <p className="mt-4 mb-6 text-lg opacity-80">{author.bio}</p>
            <h4 className="font-semibold mb-4">Featured Books:</h4>
            <div className="flex gap-4 flex-wrap">
                {author.featuredBooks.map((book, i) => (
                    <motion.div
                        key={i}
                        className="w-24 h-36 overflow-hidden rounded-lg shadow-md"
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
);

const AuthorSpotlight = () => {
    return (
        <section className="bg-base-200 py-12 px-4 sm:px-6 lg:px-10 my-10">
            <h2 className="text-3xl font-bold mb-8 text-center">✨ Author Spotlight</h2>
            <Carousel
                responsive={responsive}
                infinite
                autoPlay
                autoPlaySpeed={3000}
                pauseOnHover
                showDots
                arrows={false}
            >
                {authors.map((author, index) => (
                    <AuthorCard key={index} author={author} />
                ))}
            </Carousel>
        </section>
    );
};

export default AuthorSpotlight;