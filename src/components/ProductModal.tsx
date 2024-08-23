// ProductModal.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";

const DynamicCanvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);
const DynamicProductModel = dynamic(() => import("./ProductModel"), {
  ssr: false,
});

interface ProductModalProps {
  product: {
    name: string;
    description: string;
    details: string[];
  };
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
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
            <DynamicCanvas>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <DynamicProductModel />
            </DynamicCanvas>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductModal;
