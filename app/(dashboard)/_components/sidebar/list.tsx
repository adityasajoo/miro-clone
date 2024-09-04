"use client"

import { useOrganizationList } from "@clerk/nextjs";
import React from "react";
import Item from "./item";

type Props = {};

const List = (props: Props) => {
    const {userMemberships} = useOrganizationList({
        userMemberships:{
            infinite: true
        }
    })

    if(userMemberships.data?.length == 0){
        return null
    }

  return <ul className="space-y-4">
    {userMemberships.data?.map((membership) => (
        <Item key={membership.organization.id} id={membership.organization.id} 
        name={membership.organization.name}
        imageUrl={membership.organization.imageUrl}
        />
    ))}
  </ul>;
};

export default List;
