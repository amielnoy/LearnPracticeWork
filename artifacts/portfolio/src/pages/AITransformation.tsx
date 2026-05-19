import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Zap,
  Brain,
  Target,
  Workflow,
  Users,
  BarChart3,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

const tabs = [
  {
    id: "vision",
    label: "The Shift",
    icon: Rocket,
    title: "Shift Your Test Automation to the AI Era",
    content: `I provide a comprehensive AI Test Automation transformation service that takes your team from traditional scripted testing into the AI-powered quality engineering era. This isn't just tooling—it's a strategic shift in how your organization approaches quality, velocity, and engineering culture.`,
    bullets: [
      "Move from brittle, high-maintenance test suites to self-healing, AI-augmented automation",
      "Replace manual test authoring with AI-generated scenarios from requirements and user stories",
      "Empower your QA engineers to become AI-first quality architects",
      "Achieve predictive quality insights instead of reactive bug hunting",
    ],
  },
  {
    id: "methodology",
    label: "How It Works",
    icon: Workflow,
    title: "My Transformation Methodology",
    content: `A hands-on, phased engagement designed to minimize disruption while maximizing adoption. I work directly with your team to build AI capabilities into your existing pipelines, not alongside them.`,
    bullets: [
      "Audit: Deep analysis of your current automation stack, flakiness hotspots, and AI readiness",
      "Pilot: Deploy self-healing selectors and smart assertions on your most painful test suites",
      "Scale: Roll out AI test generation integrated with your CI/CD, Jira, and API contracts",
      "Optimize: Continuous feedback loops with predictive dashboards and team coaching",
    ],
  },
  {
    id: "solutions",
    label: "What I Deliver",
    icon: Zap,
    title: "AI Test Automation Solutions I Provide",
    content: `Practical, production-ready implementations that your team owns and operates. Every solution is tailored to your tech stack and integrated into your delivery pipeline.`,
    bullets: [
      "Self-healing UI automation using Playwright + AI selectors that adapt to DOM changes",
      "AI-generated test cases from natural language requirements, PRDs, and API specs",
      "Visual regression testing powered by computer vision and LLM-based reasoning",
      "Intelligent test data synthesis with edge-case generation and privacy-safe synthetic data",
    ],
  },
  {
    id: "impact",
    label: "Results",
    icon: BarChart3,
    title: "Measurable Results for Your Team",
    content: `Real outcomes from teams I've guided through the AI Test Automation shift. These numbers reflect what happens when AI is embedded into quality engineering, not bolted on top.`,
    bullets: [
      "40-60% reduction in time spent authoring and maintaining test cases",
      "Up to 80% reduction in flaky test failures through self-healing mechanisms",
      "3x faster feedback loops: AI catches issues at commit time, not in staging",
      "Expanded test coverage without expanding headcount or budget",
    ],
  },
  {
    id: "team",
    label: "Team Growth",
    icon: Users,
    title: "I Grow Your Team, Not Replace Them",
    content: `The most successful AI transformations happen when the existing team becomes the driver. I provide intensive upskilling so your engineers lead the AI era, not watch it from the sidelines.`,
    bullets: [
      "Hands-on workshops: prompt engineering for test generation, debugging, and maintenance",
      "Tool evaluation and integration coaching for Playwright, GitHub Actions, Azure DevOps, and AI APIs",
      "Building internal AI champions who train and support the rest of the team",
      "Ongoing mentorship program tuned to your team's pace and tech stack",
    ],
  },
  {
    id: "roadmap",
    label: "Engagement",
    icon: Target,
    title: "Engagement Roadmap",
    content: `A focused, time-boxed engagement that delivers visible results within weeks. Designed for teams who want to lead the shift to AI-powered quality, not follow it.`,
    bullets: [
      "Week 1-2: Assessment of current automation maturity and AI opportunity mapping",
      "Month 1: Pilot rollout with self-healing automation on critical user journeys",
      "Month 2-3: Full AI generation pipeline + team training and knowledge transfer",
      "Month 4-6: Predictive quality dashboards, continuous optimization, and team autonomy",
    ],
  },
];

export default function AITransformation() {
  const [activeTab, setActiveTab] = useState("vision");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-[100dvh] bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="rounded-full" asChild>
            <a href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </a>
          </Button>
          <span className="font-bold text-lg tracking-tight hidden md:inline">
            AI Test Automation Transformation
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <Brain className="w-4 h-4" />
              Service Offering
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Shift to the <span className="text-primary">AI Era</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I provide AI Test Automation transformation services that move your team from legacy testing practices into AI-powered quality engineering. A strategic, hands-on program for organizations ready to lead.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all
                    ${isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn key={activeTab}>
            <div className="p-8 md:p-12 rounded-3xl bg-card border shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                  <active.icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">{active.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                {active.content}
              </p>
              <ul className="space-y-4">
                {active.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30"
                  >
                    <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="font-medium">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-secondary/5 border-t">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4">Ready to Make the Shift?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's discuss where your team is today and map the path to AI-powered test automation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full font-bold px-8" asChild>
                <a href="/">Back to Portfolio</a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full font-bold px-8" asChild>
                <a href="https://www.linkedin.com/in/amiel-peled/" target="_blank" rel="noreferrer">
                  Contact on LinkedIn
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
