// ==============================
// PORTFOLIO CAROUSEL LOGIC
// ==============================

let currentIndex = 0;

function openItem(el) {
  document.querySelectorAll('.expanded')
    .forEach(e => e.classList.remove('active'));

  const expanded = el.querySelector('.expanded');
  if (!expanded) return;

  expanded.classList.add('active');
  currentIndex = 0;
  updateCarousel(expanded);
}

function updateCarousel(container) {
  const images = container.querySelectorAll('img');
  images.forEach(img => img.classList.remove('active'));
  if (images.length > 0) {
    images[currentIndex].classList.add('active');
  }
}

function next(e) {
  e.stopPropagation();
  const container = e.target.closest('.expanded');
  if (!container) return;

  const images = container.querySelectorAll('img');
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel(container);
}

function prev(e) {
  e.stopPropagation();
  const container = e.target.closest('.expanded');
  if (!container) return;

  const images = container.querySelectorAll('img');
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel(container);
}

// ==============================
// TEXT SCRAMBLE EFFECT
// ==============================

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => (this.resolve = resolve));
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 30);
      const end = start + Math.floor(Math.random() * 30);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;

    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

// ==============================
// INIT ON LOAD
// ==============================

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('.scramble-text');
  if (!element) return;

  const fx = new TextScramble(element);
  const text = element.innerText;

  element.style.opacity = 1;
  fx.setText(text);

  setInterval(() => {
    fx.setText(text);
  }, 5000);
});


// ==============================
// BEHANCE-LIKE FULLSCREEN OPEN (FULL SCREEN VERSION)
// ==============================

// ciljamo PRVI kvadrat
const firstItem = document.querySelector('.portfolio .grid .item:first-child');

// kreiramo overlay jednom
const overlay = document.createElement('div');
overlay.id = 'behance-overlay';

Object.assign(overlay.style, {
  position: 'fixed',
  top: 0,
  left: 0,
  transform: 'translateY(100%)',
  width: '100vw',
  height: '100vh',
  background: '#ffffff',
  zIndex: 9999,
  transition: 'transform 0.5s ease',
  overflow: 'auto',
});

// dodaj u body
document.body.appendChild(overlay);

// klik na prvi kvadrat
if (firstItem) {
  firstItem.addEventListener('click', () => {
    overlay.style.transform = 'translateY(0)';
    document.body.style.overflow = 'hidden'; // lock scroll
  });
}

// zatvaranje klikom na overlay (kao back)
overlay.addEventListener('click', () => {
  overlay.style.transform = 'translateY(100%)';
  document.body.style.overflow = ''; // unlock scroll
});


// klik na prvi kvadrat
if (firstItem) {
  firstItem.addEventListener('click', () => {
    // ubaci HTML u overlay
    overlay.innerHTML = `
      <div class="behance-content" style="padding: 0; max-width: 100%; box-sizing: border-box;">

<!-- X Button -->
        <button id="close-overlay" style="
          position: absolute;
          top: 20px;
          right: 20px;
          background: transparent;
          border: none;
          font-size: 32px;
          cursor: pointer;
        ">&times;</button>

        <h1 style="margin-bottom: 40px; font-size: 36px;">Palm Tree: Branding and Clothing Design</h1>

 <!-- Logo + manji tekst -->
        <div class="brand-info" style="display: flex; align-items: center; gap: 16px; margin-bottom: 40px;">
          <img src="Brandesigner logo.png" alt="Brandesigner Logo" style="width: 50px; height: auto;">
          <span style="font-size: 18px; color: #333; font-family: "neue-haas-grotesk-text", Helvetica, Arial, sans-serif;>
            <strong>Brandesigner</strong>
          </span>
        </div>

         <div style="font-family: "neue-haas-grotesk-text", Helvetica, Arial, sans-serif;">
          <p>Palm Tree is a daughter clothing brand of the well-established 30-year-old company Mitex from Serbia.<br>
          Mitex is a leading textile production brand, known for their exeptional dedication to quality and innovation.<br><br>
          Brandesigner team collaborated with Mitex to create the Palm Tree clothing brand from scratch.<br> 
          We created logo, branding and clothing design that captures the essence of the newborn company.
          </p>
        </div>

        <div class="behance-images" style="display: flex; flex-direction: column;">
          <img src="Palm Tree/00.jpg" style="width: 100%; display: block;">
          <img src="Palm Tree/1.png" style="width: 100%; display: block;">
          <img src="Palm Tree/2.png" style="width: 100%; display: block;">
          <img src="Palm Tree/3.png" style="width: 100%; display: block;">
          <img src="Palm Tree/0.png" style="width: 100%; display: block;">
          <img src="Palm Tree/10.png" style="width: 100%; display: block;">
          <img src="Palm Tree/11.png" style="width: 100%; display: block;">
          <img src="Palm Tree/12.png" style="width: 100%; display: block;">
          <img src="Palm Tree/4.png" style="width: 100%; display: block;">
          <img src="Palm Tree/5.png" style="width: 100%; display: block;">
          <img src="Palm Tree/6.png" style="width: 100%; display: block;">
          <img src="Palm Tree/9.png" style="width: 100%; display: block;">
          <img src="Palm Tree/8.png" style="width: 100%; display: block;">
          <img src="Palm Tree/13.png" style="width: 100%; display: block;">
        </div>

      </div>
    `;

    // pokaži overlay
    overlay.style.transform = 'translateY(0)';
    document.body.style.overflow = 'hidden'; // lock scroll
  });
}


// ==============================
// BEHANCE-LIKE FULLSCREEN OPEN FOR SECOND ITEM
// ==============================

const secondItem = document.querySelector('.portfolio .grid .item[data-project="2"]');

if (secondItem) {
  secondItem.addEventListener('click', () => {
    overlay.innerHTML = `
      <div class="behance-content" style="padding: 0; max-width: 100%; box-sizing: border-box;">

        <!-- X Button -->
        <button id="close-overlay" style="
          position: absolute;
          top: 20px;
          right: 20px;
          background: transparent;
          border: none;
          font-size: 32px;
          cursor: pointer;
        ">&times;</button>

        <h1 style="margin-bottom: 40px; font-size: 36px;">777: Experimental Art Series</h1>

        <div class="brand-info" style="display: flex; align-items: center; gap: 16px; margin-bottom: 40px;">
          <img src="Nenad Fuso Milcanovic.png" alt="Nenad Fuso Milcanovic" style="width: 50px; height: auto;">
          <span style='font-size: 18px; color: #333; font-family: "neue-haas-grotesk-text", Helvetica, Arial, sans-serif;'>
            <strong>Nenad Fuso Milčanović</strong>
          </span>
        </div>

        <div style='font-family: "neue-haas-grotesk-text", Helvetica, Arial, sans-serif; margin-bottom: 40px;'>
          <p>
            The 777 Experimental Art Series explores abstract visual concepts and pushes creative boundaries.<br>
            Each piece is designed to challenge perception and provoke thought in a contemporary art context.<br><br>
            This project is part of a curated selection of experimental works.<br>
            It showcases innovative approaches to design and artistic expression.<br><br>
            All pieces are sold.
          </p>
        </div>

        <div class="behance-images" style="display: flex; flex-direction: column;">
          <img src="777/0.jpg" style="width: 100%; display: block;">
          <img src="777/1.jpg" style="width: 100%; display: block;">
          <img src="777/2.jpg" style="width: 100%; display: block;">
          <img src="777/3.jpg" style="width: 100%; display: block;">
          <img src="777/4.png" style="width: 100%; display: block;">
          <img src="777/6.jpg" style="width: 100%; display: block;">
          <img src="777/5.jpg" style="width: 100%; display: block;">
        </div>

      </div>
    `;

    overlay.style.transform = 'translateY(0)';
    document.body.style.overflow = 'hidden'; // lock scroll

    // close button inside overlay
    const closeBtn = overlay.querySelector('#close-overlay');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        overlay.style.transform = 'translateY(100%)';
        document.body.style.overflow = ''; // unlock scroll
      });
    }
  });
}


// ==============================
// PROJECT 5 — FULLSCREEN CONTENT
// ==============================

// ciljamo peti kvadrat
const fifthItem = document.querySelector('.portfolio .grid .item[data-project="5"]');

if (fifthItem) {
  fifthItem.addEventListener('click', () => {

    overlay.innerHTML = `
      <div class="behance-content" style="padding:0; max-width:100%; box-sizing:border-box;">

        <!-- X -->
        <button id="close-overlay" style="
          position:absolute;
          top:20px;
          right:20px;
          background:transparent;
          border:none;
          font-size:32px;
          cursor:pointer;
        ">&times;</button>

        <h1 style="margin-bottom:40px; font-size:36px;">
          167PLUTO: Three Prints for Company Founders
        </h1>

         <!-- Logo + manji tekst -->
        <div class="brand-info" style="display: flex; align-items: center; gap: 16px; margin-bottom: 40px;">
          <img src="Brandesigner logo.png" alt="Brandesigner Logo" style="width: 50px; height: auto;">
          <span style="font-size: 18px; color: #333; font-family: "neue-haas-grotesk-text", Helvetica, Arial, sans-serif;>
            <strong>Brandesigner</strong>
          </span>
        </div>

         <div style="font-family: "neue-haas-grotesk-text", Helvetica, Arial, sans-serif;">
          <p>Sacha, one of three 167PLUTO founders, asked us to create three huge prints for each of the three founders.<br>
          Each of the digital artworks represents a different point of view related to the planet Pluto.<br><br>
          Brandesigner team carefully crafted all three prints digitally and then framed them in glass.<br>
          All three prints are the same size of 7087px wide and 9449 high.<br><br>
          Prints are hanged in 167PLUTO headquaters in Belgrade.
          </p>
        </div>

        <div class="behance-images" style="display:flex; flex-direction:column;">
          <img src="167PLUTO/167PLUTO - 1.jpg" style="width:100%; display:block;">
          <img src="167PLUTO/167PLUTO - 2.jpg" style="width:100%; display:block;">
          <img src="167PLUTO/167PLUTO - 3.jpg" style="width:100%; display:block;">
        </div>

      </div>
    `;

    overlay.style.transform = 'translateY(0)';
    document.body.style.overflow = 'hidden';
  });
}


// ==============================
// PROJECT 3 — FULLSCREEN CONTENT
// ==============================

// ciljamo treći kvadrat
const thirdItem = document.querySelector('.portfolio .grid .item[data-project="3"]');

if (thirdItem) {
  thirdItem.addEventListener('click', () => {

    overlay.innerHTML = `
      <div class="behance-content" style="padding:0; max-width:100%; box-sizing:border-box;">

        <!-- X -->
        <button id="close-overlay" style="
          position:absolute;
          top:20px;
          right:20px;
          background:transparent;
          border:none;
          font-size:32px;
          cursor:pointer;
        ">&times;</button>

        <h1 style="margin-bottom:40px; font-size:36px;">
          Zdravko Kulinarko: Logo Design and Branding
        </h1>

          <!-- Logo + manji tekst -->
        <div class="brand-info" style="display: flex; align-items: center; gap: 16px; margin-bottom: 40px;">
          <img src="Brandesigner logo.png" alt="Brandesigner Logo" style="width: 50px; height: auto;">
          <span style="font-size: 18px; color: #333; font-family: "neue-haas-grotesk-text", Helvetica, Arial, sans-serif;>
            <strong>Brandesigner</strong>
          </span>
        </div>

         <div style="font-family: "neue-haas-grotesk-text", Helvetica, Arial, sans-serif;">
          <p>Zdravko Kulinarko is a brand created by Stefan Božić.<br>
          He's a super-famous content creator for healthy food enthusiasts.<br><br>
          Brandesigner team colaborated with Zdravko Kulinarko to refresh his already established brand.<br>
          We created couple of logo variations for different branding applications.<br><br>
          We developed new color palette, font, logo design and branding.<br>
          Our team made illustration of Stefan and clothing design, as well.
          </p>
        </div>

        <div class="behance-images" style="display:flex; flex-direction:column;">
          <img src="Zdravko Kulinarko/1.png" style="width:100%; display:block;">
          <img src="Zdravko Kulinarko/2.png" style="width:100%; display:block;">
           <img src="Zdravko Kulinarko/4.jpg" style="width:100%; display:block;">
          <img src="Zdravko Kulinarko/6.png" style="width:100%; display:block;">
          <img src="Zdravko Kulinarko/5.png" style="width:100%; display:block;">
           <img src="Zdravko Kulinarko/11.png" style="width:100%; display:block;">
          <img src="Zdravko Kulinarko/12.jpg" style="width:100%; display:block;">
          <img src="Zdravko Kulinarko/7.png" style="width:100%; display:block;">
          <img src="Zdravko Kulinarko/9.jpg" style="width:100%; display:block;">
        </div>

      </div>
    `;

    overlay.style.transform = 'translateY(0)';
    document.body.style.overflow = 'hidden';
  });
}


// ==============================
// PROJECT 6 — SEJTAN
// ==============================

// ciljamo šesti kvadrat
const sixthItem = document.querySelector('.portfolio .grid .item:nth-child(6)');

if (sixthItem) {
  sixthItem.addEventListener('click', () => {

    overlay.innerHTML = `
      <div class="behance-content" style="padding:0; max-width:100%; box-sizing:border-box;">

        <!-- X -->
        <button id="close-overlay" style="
          position:absolute;
          top:20px;
          right:20px;
          background:transparent;
          border:none;
          font-size:32px;
          cursor:pointer;
        ">&times;</button>

        <h1 style="margin-bottom:40px; font-size:36px;">
          ШЕЈТАН: Branding and Clothing Design
        </h1>

         <!-- Logo + manji tekst -->
        <div class="brand-info" style="display: flex; align-items: center; gap: 16px; margin-bottom: 40px;">
          <img src="Brandesigner logo.png" alt="Brandesigner Logo" style="width: 50px; height: auto;">
          <span style="font-size: 18px; color: #333; font-family: "neue-haas-grotesk-text", Helvetica, Arial, sans-serif;>
            <strong>Brandesigner</strong>
          </span>
        </div>

         <div style="font-family: "neue-haas-grotesk-text", Helvetica, Arial, sans-serif;">
          <p>ШЕЈТАН is a streetwear brand from Serbia.<br>
          The brand is fully developed by the Brandesiner team.<br><br>
          Here, we present the first series called 333.<br>
          It's inspired by black metal, occultism, and graffiti.<br><br>
          We designed an intricate, black metal style logo and clothing.<br>
          Branding is based on a deep understanding of our target audience.<br>
          Those are the people interested in more alternative forms of expression.
          </p>
        </div>

        <div class="behance-images" style="display:flex; flex-direction:column;">
          <img src="ШЕЈТАН/duks 1.png">
          <img src="ШЕЈТАН/duks 1 - model.png">
          <img src="ШЕЈТАН/duks 2.png">
          <img src="ШЕЈТАН/duks 2 - model.png">
          <img src="ШЕЈТАН/duks 3.png">
          <img src="ШЕЈТАН/duks 3 - model.png">
          <img src="ШЕЈТАН/majica 1 - pozadina.png">
          <img src="ШЕЈТАН/majica 1 - model.png">
          <img src="ШЕЈТАН/majica 2 - pozadina.png">
          <img src="ШЕЈТАН/majica 2 - model.png">
          <img src="ШЕЈТАН/majica 3 - pozadina.png">
          <img src="ШЕЈТАН/majica 3 - model.png">
          <img src="ШЕЈТАН/kacket bista.png">
        </div>

      </div>
    `;

    overlay.style.transform = 'translateY(0)';
    document.body.style.overflow = 'hidden';

    // zatvaranje preko X dugmeta
    document.getElementById('close-overlay').onclick = (e) => {
      e.stopPropagation();
      overlay.style.transform = 'translateY(100%)';
      document.body.style.overflow = '';
    };

  });
}

// ==============================
// PROJECT 4 — BILLION DOLLAR BRAND
// ==============================

const fourthItem = document.querySelector('.portfolio .grid .item[data-project="4"]');

if (fourthItem) {
  fourthItem.addEventListener('click', () => {

    overlay.innerHTML = `
      <div class="behance-content" style="padding:0; max-width:100%; box-sizing:border-box;">

        <!-- X -->
        <button id="close-overlay" style="
          position:absolute;
          top:20px;
          right:20px;
          background:transparent;
          border:none;
          font-size:32px;
          cursor:pointer;
        ">&times;</button>

        <h1 style="margin-bottom:40px; font-size:36px;">
          BILLION DOLLAR BRAND: Full Book Design and Writing
        </h1>

        <!-- Logo + manji tekst -->
        <div class="brand-info" style="display: flex; align-items: center; gap: 16px; margin-bottom: 40px;">
          <img src="Nenad Fuso Milcanovic.png" alt="Nenad Fuso Milcanovic" style="width: 50px; height: auto;">
          <span style='font-size: 18px; color: #333; font-family: "neue-haas-grotesk-text", Helvetica, Arial, sans-serif;'>
            <strong>Nenad Fuso Milčanović</strong>
          </span>
        </div>

        <div style='font-family: "neue-haas-grotesk-text", Helvetica, Arial, sans-serif; margin-bottom: 40px;'>
          <p>
            BILLION DOLLAR BRAND: How to Build Brand Empire is a book about branding, written and designed by Nenad Milčanović.<br>
            It explains how to build a brand from zero in a simple and practical way.<br><br>
            The book has four parts: Brand Journey, Brand Empire, Brand Game and Brand Tools.<br>
            Each part goes deeper than the previous one, from big ideas to concrete tools.<br>
            Those tools are the Brand Value Vault, the Brand Triangle and Brand Design.<br><br>
            Nenad wrote all the content, designed the cover and laid out all 121 pages.
          </p>
        </div>

        <div class="behance-images" style="display:flex; flex-direction:column;">
          <img src="BILLION DOLLAR BRAND/0.png" style="width:100%; display:block;">
          <img src="BILLION DOLLAR BRAND/1.png" style="width:100%; display:block;">
        </div>

      </div>
    `;

    overlay.style.transform = 'translateY(0)';
    document.body.style.overflow = 'hidden';

    // zatvaranje preko X dugmeta
    const closeBtn = overlay.querySelector('#close-overlay');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        overlay.style.transform = 'translateY(100%)';
        document.body.style.overflow = '';
      });
    }
  });
}