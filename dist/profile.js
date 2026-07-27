export const assistantProfile = {
    name: 'Priya Gautam',
    role: 'Software Engineer | Full Stack Developer | AI Engineering Intern',
    description: 'Priya Gautam is a Full Stack Developer with hands-on experience building scalable web applications using React.js, Next.js, Node.js, Express.js, FastAPI, and MongoDB. She has experience in AI engineering, REST API integration, real-time applications, web scraping, and startup environments.',
    education: [
        {
            institution: 'Motilal Nehru National Institute of Technology, Allahabad',
            degree: 'Master of Computer Applications (MCA)',
            duration: 'Aug 2023 – Aug 2026'
        }
    ],
    experience: [
        {
            company: 'WoodenScale.ai',
            role: 'AI & Full Stack Development Intern',
            duration: 'Jan 2026 – Apr 2026',
            technologies: ['TypeScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Python', 'FastAPI', 'BeautifulSoup'],
            responsibilities: [
                'Built scalable and responsive web applications using React.js, Next.js, and Tailwind CSS.',
                'Integrated REST APIs with FastAPI and collaborated on backend systems.',
                'Developed Python-based data extraction pipelines using BeautifulSoup.',
                'Contributed to AI-driven features, debugging, optimization, and feature development in a fast-paced startup environment.'
            ]
        }
    ],
    projects: [
        {
            name: 'MERNFLIX',
            type: 'OTT Streaming Platform',
            technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Razorpay', 'TMDB API'],
            details: [
                'Developed a full-stack OTT platform with movie browsing, search, categories, and responsive UI.',
                'Implemented secure JWT authentication, role-based access, OTP/password-reset workflows, and Razorpay subscription payments.',
                'Integrated TMDB API, built an admin dashboard, and used Redux/Context API for state management.'
            ]
        },
        {
            name: 'Real-Time Web Chat Application',
            type: 'Full Stack Real-Time Chat Application',
            technologies: ['React.js', 'Express.js', 'Node.js', 'MongoDB', 'Socket.io'],
            details: [
                'Built a full-stack real-time chat app supporting instant one-to-one and group messaging.',
                'Implemented JWT authentication, password hashing, protected APIs, user search, group management, and message history.',
                'Added Cloudinary/Multer media uploads and modular APIs with Context API/Redux for global state.'
            ]
        }
    ],
    skills: {
        programmingLanguages: ['C++', 'JavaScript', 'TypeScript', 'Python', 'SQL'],
        frontend: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Bootstrap'],
        backend: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'JWT Authentication'],
        databases: ['MongoDB', 'MySQL'],
        aiAndDevelopmentTools: ['OpenAI API', 'Cursor AI', 'BeautifulSoup', 'Git', 'GitHub', 'Postman'],
        coreComputerScience: ['Data Structures and Algorithms', 'Java OOP', 'Database Management System']
    },
    certifications: [
        {
            name: 'AI Engineering Internship Certificate',
            date: 'Apr 2026',
            description: 'Successfully completed a 4-month internship as an AI Engineering Intern, contributing to AI-based projects and real-world applications.'
        }
    ],
    clients: ['Claude', 'ChatGPT', 'Codex', 'Claude Code', 'VS Code MCP clients'],
    transportSupport: ['stdio', 'streamable-http'],
    dcr: {
        name: 'Dynamic Context Retrieval',
        description: 'The server ranks Priya Gautam profile sections against the user query and returns only the most relevant context.',
        behavior: [
            'Tokenizes the query',
            'Scores sections by keyword, title, and content overlap',
            'Returns the top-ranked sections with short explanations',
            'Falls back to the overview section when the query is broad'
        ]
    }
};
export const profileSections = [
    {
        id: 'overview', title: 'Overview', summary: 'Professional overview of Priya Gautam.',
        keywords: ['overview', 'who', 'intro', 'summary', 'about', 'priya', 'profile', 'developer', 'engineer'],
        details: [
            'Priya Gautam is a Software Engineer, Full Stack Developer, and AI Engineering Intern.',
            'She builds scalable web applications and has experience with frontend, backend, AI engineering, APIs, real-time applications, and web scraping.',
            'Her current postgraduate education is an MCA at MNNIT Allahabad.'
        ]
    },
    {
        id: 'education', title: 'Education', summary: 'Academic background.',
        keywords: ['education', 'degree', 'college', 'university', 'mca', 'postgraduate', 'mnnit', 'allahabad'],
        details: ['Master of Computer Applications (MCA) at Motilal Nehru National Institute of Technology, Allahabad, Aug 2023 – Present.']
    },
    {
        id: 'experience', title: 'Work Experience', summary: 'Professional experience at WoodenScale.ai.',
        keywords: ['experience', 'work', 'internship', 'intern', 'woodenscale', 'ai engineering', 'fastapi', 'beautifulsoup', 'startup'],
        details: [
            'AI & Full Stack Development Intern at WoodenScale.ai from Jan 2026 – Apr 2026.',
            'Worked with TypeScript, React.js, Next.js, Tailwind CSS, Python, FastAPI, and BeautifulSoup.',
            'Built responsive web apps, integrated REST APIs, developed data extraction pipelines, and contributed to AI-driven features.'
        ]
    },
    {
        id: 'skills', title: 'Technical Skills', summary: 'Programming, frontend, backend, database, AI, and core CS skills.',
        keywords: ['skills', 'technologies', 'tech stack', 'programming', 'cpp', 'c++', 'javascript', 'typescript', 'python', 'sql', 'react', 'next', 'node', 'express', 'fastapi', 'mongodb', 'mysql', 'openai', 'git', 'github', 'postman', 'dsa'],
        details: [
            'Programming Languages: C++, JavaScript, TypeScript, Python, SQL.',
            'Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Bootstrap. Backend: Node.js, Express.js, FastAPI, REST APIs, JWT Authentication.',
            'Databases: MongoDB, MySQL. AI/Development: OpenAI API, Cursor AI, BeautifulSoup, Git, GitHub, Postman. Core CS: DSA, Java OOP, DBMS.'
        ]
    },
    {
        id: 'projects', title: 'Projects', summary: 'Major full-stack and real-time projects.',
        keywords: ['projects', 'project', 'build', 'built', 'mernflix', 'netflix', 'ott', 'chat', 'real time', 'socket', 'socket.io', 'razorpay', 'tmdb', 'cloudinary'],
        details: [
            'MERNFLIX: Full-stack OTT streaming platform using React.js, Node.js, Express.js, MongoDB, JWT, Razorpay, and TMDB API.',
            'Real-Time Web Chat Application: Full-stack real-time messaging application using React.js, Node.js, Express.js, MongoDB, and Socket.io.'
        ]
    },
    {
        id: 'certifications', title: 'Certifications', summary: 'AI Engineering internship certification.',
        keywords: ['certification', 'certificate', 'ai', 'internship'],
        details: ['AI Engineering Internship Certificate, Apr 2026; completed a 4-month AI Engineering Internship contributing to AI-based projects and real-world applications.']
    },
    {
        id: 'clients', title: 'MCP Client Compatibility', summary: 'MCP clients supported by the server.',
        keywords: ['clients', 'claude', 'chatgpt', 'codex', 'claude code', 'vs code', 'mcp'],
        details: ['Designed for Claude, ChatGPT, Codex, Claude Code, and VS Code MCP clients using standard MCP primitives.', 'Supports stdio for local workflows and streamable HTTP for deployed endpoints.']
    },
    {
        id: 'dcr', title: 'Dynamic Context Retrieval', summary: 'How DCR retrieves relevant parts of Priya’s profile.',
        keywords: ['dcr', 'dynamic context retrieval', 'retrieval', 'ranking', 'context', 'search', 'query'],
        details: ['Searches profile sections at request time instead of returning the whole profile.', 'Matches query terms against section titles, keywords, summaries, and details, then ranks the relevant sections.', 'Returns only the most relevant context to keep responses concise.']
    },
    {
        id: 'deployment', title: 'Deployment', summary: 'How the MCP server can run locally or remotely.',
        keywords: ['deploy', 'deployment', 'url', 'hosting', 'render', 'railway', 'fly', 'http', 'stdio'],
        details: ['Supports stdio for local MCP clients and streamable HTTP for hosted MCP clients.', 'HTTP mode exposes /mcp and /health endpoints and can run on Node.js-compatible hosts.']
    }
];
export function getProfileMarkdown() {
    return [
        `# ${assistantProfile.name}`,
        '',
        `Role: ${assistantProfile.role}`,
        '',
        assistantProfile.description,
        '',
        '## Education',
        ...assistantProfile.education.map(item => `- ${item.degree} - ${item.institution} (${item.duration})`),
        '',
        '## Experience',
        ...assistantProfile.experience.map(item => `- ${item.role} at ${item.company} (${item.duration})`),
        '',
        '## Technical Skills',
        `- Programming: ${assistantProfile.skills.programmingLanguages.join(', ')}`,
        `- Frontend: ${assistantProfile.skills.frontend.join(', ')}`,
        `- Backend: ${assistantProfile.skills.backend.join(', ')}`,
        `- Databases: ${assistantProfile.skills.databases.join(', ')}`,
        `- AI & Tools: ${assistantProfile.skills.aiAndDevelopmentTools.join(', ')}`,
        '',
        '## Projects',
        ...assistantProfile.projects.map(item => `- ${item.name} (${item.type}) - ${item.technologies.join(', ')}`),
        '',
        '## Certification',
        ...assistantProfile.certifications.map(item => `- ${item.name} (${item.date})`),
        '',
        '## Supported MCP Clients',
        ...assistantProfile.clients.map(item => `- ${item}`),
        '',
        '## Transport Modes',
        ...assistantProfile.transportSupport.map(item => `- ${item}`),
        '',
        '## DCR',
        `- ${assistantProfile.dcr.name}: ${assistantProfile.dcr.description}`
    ].join('\n');
}
