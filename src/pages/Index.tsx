import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, ShoppingCart, Users, FileText, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import PersonManager from "@/components/PersonManager";
import PastryMenu from "@/components/PastryMenu";
import OrderSummary from "@/components/OrderSummary";
import FinalInvoice from "@/components/FinalInvoice";

export interface Pastry {
  name: string;
  price: number;
}

export interface Order {
  pastry: string;
  quantity: number;
  price: number;
}

export interface PersonOrders {
  [person: string]: Order[];
}

const pastries: Pastry[] = [
  { name: "جبنة", price: 1500 },
  { name: "سبانخ", price: 1500 },
  { name: "لحمة", price: 1500 },
  { name: "كيري", price: 1500 },
  { name: "محمرة", price: 1500 },
  { name: "زعتر", price: 1500 },
  { name: "قشقوان", price: 3000 },
  { name: "محمرة قشقوان", price: 3000 },
  { name: "شيش", price: 6000 },
  { name: "مكسيكي", price: 5000 },
  { name: "سجق", price: 3000 },
  { name: "بيتزا", price: 3000 },
  { name: "مرتديلا قشقوان", price: 3000 },
];

const Index = () => {
  const [persons, setPersons] = useState<string[]>([
    "mouaz ui",
    "yahya",
    "mouaz react",
    "bashar",
    "zouhier",
    "aghyad",
    "baraa",
  ]);
  const [selectedPerson, setSelectedPerson] = useState<string>(persons[0]);
  const [orders, setOrders] = useState<PersonOrders>({});
  const [view, setView] = useState<"order" | "summary" | "invoice">("order");

  const addPerson = (name: string) => {
    if (name.trim() && !persons.includes(name.trim())) {
      setPersons([...persons, name.trim()]);
      toast({
        title: "تم إضافة الشخص",
        description: `تمت إضافة ${name} بنجاح`,
      });
    }
  };

  const addOrder = (pastryName: string, price: number, quantity: number = 1) => {
    const personOrders = orders[selectedPerson] || [];
    const existingOrder = personOrders.find((o) => o.pastry === pastryName);

    if (existingOrder) {
      setOrders({
        ...orders,
        [selectedPerson]: personOrders.map((o) =>
          o.pastry === pastryName ? { ...o, quantity: o.quantity + quantity } : o
        ),
      });
    } else {
      setOrders({
        ...orders,
        [selectedPerson]: [...personOrders, { pastry: pastryName, quantity, price }],
      });
    }

    toast({
      title: "تمت الإضافة",
      description: `تم إضافة ${quantity} ${pastryName} لطلب ${selectedPerson}`,
    });
  };

  const addOneToOrder = (person: string, pastryName: string) => {
    const personOrders = orders[person] || [];
    const existingOrder = personOrders.find((o) => o.pastry === pastryName);

    if (existingOrder) {
      setOrders({
        ...orders,
        [person]: personOrders.map((o) =>
          o.pastry === pastryName ? { ...o, quantity: o.quantity + 1 } : o
        ),
      });
    }
  };

  const removeOrder = (person: string, pastryName: string) => {
    const personOrders = orders[person] || [];
    const existingOrder = personOrders.find((o) => o.pastry === pastryName);

    if (existingOrder && existingOrder.quantity > 1) {
      setOrders({
        ...orders,
        [person]: personOrders.map((o) =>
          o.pastry === pastryName ? { ...o, quantity: o.quantity - 1 } : o
        ),
      });
    } else {
      setOrders({
        ...orders,
        [person]: personOrders.filter((o) => o.pastry !== pastryName),
      });
    }
  };

  const calculatePersonTotal = (person: string) => {
    const personOrders = orders[person] || [];
    return personOrders.reduce((sum, order) => sum + order.price * order.quantity, 0);
  };

  const calculateGrandTotal = () => {
    return Object.keys(orders).reduce((sum, person) => sum + calculatePersonTotal(person), 0);
  };

  const generateWhatsAppMessage = () => {
    let message = "🥐 طلب من سنبلة\n\n";
    
    Object.keys(orders).forEach((person) => {
      const personOrders = orders[person];
      if (personOrders.length > 0) {
        message += `👤 ${person}:\n`;
        personOrders.forEach((order) => {
          message += `  • ${order.pastry} × ${order.quantity} = ${order.price * order.quantity} ل.س\n`;
        });
        message += `  المجموع: ${calculatePersonTotal(person)} ل.س\n\n`;
      }
    });

    message += `💰 المجموع الكلي: ${calculateGrandTotal()} ل.س`;
    
    const whatsappUrl = `https://wa.me/963938230778?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <span className="text-2xl">🌾</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  سنبلة
                </h1>
                <p className="text-sm text-muted-foreground">معجنات طازجة</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant={view === "order" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("order")}
              >
                <ShoppingCart className="ml-2 h-4 w-4" />
                الطلبات
              </Button>
              <Button
                variant={view === "summary" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("summary")}
              >
                <Users className="ml-2 h-4 w-4" />
                الملخص
              </Button>
              <Button
                variant={view === "invoice" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("invoice")}
              >
                <FileText className="ml-2 h-4 w-4" />
                الفاتورة
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {view === "order" && (
          <div className="space-y-6">
            <PersonManager
              persons={persons}
              selectedPerson={selectedPerson}
              onSelectPerson={setSelectedPerson}
              onAddPerson={addPerson}
            />
            <PastryMenu pastries={pastries} onAddOrder={addOrder} />
          </div>
        )}

        {view === "summary" && (
          <OrderSummary
            orders={orders}
            persons={persons}
            onRemoveOrder={removeOrder}
            onAddOrder={addOneToOrder}
            calculatePersonTotal={calculatePersonTotal}
          />
        )}

        {view === "invoice" && (
          <FinalInvoice
            orders={orders}
            calculatePersonTotal={calculatePersonTotal}
            calculateGrandTotal={calculateGrandTotal}
            onSendWhatsApp={generateWhatsAppMessage}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
