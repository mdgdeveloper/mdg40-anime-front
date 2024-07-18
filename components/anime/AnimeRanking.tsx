import Image from "next/image"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import AnimeMiniCard from "./AnimeMiniCard"


type Props = {}

const AnimeRanking = async (props: Props) => {
    const clientID = process.env.CLIENTID || "notfound"
    const response = await fetch('https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=7', {
        method: 'GET',
        headers: {
            'X-MAL-CLIENT-ID': clientID,
        },
    })

    const { data } = await response.json()




    return (
        <Card>
            <CardHeader>
                <CardTitle>Recommendations for the season</CardTitle>
                <CardDescription>The most insteresting/rated animes for the season</CardDescription>
            </CardHeader>

            <h3 className="font-semibold mb-3 text-2xl"></h3>
            <CardContent className="flex gap-4 pb-16 flex-wrap">{
                data.map((anime: any) => {
                    return (
                        <AnimeMiniCard key={anime.node.id} id={anime.node.id} cover={anime.node.main_picture.medium} title={anime.node.title} tags={anime.node.genres} episodes={anime.node.num_episodes} mean={anime.node.mean} />
                    )
                })
            }</CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    )
}

export default AnimeRanking