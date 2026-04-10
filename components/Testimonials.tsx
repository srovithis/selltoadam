"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { GoogleReview } from "@/app/api/reviews/route";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} star rating`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i <= rating ? "text-brand-gold" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

const FALLBACK_REVIEWS: GoogleReview[] = [
  {
    author_name: "Tina Nascembeni",
    rating: 5,
    time: 0,
    text: "I would highly recommend working with Adam. While assisting a friend sell his home of over 40 years, Adam and his team provided the best cash offer right from the start. Adam provided great communication and answered all questions we had without hesitation. Truly a great experience – 'take what you need, leave behind what you don't' was a great added benefit. You can't go wrong with Adam!",
  },
  {
    author_name: "Debora Winiarski",
    rating: 5,
    time: 0,
    text: "My husband and I needed to sell our house quickly, so we called Adam. He came over the next day. Adam viewed our property and the next day made a fair price and guided us through the process of selling. He's not just your average 'house flipper', he cares about you. He treated us like family. I was so impressed!! Please make that first call to Sell to Adam. He is class all the way. Big thumbs up and five stars!!",
  },
  {
    author_name: "Jacqui Copperwheat",
    rating: 5,
    time: 0,
    text: "Adam made it very easy for us to sell our parents house during an emotional time. We received a fair price. He also was good about communicating and assisting us through out the process. I would strongly recommend 'Sell to Adam'.",
  },
];

export default function Testimonials() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews?.length) {
          setReviews(data.reviews);
        } else {
          setReviews(FALLBACK_REVIEWS);
        }
      })
      .catch(() => setReviews(FALLBACK_REVIEWS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-brand-gray py-16 md:py-20">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <p className="section-label">TESTIMONIALS</p>
          <h2 className="section-heading mt-2">
            Our Clients Love Working With Us, So Will You!
          </h2>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-lg shadow-md p-6 h-64 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div
                key={`${review.author_name}-${i}`}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-brand-dark">{review.author_name}</h3>
                  <Image
                    src="/google-reviews.webp"
                    alt="Google Reviews"
                    width={80}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1">
                  {review.text}
                </p>
                <div className="mt-4">
                  <Stars rating={review.rating} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
