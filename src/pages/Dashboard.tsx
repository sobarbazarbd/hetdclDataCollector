import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import ContractorTable from "@/components/ContractorTable";
import ContractorForm from "@/components/ContractorForm";
import SearchAndFilter from "@/components/SearchAndFilter";
import SupplierTable from "@/components/SupplierTable";
import SupplierForm from "@/components/SupplierForm";
import SupplierSearchAndFilter from "@/components/SupplierSearchAndFilter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Download } from "lucide-react";
import { contractorsAPI, suppliersAPI } from "@/services/api";
import { Contractor, Supplier, ContractorFormData, SupplierFormData } from "@/types/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Contractor state
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [filteredContractors, setFilteredContractors] = useState<Contractor[]>([]);
  const [isContractorFormOpen, setIsContractorFormOpen] = useState(false);
  const [editingContractor, setEditingContractor] = useState<Contractor | null>(null);
  const [contractorSearchTerm, setContractorSearchTerm] = useState("");
  const [contractorFilterCategory, setContractorFilterCategory] = useState("all");

  // Supplier state  
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [isSupplierFormOpen, setIsSupplierFormOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [supplierSearchTerm, setSupplierSearchTerm] = useState("");
  const [supplierFilterCategory, setSupplierFilterCategory] = useState("all");

  const [activeSection, setActiveSection] = useState("contractors");
  const [loading, setLoading] = useState(true);

  // Load contractor data from backend API
  useEffect(() => {
    const fetchContractors = async () => {
      try {
        setLoading(true);
        const response = await contractorsAPI.getAll();
        console.log('Contractors API Response:', response.data);
        
        // Handle different response structures
        let contractorsData: Contractor[] = [];
        if (Array.isArray(response.data)) {
          contractorsData = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          contractorsData = response.data.data;
        } else if (response.data.success && Array.isArray(response.data.data)) {
          contractorsData = response.data.data;
        }
        
        setContractors(contractorsData);
        setFilteredContractors(contractorsData);
      } catch (error: any) {
        console.error("Error fetching contractors:", error);
        toast({
          title: "Error",
          description: error.response?.data?.error || error.response?.data?.message || "Failed to fetch contractors",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (activeSection === "contractors") {
      fetchContractors();
    }
  }, [activeSection]);

  // Load supplier data from backend API
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        const response = await suppliersAPI.getAll();
        console.log('Suppliers API Response:', response.data);
        
        // Handle different response structures
        let suppliersData: Supplier[] = [];
        if (Array.isArray(response.data)) {
          suppliersData = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          suppliersData = response.data.data;
        } else if (response.data.success && Array.isArray(response.data.data)) {
          suppliersData = response.data.data;
        }
        
        setSuppliers(suppliersData);
        setFilteredSuppliers(suppliersData);
      } catch (error: any) {
        console.error("Error fetching suppliers:", error);
        toast({
          title: "Error",
          description: error.response?.data?.error || error.response?.data?.message || "Failed to fetch suppliers",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (activeSection === "suppliers") {
      fetchSuppliers();
    }
  }, [activeSection]);

  // Filter contractors based on search and category filter
  useEffect(() => {
    let filtered = contractors;

    if (contractorSearchTerm) {
      filtered = filtered.filter(contractor =>
        contractor.name.toLowerCase().includes(contractorSearchTerm.toLowerCase()) ||
        contractor.contactNo.includes(contractorSearchTerm) ||
        contractor.address.toLowerCase().includes(contractorSearchTerm.toLowerCase()) ||
        contractor.workCategory.toLowerCase().includes(contractorSearchTerm.toLowerCase()) ||
        contractor.remarks.toLowerCase().includes(contractorSearchTerm.toLowerCase())
      );
    }

    if (contractorFilterCategory && contractorFilterCategory !== "all") {
      filtered = filtered.filter(contractor =>
        contractor.workCategory === contractorFilterCategory
      );
    }

    setFilteredContractors(filtered);
  }, [contractors, contractorSearchTerm, contractorFilterCategory]);

  // Filter suppliers based on search and category filter
  useEffect(() => {
    let filtered = suppliers;

    if (supplierSearchTerm) {
      filtered = filtered.filter(supplier =>
        supplier.name.toLowerCase().includes(supplierSearchTerm.toLowerCase()) ||
        supplier.contactNo.includes(supplierSearchTerm) ||
        supplier.address.toLowerCase().includes(supplierSearchTerm.toLowerCase()) ||
        supplier.category.toLowerCase().includes(supplierSearchTerm.toLowerCase()) ||
        supplier.suppliedItems.toLowerCase().includes(supplierSearchTerm.toLowerCase()) ||
        supplier.remarks.toLowerCase().includes(supplierSearchTerm.toLowerCase())
      );
    }

    if (supplierFilterCategory && supplierFilterCategory !== "all") {
      filtered = filtered.filter(supplier =>
        supplier.category === supplierFilterCategory
      );
    }

    setFilteredSuppliers(filtered);
  }, [suppliers, supplierSearchTerm, supplierFilterCategory]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  // Contractor handlers
  const handleAddContractor = () => {
    setEditingContractor(null);
    setIsContractorFormOpen(true);
  };

  const handleEditContractor = (contractor: Contractor) => {
    setEditingContractor(contractor);
    setIsContractorFormOpen(true);
  };

  const handleDeleteContractor = async (id: string) => {
    try {
      await contractorsAPI.delete(id);
      setContractors(prev => prev.filter(c => c.id !== id));
      toast({
        title: "Contractor deleted",
        description: "Contractor has been successfully removed",
      });
    } catch (error: any) {
      console.error("Error deleting contractor:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || error.response?.data?.message || "Failed to delete contractor",
        variant: "destructive",
      });
    }
  };

  const handleSaveContractor = async (contractorData: ContractorFormData) => {
    try {
      let response;
      
      if (editingContractor) {
        // Update existing contractor
        response = await contractorsAPI.update(editingContractor.id, contractorData);
        console.log('Update Contractor Response:', response.data);
        
        const updatedContractor = response.data.data || response.data;
        setContractors(prev =>
          prev.map(c =>
            c.id === editingContractor.id ? { ...updatedContractor, id: editingContractor.id } : c
          )
        );
        toast({
          title: "Contractor updated",
          description: "Contractor information has been successfully updated",
        });
      } else {
        // Add new contractor
        response = await contractorsAPI.create(contractorData);
        console.log('Create Contractor Response:', response.data);
        
        const newContractor = response.data.data || response.data;
        setContractors(prev => [...prev, newContractor]);
        toast({
          title: "Contractor added",
          description: "New contractor has been successfully added",
        });
      }
      setIsContractorFormOpen(false);
      setEditingContractor(null);
    } catch (error: any) {
      console.error("Error saving contractor:", error);
      console.error("Error response:", error.response?.data);
      toast({
        title: "Error",
        description: error.response?.data?.error || error.response?.data?.message || "Failed to save contractor",
        variant: "destructive",
      });
    }
  };

  // Supplier handlers
  const handleAddSupplier = () => {
    setEditingSupplier(null);
    setIsSupplierFormOpen(true);
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsSupplierFormOpen(true);
  };

  const handleDeleteSupplier = async (id: string) => {
    try {
      await suppliersAPI.delete(id);
      setSuppliers(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Supplier deleted",
        description: "Supplier has been successfully removed",
      });
    } catch (error: any) {
      console.error("Error deleting supplier:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || error.response?.data?.message || "Failed to delete supplier",
        variant: "destructive",
      });
    }
  };

  const handleSaveSupplier = async (supplierData: SupplierFormData) => {
    try {
      let response;
      
      if (editingSupplier) {
        // Update existing supplier
        response = await suppliersAPI.update(editingSupplier.id, supplierData);
        console.log('Update Supplier Response:', response.data);
        
        const updatedSupplier = response.data.data || response.data;
        setSuppliers(prev =>
          prev.map(s =>
            s.id === editingSupplier.id ? { ...updatedSupplier, id: editingSupplier.id } : s
          )
        );
        toast({
          title: "Supplier updated",
          description: "Supplier information has been successfully updated",
        });
      } else {
        // Add new supplier
        response = await suppliersAPI.create(supplierData);
        console.log('Create Supplier Response:', response.data);
        
        const newSupplier = response.data.data || response.data;
        setSuppliers(prev => [...prev, newSupplier]);
        toast({
          title: "Supplier added",
          description: "New supplier has been successfully added",
        });
      }
      setIsSupplierFormOpen(false);
      setEditingSupplier(null);
    } catch (error: any) {
      console.error("Error saving supplier:", error);
      console.error("Error response:", error.response?.data);
      toast({
        title: "Error",
        description: error.response?.data?.error || error.response?.data?.message || "Failed to save supplier",
        variant: "destructive",
      });
    }
  };

  const exportContractorsToCSV = () => {
    const headers = ["S. NO", "NAME", "CONTACT NO", "ADDRESS", "WORK CATEGORY", "REMARKS"];
    const csvContent = [
      headers.join(","),
      ...filteredContractors.map(contractor =>
        [
          contractor.sNo,
          `"${contractor.name}"`,
          `"${contractor.contactNo}"`,
          `"${contractor.address}"`,
          `"${contractor.workCategory}"`,
          `"${contractor.remarks}"`
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `contractors_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export successful",
      description: "Contractor data has been exported to CSV",
    });
  };

  const exportSuppliersToCSV = () => {
    const headers = ["S. NO", "NAME", "CONTACT NO", "ADDRESS", "CATEGORY", "SUPPLIED ITEMS", "REMARKS"];
    const csvContent = [
      headers.join(","),
      ...filteredSuppliers.map(supplier =>
        [
          supplier.sNo,
          `"${supplier.name}"`,
          `"${supplier.contactNo}"`,
          `"${supplier.address}"`,
          `"${supplier.category}"`,
          `"${supplier.suppliedItems}"`,
          `"${supplier.remarks}"`
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `suppliers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export successful",
      description: "Supplier data has been exported to CSV",
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-background items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {activeSection === "contractors" ? "Contractor Management" : "Supplier Management"}
            </h1>
            <p className="text-muted-foreground">
              Manage your {activeSection === "contractors" ? "contractors" : "suppliers"} efficiently
            </p>
          </div>
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden p-6">
          {activeSection === "contractors" && (
            <div className="space-y-6 h-full flex flex-col">
              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex gap-3">
                  <Button 
                    onClick={handleAddContractor}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Contractor
                  </Button>
                  <Button 
                    onClick={exportContractorsToCSV}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Showing {filteredContractors.length} of {contractors.length} contractors
                </div>
              </div>

              {/* Search and Filter */}
              <SearchAndFilter
                searchTerm={contractorSearchTerm}
                onSearchChange={setContractorSearchTerm}
                filterCategory={contractorFilterCategory}
                onFilterChange={setContractorFilterCategory}
                contractors={contractors}
              />

              {/* Table */}
              <div className="flex-1 overflow-hidden">
                <ContractorTable
                  contractors={filteredContractors}
                  onEdit={handleEditContractor}
                  onDelete={handleDeleteContractor}
                />
              </div>
            </div>
          )}

          {activeSection === "suppliers" && (
            <div className="space-y-6 h-full flex flex-col">
              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex gap-3">
                  <Button 
                    onClick={handleAddSupplier}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Supplier
                  </Button>
                  <Button 
                    onClick={exportSuppliersToCSV}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Showing {filteredSuppliers.length} of {suppliers.length} suppliers
                </div>
              </div>

              {/* Search and Filter */}
              <SupplierSearchAndFilter
                searchTerm={supplierSearchTerm}
                onSearchChange={setSupplierSearchTerm}
                filterCategory={supplierFilterCategory}
                onFilterChange={setSupplierFilterCategory}
                suppliers={suppliers}
              />

              {/* Table */}
              <div className="flex-1 overflow-hidden">
                <SupplierTable
                  suppliers={filteredSuppliers}
                  onEdit={handleEditSupplier}
                  onDelete={handleDeleteSupplier}
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Contractor Form Modal */}
      <ContractorForm
        isOpen={isContractorFormOpen}
        onClose={() => {
          setIsContractorFormOpen(false);
          setEditingContractor(null);
        }}
        onSave={handleSaveContractor}
        contractor={editingContractor}
      />

      {/* Supplier Form Modal */}
      <SupplierForm
        isOpen={isSupplierFormOpen}
        onClose={() => {
          setIsSupplierFormOpen(false);
          setEditingSupplier(null);
        }}
        onSave={handleSaveSupplier}
        supplier={editingSupplier}
      />
    </div>
  );
};

export default Dashboard;