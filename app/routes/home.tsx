import type { Route } from "./+types/home";
import { useState, useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ChatTweak - Enhance Your Chat Experience" },
    {
      name: "description",
      content:
        "ChatTweak adds powerful privacy and customization features to your favorite chat app with screenshot bypass, status spoofing, and clean UI improvements.",
    },
    {
      name: "keywords",
      content: "chat, privacy, bypass, status, UI, telemetry, screenshots",
    },
    {
      property: "og:title",
      content: "ChatTweak - Privacy & Customization for Chat",
    },
    {
      property: "og:description",
      content: "Bypass restrictions and enhance your chat experience",
    },
    { property: "og:type", content: "website" },
  ];
}

// Simplified animation component using CSS classes only
const FadeInSection = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Simple typing animation using CSS only
const TypedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className={`inline-block transition-all duration-500 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      style={{
        animation: show
          ? `typewriter ${text.length * 0.05}s steps(${text.length})`
          : "none",
      }}
    >
      {show ? text : ""}
    </span>
  );
};

// Feature card with simple hover effects
const FeatureCard = ({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}) => {
  return (
    <FadeInSection delay={delay} className="h-full">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/70 hover:bg-slate-800/70 transition-all duration-300 h-full flex flex-col">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-3 text-blue-300">{title}</h3>
        <p className="text-slate-300 text-sm leading-relaxed flex-grow">
          {description}
        </p>
      </div>
    </FadeInSection>
  );
};

// Simple background effect
const BackgroundEffect = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20" />
      {/* Simple grid pattern */}
      <div
        className="absolute inset-0 bg-slate-900/50"
        style={{
          backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
};

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <BackgroundEffect />
      <Analytics/>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo/Icon */}
          <FadeInSection delay={200}>
            <div className="text-8xl mb-8 filter drop-shadow-lg">🔧💬</div>
          </FadeInSection>

          {/* Main Title */}
          <FadeInSection delay={400}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              <TypedText text="ChatTweak" delay={600} />
            </h1>
          </FadeInSection>

          {/* Subtitle */}
          <FadeInSection delay={800}>
            <p className="text-2xl md:text-3xl mb-6 text-slate-300 font-light">
              Privacy & customization for your{" "}
              <em className="text-cyan-300 font-medium">certain</em> chat app
            </p>
          </FadeInSection>

          {/* Description */}
          <FadeInSection delay={1000}>
            <p className="text-lg md:text-xl mb-12 text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Bypass restrictions, enhance privacy, and customize your chat
              experience with powerful features that put you in control.
            </p>
          </FadeInSection>

          {/* CTA Buttons */}
          <FadeInSection delay={1200}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://github.com/mixtapejaxson/ChatTweak/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-lg font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 inline-block"
              >
                Download ChatTweak
              </a>
              <a
                href="https://github.com/mixtapejaxson/ChatTweak"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-slate-600 rounded-lg text-lg font-semibold hover:border-slate-500 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105"
              >
                View on GitHub
              </a>
            </div>
          </FadeInSection>
        </div>

        {/* Scroll Indicator */}
        <FadeInSection
          delay={1600}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <FadeInSection delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Powerful Features
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Take control of your chat experience with these privacy and
                customization tools
              </p>
            </div>
          </FadeInSection>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon="📷"
              title="Bypass Screenshot Detection"
              description="Prevent apps from detecting when you take screenshots. Capture conversations privately without triggering notifications or restrictions."
              delay={100}
            />

            <FeatureCard
              icon="📱"
              title="Status Spoofing"
              description="Change your online status to mobile or desktop at will. Control how others see your activity and maintain privacy."
              delay={200}
            />

            <FeatureCard
              icon="🔍"
              title="Disable Spotlight"
              description="Remove unwanted spotlight features and suggestions. Keep your chat interface clean and distraction-free."
              delay={300}
            />

            <FeatureCard
              icon="📊"
              title="Disable Metrics"
              description="Block internal metrics collection and analytics. Prevent the app from tracking your usage patterns and behavior."
              delay={400}
            />

            <FeatureCard
              icon="📡"
              title="Disable Telemetry"
              description="Stop telemetry data from being sent to servers. Enhanced privacy by blocking diagnostic and usage data transmission."
              delay={500}
            />

            <FeatureCard
              icon="🎨"
              title="Cleaner Tabbed UI"
              description="Streamlined interface with improved tab management. Cleaner design with better organization and navigation."
              delay={600}
            />

            <FeatureCard
              icon="🔧"
              title="Patched Features Removed"
              description="Automatically removes features that have been patched or cause conflicts. Keeps your installation stable and functional."
              delay={700}
            />

            <FeatureCard
              icon="⚡"
              title="Performance Optimized"
              description="Optimized code for better performance and reduced resource usage. Faster loading times and smoother operation."
              delay={800}
            />

            <FeatureCard
              icon="🔒"
              title="Privacy First"
              description="Built with privacy as the core principle. All features designed to enhance your privacy and security while chatting."
              delay={900}
            />
          </div>

          {/* Call to Action */}
          <FadeInSection delay={1000}>
            <div className="text-center bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-12 backdrop-blur-sm border border-slate-600/50">
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Ready to Take Control?
              </h3>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands of users who have enhanced their chat privacy and
                customization with ChatTweak.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/mixtapejaxson/ChatTweak/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-lg font-semibold hover:from-green-500 hover:to-emerald-500 transition-all duration-300 hover:scale-105 inline-block"
                >
                  Download Now
                </a>
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-105">
                  View Documentation
                </button>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection delay={0}>
            <div className="flex justify-center items-center gap-3 mb-6">
              <span className="text-3xl">🔧</span>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ChatTweak
              </span>
            </div>
            <p className="text-slate-400 mb-6">
              Enhancing your{" "}
              <em className="text-cyan-300 font-medium">certain</em> chat app
              with privacy and customization features.
            </p>
            <div className="flex justify-center gap-8 text-sm">
              <a
                href="https://github.com/mixtapejaxson/ChatTweak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:contact@chattweak.com"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Support
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800">
              <p className="text-slate-500 text-sm">
                © 2025 ChatTweak. Privacy-focused chat enhancement.
              </p>
            </div>
          </FadeInSection>
        </div>
      </footer>
    </div>
  );
}
