import {
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  Link,
  useContent,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";
import TreeMenu from "~/components/menu/tree-menu";
import ListSelector from "~/components/search-bar/list-selector";
import SearchInput from "~/components/search-bar/search-input";
import TreeSelector from "~/components/search-bar/tree-selector";
import { i18n } from "~/utils/else-util";
import type { RequestHandler } from "@builder.io/qwik-city";

// End point
// export const onRequest: RequestHandler = ({ headers, query, json }) => {
//   headers.set('Cache-Control', 'private');
//   if (query.get('format') === 'json') {
//     json(200, { message: 'Hello World' });
//   }
// };

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
  // TODO: 待抽取处理
  pageDTO: {
    data: {}[];
    pageSize: number;
    pageTotal: number;
    pageIndex: number;
    pageRangeNum: number;
    pageRange: (string | number)[];
  };
}

export const APP_CTX = createContextId<APP_CTX>("APP_CTX");
export default component$(() => {
  //   const { menu } = useContent();
  //   console.log(menu);

  const loc = useLocation();
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

    pageDTO: {
      data: [{}],
      pageSize: 5,
      pageTotal: 50,
      pageIndex: 1,
      pageRangeNum: 3,
      pageRange: [1, 2, 3, 4, 5, "...", 46, 47, 48, 49, 50],
    },
  });

  useContextProvider(APP_CTX, store);
  useVisibleTask$(({ track }) => {
    const pageIndex = track(() => store.pageDTO.pageIndex);
    store.pageDTO.pageIndex = pageIndex;
    store.pageDTO.data = queryData(store.pageDTO);
    store.pageDTO.pageRange = calcPageRange(store.pageDTO);
  });
  return (
    <>
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
                <h2>用户</h2>
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
            </div>
          </div>
    </>
  );
});
