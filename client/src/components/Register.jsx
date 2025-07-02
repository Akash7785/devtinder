// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const schema = yup
//   .object({
//     FirstName: yup.string().required(),
//     Age: yup.number().positive().integer().required(),
//     PhotoURL: yup.string().url(),
//     Email: yup.string().email().required(),
//   })
//   .required();

// const Profile = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });
//   const onSubmit = (data) => console.log(data);

//   return (
//     <div className="w-1/2">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input
//           className="border-2 rounded-lg border-black mb-5 px-1 py-2 "
//           {...register("FirstName")}
//           placeholder="Firstname"
//         />
//         <p className="text-xs text-red-500">{errors.FirstName?.message}</p>
//         <input
//           className="border-2 rounded-lg border-black mb-5 px-1 py-2"
//           {...register("Age")}
//           placeholder="Age"
//         />
//         <p className="text-xs text-red-500">{errors.Age?.message}</p>

//         <input
//           className="border-2 rounded-lg border-black mb-5 px-1 py-2"
//           {...register("Email")}
//           placeholder="Email"
//         />
//         <p className="text-xs text-red-500">{errors.Email?.message}</p>

//         <input
//           className="border-2 rounded-lg border-black mb-5 px-1 py-2"
//           {...register("PhotoURL")}
//           placeholder="PhotoUrl"
//         />
//         <p className="text-xs text-red-500">{errors.PhotoURL?.message}</p>

//         <input className="bg-orange-500 text-white px-4 py-2" type="submit" />
//       </form>
//     </div>
//   );
// };

// export default Profile;

import React from "react";

const Register = () => {
  return <div>Register</div>;
};

export default Register;
