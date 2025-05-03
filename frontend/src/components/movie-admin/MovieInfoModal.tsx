import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Text } from '../ui/typography'

export type GenreType = {
  id?: string
  name: string
}

export type CastType = {
  id?: string
  name: string
  profilePath?: string
}

export interface MovieType {
  id?: string
  trailerSource?: string
  posterSource?: string
  release?: string
  title?: string
  voteAvg?: number
  genres?: GenreType[]
  backdropSource?: string
  description?: string
  casts?: CastType[]
  voteCount?: number
}

// Sample data for genres and casts (thay bằng API thực tế)
const availableGenres: GenreType[] = [
  { id: '1', name: 'Action' },
  { id: '2', name: 'Sci-Fi' },
  { id: '3', name: 'Adventure' },
  { id: '4', name: 'Drama' },
  { id: '5', name: 'Comedy' },
]

const availableCasts: CastType[] = [
  { id: '1', name: 'Leonardo DiCaprio' },
  { id: '2', name: 'Keanu Reeves' },
  { id: '3', name: 'Matthew McConaughey' },
  { id: '4', name: 'Anne Hathaway' },
  { id: '5', name: 'Joseph Gordon-Levitt' },
]

// Zod schema for form validation
const movieSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  release: z.string().optional(),
  voteAvg: z.number().min(0).max(10).optional(),
  voteCount: z.number().min(0).optional(),
  description: z.string().optional(),
  trailerSource: z.string().optional(),
  posterSource: z.string().optional(),
  backdropSource: z.string().optional(),
  genres: z.array(z.object({ id: z.string().optional(), name: z.string() })).optional(),
  casts: z.array(z.object({ id: z.string().optional(), name: z.string() })).optional(),
})

type MovieFormValues = z.infer<typeof movieSchema>

interface MovieInfoModalProps {
  movie?: MovieType
  onSave?: () => void
  children?: React.ReactNode
  icon?: React.ReactNode
  title?: string
}

export function MovieInfoModal({ movie, onSave, children, icon, title }: MovieInfoModalProps) {
  const form = useForm<MovieFormValues>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      id: movie?.id || '',
      title: movie?.title || '',
      release: movie?.release || '',
      voteAvg: movie?.voteAvg,
      voteCount: movie?.voteCount,
      description: movie?.description || '',
      trailerSource: movie?.trailerSource || '',
      posterSource: movie?.posterSource || '',
      backdropSource: movie?.backdropSource || '',
      genres: movie?.genres || [],
      casts: movie?.casts || [],
    },
  })

  const onSubmit = (data: MovieFormValues) => {
    // if (data) onSave(data)
    // if (data) onSave() // Call onSave function if provided
    form.reset(data) // Reset form with current values
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`flex flex-row items-center ${title ? 'gap-2' : 'gap-0'}`}>
          {icon}
          <Text body={4} className='text-primary-dark '>
            {children || ''}
          </Text>
        </div>
      </DialogTrigger>
      <DialogContent className=' w-full  lg:px-2 h-[90vh] overflow-y-scroll '>
        <DialogHeader>
          <DialogTitle className='text-center font-bold text-2xl'>{title || 'Edit Movie'}</DialogTitle>
          <DialogDescription className='text-center text-sm text-muted-foreground'>
            Make changes to the movie information here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 px-1'>
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Title</FormLabel>
                    <FormControl>
                      <Input id='title' className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 text-right' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='release'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Release Date</FormLabel>
                    <FormControl>
                      <Input id='release' type='date' className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 text-right' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='voteAvg'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Vote Average</FormLabel>
                    <FormControl>
                      <Input
                        id='voteAvg'
                        type='number'
                        step='0.1'
                        min='0'
                        max='10'
                        className='col-span-3'
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 text-right' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='voteCount'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Vote Count</FormLabel>
                    <FormControl>
                      <Input
                        id='voteCount'
                        type='number'
                        min='0'
                        className='col-span-3'
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 text-right' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Description</FormLabel>
                    <FormControl>
                      <Textarea id='description' className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 text-right' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='trailerSource'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Trailer Source</FormLabel>
                    <FormControl>
                      <Input id='trailerSource' className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 text-right' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='posterSource'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Poster Source</FormLabel>
                    <FormControl>
                      <Input id='posterSource' className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 text-right' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='backdropSource'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Backdrop Source</FormLabel>
                    <FormControl>
                      <Input id='backdropSource' className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 text-right' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='genres'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Genres</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'col-span-3 justify-between',
                              !field.value?.length && 'text-muted-foreground',
                            )}
                          >
                            {field.value?.length ? field.value.map((g) => g.name).join(', ') : 'Select genres'}
                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[200px] p-0'>
                        <Command>
                          <CommandInput placeholder='Search genres...' />
                          <CommandList>
                            <CommandEmpty>No genres found.</CommandEmpty>
                            <CommandGroup>
                              {availableGenres.map((genre) => (
                                <CommandItem
                                  key={genre.id}
                                  value={genre.name}
                                  onSelect={() => {
                                    const currentGenres = field.value || []
                                    const isSelected = currentGenres.some((g) => g.id === genre.id)
                                    if (isSelected) {
                                      field.onChange(currentGenres.filter((g) => g.id !== genre.id))
                                    } else {
                                      field.onChange([...currentGenres, genre])
                                    }
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      field.value?.some((g) => g.id === genre.id) ? 'opacity-100' : 'opacity-0',
                                    )}
                                  />
                                  {genre.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage className='col-span-4 text-right' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='casts'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Casts</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'col-span-3 justify-between',
                              !field.value?.length && 'text-muted-foreground',
                            )}
                          >
                            {field.value?.length ? field.value.map((c) => c.name).join(', ') : 'Select casts'}
                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[200px] p-0'>
                        <Command>
                          <CommandInput placeholder='Search casts...' />
                          <CommandList>
                            <CommandEmpty>No casts found.</CommandEmpty>
                            <CommandGroup>
                              {availableCasts.map((cast) => (
                                <CommandItem
                                  key={cast.id}
                                  value={cast.name}
                                  onSelect={() => {
                                    const currentCasts = field.value || []
                                    const isSelected = currentCasts.some((c) => c.id === cast.id)
                                    if (isSelected) {
                                      field.onChange(currentCasts.filter((c) => c.id !== cast.id))
                                    } else {
                                      field.onChange([...currentCasts, cast])
                                    }
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      field.value?.some((c) => c.id === cast.id) ? 'opacity-100' : 'opacity-0',
                                    )}
                                  />
                                  {cast.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage className='col-span-4 text-right' />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type='submit' onClick={onSave}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
