"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  Cylinder,
  Sphere,
} from "@react-three/drei";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "../components/Toast";

interface ProductModelProps {
  onClick: () => void;
}

function ProductModel({ onClick }: ProductModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Bottle body */}
      <Cylinder args={[0.5, 0.5, 2, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8B7E74" metalness={0.4} roughness={0.2} />
      </Cylinder>

      {/* Bottle neck */}
      <Cylinder args={[0.2, 0.3, 0.5, 32]} position={[0, 1.25, 0]}>
        <meshStandardMaterial color="#8B7E74" metalness={0.4} roughness={0.2} />
      </Cylinder>

      {/* Bottle cap */}
      <Cylinder args={[0.25, 0.25, 0.2, 32]} position={[0, 1.6, 0]}>
        <meshStandardMaterial color="#413F3D" metalness={0.6} roughness={0.1} />
      </Cylinder>

      {/* Pump top */}
      <Sphere args={[0.15, 16, 16]} position={[0, 1.8, 0]}>
        <meshStandardMaterial color="#413F3D" metalness={0.6} roughness={0.1} />
      </Sphere>
    </group>
  );
}

function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-white rounded-full mix-blend-difference pointer-events-none z-[60]"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    />
  );
}

interface ProductModalProps {
  product: { name: string; description: string; details: string[] } | null;
  onClose: () => void;
}

function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white text-black p-8 rounded-lg max-w-4xl w-full mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="mb-6 text-gray-600">{product.description}</p>
            <Separator className="my-4" />
            <h3 className="text-xl font-semibold mb-2">Key Benefits</h3>
            <ul className="list-disc pl-5 mb-6">
              {product.details.map((detail, index) => (
                <li key={index} className="mb-2">
                  {detail}
                </li>
              ))}
            </ul>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
          <div className="w-full md:w-1/2 h-[400px]">
            <Canvas>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <ProductModel onClick={() => {}} />
              <OrbitControls enableZoom={false} />
              <Environment preset="studio" />
            </Canvas>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AesopInnovativePage() {
  const { showToast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email") as string;

    // Here you would typically send the email to your backend
    // For this example, we'll just show a success toast
    showToast(`Thank you for subscribing with ${email}!`);

    // Reset the form
    form.reset();
  };

  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    description: string;
    details: string[];
  } | null>(null);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(useMotionValue(0), springConfig);
  const y = useSpring(useMotionValue(0), springConfig);
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    x.set(((mouseX - centerX) / centerX) * 20);
    y.set(((mouseY - centerY) / centerY) * 20);
    rotateX.set(((mouseY - centerY) / centerY) * 20);
    rotateY.set(((mouseX - centerX) / centerX) * 20);
  };

  return (
    <div
      className="bg-black text-white min-h-screen font-sans cursor-none "
      ref={containerRef}
    >
      <Cursor />
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center"
        style={{ opacity: titleOpacity }}
      >
        <Link href="/">
          <svg
            aria-labelledby="aesop-logo"
            className="text-white"
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
              <path d="M48.6,22.5L31.8,62.2h34.2L48.6,22.5z M28.6,70.3c-3.2,7.4-9.6,21.7-14.9,42c-1.9-0.3-3.5-0.9-6.6-0.9c-3.1,0-5,0.6-7.1,0.9C14.3,81.2,38,28.9,49.4,0c1.3,0.2,2.3,0.5,4,0.5c1.4,0,2.3-0.2,3.5-0.5c12.3,33.7,47.8,111.7,48.1,112.3c-2.7-0.5-5.5-0.9-9.5-0.9c-4.2,0-7.2,0.5-10.3,0.9c-5.6-19.2-12.2-33.2-16.2-42H28.6z"></path>
              <path d="M172.4,66.6c0-5.3,0-26.6-19.2-26.6c-14,0-20.7,10.6-22.2,26.6H172.4z M130.9,73.3c0,4.5,0,13.6,4.3,21c7.4,12.1,17.8,12.5,22.5,12.5c15.7,0,23.1-9.6,25.5-13l1.9,0.4c-1,4.5-1,7.1-1.1,9.6c-7.1,6.7-16.8,10.5-29.8,10.5c-24.4,0-39.3-15.4-39.3-40.1c0-22.1,12.2-40.7,38.5-40.7c35.8,0,35.3,31.1,35.1,39.8H130.9z"></path>
              <path d="M249.6,52.1c-0.6-2.4-1.6-6.4-6.2-9.6c-3.4-2.4-7.8-2.7-10.4-2.7c-9.8,0-14.9,5.1-14.9,12c0,9.3,9.5,12.7,15.1,14.1c14.3,3.7,25.8,6.7,25.8,22.8c0,12.2-8.5,25.8-30.8,25.8c-13,0-22-5.5-23.7-6.7c2.1-3.9,3.4-10.7,3.7-12.8l1.9-0.5c1.1,2.7,2.7,7.1,8.7,10.6c4,2.4,8.2,3,11.7,3c8.4,0,16.2-4,16.2-13.2c0-9.1-5.5-10.9-22.3-16.4c-6.9-2.3-18.3-7.2-18.3-21.3c0-9.1,5.6-23.9,27.8-23.9c11.1,0,17.5,3.4,21.2,5.3c-1.6,4.2-2.7,8-3.2,13.5H249.6z"></path>
              <path d="M291.5,73.5c0,22.3,9.8,34.6,24.5,34.6c15.4,0,25.5-13.3,25.5-34.5c0-12.5-3.9-33.8-24.7-33.8C291.5,39.8,291.5,68.6,291.5,73.5 M357.9,73c0,25.5-17.6,41.5-42,41.5c-17,0-40.8-7.7-40.8-40.6c0-25,16.7-40.6,40.8-40.6 C346.3,33.4,357.9,53.4,357.9,73"></path>
              <path d="M399.4,49.6c-3.2,4-6.6,9.8-6.6,25.7c0,14.1,3.2,19.4,6.6,23.4c4.1,5,9.6,7.9,17,7.9 c22.9,0,22.9-27.1,22.9-32.3c0-24.2-11.6-33-22-33C408.7,41.2,403.1,44.9,399.4,49.6 M419.3,114.7c-15.1,0-23.6-8.3-26.2-14.9 c0,25.2-0.2,39.8,0.8,54.5c-2.4-0.6-4.5-0.9-8.4-0.9c-4,0-6.1,0.3-8.6,0.9c1.3-20.8,1.8-41.9,1.8-62.7c0-14.6-0.3-34.3-0.8-57.6 c2.2,0.5,4.8,0.9,7.9,0.9c2.9,0,5.6-0.5,7.9-0.9c-0.6,8.8-0.6,11.2-0.6,14.6c2.6-4.2,9.5-15.4,27.3-15.4c16,0,35.6,11.7,35.6,40.3 C455.9,98.8,440.3,114.7,419.3,114.7"></path>
              <rect x="131.8" y="13.5" width="44.3" height="5"></rect>
            </g>
          </svg>
        </Link>
        <motion.nav
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ul className="flex space-x-6">
            <li>
              <a
                href="#products"
                className="hover:text-gray-300 transition-colors"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="#story"
                className="hover:text-gray-300 transition-colors"
              >
                Story
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-gray-300 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </motion.nav>
      </motion.header>

      <main>
        <section className="h-screen flex items-center justify-center relative overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y: backgroundY, scale: backgroundScale }}
          >
            <Image
              src="/Aesop_Collins.avif"
              alt="Aesop Collins Street"
              layout="fill"
              objectFit="cover"
              priority
            />
          </motion.div>
          <motion.div
            className="text-center relative z-10"
            style={{ y: titleY, opacity: titleOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <svg
                aria-labelledby="aesop-logo"
                className="text-white mx-auto"
                focusable="false"
                role="img"
                viewBox="0 0 489.7 154.3"
                style={{
                  width: "300px",
                  height: "auto",
                  marginBottom: "1.5rem",
                }}
              >
                <title id="aesop-logo">Aesop</title>
                <g fill="currentColor">
                  <path d="M48.6,22.5L31.8,62.2h34.2L48.6,22.5z M28.6,70.3c-3.2,7.4-9.6,21.7-14.9,42c-1.9-0.3-3.5-0.9-6.6-0.9c-3.1,0-5,0.6-7.1,0.9C14.3,81.2,38,28.9,49.4,0c1.3,0.2,2.3,0.5,4,0.5c1.4,0,2.3-0.2,3.5-0.5c12.3,33.7,47.8,111.7,48.1,112.3c-2.7-0.5-5.5-0.9-9.5-0.9c-4.2,0-7.2,0.5-10.3,0.9c-5.6-19.2-12.2-33.2-16.2-42H28.6z"></path>
                  <path d="M172.4,66.6c0-5.3,0-26.6-19.2-26.6c-14,0-20.7,10.6-22.2,26.6H172.4z M130.9,73.3c0,4.5,0,13.6,4.3,21c7.4,12.1,17.8,12.5,22.5,12.5c15.7,0,23.1-9.6,25.5-13l1.9,0.4c-1,4.5-1,7.1-1.1,9.6c-7.1,6.7-16.8,10.5-29.8,10.5c-24.4,0-39.3-15.4-39.3-40.1c0-22.1,12.2-40.7,38.5-40.7c35.8,0,35.3,31.1,35.1,39.8H130.9z"></path>
                  <path d="M249.6,52.1c-0.6-2.4-1.6-6.4-6.2-9.6c-3.4-2.4-7.8-2.7-10.4-2.7c-9.8,0-14.9,5.1-14.9,12c0,9.3,9.5,12.7,15.1,14.1c14.3,3.7,25.8,6.7,25.8,22.8c0,12.2-8.5,25.8-30.8,25.8c-13,0-22-5.5-23.7-6.7c2.1-3.9,3.4-10.7,3.7-12.8l1.9-0.5c1.1,2.7,2.7,7.1,8.7,10.6c4,2.4,8.2,3,11.7,3c8.4,0,16.2-4,16.2-13.2c0-9.1-5.5-10.9-22.3-16.4c-6.9-2.3-18.3-7.2-18.3-21.3c0-9.1,5.6-23.9,27.8-23.9c11.1,0,17.5,3.4,21.2,5.3c-1.6,4.2-2.7,8-3.2,13.5H249.6z"></path>
                  <path d="M291.5,73.5c0,22.3,9.8,34.6,24.5,34.6c15.4,0,25.5-13.3,25.5-34.5c0-12.5-3.9-33.8-24.7-33.8C291.5,39.8,291.5,68.6,291.5,73.5 M357.9,73c0,25.5-17.6,41.5-42,41.5c-17,0-40.8-7.7-40.8-40.6c0-25,16.7-40.6,40.8-40.6 C346.3,33.4,357.9,53.4,357.9,73"></path>
                  <path d="M399.4,49.6c-3.2,4-6.6,9.8-6.6,25.7c0,14.1,3.2,19.4,6.6,23.4c4.1,5,9.6,7.9,17,7.9 c22.9,0,22.9-27.1,22.9-32.3c0-24.2-11.6-33-22-33C408.7,41.2,403.1,44.9,399.4,49.6 M419.3,114.7c-15.1,0-23.6-8.3-26.2-14.9 c0,25.2-0.2,39.8,0.8,54.5c-2.4-0.6-4.5-0.9-8.4-0.9c-4,0-6.1,0.3-8.6,0.9c1.3-20.8,1.8-41.9,1.8-62.7c0-14.6-0.3-34.3-0.8-57.6 c2.2,0.5,4.8,0.9,7.9,0.9c2.9,0,5.6-0.5,7.9-0.9c-0.6,8.8-0.6,11.2-0.6,14.6c2.6-4.2,9.5-15.4,27.3-15.4c16,0,35.6,11.7,35.6,40.3 C455.9,98.8,440.3,114.7,419.3,114.7"></path>
                  <rect x="131.8" y="13.5" width="44.3" height="5"></rect>
                </g>
              </svg>
            </motion.div>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Formulations for skin, hair, home and body
            </motion.p>
          </motion.div>
        </section>

        <section id="products" className="min-h-screen py-20 px-6 relative">
          <h2 className="text-5xl font-bold mb-12 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                name: "Hand Reverence Aromatique Hand Wash",
                description:
                  "A gentle, low-foaming formulation for thoroughly cleansing hands.",
                details: [
                  "Formulated with Vetiver Root and Petitgrain",
                  "Cleanses hands without drying",
                  "Leaves skin feeling refreshed and lightly fragranced",
                ],
              },
              {
                name: "Resurrection Aromatique Hand Balm",
                description:
                  "A rich, nourishing balm that soothes and moisturizes dry hands.",
                details: [
                  "Intensely hydrating",
                  "Non-greasy formula",
                  "Delightful citrus, woody, and herbaceous aroma",
                ],
              },
              {
                name: "Geranium Leaf Body Cleanser",
                description:
                  "A gentle, invigorating cleanser for all-over body use.",
                details: [
                  "Thoroughly cleanses without drying the skin",
                  "Formulated with Geranium Leaf and Bergamot Rind",
                  "Leaves skin feeling refreshed and lightly scented",
                ],
              },
            ].map((product, index) => (
              <motion.div
                key={index}
                className="relative h-[500px] group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="h-[400px]">
                  <Canvas>
                    <ambientLight intensity={0.5} />
                    <spotLight
                      position={[10, 10, 10]}
                      angle={0.15}
                      penumbra={1}
                    />
                    <ProductModel onClick={() => setSelectedProduct(product)} />
                    <OrbitControls enableZoom={false} />
                    <Environment preset="studio" />
                  </Canvas>
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-75"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                  <p className="text-sm mb-4 opacity-80">
                    {product.description}
                  </p>
                  <Button
                    onClick={() => setSelectedProduct(product)}
                    variant="outline"
                    className="w-full text-black border-white hover:bg-white transition-colors"
                  >
                    Learn more
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        <section
          id="story"
          className="min-h-screen py-20 px-6 bg-white text-black relative overflow-hidden"
        >
          <motion.div
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-5xl font-bold mb-6">Our Story</h2>
              <p className="text-xl mb-8 leading-relaxed">
                Aesop was established in Melbourne in 1987 with a quest to
                create a range of superlative products for skin, hair and body.
                We are committed to using both plant-based and laboratory-made
                ingredients of the highest quality and proven efficacy –
                particularly those with the greatest anti-oxidant properties.
              </p>
              <Link href="/our-story">
                <Button
                  variant="outline"
                  className="text-black border-black hover:bg-black hover:text-white transition-colors"
                >
                  Discover More
                </Button>
              </Link>
            </div>
            <motion.div
              className="relative h-[600px] overflow-hidden rounded-lg"
              onMouseMove={handleMouseMove}
              style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
            >
              <Image
                src="/Aesop_Aura.jpg"
                alt="Aesop store"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(${x.get()}px) translateY(${y.get()}px)`,
                }}
              />
            </motion.div>
          </motion.div>
        </section>

        <section
          id="contact"
          className="min-h-screen py-20 px-6 bg-gray-900 relative overflow-hidden"
        >
          <motion.div
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-5xl font-bold mb-6">Stay Connected</h2>
              <p className="text-xl mb-8">
                Sign up to receive communications about Aesop products,
                services, stores, events and matters of cultural interest.
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-md bg-white bg-opacity-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </form>
            </div>
            <div className="relative h-[400px]">
              <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <ProductModel onClick={() => {}} />
                <OrbitControls enableZoom={false} />
                <Environment preset="studio" />
              </Canvas>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="bg-black text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ... (other footer content) */}
          <div>
            <h3 className="text-lg font-medium mb-4">Newsletter</h3>
            <p className="mb-4">
              Stay updated with our latest news and offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 rounded-l-md bg-white bg-opacity-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <Button type="submit" className="rounded-l-none">
                Sign Up
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-12 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Aesop. All rights reserved.</p>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
