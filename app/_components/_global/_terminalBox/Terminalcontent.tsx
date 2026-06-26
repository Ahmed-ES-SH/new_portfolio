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
    <pre className="text-green-400  leading-tight text-xs sm:text-sm md:text-base font-bold drop-shadow-md">
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
    <pre className="text-red-400  leading-tight text-xs sm:text-sm md:text-base font-bold drop-shadow-md">
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

// ASCII banner (used by `banner` command) ───────────────────────────────────
export const BANNER_ASCII = (
  <pre className="text-primary text-glow leading-tight text-xs sm:text-sm whitespace-pre">
{`
 █████╗ ██╗  ██╗████████╗███████╗██████╗ 
██╔══██╗██║  ██║╚══██╔══╝██╔════╝██╔══██╗
███████║███████║   ██║   █████╗  ██║  ██║
██╔══██║██╔══██║   ██║   ██╔══╝  ██║  ██║
██║  ██║██║  ██║   ██║   ███████╗██████╔╝
╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═════╝ 
                                          
██╗███████╗███╗   ███╗ █████╗ ██╗██╗     
██║██╔════╝████╗ ████║██╔══██╗██║██║     
██║███████╗██╔████╔██║███████║██║██║     
██║╚════██║██║╚██╔╝██║██╔══██║██║██║     
██║███████║██║ ╚═╝ ██║██║  ██║██║███████╗
╚═╝╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝
                                          
██████╗ ███████╗██╗   ██╗
██╔══██╗██╔════╝██║   ██║
██║  ██║█████╗  ██║   ██║
██║  ██║██╔══╝  ╚██╗ ██╔╝
██████╔╝███████╗ ╚████╔╝ 
╚═════╝ ╚══════╝  ╚═══╝  
`}
  </pre>
);

// Social links output (used by `social` command) ────────────────────────────
export const SOCIAL_OUTPUT = (
  <div className="space-y-2 mt-1">
    <div className="text-primary text-glow tracking-wider">SOCIAL LINKS</div>
    <div>
      <span className="text-white/70">GitHub: </span>
      <a
        href="https://github.com/Ahmed-ES-SH"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline hover:text-white/90 transition-colors"
      >
        github.com/Ahmed-ES-SH
      </a>
    </div>
    <div>
      <span className="text-white/70">LinkedIn: </span>
      <span className="text-white/50">(link pending)</span>
    </div>
    <div>
      <span className="text-white/70">Email: </span>
      <a
        href="mailto:ahmedismaildev6@gmail.com"
        className="text-primary underline hover:text-white/90 transition-colors"
      >
        ahmedismaildev6@gmail.com
      </a>
    </div>
    <div>
      <span className="text-white/70">CV: </span>
      <span className="text-white/50">(coming soon)</span>
    </div>
  </div>
);

// Links ────────────────────────────────────────────────────────────────────
export const links = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Skills",
    path: "/skills",
  },
  {
    label: "Projects",
    path: "/projects",
  },
];

links.push(...slugs.map((s) => ({ label: s, path: `/projects/${s}` })));

// Help output ────────────────────────────────────────────────────────────────────
export const HELP_OUTPUT = (
  <div className="pl-2 space-y-1 mt-1">
    <div className="text-white/80 tracking-wider">AVAILABLE COMMANDS:</div>
    <div>
      <span className="text-primary">help</span>
      <span className="text-white/50 ml-4">— Show this help menu</span>
    </div>
    <div>
      <span className="text-primary">nav [path]</span>
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
      <span className="text-primary">contact</span>
      <span className="text-white/50 ml-4">— Get contact information</span>
    </div>
    <div>
      <span className="text-primary">clear / cls</span>
      <span className="text-white/50 ml-4">— Clear the terminal history</span>
    </div>
    <div>
      <span className="text-primary">close / exit</span>
      <span className="text-white/50 ml-4">— Close the terminal window</span>
    </div>
    <div className="mt-2 text-white/60 tracking-wider text-xs">ADDITIONAL COMMANDS:</div>
    <div>
      <span className="text-primary">history</span>
      <span className="text-white/50 ml-4">— Show command history</span>
    </div>
    <div>
      <span className="text-primary">whoami</span>
      <span className="text-white/50 ml-4">— Display current user identity</span>
    </div>
    <div>
      <span className="text-primary">date</span>
      <span className="text-white/50 ml-4">— Show current date and time</span>
    </div>
    <div>
      <span className="text-primary">echo [text]</span>
      <span className="text-white/50 ml-4">— Echo input text</span>
    </div>
    <div>
      <span className="text-primary">banner</span>
      <span className="text-white/50 ml-4">— Display ASCII banner</span>
    </div>
    <div>
      <span className="text-primary">social</span>
      <span className="text-white/50 ml-4">— Show social links and contact info</span>
    </div>
    <div>
      <span className="text-primary">repo [slug]</span>
      <span className="text-white/50 ml-4">— Open a project&apos;s source code</span>
    </div>
  </div>
);
