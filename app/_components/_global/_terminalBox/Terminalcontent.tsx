import { getProjectSlugs } from "@/app/lib/projects-data";



// Valid navigation paths ────────────────────────────────────────────────────────────────────
export const VALID_NAV_PATHS = ["/", "/about", "/skills", "/projects"];

// Prompt ────────────────────────────────────────────────────────────────────
export const PROMPT = "~:ahmedismaildev/admin:/ $";

// Startup sequence ────────────────────────────────────────────────────────────────────
export const STARTUP_SEQUENCE = [
    "> SYSTEM_INIT_SEQUENCE_START...",
    "> SECURE_CONNECTION_ESTABLISHED. AWAITING_INPUT_",
];



// Project slugs ────────────────────────────────────────────────────────────────────
export const slugs = getProjectSlugs();

// ASCII ART for Contact - Modernized & Enlarged ────────────────────────────────────────────────────────────────────

// WhatsApp ASCII ────────────────────────────────────────────────────────────────────
export const WHATSAPP_ASCII = (
    <div className="w-full max-w-3xl my-6 overflow-x-auto bg-gray-900/80 backdrop-blur-sm border border-green-500/30 p-6 rounded-2xl shadow-lg">
        <pre className="text-green-400 font-mono leading-tight text-xs sm:text-sm md:text-base font-bold drop-shadow-md">
            {`██╗    ██╗██╗  ██╗ █████╗ ████████╗███████╗ █████╗ ██████╗ ██████╗ 
██║    ██║██║  ██║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔══██╗
██║ █╗ ██║███████║███████║   ██║   ███████╗███████║██████╔╝██████╔╝
██║███╗██║██╔══██║██╔══██║   ██║   ╚════██║██╔══██║██╔═══╝ ██╔═══╝ 
╚███╔███╔╝██║  ██║██║  ██║   ██║   ███████║██║  ██║██║     ██║     
 ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝     

══════════════════════════════════════════════════════════════════
  📞 CONTACT: [ +201017539419 ]`}
        </pre>
    </div>
);

// Gmail ASCII ────────────────────────────────────────────────────────────────────
export const GMAIL_ASCII = (
    <div className="w-full max-w-3xl my-6 overflow-x-auto bg-gray-900/80 backdrop-blur-sm border border-red-500/30 p-6 rounded-2xl shadow-lg">
        <pre className="text-red-400 font-mono leading-tight text-xs sm:text-sm md:text-base font-bold drop-shadow-md">
            {` ██████╗ ███╗   ███╗ █████╗ ██╗██╗     
██╔════╝ ████╗ ████║██╔══██╗██║██║     
██║  ███╗██╔████╔██║███████║██║██║     
██║   ██║██║╚██╔╝██║██╔══██║██║██║     
╚██████╔╝██║ ╚═╝ ██║██║  ██║██║███████╗
 ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝

═══════════════════════════════════════
  ✉️ EMAIL: [ ahmedismaildev6@gmail.com ]`}
        </pre>
    </div>
);

// Links ────────────────────────────────────────────────────────────────────
export const links = [
    {
        label: "Home",
        path: "/"
    },
    {
        label: "About",
        path: "/about"
    },
    {
        label: "Skills",
        path: "/skills"
    },
    {
        label: "Projects",
        path: "/projects"
    }
]

links.push(...slugs.map(s => ({ label: s, path: `/projects/${s}` })));

// Help output ────────────────────────────────────────────────────────────────────
export const HELP_OUTPUT = (
    <div className="pl-2 space-y-1 mt-1">
        <div className="text-white/80 tracking-wider">AVAILABLE COMMANDS:</div>
        <div>
            <span className="text-primary">/h, /help</span>
            <span className="text-white/50 ml-4">— Show this help menu</span>
        </div>
        <div>
            <span className="text-primary">/nav [path]</span>
            <span className="text-white/50 ml-4">— Navigate to a page</span>
        </div>
        <div className="text-white/40 pl-4 text-xs">
            {links.map((link, index) => (
                <div key={index}>
                    {link.label}: {link.path}
                </div>
            ))}
        </div>
        <div>
            <span className="text-primary">/contact</span>
            <span className="text-white/50 ml-4">— Get contact information</span>
        </div>
        <div>
            <span className="text-primary">clear</span>
            <span className="text-white/50 ml-4">— Clear the terminal history</span>
        </div>
        <div>
            <span className="text-primary">close</span>
            <span className="text-white/50 ml-4">— Close the terminal window</span>
        </div>
    </div>
);