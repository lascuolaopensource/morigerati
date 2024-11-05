import { type Articoli, Media } from '@/payload-types'
import ArticoliCard from './articoliCard'
import articoliUnpacker from './articoloPropsUnpack'

interface ArticleGroupProps {
  mainArticle: Articoli
  remainingArticles: Articoli[]
}

interface SmallCardsGroupProps {
  articles: Articoli[]
  startIndex: number
}

interface ArticoliGridProps {
  articoli: Articoli[]
  maxGroups?: number
}

const SmallCardsGroup = ({ articles, startIndex }: SmallCardsGroupProps) => {
  const cards = [0, 1].map((offset) => {
    const article = articles[startIndex + offset]
    if (!article) return null

    const { title, subtitle, media, slugUrl } = articoliUnpacker(article)

    return (
      <div
        key={article.id}
        className={`flex-1 transition-transform duration-200 hover:scale-[1.02] ${
          offset === 0 ? 'mb-2' : 'mt-2'
        }`}
      >
        <ArticoliCard
          title={title}
          subtitle={subtitle as string}
          media={media as Media | undefined}
          slugUrl={`/articoli/${slugUrl}`}
          size="small"
        />
      </div>
    )
  })

  return (
    <div className="w-1/2 flex flex-col pl-2">
      {cards.map(
        (card, index) =>
          card || (
            <div key={`empty-${index}`} className={`flex-1 ${index === 0 ? 'mb-2' : 'mt-2'}`} />
          ),
      )}
    </div>
  )
}

const ArticleGroup = ({ mainArticle, remainingArticles }: ArticleGroupProps) => {
  const { title, subtitle, media, slugUrl } = articoliUnpacker(mainArticle)

  return (
    <div className="flex mb-4 w-full">
      <div className="w-1/2 pr-2 transition-transform duration-200 hover:scale-[1.02]">
        <ArticoliCard
          title={title}
          subtitle={subtitle as string}
          media={media}
          slugUrl={`/articoli/${slugUrl}`}
          size="medium"
        />
      </div>
      <SmallCardsGroup articles={remainingArticles} startIndex={0} />
    </div>
  )
}

const FeaturedArticle = ({ article }: { article: Articoli }) => {
  const { title, subtitle, media, slugUrl } = articoliUnpacker(article)

  return (
    <div className="mb-6 transition-transform duration-200 hover:scale-[1.01]">
      <ArticoliCard
        title={title}
        subtitle={subtitle as string}
        media={media}
        slugUrl={`/articoli/${slugUrl}`}
        size="big"
      />
    </div>
  )
}

export default function ArticoliGrid({ articoli, maxGroups = 2 }: ArticoliGridProps) {
  if (!articoli?.length) {
    return null
  }

  const totalArticles = articoli.length
  const groupSize = 3
  const maxArticleGroups = Math.min(maxGroups, Math.floor(totalArticles / groupSize))

  const articleGroups = []
  for (let i = 0; i < maxArticleGroups; i++) {
    const startIndex = i * groupSize + 1
    const mainArticle = articoli[i * groupSize]
    const remainingArticles = articoli.slice(startIndex, startIndex + 2)

    articleGroups.push(
      <ArticleGroup
        key={mainArticle.id}
        mainArticle={mainArticle}
        remainingArticles={remainingArticles}
      />,
    )
  }

  return (
    <div className="w-full">
      {articoli[0] && <FeaturedArticle article={articoli[0]} />}
      <div className="w-full">{articleGroups}</div>
    </div>
  )
}
