/**
 * Simple component to test if Tailwind CSS is working
 * This should show a blue background if Tailwind is loading correctly
 */
export function TailwindTest() {
  return (
    <div className="p-4 bg-blue-500 text-white rounded-lg m-4">
      <h2 className="text-lg font-bold">Tailwind CSS Test</h2>
      <p className="text-sm">If you can see this styled correctly, Tailwind is working!</p>
    </div>
  );
}