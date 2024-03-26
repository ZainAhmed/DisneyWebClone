"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getGenres } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import ErrorComponent from "../ErrorComponent";
import LoadingSpinner from "../LoadingSpinner";

const GenreDropdownComponent = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getGenres"],
    queryFn: async () => await getGenres(),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      {error ? (
        <ErrorComponent errorMsg={error.message} />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="text-white flex justify-center items-center">
            Genre
            <ChevronDown className="ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-white bg-[#040714] border-[#040714]">
            <DropdownMenuLabel>Select a Genre</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Suspense fallback={<LoadingSpinner />}>
              {data?.genres.map((genre) => (
                <DropdownMenuItem key={genre.id} asChild>
                  <Link href={`/genre/${genre.id}?genre=${genre.name}`}>
                    {genre.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </Suspense>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default GenreDropdownComponent;
