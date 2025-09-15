export interface Supplier {
  id: string;
  sNo: number;
  name: string;
  contactNo: string;
  address: string;
  category: string;
  suppliedItems: string;
  remarks: string;
}

// Pre-loaded sample data with 20 suppliers
export const initialSuppliers: Supplier[] = [
  { id: "1", sNo: 1, name: "Steel Tech Industries", contactNo: "+880 17 1111 2222", address: "Dhaka Industrial Area, Bangladesh", category: "Construction Materials", suppliedItems: "Steel bars, beams, plates", remarks: "High quality steel supplier for construction" },
  { id: "2", sNo: 2, name: "Cement Solutions Ltd", contactNo: "+880 18 2222 3333", address: "Chittagong Port Area, Bangladesh", category: "Construction Materials", suppliedItems: "Portland cement, quick-set cement", remarks: "Bulk cement supplier with reliable delivery" },
  { id: "3", sNo: 3, name: "ElectroMax Supply", contactNo: "+880 19 3333 4444", address: "Sylhet Commercial Zone, Bangladesh", category: "Electrical Supplies", suppliedItems: "Cables, switches, outlets, panels", remarks: "Complete electrical components supplier" },
  { id: "4", sNo: 4, name: "Pipe & Fittings Co", contactNo: "+880 17 4444 5555", address: "Rajshahi Industrial Park, Bangladesh", category: "Plumbing Supplies", suppliedItems: "PVC pipes, fittings, valves", remarks: "Specialized in plumbing and water systems" },
  { id: "5", sNo: 5, name: "Paint Masters Inc", contactNo: "+880 18 5555 6666", address: "Khulna Business District, Bangladesh", category: "Paints & Coatings", suppliedItems: "Interior paints, exterior coatings, primers", remarks: "Premium quality paints and finishes" },
  { id: "6", sNo: 6, name: "Brick & Block Suppliers", contactNo: "+880 19 6666 7777", address: "Barisal Manufacturing Hub, Bangladesh", category: "Construction Materials", suppliedItems: "Clay bricks, concrete blocks, tiles", remarks: "Local brick manufacturer with good prices" },
  { id: "7", sNo: 7, name: "Roofing Solutions Pro", contactNo: "+880 17 7777 8888", address: "Rangpur Trade Center, Bangladesh", category: "Roofing Materials", suppliedItems: "Metal sheets, tiles, waterproofing", remarks: "Complete roofing material solutions" },
  { id: "8", sNo: 8, name: "Hardware Central", contactNo: "+880 18 8888 9999", address: "Comilla Hardware Market, Bangladesh", category: "Hardware & Tools", suppliedItems: "Screws, bolts, tools, fasteners", remarks: "One-stop shop for hardware needs" },
  { id: "9", sNo: 9, name: "HVAC Components Ltd", contactNo: "+880 19 9999 0000", address: "Jessore Tech Park, Bangladesh", category: "HVAC Supplies", suppliedItems: "AC units, ducts, ventilation systems", remarks: "Commercial HVAC system supplier" },
  { id: "10", sNo: 10, name: "Flooring Experts", contactNo: "+880 17 0000 1111", address: "Mymensingh Commercial Area, Bangladesh", category: "Flooring Materials", suppliedItems: "Tiles, marble, wooden flooring", remarks: "Premium flooring materials supplier" },
  { id: "11", sNo: 11, name: "Transport & Logistics Co", contactNo: "+880 18 1111 2222", address: "Tangail Highway Junction, Bangladesh", category: "Transportation", suppliedItems: "Trucks, equipment transport, delivery", remarks: "Reliable material transportation services" },
  { id: "12", sNo: 12, name: "Welding Supplies Hub", contactNo: "+880 19 2222 3333", address: "Narsingdi Industrial Zone, Bangladesh", category: "Welding Equipment", suppliedItems: "Welding rods, gases, equipment", remarks: "Complete welding supply solutions" },
  { id: "13", sNo: 13, name: "Glass & Glazing Co", contactNo: "+880 17 3333 4444", address: "Narayanganj Glass Market, Bangladesh", category: "Glass & Glazing", suppliedItems: "Window glass, mirrors, safety glass", remarks: "Custom glass cutting and installation" },
  { id: "14", sNo: 14, name: "Timber & Wood Works", contactNo: "+880 18 4444 5555", address: "Gazipur Timber Market, Bangladesh", category: "Wood & Timber", suppliedItems: "Lumber, plywood, engineered wood", remarks: "Sustainable wood supplier with certification" },
  { id: "15", sNo: 15, name: "Safety Equipment Pro", contactNo: "+880 19 5555 6666", address: "Dinajpur Safety District, Bangladesh", category: "Safety Equipment", suppliedItems: "Helmets, harnesses, safety gear", remarks: "Complete construction safety equipment" },
  { id: "16", sNo: 16, name: "Garden Supply Center", contactNo: "+880 17 6666 7777", address: "Bogra Agricultural Zone, Bangladesh", category: "Landscaping Supplies", suppliedItems: "Plants, soil, garden tools, fertilizers", remarks: "Landscaping and gardening materials" },
  { id: "17", sNo: 17, name: "Cleaning Solutions Ltd", contactNo: "+880 18 7777 8888", address: "Pabna Commercial Center, Bangladesh", category: "Cleaning Supplies", suppliedItems: "Industrial cleaners, equipment, chemicals", remarks: "Professional cleaning supply distributor" },
  { id: "18", sNo: 18, name: "Heavy Machinery Rental", contactNo: "+880 19 8888 9999", address: "Sirajganj Equipment Hub, Bangladesh", category: "Equipment Rental", suppliedItems: "Excavators, cranes, bulldozers", remarks: "Heavy construction equipment rental" },
  { id: "19", sNo: 19, name: "Concrete Mix Suppliers", contactNo: "+880 17 9999 0000", address: "Kushtia Concrete Plant, Bangladesh", category: "Construction Materials", suppliedItems: "Ready-mix concrete, aggregates", remarks: "Fresh concrete delivery service" },
  { id: "20", sNo: 20, name: "Insulation Specialists", contactNo: "+880 18 0000 1111", address: "Faridpur Insulation Center, Bangladesh", category: "Insulation Materials", suppliedItems: "Thermal insulation, soundproofing", remarks: "Energy-efficient insulation solutions" }
];