import { component$, useStore } from "@builder.io/qwik";
export interface PagegeinationProps {
  pageDTO: {
    data: {}[];
    pageSize: number;
    pageTotal: number;
    pageIndex: number;
    pageRangeNum: number;
    pageRange: (string | number)[];
  };
}
export default component$((props: PagegeinationProps) => {
  const store = props;

  return (
    <>
      <div class="join -inset-y-2">
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
                key={`${item} ${new Date()}`}
                class={{
                  btn: true,
                  "btn-ghost": true,
                  "join-item": true,
                  "btn-active": store.pageDTO.pageIndex + "" === item,
                }}
                onClick$={(e) => {
                  if ((e.target as HTMLInputElement).innerText === "...") {
                    store.pageDTO.pageIndex =
                      store.pageDTO.pageIndex + store.pageDTO.pageRangeNum;
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
    </>
  );
});
