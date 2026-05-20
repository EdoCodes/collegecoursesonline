import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');

function swapPaaFaqBlocks(content) {
  const re =
    /(<div class="paa-block">[\s\S]*?<\/div>)\s*\n\s*(<div itemscope itemtype="https:\/\/schema.org\/FAQPage" class="faq-page-wrap">[\s\S]*?<\/div>)/;
  if (!re.test(content)) return null;
  return content.replace(re, (_, paa, faq) => `${faq}\n\n${paa}`);
}

function swapTocNavPaaFaq(content) {
  return content.replace(
    /\{ href: '#people-also-ask', label: 'People Also Ask' \},\s*\n\s*\{ href: '#faq', label: 'FAQ' \}/g,
    "{ href: '#faq', label: 'FAQ' },\n\t{ href: '#people-also-ask', label: 'People Also Ask' }"
  );
}

function swapInThisGuidePaaFaq(content) {
  return content.replace(
    /(\d+)\. \[People Also Ask\]\([^)]+\)\n(\d+)\. \[FAQ\]\([^)]+\)/g,
    (_, n1, n2) => `${n1}. [FAQ](#faq)\n${n2}. [People Also Ask](#people-also-ask)`
  );
}

function swapHybridAcceleratedToc(content) {
  return content.replace(
    /7\. \[People Also Ask\]\(#people-also-ask\)\n8\. \[FAQ\]\(#frequently-asked-questions\)/,
    '7. [FAQ](#faq)\n8. [People Also Ask](#people-also-ask)'
  );
}

function swapMathSections(content) {
  const faqStart = content.indexOf('## FAQs About Accredited Online Math Courses');
  const paa1Start = content.indexOf(
    '## People Also Ask: Online Math Courses, Proctoring, and Transfer Credit'
  );
  const chooseStart = content.indexOf('## How to Choose the Best Accredited Online Math Course');
  if (faqStart === -1 || paa1Start === -1 || chooseStart === -1) return null;

  const beforePaa = content.slice(0, paa1Start);
  const faqBlock = content.slice(faqStart, chooseStart);
  const paaBlocks = content.slice(paa1Start, faqStart);
  const after = content.slice(chooseStart);

  let out = beforePaa + faqBlock + paaBlocks + after;
  out = out.replace(
    /8\. \[People Also Ask: proctoring\]\([^)]+\)\n9\. \[People Also Ask: credit and MOOCs\]\([^)]+\)\n10\. \[FAQs\]\([^)]+\)/,
    '8. [FAQs](#faqs-about-accredited-online-math-courses)\n9. [People Also Ask: proctoring](#people-also-ask-online-math-courses-proctoring-and-transfer-credit)\n10. [People Also Ask: credit and MOOCs](#people-also-ask-accredited-online-math-courses-and-credit)'
  );
  return out;
}

function swapBestOnlineColleges(content) {
  const paaMarker = '<h2 id="paa">People Also Ask</h2>';
  const faqMarker = '<h2 id="faq">Frequently Asked Questions</h2>';
  const paaStart = content.indexOf(paaMarker);
  const faqStart = content.indexOf(faqMarker);
  if (paaStart === -1 || faqStart === -1 || paaStart > faqStart) return null;

  const beforePaa = content.slice(0, paaStart);
  const paaEnd = content.indexOf('<h2', faqStart + 1);
  const afterFaq = content.slice(paaEnd === -1 ? content.length : paaEnd);

  const paaBlock = content.slice(paaStart, faqStart);
  const faqBlock = content.slice(faqStart, paaEnd === -1 ? content.length : paaEnd);

  let out = beforePaa + faqBlock + paaBlock + afterFaq;
  out = out.replace(
    /\{ id: "paa", label: "People Also Ask" \},\s*\n\s*\{ id: "faq", label: "FAQ" \}/,
    '{ id: "faq", label: "FAQ" },\n  { id: "paa", label: "People Also Ask" }'
  );
  out = out.replace(
    /<li><a href="#paa">People Also Ask<\/a><\/li>\s*\n\s*<li><a href="#faq">/,
    '<li><a href="#faq">FAQ</a></li>\n              <li><a href="#paa">People Also Ask</a></li>\n              <li><a href="#__skip__">'
  );
  return out;
}

function swapPaaSectionBeforeFaq(content) {
  const re =
    /([\s\S]*?)(<!-- People Also Ask -->[\s\S]*?)(<section id="faq">[\s\S]*?<\/section>)([\s\S]*)/;
  const m = content.match(re);
  if (!m) return null;
  const [, before, paa, faq, after] = m;
  if (before.includes('<section id="faq">')) return null;
  return before + faq + '\n\n          ' + paa.replace(/^[\s\S]*?<!-- People Also Ask -->/, '<!-- People Also Ask -->') + after;
}

const blockFiles = [
  'src/pages/resources/blog/how-to-become-physician-assistant.astro',
  'src/pages/resources/blog/prerequisite-college-courses-by-major.astro',
  'src/pages/resources/blog/enrollment-decline-college-closures-hybrid-campus.astro',
  'src/pages/resources/guides/certificate-programs-college-credit.astro',
];

for (const rel of blockFiles) {
  const file = path.join(root, rel);
  let c = fs.readFileSync(file, 'utf8');
  const swapped = swapPaaFaqBlocks(c);
  if (!swapped) {
    console.error('NO BLOCK MATCH:', rel);
    process.exitCode = 1;
    continue;
  }
  c = swapTocNavPaaFaq(swapped);
  fs.writeFileSync(file, c);
  console.log('OK blocks', rel);
}

const tocOnly = 'src/pages/resources/blog/best-hybrid-adn-nursing-programs-california.astro';
{
  const file = path.join(root, tocOnly);
  let c = fs.readFileSync(file, 'utf8');
  c = swapTocNavPaaFaq(c);
  fs.writeFileSync(file, c);
  console.log('OK toc', tocOnly);
}

const mdxToc = [
  'src/content/blog/best-hybrid-accelerated-adn-programs.mdx',
  'src/content/blog/best-hybrid-adn-nursing-programs-california.mdx',
];
for (const rel of mdxToc) {
  const file = path.join(root, rel);
  let c = fs.readFileSync(file, 'utf8');
  c = swapHybridAcceleratedToc(swapInThisGuidePaaFaq(c));
  fs.writeFileSync(file, c);
  console.log('OK mdx toc', rel);
}

const mathFile = path.join(
  root,
  'src/content/blog/accredited-online-math-courses-transferable-college-credit.mdx'
);
{
  const swapped = swapMathSections(fs.readFileSync(mathFile, 'utf8'));
  if (!swapped) {
    console.error('NO MATH SWAP');
    process.exitCode = 1;
  } else {
    fs.writeFileSync(mathFile, swapped);
    console.log('OK math');
  }
}

const bestOnline = path.join(root, 'src/pages/resources/blog/best-online-colleges-2026.astro');
{
  let c = fs.readFileSync(bestOnline, 'utf8');
  const paaStart = c.indexOf('<h2 id="paa">People Also Ask</h2>');
  const faqStart = c.indexOf('<h2 id="faq">Frequently Asked Questions</h2>');
  const nextAfterFaq = c.indexOf('</ArticleProse>', faqStart);
  if (paaStart > -1 && faqStart > paaStart) {
    const before = c.slice(0, paaStart);
    const paaBlock = c.slice(paaStart, faqStart);
    const faqBlock = c.slice(faqStart, nextAfterFaq);
    const after = c.slice(nextAfterFaq);
    c =
      before +
      faqBlock +
      paaBlock +
      after;
    c = c.replace(
      /\{ id: "paa", label: "People Also Ask" \},\s*\n\s*\{ id: "faq", label: "[^"]+" \}/,
      '{ id: "faq", label: "FAQ" },\n  { id: "paa", label: "People Also Ask" }'
    );
    fs.writeFileSync(bestOnline, c);
    console.log('OK best-online-colleges');
  } else {
    console.error('best-online-colleges skip', paaStart, faqStart);
  }
}

function swapPaaFaqSections(content) {
  const re =
    /(\s*<!-- (?:PAA|People Also Ask) -->\s*\n\s*<section id="paa">[\s\S]*?<\/section>\s*\n\s*)(<!-- FAQ -->\s*\n\s*<section id="faq">[\s\S]*?<\/section>)/i;
  if (!re.test(content)) return null;
  return content.replace(re, (_, paa, faq) => faq + '\n\n          ' + paa.trimStart());
}

function swapSidebarTocPaaFaq(content) {
  return content.replace(
    /<li><a href="#paa">People Also Ask<\/a><\/li>\s*\n\s*<li><a href="#faq">FAQ<\/a><\/li>/g,
    '<li><a href="#faq">FAQ</a></li>\n              <li><a href="#paa">People Also Ask</a></li>'
  );
}

function swapCampusInternationalPaa(content) {
  const re =
    /(\s*<section id="paa">[\s\S]*?<\/section>\s*\n\s*)(<section id="faq">[\s\S]*?<\/section>)/;
  if (!re.test(content)) return null;
  return content.replace(re, (_, paa, faq) => faq + '\n\n          ' + paa.trimStart());
}

const sectionFiles = [
  'src/pages/resources/blog/fafsa-financial-aid-online-college-degrees.astro',
  'src/pages/resources/blog/most-affordable-online-bachelors-degrees-2026.astro',
  'src/pages/resources/blog/campus-edu-review.astro',
  'src/pages/resources/blog/international-students-online-us-colleges.astro',
];

for (const rel of sectionFiles) {
  const file = path.join(root, rel);
  let c = fs.readFileSync(file, 'utf8');
  let swapped = swapPaaFaqSections(c);
  if (!swapped) swapped = swapCampusInternationalPaa(c);
  if (!swapped) {
    console.error('NO SECTION MATCH:', rel);
    process.exitCode = 1;
    continue;
  }
  c = swapSidebarTocPaaFaq(swapped);
  fs.writeFileSync(file, c);
  console.log('OK sections', rel);
}

console.log('done');
