import React, { createContext, ReactNode, useContext, useState } from "react";

export interface OrderItem {
  id: number;
  orderNumber: string;
  merchant: string;
  from: string;
  to: string;
  distance: string;
  eta: string;
  amount: string;
  passenger: string;
  customer?: string;
  customerPhone?: string;
  pickupLocation?: string;
  deliveryLocation?: string;
  status: "Pending" | "In Transit" | "Delivered";
  items?: string[];
  totalAmount?: string;
  createdAt?: string;
  estimatedDelivery?: string;
  progress?: number;
  notes?: string;
}

interface OrdersContextType {
  pendingOrders: OrderItem[];
  activeOrders: OrderItem[];
  acceptOrder: (order: OrderItem) => void;
  markDelivered: (orderId: number) => void;
  rejectOrder: (orderId: number) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pendingOrders, setPendingOrders] = useState<OrderItem[]>([
    {
      id: 1,
      orderNumber: "#ORD-2024-001",
      merchant: "Pizza Palace",
      from: "Pizza Palace, Downtown",
      to: "Main Street Area",
      distance: "3.2 km",
      eta: "12 min",
      amount: "TSh 45,000",
      passenger: "Alice Johnson",
      customer: "Alice Johnson",
      customerPhone: "+255 654 321 987",
      pickupLocation: "Pizza Palace, Downtown",
      deliveryLocation: "123 Main Street, Apt 5B",
      status: "Pending",
      items: ["Large Margherita Pizza", "Caesar Salad", "Coca Cola"],
      totalAmount: "TSh 45,000",
      createdAt: "31 Jan, 14:30",
      estimatedDelivery: "14:45",
      progress: 0,
      notes: "Ring doorbell twice, no onions on salad",
    },
    {
      id: 2,
      orderNumber: "#ORD-2024-002",
      merchant: "Burger House",
      from: "Burger House, Mall",
      to: "Oak Avenue Area",
      distance: "2.8 km",
      eta: "10 min",
      amount: "TSh 32,500",
      passenger: "Bob Smith",
      customer: "Bob Smith",
      customerPhone: "+255 654 321 988",
      pickupLocation: "Burger House, Mall",
      deliveryLocation: "456 Oak Avenue, Suite 200",
      status: "Pending",
      items: ["2x Cheese Burger", "Fries", "Shake"],
      totalAmount: "TSh 32,500",
      createdAt: "31 Jan, 14:35",
      estimatedDelivery: "15:05",
      progress: 0,
      notes: "Customer waiting at reception",
    },
    {
      id: 3,
      orderNumber: "#ORD-2024-004",
      merchant: "Chicken Express",
      from: "Chicken Express, North",
      to: "Pine Road Area",
      distance: "4.1 km",
      eta: "14 min",
      amount: "TSh 28,500",
      passenger: "David Brown",
      customer: "David Brown",
      customerPhone: "+255 654 321 990",
      pickupLocation: "Chicken Express, North",
      deliveryLocation: "321 Pine Road, Tower 3",
      status: "Pending",
      items: ["Fried Chicken Box", "Coleslaw", "Biscuits"],
      totalAmount: "TSh 28,500",
      createdAt: "31 Jan, 14:20",
      estimatedDelivery: "14:50",
      progress: 0,
      notes: "Handle with care - hot food",
    },
  ]);

  const [activeOrders, setActiveOrders] = useState<OrderItem[]>([]);

  const acceptOrder = (order: OrderItem) => {
    const updatedOrder = {
      ...order,
      status: "In Transit" as const,
      progress: 10,
      createdAt: new Date().toLocaleString(),
    };
    setPendingOrders((prev) => prev.filter((o) => o.id !== order.id));
    setActiveOrders((prev) => [...prev, updatedOrder]);
  };

  const markDelivered = (orderId: number) => {
    setActiveOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: "Delivered" as const, progress: 100 }
          : order,
      ),
    );
  };

  const rejectOrder = (orderId: number) => {
    setPendingOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  return (
    <OrdersContext.Provider
      value={{
        pendingOrders,
        activeOrders,
        acceptOrder,
        markDelivered,
        rejectOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within OrdersProvider");
  }
  return context;
};
