(function () {
  function lerp(a, b, n) { return (1 - n) * a + n * b; }
  function dist(p1, p2) { return Math.hypot(p1.x - p2.x, p1.y - p2.y); }
  function localPos(e, rect) {
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: cx - rect.left, y: cy - rect.top };
  }

  const IMG_W = 200;
  const IMG_H = 167;

  class Trail {
    constructor(el) {
      this.el        = el;
      this.imgs      = [...el.querySelectorAll('.trail-img')];
      this.total     = this.imgs.length;
      this.idx       = 0;
      this.zVal      = 1;
      this.threshold = 40;
      this.inside    = false;

      this.mouse = { x: 0, y: 0 };
      this.last  = { x: 0, y: 0 };
      this.cache = { x: 0, y: 0 };

      this.imgs.forEach(img => gsap.set(img, { opacity: 0, scale: 1, x: 0, y: 0 }));

      el.addEventListener('mouseenter', e => {
        this.inside = true;
        const r = el.getBoundingClientRect();
        this.mouse = localPos(e, r);
        this.cache = { ...this.mouse };
        this.last  = { ...this.mouse };
      });

      el.addEventListener('mouseleave', () => {
        this.inside = false;
        this.imgs.forEach(img =>
          gsap.to(img, { opacity: 0, duration: 0.3, overwrite: true })
        );
      });

      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        this.mouse = localPos(e, r);
      });

      this.tick();
    }

    tick() {
      requestAnimationFrame(() => this.tick());
      if (!this.inside) return;

      this.cache.x = lerp(this.cache.x, this.mouse.x, 0.1);
      this.cache.y = lerp(this.cache.y, this.mouse.y, 0.1);

      if (dist(this.mouse, this.last) > this.threshold) {
        this.show();
        this.last = { ...this.mouse };
      }
    }

    show() {
      this.zVal++;
      this.idx = (this.idx + 1) % this.total;
      const img = this.imgs[this.idx];

      const halfW = IMG_W / 2;
      const halfH = IMG_H / 2;

      gsap.killTweensOf(img);

      gsap.timeline()
        .fromTo(img,
          {
            opacity: 1,
            scale: 1,
            zIndex: this.zVal,
            x: this.cache.x - halfW,
            y: this.cache.y - halfH,
          },
          {
            duration: 0.4,
            ease: 'power1.out',
            x: this.mouse.x - halfW,
            y: this.mouse.y - halfH,
          },
          0
        )
        .to(img,
          {
            duration: 0.4,
            ease: 'power3.in',
            opacity: 0,
            scale: 0.2,
          },
          0.4
        );
    }
  }

  document.querySelectorAll('.project-row[data-trail]').forEach(el => new Trail(el));

})();

// — Coming Soon —
let comingSoonActive = false;

document.addEventListener('click', function (e) {
  const target = e.target.closest('[data-coming-soon]');
  if (!target) return;

  e.preventDefault();
  e.stopImmediatePropagation();

  if (comingSoonActive) return;
  comingSoonActive = true;

  alert('Project Coming Soon');
  comingSoonActive = false;
}, true);