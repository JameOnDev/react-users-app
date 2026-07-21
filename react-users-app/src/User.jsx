import { useEffect, useState } from "react";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reloadIndex, setReloadIndex] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        fetch("https://jsonplaceholder.typicode.com/users", {
            signal: controller.signal,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                if (err.name === "AbortError") return;
                console.error("Error fetching users:", err);
                setError(err.message);
                setLoading(false);
            });

        return () => controller.abort();
    }, [reloadIndex]);

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        setReloadIndex((index) => index + 1);
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return (
            <div>
                <h2>เกิดข้อผิดพลาด: {error}</h2>
                <button onClick={handleRetry}>ลองใหม่</button>
            </div>
        );
    }

    if (users.length === 0) {
        return <h2>ไม่พบข้อมูลผู้ใช้</h2>;
    }

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <h3>{user.name}</h3>
                        <p>
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                        </p>
                        <p>{user.company?.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;
