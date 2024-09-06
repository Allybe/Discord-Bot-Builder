export interface Component {
  targetId: string;
  elementType: string;
  data: () => any;
  methods: any;
}
