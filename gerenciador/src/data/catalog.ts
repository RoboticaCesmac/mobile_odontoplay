export type CatalogItem = {
  id: string;
  title: string;
  year: number;
  genre: string;
  director: string;
  stock: number;
  price: number;
  rentalPrice: number;
  status: "Em alta" | "Estável" | "Atenção";
  audience: string;
};

export type TeamMember = {
  id: number;
  name: string;
  email: string;
  admin: boolean;
  shift: string;
  status: "Online" | "Pausa" | "Offline";
  assignedArea: string;
};

export type OrderItem = {
  id: string;
  customer: string;
  type: "Compra" | "Aluguel";
  title: string;
  total: number;
  status: "Pago" | "Processando" | "Atrasado";
  createdAt: string;
};

export const catalogItems: CatalogItem[] = [
  {
    id: "FILM-001",
    title: "Piratas do Caribe",
    year: 2003,
    genre: "Aventura",
    director: "Gore Verbinski",
    stock: 12,
    price: 29.9,
    rentalPrice: 7.9,
    status: "Em alta",
    audience: "Familia e fantasia",
  },
  {
    id: "FILM-002",
    title: "O Senhor dos Aneis",
    year: 2001,
    genre: "Fantasia",
    director: "Peter Jackson",
    stock: 7,
    price: 34.9,
    rentalPrice: 9.9,
    status: "Em alta",
    audience: "Saga premium",
  },
  {
    id: "FILM-003",
    title: "Matrix",
    year: 1999,
    genre: "Ficcao",
    director: "Lana e Lilly Wachowski",
    stock: 20,
    price: 19.9,
    rentalPrice: 5.9,
    status: "Estável",
    audience: "Cult e ação",
  },
  {
    id: "FILM-004",
    title: "Sherlock Holmes",
    year: 2009,
    genre: "Investigação",
    director: "Guy Ritchie",
    stock: 9,
    price: 24.5,
    rentalPrice: 6.9,
    status: "Estável",
    audience: "Suspense casual",
  },
  {
    id: "FILM-005",
    title: "Batman: O Cavaleiro das Trevas",
    year: 2008,
    genre: "Ação",
    director: "Christopher Nolan",
    stock: 5,
    price: 27.5,
    rentalPrice: 8.9,
    status: "Em alta",
    audience: "Heróis e ação",
  },
  {
    id: "FILM-006",
    title: "Halloween",
    year: 1978,
    genre: "Terror",
    director: "John Carpenter",
    stock: 8,
    price: 14.9,
    rentalPrice: 4.9,
    status: "Atenção",
    audience: "Catalogo classico",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Aline Rocha",
    email: "aline@odontoplay.com",
    admin: true,
    shift: "08:00 - 17:00",
    status: "Online",
    assignedArea: "Financeiro",
  },
  {
    id: 2,
    name: "Bruno Sales",
    email: "bruno@odontoplay.com",
    admin: false,
    shift: "09:00 - 18:00",
    status: "Online",
    assignedArea: "Catalogo",
  },
  {
    id: 3,
    name: "Carla Nunes",
    email: "carla@odontoplay.com",
    admin: false,
    shift: "12:00 - 21:00",
    status: "Pausa",
    assignedArea: "Atendimento",
  },
  {
    id: 4,
    name: "Diego Lima",
    email: "diego@odontoplay.com",
    admin: true,
    shift: "13:00 - 22:00",
    status: "Offline",
    assignedArea: "Operação",
  },
];

export const orderItems: OrderItem[] = [
  {
    id: "PED-3101",
    customer: "Mariana Souza",
    type: "Compra",
    title: "Batman: O Cavaleiro das Trevas",
    total: 27.5,
    status: "Pago",
    createdAt: "Hoje, 09:10",
  },
  {
    id: "PED-3102",
    customer: "Paulo Ribeiro",
    type: "Aluguel",
    title: "Matrix",
    total: 5.9,
    status: "Processando",
    createdAt: "Hoje, 10:25",
  },
  {
    id: "PED-3103",
    customer: "Julia Castro",
    type: "Compra",
    title: "Piratas do Caribe",
    total: 29.9,
    status: "Pago",
    createdAt: "Hoje, 11:40",
  },
  {
    id: "PED-3097",
    customer: "Rafaela Gomes",
    type: "Aluguel",
    title: "Halloween",
    total: 4.9,
    status: "Atrasado",
    createdAt: "Ontem, 19:20",
  },
];

export const dashboardAlerts = [
  "3 titulos precisam de reposicao ainda hoje.",
  "Checkout web com 12 vendas nas últimas 4 horas.",
  "Equipe do turno da tarde com 1 operador em pausa.",
];

export const dashboardGoals = [
  { label: "Meta de vendas", value: "78%", detail: "R$ 3.920 de R$ 5.000" },
  { label: "Meta de aluguel", value: "64%", detail: "41 de 64 locacoes" },
  { label: "SLA atendimento", value: "92%", detail: "Tempo medio 3m40s" },
];

export const dashboardMetrics = {
  grossRevenue: 3920,
  activeRentals: 41,
  lowStockItems: catalogItems.filter((item) => item.stock <= 8).length,
  activeOperators: teamMembers.filter((member) => member.status === "Online").length,
};
