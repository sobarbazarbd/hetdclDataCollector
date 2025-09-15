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

// Import the correct type
import { ContractorFormData } from "@/types/api";

interface ContractorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contractor: ContractorFormData) => void;
  contractor?: any;
}

const ContractorForm = ({ isOpen, onClose, onSave, contractor }: ContractorFormProps) => {
  const [formData, setFormData] = useState<ContractorFormData>({
    name: "",
    contactNo: "",
    address: "",
    workCategory: "",
    remarks: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Reset form when modal opens/closes or contractor changes
  useEffect(() => {
    if (isOpen) {
      if (contractor) {
        setFormData({
          name: contractor.name || "",
          contactNo: contractor.contactNo || "",
          address: contractor.address || "",
          workCategory: contractor.workCategory || "",
          remarks: contractor.remarks || "",
        });
      } else {
        setFormData({
          name: "",
          contactNo: "",
          address: "",
          workCategory: "",
          remarks: "",
        });
      }
    }
  }, [isOpen, contractor]);

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

    if (!formData.workCategory.trim()) {
      toast({
        title: "Validation Error",
        description: "Work category is required",
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
      console.error("Error saving contractor:", error);
      toast({
        title: "Error",
        description: "Failed to save contractor",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof ContractorFormData, value: string) => {
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
            {contractor ? "Edit Contractor" : "Add New Contractor"}
          </DialogTitle>
          <DialogDescription>
            {contractor 
              ? "Update the contractor information below" 
              : "Fill in the details to add a new contractor"
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
                placeholder="Enter contractor name"
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

            {/* Work Category */}
            <div className="space-y-2">
              <Label htmlFor="workCategory">Work Category *</Label>
              <Input
                id="workCategory"
                value={formData.workCategory}
                onChange={(e) => handleChange("workCategory", e.target.value)}
                placeholder="e.g., Piling, Construction, Electrical"
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
              {loading ? "Saving..." : contractor ? "Update" : "Add"} Contractor
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContractorForm;