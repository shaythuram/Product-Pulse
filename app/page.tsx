"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { TrendingUp, Search, Package, Star, CheckCircle, Mail, Info, Clock, Play, Users, BarChart3, Target, Zap, ArrowRight, ExternalLink } from "lucide-react"
import { submitFormToNotion } from "./actions"

const features = [
  {
    icon: TrendingUp,
    title: "Trend Discovery",
    description: "Stay ahead of the curve with real-time trend analysis and market insights",
  },
  {
    icon: Search,
    title: "Product Research",
    description: "Find winning products with our advanced research tools and data analytics",
  },
  {
    icon: Package,
    title: "Category Insights",
    description: "Explore new categories and niches related to your business focus",
  },
]



const stats = [
  { number: "10K+", label: "Active Users" },
  { number: "500K+", label: "Products Analyzed" },
  { number: "95%", label: "Success Rate" },
  { number: "24/7", label: "Market Monitoring" },
]

const industries = [
  "Fashion & Apparel",
  "Electronics & Tech",
  "Home & Garden",
  "Health & Beauty",
  "Sports & Fitness",
  "Automotive",
  "Baby & Kids",
  "Pet Supplies",
  "Jewelry & Accessories",
  "Books & Media",
  "Food & Beverages",
  "Arts & Crafts",
  "Travel & Luggage",
  "Office Supplies",
  "Tools & Hardware",
]

const focusOptions = [
  {
    id: "products",
    label: "Find new products",
    description: "Discover trending and profitable products to sell",
    icon: Package,
  },
  {
    id: "trends",
    label: "Find new trends",
    description: "Stay ahead with emerging market trends",
    icon: TrendingUp,
  },
  {
    id: "categories",
    label: "Find new categories related to your field of focus",
    description: "Explore adjacent categories and niches",
    icon: Search,
  },
]

interface FormData {
  name: string
  email: string
  businessType: "dropshipper" | "branded" | ""
  hasShopify: boolean
  shopifyUrl: string
  industry: string
  focus: string[]
}

const isValidUrl = (url: string): boolean => {
  if (!url) return false

  try {
    new URL(url)
    return true
  } catch {
    try {
      new URL(`https://${url}`)
      return true
    } catch {
      return false
    }
  }
}

export default function LandingPage() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isOnboardingLoading, setIsOnboardingLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    businessType: "",
    hasShopify: false,
    shopifyUrl: "",
    industry: "",
    focus: [],
  })

  // Add these new state variables after the existing formData state
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const discoverTexts = [
    "Winning Products",
    "Market Trends",
    "Hot Categories",
    "Profitable Niches",
    "Viral Products",
    "Emerging Brands",
    "Hidden Gems",
    "Rising Stars",
  ]

  const handleGetStarted = () => {
    window.location.href = "/onboarding"
  }

  const handleHowItWorks = () => {
    window.location.href = "/how-it-works"
  }

  const handleBlog = () => {
    window.location.href = "/blog"
  }

  const handleSendDemo = async () => {
    setIsSubmitting(true)
    setSubmissionError(null)

    try {
      // Save to Notion database
      const result = await submitFormToNotion(formData)

      if (!result.success) {
        throw new Error(result.error || "Failed to save your information")
      }

      // If successful, close onboarding
      setShowOnboarding(false) // Close onboarding
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmissionError("There was a problem saving your information. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showOnboarding) {
        setShowOnboarding(false) // Close onboarding
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [showOnboarding])

  // Add the typewriter effect logic after the existing useEffect
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const typeText = () => {
      const currentText = discoverTexts[currentTextIndex]

      if (isTyping) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1))
          timeout = setTimeout(typeText, 50) // Faster typing speed (was 100)
        } else {
          // Finished typing, wait exactly 3 seconds then start erasing
          timeout = setTimeout(() => setIsTyping(false), 3000) // Exactly 3 seconds
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
          timeout = setTimeout(typeText, 25) // Faster erasing speed (was 50)
        } else {
          // Finished erasing, move to next text
          setCurrentTextIndex((prev) => (prev + 1) % discoverTexts.length)
          setIsTyping(true)
          timeout = setTimeout(typeText, 200) // Shorter pause before next text (was 500)
        }
      }
    }

    timeout = setTimeout(typeText, 50)
    return () => clearTimeout(timeout)
  }, [currentTextIndex, displayText, isTyping, discoverTexts])

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleFocus = (focusId: string) => {
    setFormData((prev) => ({
      ...prev,
      focus: prev.focus.includes(focusId) ? prev.focus.filter((id) => id !== focusId) : [...prev.focus, focusId],
    }))
  }

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const canProceedStep1 = formData.name.trim() && formData.email.trim() && formData.email.includes("@")
  const canProceedStep2 = formData.businessType !== ""
  const canProceedStep3 =
    formData.hasShopify === false ||
    (formData.hasShopify === true && formData.shopifyUrl.trim() && isValidUrl(formData.shopifyUrl))
  const canProceedStep4 = formData.industry !== ""
  const canProceedStep5 = formData.focus.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Main Landing Page Content */}
      <div className={`transition-all duration-500 ${showOnboarding ? "blur-sm scale-95" : ""}`}>
        {/* Header */}
        <header className="relative z-10 px-4 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">ProductPulse</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handleBlog}
                className="backdrop-blur-sm bg-white/60 hover:bg-white/80 border border-gray-300/50 rounded-2xl text-gray-700 font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Blog
              </Button>
              <Button
                variant="outline"
                onClick={handleHowItWorks}
                className="backdrop-blur-sm bg-white/60 hover:bg-white/80 border border-gray-300/50 rounded-2xl text-gray-700 font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Info className="mr-2 h-4 w-4" />
                How It Works
              </Button>
              <Button
                onClick={handleGetStarted}
                className="backdrop-blur-sm bg-gradient-to-r from-blue-600/90 to-indigo-700/90 hover:from-blue-500/95 hover:to-indigo-600/95 border border-gray-300/30 rounded-2xl text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Get Started
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative z-10 px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center backdrop-blur-sm bg-white/60 border border-gray-200/50 rounded-full px-4 py-2 mb-6 shadow-lg">
                <span className="text-sm font-medium text-gray-700">
                  🔥 SECRET WEAPON: Get winning products before your competition!
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
                <span className="whitespace-nowrap">
                  Discover{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent relative inline-block min-w-[400px] text-left">
                    {displayText}
                    <span className="animate-pulse text-blue-600 ml-1">|</span>
                  </span>
                </span>
                <br />
                <div className="mt-4">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Via Email
                  </span>
                </div>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Get personalized product recommendations and market insights delivered straight to your inbox. Start
                with a free demo newsletter to see what you've been missing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="h-16 px-12 text-lg backdrop-blur-sm bg-gradient-to-r from-blue-600/90 to-indigo-700/90 hover:from-blue-500/95 hover:to-indigo-600/95 border border-gray-300/30 rounded-2xl text-white font-medium transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Free Demo <Mail className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2 text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">No credit card required</span>
              </div>
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


          </div>
        </section>

        {/* Product Intelligence Section */}
        <section className="relative z-10 px-4 py-20 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Powerful
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}
                  Product Intelligence
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our AI-powered system analyzes millions of products to deliver actionable insights
              </p>
            </div>

            <div className="max-w-4xl mx-auto mb-16">
              {/* Centered AI Content */}
              <div className="backdrop-blur-xl bg-white/70 border border-gray-200/50 rounded-3xl p-12 shadow-xl text-center">
                <div className="flex items-center justify-center space-x-3 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center">
                    <Search className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Advanced Product Intelligence System</h3>
                </div>
                
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 rounded-full px-6 py-3 mb-8">
                  <span className="text-sm font-medium text-blue-800">DATA-DRIVEN PRODUCT DISCOVERY</span>
                </div>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Our machine learning algorithms analyze millions of data points across e-commerce platforms to identify 
                  <strong className="text-blue-600"> high-performing products with validated market demand</strong>. 
                  We provide comprehensive market intelligence including <strong className="text-gray-900">performance metrics, marketing assets, and creator partnerships</strong> 
                  that have demonstrated measurable success in current market conditions.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Package className="h-4 w-4 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Validated Market Opportunities</h4>
                    </div>
                    <div className="space-y-3 text-left">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Products with demonstrated revenue performance</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Successful marketing content and messaging strategies</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Creator performance data and partnership insights</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">Predictive Market Analysis</h4>
                    </div>
                    <div className="space-y-3 text-left">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Early identification of emerging market trends</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Real-time analysis of transaction and engagement data</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Statistical models for demand forecasting</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Comprehensive Market Intelligence</h4>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Our platform provides complete market analysis including <strong>performance-tested marketing assets, engagement metrics, and partnership data</strong> from successful campaigns. 
                    This enables data-driven decision making based on validated market evidence.
                  </p>
                  <div className="bg-white/60 rounded-xl p-4">
                    <p className="text-lg font-medium text-gray-800">
                      Reduce time-to-market and validation risk through evidence-based product selection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </section>

        {/* Features Section */}
        <section className="relative z-10 px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Everything you need
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}
                  in your inbox
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our AI-powered newsletters deliver personalized insights and opportunities directly to you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="backdrop-blur-xl bg-white/70 border border-gray-200/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-2xl flex items-center justify-center mb-6">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="relative z-10 px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="backdrop-blur-xl bg-white/70 border border-gray-200/50 rounded-3xl p-12 shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ready to discover your next
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}
                  big opportunity?
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of successful entrepreneurs who get winning product ideas delivered to their inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="h-16 px-12 text-lg backdrop-blur-sm bg-gradient-to-r from-blue-600/90 to-indigo-700/90 hover:from-blue-500/95 hover:to-indigo-600/95 border border-gray-300/30 rounded-2xl text-white font-medium transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Free Demo <Mail className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={handleHowItWorks}
                  size="lg"
                  className="h-16 px-8 text-lg backdrop-blur-sm bg-white/60 hover:bg-white/80 border border-gray-300/50 rounded-2xl text-gray-700 font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Info className="mr-2 h-5 w-5" />
                  How It Works
                </Button>
              </div>
              <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Free demo newsletter</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Unsubscribe anytime</span>
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
            <p className="text-gray-600">Made With ❤️ By ProductPulse 2025 ©️ All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
