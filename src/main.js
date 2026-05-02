import './style.css';
import { EditorView, basicSetup } from 'codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import html2pdf from 'html2pdf.js';

// Elements
const editorContainer = document.querySelector('#editor-container');
const previewContainer = document.querySelector('#preview-container');
const previewBtn = document.querySelector('#preview-btn');
const downloadMdBtn = document.querySelector('#download-md-btn');
const copyMdBtn = document.querySelector('#copy-md-btn');
const copyHtmlBtn = document.querySelector('#copy-html-btn');
const exportPdfBtn = document.querySelector('#export-pdf-btn');
const themeToggleBtn = document.querySelector('#theme-toggle-btn');

// Initialize Editor
let editor = new EditorView({
  doc: localStorage.getItem('md_content') || '# Welcome to MD Web Preview\n\nStart typing here...',
  extensions: [
    basicSetup,
    markdown({ codeLanguages: languages }),
    EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        const content = update.state.doc.toString();
        localStorage.setItem('md_content', content);
      }
    }),
  ],
  parent: editorContainer,
});

// Configure Marked with modern API
marked.use({
  gfm: true,
  breaks: true,
  async: false,
});

// Render Preview
function renderPreview() {
  const content = editor.state.doc.toString();
  const rawHtml = marked.parse(content);
  const cleanHtml = DOMPurify.sanitize(rawHtml);
  previewContainer.innerHTML = cleanHtml;
  
  // Apply syntax highlighting and add copy buttons to code blocks
  previewContainer.querySelectorAll('pre').forEach((pre) => {
    // Ensure pre is relative for button positioning
    pre.style.position = 'relative';

    const code = pre.querySelector('code');
    if (code) {
      hljs.highlightElement(code);

      // Create Copy Button
      const copyBtn = document.createElement('button');
      copyBtn.innerText = 'Copy';
      copyBtn.className = 'copy-code-btn';
      
      copyBtn.addEventListener('click', () => {
        const text = code.innerText;
        navigator.clipboard.writeText(text).then(() => {
          copyBtn.innerText = 'Copied!';
          setTimeout(() => {
            copyBtn.innerText = 'Copy';
          }, 2000);
        });
      });

      pre.appendChild(copyBtn);
    }
  });
}

// Event Listeners
previewBtn.addEventListener('click', renderPreview);

copyMdBtn.addEventListener('click', () => {
  const content = editor.state.doc.toString();
  navigator.clipboard.writeText(content).then(() => {
    alert('Markdown copied to clipboard!');
  });
});

copyHtmlBtn.addEventListener('click', () => {
  const content = editor.state.doc.toString();
  const rawHtml = marked.parse(content);
  const cleanHtml = DOMPurify.sanitize(rawHtml);
  navigator.clipboard.writeText(cleanHtml).then(() => {
    alert('HTML copied to clipboard!');
  });
});

downloadMdBtn.addEventListener('click', () => {
  const content = editor.state.doc.toString();
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'document.md';
  a.click();
  URL.revokeObjectURL(url);
});

exportPdfBtn.addEventListener('click', () => {
  const element = previewContainer;
  const opt = {
    margin: 1,
    filename: 'document.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
});

// Theme Toggle
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme', !isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

themeToggleBtn.addEventListener('click', toggleTheme);

// Initialize Theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
  document.body.classList.remove('light-theme');
}

// Scroll Syncing
let isScrollingEditor = false;
let isScrollingPreview = false;

editorContainer.addEventListener('scroll', () => {
  if (isScrollingPreview) {
    isScrollingPreview = false;
    return;
  }
  isScrollingEditor = true;
  const scrollPct = editorContainer.scrollTop / (editorContainer.scrollHeight - editorContainer.clientHeight);
  previewContainer.scrollTop = scrollPct * (previewContainer.scrollHeight - previewContainer.clientHeight);
});

previewContainer.addEventListener('scroll', () => {
  if (isScrollingEditor) {
    isScrollingEditor = false;
    return;
  }
  isScrollingPreview = true;
  const scrollPct = previewContainer.scrollTop / (previewContainer.scrollHeight - previewContainer.clientHeight);
  editorContainer.scrollTop = scrollPct * (editorContainer.scrollHeight - editorContainer.clientHeight);
});

// Initial Render
renderPreview();
