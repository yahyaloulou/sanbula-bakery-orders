import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { PersonOrders } from "@/pages/Index";

interface OrderSummaryProps {
  orders: PersonOrders;
  persons: string[];
  onRemoveOrder: (person: string, pastryName: string) => void;
  onAddOrder: (person: string, pastryName: string) => void;
  calculatePersonTotal: (person: string) => number;
}

const OrderSummary = ({
  orders,
  persons,
  onRemoveOrder,
  onAddOrder,
  calculatePersonTotal,
}: OrderSummaryProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <ShoppingBag className="h-6 w-6 text-primary" />
        ملخص الطلبات
      </h2>

      {persons.map((person, personIndex) => {
        const personOrders = orders[person] || [];
        if (personOrders.length === 0) return null;

        return (
          <Card
            key={person}
            className="p-6 animate-slide-up"
            style={{ animationDelay: `${personIndex * 0.1}s` }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-between">
              <span>{person}</span>
              <span className="text-primary">
                {calculatePersonTotal(person).toLocaleString()} ل.س
              </span>
            </h3>

            <div className="space-y-3">
              {personOrders.map((order, orderIndex) => (
                <div
                  key={order.pastry}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg animate-scale-in"
                  style={{ animationDelay: `${(personIndex * 0.1) + (orderIndex * 0.05)}s` }}
                >
                  <div className="flex-1">
                    <p className="font-medium">{order.pastry}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.price.toLocaleString()} ل.س × {order.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg min-w-[100px] text-left">
                      {(order.price * order.quantity).toLocaleString()} ل.س
                    </span>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onRemoveOrder(person, order.pastry)}
                        className="h-9 w-9"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onAddOrder(person, order.pastry)}
                        className="h-9 w-9"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      })}

      {Object.keys(orders).length === 0 && (
        <Card className="p-12 text-center animate-fade-in">
          <p className="text-muted-foreground text-lg">لا توجد طلبات بعد</p>
        </Card>
      )}
    </div>
  );
};

export default OrderSummary;
