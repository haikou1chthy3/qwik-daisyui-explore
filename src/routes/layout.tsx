import { routeLoader$, useLocation, useNavigate } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useStore,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";

import styles from "./styles.css?inline";
import SideBar from "~/layouts/side-bar";
import Navbar from "~/layouts/container/navbar";

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
    mode: number;
    isCollaspe: boolean;
    width: {
      defaultValue: number;
    };
    searchKey?: string;
    menuItemList: any[];
  };
  navbar: {
    avator: {
      options: boolean;
    };
  };
  layout: {
    mode: number;
  };
}

export const APP_CTX = createContextId<APP_CTX>("APP_CTX");
export default component$(() => {
  useStyles$(styles);
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
      mode: 1,
      isCollaspe: false,
      width: {
        defaultValue: 280,
      },
      searchKey: undefined,
      menuItemList:[{}]
    },

    navbar: {
      avator: {
        options: true,
      },
    },

    layout: {
      mode: -1,
    },
  });

  const loc = useLocation();
  useContextProvider(APP_CTX, store);
  useVisibleTask$(({ track }) => {
    const switchMode = track(() => {
      return loc.url.pathname === "/demo/" ? 0 : 1;
    });
    store.layout.mode = switchMode;
  });
  const { layout } = store;
  return (
    <>
      {layout.mode == 1 && (
        <div class=" h-screen bg-base-100 flex">
          {/* left */}
          <SideBar />

          {/* right */}
          <div
            class="font-sanf w-full h-screen"
            style={{
              "margin-left": `-0.75rem`,
            }}
          >
            <Navbar />
            <main>
              <Slot />
            </main>
          </div>
        </div>
      )}

      {layout.mode == 0 && (
        <main>
          <Slot />
        </main>
      )}

      {layout.mode == -1 && <main></main>}
    </>
  );
});
