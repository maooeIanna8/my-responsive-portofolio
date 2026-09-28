const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link, .nav__contact');

const closeMenu = () => {
   navMenu?.classList.remove('show-menu');
   navToggle?.setAttribute('aria-expanded', 'false');
};

navToggle?.addEventListener('click', () => {
   const isOpen = navMenu?.classList.toggle('show-menu') ?? false;
   navToggle.setAttribute('aria-expanded', String(isOpen));
});
navClose?.addEventListener('click', closeMenu);
navLinks.forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
   if (event.key === 'Escape') closeMenu();
});

const typedTarget = document.getElementById('home-typed');
if (typedTarget && window.Typed) {
   new Typed(typedTarget, {
      strings: ['Software Engineer', 'Cyber Security Analyst', 'Creative Thinker'],
      typeSpeed: 65,
      backSpeed: 35,
      backDelay: 1800,
      loop: true,
      smartBackspace: true
   });
}

const header = document.getElementById('header');
const scrollUp = document.getElementById('scroll-up');
const updateScrollState = () => {
   const hasScrolled = window.scrollY >= 40;
   header?.classList.toggle('header-scrolled', hasScrolled);
   scrollUp?.classList.toggle('show-scroll', window.scrollY >= 500);
};
window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

if (window.Swiper) {
   const workSlider = document.querySelector('.work__swiper');
   if (workSlider) {
      new Swiper(workSlider, {
         slidesPerView: 1,
         spaceBetween: 24,
         grabCursor: true,
         navigation: { nextEl: '.work__next', prevEl: '.work__prev' },
         pagination: { el: '.work__pagination', clickable: true },
         breakpoints: {
            700: { slidesPerView: 2, spaceBetween: 28 },
            1050: { slidesPerView: 2.35, spaceBetween: 32 }
         }
      });
   }

   const testimonialSlider = document.querySelector('.testimonials__swiper');
   if (testimonialSlider) {
      new Swiper(testimonialSlider, {
         slidesPerView: 1,
         spaceBetween: 20,
         loop: true,
         grabCursor: true,
         navigation: { nextEl: '.testimonial__next', prevEl: '.testimonial__prev' },
         pagination: { el: '.testimonials__pagination', clickable: true },
         breakpoints: { 700: { slidesPerView: 2 }, 1050: { slidesPerView: 2.5 } }
      });
   }
}

document.querySelectorAll('.services__card').forEach((button) => {
   button.addEventListener('click', () => {
      const selectedItem = button.closest('.services__item');
      const shouldOpen = !selectedItem?.classList.contains('services-open');
      document.querySelectorAll('.services__item').forEach((item) => {
         item.classList.remove('services-open');
         item.querySelector('.services__card')?.setAttribute('aria-expanded', 'false');
      });
      if (shouldOpen && selectedItem) {
         selectedItem.classList.add('services-open');
         button.setAttribute('aria-expanded', 'true');
      }
   });
});

const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');
contactForm?.addEventListener('submit', (event) => {
   event.preventDefault();
   if (!contactForm.reportValidity()) return;

   const formData = new FormData(contactForm);
   const subject = `Portfolio inquiry from ${formData.get('name')}`;
   const body = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`;
   if (contactStatus) contactStatus.textContent = 'Opening your email app to send this message.';
   window.location.href = `mailto:abdurrahim.nurqowimxv@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const sectionLinks = document.querySelectorAll('.nav__link');
const observedSections = document.querySelectorAll('main section[id]');
if ('IntersectionObserver' in window) {
   const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
         if (!entry.isIntersecting) return;
         sectionLinks.forEach((link) => {
            link.classList.toggle('active-link', link.getAttribute('href') === `#${entry.target.id}`);
         });
      });
   }, { rootMargin: '-40% 0px -50% 0px' });
   observedSections.forEach((section) => sectionObserver.observe(section));
}

const year = document.getElementById('current-year');
if (year) year.textContent = String(new Date().getFullYear());

if (window.ScrollReveal) {
   const reveal = ScrollReveal({ distance: '28px', duration: 850, easing: 'cubic-bezier(.2,.7,.2,1)', reset: false });
   reveal.reveal('.home__data, .section__heading, .about__content, .services__layout, .skills__group, .contact__grid', { origin: 'bottom', interval: 100 });
   reveal.reveal('.home__visual', { origin: 'right', delay: 180 });
}
