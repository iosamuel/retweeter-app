export default function({ store, redirect }) {
  const loggedIn = !!store.state.user
  if (!loggedIn) redirect('/login')
}
