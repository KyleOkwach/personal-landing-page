import React from 'react';

interface ThoughtCardProps {
  title: string;
  date: string;
  excerpt: string;
  slug?: string;
}

export default function ThoughtCard({ title, date, excerpt, slug }: ThoughtCardProps) {
  return (
    <div className="rounded-2xl shadow-md p-5 bg-text/10 border border-text/30 hover:shadow-lg transition-shadow duration-200 w-full max-w-xl">
      <p className="text-xs text-text/50 mb-1">{date}</p>
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      <p className="text-sm text-text/70 mt-2 line-clamp-3">{excerpt}</p>
      {slug && (
        <a href={`/thoughts/${slug}`} className="inline-block mt-3 text-accent text-sm font-medium hover:underline">
          Read More →
        </a>
      )}
    </div>
  );
};