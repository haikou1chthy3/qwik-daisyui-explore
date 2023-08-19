
import { component$, useContext, useStore } from "@builder.io/qwik";
import { APP_CTX } from "~/routes/layout";

export default component$(() => {
    const { collaspeMenu, auxBar, navbar } = useContext(APP_CTX);
    const store = useStore({
      collaspeMenu,
      auxBar,
      navbar,
    });
  return (
    <>
      <div class="navbar bg-base-300 text-xs shadow-md border-slate-900 border-b">
        <div class="navbar-start">
          <div class="dropdown">
            <label
              tabindex="0"
              class="btn btn-ghost btn-circle btn-sm"
              onClick$={() => {
                store.collaspeMenu.isCollaspe = !store.collaspeMenu.isCollaspe;
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            {/* <ul
                      tabindex="0"
                      class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a>Homepage</a>
                      </li>
                      <li>
                        <a>Portfolio</a>
                      </li>
                      <li>
                        <a>About</a>
                      </li>
                    </ul> */}
          </div>
        </div>
        <div class="navbar-center">
          <a class="btn btn-ghost normal-case text-sm">Some Else</a>
        </div>
        <div class="navbar-end">
          <button class="btn btn-ghost btn-circle btn-sm mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button class="btn btn-ghost btn-circle btn-sm mr-2">
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span class="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>

        <div class="dropdown dropdown-end">
          <label
            tabindex="0"
            class="btn btn-ghost btn-circle avatar"
            onClick$={() => {
              store.navbar.avator.options = !store.navbar.avator.options;
            }}
          >
            <div class="w-10 rounded-full">
              <img
                width="690"
                height="690"
                src="https://p1.itc.cn/q_70/images03/20211009/d072da16d07d46179fdcb6c8437cfb66.jpeg"
              />
            </div>
          </label>
          <div
            class={{
              "relative inline-block text-left": true,
              hidden: store.navbar.avator.options,
            }}
          >
            <div
              // class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-800 rounded-md bg-base-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  text-blue-50"
              class="absolute bg-base-200 shadow-lg origin-top-right divide-y divide-gray-800 rounded-md right-0 mt-2 w-56 ring-1 ring-black ring-opacity-5 focus:outline-none "
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="0"
            >
              <div class="py-1" role="none">
                {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                <a
                  href="#"
                  class="text-gray-700 block px-4 py-2 text-sm text-blue-50"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-0"
                >
                  Edit
                </a>
                <a
                  href="#"
                  class="text-gray-700 block px-4 py-2 text-sm text-blue-50"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-1"
                >
                  Duplicate
                </a>
              </div>
              <div class="py-1" role="none">
                <a
                  href="#"
                  class="text-gray-700 block px-4 py-2 text-sm text-blue-50"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-2"
                >
                  Archive
                </a>
              </div>
            </div>
          </div>
          {/* <ul
                tabindex="0"
                class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a class="justify-between">
                    Profile
                    <span class="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul> */}
        </div>
      </div>
    </>
  );
});
