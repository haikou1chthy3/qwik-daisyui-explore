/* eslint-disable qwik/valid-lexical-scope */
import type { PropFunctionProps } from "@builder.io/qwik";
import {
  $,
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";

export interface SubMenuItem {
  title: string;
  checked?: boolean;
  child?: SubMenuItem[] | null;
  fn$?: PropFunctionProps<(checked: boolean) => void>;
}
export interface MenuProps {
  menuItem: SubMenuItem;
}

export default component$(() => {
  const store = useStore<MenuProps>({
    menuItem: {
      title: "目录1",
      checked: true,
      child: [
        {
          title: "子目录1",
          child: [
            {
              title: "子文件1",
              child: null,
              checked: true,
            },
          ],
          checked: false,
        },
        {
          title: "子文件2",
          child: null,
        },
        {
          title: "子文件3",
          child: null,
        },
        {
          title: "子目录2",
          child: [
            {
              title: "子文件4",
              child: null,
            },
            {
              title: "子目录1",
              child: [
                {
                  title: "子文件1",
                  child: null,
                  checked: true,
                },
                {
                  title: "子目录1",
                  child: [
                    {
                      title: "子文件1",
                      child: null,
                      checked: true,
                    },
                  ],
                  checked: false,
                },
                {
                  title: "子文件2",
                  child: null,
                },
                {
                  title: "子文件3",
                  child: null,
                },
                {
                  title: "子目录2",
                  child: [
                    {
                      title: "子文件4",
                      child: null,
                    },
                    {
                      title: "子目录1",
                      child: [
                        {
                          title: "子文件1",
                          child: null,
                          checked: true,
                        },
                      ],
                      checked: false,
                    },
                    {
                      title: "子文件2",
                      child: null,
                    },
                    {
                      title: "子文件3",
                      child: null,
                    },
                    {
                      title: "子目录2",
                      child: [
                        {
                          title: "子文件4",
                          child: null,
                        },
                      ],
                    },
                  ],
                },
              ],
              checked: false,
            },
            {
              title: "子文件2",
              child: null,
            },
            {
              title: "子文件3",
              child: null,
            },
            {
              title: "子目录2",
              child: [
                {
                  title: "子文件4",
                  child: null,
                },
              ],
            },
          ],
        },
        {
          title: "子目录1",
          child: [
            {
              title: "子文件1",
              child: null,
              checked: true,
            },
          ],
          checked: false,
        },
        {
          title: "子文件2",
          child: null,
        },
        {
          title: "子文件3",
          child: null,
        },
        {
          title: "子目录2",
          child: [
            {
              title: "子文件4",
              child: null,
            },
          ],
        },
      ],
    },
  });
  return (
    <>
      <div class="dropdown">
        <input
          tabindex="0"
          class="input join-item select select-bordered w-full max-w-xs"
          placeholder="Search Input"
        />
        <div>
          <ul
            tabindex="0"
            class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-full mt-2 menu-xs max-w-xs overflow-auto max-h-96"
          >
            <Menu menuItem={store.menuItem} />
          </ul>
        </div>
      </div>
    </>
  );
});

export const Menu = component$((props: MenuProps) => {
  const { menuItem } = props;
  const state = menuItem
//   useStore<SubMenuItem>(menuItem, { deep: true });
  return (
    <>
      <ul class="menu menu-xs bg-base-200 rounded-lg max-w-xs w-full">
        <SubMenuItem
          key={`${new Date().getTime()}-${state.title}`}
          title={state.title}
          checked={state.checked}
          child={state.child}
          fn$={(checked: boolean) => {
            state.checked = checked;
            console.log(state.title, "======>", state.checked);

            if (state && menuItem.child) {
              const queue = [...state.child];
              // 迭代所有字节点
              while (queue.length != 0) {
                const currNode = queue.pop();
                if (currNode) {
                  currNode.checked = state.checked;
                  console.log(currNode.title, "======>", currNode.checked);

                  if (currNode.child) {
                    for (const i of currNode.child) {
                      queue.push(i);
                    }
                  }
                }
              }
            }
          }}
        ></SubMenuItem>
      </ul>
    </>
  );
});

export const SubMenuItem = component$((props: SubMenuItem) => {
  const checked = useSignal(props.checked);
  useVisibleTask$(({ track }) => {
    const value = track(() => {
      checked.value;
    });
  });
  return (
    <>
      <li>
        {props.child ? (
          <details open>
            <summary>
              <div class="flex">
                <input
                  id="checkbox-3"
                  aria-describedby="checkbox-3"
                  type="checkbox"
                  class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded mr-2 checkbox"
                  checked={props.checked}
                  onChange$={$(
                    async (_: any, el: { checked: boolean | undefined }) => {
                      checked.value = el.checked;
                      await props.fn$(checked.value ?? props.checked);
                    }
                  )}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>
                {props.title}
              </div>
            </summary>
            <ul>
              {props.child?.map((item: any) => (
                <>
                  <SubMenuItem
                    key={`${new Date().getTime()}-${item.title}`}
                    title={item.title}
                    checked={item.checked}
                    child={item.child}
                    fn$={(checked: boolean) => {
                      item.checked = checked;
                      console.log(item.title, "======>", item.checked);

                      if (item && item.child) {
                        const queue = [...item.child];

                        // 迭代所有字节点
                        while (queue.length != 0) {
                          const currNode = queue.pop();
                          if (currNode) {
                            currNode.checked = item.checked;
                            console.log(
                              currNode.title,
                              "======>",
                              currNode.checked
                            );

                            if (currNode.child) {
                              for (const i of currNode.child) {
                                queue.push(i);
                              }
                            }
                          }
                        }
                      }
                    }}
                  ></SubMenuItem>
                </>
              ))}
            </ul>
          </details>
        ) : (
          <a>
            <div class="flex">
              <input
                id="checkbox-3"
                aria-describedby="checkbox-3"
                type="checkbox"
                class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded mr-2 checkbox"
                checked={props.checked}
                onChange$={async (_, el) => {
                  checked.value = el.checked;
                  await props.fn$(checked.value);
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              {props.title + "（文件）"}
            </div>
          </a>
        )}
      </li>
    </>
  );
});
