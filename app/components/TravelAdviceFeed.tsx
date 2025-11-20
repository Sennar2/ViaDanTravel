'use client';

import { useEffect, useState } from 'react';

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  summary: string;
}

export default function TravelAdviceFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        // Using the FCDO's general news and communications feed
        const response = await fetch('https://www.gov.uk/search/news-and-communications.atom');
        const xmlText = await response.text();
        
        // Parse XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
          throw new Error('Failed to parse feed');
        }

        const entries = xmlDoc.getElementsByTagName('entry');
        const items: FeedItem[] = [];

        for (let i = 0; i < Math.min(entries.length, 5); i++) {
          const entry = entries[i];
          const title = entry.getElementsByTagName('title')[0]?.textContent || '';
          const link = entry.getElementsByTagName('link')[0]?.getAttribute('href') || '';
          const pubDate = entry.getElementsByTagName('updated')[0]?.textContent || '';
          const summary = entry.getElementsByTagName('summary')[0]?.textContent || '';

          // Filter for travel-related content
          if (title.toLowerCase().includes('travel') || title.toLowerCase().includes('fcdo')) {
            items.push({
              title,
              link,
              pubDate: new Date(pubDate).toLocaleDateString('en-GB'),
              summary: summary.substring(0, 150) + '...',
            });
          }
        }

        setFeedItems(items.length > 0 ? items : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching feed:', err);
        setError('Unable to load travel news at this time');
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-slate">Loading latest travel news...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-slate">{error}</p>
        <p className="text-sm text-slate mt-2">
          <a href="https://www.gov.uk/foreign-travel-advice" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
            Visit FCDO Travel Advice →
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedItems.length > 0 ? (
        feedItems.map((item, index) => (
          <div key={index} className="border-l-4 border-teal pl-4 py-2">
            <p className="text-sm text-slate mb-1">{item.pubDate}</p>
            <h4 className="font-semibold text-navy mb-2 hover:text-teal transition-colors">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </h4>
            <p className="text-sm text-slate">{item.summary}</p>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-slate">
            No recent travel news available. Check the{' '}
            <a href="https://www.gov.uk/foreign-travel-advice" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
              FCDO Travel Advice
            </a>{' '}
            for the latest updates.
          </p>
        </div>
      )}
    </div>
  );
}
