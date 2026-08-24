import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { buyCourse } from "../services/operations/payment";
import { FiCheckCircle, FiShoppingCart } from "react-icons/fi";

const Cart = () => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.rootReducer.cart.items);

  const totalPrice = items.reduce(
    (acc, item) => acc + Number(item.price || 0),
    0
  );
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.rootReducer.auth.user);

  const handleBuyNow = () => {
    const courseIDs = items.map((item) => item._id);
    buyCourse({ courseIDs, userDetails, navigate, dispatch });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] text-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            {items.length} {items.length === 1 ? "Course" : "Courses"} in Cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-8">
            {items.length === 0 ? (
              <div className="bg-[#121217] border border-[#22222c] rounded-2xl p-12 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 mb-4">
                  <FiShoppingCart size={24} />
                </div>
                <h2 className="text-xl font-extrabold text-white mb-1">
                  Your Cart is Empty
                </h2>
                <p className="text-gray-400 text-sm max-w-sm mb-6">
                  Explore our catalog of courses and add items to your cart to get started.
                </p>
                <Link
                  to="/courses"
                  className="bg-white text-gray-950 font-bold px-6 py-2.5 rounded-full text-xs sm:text-sm hover:bg-gray-100 transition-colors shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
                >
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((course) => (
                  <div
                    key={course?._id}
                    className="bg-[#121217] border border-[#22222c] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
                      <img
                        src={course?.thumbnail}
                        alt={course?.courseName}
                        className="w-full sm:w-44 h-28 rounded-xl object-cover border border-[#242430] shrink-0"
                      />

                      <div>
                        <h2 className="text-base font-extrabold text-white leading-snug line-clamp-2">
                          {course?.courseName}
                        </h2>

                        <p className="text-gray-400 text-xs mt-1">
                          By {course?.instructor?.firstName} {course?.instructor?.lastName}
                        </p>

                        <p className="text-white font-black text-xl mt-3">
                          ₹{course?.price}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(course))}
                      className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-red-400 transition-colors cursor-pointer border border-[#262630] bg-[#181820] px-3 py-2 rounded-xl shrink-0 self-end sm:self-center"
                      title="Remove course from cart"
                    >
                      <MdDeleteOutline size={18} />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="lg:col-span-4">
              <div className="bg-[#121217] border border-[#22222c] rounded-2xl p-6 lg:sticky lg:top-24">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Total Amount:
                </p>

                <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
                  ₹{totalPrice}
                </h2>

                <button
                  className="w-full mt-6 bg-white text-gray-950 font-bold py-3.5 px-6 rounded-full text-sm hover:bg-gray-100 transition-colors shadow-[0_2px_10px_rgba(255,255,255,0.15)] cursor-pointer"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>

                <div className="mt-6 border-t border-[#1e1e26] pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                    Includes:
                  </p>

                  <ul className="space-y-2 text-xs text-gray-300">
                    <li className="flex items-center gap-2">
                      <FiCheckCircle className="text-emerald-400 shrink-0" size={14} />
                      <span>1.5 Year Full Course Access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheckCircle className="text-emerald-400 shrink-0" size={14} />
                      <span>Certificate of Completion</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheckCircle className="text-emerald-400 shrink-0" size={14} />
                      <span>Mobile & Desktop Access</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Cart;