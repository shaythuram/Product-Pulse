"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TrendingUp, Search, Calendar, User, Clock, Eye, Tag, ArrowLeft, Plus, X, Send } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  views: number
  category: string
  tags: string[]
  featured: boolean
}

const samplePosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Trending Products That Are Dominating E-commerce in 2025",
    excerpt:
      "Discover the hottest products that are generating massive sales across multiple platforms. From smart home devices to sustainable fashion, these products are reshaping the market.",
    content: `# 10 Trending Products That Are Dominating E-commerce in 2025

The e-commerce landscape is constantly evolving, and staying ahead of trends is crucial for success. After analyzing millions of data points across major platforms, we've identified the top 10 products that are absolutely crushing it in 2025.

## 1. Smart Home Security Systems

With home security becoming a top priority, smart security systems have seen a 340% increase in sales. These systems offer:
- AI-powered threat detection
- Mobile app integration
- Easy DIY installation
- Affordable monthly monitoring

## 2. Sustainable Fashion Accessories

Eco-conscious consumers are driving demand for sustainable fashion items:
- Recycled material handbags (+250% growth)
- Bamboo fiber clothing (+180% growth)
- Vegan leather products (+220% growth)

## 3. Fitness Tech Wearables

The health and fitness trend continues strong:
- Smart fitness rings
- Heart rate monitoring patches
- Sleep optimization devices
- Recovery tracking tools

## 4. Kitchen Automation Tools

Smart kitchen gadgets are revolutionizing home cooking:
- AI-powered meal planners
- Automated spice dispensers
- Smart food storage systems
- Voice-controlled cooking assistants

## 5. Pet Tech Products

Pet owners are investing heavily in technology for their furry friends:
- GPS pet trackers (+300% growth)
- Automated feeding systems
- Pet health monitoring devices
- Interactive pet toys

The key to success with these trending products is timing and positioning. Get in early, understand your target market, and focus on quality suppliers.`,
    author: "Sarah Chen",
    date: "2025-01-15",
    readTime: "8 min read",
    views: 2847,
    category: "Product Research",
    tags: ["trending", "ecommerce", "2025", "products"],
    featured: true,
  },
  {
    id: "2",
    title: "How to Validate Product Ideas Before Investing Your Money",
    excerpt:
      "Learn the proven strategies successful entrepreneurs use to test product viability without breaking the bank. Avoid costly mistakes with these validation techniques.",
    content: `# How to Validate Product Ideas Before Investing Your Money

One of the biggest mistakes new entrepreneurs make is falling in love with a product idea without properly validating it. Here's how to test your ideas systematically.

## The 5-Step Validation Framework

### 1. Market Research Analysis
- Use Google Trends to check search volume
- Analyze competitor pricing and positioning
- Study Amazon reviews for similar products
- Check social media engagement levels

### 2. Landing Page Testing
Create a simple landing page and measure:
- Email signup conversion rates
- Time spent on page
- Click-through rates to "buy now" buttons
- Social sharing activity

### 3. Social Media Validation
- Post about your product idea
- Run targeted ads to gauge interest
- Monitor engagement rates
- Collect feedback through comments

### 4. Pre-order Campaigns
- Launch a pre-order campaign
- Set a minimum order threshold
- Track conversion rates
- Analyze customer feedback

### 5. Minimum Viable Product (MVP)
- Create a basic version
- Test with a small audience
- Gather detailed feedback
- Iterate based on results

## Red Flags to Watch For

- Low search volume for related keywords
- Saturated market with established players
- High customer acquisition costs
- Negative feedback on similar products
- Seasonal demand only

## Green Lights for Success

- Growing search trends
- Underserved market segments
- Strong social media engagement
- Positive pre-order response
- Clear value proposition

Remember: validation is an ongoing process, not a one-time check.`,
    author: "Mike Rodriguez",
    date: "2025-01-12",
    readTime: "6 min read",
    views: 1923,
    category: "Business Strategy",
    tags: ["validation", "startup", "research", "strategy"],
    featured: false,
  },
  {
    id: "3",
    title: "The Psychology Behind Viral Products: What Makes Customers Buy",
    excerpt:
      "Understand the psychological triggers that drive purchasing decisions. Learn how to apply these principles to make your products irresistible to customers.",
    content: `# The Psychology Behind Viral Products: What Makes Customers Buy

Understanding consumer psychology is the secret weapon of successful product marketers. Here are the key psychological principles that drive viral product success.

## 1. Social Proof Phenomenon

Humans are social creatures who look to others for validation:
- Customer reviews and ratings
- User-generated content
- Influencer endorsements
- "Best seller" badges
- Social media mentions

## 2. Scarcity and Urgency

Limited availability creates desire:
- Limited time offers
- Low stock notifications
- Exclusive access
- Seasonal availability
- Flash sales

## 3. Loss Aversion

People hate losing more than they love gaining:
- "Don't miss out" messaging
- Comparison with competitors
- Highlighting what they'll lose
- Risk reversal guarantees
- Money-back promises

## 4. Anchoring Effect

The first price customers see influences all future decisions:
- Show higher-priced options first
- Use "was/now" pricing
- Bundle products strategically
- Create premium versions
- Offer payment plans

## 5. Reciprocity Principle

When you give first, customers feel obligated to give back:
- Free samples or trials
- Valuable content
- Helpful customer service
- Surprise bonuses
- Educational resources

## 6. Authority and Expertise

People trust experts and authorities:
- Expert endorsements
- Certifications and awards
- Media mentions
- Professional associations
- Scientific backing

## Applying These Principles

1. **Audit your current messaging** - Which principles are you using?
2. **Test different approaches** - A/B test psychological triggers
3. **Monitor customer feedback** - What resonates with your audience?
4. **Combine multiple principles** - Layer different triggers together
5. **Stay authentic** - Don't manipulate, genuinely help customers

The most successful products tap into multiple psychological triggers while maintaining authenticity and delivering real value.`,
    author: "Emma Thompson",
    date: "2025-01-10",
    readTime: "7 min read",
    views: 3156,
    category: "Marketing Psychology",
    tags: ["psychology", "marketing", "viral", "customers"],
    featured: true,
  },
]

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(samplePosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    tags: [],
    featured: false,
  })
  const [tagInput, setTagInput] = useState("")

  const categories = ["all", "Product Research", "Business Strategy", "Marketing Psychology", "Trends", "Case Studies"]

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = posts.filter((post) => post.featured)

  const handleLogin = () => {
    if (loginData.email === "trendtuneai@gmail.com" && loginData.password === "ShayIsCool123") {
      setIsAuthenticated(true)
      setShowLoginModal(false)
      setShowAdminModal(true)
    } else {
      alert("Invalid credentials")
    }
  }

  const handleAddPost = () => {
    if (!newPost.title || !newPost.content || !newPost.author) {
      alert("Please fill in all required fields")
      return
    }

    const post: BlogPost = {
      id: Date.now().toString(),
      title: newPost.title!,
      excerpt: newPost.excerpt || newPost.content.substring(0, 150) + "...",
      content: newPost.content!,
      author: newPost.author!,
      date: new Date().toISOString().split("T")[0],
      readTime: Math.ceil(newPost.content!.split(" ").length / 200) + " min read",
      views: 0,
      category: newPost.category || "General",
      tags: newPost.tags || [],
      featured: newPost.featured || false,
    }

    setPosts([post, ...posts])
    setNewPost({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
      tags: [],
      featured: false,
    })
    setTagInput("")
    setShowAdminModal(false)
    alert("Blog post added successfully!")
  }

  const addTag = () => {
    if (tagInput.trim() && !newPost.tags?.includes(tagInput.trim())) {
      setNewPost({
        ...newPost,
        tags: [...(newPost.tags || []), tagInput.trim()],
      })
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setNewPost({
      ...newPost,
      tags: newPost.tags?.filter((tag) => tag !== tagToRemove) || [],
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
                className="backdrop-blur-sm bg-white/60 hover:bg-white/80 border border-gray-300/50 rounded-2xl text-gray-700 font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-900">ProductPulse</span>
                  <div className="text-lg font-semibold text-gray-700">Blog</div>
                </div>
              </div>
            </div>
          </div>

          {/* Secret Admin Button - positioned under "Blog" text */}
          <button
            onClick={() => setShowLoginModal(true)}
            className="absolute top-20 left-[180px] w-8 h-8 bg-gray-200/20 hover:bg-gray-300/40 rounded-lg transition-all duration-300 opacity-10 hover:opacity-30 flex items-center justify-center group"
            title="Admin Panel"
          >
            <div className="w-2 h-2 bg-gray-400 rounded-full group-hover:bg-gray-600"></div>
          </button>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Product Research
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                Insights
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay ahead of the competition with expert insights, trending product analysis, and proven strategies for
              e-commerce success.
            </p>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <section className="relative z-10 px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/70 border border-gray-200/50 rounded-3xl p-8 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg backdrop-blur-sm bg-white/50 border border-gray-300/50 rounded-2xl"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 h-14 text-lg backdrop-blur-sm bg-white/50 border border-gray-300/50 rounded-2xl">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-base py-3">
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="relative z-10 px-4 mb-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post) => (
                <article
                  key={post.id}
                  className="backdrop-blur-xl bg-white/70 border border-gray-200/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {selectedCategory === "all" ? "All Articles" : selectedCategory}
          </h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="backdrop-blur-xl bg-white/70 border border-gray-200/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{post.excerpt}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs"
                      >
                        <Tag className="h-3 w-3" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="backdrop-blur-xl bg-white/70 border border-gray-200/50 rounded-3xl p-12 shadow-xl">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="backdrop-blur-xl bg-white/90 border border-gray-200/50 rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Admin Login</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="mt-2"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Admin Modal */}
      <Dialog open={showAdminModal} onOpenChange={setShowAdminModal}>
        <DialogContent className="backdrop-blur-xl bg-white/90 border border-gray-200/50 rounded-3xl shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Add New Blog Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newPost.title || ""}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="mt-2"
                  placeholder="Enter blog post title"
                />
              </div>
              <div>
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  value={newPost.author || ""}
                  onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                  className="mt-2"
                  placeholder="Author name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={newPost.excerpt || ""}
                onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                className="mt-2"
                placeholder="Brief description of the article"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newPost.category || ""}
                  onValueChange={(value) => setNewPost({ ...newPost, category: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 mt-8">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newPost.featured || false}
                  onChange={(e) => setNewPost({ ...newPost, featured: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="featured">Featured Post</Label>
              </div>
            </div>

            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {newPost.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    <span>{tag}</span>
                    <button onClick={() => removeTag(tag)} className="hover:text-blue-600">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button onClick={addTag} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="content">Content * (Markdown supported)</Label>
              <Textarea
                id="content"
                value={newPost.content || ""}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="mt-2 min-h-[300px]"
                placeholder="Write your blog post content here. You can use Markdown formatting."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setShowAdminModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPost}>
                <Send className="mr-2 h-4 w-4" />
                Publish Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
