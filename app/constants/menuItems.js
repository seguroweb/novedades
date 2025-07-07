import {
    ClipboardList,
    FileText,
    Grid3X3,
    Home,
    Settings,
} from "lucide-react"

export const LINKS_MENU = [
    {
      name: "Inicio",
      icon: Home,
      href: "/dashboard",
    },
    {
      name: "Operaciones",
      icon: ClipboardList,
      href: "/dashboard/operaciones",
      submenu: [
        { name: "Consulta", href: "/dashboard/operaciones/consulta" },
        //{ name: "Crosselling", href: "/dashboard/operaciones/crosselling" },
        { name: "Solicitudes de Edición", href: "/dashboard/operaciones/solicitudes" },
      ],
    },
    // {
    //   name: "Tickets",
    //   icon: FileText,
    //   href: "/dashboard/tickets",
    //   submenu: [
    //     { name: "Consulta", href: "/dashboard/tickets/consulta" },
    //     { name: "Importar", href: "/dashboard/tickets/importar" },
    //     { name: "Estadísticas", href: "/dashboard/tickets/estadisticas" },
    //   ],
    // },
    {
      name: "Gestión",
      icon: Settings,
      href: "/dashboard/gestion",
      submenu: [
        // { name: "Operaciones concretadas", href: "/dashboard/gestion/operaciones-concretadas" },
        // { name: "Operaciones ingresadas", href: "/dashboard/gestion/operaciones-ingresadas" },
        // { name: "Inversión Publicitaria", href: "/dashboard/gestion/inversion-publicitaria" },
        // { name: "Información por Vendedor", href: "/dashboard/gestion/informacion-vendedor" },
        // { name: "Prima por Vendedor", href: "/dashboard/gestion/prima-vendedor" },
        // { name: "Objetivos por Vendedor", href: "/dashboard/gestion/objetivos-vendedor" },
        // { name: "Gestiones por Vendedor", href: "/dashboard/gestion/gestiones-vendedor" },
        // { name: "Listar Vendedores", href: "/dashboard/gestion/listar-vendedores" },
        // { name: "Listar Bajas", href: "/dashboard/gestion/listar-bajas" },
        { name: "Bicicleterías", href: "/dashboard/gestion/bicicleterias" },
        // { name: "Bicicletas por valor", href: "/dashboard/gestion/bicicletas-valor" },
        // { name: "Última Gestión Vendedor", href: "/dashboard/gestion/ultima-gestion-vendedor" },
        { name: "Bloquear DNI", href: "/dashboard/gestion/bloquear-dni" },
        // { name: "Go Digital", href: "/dashboard/gestion/go-digital" },
        // { name: "Objetivos Vendedor Diario", href: "/dashboard/gestion/objetivos-diario" },
        // { name: "Delivery", href: "/dashboard/gestion/delivery" },
        // { name: "Dar de alta Usuario", href: "/dashboard/gestion/alta-usuario" },
      ],
    },
    // {
    //   name: "Tablas",
    //   icon: Grid3X3,
    //   href: "/dashboard/tablas",
    // },
  ]