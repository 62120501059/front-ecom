// import React, { useState } from "react";
// import { StepperContext } from "./contexts/StepperContext";
// import Stepper from "../../Stepper";
// import StepperControl from "../../StepperControl";

// import Cart from "./steps/Cart";
// import Details from "./steps/Details";
// import Final from "./steps/Final";

// function Checkout() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [userData, setUserData] = useState("");
//   const [finalData, setFinalData] = useState([]);
//   const steps = ["คำสั่งซื้อทั้งหมด", "ชำระเงิน", "สถานะการจัดส่งสินค้า"];

//   const displayStep = (step) => {
//     switch (step) {
//       case 1:
//         return <Cart />;
//       case 2:
//         return <Details />;
//       case 3:
//         return <Final />;
//       default:
//     }
//   };

//   const handleClick = (direction) => {
//     let newStep = currentStep;

//     direction === "next" ? newStep++ : newStep--;
//     //check if steps are within  bounds
//     newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
//   };

//   return (
//     <div className="py-20 px-20 center-content">
//       <div className="py-5 mx-auto  pb-2 bg-white">
//         {/* stepper */}
//         <div className="container horizontal mt-5">
//           <Stepper steps={steps} currentStep={currentStep} />
//           {/* Display Components */}
//           <div className="my-10 p-10">
//             <StepperContext.Provider
//               value={{
//                 userData,
//                 setUserData,
//                 finalData,
//                 setFinalData,
//               }}
//             >
//               {displayStep(currentStep)}
//             </StepperContext.Provider>
//           </div>
//         </div>

//         {/* Navigation controls */}
//         {currentStep !== steps.length && (
//           <StepperControl
//             handleClick={handleClick}
//             currentStep={currentStep}
//             steps={steps}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Checkout;
