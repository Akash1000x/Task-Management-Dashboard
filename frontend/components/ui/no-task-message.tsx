const NoTasksMessage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-2">No Tasks Yet!</h2>
      <p className="text-gray-500">Let&apos;s get started by creating your first task.</p>
    </div>
  );
};

export default NoTasksMessage;
