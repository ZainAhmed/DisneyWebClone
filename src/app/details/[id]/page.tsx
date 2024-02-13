type PageProps = {
  params: {
    id: string;
  };
};
function Details({ params }: PageProps) {
  const { id } = params;
  return <div className="mt-[100px]">The id is {id}</div>;
}

export default Details;
