import AddIcon from "@mui/icons-material/Add";
import AssignmentCheckIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CampaignIcon from "@mui/icons-material/Campaign";
import CategoryIcon from "@mui/icons-material/Category";
import DiscountIcon from "@mui/icons-material/Discount";
import GroceryIcon from "@mui/icons-material/LocalGroceryStore";
import HomeIcon from "@mui/icons-material/Home";
import LiquorIcon from "@mui/icons-material/Liquor";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LogoutIcon from "@mui/icons-material/Logout";
import { MenuItemType } from "./type";
import PersonIcon from "@mui/icons-material/Person";
import ReportIcon from "@mui/icons-material/AnalyticsOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const menuItems: MenuItemType[] = [
  {
    icon: <HomeIcon />,
    path: "/home",
    label: "Início",
  },
  {
    icon: <AssignmentIcon />,
    label: "Pedidos",
    path: "/orders",
  },
  {
    icon: <AssignmentCheckIcon />,
    label: "Pedidos faturados",
    path: "/invoices",
  },
  {
    icon: <LiquorIcon />,
    label: "Produtos",
    path: "/products",
    key: "Products",
    subitems: [
      {
        icon: <AddIcon />,
        label: "Cadastrar produtos",
        key: "Products",
        path: "/products/new",
      },
      {
        icon: <GroceryIcon />,
        label: "Ver ou editar produtos",
        key: "Products",
        path: "/products/edit",
      },
      {
        icon: <CategoryIcon />,
        label: "Categorias",
        key: "Categories",
        path: "/products/categories",
      },
    ],
  },
  {
    icon: <LocalShippingIcon />,
    label: "Bairros",
    path: "/neighborhood",
  },
  {
    icon: <CampaignIcon />,
    label: "Campanhas",
    path: "/campaigns",
  },
  {
    icon: <PersonIcon />,
    path: "/users",
    label: "Usuários",
  },
  {
    icon: <ShoppingCartIcon />,
    path: "/minimum-order-price",
    label: "Pedido mínimo",
  },
  {
    icon: <DiscountIcon />,
    path: "/discount-club",
    label: "Club de descontos",
  },
  {
    icon: <ReportIcon />,
    path: "#",
    label: "Relatórios (em breve!)",
  },
  {
    icon: <LogoutIcon />,
    label: "Sair do sistema",
  },
];
