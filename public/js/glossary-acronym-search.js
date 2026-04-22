/**
 * Academic abbreviations glossary: filter rows, anchors, scroll to match.
 * Loaded from Layout scripts slot (inline scripts in Astro slots are stripped).
 */
(function () {
  function initGlossaryAcronymSearch() {
    var root = document.querySelector('.glossary-page-body');
    var input = document.getElementById('glossary-acronym-search-input');
    var status = document.getElementById('glossary-acronym-search-status');
    if (!root || !input || !status) return;

    function assignRowIds() {
      var sections = root.querySelectorAll('section[id]');
      for (var si = 0; si < sections.length; si++) {
        var section = sections[si];
        var tbodies = section.querySelectorAll('.data-table tbody');
        for (var ti = 0; ti < tbodies.length; ti++) {
          var trs = tbodies[ti].querySelectorAll('tr');
          for (var ri = 0; ri < trs.length; ri++) {
            trs[ri].id = section.id + '-abbr-' + ti + '-' + ri;
          }
        }
      }
    }

    assignRowIds();

    var rows = root.querySelectorAll('.data-table tbody tr');
    var scrollTimer = null;

    function acronymCellVariants(tr) {
      var firstTd = tr.querySelector('td');
      if (!firstTd) return [];
      var raw = firstTd.textContent.trim().toLowerCase();
      var parts = raw.split(/\s*\/\s*|\s*,\s*/);
      var out = [];
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i].trim().replace(/\s+/g, ' ');
        if (p) out.push(p);
      }
      if (out.length === 0 && raw) out.push(raw);
      return out;
    }

    function scoreRow(tr, q) {
      var full = (tr.textContent || '').toLowerCase();
      var variants = acronymCellVariants(tr);
      var joined = variants.join(' ');
      var i;
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
      } catch (e) {}
    }

    function headerOffsetPx() {
      var header = document.querySelector('.site-header');
      if (!header) return 96;
      return Math.round(header.getBoundingClientRect().height) + 16;
    }

    function scrollHitIntoViewRobust(hit) {
      if (!hit || !hit.id) return;
      hit.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
      window.scrollBy({ left: 0, top: -headerOffsetPx(), behavior: 'auto' });
      try {
        history.replaceState(null, '', '#' + hit.id);
      } catch (e) {}
    }

    function clearStatus() {
      status.replaceChildren();
    }

    function renderStatus(q, n, bestHit) {
      clearStatus();
      if (!q) return;
      if (n === 0) {
        status.appendChild(document.createTextNode('No abbreviations match that search.'));
        return;
      }
      if (!bestHit || !bestHit.id) {
        status.appendChild(
          document.createTextNode(
            n === 1 ? '1 matching row — see the glossary tables below.' : n + ' matching rows — see the tables below.'
          )
        );
        return;
      }
      var label = '';
      var td0 = bestHit && bestHit.querySelector('td');
      if (td0) label = td0.textContent.replace(/\s+/g, ' ').trim();

      status.appendChild(
        document.createTextNode(n === 1 ? '1 matching row. ' : n + ' matching rows. ')
      );

      var jump = document.createElement('a');
      jump.href = '#' + bestHit.id;
      jump.className = 'glossary-search-jump';
      jump.textContent = label ? 'Jump to “' + label + '” in the table' : 'Jump to match in the table';
      status.appendChild(jump);

      status.appendChild(document.createTextNode(' · Press Enter to scroll there.'));
    }

    function apply() {
      var q = input.value.trim().toLowerCase();
      var n = 0;
      var bestHit = null;
      var bestScore = -1;

      for (var i = 0; i < rows.length; i++) {
        var tr = rows[i];
        tr.classList.remove('glossary-search-hit');
        var text = (tr.textContent || '').toLowerCase();
        var show = !q || text.indexOf(q) !== -1;
        tr.style.display = show ? '' : 'none';
        if (show) {
          n++;
          if (q) {
            var s = scoreRow(tr, q);
            if (s > bestScore) {
              bestScore = s;
              bestHit = tr;
            }
          }
        }
      }

      if (bestHit && q) bestHit.classList.add('glossary-search-hit');

      if (!q) {
        clearStatus();
        clearUrlHash();
        return { q: '', n: 0, bestHit: null };
      }
      renderStatus(q, n, bestHit);
      return { q: q, n: n, bestHit: bestHit };
    }

    function applyHashFromUrl() {
      var id = (location.hash || '').replace(/^#/, '');
      if (!id) return;
      var el = document.getElementById(id);
      if (!el || !root.contains(el)) return;
      if (el.tagName !== 'TR' || !el.closest('.data-table')) return;
      el.classList.remove('glossary-search-hit');
      el.classList.add('glossary-search-hit');
      requestAnimationFrame(function () {
        el.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
        window.scrollBy({ left: 0, top: -headerOffsetPx(), behavior: 'auto' });
      });
    }

    applyHashFromUrl();

    input.addEventListener('input', function () {
      apply();
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        scrollTimer = null;
        var q = input.value.trim();
        if (!q) {
          clearUrlHash();
          return;
        }
        var result = apply();
        if (result.bestHit && result.n > 0) scrollHitIntoViewRobust(result.bestHit);
      }, 400);
    });

    input.addEventListener('keydown', function (e) {
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
        var result = apply();
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
