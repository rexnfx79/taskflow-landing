import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags?: string[];
  excerpt?: string;
  featuredImage?: string;
  image?: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/blog")
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          console.error("API error response:", text);
          throw new Error(`Failed to fetch blog posts: ${res.status}`);
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          console.error("Non-JSON response received:", contentType, text.substring(0, 200));
          throw new Error("Invalid response format: expected JSON");
        }
        return res.json();
      })
      .then((data) => {
        // Validate that data is an array
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Invalid API response:", data);
          setPosts([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog posts:", error);
        setError(error.message || "Failed to load blog posts");
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "No date";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="text-xl font-bold tracking-tight">TaskFlow</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/#features" className="hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/#pricing" className="hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="hover:text-primary transition-colors text-primary">
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="bg-primary text-white hover:bg-primary/90 font-bold">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              TaskFlow <span className="text-primary">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Tips, insights, and stories about productivity and task management
            </p>
          </div>

          {/* Blog Posts */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading posts...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts
                .filter((post) => post && post.slug) // Filter out invalid posts
                .map((post) => (
                  <Card
                    key={post.slug}
                    className="glass-card border-white/5 hover:border-primary/50 transition-all duration-300 group"
                  >
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row gap-6">
                        {(post.featuredImage || post.image) && (
                          <div className="md:w-48 h-48 rounded-lg overflow-hidden shrink-0">
                            <img
                              src={post.featuredImage || post.image}
                              alt={post.title || "Blog post"}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                            {post.date && (
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(post.date)}</span>
                              </div>
                            )}
                            {post.author && (
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>{post.author}</span>
                              </div>
                            )}
                          </div>
                          <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                            <Link href={`/blog/${post.slug}`}>{post.title || "Untitled"}</Link>
                          </h2>
                          <p className="text-muted-foreground mb-4">
                            {post.excerpt || post.description || "No description available"}
                          </p>
                          {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                                >
                                  <Tag className="h-3 w-3" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <Link href={`/blog/${post.slug}`}>
                            <Button
                              variant="ghost"
                              className="group-hover:text-primary p-0 h-auto font-medium"
                            >
                              Read more <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

