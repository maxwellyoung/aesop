"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function OurStoryPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-white to-gray-100 text-black min-h-screen font-sans ">
        <header className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center bg-white bg-opacity-90 backdrop-blur-md">
          <Link href="/">
            <svg
              aria-labelledby="aesop-logo"
              className="text-black" // This ensures the SVG is black
              focusable="false"
              height="40"
              role="img"
              tabIndex={-1}
              viewBox="0 0 489.7 154.3"
              width="120"
              style={{ height: "40px", width: "120px" }}
            >
              <title id="aesop-logo">Aesop</title>
              <g fill="currentColor">
                {" "}
                {/* This will now be black due to the class above */}
                <path d="M48.6,22.5L31.8,62.2h34.2L48.6,22.5z M28.6,70.3c-3.2,7.4-9.6,21.7-14.9,42c-1.9-0.3-3.5-0.9-6.6-0.9c-3.1,0-5,0.6-7.1,0.9C14.3,81.2,38,28.9,49.4,0c1.3,0.2,2.3,0.5,4,0.5c1.4,0,2.3-0.2,3.5-0.5c12.3,33.7,47.8,111.7,48.1,112.3c-2.7-0.5-5.5-0.9-9.5-0.9c-4.2,0-7.2,0.5-10.3,0.9c-5.6-19.2-12.2-33.2-16.2-42H28.6z"></path>
                <path d="M172.4,66.6c0-5.3,0-26.6-19.2-26.6c-14,0-20.7,10.6-22.2,26.6H172.4z M130.9,73.3c0,4.5,0,13.6,4.3,21c7.4,12.1,17.8,12.5,22.5,12.5c15.7,0,23.1-9.6,25.5-13l1.9,0.4c-1,4.5-1,7.1-1.1,9.6c-7.1,6.7-16.8,10.5-29.8,10.5c-24.4,0-39.3-15.4-39.3-40.1c0-22.1,12.2-40.7,38.5-40.7c35.8,0,35.3,31.1,35.1,39.8H130.9z"></path>
                <path d="M249.6,52.1c-0.6-2.4-1.6-6.4-6.2-9.6c-3.4-2.4-7.8-2.7-10.4-2.7c-9.8,0-14.9,5.1-14.9,12c0,9.3,9.5,12.7,15.1,14.1c14.3,3.7,25.8,6.7,25.8,22.8c0,12.2-8.5,25.8-30.8,25.8c-13,0-22-5.5-23.7-6.7c2.1-3.9,3.4-10.7,3.7-12.8l1.9-0.5c1.1,2.7,2.7,7.1,8.7,10.6c4,2.4,8.2,3,11.7,3c8.4,0,16.2-4,16.2-13.2c0-9.1-5.5-10.9-22.3-16.4c-6.9-2.3-18.3-7.2-18.3-21.3c0-9.1,5.6-23.9,27.8-23.9c11.1,0,17.5,3.4,21.2,5.3c-1.6,4.2-2.7,8-3.2,13.5H249.6z"></path>
                <path d="M291.5,73.5c0,22.3,9.8,34.6,24.5,34.6c15.4,0,25.5-13.3,25.5-34.5c0-12.5-3.9-33.8-24.7-33.8C291.5,39.8,291.5,68.6,291.5,73.5 M357.9,73c0,25.5-17.6,41.5-42,41.5c-17,0-40.8-7.7-40.8-40.6c0-25,16.7-40.6,40.8-40.6 C346.3,33.4,357.9,53.4,357.9,73"></path>
                <path d="M399.4,49.6c-3.2,4-6.6,9.8-6.6,25.7c0,14.1,3.2,19.4,6.6,23.4c4.1,5,9.6,7.9,17,7.9 c22.9,0,22.9-27.1,22.9-32.3c0-24.2-11.6-33-22-33C408.7,41.2,403.1,44.9,399.4,49.6 M419.3,114.7c-15.1,0-23.6-8.3-26.2-14.9 c0,25.2-0.2,39.8,0.8,54.5c-2.4-0.6-4.5-0.9-8.4-0.9c-4,0-6.1,0.3-8.6,0.9c1.3-20.8,1.8-41.9,1.8-62.7c0-14.6-0.3-34.3-0.8-57.6 c2.2,0.5,4.8,0.9,7.9,0.9c2.9,0,5.6-0.5,7.9-0.9c-0.6,8.8-0.6,11.2-0.6,14.6c2.6-4.2,9.5-15.4,27.3-15.4c16,0,35.6,11.7,35.6,40.3 C455.9,98.8,440.3,114.7,419.3,114.7"></path>
                <rect x="131.8" y="13.5" width="44.3" height="5"></rect>
              </g>
            </svg>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/#products"
                  className="hover:text-gray-600 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="hover:text-gray-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="pt-24">
          <motion.section
            className="py-20 px-6 bg-gradient-to-r from-gray-50 to-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-6xl font-bold mb-8 bg-gradient-to-r from-black to-gray-700 text-transparent bg-clip-text"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Our Story
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-xl mb-6 leading-relaxed">
                  Aesop was established in Melbourne in 1987 with a quest to
                  create a range of superlative products for skin, hair and
                  body. We are committed to using both plant-based and
                  laboratory-made ingredients of the highest quality and proven
                  efficacy – particularly those with the greatest anti-oxidant
                  properties.
                </p>
                <p className="text-xl mb-6 leading-relaxed">
                  Our products are designed with sensory pleasure in mind, from
                  their distinctive aromas to their efficacy and tactile
                  packaging. We believe in the power of nature and science
                  working in harmony to deliver exceptional skincare solutions.
                </p>
                <p className="text-xl mb-8 leading-relaxed">
                  As we&apos;ve grown, we&apos;ve remained true to our founding
                  philosophy: to offer products of the finest quality, and to
                  advocate for the use of both natural and safe-synthetic
                  ingredients in the beauty industry.
                </p>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            className="py-20 px-6 bg-gradient-to-b from-gray-100 to-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="max-w-4xl mx-auto">
              <motion.h3
                className="text-4xl font-bold mb-8 bg-gradient-to-r from-black to-gray-700 text-transparent bg-clip-text"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Our Values
              </motion.h3>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {[
                  {
                    title: "Sustainability",
                    description:
                      "We are committed to reducing our environmental impact and promoting sustainable practices throughout our business.",
                  },
                  {
                    title: "Ethical Sourcing",
                    description:
                      "We carefully select our ingredients and partners, ensuring they align with our ethical standards and commitment to quality.",
                  },
                  {
                    title: "Innovation",
                    description:
                      "We continuously explore new formulations and technologies to deliver the most effective and pleasurable skincare experiences.",
                  },
                  {
                    title: "Community",
                    description:
                      "We believe in giving back to the communities that support us, through various initiatives and partnerships.",
                  },
                ].map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h4 className="text-2xl font-semibold mb-4">
                      {value.title}
                    </h4>
                    <p className="text-lg mb-4">{value.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            className="py-20 px-6 bg-gradient-to-t from-gray-100 to-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <motion.h3
                className="text-4xl font-bold mb-8 bg-gradient-to-r from-black to-gray-700 text-transparent bg-clip-text"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Join Us on Our Journey
              </motion.h3>
              <motion.p
                className="text-xl mb-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Experience the Aesop difference and become part of our story.
              </motion.p>
              <Link href="/#products">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-black to-gray-800 text-white hover:from-gray-800 hover:to-black transition-all duration-300"
                  >
                    Explore Our Products
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.section>
        </main>

        <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Aesop. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
