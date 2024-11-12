import { GetServerSideProps } from 'next'
import { loadDb } from '@/utils/db'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const collection = context.params?.collection as
    | 'itinerari'
    | 'luoghi'
    | 'stakeholders'
    | 'residenze'

  if (!collection) {
    return {
      notFound: true,
    }
  }

  const db = await loadDb()
  const doc = await db.find({
    collection: collection,
    depth: 2,
  })

  return {
    props: {
      collection,
      docs: doc.docs || [],
    },
  }
}
