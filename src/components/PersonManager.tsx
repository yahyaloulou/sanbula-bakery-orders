import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, User } from "lucide-react";

interface PersonManagerProps {
  persons: string[];
  selectedPerson: string;
  onSelectPerson: (person: string) => void;
  onAddPerson: (name: string) => void;
}

const PersonManager = ({
  persons,
  selectedPerson,
  onSelectPerson,
  onAddPerson,
}: PersonManagerProps) => {
  const [newPersonName, setNewPersonName] = useState("");

  const handleAddPerson = () => {
    if (newPersonName.trim()) {
      onAddPerson(newPersonName);
      setNewPersonName("");
    }
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
        <User className="h-5 w-5 text-primary" />
        اختر الشخص
      </h2>

      <div className="mb-4 flex gap-2">
        <Input
          placeholder="أضف شخص جديد"
          value={newPersonName}
          onChange={(e) => setNewPersonName(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddPerson()}
          className="flex-1"
        />
        <Button onClick={handleAddPerson} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {persons.map((person, index) => (
          <Button
            key={person}
            variant={selectedPerson === person ? "default" : "outline"}
            onClick={() => onSelectPerson(person)}
            className="justify-start animate-scale-in transition-all hover:scale-105"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {person}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default PersonManager;
