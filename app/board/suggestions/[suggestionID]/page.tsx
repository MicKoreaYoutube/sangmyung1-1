export default function IndexPage({
    params,
  }: {
    params: { suggestionID: string };
  }) {
    return <h1>Details about product {params.suggestionID}</h1>;
  }