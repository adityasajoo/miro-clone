"use client"

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

type Props = {};

const SearchInput = (props: Props) => {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const [debouncedSearch] = useDebounceValue(search, 500);

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        const url = queryString.stringifyUrl({
            url: "/",
            query: {
                search: debouncedSearch
            }
        },{skipEmptyString: true, skipNull: true});
     
        router.push(url);
    },[debouncedSearch])

  return <div className="w-full relative ">
    <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4"/>
    <Input className="w-full max-w-[516px] pl-9"
    placeholder="Search boards"
    onChange={handleChange}
    />
  </div>;
};

export default SearchInput;
