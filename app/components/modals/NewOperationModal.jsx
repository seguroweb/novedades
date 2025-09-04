"use client";
import { useState } from "react";
import Link from "next/link";
import { X, ArrowRight, Upload, ListPlus } from "lucide-react";

const REQUIRED_HEADERS = [
  "producto",
  "valor asegurado",
  "nombre y apellido",
  "telefono",
];

const norm = (s = "") =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s_\-]+/g, "");

const REQUIRED_HEADERS_NORM = REQUIRED_HEADERS.map(norm);

const splitCsvLine = (line) => {
  const parts = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      parts.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  parts.push(cur);
  return parts.map((p) => p.trim());
};

const parseCsvText = (text) => {
  const clean = text.replace(/^\uFEFF/, "");
  const lines = clean.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return { headers: [], rows: [] };

  const rawHeaders = splitCsvLine(lines[0]);
  const headersNorm = rawHeaders.map(norm);

  const missing = REQUIRED_HEADERS_NORM.filter((h) => !headersNorm.includes(h));
  if (missing.length) {
    return { error: "El CSV debe contener: " + REQUIRED_HEADERS.join(", ") };
  }

  const idx = {};
  headersNorm.forEach((h, i) => (idx[h] = i));

  const rows = [];
  for (let li = 1; li < lines.length; li++) {
    const cols = splitCsvLine(lines[li]);
    if (cols.every((c) => c.trim() === "")) continue;

    const obj = {
      producto: cols[idx[norm("producto")]] ?? "",
      "valor asegurado": cols[idx[norm("valor asegurado")]] ?? "",
      "nombre y apellido": cols[idx[norm("nombre y apellido")]] ?? "",
      telefono: cols[idx[norm("telefono")]] ?? "",
    };
    rows.push(obj);
  }
  return { headers: rawHeaders, rows };
};

export function NewOperationModal({ isOpen, onClose, onBulkSubmit }) {
  const [mode, setMode] = useState("single");
  const [csvError, setCsvError] = useState("");
  const [csvPreview, setCsvPreview] = useState([]);
  const [csvCount, setCsvCount] = useState(0);

  if (!isOpen) return null;

  const handleFile = async (file) => {
    setCsvError("");
    setCsvPreview([]);
    setCsvCount(0);
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setCsvError("Subí un archivo .csv");
      return;
    }
    const text = await file.text();
    const result = parseCsvText(text);
    if (result.error) {
      setCsvError(result.error);
      return;
    }
    const rows = result.rows;
    setCsvCount(rows.length);
    setCsvPreview(rows.slice(0, 10));
  };

  const handleBulkSubmit = () => {
    if (csvCount === 0 || csvError) return;
    onBulkSubmit?.(csvPreview);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold text-gray-900">Nueva Operación</h2>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setMode("single")}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              mode === "single"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Agregar solo una
          </button>
          <button
            onClick={() => setMode("bulk")}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              mode === "bulk"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Agregar por lotes (CSV)
          </button>
        </div>

        {mode === "single" ? (
          <div className="mt-6">
            <Link href="/novedades/operaciones/consulta/nueva-operacion">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
              >
                Continuar
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <p className="mt-2 text-xs text-gray-500">
              Te lleva al formulario para una sola operación.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Subir CSV con columnas: <b>producto</b>, <b>valor asegurado</b>, <b>nombre y apellido</b>, <b>telefono</b>
              </label>
              <label className="flex cursor-pointer items-center justify-between rounded-md border border-dashed p-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Upload className="h-5 w-5 text-gray-600" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-800">Elegir archivo CSV</p>
                    <p className="text-xs text-gray-500">Separado por comas, soporta comillas.</p>
                  </div>
                </div>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </label>

              {csvError && <p className="text-sm text-red-600">{csvError}</p>}

              {csvCount > 0 && !csvError && (
                <div className="rounded-md border p-3">
                  <p className="text-sm text-gray-700">
                    Previsualización ({csvCount} filas). Mostrando primeras 10:
                  </p>
                  <div className="mt-2 max-h-48 overflow-auto text-xs">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="text-left text-gray-600">
                          <th className="px-2 py-1">producto</th>
                          <th className="px-2 py-1">valor asegurado</th>
                          <th className="px-2 py-1">nombre y apellido</th>
                          <th className="px-2 py-1">telefono</th>
                        </tr>
                      </thead>
                      <tbody>
                        {csvPreview.map((r, i) => (
                          <tr key={i} className="border-t">
                            <td className="px-2 py-1">{r.producto}</td>
                            <td className="px-2 py-1">{r["valor asegurado"]}</td>
                            <td className="px-2 py-1">{r["nombre y apellido"]}</td>
                            <td className="px-2 py-1">{r.telefono}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={onClose}
                className="rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleBulkSubmit}
                disabled={!!csvError || csvCount === 0}
                className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                <ListPlus className="h-4 w-4" />
                Agregar lote
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
