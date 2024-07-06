import React, { useEffect, useState } from 'react';

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  // Simulated data for blog cards
  useEffect(() => {
    // Simulated blog data
    const simulatedBlogs = [
      {
        id: 1,
        title: "The Impact of AI on Education",
        description: "Explore how artificial intelligence is transforming the education sector and its implications for the future.",
        imageUrl: "https://picsum.photos/400/200?random=1",
        url: "https://example.com/blog/1"
      },
      {
        id: 2,
        title: "React 18: What's New?",
        description: "Discover the latest features and updates in React 18 and how they enhance front-end development.",
        imageUrl: "https://picsum.photos/400/200?random=2",
        url: "https://example.com/blog/2"
      },
      {
        id: 3,
        title: "Introduction to Blockchain Technology",
        description: "Learn the basics of blockchain technology, its applications beyond cryptocurrency, and its potential impact on various industries.",
        imageUrl: "https://picsum.photos/400/200?random=3",
        url: "https://example.com/blog/3"
      },
      {
        id: 4,
        title: "Data Science: The Future of Business Intelligence",
        description: "Explore how data science is reshaping business intelligence practices and driving data-driven decision-making.",
        imageUrl: "https://picsum.photos/400/200?random=4",
        url: "https://example.com/blog/4"
      },
      {
        id: 5,
        title: "Machine Learning Algorithms Explained",
        description: "An overview of popular machine learning algorithms, their applications, and how they work under the hood.",
        imageUrl: "https://picsum.photos/400/200?random=5",
        url: "https://example.com/blog/5"
      },
      {
        id: 6,
        title: "The Rise of Remote Work: Trends and Challenges",
        description: "Examining the trends and challenges of remote work in today's digital age, and how organizations are adapting to new work paradigms.",
        imageUrl: "https://picsum.photos/400/200?random=6",
        url: "https://example.com/blog/6"
      }
    ];

    // Set simulated data to state
    setBlogs(simulatedBlogs);
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Our Blog</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover object-center" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
              <p className="text-gray-600">{blog.description}</p>
            </div>
            <div className="p-4 bg-gray-100 border-t border-gray-200">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
