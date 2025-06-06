export const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_DOMAIN

  if (!url) {
    url = 'http://localhost:3000'
  }

  return url
}
