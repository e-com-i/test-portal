'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import noDataImage from '@/assets/images/nothing_here_yet.webp';
import Axios from '@/utils/Axios';
import SummaryApi from '@/common/SummaryApi';
import AxiosToastError from '@/utils/AxiosToastError';
import CardLoading from '@/components/shared/productNew/CardLoading';
import CardProduct from '@/components/shared/productNew/CardProduct';

const SearchPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const loadingArrayCard = new Array(10).fill(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const searchParams = useSearchParams();
  const searchText = searchParams.get('q') || ''; // ?q=your-search

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page: page,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page === 1) {
          setData(responseData.data);
        } else {
          setData((prev) => [...prev, ...responseData.data]);
        }
        setTotalPage(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1); // reset to first page when search changes
  }, [searchText]);

  useEffect(() => {
    fetchData();
  }, [page, searchText]);

  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-semibold">Search Results: {data.length}</p>

        <InfiniteScroll
          dataLength={data.length}
          hasMore={page < totalPage}
          next={handleFetchMore}
          loader={
            loading &&
            loadingArrayCard.map((_, index) => (
              <CardLoading key={'loadingsearchpage' + index} />
            ))
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4">
            {data.map((p, index) => (
              <CardProduct data={p} key={p?._id + 'searchProduct' + index} />
            ))}
          </div>
        </InfiniteScroll>

        {!data.length && !loading && (
          <div className="flex flex-col justify-center items-center w-full mx-auto">
            <Image
              src={noDataImage}
              alt="No data"
              className="w-full h-full max-w-xs max-h-xs block"
            />
            <p className="font-semibold my-2">No Data found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
