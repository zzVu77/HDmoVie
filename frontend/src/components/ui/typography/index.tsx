import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

// #region Title
const titleVariants = cva('scroll-m-20 font-extrabold', {
  variants: {
    level: {
      1: 'text-[32px] leading-[42px]',
      2: 'text-2xl',
      3: 'text-xl',
      4: 'text-lg leading-[26px]',
      5: 'text-base',
      6: 'text-sm',
      7: 'text-xs leading-[18px]',
      8: 'text-[10px] leading-[16px]',
    },
    color: {
      true: 'text-white',
    },
  },
  defaultVariants: {
    level: 1,
    color: true,
  },
})

type TitleVariantsPropsType = VariantProps<typeof titleVariants>

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement>, TitleVariantsPropsType {
  asChild?: boolean
}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ asChild = false, level, className, ...props }, ref) => {
    const Comp = asChild ? Slot : `h${level}`

    return (
      <Comp
        ref={ref}
        className={cn(
          titleVariants({
            level,
            className,
          }),
        )}
        {...props}
      />
    )
  },
)
Title.displayName = 'Title'
// #endregion

// #region Text
const textVariants = cva('scroll-m-20', {
  variants: {
    strong: {
      true: 'font-semibold',
    },
    italic: {
      true: 'italic',
    },
    underline: {
      true: 'underline',
    },
    mark: {
      true: 'bg-yellow-100',
    },
    code: {
      true: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    },
    delete: {
      true: 'line-through',
    },
    ellipsis: {
      true: 'overflow-ellipsis',
    },
    blockquote: {
      true: 'mt-6 border-l-2 pl-6 italic text-gray-500',
    },
    color: {
      true: 'text-white',
    },
    body: {
      1: 'text-xl',
      2: 'text-lg leading-[26px]',
      3: 'text-base',
      4: 'text-sm',
      5: 'text-xs leading-[18px]',
      6: 'text-[10px] leading-[16px]', // This is the smallest text size
    },
  },
  defaultVariants: {
    strong: false,
    italic: false,
    underline: false,
    mark: false,
    code: false,
    delete: false,
    ellipsis: false,
    blockquote: false,
    body: 4,
    color: true,
  },
})

type TextVariantsPropsType = VariantProps<typeof textVariants>

interface ParagraphProps extends React.HTMLAttributes<HTMLSpanElement>, TextVariantsPropsType {
  asChild?: boolean
}

interface BlockquoteProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement>, TextVariantsPropsType {
  asChild?: boolean
}

type TextProps = ParagraphProps | BlockquoteProps

const Text = React.forwardRef<HTMLSpanElement | HTMLElement, TextProps>(
  (
    {
      asChild = false,
      className,
      body,
      strong,
      italic,
      underline,
      mark,
      code,
      delete: del,
      ellipsis,
      blockquote,
      ...props
    },
    ref,
  ) => {
    let Comp
    if (asChild) {
      Comp = Slot
    } else if (blockquote) {
      Comp = 'blockquote'
    } else if (code) {
      Comp = 'code'
    } else if (del) {
      Comp = 'del'
    } else if (mark) {
      Comp = 'mark'
    } else if (strong) {
      Comp = 'strong'
    } else if (underline) {
      Comp = 'ins'
    } else if (italic) {
      Comp = 'em'
    } else {
      Comp = 'span'
    }

    return (
      <Comp
        ref={ref}
        className={cn(
          textVariants({
            body,
            strong,
            italic,
            underline,
            mark,
            code,
            delete: del,
            ellipsis,
            blockquote,
            className,
          }),
        )}
        {...props}
      />
    )
  },
)
Text.displayName = 'Text'
// #endregion

export {
  Text,
  textVariants,
  Title,
  titleVariants,
  type TextProps,
  type TextVariantsPropsType,
  type TitleProps,
  type TitleVariantsPropsType,
}
