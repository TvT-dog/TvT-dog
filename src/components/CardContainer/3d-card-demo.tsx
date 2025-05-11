"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import useBaseUrl from '@docusaurus/useBaseUrl';
export default function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">

      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          <h1 className=" font-bold mb-2 text-right">AboutMe:</h1>
        </CardItem>
        <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 w-full text-sm  mt-2 dark:text-neutral-300"
        >

          <div className="text-left  w-full ">
            <h1 className="text-xl font-bold mb-2 ">My name is:</h1>
            <h2 className="text-4xl font-extrabold text-yellow-600 w-full text-center">F0ward</h2>
            <hr className="border-t-2 border-black my-4 w-full"/>
          </div>
          <div className="text-light text-2xl">
            <h2 className="text-3xl  font-extrabold mb-4 text-light">My：</h2>
            <h2 className="text-base font-extrabold mb-1 text-right ">Profession: Cybersecurity Engineer</h2>
            <h2 className="text-base font-extrabold mb-1 text-right ">Life Dream: To understand the world</h2>
            <h2 className="text-base font-extrabold mb-1 text-right ">Favorite Proverb: Never say never</h2>
          </div>


        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
              src={useBaseUrl('/img/person.png')}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>

      </CardBody>
    </CardContainer>
  );
}