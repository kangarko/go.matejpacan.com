"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function FooterSection() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <footer
            ref={ref}
            className="py-10 bg-gray-950 text-gray-400"
        >
            <div className="container max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView ? 1 : 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid md:grid-cols-2 gap-8 mb-8"
                >
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">About This Offer</h4>
                        <p className="text-sm mb-4">
                            This special coaching offer is available to a select few individuals who demonstrate the right attitude and work ethic but may not be able to afford my regular rates.
                        </p>
                        <p className="text-xs">
                            *Case study results are real but not typical. Your results will vary based on many factors including work ethic, persistence, market conditions and more.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
                        <p className="text-sm mb-1">Support: matej@matejpacan.com</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView ? 1 : 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="border-t border-gray-800 pt-6 text-center text-xs"
                >
                    <p>© {new Date().getFullYear()} All Rights Reserved</p>
                    <p className="mt-2">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a> |
                        <a href="#" className="hover:text-white transition-colors ml-2">Terms of Service</a>
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}