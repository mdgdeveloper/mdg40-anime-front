// app/api/searchAnime/route.js

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const clientID = process.env.CLIENTID || "notfound"
    const animeId = searchParams.get('id');

    const response = await fetch(`https://api.myanimelist.net/v2/anime/${animeId}?fields=id,title,main_picture,mean,genres,num_episodes`, {
        headers: {
            'X-MAL-CLIENT-ID': clientID, // Replace with your actual access token
        },
    });

    if (!response.ok) {
        return NextResponse.json({ message: 'Error fetching data' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
}
