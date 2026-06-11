import React from 'react';
import CanvasEditor from './CanvasEditor';

export default function LivePreview() {
  // Mock Data Mocking Pipeline coming directly down stream from the Form Wizards Interface
  const samplePipelinePayload = {
    businessName: "Maa Rewa Auto Parts",
    festival: "Navratri", // Default mapping variable setup to directly evaluate step 2 goals
    generatedText: "🎉 Shubh Navratri from Maa Rewa Auto Parts! Is pavan avsar par apne vehicle ko dijiye ek naya roop. Genuine auto parts aur accessories par paiye 25% tak ki bhaari chhoot! Offer sirf Navratri tak simit hai."
  };

  return (
    <div className="bg-[#090d16] min-h-screen">
      {/* Dynamic Hot Loading Module Replacement Sandbox */}
      <CanvasEditor initialData={samplePipelinePayload} />
    </div>
  );
}
