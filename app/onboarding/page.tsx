"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Search, Package, ChevronRight, ChevronLeft, Check, X, Send, AlertCircle } from "lucide-react"
import { submitFormToNotion } from "../actions"

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

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
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

  const handleClose = () => {
    window.location.href = "/"
  }

  const handleSendDemo = async () => {
    setIsSubmitting(true)
    setSubmissionError(null)

    try {
      const result = await submitFormToNotion(formData)

      if (!result.success) {
        throw new Error(result.error || "Failed to save your information")
      }

      alert("Demo email sent! Your information has been saved. Check your inbox in the next hour.")
      window.location.href = "/"
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmissionError("There was a problem saving your information. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceedStep1 = formData.name.trim() && formData.email.trim() && formData.email.includes("@")
  const canProceedStep2 = formData.businessType !== ""
  const canProceedStep3 =
    formData.hasShopify === false ||
    (formData.hasShopify === true && formData.shopifyUrl.trim() && isValidUrl(formData.shopifyUrl))
  const canProceedStep4 = formData.industry !== ""
  const canProceedStep5 = formData.focus.length > 0

  const getProgressPercentage = () => {
    return Math.round(((currentStep + 1) / 6) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Blurred Background */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/20"></div>

      {/* Modal Container */}
      <div className="relative z-50 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl">
          {/* Modal Content */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>

            {/* Progress Header */}
            <div className="mb-8">
                          <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-700 font-medium">Step {currentStep + 1} of 6</span>
            </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>

            {/* Step 1: Name and Email */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to ProductPulse! 👋</h2>
                  <p className="text-gray-600">Let's get to know you better</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-base font-medium text-gray-900 mb-2 block">
                      What's your name?
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      className="h-14 text-lg bg-white border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-base font-medium text-gray-900 mb-2 block">
                      What's your email address?
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      className="h-14 text-lg bg-white border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={nextStep}
                    disabled={!canProceedStep1}
                    className="h-14 px-8 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Business Type */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell us about your business</h2>
                  <p className="text-gray-600">This helps us customize your newsletter content</p>
                </div>

                <div className="space-y-4">
                  <p className="text-lg font-medium text-gray-900">Are you a dropshipper or branded seller?</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => updateFormData("businessType", "dropshipper")}
                      className={`p-6 rounded-2xl border transition-all duration-300 text-left ${
                        formData.businessType === "dropshipper"
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">Dropshipper</h3>
                          <p className="text-gray-600 text-sm mt-1">I sell products without holding inventory</p>
                        </div>
                        {formData.businessType === "dropshipper" && <Check className="h-6 w-6 text-blue-600" />}
                      </div>
                    </button>

                    <button
                      onClick={() => updateFormData("businessType", "branded")}
                      className={`p-6 rounded-2xl border transition-all duration-300 text-left ${
                        formData.businessType === "branded"
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">Branded Seller</h3>
                          <p className="text-gray-600 text-sm mt-1">I have my own brand and products</p>
                        </div>
                        {formData.businessType === "branded" && <Check className="h-6 w-6 text-blue-600" />}
                      </div>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="h-14 px-8 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-medium transition-all duration-300"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" /> Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={!canProceedStep2}
                    className="h-14 px-8 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Online Store */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Do you already have an online store?</h2>
                  <p className="text-gray-600">Shopify, TikTok Shop, Amazon, your own website, etc.</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        updateFormData("hasShopify", true)
                        if (!formData.shopifyUrl) {
                          updateFormData("shopifyUrl", "")
                        }
                      }}
                      className={`p-6 rounded-2xl border transition-all duration-300 text-left ${
                        formData.hasShopify === true
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">Yes, I do</h3>
                          <p className="text-gray-600 text-sm mt-1">I have an existing online presence</p>
                        </div>
                        {formData.hasShopify === true && <Check className="h-6 w-6 text-blue-600" />}
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        updateFormData("hasShopify", false)
                        updateFormData("shopifyUrl", "")
                      }}
                      className={`p-6 rounded-2xl border transition-all duration-300 text-left ${
                        formData.hasShopify === false
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">No, not yet</h3>
                          <p className="text-gray-600 text-sm mt-1">I'm just getting started</p>
                        </div>
                        {formData.hasShopify === false && <Check className="h-6 w-6 text-blue-600" />}
                      </div>
                    </button>
                  </div>

                  <div
                    className={`transition-all duration-300 ${
                      formData.hasShopify === true ? "opacity-100" : "opacity-30 pointer-events-none"
                    }`}
                  >
                    <Label htmlFor="shopifyUrl" className="text-base font-medium text-gray-900 mb-2 block">
                      What's your store/website URL?
                    </Label>
                    <Input
                      id="shopifyUrl"
                      type="url"
                      placeholder="https://yourstore.com or https://tiktok.com/@yourshop"
                      value={formData.shopifyUrl}
                      onChange={(e) => {
                        const value = e.target.value
                        if (
                          value &&
                          !value.startsWith("http://") &&
                          !value.startsWith("https://") &&
                          value.includes(".")
                        ) {
                          updateFormData("shopifyUrl", `https://${value}`)
                        } else {
                          updateFormData("shopifyUrl", value)
                        }
                      }}
                      disabled={formData.hasShopify !== true}
                      className={`h-14 text-lg border rounded-xl text-gray-900 placeholder:text-gray-500 transition-all duration-300 ${
                        formData.hasShopify === true
                          ? "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          : "bg-gray-100 border-gray-200 cursor-not-allowed"
                      }`}
                    />
                    {formData.hasShopify === true && formData.shopifyUrl && !isValidUrl(formData.shopifyUrl) && (
                      <p className="text-red-500 text-sm mt-2">
                        Please enter a valid URL (e.g., https://yourstore.com)
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="h-14 px-8 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-medium transition-all duration-300"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" /> Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={!canProceedStep3}
                    className="h-14 px-8 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Industry */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">What industry do you focus on?</h2>
                  <p className="text-gray-600">This helps us provide relevant product recommendations</p>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="industry" className="text-base font-medium text-gray-900">
                    Select your primary industry
                  </Label>
                  <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
                    <SelectTrigger className="h-14 text-lg bg-white border border-gray-300 rounded-xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300">
                      <SelectValue placeholder="Choose an industry or start typing..." />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry} className="text-base py-3">
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="h-14 px-8 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-medium transition-all duration-300"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" /> Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={!canProceedStep4}
                    className="h-14 px-8 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Main Focus */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">What's your main focus?</h2>
                  <p className="text-gray-600">You can select multiple options that interest you</p>
                </div>

                <div className="space-y-4">
                  <p className="text-lg font-medium text-gray-900">Choose what you'd like help with:</p>

                  <div className="space-y-4">
                    {focusOptions.map((option) => {
                      const Icon = option.icon
                      const isSelected = formData.focus.includes(option.id)

                      return (
                        <button
                          key={option.id}
                          onClick={() => toggleFocus(option.id)}
                          className={`w-full p-6 rounded-2xl border transition-all duration-300 text-left ${
                            isSelected
                              ? "border-blue-500 bg-blue-50 shadow-lg"
                              : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-xl ${isSelected ? "bg-blue-100" : "bg-gray-100"}`}>
                              <Icon className={`h-6 w-6 ${isSelected ? "text-blue-600" : "text-gray-600"}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg text-gray-900">{option.label}</h3>
                                {isSelected && <Check className="h-6 w-6 text-blue-600" />}
                              </div>
                              <p className="text-gray-600 text-sm mt-1">{option.description}</p>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="h-14 px-8 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-medium transition-all duration-300"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" /> Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={!canProceedStep5}
                    className="h-14 px-8 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 6: Get Demo Email */}
            {currentStep === 5 && (
              <div className="text-center space-y-6">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <TrendingUp className="h-10 w-10 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">You're all set! 🎉</h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    We'll send you a personalized demo newsletter based on your preferences. Check your inbox within the
                    next hour!
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900">What happens next?</h3>
                  <div className="space-y-3 text-left max-w-md mx-auto">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-semibold text-sm">1</span>
                      </div>
                      <span className="text-gray-700">
                        You'll receive a demo newsletter in your inbox within 1 hour
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-semibold text-sm">2</span>
                      </div>
                      <span className="text-gray-700">Our AI will analyze your preferences and curate products</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-semibold text-sm">3</span>
                      </div>
                      <span className="text-gray-700">Enjoy your free beta access with weekly updates</span>
                    </div>
                  </div>
                </div>

                {submissionError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <p>{submissionError}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <Button
                    onClick={handleSendDemo}
                    disabled={isSubmitting}
                    className="h-16 px-12 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending Demo...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send My Demo Newsletter
                      </>
                    )}
                  </Button>

                  <div className="pt-4">
                    <p className="text-sm text-gray-600 max-w-md mx-auto">
                      Don't see the email? Check your spam folder. You can unsubscribe at any time using the link in
                      every email.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
