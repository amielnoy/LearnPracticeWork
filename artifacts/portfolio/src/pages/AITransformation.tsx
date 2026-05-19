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
  Sparkles,
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
    label: "Vision",
    icon: Sparkles,
    title: "AI Test Transformation Vision",
    content: `The future of quality engineering isn't more manual testers—it's intelligent automation that learns, adapts, and predicts. AI Test Transformation is the journey from traditional scripted automation to AI-augmented quality systems that self-heal, generate test scenarios from requirements, and provide predictive insights before code reaches production.`,
    bullets: [
      "Shift from reactive testing to predictive quality assurance",
      "Empower testers to become AI-augmented quality engineers",
      "Reduce test maintenance overhead by 70%+ through self-healing selectors",
      "Generate comprehensive test coverage from natural language requirements",
    ],
  },
  {
    id: "methodology",
    label: "Methodology",
    icon: Workflow,
    title: "The Transformation Methodology",
    content: `A structured, phased approach to integrating AI into your testing lifecycle. We don't replace your existing automation—we enhance it with AI capabilities that compound value over time.`,
    bullets: [
      "Phase 1: Assessment & AI Readiness Audit of current test suite",
      "Phase 2: Pilot implementation with self-healing and smart assertions",
      "Phase 3: AI test generation from user stories and API contracts",
      "Phase 4: Predictive analytics dashboard and continuous optimization",
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    icon: Zap,
    title: "AI-Powered Solutions",
    content: `Practical implementations that deliver immediate ROI while building toward a fully AI-augmented quality pipeline.`,
    bullets: [
      "Self-healing UI automation that adapts to DOM changes automatically",
      "Visual regression powered by computer vision and LLM reasoning",
      "Intelligent test data generation with synthetic data and edge-case discovery",
      "Natural language to test case conversion using fine-tuned models",
    ],
  },
  {
    id: "impact",
    label: "Impact",
    icon: BarChart3,
    title: "Measured Business Impact",
    content: `Real outcomes from organizations that have undergone AI Test Transformation.`,
    bullets: [
      "40-60% reduction in test authoring time through AI generation",
      "80% decrease in flaky test rates via self-healing mechanisms",
      "3x faster feedback loops from commit to quality signal",
      "Test coverage expansion without proportional team growth",
    ],
  },
  {
    id: "team",
    label: "Team Upskill",
    icon: Users,
    title: "Upskilling Your Quality Team",
    content: `The most successful transformations invest equally in people and technology. We guide your team through practical AI adoption in their daily workflow.`,
    bullets: [
      "Prompt engineering for test generation and debugging",
      "AI tool evaluation and integration into existing CI/CD",
      "Building internal AI champions and centers of excellence",
      "Continuous learning programs tuned to your tech stack",
    ],
  },
  {
    id: "roadmap",
    label: "Roadmap",
    icon: Target,
    title: "Your Transformation Roadmap",
    content: `A personalized 90-180 day plan tailored to your organization's maturity, tech stack, and quality goals.`,
    bullets: [
      "Week 1-2: Current state analysis and AI opportunity mapping",
      "Month 1: Quick wins with self-healing and visual testing pilots",
      "Month 2-3: AI generation rollout and team training sprints",
      "Month 4-6: Predictive quality dashboards and continuous optimization",
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
            AI Test Transformation
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <Brain className="w-4 h-4" />
              AI-Powered Quality Engineering
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              AI Test <span className="text-primary">Transformation</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your quality engineering from manual maintenance to AI-augmented intelligence. A strategic program for teams ready to lead the next era of software testing.
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
            <h2 className="text-3xl font-bold mb-4">Ready to Transform?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's discuss where your organization is today and map the path to AI-augmented quality engineering.
            </p>
            <Button size="lg" className="rounded-full font-bold px-8" asChild>
              <a href="/">Back to Portfolio</a>
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
