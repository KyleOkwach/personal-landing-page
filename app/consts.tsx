import { User, Briefcase, Github, File } from "lucide-react"
import { SlSocialGithub } from "react-icons/sl"

export const navItems = [
    {
        name: "About Me",
        path: "/about",
        icon: <User size={16} />
    },
    {
        name: "My Experience",
        path: "/experience",
        icon: <Briefcase size={16} />
    },
    {
        name: "Projects",
        path: "/projects",
        icon: <File size={16} />
    },
]

export const socials = [
    {
        link: "github.com/KyleOkwach",
        icon: <SlSocialGithub size={16} />
    }
]