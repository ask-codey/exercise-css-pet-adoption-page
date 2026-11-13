# Exercise: A Pet Adoption Page

Exercise code for the lesson **Exercise: A Pet Adoption Page** in CSS in Depth on [ask-codey.com](https://www.ask-codey.com).

Paws & Whiskers, a pet adoption shelter, needs a page for Biscuit, a three-year-old beagle looking for a home. You'll write the whole "Meet Biscuit" page in HTML from a content sheet, ready for styling, and link it to a stylesheet with two rules of your own. Tests check the page's skeleton, its structure, the class names CSS hooks onto, and your two rules.

## What's here

- `index.html`: empty except for a comment that lists every part of the page, in order from the top. For you to write.
- `styles.css`: empty except for a comment that says which two rules to write. For you to finish.
- `content-sheet.txt`: every word that goes on the page, from the browser tab to the footer. Ready to use.
- `images/`: the pictures of Biscuit, Pepper and Clover (`biscuit.svg`, `pepper.svg`, `clover.svg`). Ready to use.
- `page.test.js` and `package.json`: the tests that check your page, and the list of what they need. You don't need to change these.

## Run it

Open the folder in VS Code, right-click `index.html` and choose **Open with Live Server**. The page reloads every time you save.

## Check your work

In VS Code, open a terminal (**Terminal > New Terminal**), and run this once, to download what the tests need:

```bash
npm install
```

Then run the tests, as often as you like:

```bash
npm test
```

At first every test fails: that is expected. Each part of the page you finish turns its test green. A failing test's message says what it looked for and what to fix, for example: The page has 0 elements with class="pet-card". Make Pepper's and Clover's cards, each with class="pet-card". Capital letters count.

## What to do

1. **The skeleton.** The doctype, `<html lang="en">`, a `<head>` and a `<body>`. In the head: `<meta charset="utf-8">`, the viewport line, the `<title>` from the content sheet, and `<link rel="stylesheet" href="styles.css">`.
2. **The top of the page.** A `<header>` with the site's name, and a `<nav>` with the four menu links.
3. **The main content.** A `<main>` that starts with the page's one `<h1>`, then Biscuit's picture with alt text, his story, and the fast facts as a list.
4. **The cards.** A section for the other pets, with a card each for Pepper and Clover. Each card is an `<article>` with `class="pet-card"`, holding the pet's name as an `<h3>`, its picture and its text.
5. **The bottom of the page.** A `<footer>` with the address and the opening hours.
6. **The two rules.** In `styles.css`, a rule that gives the `h1` a color, and a rule that gives `.pet-card` a `background-color`.

## The rules

- The page has exactly one `<h1>`, inside the `<main>`.
- Every picture has alt text that says what it shows, more than the pet's name.
- Every style goes in `styles.css`: no `style` attributes and no `<style>` element.
- Class names are written exactly as given, in lowercase: `pet-card`.

## Look at it

The tests can't see the page, so check these by eye in the browser:

- The browser tab says *Meet Biscuit | Paws & Whiskers*.
- The heading is in your color, and both cards have their background color.
- Each section's heading sits above its own content, and the facts show as a bulleted list.
- Turn the pictures off in your head: does the alt text tell someone what each one shows?

## Tips

- Write the skeleton first, save, and check the browser tab shows your title. Then add one part at a time, saving as you go.
- Indent each element one step further than the element it sits in. A missing closing tag is much easier to spot that way.
- Write the opening and closing tags first, then fill in the content between them.
- If a rule doesn't change anything, check the `<link>` first, then the rule's curly braces, colon and semicolon.

## Hand it in

When it works, put your solution in a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. You don't need Git: create the repo on GitHub, choose **Add file**, then **Upload files**, and upload everything in this folder except `node_modules` (it's the files `npm install` downloaded, far too many for GitHub's upload, and `npm install` makes it again). The lesson page shows each step, and the lesson *Put Your Page Online for Free* walks through every screen.
