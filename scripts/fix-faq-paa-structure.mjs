import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');

function fixBrokenFaqPaa(content) {
  const wrapMarker =
    '<div itemscope itemtype="https://schema.org/FAQPage" class="faq-page-wrap">';
  const wrapStart = content.indexOf(wrapMarker);
  if (wrapStart === -1) return null;

  const paaStart = content.indexOf('<div class="paa-block">', wrapStart);
  const faqH2 = content.indexOf('<h2 id="faq">', wrapStart);
  if (paaStart === -1 || faqH2 === -1 || paaStart > faqH2) return null;

  const afterMarkers = [
    '\n\t\t<div class="post-callout',
    '\n\t\t<hr',
    '\n\t\t<h2 id="sources"',
    '\n\t\t<h2 id="disclaimer"',
  ];
  let wrapEnd = -1;
  for (const m of afterMarkers) {
    const i = content.indexOf(m, faqH2);
    if (i !== -1 && (wrapEnd === -1 || i < wrapEnd)) wrapEnd = i;
  }
  if (wrapEnd === -1) return null;

  const paaBlock = content.slice(paaStart, faqH2).trimEnd();
  const faqInner = content.slice(faqH2, wrapEnd).trimEnd();
  const before = content.slice(0, wrapStart);
  const after = content.slice(wrapEnd);

  const fixed =
    before +
    wrapMarker +
    '\n\t\t\t<div class="section-label">FAQ</div>\n\t\t\t' +
    faqInner +
    '\n\t\t</div>\n\n\t\t' +
    paaBlock +
    after;

  return fixed;
}

function movePaaAfterFaqBestOnline(content) {
  const faqStart = content.indexOf('<h2 id="faq">Frequently Asked Questions</h2>');
  const paaStart = content.indexOf('<h2 id="paa">People Also Ask</h2>');
  const proseEnd = content.indexOf('</ArticleProse>', paaStart);
  if (faqStart === -1 || paaStart === -1 || paaStart < faqStart) return null;

  const lastFaqDetail = content.lastIndexOf('</details>', paaStart);
  const mid = content.slice(lastFaqDetail + '</details>'.length, paaStart);
  const paaBlock = content.slice(paaStart, proseEnd);
  const before = content.slice(0, lastFaqDetail + '</details>'.length);
  const after = content.slice(proseEnd);

  return before + '\n\n    ' + paaBlock.trim() + mid + after;
}

const brokenFiles = [
  'src/pages/resources/blog/how-to-become-physician-assistant.astro',
  'src/pages/resources/blog/prerequisite-college-courses-by-major.astro',
  'src/pages/resources/blog/enrollment-decline-college-closures-hybrid-campus.astro',
  'src/pages/resources/guides/certificate-programs-college-credit.astro',
];

for (const rel of brokenFiles) {
  const file = path.join(root, rel);
  const fixed = fixBrokenFaqPaa(fs.readFileSync(file, 'utf8'));
  if (!fixed) {
    console.error('FIX FAILED', rel);
    process.exitCode = 1;
  } else {
    fs.writeFileSync(file, fixed);
    console.log('fixed', rel);
  }
}

const bestOnline = path.join(root, 'src/pages/resources/blog/best-online-colleges-2026.astro');
{
  const fixed = movePaaAfterFaqBestOnline(fs.readFileSync(bestOnline, 'utf8'));
  if (fixed) {
    fs.writeFileSync(bestOnline, fixed);
    console.log('fixed best-online-colleges');
  }
}

// Sidebar TOC: FAQ before PAA where still reversed
for (const rel of [
  'src/pages/resources/blog/campus-edu-review.astro',
  'src/pages/resources/blog/most-affordable-online-bachelors-degrees-2026.astro',
  'src/pages/resources/blog/international-students-online-us-colleges.astro',
]) {
  const file = path.join(root, rel);
  let c = fs.readFileSync(file, 'utf8');
  const next = c.replace(
    /<li><a href="#paa">People Also Ask<\/a><\/li>\s*\n\s*<li><a href="#faq">FAQ<\/a><\/li>/g,
    '<li><a href="#faq">FAQ</a></li>\n              <li><a href="#paa">People Also Ask</a></li>'
  );
  if (next !== c) {
    fs.writeFileSync(file, next);
    console.log('toc', rel);
  }
}

console.log('done');
