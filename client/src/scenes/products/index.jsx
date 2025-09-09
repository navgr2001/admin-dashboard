import React, { useMemo, useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";

/* ---------- product card ---------- */
const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category ?? ""}
        </Typography>
        <Typography variant="h5">{name ?? ""}</Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price ?? 0).toFixed(2)}
        </Typography>
        <Rating value={Number(rating ?? 0)} readOnly />
        <Typography variant="body2">{description ?? ""}</Typography>
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={() => setIsExpanded((v) => !v)}
        >
          See More
        </Button>
      </CardActions>

      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral?.[300] ?? theme.palette.text.secondary,
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply ?? 0}</Typography>
          <Typography>
            Yearly Sales This Year: {stat?.yearlySalesTotal ?? 0}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat?.yearlyTotalSoldUnits ?? 0}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

/* ---------- page ---------- */
export default function Products() {
  const { data, isLoading, isError, error } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  // Log once so you can see the exact shape in the console
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("GET /client/products response:", data);
  }, [data]);

  // Normalize to an array regardless of backend shape
  const products = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.products)) return data.products;
    if (Array.isArray(data?.items)) return data.items;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  }, [data]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : isError ? (
        <Typography color="error">
          Failed to load products: {String(error?.status || "")}
        </Typography>
      ) : (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
        >
          {products.map((p, idx) => (
            <Product
              key={p?._id ?? idx}
              _id={p?._id}
              name={p?.name}
              description={p?.description}
              price={p?.price}
              rating={p?.rating}
              category={p?.category}
              supply={p?.supply}
              stat={p?.stat}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
