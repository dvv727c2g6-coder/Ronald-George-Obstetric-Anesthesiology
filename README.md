# Ronald B. George — Academic website (version 1)

An independent static academic website with a curated, searchable publication catalogue and lecture library. No server, database, build tools or account are required for browsing.

## Preview

From this directory run `python3 -m http.server 8000` and visit `http://localhost:8000`. You can also open `index.html` directly in a browser.

## Deploy on GitHub Pages

1. Create a public GitHub repository (for example `ronald-george-academic-site`).
2. Upload everything in this directory to the repository root.
3. In Settings → Pages, set **Deploy from a branch**, `main`, `/(root)`.
4. The generated URL will usually be `https://YOUR_USERNAME.github.io/REPOSITORY/`.
5. Add a custom domain from Settings → Pages, and configure DNS at the domain registrar if desired.

## Edit content

- Publications: `data/publications.js` (currently curated from the August 2026 CV, not complete).
- Lectures: `data/lectures.js`. Each lecture has a `pdfUrl` field. Put a confirmed *individual file* Dropbox share URL there, not a folder share URL.
- Shared Dropbox folder: `DROPBOX_FOLDER` at the top of `data/lectures.js`.
- Content and layout: individual HTML pages, `assets/style.css`, and `assets/site.js`.

## Pre-publication checklist

- Confirm citation metadata against PubMed/DOI; remove duplicates in the CV and add missing publications.
- Confirm all leadership titles, affiliations and dates.
- Confirm the lecture PDFs are suitable for public distribution, especially patient imagery and third-party copyright.
- Add individual Dropbox PDF URLs for ICISA and OAA once they are identified.
- Add a headshot (permission-cleared) and preferred email/ORCID/profile links.
- Review disclosures and any institutional web guidance.

The Dropbox folder URL was supplied by the user; the contents of the folder were not independently verified.
