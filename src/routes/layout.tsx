import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import {
  component$,
  createContextId,
  useContextProvider,
  useStore,
  useVisibleTask$,
  Slot,
  useStyles$,
} from "@builder.io/qwik";
import * as qwikCity from "@builder.io/qwik-city";
import TreeMenu from "~/components/menu/tree-menu";

import styles from "./styles.css?inline";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

interface APP_CTX {
  userinfo: {
    username?: string;
    password?: string;
    isLogin: boolean;
    token?: string;
  };
  collaspeMenu: {
    isCollaspe: boolean;
    width: {
      defaultValue: number;
    };
  };
  auxBar: {
    isCollaspe: boolean;
    width: {
      defaultValue: number;
    };
  };
}

const menuItems = [
  {
    nameCN: "系统管理",
    nameEN: "System",
    pathname: "/sys/",
    child: [
      {
        nameCN: "用户管理",
        nameEN: "User manage",
        pathname: "/sys/user-manage/",
      },
      {
        nameCN: "权限管理",
        nameEN: "Auth manage",
        pathname: "/sys/auth-manage/",
      },
      {
        nameCN: "资源管理",
        nameEN: "Resource manage",
        pathname: "/sys/resource-manage/",
        child: [
          {
            nameCN: "API",
            nameEN: "API",
            pathname: "/sys/resource-manage/api/",
          },
          {
            nameCN: "UI",
            nameEN: "UI",
            pathname: "/sys/resource-manage/ui/",
          },
          {
            nameCN: "Uni",
            nameEN: "Uni",
            pathname: "/sys/resource-manage/uni/",
          },
          {
            nameCN: "Verse",
            nameEN: "Verse",
            pathname: "/sys/resource-manage/verse/",
          },
        ],
      },
    ],
  },
  {
    nameCN: "内容管理",
    nameEN: "Content manage",
    pathname: "/content/",
    child: [
      {
        nameCN: "上架发布",
        nameEN: "publish",
        pathname: "/content/publish/",
        child: [
          {
            nameCN: "活动",
            nameEN: "activies",
            pathname: "/content/publish/activies/",
          },
          {
            nameCN: "新闻",
            nameEN: "news",
            pathname: "/content/publish/news/",
          },
          {
            nameCN: "配置",
            nameEN: "settings",
            pathname: "/content/publish/settings/",
          },
        ],
      },
      {
        nameCN: "个性化",
        nameEN: "Resource manage",
        pathname: "/content/custom/",
        child: [
          {
            nameCN: "布局",
            nameEN: "API",
            pathname: "/content/custom/layout/",
          },
          {
            nameCN: "组件",
            nameEN: "UI",
            pathname: "/content/custom/components/",
          },
          {
            nameCN: "配置",
            nameEN: "Uni",
            pathname: "/content/custom/settings/",
          },
        ],
      },
      {
        nameCN: "配置",
        nameEN: "settings",
        pathname: "/content/settings/",
      },
    ],
  },
];
export const APP_CTX = createContextId<APP_CTX>("APP_CTX");
export default component$(() => {
  useStyles$(styles);
  //   const { menu } = useContent();
  //   console.log(menu);

  const loc = qwikCity.useLocation();
  console.log(loc);
  console.log(loc.url);

  const store = useStore<APP_CTX>({
    userinfo: {
      username: undefined,
      password: undefined,
      isLogin: false,
      token: undefined,
    },

    collaspeMenu: {
      isCollaspe: false,
      width: {
        defaultValue: 208,
      },
    },

    auxBar: {
      isCollaspe: true,
      width: {
        defaultValue: 192,
      },
    },
  });

  useContextProvider(APP_CTX, store);
  return (
    <>
      {/* <Header /> */}
      <div class=" h-screen bg-base-100 flex">
        {/* left container */}
        <div class="flex h-screen">
          {/* side bar - qwik*/}
          <div
            class={{
              "font-sanf": true,
              "bg-slate-950": true,
              "shadow-md": true,
              "border-slate-800": true,
              "border-r": true,
            }}
            style={{
              width: `68px`,
            }}
          >
            <ul class={{ menu: true }}>
              <li>
                <a class="tooltip tooltip-right" data-tip="Home">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a class="tooltip tooltip-right" data-tip="Details">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a class="tooltip tooltip-right" data-tip="Stats">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* side bar - menu*/}
          <div
            class={{
              "font-sanf": true,
              "w-52": true,
              "shadow-md": true,
            }}
            style={{
              width: `${
                store.collaspeMenu.isCollaspe
                  ? 0
                  : store.collaspeMenu.width.defaultValue
              }px`,
              transition: `width 0.2s`,
              "-webkit-transition": `width 0.2s`,
            }}
          >
            <TreeMenu menuItems={menuItems}></TreeMenu>
          </div>

          {/* side bar - aux bar*/}
          <div
            class={{
              "font-sanf": true,
              "w-48": true,
              "bg-base-200": true,
              "pl-3": !store.auxBar.isCollaspe,
              "text-sm": true,
              "shadow-md": true,
              "border-slate-900": true,
              "border-r": true,
            }}
            style={{
              width: store.auxBar.isCollaspe
                ? `0px`
                : `${store.auxBar.width.defaultValue}px`,
              transition: `width 0.2s`,
              "-webkit-transition": `width 0.2s`,
            }}
          >
            <div
              class={{
                "p-3": true,
                "pl-0": true,
                hidden: store.auxBar.isCollaspe,
              }}
            >
              <input
                // tabindex="0"
                class="input join-item select-bordered w-full max-w-xs h-10 text-md"
                placeholder="Search Input"
              />
            </div>
            <div>
              <ul
                class={{
                  steps: true,
                  "steps-vertical": true,
                  hidden: store.auxBar.isCollaspe,
                }}
              >
                <li class="step step-success">Register</li>
                <li class="step step-success">Choose plan</li>
                <li class="step step-warning">Purchase</li>
                <li class="step step-error" data-content="?">
                  Receive Product
                </li>
              </ul>
            </div>
          </div>
          {/* side bar - aux bar - collaspe btn */}
          <div
            class="btn btn-square btn-xs -ml-3 my-auto z-[1] bg-base-100"
            onClick$={() => {
              store.auxBar.isCollaspe = !store.auxBar.isCollaspe;
            }}
          >
            {store.auxBar.isCollaspe ? "》" : "《"}
          </div>
        </div>

        {/* right container */}
        <div
          class="font-sanf w-full h-screen"
          style={{
            "margin-left": `-0.75rem`,
          }}
        >
          {/* header - navbar */}
          <div class="navbar bg-base-300 text-xs shadow-md border-slate-900 border-b">
            <div class="navbar-start">
              <div class="dropdown">
                <label
                  tabindex="0"
                  class="btn btn-ghost btn-circle btn-sm"
                  onClick$={() => {
                    store.collaspeMenu.isCollaspe =
                      !store.collaspeMenu.isCollaspe;
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
              <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                  <img
                    width="690"
                    height="690"
                    src="https://p1.itc.cn/q_70/images03/20211009/d072da16d07d46179fdcb6c8437cfb66.jpeg"
                  />
                </div>
              </label>
              <ul
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
              </ul>
            </div>
          </div>

          {/* content - container */}

          <main>
            <Slot />
          </main>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
});
