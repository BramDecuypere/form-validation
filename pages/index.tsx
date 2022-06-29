import { FormEventHandler, HTMLInputTypeAttribute } from "react";
import { useForm } from "react-hook-form";

const FormItem = ({
  register,
  name,
  type = "text",
}: {
  register: any;
  name: string;
  type?: HTMLInputTypeAttribute | undefined;
}) => {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {name}
      </label>
      <input
        id={name}
        type={type}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        {...register(name)}
      />
    </>
  );
};

const Home = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (formValue: any) => {
    console.log("formValue", formValue);
  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="text-4xl text-center">HEELY.IO</h1>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <FormItem register={register} name={"firstName"} />

              <FormItem register={register} name={"lastName"} />

              <FormItem register={register} name={"email"} type={"email"} />

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center mt-7 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
