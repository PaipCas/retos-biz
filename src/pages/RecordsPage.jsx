import { useContext } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { RecordsContext } from "../context/RecordsContext";
import Title from "../components/container/Title";
import Table from "../components/tables/Table";
import ActionButton from "../components/tables/ActionButton";
import RecordsToolbar from "../components/records/RecordsToolbar";
import RecordModal from "../components/records/RecordModal";

// Color de cada estado (la clave va en minúsculas; el texto mostrado es el de la base de datos)
const ESTADOS = {
  pendiente: "bg-amber-50 text-amber-700 border-amber-200",
  "en progreso": "bg-blue-50 text-blue-700 border-blue-200",
  completado: "bg-green-50 text-green-700 border-green-200",
};

// YYYY-MM-DD → DD/MM/YYYY sin pasar por Date (evita el desfase por zona horaria)
const formatDate = (value) => {
  if (!value) return "—";
  const [year, month, day] = value.slice(0, 10).split("-");
  return `${day}/${month}/${year}`;
};

export default function RecordsPage() {
  const { filteredRecords, loading, hasFilters, onEdit, onDelete } =
    useContext(RecordsContext);

  const columns = [
    {
      key: "fecha_registro",
      header: "Fecha",
      sortable: true,
      className: "whitespace-nowrap",
      render: (row) => formatDate(row.fecha_registro),
    },
    {
      key: "id_usuario",
      header: "Usuario",
      className: "font-500 text-slate-900 whitespace-nowrap",
      render: (row) => row.usuario,
    },
    {
      key: "id_reto",
      header: "Reto",
      className: "whitespace-nowrap",
      render: (row) => row.reto,
    },
    {
      key: "estado",
      header: "Estado",
      sortable: true,
      render: (row) => {
        const className =
          ESTADOS[row.estado?.toLowerCase()] ??
          "bg-slate-50 text-slate-700 border-slate-200";

        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 text-xs font-500 rounded-full border whitespace-nowrap ${className}`}
          >
            {row.estado}
          </span>
        );
      },
    },
    {
      key: "observacion",
      header: "Observación",
      className: "text-slate-500",
      render: (row) => row.observacion || "—",
    },
    {
      key: "acciones",
      header: "Acciones",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover/row:opacity-100 group-focus-within/row:opacity-100 transition-opacity duration-150">
          <ActionButton
            icon={Pencil}
            label="Editar registro"
            variant="edit"
            onClick={() => onEdit(row)}
          />
          <ActionButton
            icon={Trash2}
            label="Eliminar registro"
            variant="danger"
            onClick={() => onDelete(row)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Title
        text="Registros"
        subtitle="Seguimiento del avance de los usuarios en los retos"
      />

      <Table
        columns={columns}
        data={filteredRecords}
        loading={loading}
        toolbar={<RecordsToolbar />}
        emptyMessage={
          hasFilters
            ? "No hay registros que coincidan con los filtros"
            : "Aún no hay registros"
        }
      />

      <RecordModal />
    </>
  );
}
