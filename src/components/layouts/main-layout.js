import { MainNavbar } from '../navbars/main-navbar';

export const MainLayout = ({ children }) => {
  return (
    <article className="md:flex md:flex-row md:min-h-screen">
      <aside className="md:min-h-screen">
        <MainNavbar />
      </aside>
      <main className="container pl-4 py-4 bg-white md:min-h-screen text-black">
        {children}
      </main>
    </article>
  );
};
