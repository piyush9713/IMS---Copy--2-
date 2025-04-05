const ProgressIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-between mb-6">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`w-full h-2 ${
            index < currentStep
              ? "bg-blue-500"
              : index === currentStep
              ? "bg-blue-300"
              : "bg-gray-200"
          } ${index < totalSteps - 1 ? "mr-1" : ""}`}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;
