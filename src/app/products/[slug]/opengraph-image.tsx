import { ImageResponse } from "next/og";
import { getProductDetail } from "@content/product-details";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const product = getProductDetail(slug);

  const title = product?.title ?? "RimansTech Industries";
  const category = product?.category ?? "Product";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(145deg, #0f1410 0%, #1a2318 100%)",
          color: "#f5f3ef",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8fa88a",
            }}
          >
            {category}
          </div>
          <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.1, maxWidth: 900 }}>
            {title}
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#c8c2b8" }}>RimansTech Industries</div>
      </div>
    ),
    { ...size }
  );
}
