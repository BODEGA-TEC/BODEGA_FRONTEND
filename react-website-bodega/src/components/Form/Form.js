import { useForm } from 'react-hook-form';
import React, { useState } from "react";
import Step1 from "./Info";
import Step2 from "./Equipment";
import Step3 from "./Signature";

export default function Form() {

  const { register, errors, handleSubmit } = useForm();
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({});
  return (

    <Step1
    setStep={setStep}
    formValues={formValues}
    setFormValues={setFormValues}
    />
    
    // <div className="bg-white px-4 sm:px-6 lg:col-span-3">
    //   <div className="max-w-lg mx-auto lg:max-w-none">
    //     <h1 className="text-6xl text-gray-700">Awesome form</h1>
    //     <p className="py-10 text-gray-600"> Step {step} of 3 </p>
    //     {step == 1 && (

    //     )}

    //     {step == 2 && (
    //       <Step2
    //         setStep={setStep}
    //         formValues={formValues}
    //         setFormValues={setFormValues}
    //       />
    //     )}
    //     {step == 3 && (
    //       <Step3
    //         setStep={setStep}
    //         formValues={formValues}
    //         setFormValues={setFormValues}
    //       />
    //     )}
    //   </div>
    // </div>
  );
}


// function Form() {
//   const [page, setPage] = useState(0);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     firstName: "",
//     lastName: "",
//     username: "",
//     nationality: "",
//     other: "",
//   });

//   const FormTitles = ["Información", "Equipo", "Firma Digital"];

//   const PageDisplay = () => {
//     if (page === 0) {
//       return <Equipment formData={formData} setFormData={setFormData} />;
//     } else if (page === 1) {
//       return <Info formData={formData} setFormData={setFormData} />;
//     } else {
//       return <Signature formData={formData} setFormData={setFormData} />;
//     }
//   };

//   return (
//     <div className="form">
//       <div className="progressbar">
//         <div
//           style={{ width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }}
//         ></div>
//       </div>
//       <div className="form-container">
//         <div className="header">
//           <h1>{FormTitles[page]}</h1>
//         </div>
//         <div className="body">{PageDisplay()}</div>
//         <div className="footer">
//           <button
//             disabled={page == 0}
//             onClick={() => {
//               setPage((currPage) => currPage - 1);
//             }}
//           >
//             Prev
//           </button>
//           <button
//             onClick={() => {
//               if (page === FormTitles.length - 1) {
//                 alert("FORM SUBMITTED");
//                 console.log(formData);
//               } else {
//                 setPage((currPage) => currPage + 1);
//               }
//             }}
//           >
//             {page === FormTitles.length - 1 ? "Submit" : "Next"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Form;