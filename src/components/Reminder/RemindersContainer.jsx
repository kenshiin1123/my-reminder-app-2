export default function Container({ children }) {
  return (
    <div className="my-5 flex flex-wrap gap-3 justify-center mx-auto">
      {children}
    </div>
  );
}
