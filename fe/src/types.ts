import { UseFormReturn } from 'react-hook-form';

export type GamesType = {
  Id: string;
  GameTitle: string;
  Genre: string;
  Platform: string;
  ReleaseDate: string;
  Rating: number;
  Price: number;
  ImageUrl: string;
  Description: string;
  StudioName: string;
};

export interface HeaderProps {
  setSelectedStudio: (studio: string | null) => void;
}

export interface GamesProps {
  selectedStudio: string | null;
}

export interface GameProps {
  game: GamesType;
}

export interface AuthFormProps {
  form: UseFormReturn<
    {
      email: string;
      password: string;
    },
    unknown,
    undefined
  >;
  onSubmit: (values: { email: string; password: string }) => Promise<void>;
  children: React.ReactNode;
}
