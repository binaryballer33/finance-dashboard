import { placeholderImage, placeholderImage2 } from "@/lib/constants"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { PageHeadingCentered } from "@/components/base/page-heading"

export default function AboutUsView() {
    const teamMembers = [
        { image: placeholderImage, name: "Shaquille Rashad Mandy", role: "CEO" },
        { image: placeholderImage, name: "Peter Hernandez", role: "CTO" },
        { image: placeholderImage, name: "Melekot Ferrede", role: "COO" },
    ]

    const aboutUs = [
        {
            description: "To empower businesses with cutting-edge technology solutions that drive growth and success.",
            title: "Our Mission",
        },
        {
            description:
                "To be the leading innovator in our industry, setting new standards for excellence and customer satisfaction.",
            title: "Our Vision",
        },
        {
            description: "Innovation, Integrity, Collaboration, and Customer-Centricity guide everything we do.",
            title: "Our Values",
        },
    ]

    return (
        <main className="flex-1">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    {/* Section Header */}
                    <PageHeadingCentered
                        description="We're a passionate team dedicated to creating innovative solutions for our customers."
                        title="About Us"
                    />

                    {/* About Us Section */}
                    <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                        {/* Section Team Meeting Image */}
                        <img
                            alt="Team meeting"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                            height="310"
                            src={placeholderImage2}
                            width="550"
                        />

                        {/* About Us */}
                        <div className="flex flex-col justify-center space-y-4">
                            <ul className="grid gap-6">
                                {aboutUs.map((item) => (
                                    <li key={item.title}>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold hover:text-primary">{item.title}</h3>
                                            <p className="text-gray-500 dark:text-gray-400">{item.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="w-full bg-accent py-12 dark:bg-accent md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    {/* Section Header */}
                    <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Our Team
                    </h2>

                    {/* Team Member Cards */}
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {teamMembers.map((member) => (
                            <Card className="border-secondary bg-background" key={member.name}>
                                <CardHeader>
                                    <Avatar className="mx-auto h-24 w-24">
                                        <AvatarImage alt={member.name} src={member.image} />
                                        <AvatarFallback>
                                            {member.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <CardTitle>{member.name}</CardTitle>
                                    <CardDescription>{member.role}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
