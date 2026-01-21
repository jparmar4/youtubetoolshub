import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';

export async function GET() {
  return NextResponse.redirect(new URL('/feed.xml', siteConfig.url), 308);
}
