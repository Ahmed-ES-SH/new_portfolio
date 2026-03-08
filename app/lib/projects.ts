import fs from "fs";
import path from "path";

export type ProjectCategory = "frontend" | "backend" | "fullstack";

export interface Project {
  folderName: string;
  slug: string; // New slug property
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

const projectsConfig: Omit<Project, "images">[] = [
  {
    folderName: "aram",
    slug: "aram-gulf",
    title: {
      en: "Aram-Gulf",
      ar: "Aram-Gulf",
    },
    description: {
      en: "Aram Gulf platform is an integrated digital solution designed to organize the relationship between users and centers through a single smart system that combines booking communication and promotion the platform provides an efficient booking organizer that allows users to reserve services easily while enabling centers to manage schedules availability and requests with high efficiency the platform includes a card system that offers exclusive benefits and savings enhancing user loyalty and increasing service value it also allows centers to publish their offers directly and reach a wide audience in addition to a flexible coupon system that can be provided to centers or users to support marketing activities Aram Gulf features a direct chat system connecting users with centers alongside realtime notifications that ensure fast interaction and instant updates the platform also supports a user to user promotional system that helps spread services and grow the customer base it includes a comprehensive admin dashboard covering all platform operations as well as two main account types users and centers each with a dedicated dashboard that enables clear and smooth management of data requests and offers",
      ar: "منصة Aram Gulf هي منصة رقمية متكاملة تهدف الى تنظيم العلاقة بين المستخدمين والمراكز من خلال نظام واحد ذكي يجمع بين الحجز والتواصل والترويج حيث توفر المنصة ناظم حجز فعال يتيح للمستخدمين حجز الخدمات بسهولة ويمنح المراكز القدرة على ادارة مواعيدهم وطلبات العملاء بكفاءة كما تحتوي المنصة على نظام بطاقات يساهم في توفير مزايا وعروض خاصة تعزز ولاء المستخدمين وتزيد من قيمة الخدمات المقدمة وتتيح المنصة للمراكز نشر عروضها بشكل مباشر والوصول الى شريحة واسعة من المستخدمين بالاضافة الى نظام كوبونات مرن يمكن تخصيصه للمراكز او للمستخدمين لدعم الحملات التسويقية وتحتوي Aram Gulf على نظام محادثة يربط المستخدمين بالمراكز بشكل مباشر مع نظام اشعارات فورية يضمن سرعة التفاعل ومتابعة جميع التحديثات كما تدعم المنصة نظام ترويجي بين المستخدمين يساهم في انتشار الخدمات وزيادة قاعدة العملاء وتشمل المنصة لوحة تحكم مركزية تغطي جميع جوانب الادارة والتحكم الى جانب وجود نوعين من الحسابات حسابات المستخدمين وحسابات المراكز ولكل نوع حساب لوحة تحكم خاصة تتيح ادارة البيانات والطلبات والعروض بشكل واضح وسلس",
    },
    skills: [
      "Next.js",
      "Laravel",
      "MySQL",
      "TailwindCSS",
      "Redux-ToolKit",
      "Framer Motion",
      "Responsive Design",
      "API",
      "+8",
    ],
    projectCover: "/projects-covers/Aram-design-2.jpg",
    linkSourceCode: "",
    // linkDocs: "aram-gulf/docs",
    projectLink: "https://aram-gulf.com/en",
    isPrivate: true,
    categories: ["frontend", "backend", "fullstack"],
  },
  {
    folderName: "flix-tv",
    slug: "flix-tv",
    title: {
      en: "FLIX TV",
      ar: "FLIX TV",
    },
    description: {
      en: "Flix Tv is a fully responsive and feature-rich web application built with Next.js and integrated with the TMDb API to help users explore trending movies and TV shows, manage watch lists, and enjoy an engaging  interface enhanced with beautiful animations. Check out the repository to discover more about the features and technologies used.",
      ar: "Flix Tv هو تطبيق ويب متجاوب بالكامل وغني بالميزات، مُصمم باستخدام Next.js ومتكامل مع واجهة برمجة تطبيقات TMDb، لمساعدة المستخدمين على استكشاف الأفلام والبرامج التلفزيونية الرائجة، وإدارة قوائم المشاهدة، والاستمتاع بواجهة تفاعلية مُحسّنة برسوم متحركة جميلة. تفقّد الكود لاكتشاف المزيد عن الميزات والتقنيات المستخدمة.",
    },
    skills: [
      "Next.js",
      "TailwindCSS",
      "Context",
      "API",
      "Framer Motion",
      "Clerk",
      "Responsive Design",
    ],
    projectCover: "/projects-covers/flix-tv-cover-2.jpg",
    linkSourceCode: "https://github.com/Ahmed-ES-SH/TMDB-App",
    projectLink: "https://tmdb-app-kappa.vercel.app",
    isPrivate: false,
    categories: ["frontend"],
  },
  {
    folderName: "mada-plus",
    slug: "mada-plus",
    title: {
      en: "Mada Plus",
      ar: "Mada Plus",
    },
    description: {
      en: "Mada-Plus is a comprehensive platform specialized in providing technical and real-world services, designed to connect service providers with users in a secure and well-structured environment. The platform relies on an advanced merchant information-hiding system, where seller contact details remain hidden and are only revealed after a successful payment, ensuring seriousness, trust, and protection for all parties involved. The platform supports two main account types: a Seller account, which allows service providers to manage their services, orders, and client interactions, and a User account, which enables users to browse services, complete purchases, and track their orders through a dedicated dashboard. In addition, Mada-Plus includes a powerful Admin Dashboard for the platform owner, providing full control over users, sellers, services, payments, and all operational aspects of the platform.",
      ar: "منصة Mada-Plus هي منصة متكاملة متخصصة في تقديم الخدمات التقنية والخدمات الواقعية، وتهدف إلى ربط مقدمي الخدمات بالمستخدمين ضمن بيئة آمنة ومنظمة. تعتمد المنصة على نظام متقدم لإخفاء معلومات التجار، حيث تبقى بيانات التواصل محجوبة ولا يتم إظهارها إلا بعد إتمام عملية دفع، مما يضمن الجدية وحماية حقوق جميع الأطراف.توفر المنصة نوعين رئيسيين من الحسابات: حساب البائع الذي يتيح للتاجر إدارة خدماته وطلباته والتواصل مع العملاء، وحساب المستخدم الذي يمكنه من تصفح الخدمات، إتمام عمليات الشراء، ومتابعة الطلبات من خلال لوحة تحكم مخصصة لكل نوع حساب. كما تحتوي المنصة على لوحة تحكم شاملة لمالك الموقع (Admin Panel) تُمكّنه من إدارة المستخدمين، البائعين، الخدمات، عمليات الدفع، وإعدادات المنصة بالكامل، مع التحكم الكامل في جميع نقاط التشغيل والرقابة.",
    },
    skills: [
      "Next.js",
      "Laravel",
      "MySQL",
      "TailwindCSS",
      "Redux-ToolKit",
      "Framer Motion",
      "Responsive Design",
      "API",
      "+5",
    ],
    projectCover: "/projects-covers/mada-plus-cover.jpg",
    linkSourceCode: "",
    projectLink: "https://mada-plus.com/en",
    isPrivate: true,
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
    folderName: "madad",
    slug: "madad",
    title: {
      en: "Madad",
      ar: "مدد",
    },
    description: {
      en: "Madad is a modern web UI design created for a company specializing in technical services. The project delivers a sleek and interactive user interface that highlights services and facilitates client communication. It focuses purely on visual presentation and user experience, without integration with real data or backend functionality. Check out the repository to discover more about the features and technologies used.",
      ar: "مداد هو تصميم واجهة مستخدم ويب عصري مُصمم لشركة متخصصة في الخدمات التقنية. يُقدم المشروع واجهة مستخدم أنيقة وتفاعلية تُبرز الخدمات وتُسهّل التواصل مع العملاء. يُركز المشروع بشكل كامل على العرض المرئي وتجربة المستخدم، دون أي تكامل مع البيانات الفعلية أو وظائف الواجهة الخلفية. تفضل بزيارة الكود لتعرّف المزيد حول الميزات والتقنيات المُستخدمة في هذا المشروع.",
    },
    skills: [
      "Next.js",
      "TailwindCSS",
      "Framer Motion",
      "MultiLanguages",
      "Real-time Features",
      "Responsive Design",
    ],
    projectCover: "/projects-covers/madad-cover.jpg",
    linkSourceCode: "https://github.com/Ahmed-ES-SH/Madad",
    projectLink: "https://madad-rust.vercel.app",
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
  {
    folderName: "stichting-mostakbal",
    slug: "stichting-mostakbal",
    title: {
      en: "Stichting Mostakbal",
      ar: "بوابة المستقبل",
    },
    description: {
      en: "Stichting Mostakbal is a Dutch-oriented digital platform representing a charitable organization that provides humanitarian aid and supports those in need. It offers a structured digital interface to showcase the organization's activities and manage charitable content centrally. The platform features an interactive front-end built with Next.js and supports modern interface design, animations, interactive maps, state management, and secure API handling. The back-end is powered by Laravel with full control over content, media, authentication, and database management.",
      ar: "منصة بوابة المستقبل هي منصة رقمية ذات توجه هولندي تمثل جمعية خيرية تهدف إلى تقديم المساعدات الإنسانية ودعم المحتاجين، مع واجهة رقمية منظمة لعرض أنشطة الجمعية وإدارة المحتوى الخيري بشكل مركزي. تحتوي المنصة على واجهة أمامية تفاعلية مبنية باستخدام Next.js، وتدعم تصميم واجهات حديثة، الحركات والانتقالات، الخرائط التفاعلية، إدارة الحالة، والتعامل الآمن مع الـ API. الواجهة الخلفية تعمل بواسطة Laravel وتتحكم بشكل كامل في المحتوى، الوسائط، التحقق من الصلاحيات، وإدارة قاعدة البيانات.",
    },
    skills: [
      "Next.js",
      "TailwindCSS",
      "Framer Motion",
      "Radix UI",
      "Redux Toolkit",
      "Axios",
      "Leaflet",
      "Swiper",
      "Laravel",
      "PHP 8.2",
      "Laravel Sanctum",
      "Spatie Media Library",
      "Spatie Image Optimizer",
    ],
    projectCover: "/projects-covers/stichting-mostakbal.jpg",
    linkSourceCode: "",
    projectLink: "https://stichtingmostakbal.nl/nl",
    isPrivate: true,
    categories: ["frontend", "backend", "fullstack"],
  },
];

export async function getProjects(): Promise<Project[]> {
  const projectsDir = path.join(process.cwd(), "public", "Projects");

  const projects = await Promise.all(
    projectsConfig.map(async (project) => {
      const dirPath = path.join(projectsDir, project.folderName);
      let images: string[] = [];

      try {
        if (fs.existsSync(dirPath)) {
          const files = await fs.promises.readdir(dirPath);
          images = files
            .filter((file) => /\.(png|jpg|jpeg|webp|gif)$/i.test(file))
            .map((file) => `/Projects/${project.folderName}/${file}`);
        }
      } catch (error) {
        console.error(`Error reading images for ${project.folderName}:`, error);
      }

      return {
        ...project,
        images,
      };
    }),
  );

  return projects;
}
