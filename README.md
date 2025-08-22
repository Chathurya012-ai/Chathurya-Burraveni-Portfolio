# Chathurya Burraveni - Personal Portfolio

A sleek, minimal personal portfolio website built with vanilla HTML, CSS, and JavaScript. Features a modern design with dark/light theme toggle, responsive layout, and accessibility features.

## 🌟 Features

- **Modern Design**: Clean, minimal aesthetic inspired by modern portfolio designs
- **Responsive**: Mobile-first design that works on all devices
- **Accessible**: WCAG 2.1 compliant with keyboard navigation and screen reader support
- **Dark/Light Theme**: Automatic theme detection with manual toggle
- **Single Page Application**: Smooth navigation between sections without page reloads
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML
- **Performance**: Optimized for 90+ Lighthouse scores

## 📁 File Structure

```
portfolio/
├── index.html          # Main HTML file
├── style.css           # Styles with CSS variables
├── script.js           # JavaScript functionality
├── profile.jpeg        # Profile image
├── My_resume.pdf       # Resume PDF
└── README.md           # This file
```

## 🚀 Quick Start

1. **Clone or download** the files to your local machine
2. **Open `index.html`** in your web browser
3. **Customize** the content as needed (see customization guide below)
4. **Deploy** to your preferred hosting service

## 🎨 Customization Guide

### Personal Information

Edit the following sections in `index.html`:

#### Hero Section (Lines 45-60)
```html
<h1 class="hero-title">Your Name</h1>
<p class="hero-subtitle">Your Title</p>
<p class="hero-description">
  Your brief description here...
</p>
```

#### Contact Information
Update these links throughout the file:
- **Email**: Replace `bchathurya78@gmail.com` with your email
- **Phone**: Replace `+1-YOUR-PHONE` with your phone number
- **LinkedIn**: Update the LinkedIn URL
- **GitHub**: Update the GitHub URL

### Skills Section

Edit the skills in `index.html` (around lines 80-120):
```html
<div class="skill-category">
  <h3>Languages</h3>
  <div class="skill-chips">
    <span class="skill-chip">Your Skill</span>
    <!-- Add more skills -->
  </div>
</div>
```

### Experience Section

Update your work experience in `index.html` (around lines 130-180):
```html
<div class="experience-card">
  <div class="experience-header">
    <h3>Your Role</h3>
    <span class="experience-company">Company Name</span>
    <span class="experience-dates">Date Range</span>
  </div>
  <ul class="experience-bullets">
    <li>Your achievement or responsibility</li>
    <!-- Add more bullet points -->
  </ul>
</div>
```

### Projects Section

Update your projects in `index.html` (around lines 190-230):
```html
<div class="project-card">
  <h3>Project Name</h3>
  <p>Project description...</p>
  <div class="project-tech">
    <span class="tech-chip">Technology</span>
  </div>
  <div class="project-links">
    <a href="your-github-url" class="project-link">GitHub</a>
    <a href="your-demo-url" class="project-link">Live Demo</a>
  </div>
</div>
```

### Education & Certificates

Update your education and certificates in their respective sections.

### Profile Image

Replace `profile.jpeg` with your own image:
- Recommended size: 400x400 pixels
- Format: JPEG, PNG, or WebP
- Keep file size under 200KB for performance

### Resume

Replace `My_resume.pdf` with your resume file.

## 🎯 Styling Customization

### Colors

Edit CSS variables in `style.css` (lines 2-20):
```css
:root {
  --color-primary: #2563eb;        /* Main brand color */
  --color-primary-hover: #1d4ed8;  /* Hover state */
  --color-text: #1f2937;           /* Main text color */
  --color-text-light: #6b7280;     /* Secondary text */
  --color-background: #ffffff;     /* Background color */
  /* ... more variables */
}
```

### Typography

Update font sizes and family in `style.css`:
```css
:root {
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-size-base: 1rem;
  /* ... more typography variables */
}
```

### Spacing

Adjust spacing throughout the site:
```css
:root {
  --space-4: 1rem;     /* Base spacing unit */
  --space-8: 2rem;     /* Double spacing */
  --space-16: 4rem;    /* Large spacing */
  /* ... more spacing variables */
}
```

## 🌐 Deployment

### GitHub Pages

1. **Create a new repository** on GitHub
2. **Upload your files** to the repository
3. **Go to Settings** → Pages
4. **Select source**: Deploy from a branch
5. **Choose branch**: main (or master)
6. **Save** and wait for deployment

Your site will be available at: `https://yourusername.github.io/repository-name`

### Netlify

1. **Drag and drop** your project folder to [netlify.com](https://netlify.com)
2. **Or connect** your GitHub repository
3. **Deploy** automatically

### Vercel

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Navigate** to your project folder
3. **Run**: `vercel`
4. **Follow** the prompts

## 🔧 Advanced Customization

### Adding New Sections

1. **Add HTML** in `index.html`:
```html
<section id="new-section" class="section">
  <h2>New Section</h2>
  <!-- Your content -->
</section>
```

2. **Add navigation link**:
```html
<a href="#new-section" class="nav-link">New Section</a>
```

3. **Update JavaScript** in `script.js`:
```javascript
this.sections = ['home', 'skills', 'experience', 'projects', 'education', 'certificates', 'resume', 'new-section'];
```

### Custom Animations

Add CSS animations in `style.css`:
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.section.active {
  animation: fadeIn 0.5s ease-out;
}
```

### Analytics

Add Google Analytics by inserting this before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## ♿ Accessibility Features

- **Skip link** for keyboard users
- **Semantic HTML** with proper landmarks
- **ARIA labels** and roles
- **Focus management** for keyboard navigation
- **Screen reader announcements** for section changes
- **High contrast** color scheme
- **Responsive text** sizing

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Performance Tips

1. **Optimize images** before uploading
2. **Minify CSS/JS** for production
3. **Enable compression** on your hosting service
4. **Use a CDN** for faster loading
5. **Cache static assets** appropriately

## 🐛 Troubleshooting

### PDF Not Loading
- Ensure the PDF file exists and is named correctly
- Check browser PDF viewer settings
- The site includes a fallback for unsupported browsers

### Images Not Displaying
- Verify file paths are correct
- Check file permissions
- Ensure image files are not corrupted

### Navigation Not Working
- Check JavaScript console for errors
- Verify all section IDs match navigation links
- Ensure JavaScript is enabled in browser

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**
