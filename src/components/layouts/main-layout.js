import { MainNavbar } from '../navbars/main-navbar';

export const MainLayout = ({ children }) => {
  return (
    <article className="w-full md:flex md:flex-row md:h-screen">
      <aside>
        <MainNavbar />
      </aside>
      <main className="md:container pl-4 py-4 bg-white text-black">
        {children}
      </main>
    </article>
  );
};
