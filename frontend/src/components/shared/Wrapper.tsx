import { cn } from '@/lib/utils'
import React from 'react'

interface WrapperProps {
  children: React.ReactNode
  className?: string
}

const Wrapper: React.FC<WrapperProps> = ({ children, className }) => {
  return <div className={cn(`w-full h-full mb-10 px-[54px] flex flex-col gap-5 mt-20,  ${className}`)}>{children}</div>
}

export default Wrapper
