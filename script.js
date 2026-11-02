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

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('.scramble-text');
  if (!element) return;

  const fx = new TextScramble(element);
  const text = element.innerText;

  element.style.opacity = 1;
  fx.setText(text);

  setInterval(() => fx.setText(text), 5000);
});


// ==============================
// PROJEKTI (ovde menjaš sadržaj)
// ==============================

const BRAND = {
  name: 'Brandesigner',
  logo: 'Brandesigner logo.png'
};

const NENAD = {
  name: 'Nenad Fuso Milčanović',
  logo: 'Nenad Fuso Milcanovic.png'
};

const projects = {
  1: {
    title: 'Palm Tree: Branding and Clothing Design',
    author: BRAND,
    text: `Palm Tree is a daughter clothing brand of the well-established 30-year-old company Mitex from Serbia.<br>
      Mitex is a leading textile production brand, known for their exceptional dedication to quality and innovation.<br><br>
      Brandesigner team collaborated with Mitex to create the Palm Tree clothing brand from scratch.<br>
      We created logo, branding and clothing design that captures the essence of the newborn company.`,
    folder: 'Palm Tree',
    images: ['00.jpg', '1.png', '2.png', '3.png', '0.png', '10.png', '11.png',
             '12.png', '4.png', '5.png', '6.png', '9.png', '8.png', '13.png']
  },

  2: {
    title: '777: Experimental Art Series',
    author: NENAD,
    text: `The 777 Experimental Art Series explores abstract visual concepts and pushes creative boundaries.<br>
      Each piece is designed to challenge perception and provoke thought in a contemporary art context.<br><br>
      This project is part of a curated selection of experimental works.<br>
      It showcases innovative approaches to design and artistic expression.<br><br>
      All pieces are sold.`,
    folder: '777',
    images: ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.png', '6.jpg', '5.jpg']
  },

  3: {
    title: 'Zdravko Kulinarko: Logo Design and Branding',
    author: BRAND,
    text: `Zdravko Kulinarko is a brand created by Stefan Božić.<br>
      He's a super-famous content creator for healthy food enthusiasts.<br><br>
      Brandesigner team collaborated with Zdravko Kulinarko to refresh his already established brand.<br>
      We created a couple of logo variations for different branding applications.<br><br>
      We developed new color palette, font, logo design and branding.<br>
      Our team made illustration of Stefan and clothing design, as well.`,
    folder: 'Zdravko Kulinarko',
    images: ['1.png', '2.png', '4.jpg', '6.png', '5.png', '11.png', '12.jpg', '7.png', '9.jpg']
  },

  4: {
    title: 'BILLION DOLLAR BRAND: Full Book Design and Writing',
    author: NENAD,
    text: `BILLION DOLLAR BRAND: How to Build Brand Empire is a book about branding, written and designed by Nenad Milčanović.<br>
      It explains how to build a brand from zero in a simple and practical way.<br><br>
      The book has four parts: Brand Journey, Brand Empire, Brand Game and Brand Tools.<br>
      Each part goes deeper than the previous one, from big ideas to concrete tools.<br>
      Those tools are the Brand Value Vault, the Brand Triangle and Brand Design.<br><br>
      Nenad wrote all the content, designed the cover and laid out all 121 pages.`,
    folder: 'BILLION DOLLAR BRAND',
    images: ['0.png', '1.png']
  },

  5: {
    title: '167PLUTO: Three Prints for Company Founders',
    author: BRAND,
    text: `Sacha, one of three 167PLUTO founders, asked us to create three huge prints for each of the three founders.<br>
      Each of the digital artworks represents a different point of view related to the planet Pluto.<br><br>
      Brandesigner team carefully crafted all three prints digitally and then framed them in glass.<br>
      All three prints are the same size of 7087px wide and 9449px high.<br><br>
      Prints are hanged in 167PLUTO headquarters in Belgrade.`,
    folder: '167PLUTO',
    images: ['167PLUTO - 1.jpg', '167PLUTO - 2.jpg', '167PLUTO - 3.jpg']
  },

  6: {
    title: 'ШЕЈТАН: Branding and Clothing Design',
    author: BRAND,
    text: `ШЕЈТАН is a streetwear brand from Serbia.<br>
      The brand is fully developed by the Brandesigner team.<br><br>
      Here, we present the first series called 333.<br>
      It's inspired by black metal, occultism, and graffiti.<br><br>
      We designed an intricate, black metal style logo and clothing.<br>
      Branding is based on a deep understanding of our target audience.<br>
      Those are the people interested in more alternative forms of expression.`,
    folder: 'ШЕЈТАН',
    images: ['duks 1.png', 'duks 1 - model.png', 'duks 2.png', 'duks 2 - model.png',
             'duks 3.png', 'duks 3 - model.png', 'majica 1 - pozadina.png',
             'majica 1 - model.png', 'majica 2 - pozadina.png', 'majica 2 - model.png',
             'majica 3 - pozadina.png', 'majica 3 - model.png', 'kacket bista.png']
  }
};


// ==============================
// FULLSCREEN OVERLAY (Behance-style)
// ==============================

const FONT = `'neue-haas-grotesk-text', Helvetica, Arial, sans-serif`;

const overlay = document.createElement('div');
overlay.id = 'behance-overlay';

Object.assign(overlay.style, {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  transform: 'translateY(100%)',
  background: '#ffffff',
  zIndex: 9999,
  transition: 'transform 0.5s ease',
  overflow: 'auto'
});

document.body.appendChild(overlay);

function openProject(id) {
  const p = projects[id];
  if (!p) return;

  const imagesHTML = p.images
    .map(file => `<img src="${p.folder}/${file}" alt="${p.title}">`)
    .join('');

  overlay.innerHTML = `
    <div class="behance-content" style="padding:0; max-width:100%; box-sizing:border-box;">

      <button id="close-overlay" aria-label="Close" style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: transparent;
        border: none;
        font-size: 32px;
        cursor: pointer;
        z-index: 10000;
      ">&times;</button>

      <h1 style="margin-bottom:40px; font-size:36px;">${p.title}</h1>

      <div class="brand-info" style="display:flex; align-items:center; gap:16px; margin-bottom:40px;">
        <img src="${p.author.logo}" alt="${p.author.name}" style="width:50px; height:auto;">
        <span style="font-size:18px; color:#333; font-family:${FONT};">
          <strong>${p.author.name}</strong>
        </span>
      </div>

      <div style="font-family:${FONT}; margin-bottom:40px;">
        <p>${p.text}</p>
      </div>

      <div class="behance-images" style="display:flex; flex-direction:column;">
        ${imagesHTML}
      </div>

    </div>
  `;

  overlay.scrollTop = 0;
  overlay.style.transform = 'translateY(0)';
  document.body.style.overflow = 'hidden';
}

function closeProject() {
  overlay.style.transform = 'translateY(100%)';
  document.body.style.overflow = '';
}

// klik na kvadrat otvara odgovarajući projekat
document.querySelectorAll('.portfolio .grid .item').forEach(item => {
  item.addEventListener('click', () => openProject(item.dataset.project));
});

// zatvaranje samo preko X dugmeta (radi za sve projekte)
overlay.addEventListener('click', (e) => {
  if (e.target.closest('#close-overlay')) closeProject();
});

// zatvaranje na Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProject();
});
