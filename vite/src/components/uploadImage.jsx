import { Upload } from "@mui/icons-material";
import { Chip, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDropzone } from "react-dropzone";
import { FaTrash } from "react-icons/fa";

const DropzoneArea = ({ setFieldValue, values, isUseState = false }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      if (isUseState) {
        setFieldValue([acceptedFiles[0]]);
      } else {
        setFieldValue("images", [...values.images, ...acceptedFiles]);
      }
    },
  });

  const handleRemoveFile = (file) => {
    if (isUseState) {
      setFieldValue([]);
    } else {
      const newFiles = values.images.filter((f) => f !== file);
      setFieldValue("images", newFiles);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          borderRadius: "4px",
          "&:hover": {
            borderColor: "#aaa",
          },
        }}
      >
        <input {...getInputProps()} />
        <Upload size={48} />
        <Typography variant="body1" component="p">
          Drag 'n' drop some files here, or click to select files
        </Typography>
      </Box>

      {/* Display images outside the dropzone */}
      <Box mt={2}>
        {isUseState === false && values.images.length > 0 && (
          <Box>
            {values.images.map((file, index) => (
              <Box key={index} display="flex" alignItems="center" mb={1}>
                <Chip
                  label={`${file.name} (${(file.size / 1024).toFixed(2)} KB)`}
                  variant="outlined"
                  sx={{ margin: "5px", flexGrow: 1 }}
                />
                <IconButton aria-label="delete" onClick={() => handleRemoveFile(file)}>
                  <FaTrash />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        {isUseState === true && values.length > 0 && (
          <Box>
            {values.map((file, index) => (
              <Box key={index} display="flex" alignItems="center" mb={1}>
                <Chip
                  label={`${file.name} (${(file.size / 1024).toFixed(2)} KB)`}
                  variant="outlined"
                  sx={{ margin: "5px", flexGrow: 1 }}
                />
                <IconButton aria-label="delete" onClick={() => handleRemoveFile(file)}>
                  <FaTrash color="red" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DropzoneArea;
