import { useState } from 'react';

import { Header } from '@/components/header';
import { Games } from '@/components/games';

export const GameLobby = () => {
  const [selectedStudio, setSelectedStudio] = useState<string | null>(null);

  return (
    <>
      <Header setSelectedStudio={setSelectedStudio} />
      <Games selectedStudio={selectedStudio} />
    </>
  );
};
