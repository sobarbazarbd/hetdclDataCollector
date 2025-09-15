import { useState } from "react";
import { Edit, Trash2, Download, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import type { Supplier } from "@/data/suppliers";

interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: string) => void;
}

const SupplierTable = ({ suppliers, onEdit, onDelete }: SupplierTableProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const downloadSupplierDoc = (supplier: Supplier) => {
    const docContent = `S. NO: ${supplier.sNo}
Name: ${supplier.name}
Contact No: ${supplier.contactNo}
Address: ${supplier.address}
Category: ${supplier.category}
Supplied Items: ${supplier.suppliedItems}
Remarks: ${supplier.remarks}`;

    const blob = new Blob([docContent], { type: "application/msword" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${supplier.name.replace(/\s+/g, "_")}_details.doc`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Document downloaded",
      description: `${supplier.name}'s details have been downloaded`,
    });
  };

  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  if (suppliers.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="text-muted-foreground text-lg">No suppliers found</div>
            <div className="text-muted-foreground text-sm mt-2">
              Try adjusting your search or filter criteria
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">S. NO</TableHead>
                  <TableHead className="font-semibold">NAME</TableHead>
                  <TableHead className="font-semibold">CONTACT NO</TableHead>
                  <TableHead className="font-semibold">ADDRESS</TableHead>
                  <TableHead className="font-semibold">CATEGORY</TableHead>
                  <TableHead className="font-semibold">SUPPLIED ITEMS</TableHead>
                  <TableHead className="font-semibold">REMARKS</TableHead>
                  <TableHead className="font-semibold text-center">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{supplier.sNo}</TableCell>
                    <TableCell className="font-medium text-foreground">
                      {supplier.name}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {supplier.contactNo}
                    </TableCell>
                    <TableCell className="max-w-48">
                      <div className="truncate" title={supplier.address}>
                        {supplier.address}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-light text-success border border-success/20">
                        {supplier.category}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-48">
                      <div className="truncate" title={supplier.suppliedItems}>
                        {supplier.suppliedItems}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-64">
                      <div className="truncate" title={supplier.remarks}>
                        {supplier.remarks}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        {/* Mobile: Dropdown Menu */}
                        <div className="md:hidden">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-card">
                              <DropdownMenuItem
                                onClick={() => downloadSupplierDoc(supplier)}
                                className="cursor-pointer"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download DOC
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onEdit(supplier)}
                                className="cursor-pointer"
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setDeleteId(supplier.id)}
                                className="cursor-pointer text-destructive"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Desktop: Individual Buttons */}
                        <div className="hidden md:flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadSupplierDoc(supplier)}
                            title="Download as DOC"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onEdit(supplier)}
                            title="Edit supplier"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDeleteId(supplier.id)}
                            title="Delete supplier"
                            className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Supplier</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this supplier? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SupplierTable;