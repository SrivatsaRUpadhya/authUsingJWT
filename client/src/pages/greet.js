export default function Greet({ user }) {
    return (
        <div>
            <h1>Hello {user.name}</h1>
            <h2>Phone: {user.phone}</h2>
        </div>
    )
}