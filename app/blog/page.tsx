"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { blogPosts, formatDate } from "@/lib/blog";

const categoryColors: Record<string, string> = {
  Consignatie: "#001337",
  "Auto verkopen": "#001337",
  "Auto kopen": "#001337",
  Taxatie: "#001337",
  Financiering: "#001337",
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative pt-28 md:pt-52 pb-20 px-6 overflow-hidden" style={{ backgroundColor: "#001337" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#ffffff", fontFamily: "var(--font-inter)" }}
          >
            Kennis & tips
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-sm max-w-xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-inter)" }}
          >
            Handige artikelen over auto consignatie, inkoop, verkoop, taxatie en financiering — van JG Mobility.
          </motion.p>
        </div>
      </div>

      {/* Blog grid */}
      <section className="py-24 px-6" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <AnimateOnScroll key={post.slug} delay={i * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
                  style={{
                    border: "1px solid rgba(0,19,55,0.08)",
                    backgroundColor: "#ffffff",
                  }}
                >
                  {/* Kaart header */}
                  <div
                    className="px-6 py-8 flex-1 flex flex-col"
                  >
                    {/* Categorie + leestijd */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-xs font-semibold tracking-widest uppercase px-3 py-1"
                        style={{
                          backgroundColor: categoryColors[post.category] ?? "#001337",
                          color: "#ffffff",
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        {post.category}
                      </span>
                      <span
                        className="flex items-center gap-1.5 text-xs"
                        style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}
                      >
                        <Clock size={12} />
                        {post.readTime} min
                      </span>
                    </div>

                    {/* Titel */}
                    <h2
                      className="text-xl font-bold mb-3 leading-snug group-hover:opacity-70 transition-opacity"
                      style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}
                    >
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p
                      className="text-sm leading-relaxed flex-1"
                      style={{ color: "rgba(0,19,55,0.55)", fontFamily: "var(--font-inter)" }}
                    >
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Kaart footer */}
                  <div
                    className="px-6 py-4 flex items-center justify-between"
                    style={{ borderTop: "1px solid rgba(0,19,55,0.06)" }}
                  >
                    <span
                      className="text-xs"
                      style={{ color: "rgba(0,19,55,0.35)", fontFamily: "var(--font-inter)" }}
                    >
                      {formatDate(post.date)}
                    </span>
                    <span
                      className="flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all"
                      style={{ color: "#001337", fontFamily: "var(--font-inter)" }}
                    >
                      Lees meer <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#f5f5f5" }}>
        <AnimateOnScroll>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}
          >
            Direct een vraag stellen?
          </h2>
          <p
            className="text-sm mb-8 max-w-sm mx-auto"
            style={{ color: "rgba(0,19,55,0.5)", fontFamily: "var(--font-inter)" }}
          >
            We helpen je graag persoonlijk verder. Neem vrijblijvend contact op.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold transition-all hover:scale-105"
            style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)" }}
          >
            Contact opnemen <ArrowRight size={14} />
          </Link>
        </AnimateOnScroll>
      </section>
    </>
  );
}
