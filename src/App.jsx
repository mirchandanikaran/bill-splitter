import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export default function App() {
  const [bill, setBill] = useState(0);
  const [people, setPeople] = useState([{ name: "", amount: 0 }]);
  const [equalSplit, setEqualSplit] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const updatePerson = (index, field, value) => {
    const updated = [...people];
    updated[index][field] = field === "amount" ? parseFloat(value) : value;
    setPeople(updated);
  };

  const addPerson = () => {
    setPeople([...people, { name: "", amount: 0 }]);
  };

  const removePerson = (index) => {
    setPeople(people.filter((_, i) => i !== index));
  };

  const totalPaid = people.reduce((sum, person) => sum + (parseFloat(person.amount) || 0), 0);
  const billMatch = totalPaid === bill;
  const equalAmount = bill / people.length;

  return (
    <div style={{ padding: 20 }}>
      <h1>Bill Splitter</h1>
      <input
        type="number"
        placeholder="Total Bill"
        value={bill}
        onChange={(e) => setBill(parseFloat(e.target.value))}
      />
      <br /><br />
      <label>
        <input
          type="checkbox"
          checked={equalSplit}
          onChange={() => setEqualSplit(!equalSplit)}
        /> Equal Split
      </label>
      <br /><br />
      {people.map((p, i) => (
        <div key={i}>
          <input
            placeholder="Name"
            value={p.name}
            onChange={(e) => updatePerson(i, "name", e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={p.amount}
            onChange={(e) => updatePerson(i, "amount", e.target.value)}
            disabled={equalSplit}
          />
          <button onClick={() => removePerson(i)}>Remove</button>
        </div>
      ))}
      <br />
      <button onClick={addPerson}>Add Person</button>
      <p style={{ color: billMatch ? "green" : "red" }}>
        Total Paid: ₹{totalPaid.toFixed(2)} {billMatch ? "(Matches Bill)" : "(Mismatch)"}
      </p>
    </div>
  );
}
