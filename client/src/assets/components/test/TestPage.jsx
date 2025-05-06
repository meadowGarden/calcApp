import { useForm } from "react-hook-form";
import PageContainer from "../site/PageContainer";

const TestPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSub = (data) => {
    console.log(data);
  };

  return (
    <PageContainer>
      <form
        onSubmit={handleSubmit(onSub)}
        style={{ display: "grid", gridGap: "1rem", width: "30%" }}
      >
        <input
          {...register("name", {
            required: "enter name",
            validate: (value) => {
              if (!value.includes("v")) return "no v";
            },
          })}
          placeholder="name"
        />
        {errors.name && <span>{errors.name.message}</span>}
        <input {...register("email")} placeholder="email" />
        <button>submit</button>
      </form>
    </PageContainer>
  );
};

export default TestPage;
