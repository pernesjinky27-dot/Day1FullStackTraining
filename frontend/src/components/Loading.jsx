const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="h-20 w-20 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
    </div>
  );
};

export default Loading;
