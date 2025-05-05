import { EditProfileModal } from '@/components/EditProfileModal'
import FollowInteractionModal from '@/components/FollowInteractionModal'
import WatchlistCard from '@/components/WatchlistCard'
import WatchlistInformationFormModal from '@/components/WatchlistInformationFormModal'
import WatchlistItem from '@/components/WatchlistItem'
import WriteBlogTextEditor from '@/components/WriteBlogTextEditor'
import { FollowPeopleProps, RegisteredUserProps, WatchlistMovieProps } from '@/types'
import { WatchlistProps } from '@/types'
import Header from '@/components/Header'
import ForgotPasswordForm from '@/components/ForgotPasswordForm'
import VerifyOtpForm from '@/components/VerifyOtpForm'
import ResetPasswordForm from '@/components/ResetPasswordForm'
import ReportModal from '@/components/ReportModal'
import { Footer2 } from '@/components/Footer'
import { RegisteredUserType, TagType } from '@/types/index'
import { BlogPostComponentProps } from '@/components/BlogCard'
import BlogCard from '@/components/BlogCard'
import { Text } from '@/components/ui/typography'
import CommentSection from '@/components/CommentSection'

const dummyFollowers: FollowPeopleProps[] = []

const dummyFollowings = [
  { id: '1', fullName: 'Alice Johnson' },
  { id: '2', fullName: 'Benjamin Lee' },
  { id: '3', fullName: 'Carla Mendes' },
  { id: '4', fullName: 'David Kim' },
  { id: '5', fullName: 'Ella Thompson' },
  { id: '6', fullName: 'Frank Zhang' },
  { id: '7', fullName: 'Grace Patel' },
  { id: '8', fullName: 'Hector Alvarez' },
  { id: '9', fullName: 'Isla Morgan' },
  { id: '10', fullName: 'Jack O’Brien' },
  { id: '11', fullName: 'Kara Nguyen' },
  { id: '12', fullName: 'Liam Garcia' },
  { id: '13', fullName: 'Maya Wilson' },
  { id: '14', fullName: 'Noah Schroeder' },
  { id: '15', fullName: 'Olivia Rossi' },
  { id: '16', fullName: 'Peter Blake' },
  { id: '17', fullName: 'Quinn Harper' },
  { id: '18', fullName: 'Ruby Adams' },
  { id: '19', fullName: 'Samuel Cohen' },
  { id: '20', fullName: 'Tara Singh' },
  { id: '21', fullName: 'Umar Richards' },
  { id: '22', fullName: 'Violet Brooks' },
  { id: '23', fullName: 'William Knight' },
  { id: '24', fullName: 'Ximena Lopez' },
  { id: '25', fullName: 'Yara Hussein' },
  { id: '26', fullName: 'Zane Whitman' },
  { id: '27', fullName: 'Amira Becker' },
  { id: '28', fullName: 'Brian Castillo' },
  { id: '29', fullName: 'Cecilia Grant' },
  { id: '30', fullName: 'Diego Navarro' },
]

const dummyUser: RegisteredUserProps = {
  id: '12345',
  fullName: 'Delux',
  email: 'd3lxux@example.com',
  dateOfBirth: new Date('1990-01-01'),
}

const dummyWatchlist1: WatchlistProps = {
  title: 'Sci-Fi Favorites',
  description: 'A collection of the best science fiction movies.',
  isPublic: true,
  movies: [
    {
      id: '1',
      title: 'Inception',
      description: 'A mind-bending thriller about dreams within dreams.',
      posterSource: 'https://cdn.myanimelist.net/images/anime/1712/148299.jpg',
      backdropSource: 'https://image.tmdb.org/t/p/original/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
      releaseYear: '2010',
      voteAvg: 8.8,
      voteCount: 2000000,
      genres: [
        { id: '1', name: 'Sci-Fi' },
        { id: '2', name: 'Thriller' },
      ],
    },
    {
      id: '2',
      title: 'Interstellar',
      description: 'A journey through space and time to save humanity.',
      posterSource: 'https://cdn.myanimelist.net/images/anime/1712/148299.jpg',
      backdropSource: 'https://image.tmdb.org/t/p/original/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
      releaseYear: '2014',
      voteAvg: 8.6,
      voteCount: 1500000,
      genres: [
        { id: '1', name: 'Sci-Fi' },
        { id: '3', name: 'Adventure' },
      ],
    },
    {
      id: '3',
      title: 'The Matrix',
      description: 'A hacker discovers the truth about his reality.',
      posterSource: 'https://cdn.myanimelist.net/images/anime/1712/148299.jpg',
      backdropSource: 'https://image.tmdb.org/t/p/original/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
      releaseYear: '1999',
      voteAvg: 8.7,
      voteCount: 1700000,
      genres: [
        { id: '1', name: 'Sci-Fi' },
        { id: '4', name: 'Action' },
      ],
    },
    {
      id: '4',
      title: 'Blade Runner 2049',
      description: 'A sequel to the classic Blade Runner, exploring AI and humanity.',
      posterSource: 'https://cdn.myanimelist.net/images/anime/1712/148299.jpg',
      backdropSource: 'https://image.tmdb.org/t/p/original/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
      releaseYear: '2017',
      voteAvg: 8.0,
      voteCount: 1200000,
      genres: [
        { id: '1', name: 'Sci-Fi' },
        { id: '5', name: 'Drama' },
      ],
    },
  ],
}

const dummyWatchlist2: WatchlistProps = {
  title: 'Action Blockbusters',
  description:
    'An adrenaline-pumping collection of high-octane action movies that will keep you on the edge of your seat. From superhero epics to post-apocalyptic thrillers, this watchlist features some of the most iconic and explosive films in the genre, showcasing unforgettable characters, intense battles, and breathtaking stunts.',
  isPublic: false,
  movies: [
    {
      id: '5',
      title: 'The Dark Knight',
      description: 'A gritty superhero movie featuring Batman.',
      posterSource: '',
      backdropSource: '',
      releaseYear: '2008',
      voteAvg: 9.0,
      voteCount: 2500000,
      genres: [
        { id: '4', name: 'Action' },
        { id: '5', name: 'Drama' },
      ],
    },
    {
      id: '6',
      title: 'Mad Max: Fury Road',
      description: 'A post-apocalyptic action-packed thrill ride.',
      posterSource: 'https://cdn.myanimelist.net/images/anime/1712/148299.jpg',
      backdropSource: 'https://image.tmdb.org/t/p/original/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
      releaseYear: '2015',
      voteAvg: 8.1,
      voteCount: 1300000,
      genres: [
        { id: '4', name: 'Action' },
        { id: '3', name: 'Adventure' },
      ],
    },
    {
      id: '7',
      title: 'John Wick',
      description: 'A retired hitman seeks vengeance for his dog.',
      posterSource: 'https://cdn.myanimelist.net/images/anime/1712/148299.jpg',
      backdropSource: 'https://image.tmdb.org/t/p/original/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
      releaseYear: '2014',
      voteAvg: 7.4,
      voteCount: 1000000,
      genres: [
        { id: '4', name: 'Action' },
        { id: '6', name: 'Crime' },
      ],
    },
    {
      id: '8',
      title: 'Avengers: Endgame',
      description: 'The epic conclusion to the Avengers saga.',
      posterSource: 'https://cdn.myanimelist.net/images/anime/1712/148299.jpg',
      backdropSource: 'https://image.tmdb.org/t/p/original/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
      releaseYear: '2019',
      voteAvg: 8.4,
      voteCount: 2200000,
      genres: [
        { id: '4', name: 'Action' },
        { id: '7', name: 'Superhero' },
      ],
    },
  ],
}

const dummyWatchlists = [dummyWatchlist1, dummyWatchlist2]

const dummyWatchlistMovies: WatchlistMovieProps[] = [
  {
    id: '1',
    title: 'Inception',
    description:
      'A mind-bending thriller about dreams within dreams, where a skilled thief is given a chance at redemption if he can successfully perform an almost impossible task: planting an idea into someone’s subconscious. The movie explores the boundaries of reality and imagination, with stunning visuals and a gripping narrative.',
    posterSource: 'https://cdn.myanimelist.net/images/anime/1712/148299.jpg',
    backdropSource: 'https://image.tmdb.org/t/p/original/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
    releaseYear: '2010',
    voteAvg: 8.8,
    voteCount: 2000000,
    genres: [
      { id: '1', name: 'Sci-Fi' },
      { id: '2', name: 'Thriller' },
    ],
  },
  {
    id: '2',
    title: 'Interstellar',
    description:
      'A journey through space and time to save humanity, where a group of explorers ventures through a wormhole in search of a new home for mankind. The movie delves into themes of love, sacrifice, and the unyielding human spirit, with breathtaking visuals and a powerful emotional core.',
    posterSource: 'https://cdn.myanimelist.net/images/anime/1712/148299.jpg',
    backdropSource: 'https://image.tmdb.org/t/p/original/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
    releaseYear: '2014',
    voteAvg: 8.6,
    voteCount: 1500000,
    genres: [
      { id: '1', name: 'Sci-Fi' },
      { id: '3', name: 'Adventure' },
    ],
  },
]

const dummyWatchlistEdit: WatchlistProps = {
  id: '1',
  title: 'My Favorite Movies',
  description: 'A collection of my all-time favorite movies.',
  isPublic: true,
}

const dummyTags: TagType[] = [
  { id: '1', name: 'Action' },
  { id: '2', name: 'Drama' },
  { id: '3', name: 'Comedy' },
  { id: '4', name: 'Sci-Fi' },
  { id: '5', name: 'Thriller' },
]

const sampleUsers: RegisteredUserType[] = [
  {
    id: 'user-1',
    name: 'helenscchin',
  },
  {
    id: 'user-2',
    name: 'crisula_barbata',
  },
  {
    id: 'user-3',
    name: 'perthudefood',
  },
  {
    id: 'user-4',
    name: 'foodie_lover',
  },
  {
    id: 'user-5',
    name: 'chef_marcus',
  },
  {
    id: 'current-user',
    name: 'current_user',
  },
]

const sampleTags: TagType[] = [
  { id: 'tag-1', name: 'Dish' },
  { id: 'tag-2', name: 'Lifestyle' },
  { id: 'tag-3', name: 'Famous Arabic Foods' },
  { id: 'tag-4', name: 'Travel' },
  { id: 'tag-5', name: 'Recipe' },
]

const sampleBlogs = [
  {
    id: 'blog-1',
    content:
      'Exploring the best dishes from around the world. From the spicy curries of India to the delicate sushi of Japan, this blog dives into the rich and diverse culinary traditions that make each culture unique. Join us as we embark on a flavorful journey to discover the stories behind these iconic dishes and the people who create them.',
    dateCreated: '2025-05-01',
    owner: sampleUsers[0],
    tags: [sampleTags[0], sampleTags[3]],
    images: [
      'https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA',
      'https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA',
    ],
  },
  {
    id: 'blog-2',
    content:
      'Lifestyle tips for a healthier and happier life. In this blog, we share practical advice on how to maintain a balanced lifestyle, including tips on nutrition, exercise, mindfulness, and self-care. Whether you are looking to improve your physical health or find inner peace, these tips are designed to help you live your best life.',
    dateCreated: '2025-04-28',
    owner: sampleUsers[1],
    tags: [sampleTags[1]],
    images: ['https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA'],
  },
  {
    id: 'blog-3',
    content:
      'Discovering famous Arabic foods and their recipes. Arabic cuisine is known for its rich flavors and aromatic spices. In this blog, we explore the history and cultural significance of dishes like hummus, falafel, and shawarma. Learn how to prepare these traditional recipes at home and bring the taste of the Middle East to your kitchen.',
    dateCreated: '2025-04-25',
    owner: sampleUsers[2],
    tags: [sampleTags[2], sampleTags[4]],
    images: [
      'https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA',
      'https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA',
    ],
  },
  {
    id: 'blog-4',
    content:
      'Top travel destinations for food lovers. If you are a foodie with a passion for travel, this blog is for you. Discover the best destinations around the world where you can indulge in local cuisines, visit bustling food markets, and experience culinary traditions firsthand. From Italy to Thailand, these destinations are a paradise for food enthusiasts.',
    dateCreated: '2025-04-20',
    owner: sampleUsers[3],
    tags: [sampleTags[3], sampleTags[0]],
    images: ['https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA'],
  },
  {
    id: 'blog-5',
    content:
      'Chef Marcus shares his secret recipes. Renowned chef Marcus invites you into his kitchen to reveal the secrets behind his most popular dishes. From gourmet appetizers to decadent desserts, these recipes are sure to impress your family and friends. Follow along as Chef Marcus provides step-by-step instructions and tips for perfecting each dish.',
    dateCreated: '2025-04-15',
    owner: sampleUsers[4],
    tags: [sampleTags[4]],
    images: [
      'https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA',
      'https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA',
    ],
  },
]

const blogPosts: BlogPostComponentProps[] = sampleBlogs.map((blog, index) => ({
  id: blog.id,
  content: blog.content,
  dateCreated: new Date(blog.dateCreated),
  owner: blog.owner,
  tags: blog.tags,
  likes: Math.floor(Math.random() * 100),
  comments: Math.floor(Math.random() * 50),
  images: blog.images,
  showFooterBorder: true,
  isFirst: index === 0,
  isLast: index === sampleBlogs.length - 1,
}))

const TestComponent = () => {
  return (
    <>
      <div
        className='bg-cover bg-center p-5'
        style={{
          backgroundImage: "url('https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg')",
        }}
      >
        <Header />
      </div>

      <div>
        <h1>TEST</h1>
      </div>

      <div className='flex items-center justify-center'>
        <FollowInteractionModal followers={dummyFollowers} followings={dummyFollowings} />
      </div>

      <div>
        <h1>TEST</h1>
      </div>

      <div className='flex items-center justify-center'>
        <EditProfileModal
          id={dummyUser.id}
          fullName={dummyUser.fullName}
          email={dummyUser.email}
          dateOfBirth={dummyUser.dateOfBirth}
        />
      </div>

      <div>
        <h1>TEST</h1>
      </div>

      <div className='flex flex-col items-center justify-center gap-y-5'>
        {dummyWatchlists.map((watchlist) => (
          <WatchlistCard
            title={watchlist.title}
            description={watchlist.description}
            isPublic={watchlist.isPublic}
            movies={watchlist.movies}
          />
        ))}
      </div>

      <div>
        <h1>TEST</h1>
      </div>

      <div className='flex flex-col items-center justify-center gap-y-5'>
        {dummyWatchlistMovies.map((movie, index) => (
          <WatchlistItem
            index={index + 1}
            title={movie.title}
            description={movie.description}
            posterSource={movie.posterSource}
            backdropSource={movie.backdropSource}
            releaseYear={movie.releaseYear}
            voteAvg={movie.voteAvg}
            voteCount={movie.voteCount}
            genres={movie.genres}
          />
        ))}
      </div>

      <div>
        <h1>TEST</h1>
      </div>

      <div className='flex flex-col items-center justify-center gap-y-5'>
        <WatchlistInformationFormModal watchlist={dummyWatchlistEdit} isAdd={false} />
        <WatchlistInformationFormModal
          isAdd={true}
          watchlist={{ title: '', description: '', isPublic: false, movies: [] }}
        />
      </div>

      <div>
        <h1>TEST</h1>
      </div>

      <div className='flex flex-col items-center justify-center gap-y-5'>
        <WriteBlogTextEditor allTags={dummyTags} />
      </div>

      <div>
        <h1>TEST</h1>
      </div>

      <ForgotPasswordForm />

      <div>
        <h1>TEST</h1>
      </div>

      <VerifyOtpForm />

      <div>
        <h1>TEST</h1>
      </div>

      <ResetPasswordForm />

      <div>
        <h1>TEST</h1>
      </div>

      <ReportModal />

      <div>
        {blogPosts.map((post, index) => (
          <BlogCard
            key={post.id}
            id={post.id}
            content={post.content}
            dateCreated={post.dateCreated}
            owner={post.owner}
            tags={post.tags}
            likes={post.likes}
            comments={post.comments}
            images={post.images}
            isFirst={index === 0}
            isLast={index === blogPosts.length - 1}
            isShowCommentDivider={false}
          />
        ))}
      </div>

      <h1 className='text-white w-full text-center'>BLOG DETAIL</h1>
      {/*BLOG DETAIL SECTION*/}
      <div className='flex flex-col p-0 bg-secondary-dark rounded-3xl overflow-hidden'>
        <BlogCard
          id='blog-1'
          content='Exploring the best dishes from around the world. From the spicy curries of India to the delicate sushi of Japan, this blog dives into the rich and diverse culinary traditions that make each culture unique. Join us as we embark on a flavorful journey to discover the stories behind these iconic dishes and the people who create them.'
          dateCreated={new Date('2025-05-01')}
          owner={sampleUsers[0]}
          tags={[sampleTags[0], sampleTags[3]]}
          likes={Math.floor(Math.random() * 100)}
          comments={Math.floor(Math.random() * 50)}
          images={[
            'https://fastly.picsum.photos.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3bKXtNBpnM9jpz9tsxgjmmItf4NmP7DC-vQ&s',
          ]}
          isFirst={true}
          isLast={false}
          isShowCommentDivider={true}
        />
        <Text body={4} className='text-bolded text-white pt-3 pb-1 px-6'>
          Replies
        </Text>
        <CommentSection />
      </div>
      <Footer2 />
    </>
  )
}

export default TestComponent
