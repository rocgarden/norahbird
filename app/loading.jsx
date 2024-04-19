const loading = () => {
    return (
    <div className="h-screen flex justify-center items-center">
    <div
      className="animate-spin inline-block h-12 w-12 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
    </div>
    )
};

export default loading;