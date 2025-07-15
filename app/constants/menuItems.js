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
      href: "/novedades",
    },
    {
      name: "Operaciones",
      icon: ClipboardList,
      href: "/novedades/operaciones",
      submenu: [
        { name: "Consulta", href: "/novedades/operaciones/consulta" },
        //{ name: "Crosselling", href: "/novedades/operaciones/crosselling" },
        { name: "Solicitudes de Edición", href: "/novedades/operaciones/solicitudes-edicion" },
      ],
    },
    // {
    //   name: "Tickets",
    //   icon: FileText,
    //   href: "/novedades/tickets",
    //   submenu: [
    //     { name: "Consulta", href: "/novedades/tickets/consulta" },
    //     { name: "Importar", href: "/novedades/tickets/importar" },
    //     { name: "Estadísticas", href: "/novedades/tickets/estadisticas" },
    //   ],
    // },
    {
      name: "Gestión",
      icon: Settings,
      href: "/novedades/gestion",
      submenu: [
        // { name: "Operaciones concretadas", href: "/novedades/gestion/operaciones-concretadas" },
        // { name: "Operaciones ingresadas", href: "/novedades/gestion/operaciones-ingresadas" },
        // { name: "Inversión Publicitaria", href: "/novedades/gestion/inversion-publicitaria" },
        // { name: "Información por Vendedor", href: "/novedades/gestion/informacion-vendedor" },
        // { name: "Prima por Vendedor", href: "/novedades/gestion/prima-vendedor" },
        // { name: "Objetivos por Vendedor", href: "/novedades/gestion/objetivos-vendedor" },
        // { name: "Gestiones por Vendedor", href: "/novedades/gestion/gestiones-vendedor" },
        // { name: "Listar Vendedores", href: "/novedades/gestion/listar-vendedores" },
        // { name: "Listar Bajas", href: "/novedades/gestion/listar-bajas" },
        { name: "Bicicleterías", href: "/novedades/gestion/bicicleterias" },
        // { name: "Bicicletas por valor", href: "/novedades/gestion/bicicletas-valor" },
        // { name: "Última Gestión Vendedor", href: "/novedades/gestion/ultima-gestion-vendedor" },
        { name: "Bloquear DNI", href: "/novedades/gestion/bloquear-dni" },
        // { name: "Go Digital", href: "/novedades/gestion/go-digital" },
        // { name: "Objetivos Vendedor Diario", href: "/novedades/gestion/objetivos-diario" },
        // { name: "Delivery", href: "/novedades/gestion/delivery" },
        // { name: "Dar de alta Usuario", href: "/novedades/gestion/alta-usuario" },
      ],
    },
    // {
    //   name: "Tablas",
    //   icon: Grid3X3,
    //   href: "/novedades/tablas",
    // },
  ]