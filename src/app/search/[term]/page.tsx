import { notFound } from "next/navigation";
type PropsType = {
  params: {
    term: string;
  };
};

function SearchPage({ params }: PropsType) {
  const { term } = params;

  if (!term) notFound();

  const termToUse = decodeURI(term);

  // API call to get the SEARCHED movies
  // API call to get the POPULAR movies

  return <div>Welcome to the search page: {termToUse}</div>;
}

export default SearchPage;
