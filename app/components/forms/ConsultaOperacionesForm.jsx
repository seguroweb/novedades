import SelectField from "../ui/SelectField";
import DateField from "../ui/DateField";
import { AlertTriangle, Eye } from "lucide-react";

const ConsultaOperacionesForm = ({ formData, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SelectField
        label="Buscar por:"
        name="buscarPor"
        value={formData.buscarPor}
        onChange={onChange}
        options={["Fecha", "Numero", "Cliente", "Asunto"]}
      />
      <SelectField
        label="Sector:"
        name="sector"
        value={formData.sector}
        onChange={onChange}
        options={[
          "Todos",
          "Ventas",
          "Siniestros",
          "Atención al Cliente",
          "Técnico",
          "Administración",
        ]}
      />
      <SelectField
        label="Estado:"
        name="estado"
        value={formData.estado}
        onChange={onChange}
        options={["Pendiente", "En Proceso", "Resuelto", "Cerrado", "Todos"]}
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DateField
        label="Fecha desde:"
        name="fechaDesde"
        value={formData.fechaDesde}
        onChange={onChange}
      />
      <DateField
        label="Fecha hasta:"
        name="fechaHasta"
        value={formData.fechaHasta}
        onChange={onChange}
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SelectField
        label="Motivo:"
        name="motivo"
        value={formData.motivo}
        onChange={onChange}
        options={[
          "Todos",
          "Consulta General",
          "Reclamo",
          "Siniestro",
          "Modificación de Póliza",
          "Cancelación",
          "Renovación",
          "Problema Técnico",
        ]}
      />
      <SelectField
        label="Compañía:"
        name="compania"
        value={formData.compania}
        onChange={onChange}
        options={[
          "Todos",
          "Allianz",
          "Zurich",
          "La Caja",
          "Sancor Seguros",
          "Federación Patronal",
          "Mercantil Andina",
        ]}
      />
    </div>

    <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
      <button
        type="submit"
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
      >
        <Eye className="h-4 w-4" />
        Ver Tickets
      </button>
      <button
        type="button"
        className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
      >
        <AlertTriangle className="h-4 w-4" />
        Alerta
      </button>
    </div>
  </form>
);

export default ConsultaOperacionesForm;
