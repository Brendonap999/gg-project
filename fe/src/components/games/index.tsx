import { useQuery } from 'react-query';
import { Game } from './game';
import { GamesProps, GamesType } from '@/types';
import { getGames } from '@/api';

export function Games({ selectedStudio }: GamesProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['games', selectedStudio],
    queryFn: async () => await getGames(selectedStudio),
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        loading...
      </div>
    );
  if (isError) return <div>error...</div>;

  return (
    <div className="flex justify-center pt-14">
      <div
        className="max-w-[1400px] grid gap-4 
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6 py-4"
      >
        {data.map((game: GamesType) => {
          return <Game key={`game-${game.Id}`} game={game} />;
        })}
      </div>
    </div>
  );
}
