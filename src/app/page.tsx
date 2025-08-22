import Header from './components/Header';

export default function HomePage() {
  return (
    <>
      <Header subtitle="A Place to Share Books and Discover New Ones"/>
      <div className="container mx-auto my-8 px-4 italic space-y-2">
        <div>📔</div>
        <p>📖 Welcome to BEA, a friendly space where anyone can lend a book, borrow one, or just browse around. We believe that books are better when they’re shared—and that stories are made to travel. Whether you’re passing along a favorite novel, a dusty old textbook, or that one weird memoir you can't stop thinking about, BEA helps it find a new reader. We’re not a bookstore or a library—we’re a little bit of both, powered by people.</p>
      </div>
    </>
  );
}
