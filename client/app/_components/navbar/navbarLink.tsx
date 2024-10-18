import Link from 'next/link'
import React from 'react'

export default function NavbarLink({href, children}:{href:string, children: React.ReactNode}) {
  return (
    <Link href={href}>{children}</Link>
  )
}
