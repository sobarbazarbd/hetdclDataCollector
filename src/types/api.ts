export interface Contractor {
  _id?: string;
  id: string;
  sNo: number;
  name: string;
  contactNo: string;
  address: string;
  workCategory: string;
  remarks: string;
}

export interface Supplier {
  _id?: string;
  id: string;
  sNo: number;
  name: string;
  contactNo: string;
  address: string;
  category: string;
  suppliedItems: string;
  remarks: string;
}

export interface ContractorFormData {
  name: string;
  contactNo: string;
  address: string;
  workCategory: string;
  remarks: string;
}

export interface SupplierFormData {
  name: string;
  contactNo: string;
  address: string;
  category: string;
  suppliedItems: string;
  remarks: string;
}