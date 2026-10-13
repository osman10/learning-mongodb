import Counter from "./component/Counter";

const Page = () => {



  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-sm">
        <div>
          <h1 className="text-2xl font-semibold mb-2">React Redux Example</h1>
          <p className="text-sm text-slate-500 mb-6">Count: 0</p>
           <Counter/>
        </div>
      </div>
    </div>
  );
};
export default Page;