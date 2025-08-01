'use client';
import { useState, useEffect } from 'react';

export default function Home() {
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        const eventSource = new EventSource('/api/live');
        eventSource.onmessage = (event) => {
            try {
                const parsed = JSON.parse(event.data);
                setData(JSON.stringify(parsed, null, 2));
            } catch (e) {
                console.error('Invalid JSON:', event.data);
            }
        };

        eventSource.onerror = () => {
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <>
            <h1>Server Data:</h1>
            <pre>{data || 'Loading...'}</pre>
        </>
    );
}
