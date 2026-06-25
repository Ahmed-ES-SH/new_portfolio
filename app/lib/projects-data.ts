export type ProjectCategory = "frontend" | "backend" | "fullstack";

export interface Project {
  folderName: string;
  slug: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  images: string[];
  skills: string[];
  linkSourceCode: string;
  linkDocs?: string;
  projectLink: string;
  projectCover: string;
  isPrivate: boolean;
  categories: ProjectCategory[];
}

export const projectsConfig: Omit<Project, "images">[] = [
  {
    folderName: "sanad",
    slug: "sanad",
    title: {
      en: "SANAD",
      ar: "SANAD",
    },
    description: {
      en: "Sanad is a comprehensive full-stack service marketplace built with Next.js and NestJS, created to connect service providers with customers through one integrated platform. It includes service browsing and booking, cart management, secure payments with Stripe, real-time communication with Socket.io, blog and content management, notifications, user and admin dashboards, and full bilingual support for English and Arabic.",
      ar: "ساناد هي منصة متكاملة لسوق الخدمات مبنية باستخدام Next.js وNestJS، وتهدف إلى ربط مقدمي الخدمات بالعملاء من خلال منصة واحدة متكاملة. تتضمن المنصة تصفح الخدمات وحجزها، وإدارة السلة، والمدفوعات الآمنة عبر Stripe، والتواصل الفوري عبر Socket.io، وإدارة المدونات والمحتوى، ونظام إشعارات كامل، ولوحات تحكم للمستخدمين والإدارة، مع دعم كامل للغتين العربية والإنجليزية.",
    },
    skills: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "TailwindCSS",
      "Zustand",
      "TanStack Query",
      "Framer Motion",
      "Stripe",
      "Socket.io",
      "Responsive Design",
    ],
    projectCover: "/projects-covers/sanad-cover.webp",
    linkSourceCode: "https://github.com/Ahmed-ES-SH/Frontend-Sanad",
    projectLink: "https://frontend-sanad.vercel.app",
    isPrivate: true,
    categories: ["frontend", "backend", "fullstack"],
  },
  {
    folderName: "flick-hq",
    slug: "flick-hq",
    title: {
      en: "Flick HQ",
      ar: "Flick HQ",
    },
    description: {
      en: "Flick HQ is a full-stack entertainment discovery platform built with Next.js and NestJS, integrating the TMDb API to help users explore trending movies and TV shows. The platform features secure authentication with JWT and Google OAuth, Stripe-powered subscription billing, real-time updates via Pusher, and a stunning cinema-grade UI with full bilingual (English/Arabic) support. Users can manage personalized watch lists, browse content, and enjoy an immersive experience enhanced with smooth Framer Motion animations.",
      ar: "Flick HQ هي منصة متكاملة لاكتشاف المحتوى الترفيهي مبنية بتقنية Full-Stack باستخدام Next.js و NestJS، وتتكاتل مع واجهة TMDb API لمساعدة المستخدمين على استكشاف الأفلام والبرامج التلفزيونية الرائجة. تتميز المنصة بتسجيل دخول آمن باستخدام JWT و Google OAuth، ونظام اشتراكات مدعوم من Stripe، وتحديثات فورية عبر Pusher، وواجهة سينمائية مذهلة تدعم اللغتين العربية والإنجليزية بشكل كامل. يمكن للمستخدمين إدارة قوائم المشاهدة الشخصية وتصفح المحتوى والاستمتاع بتجربة غامرة مع رسوم متحركة سلسة باستخدام Framer Motion.",
    },
    skills: [
      "Next.js",
      "NestJS",
      "TailwindCSS",
      "PostgreSQL",
      "Zustand",
      "TanStack Query",
      "Framer Motion",
      "Stripe",
      "Responsive Design",
    ],
    projectCover: "/projects-covers/flick-hq-cover.webp",
    linkSourceCode: "https://github.com/Ahmed-ES-SH/TMDB-App",
    projectLink: "https://tmdb-app-kappa.vercel.app",
    isPrivate: false,
    categories: ["frontend", "backend", "fullstack"],
  },

  {
    folderName: "kafe",
    slug: "kafe-wafe",
    title: {
      en: "Kafe-Wafe",
      ar: "Kafe-Wafe",
    },
    description: {
      en: "The Kafe wafe website's front-end is a modern digital interface inspired by micro-services platforms like Fiverr, focusing entirely on user experience and ease of interaction. It allows users to browse services in an organized manner through categories and advanced search, with clear details for each service including description, price, turnaround time, and ratings. The interface also provides an account system for users, enabling them to register, log in, manage their orders, track service status, and easily communicate with service providers. The interface supports a smooth and responsive user experience across various devices, making the search, ordering, and interaction processes more efficient and intuitive.",
      ar: "واجهة موقع Kafe wafe الأمامية هي واجهة رقمية حديثة مستوحاة من فكرة منصات الخدمات المصغرة مثل Fiverr وتركز بشكل كامل على تجربة المستخدم وسهولة التفاعل حيث تتيح للمستخدمين تصفح الخدمات المعروضة بطريقة منظمة من خلال التصنيفات والبحث المتقدم مع إمكانية عرض تفاصيل كل خدمة بشكل واضح يشمل الوصف والأسعار ومدة التنفيذ والتقييمات كما توفر الواجهة نظام حسابات للمستخدمين يمكنهم من التسجيل وتسجيل الدخول وإدارة طلباتهم ومتابعة حالة الخدمات والتواصل مع مقدمي الخدمة بسهولة وتدعم الواجهة تجربة استخدام سلسة وسريعة الاستجابة على مختلف الأجهزة مما يجعل عملية البحث والطلب والتفاعل أكثر كفاءة ووضوح",
    },
    skills: [
      "Next.js",
      "TailwindCSS",
      "Context",
      "Framer Motion",
      "Responsive Design",
    ],
    projectCover: "/projects-covers/kafe-wafe-cover.jpg",
    linkSourceCode: "https://github.com/Ahmed-ES-SH/kafe-frontend",
    projectLink: "https://kafe-front.vercel.app/en",
    isPrivate: false,
    categories: ["frontend"],
  },
  {
    folderName: "machic",
    slug: "machie-ecommerce-store",
    title: {
      en: "Machie Ecommerce Store",
      ar: "متجر - Machie",
    },
    description: {
      en: "Welcome to a fully responsive, feature-rich e-commerce platform built with Next.js 15. This project offers a realistic online shopping experience by integrating data from DummyJSON API, providing a practical environment to build, test, and explore e-commerce features with real-world-like product information. Check out the repository to discover more about the features and technologies used.",
      ar: "مرحبًا بكم في منصة تجارة إلكترونية متجاوبة بالكامل وغنية بالميزات، مبنية باستخدام Next.js 15. يقدم هذا المشروع تجربة تسوق إلكترونية واقعية من خلال دمج بيانات واجهة برمجة تطبيقات DummyJSON، مما يوفر بيئة عملية لبناء واختبار واستكشاف ميزات التجارة الإلكترونية مع معلومات منتجات واقعية. تفضلوا بزيارة الكود لمعرفة المزيد عن الميزات والتقنيات المستخدمة.",
    },
    skills: [
      "API",
      "Next.js",
      "Tailwindcss",
      "clerk",
      "zuStand",
      "Responsive Design",
    ],
    projectCover: "/projects-covers/machie-cover.jpg",
    linkSourceCode: "https://github.com/Ahmed-ES-SH/machie-store",
    projectLink: "https://machie-store.vercel.app",
    isPrivate: false,
    categories: ["frontend"],
  },
  {
    folderName: "borsan",
    slug: "borsan-academy",
    title: {
      en: "Borsan Academy",
      ar: "أكاديمية بورسان",
    },
    description: {
      en: "Borsan Academy is a modern, responsive web application for browsing and exploring educational courses across various categories. The platform is built with performance, scalability, and user experience at its core. It features full bilingual support (Arabic & English) through a completely custom multilingual system — no external i18n libraries used. Check out the repository to discover more about the features and technologies used.",
      ar: "أكاديمية بورسان هي منصة ويب تعليمية حديثة ومتجاوبة، تتيح تصفّح واستكشاف الدورات التعليمية ضمن تصنيفات متعددة. تم تطوير المنصة مع التركيز على الأداء، وقابلية التوسّع، وتجربة المستخدم. تدعم المنصة واجهتين باللغتين العربية والإنجليزية من خلال نظام متعدد اللغات مخصص بالكامل دون استخدام أي مكتبات خارجية. يمكنك الاطلاع على الكود لمعرفة المزيد حول المميزات والتقنيات المستخدمة.",
    },
    skills: [
      "Next.js",
      "TailwindCSS",
      "Framer Motion",
      "Clerk",
      "Responsive Design",
      "MultiLanguages",
    ],
    projectCover: "/projects-covers/borsan-cover-2.jpg",
    linkSourceCode: "https://github.com/Ahmed-ES-SH/Borsan-Academy",
    projectLink: "https://borsan-frontend.vercel.app",
    isPrivate: false,
    categories: ["frontend"],
  },
];

export const getProjectSlugs = () => {
  return projectsConfig.map((project) => project.slug);
};
//  {
//     folderName: "aram",
//     slug: "aram-gulf",
//     title: {
//       en: "Aram-Gulf",
//       ar: "Aram-Gulf",
//     },
//     description: {
//       en: "Aram Gulf platform is an integrated digital solution designed to organize the relationship between users and centers through a single smart system that combines booking communication and promotion the platform provides an efficient booking organizer that allows users to reserve services easily while enabling centers to manage schedules availability and requests with high efficiency the platform includes a card system that offers exclusive benefits and savings enhancing user loyalty and increasing service value it also allows centers to publish their offers directly and reach a wide audience in addition to a flexible coupon system that can be provided to centers or users to support marketing activities Aram Gulf features a direct chat system connecting users with centers alongside realtime notifications that ensure fast interaction and instant updates the platform also supports a user to user promotional system that helps spread services and grow the customer base it includes a comprehensive admin dashboard covering all platform operations as well as two main account types users and centers each with a dedicated dashboard that enables clear and smooth management of data requests and offers",
//       ar: "منصة Aram Gulf هي منصة رقمية متكاملة تهدف الى تنظيم العلاقة بين المستخدمين والمراكز من خلال نظام واحد ذكي يجمع بين الحجز والتواصل والترويج حيث توفر المنصة ناظم حجز فعال يتيح للمستخدمين حجز الخدمات بسهولة ويمنح المراكز القدرة على ادارة مواعيدهم وطلبات العملاء بكفاءة كما تحتوي المنصة على نظام بطاقات يساهم في توفير مزايا وعروض خاصة تعزز ولاء المستخدمين وتزيد من قيمة الخدمات المقدمة وتتيح المنصة للمراكز نشر عروضها بشكل مباشر والوصول الى شريحة واسعة من المستخدمين بالاضافة الى نظام كوبونات مرن يمكن تخصيصه للمراكز او للمستخدمين لدعم الحملات التسويقية وتحتوي Aram Gulf على نظام محادثة يربط المستخدمين بالمراكز بشكل مباشر مع نظام اشعارات فورية يضمن سرعة التفاعل ومتابعة جميع التحديثات كما تدعم المنصة نظام ترويجي بين المستخدمين يساهم في انتشار الخدمات وزيادة قاعدة العملاء وتشمل المنصة لوحة تحكم مركزية تغطي جميع جوانب الادارة والتحكم الى جانب وجود نوعين من الحسابات حسابات المستخدمين وحسابات المراكز ولكل نوع حساب لوحة تحكم خاصة تتيح ادارة البيانات والطلبات والعروض بشكل واضح وسلس",
//     },
//     skills: [
//       "Next.js",
//       "Laravel",
//       "MySQL",
//       "TailwindCSS",
//       "Redux-ToolKit",
//       "Framer Motion",
//       "Responsive Design",
//       "API",
//       "+8",
//     ],
//     projectCover: "/projects-covers/Aram-design-2.jpg",
//     linkSourceCode: "",
//     projectLink: "https://aram-gulf.com/en",
//     isPrivate: true,
//     categories: ["frontend", "backend", "fullstack"],
//   },
