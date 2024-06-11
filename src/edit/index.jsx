/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const FormPopup = ({ open, handleClose, formData, handleSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (formData) {
      setValue("field1", formData.title || "");
      setValue("field2", formData.body || "");
    }
  }, [formData, setValue]);

  console.log(`log data ${handleSuccess}`);

  const onSubmit = (dataNew) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${formData.id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: formData.id,
        title: dataNew.field1,
        body: dataNew.field2,
        userId: formData.userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        console.log(response.body);
        if (!response.ok) {
          console.log(response.status);
          throw new Error("Network response was not ok");
        } else {
          console.log(response.status);
        }
        return response.json();
      })
      .then((json) => {
        console.log("Id is Edit API call successful:", json);
        if (typeof handleSuccess === "function") {
          // Kiểm tra xem handleSuccess có phải là một hàm không
          handleSuccess(json); // Gọi hàm handleSuccess với dữ liệu đã chỉnh sửa
        } else {
          console.error("handleSuccess is not a function");
        }
        handleClose();
      })
      .catch((error) => {
        console.error("Error calling API:", error);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      BackdropProps={{ style: { backgroundColor: "transparent" } }}
    >
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Title"
            {...register("field1", { required: "Field 1 is required" })}
            error={!!errors.field1}
            helperText={errors.field1 ? errors.field1.message : ""}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Body"
            {...register("field2", { required: "Field 2 is required" })}
            error={!!errors.field2}
            helperText={errors.field2 ? errors.field2.message : ""}
            fullWidth
            margin="normal"
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

FormPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  handleSuccess: PropTypes.func.isRequired,
};
export default FormPopup;
