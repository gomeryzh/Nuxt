export default function(context) {
  console.log('check-auth');
  if (process.client) {
    context.store.dispatch('authInit');
  }
}
