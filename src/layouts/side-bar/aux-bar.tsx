import {
  component$,
  useContext,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import ChildrenExample from "~/components/complex/recursive-component/children-example";
import type { MenuItem } from "~/components/search-bar/directory-tree";
import DirectoryTree from "~/components/search-bar/directory-tree";
import { APP_CTX } from "~/routes/layout";
// import { filterTree } from "~/utils/else-util";

const rootNode: MenuItem = {
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
};

const filter = (rootNode: any, searchKey?: string) => {
  const arr = rootNode.child?.filter((c: any) => {
    // for(const child of rootNode.child){
    //   child.child = filter(child,searchKey)
    // }
    return c.title.indexOf(searchKey ?? "") > -1;
  });
  return arr;
};
export default component$(() => {
  const { collaspeMenu, auxBar } = useContext(APP_CTX);
  const store = useStore({
    collaspeMenu,
    auxBar,
  });

  // deconstruction reactive ？
  const { title, checked, child } = rootNode;
  const menuItem = useStore({ title, checked, child });
  useVisibleTask$(
    ({ track }) => {
      track(() => {
        return auxBar.searchKey;
      });
      menuItem.child = filter(rootNode, auxBar.searchKey);
    },
    { strategy: "document-ready" }
  );

  return (
    <>
      <div
        class={{
          "pl-3": !store.auxBar.isCollaspe,
          "font-san w-64 bg-base-200 text-sm shadow-md border-slate-900 border-r":
            true,
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
            hidden: store.auxBar.isCollaspe,
            "flex p-3 ": true,
          }}
        >
          <input
            class="input join-item select-bordered w-full max-w-xs h-10 text-xs -ml-2"
            placeholder={store.auxBar.searchKey}
            value={store.auxBar.searchKey}
            onInput$={(event) =>
              (store.auxBar.searchKey = (
                event.target as HTMLInputElement
              ).value)
            }
          />
          <button class="btn btn-ghost btn-circle btn-sm -ml-10 mt-1 z-10">
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
            </svg>
          </button>
        </div>
        <div class={{ hidden: store.auxBar.isCollaspe }}>
          {/* <DirectoryTree menuItem={menuItem} /> */}
          <div
            class="overflow-auto -mt-2 "
            style={{ height: `calc(100vh - 65px)` }}
          >
            <ChildrenExample />
          </div>
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
    </>
  );
});
