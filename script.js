/**
 * KRISHNA JOSHI - DEVELOPER PORTFOLIO ENGINE
 * Software Development Engineer & GenAI Systems
 * Pure ES6+, Zero External Dependencies, High-Performance Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==================== 1. TYPEWRITER EFFECT ====================
    const typedRoleElement = document.getElementById('typedRole');
    const roles = [
        'Software Development Engineer',
        'GenAI & Agentic Systems Engineer',
        'Systems & Backend Architect',
        'C++ Systems & Network Developer',
        'DTU Computer Science \'28'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 80;

    function handleTypewriter() {
        if (!typedRoleElement) return;
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 40;
        } else {
            typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeDelay = 2200; // Pause on complete word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeDelay = 400; // Pause before typing next
        }

        setTimeout(handleTypewriter, typeDelay);
    }
    handleTypewriter();

    // ==================== 2. NAVBAR SCROLL & ACTIVE LINK ====================
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    function onScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        // Progress bar width
        if (scrollProgress && docHeight > 0) {
            const progress = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        // Navbar blur background
        if (navbar) {
            if (scrollTop > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Highlight current section in navbar
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Back to top click
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==================== 3. TOAST NOTIFICATION SYSTEM ====================
    const toastContainer = document.getElementById('toastContainer');

    function showToast(message, type = 'success', duration = 3000) {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';

        toast.innerHTML = `
            <i class="fas ${iconClass}"></i>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastOut 0.25s forwards';
            setTimeout(() => toast.remove(), 250);
        }, duration);
    }

    // ==================== 4. COPY TO CLIPBOARD ====================
    const copyableElements = document.querySelectorAll('[data-clipboard]');
    copyableElements.forEach(el => {
        el.addEventListener('click', () => {
            const textToCopy = el.getAttribute('data-clipboard');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied to clipboard: ${textToCopy}`, 'success');
                }).catch(() => {
                    showToast('Failed to copy text', 'info');
                });
            }
        });
    });

    const emailCopyChips = document.querySelectorAll('.email-copy-chip');
    emailCopyChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText('joshikrishna2125@gmail.com').then(() => {
                showToast('Email copied: joshikrishna2125@gmail.com', 'success');
            });
        });
    });

    // ==================== 5. IN-BROWSER RESUME VIEWER MODAL ====================
    const resumeModal = document.getElementById('resumeViewerModal');
    const previewResumeBtns = [
        document.getElementById('previewResumeBtn'),
        document.getElementById('heroResumePreviewBtn')
    ];
    const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');

    function openResumeModal() {
        if (!resumeModal) return;
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeResumeModal() {
        if (!resumeModal) return;
        resumeModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    previewResumeBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', openResumeModal);
    });

    if (closeResumeModalBtn) {
        closeResumeModalBtn.addEventListener('click', closeResumeModal);
    }

    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) closeResumeModal();
        });
    }

    // ==================== 6. PROJECTS SEARCH & FILTER MATRIX ====================
    const filterPills = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-card');
    const projectSearchInput = document.getElementById('projectSearchInput');

    let currentFilter = 'all';
    let searchQuery = '';

    function filterProjects() {
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardText = card.textContent.toLowerCase();
            const matchesCategory = (currentFilter === 'all') || (cardCategory === currentFilter);
            const matchesSearch = searchQuery === '' || cardText.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                card.style.animation = 'fadeIn 0.3s var(--ease-out)';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentFilter = pill.getAttribute('data-filter');
            filterProjects();
        });
    });

    if (projectSearchInput) {
        projectSearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            filterProjects();
        });
    }

    // ==================== 7. SYSTEM ARCHITECTURE MODALS ====================
    const architectureModal = document.getElementById('architectureModal');
    const archTitle = document.getElementById('archTitle');
    const archTag = document.getElementById('archTag');
    const archBody = document.getElementById('archBody');
    const closeArchModalBtn = document.getElementById('closeArchModalBtn');

    const architectureDatabase = {
        'gramai': {
            tag: 'MULTIMODAL GENAI & CLINICAL PIPELINE',
            title: 'GramAI — Voice-to-Triage Architecture for ASHA Workers',
            html: `
                <div class="arch-flow-diagram">
                    <div class="flow-step-row">
                        <div class="flow-node">
                            <div class="flow-node-title">Telegram Voice Note</div>
                            <div class="flow-node-desc">Hindi / Hinglish / English Audio</div>
                        </div>
                        <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
                        <div class="flow-node highlight">
                            <div class="flow-node-title">Whisper Large v3</div>
                            <div class="flow-node-desc">Indian Medical Lexicon Prompt</div>
                        </div>
                        <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
                        <div class="flow-node highlight">
                            <div class="flow-node-title">Llama 3.3 70B (Groq)</div>
                            <div class="flow-node-desc">&lt;1.2s Triage Agent + Guardrails</div>
                        </div>
                        <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
                        <div class="flow-node">
                            <div class="flow-node-title">FastAPI + Pandas</div>
                            <div class="flow-node-desc">Timestamped Patient Registry</div>
                        </div>
                        <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
                        <div class="flow-node">
                            <div class="flow-node-title">React Dashboard</div>
                            <div class="flow-node-desc">Clinical Review & Alerts</div>
                        </div>
                    </div>
                </div>

                <div class="arch-section-block">
                    <h4><i class="fas fa-bullseye"></i> Engineering Problem & Impact</h4>
                    <p>
                        Rural healthcare workers (ASHA workers) in India need rapid, structured triage for patient symptoms 
                        across multilingual audio notes (Hindi, Hinglish, English). Typing medical records into apps is 
                        prohibitive in field conditions, while raw transcription frequently hallucinates local anatomical and dosage terminology.
                    </p>
                </div>

                <div class="arch-section-block">
                    <h4><i class="fas fa-cogs"></i> Technical Innovations & Guardrails</h4>
                    <ul>
                        <li><strong>Acoustic Model Tuning:</strong> Prompt-tuned Whisper Large v3 with context tokens covering phonetic Indian health terminology and vernacular phrasing.</li>
                        <li><strong>Zero-Hallucination Guardrails:</strong> Structured JSON validation layers over Llama 3.3 70B output using Groq's high-speed inference engine (&lt;1.2s roundtrip latency). Unrecognized inputs trigger strict refusal and emergency escalation flags.</li>
                        <li><strong>Bilingual Recommendations:</strong> Outputs formatted dual-language (Hindi + English) triage guidance with actionable patient vitals extraction.</li>
                        <li><strong>Data Service Layer:</strong> FastAPI REST APIs indexing timestamped patient records with Pandas aggregations, consumed by an administrative React dashboard.</li>
                    </ul>
                </div>

                <div class="arch-metrics-summary">
                    <div class="arch-metric-col">
                        <div class="arch-metric-val mono-text">&lt; 1.2s</div>
                        <div class="arch-metric-lbl">Groq LLM Latency</div>
                    </div>
                    <div class="arch-metric-col">
                        <div class="arch-metric-val mono-text">3 Languages</div>
                        <div class="arch-metric-lbl">Hindi / Hinglish / English</div>
                    </div>
                    <div class="arch-metric-col">
                        <div class="arch-metric-val mono-text">100% Guarded</div>
                        <div class="arch-metric-lbl">Refusal on Hallucination</div>
                    </div>
                </div>
            `
        },
        'ledger-copilot': {
            tag: 'DETERMINISTIC AI & RECONCILIATION',
            title: 'Ledger Copilot — Financial Settlement Reconciliation Engine',
            html: `
                <div class="arch-flow-diagram">
                    <div class="flow-step-row">
                        <div class="flow-node">
                            <div class="flow-node-title">Synthetic Data Feeds</div>
                            <div class="flow-node-desc">Source A & B Settlement Files</div>
                        </div>
                        <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
                        <div class="flow-node highlight">
                            <div class="flow-node-title">Deterministic Engine</div>
                            <div class="flow-node-desc">Exact & Fuzzy Multi-key Matching</div>
                        </div>
                        <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
                        <div class="flow-node">
                            <div class="flow-node-title">Exception Classifier</div>
                            <div class="flow-node-desc">6 Structured Exception Types</div>
                        </div>
                        <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
                        <div class="flow-node highlight">
                            <div class="flow-node-title">Gemini Function Calling</div>
                            <div class="flow-node-desc">Strictly Grounded API Binding</div>
                        </div>
                        <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
                        <div class="flow-node">
                            <div class="flow-node-title">Next.js + Supabase</div>
                            <div class="flow-node-desc">Live Analytics Dashboard</div>
                        </div>
                    </div>
                </div>

                <div class="arch-section-block">
                    <h4><i class="fas fa-bullseye"></i> Engineering Challenge</h4>
                    <p>
                        Financial settlement reconciliation between disparate merchant payment logs and banking synthetic records 
                        normally suffers from timing skews, transaction fee variances, and partial refunds. Furthermore, traditional 
                        conversational AI hallucinates dollar values and balance totals when asked unstructured settlement queries.
                    </p>
                </div>

                <div class="arch-section-block">
                    <h4><i class="fas fa-cogs"></i> Technical Innovations</h4>
                    <ul>
                        <li><strong>Deterministic Matching Core:</strong> Engineered two-stage matching algorithms with fuzzy thresholds for timestamps and fee slippage, achieving <strong>79%+ match rate</strong> across 130+ complex records.</li>
                        <li><strong>Rigorous Test Suite:</strong> Developed <strong>60+ automated test cases</strong> covering 6 distinct settlement exception classes (omitted transactions, amount discrepancies, chargebacks, duplicates, currency slippage, timing shifts).</li>
                        <li><strong>Grounded Function Calling:</strong> Bound the Gemini API agent to 3 verified REST endpoints (get_settlement_metrics, inspect_exceptions, audit_trace). The LLM is architecturally incapable of outputting financial numbers without fetching them from verified database records.</li>
                        <li><strong>Full-Stack Vercel Architecture:</strong> Next.js App Router, TypeScript type safety, Supabase PostgreSQL persistence, and Tailwind CSS responsive dashboard.</li>
                    </ul>
                </div>

                <div class="arch-metrics-summary">
                    <div class="arch-metric-col">
                        <div class="arch-metric-val mono-text">79%+</div>
                        <div class="arch-metric-lbl">Reconciliation Match Rate</div>
                    </div>
                    <div class="arch-metric-col">
                        <div class="arch-metric-val mono-text">60+ Tests</div>
                        <div class="arch-metric-lbl">Passing Test Coverage</div>
                    </div>
                    <div class="arch-metric-col">
                        <div class="arch-metric-val mono-text">Zero Drift</div>
                        <div class="arch-metric-lbl">Grounded Audit Lineage</div>
                    </div>
                </div>
            `
        },
        'waste-bin': {
            tag: 'BARE-METAL SYSTEMS & NETWORKING',
            title: 'Smart Waste Bin System — Custom C++ TCP HTTP Server',
            html: `
                <div class="arch-flow-diagram">
                    <div class="flow-step-row">
                        <div class="flow-node">
                            <div class="flow-node-title">Raw TCP Sockets</div>
                            <div class="flow-node-desc">POSIX / WinSock System Calls</div>
                        </div>
                        <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
                        <div class="flow-node highlight">
                            <div class="flow-node-title">Custom HTTP Parser</div>
                            <div class="flow-node-desc">Zero external libraries (C++)</div>
                        </div>
                        <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
                        <div class="flow-node highlight">
                            <div class="flow-node-title">Modular OOP Router</div>
                            <div class="flow-node-desc">6 REST Endpoints & Handlers</div>
                        </div>
                        <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
                        <div class="flow-node">
                            <div class="flow-node-title">IoT Telemetry Engine</div>
                            <div class="flow-node-desc">10 Simulated Sensor Bins</div>
                        </div>
                        <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
                        <div class="flow-node">
                            <div class="flow-node-title">Real-Time UI</div>
                            <div class="flow-node-desc">Lightweight HTML/CSS Dashboard</div>
                        </div>
                    </div>
                </div>

                <div class="arch-section-block">
                    <h4><i class="fas fa-bullseye"></i> Why Build an HTTP Server in C++?</h4>
                    <p>
                        Most web developers rely on frameworks like Express, Spring, or Django without knowing what happens 
                        at the byte level when a socket connection is negotiated. This project proved low-level mastery of 
                        network protocols, socket lifecycles, memory safety, and systems programming fundamentals.
                    </p>
                </div>

                <div class="arch-section-block">
                    <h4><i class="fas fa-cogs"></i> Technical Highlights</h4>
                    <ul>
                        <li><strong>Socket Programming:</strong> Initialized raw TCP sockets, socket binding, listening, and non-blocking client accept loops.</li>
                        <li><strong>Zero-Dependency HTTP Parser:</strong> Handled HTTP request lines (GET, POST), headers, CRLF delimiter validation, query parameters, and Content-Length body extraction from scratch.</li>
                        <li><strong>Clean OOP Architecture:</strong> Segregated server layers into SocketManager, HttpRequestParser, HttpResponseBuilder, Router, and BinService modules.</li>
                        <li><strong>6 Custom Endpoints:</strong> Served live sensor telemetry, bin status updates, historical fill levels, alerts, and static web assets.</li>
                    </ul>
                </div>

                <div class="arch-metrics-summary">
                    <div class="arch-metric-col">
                        <div class="arch-metric-val mono-text">0 Frameworks</div>
                        <div class="arch-metric-lbl">Pure Bare-Metal C++</div>
                    </div>
                    <div class="arch-metric-col">
                        <div class="arch-metric-val mono-text">6 Routes</div>
                        <div class="arch-metric-lbl">Custom REST Endpoints</div>
                    </div>
                    <div class="arch-metric-col">
                        <div class="arch-metric-val mono-text">10 Bins</div>
                        <div class="arch-metric-lbl">Simulated Real-Time Nodes</div>
                    </div>
                </div>
            `
        },
        'legal-cms': {
            tag: 'PRODUCTION ENTERPRISE CMS',
            title: 'Enterprise Legal Services CMS Platform — Webdesino',
            html: `
                <div class="arch-section-block">
                    <h4><i class="fas fa-layer-group"></i> Production Overview</h4>
                    <p>
                        Developed and deployed an enterprise Content Management System (CMS) specifically engineered for a high-profile 
                        legal advisory firm during my Software Engineering Internship at Webdesino.
                    </p>
                </div>
                <div class="arch-section-block">
                    <h4><i class="fas fa-shield-alt"></i> Architecture & Scale</h4>
                    <ul>
                        <li><strong>Inquiry Pipeline:</strong> Scaled customer enquiry ingestion, managing <strong>100+ active client requests</strong> with automated assignment algorithms and SLA tracking.</li>
                        <li><strong>Granular RBAC:</strong> Implemented JWT-based role permissions (SuperAdmin, Legal Associate, Editor, Client) ensuring confidential client cases were strictly compartmentalized.</li>
                        <li><strong>Content Lifecycle:</strong> Versioned editorial drafting, legal article publishing workflows, SEO metadata injection, and dynamic tag management.</li>
                        <li><strong>Stack:</strong> React, Node.js, Express, MongoDB, RESTful APIs, JWT.</li>
                    </ul>
                </div>
            `
        },
        'ecommerce-engine': {
            tag: 'GLOBAL COMMERCE BACKEND',
            title: 'Global B2B/B2C Apparel E-Commerce Backend — Webdesino',
            html: `
                <div class="arch-section-block">
                    <h4><i class="fas fa-globe"></i> Production Overview</h4>
                    <p>
                        Engineered mission-critical commerce and logistics workflows for a production apparel enterprise 
                        serving retail consumers and wholesale partners across <strong>180+ countries</strong>.
                    </p>
                </div>
                <div class="arch-section-block">
                    <h4><i class="fas fa-cogs"></i> Technical Implementations</h4>
                    <ul>
                        <li><strong>Multi-Currency State Machine:</strong> Dynamic FX exchange conversion, tax calculations, and localized checkout flows across 180+ countries.</li>
                        <li><strong>Logistics Integration:</strong> Automated synchronization with Shiprocket API for courier allocation, real-time shipment tracking, and delivery status webhooks.</li>
                        <li><strong>Inventory & Invoicing:</strong> Concurrency-safe stock reservation during checkout and automated PDF invoice generation with automated GST/VAT calculation.</li>
                        <li><strong>Stack:</strong> Node.js, Express, MongoDB, Payment Gateways, Shiprocket API, React.</li>
                    </ul>
                </div>
            `
        },
        'infinity-cars': {
            tag: 'COMMERCIAL ANALYTICS & BI',
            title: 'Infinity Cars Commercial Intelligence Platform — Clever Harvey',
            html: `
                <div class="arch-section-block">
                    <h4><i class="fas fa-chart-line"></i> Industry Overview</h4>
                    <p>
                        Delivered an industry-certified commercial business intelligence platform for luxury automotive 
                        dealership operations under Clever Harvey.
                    </p>
                </div>
                <div class="arch-section-block">
                    <h4><i class="fas fa-cogs"></i> Technical Implementations</h4>
                    <ul>
                        <li><strong>Commercial Deliverables:</strong> Built data pipelines translating raw customer interaction touchpoints into actionable sales funnel conversion analytics.</li>
                        <li><strong>Automated Dealership Reporting:</strong> Python and Pandas backend generating dealership revenue forecasting, inventory turnover rates, and customer acquisition costs.</li>
                        <li><strong>Verification:</strong> Assessed and validated by industry mentors for adherence to production business deliverables.</li>
                    </ul>
                </div>
            `
        }
    };

    function openArchitectureModal(projectId) {
        const data = architectureDatabase[projectId];
        if (!data || !architectureModal) return;

        archTag.textContent = data.tag;
        archTitle.textContent = data.title;
        archBody.innerHTML = data.html;

        architectureModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeArchitectureModal() {
        if (!architectureModal) return;
        architectureModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.arch-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalKey = btn.getAttribute('data-modal');
            openArchitectureModal(modalKey);
        });
    });

    if (closeArchModalBtn) {
        closeArchModalBtn.addEventListener('click', closeArchitectureModal);
    }

    if (architectureModal) {
        architectureModal.addEventListener('click', (e) => {
            if (e.target === architectureModal) closeArchitectureModal();
        });
    }

    // ==================== 8. COMMAND PALETTE (CMD+K / CTRL+K) ====================
    const cmdPaletteModal = document.getElementById('cmdPaletteModal');
    const cmdPaletteBtn = document.getElementById('cmdPaletteBtn');
    const cmdPaletteInput = document.getElementById('cmdPaletteInput');
    const cmdPaletteResults = document.getElementById('cmdPaletteResults');

    function openCommandPalette() {
        if (!cmdPaletteModal) return;
        cmdPaletteModal.classList.add('active');
        if (cmdPaletteInput) {
            cmdPaletteInput.value = '';
            cmdPaletteInput.focus();
        }
        filterCmdPalette('');
    }

    function closeCommandPalette() {
        if (!cmdPaletteModal) return;
        cmdPaletteModal.classList.remove('active');
    }

    if (cmdPaletteBtn) {
        cmdPaletteBtn.addEventListener('click', openCommandPalette);
    }

    if (cmdPaletteModal) {
        cmdPaletteModal.addEventListener('click', (e) => {
            if (e.target === cmdPaletteModal) closeCommandPalette();
        });
    }

    function filterCmdPalette(query) {
        const items = cmdPaletteResults ? cmdPaletteResults.querySelectorAll('.cmd-item') : [];
        const groups = cmdPaletteResults ? cmdPaletteResults.querySelectorAll('.cmd-group-title') : [];
        const cleanQuery = query.toLowerCase().trim();

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (cleanQuery === '' || text.includes(cleanQuery)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

        // Hide group headers if all items in that group are hidden
        groups.forEach(group => {
            group.style.display = cleanQuery === '' ? 'block' : 'none';
        });
    }

    if (cmdPaletteInput) {
        cmdPaletteInput.addEventListener('input', (e) => {
            filterCmdPalette(e.target.value);
        });
    }

    // Execute command item action
    if (cmdPaletteResults) {
        cmdPaletteResults.addEventListener('click', (e) => {
            const item = e.target.closest('.cmd-item');
            if (!item) return;

            const action = item.getAttribute('data-action');
            executeCmdAction(action);
            closeCommandPalette();
        });
    }

    function executeCmdAction(action) {
        switch (action) {
            case 'goto-about':
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'goto-experience':
                document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'goto-projects':
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'goto-skills':
                document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'goto-awards':
                document.getElementById('awards')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'goto-contact':
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'open-terminal':
                openTerminalModal();
                break;
            case 'preview-resume':
                openResumeModal();
                break;
            case 'download-resume':
                const link = document.createElement('a');
                link.href = 'Krishna_Joshi_Resume.pdf';
                link.download = 'Krishna_Joshi_Resume.pdf';
                link.click();
                showToast('Downloading Krishna_Joshi_Resume.pdf', 'info');
                break;
            case 'copy-email':
                navigator.clipboard.writeText('joshikrishna2125@gmail.com');
                showToast('Email copied to clipboard', 'success');
                break;
            case 'open-github':
                window.open('https://github.com/krishna-dtu', '_blank');
                break;
            case 'open-linkedin':
                window.open('https://linkedin.com/in/krishna-joshi-dtu', '_blank');
                break;
        }
    }

    // ==================== 9. INTERACTIVE DEVELOPER TERMINAL (CLI) ====================
    const terminalModal = document.getElementById('terminalModal');
    const openTerminalBtn = document.getElementById('openTerminalBtn');
    const heroTerminalBtn = document.getElementById('heroTerminalBtn');
    const closeTerminalBtn = document.getElementById('closeTerminalBtn');
    const closeTerminalDot = document.getElementById('closeTerminalDot');
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');
    const quickChips = document.querySelectorAll('.quick-chip');

    let commandHistory = [];
    let historyIndex = -1;

    function openTerminalModal() {
        if (!terminalModal) return;
        terminalModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (terminalInput) terminalInput.focus();
    }

    function closeTerminalModal() {
        if (!terminalModal) return;
        terminalModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (openTerminalBtn) openTerminalBtn.addEventListener('click', openTerminalModal);
    if (heroTerminalBtn) heroTerminalBtn.addEventListener('click', openTerminalModal);
    if (closeTerminalBtn) closeTerminalBtn.addEventListener('click', closeTerminalModal);
    if (closeTerminalDot) closeTerminalDot.addEventListener('click', closeTerminalModal);

    if (terminalModal) {
        terminalModal.addEventListener('click', (e) => {
            if (e.target === terminalModal) closeTerminalModal();
        });
    }

    quickChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            if (cmd) executeTerminalCommand(cmd);
        });
    });

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value.trim();
                if (cmd) {
                    commandHistory.push(cmd);
                    historyIndex = commandHistory.length;
                    executeTerminalCommand(cmd);
                    terminalInput.value = '';
                }
            } else if (e.key === 'ArrowUp') {
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = commandHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    terminalInput.value = '';
                }
            }
        });
    }

    function appendTerminalLine(text, className = '') {
        if (!terminalOutput) return;
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.innerHTML = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function executeTerminalCommand(rawCmd) {
        const cmd = rawCmd.toLowerCase().trim();
        appendTerminalLine(`<span class="terminal-prompt">krishna@dtu:~$</span> ${rawCmd}`, 'command');

        switch (cmd) {
            case 'help':
                appendTerminalLine(`
Available Commands:
  <span class="cmd-highlight">whoami</span>       - Display developer profile & DTU details
  <span class="cmd-highlight">projects</span>     - List flagship engineering projects
  <span class="cmd-highlight">skills</span>       - Inspect technical skill matrix
  <span class="cmd-highlight">experience</span>   - View Webdesino internship details
  <span class="cmd-highlight">awards</span>       - List prestigious honors (McKinsey, SIH, Dell)
  <span class="cmd-highlight">cat resume</span>   - Print resume summary & trigger download
  <span class="cmd-highlight">contact</span>      - Output contact credentials & social links
  <span class="cmd-highlight">clear</span>        - Clear the terminal screen
  <span class="cmd-highlight">exit</span>         - Close the terminal session
                `);
                break;

            case 'whoami':
                appendTerminalLine(`
Krishna Joshi // Software Development Engineer
----------------------------------------------------------------------
Degree:      B.Tech Computer Science & Engineering (2024 - 2028)
Institution: Delhi Technological University (DTU, New Delhi)
Roll:        2K24/CS/250 | CGPA: 7.84 / 10.0
Focus:       Low-Level Systems, Deterministic AI Agents, Scalable Backends
Status:      🟢 Open for Software Engineering & GenAI Internships
                `);
                break;

            case 'projects':
                appendTerminalLine(`
Flagship Projects:
  1. <span class="cmd-highlight">GramAI</span>: Voice-to-Triage GenAI Pipeline for ASHA Workers
     - Tech: Python, Groq API, Whisper Large v3, Llama 3.3 70B, FastAPI, React
     - Highlights: Multimodal triage for rural health, hallucination guardrails

  2. <span class="cmd-highlight">Ledger Copilot</span>: AI Settlement Reconciliation Agent
     - Tech: Next.js, TypeScript, Supabase, Gemini API, Tailwind CSS, Vercel
     - Highlights: 79%+ match rate over 130+ records, 60+ passing tests, zero drift

  3. <span class="cmd-highlight">Smart Waste Bin System</span>: C++ HTTP Server from Scratch
     - Tech: C++, TCP Sockets, HTTP Protocol, OOP, HTML/CSS/JS
     - Highlights: Zero external libraries, raw sockets, 6 custom REST endpoints

  4. <span class="cmd-highlight">Enterprise Legal CMS</span>: Production Webdesino Platform
     - Tech: React, Node.js, Express, MongoDB, JWT RBAC, 100+ inquiries managed

  5. <span class="cmd-highlight">Global B2B/B2C E-Commerce</span>: 180+ Country Commerce Platform
     - Tech: Node.js, Express, MongoDB, Shiprocket, Payment Gateways
                `);
                break;

            case 'skills':
                appendTerminalLine(`
Technical Capabilities:
  • Languages:       C++, Python, TypeScript, JavaScript (ES6+), Java, SQL, HTML/CSS
  • AI & LLMs:       Prompt Engineering, RAG, Embeddings, AI Agents, Tool Calling,
                     Multi-Agent Systems, LangChain, LangGraph, LlamaIndex,
                     Gemini API, Groq API, Whisper Large v3, CrewAI, AutoGen
  • Systems & Core:  TCP Sockets, HTTP Protocol from Scratch, OOP, System Design, DSA, OS
  • Backend & Web:   FastAPI, Node.js, Express, Django REST Framework, JWT Auth
  • Cloud & DevOps:  Docker, Linux/Bash, Supabase, MongoDB, Git, Postman, Vercel, Render
                `);
                break;

            case 'experience':
                appendTerminalLine(`
Professional Experience:
  Role:      Software Engineering Intern @ Webdesino (Feb 2026 - May 2026)
  Scope:     • Built full-stack legal CMS platform managing 100+ active customer enquiries
             • Developed core backend for global e-commerce engine operating in 180+ countries
             • Formulated Employee Management Portal cutting administrative task time by 30%
             • Shipped production admin dashboards and interfaces for 5+ enterprise clients
                `);
                break;

            case 'awards':
                appendTerminalLine(`
Honors & Awards:
  🏆 <span class="cmd-highlight">McKinsey.Org Forward Scholar '26</span>: Selected by McKinsey & Company
  🥇 <span class="cmd-highlight">Smart India Hackathon 2025</span>: Internal Round Winner & National Finalist
  ⭐ <span class="cmd-highlight">Dell Aspire Scholar 2024</span>: Exclusive Dell Scholar Cohort member
  🚗 <span class="cmd-highlight">Infinity Cars Industry Project</span>: Clever Harvey Commercial Deliverables
                `);
                break;

            case 'cat resume':
            case 'resume':
                appendTerminalLine(`
Krishna_Joshi_Resume.pdf [PDF • 83 KB]
Opening resume preview modal...
                `);
                openResumeModal();
                break;

            case 'contact':
                appendTerminalLine(`
Contact Coordinates:
  • Email:    joshikrishna2125@gmail.com
  • Phone:    +91 9911849809
  • Location: Delhi, India (DTU Campus)
  • GitHub:   https://github.com/krishna-dtu
  • LinkedIn: https://linkedin.com/in/krishna-joshi-dtu
                `);
                break;

            case 'clear':
                if (terminalOutput) terminalOutput.innerHTML = '';
                break;

            case 'exit':
            case 'quit':
                closeTerminalModal();
                break;

            default:
                appendTerminalLine(`bash: command not found: ${rawCmd}. Type <span class="cmd-highlight">help</span> for a list of available commands.`, 'error');
                break;
        }
    }

    // ==================== 10. GLOBAL KEYBOARD SHORTCUTS ====================
    document.addEventListener('keydown', (e) => {
        const isInputFocused = ['input', 'textarea'].includes(document.activeElement?.tagName?.toLowerCase());

        // Ctrl+K or Cmd+K: Command Palette
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (cmdPaletteModal?.classList.contains('active')) {
                closeCommandPalette();
            } else {
                openCommandPalette();
            }
            return;
        }

        // ESC: Close all modals
        if (e.key === 'Escape') {
            closeCommandPalette();
            closeTerminalModal();
            closeResumeModal();
            closeArchitectureModal();
            return;
        }

        // Keyboard shortcuts when not typing in form inputs
        if (!isInputFocused) {
            // 'T': Open Terminal
            if (e.key.toLowerCase() === 't') {
                e.preventDefault();
                openTerminalModal();
            }
            // 'R': Open Resume
            else if (e.key.toLowerCase() === 'r') {
                e.preventDefault();
                openResumeModal();
            }
            // 'H': Scroll to Home
            else if (e.key.toLowerCase() === 'h') {
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
            }
            // 'C': Scroll to Contact
            else if (e.key.toLowerCase() === 'c') {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // ==================== 11. CONTACT FORM HANDLER ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Dispatching...';

            setTimeout(() => {
                showToast('Message dispatched successfully! Krishna will get back to you shortly.', 'success', 4000);
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 800);
        });
    }

    // ==================== 12. DEVELOPER CONSOLE GREETING ====================
    console.log(
        '%c🚀 KRISHNA JOSHI // SOFTWARE DEVELOPMENT ENGINEER',
        'color: #38bdf8; font-family: monospace; font-size: 16px; font-weight: bold; background: #07090e; padding: 12px;'
    );
    console.log(
        '%cDelhi Technological University (DTU, 2K24/CS/250) • CGPA 7.84',
        'color: #94a3b8; font-family: monospace; font-size: 12px;'
    );
    console.log(
        '%cLooking under the hood? Type "openTerminalModal()" or press T on the page!',
        'color: #10b981; font-family: monospace; font-size: 12px;'
    );
});
