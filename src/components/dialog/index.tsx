import { component$, useStore } from "@builder.io/qwik";
export default component$(() => {
  const store = useStore({
    dialog: {
      visible: false,
    },
  });
  return (
    <>
      {/* dialog 1*/}
      <div
        class={{
          "w-full h-full top-0 right-0 bottom-0 left-0 m-auto absolute z-10 opacity-100":
            true,
          "bg-base-100": true,
          invisible: !store.dialog.visible,
        }}
      >
        <div class="w-[30%] h-[48%] top-0 right-0 bottom-0 left-0 m-auto p-10 mt-20 bg-base-200 shadow-md absolute opacity-100">
          <h2 class="text-center text-purple-500 font-bold mb-10 text-3xl">
            SOME ELSE
          </h2>
          <p class="mb-2">E-mail</p>
          <input
            type="email"
            class="border-base-400 focus:ring-2 w-full p-4 rounded-md"
          />
          <p class="mt-4 mb-2">Password</p>
          <input
            type="password"
            class="border-base-400 focus:ring-2 w-full p-4 rounded-md"
          />
          <a href="javascript:void(0)" class="block mt-2 text-blue-400">
            Forget?
          </a>
          <button
            class={{
              "w-full bg-purple-800 hover:bg-purple-900": true,
              "active:bg-purple-900 active:ring-2": true,
              "duration-200 py-3 text-lg text-white": true,
              "tracking-wide rounded-lg mt-4 ": true,
            }}
            onClick$={() => {
              store.dialog.visible = false;
            }}
          >
            Login
          </button>
        </div>
      </div>

      {/* dialog 2*/}
      {/* overlay */}
      <div
        class={{
          "fixed inset-0 backdrop-blur-sm z-12": true,
          invisible: !store.dialog.visible,
        }}
        onClick$={() => {
          store.dialog.visible = false;
        }}
      ></div>
      <div
        class={{
          "w-[30%] h-[48%] top-0 right-0 bottom-0 left-0 m-auto p-10 bg-base-200 shadow-xl absolute z-15 rounded-xl border border-gray-700":
            true,
          invisible: !store.dialog.visible,
        }}
      >
        <h2 class="text-center text-purple-500 font-bold mb-10 text-3xl">
          SOME ELSE
        </h2>
        <p class="mb-2">E-mail</p>
        <input
          type="email"
          class="border-base-400 focus:ring-2 w-full p-4 rounded-md"
        />
        <p class="mt-4 mb-2">Password</p>
        <input
          type="password"
          class="border-base-400 focus:ring-2 w-full p-4 rounded-md"
        />
        <a href="javascript:void(0)" class="block mt-2 text-blue-400">
          Forget?
        </a>
        <button
          class={{
            "w-full bg-purple-800 hover:bg-purple-900": true,
            "active:bg-purple-900 active:ring-2": true,
            "py-3 text-lg text-white": true,
            "tracking-wide rounded-lg mt-4 ": true,
          }}
          onClick$={() => {
            store.dialog.visible = false;
          }}
        >
          Login
        </button>
      </div>
    </>
  );
});
