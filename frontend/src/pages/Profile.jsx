// Profile.jsx

const purchases = [
  {
    id: 1,
    productName: "Cisco Example",
    purchaseDate: "January 15 2025",
    quantity: 2,
    amount: "$2999",
  },
  {
    id: 2,
    productName: "Cisco Example",
    purchaseDate: "January 15 2025",
    quantity: 2,
    amount: "$2999",
  },
  {
    id: 3,
    productName: "Cisco Example",
    purchaseDate: "January 15 2025",
    quantity: 2,
    amount: "$2999",
  },
];

// Simple static placeholder for the Cisco product image.
// Replace this component with <img src="..." /> later.
const ProductImage = () => {
  return (
    <div className="flex h-[19px] w-[46px] overflow-hidden rounded-[2px] border border-gray-500 bg-gray-500">
      <div className="w-[10px] bg-gray-400" />

      <div className="flex flex-1 flex-col justify-evenly bg-gray-700 px-[2px] py-[2px]">
        <div className="grid grid-cols-8 gap-[1px]">
          {Array.from({ length: 8 }).map((_, index) => (
            <span
              key={index}
              className="h-[2px] w-[2px] bg-gray-300"
            />
          ))}
        </div>

        <div className="grid grid-cols-8 gap-[1px]">
          {Array.from({ length: 8 }).map((_, index) => (
            <span
              key={index}
              className="h-[2px] w-[2px] bg-gray-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <main className="min-h-screen bg-[#fdfdfd] px-4 py-7 font-sans text-black">
      <div className="mx-auto w-full max-w-[620px]">
        {/* Profile Card */}
        <section className="min-h-[141px] border border-gray-200 bg-white px-5 py-[14px] shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
          <h1 className="text-[24px] font-bold leading-tight">
            My Profile
          </h1>

          <div className="mt-[10px] space-y-[7px] text-[12px]">
            <div className="flex items-center">
              <span className="w-[67px] font-semibold">Username:</span>
              <span>emapleUser</span>
            </div>

            <div className="flex items-center">
              <span className="w-[67px] font-semibold">Email:</span>
              <span>example@example.com</span>
            </div>
          </div>

          <div className="mt-[11px] flex justify-end">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-[6px] bg-red-600 px-[13px] py-[6px] text-[9px] font-medium text-white transition hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </section>

        {/* Purchase History */}
        <section className="mt-[21px] min-h-[322px] border border-gray-100 bg-white px-5 py-[11px] shadow-[0_2px_2px_rgba(0,0,0,0.2)]">
          <h2 className="text-[24px] font-bold leading-tight">
            Purchase History
          </h2>

          {/* Table */}
          <div className="mt-[5px] w-full">
            {/* Header */}
            <div className="grid grid-cols-[1.25fr_1.3fr_1.3fr_0.8fr_0.75fr] items-center gap-2 text-[9px] font-medium">
              <div>Product Image</div>
              <div>Product Name</div>
              <div>Purchase Date</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Amount</div>
            </div>

            {/* Rows */}
            <div className="mt-[19px] space-y-[36px]">
              {purchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="grid grid-cols-[1.25fr_1.3fr_1.3fr_0.8fr_0.75fr] items-center gap-2 text-[9px]"
                >
                  <div className="pl-[3px]">
                    <ProductImage />
                  </div>

                  <div>{purchase.productName}</div>

                  <div>{purchase.purchaseDate}</div>

                  <div className="text-center">
                    {purchase.quantity}
                  </div>

                  <div className="text-right">
                    {purchase.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Profile;