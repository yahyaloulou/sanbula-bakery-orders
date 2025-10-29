import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Receipt, Download } from "lucide-react";
import { PersonOrders } from "@/pages/Index";

interface FinalInvoiceProps {
  orders: PersonOrders;
  calculatePersonTotal: (person: string) => number;
  calculateGrandTotal: () => number;
  onSendWhatsApp: () => void;
}

const FinalInvoice = ({
  orders,
  calculatePersonTotal,
  calculateGrandTotal,
  onSendWhatsApp,
}: FinalInvoiceProps) => {
  const hasOrders = Object.keys(orders).some(
    (person) => orders[person]?.length > 0
  );

  const downloadInvoice = () => {
    let invoiceText = "🌾 فاتورة سنبلة - معجنات طازجة\n";
    invoiceText += "=".repeat(40) + "\n\n";

    Object.keys(orders).forEach((person) => {
      const personOrders = orders[person];
      if (personOrders && personOrders.length > 0) {
        invoiceText += `👤 ${person}\n`;
        invoiceText += "-".repeat(40) + "\n";
        personOrders.forEach((order) => {
          invoiceText += `  ${order.pastry} × ${order.quantity}\n`;
          invoiceText += `  ${order.price.toLocaleString()} × ${order.quantity} = ${(
            order.price * order.quantity
          ).toLocaleString()} ل.س\n\n`;
        });
        invoiceText += `  المجموع: ${calculatePersonTotal(person).toLocaleString()} ل.س\n`;
        invoiceText += "=".repeat(40) + "\n\n";
      }
    });

    invoiceText += `💰 المجموع الكلي: ${calculateGrandTotal().toLocaleString()} ل.س\n`;
    invoiceText += "=".repeat(40) + "\n";
    invoiceText += `التاريخ: ${new Date().toLocaleDateString("ar-SY")}\n`;
    invoiceText += `الوقت: ${new Date().toLocaleTimeString("ar-SY")}\n`;

    const blob = new Blob([invoiceText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `فاتورة-سنبلة-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <Card className="p-8">
        <div className="text-center mb-8 animate-scale-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
            <Receipt className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">الفاتورة النهائية</h2>
          <p className="text-muted-foreground">سنبلة - معجنات طازجة</p>
        </div>

        {!hasOrders ? (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-muted-foreground text-lg">لا توجد طلبات بعد</p>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-8">
              {Object.keys(orders).map((person, index) => {
                const personOrders = orders[person];
                if (!personOrders || personOrders.length === 0) return null;

                return (
                  <div
                    key={person}
                    className="border-b border-border pb-4 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h3 className="text-lg font-semibold mb-3 text-primary">
                      {person}
                    </h3>
                    <div className="space-y-2 mr-4">
                      {personOrders.map((order) => (
                        <div
                          key={order.pastry}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            {order.pastry} × {order.quantity}
                          </span>
                          <span className="font-medium">
                            {(order.price * order.quantity).toLocaleString()} ل.س
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between font-semibold text-base pt-2 border-t border-muted">
                        <span>المجموع</span>
                        <span>{calculatePersonTotal(person).toLocaleString()} ل.س</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 mb-6 animate-scale-in">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">المجموع الكلي</span>
                <span className="text-3xl font-bold text-primary">
                  {calculateGrandTotal().toLocaleString()} ل.س
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                onClick={downloadInvoice}
                variant="outline"
                className="h-14 text-lg"
                size="lg"
              >
                <Download className="ml-2 h-5 w-5" />
                تحميل الفاتورة
              </Button>
              <Button
                onClick={onSendWhatsApp}
                className="h-14 text-lg"
                size="lg"
              >
                <Send className="ml-2 h-5 w-5" />
                إرسال عبر واتساب
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default FinalInvoice;
