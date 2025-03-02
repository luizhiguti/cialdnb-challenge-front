import { SearchProvider } from "@/contexts/search/searchContext";

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SearchProvider>{children}</SearchProvider>;
}
