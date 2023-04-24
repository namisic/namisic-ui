import { MainNavbar } from '../navbars/MainNavbar';

export const MainLayout = ({ children }) => {
  return (
    <article className="flex flex-col md:flex-row md:min-h-screen">
      <aside className="md:min-h-screen">
        <MainNavbar />
      </aside>
      <main className="container pl-4 py-4 bg-white md:min-h-screen text-black">
        {children}
      </main>
    </article>
  );
};
