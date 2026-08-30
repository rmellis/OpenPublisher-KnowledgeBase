<div align="center">
  <a href="https://openpublisher.app">
    <img src="./wp-content/uploads/2026/08/cropped-Screenshot-2026-08-11-164650.png" alt="Open Publisher Logo" width="300">
  </a>
  <br/>
  <br/>
  <strong>The official documentation and Knowledge Base for Open Publisher.</strong>
  <br/>
  <br/>
  <img src="https://github.com/rmellis/open-publisher/raw/main/docs/screenshots/platforms.png" alt="Open Publisher Application Preview" width="800">
</div>

---

## 📖 About Open Publisher

Open Publisher is a WYSIWYG (*What You See Is What You Get*) desktop publishing application built as a completely free, open-source alternative to premium tools like Microsoft Publisher. 

It provides precision layout tools, rich typography, shape and image manipulation, and comprehensive export capabilities (HTML, PDF, XPS, Image) that you would expect from a professional suite—with absolutely no ads and no subscriptions.

## ⚡ About This Repository

This repository contains the completely static, offline-ready export of the Open Publisher Knowledge Base. It serves as a lightning-fast, backend-free repository for all official user guides, technical documentation, and templates.

### The Offline Search Engine (`openpublisher-offline-search`)

Traditional CMS search functionality breaks when a site is exported to static HTML. To solve this, this Knowledge Base is powered by a custom-built, client-side Javascript search engine.

* **Instantaneous Results:** Searches a pre-compiled JSON database (`op-search-index.json`) entirely within the browser.
* **Protocol Agnostic:** Dynamically calculates relative local paths and aggressively rewrites legacy absolute links on the fly. This means the Knowledge Base works flawlessly whether hosted on GitHub Pages, a local Nginx server, or even when opened directly from a local hard drive via the `file://` protocol.
* **Zero Dependencies:** Requires no PHP backend, databases, or active server configurations.

## 🚀 Navigation

* **[Introduction & Getting Started](./db/introduction/index.htm)**
* **[Page & Document Management](./db/page-management/index.htm)**
* **[Layout & Workspace Tools](./db/layout-tools/index.htm)**
* **[Text Boxes & Typography](./db/typography/index.htm)**
* **[Images & Graphics](./db/graphics/index.htm)**
* **[Master Pages & Themes](./db/master-themes/index.htm)**
* **[Export & Sharing](./db/export-share/index.htm)**

## 🛑 Contributing Policy

Because this Knowledge Base serves as the official, structured source of truth for Open Publisher users, **we do not accept Pull Requests for new content or documentation changes.** This repository is strictly managed by the core Open Publisher team to ensure quality, formatting, and structural consistency. 

However, you are highly encouraged to fork this repository, explore the custom static search engine architecture, and reuse the code or templates for your own projects!

## 📄 License

The contents of this repository are provided freely. You are welcome to fork, adapt, and reuse this knowledge base architecture and its content for your own needs. 
