import sanity from "@sanity/client"

const sanityClient = sanity({
  projectId: "0byunyul",
  dataset: "teachers_content",
  token: "skeFzBaDaGhcffZb6SzShSUOpRU6JDR46Y8696X2ZoPvYjUU94Jhc6CIWO3hTgbnDYC9l0EDjB41IFWbRxTvAzuQnDqL1uqvKJX8R4CoAx2Y26iR5cY22FGkMuVtURtCOomDjoBWU7ZzwmWYD2c3YNAzubbluBzgRZuMkfYRWjabBqQnci3M",
})

export const getGameType = async (contentSlug: string) => {
  const query = `*[contentSlug.current == "${contentSlug}"]`

  const result = await sanityClient.fetch(query);
  return result[0]._type;
}