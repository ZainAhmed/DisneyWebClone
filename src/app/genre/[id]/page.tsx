type PropsType = {
  params: {
    id: string;
  };
  searchParams: {
    genre: string;
  };
};
function GenrePage({ params, searchParams }: PropsType) {
  const { id } = params;
  const { genre } = searchParams;
  return <div>GenrePage</div>;
}

export default GenrePage;
