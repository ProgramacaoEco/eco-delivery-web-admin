// "use client";

// import { Add, Category, Grocery } from "@icons/index";
// import { menu, menuButton } from "./style.css";

// import Link from "next/link";
// import PageTitle from "@/components/basis/PageTitle/PageTitle";

// export default function Products() {
//   return (
//     <>
//       <div
//         style={{
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <PageTitle
//           isLoading={false}
//           color="orange"
//           title="Cadastro de produtos"
//         />
//         <div className={menu}>
//           <Link href="/products/new" style={{ all: "unset" }}>
//             <div className={menuButton}>
//               <Add fontSize={150} />
//               <div>Cadastrar novo produto</div>
//             </div>
//           </Link>
//           <Link href="/products/edit" style={{ all: "unset" }}>
//             <div className={menuButton}>
//               <Grocery fontSize={150} />
//               <div>Ver ou editar produtos</div>
//             </div>
//           </Link>
//           <Link href="/products/categories" style={{ all: "unset" }}>
//             <div className={menuButton}>
//               <Category fontSize={155} />
//               <div>Categorias</div>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }
