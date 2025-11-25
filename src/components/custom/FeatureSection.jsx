const featureData = [
    {
        imageSrc: '/images/image1.jpg',
        headline: 'From Ancient Ruins to Modern Skylines',
        description: 'Anyone can find a famous landmark. Our AI helps you discover the soul of a destination. We combine iconic sights with hidden gems to create a balanced, authentic travel experience tailored to your curiosity and budget. Plan less, discover more.'
    },
    {
        imageSrc: '/images/image4.jpg',
        headline: 'Your World, Your Way',
        description: 'From the sun-drenched squares of Europe to the sprawling landscapes of ancient lands, your perfect trip is unique. Our AI listens to your travel style and crafts a one-of-a-kind journey, ensuring every destination feels like it was chosen just for you.'
    }
];

const StarIcon = () => (
    <svg
        className="w-8 h-8 mb-4 text-white"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M24 0L28.2426 19.7574L48 24L28.2426 28.2426L24 48L19.7574 28.2426L0 24L19.7574 19.7574L24 0Z"
            fill="currentColor"
        />
    </svg>
);

const FeatureCard = ({ imageSrc, headline, description }) => {
    return (
        <div
            className="relative w-full h-[550px] rounded-xl overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${imageSrc})` }}
        >
          
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-8 md:p-10 text-white">
                <StarIcon />
                <h3 className="font-serif text-3xl lg:text-4xl font-medium leading-tight mb-4">
                    {headline}
                </h3>
                <div className="w-16 h-0.5 bg-white/80 mb-6" />
                <p className="max-w-md text-white leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export function FeatureSection() {
    return (
        <section className=" py-12 px-4 sm:px-6 lg:py-20 lg:px-8">
            <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featureData.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        imageSrc={feature.imageSrc}
                        headline={feature.headline}
                        description={feature.description}
                    />
                ))}

            </div>
        </section>
    );
}