import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrollToSection } from '@/lib/lenis';

import {
  AnimeCoder,
  AnimeHandstand,
  InkWash,
  CoralWash,
  GreyWash,
  DoodleCrown,
  DoodleCrownMini,
  DoodleSmile,
  DoodleSparkle,
  DoodleSparkleOutline,
  DoodleLightning,
  DoodleArrow,
  DoodleArrowLong,
  DoodleZigzag,
  DoodleSquiggleArrow,
  DoodleLoop,
  LeafSprig,
  LeafSprigDark,
  PhotoPlaceholder,
  PolaroidScene,
} from './hero/HeroIllustrations';

const NAV_ITEMS = [
  { label: 'Home', target: '#home' },
  { label: 'Projects', target: '#projects' },
  { label: 'Skills', target: '#skills' },
  { label: 'About', target: '#about' },
  { label: 'Contact', target: '#contact' },
];

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const zeelLetters = "ZEEL".split("");
  const jainLetters = "JAIN".split("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          onComplete: () => gsap.set(['.hero-sticker', '.hero-figure'], { clearProps: 'transform,opacity' }),
        })
        .fromTo('.zj-mark', { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo('.hero-nav-item', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, '-=0.4')
        .fromTo(
          '.hero-letter-zeel',
          { y: '120%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1, stagger: 0.05, ease: 'power4.out' },
          '-=0.3'
        )
        .fromTo(
          '.hero-letter-jain',
          { y: '120%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1, stagger: 0.05, ease: 'power4.out' },
          '-=0.85'
        )
        .fromTo('.hero-meta', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 }, '-=0.7')
        .fromTo('.hero-cta', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, '-=0.4')
        .fromTo(
          '.hero-sticker',
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.7)', stagger: 0.02 },
          '-=0.9'
        )
        .fromTo('.hero-figure', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, '-=1.3');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    scrollToSection(target);
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="scrap-bg relative w-full min-h-screen overflow-hidden"
    >
      {/* soft paper vignette edges */}
      <div className="pointer-events-none absolute inset-0 z-[1] shadow-[inset_0_0_120px_rgba(60,45,30,0.08)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-5 md:px-10 lg:px-14">
        {/* ============ TOP BAR: logo + nav ============ */}
        <header className="flex items-center justify-between pt-6 md:pt-8">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="zj-mark inline-block font-hand text-4xl font-bold leading-none text-foreground"
            aria-label="ZJ home"
          >
            zj.
          </a>

          <nav className="flex flex-wrap items-center justify-end gap-x-3.5 gap-y-1 sm:gap-x-5 md:gap-x-9">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.target}
                onClick={(e) => handleNavClick(e, item.target)}
                className={`hero-nav-item font-sans text-[11px] font-medium tracking-wide text-foreground/90 transition-colors hover:text-accent sm:text-xs md:text-sm ${
                  item.label === 'Home' ? 'squiggle' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        {/* ============ COLLAGE CANVAS ============ */}
        <div className="relative flex flex-1 flex-col py-10 md:py-6">
          <div className="relative w-full flex-1 lg:grid lg:grid-cols-12 lg:gap-6">
            {/* ---------- LEFT COLUMN: masthead ---------- */}
            <div className="relative z-30 mx-auto flex max-w-xl flex-col items-start pt-8 lg:col-span-5 lg:col-start-1 lg:mx-0 lg:max-w-none lg:pt-12">
              {/* hand note top-left */}
              <div className="hero-sticker absolute -left-2 top-0 hidden -rotate-6 flex-col items-start sm:left-2 lg:-left-16 xl:-left-20 lg:flex">
                <p className="font-hand text-xl leading-tight text-foreground/85">
                  Small
                  <br />
                  steps
                  <br />
                  Big
                  <br />
                  dreams
                </p>
                <DoodleSmile className="mt-1 h-4 w-4 text-foreground/70" />
              </div>

              {/* curved arrow + crown above ZEEL */}
              <div className="hero-sticker absolute -top-8 left-2 hidden -rotate-12 md:block lg:-left-2">
                <DoodleArrow className="h-9 w-12 -scale-x-100 text-foreground/70" />
              </div>
              <div className="hero-sticker absolute -top-14 left-[44%] hidden md:block">
                <DoodleCrown className="h-8 w-12 text-foreground" />
              </div>

              {/* name block */}
              <h1 className="relative select-none">
                <span className="sr-only">Zeel Jain</span>
                <span aria-hidden="true" className="block">
                  <span className="block overflow-hidden pl-1">
                    {zeelLetters.map((letter, i) => (
                      <span
                        key={`zeel-${i}`}
                        className="hero-letter-zeel inline-block font-serifdisplay text-[19vw] font-black leading-[0.82] tracking-tight text-foreground md:text-[8rem] lg:text-[6.6rem] xl:text-[8.2rem]"
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                  <span className="-mt-1 block pl-[14%] md:pl-16 lg:pl-12">
                    <span className="block overflow-hidden">
                      {jainLetters.map((letter, i) => (
                        <span
                          key={`jain-${i}`}
                          className="hero-letter-jain inline-block font-serifdisplay text-[17vw] font-black italic leading-[0.85] tracking-tight text-accent md:text-[7rem] lg:text-[5.8rem] xl:text-[7.2rem]"
                        >
                          {letter}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              </h1>

              {/* coral brush under JAIN */}
              <InkWash className="hero-sticker pointer-events-none absolute bottom-[8.2rem] left-2 z-0 hidden h-9 w-52 -rotate-2 text-accent md:block lg:bottom-[6.6rem] lg:w-44 xl:bottom-[8rem] xl:w-56" />

              {/* roles row */}
              <div className="hero-meta relative z-10 mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[11px] font-medium tracking-[0.08em] text-foreground/80 md:text-xs">
                <span>Computer Engineering Student</span>
                <span className="text-accent">/</span>
                <span>Developer</span>
                <span className="text-accent">/</span>
                <span>Calisthenics Athlete</span>
              </div>

              {/* bio */}
              <p className="hero-meta relative z-10 mt-4 max-w-[46ch] font-handalt text-sm leading-relaxed tracking-wide text-foreground/75 md:text-[15px]">
                I'm a Computer Engineering student who loves building cool things, solving problems
                and staying consistent — in code and in training.
              </p>

              {/* CTAs */}
              <div className="hero-cta relative z-10 mt-7 flex items-center gap-6">
                <a
                  href="#projects"
                  onClick={(e) => handleNavClick(e, '#projects')}
                  className="group inline-flex items-center gap-3 bg-foreground px-7 py-3 font-hand text-xl font-semibold text-background shadow-[3px_3px_0_rgba(30,10,5,0.25)] transition-transform duration-200 hover:-translate-y-0.5 hover:rotate-[-1deg]"
                >
                  View Projects
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                </a>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="squiggle font-hand text-xl font-semibold text-foreground/90 transition-colors hover:text-accent"
                >
                  About Me
                </a>
              </div>

              {/* code train improve repeat */}
              <div className="hero-sticker relative mt-7 hidden select-none md:block lg:absolute lg:-bottom-2 lg:right-6 xl:right-16">
                <DoodleCrownMini className="absolute -left-8 -top-5 h-5 w-7 -rotate-12 text-foreground/70" />
                <p className="font-hand text-xl leading-tight text-foreground/80">
                  code
                  <br />
                  train
                  <br />
                  improve
                  <br />
                  repeat
                </p>
                <DoodleSquiggleArrow className="absolute -bottom-8 left-14 h-10 w-8 rotate-[30deg] text-foreground/60" />
              </div>
            </div>

            {/* ---------- CENTER: big polaroid photo ---------- */}
            <div className="relative z-20 order-first mx-auto -mt-4 mb-10 w-full max-w-sm sm:max-w-md lg:col-span-4 lg:col-start-6 lg:order-none lg:mx-0 lg:mb-0 lg:mt-2 lg:max-w-none">
              <div className="relative mx-auto w-[86%] md:w-[24rem] lg:w-full lg:max-w-[26rem]">
                {/* charcoal texture behind polaroid */}
                <GreyWash className="hero-sticker pointer-events-none absolute -left-14 -top-8 h-36 w-52 rotate-6 text-foreground/25 md:h-44 md:w-64" />
                <CoralWash className="hero-sticker pointer-events-none absolute -right-12 top-24 h-24 w-40 -rotate-3 text-accent/70 md:h-32 md:w-52" />

                {/* polaroid */}
                <figure className="hero-figure relative -rotate-2 bg-[#faf6ec] p-3 pb-14 shadow-[0_18px_40px_rgba(50,35,20,0.22)]">
                  {/* washi tape top-left */}
                  <span className="tape absolute -left-6 -top-3 h-7 w-24 -rotate-[24deg]" aria-hidden="true" />
                  {/* washi tape bottom-right */}
                  <span className="tape absolute -bottom-2 -right-5 h-6 w-20 rotate-[15deg]" aria-hidden="true" />

                  <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#26221e]">
                    <PhotoPlaceholder className="h-24 w-24 opacity-90" />
                    <span className="absolute bottom-[38%] text-center font-hand text-lg leading-tight tracking-wide text-[#faf6ec]/90">
                      YOUR
                      <br />
                      PHOTO HERE
                    </span>
                  </div>

                  <figcaption className="sr-only">Portrait placeholder</figcaption>
                </figure>

                {/* smaller polaroid overlapping bottom-right */}
                <figure className="hero-figure absolute -bottom-14 -right-6 z-10 w-32 rotate-6 bg-[#faf6ec] p-2 pb-8 shadow-[0_14px_30px_rgba(50,35,20,0.28)] md:-right-10 md:w-40">
                  <span className="tape tape-ink absolute -top-2 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-6" aria-hidden="true" />
                  <div className="aspect-[4/3] overflow-hidden">
                    <PolaroidScene className="h-full w-full" />
                  </div>
                  <figcaption className="absolute bottom-1.5 left-0 right-0 flex items-center justify-center gap-1 px-2 text-center font-hand text-sm leading-none text-foreground/80">
                    More Adventures <span aria-hidden="true">→</span>
                  </figcaption>
                </figure>

                {/* scrap paper note on right of polaroid */}
                <div className="hero-sticker absolute -right-36 top-[56%] hidden rotate-2 bg-[#f7f1e3]/90 px-5 py-4 shadow-[0_10px_24px_rgba(50,35,20,0.15)] xl:block">
                  <p className="font-hand text-2xl font-semibold leading-[1.15] text-foreground/90">
                    BUILD
                    <br />
                    LEARN
                    <br />
                    GROW
                    <br />
                    REPEAT <DoodleSmile className="ml-1 inline h-4 w-4 align-[-2px] text-foreground/70" />
                  </p>
                </div>
              </div>
            </div>

            {/* ---------- RIGHT: handstand athlete ---------- */}
            <div className="relative z-10 hidden lg:col-span-3 lg:col-start-10 lg:block">
              <div className="hero-figure charcoal-smudge absolute right-0 top-0 w-52 xl:w-64">
                <AnimeHandstand className="h-auto w-full" />
              </div>

              <div className="hero-sticker absolute right-[16%] top-4 flex items-start gap-2">
                <DoodleCrownMini className="h-5 w-7 -rotate-12 text-foreground/75" />
                <p className="font-hand text-lg font-medium leading-tight text-foreground/85">
                  Calisthenics
                  <br />
                  = Freedom
                </p>
              </div>
              <DoodleArrowLong className="hero-sticker absolute right-[15%] top-24 h-8 w-16 rotate-[155deg] text-foreground/60" />
              <DoodleLightning className="hero-sticker absolute right-[10%] top-[42%] h-8 w-4 rotate-6 text-foreground/60" />
            </div>

            {/* ---------- BOTTOM LEFT: coding character ---------- */}
            <div className="relative z-10 mt-12 hidden h-0 sm:block lg:mt-0 lg:h-auto">
              <div className="hero-figure charcoal-smudge absolute -bottom-2 -left-2 w-64 md:w-80 lg:-left-8 lg:w-[21rem] xl:w-[24rem]">
                <AnimeCoder className="h-auto w-full" />
              </div>
              <LeafSprig className="hero-sticker pointer-events-none absolute -left-2 bottom-24 h-32 w-20 opacity-90 md:h-40 md:w-24" />
              <LeafSprigDark className="hero-sticker pointer-events-none absolute left-16 bottom-6 h-24 w-14 rotate-12 opacity-80 md:h-28 md:w-16" />
            </div>

            {/* ---------- scattered doodles ---------- */}
            <div className="hero-sticker absolute left-[41%] top-[4%] hidden rotate-6 md:block">
              <p className="font-hand text-xl leading-tight text-foreground/85">
                Better
                <br />
                than
                <br />
                yesterday
              </p>
            </div>
            <DoodleArrow className="hero-sticker absolute left-[39.5%] top-[21%] hidden h-8 w-11 rotate-45 text-foreground/60 md:block" />
            <DoodleCrownMini className="hero-sticker absolute left-[46%] top-[31%] hidden h-5 w-7 -rotate-6 text-foreground/60 md:block" />

            <DoodleSparkleOutline className="hero-sticker absolute left-[42%] bottom-[22%] hidden h-6 w-6 text-foreground/50 md:block" />
            <DoodleSparkle className="hero-sticker absolute left-[45%] bottom-[10%] hidden h-4 w-4 text-accent/70 md:block" />
            <DoodleSparkle className="hero-sticker absolute right-[37%] top-[52%] hidden h-5 w-5 rotate-12 text-foreground/40 md:block" />
            <DoodleSparkleOutline className="hero-sticker absolute right-[35%] bottom-[6%] hidden h-7 w-7 -rotate-6 text-accent/50 md:block" />
            <DoodleZigzag className="hero-sticker absolute left-[47%] top-[56%] hidden h-7 w-10 rotate-12 text-foreground/50 md:block" />
            <DoodleZigzag className="hero-sticker absolute right-[30%] top-[12%] hidden h-7 w-10 -rotate-12 text-foreground/40 lg:block" />
            <DoodleLightning className="hero-sticker absolute right-[27%] top-[38%] hidden h-9 w-5 -rotate-12 text-foreground/50 md:block" />
            <DoodleLoop className="hero-sticker absolute right-[19%] bottom-[8%] hidden h-5 w-14 rotate-3 text-foreground/40 md:block" />
            <DoodleLoop className="hero-sticker absolute left-[36%] top-[44%] hidden h-5 w-14 -rotate-6 text-foreground/30 md:block" />
            <DoodleArrowLong className="hero-sticker absolute right-[6%] bottom-[28%] hidden h-7 w-14 rotate-[160deg] text-foreground/40 lg:block" />
            <LeafSprig className="hero-sticker pointer-events-none absolute right-[23%] bottom-[2%] hidden h-28 w-16 -rotate-6 opacity-80 lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
};
