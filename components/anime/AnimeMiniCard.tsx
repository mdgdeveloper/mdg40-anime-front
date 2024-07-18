import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'

type TagType = {
    id: number
    name: string
}

type Props = {
    id: string
    cover: string
    title: string
    tags: TagType[]
    episodes: number
    mean: number
}

const AnimeMiniCard = (props: Props) => {
    return (
        <div className="px-2 py-3 mt-5 h-72 w-44">
            <Link className="" href={`/anime/${props.id}`}>
                <div className="h-64 w-44 relative" >
                    <Image className="bg-black border-4 border-white rounded-lg hover:border-gray-400 cursor-pointer transition-all ease-in-out" alt={props.title} src={props.cover} fill={true} /></div></Link>
            <Link href={`/anime/${props.id}`}><h4 className="text-sm text-stone-600 font-semibold min-h-12 hover:underline">{props.title}</h4></Link>

        </div>
    )
}

export default AnimeMiniCard


