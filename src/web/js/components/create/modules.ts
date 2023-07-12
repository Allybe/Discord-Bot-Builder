import { Command } from "../../interfaces/component.js";

export const component: Command = {
  targetId: "none",
  elementType: "none",
  data: () => {
    return null;
  },
  methods: {
    onclick: function () {
      console.log("clicked");
    },
  },
};
