import cn from "classnames";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useState } from "react";

interface Props extends Omit<Partial<HTMLInputElement>, "id"> {
  register: any;
  name: string;
}

const FormItem = ({
  register,
  name,
  type = "text",
  className,
  ...props
}: Props) => {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {name}
      </label>
      <input
        id={name}
        type={type}
        className={cn(
          "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
          className
        )}
        {...props}
        {...register(name)}
      />
    </>
  );
};

const today = format(new Date(), "yyyy-MM-dd");

const FORM_URL = "/api/form";

const Home = () => {
  const [errors, setErrors] = useState([]);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData: any) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    try {
      const res = await fetch(FORM_URL, requestOptions);
      const body = await res.json();

      if (res.ok) {
        alert("We have successfuly saved your formdata");
      } else {
        alert("Failed to save form");
        setErrors(body.errors ?? []);
      }
    } catch (err) {
      // Log to sentry if necessary
      console.log("🚀 ~ file: index.tsx ~ line 70 ~ onSubmit ~ err", err);
    }
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
              <FormItem
                defaultValue="Bram"
                register={register}
                name={"firstName"}
              />

              <FormItem
                defaultValue="Decuypere"
                register={register}
                name={"lastName"}
              />

              <FormItem
                defaultValue="bram@growmyflow.com"
                register={register}
                name={"email"}
                type={"email"}
              />

              <FormItem
                defaultValue={"5"}
                register={register}
                name={"amountOfJournalPrompts"}
                type={"number"}
              />

              <FormItem
                defaultValue={today}
                register={register}
                name={"journalDate"}
                type={"date"}
              />

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center mt-7 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="text-red-500">
              {errors.map((error: any, idx) => {
                return <div key={idx}>{error.message}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
