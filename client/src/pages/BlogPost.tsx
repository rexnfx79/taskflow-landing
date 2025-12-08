import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";

interface BlogPostData {
  slug: string;
  title: string;
  excerpt?: string;
  date: string;
  author: string;
  tags?: string[];
  featuredImage?: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params?.slug) return;

    fetch(`/api/blog/${params.slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Post not found");
        }
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog post:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [params?.slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-8">{error || "The blog post you're looking for doesn't exist."}</p>
        <Link href="/blog">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

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
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          <article>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-primary/10 text-primary text-sm font-medium"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {post.featuredImage && (
                <div className="rounded-xl overflow-hidden mb-8">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <Card className="glass-card border-white/5">
              <CardContent className="p-8 md:p-12">
                <div
                  className="prose prose-invert prose-lg max-w-none
                    prose-headings:text-foreground
                    prose-p:text-muted-foreground
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground
                    prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                    prose-pre:bg-card prose-pre:border prose-pre:border-white/10
                    prose-blockquote:border-primary/50 prose-blockquote:text-muted-foreground
                    prose-img:rounded-lg prose-img:border prose-img:border-white/10"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </CardContent>
            </Card>
          </article>
        </div>
      </main>
    </div>
  );
}

