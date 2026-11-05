import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DashboardContext } from "./DashboardContext";

const RecordsContext = createContext();

// Estados base; se combinan con los que ya existan en la tabla
const ESTADOS_BASE = ["Pendiente", "En progreso", "Completado"];

// Fecha local en formato YYYY-MM-DD (toISOString usaría UTC y puede adelantar el día)
const getToday = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

const getDefaultValues = () => ({
  id_usuario: "",
  id_reto: "",
  fecha_registro: getToday(),
  estado: "Pendiente",
  observacion: "",
});

function RecordsProvider({ children }) {
  const { markAsUpdated } = useContext(DashboardContext);
  const [records, setRecords] = useState([]);
  const [users, setUsers] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: getDefaultValues() });

  useEffect(() => {
    // Registros + usuarios y retos (para los selects de la modal y para mostrar nombres)
    Promise.all([
      axios.get("http://localhost:3001/api/registros"),
      axios.get("http://localhost:3001/api/usuarios"),
      axios.get("http://localhost:3001/api/retos"),
    ])
      .then(([recordsResponse, usersResponse, challengesResponse]) => {
        setRecords(recordsResponse.data);
        setUsers(usersResponse.data);
        setChallenges(challengesResponse.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("No se pudieron cargar los registros");
      })
      .finally(() => setLoading(false));
  }, []);

  // Estados base + los que ya existan en los registros (sin repetir)
  const estados = [
    ...new Set([
      ...ESTADOS_BASE,
      ...records.map((record) => record.estado).filter(Boolean),
    ]),
  ];

  const filteredRecords = records.filter((record) => {
    // fecha_registro puede llegar como timestamp ISO; los inputs date usan YYYY-MM-DD
    const fecha = record.fecha_registro?.slice(0, 10);

    return (
      (record.observacion ?? "")
        .toLowerCase()
        .includes(search.trim().toLowerCase()) &&
      (!estado || record.estado === estado) &&
      (!fechaDesde || fecha >= fechaDesde) &&
      (!fechaHasta || fecha <= fechaHasta)
    );
  });

  const hasFilters =
    search.trim() !== "" ||
    estado !== "" ||
    fechaDesde !== "" ||
    fechaHasta !== "";

  const clearFilters = () => {
    setSearch("");
    setEstado("");
    setFechaDesde("");
    setFechaHasta("");
  };

  const openCreateModal = () => {
    setEditingRecord(null);
    reset(getDefaultValues());
    setShowCreateModal(true);
  };

  // Cierra la modal y restablece el formulario (con la fecha de hoy y estado pendiente)
  const closeCreateModal = useCallback(() => {
    setShowCreateModal(false);
    setEditingRecord(null);
    reset(getDefaultValues());
  }, [reset]);

  const createRecord = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/api/registros", {
        // Los ids son UUID (texto), no se convierten a número
        id_usuario: data.id_usuario,
        id_reto: data.id_reto,
        fecha_registro: data.fecha_registro,
        estado: data.estado,
        observacion: data.observacion.trim() || null,
      });
      setRecords((prev) => [...prev, response.data]);
      markAsUpdated();
      toast.success("Registro creado", {
        description: `${response.data.usuario} · ${response.data.reto}`,
      });
      closeCreateModal();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo crear el registro", {
        description:
          error.response?.data?.error ?? `Error ${error.response?.status ?? ""} ${error.message}`,
      });
    }
  };

  const updateRecord = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/registros/${editingRecord.id}`,
        {
          id_usuario: data.id_usuario,
          id_reto: data.id_reto,
          fecha_registro: data.fecha_registro,
          estado: data.estado,
          observacion: data.observacion.trim() || null,
        },
      );
      setRecords((prev) =>
        prev.map((item) => (item.id === editingRecord.id ? response.data : item)),
      );
      markAsUpdated();
      toast.success("Registro actualizado", {
        description: `${response.data.usuario} · ${response.data.reto}`,
      });
      closeCreateModal();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar el registro", {
        description:
          error.response?.data?.error ?? `Error ${error.response?.status ?? ""} ${error.message}`,
      });
    }
  };

  // La misma modal sirve para crear y para editar
  const onCreate = handleSubmit((data) =>
    editingRecord ? updateRecord(data) : createRecord(data),
  );

  const deleteRecord = async (record) => {
    try {
      await axios.delete(`http://localhost:3001/api/registros/${record.id}`);
      setRecords((prev) => prev.filter((item) => item.id !== record.id));
      markAsUpdated();
      toast.success("Registro eliminado", {
        description: `Registro #${record.id}`,
      });
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar el registro", {
        description: "Intenta de nuevo más tarde",
      });
    }
  };

  const onEdit = (record) => {
    setEditingRecord(record);
    reset({
      id_usuario: record.id_usuario,
      id_reto: record.id_reto,
      fecha_registro: record.fecha_registro?.slice(0, 10) ?? getToday(),
      estado: record.estado,
      observacion: record.observacion ?? "",
    });
    setShowCreateModal(true);
  };

  const onDelete = (record) => {
    toast.warning(`¿Eliminar el registro #${record.id}?`, {
      description: "Esta acción no se puede deshacer",
      action: { label: "Eliminar", onClick: () => deleteRecord(record) },
      cancel: { label: "Cancelar", onClick: () => {} },
    });
  };

  return (
    <RecordsContext.Provider
      value={{
        filteredRecords,
        loading,
        search,
        setSearch,
        estado,
        setEstado,
        fechaDesde,
        setFechaDesde,
        fechaHasta,
        setFechaHasta,
        hasFilters,
        clearFilters,
        users,
        challenges,
        estados,
        onEdit,
        onDelete,
        showCreateModal,
        openCreateModal,
        closeCreateModal,
        register,
        errors,
        isSubmitting,
        onCreate,
        editingRecord,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
}

export { RecordsContext, RecordsProvider };