import UrlShortenerForm from "../Components/UrlShortrnerForm";


export default function ShortenerPage() {
  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">URL Shortener</h1>
      <UrlShortenerForm />
    </div>
  );
}
