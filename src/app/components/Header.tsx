// src/app/components/Header.tsx
type HeaderProps = {
  subtitle: string;
  description?: string; // Optional additional context
};

export default function Header({ subtitle, description }: HeaderProps) {
  return (
    <header className="bg-green-700 text-white py-8 text-center">
      <div className="container mx-auto px-4">
        <h1 className="font-bold text-3xl mb-2">{subtitle}</h1>
        {description && (
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}