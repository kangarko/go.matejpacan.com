import { Metadata } from "next";
import HeroSection from "@/components/vsl/HeroSection";
import CaseStudies from "@/components/vsl/CaseStudies";
import AboutSection from "@/components/vsl/AboutSection";
import OfferSection from "@/components/vsl/OfferSection";
import FooterSection from "@/components/vsl/FooterSection";
import { ThemeProvider } from "@/components/ThemeProvider";
import UrgencyHeader from "@/components/vsl/UrgencyHeader";
import CalendlyEmbed from "@/components/vsl/CalendlyEmbed";

export const metadata: Metadata = {
    title: "1-on-1 Coaching Opportunity | Beginner Offer",
    description: "Join my exclusive 1-on-1 coaching program at 75% off the regular price. 2 spots available every 6 months.",
};

export default function SpecialOfferPage() {
    return (
        <ThemeProvider>
            <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
                <UrgencyHeader />
                <HeroSection />
                <CaseStudies />
                <AboutSection />
                <OfferSection />
                <section id="strategy-call" className="py-10 md:py-20 bg-gray-900">
                    <div className="container max-w-4xl mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                                Book Your Strategy Call
                            </h2>
                            <p className="text-lg text-gray-400">
                                The calendar might take up to 5 seconds to load. NB: To respect our time (I take these calls myself), there is a refundable $50 USD deposit, which will be refunded if we do not end up working together.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-800 via-gray-800/80 to-gray-800 rounded-xl p-1 shadow-xl border border-gray-700/50 rounded-[10px] overflow-hidden">
                            <CalendlyEmbed url="https://calendly.com/matejpacan/business?hide_event_type_details=1&hide_gdpr_banner=1" />
                        </div>
                    </div>
                </section>
                <FooterSection />
            </main>
        </ThemeProvider>
    );
}