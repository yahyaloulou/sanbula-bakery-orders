import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";
import { Pastry } from "@/pages/Index";

interface PastryMenuProps {
  pastries: Pastry[];
  onAddOrder: (pastryName: string, price: number, quantity: number) => void;
}

const PastryMenu = ({ pastries, onAddOrder }: PastryMenuProps) => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleQuantityChange = (pastryName: string, value: number) => {
    setQuantities({
      ...quantities,
      [pastryName]: Math.max(1, value),
    });
  };

  const getQuantity = (pastryName: string) => quantities[pastryName] || 1;

  const handleAddOrder = (pastryName: string, price: number) => {
    const quantity = getQuantity(pastryName);
    onAddOrder(pastryName, price, quantity);
    setQuantities({
      ...quantities,
      [pastryName]: 1,
    });
  };

  return (
    <div className="animate-fade-in">
      <h2 className="mb-4 text-2xl font-bold">القائمة</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pastries.map((pastry, index) => (
          <Card
            key={pastry.name}
            className="p-4 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{pastry.name}</h3>
                  <p className="text-2xl font-bold text-primary">
                    {pastry.price.toLocaleString()} ل.س
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleQuantityChange(pastry.name, getQuantity(pastry.name) - 1)
                  }
                  className="h-9 w-9"
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <Input
                  type="number"
                  min="1"
                  value={getQuantity(pastry.name)}
                  onChange={(e) =>
                    handleQuantityChange(pastry.name, parseInt(e.target.value) || 1)
                  }
                  className="text-center h-9"
                />

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleQuantityChange(pastry.name, getQuantity(pastry.name) + 1)
                  }
                  className="h-9 w-9"
                >
                  <Plus className="h-4 w-4" />
                </Button>

                <Button
                  onClick={() => handleAddOrder(pastry.name, pastry.price)}
                  className="flex-1 h-9"
                >
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PastryMenu;
