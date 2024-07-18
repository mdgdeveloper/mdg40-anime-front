"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "../ui/input"
import { SetStateAction, useEffect, useState } from "react"
import Image from "next/image";
import AnimeMiniCard from "./AnimeMiniCard";


import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"



type Props = {}

const AnimeSearch = (props: Props) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [offset, setOffset] = useState(0)


    const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
        setOffset(0)
        setQuery(event.target.value)
    }

    const handleSearch = async (query: string, offset: number) => {
        const response = await fetch(`/api/searchAnime?q=${query}&offset=${offset}`)
        const data = await response.json()

        setResults(data.data)
    }

    const handleClick = async (type: string) => {
        const currentOffst = offset
        if (type === "increase") setOffset(currentOffst + 14)
        if (type === "decrease") {
            if (currentOffst !== 14) setOffset(currentOffst - 14)
        }


    }

    // UseEffect for Search
    useEffect(() => {
        if (query.length > 3) {
            handleSearch(query, offset)
        } else {
            setResults([])
        }
    }, [query, offset])

    return (
        <Card className="mt-5 min-h-[650px]">
            <CardHeader>
                <CardTitle>Search</CardTitle>
                <CardDescription>The most insteresting/rated animes for the season</CardDescription>
            </CardHeader>
            <CardContent>
                <Input placeholder="Search for an anime" onChange={handleInputChange} />
                <div className="flex gap-2 flex-wrap">

                    {results && results.length > 0 && results.map((anime: any) => {
                        return (
                            <div key={anime.node.id} className="flex gap-4">
                                <AnimeMiniCard id={anime.node.id} cover={anime.node.main_picture.medium} title={anime.node.title} tags={anime.node.genres} episodes={anime.node.num_episodes} mean={anime.node.mean} />
                            </div>
                        )

                    })}
                </div>
                {results && results.length > 0 &&
                    <Pagination className="mt-24">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious className="cursor-pointer" onClick={() => handleClick("decrease")} />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext className="cursor-pointer" onClick={() => handleClick("increase")} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>}
            </CardContent >

            <CardFooter>

            </CardFooter>
        </Card >
    )
}

export default AnimeSearch