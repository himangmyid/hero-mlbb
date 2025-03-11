import ListHero from '@/list-hero/page';

export default function Home() {
  const currentYear = new Date().getFullYear();  // Ambil tahun saat ini
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ListHero /> 
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>Copyright &copy; {currentYear} <a href="http://s.id/himang" target="_blank" rel="noopener noreferrer">Himang</a></p>
      </footer>
    </div>
  );
}
