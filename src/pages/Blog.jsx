import React from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Perfect Running Shoes",
    category: "Buying Guide",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    excerpt: "Find the perfect running shoes with our comprehensive guide...",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Spring Fashion Trends 2024",
    category: "Style Guide",
    date: "March 10, 2024",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    excerpt: "Discover the hottest shoe trends for Spring 2024...",
    readTime: "4 min read",
  },
  // Add more blog posts
];

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Post */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Style Guide & Blog
        </h1>
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg overflow-hidden">
          <img
            src={blogPosts[0].image}
            alt={blogPosts[0].title}
            className="w-full h-96 object-cover"
          />
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                {blogPosts[0].category}
              </span>
              <span className="text-gray-500 text-sm">{blogPosts[0].date}</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {blogPosts[0].title}
            </h2>
            <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
            <div className="flex items-center justify-between">
              <Link
                to={`/blog/${blogPosts[0].id}`}
                className="text-indigo-600 font-semibold hover:text-indigo-800"
              >
                Read More →
              </Link>
              <span className="text-gray-500 text-sm">
                {blogPosts[0].readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Categories */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
        {[
          "All",
          "Style Guide",
          "Buying Guide",
          "Care Tips",
          "Fashion Trends",
        ].map((category) => (
          <button
            key={category}
            role="button"
            tabIndex={0}
            className="px-4 py-2 bg-white rounded-full shadow-md hover:bg-indigo-50 transition-colors whitespace-nowrap"
            aria-label={`Filter by ${category}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  {post.category}
                </span>
                <span className="text-gray-500 text-sm">{post.date}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <Link
                  to={`/blog/${post.id}`}
                  className="text-indigo-600 font-semibold hover:text-indigo-800"
                >
                  Read More →
                </Link>
                <span className="text-gray-500 text-sm">{post.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
