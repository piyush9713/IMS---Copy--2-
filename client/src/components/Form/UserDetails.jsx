const UserDetails = ({ register, errors }) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">User Details</h2>
      <input
        {...register("email", { required: "Email is required" })}
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-4 border rounded bg-gray-100 cursor-not-allowed"
        readOnly
      />
      {errors.email && (
        <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
      )}

      <input
        {...register("username", { required: "Username is required" })}
        type="text"
        placeholder="Username"
        className="w-full p-2 mb-4 border rounded"
      />
      {errors.username && (
        <p className="text-red-500 text-sm mb-2">{errors.username.message}</p>
      )}

      <input
        {...register("phone", { required: "Phone number is required" })}
        type="text"
        placeholder="Phone Number"
        className="w-full p-2 mb-4 border rounded"
      />
      {errors.phone && (
        <p className="text-red-500 text-sm mb-2">{errors.phone.message}</p>
      )}

      <input
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-4 border rounded"
      />
      {errors.password && (
        <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
      )}
    </>
  );
};

export default UserDetails;
