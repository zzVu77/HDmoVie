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
import { BlogType, TagType } from './ManageBlog'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Text } from '../ui/typography'

// Sample data for tags (replace with API in real implementation)
const availableTags: TagType[] = [
  { id: '1', name: 'Avenger' },
  { id: '2', name: 'Anime' },
  { id: '3', name: 'Action' },
  { id: '4', name: 'Marvel' },
  { id: '5', name: 'DC' },
]

// Zod schema for form validation
const blogSchema = z.object({
  id: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  dateCreated: z.string().optional(),
  owner: z
    .object({
      id: z.string(),
      fullName: z.string(),
    })
    .optional(),
  tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
  imageUrls: z.array(z.string()).optional(),
})

type BlogFormValues = z.infer<typeof blogSchema>

interface BlogInfoModalProps {
  blog?: BlogType
  onSave?: (data: BlogFormValues) => void
  children?: React.ReactNode
  icon?: React.ReactNode
  title?: string
}

export function BlogInfoModal({ blog, onSave, children, icon, title }: BlogInfoModalProps) {
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      id: blog?.id || '',
      content: blog?.content || '',
      dateCreated: blog?.dateCreated || '',
      owner: blog?.owner || { id: '', fullName: '' },
      tags: blog?.tags || [],
      imageUrls: blog?.imageUrls?.map((url) => (typeof url === 'string' ? url : url.url)) || [],
    },
  })

  const onSubmit = (data: BlogFormValues) => {
    if (onSave) onSave(data)
    form.reset(data) // Reset form with current values
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`flex flex-row items-center ${title ? 'gap-2' : 'gap-0'}`}>
          {icon}
          <Text body={4} className='text-primary-dark'>
            {children || ''}
          </Text>
        </div>
      </DialogTrigger>
      <DialogContent className='w-full lg:px-2 overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle className='text-center font-bold text-2xl'>{title || 'Edit Blog'}</DialogTitle>
          <DialogDescription className='text-center text-sm text-muted-foreground'>
            Make changes to the blog information here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 px-1'>
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Content</FormLabel>
                    <FormControl>
                      <Textarea id='content' className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 text-right' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='dateCreated'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Date Created</FormLabel>
                    <FormControl>
                      <Input
                        id='dateCreated'
                        type='datetime-local'
                        className='col-span-3'
                        value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''}
                        onChange={(e) => {
                          const date = new Date(e.target.value)
                          field.onChange(date.toISOString())
                        }}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 text-right' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='owner.fullName'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Owner</FormLabel>
                    <FormControl>
                      <Input id='owner.fullName' className='col-span-3' readOnly {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 text-right' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='tags'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Tags</FormLabel>
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
                            {field.value?.length ? field.value.map((t) => t.name).join(', ') : 'Select tags'}
                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[200px] p-0'>
                        <Command>
                          <CommandInput placeholder='Search tags...' />
                          <CommandList>
                            <CommandEmpty>No tags found.</CommandEmpty>
                            <CommandGroup>
                              {availableTags.map((tag) => (
                                <CommandItem
                                  key={tag.id}
                                  value={tag.name}
                                  onSelect={() => {
                                    const currentTags = field.value || []
                                    const isSelected = currentTags.some((t) => t.id === tag.id)
                                    if (isSelected) {
                                      field.onChange(currentTags.filter((t) => t.id !== tag.id))
                                    } else {
                                      field.onChange([...currentTags, tag])
                                    }
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      field.value?.some((t) => t.id === tag.id) ? 'opacity-100' : 'opacity-0',
                                    )}
                                  />
                                  {tag.name}
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
                name='imageUrls'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Image URLs</FormLabel>
                    <div className='col-span-3 space-y-2'>
                      {field.value?.map((url, index) => (
                        <div key={index} className='flex items-center gap-2'>
                          <Input
                            value={url}
                            onChange={(e) => {
                              const currentUrls = [...(field.value || [])]
                              currentUrls[index] = e.target.value
                              field.onChange(currentUrls)
                            }}
                            placeholder='Image URL'
                          />
                          <Button
                            type='button'
                            variant='outline'
                            size='sm'
                            onClick={() => {
                              field.onChange(field.value?.filter((_, i) => i !== index))
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={() => field.onChange([...(field.value || []), ''])}
                      >
                        Add Image URL
                      </Button>
                    </div>
                    <FormMessage className='col-span-4 text-right' />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type='submit'>Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
