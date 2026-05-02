# Markdown Web Previewer

A modern, fast, and secure Markdown editor with real-time preview, built for static hosting on GitHub Pages.

[![Deploy to GitHub Pages](https://github.com/patilk234/md_web_preview/actions/workflows/deploy.yml/badge.svg)](https://github.com/patilk234/md_web_preview/actions/workflows/deploy.yml)

**Live Demo:** [https://patilk234.github.io/md_web_preview/](https://patilk234.github.io/md_web_preview/)

![Website Preview](https://raw.githubusercontent.com/patilk234/md_web_preview/main/public/preview-screenshot.png) *(Note: Please replace this placeholder with an actual screenshot after deployment)*

## 🚀 Features

- **Split-Pane Interface:** Edit Markdown on the left, see the rendered HTML on the right.
- **Rich Editor:** Powered by **CodeMirror 6** with full Markdown syntax highlighting.
- **Instant Preview:** Fast rendering using **marked.js** with **DOMPurify** sanitization.
- **Code Highlighting:** Automatic syntax highlighting in the preview pane via **highlight.js**.
- **One-Click Copy:** 
  - Copy individual code blocks with an overlay "Copy" button.
  - Copy the entire Markdown source or the generated HTML via navbar actions.
- **Export Options:**
  - **PDF Export:** Generate a professional PDF of your rendered Markdown using **html2pdf.js**.
  - **Download .md:** Save your work locally as a standard Markdown file.
- **Persistence:** **Autosave** functionality stores your progress in `localStorage`.
- **Customization:** Toggle between **Dark and Light themes**.
- **Scroll Syncing:** Synchronized scrolling between the editor and the preview panes.

## 🛠️ Tech Stack

- **Vite:** Next-generation frontend tooling for fast builds.
- **Vanilla JS:** Lightweight and performant implementation.
- **CodeMirror 6:** The industry-standard extensible code editor.
- **Marked.js:** A low-level markdown compiler for parsing markdown.
- **DOMPurify:** To ensure all rendered HTML is safe from XSS.
- **Highlight.js:** For beautiful syntax highlighting in the preview.
- **HTML2PDF.js:** For client-side PDF generation.

## 📦 Local Development

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/patilk234/md_web_preview.git
   cd md_web_preview
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🌐 Deployment

This project is configured for **GitHub Pages**. Every push to the `main` branch triggers a GitHub Action that builds the site and deploys it automatically.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
