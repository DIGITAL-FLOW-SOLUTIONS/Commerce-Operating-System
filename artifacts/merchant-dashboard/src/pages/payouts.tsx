import React, { useState } from "react";
import { useData, PayoutMethod } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CreditCard, Building, Smartphone, Plus, Trash2, CheckCircle2 } from "lucide-react";

export default function Payouts() {
  const { payoutMethods, addPayoutMethod, removePayoutMethod } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"till" | "paybill" | "bank">("till");
  const [details, setDetails] = useState("");
  
  const hasNoPayouts = payoutMethods.length === 0;

  const handleAdd = () => {
    if (!details.trim()) return;
    addPayoutMethod({
      type,
      details,
      isDefault: payoutMethods.length === 0,
    });
    setDetails("");
    setIsOpen(false);
  };

  const getIcon = (type: string) => {
    if (type === "till") return <Smartphone className="h-5 w-5" />;
    if (type === "paybill") return <Building className="h-5 w-5" />;
    return <CreditCard className="h-5 w-5" />;
  };

  const getLabel = (type: string) => {
    if (type === "till") return "M-PESA Till Number";
    if (type === "paybill") return "M-PESA Paybill";
    return "Bank Account";
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">
          Payout Methods
        </h1>
        <p className="text-muted-foreground mt-1">Manage how you receive your money.</p>
      </div>

      {hasNoPayouts && (
        <Alert variant="destructive" className="bg-destructive/5 border-destructive/20 text-destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-semibold">Action Required</AlertTitle>
          <AlertDescription>
            You need to add at least one payout method to publish your stores and start receiving payments.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-semibold">Your Methods</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Payout Method
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Payout Method</DialogTitle>
              <DialogDescription>
                Choose how you want to receive your store funds.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Method Type</Label>
                <Select value={type} onValueChange={(v: any) => setType(v)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="till">M-PESA Till Number</SelectItem>
                    <SelectItem value="paybill">M-PESA Paybill</SelectItem>
                    <SelectItem value="bank">Bank Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="details">
                  {type === "bank" ? "Account Number" : "Business Number"}
                </Label>
                <Input
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={type === "bank" ? "e.g. 010000000000" : "e.g. 123456"}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd} disabled={!details.trim()}>Add Method</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="grid gap-4">
          {payoutMethods.map((method) => (
            <motion.div
              key={method.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      {getIcon(method.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-lg">{getLabel(method.type)}</p>
                        {method.isDefault && (
                          <span className="flex items-center text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground">{method.details}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => removePayoutMethod(method.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {payoutMethods.length === 0 && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 border-2 border-dashed rounded-xl bg-muted/30"
            >
              <CreditCard className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-1">No payout methods</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-4">
                You haven't set up any payout methods yet. Add one to receive payments from your stores.
              </p>
              <Button variant="secondary" onClick={() => setIsOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add your first method
              </Button>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}
