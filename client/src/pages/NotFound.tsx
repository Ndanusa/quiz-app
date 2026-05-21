function NotFound() {
  return (
    <div className="flex items-center justify-center h-[80%]">
      <div className="flex items-center justify-between h-10 gap-2">
        <h1 className="text-2xl text-[#444444]">404</h1>
        <div className="border-r border-[#444444] h-full rounded-full"></div>
        <h1 className="text-2xl text-[#444444]">Not Found</h1>
      </div>
    </div>
  );
}
export default NotFound;
