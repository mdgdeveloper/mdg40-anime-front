// app/api/searchAnime/route.js

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clientID = process.env.CLIENTID || "notfound"
  const q = searchParams.get('q');
  const offset = searchParams.get('offset')?.toString() || '0';
  const url = `https://api.myanimelist.net/v2/anime?offset=${offset}&q="${q}"&limit=14&fields=id,title,main_picture,mean,genres,num_episodes`
  const response = await fetch(url, {
    headers: {
      'X-MAL-CLIENT-ID': clientID, // Replace with your actual access token
    },
  });

  if (!response.ok) {
    return NextResponse.json({ message: 'Error fetching data' }, { status: response.status });
  }
  console.log(`https://api.myanimelist.net/v2/anime?offset=${offset}&q=${q}&limit=14&fields=id,title,main_picture,mean,genres,num_episodes`)
  const data = await response.json();
  console.log(data)
  return NextResponse.json(data);


}
