import { useRef } from 'react'

interface AnimatedPhotoProps {
    src: string
    alt: string
    title: string
    description: string
}

function AnimatedPhoto({ src, alt, title, description }: AnimatedPhotoProps) {
    return (
        <>
            <img
                alt={alt}
                loading='lazy'
                src={src}
                className='life-list-img group-hover:scale-105 group-focus:scale-105'
            />
            <span className='life-list-img-mask-bg group-hover:opacity-100 group-focus:opacity-100'></span>
            <span className='life-list-img-mask-frame group-hover:h-[75%] group-hover:w-[75%] group-hover:opacity-100 group-hover:backdrop-blur-[2px] group-focus:h-[75%] group-focus:w-[75%] group-focus:opacity-100' />
            <figcaption className='life-list-img-caption w-[75%] group-hover:-translate-y-1/2 group-hover:opacity-100 group-focus:-translate-y-1/2 group-focus:opacity-100'>
                <h1 className='font-medium'>{title}</h1>
                <p className='text-sm'>{description}</p>
            </figcaption>
        </>
    )
}

export function PhotoMasonry() {
    const photoGalleryRef = useRef<HTMLDivElement>(null)

    return (
        <div
            data-name='pm'
            className='mt-6 grid h-[900px] w-full grid-cols-3 grid-rows-12 gap-[12px] rounded-[4px] bg-primary-monochrome p-[12px] max-2xl:h-[1100px] max-2xl:grid-cols-2 max-mobile:h-[900px] max-mobile:grid-cols-3 max-sm:grid-cols-2 max-xs:gap-[4px] max-xs:p-0'
            ref={photoGalleryRef}
        >
            <figure tabIndex={0} className='life-list-img-wrapper group col-span-1 row-span-6'>
                <AnimatedPhoto
                    src='images/life/chess.jpeg'
                    alt='Chess in SLIET'
                    title='Chess'
                    description='Extracurricular'
                />
            </figure>
            <figure tabIndex={0} className='life-list-img-wrapper group col-span-1 row-span-3'>
                <AnimatedPhoto
                    src='images/life/puri_island.jpg'
                    alt='Overlooking the Sea from Swargadwar Beach'
                    title='Puri, Odisha'
                    description='Swargadwar Beach'
                />
            </figure>
            <figure tabIndex={0} className='life-list-img-wrapper group col-span-1 row-span-5'>
                <AnimatedPhoto
                    src='images/life/dussehra.jpg'
                    alt='A splashy image showing Dussehra celebration'
                    title='Patna'
                    description='Dussehra Celebration'
                />
            </figure>
            <figure tabIndex={0} className='life-list-img-wrapper group row-span-6'>
                <AnimatedPhoto
                    src='images/life/Banaras.jpg'
                    alt='Ganga Aarti at Banaras Ghat'
                    title='Banaras'
                    description='Ganga Aarti'
                />
            </figure>
            <figure tabIndex={0} className='life-list-img-wrapper group col-span-1 row-span-7'>
                <AnimatedPhoto
                    src='images/life/jaipur.jpg'
                    alt='The Pink City'
                    title='Jaipur'
                    description='The Pink City'
                />
            </figure>
            <figure tabIndex={0} className='life-list-img-wrapper group col-span-1 row-span-6'>
                <AnimatedPhoto
                    src='images/life/Indiagate.jpg'
                    alt='India Gate'
                    title='New Delhi'
                    description='India Gate'
                />
            </figure>
            <figure tabIndex={0} className='life-list-img-wrapper group col-span-1 row-span-3'>
                <AnimatedPhoto
                    src='images/life/srinagar.jpg'
                    alt='Snowfall'
                    title='Srinagar'
                    description='Snowfall'
                />
            </figure>
        </div>
    )
}
