"use client";

import { Fragment, useEffect, useRef, useState, type FormEvent } from "react";
import { ChevronLeft, ChevronRight, Send, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logo from "@/imports/logo500.png";
import headerLogo from "@/imports/logo-croissant.png";

const navItems = [
  { label: "Начало", href: "#intro" },
  { label: "Меню", href: "#products" },
  { label: "Галерия", href: "#gallery" },
  { label: "Контакти", href: "#contact" },
];

const products = [
  {
    name: "Свещ Мини кроасан",
    desc: "Маслен кроасан с хрупкава коричка, изпечен всяка сутрин",
    price: "3.20 лв",
    img: "/images/wax-candle-mini-croissant.jpeg",
  },
  {
    name: "Свещ Баница",
    desc: "Пълнен с белгийски черен шоколад",
    price: "3.80 лв",
    img: "/images/wax-candle-banitsa.jpeg",
  },
  {
    name: "Свещ Филия",
    desc: "Традиционна баница с пресно бяло сирене и масло",
    price: "2.80 лв",
    img: "/images/wax-candle-bread-slice.jpeg",
  },
  {
    name: "Канелена Руладка",
    desc: "Топла руладка с канела и захарна глазура",
    price: "3.50 лв",
    img: "https://images.unsplash.com/photo-1783058890700-4aee307c36a9?w=600&h=700&fit=crop&auto=format",
  },
  {
    name: "Асорти Кошница",
    desc: "Подбрана кошница от нашите дневни специалитети",
    price: "18.00 лв",
    img: "https://images.unsplash.com/photo-1723930213705-cfd76dcfc36c?w=600&h=700&fit=crop&auto=format",
  },
  {
    name: "Маслен Кифел",
    desc: "Деликатен кифел с прясно масло и морска сол",
    price: "2.50 лв",
    img: "https://images.unsplash.com/photo-1651604033534-e66b281f1981?w=600&h=700&fit=crop&auto=format",
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=800&h=600&fit=crop&auto=format",
    alt: "Кроасан на тава",
  },
  {
    src: "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=800&h=600&fit=crop&auto=format",
    alt: "Асорти сладкиши",
  },
  {
    src: "https://images.unsplash.com/photo-1587912001191-0cd4f14fd89e?w=800&h=600&fit=crop&auto=format",
    alt: "Хляб на маса",
  },
  {
    src: "https://images.unsplash.com/photo-1633785587635-a5c1df91fa90?w=800&h=600&fit=crop&auto=format",
    alt: "Плато с хлебни изделия",
  },
];

const VISIBLE = 3;

export default function App() {
  const [activeSection, setActiveSection] = useState("#intro");
  const [navIsStuck, setNavIsStuck] = useState(false);
  const [slideStart, setSlideStart] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const suppressNavTrackingRef = useRef(false);
  const navTrackingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const maxStart = products.length - VISIBLE;

  useEffect(() => {
    const updateNavState = () => setNavIsStuck((navRef.current?.getBoundingClientRect().top ?? 1) <= 0);
    updateNavState();
    window.addEventListener("scroll", updateNavState, { passive: true });

    const sections = navItems
      .map(({ href }) => document.querySelector(href))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection && !suppressNavTrackingRef.current) {
          setActiveSection(`#${visibleSection.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", updateNavState);
      observer.disconnect();
      if (navTrackingTimeoutRef.current) clearTimeout(navTrackingTimeoutRef.current);
    };
  }, []);

  const scrollTo = (href: string) => {
    setActiveSection(href);
    suppressNavTrackingRef.current = true;
    if (navTrackingTimeoutRef.current) clearTimeout(navTrackingTimeoutRef.current);
    navTrackingTimeoutRef.current = setTimeout(() => {
      suppressNavTrackingRef.current = false;
    }, 1600);

    if (href === "#intro") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip font-sans">

      {/* ── Brand header ────────────────────────────────────── */}
      <header className="flex flex-col items-center bg-[#f8f4ee] px-6">
        <ImageWithFallback
          src={headerLogo.src}
          alt="Восъчна Пекарна лого"
          className="w-[180px] h-[180px] max-w-full object-contain"
        />

      {/* ── Sticky navigation ────────────────────────────────── */}
      <nav
        ref={navRef}
        aria-label="Основна навигация"
        className={`relative sticky top-0 z-50 -mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 bg-[#f8f4ee] px-6 py-3 border-b border-border before:absolute before:-top-px before:left-1/2 before:h-[2px] before:w-[60px] before:-translate-x-1/2 before:bg-[#0d2222] before:transition-opacity ${navIsStuck ? "before:opacity-0" : "before:opacity-100"}`}
      >
        {navItems.map((item, index) => (
          <Fragment key={item.href}>
            <button
              onClick={() => scrollTo(item.href)}
              className={`font-title text-[1.55rem] transition-colors duration-200 hover:text-accent ${
                activeSection === item.href ? "text-accent" : "text-[#0d2222]"
              }`}
            >
              {item.label}
            </button>
            {index < navItems.length - 1 && <span aria-hidden="true" className="h-[5px] w-[5px] rounded-full bg-[#0d2222]" />}
          </Fragment>
        ))}
      </nav>
      </header>

      <main>
      {/* ── Hero / Intro ───────────────────────────────────────── */}
      <section id="intro" className="relative h-[calc(100dvh-238px)] flex items-center justify-center overflow-hidden">
        {/* Autoplaying background video */}
        <div className="absolute inset-0 bg-foreground">
          <img
            src="/images/wax-candle-bakery-hero.jpg"
            alt=""
            width={1280}
            height={720}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src="/videos/wax-candle-bakery-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-foreground/70" />
        </div>

        {/* Centred copy */}
        <div className="relative z-10 text-center px-6 flex flex-col items-center">
          <p className="font-sans text-white/65 text-2xl tracking-wide mb-3">добре дошли във</p>
          <h1 className="font-title text-5xl sm:text-6xl md:text-7xl text-white font-bold leading-[1.12]">
            Восъчна пекарна
          </h1>
          <p className="font-sans text-white/65 text-2xl mt-5 leading-relaxed">
            Първата восъчна пекарна в България за свещи-печива.
          </p>
          <button
            onClick={() => scrollTo("#products")}
            className="mt-8 px-9 py-3 border border-white/40 text-white/90 font-title text-xs tracking-[0.18em] uppercase hover:bg-white hover:text-foreground transition-all duration-300"
          >
            Виж Менюто
          </button>
        </div>

      </section>

      {/* ── Products Slider ────────────────────────────────────── */}
      <section id="products" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-sans text-accent text-2xl mb-1">от нашата фурна</p>
            <h2 className="font-title text-4xl sm:text-5xl text-foreground">Нашите свещи</h2>
            <div className="mt-5 flex items-center justify-center gap-4">
              <div className="h-px w-14 bg-border" />
              <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-70" />
              <div className="h-px w-14 bg-border" />
            </div>
          </div>

          {/* Desktop slider — 3 at a time */}
          <div className="hidden md:block">
            <div className="grid grid-cols-3 gap-5">
              {products.slice(slideStart, slideStart + VISIBLE).map((p) => (
                <article
                  key={p.name}
                  className="group bg-card border border-border overflow-hidden"
                >
                  <div className="relative h-72 overflow-hidden bg-muted">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-title text-lg text-foreground mb-1">{p.name}</h3>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-base text-foreground">{p.price}</span>
                      <button className="text-[0.65rem] font-title uppercase tracking-[0.15em] text-foreground/50 hover:text-foreground border-b border-transparent hover:border-foreground/30 transition-all pb-px">
                        Поръчай
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-10">
              <button
                onClick={() => setSlideStart((s) => Math.max(0, s - 1))}
                disabled={slideStart === 0}
                className="w-10 h-10 border border-border flex items-center justify-center text-foreground disabled:opacity-25 hover:bg-card transition-colors"
                aria-label="Предишни"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {Array.from({ length: maxStart + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideStart(i)}
                    className={`transition-all duration-200 rounded-full ${
                      i === slideStart ? "w-5 h-1.5 bg-foreground" : "w-1.5 h-1.5 bg-border"
                    }`}
                    aria-label={`Слайд ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setSlideStart((s) => Math.min(maxStart, s + 1))}
                disabled={slideStart >= maxStart}
                className="w-10 h-10 border border-border flex items-center justify-center text-foreground disabled:opacity-25 hover:bg-card transition-colors"
                aria-label="Следващи"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile horizontal scroll */}
          <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-hide">
            {products.map((p) => (
              <article
                key={p.name}
                className="snap-start flex-shrink-0 w-72 bg-card border border-border overflow-hidden"
              >
                <div className="h-52 overflow-hidden bg-muted">
                  <img src={p.img} alt={p.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-title text-base text-foreground mb-1">{p.name}</h3>
                  <p className="font-sans text-xs text-muted-foreground mb-3">{p.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-sm text-foreground">{p.price}</span>
                    <button className="text-[0.6rem] font-title uppercase tracking-widest text-foreground/50">
                      Поръчай
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ────────────────────────────────────────────── */}
      <section id="gallery" className="py-20 px-6 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-sans text-accent text-2xl mb-1">горещо от профила ни в Инстаграм</p>
            <h2 className="font-title text-4xl sm:text-5xl text-foreground">Галерия</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`overflow-hidden bg-muted ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover hover:scale-105 transition-transform duration-700 ${
                    i === 0 ? "h-64 md:h-full" : "h-48 md:h-56"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form ───────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-sans text-accent text-2xl mb-1">пишете ни</p>
            <h2 className="font-title text-4xl sm:text-5xl text-foreground">Свържете се с нас</h2>
            <div className="mt-5 flex items-center justify-center gap-4">
              <div className="h-px w-14 bg-border" />
              <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-70" />
              <div className="h-px w-14 bg-border" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
            {/* Contact info */}
            <div className="flex flex-col gap-6">
              <p className="font-sans text-muted-foreground leading-relaxed text-sm">
                В Восъчна Пекарна вратите ни са отворени всеки ден от 7:00 до 19:00 ч.
                Радваме се на всяко запитване, поръчка или просто добра дума.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                  <div>
                    <p className="font-sans text-sm text-foreground">ул. Пекарска 12, София 1000</p>
                    <p className="font-sans text-xs text-muted-foreground mt-0.5">Пон – Нед: 07:00 – 19:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 shrink-0 text-accent" />
                  <p className="font-sans text-sm text-foreground">+359 88 123 4567</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 shrink-0 text-accent" />
                  <p className="font-sans text-sm text-foreground">hello@vosuchnapekarna.com</p>
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white hover:scale-105 transition"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-9 h-9 flex items-center justify-center bg-[#1877f2] text-white hover:scale-105 transition"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-9 h-9 flex items-center justify-center bg-[#ff0000] text-white hover:scale-105 transition"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>

              <div className="mt-4 h-px w-full bg-border" />
              <p className="font-sans text-foreground/40 text-xl">с любов — Восъчна Пекарна</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <input
                required
                type="text"
                placeholder="Вашето Име"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="bg-card border border-border px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/30 transition-colors"
              />
              <input
                required
                type="email"
                placeholder="Имейл Адрес"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="bg-card border border-border px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/30 transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон (по желание)"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="bg-card border border-border px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/30 transition-colors"
              />
              <textarea
                required
                rows={5}
                placeholder="Вашето Съобщение"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="bg-card border border-border px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/30 transition-colors resize-none"
              />
              <button
                type="submit"
                className={`flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs font-title uppercase tracking-[0.18em] transition-all duration-300 mt-1 ${
                  sent
                    ? "bg-accent/20 text-accent border border-accent/30"
                    : "bg-foreground text-primary-foreground hover:bg-foreground/85"
                }`}
              >
                {sent ? (
                  "✓ Изпратено успешно!"
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Изпрати Съобщение
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="bg-foreground text-primary-foreground py-14 px-6 border-t border-foreground/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Official logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center cursor-pointer"
              aria-label="Към началото"
            >
              <ImageWithFallback
                src={logo.src}
                alt="Восъчна Пекарна"
                loading="lazy"
                className="h-20 w-20 object-contain"
              />
            </button>

            {/* Nav */}
            <nav aria-label="Навигация във футъра" className="flex flex-wrap justify-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="font-title text-xl text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white hover:scale-105 transition"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 flex items-center justify-center bg-[#1877f2] text-white hover:scale-105 transition"
              >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-8 h-8 flex items-center justify-center bg-[#ff0000] text-white hover:scale-105 transition"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-sans text-xs text-primary-foreground/30">
              © 2026 Восъчна Пекарна. Всички права запазени.
            </p>
            <p className="font-sans text-xs text-primary-foreground/20">
              vosuchnapekarna.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
