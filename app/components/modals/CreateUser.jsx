"use client";

import { useState, useEffect, useRef } from "react";
import { X, Save, XCircle, Upload, Trash2 } from "lucide-react";
import { z } from "zod"

const userSchemaCreate = z.object({
    nombre: z.string().max(30, "Máximo 30 caracteres").nonempty("Nombre obligatorio"),
    email: z.string().email("Email inválido").max(50, "Máximo 50 caracteres"),
    password: z.string().min(6, "Mínimo 6 caracteres").nonempty("Contraseña obligatoria"),
    telefono: z.string().max(14, "Máximo 14 números").optional(),
    usuario: z.string()
      .max(11, "Máximo 11 caracteres")
      .regex(/^[a-zA-Z0-9]+$/, "Solo caracteres alfanuméricos")
      .nonempty("Usuario obligatorio"),
    tipo: z.enum(["A", "C", "E", "M", "V"], "Rol inválido"),
    fotoPerfil: z.any().optional(),
})

const userSchemaEdit = z.object({
    nombre: z.string().max(30, "Máximo 30 caracteres").nonempty("Nombre obligatorio"),
    email: z.string().email("Email inválido").max(50, "Máximo 50 caracteres"),
    password: z.string().min(0).optional(), // No obligatoria en edición
    telefono: z.string().max(14, "Máximo 14 números").optional(),
    usuario: z.string()
      .max(11, "Máximo 11 caracteres")
      .regex(/^[a-zA-Z0-9]+$/, "Solo caracteres alfanuméricos")
      .nonempty("Usuario obligatorio"),
    tipo: z.enum(["A", "C", "E", "M", "V"], "Rol inválido"),
    fotoPerfil: z.any().optional(),
})

export function CreateUserModal({ isOpen, onClose, usuarioData = {}, onSave }) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [errors, setErrors] = useState({})
  const isEdit = Boolean(usuarioData && (usuarioData.id || usuarioData.usuario));
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    usuario: "",
    tipo: "",
    fotoPerfil: null,
    ...usuarioData,
  });
  const [preview, setPreview] = useState(null);

  // Actualizar formData si usuarioData cambia (por ejemplo, al abrir el modal para otro usuario)
  useEffect(() => {
    setFormData({
      nombre: usuarioData.nombre || "",
      email: usuarioData.email || "",
      password: "",
      telefono: usuarioData.telefono || "",
      usuario: usuarioData.usuario || "",
      tipo: usuarioData.tipo || "",
      fotoPerfil: null,
      ...usuarioData,
    });
    // Mostrar preview de la foto actual si existe
    if (usuarioData.avatar) {
      setPreview(`${process.env.NEXT_PUBLIC_API_URL}/${usuarioData.avatar}`);
    } else {
      setPreview(null);
    }
    setErrors({});
    setErrorMessage("");
  }, [usuarioData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, fotoPerfil: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setFormData((prev) => ({ ...prev, fotoPerfil: null }));
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const uploadProfilePicture = async (formData) => {
    if (!formData.fotoPerfil) return usuarioData.avatar || null;
    try {
      const bodyFormData = new FormData();
      bodyFormData.append(
        "fotos",
        formData.fotoPerfil,
        formData.fotoPerfil.name
      );
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/avatar`,
        {
          method: "POST",
          body: bodyFormData,
        }
      );
      const data = await response.json();
      const path = data[0].path;
      return path;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validar con Zod
      if (isEdit) {
        userSchemaEdit.parse(formData);
      } else {
        userSchemaCreate.parse(formData);
      }
      const avatar = await uploadProfilePicture(formData);
      const data = {
        usuario: formData.usuario,
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        tipo: formData.tipo,
        avatar: avatar,
        callcenter: usuarioData.callcenter || 0,
        baja: usuarioData.baja || "N",
        sistema: usuarioData.sistema || 0,
      };
      if (!isEdit) {
        data.password = formData.password;
      } else if (formData.password) {
        data.password = formData.password;
      }
      let response;
      if (isEdit) {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${usuarioData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }
      if (!response.ok) {
        const respData = await response.json();
        throw new Error(respData.message || 'Error al guardar el usuario');
      }
      if (onSave) onSave();
      onClose();
    } catch (error) {
      if (error.errors) {
        // Convertir errores de Zod a un objeto simple
        const formattedErrors = {};
        error.errors.forEach(({ path, message }) => {
          formattedErrors[path[0]] = message;
        });
        setErrors(formattedErrors);
      } else {
        setErrorMessage(error.message);
      }
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="flex items-center justify-between border-b pb-4 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {isEdit ? "Editar Usuario" : "Crear Usuario"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>
        {/* Aquí mostramos el mensaje de error si existe */}
        {errorMessage && (
          <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200"
              >
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Juan Fernandez"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 bg-white focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                required
              />
              {errors.nombre && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.nombre}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="juan@seguroweb.com.ar"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 bg-white focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                required
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200"
              >
                Contraseña {isEdit && <span className="text-xs text-gray-400">(dejar en blanco para no cambiar)</span>}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 bg-white focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                required={!isEdit}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.password}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="telefono"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200"
              >
                Celular
              </label>
              <input
                type="tel"
                name="telefono"
                id="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 bg-white focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                />
              {errors.telefono && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.telefono}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="usuario"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200"
              >
                Nombre de usuario
              </label>
              <input
                type="text"
                name="usuario"
                id="usuario"
                placeholder="juanf"
                value={formData.usuario}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 bg-white focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                />
              {errors.usuario && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.usuario}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="tipo"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200"
              >
                Rol
              </label>
              <select
                name="tipo"
                id="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 bg-white focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                required
              >
                <option value="">Seleccionar rol</option>
                <option value="A">A</option>
                <option value="C">C</option>
                <option value="E">E</option>
                <option value="M">M</option>
                <option value="V">V</option>
              </select>
              {errors.tipo && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.tipo}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">
                Foto de perfil
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 rounded-md bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-200"
                >
                  <Upload className="h-4 w-4" />
                  Subir foto
                </button>
                {preview && (
                  <div className="flex items-center gap-2">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-12 w-12 rounded-full object-cover border"
                    />
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="text-red-500 hover:text-red-700"
                      title="Eliminar foto"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {errors.avatar && (
                <p className="mt-1 text-xs text-red-600">{errors.avatar}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3 border-t pt-6 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 rounded-md bg-gray-100 px-6 py-2 font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <XCircle className="h-4 w-4" />
              Cancelar
            </button>
            <button
                type="submit"
                disabled={loading}
                className={`flex items-center gap-2 rounded-md px-6 py-2 font-medium text-white transition-colors ${
                    loading
                    ? 'bg-blue-400 cursor-not-allowed dark:bg-blue-500'
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                }`}
                >
                {loading ? (
                    <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    {isEdit ? "Guardando cambios..." : "Guardando..."}
                    </>
                ) : (
                    <>
                    <Save className="h-4 w-4" />
                    {isEdit ? "Guardar cambios" : "Guardar"}
                    </>
                )}
                </button>
          </div>
        </form>
      </div>
    </div>
  );
}
