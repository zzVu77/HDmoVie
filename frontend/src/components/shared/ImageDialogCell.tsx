import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

interface ImageDialogCellProps {
  src: string
  alt: string
  smallClassName?: string
  largeClassName?: string
}

export const ImageDialogCell = ({
  src,
  alt,
  smallClassName = 'h-16 w-12',
  largeClassName = 'max-w-4xl w-full h-auto',
}: ImageDialogCellProps) => {
  if (!src) return 'N/A'

  return (
    <Dialog>
      <DialogTrigger asChild>
        <img src={src} alt={alt} className={`${smallClassName} object-cover rounded cursor-pointer mx-auto`} />
      </DialogTrigger>
      <DialogContent className='flex justify-center items-center bg-transparent border-none shadow-none'>
        <img src={src} alt={alt} className={`${largeClassName} rounded `} />
      </DialogContent>
    </Dialog>
  )
}
