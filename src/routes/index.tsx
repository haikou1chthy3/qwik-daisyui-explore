import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import ListSelector from "~/components/search-bar/list-selector";
// import SearchInput from "~/components/search-bar/search-input";
import TreeSelector from "~/components/search-bar/tree-selector";

const pageList = [
  {
    id: 0,
    typeValue: "Dictionary example type",
    code: 20230513184800,
    value: "",
    desc: "...",
    active: true,
    operation: ["detail"],
    descCreatedBy: "church",
  },
  {
    id: 1,
    typeValue: "Dictionary example type",
    code: 20230513184801,
    value: "",
    desc: "...",
    active: true,
    operation: ["detail"],
    descCreatedBy: "admin",
  },
  {
    id: 2,
    typeValue: "Dictionary example type",
    code: 20230513184802,
    value: "",
    desc: "...",
    active: true,
    operation: ["detail"],
    descCreatedBy: "admin",
  },
  {
    id: 3,
    typeValue: "Dictionary example type",
    code: 20230513184803,
    value: "",
    desc: "...",
    active: true,
    operation: ["detail"],
    descCreatedBy: "admin",
  },
  {
    id: 4,
    typeValue: "Dictionary example type",
    code: 20230513184804,
    value: "",
    desc: "...",
    active: true,
    operation: ["detail"],
    descCreatedBy: "admin",
  },
  {
    id: 5,
    typeValue: "Dictionary example type",
    code: 20230513184805,
    value: "",
    desc: "...",
    active: true,
    operation: ["detail"],
    descCreatedBy: "admin",
  },
];

const generateArray = (start: number, end: number) => {
  return Array.from(new Array(end + 1).keys()).slice(start);
};

const calcPageRange = (pageDTO: any) => {
  const total = pageDTO.pageTotal;
  let index = pageDTO.pageIndex;

  const startRangeNum = 3;
  const endRangeNum = 3;

  index = index > total - endRangeNum ? total - endRangeNum : index;
  const startRange = generateArray(1, startRangeNum);
  let prevRange: any = [];
  // if (index > 3) {
  prevRange = generateArray(
    index - pageDTO.pageRangeNum > 1 ? index - pageDTO.pageRangeNum : 1,
    index
  );
  // }
  const nextRange = generateArray(
    index + 1,
    index + pageDTO.pageRangeNum
  ).concat();
  const noneRange = ["..."];
  let totalRange = [];
  // if (index + pageDTO.pageRangeNum < total) {
  totalRange = generateArray(
    total - pageDTO.pageRangeNum >= 0 ? total - pageDTO.pageRangeNum : total,
    total
  );
  // }
  const startStr = startRange.join(",") + "," + noneRange.join(",") + ",";
  const endStr =
    index > total - endRangeNum * 2
      ? ""
      : "," + noneRange.join(",") + "," + totalRange.join(",");
  const rangeStr =
    // startStr +
    prevRange.join(",") + "," + nextRange.join(",") + endStr;
  // console.log(rangeStr);

  const range = rangeStr.split(",");
  return range;
};

const queryData = (pageDTO: any) => {
  const pageStartIndex = pageDTO.pageSize * (pageDTO.pageIndex - 1);
  const pageEndIndex = pageDTO.pageSize * pageDTO.pageIndex;
  const ret = pageList.slice(pageStartIndex, pageEndIndex);
  return ret;
};

export default component$(() => {
  const loc = useLocation();
  const store = useStore({
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

    pageDTO: {
      data: [{}],
      pageSize: 5,
      pageTotal: 50,
      pageIndex: 1,
      pageRangeNum: 3,
      pageRange: [1, 2, 3, 4, 5, "...", 46, 47, 48, 49, 50],
    },
  });

  useVisibleTask$(({ track }) => {
    const pageIndex = track(() => store.pageDTO.pageIndex);
    store.pageDTO.pageIndex = pageIndex;
    store.pageDTO.data = queryData(store.pageDTO);
    store.pageDTO.pageRange = calcPageRange(store.pageDTO);
  });
  return (
    <>
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
            <ul
              class={{
                menu: true,
                "bg-base-300": true,
                "w-52": true,
                "h-full": true,
                "overflow-auto": true,
                hidden: store.collaspeMenu.isCollaspe,
              }}
            >
              <li>
                <details open>
                  <summary>
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
                    系统管理
                  </summary>
                  <li>
                    <ul class="menu-dropdown menu-dropdown-show">
                      <li>
                        <a
                          href="/sys/user-manage"
                          class={{
                            active: true,
                          }}
                        >
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
                          用户管理
                        </a>
                      </li>
                      <li>
                        <a>
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
                          权限管理
                        </a>
                      </li>
                      <li>
                        <details open>
                          <summary>
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
                            资源管理
                          </summary>
                          <uL>
                            <li>
                              <a>
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
                                API
                              </a>
                            </li>
                            <li class="bg-base-200">
                              <a class="active">
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
                                UI
                              </a>
                            </li>
                            <li>
                              <a>
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
                                Uni
                              </a>
                            </li>
                            <li>
                              <a>
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
                                Verse
                              </a>
                            </li>
                          </uL>
                        </details>
                      </li>
                    </ul>
                  </li>
                </details>
              </li>
              <li>
                <details open>
                  <summary>
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
                    内容管理
                  </summary>
                  <li>
                    <ul class="menu-dropdown menu-dropdown-show">
                      <li>
                        <details open>
                          <summary>
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
                            上架发布
                          </summary>
                          <li>
                            <ul class="menu-dropdown menu-dropdown-show">
                              <li>
                                <a>
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
                                  活动
                                </a>
                              </li>
                              <li>
                                <a>
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
                                  新闻
                                </a>
                              </li>
                              <li>
                                <a>
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
                                  配置
                                </a>
                              </li>
                            </ul>
                          </li>
                        </details>
                      </li>
                      <li>
                        <details open>
                          <summary>
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
                            个性化
                          </summary>
                          <li>
                            <ul class="menu-dropdown menu-dropdown-show">
                              <li>
                                <a>
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
                                  布局
                                </a>
                              </li>
                              <li>
                                <a>
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
                                  组件
                                </a>
                              </li>
                              <li>
                                <a>
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
                                  配置
                                </a>
                              </li>
                            </ul>
                          </li>
                        </details>
                      </li>
                      <li>
                        <a>
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
                          配置
                        </a>
                      </li>
                    </ul>
                  </li>
                </details>
              </li>
            </ul>
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
          <div
            class="container h-full font-sanf overflow-auto"
            style={{ height: `calc(100vh - 65px)` }}
          >
            <div
              class={
                !store.auxBar.isCollaspe || !store.collaspeMenu.isCollaspe
                  ? ["mx-6"]
                  : []
              }
            >
              {/* list page components */}
              <div class="my-5">
                <h2>一、表格组件</h2>
              </div>

              {/* search bar */}
              <div class="my-5 flex">
                <div class="mr-1">
                  <ListSelector />
                </div>
                <div class="mr-1">
                  <ListSelector />
                </div>
                <div class="mr-1">
                  <ListSelector />
                </div>

                <div class="join">
                  <div>
                    <div>
                      <input
                        class="input input-bordered join-item"
                        placeholder="Search..."
                      />
                    </div>
                  </div>
                  <div class="join-item">
                    <ListSelector />
                  </div>
                  <div class="indicator">
                    <button class="btn join-item">Search</button>
                  </div>
                </div>
                <div class="ml-2">
                  <div class="btn btn-primary p-2">NEW</div>
                </div>
              </div>

              <div class="overflow-x-auto text-sm shadow-2xl border rounded-lg border-gray-800">
                <table class="table ">
                  {/* <!-- head --> */}
                  <thead>
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" class="checkbox checkbox-sm" />
                        </label>
                      </th>
                      <th>Name</th>
                      <th>Job</th>
                      <th>Favorite Color</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <!-- row 1 --> */}
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" class="checkbox checkbox-sm" />
                        </label>
                      </th>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12">
                              <img
                                width="690"
                                height="690"
                                src="https://p1.itc.cn/q_70/images03/20211009/d072da16d07d46179fdcb6c8437cfb66.jpeg"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div class="font-bold">Hart Hagerty</div>
                            <div class="text-sm opacity-50">United States</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Zemlak, Daniel and Leannon
                        <br />
                        <span class="badge badge-ghost badge-sm">
                          Desktop Support Technician
                        </span>
                      </td>
                      <td>Purple</td>
                      <th>
                        <button class="btn btn-ghost btn-xs">details</button>
                      </th>
                    </tr>
                    {/* <!-- row 2 --> */}
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" class="checkbox checkbox-sm" />
                        </label>
                      </th>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12">
                              <img
                                width="690"
                                height="690"
                                src="https://p1.itc.cn/q_70/images03/20211009/d072da16d07d46179fdcb6c8437cfb66.jpeg"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div class="font-bold">Brice Swyre</div>
                            <div class="text-sm opacity-50">China</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Carroll Group
                        <br />
                        <span class="badge badge-ghost badge-sm">
                          Tax Accountant
                        </span>
                      </td>
                      <td>Red</td>
                      <th>
                        <button class="btn btn-ghost btn-xs">details</button>
                      </th>
                    </tr>
                    {/* <!-- row 3 --> */}
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" class="checkbox checkbox-sm" />
                        </label>
                      </th>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12">
                              <img
                                width="690"
                                height="690"
                                src="https://p1.itc.cn/q_70/images03/20211009/d072da16d07d46179fdcb6c8437cfb66.jpeg"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div class="font-bold">Marjy Ferencz</div>
                            <div class="text-sm opacity-50">Russia</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Rowe-Schoen
                        <br />
                        <span class="badge badge-ghost badge-sm">
                          Office Assistant I
                        </span>
                      </td>
                      <td>Crimson</td>
                      <th>
                        <button class="btn btn-ghost btn-xs">details</button>
                      </th>
                    </tr>
                    {/* <!-- row 4 --> */}
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" class="checkbox checkbox-sm" />
                        </label>
                      </th>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12">
                              <img
                                width="690"
                                height="690"
                                src="https://p1.itc.cn/q_70/images03/20211009/d072da16d07d46179fdcb6c8437cfb66.jpeg"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div class="font-bold">Yancy Tear</div>
                            <div class="text-sm opacity-50">Brazil</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Wyman-Ledner
                        <br />
                        <span class="badge badge-ghost badge-sm">
                          Community Outreach Specialist
                        </span>
                      </td>
                      <td>Indigo</td>
                      <th>
                        <button class="btn btn-ghost btn-xs">details</button>
                      </th>
                    </tr>
                  </tbody>
                  {/* <!-- foot --> */}
                  <tfoot>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Job</th>
                      <th>Favorite Color</th>
                      <th></th>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* pagaination component*/}
              <div class="join my-5 -inset-y-2">
                <button
                  class="join-item btn btn-ghost"
                  onClick$={() => {
                    if (store.pageDTO.pageIndex == 1) {
                      return;
                    }
                    store.pageDTO.pageIndex = 1;
                  }}
                >
                  ««
                </button>
                <button
                  class="join-item btn btn-ghost"
                  onClick$={() => {
                    if (store.pageDTO.pageIndex == 1) {
                      return;
                    }
                    store.pageDTO.pageIndex = store.pageDTO.pageIndex - 1;
                  }}
                >
                  «
                </button>
                {store.pageDTO.pageRange.map((item, index) => {
                  return (
                    <>
                      <button
                        class={{
                          btn: true,
                          "btn-ghost": true,
                          "join-item": true,
                          "btn-active": store.pageDTO.pageIndex + "" === item,
                        }}
                        onClick$={(e) => {
                          if (
                            (e.target as HTMLInputElement).innerText === "..."
                          ) {
                            store.pageDTO.pageIndex =
                              store.pageDTO.pageIndex +
                              store.pageDTO.pageRangeNum;
                            return;
                          }
                          store.pageDTO.pageIndex = parseInt(
                            (e.target as HTMLInputElement).innerText
                          );
                        }}
                      >
                        {item}
                      </button>
                    </>
                  );
                })}
                <button
                  class="join-item btn btn-ghost"
                  onClick$={() => {
                    if (store.pageDTO.pageIndex == store.pageDTO.pageTotal) {
                      return;
                    }
                    store.pageDTO.pageIndex = store.pageDTO.pageIndex + 1;
                  }}
                >
                  »
                </button>

                <button
                  class="join-item btn btn-ghost"
                  onClick$={() => {
                    if (store.pageDTO.pageIndex == store.pageDTO.pageTotal) {
                      return;
                    }
                    store.pageDTO.pageIndex = store.pageDTO.pageTotal;
                  }}
                >
                  »»
                </button>
              </div>
              <br />

              <div class="my-5">
                <h2>二、输入组件</h2>
              </div>

              <div class="my-5">搜索输入框</div>
              {/* <SearchInput /> */}

              <div class="my-5">列表选择器</div>
              <ListSelector />

              <div class="my-5">树形选择器</div>
              <TreeSelector />

              <div class="my-5">文件选择器</div>
              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">Pick a file</span>
                  <span class="label-text-alt">Alt label</span>
                </label>
                <input
                  type="file"
                  class="file-input file-input-bordered w-full max-w-xs"
                />
                <label class="label">
                  <span class="label-text-alt">Alt label</span>
                  <span class="label-text-alt">Alt label</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
