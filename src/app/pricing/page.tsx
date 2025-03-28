import Link from "next/link"

import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const pricingTiers = [
    {
        cta: "Get Started",
        description: "Essential features for small teams",
        features: ["Up to 5 users", "10GB storage", "Basic support", "Core features"],
        highlighted: false,
        name: "Basic",
        price: "$9",
    },
    {
        cta: "Try Pro",
        description: "Advanced features for growing businesses",
        features: ["Up to 20 users", "50GB storage", "Priority support", "Advanced features", "API access"],
        highlighted: true,
        name: "Pro",
        price: "$29",
    },
    {
        cta: "Contact Sales",
        description: "Tailored solutions for large organizations",
        features: [
            "Unlimited users",
            "Unlimited storage",
            "24/7 dedicated support",
            "Custom integrations",
            "Advanced security",
        ],
        highlighted: false,
        name: "Enterprise",
        price: "Custom",
    },
]

export default function PricingPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="mb-4 text-center text-4xl font-bold">Pricing Plans</h1>
            <p className="mb-12 text-center text-xl text-muted-foreground">Choose the perfect plan for your needs</p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {pricingTiers.map((tier) => (
                    <Card
                        className={`flex flex-col ${tier.highlighted ? "scale-105 border-primary shadow-lg" : ""}`}
                        key={tier.name}
                    >
                        <CardHeader>
                            <CardTitle className="text-2xl">{tier.name}</CardTitle>
                            <CardDescription>{tier.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="mb-4 text-4xl font-bold">{tier.price}</p>
                            <p className="mb-6 text-muted-foreground">
                                {tier.name === "Enterprise" ? "per month" : "per user/month"}
                            </p>
                            <ul className="space-y-2">
                                {tier.features.map((feature) => (
                                    <li className="flex items-center" key={feature}>
                                        <Check className="mr-2 h-5 w-5 text-green-500" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href={tier.name === "Enterprise" ? "/contact" : "/signup"}>{tier.cta}</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
