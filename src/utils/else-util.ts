export interface LookupItem {
  nameCN: string;
  nameEN: string;
  pathname: string;
  child?: [];
}

interface I18N {
  s: string;
  lookupList?: Array<LookupItem>;
  locale?: string;
}

export const menuList: Array<LookupItem> = [
  {
    pathname: "/sys/user-manage/",
    nameCN: "用户管理",
    nameEN: "User manage",
  },
  {
    pathname: "/sys/user-manage/",
    nameCN: "用户管理",
    nameEN: "User manage",
  },
  {
    pathname: "/sys/auth-manage/",
    nameCN: "权限管理",
    nameEN: "Auth manage",
  },
  {
    pathname: "/sys/resource-manage/",
    nameCN: "资源管理",
    nameEN: "Resource manage",
  },
  {
    pathname: "/sys/user-manage/",
    nameCN: "用户管理",
    nameEN: "User manage",
  },
  {
    pathname: "/sys/user-manage/",
    nameCN: "用户管理",
    nameEN: "User manage",
  },
  {
    pathname: "/sys/user-manage/",
    nameCN: "用户管理",
    nameEN: "User manage",
  },
  {
    pathname: "/sys/user-manage/",
    nameCN: "用户管理",
    nameEN: "User manage",
  },
];

export const locale = "CN";
export const i18n = ({ s, lookupList, locale }: I18N) => {
  let res;

  // 自带Lookup
  if (
    lookupList == null ||
    (Array.isArray(lookupList) && lookupList.length === 0)
  ) {
    lookupList = menuList;
  }
  // console.log(s,":", s === "/sys/user-manage/" ? lookupList : []);

  lookupList.forEach((lookup: any) => {
    if (lookup.pathname === s) {
      switch (locale) {
        case "CN":
          res = lookup.nameCN;
          break;
        case "EN":
        default:
          res = lookup.nameEN;
      }
    }
  });
  return res;
};

export const calcPageRange = (pageDTO: any) => {
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
  console.log(rangeStr);

  const range = rangeStr.split(",");
  return range;
};

const generateArray = (start: number, end: number) => {
  return Array.from(new Array(end + 1).keys()).slice(start);
};
