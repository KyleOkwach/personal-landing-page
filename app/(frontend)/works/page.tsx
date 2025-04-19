import { summary } from "framer-motion/client";
import ProjectCard from "../components/ProjectCard";
import Segment from "../components/Segment";
import { desc } from "@payloadcms/db-vercel-postgres/drizzle";
import ExperienceCard from "../components/ExperienceCard";

export default function Page() {
    const projects = [
        {
            title: 'Text Summarizer',
            summary: 'A tool used to summarize text. Builtusing transformers.',
            thumbnail: '/placeholder_screen.png',
            slug: 'proj1',
        },
        {
            title: 'Chess Engine',
            summary: 'A chess engine built using Python.',
            slug: 'proj2',
        },
    ];

    const experience = [
        {
            year: '2022',
            title: 'Freelancer - Upwork',
            description: 'Worked on various projects including web development and data analysis.',
        },
        {
            year: '2024',
            title: 'Intern - HF Group',
            description: 'Worked on automating internal processes using he microsoft power platform and building data pipelines.',
        },
    ];

    return (
        <div className="flex flex-col gap-8">
            <Segment title="Professional Experience">
                <div className="flex flex-col gap-4">
                    {experience.map((exp, index) => (
                        <ExperienceCard
                            title={exp.title}
                            year={exp.year}
                            description={exp.description}
                            key={index}
                        />
                    ))}
                </div>
            </Segment>
            <Segment title="Projects">
                <div className="grid grid-cols-2 gap-4">
                    {projects.map((project, index) => (
                        <ProjectCard 
                            key={index}
                            title={project.title}
                            thumbnail={project.thumbnail}
                            summary={project.summary}
                            slug={project.slug}
                        />
                    ))}
                </div>
            </Segment>
        </div>
    )
}