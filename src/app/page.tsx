"use client";

import { useState } from "react";

type Relationship = "spouse" | "child" | "parent" | "sibling" | undefined;

type Heir = {
  id: number;
  relationship: Relationship;
  gender: "male" | "female" | undefined;
  count?: number;
};

// Iranian Civil Law inheritance shares
const calculateLegalShares = (
  totalAmount: number,
  heirs: Heir[],
): Record<number, number> => {
  const shares: Record<number, number> = {};
  let remainingAmount = totalAmount;

  // Check for spouse
  const spouse = heirs.find((h) => h.relationship === "spouse");
  if (spouse) {
    // Wife gets 1/8 if there are children, 1/4 if no children
    // Husband gets 1/4 if there are children, 1/2 if no children
    const hasChildren = heirs.some((h) => h.relationship === "child");
    if (spouse.gender === "female") {
      const wifeShare = hasChildren
        ? totalAmount * (1 / 8)
        : totalAmount * (1 / 4);
      shares[spouse.id] = wifeShare;
      remainingAmount -= wifeShare;
    } else {
      const husbandShare = hasChildren
        ? totalAmount * (1 / 4)
        : totalAmount * (1 / 2);
      shares[spouse.id] = husbandShare;
      remainingAmount -= husbandShare;
    }
  }

  // Calculate children's shares
  const sons = heirs.filter(
    (h) => h.relationship === "child" && h.gender === "male",
  );
  const daughters = heirs.filter(
    (h) => h.relationship === "child" && h.gender === "female",
  );

  if (sons.length > 0 || daughters.length > 0) {
    const totalShares = sons.length * 2 + daughters.length;
    const shareUnit = remainingAmount / totalShares;

    sons.forEach((son) => {
      shares[son.id] = shareUnit * 2;
    });

    daughters.forEach((daughter) => {
      shares[daughter.id] = shareUnit;
    });

    return shares;
  }

  // If no children, check for parents
  const parents = heirs.filter((h) => h.relationship === "parent");
  if (parents.length > 0) {
    const parentShare = remainingAmount / parents.length;
    parents.forEach((parent) => {
      shares[parent.id] = parentShare;
    });
    return shares;
  }

  // If no parents, check for siblings
  const siblings = heirs.filter((h) => h.relationship === "sibling");
  if (siblings.length > 0) {
    const siblingShare = remainingAmount / siblings.length;
    siblings.forEach((sibling) => {
      shares[sibling.id] = siblingShare;
    });
  }

  return shares;
};

export default function InheritancePage() {
  const [totalAmount, setTotalAmount] = useState("");
  const [heirs, setHeirs] = useState<Heir[]>([]);
  const [shares, setShares] = useState<Record<number, number>>({});
  const [error, setError] = useState<string>("");

  const addHeir = () => {
    const newHeir = {
      id: Date.now(),
      relationship: undefined,
      gender: undefined,
    };
    setHeirs([...heirs, newHeir]);
  };

  const removeHeir = (id: number) => {
    setHeirs(heirs.filter((heir) => heir.id !== id));
  };

  const updateHeir = (
    id: number,
    field: "relationship" | "gender",
    value: string,
  ) => {
    setHeirs(
      heirs.map((heir) =>
        heir.id === id ? { ...heir, [field]: value } : heir,
      ),
    );
  };

  const validateHeirs = (): boolean => {
    // Check if there's more than one spouse
    const spouses = heirs.filter((h) => h.relationship === "spouse");
    if (spouses.length > 1) {
      setError("بیش از یک همسر نمی‌تواند وجود داشته باشد");
      return false;
    }

    // Check if all heirs have complete information
    const incompleteHeirs = heirs.some(
      (heir) => !heir.relationship || !heir.gender,
    );
    if (incompleteHeirs) {
      setError("لطفاً اطلاعات تمام وراث را کامل کنید");
      return false;
    }

    return true;
  };

  const calculateShares = () => {
    setError("");

    if (!totalAmount || heirs.length === 0) {
      setError("لطفاً مقدار کل ماترک و وراث را وارد کنید");
      return;
    }

    if (!validateHeirs()) {
      return;
    }

    const amount = Number.parseFloat(totalAmount);
    const calculatedShares = calculateLegalShares(amount, heirs);
    setShares(calculatedShares);
  };

  return (
    <div className="container mx-auto p-4 space-y-6" dir="rtl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl justify-center">محاسبه ماترک</h2>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">مقدار کل ماترک:</span>
            </label>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              placeholder="مقدار کل را وارد کنید"
              className="input input-bordered w-full text-left ltr"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">وراث</h3>
              <button
                onClick={addHeir}
                className="btn btn-outline btn-sm gap-2"
              >
                {/*<Plus className="w-4 h-4" />*/}
                افزودن وارث
              </button>
            </div>

            {heirs.map((heir) => (
              <div
                key={heir.id}
                className="flex items-center gap-4 p-4 border rounded-lg"
              >
                <select
                  className="select select-bordered w-full max-w-xs"
                  value={heir.relationship}
                  onChange={(e) =>
                    updateHeir(heir.id, "relationship", e.target.value)
                  }
                >
                  <option value="">نسبت</option>
                  <option value="spouse">همسر</option>
                  <option value="child">فرزند</option>
                  <option value="parent">والدین</option>
                  <option value="sibling">خواهر/برادر</option>
                </select>

                <select
                  className="select select-bordered w-full max-w-xs"
                  value={heir.gender}
                  onChange={(e) =>
                    updateHeir(heir.id, "gender", e.target.value)
                  }
                >
                  <option value="">جنسیت</option>
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                </select>

                <button
                  className="btn btn-error btn-square btn-sm"
                  onClick={() => removeHeir(heir.id)}
                >
                  {/*<Trash2 className="w-4 h-4" />*/}
                </button>
              </div>
            ))}
          </div>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <button onClick={calculateShares} className="btn btn-primary w-full">
            محاسبه سهم‌ها
          </button>

          {Object.keys(shares).length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">نتایج محاسبه</h3>
              <div className="space-y-2">
                {heirs.map((heir) => (
                  <div
                    key={heir.id}
                    className="flex justify-between p-4 bg-base-200 rounded-lg"
                  >
                    <span>
                      {heir.relationship === "spouse" &&
                        (heir.gender === "male" ? "همسر (مرد)" : "همسر (زن)")}
                      {heir.relationship === "child" &&
                        (heir.gender === "male"
                          ? "فرزند (پسر)"
                          : "فرزند (دختر)")}
                      {heir.relationship === "parent" && "والدین"}
                      {heir.relationship === "sibling" && "خواهر/برادر"}
                    </span>
                    <span className="font-medium">
                      {shares[heir.id].toLocaleString()} ریال
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
