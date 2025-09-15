import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Import the correct type from your types file
import { SupplierFormData } from "@/types/api";

interface SupplierFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (supplier: SupplierFormData) => void;
  supplier?: any;
}

const SupplierForm = ({ isOpen, onClose, onSave, supplier }: SupplierFormProps) => {
  const [formData, setFormData] = useState<SupplierFormData>({
    name: "",
    contactNo: "",
    address: "",
    category: "",
    suppliedItems: "",
    remarks: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Reset form when modal opens/closes or supplier changes
  useEffect(() => {
    if (isOpen) {
      if (supplier) {
        setFormData({
          name: supplier.name || "",
          contactNo: supplier.contactNo || "",
          address: supplier.address || "",
          category: supplier.category || "",
          suppliedItems: supplier.suppliedItems || "",
          remarks: supplier.remarks || "",
        });
      } else {
        setFormData({
          name: "",
          contactNo: "",
          address: "",
          category: "",
          suppliedItems: "",
          remarks: "",
        });
      }
    }
  }, [isOpen, supplier]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.contactNo.trim()) {
      toast({
        title: "Validation Error", 
        description: "Contact number is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.address.trim()) {
      toast({
        title: "Validation Error",
        description: "Address is required", 
        variant: "destructive",
      });
      return;
    }

    if (!formData.category.trim()) {
      toast({
        title: "Validation Error",
        description: "Category is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.suppliedItems.trim()) {
      toast({
        title: "Validation Error",
        description: "Supplied items is required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Simulate save delay
      await new Promise(resolve => setTimeout(resolve, 500));
      onSave(formData);
    } catch (error) {
      console.error("Error saving supplier:", error);
      toast({
        title: "Error",
        description: "Failed to save supplier",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof SupplierFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {supplier ? "Edit Supplier" : "Add New Supplier"}
          </DialogTitle>
          <DialogDescription>
            {supplier 
              ? "Update the supplier information below" 
              : "Fill in the details to add a new supplier"
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter supplier name"
                required
              />
            </div>

            {/* Contact Number */}
            <div className="space-y-2">
              <Label htmlFor="contactNo">Contact Number *</Label>
              <Input
                id="contactNo"
                value={formData.contactNo}
                onChange={(e) => handleChange("contactNo", e.target.value)}
                placeholder="e.g., +880 17 1234 5678"
                required
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Enter full address"
                className="min-h-[80px]"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                placeholder="e.g., Construction Materials, Electrical Supplies"
                required
              />
            </div>

            {/* Supplied Items */}
            <div className="space-y-2">
              <Label htmlFor="suppliedItems">Supplied Items *</Label>
              <Textarea
                id="suppliedItems"
                value={formData.suppliedItems}
                onChange={(e) => handleChange("suppliedItems", e.target.value)}
                placeholder="List of items supplied"
                className="min-h-[80px]"
                required
              />
            </div>

            {/* Remarks */}
            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                value={formData.remarks}
                onChange={(e) => handleChange("remarks", e.target.value)}
                placeholder="Additional notes or remarks"
                className="min-h-[80px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
            >
              {loading ? "Saving..." : supplier ? "Update" : "Add"} Supplier
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SupplierForm;