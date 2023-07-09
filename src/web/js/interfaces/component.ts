export interface Command {
    targetId: string;
    template: string;
    data: any;
    methods: any;
    render: Function;
}