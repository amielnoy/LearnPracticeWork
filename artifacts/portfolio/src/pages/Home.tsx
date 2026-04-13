import React from "react";
import { motion } from "framer-motion";
import { 
  Terminal, 
  BookOpen, 
  Briefcase, 
  Award, 
  Linkedin, 
  Youtube, 
  Mail,
  ChevronRight,
  Code2,
  Shield,
  Cpu,
  Users
} from "lucide-react";
import { 
  SiGithubactions, 
  SiCircleci, 
  SiTypescript, 
  SiAppium
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscAzureDevops } from "react-icons/vsc";

import profileImg from "@assets/image_1776081510333.png";
import { Button } from "@/components/ui/button";

const PlaywrightIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 5.5c1.38 0 2.5 1.12 2.5 2.5S11.88 12.5 10.5 12.5 8 11.38 8 10s1.12-2.5 2.5-2.5zm5 0c.828 0 1.5.672 1.5 1.5S16.328 10.5 15.5 10.5 14 9.828 14 9s.672-1.5 1.5-1.5zm-8 8c0-1.657 2.015-3 4.5-3s4.5 1.343 4.5 3H7.5z"/>
  </svg>
);

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      
      {/* Navigation (Sticky) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight">Amiel Peled</span>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#expertise" className="hover:text-foreground transition-colors">Expertise</a>
            <a href="#mentorship" className="hover:text-foreground transition-colors">Mentorship</a>
            <a href="#career" className="hover:text-foreground transition-colors">Career</a>
            <Button size="sm" className="rounded-full font-semibold" asChild>
              <a href="#contact">Let's Talk</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_400px] gap-12 items-center">
          <div>
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Israel | Open to Work
              </div>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
                Architecting <span className="text-primary">Automation</span>. <br />
                Mentoring <span className="text-secondary dark:text-primary/80">Engineers</span>.
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <p className="text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
                I am <strong className="text-foreground font-semibold">Amiel Shlomo Zvi Peled</strong>. 
                An AI Test Automation & DevOps Tech Lead who builds resilient infrastructure and a warm-hearted community mentor who guides students from Android Bagrut to Senior Engineer.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.3} className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="rounded-full font-bold px-8" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full font-bold px-8 group" asChild>
                <a href="https://www.linkedin.com/in/amiel-peled/" target="_blank" rel="noreferrer">
                  <Linkedin className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
                  LinkedIn
                </a>
              </Button>
            </FadeIn>
          </div>
          
          <FadeIn delay={0.4} className="relative mx-auto md:mx-0 max-w-[300px] md:max-w-none">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] translate-y-12" />
            <img 
              src={profileImg} 
              alt="Amiel Peled" 
              className="relative w-full aspect-square object-cover rounded-[2rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-background"
            />
          </FadeIn>
        </div>
      </section>

      {/* Tech Stack Marquee (Conceptual, grid based) */}
      <section className="py-12 border-y border-border/50 bg-secondary/5">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold text-center text-muted-foreground uppercase tracking-widest mb-8">
            Core Technologies & Platforms
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            {[
              { Icon: PlaywrightIcon, name: "Playwright" },
              { Icon: SiAppium, name: "Appium" },
              { Icon: VscAzureDevops, name: "Azure DevOps" },
              { Icon: SiGithubactions, name: "GitHub Actions" },
              { Icon: SiCircleci, name: "CircleCI" },
              { Icon: FaJava, name: "Java" },
              { Icon: SiTypescript, name: "TypeScript" },
            ].map((tech, i) => (
              <div key={tech.name} className="flex items-center gap-2 text-xl font-mono grayscale hover:grayscale-0 hover:text-primary transition-all duration-300">
                <tech.Icon className="w-6 h-6" />
                <span className="hidden md:inline-block text-sm font-bold">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Identity */}
      <section id="expertise" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <FadeIn>
              <div className="h-full p-10 rounded-[2rem] bg-card border shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Terminal className="w-32 h-32" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mb-8">
                  <Terminal className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-bold mb-4">The Architect</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Deep expertise in designing robust 3-layer test automation frameworks. From championing Ranorex at Intel to building full CI/CD environments on Azure DevOps from scratch at Sepio Cyber.
                </p>
                <ul className="space-y-3 font-medium">
                  <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-primary" /> Test Automation Architecture</li>
                  <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-primary" /> DevOps & CI/CD Pipelines</li>
                  <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-primary" /> Parallel Android Automation</li>
                  <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-primary" /> AI-Assisted Automation Strategies</li>
                </ul>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="h-full p-10 rounded-[2rem] bg-secondary text-secondary-foreground border border-secondary-border shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-primary">
                  <Users className="w-32 h-32" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mb-8">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-bold mb-4">The Mentor</h3>
                <p className="text-secondary-foreground/80 leading-relaxed mb-6">
                  A warm-hearted community leader who answers DMs. Known for coaching students entering the Israeli tech ecosystem and guiding professionals through complex career transitions.
                </p>
                <ul className="space-y-3 font-medium">
                  <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-primary" /> Android Bagrut Coaching</li>
                  <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-primary" /> Interview Preparation & Coding Tasks</li>
                  <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-primary" /> "Open to Work" Career Guidance</li>
                  <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-primary" /> YouTube Content Creator</li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">How I Can Help</h2>
            <p className="text-muted-foreground text-lg">
              Combining hands-on technical architecture with strategic consulting.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Code2, title: "Automation Framework Design", desc: "Custom architecture consulting and robust 3-layer framework implementation." },
              { icon: Cpu, title: "DevOps & CI/CD", desc: "Setting up seamless deployment pipelines using Azure DevOps, GitHub Actions, or CircleCI." },
              { icon: Shield, title: "Cybersecurity Consulting", desc: "Information security guidance baked into the testing and release process." },
              { icon: BookOpen, title: "Interview Prep", desc: "Real-world coding questions and strategic coaching to land your next tech role." },
              { icon: Award, title: "Software Testing", desc: "Comprehensive quality assurance strategies from manual to fully automated." },
              { icon: Briefcase, title: "Custom Development", desc: "Tailored software solutions designed for scale and maintainability." },
            ].map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-card border hover:border-primary hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{service.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Career Highlights */}
      <section id="career" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="mb-16">
            <h2 className="text-4xl font-bold mb-4">Career Highlights</h2>
            <p className="text-muted-foreground text-lg">A track record of taking ownership and driving technical excellence.</p>
          </FadeIn>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-border">
            
            <FadeIn className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-card border shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-xl">Tech Lead, Automation & DevOps</h4>
                  <span className="text-xs font-mono text-muted-foreground">Ovalix</span>
                </div>
                <p className="text-sm text-muted-foreground">Currently leading automation and DevOps strategies, mentoring the team, and ensuring top-tier software quality delivery.</p>
              </div>
            </FadeIn>

            <FadeIn className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-secondary text-secondary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Shield className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-card border shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-xl">QA to DevOps Engineer</h4>
                  <span className="text-xs font-mono text-muted-foreground">Sepio Cyber</span>
                </div>
                <p className="text-sm text-muted-foreground">Started in QA, quickly promoted to DevOps. Built the full CI/CD environment on Azure DevOps from the ground up.</p>
              </div>
            </FadeIn>

            <FadeIn className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-secondary text-secondary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-card border shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-xl">Automation Engineer</h4>
                  <span className="text-xs font-mono text-muted-foreground">Intel</span>
                </div>
                <p className="text-sm text-muted-foreground">Evaluated and championed Ranorex as the core automation tool for the Advanced Analytics team.</p>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Let's build something robust.</h2>
            <p className="text-xl text-secondary-foreground/80 mb-10 max-w-2xl mx-auto">
              Whether you need architecture consulting, an interview prep session, or a community mentor—my door is open.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full font-bold px-8 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="mailto:amiel@example.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Send an Email
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full font-bold px-8 border-secondary-border hover:bg-secondary-border" asChild>
                <a href="https://www.youtube.com/@amielpeled" target="_blank" rel="noreferrer">
                  <Youtube className="w-5 h-5 mr-2 text-red-500" />
                  YouTube Channel
                </a>
              </Button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-2 text-sm font-mono text-secondary-foreground/60">
              <Linkedin className="w-4 h-4" /> 7,912 followers • 500+ connections
            </div>
          </FadeIn>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t">
        <p>© {new Date().getFullYear()} Amiel Peled. All rights reserved.</p>
      </footer>
    </div>
  );
}
