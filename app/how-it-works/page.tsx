"use client"

import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  TrendingUp,
  Mail,
  UserPlus,
  CreditCard,
  X,
  Check,
  ExternalLink,
  Play,
  Users,
  DollarSign,
  ShoppingCart,
  BarChart3,
  Target,
  Zap,
  Clock,
  Sparkles,
  Brain,
  Rocket,
} from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Mail,
    title: "Enter Your Email",
    description: "Simply provide your email address and tell us about your business preferences.",
    details:
      "We'll ask a few quick questions about your industry, business type, and what kind of products you're looking for. This takes less than 2 minutes.",
  },
  {
    number: "02",
    icon: TrendingUp,
    title: "Receive Demo Newsletter",
    description: "Get a personalized sample newsletter showcasing trending products in your industry.",
    details:
      "Our AI analyzes thousands of products and market trends to curate the most relevant opportunities for your specific business needs. Your beta newsletter will arrive within an hour as our AI does all the heavy lifting.",
  },
  {
    number: "03",
    icon: UserPlus,
    title: "Create Your Account",
    description: "Coming Soon! Full account creation with advanced features and personalized dashboards.",
    details:
      "In the full version, you'll get access to advanced analytics, custom alerts, and detailed product tracking. For now, enjoy your free beta newsletter!",
  },
  {
    number: "04",
    icon: CreditCard,
    title: "Choose Your Plan",
    description: "Coming Soon! Select from premium plans with enhanced features and deeper insights.",
    details:
      "Future plans will include real-time alerts, competitor analysis, supplier connections, and much more. Beta users get early access to all features.",
  },
]

const betaFeatures = [
  {
    name: "Beta Access",
    description: "Free during beta period",
    features: ["3+ curated products", "2+ creator insights", "1-2 market insights", "Weekly delivery"],
    popular: true,
    isBeta: true,
  },
]

const futureFeatures = [
  {
    icon: Brain,
    title: "AI-Powered Supplier Matching",
    description: "Automatically find and connect with verified suppliers for trending products",
    status: "Coming Soon",
  },
  {
    icon: BarChart3,
    title: "Real-Time Profit Calculator",
    description: "Calculate potential profits with shipping, ads, and margin analysis",
    status: "Coming Soon",
  },
  {
    icon: Target,
    title: "Competitor Intelligence",
    description: "Track what your competitors are selling and their pricing strategies",
    status: "Coming Soon",
  },
  {
    icon: Sparkles,
    title: "Custom Product Alerts",
    description: "Get instant notifications when products match your specific criteria",
    status: "Coming Soon",
  },
  {
    icon: Users,
    title: "Creator Partnership Hub",
    description: "Connect directly with top-performing creators for product collaborations",
    status: "Coming Soon",
  },
  {
    icon: Rocket,
    title: "Launch Readiness Score",
    description: "AI-powered assessment of how ready a product is for your market entry",
    status: "Coming Soon",
  },
]

export default function HowItWorks() {
  const handleGetStarted = () => {
    window.location.href = "/onboarding"
  }

  const handleGoBack = () => {
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">ProductPulse</span>
          </div>
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="backdrop-blur-sm bg-white/60 hover:bg-white/80 border border-gray-300/50 rounded-2xl text-gray-700 font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Now in Beta - Free Access</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            How
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              ProductPulse
            </span>{" "}
            Works
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get winning product recommendations delivered to your inbox. Currently in beta - completely free!
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="relative z-10 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0
              const isComingSoon = index >= 2

              return (
                <div
                  key={index}
                  className={`flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-8 md:gap-16 ${isComingSoon ? "opacity-60" : ""}`}
                >
                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${isComingSoon ? "from-gray-400/20 to-gray-500/20" : "from-blue-500/20 to-indigo-600/20"} rounded-2xl flex items-center justify-center`}
                      >
                        <Icon className={`h-8 w-8 ${isComingSoon ? "text-gray-500" : "text-blue-600"}`} />
                      </div>
                      <div>
                        <div
                          className={`text-sm font-medium mb-1 flex items-center space-x-2 ${isComingSoon ? "text-gray-500" : "text-blue-600"}`}
                        >
                          <span>Step {step.number}</span>
                          {isComingSoon && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-xl text-gray-700 leading-relaxed">{step.description}</p>
                    <p className="text-gray-600 leading-relaxed">{step.details}</p>
                  </div>

                  {/* Visual */}
                  <div className="flex-1">
                    <div className="backdrop-blur-xl bg-white/70 border border-gray-200/50 rounded-3xl p-8 shadow-xl">
                      <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center">
                        <div className="text-center">
                          <div
                            className={`w-20 h-20 bg-gradient-to-br ${isComingSoon ? "from-gray-400 to-gray-500" : "from-blue-500 to-indigo-600"} rounded-full mx-auto mb-4 flex items-center justify-center`}
                          >
                            <Icon className="h-10 w-10 text-white" />
                          </div>
                          <div className="text-2xl font-bold text-gray-900 mb-2">{step.title}</div>
                          <div className="text-gray-600">Step {step.number}</div>
                          {isComingSoon && (
                            <div className="mt-2">
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                Coming Soon
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Email Preview Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              See What Your
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                Beta Newsletter
              </span>{" "}
              Looks Like
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              Here's exactly what you'll receive in your inbox - a personalized newsletter packed with trending
              products, creator insights, and actionable market data
            </p>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-full px-4 py-2">
              <Clock className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Delivered within 1 hour - AI does the work!</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - TikTok Video */}
            <div className="space-y-6">
              <div className="backdrop-blur-xl bg-white/70 border border-gray-200/50 rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Product Video</h3>
                <div className="aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-lg relative">
                  {/* TikTok Video Embed */}
                  <iframe
                    src="https://www.tiktok.com/embed/7528869935318060319"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-2xl"
                  ></iframe>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                      <Play className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">@brrrila</p>
                      <p className="text-sm text-gray-600">410.44k followers</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    "no blow dryer or straightener, just my @wavytalkofficial thermal brush 🫶🏾 would you try it??"
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-green-600 font-medium">$15.94k revenue</span>
                    <span className="text-blue-600">670 items sold</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Email Preview */}
            <div className="space-y-6">
              <div className="backdrop-blur-xl bg-white/70 border border-gray-200/50 rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Beta Newsletter</h3>

                {/* Email Preview Container */}
                <div className="space-y-6">
                  {/* Email Header Preview */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                    {/* Email Title */}
                    <div className="p-6 border-b border-gray-200">
                      <h4 className="text-2xl font-bold text-gray-900 text-center">Your Beta Newsletter</h4>
                    </div>

                    {/* ProductPulse Beta Banner */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-bold">ProductPulse Beta</h4>
                            <p className="text-blue-100 text-sm">Your Trending Products Report</p>
                          </div>
                        </div>
                        <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">FREE</div>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Greeting */}
                      <h5 className="font-bold text-gray-900 mb-3">Hi [Your Name],</h5>
                      <p className="text-gray-700 mb-6">
                        Here's this week's hottest product in{" "}
                        <span className="font-semibold text-blue-600">Beauty & Personal Care</span>:
                      </p>

                      {/* Featured Product - Hottest Product Section */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-200">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xl">🔥</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h6 className="font-bold text-gray-900 text-lg">WavyTalk Thermal Brush</h6>
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">HOT</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">Beauty Tools</p>

                            {/* Key Metrics */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                              <div className="bg-white/60 rounded-lg p-3 text-center">
                                <p className="text-lg font-bold text-green-600">$253.96k</p>
                                <p className="text-xs text-gray-500">$36.28k/day</p>
                                <p className="text-xs font-medium text-gray-700 mt-1">Revenue</p>
                              </div>
                              <div className="bg-white/60 rounded-lg p-3 text-center">
                                <p className="text-lg font-bold text-blue-600">8.69k</p>
                                <p className="text-xs text-gray-500">1.24k/day</p>
                                <p className="text-xs font-medium text-gray-700 mt-1">Items Sold</p>
                              </div>
                              <div className="bg-white/60 rounded-lg p-3 text-center">
                                <div className="flex items-center justify-center mb-1">
                                  <BarChart3 className="h-3 w-3 text-purple-600 mr-1" />
                                </div>
                                <p className="text-lg font-bold text-purple-600">$29.23</p>
                                <p className="text-xs font-medium text-gray-700">Avg. Unit Price</p>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-2">
                              <a
                                href="https://www.tiktok.com/@brrrila/video/7528869935318060319"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 bg-black text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                              >
                                <Play className="h-3 w-3" />
                                <span>Watch Video</span>
                              </a>
                              <a
                                href="https://www.tiktok.com/shop/pdp/1729403338518794392"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                              >
                                <ExternalLink className="h-3 w-3" />
                                <span>View Product</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Top Performing Creators Section */}
                      <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="font-semibold text-gray-900">Top Performing Creators</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">1</span>
                              </div>
                              <span className="text-sm font-medium">@brrrila</span>
                              <span className="text-xs text-gray-500">410.44k followers</span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-green-600">$15.94k</p>
                              <p className="text-xs text-gray-500">670 sold</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">2</span>
                              </div>
                              <span className="text-sm font-medium">@vvalcortess</span>
                              <span className="text-xs text-gray-500">85.54k followers</span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-green-600">$12.47k</p>
                              <p className="text-xs text-gray-500">418 sold</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Market Insight Section */}
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-yellow-600 text-lg">💡</span>
                          <span className="text-sm font-medium text-yellow-800">Market Insight</span>
                        </div>
                        <p className="text-sm text-yellow-700">
                          Beauty tools are dominating TikTok Shop with 300% growth this month. Hair styling products
                          show consistent high conversion rates. Perfect timing for Q1 launches.
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 text-center">
                          Beta access is completely free! Full features coming soon.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Beta Features */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">3+</div>
                      <div className="text-sm text-gray-600">Products per email</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">2+</div>
                      <div className="text-sm text-gray-600">Creator insights</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">1-2</div>
                      <div className="text-sm text-gray-600">Market insights</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bold Claims Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                These Products
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {" "}
                  WILL SELL
                </span>
              </h3>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                We don't guess. We don't hope. We deliver products backed by millions of data points that are already
                proven winners in the market.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 border border-green-200/50 rounded-3xl p-8 shadow-xl text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">100% Data-Driven</h4>
                <p className="text-gray-700 mb-4">
                  Every product recommendation is backed by real sales data, creator performance metrics, and market
                  trend analysis.
                </p>
                <div className="bg-white/60 rounded-xl p-4">
                  <p className="text-3xl font-bold text-green-600 mb-1">High Revenue</p>
                  <p className="text-sm text-gray-600">Proven weekly revenue generation</p>
                </div>
              </div>

              <div className="backdrop-blur-xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-blue-200/50 rounded-3xl p-8 shadow-xl text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Already Selling</h4>
                <p className="text-gray-700 mb-4">
                  We only feature products that are currently generating massive sales. No untested products, no
                  guesswork.
                </p>
                <div className="bg-white/60 rounded-xl p-4">
                  <p className="text-3xl font-bold text-blue-600 mb-1">High Volume</p>
                  <p className="text-sm text-gray-600">Thousands of units sold weekly</p>
                </div>
              </div>

              <div className="backdrop-blur-xl bg-gradient-to-br from-purple-50/80 to-pink-50/80 border border-purple-200/50 rounded-3xl p-8 shadow-xl text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Peak Performance</h4>
                <p className="text-gray-700 mb-4">
                  We identify products BEFORE they go viral, giving you first-mover advantage when demand explodes. Get in early while competition is minimal and margins are highest.
                </p>
                <div className="bg-white/60 rounded-xl p-4">
                  <p className="text-3xl font-bold text-purple-600 mb-1">Rapid Growth</p>
                  <p className="text-sm text-gray-600">Exceptional growth trajectory</p>
                </div>
              </div>
            </div>

            {/* Guarantee Section */}
            <div className="backdrop-blur-xl bg-gradient-to-r from-red-50/80 to-orange-50/80 border border-red-200/50 rounded-3xl p-12 shadow-2xl text-center">
              <div className="max-w-4xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full mx-auto mb-8 flex items-center justify-center">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Bold Promise: These Products Are
                  <span className="text-red-600"> GUARANTEED </span>
                  Winners
                </h3>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  We don't send you "potential" winners or "trending" products. We send you products that are{" "}
                  <strong>actively making money RIGHT NOW</strong>. Every single product in your newsletter has already
                  generated hundreds of thousands in revenue and sold thousands of units.
                </p>
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white/60 rounded-xl p-4">
                    <p className="text-2xl font-bold text-red-600">✓</p>
                    <p className="text-sm font-medium text-gray-800">Real Sales Data</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-4">
                    <p className="text-2xl font-bold text-red-600">✓</p>
                    <p className="text-sm font-medium text-gray-800">Proven Creators</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-4">
                    <p className="text-2xl font-bold text-red-600">✓</p>
                    <p className="text-sm font-medium text-gray-800">Market Validated</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-4">
                    <p className="text-2xl font-bold text-red-600">✓</p>
                    <p className="text-sm font-medium text-gray-800">Revenue Generating</p>
                  </div>
                </div>
                <p className="text-lg text-gray-600 font-medium">
                  Stop wasting time on products that "might" work. Get products that{" "}
                  <span className="text-red-600 font-bold">ARE ALREADY WORKING</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="backdrop-blur-xl bg-white/70 border border-gray-200/50 rounded-3xl p-8 shadow-xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready for your free beta newsletter?</h3>
              <p className="text-gray-600 mb-6">
                Get your personalized newsletter with real product data, creator insights, and actionable market
                intelligence - completely free during beta!
              </p>
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="h-14 px-8 text-lg backdrop-blur-sm bg-gradient-to-r from-blue-600/90 to-indigo-700/90 hover:from-blue-500/95 hover:to-indigo-600/95 border border-gray-300/30 rounded-2xl text-white font-medium transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              >
                Get My Free Beta Access <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700 font-medium">Delivered within 1 hour</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Features Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What's
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {" "}
                Coming Next
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The beta is just the beginning. Here's what we're building to make ProductPulse the ultimate product
              discovery platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {futureFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-white/70 border border-gray-200/50 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-xl flex items-center justify-center">
                      <Icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{feature.title}</h4>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                        {feature.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <div className="backdrop-blur-xl bg-gradient-to-r from-purple-50/80 to-pink-50/80 border border-purple-200/50 rounded-3xl p-8 shadow-xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Beta Users Get Early Access</h3>
              <p className="text-lg text-gray-600 mb-6">
                Join the beta now and you'll be the first to access all these powerful features when they launch. Plus,
                you'll get grandfathered pricing on all premium plans!
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Free beta access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Early feature access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Grandfathered pricing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Plan Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Current
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {" "}
                Beta Access
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with ProductPulse completely free during our beta period
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {betaFeatures.map((plan, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 border border-green-400/70 shadow-green-500/10 rounded-3xl p-8 shadow-xl relative"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Beta Access
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold text-green-600 mb-2">FREE</div>
                  <p className="text-sm text-gray-500">During beta period</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="w-full h-14 text-lg backdrop-blur-sm bg-gradient-to-r from-green-600/90 to-emerald-700/90 hover:from-green-500/95 hover:to-emerald-600/95 border border-gray-300/30 rounded-2xl text-white font-medium transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Free Beta Access <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-xl bg-white/70 border border-gray-200/50 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ready to get started?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join the beta and be among the first to discover winning products with our AI-powered newsletter
            </p>
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="h-16 px-12 text-lg backdrop-blur-sm bg-gradient-to-r from-blue-600/90 to-indigo-700/90 hover:from-blue-500/95 hover:to-indigo-600/95 border border-gray-300/30 rounded-2xl text-white font-medium transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Join Beta - It's Free! <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Free beta access</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>No spam, ever</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-12 border-t border-gray-200/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ProductPulse</span>
          </div>
          <p className="text-gray-600">© 2024 ProductPulse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
