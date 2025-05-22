import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { TagType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Text } from '../ui/typography'
import blogService from '@/services/blogService'
import { toast } from 'sonner'

const blogSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  tags: z.array(z.object({ id: z.string().optional(), name: z.string() })).optional(),
  imageUrls: z.array(z.string().or(z.object({ id: z.string().optional(), url: z.string() }))).optional(),
})

export type BlogFormValues = z.infer<typeof blogSchema>

interface BlogInfoModalProps {
  tags?: TagType[]
  children?: React.ReactNode
  icon?: React.ReactNode
  onRefresh?: () => void
}

export function BlogInfoModal({ tags = [], children, icon, onRefresh }: BlogInfoModalProps) {
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      content: '',
      tags: [],
      imageUrls: [],
    },
  })

  const onSubmit = async (data: BlogFormValues) => {
    try {
      await blogService.createBlog({
        content: data.content,
        tags: data.tags || [],
        images: data.imageUrls?.map((img) => (typeof img === 'string' ? { url: img } : { url: img.url })),
      })
      toast.success('Blog created successfully!')
      form.reset()
      onRefresh?.()
    } catch (error) {
      toast.error('Failed to create blog: ' + (error as Error).message)
    }
  }

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <div className='flex flex-row items-center gap-2 cursor-pointer'>
          {icon}
          <Text body={4} className='text-primary-dark'>
            {children || ''}
          </Text>
        </div>
      </DialogTrigger>
      <DialogContent className='w-full lg:w-[70vw] lg:px-2 px-[2px] h-[90vh] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle className='text-center font-bold text-2xl'>Create New Blog</DialogTitle>
          <DialogDescription className='text-center text-sm text-muted-foreground'>
            Fill in the information to publish a new blog post.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 px-1'>
            <div className='grid gap-4 py-4'>
              {/* Content */}
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-left'>Content</FormLabel>
                    <FormControl>
                      <Textarea id='content' className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 text-left' />
                  </FormItem>
                )}
              />

              {/* Tags */}
              <FormField
                control={form.control}
                name='tags'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-left'>Tags</FormLabel>
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
                              {tags.map((tag) => (
                                <CommandItem
                                  key={tag.id}
                                  value={tag.name}
                                  onSelect={() => {
                                    const currentTags = field.value || []
                                    const isSelected = currentTags.some((t) => t.id === tag.id)
                                    field.onChange(
                                      isSelected ? currentTags.filter((t) => t.id !== tag.id) : [...currentTags, tag],
                                    )
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
                    <FormMessage className='col-span-4 text-left' />
                  </FormItem>
                )}
              />

              {/* Images */}
              <FormField
                control={form.control}
                name='imageUrls'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-left'>Images</FormLabel>
                    <div className='col-span-3 space-y-2'>
                      {field.value?.map((url, index) => {
                        const urlValue = typeof url === 'string' ? url : url.url
                        return (
                          <div key={index} className='flex items-center gap-2'>
                            <Input
                              value={urlValue}
                              onChange={(e) => {
                                const updatedUrls = [...(field.value || [])]
                                updatedUrls[index] =
                                  typeof updatedUrls[index] === 'string'
                                    ? e.target.value
                                    : { ...updatedUrls[index], url: e.target.value }
                                field.onChange(updatedUrls)
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
                        )
                      })}
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={() => field.onChange([...(field.value || []), ''])}
                      >
                        Add Image URL
                      </Button>
                    </div>
                    <FormMessage className='col-span-4 text-left' />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type='submit'>Create Blog</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
