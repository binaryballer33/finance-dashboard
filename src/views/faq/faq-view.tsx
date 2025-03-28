import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { PageHeadingCentered } from "@/components/base/page-heading"

export default function FAQView() {
    return (
        <main className="flex-1">
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <PageHeadingCentered
                        description="Find answers to common questions about our products and services."
                        title="Frequently Asked Questions"
                    />
                    <div className="mx-auto mt-8 max-w-3xl">
                        <Accordion className="w-full" collapsible type="single">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="hover:text-xl hover:text-primary data-[state=open]:text-primary">
                                    What is Acme Inc?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Acme Inc is a leading technology company specializing in innovative solutions for
                                    businesses. We provide cutting-edge software and services to help companies
                                    streamline their operations and boost productivity.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="hover:text-xl hover:text-primary data-[state=open]:text-primary">
                                    How do I contact customer support?
                                </AccordionTrigger>
                                <AccordionContent>
                                    You can contact our customer support team via email at support@acmeinc.com, through
                                    our live chat on the website, or by calling our toll-free number 1-800-ACME-HELP.
                                    Our support hours are Monday to Friday, 9 AM to 5 PM EST.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger className="hover:text-xl hover:text-primary data-[state=open]:text-primary">
                                    What payment methods do you accept?
                                </AccordionTrigger>
                                <AccordionContent>
                                    We accept various payment methods including credit cards (Visa, MasterCard, American
                                    Express), PayPal, and bank transfers. For enterprise customers, we also offer
                                    invoicing options.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger className="hover:text-xl hover:text-primary data-[state=open]:text-primary">
                                    Do you offer refunds?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes, we offer a 30-day money-back guarantee on all our products. If you're not
                                    satisfied with your purchase, you can request a full refund within 30 days of the
                                    purchase date. Please contact our customer support team to initiate the refund
                                    process.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-5">
                                <AccordionTrigger className="hover:text-xl hover:text-primary data-[state=open]:text-primary">
                                    How often do you release updates?
                                </AccordionTrigger>
                                <AccordionContent>
                                    We release minor updates and bug fixes on a bi-weekly basis. Major feature updates
                                    are typically released quarterly. All updates are automatically applied to our
                                    cloud-based services, while on-premise solutions receive update notifications.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </section>
        </main>
    )
}
