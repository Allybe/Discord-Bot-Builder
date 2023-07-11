export interface Command {
  targetId: string;
  elementType: string;
  data: () => any;
  methods: any;
}
