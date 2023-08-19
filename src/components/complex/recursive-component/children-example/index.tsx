import type { Signal } from "@builder.io/qwik";
import {
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useSignal,
  useStore,
} from "@builder.io/qwik";

export default component$(() => {
  const menu = [
    {
      name: "menu1",
      children: [
        {
          name: "submenu1-1",
          children: [
            {
              name: "submenu1-1-1",
            },
            {
              name: "submenu1-1-2",
              children: [
                {
                  name: "submenu1-1",
                  children: [
                    {
                      name: "submenu1-1-1",
                      children: [
                        {
                          name: "submenu1-1",
                          children: [
                            {
                              name: "submenu1-1-1111111111111111111",
                            },
                            {
                              name: "submenu1-1-2",
                            },
                          ],
                        },
                        {
                          name: "submenu1-2",
                        },
                      ],
                    },
                    {
                      name: "submenu1-1-2",
                    },
                  ],
                },
                {
                  name: "submenu1-2",
                },
              ],
            },
          ],
        },
        {
          name: "submenu1-2",
        },
      ],
    },
    {
      name: "menu2",
    },
    {
      name: "menu3",
    },
    {
      name: "menu3",
    },
    {
      name: "menu2",
    },
    {
      name: "menu3",
    },
    {
      name: "menu3",
    },
    {
      name: "menu2",
    },
    {
      name: "menu3",
    },
    {
      name: "menu3",
    },
    {
      name: "menu2",
    },
    {
      name: "menu3",
    },
    {
      name: "menu3",
      children: [
        {
          name: "submenu1-1",
          children: [
            {
              name: "submenu1-1-1",
            },
            {
              name: "submenu1-1-2",
              children: [
                {
                  name: "submenu1-1",
                  children: [
                    {
                      name: "submenu1-1-1",
                      children: [
                        {
                          name: "submenu1-1",
                          children: [
                            {
                              name: "submenu1-1-1111111111111111111",
                            },
                            {
                              name: "submenu1-1-2",
                            },
                          ],
                        },
                        {
                          name: "submenu1-2",
                        },
                      ],
                    },
                    {
                      name: "submenu1-1-2",
                    },
                  ],
                },
                {
                  name: "submenu1-2",
                },
              ],
            },
          ],
        },
        {
          name: "submenu1-2",
        },
      ],
    },
  ];

  const dfs = (root: any, depth: number) => {
    if (root == null) {
      return;
    }
    root.id = `${depth}-${
      root.name
    }-${new Date().getTime()}-${crypto.randomUUID()}`;
    root.depth = depth;
    console.log(root.id);

    if (
      root.children == null ||
      (Array.isArray(root.children) && root.children.length == 0)
    ) {
      return;
    }
    // console.log(root.children);

    for (const node of root.children) {
      dfs(node, depth + 1);
    }
  };

  const traverse = (menuArr: any) => {
    for (const root of menuArr) {
      dfs(root, 1);
    }
  };

  traverse(menu);

  return (
    <>
      <Menu menu={menu} />
    </>
  );
});

export const FileTreeDirectory = createContextId<any>("FileTreeDirectory");
export const Menu = component$((props: { menu: any }) => {
  const { menu } = props;

  const state = useStore({
    activeIds: [],
  });

  useContextProvider(FileTreeDirectory, state);
  return (
    <>
      {/* menu head */}
      {/* TODO: icon or banner... */}
      <ButtonGroup />

      {/* menu tree list */}
      <ul
        class={{
          "menu menu-xm bg-base-200 p-1 rounded-box": true,
        }}
      >
        {menu.map((menuItem: any) => (
          <>
            <MenuItem menuItem={menuItem} />
          </>
        ))}
      </ul>
    </>
  );
});

const switchFn = (var1: Signal<boolean>) => {
  var1.value = !var1.value;
};

const clearActive = () => {};

export const MenuItem = component$((props: { menuItem: any }) => {
  const { menuItem } = props;
  const collaspe = useSignal(false);
  const active = useSignal(false);
  const fileTreeDirectory = useContext(FileTreeDirectory);
  return (
    <>
      <li>
        {/* has children */}
        {menuItem.children ? (
          <>
            <span
              class={{
                "menu-dropdown-show": !collaspe.value,
                "py-1 my-0.5": true,
                active: fileTreeDirectory.activeIds.includes(menuItem.id),
              }}
              onClick$={() => {
                switchFn(active);
                fileTreeDirectory.activeIds = [menuItem.id];
              }}
            >
              <div
                onClick$={() => {
                  switchFn(collaspe);
                }}
              >
                <>
                  <div
                    class={{ "font-bold -ml-1.5": true }}
                    style={`
                        transform: rotate(${
                          collaspe.value ? `180deg` : `270deg`
                        });
                        transition: all 0.3s ease-out;
                    `}
                  >
                    く
                  </div>
                </>
              </div>
              {menuItem.name}
            </span>
            <ul
              class={{
                "menu-dropdown": true,
                "menu-dropdown-show": !collaspe.value,
              }}
            >
              {menuItem.children.map((children: any) => (
                <>
                  <MenuItem menuItem={children} />
                </>
              ))}
            </ul>
          </>
        ) : (
          <>
            <span
              class={{
                active: fileTreeDirectory.activeIds.includes(menuItem.id),
                "py-1 my-0.5 -ml-1.5 -pl-2": true,
              }}
              onClick$={() => {
                // switchFn(active);
                fileTreeDirectory.activeIds = [menuItem.id];
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class={{ "w-4 h-4": true }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              {menuItem.name}
            </span>
          </>
        )}
      </li>
    </>
  );
});

export const ButtonGroup = component$(() => {
  return (
    <>
      <div class="flex">
        <div class="grow join flex">
          <button class="btn btn-ghost btn-xs text-gray-600 m-0.5 p-0.5 text-xm">
            &nbsp;+&nbsp;
          </button>
          <button class="btn btn-ghost btn-xs text-gray-600 m-0.5 p-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="h-4 w-4 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              ></path>
            </svg>
          </button>
        </div>
        <div class="grow join flex flex-row-reverse">
          <button class="btn btn-ghost btn-xs text-gray-600 m-0.5 p-0.5">
            &nbsp;...&nbsp;
          </button>
          <button class="btn btn-ghost btn-xs text-gray-600 m-0.5 p-0.5">
            <svg
              class="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <path d="M 16 3 C 14.742188 3 13.847656 3.890625 13.40625 5 L 6 5 L 6 28 L 26 28 L 26 5 L 18.59375 5 C 18.152344 3.890625 17.257813 3 16 3 Z M 16 5 C 16.554688 5 17 5.445313 17 6 L 17 7 L 20 7 L 20 9 L 12 9 L 12 7 L 15 7 L 15 6 C 15 5.445313 15.445313 5 16 5 Z M 8 7 L 10 7 L 10 11 L 22 11 L 22 7 L 24 7 L 24 26 L 8 26 Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
});
