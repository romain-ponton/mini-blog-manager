import { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function PostForm({
  initialData = {},
  onSubmit,
  onCancel = () => {},
  onDelete = null
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setBody(initialData.body || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, body });
  };

  const isEditing = Boolean(initialData?.id);

  return (
    <Box component="form" onSubmit={handleSubmit} mt={2}>

      <TextField
        fullWidth
        label="Titre"
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <TextField
        fullWidth
        label="Contenu"
        margin="normal"
        multiline
        rows={4}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />

      <Box mt={3} display="flex" justifyContent="space-between">

 
        {isEditing && onDelete && (
          <Button
            type="button"
            variant="outlined"
            color="error"
            onClick={() => onDelete(initialData.id)}
          >
            Supprimer
          </Button>
        )}


        <Box>
          <Button
            type="button"
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={onCancel}
          >
            Annuler
          </Button>

          <Button
            type="submit"
            variant="contained"
          >
            {isEditing ? "Mettre à jour" : "Publier"}
          </Button>
        </Box>

      </Box>
    </Box>
  );
}
