import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart3, BrainCircuit, CheckCircle2, Clock, Focus, Layers, Shield, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">TaskFlow</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          </nav>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium hover:text-primary hidden sm:block">Log in</a>
            <Button className="bg-primary text-white hover:bg-primary/90 font-bold shadow-[0_0_15px_-3px_var(--primary)]">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50 animate-pulse" />
          
          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                TaskFlow 2.0 is live
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                Master Your Workflow <br />
                <span className="text-gradient">Achieve Your Goals</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                The smart task management platform designed for solo-preneurs, students, and consultants who need focus, not just features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-bold h-12 px-8 text-base neon-glow">
                  Start for Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 h-12 px-8 text-base">
                  View Demo
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative mx-auto max-w-5xl rounded-xl border border-white/10 bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-1000 delay-500">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <img 
                src="/images/hero-dashboard-violet.png" 
                alt="TaskFlow Dashboard Interface showing task lists and analytics" 
                className="w-full h-auto object-cover"
                width={1200}
                height={675}
              />
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-12 border-y border-white/5 bg-white/5">
          <div className="container text-center">
            <p className="text-sm font-medium text-muted-foreground mb-8">TRUSTED BY 10,000+ HIGH PERFORMERS</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Placeholder Logos - In production use real SVGs */}
              <div className="text-xl font-bold font-heading">ACME Corp</div>
              <div className="text-xl font-bold font-heading">GlobalTech</div>
              <div className="text-xl font-bold font-heading">UniVerse</div>
              <div className="text-xl font-bold font-heading">Consultio</div>
              <div className="text-xl font-bold font-heading">FreelanceHub</div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-secondary/30 relative">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for <span className="text-primary">Deep Work</span></h2>
              <p className="text-lg text-muted-foreground">
                Stop juggling multiple apps. TaskFlow unifies your tasks, goals, and analytics into one seamless "Cyber-Zen" experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="glass-card border-white/5 hover:border-primary/50 transition-all duration-300 group overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/90 z-10" />
                    <img src="/images/feature-focus-violet.png" alt="Zen Focus Mode Interface" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 relative z-20 -mt-12">
                    <div className="h-12 w-12 rounded-lg bg-background border border-white/10 flex items-center justify-center mb-4 shadow-lg">
                      <Focus className="h-6 w-6 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Zen Focus Mode</h3>
                    <p className="text-muted-foreground">
                      Eliminate distractions with a dedicated focus interface that highlights only your current task.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="glass-card border-white/5 hover:border-primary/50 transition-all duration-300 group overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/90 z-10" />
                    <img src="/images/feature-goals-violet.png" alt="Smart Goal Tracking Visualization" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 relative z-20 -mt-12">
                    <div className="h-12 w-12 rounded-lg bg-background border border-white/10 flex items-center justify-center mb-4 shadow-lg">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Smart Goal Tracking</h3>
                    <p className="text-muted-foreground">
                      Break down big ambitions into manageable steps. Visualize your progress with dynamic charts.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="glass-card border-white/5 hover:border-primary/50 transition-all duration-300 group overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/90 z-10" />
                    <img src="/images/feature-analytics-violet.png" alt="Productivity Analytics Dashboard" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 relative z-20 -mt-12">
                    <div className="h-12 w-12 rounded-lg bg-background border border-white/10 flex items-center justify-center mb-4 shadow-lg">
                      <BarChart3 className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Productivity Analytics</h3>
                    <p className="text-muted-foreground">
                      Understand your work habits with detailed insights. Optimize your schedule for peak performance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 relative">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Your Path to <span className="text-gradient">Peak Performance</span></h2>
              <p className="text-lg text-muted-foreground">
                A simple, proven workflow to take you from overwhelmed to organized in minutes.
              </p>
            </div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden md:block" />

              <div className="space-y-12 md:space-y-24">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                  <div className="flex-1 text-right md:pr-12">
                    <h3 className="text-2xl font-bold mb-2 text-primary">01. Capture</h3>
                    <h4 className="text-xl font-bold mb-4">Dump Your Brain</h4>
                    <p className="text-muted-foreground">
                      Quickly capture tasks, ideas, and deadlines before they slip away. Our Quick Add shortcut works from anywhere.
                    </p>
                  </div>
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-background border-2 border-primary shadow-[0_0_15px_var(--primary)]">
                    <BrainCircuit className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 md:pl-12">
                    <div className="p-6 rounded-xl bg-card/50 border border-white/5 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-3/4 bg-white/10 rounded" />
                        <div className="h-2 w-1/2 bg-white/10 rounded" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
                  <div className="flex-1 text-left md:pl-12">
                    <h3 className="text-2xl font-bold mb-2 text-cyan-400">02. Organize</h3>
                    <h4 className="text-xl font-bold mb-4">Structure Your Projects</h4>
                    <p className="text-muted-foreground">
                      Group tasks into projects, assign tags, and set priorities. Turn chaos into a clear, actionable plan.
                    </p>
                  </div>
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-background border-2 border-cyan-400 shadow-[0_0_15px_var(--color-cyan-400)]">
                    <Layers className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1 md:pr-12">
                    <div className="p-6 rounded-xl bg-card/50 border border-white/5 backdrop-blur-sm">
                      <div className="flex gap-2 mb-4">
                        <span className="px-2 py-1 rounded bg-primary/20 text-primary text-xs">Work</span>
                        <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 text-xs">Study</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-8 w-full bg-white/5 rounded border border-white/5" />
                        <div className="h-8 w-full bg-white/5 rounded border border-white/5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                  <div className="flex-1 text-right md:pr-12">
                    <h3 className="text-2xl font-bold mb-2 text-purple-400">03. Execute</h3>
                    <h4 className="text-xl font-bold mb-4">Enter Flow State</h4>
                    <p className="text-muted-foreground">
                      Activate Focus Mode to block distractions. Use the Pomodoro timer to maintain high energy levels.
                    </p>
                  </div>
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-background border-2 border-purple-400 shadow-[0_0_15px_var(--color-purple-400)]">
                    <Zap className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1 md:pl-12">
                    <div className="p-6 rounded-xl bg-card/50 border border-white/5 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-4xl font-mono font-bold text-purple-400">25:00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="relative rounded-2xl border border-white/10 bg-card/30 p-8 backdrop-blur-sm">
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">For Solo-preneurs</h4>
                        <p className="text-muted-foreground text-sm">Manage multiple revenue streams. Track client deliverables and marketing tasks in one view.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 h-8 w-8 rounded-lg bg-cyan-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">For Students</h4>
                        <p className="text-muted-foreground text-sm">Input your syllabus once. Get automatic reminders for assignments and exams. Track your GPA goals.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 h-8 w-8 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">For Consultants</h4>
                        <p className="text-muted-foreground text-sm">Separate workspaces for each client. Track billable hours directly on tasks. Export reports instantly.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose <br /><span className="text-gradient">TaskFlow?</span></h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Most task managers are just digital to-do lists. TaskFlow is a complete productivity system designed to help you enter a flow state and stay there.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-primary" />
                    <span className="font-medium">Lightning fast keyboard shortcuts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="font-medium">Offline-first & Private by default</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-medium">Seamless cross-device sync</span>
                  </li>
                </ul>
                <Button size="lg" className="bg-white text-black hover:bg-white/90 font-bold">
                  Experience the Difference
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 relative">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, Transparent <span className="text-primary">Pricing</span></h2>
              <p className="text-lg text-muted-foreground">
                Start for free. Upgrade when you're ready to scale your productivity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <Card className="glass-card border-white/5 hover:border-white/20 transition-all">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Starter</h3>
                  <div className="text-4xl font-bold mb-6">$0 <span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                  <p className="text-muted-foreground mb-8">Perfect for students and individuals just getting started.</p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-white" /> <span>Unlimited Tasks</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-white" /> <span>3 Projects</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-white" /> <span>Basic Analytics</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold">Get Started Free</Button>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="glass-card border-primary/50 shadow-[0_0_30px_-10px_var(--primary)] relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-primary">Pro</h3>
                  <div className="text-4xl font-bold mb-6">$9 <span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                  <p className="text-muted-foreground mb-8">For power users who need advanced features and unlimited limits.</p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" /> <span>Everything in Starter</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" /> <span>Unlimited Projects</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" /> <span>Advanced Analytics & Trends</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" /> <span>Priority Support</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-primary text-white hover:bg-primary/90 font-bold shadow-lg">Start 14-Day Free Trial</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-secondary/30">
          <div className="container max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is TaskFlow really free?</AccordionTrigger>
                <AccordionContent>
                  Yes! Our Starter plan is completely free forever and includes unlimited tasks. We only charge for advanced features like unlimited projects and deep analytics.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Does it work offline?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. TaskFlow is built with an offline-first architecture. You can work anywhere, even without an internet connection, and your data will sync automatically when you're back online.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I import data from other apps?</AccordionTrigger>
                <AccordionContent>
                  Yes, we support one-click imports from Todoist, Trello, Notion, and Asana so you can switch without losing any data.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Is my data secure?</AccordionTrigger>
                <AccordionContent>
                  Security is our top priority. All your data is encrypted at rest and in transit using bank-grade AES-256 encryption. We never sell your data to third parties.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl border border-primary/20 bg-background/50 backdrop-blur-xl shadow-2xl neon-glow">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to <span className="text-primary">Flow?</span></h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join thousands of high-performers who have switched to TaskFlow. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-bold h-14 px-10 text-lg shadow-[0_0_20px_-5px_var(--primary)]">
                  Get Started for Free
                </Button>
                <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 h-14 px-10 text-lg">
                  Contact Sales
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Layers className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">TaskFlow</span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                The smart task management platform for the next generation of creators and builders.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Features</a></li>
                <li><a href="#" className="hover:text-primary">Pricing</a></li>
                <li><a href="#" className="hover:text-primary">Changelog</a></li>
                <li><a href="#" className="hover:text-primary">Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 TaskFlow Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
