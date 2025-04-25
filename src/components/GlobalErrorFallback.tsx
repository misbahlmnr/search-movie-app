const GlobalErrorFallback = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold">⚠️Something went wrong</h1>
        <p>
          Please try again! You can click the button in the bottom to go back
          home
        </p>
        <a href={'/'} className="px-4 py-2 text-white bg-red-700 rounded-md">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default GlobalErrorFallback;
