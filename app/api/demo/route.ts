import { NextResponse } from 'next/server';


const json = [
    {
      "title": "Echo Dot (4th Gen)",
      "category": "Electronics",
      "photos": [
        "https://picsum.photos/id/10/400/400"  // Example ID for a technology-themed image.
      ],
      "description": "The latest smart speaker with Alexa. Voice control your music, get news updates, set alarms, and more.",
      "referral_code_link": "https://amazon.com/dp/B07XXX?ref=myreferralcode"
    },
    {
      "title": "Kindle Paperwhite",
      "category": "Electronics",
      "photos": [
        "https://picsum.photos/id/20/400/400"  // Example ID for a reading-themed image.
      ],
      "description": "The thinnest, lightest Kindle Paperwhite yet—with a flush-front design and 300 ppi glare-free display.",
      "referral_code_link": "https://amazon.com/dp/B07YYY?ref=myreferralcode"
    },
    {
      "title": "Instant Pot",
      "category": "Kitchen Appliances",
      "photos": [
        "https://picsum.photos/id/30/400/400"  // Example ID for a food-themed image.
      ],
      "description": "Versatile multi-cooker that can replace several kitchen appliances and speed up cooking.",
      "referral_code_link": "https://amazon.com/dp/B08ZZZ?ref=myreferralcode"
    },
    {
      "title": "Yoga Mat",
      "category": "Fitness",
      "photos": [
        "https://picsum.photos/id/40/400/400"  // Example ID for a fitness-themed image.
      ],
      "description": "Durable and non-slip yoga mat for the best yoga experience.",
      "referral_code_link": "https://amazon.com/dp/B09AAA?ref=myreferralcode"
    },
    {
      "title": "Bluetooth Headphones",
      "category": "Electronics",
      "photos": [
        "https://picsum.photos/id/50/400/400"  // Example ID for a music-themed image.
      ],
      "description": "High-quality over-ear Bluetooth headphones with noise cancellation.",
      "referral_code_link": "https://amazon.com/dp/B09BBB?ref=myreferralcode"
    }
  ]
  

export async function GET() {

    return NextResponse.json(json);
}