// Checks your "Meet Biscuit" page: its skeleton, its structure, the hooks for CSS, and the two rules in
// styles.css. These are the parts a browser, a search engine and a screen reader rely on, and the parts CSS
// aims at. It doesn't judge how the page looks: the README's checklist covers that.
// Run it with: npm test (run npm install once first). You don't need to change this file.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.existsSync(path.join(root, 'styles.css')) ? fs.readFileSync(path.join(root, 'styles.css'), 'utf8') : '';
const page = new JSDOM(html).window.document;
const all = (selector, inside = page) => [...inside.querySelectorAll(selector)];
const words = (element) => element.textContent.replace(/\s+/g, ' ').trim();

// True when every folder and file on the path exists with exactly these capital letters, as on a web server.
function existsExactly(file) {
  let folder = root;
  for (const part of file.split('/').filter((piece) => piece !== '.')) {
    if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory() || !fs.readdirSync(folder).includes(part)) {
      return false;
    }
    folder = path.join(folder, part);
  }
  return true;
}

// The rules in styles.css, read by the browser's own CSS reader. A declaration with a typo in it (a missing
// colon, a misspelled property) is dropped, exactly as a browser drops it.
function styleRules() {
  const styled = new JSDOM(html).window.document;
  const sheet = styled.createElement('style');
  sheet.textContent = css;
  styled.head.append(sheet);
  return { styled, rules: [...sheet.sheet.cssRules].filter((rule) => rule.selectorText) };
}

function matches(element, selector) {
  try { return element.matches(selector); } catch { return false; }
}

test('1) the page says its language, its character set and its title', () => {
  assert.ok(page.documentElement.getAttribute('lang')?.trim(), 'Give <html> a lang attribute: <html lang="en">.');
  const charset = page.querySelector('head meta[charset]');
  assert.ok(charset, 'Add <meta charset="utf-8"> to the <head>.');
  assert.equal(charset.getAttribute('charset').toLowerCase(), 'utf-8', 'The character set is utf-8: <meta charset="utf-8">.');
  assert.ok(page.querySelector('head title') && page.title.trim(), 'Give the page a <title> in the <head>: Meet Biscuit | Paws & Whiskers.');
});

test('2) one h1, in the main content, naming Biscuit', () => {
  const headings = all('h1');
  assert.equal(headings.length, 1, `The page has ${headings.length} <h1> elements. A page has exactly one: its title, Meet Biscuit.`);
  assert.match(words(headings[0]), /biscuit/i, 'The <h1> is the page\'s title: Meet Biscuit.');
  assert.ok(page.querySelector('main h1'), 'Put the <h1> inside the <main>: it is this page\'s own title.');
});

test('3) the landmarks: a header, a nav, one main and a footer', () => {
  for (const landmark of ['header', 'nav', 'main', 'footer']) {
    assert.ok(page.querySelector(landmark), `Add a <${landmark}>.`);
  }
  assert.equal(all('main').length, 1, 'A page has one <main>: the content that is this page\'s own.');
  const menu = all('nav a[href]');
  assert.ok(menu.length >= 2, `The <nav> holds ${menu.length} links. Put the menu links from the content sheet inside it, each an <a> with an href.`);
});

test('4) Biscuit\'s picture is in the main content, and every picture has alt text and a file that is there', () => {
  const pictures = all('img');
  assert.ok(pictures.some((img) => /biscuit/i.test(img.getAttribute('src') ?? '') && img.closest('main')),
    'Add Biscuit\'s picture inside the <main>: <img src="images/biscuit.svg" alt="...">.');
  for (const img of pictures) {
    const src = (img.getAttribute('src') ?? '').trim();
    assert.ok(img.getAttribute('alt')?.trim(), `The picture ${src} needs alt text that says what it shows.`);
    assert.ok(src && existsExactly(src), `The picture "${src}" isn't there. Check the folder, the spelling and the capital letters: images/biscuit.svg.`);
  }
});

test('5) the fast facts are a list, one item per fact', () => {
  const lists = all('main ul, main ol');
  const longest = Math.max(0, ...lists.map((list) => all(':scope > li', list).length));
  assert.ok(longest >= 3, lists.length === 0
    ? 'Put the fast facts in a list inside the <main>: a <ul> with an <li> for each fact.'
    : `The longest list has ${longest} items. Give each fast fact its own <li>.`);
});

test('6) two cards with class="pet-card", each with a heading', () => {
  const cards = all('.pet-card');
  assert.ok(cards.length >= 2, `The page has ${cards.length} elements with class="pet-card". Make Pepper's and Clover's cards, each with class="pet-card". Capital letters count.`);
  for (const card of cards) {
    const heading = card.querySelector('h2, h3, h4, h5, h6');
    assert.ok(heading && words(heading), `Every card starts with a heading: the pet's name, such as <h3>Pepper</h3>. This card has none: "${words(card).slice(0, 40)}".`);
  }
});

test('7) styles.css is linked in the head, and every style lives in it', () => {
  const link = all('head link').find((element) => (element.getAttribute('rel') ?? '').toLowerCase().split(/\s+/).includes('stylesheet'));
  assert.ok(link, 'Link the stylesheet in the <head>: <link rel="stylesheet" href="styles.css">.');
  const href = (link.getAttribute('href') ?? '').trim();
  assert.ok(existsExactly(href), `The <link> points to "${href}", which isn't there. The file is styles.css, in the same folder as index.html.`);
  assert.equal(all('style').length, 0, 'Move the CSS from the <style> element into styles.css, so one file styles every page.');
  const inline = all('[style]');
  assert.equal(inline.length, 0, `${inline.length} element(s) have a style attribute, starting with <${inline[0]?.localName}>. Move that CSS into styles.css.`);
});

test('8) styles.css: a rule for the h1 that sets its color', () => {
  const { styled, rules } = styleRules();
  const h1 = styled.querySelector('h1');
  assert.ok(h1, 'Add the <h1> first: this rule styles it.');
  assert.ok(rules.some((rule) => matches(h1, rule.selectorText) && rule.style.getPropertyValue('color')),
    'Write a rule in styles.css for the h1 that sets its color, such as: h1 { color: darkorange; }. Check the colon and the semicolon.');
});

test('9) styles.css: a rule for .pet-card that sets a background-color', () => {
  const { styled, rules } = styleRules();
  const cards = all('.pet-card', styled);
  assert.ok(cards.length > 0, 'Add the cards with class="pet-card" first: this rule styles them.');
  const found = rules.some((rule) => rule.selectorText.includes('.pet-card')
    && cards.every((card) => matches(card, rule.selectorText))
    && (rule.style.getPropertyValue('background-color') || rule.style.getPropertyValue('background')));
  assert.ok(found, 'Write a rule in styles.css for the .pet-card class that sets a background-color, such as: .pet-card { background-color: lavenderblush; }. The dot in front of the name matters.');
});
