const DottedLoader = () => (
  <div className="flex items-center justify-center space-x-1">
    <span className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
    <span className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
    <span className="h-2 w-2 bg-current rounded-full animate-bounce"></span>
  </div>
);

export default DottedLoader;
