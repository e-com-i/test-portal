'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, ArrowLeft } from 'lucide-react';

import { useEffect, useState } from 'react';
import useMobile from '@/hooks/useMobile'; // your custom hook
import { TypeAnimation } from 'react-type-animation';

const SearchProducts = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();

  const searchText = searchParams.get('q') || '';

  useEffect(() => {
    setIsSearchPage(pathname === '/search');
  }, [pathname]);

  const redirectToSearchPage = () => {
    router.push('/search');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const url = `/search?q=${value}`;
    router.push(url);
  };

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200">
      <div>
        {isMobile && isSearchPage ? (
          <button
            onClick={() => router.push('/')}
            className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md"
          >
            <ArrowLeft size={20} />
          </button>
        ) : (
          <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
            <Search size={22} />
          </button>
        )}
      </div>
      <div className="w-full h-full">
        {!isSearchPage ? (
          <div onClick={redirectToSearchPage} className="w-full h-full flex items-center cursor-pointer">
            <TypeAnimation
              sequence={[
                'Search "milk"',
                1000,
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "paneer"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "curd"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-sm text-neutral-400"
            />
          </div>
        ) : (
          <input
            type="text"
            placeholder="Search for atta, dal and more..."
            autoFocus
            defaultValue={searchText}
            className="bg-transparent w-full h-full outline-none"
            onChange={handleOnChange}
          />
        )}
      </div>
    </div>
  );
};

export default SearchProducts;
