const CompanyDetails = ({ register, errors }) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Company Details</h2>
      <input
        {...register("companyName", { required: "Company name is required" })}
        type="text"
        placeholder="Company Name"
        className="w-full p-2 mb-4 border rounded"
      />
      {errors.companyName && (
        <p className="text-red-500 text-sm mb-2">
          {errors.companyName.message}
        </p>
      )}

      <input
        {...register("companyAddress", {
          required: "Company address is required",
        })}
        type="text"
        placeholder="Company Address"
        className="w-full p-2 mb-4 border rounded"
      />
      {errors.companyAddress && (
        <p className="text-red-500 text-sm mb-2">
          {errors.companyAddress.message}
        </p>
      )}

      <select
        {...register("industry", { required: "Industry is required" })}
        className="w-full p-2 mb-4 border rounded">
        <option value="">Select Industry</option>
        <option value="IT">IT</option>
        <option value="Finance">Finance</option>
        <option value="Manufacturing">Manufacturing</option>
        <option value="Healthcare">Healthcare</option>
      </select>
      {errors.industry && (
        <p className="text-red-500 text-sm mb-2">{errors.industry.message}</p>
      )}
    </>
  );
};

export default CompanyDetails;
