import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    // Validate date — fall back to empty string if invalid
    const parsedDate = data.date ? new Date(data.date) : null;
    const date = parsedDate && !isNaN(parsedDate.getTime())
      ? data.date
      : "";

    return {
      slug,
      title: data.title || slug,
      date,
      excerpt: data.excerpt || "",
      tags: data.tags || [],
      readingTime: stats.text,
      content,
    };
  });

  return posts.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  // Validate date — same logic as getAllPosts
  const parsedDate = data.date ? new Date(data.date) : null;
  const date = parsedDate && !isNaN(parsedDate.getTime())
    ? data.date
    : "";

  return {
    slug,
    title: data.title || slug,
    date,
    excerpt: data.excerpt || "",
    tags: data.tags || [],
    readingTime: stats.text,
    content,
  };
}
