import {
  component$,
  createContextId,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import ListSelector from "~/components/search-bar/list-selector";
import { calcPageRange } from "~/utils/else-util";
import TreeMultiSelector from "~/components/search-bar/tree-multi-selector";
import Pageination from "~/components/pageination";
import Login from "~/components/dialog/login";

const pageList = [
  {
    id: 34,
    parentCode: "",
    parentNameCn: "ROOT",
    parentNameEn: "ROOT",
    code: "test_code",
    nameCn: "测试",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 33,
    parentCode: "content_manage_system",
    parentNameCn: "内容管理系统",
    parentNameEn: null,
    code: "test_code",
    nameCn: "测试",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 27,
    parentCode: "content_manage_system",
    parentNameCn: "内容管理系统",
    parentNameEn: null,
    code: "personalization_module",
    nameCn: "个性化",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 26,
    parentCode: "content_manage_system",
    parentNameCn: "内容管理系统",
    parentNameEn: null,
    code: "plugin_module",
    nameCn: "插件",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 25,
    parentCode: "content_manage_system",
    parentNameCn: "内容管理系统",
    parentNameEn: null,
    code: "statistics_and_analysis_module",
    nameCn: "数据分析",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 24,
    parentCode: "content_manage_system",
    parentNameCn: "内容管理系统",
    parentNameEn: null,
    code: "i18n_support_module",
    nameCn: "国际化",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 23,
    parentCode: "content_manage_system",
    parentNameCn: "内容管理系统",
    parentNameEn: null,
    code: "workflow_module",
    nameCn: "工作流",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 22,
    parentCode: "content_manage_system",
    parentNameCn: "内容管理系统",
    parentNameEn: null,
    code: "auth_module",
    nameCn: "权限",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 21,
    parentCode: "content_manage_system",
    parentNameCn: "内容管理系统",
    parentNameEn: null,
    code: "user_module",
    nameCn: "用户",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 20,
    parentCode: "content_manage_system",
    parentNameCn: "内容管理系统",
    parentNameEn: null,
    code: "api_module",
    nameCn: "API",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 19,
    parentCode: "content_manage_system",
    parentNameCn: "内容管理系统",
    parentNameEn: null,
    code: "content_modolue",
    nameCn: "内容",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 18,
    parentCode: "module",
    parentNameCn: "模块",
    parentNameEn: null,
    code: "date_processing_system",
    nameCn: "数据处理系统",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 17,
    parentCode: "module",
    parentNameCn: "模块",
    parentNameEn: null,
    code: "office_auto_manage",
    nameCn: "办公自动化系统",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 16,
    parentCode: "module",
    parentNameCn: "模块",
    parentNameEn: null,
    code: "mall_manage_system",
    nameCn: "商场管理",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 15,
    parentCode: "module",
    parentNameCn: "模块",
    parentNameEn: null,
    code: "enterprise_resource_plan_manage",
    nameCn: "企业资源计划管理",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 14,
    parentCode: "module",
    parentNameCn: "模块",
    parentNameEn: null,
    code: "customer_relation_manage",
    nameCn: "客户关系管理",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 13,
    parentCode: "module",
    parentNameCn: "模块",
    parentNameEn: null,
    code: "content_manage_system",
    nameCn: "内容管理",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 12,
    parentCode: "system_manage",
    parentNameCn: "系统管理",
    parentNameEn: null,
    code: "config_manage",
    nameCn: "配置管理",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 11,
    parentCode: "system_manage",
    parentNameCn: "系统管理",
    parentNameEn: null,
    code: "resource_manage",
    nameCn: "资源管理",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 10,
    parentCode: "system_manage",
    parentNameCn: "系统管理",
    parentNameEn: null,
    code: "auth_manage",
    nameCn: "权限管理",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 9,
    parentCode: "system_manage",
    parentNameCn: "系统管理",
    parentNameEn: null,
    code: "user_manage",
    nameCn: "用户管理",
    nameEN: null,
    order: null,
    descCn: "",
    descEN: null,
  },
  {
    id: 8,
    parentCode: "module",
    parentNameCn: "模块",
    parentNameEn: null,
    code: "system_manage",
    nameCn: "系统管理",
    nameEN: null,
    order: null,
    descCn: "  ",
    descEN: null,
  },
  {
    id: 7,
    parentCode: "tree_test_case",
    parentNameCn: "树形类型",
    parentNameEn: null,
    code: "node2",
    nameCn: "节点二",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 6,
    parentCode: "tree_test_case",
    parentNameCn: "树形类型",
    parentNameEn: null,
    code: "node1",
    nameCn: "节点一",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 5,
    parentCode: "lookup_type_test_case2",
    parentNameCn: "测试Lookup类型二",
    parentNameEn: null,
    code: "tree_test_case",
    nameCn: "树形类型",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 4,
    parentCode: "",
    parentNameCn: "ROOT",
    parentNameEn: "ROOT",
    code: "lookup_type_test_case2",
    nameCn: "测试Lookup类型二",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 3,
    parentCode: "lookup_type_test_case",
    parentNameCn: "测试Lookup类型",
    parentNameEn: null,
    code: "plain_test_case",
    nameCn: "平铺类型",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
  {
    id: 1,
    parentCode: "",
    parentNameCn: "ROOT",
    parentNameEn: "ROOT",
    code: "lookup_type_test_case",
    nameCn: "测试Lookup类型",
    nameEN: null,
    order: null,
    descCn: null,
    descEN: null,
  },
];

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
  table?: {
    columns: string[];
  };
  dialog: {
    visible: boolean;
  };
}

const menuItem = {
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

export const APP_CTX = createContextId<APP_CTX>("APP_CTX");
export default component$(() => {
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
      data: [{}, {}, {}, {}, {}, {}, {}, {}],
      pageSize: 8,
      pageTotal: 100,
      pageIndex: 1,
      pageRangeNum: 3,
      pageRange: [1, 2, 3, 4, 5, "...", 46, 47, 48, 49, 50],
    },

    table: {
      columns: [
        "Selection",
        "No",
        "ID",
        "Upper Lookup Type",
        "Lookup Type",
        "Description",
        "Status",
        "Operation",
      ],
    },

    dialog: {
      visible: false,
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
            <h4>Lookup</h4>
          </div>

          {/* search bar */}
          <div class="my-5 flex shadow">
            <div class="mr-1">
              <TreeMultiSelector
                searchKey="上一级Lookup类型"
                menuItem={menuItem}
              />
            </div>
            <div class="mr-1">
              <TreeMultiSelector
                searchKey="当前Lookup类型"
                menuItem={menuItem}
              />
            </div>
            <div class="mr-1">
              <ListSelector searchKey="使用状态" />
            </div>

            <div class="join">
              <div>
                <div>
                  <input
                    class="input input-bordered join-item"
                    placeholder="请输入关键词..."
                  />
                </div>
              </div>
              <div class="join-item">
                <ListSelector searchKey="高级筛选" />
              </div>
              <div class="indicator">
                <button class="btn join-item">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    data-qwik-inspector="routes/layout.tsx:404:17"
                  >
                    <path
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      data-qwik-inspector="routes/layout.tsx:411:19"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="ml-2">
              <div
                class="btn btn-primary p-2"
                onClick$={() => {
                  login_modal.showModal();
                }}
              >
                NEW
              </div>
            </div>
            <div class="ml-2">
              <div class="btn btn-ghost join-item">···</div>
            </div>
          </div>

          <div class="overflow-x-auto text-sm shadow border rounded-lg border-gray-800">
            <table class="table ">
              {/* <!-- head --> */}
              <thead>
                <tr>
                  {store.table.columns.map((column: string) => (
                    <th key={column}>
                      {column === "Selection" ? (
                        <label>
                          <input type="checkbox" class="checkbox checkbox-sm" />
                        </label>
                      ) : (
                        <>{column}</>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {store.pageDTO.data.map((record, index) => (
                  <tr key={index}>
                    <th>
                      <label>
                        <input type="checkbox" class="checkbox checkbox-sm" />
                      </label>
                    </th>
                    <td>{index + 1}</td>
                    <td>{record.id}</td>
                    <td>
                      <div class="flex items-center space-x-3">
                        <div>
                          <div class="font-bold">{record.parentNameCn}</div>
                          <div class="text-sm opacity-50">
                            {record.parentCode}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {record.nameCn}
                      <br />
                      <span class="badge badge-ghost badge-sm">
                        {record.code}
                      </span>
                    </td>
                    <td>{record.descCn}</td>
                    <td>
                      {/* <span class="badge badge-ghost badge badge-sm">
                            deactive
                          </span> */}
                      <span class="badge badge-ghost badge-x text-lime-200">
                        active
                      </span>
                    </td>
                    <td>
                      <button class="btn btn-ghost btn-xs">details</button>
                      <button class="btn btn-ghost btn-xs">modify</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* pagaination component*/}
          <div class="my-5 shadow border rounded-lg border-gray-800">
            <Pageination pageDTO={store.pageDTO} />
          </div>
        </div>
      </div>
      <div>
        <Login id={"login_modal"} />
      </div>
    </>
  );
});
