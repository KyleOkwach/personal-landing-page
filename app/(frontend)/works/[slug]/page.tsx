"use client"

import { ChevronRight, Laptop, Code, ExternalLink, Github, X, Calendar, User, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Segment from "../../components/Segment"
import ImageModal from "../../components/ImageModal"
import { useState } from "react"
import { format } from "date-fns"

interface Project {
    title: string;
    slug: string;
    description: string;
    featuredImage: {
        url: string;
        alt: string;
    };
    images: { image: { url: string; alt: string }; caption: string }[];
    keyFeatures: string[];
    category: string;
    tags: string[];
    projectUrl: string;
    githubUrl: string;
    status: string;
    date: string;
    client: string;
    featured: boolean;
    summary?: string;
    technologies?: string[];
    mainImage?: string;
    gallery?: { src: string; alt: string }[];
}

export default function Page({ project }: { project: Project }) {
    // Project details
    const projectData = project || {
        title: "Smart Home Dashboard",
        slug: "smart-home-dashboard",
        description: "A comprehensive dashboard for controlling and monitoring smart home devices with real-time data visualization and mobile responsiveness.",
        featuredImage: {
            url: "/placeholder_screen.png",
            alt: "Dashboard main view"
        },
        images: [
            { image: { url: "/placeholder_screen.png", alt: "Dashboard view" }, caption: "Main dashboard interface showing connected devices" },
            { image: { url: "/placeholder_screen.png", alt: "Mobile view" }, caption: "Mobile responsive interface" },
            { image: { url: "/placeholder_screen.png", alt: "Analytics panel" }, caption: "Energy consumption analytics" },
            { image: { url: "/placeholder_screen.png", alt: "Settings screen" }, caption: "User settings and preferences panel" }
        ],
        keyFeatures: [
            "Real-time device status updates via WebSocket connections",
            "Customizable dashboard with drag-and-drop widgets",
            "Energy consumption analytics with interactive charts",
            "Responsive design for seamless mobile and desktop use"
        ],
        category: "web",
        tags: ["react", "nextjs", "typescript", "nodejs"],
        projectUrl: "https://project-demo.com",
        githubUrl: "https://github.com/username/project-repo",
        status: "published",
        date: "2024-04-15",
        client: "Smart Living Inc.",
        featured: true
    };

    // State for modal
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState({ url: "", caption: "" });
    
    // Open modal with specific image
    const openModal = (url: string, caption: string) => {
      setSelectedImage({ url, caption });
      setModalOpen(true);
    };
    
    // Get formatted date
    const formattedDate = projectData.date ? format(new Date(projectData.date), "MMMM d, yyyy") : "";
    
    // Map category value to label
    const categoryMap = {
        web: "Web Development",
        mobile: "Mobile App",
        design: "Design",
        other: "Other"
    };
    
    // Map tag values to labels
    const tagMap = {
        react: "React",
        nextjs: "Next.js",
        typescript: "TypeScript",
        nodejs: "Node.js",
        "ui-ux": "UI/UX"
    };

    return (
        <div className="flex flex-col gap-6 w-full pb-12">
            {/* Image Modal */}
            <ImageModal 
              image={selectedImage.url} 
              alt={selectedImage.caption} 
              isOpen={modalOpen} 
              onClose={() => setModalOpen(false)} 
            />
            
            {/* Breadcrumb Navigation */}
            <div className="flex flex-row items-center gap-2">
                <Link href={`/works`}>
                    <h3 className="text-md text-primary hover:underline">Works</h3>
                </Link>
                <ChevronRight size={16} strokeWidth={1} />
                <h1 className="text-2xl font-semibold">{projectData.title}</h1>
            </div>
            
            {/* Main Image */}
            <div 
              className="relative w-full aspect-video bg-accent/50 rounded-lg overflow-hidden shadow-md cursor-pointer" 
              onClick={() => openModal(projectData.featuredImage.url, projectData.title)}
            >
                <Image
                    src={projectData.featuredImage.url}
                    alt={`${projectData.title} preview`}
                    fill
                    className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                  <span className="bg-black/60 text-white px-4 py-2 rounded-md">View Larger</span>
                </div>
            </div>

            {/* Project Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-accent/10 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-primary" />
                    <span className="text-sm">{formattedDate}</span>
                </div>
                {projectData.client && (
                    <div className="flex items-center gap-2">
                        <User size={18} className="text-primary" />
                        <span className="text-sm">{projectData.client}</span>
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <Tag size={18} className="text-primary" />
                    <span className="text-sm">{categoryMap[projectData.category as keyof typeof categoryMap] || projectData.category}</span>
                </div>
            </div>

            {/* Overview Section */}
            <Segment 
                title="Overview" 
                icon={<Laptop />}
                description={projectData.description}
            >
                <div className="flex flex-wrap gap-2">
                    {projectData.tags && projectData.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {tagMap[tag as keyof typeof tagMap] || tag}
                        </span>
                    ))}
                </div>
            </Segment>
            
            {/* Key Features Section */}
            <Segment 
                title="Key Features" 
                icon={<Code />}
            >
                <ul className="list-disc pl-5 space-y-2">
                    {projectData.keyFeatures.map((feature, index) => (
                        <li key={index}>
                            {feature}
                        </li>
                    ))}
                </ul>
            </Segment>
            
            {/* Links Section */}
            <Segment 
                title="Project Links" 
                icon={<ExternalLink />}
            >
                <div className="flex flex-wrap gap-4">
                    {projectData.projectUrl && (
                        <a href={projectData.projectUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors flex items-center gap-2">
                            <ExternalLink size={16} />
                            Live Demo
                        </a>
                    )}
                    {projectData.githubUrl && (
                        <a href={projectData.githubUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors flex items-center gap-2">
                            <Github size={16} />
                            Source Code
                        </a>
                    )}
                </div>
            </Segment>
            
            {/* Image Gallery Section */}
            <Segment 
                title="Gallery" 
                icon={<Laptop />}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projectData.images.map((image, index) => (
                        <div 
                          key={index} 
                          className="relative aspect-video bg-accent/50 rounded-md overflow-hidden shadow-sm cursor-pointer"
                          onClick={() => openModal(image.image.url, image.image.alt)}
                        >
                            <Image
                                src={image.image.url}
                                alt={image.image.alt}
                                fill
                                className="object-cover rounded-md hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                              <span className="bg-black/60 text-white px-3 py-1 rounded-md text-sm">View Larger</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Segment>
            
            {/* Next/Previous Project Navigation */}
            <div className="flex justify-between pt-6 mt-4 border-t border-accent/30">
                <Link href="/works/previous-project" className="flex items-center gap-2 text-primary hover:underline">
                    <ChevronRight className="rotate-180" size={16} strokeWidth={1} />
                    Previous Project
                </Link>
                <Link href="/works/next-project" className="flex items-center gap-2 text-primary hover:underline">
                    Next Project
                    <ChevronRight size={16} strokeWidth={1} />
                </Link>
            </div>
        </div>
    )
}