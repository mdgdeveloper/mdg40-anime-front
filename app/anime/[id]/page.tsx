import Image from "next/image"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Button } from "@/components/ui/button"
type Props = {
    params: {
        id: string
    }
}

const AnimePage = async (props: Props) => {
    const id = props.params.id

    const clientID = process.env.CLIENTID || "notfound"

    const response = await fetch(`https://api.myanimelist.net/v2/anime/${id}?fields=id,synopsis,title,main_picture,mean,genres,num_episodes,average_episode_duration`, {
        headers: {
            'X-MAL-CLIENT-ID': clientID, // Replace with your actual access token
        },
    });

    const anime = await response.json()

    const CalculateDuration = (duration: number) => {
        if(duration < 60*60){
            const minutes = Math.floor(duration / 60)
            return ` ${minutes}m`
        }else{
            // Convert seconds to hours and minutes
            const hours = Math.floor(duration / 3600)
            const minutes = Math.floor((duration - (hours * 3600)) / 60)
            return `${hours}h ${minutes}m`
        }
    }


    return (
        <section className="w-10/12 py-10">
            <Card>
                <CardHeader>
                </CardHeader>
                <CardContent className="pl-12">
                    <Breadcrumb className="mb-5">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink className="text-xl" href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink className="text-xl" href="/anime">Anime List</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-xl">{anime.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex gap-8">
                        <Image className="rounded-lg shadow" src={anime.main_picture.large} alt={anime.title} width={500} height={500} />
                        <div>
                            <h4 className="text-3xl font-semibold">{anime.title}</h4>
                            <div className="mt-2">
                                {anime.genres.map((genre: any) => {
                                    return (
                                        <span key={genre.id} className="text-sm bg-gray-200 px-2 py-1 rounded-lg mr-2">{genre.name}</span>
                                    )

                                })}
                            </div>
                            <div className={`mt-5 px-3 py-2 ${anime.mean > 8.5 ? "bg-green-300" : ""} ${anime.mean < 8.5 && anime.mean > 6 ? "bg-orange-400" : ""} 
                            ${anime.mean < 6 ? "bg-red-400" : ""}
                            inline-block rounded-lg`}>{anime.mean}</div>
                            <p className="font-light text-justify mt-3 mr-10">{anime.synopsis}</p>
                            <div className="flex gap-5">
                                <div className="mt-5">
                                    <h4 className="text-sm font-semibold text-slate-400">Episodes</h4>
                                    <p className="mt-1 font-thin text-5xl text-slate-500">{anime.num_episodes}</p>
                                </div>
                                <div className="mt-5">
                                    <h4 className="text-sm font-semibold text-slate-400">Duration</h4>
                                    <p className="mt-1 font-thin text-5xl text-slate-500">{CalculateDuration(anime.average_episode_duration)}</p>
                                </div>
                            </div>
                            <Button className="mt-5">Add to Watchlist</Button>

                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <p></p>
                </CardFooter>
            </Card>
        </section>
    )
}

export default AnimePage