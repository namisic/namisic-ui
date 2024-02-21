import { MainNavbar } from '../navbars/main-navbar';

export const MainLayout: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <article className="w-full md:flex md:flex-row md:h-screen">
      <aside>
        <MainNavbar />
      </aside>
      <main className="bg-white md:container md:px-4 px-2 py-4 text-black">
        {children}
      </main>
    </article>
  );
};
