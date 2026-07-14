import { useEffect, useState } from "react";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUsers(data);
                setLoading(false);
            })
            .catch(() => {
                console.log("Error");
                setError(true);
                setLoading(false);
            })
    }, []);

    //กรณี loding
    if (loading) {
        return <h2>Loading...</h2>;
    }

    //กรณี Error
    if (error) {
        return <h2>เกิดข้อผิดพลาด</h2>;
    }

    return (
        <div>
            <>
            {loading  ? <h2>Loading...</h2> : <h1>Users</h1>}
            </>

            {users.map((user) => (
            <div key={user.id}>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
            </div>
            ))}
        </div>
    );
}

export default Users