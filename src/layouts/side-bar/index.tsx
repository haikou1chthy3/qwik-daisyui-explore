import { component$ } from "@builder.io/qwik";
import QwikBar from "~/layouts/side-bar/qwik-bar";
import MenuBar from "./menu-bar";
import AuxBar from "./aux-bar";

export default component$(() => {
  return (
    <>
      <div class="flex h-screen">
        <QwikBar />

        <MenuBar />

        <AuxBar />
      </div>
    </>
  );
});
