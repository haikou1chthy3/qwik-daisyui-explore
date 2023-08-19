import { component$ } from "@builder.io/qwik";
export default component$((props: { id: string }) => {
  const { id } = props;
  return (
    <>
      {/* dialog3 */}
      <dialog id={id} class="modal modal-bottom sm:modal-middle w-[25%] m-auto">
        <form method="dialog" class="modal-box p-8">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-0">
            ✕
          </button>
          {/* <h3 class="font-bold text-lg">Hello!</h3>
          <p class="py-4">Press ESC key or click the button below to close</p> */}
          <h2 class="text-center text-purple-500 font-bold mb-10 text-2xl">
            SOME ELSE
          </h2>
          <p class="mb-2">E-mail</p>
          <input
            type="text"
            class="border-base-400 focus:ring-2 w-full p-4 rounded-md"
            required
          />
          <p class="mt-4 mb-2">Password</p>
          <input
            type="password"
            class="border-base-400 focus:ring-2 w-full p-4 rounded-md"
          />
          <a href="" class="block mt-2 text-blue-400">
            Forget?
          </a>
          <div class="modal-action">
            <button
              class={{
                "w-full bg-purple-900 hover:bg-purple-800": true,
                "active:bg-purple-900 active:ring-2": true,
                "py-3 text-lg text-white": true,
                "tracking-wide rounded-lg mt-4 ": true,
              }}
            >
              Login
            </button>

            <button
              class={{
                "w-full bg-gray-700 hover:bg-gray-600": true,
                "active:bg-purple-900 active:ring-2": true,
                "py-3 text-lg text-white": true,
                "tracking-wide rounded-lg mt-4 ": true,
              }}
            >
              Close
            </button>
          </div>
        </form>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
});
