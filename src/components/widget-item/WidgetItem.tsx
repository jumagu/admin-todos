interface Props {
  title: string;
  children: React.ReactNode;
}

export const WidgetItem = ({ title, children }: Props) => {
  return (
    <div className="md:col-span-2 lg:col-span-1 h-full">
      <div className="h-full py-8 px-6 space-y-6 rounded-xl shadow-lg bg-white">
        <div className="break-all flex flex-col justify-center h-full">
          <h5 className="text-xl text-gray-600 text-center font-medium">
            {title}
          </h5>
          <div className="mt-2 flex flex-col justify-center items-center gap-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
