# Course book assets

`course.css` contains the course book's typography, table and print adjustments.

`mermaid.min.js` and `mermaid-init.js` are the unmodified browser assets generated
by `mdbook-mermaid 0.17.0` (`mdbook-mermaid install`). They are checked in so the
built book can render diagrams without a diagram CDN. The Mermaid runtime retains
its MIT copyright and license notice; the initializer retains its MPL-2.0 notice.

Upstream: https://github.com/badboy/mdbook-mermaid/tree/v0.17.0

To update, install assets into a temporary book, review the generated files, copy
them here and test rendering, theme changes and printing with the pinned mdBook
version. Do not run `install` in this repository without checking `book.toml`:
the installer defaults to writing browser assets into the book root.
