import { useContext } from "react";
import { CircleAlert, LoaderCircle, Plus } from "lucide-react";
import { RecordsContext } from "../../context/RecordsContext";
import Modal from "../container/Modal";
import Input from "../login/Input";

const selectClass = (hasError) =>
  `w-full px-3 py-2.5 text-sm border rounded-lg bg-white outline-none transition-all duration-150 focus:ring-2 focus:ring-primary-600/30 ${hasError ? "border-red-500" : "border-slate-200"}`;

function FieldError({ error }) {
  if (!error) return null;

  return (
    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
      <CircleAlert className="size-3 shrink-0" /> {error.message}
    </p>
  );
}

export default function RecordModal() {
  // users: [{ id, nombre }]  |  challenges: [{ id, titulo }]
  const {
    showCreateModal,
    closeCreateModal,
    onCreate,
    register,
    errors,
    isSubmitting,
    users,
    challenges,
    estados,
    editingRecord,
  } = useContext(RecordsContext);

  const footer = (
    <>
      <button
        type="button"
        className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-all duration-150"
        onClick={closeCreateModal}
      >
        Cancelar
      </button>

      <button
        type="submit"
        form="record-form"
        disabled={isSubmitting}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-500 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <LoaderCircle className="size-3.5 animate-spin" />
        ) : (
          <Plus className="size-3.5" />
        )}
        {isSubmitting
          ? "Guardando..."
          : editingRecord
            ? "Guardar cambios"
            : "Crear registro"}
      </button>
    </>
  );

  return (
    <Modal
      open={showCreateModal}
      onClose={closeCreateModal}
      title={editingRecord ? "Editar registro" : "Nuevo registro"}
      subtitle={
        editingRecord
          ? "Modifica los datos del registro"
          : "Registra el avance de un usuario en un reto"
      }
      footer={footer}
    >
      <form
        id="record-form"
        noValidate
        autoComplete="off"
        className="space-y-4"
        onSubmit={onCreate}
      >
        <div>
          <label htmlFor="record-user" className="block text-sm mb-1">
            Usuario
          </label>

          <select
            id="record-user"
            className={selectClass(errors.id_usuario)}
            data-required
            {...register("id_usuario", {
              required: "Campo obligatorio",
            })}
          >
            <option value="">Selecciona un usuario</option>
            {users.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nombre}
              </option>
            ))}
          </select>

          <FieldError error={errors.id_usuario} />
        </div>

        <div>
          <label htmlFor="record-challenge" className="block text-sm mb-1">
            Reto
          </label>

          <select
            id="record-challenge"
            className={selectClass(errors.id_reto)}
            data-required
            {...register("id_reto", {
              required: "Campo obligatorio",
            })}
          >
            <option value="">Selecciona un reto</option>
            {challenges.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nombre ?? item.titulo}
              </option>
            ))}
          </select>

          <FieldError error={errors.id_reto} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              type="date"
              id="record-date"
              label="Fecha de registro"
              error={errors.fecha_registro}
              {...register("fecha_registro", {
                required: "Campo obligatorio",
              })}
              data-required
            />
          </div>

          <div>
            <label htmlFor="record-status" className="block text-sm mb-1">
              Estado
            </label>

            <select
              id="record-status"
              className={selectClass(errors.estado)}
              data-required
              {...register("estado", {
                required: "Campo obligatorio",
              })}
            >
              <option value="">Selecciona un estado</option>
              {estados.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <FieldError error={errors.estado} />
          </div>
        </div>

        <div>
          <label htmlFor="record-observation" className="block text-sm mb-1">
            Observación
          </label>

          <textarea
            id="record-observation"
            rows={3}
            placeholder="Notas o comentarios sobre este registro"
            className={`w-full px-3 py-2.5 text-sm border rounded-lg placeholder:text-slate-500 outline-none resize-none transition-all duration-150 focus:ring-2 focus:ring-primary-600/30 ${errors.observacion ? "border-red-500" : "border-slate-200"}`}
            {...register("observacion", {
              maxLength: { value: 500, message: "Máximo 500 caracteres" },
            })}
          />

          <FieldError error={errors.observacion} />
        </div>
      </form>
    </Modal>
  );
}
