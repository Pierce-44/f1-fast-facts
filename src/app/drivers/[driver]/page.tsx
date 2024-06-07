import DriverSliderStats from "@/components/driverSliderStats";

export default function Driver({ params }: { params: { driver: string } }) {
  const driverName = params.driver.toLocaleLowerCase();
  return (
    <main className="w-full h-full flex items-start justify-center">
      <div className="max-w-6xl mt-20">
        <DriverSliderStats driverName={driverName} />
      </div>
    </main>
  );
}
