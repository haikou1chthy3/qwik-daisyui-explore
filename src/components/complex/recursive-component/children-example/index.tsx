import type { QwikMouseEvent, Signal } from "@builder.io/qwik";
import {
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useOnDocument,
  useSignal,
  useStore,
  useStylesScoped$,
  $,
} from "@builder.io/qwik";
import style from "./index.css?inline";
export const dfs = (root: any, depth: number) => {
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

export const traverse = (menuArr: any) => {
  for (const root of menuArr) {
    dfs(root, 1);
  }
};

export const dfsWithFn = (root: any, depth: number, fn: Function) => {
  if (root == null) {
    return;
  }

  fn(root);

  if (
    root.children == null ||
    (Array.isArray(root.children) && root.children.length == 0)
  ) {
    return;
  }

  // console.log(root.children);

  for (const node of root.children) {
    dfsWithFn(node, depth + 1, fn);
  }
};

export const traverseWithFn = (menuArr: any, fn: Function) => {
  for (const root of menuArr) {
    dfsWithFn(root, 1, fn);
  }
};

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

  traverse(menu);

  const state = useStore({
    activeIds: [],
    mousePoint: {
      x: 0,
      y: 0,
    },
    menu,
  });
  const visible = useSignal(false);

  useStylesScoped$(style);
  useContextProvider(FileTreeDirectory, state);
  useOnDocument(
    "click",
    $((event) => {
      let element = event.target || event.srcElement;

      //循环判断至跟节点，防止点击的是div子元素
      while (element) {
        const ele = element as HTMLElement;
        // console.log(event.target);
        if (ele.id && ele.id == "menu-item-pop") {
          return;
        }
        element = ele.parentNode;
      }

      visible.value = false;
    })
  );
  return (
    <>
      <Menu menu={menu} v={visible} />
      <div
        class={{ hidden: !visible.value }}
        onBlur$={() => {
          visible.value = false;
        }}
        id="menu-item-pop"
      >
        <ul
          style={{
            top: `${state.mousePoint.y}px`,
            left: `${state.mousePoint.x}px`,
          }}
          class="z-[3] menu absolute p-2 shadow bg-base-300 rounded-box w-52 origin-top-right divide-y divide-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <li>
            <a
              onClick$={() => {
                const { activeIds, menu } = state;
                traverseWithFn(menu, (root: any) => {
                  if (root.id === activeIds[0]) {
                    const newMenuItem = {
                      id: `${menu[0].depth}-${
                        root.name
                      }-${new Date().getTime()}-${crypto.randomUUID()}`,
                      name: "new",
                      depth: root.depth + 1,
                    };
                    const childrenArr = [...root.children];
                    root.children = childrenArr.concat([newMenuItem]);
                    console.log(newMenuItem);
                  }
                });
                visible.value = false;
              }}
            >
              添加文件
            </a>
            <a>添加目录</a>
          </li>
          <li>
            <a>编辑</a>
          </li>
          <li>
            <a>删除</a>
          </li>
        </ul>
      </div>
    </>
  );
});

export const FileTreeDirectory = createContextId<any>("FileTreeDirectory");
export const Menu = component$((props: { menu: any; v: any }) => {
  const { menu, v } = props;

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
            <MenuItem menuItem={menuItem} v={v} />
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

export const MenuItem = component$((props: { menuItem: any; v: any }) => {
  useStylesScoped$(style);
  const { menuItem, v } = props;
  const collaspe = useSignal(false);
  const active = useSignal(false);
  const isEditable = useSignal(false);
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
              preventdefault:contextmenu
              onContextMenu$={(
                event: QwikMouseEvent<HTMLSpanElement, MouseEvent>
              ) => {
                switchFn(active);
                fileTreeDirectory.activeIds = [menuItem.id];
                fileTreeDirectory.mousePoint.x = event.clientX;
                fileTreeDirectory.mousePoint.y = event.clientY;
                const { x, y } = fileTreeDirectory.mousePoint;
                console.log(x, y);
                switchFn(v);
              }}
              onClick$={(
                event: QwikMouseEvent<HTMLSpanElement, MouseEvent>
              ) => {
                switchFn(active);
                fileTreeDirectory.activeIds = [menuItem.id];
                console.log(menuItem);
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
              <div
                contentEditable={isEditable.value.toString()}
                onInput$={(event: Event) => {
                  menuItem.name = (event.target as HTMLInputElement).innerHTML;
                  console.log(menuItem);
                }}
                onDblClick$={() => {
                  switchFn(isEditable);
                }}
                onBlur$={() => {
                  switchFn(isEditable);
                }}
              >
                {menuItem.name}
              </div>
            </span>
            <ul
              class={{
                "menu-dropdown": true,
                "menu-dropdown-show": !collaspe.value,
              }}
            >
              {menuItem.children.map((children: any) => (
                <>
                  <MenuItem menuItem={children} v={v} />
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
              preventdefault:contextmenu
              onContextMenu$={(
                event: QwikMouseEvent<HTMLSpanElement, MouseEvent>
              ) => {
                switchFn(active);
                fileTreeDirectory.activeIds = [menuItem.id];
                fileTreeDirectory.mousePoint.x = event.clientX;
                fileTreeDirectory.mousePoint.y = event.clientY;
                // const { x, y } = fileTreeDirectory.mousePoint;
                // console.log(x, y);
                switchFn(v);
              }}
              onClick$={(
                event: QwikMouseEvent<HTMLSpanElement, MouseEvent>
              ) => {
                switchFn(active);
                fileTreeDirectory.activeIds = [menuItem.id];
                // console.log(menuItem);
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
              <div
                contentEditable={isEditable.value.toString()}
                onInput$={(event: Event) => {
                  menuItem.name = (event.target as HTMLInputElement).innerHTML;
                  console.log(menuItem);
                }}
                onDblClick$={() => {
                  switchFn(isEditable);
                }}
                onBlur$={() => {
                  switchFn(isEditable);
                }}
              >
                {menuItem.name}
              </div>
            </span>
          </>
        )}
      </li>
    </>
  );
});

export const ButtonGroup = component$(() => {
  const fileTreeDirectory = useContext(FileTreeDirectory);
  return (
    <>
      <div class="flex">
        <div class="grow join flex">
          <button
            class="btn btn-ghost btn-xs text-gray-600 m-0.5 p-0.5 text-xm"
            onClick$={() => {
              const { activeIds, menu } = fileTreeDirectory;
              traverseWithFn(menu, (root: any) => {
                if (root.id === activeIds[0]) {
                  const newMenuItem = {
                    id: `${menu[0].depth}-${
                      root.name
                    }-${new Date().getTime()}-${crypto.randomUUID()}`,
                    name: "new",
                    depth: root.depth + 1,
                  };
                  const childrenArr = [...root.children];
                  root.children = childrenArr.concat([newMenuItem]);
                  console.log(newMenuItem);
                }
              });
            }}
          >
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
