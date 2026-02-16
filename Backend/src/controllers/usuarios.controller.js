const db = require("../config/database");

const usuariosController = {
  // 1. Listar todos
  getAll: async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM usuarios");
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 2. Obtener uno por ID
  getById: async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM usuarios WHERE id_usuario = ?", [req.params.id]);
      if (rows.length === 0) return res.status(404).json({ mensaje: "Usuario no encontrado" });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 3. Crear usuario (CORREGIDO)
  create: async (req, res) => {
    const { nombre, correo, contrasena_hash, rol, activo } = req.body;

    // Validación preventiva para depuración
    console.log("Datos recibidos en el Body:", req.body);

    try {
      // Normalizamos el rol: minúsculas, sin espacios y con fallback a 'admin'
      const rolValido = rol ? rol.toLowerCase().trim() : "admin";
      // Aseguramos que activo sea un número (1 o 0)
      const activoValido = activo === undefined || activo === null ? 1 : activo;

      const [result] = await db.query(
        "INSERT INTO usuarios (nombre, correo, contrasena_hash, rol, activo) VALUES (?, ?, ?, ?, ?)",
        [nombre, correo, contrasena_hash, rolValido, activoValido],
      );

      res.status(201).json({
        id: result.insertId,
        mensaje: "Usuario creado con éxito",
      });
    } catch (err) {
      console.error("❌ Error al crear:", err.sqlMessage || err.message);
      res.status(500).json({ error: err.sqlMessage || "Error interno del servidor" });
    }
  },

  // 4. Actualizar usuario
  update: async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, rol, activo } = req.body;

    try {
      const rolValido = rol ? rol.toLowerCase().trim() : "admin";

      const [result] = await db.query(
        "UPDATE usuarios SET nombre = ?, correo = ?, rol = ?, activo = ? WHERE id_usuario = ?",
        [nombre, correo, rolValido, activo !== undefined ? activo : 1, id],
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }

      res.json({ mensaje: "Usuario actualizado con éxito" });
    } catch (err) {
      console.error("❌ Error en UPDATE:", err.sqlMessage || err.message);
      res.status(500).json({ error: err.sqlMessage || err.message });
    }
  },

  // 5. Eliminar
  delete: async (req, res) => {
    try {
      const [result] = await db.query("DELETE FROM usuarios WHERE id_usuario = ?", [req.params.id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ mensaje: "Error: El ID no existe." });
      }
      res.json({ mensaje: "Usuario eliminado con éxito" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = usuariosController;
