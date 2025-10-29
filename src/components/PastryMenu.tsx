import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Pastry } from "@/pages/Index";

interface PastryMenuProps {
  pastries: Pastry[];
  onAddOrder: (pastryName: string, price: number) => void;
}

const PastryMenu = ({ pastries, onAddOrder }: PastryMenuProps) => {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">القائمة</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pastries.map((pastry) => (
          <Card
            key={pastry.name}
            className="p-4 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{pastry.name}</h3>
                <p className="text-2xl font-bold text-primary">
                  {pastry.price.toLocaleString()} ل.س
                </p>
              </div>
              <Button
                onClick={() => onAddOrder(pastry.name, pastry.price)}
                size="icon"
                className="h-12 w-12 rounded-full"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PastryMenu;
