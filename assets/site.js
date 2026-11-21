
function escapeHtml(value){
  return String(value??'').replace(/[&<>"']/g, c=>({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#39;'
  }[c]));
}

function lectureCard(l){
  return `<article class="lecture-card">
    <div class="visual ${escapeHtml(l.image||'systems')}">
      <span>${escapeHtml(l.topic)}</span>
    </div>
    <div class="card-content">
      <div class="card-meta">${escapeHtml(l.conference)} · ${l.year}</div>
      <h3>
        <a href="lecture.html?id=${encodeURIComponent(l.id)}">
          ${escapeHtml(l.title)}
        </a>
      </h3>
      <p>${escapeHtml(l.description)}</p>
      <span class="tag">${escapeHtml(l.topic)}</span>
      ${l.status?` <span class="tag">${escapeHtml(l.status)}</span>`:''}
      <div style="margin-top:14px">
        <a class="text-link" href="lecture.html?id=${encodeURIComponent(l.id)}">
          View lecture details →
        </a>
      </div>
    </div>
  </article>`;
}

// PUBLICATION PDF LINKS
// Files are hosted within this GitHub Pages website.
// Only publicly host article versions whose sharing permissions allow it.
// Folder names and filenames are case-sensitive.

const PUBLICATION_PDF_URLS = {

  // Existing George–Zakowski article
  '10.1016/j.ijoa.2025.104699':
    'lectures/references/george-zakowski-2025.pdf',

  // Existing hosted PDFs — preserve their working filenames
  '10.1213/ANE.0000000000008018':
    'publications/pdfs/elevate-cesarean-choices-2026.pdf',

  '10.1503/cmaj.240061':
    'publications/pdfs/maccormick-lived-experiences-2024.pdf',

  '10.1016/j.ajog.2025.04.060':
    'publications/pdfs/ke-postpartum-complications-2025.pdf',

  '10.1111/anae.16465':
    'publications/pdfs/george-landau-2025.pdf',

  // Additional uploaded publications — 2026

  // Clinician perspectives on informed consent and limited English proficiency
  '10.1016/j.whi.2026.02.004':
    'publications/pdfs/english-proficiency-analgesia.pdf',

  // General anaesthesia rates: quality metric or system capacity?
  '10.1016/j.bja.2026.10.011':
    'publications/pdfs/bja-cesarean-access-editorial.pdf',

  // ACCESS study editorial in IJOA
  '10.1016/j.ijoa.2026.105288':
    'publications/pdfs/access-ijoa-editorial.pdf',

  // Ensuring best practice in obstetric anesthesia research
  '10.1016/j.ijoa.2026.105252':
    'publications/pdfs/ensuring-best-practice-editorial.pdf',

  // CSE, PIEB and epidural catheter replacement
  '10.1213/ANE.0000000000007788':
    'publications/pdfs/cse-pieb-catheter-failure-2026.pdf',

  // Neuraxial anesthesia and placenta accreta spectrum
  '10.1007/s12630-026-03078-7':
    'publications/pdfs/accreta-sdm-cja.pdf',

  // SOAP, OAA and WFSA global priorities
  '10.1016/j.ijoa.2026.104873':
    'publications/pdfs/soap-wfsa-editorial.pdf',

  // Additional uploaded publications — 2025

  // Consensus statement on opioid use disorder in pregnancy
  '10.1016/j.ajog.2024.12.006':
    'publications/pdfs/mfm-oud-consensus.pdf',

  // Sensory loss and labour epidural breakthrough pain
  '10.1016/j.ijoa.2025.104753':
    'publications/pdfs/kordich-sensory-ijoa.pdf',

  // WFSA declaration on the right to labour analgesia
  '10.1016/j.ijoa.2025.104784':
    'publications/pdfs/wfsa-declaration-pain.pdf',

  // Obstetric anesthesia workforce surveys
  '10.1016/j.ijoa.2025.104831':
    'publications/pdfs/reframing-obanes-workforce.pdf',

  // Additional uploaded publications — 2024

  // Postepidural pain and limited English proficiency
  '10.1007/s12630-024-02802-5':
    'publications/pdfs/postepidural-pain-limited-english.pdf'
};

function pubCard(p){
  const articleLink = p.doi
    ? `<a class="pub-link"
          href="https://doi.org/${encodeURIComponent(p.doi)}"
          target="_blank"
          rel="noopener noreferrer">
          View publication ↗
       </a>`
    : '';

  const pdfUrl = p.pdfUrl || PUBLICATION_PDF_URLS[p.doi] || '';

  const pdfLink = pdfUrl
    ? `<a class="pub-link"
          href="${escapeHtml(pdfUrl)}"
          target="_blank"
          rel="noopener noreferrer"
          style="margin-left:16px">
          View / download PDF ↗
       </a>`
    : '';

  return `<article class="pub">
    <div class="pub-top">
      <span>${p.year}</span>
      <span class="pill">${escapeHtml(p.type)}</span>
      <span class="pill">${escapeHtml(p.pillar)}</span>
    </div>
    <h3>${escapeHtml(p.title)}</h3>
    <p>${escapeHtml(p.authors)}</p>
    <p><em>${escapeHtml(p.journal)}</em></p>
    ${articleLink}
    ${pdfLink}
  </article>`;
}

function fillSelect(el,values){
  for(let v of values){
    const opt=document.createElement('option');
    opt.value=v;
    opt.textContent=v;
    el.appendChild(opt);
  }
}

function initPublications(){
  const q=document.getElementById('pub-search'),
        y=document.getElementById('pub-year'),
        t=document.getElementById('pub-theme'),
        ty=document.getElementById('pub-type'),
        list=document.getElementById('pub-list'),
        count=document.getElementById('pub-count');

  fillSelect(y,[...new Set(PUBLICATIONS.map(x=>x.year))]
    .sort((a,b)=>b-a));

  fillSelect(t,[...new Set(PUBLICATIONS.map(x=>x.pillar))]
    .sort());

  fillSelect(ty,[...new Set(PUBLICATIONS.map(x=>x.type))]
    .sort());

  function render(){
    const needle=q.value.toLocaleLowerCase().trim();

    const found=PUBLICATIONS.filter(x=>
      (!y.value||String(x.year)===y.value) &&
      (!t.value||x.pillar===t.value) &&
      (!ty.value||x.type===ty.value) &&
      (!needle||[
        x.title,x.authors,x.journal,x.pillar,x.type,String(x.year)
      ].join(' ').toLocaleLowerCase().includes(needle))
    );

    count.textContent=`Showing ${found.length} of ${PUBLICATIONS.length} curated publications`;

    list.innerHTML=found.length
      ?found.map(pubCard).join('')
      :'<div class="empty">No publications match these filters. Try a broader search.</div>';
  }

  for(let c of [q,y,t,ty]){
    c.addEventListener(c===q?'input':'change',render);
  }

  render();
}

function initLectures(){
  const q=document.getElementById('lecture-search'),
        t=document.getElementById('lecture-topic'),
        y=document.getElementById('lecture-year'),
        grid=document.getElementById('lecture-grid'),
        count=document.getElementById('lecture-count');

  fillSelect(t,[...new Set(LECTURES.map(x=>x.topic))]
    .sort());

  fillSelect(y,[...new Set(LECTURES.map(x=>x.year))]
    .sort((a,b)=>b-a));

  function render(){
    const needle=q.value.toLowerCase().trim();

    const found=LECTURES.filter(x=>
      (!t.value||x.topic===t.value) &&
      (!y.value||String(x.year)===y.value) &&
      (!needle||[
        x.title,x.conference,x.description,x.topic,x.place
      ].join(' ').toLowerCase().includes(needle))
    );

    count.textContent=`Showing ${found.length} lectures`;

    grid.innerHTML=found.length
      ?found.map(lectureCard).join('')
      :'<div class="empty">No lectures match these filters.</div>';
  }

  for(let c of [q,t,y]){
    c.addEventListener(c===q?'input':'change',render);
  }

  render();
}

function initLectureDetail(){
  const id=new URLSearchParams(location.search).get('id'),
        l=LECTURES.find(x=>x.id===id);

  if(!l){
    document.getElementById('detail-title').textContent='Lecture not found';
    document.getElementById('detail-description').textContent='Select a lecture from the library.';
    return;
  }

  document.title=l.title+' | Ronald B. George';

  document.getElementById('detail-meta').textContent=
    `${l.conference} · ${l.year}`;

  document.getElementById('detail-title').textContent=l.title;

  document.getElementById('detail-description').textContent=l.description;

  document.getElementById('detail-overview').textContent=l.description;

  document.getElementById('detail-points').innerHTML=
    (l.points||[
      'Evidence-informed approaches for clinicians',
      'Practical implications for care'
    ]).map(s=>`<li>${escapeHtml(s)}</li>`).join('');

  document.getElementById('detail-conf').textContent=l.conference;

  document.getElementById('detail-place').textContent=
    l.place+' · '+l.year;

  document.getElementById('detail-status').textContent=
    l.status||'Invited presentation';

  document.getElementById('detail-folder').href=DROPBOX_FOLDER;

  if(l.pdfUrl){
    const a=document.getElementById('detail-pdf');
    a.href=l.pdfUrl;
    a.style.display='inline-flex';

    document.getElementById('detail-notice').textContent=
      'The lecture PDF is available through the external link. Please review copyright and clinical relevance before sharing.';
  }
}
