# Chathurya Burraveni — Portfolio

Professional Software Developer portfolio deployed with GitHub Pages.

**Live site:** https://chathurya012-ai.github.io/Chathurya-Burraveni-Portfolio/

## Stack

Vanilla HTML, CSS, and JavaScript at the repository root. GitHub Pages serves these static files from the `main` branch. No build step is required.

## Tests

With the local preview server running:

```bash
npm test
```

The suite checks resume download, experience dates and metrics, skills, projects, contact links, SEO, GitHub Pages asset paths, and external URLs.

## Local preview

From the project root:

```bash
npx --yes serve .
```

Or:

```bash
python -m http.server 5500
```

Then open `http://localhost:3000` (serve) or `http://localhost:5500`.

## Deploy to GitHub Pages

Do not push until the local preview looks correct.

1. Commit the updated `index.html`, `style.css`, `script.js`, `My_resume.pdf`, and related files.
2. Push to `main`.
3. In the GitHub repository, confirm **Settings → Pages** is set to deploy from `main` / root (`/`).
4. The site URL stays `https://chathurya012-ai.github.io/Chathurya-Burraveni-Portfolio/`.

Relative asset paths (`style.css`, `script.js`, `profile.jpeg`, `My_resume.pdf`) are used so the project-pages base path continues to work.
