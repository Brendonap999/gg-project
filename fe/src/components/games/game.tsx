import { GameProps } from '@/types';

export function Game({ game }: GameProps) {
  return (
    <div className="relative flex flex-col items-center justify-between w-[200px] h-[200px] group border-2 border-gray-400 rounded-md cursor-pointer hover:scale-105 transition-transform hover:border-blue-600 hover:[span]>">
      <img
        className="bg-cover"
        src={game.ImageUrl}
        alt={`image-${game.StudioName}`}
        width={200}
        height={200}
      />
      <span className="absolute group-hover:text-blue-600 bottom-0">
        {game.GameTitle}
      </span>
    </div>
  );
}
