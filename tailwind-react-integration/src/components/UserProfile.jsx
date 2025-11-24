function UserProfile() {
  return (
    <div className="bg-gray-100 p-4 md:p-8 max-w-xs md:max-w-sm mx-auto my-8 md:my-20 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center md:flex-row md:items-center">
      <img
        src="https://via.placeholder.com/150"
        alt="User"
        className="rounded-full w-24 h-24 md:w-36 md:h-36 mx-auto hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
      />
      <div className="mt-4 md:mt-0 md:ml-4 text-center md:text-left">
        <h1 className="text-lg md:text-xl text-blue-800 my-2 hover:text-blue-500 transition-colors duration-200 cursor-pointer">
          John Doe
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Developer at Example Co. Loves to write code and explore new
          technologies.
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
