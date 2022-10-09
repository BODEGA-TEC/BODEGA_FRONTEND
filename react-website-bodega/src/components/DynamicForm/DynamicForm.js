import { useForm, Controller } from "react-hook-form";
import "../../App.css";
import Input from "./Input";
import { Container, Grid } from "@mui/material";

//Error Component
const Error = ({ children }) => (
  <p style={{ color: "red", fontSize: "12px" }}>{children}</p>
);

const DynamicForm = (props) => {
  const { title, description, form, submitRef, setFormInput } = props;

  const {
    handleSubmit, // evalua las restricciones de las entradas.
    control,
    // watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const formInputs = Object.keys(form).map((e) => {
    const { rules, defaultValue, label } = form[e];

    return (
      <section key={e}>
        <Controller
          sx={{ marginTop: "4%" }}
          name={e}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field }) => (
            <div>
              <Input
                label={label}
                value={field.value}
                onChange={field.onChange}
                {...form[e]}
              />
            </div>
          )}
        />
        {errors[e] && <Error>Espacio requerido</Error>}
      </section>
    );
  });

  const onSubmit = (data) => {
    setFormInput(data);
  };
  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Container sx={{ marginTop: "2%" }}>
      <Grid container rowSpacing={3}>
        <Grid item align="center">
          <h2>{title}</h2>
        </Grid>

        <Grid item xs={12} md={12} align="justify">
          <p>{description}</p>
        </Grid>

        <Grid item xs={12} md={12} align="justify">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* render the form inputs */}
            {formInputs}
            {/* Invisible button to be able to activate the submit of the form through 
            the reference to the submit button of the parent class. */}
            <button ref={submitRef} type="submit" style={{ display: "none" }}> child Submit </button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DynamicForm;