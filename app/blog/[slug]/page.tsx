import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { blogPosts, getPostBySlug, formatDate } from "@/lib/blog";

const siteUrl = "https://www.jgmobility.nl";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Niet gevonden" };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | JG Mobility`,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
    },
  };
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "JG Mobility",
    },
    publisher: {
      "@type": "Organization",
      name: "JG Mobility",
      url: siteUrl,
    },
    url: `${siteUrl}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <div className="relative pt-28 md:pt-52 pb-20 px-6 overflow-hidden" style={{ backgroundColor: "#001337" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />
        <div className="relative max-w-3xl mx-auto">
          {/* Terug link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-8 transition-opacity hover:opacity-60"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}
          >
            <ArrowLeft size={12} /> Terug naar blog
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-3 py-1"
              style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#ffffff", fontFamily: "var(--font-inter)" }}
            >
              <Tag size={10} /> {post.category}
            </span>
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}
            >
              <Clock size={12} /> {post.readTime} minuten lezen
            </span>
            <span
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}
            >
              {formatDate(post.date)}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-snug"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {post.title}
          </h1>
          <p
            className="mt-5 text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-inter)" }}
          >
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Artikel content */}
      <section className="py-24 px-6" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          {post.sections.map((section, i) => (
            <AnimateOnScroll key={i} delay={i * 0.06}>
              <div className="mb-10">
                {section.heading && (
                  <h2
                    className="text-2xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}
                  >
                    {section.heading}
                  </h2>
                )}
                <p
                  className="text-sm leading-loose mb-4"
                  style={{ color: "rgba(0,19,55,0.65)", fontFamily: "var(--font-inter)" }}
                >
                  {section.body}
                </p>
                {section.list && (
                  <ul className="flex flex-col gap-2 mt-4">
                    {section.list.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm"
                        style={{ color: "rgba(0,19,55,0.65)", fontFamily: "var(--font-inter)" }}
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 flex-shrink-0"
                          style={{ backgroundColor: "#001337" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </AnimateOnScroll>
          ))}

          {/* Divider */}
          <div className="my-12" style={{ borderTop: "1px solid rgba(0,19,55,0.08)" }} />

          {/* Auteur & tag block */}
          <AnimateOnScroll>
            <div
              className="flex items-center gap-5 p-6"
              style={{ backgroundColor: "#f5f5f5", border: "1px solid rgba(0,19,55,0.06)" }}
            >
              <div
                className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-playfair)" }}
              >
                JG
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#001337", fontFamily: "var(--font-inter)" }}>
                  Jimi Gaillard — JG Mobility
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}>
                  Specialist in auto consignatie, inkoop & verkoop — Barendrecht
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Terug naar blog */}
          <div className="mt-12">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-60"
              style={{ color: "#001337", fontFamily: "var(--font-inter)" }}
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Alle artikelen bekijken
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#001337" }}>
        <AnimateOnScroll>
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}
          >
            JG Mobility — Barendrecht
          </p>
          <h2
            className="text-3xl font-bold mb-4 text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Gratis taxatie aanvragen?
          </h2>
          <p
            className="text-sm mb-8 max-w-sm mx-auto"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}
          >
            Wij staan voor je klaar, zeven dagen per week van 10:00 tot 21:00.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold transition-all hover:scale-105"
            style={{ backgroundColor: "#ffffff", color: "#001337", fontFamily: "var(--font-inter)" }}
          >
            Contact opnemen <ArrowRight size={14} />
          </Link>
        </AnimateOnScroll>
      </section>
    </>
  );
}
