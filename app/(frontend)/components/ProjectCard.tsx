import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
    title: string;
    thumbnail?: string;
    summary: string;
    slug?: string;
}

export default function ProjectCard({ title, thumbnail, summary, slug }: ProjectCardProps) {
    return (
        <>
            {slug && (
                <Link href={`/works/${slug}`}>
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <div className="relative w-full h-36 rounded-md bg-accent/20 overflow-hidden">
                            {/* Thumbnail */}
                            {thumbnail && (
                                <Image
                                    src={thumbnail}
                                    alt="Project Thumbnail"
                                    fill
                                    className="object-cover rounded-md"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            )}
                        </div>
                        <h3>{title}</h3>
                        <p className="text-sm text-text/70 text-center">{summary}</p>
                    </div>
                </Link>
            )}
        </>
    )
}