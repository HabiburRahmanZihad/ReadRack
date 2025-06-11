const Slide3 = () => {
    return (
        <div className="w-full min-h-[500px] flex flex-col lg:flex-row items-center justify-between px-4 py-10 bg-base-100 gap-4">

            {/* Text Content */}
            <div className="w-full lg:w-1/2 px-2 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral mb-4">
                    Visualize your <span className="text-primary">reading journey 📊</span>
                </h2>
                <p className="text-sm md:text-base text-accent mb-4">
                    Every book you finish is a step forward. 📖 ReadRack helps you see the bigger picture with beautiful charts and category breakdowns that reflect your unique reading style.
                </p>

                <p className="text-sm md:text-base text-accent">
                    Set goals 🎯, track your habits ⏱️, and celebrate your milestones 🎉. With ReadRack, every shelf tells your story.
                </p>
            </div>

            {/* Image */}
            <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                <img
                    className="w-full h-64 sm:h-80 lg:h-full object-cover rounded bg-base-300"
                    src="https://i.ibb.co/1YSqqBRz/3.png"
                    alt="Reading progress visuals"
                />
            </div>
        </div>
    );
};

export default Slide3;