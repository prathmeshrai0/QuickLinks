import Link from 'next/link'
import React from 'react'
type LinkTagTypes = {
    className?: string;
    func?: <T> (args: T) => void;
    tagName: string;
    href: string;
}
const LinkTag = ({ className, func, tagName , href }: LinkTagTypes) => {
    return (
        <Link
            className={className}
            href={href}
            onClick={func}
        >
            {tagName}
        </Link>
    )
}

export default LinkTag