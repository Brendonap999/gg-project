import { Suspense } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { SignIn } from './pages/sign-in';
import { Register } from './pages/register';
import { GameLobby } from './pages/game-lobby';
import { ProtectedRoute } from './components/protected-route';
import { AuthLayout } from './layouts/auth';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="">
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="" element={<ProtectedRoute />}>
        <Route
          path="/"
          element={
            <Suspense fallback={null}>
              <GameLobby />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Route>
  )
);
