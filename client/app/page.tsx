
const Page = () => {



  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-sm">
        <div>
          <h1 className="text-2xl font-semibold mb-2">React Redux Example</h1>
          <p className="text-sm text-slate-500 mb-6">Count: 0</p>
          <div className="flex flex-row gap-4">
             <button className="bg-green-600 text-white font-medium py-2 px-4  w-full rounded-lg text-sm hover:bg-green-700 transition">Add</button>
             <button className="bg-red-600 text-white font-medium py-2 px-4  w-full rounded-lg text-sm hover:bg-red-700 transition">Remove</button>
             <button className="bg-indigo-600 text-white font-medium py-2 px-4  w-full rounded-lg text-sm hover:bg-indigo-700 transition">Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Page;