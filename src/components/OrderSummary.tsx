import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, ShoppingBag } from "lucide-react";
import { PersonOrders } from "@/pages/Index";

interface OrderSummaryProps {
  orders: PersonOrders;
  persons: string[];
  onRemoveOrder: (person: string, pastryName: string) => void;
  calculatePersonTotal: (person: string) => number;
}

const OrderSummary = ({
  orders,
  persons,
  onRemoveOrder,
  calculatePersonTotal,
}: OrderSummaryProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <ShoppingBag className="h-6 w-6 text-primary" />
        ملخص الطلبات
      </h2>

      {persons.map((person) => {
        const personOrders = orders[person] || [];
        if (personOrders.length === 0) return null;

        return (
          <Card key={person} className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-between">
              <span>{person}</span>
              <span className="text-primary">
                {calculatePersonTotal(person).toLocaleString()} ل.س
              </span>
            </h3>

            <div className="space-y-3">
              {personOrders.map((order) => (
                <div
                  key={order.pastry}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{order.pastry}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.price.toLocaleString()} ل.س × {order.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">
                      {(order.price * order.quantity).toLocaleString()} ل.س
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onRemoveOrder(person, order.pastry)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      })}

      {Object.keys(orders).length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground text-lg">لا توجد طلبات بعد</p>
        </Card>
      )}
    </div>
  );
};

export default OrderSummary;
