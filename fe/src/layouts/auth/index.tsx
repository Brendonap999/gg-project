import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center gap-10 py-32">
      <h1 className="text-4xl font-bold">Game Lobby</h1>
      <Outlet />
    </div>
  );
}
