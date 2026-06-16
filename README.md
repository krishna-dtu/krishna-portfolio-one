# 🚀 Krishna Joshi - Portfolio Website

A premium, dark-themed portfolio website showcasing expertise as a **Software Development Engineer** with strong fundamentals in algorithms, system design, and production-grade code.

## ✨ Key Highlights

### 💻 SDE Profile
- **Core Computer Science** - DSA, System Design, OS, Networking
- **Systems Programming** - C++ HTTP server with TCP sockets
- **Backend Architecture** - Microservices, REST APIs, Database design
- **Problem Solving** - Algorithmic thinking and optimization
- **Production Experience** - Built and deployed real-world systems

### 🎨 Design
- **Pure Dark Theme** - True black (#0a0a0a) background with premium aesthetics
- **Glassmorphism** - Modern frosted glass effect on cards
- **Responsive Design** - Flawless on mobile, tablet, and desktop
- **Inter Font** - Clean, professional typography
- **Smooth Animations** - Scroll-triggered fade-ins, hover effects

### 🎭 Interactive Elements
- **Scroll Progress Bar** - Visual indicator at top
- **Typed Text Effect** - Animated hero subtitle
- **Skill Progress Bars** - Animated on scroll
- **Project Cards** - 3D tilt effect on hover
- **Mobile Menu** - Smooth hamburger navigation
- **Scroll to Top** - Quick navigation button
- **Active Nav Highlighting** - Auto-updates based on section

### 🎯 Sections
1. **Hero** - Stunning introduction with availability status
2. **About** - Stats counter with GPA, internships, projects, awards
3. **Experience** - Timeline with 3 professional roles
4. **Projects** - 6 featured projects from resume
5. **Skills** - Categorized progress bars (Languages, Frontend, Backend, Database)
6. **Awards** - 4 honors displayed
7. **Contact** - Functional form with glassmorphic design

### ⚡ Performance
- **Intersection Observer API** - Efficient scroll animations
- **Debounced Events** - Optimized scroll handlers
- **GPU Acceleration** - Smooth CSS transforms
- **Lazy Loading Ready** - Image optimization prepared

### 🎁 Bonus Features
- **Konami Code Easter Egg** (↑↑↓↓←→←→BA)
- **Console Greeting** - For fellow developers
- **Right-click Email Copy** - Quick clipboard action
- **Keyboard Shortcuts** - Press 'H' for home, 'C' for contact
- **Parallax Effect** - Subtle depth on hero image
- **Notification System** - Toast messages

## 🚀 Quick Start

### Option 1: Direct Open
```bash
# Simply open index.html in your browser
open index.html
```

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000

# Then visit http://localhost:8000
```

## 📝 Customization

### Update Personal Information

**1. Contact Details** (index.html)
```html
<!-- Search and replace -->
- Email: joshikrishna2125@gmail.com
- Phone: +91 9911849809
- GitHub: https://github.com/krishnajoshi
- LinkedIn: https://linkedin.com/in/krishnajoshi
```

**2. Hero Section**
```javascript
// In script.js, line 68
const textArray = ['Developer', 'Engineer', 'Problem Solver', 'Innovator'];
// Add your own roles
```

**3. Projects**
Add or modify projects in the `projects-grid` section. Each project follows this structure:
```html
<div class="project-card glass-card">
    <div class="project-header">
        <h3>Project Name</h3>
        <div class="project-links">
            <a href="GITHUB_URL" target="_blank">
                <i class="fab fa-github"></i>
            </a>
        </div>
    </div>
    <p class="project-description">Description here</p>
    <div class="tags">
        <span>Tech 1</span>
        <span>Tech 2</span>
    </div>
    <div class="project-date">Date</div>
</div>
```

**4. Skills**
Update skill percentages:
```html
<div class="skill-progress" data-progress="95"></div>
<!-- Change data-progress value (0-100) -->
```

**5. Experience Timeline**
Modify timeline items with your experience:
```html
<div class="timeline-item">
    <div class="timeline-badge">YEAR</div>
    <div class="timeline-content">
        <h3>Job Title</h3>
        <h4>Company Name • Location</h4>
        <span class="timeline-date">Start - End</span>
        <p>Description...</p>
        <div class="tags">
            <span>Skill 1</span>
        </div>
    </div>
</div>
```

### Change Colors

**In styles.css** (lines 2-15):
```css
:root {
    --color-bg: #0a0a0a;          /* Main background */
    --color-surface: #141414;      /* Card backgrounds */
    --color-text: #f5f5f5;         /* Primary text */
    --color-text-muted: #a3a3a3;   /* Secondary text */
    --color-accent: #ffffff;       /* Highlights */
    --color-success: #22c55e;      /* Green dot */
}
```

### Add Your Photo

Replace the icon in hero section:
```html
<div class="profile-img">
    <!-- Replace icon with: -->
    <img src="your-photo.jpg" alt="Krishna Joshi">
</div>
```

Add this CSS:
```css
.profile-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
}
```

### Connect Contact Form

**Option 1: Formspree (Easiest)**
```javascript
// In script.js, replace the form handler
fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(() => showNotification('Message sent!', 'success'))
.catch(() => showNotification('Error sending message', 'error'));
```

**Option 2: EmailJS**
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Get your credentials
3. Add EmailJS script
4. Update form handler

**Option 3: Your Backend**
Point the form to your API endpoint.

## 🌐 Deployment

### Netlify (Recommended)
1. Drag and drop folder to [Netlify Drop](https://app.netlify.com/drop)
2. Done! Free HTTPS + custom domain

### GitHub Pages
```bash
# Create repo named: yourusername.github.io
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main

# Enable GitHub Pages in repo settings
# Visit: https://yourusername.github.io
```

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

## 📱 Responsive Breakpoints

- **Desktop**: > 768px (Full layout)
- **Tablet**: 480px - 768px (Adjusted layouts)
- **Mobile**: < 480px (Single column, hamburger menu)

## 🎯 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+
- ❌ IE11 (Not supported - uses modern CSS/JS)

## 🎨 Features Breakdown

### Animations
- **Fade-up on scroll** - All sections and cards
- **Skill bars** - Animate from 0 to value
- **Stats counter** - Count up animation
- **Typed text** - Rotating roles
- **Card tilt** - 3D effect on hover
- **Smooth scrolling** - All anchor links

### Interactions
- **Navbar blur** - Glassmorphism on scroll
- **Active nav links** - Auto-highlight
- **Mobile menu** - Smooth slide-in
- **Scroll progress** - Top bar indicator
- **Scroll to top** - Appears after 500px
- **Hover effects** - On all interactive elements

### Accessibility
- **Keyboard navigation** - Full support
- **Focus indicators** - Visible outlines
- **ARIA labels** - On all icons
- **Semantic HTML** - Proper structure
- **Alt text** - On images

## 🐛 Troubleshooting

### Animations not working
- Check JavaScript console for errors
- Ensure script.js is loaded
- Try hard refresh (Ctrl+F5)

### Mobile menu stuck
- Click outside to close
- Press Escape key
- Refresh page

### Form not submitting
- Check console for errors
- Connect to a form service (Formspree, EmailJS)
- Add your backend endpoint

### Styles look wrong
- Clear browser cache
- Check if styles.css is linked
- Verify CSS file path

## 📊 Performance Metrics

**Target Lighthouse Scores:**
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**Optimization Tips:**
1. Compress images (use WebP format)
2. Minify CSS/JS before production
3. Enable Gzip on server
4. Use CDN for Font Awesome
5. Add meta tags for SEO

## 🔧 SEO Optimization

Add these meta tags in `<head>`:
```html
<meta name="description" content="Krishna Joshi - Full Stack Developer specializing in React, Node.js, and modern web technologies">
<meta name="keywords" content="Krishna Joshi, Full Stack Developer, Web Developer, React, Node.js, Portfolio">
<meta name="author" content="Krishna Joshi">

<!-- Open Graph -->
<meta property="og:title" content="Krishna Joshi | Full Stack Developer">
<meta property="og:description" content="Software Engineering Intern crafting scalable full-stack applications">
<meta property="og:image" content="https://yoursite.com/preview.jpg">
<meta property="og:url" content="https://yoursite.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Krishna Joshi | Full Stack Developer">
<meta name="twitter:image" content="https://yoursite.com/preview.jpg">
```

## 📦 File Structure

```
portfolio/
│
├── index.html          # Main HTML file
├── styles.css          # All styles
├── script.js           # All JavaScript
└── README.md           # Documentation
```

## 🎓 Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Custom properties, Grid, Flexbox, Animations
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Font Awesome 6** - Icons
- **Google Fonts** - Inter typeface

## 💡 Tips for Success

1. **Add Real Project Images** - Replace icon placeholders
2. **Keep Content Concise** - Quality over quantity
3. **Update Regularly** - Keep projects current
4. **Test Thoroughly** - All devices and browsers
5. **Optimize Images** - Fast load times matter
6. **Connect Form** - Make it functional
7. **Add Analytics** - Track visitors
8. **Share Widely** - LinkedIn, GitHub, Resume

## 🚀 Next Steps

After launching:
- [ ] Add Google Analytics
- [ ] Submit to Google Search Console
- [ ] Share on LinkedIn
- [ ] Add to resume
- [ ] Get feedback
- [ ] Add blog section (optional)
- [ ] Create custom domain
- [ ] Add testimonials (optional)

## 🤝 Credits

**Designed & Developed by Krishna Joshi**
- GitHub: [@krishnajoshi](https://github.com/krishnajoshi)
- Email: joshikrishna2125@gmail.com

## 📄 License

Free to use for personal projects. Attribution appreciated!

---

**Built with ❤️ and ☕ by Krishna Joshi**

🌟 If you like this portfolio, star it and share it with others!
