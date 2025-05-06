interface MenuItem {
  title: string
  links: {
    text: string
    url: string
  }[]
}

interface Footer2Props {
  logo?: {
    url: string
    src: string
    alt: string
    title: string
  }
  tagline?: string
  menuItems?: MenuItem[]
  copyright?: string
  bottomLinks?: {
    text: string
    url: string
  }[]
}

const Footer = ({
  logo = {
    src: 'https://shadcnblocks.com/images/block/block-1.svg',
    alt: 'blocks for shadcn/ui',
    title: 'Shadcnblocks.com',
    url: 'https://www.shadcnblocks.com',
  },
  // tagline = 'Components made easy.',
  menuItems = [
    {
      title: 'Product',
      links: [
        { text: 'Overview', url: '#' },
        { text: 'Pricing', url: '#' },
        { text: 'Marketplace', url: '#' },
        { text: 'Features', url: '#' },
        { text: 'Integrations', url: '#' },
        { text: 'Pricing', url: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', url: '#' },
        { text: 'Team', url: '#' },
        { text: 'Blog', url: '#' },
        { text: 'Careers', url: '#' },
        { text: 'Contact', url: '#' },
        { text: 'Privacy', url: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Help', url: '#' },
        { text: 'Sales', url: '#' },
        { text: 'Advertise', url: '#' },
      ],
    },
    {
      title: 'Social',
      links: [
        { text: 'Twitter', url: '#' },
        { text: 'Instagram', url: '#' },
        { text: 'LinkedIn', url: '#' },
      ],
    },
  ],
  copyright = '© 2024 Shadcnblocks.com. All rights reserved.',
  bottomLinks = [
    { text: 'Terms and Conditions', url: '#' },
    { text: 'Privacy Policy', url: '#' },
  ],
}: Footer2Props) => {
  return (
    <section className='py-32 bg-black text-white'>
      <div className='container'>
        <footer>
          <div className='grid grid-cols-2 gap-8 lg:grid-cols-6'>
            <div className='col-span-2 mb-8 lg:mb-0'>
              <div className='flex items-center gap-2 lg:justify-start'>
                <a href={logo.url}>
                  <img src={logo.src} alt={logo.alt} title={logo.title} className='h-10' />
                </a>
                <p className='text-xl font-semibold'>{logo.title}</p>
              </div>
              {/* <p className='mt-4 font-bold'>{tagline}</p> */}
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className='mb-4 font-bold'>{section.title}</h3>
                <ul className='space-y-4 text-gray-400'>
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className='font-medium'>
                      <a
                        href={link.url}
                        className='transition-colors duration-300 hover:text-[color:var(--color-primary-yellow)]'
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className='mt-24 flex flex-col justify-between gap-4 border-t border-gray-700 pt-8 text-sm font-medium text-gray-400 md:flex-row md:items-center'>
            <p>{copyright}</p>
            <ul className='flex gap-4'>
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <a
                    href={link.url}
                    className='underline transition-colors duration-300 hover:text-[color:var(--color-secondary-yellow)]'
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  )
}

export { Footer }
