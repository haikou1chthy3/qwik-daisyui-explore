import {
  component$,
  useContext,
  useStore,
} from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { APP_CTX } from "~/routes/sys/user-manage";
import type { LookupItem } from "~/utils/else-util";
import { i18n } from "~/utils/else-util";

type MenuItem = LookupItem & { checked: boolean };

interface MenuItemProps {
  menuItem: MenuItem;
}

interface MenuItemsProps {
  menuItems: MenuItem[];
}

export default component$((props: MenuItemsProps) => {
  const { collaspeMenu } = useContext(APP_CTX);
  const store = useStore({
    collaspeMenu,
  });
  const { menuItems } = props;
  return (
    <>
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
        {menuItems.map((menuItem) => (
          <>
            <SubMenuItem
              key={menuItem.pathname}
              menuItem={menuItem}
            />
          </>
        ))}
      </ul>
    </>
  );
});

const SubMenuItem = component$((props: MenuItemProps) => {
  const loc = useLocation();
  const { menuItem } = props;
  return (
    <>
      {menuItem.child ? (
        <li>
          <details open={true}>
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
              {i18n({
                s: menuItem.pathname,
                lookupList: [menuItem],
                locale: "CN",
              })}
            </summary>

            <li>
              <ul
                class={{
                  "menu-dropdown": true,
                  "menu-dropdown-show": true,
                }}
              >
                {menuItem.child?.map((item) => (
                  <SubMenuItem
                    key={item.pathname}
                    menuItem={item}
                  />
                ))}
              </ul>
            </li>
          </details>
        </li>
      ) : (
        <li key={menuItem.pathname}>
          <Link
            href={menuItem.pathname}
            class={{
              active:
                menuItem.pathname === loc.url.pathname || menuItem.checked,
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
            {i18n({
              s: menuItem.pathname,
              lookupList: [menuItem],
              locale: "CN",
            })}
          </Link>
        </li>
      )}
    </>
  );
});
