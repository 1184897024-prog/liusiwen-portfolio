import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Bot,
  Brush,
  Clapperboard,
  Layers3,
  Mail,
  MapPin,
  Package,
  Phone,
  Sparkles,
  Wand2,
} from 'lucide-react';
import BorderGlow from './BorderGlow';
import DarkVeil from './DarkVeil';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'brand-system',
    title: '品牌视觉全案设计',
    tag: 'Brand Visual System',
    image: '/assets/portfolio/page-3.webp',
    desc: '自然阳光品牌视觉全案，包含品牌规范、线上Banner、产品海报、线下折页与KV延展。',
    pages: [
      '/assets/portfolio/page-2.webp',
      '/assets/portfolio/page-3.webp',
      '/assets/portfolio/page-4.webp',
      '/assets/portfolio/page-5.webp',
    ],
  },
  {
    id: 'digital-campaign',
    title: '活动视觉与UI设计',
    tag: 'Campaign / UI Design',
    image: '/assets/portfolio/page-7.webp',
    desc: '城市野人跑酷馆活动海报与OceanX海洋馆官网、小程序UI设计，视觉冲击力强，适合数字传播。',
    pages: [
      '/assets/portfolio/page-6.webp',
      '/assets/portfolio/page-7.webp',
    ],
  },
  {
    id: 'ip-packaging',
    title: 'IP形象与包装设计',
    tag: 'IP / Packaging',
    image: '/assets/portfolio/page-8.webp',
    desc: '足记IP角色、跑酷小人延展与包装设计合集，包含角色设定、应用延展和商业包装表达。',
    pages: [
      '/assets/portfolio/page-8.webp',
      '/assets/portfolio/page-9.webp',
    ],
  },
];

const strengths = [
  {
    icon: Wand2,
    title: 'AI视觉生成',
    desc: '熟悉Midjourney、Stable Diffusion、Firefly等工具，能从风格探索到商业精修稳定落地。',
  },
  {
    icon: Layers3,
    title: '品牌系统搭建',
    desc: '从品牌策略、视觉关键词、情绪板到VI延展，帮助团队形成统一且可执行的视觉语言。',
  },
  {
    icon: Clapperboard,
    title: 'AI视频链路',
    desc: '支持脚本创意、分镜规划、画面生成、动态包装和剪辑协同，适配社媒与品牌传播。',
  },
  {
    icon: Bot,
    title: 'Agent工作流',
    desc: '搭建设计brief拆解、竞品归纳、Prompt沉淀、素材检索和交付检查等辅助流程。',
  },
  {
    icon: Package,
    title: '商业设计落地',
    desc: '具备包装、KV、电商、活动物料与展会视觉经验，理解真实项目的效率与质量要求。',
  },
  {
    icon: Brush,
    title: '插画与视觉表现',
    desc: '能把AI生成、数字绘画与后期修图结合，形成有辨识度的品牌插画与内容资产。',
  },
];

const stats = [
  ['8+', '年品牌视觉经验'],
  ['2025', '聚焦AI品牌视觉'],
  ['3', '段核心设计履历'],
  ['10+', 'AI与设计工具栈'],
];

function App() {
  const rootRef = useRef(null);
  const navFloatingStateRef = useRef(false);
  const [isNavFloating, setIsNavFloating] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(() => {
    const match = window.location.hash.match(/^#project\/(.+)$/);
    return match ? match[1] : null;
  });

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId),
    [activeProjectId],
  );

  useEffect(() => {
    const onHashChange = () => {
      const match = window.location.hash.match(/^#project\/(.+)$/);
      setActiveProjectId(match ? match[1] : null);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useLayoutEffect(() => {
    if (activeProject) return undefined;
    const root = rootRef.current;
    if (!root) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      const slowEase = 'power4.out';

      gsap.set('.openingCurtain', { scaleY: 1, transformOrigin: 'top center' });
      gsap.set('.nav', { y: -34, autoAlpha: 0 });
      gsap.set('.hero .eyebrow', { y: 36, autoAlpha: 0 });
      gsap.set('.hero h1', {
        yPercent: 18,
        scaleY: 0.62,
        autoAlpha: 0,
        clipPath: 'inset(0% 0% 100% 0%)',
        transformOrigin: '50% 100%',
      });
      gsap.set('.heroBottom p', { y: 46, autoAlpha: 0 });
      gsap.set('.heroRoles span', { y: 34, autoAlpha: 0, scale: 0.92 });
      gsap.set('.darkVeilLayer', { scale: 1.14, autoAlpha: 0.15 });
      gsap.set('.motionFallback', { scale: 1.2, autoAlpha: 0.6 });

      const opening = gsap.timeline({ defaults: { ease: slowEase } });
      opening
        .to('.openingCurtain', { scaleY: 0, duration: 1.28, ease: 'expo.inOut' }, 0.12)
        .to('.darkVeilLayer', { scale: 1, autoAlpha: 0.82, duration: 2.1 }, 0.08)
        .to('.motionFallback', { scale: 1.08, autoAlpha: 1, duration: 2.2 }, 0.08)
        .to('.nav', { y: 0, autoAlpha: 1, duration: 1.05 }, 0.48)
        .to('.hero .eyebrow', { y: 0, autoAlpha: 1, duration: 1.0 }, 0.76)
        .to('.hero h1', {
          yPercent: 0,
          scaleY: 1,
          autoAlpha: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.55,
          ease: 'expo.out',
        }, 0.92)
        .to('.heroBottom p', { y: 0, autoAlpha: 1, duration: 1.0 }, 1.22)
        .to('.heroRoles span', {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.08,
        }, 1.28);

      gsap.to('.darkVeilLayer', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.utils.toArray('.section').forEach((section) => {
        const heading = section.querySelector('h2');
        const meta = section.querySelector('.sectionMeta');
        const cards = section.querySelectorAll('.stat, .projectCard, .strengthGlow, .contactGrid a, .contactGrid span');
        const images = section.querySelectorAll('.portraitWrap img, .projectCard img');

        if (heading) {
          gsap.fromTo(heading,
            {
              y: 120,
              scaleY: 0.72,
              autoAlpha: 0,
              clipPath: 'inset(0% 0% 100% 0%)',
              transformOrigin: '50% 100%',
            },
            {
              y: 0,
              scaleY: 1,
              autoAlpha: 1,
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.28,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 72%',
                once: true,
              },
            },
          );
        }

        if (meta) {
          gsap.fromTo(meta,
            { y: 36, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: slowEase,
              scrollTrigger: {
                trigger: section,
                start: 'top 76%',
                once: true,
              },
            },
          );
        }

        if (cards.length) {
          gsap.fromTo(cards,
            { y: 74, autoAlpha: 0, scale: 0.965 },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 1.05,
              ease: slowEase,
              stagger: 0.12,
              scrollTrigger: {
                trigger: section,
                start: 'top 66%',
                once: true,
              },
            },
          );
        }

        images.forEach((image) => {
          gsap.fromTo(image,
            { yPercent: -8, scale: 1.12, clipPath: 'inset(16% 0% 16% 0%)' },
            {
              yPercent: 0,
              scale: 1,
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.25,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: image,
                start: 'top 82%',
                once: true,
              },
            },
          );

          gsap.to(image, {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: image,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          });
        });
      });

      gsap.fromTo('.contactEnd h2',
        {
          y: 140,
          scaleY: 0.7,
          autoAlpha: 0,
          clipPath: 'inset(0% 0% 100% 0%)',
          transformOrigin: '50% 100%',
        },
        {
          y: 0,
          scaleY: 1,
          autoAlpha: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.35,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.contactEnd',
            start: 'top 70%',
            once: true,
          },
        },
      );

      gsap.fromTo('.contactActions .bigLink',
        { y: 64, autoAlpha: 0, scale: 0.95 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: slowEase,
          stagger: 0.14,
          scrollTrigger: {
            trigger: '.contactEnd',
            start: 'top 58%',
            once: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [activeProject]);

  useEffect(() => {
    let rafId = 0;

    const updateNav = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const nextFloating = window.scrollY > window.innerHeight * 0.82;
        if (nextFloating !== navFloatingStateRef.current) {
          navFloatingStateRef.current = nextFloating;
          setIsNavFloating(nextFloating);
        }
        rafId = 0;
      });
    };

    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
    window.addEventListener('resize', updateNav);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateNav);
      window.removeEventListener('resize', updateNav);
    };
  }, []);

  const openProject = (projectId) => {
    window.location.hash = `project/${projectId}`;
    setActiveProjectId(projectId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProject = () => {
    window.location.hash = 'projects';
    setActiveProjectId(null);
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  if (activeProject) {
    return (
      <main>
        <ProjectDetail project={activeProject} onClose={closeProject} />
      </main>
    );
  }

  return (
    <main ref={rootRef}>
      <section className="hero" id="home">
        <div className="motionFallback" />
        <div className="darkVeilLayer">
          <DarkVeil
            hueShift={18}
            noiseIntensity={0.04}
            scanlineIntensity={0.12}
            scanlineFrequency={1.4}
            speed={0.72}
            warpAmount={0.32}
            resolutionScale={0.62}
          />
        </div>
        <div className="heroShade" />
        <div className="openingCurtain" />
        <nav className={`nav shell${isNavFloating ? ' navFloating' : ''}`}>
          <a className="brand" href="#home">LIU SIWEN</a>
          <div className="navLinks">
            <a href="#about">经历</a>
            <a href="#projects">项目</a>
            <a href="#strengths">优势</a>
            <a href="#contact">联系</a>
          </div>
          <a className="contactBtn" href="mailto:1184897024@qq.com">
            联系我 <ArrowUpRight size={18} />
          </a>
        </nav>
        <div className="heroInner shell">
          <p className="eyebrow">AI Brand Visual Designer / AIGC Creative Designer</p>
          <h1>刘斯文<br />AI品牌视觉设计师</h1>
          <div className="heroBottom">
            <p>
              8年品牌视觉、包装、电商与营销内容设计经验，近年聚焦AIGC品牌视觉生产，
              将AI图像、AI视频与Agent流程转化为稳定的商业设计产出。
            </p>
            <div className="heroRoles">
              <span>视觉设计师</span>
              <span>AI设计师</span>
              <span>品牌设计师</span>
              <span>插画设计师</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about section shell" id="about">
        <div className="sectionMeta">
          <span>01</span>
          <p>PROFILE</p>
        </div>
        <div className="aboutGrid">
          <div className="portraitWrap">
            <img src="/assets/portrait.webp" alt="AI品牌视觉设计师人物视觉" loading="lazy" decoding="async" />
          </div>
          <div className="aboutContent">
            <h2>把新工具变成稳定、可复用、能交付的设计系统。</h2>
            <p>
              我熟悉从品牌策略、视觉系统、AI图像与视频生成，到AI Agent协作流程的完整落地。
              曾负责亚洲区域品牌视觉管理，也在品牌客户项目中输出视觉关键词、情绪板、风格规范、
              KV概念、产品场景、IP形象与社媒内容。
            </p>
            <div className="contactGrid">
              <a href="tel:15201812681"><Phone size={18} />15201812681</a>
              <a href="mailto:1184897024@qq.com"><Mail size={18} />1184897024@qq.com</a>
              <span><MapPin size={18} />上海</span>
            </div>
            <div className="stats">
              {stats.map(([num, label]) => (
                <div className="stat" key={label}>
                  <strong>{num}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="projects section" id="projects">
        <div className="shell">
          <div className="projectEditorial">
            <div className="projectFrameNav">
              <span>WORKS</span>
              <strong>LIU SIWEN</strong>
              <span>BRAND / AIGC / ILLUSTRATION</span>
            </div>

            <div className="projectEditorialHead">
              <div className="sectionMeta">
                <span>02</span>
                <p>SELECTED WORKS</p>
              </div>
              <h2>精选项目</h2>
              <p>
                从品牌视觉全案、数字活动界面到IP与包装系统，以视觉冲击力和商业落地能力组织项目叙事。
              </p>
            </div>

            <div className="projectGrid">
              {projects.map((project, index) => (
                <button
                  className="projectCard"
                  key={project.title}
                  onClick={() => openProject(project.id)}
                  type="button"
                  style={{ '--project-index': index }}
                >
                  <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                  <div className="projectInfo">
                    <div className="projectMetaRow">
                      <span>{project.tag}</span>
                      <strong>{String(index + 1).padStart(2, '0')}</strong>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <button className="projectLookButton" onClick={() => openProject(projects[0].id)} type="button">
              Look works
            </button>
          </div>
        </div>
      </section>

      <section className="strengths section shell" id="strengths">
        <div className="sectionHeader">
          <div className="sectionMeta">
            <span>03</span>
            <p>CAPABILITY</p>
          </div>
          <h2>个人优势</h2>
        </div>
        <div className="strengthGrid">
          {strengths.map(({ icon: Icon, title, desc }, index) => (
            <BorderGlow
              className="strengthGlow"
              key={title}
              edgeSensitivity={30}
              glowColor="190 100 72"
              backgroundColor="rgba(255,255,255,0.055)"
              borderRadius={8}
              glowRadius={34}
              glowIntensity={0.9}
              coneSpread={24}
              animated={index < 3}
              colors={['#70e7ff', '#ff6347', '#f7f4ec']}
              fillOpacity={0.28}
            >
              <article className="strengthCard">
                <div className="iconBox"><Icon size={26} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            </BorderGlow>
          ))}
        </div>
      </section>

      <section className="contactEnd" id="contact">
        <div className="shell contactShell">
          <p className="eyebrow">AVAILABLE FOR BRAND VISUAL / AIGC CREATIVE / ILLUSTRATION</p>
          <h2>让品牌视觉更快成型，也更有辨识度。</h2>
          <div className="contactActions">
            <a className="bigLink" href="mailto:1184897024@qq.com">
              发送邮件 <Mail size={24} />
            </a>
            <a className="bigLink secondary" href="tel:15201812681">
              电话沟通 <Phone size={24} />
            </a>
          </div>
          <footer>
            <span>刘斯文 / Shanghai</span>
            <span>AI Brand Visual Designer</span>
          </footer>
        </div>
      </section>
    </main>
  );
}

function ProjectDetail({ project, onClose }) {
  return (
    <section className="projectDetail" aria-label={`${project.title}项目详情`}>
      <div className="projectDetailHero">
        <img src={project.image} alt={`${project.title}封面`} decoding="async" fetchPriority="high" />
        <div className="projectDetailShade" />
        <div className="projectDetailNav shell">
          <button className="backButton" onClick={onClose} type="button">
            返回精选项目
          </button>
        </div>
        <div className="projectDetailIntro shell">
          <p className="eyebrow">{project.tag}</p>
          <h1>{project.title}</h1>
          <p>{project.desc}</p>
        </div>
      </div>
      <div className="projectDetailBody shell">
        <div className="sectionMeta">
          <span>WORK</span>
          <p>PROJECT IMAGES</p>
        </div>
        <div className="projectImageStack">
          {project.pages.map((page, index) => (
            <figure className="projectImageFrame" key={page}>
              <img src={page} alt={`${project.title}作品图 ${index + 1}`} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

createRoot(document.getElementById('root')).render(<App />);
