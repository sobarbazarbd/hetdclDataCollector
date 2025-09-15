"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ContractorForm from "./ContractorForm";
import { Button } from "@/components/ui/button";

const API_URL = "/api/contractors"; // 🔹 backend API base path

export default function ContractorList() {
  const [contractors, setContractors] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);

  const fetchContractors = async () => {
    try {
      const res = await axios.get(API_URL);
      setContractors(res.data);
    } catch (err) {
      console.error("Failed to fetch contractors", err);
    }
  };

  const deleteContractor = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchContractors();
    } catch (err) {
      console.error("Failed to delete contractor", err);
    }
  };

  useEffect(() => {
    fetchContractors();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <Button onClick={() => { setSelected(null); setOpen(true); }}>
        + Add Contractor
      </Button>

      <div className="border rounded-lg p-4">
        {contractors.length === 0 ? (
          <p>No contractors found</p>
        ) : (
          <ul className="space-y-2">
            {contractors.map(c => (
              <li key={c.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm">{c.contactNo} | {c.workCategory}</p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => { setSelected(c); setOpen(true); }}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteContractor(c.id)}>
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ContractorForm
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={fetchContractors}
        contractor={selected}
      />
    </div>
  );
}
