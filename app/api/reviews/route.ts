import { NextResponse } from "next/server";

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { error: "Missing API configuration" },
      { status: 500 }
    );
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&reviews_sort=newest&key=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch from Google Places API" },
      { status: 502 }
    );
  }

  const data = await res.json();

  if (data.status !== "OK") {
    return NextResponse.json(
      { error: `Google Places API error: ${data.status}` },
      { status: 502 }
    );
  }

  const reviews: GoogleReview[] = (data.result?.reviews ?? [])
    .sort((a: GoogleReview, b: GoogleReview) => b.rating - a.rating);

  return NextResponse.json({ reviews });
}
