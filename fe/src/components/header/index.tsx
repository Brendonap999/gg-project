import { useState } from 'react';
import { useQuery } from 'react-query';
import { ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { getStudios } from '@/api';
import { HeaderProps } from '@/types';

export function Header({ setSelectedStudio }: HeaderProps) {
  const [scrollFocusStudio, setScrollFocusStudio] = useState<string | null>(
    null
  );

  const { data } = useQuery({
    queryKey: ['studios'],
    queryFn: async () => await getStudios(),
    select: (data) => ['All', ...data],
    refetchOnWindowFocus: false,
  });

  const handleScroll = async (direction: -1 | 1) => {
    const findCurrentStudioIndex =
      data?.findIndex((studio: string) => studio === scrollFocusStudio) ?? -1;
    const studio = data?.[findCurrentStudioIndex + direction];
    const element = document.getElementById(studio);

    if (!element) return;

    const containerEl = document.getElementById('test-wrapper');
    containerEl?.scrollTo({
      left: element.offsetLeft - 40,
      behavior: 'smooth',
    });
    setScrollFocusStudio(studio);
  };

  const handleSelectStudio = (studio: string) => {
    setSelectedStudio(studio === 'All' ? null : studio);
  };

  const showButtonRight = data && data[data.length - 1] !== scrollFocusStudio;
  const showButtonLeft = scrollFocusStudio && data?.[0] !== scrollFocusStudio;

  return (
    <div className="fixed top-0 w-full overflow-hidden z-20">
      <div className="relative flex bg-gray-800 text-white h-14">
        {showButtonLeft && (
          <div className="absolute left-0 backdrop-blur-sm bg-gray-800/10 w-12 h-14 flex justify-center items-center">
            <button className="fixed" onClick={() => handleScroll(-1)}>
              <ChevronLeftIcon width={24} height={24} />
            </button>
          </div>
        )}
        <div
          id="test-wrapper"
          className="flex gap-10 px-10 overflow-auto no-scrollbar"
        >
          {data?.map((studio: string) => (
            <button
              key={studio}
              id={studio}
              className="hover:scale-110"
              onClick={() => handleSelectStudio(studio)}
            >
              {studio}
            </button>
          ))}
        </div>
        {showButtonRight && (
          <div className="absolute right-0 w-12 h-14 flex justify-center items-center">
            <button
              className="rounded-full backdrop-blur-sm bg-gray-800/10 w-8 h-8 text-white flex justify-center items-center"
              onClick={() => handleScroll(1)}
            >
              <ChevronRightIcon width={24} height={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
