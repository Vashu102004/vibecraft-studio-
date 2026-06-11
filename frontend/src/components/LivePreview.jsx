import React from 'react';
import CanvasEditor from './CanvasEditor';

export default function LivePreview({ formData }) {
  return (
    <div className="bg-[#090d16] min-h-screen">
      <CanvasEditor initialData={formData} />
    </div>
  );
}
