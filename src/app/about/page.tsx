import Header from '../components/Header';
export const metadata = {
    title: 'About - Book Exchange Application'
};

export default function AboutPage() {
    const subtitle = "About This Project";
    const description = "BEA was created to make it easier for people to share books with others in their community. Think of it as a digital book-sharing shelf: one where you can leave a book you love, take one you’re curious about, or just see what others are reading. No fees, no accounts, just stories moving from hand to hand. It’s simple, honest, and a little nerdy. But we like it that way.";
    const author = 'Developed by people who still dog-ear pages (sorry, librarians)';
    return (
        <>
            <Header subtitle={subtitle} />
            <div className="container mx-auto my-8 px-4 space-y-4">
                <p className="text-lg">{description}</p>
                <p className="text-md">{author}</p>
            </div>
        </>
    );
}