export default function(context) {
  context.store.dispatch('authInit', context.req);
}
