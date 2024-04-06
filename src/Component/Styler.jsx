import { useLayoutEffect } from "react";
import tenoxui, { defineProps, makeStyles } from "tenoxui";

const styler = makeStyles({
  ".default-padding": "p-2rem ph-10vw",
});

const styles = {
  props: {
    "box-s": "boxSizing",
    "list-s": "listStyle",
    "text-d": "textDecoration",
    all: "all",
    bc: "borderColor",
    ol: "outline",
    bdr: "border",
  },
  styles: {
    "*:not(head):not(script):not(style):not(link):not(meta):not(title):not(base)":
      "m-0 p-0 list-s-none text-d-none box-s-[b-box]",
    p: "tc-[primary-200]",
    body: "bg-[primary-900] tc-[primary-100] w-100% h-mn-100vh",
    "button.icon": {
      "": "all-unset box-1.4rem display-flex flex-parent-center bg-[primary-700] br-4px cursor-pointer bw-1px bs-solid bc-transparent",
      span: "fs-inherit",
    },

    "button.btn":
      "display-flex flex-parent-center bg-[primary-700] br-4px cursor-pointer bw-1px bs-solid bc-transparent ph-8px pv-4px tc-[inherit]",

    footer:
      "position-fixed b-0 r-0 l-0 display-flex flex-parent-center p-1rem bg-[primary-900]",
    "body, .body-padding": `${styler[".default-padding"]} pb-4rem`,
    ".logo": "tc-[primary-100]",

    // Input Style
    select: {
      "": "ol-none bg-none bdr-none tc-inherit",
      option: "tc-[primary-100] bg-[primary-800] bdr-none ol-none",
    },

    ".edit-input":
      "pb-8px bg-none fs-1.5rem fw-700 bw-1px bs-solid bw-0 bw-bottom-1px bc-[primary-600] tc-inherit ol-none mb-8px",
    ".input-border": "bs-solid bw-0 bw-bottom-1px bc-[primary-600]",

    // item todo styles
    ".todo-item":
      "fx-400px p-24px br-8px display-flex fd-column bg-[primary-800] gap-1rem cursor-grab jc-[sb]",

    // Re-usable classes
    ".center": "display-flex flex-parent-center",
    ".space-between": "jc-[sb]",
  },
};

const Styler = () => {
  // Define new props
  defineProps(styles.props);
  // Applying Styles
  makeStyles(styles.styles);
  // init tenoxui
  tenoxui();
};
const useStyler = () => {
  useLayoutEffect(() => {
    Styler();
  }, []);
};

export { Styler, useStyler };
