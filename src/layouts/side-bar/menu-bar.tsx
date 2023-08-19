import { component$, useContext, useStore } from "@builder.io/qwik";
import { APP_CTX } from "~/routes/layout";
import TreeMenu from "~/components/menu/tree-menu";

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
  {
    nameCN: "页面构建",
    nameEN: "Demo manage",
    pathname: "/demo/",
  },
];
export default component$(() => {
  const { collaspeMenu, auxBar, layout } = useContext(APP_CTX);
  const store = useStore({
    collaspeMenu,
    auxBar,
    layout
  });
  return (
    <>
      <div
        class={{
          "font-sanf w-52 shadow-md": true,
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
    </>
  );
});
