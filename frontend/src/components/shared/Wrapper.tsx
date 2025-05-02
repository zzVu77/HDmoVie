import React from 'react'

interface WrapperProps {
  children: React.ReactNode
  className?: string
}

const Wrapper: React.FC<WrapperProps> = ({ children, className }) => {
  return <div className={`w-full h-full mb-10 px-2 flex flex-col gap-5  ${className}`}>{children}</div>
}

export default Wrapper
