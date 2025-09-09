import React, { useState } from "react";
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

const ProductCard = ({
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

export default function Products() {
  // alias data to products with a default [] so .map never crashes
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

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
            <ProductCard
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

// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardActions,
//   CardContent,
//   Collapse,
//   Button,
//   Typography,
//   Rating,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import Header from "components/Header";
// import { useGetProductsQuery } from "state/api";

// const ProductCard = ({
//   _id,
//   name,
//   description,
//   price,
//   rating,
//   category,
//   supply,
//   stat,
// }) => {
//   const theme = useTheme();
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <Card
//       sx={{
//         backgroundImage: "none",
//         backgroundColor: theme.palette.background.alt,
//         borderRadius: "0.55rem",
//       }}
//     >
//       <CardContent>
//         <Typography
//           sx={{ fontSize: 14 }}
//           color={theme.palette.secondary[700]}
//           gutterBottom
//         >
//           {category ?? ""}
//         </Typography>
//         <Typography variant="h5">{name ?? ""}</Typography>
//         <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
//           ${Number(price ?? 0).toFixed(2)}
//         </Typography>
//         <Rating value={Number(rating ?? 0)} readOnly />
//         <Typography variant="body2">{description ?? ""}</Typography>
//       </CardContent>

//       <CardActions>
//         {/* MUI variants are "text" | "outlined" | "contained" */}
//         <Button
//           variant="contained"
//           size="small"
//           onClick={() => setIsExpanded((v) => !v)}
//         >
//           See More
//         </Button>
//       </CardActions>

//       <Collapse
//         in={isExpanded}
//         timeout="auto"
//         unmountOnExit
//         sx={{
//           color: theme.palette.neutral?.[300] ?? theme.palette.text.secondary,
//         }}
//       >
//         <CardContent>
//           <Typography>id: {_id}</Typography>
//           <Typography>Supply Left: {supply ?? 0}</Typography>
//           <Typography>
//             Yearly Sales This Year: {stat?.yearlySalesTotal ?? 0}
//           </Typography>
//           <Typography>
//             Yearly Units Sold This Year: {stat?.yearlyTotalSoldUnits ?? 0}
//           </Typography>
//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// };

// export default function Products() {
//   // Alias `data` to `products` with a safe default array
//   const {
//     data: products = [],
//     isLoading,
//     isError,
//     error,
//   } = useGetProductsQuery();

//   const isNonMobile = useMediaQuery("(min-width: 1000px)");

//   return (
//     <Box m="1.5rem 2.5rem">
//       <Header title="PRODUCTS" subtitle="See your list of products." />

//       {isLoading ? (
//         <Typography>Loading...</Typography>
//       ) : isError ? (
//         <Typography color="error">
//           Failed to load products:{" "}
//           {String(error?.status || error?.message || "Unknown error")}
//         </Typography>
//       ) : (
//         <Box
//           mt="20px"
//           display="grid"
//           gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//           justifyContent="space-between"
//           rowGap="20px"
//           columnGap="1.33%"
//           sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
//         >
//           {(Array.isArray(products) ? products : []).map((p, idx) => (
//             <ProductCard
//               key={p?._id ?? idx}
//               _id={p?._id}
//               name={p?.name}
//               description={p?.description}
//               price={p?.price}
//               rating={p?.rating}
//               category={p?.category}
//               supply={p?.supply}
//               stat={p?.stat}
//             />
//           ))}
//         </Box>
//       )}
//     </Box>
//   );
// }
