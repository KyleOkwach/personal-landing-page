interface ExperienceCardProps {
    year: string;
    title: string;
    description: string;
}

export default function ExperienceCard({year, title, description}: ExperienceCardProps) {
    return (
        <div className="flex flex-row gap-4">
            <h3 className="text-lg font-semibold">{year}</h3>
            <div className="flex flex-col w-full">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-text/70">{description}</p>
            </div>
        </div>
    )
}