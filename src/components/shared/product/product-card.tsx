import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProductPrice from './product-price';
import { IProduct } from '@/public/types';
// import { Product } from '@/types';
// import Rating from './rating';

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.slug}`}>
          <Image unoptimized={true}
            src={product.images[0]}
            alt={product.name}
            height={300}
            width={300}
            priority={true}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-sm font-medium">{product.name} {product.unit}</h2>
        </Link>
        <div className="flex-between gap-4">
          {/* <Rating value={Number(product.rating)} /> */}
          {product.stock > 0 ? (
            <ProductPrice
              originalPrice={Number(product.price)}
              discount={Number(product.discount || 0)}
            />
          ) : (
            <p className="text-destructive">Out Of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
