import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "../lib/redux/features/counter/counterSlice";
// If you have typed hooks set up, import them instead:
// import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";

// Define the RootState interface if not already globally defined in your project
// interface RootState {
//   counter: {
//     value: number;
//   };
// }

const Counter: React.FC = () => {
  // Use useSelector with type definition (or use your typed RootState/useAppSelector)
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  const handleIncrement = (): void => {
    dispatch(increment());
  };

  const handleDecrement = (): void => {
    dispatch(decrement());
  };

  const handleIncrementBy5 = (number: number): void => {
    console.log(number);
    dispatch(incrementByAmount(number));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Redux Counter App
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={handleIncrement}
          className="bg-green-500 hover:bg-green-700 text-white text-xl font-semibold px-6 py-2"
        >
          +
        </button>
        <span className="text-xl font-medium">{count}</span>
        <button
          onClick={handleDecrement}
          className="bg-green-500 hover:bg-green-700 text-white text-xl font-semibold px-6 py-2"
        >
          -
        </button>

        <button 
          onClick={() => handleIncrementBy5(5)} 
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-semibold px-6 py-2"
        >
          Increment by 5
        </button>
      </div>
    </div>
  );
};

export default Counter;