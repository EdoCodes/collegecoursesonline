/**
 * Academic abbreviations glossary: dim non-matches, anchors, scroll to best match.
 * Imported only from academic-abbreviations/index.astro (bundled client script).
 */
(function () {
  function initGlossaryAcronymSearch() {
    const root = document.querySelector('.glossary-page-body');
    const input = document.getElementById('glossary-acronym-search-input');
    const status = document.getElementById('glossary-acronym-search-status');
    if (!root || !input || !status) return;

    function assignRowIds() {
      const sections = root.querySelectorAll('section[id]');
      for (let si = 0; si < sections.length; si++) {
        const section = sections[si];
        const tbodies = section.querySelectorAll('.data-table tbody');
        for (let ti = 0; ti < tbodies.length; ti++) {
          const trs = tbodies[ti].querySelectorAll('tr');
          for (let ri = 0; ri < trs.length; ri++) {
            trs[ri].id = section.id + '-abbr-' + ti + '-' + ri;
          }
        }
      }
    }

    assignRowIds();

    const rows = root.querySelectorAll('.data-table tbody tr');
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;

    function acronymCellVariants(tr: HTMLTableRowElement): string[] {
      const firstTd = tr.querySelector('td');
      if (!firstTd) return [];
      const raw = firstTd.textContent?.trim().toLowerCase() ?? '';
      const parts = raw.split(/\s*\/\s*|\s*,\s*/);
      const out: string[] = [];
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i].trim().replace(/\s+/g, ' ');
        if (p) out.push(p);
      }
      if (out.length === 0 && raw) out.push(raw);
      return out;
    }

    function scoreRow(tr: HTMLTableRowElement, q: string): number {
      const full = (tr.textContent || '').toLowerCase();
      const variants = acronymCellVariants(tr);
      const joined = variants.join(' ');
      let i: number;
      for (i = 0; i < variants.length; i++) {
        if (variants[i] === q) return 100;
      }
      if (joined === q) return 100;
      for (i = 0; i < variants.length; i++) {
        if (q.length >= 2 && variants[i].indexOf(q) === 0) return 85;
      }
      if (joined.indexOf(q) === 0) return 80;
      if (full.indexOf(q) !== -1) return 40;
      return -1;
    }

    function clearUrlHash() {
      try {
        history.replaceState(null, '', location.pathname + location.search);
      } catch {
        /* ignore */
      }
    }

    function headerOffsetPx(): number {
      const header = document.querySelector('.site-header');
      if (!header) return 96;
      return Math.round(header.getBoundingClientRect().height) + 16;
    }

    function scrollHitIntoViewRobust(hit: HTMLTableRowElement) {
      if (!hit?.id) return;
      hit.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
      window.scrollBy({ left: 0, top: -headerOffsetPx(), behavior: 'auto' });
      try {
        history.replaceState(null, '', '#' + hit.id);
      } catch {
        /* ignore */
      }
    }

    function clearStatus() {
      status.replaceChildren();
    }

    function renderStatus(q: string, n: number, bestHit: HTMLTableRowElement | null) {
      clearStatus();
      if (!q) return;
      if (n === 0) {
        status.appendChild(document.createTextNode('No abbreviations match that search.'));
        return;
      }
      if (!bestHit?.id) {
        status.appendChild(
          document.createTextNode(
            n === 1 ? '1 matching row — see the glossary tables below.' : n + ' matching rows — see the tables below.'
          )
        );
        return;
      }
      let label = '';
      const td0 = bestHit.querySelector('td');
      if (td0) label = td0.textContent?.replace(/\s+/g, ' ').trim() ?? '';

      status.appendChild(document.createTextNode(n === 1 ? '1 matching row. ' : n + ' matching rows. '));

      const jump = document.createElement('a');
      jump.href = '#' + bestHit.id;
      jump.className = 'glossary-search-jump';
      jump.textContent = label ? 'Jump to “' + label + '” in the table' : 'Jump to match in the table';
      status.appendChild(jump);

      status.appendChild(document.createTextNode(' · Press Enter to scroll there.'));
    }

    function apply(): {
      q: string;
      n: number;
      bestHit: HTMLTableRowElement | null;
    } {
      const q = input.value.trim().toLowerCase();
      let n = 0;
      let bestHit: HTMLTableRowElement | null = null;
      let bestScore = -1;

      rows.forEach((row) => {
        const tr = row as HTMLTableRowElement;
        tr.classList.remove('glossary-search-hit');
        tr.classList.remove('glossary-row-dimmed');
        const text = (tr.textContent || '').toLowerCase();
        const show = !q || text.indexOf(q) !== -1;
        if (q && !show) tr.classList.add('glossary-row-dimmed');
        if (show) {
          n++;
          if (q) {
            const s = scoreRow(tr, q);
            if (s > bestScore) {
              bestScore = s;
              bestHit = tr;
            }
          }
        }
      });

      if (bestHit && q) bestHit.classList.add('glossary-search-hit');

      if (!q) {
        clearStatus();
        clearUrlHash();
        return { q: '', n: 0, bestHit: null };
      }
      renderStatus(q, n, bestHit);
      return { q, n, bestHit };
    }

    function applyHashFromUrl() {
      const id = (location.hash || '').replace(/^#/, '');
      if (!id) return;
      const el = document.getElementById(id);
      if (!el || !root.contains(el)) return;
      if (el.tagName !== 'TR' || !el.closest('.data-table')) return;
      el.classList.remove('glossary-search-hit');
      el.classList.add('glossary-search-hit');
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
        window.scrollBy({ left: 0, top: -headerOffsetPx(), behavior: 'auto' });
      });
    }

    applyHashFromUrl();

    input.addEventListener('input', () => {
      apply();
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        scrollTimer = null;
        const qq = input.value.trim();
        if (!qq) {
          clearUrlHash();
          return;
        }
        const result = apply();
        if (result.bestHit && result.n > 0) scrollHitIntoViewRobust(result.bestHit);
      }, 250);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        input.value = '';
        apply();
        clearUrlHash();
        input.blur();
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (scrollTimer) clearTimeout(scrollTimer);
        const result = apply();
        if (!result.q) {
          clearUrlHash();
          return;
        }
        if (result.bestHit && result.n > 0) scrollHitIntoViewRobust(result.bestHit);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlossaryAcronymSearch);
  } else {
    initGlossaryAcronymSearch();
  }
})();
