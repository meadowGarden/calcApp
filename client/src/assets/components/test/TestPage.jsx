import { useForm } from "react-hook-form";
import PageContainer from "../site/PageContainer";
import AppToast from "../site/AppToast";

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

      <AppToast title={"test"} message={"test message"} status={"fail"} />

    </PageContainer>
  );
};

export default TestPage;
