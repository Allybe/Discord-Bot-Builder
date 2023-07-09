import { Command } from "../../interfaces/component.js";


export const component:Command = {
    targetId: 'recents',
    template: "<button>${text}</button>",
    data: {
        getText: function() {
            return 'Recents';
        }
    },
    methods: {
        onClick: function() {
            console.log('Recents clicked');
        }
    },
    render: function() {
        return this.template;
    }
}