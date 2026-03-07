export const getSharedMetadata = (title: string, description: string) => ({
  keywords: [
    "Ahmed Ismail",
    "Full Stack Developer",
    "Next.js Developer",
    "Laravel Expert",
    "NestJS Backend",
    "مطور مواقع",
    "برمجة فول ستاك",
    "تطوير الويب",
    "Web Development Egypt",
    "Node.js Developer",
    "Portfolio",
    "Modern UI/UX",
    "Email Reputation Systems", // مهارة فريدة لديك
    "API Development",
    "Security & CORS",
    "SaaS Architecture",
    "Frontend Engineering",
    "Backend Optimization",
    "TypeScript",
    "Scalable Web Apps",
  ],
  openGraph: {
    title,
    description,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://ahmed-ismail.me"}`, // رابط موقعك
    siteName: "Ahmed Ismail | Portfolio",
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://ahmed-ismail.me"}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Ahmed Ismail - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      `${process.env.NEXT_PUBLIC_BASE_URL || "https://ahmed-ismail.me"}/og-image.png`,
    ],
  },
});
